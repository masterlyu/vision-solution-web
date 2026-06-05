'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CheckSquare, ChevronDown, ChevronUp, GraduationCap, Briefcase } from 'lucide-react'
import Mascot from '@/components/Mascot'

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
  { num: '01', title: '업무 분석', duration: '무료, 1일', desc: '현재 업무 프로세스 공유 → AI 도입 가능 영역 도출.', pose: 'analytics' as const, category: 'process' as const },
  { num: '02', title: '솔루션 설계', duration: '1주', desc: '어떤 AI 도구가 적합한지, 예산과 효과를 같이 검토.', pose: 'thinking' as const, category: 'emotion' as const },
  { num: '03', title: '구축·학습', duration: '2~6주', desc: '데이터 학습, 연동, 테스트. 진행 상황 매주 보고.', pose: 'develop' as const, category: 'process' as const },
  { num: '04', title: '인수인계·운영', duration: '상시', desc: '담당자 교육. 이후 이상 시 즉시 대응.', pose: 'cheer' as const, category: 'emotion' as const },
]

const plans = [
  { name: '기본 자동화',      price: '100만원대~', items: ['단순 반복 업무 자동화 1~2개'],                            highlight: false },
  { name: 'AI 챗봇 구축',    price: '200만원대~', items: ['맞춤 학습 챗봇', '웹사이트 연동'],                        highlight: true },
  { name: '커스텀 AI 솔루션', price: '500만원대~', items: ['분석 대시보드', '예측 모델링', '커스텀 개발'],           highlight: false },
]

const courses = [
  {
    badge: 'COURSE 01 · 활용 트랙',
    href: '/ai-solution/academy/dept-ai',
    title: '부서별로 일하는 AI',
    subtitle: '중소기업 LLM 활용법 — 일반 직원·관리자 대상',
    meta: ['📚 5편 15강', '⏱ 약 4시간', '🎯 30일 안에 시간 30% 절감'],
    chapters: [
      '1편. 기반 다지기 (2강)',
      '2편. 전 부서 공통 실전 활용 (3강)',
      '3편. 코어 부서 — 업종별 적용 (4강)',
      '4편. 지원 부서 (4강)',
      '5편. 수주형 비즈니스 통합 흐름 (2강)',
    ],
    highlight: false,
  },
  {
    badge: 'COURSE 02 · 구축 트랙',
    href: '/ai-solution/academy/build-ai',
    title: '사내 AI 구축·운영 종합 가이드',
    subtitle: '자체 호스팅·에이전트·보안·운영 — IT 담당자·관리자 대상',
    meta: ['📚 11편 30강', '⏱ 약 10시간', '🎯 90일 안에 사내 AI 인프라 1차 가동'],
    chapters: [
      '1~4편. 인프라·모델·플랫폼 (11강)',
      '5~6편. 에이전트·하네스 엔지니어링 (6강) ⭐',
      '7편. 사내 에이전트 배포·운영 (4강) ⭐',
      '8편. 자체 에이전트 만들기 (2강)',
      '9~11편. 보안·백업·관리자 운영 (7강)',
    ],
    highlight: true,
  },
]

const academyBenefits = [
  '사내 AI 도입 청사진 PDF (30/100/300명 규모별)',
  'RBAC 권한 매트릭스 템플릿',
  '하네스 표준 패키지 (settings.json + hooks + skills)',
  '부서별 프롬프트 라이브러리 300+개',
  '견적·8D·설계 RAG 에이전트 샘플 코드',
  '수료증 + 도입 진단 1시간 무료',
]

const faqs = [
  { q: '강좌만 듣고 직접 구축하면 컨설팅 안 받아도 되나요?', a: '네. 무료 강좌만으로 1차 도입이 가능하도록 설계했습니다. 설계도면·고객 데이터·MES 연동 등 보안·신뢰성이 중요한 영역만 컨설팅을 권장합니다.' },
  { q: '강좌 수강 후 컨설팅 받으면 할인되나요?', a: '강좌 수료증 보유 시 도입 진단 1시간이 무료로 제공되며, 본 컨설팅 계약 시 진단 결과 기준 10% 할인됩니다.' },
  { q: 'IT 전문 지식이 없어도 사용할 수 있나요?', a: '네. 완성 후 사용법은 영상 가이드와 직접 교육으로 제공합니다. 클릭 몇 번으로 운영할 수 있도록 설계합니다.' },
  { q: '도입하면 직원을 줄여야 하나요?', a: '반복 업무를 없애는 것이지 사람을 대체하는 게 아닙니다. 직원들이 더 중요한 일에 집중할 수 있게 됩니다.' },
  { q: '우리 회사 데이터가 외부에 유출되지 않나요?', a: '구축한 AI는 독립 서버에서 운영되며, 외부 AI 서비스에 데이터를 전달하지 않도록 설계 가능합니다. 강좌의 LV6 구축 트랙에서 자체 호스팅·보안·백업 전 과정을 다룹니다.' },
  { q: '어떤 업무가 자동화 가능한지 모르는데 어떻게 시작하나요?', a: '현재 업무 목록을 공유해 주시면, 무료로 자동화 가능 영역을 분석해드립니다. 강좌의 LV3 부서별 활용 트랙을 먼저 보시면 직접 식별도 가능합니다.' },
  { q: '완성 후 AI가 잘못된 답변을 하면 어떻게 되나요?', a: '납품 전 100건 이상의 테스트를 진행합니다. 운영 중 오류 발생 시 즉시 수정합니다. 30일 무상 AS가 포함됩니다.' },
  { q: '월 비용이 추가로 발생하나요?', a: '구축 비용 외에 서버·API 사용료가 월별로 발생할 수 있습니다. 규모에 따라 월 5~30만원 수준이며, 상담 시 정확히 안내합니다. 자체 호스팅 선택 시 API 비용 0원도 가능합니다.' },
]

function AiHeroIllust() {
  return (
    <div className="relative">
      <svg width="320" height="280" viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg">
        <circle cx="160" cy="130" r="70" fill="rgba(var(--primary-rgb),.06)" stroke="rgba(var(--primary-rgb),.25)" strokeWidth="1.5" />
        <circle cx="160" cy="130" r="50" fill="rgba(var(--primary-rgb),.08)" stroke="rgba(var(--primary-rgb),.2)" strokeWidth="1" />
        <circle cx="160" cy="130" r="28" fill="rgba(var(--primary-rgb),.15)" />
        <text x="160" y="138" textAnchor="middle" fontSize="24" fill="var(--primary)">🤖</text>
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const cx = 160 + 70 * Math.cos(rad)
          const cy = 130 + 70 * Math.sin(rad)
          const icons = ['🎓','💼','🔐','🤝','📈','💬']
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r="18" fill="rgba(var(--primary-rgb),.12)" stroke="rgba(var(--primary-rgb),.3)" strokeWidth="1.5" />
              <text x={cx} y={cy+5} textAnchor="middle" fontSize="13">{icons[i]}</text>
            </g>
          )
        })}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const x = 160 + 42 * Math.cos(rad)
          const y = 130 + 42 * Math.sin(rad)
          const x2 = 160 + 52 * Math.cos(rad)
          const y2 = 130 + 52 * Math.sin(rad)
          return <line key={i} x1={x} y1={y} x2={x2} y2={y2} stroke="rgba(var(--primary-rgb),.4)" strokeWidth="1.5" />
        })}
        <text x="38" y="45" fontSize="16" fill="var(--primary)" opacity={0.7}>✦</text>
        <text x="275" y="55" fontSize="12" fill="var(--primary-light)" opacity={0.6}>✦</text>
        <text x="290" y="200" fontSize="10" fill="var(--primary)" opacity={0.5}>✦</text>
      </svg>
      <div className="absolute -bottom-4 -right-4">
        <Mascot pose="happy" category="emotion" size="sm" className="h-24 w-auto" bubble="배우고 도입하고!" bubbleDir="left" />
      </div>
    </div>
  )
}

export default function AiSolutionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-28 pb-20 px-6 bg-background" style={{ background: 'radial-gradient(ellipse at top right, color-mix(in oklch, var(--primary) 20%, transparent) 0%, var(--background) 60%)' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-primary/20 border border-primary/40 text-primary text-xs font-bold px-3 py-1 rounded-full mb-6">기업 AI 도입 · 무료 강좌 + 컨설팅</span>
            <h1 className="text-4xl md:text-5xl font-black text-foreground leading-tight mb-6 max-w-2xl">
              기업 AI 도입 및 컨설팅
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
              무료 강좌로 배우고, 컨설팅으로 실행합니다.<br />
              부서별 LLM 활용부터 사내 자체 에이전트 구축까지 — 중소기업에 맞춰 단계별로 안내합니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#academy"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-7 py-4 rounded-xl transition-all text-base">
                <GraduationCap className="w-5 h-5" /> 무료 강좌 시작하기
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-card border-2 border-primary text-primary hover:bg-primary/5 font-semibold px-7 py-4 rounded-xl transition-all text-base">
                <Briefcase className="w-5 h-5" /> 도입 컨설팅 신청
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">강좌·진단 모두 무료 · 신용카드 불필요 · 100만원대부터 컨설팅</p>
          </div>
          <div className="hidden lg:flex flex-col justify-center items-center gap-6">
            <Mascot pose="develop" category="process" size="md" className="h-48 w-auto min-w-[140px]" alt="VISIONC 마스코트 — 기업 AI 도입 및 컨설팅" />
            <AiHeroIllust />
          </div>
        </div>
      </section>

      {/* Two Paths */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-3">두 가지 방법으로 시작하세요</h2>
          <p className="text-muted-foreground text-center mb-12">스스로 배우거나, 전문가와 함께 실행하거나 — 어느 쪽이든 무료부터 시작합니다.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl border-2 border-border p-8">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-foreground mb-2">스스로 배우고 싶다</h3>
              <p className="text-muted-foreground mb-6">무료 공개 강좌로 우리 회사에 맞는 AI 도입 방법을 체계적으로 학습</p>
              <ul className="space-y-2 mb-8">
                <li className="text-sm text-foreground flex items-start gap-2"><span className="text-primary font-bold">✓</span> 부서별 LLM 활용법 15강</li>
                <li className="text-sm text-foreground flex items-start gap-2"><span className="text-primary font-bold">✓</span> 사내 AI 구축 종합 가이드 30강</li>
                <li className="text-sm text-foreground flex items-start gap-2"><span className="text-primary font-bold">✓</span> 300+ 한국어 프롬프트 라이브러리</li>
                <li className="text-sm text-foreground flex items-start gap-2"><span className="text-primary font-bold">✓</span> 수료증 발급</li>
              </ul>
              <Link href="#academy" className="inline-flex items-center gap-1 text-primary font-semibold hover:gap-2 transition-all">
                강좌 둘러보기 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-primary/5 rounded-2xl border-2 border-primary p-8 relative">
              <span className="absolute -top-3 left-8 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">추천</span>
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-foreground mb-2">전문가 도움이 필요하다</h3>
              <p className="text-muted-foreground mb-6">강좌 내용을 우리 회사에 직접 구축·운영하는 풀서비스 컨설팅</p>
              <ul className="space-y-2 mb-8">
                <li className="text-sm text-foreground flex items-start gap-2"><span className="text-primary font-bold">✓</span> 도입 가능 영역 무료 진단 1시간</li>
                <li className="text-sm text-foreground flex items-start gap-2"><span className="text-primary font-bold">✓</span> 맞춤 솔루션 설계 → 구축 → 인수인계</li>
                <li className="text-sm text-foreground flex items-start gap-2"><span className="text-primary font-bold">✓</span> 사내 직원 교육 포함</li>
                <li className="text-sm text-foreground flex items-start gap-2"><span className="text-primary font-bold">✓</span> 운영 후 30일 A/S</li>
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-3 rounded-xl hover:bg-primary/90 transition-all">
                무료 진단 신청 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Tracks */}
      <section id="academy" className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/20 border border-primary/40 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4">중소기업 AI 마스터플랜</span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">무료 강좌 트랙</h2>
            <p className="text-muted-foreground">중소기업에 특화된 한국어 LLM·에이전트 도입 종합 교육. 영상·워크북·프롬프트 라이브러리 모두 무료.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {courses.map((c, i) => (
              <div key={i} className={`rounded-2xl p-8 ${c.highlight ? 'bg-primary/5 border-2 border-primary' : 'bg-card border-2 border-border'}`}>
                <div className="text-xs font-bold text-primary mb-3">{c.badge}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground mb-5">{c.subtitle}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {c.meta.map((m, j) => (
                    <span key={j} className="text-xs bg-foreground/5 text-foreground px-2.5 py-1 rounded-full">{m}</span>
                  ))}
                </div>
                <ul className="space-y-2 mb-6">
                  {c.chapters.map((ch, j) => (
                    <li key={j} className="text-sm text-foreground/80 flex items-start gap-2">
                      <span className="text-primary mt-0.5">▸</span> {ch}
                    </li>
                  ))}
                </ul>
                <Link href={c.href} className="inline-flex items-center gap-1 text-primary font-semibold hover:gap-2 transition-all">
                  전체 커리큘럼 보기 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h4 className="text-lg font-bold text-foreground mb-4">강좌 수강 시 제공 자료</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {academyBenefits.map((b, i) => (
                <li key={i} className="text-sm text-foreground flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span> {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">혹시 이런 상황이세요?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {checklistItems.map((item, i) => (
              <div key={i} className="bg-card rounded-xl shadow-sm p-5 flex items-start gap-3">
                <CheckSquare className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <span className="text-foreground font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="border-l-4 border-primary bg-card px-6 py-4 rounded-r-xl">
            <p className="text-foreground font-semibold">2개 이상 해당된다면, 강좌부터 시작해보거나 무료 진단을 신청하세요.</p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-10">실제 도입 사례</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cases.map((c, i) => (
              <div key={i} className="bg-foreground/5 border border-foreground/10 rounded-xl p-6">
                <span className="text-primary text-xs font-bold bg-primary/10 px-2 py-1 rounded-full">{c.tag}</span>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="bg-[var(--accent-red)]/10 rounded-lg px-4 py-3 text-[var(--accent-red)] text-sm">이전: {c.before}</div>
                  <div className="text-muted-foreground text-center text-sm">→</div>
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
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground mb-2">어떤 AI가 내 업무에 맞을까요?</h2>
            <p className="text-muted-foreground text-sm">강좌만으로 부족하다면, 아래 영역을 직접 구축해드립니다.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {aiTypes.map((t, i) => (
              <div key={i} className="bg-card rounded-xl p-6 hover:border-primary border-2 border-transparent transition-all">
                <div className="text-3xl mb-3">{t.emoji}</div>
                <h3 className="font-bold text-foreground mb-1">{t.name}</h3>
                <p className="text-muted-foreground text-sm">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-10">진행 프로세스 (컨설팅 기준)</h2>
          <div className="space-y-4">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="hidden sm:flex flex-col items-center w-20 shrink-0">
                  <Mascot pose={s.pose} category={s.category} size="sm" className="h-20 w-20 object-contain" />
                </div>
                <div className="flex gap-4 items-start flex-1">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-black shrink-0">{s.num}</div>
                  <div className="bg-card rounded-xl p-5 flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-foreground">{s.title}</span>
                      <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">{s.duration}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm text-right mt-4">진행 상황 매주 공유</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-2">기본형 100만원대부터 시작합니다</h2>
          <p className="text-muted-foreground mb-10">어떤 업무를 자동화하고 싶은지 말씀해주시면, 예산 내에서 가능한 범위를 알려드립니다.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((p, i) => (
              <div key={i} className={`rounded-2xl p-8 border-2 relative ${p.highlight ? 'border-primary bg-primary/5' : 'border-border'}`}>
                {p.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">추천</span>}
                <h3 className="text-xl font-bold text-foreground mb-1">{p.name}</h3>
                <p className={`text-2xl font-black mb-6 ${p.highlight ? 'text-primary' : 'text-muted-foreground'}`}>{p.price}</p>
                <ul className="space-y-2">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-primary font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-xl transition-all">
              내 업무에 맞는 AI 솔루션 견적받기 <ArrowRight className="w-5 h-5" />
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
              <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-foreground">
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-primary shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 bg-background text-center" style={{ background: 'radial-gradient(ellipse at center, color-mix(in oklch, var(--primary) 15%, transparent) 0%, var(--background) 70%)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Mascot pose="cheer" category="emotion" size="sm" className="h-28 w-auto" />
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full bg-card text-foreground text-sm font-bold px-4 py-2 rounded-2xl shadow-lg whitespace-nowrap">
                배우거나, 맡기거나!
                <span className="absolute left-1/2 -translate-x-1/2 top-full border-8 border-transparent border-t-card" />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">지금 시작하세요</h2>
          <p className="text-muted-foreground text-lg mb-8">강좌·진단 모두 무료. 신용카드 없이 바로 시작할 수 있습니다.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="#academy" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-xl transition-all text-lg">
              <GraduationCap className="w-5 h-5" /> 무료 강좌 시작
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-card border-2 border-primary text-primary hover:bg-primary/5 font-bold px-8 py-4 rounded-xl transition-all text-lg">
              <Briefcase className="w-5 h-5" /> 무료 도입 진단 신청
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
