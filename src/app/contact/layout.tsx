import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '무료 상담 문의',
  description: '홈페이지·앱개발·보안·AI 솔루션 무료 상담. 영업일 기준 48시간 내 답변. 부담 없는 첫 접점.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
