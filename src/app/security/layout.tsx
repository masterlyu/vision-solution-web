import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '홈페이지 보안 취약점 무료 진단',
  description: '국내 중소기업 73%가 해킹 노출. URL 하나로 보안 취약점 무료 점검. 48시간 내 리포트 발송.',
}

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
