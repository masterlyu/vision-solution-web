import Link from 'next/link'

const steps = [
  { n: '01', t: '기획 상담', d: '목적·타겟·예산·일정 협의 + 사이트맵 작성', days: '1~2일' },
  { n: '02', t: 'UI/UX 설계', d: 'AI 디자이너 와이어프레임 + 시안 3종 제안', days: '2~3일' },
  { n: '03', t: '개발', d: 'Next.js 반응형 웹 개발 + 관리자 CMS', days: '5~10일' },
  { n: '04', t: '검수 & 배포', d: '테스트 → 속도 최적화 → 도메인 연결', days: '1~2일' },
]

const features = [
  'Next.js 15 + TypeScript', 'AI 맞춤 디자인', '반응형 (모바일·태블릿·PC)',
  '관리자 CMS 포함', 'SEO 기본 최적화', 'SSL 보안 설정',
  'PageSpeed 90+ 보장', 'Google Analytics 연동',
]

const packages = [
  { name: 'STARTER', price: '150만원~', desc: '소개 페이지 5장 이내', tag: '' },
  { name: 'BUSINESS', price: '300만원~', desc: '회사소개·서비스·포트폴리오·문의 풀구성', tag: '인기', highlight: true },
  { name: 'CUSTOM', price: '협의', desc: '쇼핑몰·예약·회원 기능 포함 복합 구성', tag: '' },
]

export default function NewWebsitePage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="section-label">NEW WEBSITE</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">처음부터 제대로</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            AI 에이전트 팀이 기획부터 배포까지.<br />
            <strong className="text-white">빠르면 1주, 보통 2주</strong> 안에 납품합니다.
          </p>
        </div>

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">제작 프로세스</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div key={s.n} className="glass rounded-2xl p-6 card-hover">
                <div className="w-9 h-9 rounded-lg bg-[#C8001F]/15 border border-[#C8001F]/30 flex items-center justify-center text-[#C8001F] font-black text-xs mb-3">
                  {s.n}
                </div>
                <div className="text-[10px] text-gray-600 font-mono mb-2 tracking-wider">{s.days}</div>
                <h3 className="text-white font-bold mb-1 text-sm">{s.t}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-xs mt-4">* 총 제작 기간: 약 9~17일 (규모·복잡도에 따라 변동)</p>
        </div>

        {/* Packages */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">패키지 요금</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {packages.map(pkg => (
              <div key={pkg.name}
                className={`glass rounded-2xl p-7 card-hover ${pkg.highlight ? 'border-[#C8001F]/40 bg-[#C8001F]/5' : ''}`}>
                {pkg.highlight && <span className="tag bg-[#C8001F]/20 text-[#C8001F] mb-4">인기</span>}
                <div className="text-white font-black text-lg mb-1">{pkg.name}</div>
                <div className="text-[#C8001F] text-3xl font-black mb-2">{pkg.price}</div>
                <p className="text-gray-500 text-sm">{pkg.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-xs mt-4">부가세 별도 · 유지보수 별도 · 상세 견적은 무료 상담 후 확정</p>
        </div>

        {/* Features */}
        <div className="glass rounded-2xl p-8 mb-12">
          <h2 className="text-lg font-bold text-white mb-5">기본 포함 사항</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-4">
            {features.map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-gray-400">
                <span className="text-[#C8001F] font-bold flex-shrink-0">✓</span> {f}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/contact" className="btn-primary text-base">
            무료 상담 신청 →
          </Link>
        </div>
      </div>
    </div>
  )
}
