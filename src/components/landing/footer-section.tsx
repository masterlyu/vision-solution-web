'use client'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const links = {
  '서비스': [
    { name: '홈페이지 리뉴얼', href: '/renewal' },
    { name: '신규 사이트 구축', href: '/new-website' },
    { name: '유지보수', href: '/maintenance' },
    { name: '보안 진단', href: '/security' },
    { name: '앱·시스템 개발', href: '/app-dev' },
    { name: 'AI 솔루션', href: '/ai-solution' },
  ],
  '회사': [
    { name: '블로그', href: '/blog' },
    { name: '문의하기', href: '/contact' },
  ],
  '법적': [
    { name: '개인정보처리방침', href: '#' },
    { name: '이용약관', href: '#' },
  ],
}

export function FooterSection() {
  return (
    <footer className="relative bg-background border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <span className="text-2xl font-black text-foreground">VISIONC</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              URL 하나로 홈페이지 문제를 AI가 진단합니다.<br />
              리뉴얼·보안·AI 솔루션을 원스톱으로 제공합니다.
            </p>
            <a href="mailto:biztalktome@gmail.com" className="text-sm text-primary hover:underline">
              biztalktome@gmail.com
            </a>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-sm font-bold text-foreground mb-6">{title}</h3>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 Vision Solution. All rights reserved.</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            정상 운영 중
          </div>
        </div>
      </div>
    </footer>
  )
}
