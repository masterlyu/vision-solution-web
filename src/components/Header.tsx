'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NAV = [
  { label: '웹 리뉴얼', href: '/renewal' },
  { label: '신규 제작', href: '/new-website' },
  { label: '보안 진단', href: '/security' },
  { label: '유지보수', href: '/maintenance' },
  { label: 'AI 솔루션', href: '/ai-solution' },
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
    <header className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-200 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-neutral-900' : 'bg-transparent'}`}>
      <div className="container-base w-full flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.svg" alt="비젼솔루션" width={148} height={40} priority />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <Link key={n.href} href={n.href}
              className="px-3 py-2 text-sm text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/renewal" className="btn-red">
            무료 진단 받기
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 flex flex-col gap-1.5">
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-black border-b border-neutral-900 px-5 py-4 md:hidden">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              className="block py-3 text-neutral-400 hover:text-white border-b border-neutral-900 text-sm transition-colors">
              {n.label}
            </Link>
          ))}
          <Link href="/renewal" onClick={() => setOpen(false)} className="btn-red mt-4 w-full justify-center">
            무료 진단 받기
          </Link>
        </div>
      )}
    </header>
  )
}
