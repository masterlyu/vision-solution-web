import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '홈페이지 리뉴얼 비용·기간 총정리',
  description: '낡은 홈페이지 때문에 고객이 떠납니다. URL 입력 후 48시간 내 무료 진단. 리뉴얼 비용 투명 공개.',
}

export default function RenewalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
