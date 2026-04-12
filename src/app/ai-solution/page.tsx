import Link from 'next/link'

const solutions = [
  { icon: '🏭', title: 'ERP 연계 AI', desc: 'SAP·더존·영림원 ERP에 AI 분석·예측 레이어 추가. 재고 최적화, 수요 예측 자동화.' },
  { icon: '📚', title: 'KMS 지식관리', desc: '사내 문서·매뉴얼을 RAG로 구축. 직원이 자연어로 질문하면 AI가 즉시 답변.' },
  { icon: '📊', title: 'Excel 자동화', desc: '반복 Excel 작업을 AI 워크플로우로 대체. 데이터 수집·정제·보고서 자동 생성.' },
  { icon: '🤖', title: '챗봇 / 상담봇', desc: '고객 응대 자동화. 홈페이지·카카오·슬랙 연동. 24시간 자동 응답.' },
  { icon: '🖥️', title: '하드웨어 포함', desc: 'AI 서버 선정부터 설치·구성까지. 클라우드 또는 온프레미스 구축 모두 지원.' },
  { icon: '🎓', title: '직원 교육', desc: 'AI 도입 후 실무 활용 교육. 부서별 맞춤 워크숍 제공.' },
]

export default function AiSolutionPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#C8001F] text-sm font-medium mb-3 tracking-widest">AI SOLUTION</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            중소기업 AI 도입,<br />처음부터 끝까지
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            ERP·KMS·Excel과 연계되는 맞춤형 AI 시스템.<br />
            하드웨어 선정부터 직원 교육까지 원스톱 지원.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {solutions.map(s => (
            <div key={s.title} className="glass rounded-2xl p-6 hover:border-[#C8001F]/40 transition-all group">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-white font-bold mb-2 group-hover:text-[#C8001F] transition-colors">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="glass rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-white mb-6 text-center">도입 프로세스</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {['현황 진단', 'AI 설계', '구축·연동', '교육·운영'].map((step, i) => (
              <div key={step} className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 rounded-full bg-[#C8001F]/20 border border-[#C8001F]/50 flex items-center justify-center text-[#C8001F] font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-white text-sm font-medium">{step}</span>
                {i < 3 && <div className="hidden md:block flex-1 h-px bg-[#2A2A2A]" />}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/contact"
            className="inline-block px-10 py-4 bg-[#C8001F] text-white font-bold rounded-xl hover:bg-[#E0001F] transition-all glow-red">
            AI 도입 상담 →
          </Link>
        </div>
      </div>
    </div>
  )
}
