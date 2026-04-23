import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '홈페이지 제작 포트폴리오',
  description: '실제 의뢰인 사이트, 실제 수치. 리뉴얼 후 문의 3배, 이탈률 30% 감소. 제작 사례를 직접 확인하세요.',
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
