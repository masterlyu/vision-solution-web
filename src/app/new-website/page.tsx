'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CheckSquare, ChevronDown, ChevronUp, Target, Smartphone, PenLine, Search } from 'lucide-react'

const checklistItems = [
  '처음으로 홈페이지를 만들려는데 어디서 시작해야 할지 모르겠다',
  '저렴한 곳에 맡겼다가 완성 후 연락이 안 돼서 고생한 경험이 있다',
  '쇼핑몰인지, 브랜드 사이트인지, 어떤 유형이 맞는지 모르겠다',
  '견적을 받으러 갔더니 용어가 어려워서 뭘 사는 건지 몰랐다',
  '완성 후에도 글 하나 수정하려면 개발자에게 연락해야 한다',
  '경쟁사에 비해 온라인 존재감이 너무 약하다고 느낀다',
]

const stats = [
  { value: '0.05초', label: '처음 방문자의 첫 인상 형성 시간' },
  { value: '0.3%', label: '문의 버튼 없는 사이트 평균 문의 전환율' },
  { value: '2.1배', label: '전환율 설계 후 문의 증가 (자사 기준)' },
  { value: '63%', label: '국내 모바일 인터넷 이용 비율' },
]

const solutions = [
  { icon: Target,     title: '문의 유도 설계',    desc: '방문자가 "여기다"라고 느끼고 문의 버튼을 누르게 됩니다.' },
  { icon: Smartphone, title: '모바일 퍼스트',  desc: '스마트폰에서 먼저 완벽하게, PC에서도 깔끔하게.' },
  { icon: PenLine,    title: '직접 편집 가능', desc: '관리자 페이지 제공으로 글·이미지를 직접 수정할 수 있습니다.' },
  { icon: Search,     title: '검색 노출 기반 설계',  desc: '구글·네이버 상위 노출을 처음부터 고려해서 구조를 잡습니다.' },
]

const siteTypes = [
  { emoji: '🏢', name: '브랜드 사이트',  when: '회사·포트폴리오',   feature: '신뢰감 + 검색 노출 중심' },
  { emoji: '🛒', name: '쇼핑몰·커머스',  when: '제품 판매',         feature: '결제·재고 시스템 포함' },
  { emoji: '🔧', name: '서비스 플랫폼',  when: '예약·멤버십·커뮤니티', feature: '기능 중심, 사용자 계정' },
  { emoji: '📣', name: '랜딩페이지',     when: '광고·프로모션',     feature: '단일 문의 유도, 빠른 론칭' },
]

const steps = [
  { num: '01', title: '요구사항 정의', duration: '1~2일', desc: '목적·타겟·기능 목록 확정. 이런 게 필요할 것 같아요부터 시작해도 됩니다.' },
  { num: '02', title: '기획·디자인',   duration: '1~2주', desc: '사이트맵, 와이어프레임, 디자인 시안 3종 제시. 확정 전까지 수정 제한 없음.' },
  { num: '03', title: '개발',           duration: '2~4주', desc: '화면 설계부터 기능 개발, 관리자 페이지까지. 진행 상황 매주 공유.' },
  { num: '04', title: '배포·인수인계', duration: '3일',   desc: '서버 세팅, 도메인 연결, 보안 인증서 설치까지 전부 대신해드립니다.' },
]

const plans = [
  { name: '랜딩페이지',     price: '100만원대~', items: ['단일 페이지', '문의 유도 중심 설계'],            highlight: false },
  { name: '브랜드 사이트',  price: '200만원대~', items: ['다중 페이지', '검색 노출 구조', '관리자 페이지'], highlight: true },
  { name: '커머스·플랫폼',  price: '500만원대~', items: ['결제 시스템', '회원 관리', '재고 연동'],    highlight: false },
]

const faqs = [
  { q: '처음 맡기는 거라 막막한데, 어디서 시작하면 되나요?', a: '아이디어나 경쟁사 사이트 예시 하나만 있어도 충분합니다. 무료 상담에서 어떤 기능이 필요한지 함께 정리해 드립니다.' },
  { q: '완성 후 직접 글과 사진을 수정할 수 있나요?', a: '네. 관리자 페이지를 제공해서 개발자 없이도 텍스트·이미지를 수정할 수 있습니다. 사용법은 영상 가이드로 제공합니다.' },
  { q: '도메인과 서버(호스팅)도 대신 설정해주나요?', a: '네. 도메인 구매부터 서버 설정, 보안 인증서(자물쇠 표시) 설치까지 전부 대신해드립니다. 신경 쓸 부분이 없습니다.' },
  { q: '완성 후 유지보수는 어떻게 되나요?', a: '납품 후 30일 무상 수정을 제공합니다. 이후에는 월 99,000원~의 유지보수 플랜으로 관리할 수 있습니다.' },
  { q: '비슷한 업종 사이트 참고 사례를 볼 수 있나요?', a: '상담 신청 시 업종을 알려주시면 관련 포트폴리오를 보내드립니다.' },
  { q: '중간에 기능 추가가 가능한가요?', a: '기획 확정 전까지는 변경이 자유롭습니다. 개발 착수 후 기능 추가는 추가 견적 협의가 필요하며, 사전에 안내드립니다.' },
]

export default function NewWebsitePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-28 pb-20 px-6 bg-gradient-to-br from-white via-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block border border-primary/40 text-primary text-xs font-bold px-3 py-1 rounded-full mb-6">신규 홈페이지 구축</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6 max-w-2xl">
            홈페이지를 만들었는데<br />
            왜 <span className="text-primary">문의가 없을까요?</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
            처음부터 전환율 중심으로 설계하면,<br />
            사이트가 24시간 영업사원이 됩니다.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base">
            어떤 사이트가 필요한지 무료 상담받기 <ArrowRight className="w-5 h-5" />
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
          <div className="border-l-4 border-primary bg-card px-6 py-4 rounded-r-xl">
            <p className="text-foreground font-semibold">하나라도 해당된다면, 사이트 구조부터 다시 생각해야 합니다.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-card">
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

      {/* Solution */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">구축 후 이렇게 달라집니다</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {solutions.map((s, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">{s.title}</p>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Site Types */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">어떤 사이트가 필요하신가요?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {siteTypes.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-sm hover:border-primary border-2 border-transparent transition-all cursor-pointer">
                <div className="text-4xl mb-3">{t.emoji}</div>
                <h3 className="font-bold text-gray-900 mb-1">{t.name}</h3>
                <p className="text-gray-500 text-xs mb-2">{t.when}</p>
                <p className="text-gray-600 text-xs">{t.feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">진행 프로세스</h2>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-black shrink-0">{s.num}</div>
                <div className="bg-gray-50 rounded-xl p-5 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-gray-900">{s.title}</span>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">{s.duration}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm text-right mt-4">전체 기간: 평균 5~8주</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-2">기본형 200만원대부터 시작합니다</h2>
          <p className="text-muted-foreground mb-10">정확한 견적은 무료 상담 후 제공됩니다.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((p, i) => (
              <div key={i} className={`rounded-2xl p-8 border-2 relative ${p.highlight ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'}`}>
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
              내 상황에 맞는 견적 받기 <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">자주 묻는 질문</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900">
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-primary shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-200 pt-4 bg-white">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 text-center" style={{ background: 'linear-gradient(135deg, var(--primary), color-mix(in oklch, var(--primary) 80%, black))' }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">지금 어떤 사이트가 필요한지 말씀해주세요</h2>
          <p className="text-white/80 text-lg mb-8">요구사항 정리부터 함께 도와드립니다.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary font-bold px-10 py-4 rounded-xl transition-all text-lg">
            무료 상담 신청하기 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
