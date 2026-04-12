'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AsciiScene } from '@/components/landing/ascii-scene'

const words = ['진단', '분석', '개편', '성장']

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
          AI 기반 웹 솔루션 · 48시간 무료 진단
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-[88px] font-black tracking-tight text-white leading-[1.05] mb-6">
          홈페이지를<br />
          <BlurWord word={words[wordIdx]} trigger={trigger} />
          합니다
        </h1>

        <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
          URL 하나로 현재 사이트의 문제를 AI가 진단합니다.<br />
          리뉴얼·보안·AI 도입까지 원스톱으로 해결합니다.
        </p>

        <form onSubmit={e => { e.preventDefault(); if (url) router.push(`/renewal?url=${encodeURIComponent(url)}`) }}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input type="url" value={url} onChange={e => setUrl(e.target.value)}
            placeholder="https://your-website.com"
            className="flex-1 h-14 px-5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-base focus:outline-none focus:border-primary focus:bg-white/15 transition-all" />
          <Button type="submit" size="lg"
            className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-base gap-2">
            무료 진단 <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
        <p className="text-white/30 text-sm mt-4">신용카드 불필요 · 48시간 내 이메일 수신</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-white/0 to-white/30" />
      </div>
    </section>
  )
}
