import UrlAnalysisForm from '@/components/UrlAnalysisForm'
import { CheckCircle2 } from 'lucide-react'

const plans = [
  { name: 'BASIC', price: '월 15만원~', highlight: false,
    items: ['월 2회 콘텐츠 업데이트', '장애 대응 (24h)', '월간 보안 점검', '백업 관리'] },
  { name: 'PRO', price: '월 30만원~', highlight: true,
    items: ['무제한 콘텐츠 업데이트', '장애 대응 (4h)', '주간 보안 점검', '성능 최적화', 'SEO 관리'] },
  { name: 'ENTERPRISE', price: '협의', highlight: false,
    items: ['전담 담당자', '실시간 모니터링', '월간 리포트', '기능 개선 포함', '우선 지원'] },
]

export default function MaintenancePage() {
  return (
    <div className="section min-h-screen pt-28 bg-[#09090B]">
      <div className="container-base">
        <div className="text-center mb-16">
          <span className="label">MAINTENANCE</span>
          <h1 className="section-title">웹사이트 유지보수</h1>
          <p className="section-sub">URL을 입력하시면 현황 분석 후 맞춤 유지보수 견적을 드립니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map(plan => (
            <div key={plan.name} className={plan.highlight ? 'card-highlight' : 'card'}>
              {plan.highlight && <div className="text-xs font-bold text-brand mb-3 tracking-widest">MOST POPULAR</div>}
              <h3 className="text-white font-black text-xl mb-1">{plan.name}</h3>
              <div className="text-brand text-2xl font-bold mb-5">{plan.price}</div>
              <ul className="space-y-2.5">
                {plan.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-neutral-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" strokeWidth={2} />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-xl mx-auto">
          <UrlAnalysisForm serviceType="maintenance" title="유지보수 견적 신청"
            notice="현재 사이트 상태 분석 후 맞춤 플랜을 제안드립니다." />
        </div>
      </div>
    </div>
  )
}
