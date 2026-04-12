import Link from 'next/link'

const solutions = [
  { icon: '🤖', title: 'AI 챗봇 구축', desc: '고객 응대·FAQ 자동화. GPT 기반 맞춤 학습 챗봇' },
  { icon: '📊', title: '데이터 분석 대시보드', desc: '매출·재고·고객 데이터 자동 집계·시각화' },
  { icon: '✍️', title: 'AI 콘텐츠 생성', desc: '블로그·SNS·상품 설명 AI 자동 작성 시스템' },
  { icon: '🔍', title: '자동화 리포트', desc: '정기 보고서 AI 생성·이메일 자동 발송' },
  { icon: '🧠', title: 'LLM 비즈니스 통합', desc: '사내 문서 검색·업무 자동화 AI 에이전트 구축' },
  { icon: '📈', title: '예측 모델링', desc: '수요 예측·이탈 예측·추천 시스템 구축' },
]

const cases = [
  { company: '○○ 제조사 (직원 30명)', before: '고객 문의 응대에 하루 2시간 소요', after: 'AI 챗봇 도입 후 85% 자동 처리, 담당자 응대 15%만 남음' },
  { company: '○○ 온라인몰', before: '상품 설명 1개 작성에 30분', after: 'AI 자동 생성으로 1분 이내, 월 300건 처리' },
]

export default function AiSolutionPage() {
  return (
    <div className="section min-h-screen pt-24">
      <div className="container-base">
        <div className="text-center mb-16">
          <span className="label">AI SOLUTION</span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">AI 솔루션</h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            AI, 대기업만의 이야기가 아닙니다.<br />
            중소기업에 맞는 실용적인 AI를 도입하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {solutions.map(s => (
            <div key={s.title} className="card hover:border-brand/40">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-white font-bold mb-2">{s.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">도입 사례</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map(c => (
              <div key={c.company} className="card">
                <div className="text-brand text-xs font-bold mb-4 tracking-wider">{c.company}</div>
                <div className="flex flex-col gap-3">
                  <div className="bg-neutral-800 rounded-xl p-4">
                    <div className="text-neutral-500 text-xs mb-1">BEFORE</div>
                    <p className="text-neutral-300 text-sm">{c.before}</p>
                  </div>
                  <div className="bg-brand/10 border border-brand/20 rounded-xl p-4">
                    <div className="text-brand text-xs mb-1">AFTER</div>
                    <p className="text-white text-sm">{c.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card border-brand/20 bg-brand/5 text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-3">어떤 업무를 자동화할 수 있을까요?</h2>
          <p className="text-neutral-400 mb-6">현재 업무 프로세스를 공유해 주시면 AI 도입 가능 영역을 무료로 분석해 드립니다.</p>
          <Link href="/contact" className="btn-red">무료 AI 도입 분석 신청</Link>
        </div>
      </div>
    </div>
  )
}
