import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'

const COOKIE_NAME = 'visionc_academy_auth'
const MAX_ATTEMPTS = 5
const WINDOW_MS = 5 * 60 * 1000   // 5 min lockout window
const COOKIE_TTL = 24 * 60 * 60   // 24h in seconds

// In-memory rate limit (per IP). Survives within a single serverless instance.
const attempts = new Map<string, { count: number; firstAt: number }>()

function clientIp(req: NextRequest): string {
  const xf = req.headers.get('x-forwarded-for')
  if (xf) return xf.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

function checkRateLimit(ip: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now()
  const entry = attempts.get(ip)
  if (!entry || now - entry.firstAt > WINDOW_MS) {
    attempts.set(ip, { count: 0, firstAt: now })
    return { ok: true }
  }
  if (entry.count >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((entry.firstAt + WINDOW_MS - now) / 1000)
    return { ok: false, retryAfter }
  }
  return { ok: true }
}

function recordFailure(ip: string) {
  const now = Date.now()
  const entry = attempts.get(ip)
  if (!entry || now - entry.firstAt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAt: now })
  } else {
    entry.count += 1
  }
}

export function academySecret(): string {
  return (
    process.env.ACADEMY_AUTH_SECRET ??
    process.env.TELEGRAM_BOT_TOKEN ??
    'visionc-academy-fallback-secret'
  )
}

export function academyAuthToken(): string {
  return createHmac('sha256', academySecret()).update('academy:lv1').digest('hex')
}

export function verifyAcademyCookie(value: string | undefined | null): boolean {
  if (!value) return false
  const expected = academyAuthToken()
  if (value.length !== expected.length) return false
  try {
    return timingSafeEqual(Buffer.from(value), Buffer.from(expected))
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req)
  const rl = checkRateLimit(ip)
  if (!rl.ok) {
    return NextResponse.json(
      { error: `너무 많이 시도하셨습니다. ${rl.retryAfter}초 후 다시 시도해주세요.` },
      { status: 429 },
    )
  }

  let body: { password?: string } = {}
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }
  const submitted = (body.password ?? '').trim()
  const expected = (process.env.ACADEMY_PASSWORD ?? 'visioncDown').trim()

  // timing-safe compare
  const a = Buffer.from(submitted)
  const b = Buffer.from(expected)
  const match = a.length === b.length && timingSafeEqual(a, b)

  if (!match) {
    recordFailure(ip)
    return NextResponse.json({ error: 'wrong password' }, { status: 401 })
  }

  // success — reset counter and set cookie
  attempts.delete(ip)
  const token = academyAuthToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_TTL,
  })
  return res
}

const COOKIE_NAME_FOR_GET = 'visionc_academy_auth'

export function GET(req: NextRequest) {
  const cookie = req.cookies.get(COOKIE_NAME_FOR_GET)?.value
  const ok = verifyAcademyCookie(cookie)
  return NextResponse.json({ authed: ok }, { status: ok ? 200 : 401 })
}
