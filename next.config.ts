import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.visionc.co.kr' }],
        destination: 'https://visionc.co.kr/:path*',
        permanent: true,
      },
      // Phase 1: 신규 사이트 페이지 폐기 → 웹사이트 리뉴얼·운영으로 통합
      { source: '/new-website', destination: '/renewal', permanent: true },
      // Phase 5: 유지보수 페이지 → /renewal#maintenance 섹션으로 통합
      { source: '/maintenance', destination: '/renewal#maintenance', permanent: true },
    ]
  },
  poweredByHeader: false,
  outputFileTracingIncludes: {
    '/api/analyze': ['./public/fonts/**/*'],
    '/api/og': ['./public/fonts/**/*'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Link',
            value: '<https://chatbot.visionc.co.kr>; rel=preconnect, <https://cdn.jsdelivr.net>; rel=preconnect; crossorigin',
          },
          // CSP는 middleware에서 nonce와 함께 동적으로 처리됨 (여기는 fallback)
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self'",
              "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
              "font-src 'self' https://cdn.jsdelivr.net",
              "img-src 'self' data: blob: https:",
              "connect-src 'self' https:",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
