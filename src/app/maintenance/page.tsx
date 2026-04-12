import UrlAnalysisForm from '@/components/UrlAnalysisForm'

const plans = [
  { name: 'BASIC', price: '월 15만원~', items: ['월 2회 콘텐츠 업데이트', '장애 대응 (24h)', '월간 보안 점검', '백업 관리'] },
  { name: 'PRO', price: '월 30만원~', items: ['무제한 콘텐츠 업데이트', '장애 대응 (4h)', '주간 보안 점검', '성능 최적화', 'SEO 관리'], highlight: true },
  { name: 'ENTERPRISE', price: '협의', items: ['전담 담당자', '실시간 모니터링', '월간 리포트', '기능 개선 포함', '우선 지원'] },
]

export default function MaintenancePage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#C8001F] text-sm font-medium mb-3 tracking-widest">MAINTENANCE</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">웹사이트 유지보수</h1>
          <p className="text-gray-400 text-lg">URL을 입력하시면 현황 분석 후 맞춤 유지보수 견적을 드립니다.</p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map(plan => (
            <div key={plan.name}
              className={`glass rounded-2xl p-6 transition-all ${plan.highlight ? 'border-[#C8001F]/50 bg-[#C8001F]/5 glow-red' : 'hover:border-[#C8001F]/30'}`}>
              {plan.highlight && (
                <div className="text-xs font-bold text-[#C8001F] mb-3 tracking-widest">MOST POPULAR</div>
              )}
              <h3 className="text-white font-black text-xl mb-1">{plan.name}</h3>
              <div className="text-[#C8001F] text-2xl font-bold mb-4">{plan.price}</div>
              <ul className="space-y-2">
                {plan.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="text-[#C8001F]">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto">
          <UrlAnalysisForm
            serviceType="maintenance"
            title="유지보수 견적 신청"
            notice="사이트 현황을 분석한 후 최적의 유지보수 플랜과 견적서를 이메일로 발송합니다."
          />
        </div>
      </div>
    </div>
  )
}
