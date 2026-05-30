import type { Metadata } from 'next'
import { headers } from 'next/headers'
import './globals.css'
import { Navigation } from '@/components/landing/navigation'
import { FooterSection } from '@/components/landing/footer-section'
import { FontLoader } from '@/components/font-loader'

export const metadata: Metadata = {
  metadataBase: new URL('https://visionc.co.kr'),
  title: {
    default: '홈페이지 무료 AI 진단 | Vision Solution',
    template: '%s | Vision Solution',
  },
  description: '고객이 지금도 떠나고 있습니까? URL 하나로 48시간 내 AI 진단. 무료 리포트를 지금 신청하세요.',
  twitter: {
    card: 'summary_large_image',
    site: '@visionc_kr',
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
  description: '중소기업 홈페이지 제작·리뉴얼·보안·AI 솔루션 전문 디지털 파트너. URL 하나로 48시간 내 무료 AI 진단.',
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
  description: '중소기업 홈페이지 무료 AI 진단 — URL 하나로 48시간 내 보안·성능·SEO 리포트',
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
        {/* VISIONC 챗봇 */}
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `window.difyChatbotConfig={token:'PCt1VlRbyvKH4dX3',baseUrl:'https://chatbot.visionc.co.kr'}`
          }}
        />
        <script src="https://chatbot.visionc.co.kr/embed.min.js" defer />
      </body>
    </html>
  )
}
