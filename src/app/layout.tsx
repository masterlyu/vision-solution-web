import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'VISION SOLUTION — AI가 일하는 웹 솔루션',
  description: '웹 리뉴얼, 보안 진단, 앱 개발, AI 솔루션 전문기업. AI 에이전트가 분석부터 납품까지.',
  keywords: '웹리뉴얼, 홈페이지제작, 보안진단, 앱개발, AI솔루션, 중소기업AI',
  openGraph: {
    title: 'VISION SOLUTION',
    description: 'AI가 일하는 웹 솔루션 전문기업',
    url: 'https://visionc.co.kr',
    siteName: 'VISION SOLUTION',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
