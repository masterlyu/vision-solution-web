import Link from 'next/link'
import Image from 'next/image'
import LegalModals from '@/components/LegalModals'

const SERVICES = [
  ['웹사이트 리뉴얼', '/renewal'],
  ['신규 제작', '/new-website'],
  ['보안 진단', '/security'],
  ['유지보수', '/maintenance'],
  ['앱 개발', '/app-dev'],
  ['AI 솔루션', '/ai-solution'],
]

export default function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-black">
      <div className="container-base py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Image src="/logo.svg" alt="비젼솔루션" width={140} height={38} className="mb-4" />
            <p className="text-neutral-500 text-sm leading-relaxed">
              URL 하나로 시작하는 웹·앱·보안·AI 전문기업.<br />
              분석부터 납품까지 AI 에이전트 팀이 담당합니다.
            </p>
            <div className="mt-5 space-y-1.5">
              <p className="text-neutral-600 text-xs">✉ biztalktome@gmail.com</p>
              <p className="text-neutral-600 text-xs">🌐 visionc.co.kr</p>
            </div>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-4">서비스</p>
            <div className="space-y-2">
              {SERVICES.map(([l, h]) => (
                <Link key={h} href={h} className="block text-neutral-500 text-sm hover:text-brand transition-colors">{l}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-4">회사</p>
            <div className="space-y-2">
              {[['블로그·포트폴리오', '/blog'], ['무료 상담', '/contact']].map(([l, h]) => (
                <Link key={h} href={h} className="block text-neutral-500 text-sm hover:text-brand transition-colors">{l}</Link>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/renewal" className="btn-red w-full justify-center text-center block">
                무료 진단 시작하기 →
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-900 mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-neutral-700 text-xs">
          <span>© 2025 비젼솔루션. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <LegalModals />
          </div>
        </div>
      </div>
    </footer>
  )
}
