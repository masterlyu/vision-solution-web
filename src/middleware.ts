import { NextRequest, NextResponse } from 'next/server'

/**
 * 통합 보안 미들웨어
 *
 * 1. CSP nonce 생성 및 동적 보안 헤더 처리 (VIS-13)
 * 2. CSRF 방어: 공개 폼 제출 API에 Origin 헤더 검증 (VIS-16)
 */

// ────────────────────────────────────────────────────────
// 보안 헤더 설정
// ────────────────────────────────────────────────────────

function buildSecurityHeaders(nonce: string): Record<string, string> {
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' 'nonce-${nonce}' 'unsafe-inline' https://cdn.jsdelivr.net`,
    "font-src 'self' https://cdn.jsdelivr.net",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
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

// ────────────────────────────────────────────────────────
// CSRF 설정
// ────────────────────────────────────────────────────────

// Origin 검증이 필요한 폼 제출 API
const CSRF_GUARDED = [
  '/api/contact',
  '/api/notify',
  '/api/analyze',
]

// 외부 서비스 호출이므로 CSRF 검사 제외
const CSRF_EXEMPT = [
  '/api/telegram-webhook',
  '/api/deploy-notify',
  '/api/creative-approve',
  '/api/report',
]

// ────────────────────────────────────────────────────────
// 미들웨어 진입점
// ────────────────────────────────────────────────────────

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1. CSRF 검증 (POST 요청 + 가드 대상 라우트만)
  if (
    req.method === 'POST' &&
    CSRF_GUARDED.some(p => pathname.startsWith(p)) &&
    !CSRF_EXEMPT.some(p => pathname.startsWith(p))
  ) {
    const origin = req.headers.get('origin')
    const host = req.headers.get('host')

    if (!origin || !host) {
      return NextResponse.json(
        { error: 'CSRF 검증 실패: Origin 헤더가 없습니다.' },
        { status: 403 }
      )
    }

    let originHost: string
    try {
      originHost = new URL(origin).host
    } catch {
      return NextResponse.json(
        { error: 'CSRF 검증 실패: 잘못된 Origin 헤더.' },
        { status: 403 }
      )
    }

    if (originHost !== host) {
      return NextResponse.json(
        { error: 'CSRF 검증 실패: Origin 불일치.' },
        { status: 403 }
      )
    }
  }

  // 2. 보안 헤더 적용 (모든 요청)
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const securityHeaders = buildSecurityHeaders(nonce)

  // nonce를 요청 헤더로 전달 (서버 컴포넌트에서 읽기 가능)
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
    // 정적 파일과 이미지 최적화 경로 제외
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
