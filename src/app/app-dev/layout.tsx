import type { Metadata } from 'next'
import ServiceJsonLd from '@/components/ServiceJsonLd'

const title = '앱·시스템 개발 전문'
const description = '엑셀 한계를 시스템으로 해결합니다. 웹앱·모바일·백오피스 개발. 착수 전 전체 설계 공개.'

export const metadata: Metadata = {
  title,
  description,
  keywords: ['앱 개발', '모바일 앱 개발', '앱 개발 비용', '외주 앱 개발', '중소기업 시스템 개발', '(주)비젼솔루션'],
  alternates: { canonical: '/app-dev' },
  openGraph: {
    title,
    description,
    url: 'https://visionc.co.kr/app-dev',
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

export default function AppDevLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceJsonLd
        name="앱·시스템 개발"
        description="중소기업 맞춤 업무 자동화 시스템·사내 도구·모바일/웹 앱 개발."
        url="https://visionc.co.kr/app-dev"
        serviceType="맞춤 앱·업무 시스템 개발"
        faqs={[
          { q: '어떤 개발을 하나요?', a: '업무 자동화 시스템, 사내 도구, 모바일·웹 앱 등 중소기업 맞춤 개발을 합니다.' },
          { q: '엑셀로 관리하던 업무도 시스템으로 바꿀 수 있나요?', a: '네. 엑셀 기반 수작업을 시스템·자동화로 전환하는 프로젝트를 다수 진행했습니다.' },
          { q: '정부 지원금으로 개발할 수 있나요?', a: '일부 사업은 정부 지원사업과 연계가 가능합니다. 상담 시 안내드립니다.' },
        ]}
      />
      {children}
    </>
  )
}
