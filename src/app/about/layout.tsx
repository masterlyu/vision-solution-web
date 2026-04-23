import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Vision Solution 소개 | 중소기업 IT 파트너' },
  description: '2020년 창업, 200+ 프로젝트 완료. 연락 두절 없는 IT 파트너. 48시간 안에 리포트로 먼저 드립니다.',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
