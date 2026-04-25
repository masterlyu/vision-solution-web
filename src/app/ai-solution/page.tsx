'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CheckSquare, ChevronDown, ChevronUp } from 'lucide-react'

const checklistItems = [
  '같은 질문을 하루에도 수십 번 고객에게 답하고 있다',
  '매일 똑같은 양식의 보고서를 수작업으로 만들고 있다',
  '주문·재고 현황을 엑셀로 수동 집계하는 데 시간을 쓴다',
  '상품 설명이나 SNS 글 쓰는 데 시간이 너무 많이 걸린다',
  '"AI 도입하면 좋겠다"는 건 알지만 어떻게 시작해야 할지 모른다',
  'IT 전담 인력이 없어서 새로운 시스템 도입이 두렵다',
]

const cases = [
  { tag: '제조사 (직원 30명)', before: '고객 문의 하루 2시간 수동 응대', after: 'AI 챗봇으로 85% 자동 처리', highlight: '85%' },
  { tag: '온라인몰', before: '상품 설명 건당 30분 작성', after: 'AI 자동 생성 1분, 월 300건 처리', highlight: '1분' },
  { tag: '서비스업', before: '매일 아침 리포트 1.5시간 수작업', after: '자동 생성·이메일 발송, 담당자 0분', highlight: '0분' },
  { tag: '소매업', before: '주 2회 2시간 엑셀 재고 집계', after: '실시간 대시보드, 자동 업데이트', highlight: '실시간' },
]

const aiTypes = [
  { emoji: '🤖', name: 'AI 챗봇',          desc: '고객 응대 24시간 자동화, 직원은 복잡한 문의만' },
  { emoji: '📊', name: '데이터 대시보드',   desc: '매출·재고 자동 집계, 엑셀 수작업 종료' },
  { emoji: '✍️', name: 'AI 콘텐츠 생성',   desc: '블로그·SNS·상품 설명 초안 자동 작성' },
  { emoji: '📧', name: '자동 리포트',       desc: '정기 보고서 AI 생성 후 이메일 자동 발송' },
  { emoji: '🔄', name: '반복 업무 자동화', desc: '반복 업무 처리, 사내 문서 검색' },
  { emoji: '📈', name: '예측 분석',         desc: '수요 예측, 이탈 고객 예측, 추천 시스템' },
]

const steps = [
  { num: '01', title: '업무 분석', duration: '무료, 1일', desc: '현재 업무 프로세스 공유 → AI 도입 가능 영역 도출.' },
  { num: '02', title: '솔루션 설계', duration: '1주', desc: '어떤 AI 도구가 적합한지, 예산과 효과를 같이 검토.' },
  { num: '03', title: '구축·학습', duration: '2~6주', desc: '데이터 학습, 연동, 테스트. 진행 상황 매주 보고.' },
  { num: '04', title: '인수인계·운영', duration: '상시', desc: '담당자 교육. 이후 이상 시 즉시 대응.' },
]

const plans = [
  { name: '기본 자동화',      price: '100만원대~', items: ['단순 반복 업무 자동화 1~2개'],                            highlight: false },
  { name: 'AI 챗봇 구축',    price: '200만원대~', items: ['맞춤 학습 챗봇', '웹사이트 연동'],                        highlight: true },
  { name: '커스텀 AI 솔루션', price: '500만원대~', items: ['분석 대시보드', '예측 모델링', '커스텀 개발'],           highlight: false },
]

const faqs = [
  { q: 'IT 전문 지식이 없어도 사용할 수 있나요?', a: '네. 완성 후 사용법은 영상 가이드와 직접 교육으로 제공합니다. 클릭 몇 번으로 운영할 수 있도록 설계합니다.' },
  { q: '도입하면 직원을 줄여야 하나요?', a: '반복 업무를 없애는 것이지 사람을 대체하는 게 아닙니다. 직원들이 더 중요한 일에 집중할 수 있게 됩니다.' },
  { q: '우리 회사 데이터가 외부에 유출되지 않나요?', a: '구축한 AI는 독립 서버에서 운영되며, 외부 AI 서비스에 데이터를 전달하지 않도록 설계 가능합니다. 보안 요구사항은 상담 시 협의합니다.' },
  { q: '어떤 업무가 자동화 가능한지 모르는데 어떻게 시작하나요?', a: '현재 업무 목록을 공유해 주시면, 무료로 자동화 가능 영역을 분석해드립니다. 상담에서 다 정리해드립니다.' },
  { q: '완성 후 AI가 잘못된 답변을 하면 어떻게 되나요?', a: '납품 전 100건 이상의 테스트를 진행합니다. 운영 중 오류 발생 시 즉시 수정합니다. 30일 무상 AS가 포함됩니다.' },
  { q: '월 비용이 추가로 발생하나요?', a: '구축 비용 외에 서버·API 사용료가 월별로 발생할 수 있습니다. 규모에 따라 월 5~30만원 수준이며, 상담 시 정확히 안내합니다.' },
]

export default function AiSolutionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-28 pb-20 px-6 bg-[#0D1117]" style={{ background: 'radial-gradient(ellipse at top right, rgba(99,102,241,0.2) 0%, #0D1117 60%)' }}>
        <div className="max-w-6xl mx-auto">
          <span className="inline-block bg-primary/20 border border-primary/40 text-primary text-xs font-bold px-3 py-1 rounded-full mb-6">중소기업 AI 솔루션</span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 max-w-2xl">
            직원이 하루 2시간씩 반복 업무를 하고 있다면,<br />
            <span className="text-primary">AI가 대신할 수 있습니다</span>
          </h1>
          <p className="text-[#b0b8d0] text-lg leading-relaxed mb-8 max-w-xl">
            고객 문의 자동 응답, 주문 집계, 보고서 작성—<br />
            지금 당장 없애도 되는 반복 업무가 있다면, 100만원대부터 시작합니다.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base">
            무료 AI 도입 가능 영역 분석받기 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 px-6 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">혹시 이런 상황이세요?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {checklistItems.map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-5 flex items-start gap-3">
                <CheckSquare className="w-5 h-5 text-gray-300 mt-0.5 shrink-0" />
                <span className="text-gray-800 font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="border-l-4 border-primary bg-blue-50 px-6 py-4 rounded-r-xl">
            <p className="text-gray-800 font-semibold">2개 이상 해당된다면, AI가 실질적으로 도움이 될 수 있습니다.</p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6 bg-[#0D1117]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10">실제 도입 사례</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cases.map((c, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <span className="text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-full">{c.tag}</span>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="bg-red-950/40 rounded-lg px-4 py-3 text-red-300 text-sm">이전: {c.before}</div>
                  <div className="text-gray-500 text-center text-sm">→</div>
                  <div className="bg-primary/10 rounded-lg px-4 py-3 text-primary text-sm font-semibold">
                    이후: {c.after} <span className="text-2xl font-black ml-1">{c.highlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Types */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">어떤 AI가 내 업무에 맞을까요?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {aiTypes.map((t, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 hover:border-primary border-2 border-transparent transition-all">
                <div className="text-3xl mb-3">{t.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-1">{t.name}</h3>
                <p className="text-gray-600 text-sm">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">진행 프로세스</h2>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-black shrink-0">{s.num}</div>
                <div className="bg-white rounded-xl p-5 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-gray-900">{s.title}</span>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">{s.duration}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm text-right mt-4">진행 상황 매주 공유</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">기본형 100만원대부터 시작합니다</h2>
          <p className="text-gray-500 mb-10">어떤 업무를 자동화하고 싶은지 말씀해주시면, 예산 내에서 가능한 범위를 알려드립니다.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((p, i) => (
              <div key={i} className={`rounded-2xl p-8 border-2 relative ${p.highlight ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                {p.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">추천</span>}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{p.name}</h3>
                <p className={`text-2xl font-black mb-6 ${p.highlight ? 'text-primary' : 'text-gray-700'}`}>{p.price}</p>
                <ul className="space-y-2">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-primary font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all">
              내 업무에 맞는 AI 솔루션 견적받기 <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-[#F8F9FA]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">자주 묻는 질문</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900">
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-primary shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 bg-[#0D1117] text-center" style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, #0D1117 70%)' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">어떤 업무를 자동화할 수 있을지 지금 알아보세요</h2>
          <p className="text-[#b0b8d0] text-lg mb-8">도입 안 해도 분석 결과는 드립니다.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-10 py-4 rounded-xl transition-all text-lg">
            무료 AI 도입 분석 신청하기 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
