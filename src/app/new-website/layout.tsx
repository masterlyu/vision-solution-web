import type { Metadata } from 'next'

const title = '홈페이지 신규 제작 전문'
const description = '문의 오는 홈페이지를 처음부터 설계합니다. SEO·전환율·모바일 최적화 포함. 300만원대부터 시작.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['홈페이지 제작', '중소기업 홈페이지 제작', '홈페이지 제작 비용', '소상공인 홈페이지', '비전솔루션'],
  alternates: { canonical: '/new-website' },
  openGraph: {
    title,
    description,
    url: 'https://visionc.co.kr/new-website',
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

export default function NewWebsiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
