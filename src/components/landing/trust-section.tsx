'use client'
import { useEffect, useRef, useState } from 'react'
import { ShieldCheck, Clock, Wrench, Lock, Gift } from 'lucide-react'

const logosRow1 = [
  '○○테크', '△△유통', '□□쇼핑몰', '○○건설', '△△병원', '□□학원', '○○물류',
  '△△인테리어', '□□법무사', '○○식품', '△△컨설팅', '□□미디어', '○○부동산', '△△제조',
]

const logosRow2 = [
  '○○스튜디오', '△△프랜차이즈', '□□자동차', '○○세무사', '△△화장품', '□□헬스케어', '○○교육',
  '△△펫샵', '□□여행사', '○○금융', '△△패션', '□□농업', '○○출판', '△△스포츠',
]

const trustBadges = [
  { icon: ShieldCheck, label: '무료 진단 보장' },
  { icon: Clock,       label: '48h 리포트 발송' },
  { icon: Wrench,      label: '납품 후 30일 A/S' },
  { icon: Lock,        label: '개인정보 비침투 보장' },
  { icon: Gift,        label: '일정 초과 시 전액 환불' },
]

const fadeMask = {
  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
  maskImage:       'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
} as React.CSSProperties

export function TrustSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-secondary border-y border-border py-14 overflow-hidden">
      {/* Header row */}
      <div className={`max-w-[1400px] mx-auto px-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <p className="text-muted-foreground text-xs font-bold tracking-[0.18em] uppercase">
          TRUSTED BY CLIENTS
        </p>
        <p className="text-muted-foreground text-sm">
          누적 <span className="text-primary font-extrabold">247건+</span> 프로젝트 완료&nbsp;·&nbsp;
          고객 재의뢰율 <span className="text-primary font-extrabold">97%</span>
        </p>
      </div>

      {/* Marquee Row 1 — left */}
      <div className="overflow-hidden mb-3" style={fadeMask}>
        <div className="flex animate-[marqueeLeft_28s_linear_infinite] hover:[animation-play-state:paused]" style={{ width: 'max-content', gap: '12px' }}>
          {[...logosRow1, ...logosRow1].map((name, i) => (
            <div key={i} className="bg-card border border-border rounded-lg px-5 py-2.5 text-[13px] font-semibold text-muted-foreground whitespace-nowrap tracking-[0.02em]">
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — right */}
      <div className="overflow-hidden mb-10" style={fadeMask}>
        <div className="flex animate-[marqueeRight_22s_linear_infinite] hover:[animation-play-state:paused]" style={{ width: 'max-content', gap: '12px' }}>
          {[...logosRow2, ...logosRow2].map((name, i) => (
            <div key={i} className="bg-card border border-border rounded-lg px-5 py-2.5 text-[13px] font-semibold text-muted-foreground whitespace-nowrap tracking-[0.02em]">
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <div className={`max-w-[1400px] mx-auto px-6 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="flex flex-wrap justify-center gap-3">
          {trustBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 px-5 py-2.5 bg-secondary border border-border rounded-full text-sm font-bold text-foreground whitespace-nowrap hover:border-primary transition-colors">
              <Icon className="w-4 h-4 text-primary" strokeWidth={2.5} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
