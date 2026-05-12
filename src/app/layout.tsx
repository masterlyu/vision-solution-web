import type { Metadata } from 'next'
import { headers } from 'next/headers'
import './globals.css'
import { Navigation } from '@/components/landing/navigation'
import { FooterSection } from '@/components/landing/footer-section'
import { ChatbotLoader } from '@/components/chatbot-loader'
import { FontLoader } from '@/components/font-loader'

export const metadata: Metadata = {
  metadataBase: new URL('https://visionc.co.kr'),
  title: {
    default: '홈페이지 무료 AI 진단 | Vision Solution',
    template: '%s | Vision Solution',
  },
  description: '고객이 지금도 떠나고 있습니까? URL 하나로 48시간 내 AI 진단. 무료 리포트를 지금 신청하세요.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await headers() // nonce 전파용 — 제거 시 CSP가 Next.js 내부 스크립트 차단
  return (
    <html lang="ko" className="dark">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <FooterSection />
        <FontLoader />
        <ChatbotLoader />
      </body>
    </html>
  )
}
