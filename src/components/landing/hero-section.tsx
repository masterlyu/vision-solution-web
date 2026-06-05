'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

const AsciiScene = dynamic(
  () => import('@/components/landing/ascii-scene').then(m => ({ default: m.AsciiScene })),
  { ssr: false, loading: () => null }
)

// 페인 포인트 → AI 도입 — 회사가 매일 잃고 있는 것
const words = ['낭비하고', '놓치고', '뒤처지고', '늦어지고']

function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = word.split('')
  const STAGGER = 55
  const DURATION = 500
  const [letterStates, setLetterStates] = useState(letters.map(() => ({ opacity: 0, blur: 20 })))
  const frames = useRef<number[]>([])
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    frames.current.forEach(cancelAnimationFrame)
    timers.current.forEach(clearTimeout)
    frames.current = []; timers.current = []
    setLetterStates(letters.map(() => ({ opacity: 0, blur: 20 })))

    letters.forEach((_, i) => {
      const t = setTimeout(() => {
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / DURATION, 1)
          const e = 1 - Math.pow(1 - p, 3)
          setLetterStates(prev => { const n = [...prev]; n[i] = { opacity: e, blur: 20 * (1 - e) }; return n })
          if (p < 1) { const id = requestAnimationFrame(tick); frames.current.push(id) }
        }
        const id = requestAnimationFrame(tick); frames.current.push(id)
      }, i * STAGGER)
      timers.current.push(t)
    })
    return () => { frames.current.forEach(cancelAnimationFrame); timers.current.forEach(clearTimeout) }
  }, [trigger])

  return (
    <span className="inline-flex">
      {letterStates.map((s, i) => (
        <span key={i} style={{ opacity: s.opacity, filter: `blur(${s.blur}px)`, display: 'inline-block' }}>
          {letters[i]}
        </span>
      ))}
    </span>
  )
}

export function HeroSection() {
  const [wordIdx, setWordIdx] = useState(0)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setWordIdx(i => (i + 1) % words.length)
      setTrigger(t => t + 1)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <AsciiScene />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background z-[1]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/15 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          기업 AI 도입 · 컨설팅 · 사내 출강
        </div>

        {/* Hero — 페인 포인트 (AI 도입 안 하면 매일 잃는 것) */}
        <h1 className="text-5xl md:text-7xl lg:text-[88px] font-black tracking-tight text-foreground leading-[1.05] mb-6">
          중소기업은 지금도<br />
          <BlurWord word={words[wordIdx]} trigger={trigger} /><br />
          있습니다
        </h1>

        <p className="text-lg md:text-xl text-foreground/90 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
          직원이 매일 2시간씩 반복 업무를 합니다.<br />
          AI 도입으로 <b className="text-primary">시간 35% · 비용 42% 절감</b>하세요.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"
            className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base gap-2 shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all">
            <Link href="/contact">💼 도입 상담 신청 <ArrowRight className="w-4 h-4" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline"
            className="h-14 px-7 rounded-full border-2 border-primary text-primary hover:bg-primary/10 font-bold text-base gap-2 transition-all">
            <Link href="/academy"><GraduationCap className="w-4 h-4" /> 사내 출강 강좌 보기</Link>
          </Button>
        </div>
        <p className="text-foreground/85 text-sm font-medium mt-4">100만원대부터 시작 · 도입 사례 247건+ · 재의뢰율 97%</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-foreground/0 to-foreground/30" />
      </div>
    </section>
  )
}
