import Link from 'next/link'

const types = [
  { icon: '📱', title: '모바일 앱 (iOS/Android)', desc: '네이티브 또는 크로스플랫폼(React Native/Flutter) 개발' },
  { icon: '🌐', title: '웹 앱 (SPA/PWA)', desc: 'React·Next.js 기반 고성능 웹 애플리케이션' },
  { icon: '🏢', title: '사내 업무 시스템', desc: 'ERP·CRM·재고관리·결재 시스템 맞춤 구축' },
  { icon: '🛒', title: '커머스/예약 플랫폼', desc: '결제·배송·예약·회원 관리 통합 구축' },
  { icon: '🔗', title: 'API/백엔드 개발', desc: 'REST·GraphQL API, 외부 서비스 연동' },
  { icon: '☁️', title: '클라우드 인프라', desc: 'AWS·GCP·Vercel 배포, CI/CD 자동화 구성' },
]

export default function AppDevPage() {
  return (
    <div className="section min-h-screen pt-24">
      <div className="container-base">
        <div className="text-center mb-16">
          <span className="label">APP DEVELOPMENT</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">앱·시스템 개발</h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            아이디어를 실제로 만들어 드립니다.<br />
            모바일 앱부터 엔터프라이즈 시스템까지 풀스택으로 구축합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {types.map(t => (
            <div key={t.title} className="card hover:border-brand/40">
              <div className="text-3xl mb-4">{t.icon}</div>
              <h3 className="text-white font-bold mb-2">{t.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="card border-brand/20 bg-brand/5">
            <div className="stat-num mb-2">3년+</div>
            <div className="text-neutral-400 text-sm">평균 개발 경력</div>
          </div>
          <div className="card border-brand/20 bg-brand/5">
            <div className="stat-num mb-2">120건+</div>
            <div className="text-neutral-400 text-sm">앱/시스템 납품</div>
          </div>
          <div className="card border-brand/20 bg-brand/5">
            <div className="stat-num mb-2">NDA</div>
            <div className="text-neutral-400 text-sm">기밀 보호 계약 기본 제공</div>
          </div>
        </div>

        <div className="card border-brand/20 bg-brand/5 text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-3">개발 비용이 궁금하세요?</h2>
          <p className="text-neutral-400 mb-6">기능 명세를 공유해 주시면 2일 내 상세 견적을 드립니다.</p>
          <Link href="/contact" className="btn-red">개발 문의하기</Link>
        </div>
      </div>
    </div>
  )
}
