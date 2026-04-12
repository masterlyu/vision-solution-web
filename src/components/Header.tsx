'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: '웹 리뉴얼', href: '/renewal' },
  { label: '신규 제작', href: '/new-website' },
  { label: '유지보수', href: '/maintenance' },
  { label: '보안 진단', href: '/security' },
  { label: '앱 개발', href: '/app-dev' },
  { label: 'AI 솔루션', href: '/ai-solution' },
  { label: '블로그', href: '/blog' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-[#2A2A2A]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="VISION SOLUTION" width={160} height={40} priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href}
              className="text-sm text-gray-400 hover:text-white transition-colors hover:text-[#C8001F]">
              {l.label}
            </Link>
          ))}
          <Link href="/contact"
            className="ml-2 px-4 py-2 bg-[#C8001F] text-white text-sm font-medium rounded-lg hover:bg-[#E0001F] transition-colors glow-red">
            무료 상담
          </Link>
        </nav>

        {/* Mobile Menu */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-2">
          <div className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-5 h-0.5 bg-white mt-1 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-white mt-1 transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden glass border-t border-[#2A2A2A] px-6 py-4">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="block py-2 text-gray-400 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)}
            className="block mt-3 px-4 py-2 bg-[#C8001F] text-white text-sm text-center rounded-lg">
            무료 상담
          </Link>
        </div>
      )}
    </header>
  )
}
