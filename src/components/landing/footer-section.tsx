'use client'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

void ArrowUpRight

const links = {
  '서비스': [
    { name: '기업 AI 도입 및 컨설팅', href: '/ai-solution' },
    { name: '보안 진단', href: '/security' },
    { name: '모의해킹 진단', href: '/pentest' },
    { name: '웹사이트 리뉴얼·운영', href: '/renewal' },
    { name: '앱·시스템 개발', href: '/app-dev' },
    { name: '챗봇 설치', href: '/chatbot' },
  ],
  '회사': [
    { name: '소개', href: '/about' },
    { name: '포트폴리오', href: '/portfolio' },
    { name: '블로그', href: '/blog' },
    { name: '문의하기', href: '/contact' },
  ],
  '법적': [
    { name: '개인정보처리방침', href: '/privacy' },
    { name: '이용약관', href: '/terms' },
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
            <p className="text-foreground/90 text-base font-medium leading-relaxed mb-6 max-w-sm">
              중소기업 AI 도입 동반자.<br />
              컨설팅·구축·사내 출강 교육을 한 곳에서.
            </p>
            <a href="mailto:biztalktome@gmail.com" className="text-base font-medium text-primary hover:underline block mb-1">
              biztalktome@gmail.com
            </a>
            <Link href="/contact" className="text-sm text-foreground/85 font-medium hover:text-primary transition-colors">
              💼 도입 상담 신청 →
            </Link>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h3 className="text-base font-bold text-foreground mb-6">{title}</h3>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm font-medium text-foreground/90 hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-foreground/85 font-medium">© 2026 Vision Solution. All rights reserved.</p>
            <p className="text-xs text-foreground/75 font-medium">
              비젼솔루션 · 사업자등록번호 121-81-84378 · 인천광역시 계양구 동양로 10
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground/90 font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            정상 운영 중
          </div>
        </div>
      </div>
    </footer>
  )
}
