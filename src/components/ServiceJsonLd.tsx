// 서비스 페이지용 구조화 데이터 (Service + FAQPage) — 구글 리치결과·LLM Q&A 노출
type FAQ = { q: string; a: string }

export default function ServiceJsonLd({
  name, description, url, serviceType, faqs, offers,
}: {
  name: string
  description: string
  url: string
  serviceType: string
  faqs: FAQ[]
  offers?: { price: string; priceCurrency?: string }
}) {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description,
      serviceType,
      url,
      provider: { '@type': 'Organization', name: '(주)비젼솔루션', url: 'https://visionc.co.kr' },
      areaServed: { '@type': 'Country', name: '대한민국' },
      ...(offers && { offers: { '@type': 'Offer', price: offers.price, priceCurrency: offers.priceCurrency || 'KRW', url, availability: 'https://schema.org/InStock' } }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}
