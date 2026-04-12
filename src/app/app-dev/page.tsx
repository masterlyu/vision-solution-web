import Link from 'next/link'
import { Smartphone, Globe, Building2, ShoppingCart, Link2, Cloud } from 'lucide-react'

const types = [
  { icon: Smartphone,   title: '모바일 앱 (iOS/Android)', desc: '네이티브 또는 크로스플랫폼(React Native/Flutter) 개발' },
  { icon: Globe,        title: '웹 앱 (SPA/PWA)',          desc: 'React·Next.js 기반 고성능 웹 애플리케이션' },
  { icon: Building2,    title: '사내 업무 시스템',          desc: 'ERP·CRM·재고관리·결재 시스템 맞춤 구축' },
  { icon: ShoppingCart, title: '커머스/예약 플랫폼',        desc: '결제·배송·예약·회원 관리 통합 구축' },
  { icon: Link2,        title: 'API/백엔드 개발',           desc: 'REST·GraphQL API, 외부 서비스 연동' },
  { icon: Cloud,        title: '클라우드 인프라',           desc: 'AWS·GCP·Vercel 배포, CI/CD 자동화 구성' },
]

export default function AppDevPage() {
  return (
    <div className="section min-h-screen pt-28 bg-[#09090B]">
      <div className="container-base">
        <div className="text-center mb-16">
          <span className="label">APP DEVELOPMENT</span>
          <h1 className="section-title">앱·시스템 개발</h1>
          <p className="section-sub max-w-2xl mx-auto">
            아이디어를 실제로 만들어 드립니다.<br />모바일 앱부터 엔터프라이즈 시스템까지 풀스택으로 구축합니다.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {types.map(t => (
            <div key={t.title} className="card group">
              <div className="icon-box"><t.icon className="w-5 h-5 text-brand" strokeWidth={1.5} /></div>
              <h3 className="text-white font-bold mb-2">{t.title}</h3>
              <p className="text-neutral-300 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { num: '3년+', label: '평균 개발 경력' },
            { num: '120건+', label: '앱/시스템 납품' },
            { num: 'NDA', label: '기밀 보호 계약 기본 제공' },
          ].map(s => (
            <div key={s.label} className="card-highlight text-center py-8">
              <div className="stat-num mb-2">{s.num}</div>
              <div className="text-neutral-300 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="card-highlight text-center py-12">
          <h2 className="text-xl font-bold text-white mb-3">개발 비용이 궁금하세요?</h2>
          <p className="text-neutral-300 mb-6 text-sm">기능 명세를 공유해 주시면 2일 내 상세 견적을 드립니다.</p>
          <Link href="/contact" className="btn-primary">개발 문의하기</Link>
        </div>
      </div>
    </div>
  )
}
