import type { Metadata } from 'next'
import { HeroSection } from '@/components/landing/hero-section'
import { TrustSection } from '@/components/landing/trust-section'
import MascotVideo from '@/components/MascotVideo'
import { FeaturesSection } from '@/components/landing/features-section'
import { HowItWorksSection } from '@/components/landing/how-it-works-section'
import { MetricsSection } from '@/components/landing/metrics-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { CtaSection } from '@/components/landing/cta-section'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  other: {
    'naver-site-verification': 'd5eec5a3e6bf5f5921677ffbab525a72c2e739fb',
    'google-site-verification': 'yNCeYe0TkxzUW9w-HxVyRezpq5bQ2bQTuvOjH6ll35c',
    'msvalidate.01': '1281BA50FBC745CBC96CB5F4040590D2',
  },
  openGraph: {
    title: '기업 AI 도입 동반자 | Vision Solution',
    description: '중소기업 AI 도입 동반자. 컨설팅·구축·사내 출강 교육·보안·웹·앱 개발을 한 곳에서. 누적 247건+ 프로젝트.',
    url: 'https://visionc.co.kr',
    siteName: 'Vision Solution',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vision Solution 기업 AI 도입 동반자' }],
    locale: 'ko_KR',
    type: 'website',
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Vision Solution',
  alternateName: '(주)비젼솔루션',
  url: 'https://visionc.co.kr',
  logo: 'https://visionc.co.kr/logo.svg',
  description: '중소기업 AI 도입 동반자. 컨설팅·구축·사내 출강 교육·보안·웹·앱 개발 원스톱. 누적 247건+ 프로젝트.',
  email: 'biztalktome@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '동양로 10',
    addressLocality: '계양구',
    addressRegion: '인천광역시',
    addressCountry: 'KR',
  },
  areaServed: 'KR',
  serviceType: ['홈페이지 제작', '홈페이지 리뉴얼', '웹 보안 진단', 'AI 솔루션'],
  priceRange: '₩₩',
  knowsAbout: ['웹개발', '홈페이지 제작', '보안 진단', 'AI 솔루션', '앱 개발'],
  sameAs: [],
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <HeroSection />
      <div className="flex justify-center py-8 bg-background">
        <MascotVideo src="/mascot/lg/company/cat_bow_web.mp4" className="h-52 w-auto" pauseSeconds={3} />
      </div>
      <TrustSection />
      <MetricsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  )
}
