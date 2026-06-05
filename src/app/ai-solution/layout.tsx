import type { Metadata } from 'next'

const title = '기업 AI 도입 및 컨설팅'
const description = '중소기업을 위한 AI 도입 컨설팅·구축·사내 출강 서비스. 챗봇·자동화·데이터 분석부터 사내 LLM 인프라·자율 에이전트까지 100만원대부터.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    '기업 AI 도입',
    '중소기업 AI',
    'AI 컨설팅',
    '사내 AI 구축',
    '사내 출강',
    'AI 도입 강좌',
    'LLM 자체 호스팅',
    'Claude Code 기업',
    '자율 에이전트',
    '(주)비젼솔루션',
  ],
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
