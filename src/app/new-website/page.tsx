import Link from 'next/link'
import { Layout, ShoppingCart, Globe, Rocket, ArrowRight } from 'lucide-react'

const types = [
  { icon: Layout,       title: '브랜드 사이트',    desc: '회사·브랜드 소개, 포트폴리오, 채용 등 기업 대표 웹사이트' },
  { icon: ShoppingCart, title: '쇼핑몰·커머스',    desc: '상품 진열, 결제, 재고 관리까지 풀스택 커머스 구축' },
  { icon: Globe,        title: '서비스 플랫폼',    desc: '예약, 커뮤니티, 멤버십 등 기능 중심 서비스형 웹사이트' },
  { icon: Rocket,       title: '랜딩페이지',        desc: '광고 전환 최적화. A/B 테스트 가능한 단일 목적 페이지' },
]

const stack = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel']

const process = [
  { step: '01', title: '요구사항 정의', desc: '목적·타겟·기능 목록 확정. 일정·예산 협의' },
  { step: '02', title: '기획·디자인',   desc: '사이트맵, 와이어프레임, 디자인 시안 3종' },
  { step: '03', title: '개발',           desc: '프론트엔드·백엔드 풀스택 개발 + 관리자 페이지' },
  { step: '04', title: '배포·인수인계', desc: '서버 세팅, 도메인 연결, 운영 가이드 제공' },
]

export default function NewWebsitePage() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="mb-16">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">NEW WEBSITE BUILD</p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">신규 사이트 구축</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            처음부터 제대로 만듭니다.<br />
            목적에 맞는 구조·디자인·기술 스택으로 빠르게 론칭합니다.
          </p>
        </div>

        {/* Types */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6">구축 유형</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {types.map(t => (
              <div key={t.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-200 group">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all">
                  <t.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-foreground font-bold mb-1">{t.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6">기술 스택</h2>
          <div className="flex flex-wrap gap-3">
            {stack.map(s => (
              <span key={s} className="bg-primary/10 border border-primary/20 text-primary text-sm font-medium px-4 py-2 rounded-full">
                {s}
              </span>
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
            <h3 className="text-foreground text-2xl font-bold mb-2">어떤 사이트가 필요한지 말씀해주세요</h3>
            <p className="text-muted-foreground text-sm">요구사항 정리부터 함께 도와드립니다. 견적은 무료입니다.</p>
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
