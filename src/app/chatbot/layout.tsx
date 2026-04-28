import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI 챗봇 설치 서비스 | 코드 2줄로 5분 완성',
  description: '직원 월급의 1/10 비용으로 24시간 고객 응대. 코드 2줄 붙여넣기만 하면 내일부터 챗봇이 일합니다. WordPress·Cafe24·Shopify 어디든 설치 가능.',
  openGraph: {
    title: '코드 2줄로 5분 만에 AI 챗봇 설치 | VISIONC',
    description: '자는 동안에도 AI가 고객 문의를 대신 받습니다. 월 29,000원부터, 최소 계약 기간 없음.',
  },
}

export default function ChatbotLayout({ children }: { children: React.ReactNode }) {
  return children
}
