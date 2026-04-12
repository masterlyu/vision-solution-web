import Link from 'next/link'
import { Shield, RefreshCw, HeadphonesIcon, Bell, ArrowRight } from 'lucide-react'

const features = [
  { icon: Shield,           title: '보안 패치',        desc: '플러그인·프레임워크 취약점 업데이트. 해킹 피해 사전 차단' },
  { icon: RefreshCw,        title: '콘텐츠 업데이트',  desc: '텍스트·이미지·메뉴 수정. 요청 후 영업일 1일 내 처리' },
  { icon: HeadphonesIcon,   title: '장애 대응',         desc: '사이트 다운·오류 발생 시 즉시 원인 파악 및 복구' },
  { icon: Bell,             title: '모니터링',          desc: '24시간 업타임 모니터링. 장애 발생 시 즉시 알림' },
]

const plans = [
  {
    name: 'Basic',
    price: '월 99,000원',
    items: ['월 3회 콘텐츠 수정', '보안 패치 월 1회', '이메일 지원', '월간 리포트'],
  },
  {
    name: 'Standard',
    price: '월 199,000원',
    items: ['무제한 콘텐츠 수정', '보안 패치 즉시 적용', '카카오톡 채널 지원', '주간 리포트', '업타임 모니터링'],
    highlight: true,
  },
  {
    name: 'Premium',
    price: '월 399,000원',
    items: ['무제한 수정', '24시간 모니터링', '전화·카톡 우선 지원', '월간 성과 리포트', '소규모 기능 추가 포함'],
  },
]

export default function MaintenancePage() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="mb-16">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">MAINTENANCE</p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">유지보수</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            사이트는 만든 후가 더 중요합니다.<br />
            보안·콘텐츠·장애를 한 파트너가 책임집니다.
          </p>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6">포함 서비스</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(f => (
              <div key={f.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-200 group">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all">
                  <f.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-foreground font-bold mb-1">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6">요금제</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map(plan => (
              <div key={plan.name} className={`rounded-2xl p-8 border transition-all duration-200 ${
                plan.highlight
                  ? 'bg-primary/10 border-primary/40 relative'
                  : 'bg-card border-border hover:border-primary/30'
              }`}>
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">추천</span>
                )}
                <h3 className="text-foreground text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-primary font-bold text-lg mb-6">{plan.price}</p>
                <ul className="space-y-3">
                  {plan.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-card border border-border rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-foreground text-2xl font-bold mb-2">어떤 플랜이 맞는지 먼저 상담하세요</h3>
            <p className="text-muted-foreground text-sm">현재 사이트 상황에 맞는 플랜을 안내해드립니다.</p>
          </div>
          <Link href="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 text-sm">
            무료 상담 신청 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  )
}
