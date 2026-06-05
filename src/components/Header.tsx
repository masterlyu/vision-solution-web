'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NAV = [
  { label: '기업 AI 도입·컨설팅', href: '/ai-solution', primary: true },
  { label: '보안 진단', href: '/security' },
  { label: '웹사이트 리뉴얼·운영', href: '/renewal' },
  { label: '앱·시스템 개발', href: '/app-dev' },
  { label: '🤖 챗봇 설치', href: '/chatbot' },
  { label: '소개', href: '/about' },
  { label: '포트폴리오', href: '/portfolio' },
  { label: '블로그', href: '/blog' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-200 ${scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
      <div className="container-base w-full flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.svg" alt="비젼솔루션" width={148} height={40} priority />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <Link key={n.href} href={n.href}
              className={`px-3 py-2 text-sm font-medium rounded-lg hover:bg-foreground/5 transition-all ${n.primary ? 'text-primary font-bold' : 'text-foreground/85 hover:text-foreground'}`}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact" className="btn-red">
            💼 도입 상담
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 flex flex-col gap-1.5 min-w-[44px] min-h-[44px] items-center justify-center">
          <span className={`block w-5 h-0.5 bg-foreground transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-foreground transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b border-border px-5 py-4 md:hidden">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              className={`block py-4 border-b border-border text-base font-medium transition-colors ${n.primary ? 'text-primary font-bold' : 'text-foreground hover:text-primary'}`}>
              {n.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="btn-red mt-4 w-full justify-center h-12 text-base">
            💼 도입 상담
          </Link>
        </div>
      )}
    </header>
  )
}
