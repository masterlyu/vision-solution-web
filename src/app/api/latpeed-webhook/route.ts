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
  const p = (payload && typeof payload === 'object') ? payload as Record<string, unknown> : {}
  const buyer = (p.buyer ?? p.customer ?? p.orderer) as Record<string, unknown> | undefined
  const bEmail = buyer && typeof buyer.email === 'string' ? buyer.email : null
  const bName = buyer && typeof buyer.name === 'string' ? buyer.name : null
  // 이메일: buyer.email 우선, 없으면 재귀 탐색(우리 발송계정 제외)
  const email = (bEmail && !deny.includes(bEmail.toLowerCase()) ? bEmail : null) || findEmail(payload, deny)
  // 이름: buyer.name 우선(product.name 을 잘못 잡지 않도록)
  const name = bName || findByKeys(buyer ?? {}, ['name', '이름']) || '고객'
  // 대상 URL: answers[{question,answer}] 에서 질문 텍스트/URL 형태로 찾기
  let targetUrl: string | null = null
  const answers = p.answers
  if (Array.isArray(answers)) {
    for (const a of answers as Array<Record<string, unknown>>) {
      const q = typeof a?.question === 'string' ? a.question : ''
      const ans = typeof a?.answer === 'string' ? a.answer.trim() : ''
      if (ans && (/url|사이트|주소|site|대상/i.test(q) || /https?:\/\//i.test(ans))) { targetUrl = ans; break }
    }
  }
  if (!targetUrl) targetUrl = findByKeys(payload, ['url', '사이트', '주소', 'site', 'target'])
  const rawStr = (raw || JSON.stringify(payload) || '').slice(0, 2500)
  // 상품 구분(2026-10-27) — 보호막 설치·보안 월 관리 상품이 생겨, 모의해킹 동의서(D)는 모의해킹 상품에만 보낸다
  const prod = (p.product ?? p.item) as Record<string, unknown> | undefined
  const productName = (prod && typeof prod.name === 'string' ? prod.name : null)
    || (typeof p.productName === 'string' ? p.productName : null) || findByKeys(prod ?? {}, ['name', 'title']) || ''
  const isPentest = productName ? /모의해킹/.test(productName) : /모의해킹/.test(rawStr)

  const paidSig = /결제\s*완료|결제완료|payment[_\s-]?complete|\bpaid\b|purchased|order[_\s-]?complete/i.test(rawStr)
  const cancelSig = /취소|cancel|refund|환불|해지|실패/i.test(rawStr)
  const isPaid = paidSig && !cancelSig

  await tg(
    `🛒 레피드 주문/이벤트 — ${productName || '(상품명 못 찾음)'}\n` +
    `이메일: ${email || '(payload에서 못 찾음 — 수동 확인)'}\n` +
    `이름: ${name}\n대상: ${targetUrl || '(미기재)'}\n` +
    `결제완료 추정: ${isPaid ? (isPentest ? 'Y → D메일 자동발송 시도' : 'Y → 모의해킹 외 상품, 안내 메일 수동 발송') : 'N(취소/기타) → 수동 확인'}\n\n[payload]\n${rawStr}`
  )

  // 주문 원장(2026-10-27) — 미니PC Cloudflare 터널 hooks.visionc.co.kr → 오라클 대시보드 /api/security/orders(주문 창구 하나만 열림).
  // 장비가 꺼져 있으면 기록되지 않으므로 실패는 텔레그램 「수동 등록 필요」로 알린다. 웹훅 응답은 그래도 200.
  if (isPaid || cancelSig) {
    const order = (p.order ?? p.payment) as Record<string, unknown> | undefined
    const opt = (p.option ?? p.selectedOption) as Record<string, unknown> | undefined
    const pick = (...v: unknown[]) => v.find(x => (typeof x === 'string' && x) || typeof x === 'number')
    const externalId = String(pick(p.orderId, p.order_id, order?.id, p.paymentId, p.payment_id, p.id) ??
      `raw-${email ?? ''}-${productName}-${targetUrl ?? ''}-${new Date().toISOString().slice(0, 10)}`)
    try {
      const hook = process.env.ORDERS_HOOK_URL
      if (!hook || !process.env.ORDERS_HOOK_TOKEN) throw new Error('ORDERS_HOOK_URL·TOKEN 설정 없음')
      const r = await fetch(`${hook}/api/security/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-internal-token': process.env.ORDERS_HOOK_TOKEN },
        body: JSON.stringify({
          event: isPaid ? 'paid' : 'cancel', externalId, productName,
          optionName: pick(opt?.name, p.optionName) ?? null,
          amount: pick(p.amount, p.price, order?.amount, order?.price) ?? null,
          email, name, phone: pick(buyer?.phone, buyer?.phoneNumber) ?? null, targetUrl, raw: payload,
        }),
        signal: AbortSignal.timeout(10000),
      })
      const j = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(`${r.status} ${JSON.stringify(j).slice(0, 150)}`)
      if (j.product === 'other') await tg(`⚠ 주문 원장: 상품을 못 가렸습니다(주문 #${j.orderId}) — 대시보드에서 확인`)
    } catch (e) {
      await tg(`⚠ 주문 원장 기록 실패 — 수동 등록 필요: ${String(e).slice(0, 200)}`)
    }
  }

  if (isPaid && email && isPentest) {
    try {
      await sendLatpeedReservation(email, name, targetUrl || undefined)
      await tg(`✉️ 동의서·권한확인 안내(D) 자동발송 완료 → ${email}`)
    } catch (e) {
      await tg(`⚠ D메일 자동발송 실패(${email}) — 수동 발송 필요: ${String(e).slice(0, 200)}`)
    }
  }

  return NextResponse.json({ ok: true })
}
