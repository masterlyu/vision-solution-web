import type { Metadata } from 'next'

const title = '홈페이지 보안 진단 · 패키지 A~D'
const description = '국내 중소기업 73%가 해킹 노출. URL 보안 셀프 점검 + 패키지 A~D (위생 패치~정기 모니터링). PDF 리포트 자동 발송.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['홈페이지 보안', '웹 보안 진단', '홈페이지 해킹 방지', '중소기업 보안', '보안 셀프 점검', '(주)비젼솔루션'],
  alternates: { canonical: '/security' },
  openGraph: {
    title,
    description,
    url: 'https://visionc.co.kr/security',
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

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
