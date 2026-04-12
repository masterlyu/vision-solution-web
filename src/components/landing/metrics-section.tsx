'use client'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 247, suffix: '건+', label: '누적 진단 완료', desc: '국내 중소기업 사이트' },
  { value: 23,  suffix: '개',  label: '평균 발견 취약점', desc: '보안 진단 기준' },
  { value: 48,  suffix: 'h',   label: '리포트 발송 기한', desc: '영업일 기준' },
  { value: 97,  suffix: '%',   label: '고객 재의뢰율', desc: '서비스 만족도 기반' },
]

function Counter({ end, suffix }: { end: number; suffix: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let cur = 0
      const step = Math.ceil(end / 60)
      const t = setInterval(() => { cur = Math.min(cur + step, end); setVal(cur); if (cur >= end) clearInterval(t) }, 24)
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end])
  return <span ref={ref}>{val}{suffix}</span>
}

export function MetricsSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 border-y border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <div key={s.label} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="text-5xl lg:text-6xl font-black text-primary mb-2 tabular-nums">
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <div className="text-foreground font-semibold mb-1">{s.label}</div>
              <div className="text-muted-foreground text-sm">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
