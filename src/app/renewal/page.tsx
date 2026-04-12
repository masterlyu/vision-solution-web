import UrlAnalysisForm from '@/components/UrlAnalysisForm'
import { Cpu, Paintbrush2, ShieldCheck, BarChart3, Calculator, FileText } from 'lucide-react'

const items = [
  { icon: Cpu,          title: '기술 스택',     desc: 'PHP·JSP·ASP·WordPress 등 언어·프레임워크·DB 탐지' },
  { icon: Paintbrush2,  title: '디자인 현황',   desc: 'UI 구조, 반응형 여부, 접근성, 브랜드 일관성 분석' },
  { icon: ShieldCheck,  title: '보안 기초 점검', desc: 'SSL·보안헤더·기본 취약점 노출 여부 확인' },
  { icon: BarChart3,    title: '성능 지표',      desc: 'PageSpeed, Core Web Vitals, 모바일 최적화 점수' },
  { icon: Calculator,   title: '견적 산출',      desc: '분석 결과 기반 리뉴얼 예상 비용 및 일정' },
  { icon: FileText,     title: 'PDF 리포트',     desc: '전체 분석 내용 + 리뉴얼 제안서 PDF 이메일 발송' },
]

export default function RenewalPage() {
  return (
    <div className="section min-h-screen pt-28 bg-[#09090B]">
      <div className="container-base">
        <div className="text-center mb-16">
          <span className="label">WEB RENEWAL</span>
          <h1 className="section-title">URL 하나로<br />전수 분석</h1>
          <p className="section-sub max-w-2xl mx-auto">
            오래된 사이트, AI가 먼저 진단합니다.<br />
            견적서 + 리뉴얼 계획서를 48시간 내 이메일로 받아보세요.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-xl font-bold text-white mb-6">AI가 분석하는 항목</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map(item => (
                <div key={item.title} className="card group">
                  <div className="icon-box"><item.icon className="w-5 h-5 text-brand" strokeWidth={1.5} /></div>
                  <h3 className="text-white font-bold mb-1">{item.title}</h3>
                  <p className="text-neutral-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:sticky lg:top-24">
            <UrlAnalysisForm serviceType="renewal" title="무료 리뉴얼 분석 신청"
              notice="분석 결과는 PDF로 정리되어 입력하신 이메일로 발송됩니다. 영업일 기준 1~2일 내 발송됩니다." />
          </div>
        </div>
      </div>
    </div>
  )
}
