import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientId } from '@/lib/rateLimit'
import { sendAdminNotification } from '@/lib/emailSender'
import { env } from '@/lib/env'
import { escapeHtml, isEmail, textField } from '@/lib/inputGuard'

const TOKEN = env.TELEGRAM_BOT_TOKEN
const CHAT_ID = env.TELEGRAM_CHAT_ID

async function sendTelegram(text: string) {
  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
  })
  if (!res.ok) throw new Error(`Telegram ${res.status}: ${await res.text()}`)
}

export async function POST(req: NextRequest) {
  // Rate limit — Redis 실패 시 요청 허용 (가용성 우선)
  let rlSuccess = true
  let rlResetAt = 0
  try {
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
  } catch (e) {
    console.error('[contact] rate limit 오류 (무시):', e)
  }

  const body = await req.json().catch(() => null)
  const name = textField(body?.name, 1, 100)
  const company = textField(body?.company, 0, 100)
  const message = textField(body?.message, 1, 5000)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const service = textField(body?.service, 1, 50) ?? 'other'
  if (!name || company === null || !message || !isEmail(email)) {
    return NextResponse.json(
      { error: '이름·이메일·문의 내용을 확인해 주세요. (이름 100자, 문의 내용 5000자 이내)' },
      { status: 400 },
    )
  }

  const serviceLabel: Record<string, string> = {
    factorylens:  'FactoryLens',
    renewal:      '홈페이지 리뉴얼',
    'new-website':'신규 사이트 구축',
    maintenance:  '유지보수',
    security:     '보안 진단',
    'app-dev':    '앱·시스템 개발',
    'ai-solution':'AI 솔루션',
    pentest:      '모의해킹',
    other:        '기타',
  }
  // 사용자 입력은 전부 이스케이프 — 텔레그램 HTML 은 '<' 하나로도 거절돼 알림이 사라지고, 메일엔 링크를 심을 수 있다
  const h = { name: escapeHtml(name), email: escapeHtml(email), company: escapeHtml(company),
    service: escapeHtml(serviceLabel[service] ?? service), message: escapeHtml(message) }

  const msg = [
    `📩 <b>새 문의 접수</b>`,
    ``,
    `이름: <b>${h.name}</b>`,
    `이메일: ${h.email}`,
    company ? `회사명: ${h.company}` : null,
    `서비스: ${h.service}`,
    ``,
    `<b>문의 내용:</b>`,
    h.message,
    ``,
    `⏰ ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`,
  ].filter(Boolean).join('\n')

  // 텔레그램 알림 (await — Vercel 함수 종료 전 완료 보장)
  let telegramOk = true
  try {
    await sendTelegram(msg)
  } catch (e) {
    telegramOk = false
    console.error('[contact] Telegram 실패:', e)
  }

  // 어드민 이메일 알림 — 이것도 await (응답 뒤엔 Vercel 이 함수를 끝내 메일이 빠질 수 있다)
  const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const emailHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
      <h2 style="color:#7C3AED;margin:0 0 16px;">📩 새 문의 접수</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;font-weight:700;width:100px;">이름</td><td style="padding:8px 0;">${h.name}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700;">이메일</td><td style="padding:8px 0;"><a href="mailto:${h.email}">${h.email}</a></td></tr>
        ${company ? `<tr><td style="padding:8px 0;font-weight:700;">회사명</td><td style="padding:8px 0;">${h.company}</td></tr>` : ''}
        <tr><td style="padding:8px 0;font-weight:700;">서비스</td><td style="padding:8px 0;">${h.service}</td></tr>
      </table>
      <div style="margin-top:16px;padding:16px;background:#f5f3ff;border-radius:8px;">
        <div style="font-weight:700;margin-bottom:8px;">문의 내용</div>
        <div style="white-space:pre-wrap;color:#374151;">${h.message}</div>
      </div>
      <div style="margin-top:16px;color:#9ca3af;font-size:12px;">⏰ ${now}</div>
    </div>`

  let mailOk = true
  try {
    await sendAdminNotification(`[VISIONC] 새 문의 — ${name} (${serviceLabel[service] ?? service})`, emailHtml)
  } catch (e) {
    mailOk = false
    console.error('[contact] 이메일 알림 실패:', e)
  }

  // 둘 다 실패하면 문의가 어디에도 안 남는다 — 방문자에게 실패를 알려 다시 보내게 한다
  if (!telegramOk && !mailOk) {
    return NextResponse.json({ error: '문의 전송에 실패했습니다. 잠시 후 다시 시도하거나 전화로 연락해 주세요.' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
