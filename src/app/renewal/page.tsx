import Link from 'next/link'
import { Zap, BarChart2, Smartphone, Search, ArrowRight, CheckCircle } from 'lucide-react'

const features = [
  { icon: Zap,         title: '속도 최적화',      desc: 'Core Web Vitals 기준 LCP 2.5초 이내, CLS 0.1 이하 달성' },
  { icon: BarChart2,   title: '전환율 설계',       desc: '방문자가 자연스럽게 문의·구매로 이어지는 UX 흐름 재설계' },
  { icon: Smartphone,  title: '모바일 퍼스트',     desc: '모바일 트래픽 기준 완벽한 반응형. iOS/Android 교차 검증' },
  { icon: Search,      title: 'SEO 구조 개편',     desc: '시맨틱 마크업, 메타 최적화, sitemap 자동 생성으로 검색 노출 개선' },
]

const process = [
  { step: '01', title: '현황 진단',     desc: '현재 사이트 속도·SEO·UX 분석 리포트 제공' },
  { step: '02', title: '기획·설계',     desc: '사이트맵, 와이어프레임, 디자인 시안 3종 제시' },
  { step: '03', title: '개발·이전',     desc: '데이터 손실 없이 기존 콘텐츠 마이그레이션' },
  { step: '04', title: '검수·배포',     desc: '크로스 브라우저 QA 후 도메인 무중단 전환' },
]

export default function RenewalPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="mb-16">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">WEBSITE RENEWAL</p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">홈페이지 리뉴얼</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            낡은 사이트가 기회를 막고 있습니다.<br />
            속도·디자인·SEO를 한 번에 바꿔 문의량을 끌어올립니다.
          </p>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6">개선 항목</h2>
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

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6">진행 프로세스</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map(p => (
              <div key={p.step} className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-200">
                <span className="text-primary text-xs font-bold tracking-widest">{p.step}</span>
                <h3 className="text-foreground font-bold mt-2 mb-1">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-card border border-border rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-foreground text-2xl font-bold mb-2">지금 사이트를 진단해보세요</h3>
            <p className="text-muted-foreground text-sm">현재 사이트의 문제점을 무료로 분석해 드립니다.</p>
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
