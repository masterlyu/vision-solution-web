import { NextRequest, NextResponse } from 'next/server'

const TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!

async function sendTelegram(text: string) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
  })
}

export async function POST(req: NextRequest) {
  const { serviceType, url, email, company } = await req.json()

  const serviceLabel: Record<string, string> = {
    renewal:     '홈페이지 리뉴얼',
    security:    '보안 진단',
    maintenance: '유지보수',
  }

  const msg = [
    `🔔 <b>새 분석 신청</b>`,
    ``,
    `서비스: <b>${serviceLabel[serviceType] ?? serviceType}</b>`,
    `URL: <code>${url}</code>`,
    `이메일: ${email}`,
    company ? `회사명: ${company}` : null,
    ``,
    `⏰ ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`,
  ].filter(Boolean).join('\n')

  await sendTelegram(msg)
  return NextResponse.json({ ok: true })
}
