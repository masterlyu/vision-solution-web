'use client'
import { useEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'

const reviews = [
  { quote: 'URL 하나 입력했을 뿐인데 48시간 만에 PDF 리포트가 왔습니다. 경쟁사 대비 우리 사이트가 얼마나 뒤처져 있는지 처음으로 수치로 확인했어요. 바로 리뉴얼 진행했습니다.', name: '이정호', role: '○○테크 대표', stars: 5 },
  { quote: '보안 진단 결과 취약점이 19개나 나왔어요. 무서웠지만 조치 가이드가 명확해서 개발자와 같이 2주 만에 다 해결했습니다. 비용 대비 효과가 확실합니다.', name: '박수연', role: '○○유통 IT 담당자', stars: 5 },
  { quote: 'AI 챗봇 도입 후 CS 문의의 80%가 자동으로 처리됩니다. 직원 1명이 다른 업무에 집중할 수 있게 됐어요. 중소기업도 충분히 도입할 수 있습니다.', name: '김태준', role: '○○쇼핑몰 운영팀장', stars: 5 },
]

export function TestimonialsSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">TESTIMONIALS</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground">실제 고객 후기</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={r.name} className={`bg-card border border-border rounded-2xl p-8 flex flex-col gap-6 transition-all duration-700 hover:border-primary/40 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="flex gap-1">
                {Array.from({ length: r.stars }).map((_, j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">"{r.quote}"</p>
              <div>
                <div className="text-foreground font-bold text-sm">{r.name}</div>
                <div className="text-muted-foreground text-xs mt-0.5">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
