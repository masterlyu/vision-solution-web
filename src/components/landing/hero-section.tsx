'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AsciiScene } from '@/components/landing/ascii-scene'

// Primary A/B 후보 (현재 적용): 고객 이탈 고통 → 공감 즉시
const words = ['이탈하고', '포기하고', '외면하고', '떠나고']

// A/B 후보 B: 광고비 낭비 고통
// const words = ['광고비가', '기회가', '고객이', '매출이']
// H1: "매달 [광고비가/기회가/고객이/매출이] 사라지는 이유"
// Sub: "홈페이지가 광고비를 낭비하는지, AI가 48시간 안에 알려드립니다."

// A/B 후보 C: 3초 법칙 고통
// H1: "당신 홈페이지, / 3초 안에 / 고객을 잡나요?"
// Sub: "3초 안에 잡지 못하는 사이트는 광고비를 낭비합니다. 지금 URL 입력으로 확인하세요."

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
  const [url, setUrl] = useState('')
  const router = useRouter()

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
        <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/10 text-primary text-sm px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          무료 AI 진단 · 48시간 안에 결과 이메일
        </div>

        {/* Hero Headline — 고객 고통 우선 (VISIONC_PRINCIPLES 준수) */}
        <h1 className="text-5xl md:text-7xl lg:text-[88px] font-black tracking-tight text-white leading-[1.05] mb-6">
          고객이 지금도<br />
          <BlurWord word={words[wordIdx]} trigger={trigger} /><br />
          있습니다
        </h1>

        <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
          홈페이지가 문제인지 모르는 것이 더 큰 문제입니다.<br />
          URL 하나로 지금 바로 무료 진단합니다 — 48시간 내 리포트 발송.
        </p>

        <form onSubmit={e => { e.preventDefault(); if (url) router.push(`/renewal?url=${encodeURIComponent(url)}`) }}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input type="url" value={url} onChange={e => setUrl(e.target.value)}
            placeholder="지금 사이트 URL을 입력하세요"
            className="flex-1 h-14 px-5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-base focus:outline-none focus:border-primary focus:bg-white/15 transition-all" />
          <Button type="submit" size="lg"
            className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-base gap-2">
            지금 무료 진단받기 <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-white/30 text-sm mt-4">신용카드 불필요 · 48시간 내 이메일 수신 · 결과 받은 후 결정하세요</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-white/0 to-white/30" />
      </div>
    </section>
  )
}
