import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '앱·시스템 개발 전문',
  description: '엑셀 한계를 시스템으로 해결합니다. 웹앱·모바일·백오피스 개발. 착수 전 전체 설계 공개.',
}

export default function AppDevLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
