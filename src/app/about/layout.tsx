import type { Metadata } from 'next'

const title = 'Vision Solution 소개 | 중소기업 IT 파트너'
const description = '2020년 창업, 200+ 프로젝트 완료. 연락 두절 없는 IT 파트너. 48시간 안에 리포트로 먼저 드립니다.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ['비전솔루션', 'Vision Solution', '중소기업 IT', '홈페이지 제작 회사', 'IT 솔루션'],
  alternates: { canonical: '/about' },
  openGraph: {
    title,
    description,
    url: 'https://visionc.co.kr/about',
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

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
