// 서비스 페이지용 구조화 데이터 (Service + FAQPage) — 구글 리치결과·LLM Q&A 노출
type FAQ = { q: string; a: string }

export default function ServiceJsonLd({
  name, description, url, serviceType, faqs,
}: {
  name: string
  description: string
  url: string
  serviceType: string
  faqs: FAQ[]
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
