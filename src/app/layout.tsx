import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vision Solution — 홈페이지 리뉴얼 전문',
  description: 'URL 하나로 홈페이지 문제를 AI가 48시간 안에 진단합니다. 리뉴얼·보안·유지보수·AI 솔루션.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="stylesheet" as="style" crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
