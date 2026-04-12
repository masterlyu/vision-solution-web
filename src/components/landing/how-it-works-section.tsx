'use client'
import { useEffect, useRef, useState } from 'react'

const steps = [
  { number: '01', title: 'URL 입력', desc: '분석할 사이트 주소와 결과를 받을 이메일만 입력하세요. 30초면 됩니다.', detail: '신용카드 불필요 · 가입 없음' },
  { number: '02', title: 'AI 자동 분석', desc: '성능·보안·디자인·SEO를 AI가 동시에 점검합니다.', detail: 'PageSpeed · Core Web Vitals · SSL · 보안헤더' },
  { number: '03', title: '리포트 생성', desc: '발견된 문제와 개선 제안을 PDF로 정리합니다.', detail: '위험도 분류 · 우선순위 조치 가이드' },
  { number: '04', title: '이메일 발송', desc: '48시간 내 결과를 이메일로 받아보세요.', detail: '영업일 기준 1~2일' },
  { number: '05', title: '1:1 상담', desc: '결과 기반으로 맞춤 솔루션을 제안드립니다.', detail: '무료 · 부담 없음' },
]

export function HowItWorksSection() {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % steps.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="process" ref={ref} className="py-24 lg:py-32 bg-card/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">PROCESS</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground">URL 입력 하나로<br />전부 해결됩니다</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-2">
            {steps.map((s, i) => (
              <button key={s.number} onClick={() => setActive(i)}
                className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${active === i ? 'bg-primary/10 border-primary/40' : 'bg-transparent border-transparent hover:border-border'}`}>
                <div className="flex items-start gap-4">
                  <span className={`font-mono text-sm transition-colors ${active === i ? 'text-primary' : 'text-muted-foreground/40'}`}>{s.number}</span>
                  <div>
                    <h3 className={`font-bold mb-1 transition-colors ${active === i ? 'text-foreground' : 'text-muted-foreground'}`}>{s.title}</h3>
                    {active === i && (
                      <div className="mt-2 space-y-1">
                        <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                        <p className="text-primary/70 text-xs font-mono">{s.detail}</p>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="relative h-80 lg:h-96 rounded-2xl bg-card border border-border overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl font-black text-primary/10 mb-4">{steps[active].number}</div>
              <h3 className="text-2xl font-black text-foreground mb-2">{steps[active].title}</h3>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">{steps[active].desc}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
