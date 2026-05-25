import type { Metadata } from 'next'

const title = '홈페이지 유지보수 월정액'
const description = '월 99,000원으로 보안·수정·장애 대응 한 번에. 방치된 홈페이지가 해킹 표적. 지금 무료 점검.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['홈페이지 유지보수', '홈페이지 유지보수 비용', '웹사이트 관리', '홈페이지 월정액', '비전솔루션'],
  alternates: { canonical: '/maintenance' },
  openGraph: {
    title,
    description,
    url: 'https://visionc.co.kr/maintenance',
    siteName: 'Vision Solution',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: title }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/api/og'],
  },
}

export default function MaintenanceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
