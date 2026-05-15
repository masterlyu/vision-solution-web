import type { Metadata } from 'next'
import { HeroSection } from '@/components/landing/hero-section'
import { TrustSection } from '@/components/landing/trust-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { HowItWorksSection } from '@/components/landing/how-it-works-section'
import { MetricsSection } from '@/components/landing/metrics-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { CtaSection } from '@/components/landing/cta-section'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  other: {
    'naver-site-verification': '5e338ebf5eb269300d0aa61912fa52da896002b4',
  },
  openGraph: {
    title: '홈페이지 무료 AI 진단 | Vision Solution',
    description: '고객이 지금도 떠나고 있습니까? URL 하나로 48시간 내 AI 진단. 무료 리포트를 지금 신청하세요.',
    url: 'https://visionc.co.kr',
    siteName: 'Vision Solution',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vision Solution 홈페이지 무료 AI 진단' }],
    locale: 'ko_KR',
    type: 'website',
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Vision Solution',
  alternateName: '비젼솔루션',
  url: 'https://visionc.co.kr',
  logo: 'https://visionc.co.kr/logo.svg',
  description: '홈페이지 무료 AI 진단 전문. 리뉴얼·보안·AI 솔루션 원스톱 제공.',
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
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <HeroSection />
      <TrustSection />
      <MetricsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  )
}
