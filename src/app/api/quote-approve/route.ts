import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { randomUUID } from 'crypto'
import { env } from '@/lib/env'

const TOKEN   = env.TELEGRAM_BOT_TOKEN
const CHAT_ID = env.TELEGRAM_CHAT_ID

const redis = new Redis({
  url:   env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
})

export interface QuoteData {
  clientUrl: string
  clientName: string
  clientEmail: string
  contactName?: string
  services: string[]           // e.g. ['홈페이지 리뉴얼', '보안 강화']
  totalPrice: string           // e.g. '250~350만원'
  breakdown: Array<{
    name: string
    price: string
    description: string
  }>
  pdfUrl?: string              // 이미 생성된 PDF URL (선택)
  note?: string                // 추가 메모
}

// POST /api/quote-approve
// body: QuoteData
// 견적서를 사령관님께 텔레그램으로 전송하고 승인/반려 버튼을 추가합니다.
export async function POST(req: NextRequest) {
  const data: QuoteData = await req.json()

  if (!data.clientUrl || !data.clientEmail || !data.services?.length) {
    return NextResponse.json(
      { error: 'clientUrl, clientEmail, services 필드가 필요합니다.' },
      { status: 400 }
    )
  }

  const quoteId = randomUUID()

  // Redis에 저장 (24시간 TTL)
  await redis.setex(`quote:${quoteId}`, 86400, JSON.stringify(data))

  // Telegram 메시지 구성
  const serviceList = data.services.join(' / ')
  const breakdownLines = data.breakdown.map(
    b => `  · ${b.name}: <b>${b.price}</b> (${b.description})`
  ).join('\n')

  const msg = [
    `📋 <b>견적 승인 요청</b>`,
    ``,
    `🌐 URL: <code>${data.clientUrl}</code>`,
    `🏢 업체명: ${data.clientName}`,
    `📧 이메일: ${data.clientEmail}`,
    data.contactName ? `👤 담당자: ${data.contactName}` : null,
    ``,
    `🛠 서비스: <b>${serviceList}</b>`,
    ``,
    `💰 <b>견적 상세</b>`,
    breakdownLines,
    ``,
    `💵 <b>합계: ${data.totalPrice}</b>`,
    data.pdfUrl ? `\n📄 제안서: ${data.pdfUrl}` : null,
    data.note ? `\n📝 메모: ${data.note}` : null,
    ``,
    `⏰ ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`,
    `🔑 ID: <code>${quoteId.slice(0, 8)}</code>`,
  ].filter((l): l is string => l !== null).join('\n')

  const keyboard = {
    inline_keyboard: [[
      { text: '✅ 승인 — 고객에게 발송', callback_data: `quote_approve:${quoteId}` },
      { text: '❌ 반려 — 취소', callback_data: `quote_reject:${quoteId}` },
    ]]
  }

  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: msg,
      parse_mode: 'HTML',
      reply_markup: keyboard,
    }),
  })

  const tgData = await res.json()

  if (!tgData.ok) {
    return NextResponse.json(
      { error: 'Telegram 전송 실패', detail: tgData },
      { status: 500 }
    )
  }

  return NextResponse.json({
    ok: true,
    quoteId,
    messageId: tgData.result?.message_id,
  })
}
