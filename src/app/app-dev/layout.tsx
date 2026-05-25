import type { Metadata } from 'next'

const title = '앱·시스템 개발 전문'
const description = '엑셀 한계를 시스템으로 해결합니다. 웹앱·모바일·백오피스 개발. 착수 전 전체 설계 공개.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['앱 개발', '모바일 앱 개발', '앱 개발 비용', '외주 앱 개발', '중소기업 시스템 개발', '비전솔루션'],
  alternates: { canonical: '/app-dev' },
  openGraph: {
    title,
    description,
    url: 'https://visionc.co.kr/app-dev',
    siteName: 'Vision Solution',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: title }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/api/og'],
  },
}

export default function AppDevLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
