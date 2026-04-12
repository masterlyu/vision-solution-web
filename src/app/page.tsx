'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

// 타이핑 애니메이션 훅
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting) {
      if (display.length < word.length) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length + 1)), speed)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pause)
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(word.slice(0, display.length - 1)), speed / 2)
      } else {
        setIsDeleting(false)
        setWordIdx(i => i + 1)
      }
    }
    return () => clearTimeout(timeout)
  }, [display, isDeleting, wordIdx, words, speed, pause])

  return display
}

// 카운터 애니메이션
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const step = target / 40
        let cur = 0
        const timer = setInterval(() => {
          cur += step
          if (cur >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(cur))
        }, 40)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  return <div ref={ref} className="text-3xl font-black text-[#C8001F]">{count}{suffix}</div>
}

const SERVICES = [
  {
    icon: '🔄', title: '웹 리뉴얼', badge: '가장 인기',
    desc: 'URL 입력 → AI 전수 분석 → 견적서+리뉴얼 계획서 이메일 발송. 48시간 내 결과 보장.',
    href: '/renewal', span: 'lg:col-span-2 lg:row-span-1',
  },
  {
    icon: '🛡️', title: '보안 진단',
    desc: 'OWASP 기준 취약점 분석. 위험도별 리포트 즉시 발송.',
    href: '/security', span: '',
  },
  {
    icon: '📱', title: '앱 개발',
    desc: '기존 시스템 연계 iOS·Android 하이브리드 앱.',
    href: '/app-dev', span: '',
  },
  {
    icon: '🆕', title: '신규 제작',
    desc: '기획→디자인→개발→배포 원스톱. 최속 1주.',
    href: '/new-website', span: '',
  },
  {
    icon: '🔧', title: '유지보수',
    desc: '월정액 관리. 장애 대응·업데이트·SEO.',
    href: '/maintenance', span: '',
  },
  {
    icon: '🤖', title: 'AI 솔루션', badge: 'NEW',
    desc: 'ERP·KMS·Excel 연계 중소기업 전용 AI 구축. 하드웨어~교육 원스톱.',
    href: '/ai-solution', span: 'lg:col-span-2',
  },
]

const PROCESS = [
  { n: '01', t: 'URL 입력', d: '분석 대상 주소와 이메일 입력' },
  { n: '02', t: 'AI 분석', d: 'AI 에이전트 팀이 기술·디자인·보안 전수 분석' },
  { n: '03', t: '리포트 생성', d: '견적서 + 상세 분석 PDF 자동 생성' },
  { n: '04', t: '즉시 발송', d: '검토 후 입력 이메일로 즉시 전송' },
]

const BLOG = [
  { tag: '웹 리뉴얼', title: 'PHP 쇼핑몰 → Next.js 전환 후 전환율 2.3배', date: '2025.04' },
  { tag: '보안', title: 'SQL Injection 위기, 48시간 내 패치 완료 사례', date: '2025.03' },
  { tag: 'AI 솔루션', title: 'ERP에 AI 붙여 재고 예측 정확도 87% 달성', date: '2025.03' },
]

export default function HomePage() {
  const typed = useTypewriter(['웹 리뉴얼', '보안 진단', '앱 개발', 'AI 솔루션'])

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[68px]">
        {/* Grid BG */}
        <div className="absolute inset-0 grid-bg" />
        {/* Glow orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#C8001F] rounded-full blur-[120px] opacity-[0.12] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#C8001F] rounded-full blur-[100px] opacity-[0.08] pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs text-gray-400 mb-8 border border-[#C8001F]/30 bg-[#C8001F]/5">
            <span className="w-2 h-2 rounded-full bg-[#C8001F] animate-pulse-slow" />
            AI 에이전트가 분석부터 납품까지
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
            <span className="text-gray-200">비즈니스의</span><br />
            <span className="text-[#C8001F] glow-text">
              {typed || ' '}
            </span>
            <span className="text-[#C8001F] animate-pulse-slow">|</span>
            <br />
            <span className="text-white">AI가 완성합니다</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            사이트 URL 하나만 입력하세요.<br />
            AI 에이전트가 분석하고, 견적 내고,<br />
            리포트를 이메일로 보내드립니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/renewal" className="btn-primary text-base">
              무료 분석 시작하기 →
            </Link>
            <Link href="/contact" className="btn-ghost text-base">
              전문가 상담 신청
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12">
            {[
              { target: 120, suffix: '+', label: '완료 프로젝트' },
              { target: 48, suffix: 'h', label: '평균 리포트 납기' },
              { target: 97, suffix: '%', label: '고객 재의뢰율' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <Counter target={s.target} suffix={s.suffix} />
                <div className="text-xs text-gray-600 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 text-[10px] tracking-widest animate-bounce-y">
          <span>SCROLL</span>
          <div className="w-px h-6 bg-gradient-to-b from-gray-600 to-transparent" />
        </div>
      </section>

      {/* ── SERVICES BENTO ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label">SERVICES</span>
          <h2 className="text-3xl md:text-5xl font-black text-white">AI 에이전트 전문 서비스</h2>
          <p className="text-gray-500 mt-3 text-sm">분석부터 납품까지, AI 팀이 담당합니다</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map(s => (
            <Link key={s.href} href={s.href}
              className={`group glass rounded-2xl p-7 card-hover relative overflow-hidden ${s.span}`}>
              {/* hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C8001F]/0 to-[#C8001F]/0 group-hover:from-[#C8001F]/8 group-hover:to-transparent transition-all duration-300 rounded-2xl" />
              <div className="relative">
                {s.badge && (
                  <span className="tag bg-[#C8001F]/20 text-[#C8001F] border border-[#C8001F]/30 mb-4">
                    {s.badge}
                  </span>
                )}
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C8001F] transition-colors">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-5 flex items-center gap-1 text-[#C8001F] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity translate-x-0 group-hover:translate-x-1 duration-200">
                  자세히 보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-24 px-6 bg-[#060606] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-14">
            <span className="section-label">HOW IT WORKS</span>
            <h2 className="text-3xl md:text-5xl font-black text-white">4단계로 완성</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map((p, i) => (
              <div key={p.n} className="relative">
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%+10px)] w-[calc(100%-20px)] h-px bg-gradient-to-r from-[#C8001F]/40 to-transparent z-10" />
                )}
                <div className="glass rounded-2xl p-6 h-full card-hover">
                  <div className="w-10 h-10 rounded-xl bg-[#C8001F]/15 border border-[#C8001F]/30 flex items-center justify-center text-[#C8001F] font-black text-sm mb-4">
                    {p.n}
                  </div>
                  <h3 className="text-white font-bold mb-2">{p.t}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="section-label">BLOG</span>
            <h2 className="text-3xl md:text-4xl font-black text-white">최근 프로젝트 & 인사이트</h2>
          </div>
          <Link href="/blog" className="text-[#C8001F] text-sm font-semibold hover:underline hidden md:flex items-center gap-1">
            전체 보기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BLOG.map(post => (
            <Link key={post.title} href="/blog"
              className="glass rounded-2xl p-6 card-hover block">
              <span className="tag bg-[#C8001F]/15 text-[#C8001F] mb-4">{post.tag}</span>
              <h3 className="text-white font-bold leading-snug text-sm mb-3 group-hover:text-[#C8001F]">{post.title}</h3>
              <p className="text-gray-600 text-xs">{post.date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 pb-24">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#C8001F]/20 to-[#9A0015]/10 rounded-3xl blur-2xl" />
          <div className="relative glass rounded-3xl p-10 md:p-16 text-center border border-[#C8001F]/25">
            <span className="section-label">GET STARTED</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              지금 바로 무료 분석 받아보세요
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              URL만 입력하면 AI가 48시간 내 분석 결과를 이메일로 보내드립니다.<br />비용은 전혀 없습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/renewal" className="btn-primary text-base">
                웹 리뉴얼 무료 분석 →
              </Link>
              <Link href="/security" className="btn-ghost text-base">
                보안 진단 신청
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
