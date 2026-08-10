import type { Metadata } from 'next'
import { headers } from 'next/headers'
import './globals.css'
import { Navigation } from '@/components/landing/navigation'
import { FooterSection } from '@/components/landing/footer-section'
import { FontLoader } from '@/components/font-loader'

export const metadata: Metadata = {
  metadataBase: new URL('https://visionc.co.kr'),
  title: {
    default: '기업 AI 도입 동반자 | Vision Solution',
    template: '%s | Vision Solution',
  },
  description: '중소기업 AI 도입 동반자. 컨설팅·구축·사내 출강 교육·보안 진단·웹사이트·앱 개발을 한 곳에서. 누적 247건+ 프로젝트.',
  openGraph: {
    // ★기본값 — 페이지가 자기 openGraph를 안 두면 이걸 상속한다(카톡·슬랙 공유 썸네일).
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Vision Solution',
    url: 'https://visionc.co.kr',
    title: '기업 AI 도입 동반자 | Vision Solution',
    description: '중소기업 AI 도입 동반자. 컨설팅·구축·사내 출강 교육·보안 진단·웹사이트·앱 개발을 한 곳에서. 누적 247건+ 프로젝트.',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vision Solution' }],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visionc_kr',
    images: ['/api/og'],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '(주)비젼솔루션',
  alternateName: 'Vision Solution',
  url: 'https://visionc.co.kr',
  logo: {
    '@type': 'ImageObject',
    url: 'https://visionc.co.kr/logo.svg',
    width: 200,
    height: 60,
  },
  description: '중소기업 AI 도입 동반자. 컨설팅·구축·사내 출강 교육·보안·웹·앱 개발 통합 트랙. 누적 247건+ 프로젝트.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Korean',
    email: 'biztalktome@gmail.com',
  },
  sameAs: [
    'https://chatbot.visionc.co.kr',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'South Korea',
  },
  serviceType: [
    '홈페이지 제작',
    '홈페이지 리뉴얼',
    '웹 보안 진단',
    'AI 챗봇 구축',
    '앱 개발',
    '홈페이지 유지보수',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '(주)비젼솔루션',
  url: 'https://visionc.co.kr',
  description: '중소기업 AI 도입 동반자 — 컨설팅·구축·사내 출강 교육·보안·웹·앱 통합 트랙',
  inLanguage: 'ko-KR',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://visionc.co.kr/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    name: '(주)비젼솔루션',
    url: 'https://visionc.co.kr',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get('x-nonce') ?? ''
  return (
    <html lang="ko" className="dark">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      </head>
      <body>
        {/* Organization + WebSite JSON-LD — 검색봇·LLM 구조 인식 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Navigation />
        <main>{children}</main>
        <FooterSection />
        <FontLoader />
        {/* VISIONC 챗봇 — suppressHydrationWarning: 브라우저가 nonce 속성을 파싱 후 제거하므로 SSR/CSR nonce 불일치는 정상 */}
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `window.difyChatbotConfig={token:'PCt1VlRbyvKH4dX3',baseUrl:'https://chatbot.visionc.co.kr'}`
          }}
        />
        <script src="https://chatbot.visionc.co.kr/embed.min.js" defer />
      </body>
    </html>
  )
}
