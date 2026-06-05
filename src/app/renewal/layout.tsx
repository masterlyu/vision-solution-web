import type { Metadata } from 'next'

const title = '홈페이지 리뉴얼·운영 비용·기간 총정리'
const description = '낡은 홈페이지 때문에 고객이 떠납니다. URL 입력 시 자동 분석 리포트 발송 + 월정액 운영 플랜. 리뉴얼·유지보수 비용 투명 공개.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['홈페이지 리뉴얼', '홈페이지 리뉴얼 비용', '중소기업 홈페이지 리뉴얼', '홈페이지 리뉴얼 기간', '(주)비젼솔루션'],
  alternates: { canonical: '/renewal' },
  openGraph: {
    title,
    description,
    url: 'https://visionc.co.kr/renewal',
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

export default function RenewalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
