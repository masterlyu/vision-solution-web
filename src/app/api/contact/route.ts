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
  const { name, email, company, service, message } = await req.json()

  const serviceLabel: Record<string, string> = {
    renewal:      '홈페이지 리뉴얼',
    'new-website':'신규 사이트 구축',
    maintenance:  '유지보수',
    security:     '보안 진단',
    'app-dev':    '앱·시스템 개발',
    'ai-solution':'AI 솔루션',
    other:        '기타',
  }

  const msg = [
    `📩 <b>새 문의 접수</b>`,
    ``,
    `이름: <b>${name}</b>`,
    `이메일: ${email}`,
    company ? `회사명: ${company}` : null,
    `서비스: ${serviceLabel[service] ?? service}`,
    ``,
    `<b>문의 내용:</b>`,
    message,
    ``,
    `⏰ ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`,
  ].filter(Boolean).join('\n')

  await sendTelegram(msg)
  return NextResponse.json({ ok: true })
}
