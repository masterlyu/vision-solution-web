import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '홈페이지 신규 제작 전문',
  description: '문의 오는 홈페이지를 처음부터 설계합니다. SEO·전환율·모바일 최적화 포함. 300만원대부터 시작.',
}

export default function NewWebsiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
