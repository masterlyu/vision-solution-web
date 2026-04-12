import Link from 'next/link'
import { Smartphone, Database, Cpu, GitBranch, ArrowRight } from 'lucide-react'

const services = [
  { icon: Smartphone, title: '모바일 앱',        desc: 'iOS·Android 크로스플랫폼 앱. React Native 기반으로 단일 코드베이스 운영' },
  { icon: Database,   title: '사내 시스템',      desc: 'ERP, CRM, 재고·주문 관리 등 업무 효율화 내부 시스템 개발' },
  { icon: Cpu,        title: 'API·백엔드',        desc: 'REST / GraphQL API, 인증, 결제 연동, 외부 서비스 통합' },
  { icon: GitBranch,  title: '레거시 전환',       desc: '구형 시스템을 현대적 스택으로 단계적 이전. 무중단 마이그레이션' },
]

const stack = ['React Native', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Redis', 'AWS', 'Docker']

const process = [
  { step: '01', title: '요구사항 분석', desc: '기능 목록, 사용자 흐름, 데이터 모델 정의' },
  { step: '02', title: '아키텍처 설계', desc: '기술 스택 선정, ERD, API 명세서 작성' },
  { step: '03', title: '스프린트 개발', desc: '2주 단위 스프린트. 진행 상황 실시간 공유' },
  { step: '04', title: '배포·운영 이전', desc: '스테이징 검증 → 프로덕션 배포 → 운영 가이드' },
]

export default function AppDevPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="mb-16">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">APP & SYSTEM DEVELOPMENT</p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">앱·시스템 개발</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            홈페이지를 넘어 비즈니스 코어를 개발합니다.<br />
            모바일 앱부터 사내 시스템까지 풀스택으로 구축합니다.
          </p>
        </div>

        {/* Services */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-6">개발 영역</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map(s => (
              <div key={s.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-200 group">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all">
                  <s.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-foreground font-bold mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
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
          <h2 className="text-xl font-bold text-foreground mb-6">개발 프로세스</h2>
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
            <h3 className="text-foreground text-2xl font-bold mb-2">어떤 시스템이 필요한지 말씀해주세요</h3>
            <p className="text-muted-foreground text-sm">아이디어 단계부터 기술 검토를 도와드립니다.</p>
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
