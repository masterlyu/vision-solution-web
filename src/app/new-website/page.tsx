import Link from 'next/link'

const steps = [
  { n: '01', title: '기획 상담', desc: '목적·타겟·예산·일정 협의. 사이트맵 초안 작성', days: '1~2일' },
  { n: '02', title: 'UI/UX 설계', desc: 'AI 디자이너가 와이어프레임 + 디자인 시안 3종 제안', days: '3~5일' },
  { n: '03', title: '개발', desc: 'Next.js 기반 반응형 웹 개발. 관리자 페이지 포함', days: '7~14일' },
  { n: '04', title: '검수 & 배포', desc: '크로스브라우저 테스트, 속도 최적화, 도메인 연결', days: '2~3일' },
]

const features = [
  'Next.js 15 + TypeScript', 'AI 맞춤 디자인', '반응형 (모바일/태블릿/PC)',
  '관리자 CMS 포함', 'SEO 최적화 기본', 'SSL 보안 설정',
  '속도 최적화 (PageSpeed 90+)', 'Google Analytics 연동',
]

export default function NewWebsitePage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#C8001F] text-sm font-medium mb-3 tracking-widest">NEW WEBSITE</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            처음부터 제대로
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            AI 에이전트 팀이 기획부터 배포까지.<br />
            보통 2~3주, 최속 1주일 납품.
          </p>
        </div>

        {/* Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">제작 프로세스</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <div key={s.n} className="glass rounded-2xl p-6 hover:border-[#C8001F]/40 transition-all">
                <div className="text-[#C8001F] text-3xl font-black mb-2">{s.n}</div>
                <div className="text-xs text-gray-600 mb-3 font-mono">{s.days}</div>
                <h3 className="text-white font-bold mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="glass rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-white mb-6">기본 포함 사항</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {features.map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-gray-400">
                <span className="text-[#C8001F] font-bold">✓</span> {f}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-500 mb-4 text-sm">제작 비용은 규모·기능에 따라 다릅니다. 무료 상담으로 확인하세요.</p>
          <Link href="/contact"
            className="inline-block px-10 py-4 bg-[#C8001F] text-white font-bold rounded-xl hover:bg-[#E0001F] transition-all glow-red">
            무료 상담 신청 →
          </Link>
        </div>
      </div>
    </div>
  )
}
