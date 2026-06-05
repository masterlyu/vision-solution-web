'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Mascot from '@/components/Mascot'

type MascotCategory = 'emotion' | 'situation' | 'company' | 'service' | 'process' | 'support' | 'ui' | 'misc'

const services = [
  { number: '01', mascot: { pose: 'ui_loading',   category: 'ui'      as MascotCategory }, href: '/ai-solution', title: '기업 AI 도입 및 컨설팅', stat: { value: '45강',   label: '사내 출강 강좌' }, price: { prefix: '시작가', value: '100만원~' }, desc: '컨설팅·구축·사내 출강 교육을 한 곳에서. LLM·자율 에이전트 도입부터 사내 인프라 구축까지.' },
  { number: '02', mascot: { pose: 'svc_security', category: 'service' as MascotCategory }, href: '/security',    title: '보안 진단',              stat: { value: '23개',  label: '평균 취약점 발견' }, price: { prefix: '시작가', value: '30만원~'  }, desc: 'SSL·보안헤더·취약점 자동 진단 + 4개 패키지(A~D)로 위생 패치부터 정기 모니터링까지.' },
  { number: '03', mascot: { pose: 'svc_hacker',   category: 'service' as MascotCategory }, href: '/pentest',     title: '모의해킹 진단',          stat: { value: '1~2일',  label: '소요 일수' },       price: { prefix: '단일가', value: '29만원'   }, desc: '실제 해커 관점의 시나리오 침투 + 권한·결제 우회 등 비즈니스 로직 결함 수동 검증.' },
  { number: '04', mascot: { pose: 'svc_renewal',  category: 'service' as MascotCategory }, href: '/renewal',     title: '웹사이트 리뉴얼·운영',   stat: { value: '67%',   label: '평균 로딩 개선' },  price: { prefix: '시작가', value: '80만원~'  }, desc: '오래된 사이트 속도·디자인·SEO 신규화 + 유지보수·운영.' },
  { number: '05', mascot: { pose: 'svc_custom',   category: 'service' as MascotCategory }, href: '/app-dev',     title: '앱·시스템 개발',         stat: { value: '120건+',label: '납품 실적' },        price: { prefix: '시작가', value: '300만원~' }, desc: '모바일 앱부터 사내 업무 시스템까지 풀스택 구축.' },
  { number: '06', mascot: { pose: 'cheer',        category: 'emotion' as MascotCategory }, href: '/chatbot',    title: '🤖 AI 챗봇 설치',       stat: { value: '월 5.9만~',label: '유지비' },          price: { prefix: '시작가', value: '50만원~'  }, desc: '반복 문의 70% 자동화 — 24시간 응대 + 정부 지원금 활용.' },
]

export function FeaturesSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="services" ref={ref} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">SERVICES</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">필요한 것만, 정확하게</h2>
          <p className="text-foreground/90 text-lg font-medium max-w-xl">중소기업 AI 도입부터 보안·웹·앱까지 단일 파트너로 해결합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <Link
              key={s.title}
              href={s.href}
              className={`group relative bg-card border border-border rounded-2xl p-8 flex flex-col gap-6
                hover:bg-primary hover:border-primary hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/30
                transition-all duration-300
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Number + Mascot row */}
              <div className="flex items-start justify-between">
                <span className="text-muted-foreground/40 text-sm font-mono group-hover:text-primary-foreground/50 transition-colors">
                  {s.number}
                </span>
                <Mascot
                  pose={s.mascot.pose}
                  category={s.mascot.category}
                  size="sm"
                  className="h-28 w-28 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                  alt={s.title}
                />
              </div>

              {/* Stat */}
              <div>
                <div className="text-3xl font-black text-primary mb-1 group-hover:text-primary-foreground transition-colors">
                  {s.stat.value}
                </div>
                <div className="text-muted-foreground text-xs group-hover:text-primary-foreground/70 transition-colors">
                  {s.stat.label}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-foreground font-bold text-lg group-hover:text-primary-foreground transition-colors">
                {s.title}
              </h3>

              {/* Price badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/[0.08] border border-primary/20 rounded-full text-sm font-semibold text-primary w-fit group-hover:bg-primary-foreground/20 group-hover:border-primary-foreground/30 group-hover:text-primary-foreground transition-all">
                <span className="text-[10px] font-medium text-muted-foreground group-hover:text-primary-foreground/70 transition-colors">
                  {s.price.prefix}
                </span>
                {s.price.value}
              </div>

              {/* Desc */}
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 group-hover:text-primary-foreground/80 transition-colors">
                {s.desc}
              </p>

              {/* CTA arrow */}
              <div className="flex items-center gap-1.5 text-primary text-sm font-semibold mt-auto group-hover:text-primary-foreground transition-all -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
                자세히 보기 <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
