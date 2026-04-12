'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const services = [
  { label: '웹 리뉴얼', href: '/renewal', desc: 'URL 입력 → AI 분석 → 견적' },
  { label: '신규 제작', href: '/new-website', desc: '기획부터 배포까지 올인원' },
  { label: '유지보수', href: '/maintenance', desc: '월정액 관리 서비스' },
  { label: '보안 진단', href: '/security', desc: '취약점 분석 리포트' },
  { label: '앱 개발', href: '/app-dev', desc: 'iOS · Android 하이브리드' },
  { label: 'AI 솔루션', href: '/ai-solution', desc: '중소기업 AI 도입 컨설팅' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-dark border-b border-[#222]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">

        <Link href="/" className="flex items-center flex-shrink-0">
          <Image src="/logo.svg" alt="VISION SOLUTION" width={155} height={42} priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Services dropdown */}
          <div className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}>
            <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              서비스
              <svg className={`w-3 h-3 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72">
                <div className="glass-dark rounded-2xl p-2 border border-[#2E2E2E]">
                  {services.map(s => (
                    <Link key={s.href} href={s.href}
                      className="flex flex-col px-4 py-3 rounded-xl hover:bg-[#C8001F]/10 transition-all group">
                      <span className="text-sm font-semibold text-white group-hover:text-[#C8001F] transition-colors">{s.label}</span>
                      <span className="text-xs text-gray-500 mt-0.5">{s.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/blog" className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
            블로그
          </Link>
          <Link href="/contact" className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
            문의
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="btn-primary text-sm px-5 py-2.5">
            무료 상담
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5">
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden glass-dark border-t border-[#222] px-6 py-4 max-h-[80vh] overflow-y-auto">
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-widest mb-3">서비스</p>
          {services.map(s => (
            <Link key={s.href} href={s.href} onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-3 border-b border-[#1A1A1A] text-gray-300 hover:text-[#C8001F] transition-colors">
              <span className="font-medium">{s.label}</span>
              <span className="text-xs text-gray-600">{s.desc}</span>
            </Link>
          ))}
          <div className="pt-4 space-y-2">
            <Link href="/blog" onClick={() => setMenuOpen(false)}
              className="block py-2 text-gray-400 hover:text-white transition-colors">블로그</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}
              className="block btn-primary text-center mt-3">무료 상담 신청</Link>
          </div>
        </div>
      )}
    </header>
  )
}
