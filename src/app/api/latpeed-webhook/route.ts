import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/lib/env'
import { sendLatpeedReservation } from '@/lib/emailSender'

export const runtime = 'nodejs'

// 레피드 웹훅(상품 결제 완료 등) 수신.
//  - 레피드가 payload 스키마를 문서화하지 않아 방어적으로 파싱(이메일/이름/대상URL 재귀 탐색).
//  - 항상 사령관에게 텔레그램 알림(원본 payload 포함) → 주문 놓침 0.
//  - 결제완료로 보이고 고객 이메일을 찾으면 동의서·권한확인 안내(템플릿 D) 자동 발송.
//  - 진단 착수(스캔)는 자동화하지 않는다 — 동의서 회신 + 권한확인 후 사람이 시작(설계 불변).

async function tg(text: string) {
  try {
    await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, disable_web_page_preview: true }),
    })
  } catch { /* 알림 실패는 무시 */ }
}

function findEmail(obj: unknown, deny: string[]): string | null {
  const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i
  let found: string | null = null
  const walk = (v: unknown) => {
    if (found) return
    if (typeof v === 'string') {
      const m = v.match(re)
      if (m && !deny.includes(m[0].toLowerCase())) found = m[0]
      return
    }
    if (v && typeof v === 'object') for (const x of Object.values(v as Record<string, unknown>)) walk(x)
  }
  walk(obj)
  return found
}

function findByKeys(obj: unknown, keys: string[]): string | null {
  let found: string | null = null
  const walk = (v: unknown) => {
    if (found || !v || typeof v !== 'object') return
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
      if (found) return
      const kl = k.toLowerCase()
      if (typeof val === 'string' && val.trim() && keys.some(kk => kl.includes(kk))) { found = val.trim(); return }
      if (val && typeof val === 'object') walk(val)
    }
  }
  walk(obj)
  return found
}

export async function POST(req: NextRequest) {
  // 선택적 키 가드: Vercel에 LATPEED_HOOK_KEY 설정 시, 웹훅 URL 뒤 ?k=... 가 일치해야 처리
  const key = process.env.LATPEED_HOOK_KEY
  if (key && req.nextUrl.searchParams.get('k') !== key) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  let raw = ''
  let payload: unknown = null
  try { raw = await req.text(); payload = JSON.parse(raw) } catch { payload = raw }

  const deny = [String(env.GMAIL_USER).toLowerCase(), 'biztalktome@gmail.com']
  const email = findEmail(payload, deny)
  const name = findByKeys(payload, ['name', '이름', 'buyer', 'customer']) || '고객'
  const targetUrl = findByKeys(payload, ['url', '사이트', '주소', 'site', 'target'])
  const rawStr = (raw || JSON.stringify(payload) || '').slice(0, 2500)

  const paidSig = /결제\s*완료|결제완료|payment[_\s-]?complete|\bpaid\b|purchased|order[_\s-]?complete/i.test(rawStr)
  const cancelSig = /취소|cancel|refund|환불|해지|실패/i.test(rawStr)
  const isPaid = paidSig && !cancelSig

  await tg(
    `🛒 레피드 모의해킹 주문/이벤트\n` +
    `이메일: ${email || '(payload에서 못 찾음 — 수동 확인)'}\n` +
    `이름: ${name}\n대상: ${targetUrl || '(미기재)'}\n` +
    `결제완료 추정: ${isPaid ? 'Y → D메일 자동발송 시도' : 'N(취소/기타) → 수동 확인'}\n\n[payload]\n${rawStr}`
  )

  if (isPaid && email) {
    try {
      await sendLatpeedReservation(email, name, targetUrl || undefined)
      await tg(`✉️ 동의서·권한확인 안내(D) 자동발송 완료 → ${email}`)
    } catch (e) {
      await tg(`⚠ D메일 자동발송 실패(${email}) — 수동 발송 필요: ${String(e).slice(0, 200)}`)
    }
  }

  return NextResponse.json({ ok: true })
}
