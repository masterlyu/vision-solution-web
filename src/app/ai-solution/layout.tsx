import type { Metadata } from 'next'

const title = '중소기업 AI 솔루션 도입'
const description = '반복 업무를 AI가 대신합니다. 챗봇·자동화·보고서 생성. 100만원대부터 무료 업무 분석 제공.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['AI 챗봇', '중소기업 AI', 'AI 솔루션', '업무 자동화', 'AI 챗봇 도입', '비전솔루션'],
  alternates: { canonical: '/ai-solution' },
  openGraph: {
    title,
    description,
    url: 'https://visionc.co.kr/ai-solution',
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

export default function AiSolutionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
