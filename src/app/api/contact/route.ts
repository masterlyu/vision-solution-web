import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientId } from '@/lib/rateLimit'
import { env } from '@/lib/env'

const TOKEN = env.TELEGRAM_BOT_TOKEN
const CHAT_ID = env.TELEGRAM_CHAT_ID

async function sendTelegram(text: string) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
  })
}

export async function POST(req: NextRequest) {
  const rl = await checkRateLimit('contact', getClientId(req), { limit: 5, windowSec: 60 })
  if (!rl.success) {
    return NextResponse.json(
      { error: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rl.resetAt - Math.floor(Date.now() / 1000)),
          'X-RateLimit-Remaining': '0',
        },
      }
    )
  }

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
