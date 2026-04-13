import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { generatePdfBuffer } from '@/lib/pdfReport'
import { sendReportEmail } from '@/lib/emailSender'
import { sendQuoteEmail } from '@/lib/quoteEmailSender'
import type { AnalysisResult } from '@/lib/siteAnalyzer'
import type { QuoteData } from '@/app/api/quote-approve/route'
import { env } from '@/lib/env'

const TOKEN   = env.TELEGRAM_BOT_TOKEN
const CHAT_ID = env.TELEGRAM_CHAT_ID

/**
 * Telegram 웹훅 요청 원본 검증 (VIS-14)
 *
 * Telegram은 setWebhook(secret_token=...) 설정 시 모든 웹훅 요청에
 * X-Telegram-Bot-Api-Secret-Token 헤더를 포함합니다.
 * 이 값을 상수 시간 비교로 검증하여 위장 요청을 차단합니다.
 *
 * TELEGRAM_WEBHOOK_SECRET 미설정 시:
 * - 개발 환경: 검증 생략 (pass)
 * - 프로덕션 환경: 403 반환 (보안 강제)
 */
function verifyTelegramSecret(req: NextRequest): boolean {
  const secret = env.TELEGRAM_WEBHOOK_SECRET
  if (!secret) {
    return process.env.NODE_ENV !== 'production'
  }
  const incoming = req.headers.get('x-telegram-bot-api-secret-token') ?? ''
  if (incoming.length !== secret.length) return false
  let diff = 0
  for (let i = 0; i < secret.length; i++) {
    diff |= incoming.charCodeAt(i) ^ secret.charCodeAt(i)
  }
  return diff === 0
}

const redis = new Redis({
  url:   env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
})

async function answerCallback(callbackQueryId: string, text: string) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: callbackQueryId, text }),
  })
}

async function editMessage(chatId: string | number, messageId: number, text: string) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/editMessageText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text,
      parse_mode: 'HTML',
    }),
  })
}

async function editCaption(chatId: string | number, messageId: number, caption: string) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/editMessageCaption`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      caption,
      parse_mode: 'HTML',
      reply_markup: JSON.stringify({ inline_keyboard: [] }), // 버튼 제거
    }),
  })
}

export async function POST(req: NextRequest) {
  // 요청 원본 검증
  if (!verifyTelegramSecret(req)) {
    return NextResponse.json({ error: '인증 실패' }, { status: 403 })
  }

  const body = await req.json()
  const cq = body.callback_query
  if (!cq) return NextResponse.json({ ok: true })

  const { id: callbackId, data, message } = cq
  const chatId    = message.chat.id
  const messageId = message.message_id

  // callback_data 형식: "action:id" — 첫 번째 콜론 기준으로 분리
  const colonIdx = (data as string).indexOf(':')
  const action   = colonIdx >= 0 ? (data as string).slice(0, colonIdx) : (data as string)
  const payload  = colonIdx >= 0 ? (data as string).slice(colonIdx + 1) : ''

  // ── 진단 리포트 콜백 (기존) ──────────────────────────────────────────────
  if (action === 'reject') {
    await answerCallback(callbackId, '취소됐습니다.')
    await editCaption(chatId, messageId,
      `❌ <b>발송 취소됨</b>\n\n${message.caption ?? ''}\n\n<i>취소 처리됐습니다.</i>`
    )
    await redis.del(`pending:${payload}`)
    return NextResponse.json({ ok: true })
  }

  if (action === 'approve') {
    await answerCallback(callbackId, '발송 중...')

    const raw = await redis.get(`pending:${payload}`)
    if (!raw) {
      await answerCallback(callbackId, '데이터가 만료됐습니다. (24시간 초과)')
      return NextResponse.json({ ok: true })
    }

    const { result, email, company } = raw as { result: AnalysisResult; email: string; company?: string }

    try {
      const pdfBuffer = await generatePdfBuffer(result, email, company)
      await sendReportEmail(result, pdfBuffer, email, company)
      await redis.del(`pending:${payload}`)

      await editCaption(chatId, messageId,
        `✅ <b>발송 완료</b>\n\n` +
        `🌐 ${result.url}\n` +
        `📧 ${email}${company ? `  ·  ${company}` : ''}\n` +
        `📊 ${result.score.total}점 (등급 ${result.score.grade})\n\n` +
        `<i>리포트 PDF가 고객 이메일로 발송됐습니다.</i>`
      )
    } catch (e: any) {
      await answerCallback(callbackId, `오류: ${e.message}`)
    }
    return NextResponse.json({ ok: true })
  }

  // ── 견적 승인 콜백 ────────────────────────────────────────────────────────
  if (action === 'quote_approve') {
    await answerCallback(callbackId, '견적서 발송 중...')

    const raw = await redis.get(`quote:${payload}`)
    if (!raw) {
      await answerCallback(callbackId, '견적 데이터가 만료됐습니다. (24시간 초과)')
      await editMessage(chatId, messageId,
        `⚠️ <b>견적 만료</b>\n\nID: <code>${payload.slice(0, 8)}</code>\n\n<i>24시간이 경과하여 데이터가 삭제됐습니다.</i>`
      )
      return NextResponse.json({ ok: true })
    }

    const quote = raw as QuoteData

    try {
      await sendQuoteEmail(quote)
      await redis.del(`quote:${payload}`)

      await editMessage(chatId, messageId,
        `✅ <b>견적서 발송 완료</b>\n\n` +
        `🌐 ${quote.clientUrl}\n` +
        `🏢 ${quote.clientName}\n` +
        `📧 ${quote.clientEmail}\n` +
        `🛠 ${quote.services.join(' / ')}\n` +
        `💵 ${quote.totalPrice}\n\n` +
        `<i>견적서가 고객 이메일로 발송됐습니다.</i>`
      )
    } catch (e: any) {
      await answerCallback(callbackId, `오류: ${(e as Error).message}`)
      await editMessage(chatId, messageId,
        `❌ <b>발송 실패</b>\n\n` +
        `ID: <code>${payload.slice(0, 8)}</code>\n` +
        `오류: ${(e as Error).message}\n\n` +
        `<i>수동으로 재시도해주세요.</i>`
      )
    }
    return NextResponse.json({ ok: true })
  }

  if (action === 'quote_reject') {
    await answerCallback(callbackId, '견적 반려 처리됐습니다.')
    await redis.del(`quote:${payload}`)
    await editMessage(chatId, messageId,
      `❌ <b>견적 반려됨</b>\n\n` +
      `ID: <code>${payload.slice(0, 8)}</code>\n\n` +
      `<i>반려 처리됐습니다. 고객에게 이메일이 발송되지 않습니다.</i>`
    )
    return NextResponse.json({ ok: true })
  }

  await answerCallback(callbackId, '알 수 없는 요청입니다.')
  return NextResponse.json({ ok: true })
}
