import Link from 'next/link'
import UrlAnalysisForm from '@/components/UrlAnalysisForm'

const analyzeItems = [
  { icon: '⚡', title: '기술 스택', desc: 'PHP·JSP·ASP·WordPress 등 언어·프레임워크·DB 탐지' },
  { icon: '🎨', title: '디자인 현황', desc: 'UI 구조, 반응형 여부, 접근성, 브랜드 일관성 분석' },
  { icon: '🔒', title: '보안 기초 점검', desc: 'SSL·보안헤더·기본 취약점 노출 여부 확인' },
  { icon: '📊', title: '성능 지표', desc: 'PageSpeed, Core Web Vitals, 모바일 최적화 점수' },
  { icon: '💰', title: '견적 산출', desc: '분석 결과 기반 리뉴얼 예상 비용 및 일정' },
  { icon: '📄', title: 'PDF 리포트', desc: '전체 분석 내용 + 리뉴얼 제안서 PDF 이메일 발송' },
]

export default function RenewalPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="text-[#C8001F] text-sm font-medium mb-3 tracking-widest">WEB RENEWAL</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            URL 하나로<br />전수 분석
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            오래된 사이트, AI가 먼저 진단합니다.<br />
            견적서 + 리뉴얼 계획서를 48시간 내 이메일로 받아보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Analysis scope */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">AI가 분석하는 항목</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {analyzeItems.map(item => (
                <div key={item.title} className="glass rounded-xl p-5 hover:border-[#C8001F]/40 transition-all">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="text-white font-bold mb-1 text-sm">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:sticky lg:top-24">
            <UrlAnalysisForm
              serviceType="renewal"
              title="무료 리뉴얼 분석 신청"
              notice="분석 결과는 PDF로 정리되어 입력하신 이메일로 발송됩니다. 영업일 기준 1~2일 내 발송됩니다."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
