import type { Metadata } from 'next'
import ServiceJsonLd from '@/components/ServiceJsonLd'

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
  return (
    <>
      <ServiceJsonLd
        name="홈페이지 보안 진단"
        description="중소기업 홈페이지 보안 진단. URL 입력 시 48시간 내 무료 보안 리포트 발송."
        url="https://visionc.co.kr/security"
        serviceType="웹 보안 진단"
        faqs={[
          { q: '보안 진단은 무료인가요?', a: 'URL만 입력하면 48시간 안에 무료 보안 진단 리포트를 받아보실 수 있습니다.' },
          { q: '어떤 항목을 점검하나요?', a: 'SSL 적용, 보안 헤더, 관리자 페이지 노출, 알려진 취약점 등 중소기업 홈페이지의 핵심 보안 요소를 점검합니다.' },
          { q: '작은 회사도 해킹 대상이 되나요?', a: '네. 국내 중소기업의 상당수가 기본 보안 요건을 갖추지 못해 자동화 공격의 표적이 됩니다.' },
        ]}
      />
      {children}
    </>
  )
}
