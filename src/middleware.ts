import { NextRequest, NextResponse } from 'next/server'

/**
 * 통합 보안 미들웨어 (Edge Runtime 호환)
 *
 * 1. CSP nonce 생성 및 동적 보안 헤더 처리 (VIS-13)
 * 2. CSRF 방어: 공개 폼 제출 API에 Origin 헤더 검증 (VIS-16)
 */

function buildSecurityHeaders(nonce: string): Record<string, string> {
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'`,
    `style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net`,
    "font-src 'self' https://cdn.jsdelivr.net",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ')

  return {
    'Content-Security-Policy': csp,
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  }
}

const CSRF_GUARDED = ['/api/contact', '/api/notify', '/api/analyze']
const CSRF_EXEMPT = ['/api/telegram-webhook', '/api/deploy-notify', '/api/creative-approve', '/api/report']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1. CSRF 검증
  if (
    req.method === 'POST' &&
    CSRF_GUARDED.some(p => pathname.startsWith(p)) &&
    !CSRF_EXEMPT.some(p => pathname.startsWith(p))
  ) {
    const origin = req.headers.get('origin')
    const host = req.headers.get('host')
    if (!origin || !host) {
      return NextResponse.json({ error: 'CSRF 검증 실패: Origin 헤더 없음.' }, { status: 403 })
    }
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json({ error: 'CSRF 검증 실패: Origin 불일치.' }, { status: 403 })
      }
    } catch {
      return NextResponse.json({ error: 'CSRF 검증 실패: 잘못된 Origin.' }, { status: 403 })
    }
  }

  // 2. 보안 헤더 적용 — btoa(randomUUID()) : Edge Runtime 호환
  const nonce = btoa(crypto.randomUUID())
  const securityHeaders = buildSecurityHeaders(nonce)

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value)
  }
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
