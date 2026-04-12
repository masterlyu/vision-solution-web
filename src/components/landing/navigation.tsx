'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: '서비스',    href: '/#services',  anchor: true },
  { name: '프로세스',  href: '/#process',   anchor: true },
  { name: '보안',      href: '/security',   anchor: false },
  { name: 'AI 솔루션', href: '/ai-solution',anchor: false },
  { name: '블로그',    href: '/blog',       anchor: false },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isActive = (link: typeof navLinks[number]) => {
    if (link.anchor) return pathname === '/'
    return pathname === link.href
  }

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    window.location.href = href
  }

  const linkClass = (active: boolean, scrolled: boolean) =>
    `text-sm font-medium transition-colors duration-200 relative group ${
      active
        ? scrolled ? 'text-foreground' : 'text-white'
        : scrolled ? 'text-foreground/50 hover:text-foreground' : 'text-white/50 hover:text-white'
    }`

  const underlineClass = (active: boolean, scrolled: boolean) =>
    `absolute -bottom-1 left-0 h-px transition-all duration-300 ${
      active
        ? 'w-full bg-primary'
        : `w-0 group-hover:w-full ${scrolled ? 'bg-foreground' : 'bg-white'}`
    }`

  return (
    <header className={`fixed z-50 transition-all duration-500 ${isScrolled ? 'top-4 left-4 right-4' : 'top-0 left-0 right-0'}`}>
      <nav className={`mx-auto transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]'
          : 'bg-transparent max-w-[1400px]'
      }`}>
        <div className={`flex items-center justify-between px-6 lg:px-8 transition-all duration-500 ${isScrolled ? 'h-14' : 'h-20'}`}>

          {/* 로고 */}
          <Link href="/" className="shrink-0">
            <span className={`font-black tracking-tight transition-all duration-500 ${isScrolled ? 'text-xl text-foreground' : 'text-2xl text-white'}`}>
              VISIONC
            </span>
          </Link>

          {/* 데스크탑 링크 */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => {
              const active = isActive(link)
              return link.anchor ? (
                <a key={link.name} href={link.href}
                  onClick={e => handleAnchorClick(e, link.href)}
                  className={linkClass(active, isScrolled)}>
                  {link.name}
                  <span className={underlineClass(active, isScrolled)} />
                </a>
              ) : (
                <Link key={link.name} href={link.href}
                  className={linkClass(active, isScrolled)}>
                  {link.name}
                  <span className={underlineClass(active, isScrolled)} />
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Button size="sm" asChild
              className={`rounded-full transition-all duration-500 ${isScrolled ? 'bg-primary hover:bg-primary/90 text-white px-5 h-9 text-xs' : 'bg-white hover:bg-white/90 text-black px-6 h-10'}`}>
              <Link href="/contact">무료 진단</Link>
            </Button>
          </div>

          {/* 모바일 햄버거 */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${isScrolled || isMobileMenuOpen ? 'text-foreground' : 'text-white'}`}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      <div className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          <div className="flex-1 flex flex-col justify-center gap-6">
            {navLinks.map((link, i) => {
              const active = isActive(link)
              const cls = `text-4xl font-black transition-all duration-500 ${
                active ? 'text-primary' : 'text-foreground hover:text-muted-foreground'
              } ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
              const delay = { transitionDelay: isMobileMenuOpen ? `${i * 60}ms` : '0ms' }

              return link.anchor ? (
                <a key={link.name} href={link.href}
                  onClick={e => handleAnchorClick(e, link.href)}
                  className={cls} style={delay}>
                  {link.name}
                </a>
              ) : (
                <Link key={link.name} href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cls} style={delay}>
                  {link.name}
                </Link>
              )
            })}
          </div>
          <div className={`flex gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: isMobileMenuOpen ? '300ms' : '0ms' }}>
            <Button variant="outline" className="flex-1 rounded-full h-14 text-base"
              onClick={e => handleAnchorClick(e as any, '/#services')}>
              서비스 보기
            </Button>
            <Button className="flex-1 bg-primary text-white rounded-full h-14 text-base" asChild
              onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/contact">무료 진단</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
