import type { Metadata } from 'next'

const title = '기업 AI 도입 및 컨설팅 — 무료 강좌 + 실행 컨설팅'
const description = '중소기업을 위한 LLM·자율 에이전트 도입 종합 가이드. 무료 강좌 45강(부서별 활용 15강 + 사내 구축 30강) + 도입 컨설팅 100만원대부터. Claude·OpenCode·Open WebUI·RAG·MCP 자율 에이전트 시대 대응.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    '기업 AI 도입',
    '중소기업 AI',
    'AI 컨설팅',
    '사내 AI 구축',
    'LLM 자체 호스팅',
    'Claude Code 기업',
    '부서별 AI 활용',
    'Open WebUI',
    'RAG',
    'MCP',
    '자율 에이전트',
    '중소기업 AI 마스터플랜',
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
