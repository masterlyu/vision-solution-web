import type { Metadata } from 'next'

const title = '회사 소개 — AI 도입 동반자 | Vision Solution'
const description = '2007년 설립, 누적 247건+ 프로젝트. 중소기업 AI 도입·컨설팅·사내 출강 교육·구축·운영을 한 곳에서. 부서별 LLM 활용부터 사내 인프라 구축까지.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ['(주)비젼솔루션', 'Vision Solution', '중소기업 AI 도입', 'AI 컨설팅', 'AI 사내 출강', 'visionc Enterprise Academy', 'LLM 도입', 'IT 솔루션'],
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
