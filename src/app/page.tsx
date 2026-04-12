'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const services = [
  {
    icon: '🔄', title: '웹 리뉴얼', desc: 'URL 하나로 기술·디자인·보안 전수 분석. 견적서+리뉴얼 계획서를 바로 받아보세요.',
    href: '/renewal', col: 'md:col-span-2', accent: true,
  },
  {
    icon: '🛡️', title: '보안 진단', desc: 'OWASP 기반 취약점 분석. 결과 리포트 즉시 발송.',
    href: '/security', col: '', accent: false,
  },
  {
    icon: '🆕', title: '신규 제작', desc: '브랜드에 맞는 모던 웹사이트. Next.js + AI 최적화.',
    href: '/new-website', col: '', accent: false,
  },
  {
    icon: '🔧', title: '유지보수', desc: '월정액 관리. 장애 대응·콘텐츠 업데이트·성능 최적화.',
    href: '/maintenance', col: '', accent: false,
  },
  {
    icon: '📱', title: '앱 개발', desc: '기존 시스템과 연계되는 iOS/Android 하이브리드 앱.',
    href: '/app-dev', col: '', accent: false,
  },
  {
    icon: '🤖', title: 'AI 솔루션', desc: 'ERP·KMS·Excel 연계 중소기업 전용 AI 시스템 구축.',
    href: '/ai-solution', col: 'md:col-span-2', accent: false,
  },
]

const process_steps = [
  { step: '01', title: 'URL 입력', desc: '분석 대상 사이트 주소와 연락처 입력' },
  { step: '02', title: 'AI 분석', desc: 'AI 에이전트가 기술·디자인·보안 전수 분석' },
  { step: '03', title: '보고서 생성', desc: '견적서 + 상세 분석 PDF 자동 생성' },
  { step: '04', title: '즉시 발송', desc: '검토 후 입력하신 이메일로 바로 전송' },
]

const blog_posts = [
  { tag: '웹 리뉴얼', title: '10년 된 PHP 쇼핑몰을 Next.js로 전환한 사례', date: '2025.04' },
  { tag: '보안', title: 'SQL Injection 취약점이 발견된 중소기업 웹사이트 사례', date: '2025.03' },
  { tag: 'AI 솔루션', title: '제조업체 ERP에 AI를 붙여 생산성 40% 향상시킨 방법', date: '2025.03' },
]

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
  )
}

function GlowOrb({ className }: { className: string }) {
  return (
    <div className={`absolute rounded-full blur-3xl pointer-events-none ${className}`} />
  )
}

export default function HomePage() {
  const [typed, setTyped] = useState('')
  const texts = ['웹 리뉴얼', '보안 진단', '앱 개발', 'AI 솔루션']
  const [textIdx, setTextIdx] = useState(0)

  useEffect(() => {
    let i = 0
    let deleting = false
    const current = () => texts[textIdx % texts.length]

    const timer = setInterval(() => {
      if (!deleting) {
        setTyped(current().slice(0, i + 1))
        i++
        if (i >= current().length) {
          deleting = true
          setTimeout(() => {}, 1500)
        }
      } else {
        setTyped(current().slice(0, i - 1))
        i--
        if (i <= 0) {
          deleting = false
          setTextIdx(p => p + 1)
        }
      }
    }, 80)
    return () => clearInterval(timer)
  }, [textIdx])

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <AnimatedGrid />
        <GlowOrb className="w-96 h-96 bg-[#C8001F] opacity-10 top-20 -left-48" />
        <GlowOrb className="w-80 h-80 bg-[#C8001F] opacity-8 bottom-20 right-0" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-gray-400 mb-8 border border-[#C8001F]/30">
            <span className="w-2 h-2 rounded-full bg-[#C8001F] animate-pulse" />
            AI 에이전트가 분석부터 납품까지
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            <span className="text-white">우리 회사의</span><br />
            <span className="text-[#C8001F] glow-text">{typed}</span>
            <span className="text-[#C8001F] animate-pulse">|</span><br />
            <span className="text-white text-4xl md:text-5xl font-bold">AI가 완성합니다</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            URL 하나 입력하세요.<br />
            AI가 분석하고, 견적 내고, 리포트를 이메일로 보냅니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/renewal"
              className="px-8 py-4 bg-[#C8001F] text-white font-bold rounded-xl hover:bg-[#E0001F] transition-all glow-red text-lg">
              무료 분석 시작하기 →
            </Link>
            <Link href="/contact"
              className="px-8 py-4 glass text-white font-medium rounded-xl hover:border-[#C8001F]/50 transition-all text-lg border border-[#2A2A2A]">
              무료 상담 신청
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
            {[['100+', '프로젝트'], ['48h', '평균 납기'], ['99%', '고객 만족']].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-2xl font-black text-[#C8001F]">{n}</div>
                <div className="text-xs text-gray-500 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 text-xs animate-bounce">
          <span>SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent" />
        </div>
      </section>

      {/* SERVICES BENTO GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C8001F] text-sm font-medium mb-2 tracking-widest">SERVICES</p>
          <h2 className="text-3xl md:text-4xl font-black text-white">AI 에이전트 전문 서비스</h2>
          <p className="text-gray-500 mt-3">분석부터 납품까지, AI가 담당합니다</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((s) => (
            <Link key={s.href} href={s.href}
              className={`group glass rounded-2xl p-6 hover:border-[#C8001F]/50 transition-all duration-300 hover:glow-red ${s.col} ${s.accent ? 'bg-gradient-to-br from-[#C8001F]/10 to-transparent border-[#C8001F]/20' : ''}`}>
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C8001F] transition-colors">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-4 text-[#C8001F] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                자세히 보기 →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C8001F] text-sm font-medium mb-2 tracking-widest">HOW IT WORKS</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">4단계로 완성</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {process_steps.map((p, i) => (
              <div key={p.step} className="relative">
                {i < process_steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-[#C8001F]/50 to-transparent z-10" />
                )}
                <div className="glass rounded-2xl p-6 hover:border-[#C8001F]/40 transition-all">
                  <div className="text-[#C8001F] text-3xl font-black mb-3">{p.step}</div>
                  <h3 className="text-white font-bold mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <p className="text-[#C8001F] text-sm font-medium mb-2 tracking-widest">BLOG</p>
            <h2 className="text-3xl font-black text-white">최근 프로젝트 & 인사이트</h2>
          </div>
          <Link href="/blog" className="text-[#C8001F] text-sm hover:underline hidden md:block">
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blog_posts.map((post) => (
            <div key={post.title} className="glass rounded-2xl p-6 hover:border-[#C8001F]/40 transition-all group cursor-pointer">
              <span className="inline-block px-2 py-1 bg-[#C8001F]/20 text-[#C8001F] text-xs rounded-md mb-4">{post.tag}</span>
              <h3 className="text-white font-bold leading-snug mb-3 group-hover:text-[#C8001F] transition-colors">{post.title}</h3>
              <p className="text-gray-600 text-xs">{post.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-10 md:p-16 text-center border border-[#C8001F]/30 bg-gradient-to-br from-[#C8001F]/10 to-transparent relative overflow-hidden">
          <GlowOrb className="w-64 h-64 bg-[#C8001F] opacity-10 -top-20 -right-20" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            지금 바로 무료 분석 받아보세요
          </h2>
          <p className="text-gray-400 mb-8">사이트 URL만 입력하면 AI가 48시간 내 분석 결과를 보내드립니다.</p>
          <Link href="/renewal"
            className="inline-block px-10 py-4 bg-[#C8001F] text-white font-bold rounded-xl hover:bg-[#E0001F] transition-all glow-red text-lg">
            무료 분석 시작 →
          </Link>
        </div>
      </section>
    </div>
  )
}
