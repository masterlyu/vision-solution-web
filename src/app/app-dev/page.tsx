'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CheckSquare, ChevronDown, ChevronUp } from 'lucide-react'

const checklistItems = [
  '재고·주문·고객 데이터를 아직도 엑셀로 관리한다',
  '직원이 늘었는데 업무 공유 방식이 카카오톡과 엑셀 파일뿐이다',
  '모바일 앱을 만들고 싶은데 어디에 얼마를 써야 하는지 모른다',
  '기존 시스템이 너무 오래돼서 직원들이 불편해하는데 바꾸기 무섭다',
  '외주 개발을 한 번 했다가 완성 후 연락이 끊겨서 고생한 적 있다',
  '특정 기능이 필요한데 시중 솔루션에는 없어서 직접 만들어야 할 것 같다',
]

const stats = [
  { value: '43%', label: '맞춤 시스템 도입 후 업무 처리 시간 단축' },
  { value: '72%', label: '수작업 오류 발생률 감소' },
  { value: '38%', label: '모바일 앱 도입 후 고객 재방문율 증가' },
  { value: '92%', label: '스프린트 개발 일정 준수율 (자사 기준)' },
]

const comparisons = [
  { tag: '모바일 앱',    before: '앱이 없어서 고객이 불편해한다', after: 'iOS·Android 동시 출시, 재방문율 상승', highlight: '재방문율 상승' },
  { tag: '사내 시스템',  before: '엑셀 파일이 10개, 담당자만 알고 있다', after: '전 직원 실시간 공유, 오류 70% 감소', highlight: '오류 70% 감소' },
  { tag: 'API·백엔드',  before: '외부 서비스와 연동이 안 돼서 수작업', after: '자동 데이터 연동, 사람 손 필요 없음', highlight: '자동화' },
  { tag: '레거시 전환',  before: '수정도 못 하는 낡은 시스템', after: '단계적 이전, 기존 데이터 보전 100%', highlight: '100% 보전' },
]

const steps = [
  { num: '01', title: '요구사항 분석', duration: '1~3일', desc: '기능 목록, 사용자 흐름, 데이터 구조 정의.' },
  { num: '02', title: '아키텍처 설계', duration: '1주',   desc: '기술 스택 선정, DB 설계, API 명세서 작성. 착수 전 전체 설계 공개.' },
  { num: '03', title: '스프린트 개발', duration: '4~12주', desc: '2주 단위 스프린트. 중간 시연으로 방향 확인 후 진행.' },
  { num: '04', title: '배포·인수인계', duration: '1주',   desc: '스테이징 검증 → 프로덕션 배포 → 운영 가이드 제공.' },
]

const plans = [
  { name: '랜딩·웹뷰 앱',      price: '200만원대~', items: ['웹사이트 + 앱 래핑'],                highlight: false },
  { name: '사내 관리 시스템',   price: '300만원대~', items: ['맞춤 기능', '관리자 페이지'],         highlight: false },
  { name: '모바일 앱',          price: '500만원대~', items: ['iOS·Android', '크로스플랫폼', '백엔드'], highlight: true },
  { name: '풀스택 플랫폼',      price: '1,000만원대~', items: ['회원 시스템', '결제', '대시보드'],   highlight: false },
]

const faqs = [
  { q: '아직 아이디어 단계인데 상담해도 되나요?', a: '네. 대부분의 프로젝트가 아이디어 단계에서 시작합니다. "이런 기능이 있으면 좋겠다"부터 말씀해주시면 기술 검토부터 함께 해드립니다.' },
  { q: '개발 중에 기능을 바꿀 수 있나요?', a: '스프린트 방식으로 진행하므로 2주마다 방향 조정이 가능합니다. 단, 이미 완료된 모듈 변경은 추가 비용이 발생할 수 있으며, 사전에 안내합니다.' },
  { q: '완성 후 소스 코드를 받을 수 있나요?', a: '네. 납품 시 전체 소스 코드를 제공합니다. 이후 다른 개발자가 유지보수해도 됩니다.' },
  { q: '완성 후 유지보수는 어떻게 되나요?', a: '납품 후 30일 무상 버그 수정을 제공합니다. 이후 기능 추가·유지보수는 별도 계약으로 진행합니다.' },
  { q: '개발 진행 상황을 어떻게 확인할 수 있나요?', a: '2주마다 스프린트 결과물을 시연하고, 진행 현황은 프로젝트 관리 도구에서 실시간 확인 가능합니다.' },
  { q: '비슷한 업종의 개발 경험이 있나요?', a: '제조·유통·서비스·의료·교육 등 다양한 업종에서 시스템을 개발했습니다. 상담 시 업종을 알려주시면 관련 사례를 공유합니다.' },
]

export default function AppDevPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-28 pb-20 px-6 bg-gradient-to-br from-white via-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block bg-primary/10 border border-primary/30 text-primary text-xs font-bold px-3 py-1 rounded-full mb-6">앱·시스템 개발</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6 max-w-2xl">
            엑셀로 더 이상<br />
            <span className="text-destructive">버틸 수 없는 순간</span>이 있습니다
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
            직원 10명이 같은 파일을 열었다가 덮어쓰고,<br />
            "앱으로 만들면 좋겠다"고 생각한 지 1년이 넘었다면—<br />
            지금이 바로 그 순간입니다.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base">
            어떤 시스템이 필요한지 무료 상담받기 <ArrowRight className="w-5 h-5" />
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
            <p className="text-gray-800 font-semibold">2개 이상 해당된다면, 맞춤 개발이 장기적으로 더 저렴합니다.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-[#1A1A2E]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center p-6">
                <div className="text-4xl font-black text-primary mb-2">{s.value}</div>
                <div className="text-gray-400 text-sm leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">이렇게 달라집니다</h2>
          <div className="space-y-4">
            {comparisons.map((c, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] gap-3 items-center">
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">{c.tag}</span>
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">{c.before}</div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-primary text-sm font-semibold">{c.after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">개발 프로세스</h2>
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
          <p className="text-gray-500 text-sm text-right mt-4">전체 기간: 평균 6~16주 / 매주 진행 보고</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">기본형 300만원대부터 시작합니다</h2>
          <p className="text-gray-500 mb-10">"이 정도 기능이면 얼마나 나올까요?" — 상담에서 솔직하게 말씀드립니다.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {plans.map((p, i) => (
              <div key={i} className={`rounded-2xl p-6 border-2 relative ${p.highlight ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                {p.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">추천</span>}
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{p.name}</h3>
                <p className={`text-xl font-black mb-4 ${p.highlight ? 'text-primary' : 'text-gray-700'}`}>{p.price}</p>
                <ul className="space-y-1">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-1 text-xs text-gray-700">
                      <span className="text-primary font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all">
              요구사항 공유하고 견적받기 <ArrowRight className="w-5 h-5" />
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
      <section className="py-24 px-6 text-center" style={{ background: 'linear-gradient(135deg, oklch(0.55 0.22 290), oklch(0.45 0.22 260))' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">어떤 시스템이 필요한지, 지금 말씀해주세요</h2>
          <p className="text-white/80 text-lg mb-2">아이디어 단계부터 기술 검토를 함께 합니다.</p>
          <p className="text-white/60 text-sm mb-8">상담 후 24시간 내에 기술 검토 결과를 드립니다.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary font-bold px-10 py-4 rounded-xl transition-all text-lg">
            무료 기술 검토 신청하기 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
