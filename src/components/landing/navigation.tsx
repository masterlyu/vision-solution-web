'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, ChevronDown } from 'lucide-react'

const serviceLinks = [
  { name: '홈페이지 리뉴얼', href: '/renewal' },
  { name: '신규 사이트 구축', href: '/new-website' },
  { name: '유지보수', href: '/maintenance' },
  { name: '보안 진단', href: '/security' },
  { name: '앱·시스템 개발', href: '/app-dev' },
  { name: 'AI 솔루션', href: '/ai-solution' },
  { name: '🤖 AI 챗봇 설치', href: '/chatbot' },
]

const navLinks = [
  { name: '소개', href: '/about' },
  { name: '포트폴리오', href: '/portfolio' },
  { name: '블로그', href: '/blog' },
]

// All paths considered under the services section
const servicePaths = serviceLinks.map(l => l.href)

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const pathname = usePathname()
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close services dropdown when clicking outside
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsMobileServicesOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false
    return pathname === href
  }

  const isServicesActive = () => servicePaths.includes(pathname)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      window.location.href = href
    }
    setIsMobileMenuOpen(false)
    setIsServicesOpen(false)
  }

  const linkCls = (active: boolean) => {
    return `text-sm font-medium transition-colors duration-200 relative group ${
      active
        ? isScrolled ? 'text-foreground' : 'text-white'
        : isScrolled ? 'text-foreground/50 hover:text-foreground' : 'text-white/50 hover:text-white'
    }`
  }

  const underlineCls = (active: boolean) => {
    return `absolute -bottom-1 left-0 h-px transition-all duration-300 ${
      active ? 'w-full bg-primary' : `w-0 group-hover:w-full ${isScrolled ? 'bg-foreground' : 'bg-white'}`
    }`
  }

  return (
    <header className={`fixed z-50 transition-all duration-500 ${isScrolled ? 'top-4 left-4 right-4' : 'top-0 left-0 right-0'}`}>
      <nav className={`mx-auto transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]'
          : 'bg-transparent max-w-[1400px]'
      }`}>
        <div className={`flex items-center justify-between px-6 lg:px-8 transition-all duration-500 ${isScrolled ? 'h-14' : 'h-20'}`}>

          <Link href="/" className="shrink-0">
            <span className={`font-black tracking-tight transition-all duration-500 ${isScrolled ? 'text-xl text-foreground' : 'text-2xl text-white'}`}>
              VISIONC
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {/* Services Dropdown */}
            <div ref={servicesRef} className="relative">
              <button
                onClick={() => setIsServicesOpen(v => !v)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 relative group ${
                  isServicesActive()
                    ? isScrolled ? 'text-foreground' : 'text-white'
                    : isScrolled ? 'text-foreground/50 hover:text-foreground' : 'text-white/50 hover:text-white'
                }`}
              >
                서비스
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                  isServicesActive() ? 'w-full bg-primary' : `w-0 group-hover:w-full ${isScrolled ? 'bg-foreground' : 'bg-white'}`
                }`} />
              </button>

              {/* Dropdown panel */}
              {isServicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-background/95 backdrop-blur-xl border border-foreground/10 rounded-xl shadow-xl py-2 z-50">
                  {serviceLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsServicesOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-colors hover:bg-foreground/5 ${
                        isActive(link.href) ? 'text-primary font-medium' : 'text-foreground/70 hover:text-foreground'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Regular nav links */}
            {navLinks.map(link => (
              <Link key={link.name} href={link.href} onClick={(e) => handleClick(e, link.href)} className={linkCls(isActive(link.href))}>
                {link.name}
                <span className={underlineCls(isActive(link.href))} />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <Button size="sm" asChild
              className={`rounded-full transition-all duration-500 ${isScrolled ? 'bg-primary hover:bg-primary/90 text-white px-5 h-9 text-xs' : 'bg-white hover:bg-white/90 text-black px-6 h-10'}`}>
              <Link href="/contact">무료 진단</Link>
            </Button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${isScrolled || isMobileMenuOpen ? 'text-foreground' : 'text-white'}`}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col h-full px-8 pt-28 pb-8 overflow-y-auto">
          <div className="flex-1 flex flex-col justify-center gap-2">

            {/* Services accordion */}
            <div>
              <button
                onClick={() => setIsMobileServicesOpen(v => !v)}
                className={`flex items-center justify-between w-full text-4xl font-black transition-all duration-500 py-3 ${
                  isServicesActive() ? 'text-primary' : 'text-foreground'
                } ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                서비스
                <ChevronDown className={`w-7 h-7 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${isMobileServicesOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pl-4 pb-4 flex flex-col gap-3">
                  {serviceLinks.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-xl font-medium transition-colors ${
                        isActive(link.href) ? 'text-primary' : 'text-foreground/60 hover:text-foreground'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Regular mobile nav links */}
            {navLinks.map((link, i) => (
              <Link key={link.name} href={link.href} onClick={(e) => handleClick(e, link.href)}
                className={`text-4xl font-black transition-all duration-500 py-3 ${
                  isActive(link.href) ? 'text-primary' : 'text-foreground hover:text-muted-foreground'
                } ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: isMobileMenuOpen ? `${(i + 1) * 60}ms` : '0ms' }}>
                {link.name}
              </Link>
            ))}
          </div>

          <div className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: isMobileMenuOpen ? '300ms' : '0ms' }}>
            <Button variant="outline" className="flex-1 rounded-full h-14 text-base" asChild onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/portfolio">포트폴리오</Link>
            </Button>
            <Button className="flex-1 bg-primary text-white rounded-full h-14 text-base" asChild onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/contact">무료 진단</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
