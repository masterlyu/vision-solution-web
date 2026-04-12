'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { RefreshCw, Globe, Wrench, ShieldCheck, Code2, Sparkles, ArrowRight } from 'lucide-react'

const services = [
  { number: '01', icon: RefreshCw,   href: '/renewal',     title: '홈페이지 리뉴얼', stat: { value: '67%', label: '평균 로딩 개선' }, desc: '오래된 사이트를 속도·디자인·SEO 전부 새로 만듭니다. URL 하나로 현재 상태를 무료 진단합니다.' },
  { number: '02', icon: Globe,       href: '/new-website', title: '신규 사이트 구축', stat: { value: '2.4배', label: '전환율 향상' }, desc: '기획·디자인·개발·배포를 원스톱으로 진행합니다. 처음부터 제대로 만들겠습니다.' },
  { number: '03', icon: Wrench,      href: '/maintenance', title: '유지보수', stat: { value: '4h', label: '장애 대응' }, desc: '월 정기 계약으로 콘텐츠 업데이트, 보안 패치, 장애 대응을 책임집니다.' },
  { number: '04', icon: ShieldCheck, href: '/security',    title: '보안 진단', stat: { value: '23개', label: '평균 취약점 발견' }, desc: '비침투적 방식으로 SSL·보안헤더·취약점을 진단하고 조치 가이드를 제공합니다.' },
  { number: '05', icon: Code2,       href: '/app-dev',     title: '앱·시스템 개발', stat: { value: '120건+', label: '납품 실적' }, desc: '모바일 앱부터 사내 업무 시스템까지 풀스택으로 구축합니다.' },
  { number: '06', icon: Sparkles,    href: '/ai-solution', title: 'AI 솔루션', stat: { value: '85%', label: '업무 자동화' }, desc: 'AI 챗봇·자동화·데이터 분석을 중소기업 규모에 맞게 도입합니다.' },
]

function ParticleViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)
    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height }
    }
    window.addEventListener('mousemove', handleMouse)
    const dots: { x: number; y: number; vx: number; vy: number; r: number }[] = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.0008, vy: (Math.random() - 0.5) * 0.0008, r: Math.random() * 1.5 + 0.5
    }))
    const animate = () => {
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)
      const mx = mouseRef.current.x * w, my = mouseRef.current.y * h
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0 || d.x > 1) d.vx *= -1
        if (d.y < 0 || d.y > 1) d.vy *= -1
        const dx = d.x * w - mx, dy = d.y * h - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const alpha = Math.max(0, 1 - dist / 300)
        ctx.beginPath()
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139,92,246,${0.3 + alpha * 0.5})`
        ctx.fill()
      })
      dots.forEach((a, i) => dots.slice(i + 1).forEach(b => {
        const dx = (a.x - b.x) * canvas.offsetWidth, dy = (a.y - b.y) * canvas.offsetHeight
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          ctx.beginPath(); ctx.moveTo(a.x * canvas.offsetWidth, a.y * canvas.offsetHeight)
          ctx.lineTo(b.x * canvas.offsetWidth, b.y * canvas.offsetHeight)
          ctx.strokeStyle = `rgba(139,92,246,${0.1 * (1 - dist / 120)})`
          ctx.lineWidth = 0.5; ctx.stroke()
        }
      }))
      frameRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => { cancelAnimationFrame(frameRef.current); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', handleMouse) }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

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
          <p className="text-muted-foreground text-lg max-w-xl">작은 유지보수부터 AI 도입까지 단일 파트너로 해결합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((s, i) => (
            <Link key={s.title} href={s.href}
              className={`group relative bg-card p-8 flex flex-col gap-6 hover:bg-card/80 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="flex items-start justify-between">
                <span className="text-muted-foreground/40 text-sm font-mono">{s.number}</span>
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                  <s.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-primary mb-1">{s.stat.value}</div>
                <div className="text-muted-foreground text-xs">{s.stat.label}</div>
              </div>
              <div>
                <h3 className="text-foreground font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-primary text-sm font-semibold mt-auto opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                자세히 <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
