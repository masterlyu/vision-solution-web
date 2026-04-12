import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '비젼솔루션 — URL 하나로 시작하는 무료 사이트 진단',
  description: '웹기술·디자인·보안·DB까지 72시간 안에 전수 분석. 견적과 개선안을 PDF로 드립니다. 진단 비용 0원.',
  keywords: '웹리뉴얼,홈페이지제작,보안진단,앱개발,AI솔루션,무료사이트진단',
  openGraph: {
    title: '비젼솔루션 — URL 하나로 무료 사이트 진단',
    description: '72시간 안에 웹기술·디자인·보안 전수 분석 + PDF 리포트. 진단 비용 0원.',
    url: 'https://visionc.co.kr',
    siteName: '비젼솔루션',
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
      </head>
      <body>
        <Header />
        <main className="pt-[64px]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
