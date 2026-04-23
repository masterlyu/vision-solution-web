import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '중소기업 AI 솔루션 도입',
  description: '반복 업무를 AI가 대신합니다. 챗봇·자동화·보고서 생성. 100만원대부터 무료 업무 분석 제공.',
}

export default function AiSolutionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
