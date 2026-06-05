import Link from 'next/link'
import Image from 'next/image'
import LegalModals from '@/components/LegalModals'

const SERVICES = [
  ['기업 AI 도입 및 컨설팅', '/ai-solution'],
  ['보안 진단', '/security'],
  ['모의해킹 진단', '/pentest'],
  ['웹사이트 리뉴얼·운영', '/renewal'],
  ['앱·시스템 개발', '/app-dev'],
  ['🤖 챗봇 설치', '/chatbot'],
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-base py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Image src="/logo.svg" alt="비젼솔루션" width={140} height={38} className="mb-4" />
            <p className="text-foreground/90 text-base font-medium leading-relaxed">
              중소기업 AI 도입 동반자.<br />
              컨설팅·구축·사내 출강 교육을 한 곳에서.
            </p>
            <div className="mt-5 space-y-1.5">
              <p className="text-foreground/85 text-sm font-medium">✉ biztalktome@gmail.com</p>
              <p className="text-foreground/85 text-sm font-medium">🌐 visionc.co.kr</p>
            </div>
          </div>
          <div>
            <p className="text-foreground text-base font-bold mb-4">서비스</p>
            <div className="space-y-2">
              {SERVICES.map(([l, h]) => (
                <Link key={h} href={h} className="block text-foreground/90 text-sm font-medium hover:text-primary transition-colors">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-foreground text-base font-bold mb-4">회사</p>
            <div className="space-y-2">
              {[['블로그·포트폴리오', '/blog'], ['소개', '/about'], ['문의', '/contact']].map(([l, h]) => (
                <Link key={h} href={h} className="block text-foreground/90 text-sm font-medium hover:text-primary transition-colors">{l}</Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/contact" className="btn-red w-full justify-center text-center block">
                💼 도입 상담 신청 →
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-foreground/75 text-xs font-medium">
          <span>© 2026 비젼솔루션. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <LegalModals />
          </div>
        </div>
      </div>
    </footer>
  )
}
