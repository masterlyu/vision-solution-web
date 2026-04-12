import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-[#1A1A1A] bg-[#050505] mt-0">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Image src="/logo.svg" alt="VISION SOLUTION" width={150} height={42} className="mb-5" />
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              AI 에이전트가 분석부터 납품까지.<br />
              웹 리뉴얼·보안 진단·앱 개발·AI 솔루션 전문기업.
            </p>
            <div className="mt-5 space-y-1">
              <p className="text-gray-600 text-xs flex items-center gap-2">
                <span className="text-[#C8001F]">✉</span> biztalktome@gmail.com
              </p>
              <p className="text-gray-600 text-xs flex items-center gap-2">
                <span className="text-[#C8001F]">🌐</span> visionc.co.kr
              </p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">서비스</h4>
            <div className="space-y-2">
              {[
                ['웹 리뉴얼', '/renewal'], ['신규 제작', '/new-website'],
                ['유지보수', '/maintenance'], ['보안 진단', '/security'],
                ['앱 개발', '/app-dev'], ['AI 솔루션', '/ai-solution'],
              ].map(([l, h]) => (
                <Link key={h} href={h}
                  className="block text-gray-500 text-sm hover:text-[#C8001F] transition-colors">
                  {l}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">회사</h4>
            <div className="space-y-2">
              {[['블로그', '/blog'], ['포트폴리오', '/blog'], ['문의하기', '/contact']].map(([l, h]) => (
                <Link key={l} href={h}
                  className="block text-gray-500 text-sm hover:text-[#C8001F] transition-colors">
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#111] mt-10 pt-7 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-700 text-xs">© 2025 VISION SOLUTION. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8001F] animate-pulse-slow" />
            <p className="text-gray-700 text-xs">AI-Powered Web Agency · visionc.co.kr</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
