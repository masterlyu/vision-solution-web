import type { Metadata } from 'next'
import { headers } from 'next/headers'
import './globals.css'
import { Navigation } from '@/components/landing/navigation'
import { FooterSection } from '@/components/landing/footer-section'

export const metadata: Metadata = {
  title: 'Vision Solution — 홈페이지 리뉴얼 전문',
  description: 'URL 하나로 홈페이지 문제를 AI가 48시간 안에 진단합니다.',
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
      </body>
    </html>
  )
}
