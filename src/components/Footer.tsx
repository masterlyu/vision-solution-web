import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2A2A] bg-[#080808] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Image src="/logo.svg" alt="VISION SOLUTION" width={140} height={35} className="mb-4" />
            <p className="text-gray-500 text-sm leading-relaxed">
              AI 에이전트가 분석부터 납품까지.<br/>
              웹 리뉴얼, 보안 진단, 앱 개발, AI 솔루션 전문기업.
            </p>
            <p className="text-gray-600 text-xs mt-4">
              📧 biztalktome@gmail.com<br/>
              🌐 visionc.co.kr
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">서비스</h4>
            {[
              ['웹 리뉴얼', '/renewal'],
              ['신규 제작', '/new-website'],
              ['유지보수', '/maintenance'],
              ['보안 진단', '/security'],
              ['앱 개발', '/app-dev'],
              ['AI 솔루션', '/ai-solution'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="block text-gray-500 text-sm py-1 hover:text-[#C8001F] transition-colors">
                {label}
              </Link>
            ))}
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">회사</h4>
            {[
              ['블로그', '/blog'],
              ['포트폴리오', '/blog'],
              ['문의하기', '/contact'],
            ].map(([label, href]) => (
              <Link key={label} href={href} className="block text-gray-500 text-sm py-1 hover:text-[#C8001F] transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="border-t border-[#1A1A1A] mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-gray-600 text-xs">© 2025 VISION SOLUTION. All rights reserved.</p>
          <p className="text-gray-700 text-xs">AI-Powered Web Agency · visionc.co.kr</p>
        </div>
      </div>
    </footer>
  )
}
