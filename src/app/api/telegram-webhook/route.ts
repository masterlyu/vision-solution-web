import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { generatePdfBuffer } from '@/lib/pdfReport'
import { sendReportEmail } from '@/lib/emailSender'
import type { AnalysisResult } from '@/lib/siteAnalyzer'

const TOKEN   = process.env.TELEGRAM_BOT_TOKEN!
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!

const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
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
  const body = await req.json()
  const cq = body.callback_query
  if (!cq) return NextResponse.json({ ok: true })

  const { id: callbackId, data, message } = cq
  const chatId    = message.chat.id
  const messageId = message.message_id

  const [action, pendingId] = (data as string).split(':')

  if (action === 'reject') {
    await answerCallback(callbackId, '취소됐습니다.')
    await editCaption(chatId, messageId,
      `❌ <b>발송 취소됨</b>\n\n${message.caption ?? ''}\n\n<i>취소 처리됐습니다.</i>`
    )
    await redis.del(`pending:${pendingId}`)
    return NextResponse.json({ ok: true })
  }

  if (action === 'approve') {
    await answerCallback(callbackId, '발송 중...')

    // Redis에서 데이터 조회
    const raw = await redis.get(`pending:${pendingId}`)
    if (!raw) {
      await answerCallback(callbackId, '데이터가 만료됐습니다. (24시간 초과)')
      return NextResponse.json({ ok: true })
    }

    const { result, email, company } = raw as { result: AnalysisResult; email: string; company?: string }

    try {
      // PDF 재생성
      const pdfBuffer = await generatePdfBuffer(result, email, company)

      // 고객 이메일 발송
      await sendReportEmail(result, pdfBuffer, email, company)

      // Redis 삭제
      await redis.del(`pending:${pendingId}`)

      // Telegram 메시지 업데이트 (버튼 제거 + 완료 표시)
      const domain = new URL(result.url).hostname
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
  }

  return NextResponse.json({ ok: true })
}
