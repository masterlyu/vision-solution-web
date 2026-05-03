'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CheckSquare, ChevronDown, ChevronUp, Zap, Smartphone, Target, Search } from 'lucide-react'

const checklistItems = [
  '홈페이지를 만든 지 3년이 넘었다',
  '모바일로 보면 글자가 너무 작거나 레이아웃이 깨진다',
  '구글·네이버에서 우리 회사가 잘 검색되지 않는다',
  '홈페이지는 있는데 문의가 거의 없다',
  '경쟁사 사이트와 비교했을 때 우리 사이트가 초라해 보인다',
  '페이지 로딩이 느려서 고객이 기다리다 떠날 것 같다',
]

const stats = [
  { value: '53%', label: '로딩 3초 초과 시 이탈률 급등' },
  { value: '67%', label: '모바일 미최적화 전환율 손실' },
  { value: '2.3배', label: '리뉴얼 후 문의 증가 (자사 기준)' },
  { value: '140%', label: '검색 노출 개편 3개월 내 유입 증가' },
]

const solutions = [
  { icon: Zap,        title: '속도 최적화',       desc: '로딩 3초 → 0.8초. 고객이 기다리지 않습니다.' },
  { icon: Smartphone, title: '모바일 퍼스트 설계', desc: '스마트폰으로 봐도 버튼이 크고 글씨가 선명합니다.' },
  { icon: Target,     title: '문의 유도 화면 재설계',  desc: '방문자가 자연스럽게 "문의하기"를 누르게 됩니다.' },
  { icon: Search,     title: '검색 노출 구조 개편',     desc: '구글·네이버에서 경쟁사보다 먼저 노출됩니다.' },
]

const steps = [
  { num: '01', title: '무료 현황 진단', duration: '2일',   desc: '현재 사이트 속도·검색 노출·화면 분석 결과서. 비용 없음.' },
  { num: '02', title: '기획·설계',     duration: '1주',   desc: '사이트 구성, 화면 배치, 디자인 시안 3종 제시 후 확정.' },
  { num: '03', title: '개발·이전',     duration: '2~3주', desc: '데이터 손실 없이 기존 콘텐츠를 새 사이트로 옮깁니다.' },
  { num: '04', title: '검수·배포',     duration: '3일',   desc: '모든 기기에서 최종 점검 후 도메인 무중단 전환.' },
]

const plans = [
  { name: '기본형', price: '100만원대~', items: ['디자인 리뉴얼', '모바일 최적화', '속도 개선'], highlight: false },
  { name: '표준형', price: '200만원대~', items: ['기본형 전체', '검색 노출 구조 개편', '문의 버튼 배치 재설계'], highlight: true },
  { name: '확장형', price: '300만원대~', items: ['표준형 전체', '콘텐츠 전략', '분석 도구 연동'], highlight: false },
]

const faqs = [
  { q: '리뉴얼하면 기존 고객 데이터나 구글 검색 순위가 날아가지 않나요?', a: '기존 주소 구조를 최대한 유지하고, 이전 주소를 새 주소로 자동 연결하는 기술 처리로 검색 순위를 보전합니다. 고객 DB와 게시물 데이터는 이전 전에 전체 백업 후 옮깁니다.' },
  { q: '기간이 얼마나 걸리나요?', a: '규모에 따라 다르지만, 일반 기업 홈페이지는 평균 4~5주입니다. 착수 전에 정확한 일정표를 드립니다. 일정 초과 시 사전에 반드시 말씀드립니다.' },
  { q: '완성 후 수정이 필요하면 어떻게 하나요?', a: '납품 후 30일은 무상 수정을 제공합니다. 이후에는 유지보수 플랜(월 99,000원~)으로 계속 관리할 수 있습니다.' },
  { q: '리뉴얼 중에도 기존 사이트를 계속 운영할 수 있나요?', a: '네. 별도 개발 환경에서 작업 후 완료 시 도메인만 전환하므로, 리뉴얼 기간 동안 기존 사이트는 정상 운영됩니다.' },
  { q: '어떤 업종의 사이트를 많이 만드셨나요?', a: '제조업, 서비스업, 요식업, 병원/클리닉, IT 스타트업 등 다양한 업종을 경험했습니다. 업종별 전환율 높은 패턴을 적용합니다.' },
  { q: '계약금은 얼마나 되나요?', a: '계약금 30%, 중도금 40%, 잔금 30% 구조입니다. 잔금은 완성물 확인 후 납부하시면 됩니다.' },
]

export default function RenewalPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-28 pb-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block bg-primary/20 border border-primary/40 text-primary text-xs font-bold px-3 py-1 rounded-full mb-6">홈페이지 리뉴얼</span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 max-w-2xl">
            지금 이 순간도,<br />
            고객이 당신 사이트에서{' '}
            <span className="text-destructive">떠나고</span> 있습니다
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
            홈페이지가 낡았다는 걸 알지만 어디서부터 시작해야 할지 모르겠다면,<br />
            URL 하나만 입력하세요. 48시간 내에 무료 진단 리포트를 보내드립니다.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base">
            지금 무료 진단 받기 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">혹시 이런 상황이세요?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {checklistItems.map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-5 flex items-start gap-3">
                <CheckSquare className="w-5 h-5 text-gray-300 mt-0.5 shrink-0" />
                <span className="text-gray-800 font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="border-l-4 border-destructive bg-red-50 px-6 py-4 rounded-r-xl">
            <p className="text-gray-800 font-semibold">2개 이상 해당된다면, 홈페이지가 매출의 발목을 잡고 있습니다.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">수치로 보는 현실</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center p-6 bg-card rounded-2xl">
                <div className="text-4xl font-black text-primary mb-2">{s.value}</div>
                <div className="text-muted-foreground text-sm leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10">리뉴얼 후 이렇게 달라집니다</h2>
          <div className="space-y-4">
            {solutions.map((s, i) => (
              <div key={i} className="flex items-start gap-5 bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="font-bold text-white">{s.title}</span>
                  <span className="text-gray-400 ml-2">→ {s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-10">진행 프로세스</h2>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-black shrink-0">{s.num}</div>
                {i < steps.length - 1 && <div className="absolute ml-5 mt-10 w-px h-4 bg-primary/30" />}
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
          <p className="text-gray-500 text-sm text-right mt-4">전체 기간: 평균 4~5주 / 일정 초과 시 사전 고지 의무</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">기본형 100만원대부터 시작합니다</h2>
          <p className="text-gray-500 mb-10">정확한 견적은 무료 상담 후 제공합니다.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((p, i) => (
              <div key={i} className={`rounded-2xl p-8 border-2 relative transition-all ${
                p.highlight ? 'border-primary bg-primary/5' : 'border-gray-200'
              }`}>
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
              무료 견적 확인하기 <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">자주 묻는 질문</h2>
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
      <section className="py-24 px-6 bg-card text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">지금 URL 하나만 주세요</h2>
          <p className="text-muted-foreground text-lg mb-8">48시간 내에 무료 진단 리포트를 드립니다.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary font-bold px-10 py-4 rounded-xl transition-all text-lg">
            무료 진단 신청하기 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
