import type { Metadata } from 'next'
import { headers } from 'next/headers'
import './globals.css'
import { Navigation } from '@/components/landing/navigation'
import { FooterSection } from '@/components/landing/footer-section'

export const metadata: Metadata = {
  metadataBase: new URL('https://visionc.co.kr'),
  title: {
    default: '홈페이지 무료 AI 진단 | Vision Solution',
    template: '%s | Vision Solution',
  },
  description: '고객이 지금도 떠나고 있습니까? URL 하나로 48시간 내 AI 진단. 무료 리포트를 지금 신청하세요.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get('x-nonce') ?? ''

  return (
    <html lang="ko" className="dark">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="stylesheet" as="style" crossOrigin="anonymous"
          integrity="sha384-f9iEnfDmuRSuBrXQjpPibejnfJMrZ2yI+715EjxlzBsPFIpaD1NxMh1MIzthxtCh"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <FooterSection />
        {/* VISIONC 챗봇 — 표준 embed */}
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
