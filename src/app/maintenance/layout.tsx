import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '홈페이지 유지보수 월정액',
  description: '월 99,000원으로 보안·수정·장애 대응 한 번에. 방치된 홈페이지가 해킹 표적. 지금 무료 점검.',
}

export default function MaintenanceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
