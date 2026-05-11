import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientId } from '@/lib/rateLimit'
import { sendAdminNotification } from '@/lib/emailSender'
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

  const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const emailHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
      <h2 style="color:#7C3AED;margin:0 0 16px;">📩 새 문의 접수</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;font-weight:700;width:100px;">이름</td><td style="padding:8px 0;">${name}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700;">이메일</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
        ${company ? `<tr><td style="padding:8px 0;font-weight:700;">회사명</td><td style="padding:8px 0;">${company}</td></tr>` : ''}
        <tr><td style="padding:8px 0;font-weight:700;">서비스</td><td style="padding:8px 0;">${serviceLabel[service] ?? service}</td></tr>
      </table>
      <div style="margin-top:16px;padding:16px;background:#f5f3ff;border-radius:8px;">
        <div style="font-weight:700;margin-bottom:8px;">문의 내용</div>
        <div style="white-space:pre-wrap;color:#374151;">${message}</div>
      </div>
      <div style="margin-top:16px;color:#9ca3af;font-size:12px;">⏰ ${now}</div>
    </div>`

  sendAdminNotification(`[VISIONC] 새 문의 — ${name} (${serviceLabel[service] ?? service})`, emailHtml)
    .catch(e => console.error('[contact] 이메일 알림 실패:', e))

  return NextResponse.json({ ok: true })
}
