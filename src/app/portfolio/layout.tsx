import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '작업 영역 · 포트폴리오',
  description: '2007년 설립, 누적 247건+ 프로젝트. 중소기업·공공기관 대상 그룹웨어·홈페이지·앱·AI 솔루션 전 영역. 산업과 서비스 영역을 한눈에 확인하세요.',
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
