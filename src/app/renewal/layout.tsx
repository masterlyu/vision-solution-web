import type { Metadata } from 'next'
import ServiceJsonLd from '@/components/ServiceJsonLd'

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
  return (
    <>
      <ServiceJsonLd
        name="웹사이트 리뉴얼·운영"
        description="신규 홈페이지 제작부터 리뉴얼·운영까지. URL 입력 시 무료 진단 후 견적 안내."
        url="https://visionc.co.kr/renewal"
        serviceType="홈페이지 제작·리뉴얼·운영"
        faqs={[
          { q: '신규 제작과 리뉴얼 둘 다 되나요?', a: '네. 신규 홈페이지 제작부터 기존 사이트 리뉴얼·운영까지 한 곳에서 진행합니다.' },
          { q: '리뉴얼 비용은 어떻게 되나요?', a: '규모와 요건에 따라 다르며, URL 입력 시 무료 진단 후 견적을 안내드립니다.' },
          { q: '운영·유지보수도 맡길 수 있나요?', a: '네. 발행 이후 유지보수와 운영 대행 서비스를 제공합니다.' },
        ]}
      />
      {children}
    </>
  )
}
