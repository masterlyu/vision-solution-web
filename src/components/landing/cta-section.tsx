'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CtaSection() {
  const [visible, setVisible] = useState(false)
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [url, setUrl] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`relative border border-foreground/20 rounded-2xl overflow-hidden transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }) }}>
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(139,92,246,0.3), transparent 50%)` }} />
          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24 text-center">
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6">지금 시작하세요</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
              48시간 안에<br />답이 옵니다
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
              지금 바로 URL을 입력하세요.<br />분석·리포트·상담 전부 무료입니다.
            </p>
            <form onSubmit={e => { e.preventDefault(); if (url) router.push(`/renewal?url=${encodeURIComponent(url)}`) }}
              className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6">
              <input type="url" value={url} onChange={e => setUrl(e.target.value)}
                placeholder="https://your-website.com"
                className="flex-1 h-14 px-5 rounded-full bg-foreground/5 border border-foreground/20 text-foreground placeholder-muted-foreground text-base focus:outline-none focus:border-primary transition-all" />
              <Button type="submit" size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold gap-2">
                무료 진단 <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <Link href="/contact" className="hover:text-foreground transition-colors">문의하기</Link>
              <span>·</span>
              <Link href="/blog" className="hover:text-foreground transition-colors">사례 보기</Link>
              <span>·</span>
              <span>신용카드 불필요</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
