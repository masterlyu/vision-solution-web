import type { Metadata } from 'next'
import ServiceJsonLd from '@/components/ServiceJsonLd'

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
  return (
    <>
      <ServiceJsonLd
        name="기업 AI 도입 및 컨설팅"
        description="중소기업 AI 도입 컨설팅·구축·사내 출강 교육. 100만원대부터, 무료 분석 후 맞춤 설계."
        url="https://visionc.co.kr/ai-solution"
        serviceType="AI 도입 컨설팅·구축·교육"
        faqs={[
          { q: 'AI 도입 비용은 얼마부터인가요?', a: '100만원대부터 시작하며, 무료 분석 후 회사 상황에 맞춰 설계합니다.' },
          { q: '어떤 과정으로 진행되나요?', a: '무료 AI 도입 분석(1일) → 솔루션 설계(1주) → 구축·학습(2~6주) → 인수인계와 30일 A/S 순으로 진행합니다.' },
          { q: '직원 교육(사내 출강)도 가능한가요?', a: '네. 부서별로 일하는 AI 등 실무 중심 사내 출강 교육을 제공합니다.' },
        ]}
      />
      {children}
    </>
  )
}
