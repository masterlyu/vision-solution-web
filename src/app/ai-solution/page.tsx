'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, ChevronDown, ChevronUp, MessageCircleQuestion, GraduationCap, Wrench, Briefcase, HelpCircle, Shield, Users, AlertTriangle, BotMessageSquare } from 'lucide-react'
import Mascot from '@/components/Mascot'

const problems = [
  {
    tag: 'WHY',
    icon: <MessageCircleQuestion className="w-7 h-7" />,
    title: '우리에게 맞는 AI를 모름',
    quotes: [
      '"다른 회사가 도입했다고 들었는데, 우리에게도 맞는지 모르겠습니다."',
      '"어느 부서·어떤 업무부터 시작해야 할지 막막합니다."',
    ],
  },
  {
    tag: 'WHAT',
    icon: <HelpCircle className="w-7 h-7" />,
    title: '투자 대비 성과 불확실',
    quotes: [
      '"몇 백만원을 투자했을 때 얼마나 줄어들지 구체적으로 알고 싶습니다."',
      '"실패 사례가 있으면 어쩌나 걱정됩니다."',
    ],
  },
  {
    tag: 'HOW',
    icon: <Wrench className="w-7 h-7" />,
    title: '안전한 도입 방법 모름',
    quotes: [
      '"IT 인력이 없어서 도입 후 운영을 누가 할지 모르겠습니다."',
      '"고객 정보·설계 도면이 외부로 유출되는 것이 두렵습니다."',
    ],
  },
]

const solutions = [
  {
    icon: <Briefcase className="w-8 h-8" />,
    badge: 'A · 도입 컨설팅',
    title: '진단·청사진·우선순위',
    price: '100만원대~',
    period: '약 1주',
    desc: '회사 업무를 분석해 가장 효과 큰 도입 영역 1개를 결정하고 청사진을 제공합니다.',
    solves: ['WHY 문제', 'WHAT 문제'],
    items: ['업무 프로세스 진단', '도입 가능 영역 분석', 'ROI 시뮬레이션', '우선순위 도출 청사진'],
    href: '/contact',
    cta: '컨설팅 문의',
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    badge: 'B · 구축·운영',
    title: '직접 만들고 운영 대행',
    price: '200~500만원대~',
    period: '2~6주',
    desc: '챗봇·자동화·자체 호스팅 LLM을 회사에 맞춰 구축하고 운영까지 대행합니다.',
    solves: ['HOW 문제'],
    items: ['AI 챗봇·자동화 구축', '데이터 대시보드', 'RAG·자체 호스팅', '인수인계 + 30일 A/S'],
    href: '/contact',
    cta: '구축 견적 문의',
    highlight: true,
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    badge: 'C · 사내 출강 강좌',
    title: '직원 AI 활용 능력 확보',
    price: '별도 견적',
    period: '워크숍 반나절~1일',
    desc: '직원 전체가 안전하고 효과적으로 LLM을 활용하도록 사내 출강 + 자료 제공.',
    solves: ['WHY 문제', 'HOW 문제'],
    items: ['Course 01: 부서별 활용 5편 15강', 'Course 02: 사내 구축 11편 30강', 'PPT + 스피커 노트 제공', '사내 가이드라인 작성 지원'],
    href: '#academy',
    cta: '커리큘럼 보기',
  },
]

const cases = [
  { tag: '제조사 (30명)', before: '고객 문의 하루 2시간 수동', after: 'AI 챗봇 85% 자동', highlight: '85%' },
  { tag: '온라인몰', before: '상품 설명 건당 30분', after: '1분 + 사람 검수 3분', highlight: '−93%' },
  { tag: '서비스업', before: '매일 아침 보고서 1.5시간', after: '자동 생성·발송, 0분', highlight: '0분' },
  { tag: '소매업', before: '주 2회 2시간 엑셀 집계', after: '실시간 대시보드', highlight: '실시간' },
]

const kpi = [
  { big: '−35%', label: '반복 업무 시간' },
  { big: '−42%', label: 'CS 운영 비용' },
  { big: '+24%', label: '고객 만족도' },
  { big: '3.4m', label: '평균 손익분기' },
]

const safety = [
  {
    icon: <Shield className="w-6 h-6" />,
    q: '데이터 유출 우려?',
    a: '자체 호스팅 옵션으로 외부 송출 0%. 데이터 4분류 + PII 마스킹 가이드를 함께 제공합니다.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    q: 'IT 인력 부재?',
    a: '구축 후 사내 담당자 인수인계 + 30일 무상 A/S. 운영 매뉴얼·SOP까지 함께 납품합니다.',
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    q: '직원 반발·미사용?',
    a: '사내 출강 강좌(Course 01)로 전 직원 AI 활용 능력 확보. 즉시 사용 프롬프트 라이브러리 제공.',
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    q: 'AI 오답·법적 리스크?',
    a: '외부 송신 직전 사람 검수 절차 + 사내 가이드라인 8체크 + 실제 사고 사례 학습으로 사전 방지.',
  },
  {
    icon: <BotMessageSquare className="w-6 h-6" />,
    q: '실패 우려?',
    a: '소규모 파일럿 → 베이스라인 측정 → 단계별 확대. ROI 미충족 시 환불 정책 적용.',
  },
]

const courses = [
  {
    badge: 'COURSE 01',
    href: '/ai-solution/academy/dept-ai',
    title: '부서별로 일하는 AI',
    sub: '일반 직원·관리자 대상 · 5편 15강',
    status: '자료 공개 중 (1편)',
    statusColor: 'green',
  },
  {
    badge: 'COURSE 02',
    href: '/ai-solution/academy/build-ai',
    title: '사내 AI 구축·운영 종합 가이드',
    sub: 'IT 담당자·관리자 대상 · 11편 30강',
    status: '자료 준비 중',
    statusColor: 'amber',
  },
]

const faqs = [
  { q: '강좌(사내 출강)와 컨설팅·구축은 어떻게 다른가요?', a: '강좌는 직원 교육이고, 컨설팅·구축은 실제 도입·운영을 대행합니다. 강좌만 듣고 직접 도입하거나, 강좌 없이 컨설팅·구축만 의뢰하셔도 됩니다. 함께 진행 시 할인 적용됩니다.' },
  { q: 'IT 전문 지식이 없어도 운영할 수 있나요?', a: '네. 구축 후 사용법은 영상 가이드와 직접 교육으로 제공합니다. 클릭 몇 번으로 운영할 수 있도록 설계하며, 30일 무상 A/S 동안 모든 문의에 즉시 대응합니다.' },
  { q: '우리 회사 데이터가 외부에 유출되지 않나요?', a: '구축한 AI는 독립 서버에서 운영하며, 외부 AI 서비스에 데이터를 전달하지 않도록 설계 가능합니다. 보안이 매우 중요한 경우 자체 호스팅 옵션으로 외부 송출 0% 환경을 구성합니다.' },
  { q: '도입하면 직원을 줄여야 하나요?', a: '반복 업무를 없애는 것이지 사람을 대체하는 게 아닙니다. 실제 사례 모두 인원 그대로 매출·고객만족도가 상승했습니다. 회수된 시간은 고부가 업무로 재배치됩니다.' },
  { q: '월 비용이 추가로 발생하나요?', a: '구축 비용 외에 서버·API 사용료가 월별로 발생할 수 있습니다. 규모에 따라 월 5~30만원 수준이며, 자체 호스팅 선택 시 API 비용 0원도 가능합니다. 상담 시 정확히 안내합니다.' },
  { q: '실패 사례가 있나요?', a: '소규모 파일럿으로 시작해 단계별로 확대하기 때문에 큰 실패를 막습니다. 베이스라인 KPI를 미충족하면 환불 정책을 적용합니다. 상담 시 솔직하게 안내드립니다.' },
]

export default function AiSolutionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* === HERO === */}
      <section className="pt-28 pb-20 px-6 bg-background" style={{ background: 'radial-gradient(ellipse at top right, color-mix(in oklch, var(--primary) 22%, transparent) 0%, var(--background) 60%)' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-primary/25 border-2 border-primary/40 text-primary text-sm font-bold px-4 py-1.5 rounded-full mb-6">
              기업 AI 도입 · 컨설팅 · 사내 출강
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-foreground leading-tight mb-6 max-w-2xl tracking-tight">
              중소기업 AI 도입,<br />
              <span className="text-primary">어디부터 시작</span>할지<br />
              모르겠다면
            </h1>
            <p className="text-xl text-foreground/90 font-medium leading-relaxed mb-8 max-w-xl">
              <b className="text-foreground">진단·구축·교육·운영</b>까지 한 곳에서.<br />
              VISIONC가 100만원대부터 안전하게 시작해드립니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-xl transition-all text-lg">
                <Briefcase className="w-5 h-5" /> 도입 상담 신청
              </Link>
              <Link href="#academy"
                className="inline-flex items-center gap-2 bg-card border-2 border-primary text-primary hover:bg-primary/5 font-bold px-7 py-4 rounded-xl transition-all text-lg">
                <GraduationCap className="w-5 h-5" /> 사내 출강 강좌 보기
              </Link>
            </div>
            <p className="mt-5 text-base text-foreground/85 font-medium">247건+ 프로젝트 · 재의뢰율 97% · 정부 지원사업 연계</p>
          </div>
          <div className="hidden lg:flex flex-col justify-center items-center">
            <Mascot pose="develop" category="process" size="md" className="h-56 w-auto min-w-[160px]" alt="VISIONC 마스코트" />
          </div>
        </div>
      </section>

      {/* === §2 PROBLEM === */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-3 text-center">The Problem</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-4 tracking-tight">
            AI 도입, 이 <span className="text-primary">3가지</span>에서 막힙니다
          </h2>
          <p className="text-lg text-foreground/85 font-medium text-center mb-12 max-w-2xl mx-auto">
            중소기업 의사결정자가 도입 검토 시 가장 자주 묻는 질문들입니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((p) => (
              <div key={p.tag} className="rounded-2xl border-2 border-foreground/15 bg-card p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center text-primary">{p.icon}</div>
                  <div>
                    <p className="text-xs font-mono font-bold tracking-wider text-primary">{p.tag}</p>
                    <h3 className="text-xl font-black text-foreground tracking-tight">{p.title}</h3>
                  </div>
                </div>
                <div className="space-y-2">
                  {p.quotes.map((q, i) => (
                    <p key={i} className="text-base text-foreground/85 font-medium leading-relaxed border-l-3 border-primary/40 pl-4 italic">
                      {q}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === §3 SOLUTION === */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-3 text-center">The Solution</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-4 tracking-tight">
            VISIONC <span className="text-primary">3-스택</span>으로 해결
          </h2>
          <p className="text-lg text-foreground/85 font-medium text-center mb-12 max-w-2xl mx-auto">
            컨설팅·구축·교육 3가지 영역을 회사 상황에 맞춰 단독 또는 결합 진행합니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((s) => (
              <div key={s.badge} className={`rounded-2xl p-7 border-2 relative ${s.highlight ? 'border-primary bg-primary/8' : 'border-foreground/15 bg-card'}`}>
                {s.highlight && <span className="absolute -top-3 left-7 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">추천</span>}
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4">{s.icon}</div>
                <p className="text-sm font-mono font-bold text-primary tracking-wider mb-2">{s.badge}</p>
                <h3 className="text-xl font-black text-foreground tracking-tight mb-2">{s.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-sm font-bold bg-foreground/10 text-foreground px-3 py-1 rounded-full">{s.price}</span>
                  <span className="text-sm font-bold bg-foreground/10 text-foreground px-3 py-1 rounded-full">{s.period}</span>
                </div>
                <p className="text-base text-foreground/85 font-medium leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {s.solves.map((q) => (
                    <span key={q} className="text-xs font-bold bg-[var(--accent-green-text)]/15 text-[var(--accent-green-text)] px-2.5 py-1 rounded-full">✓ {q} 해결</span>
                  ))}
                </div>
                <ul className="space-y-2 mb-6">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-base text-foreground font-medium">
                      <span className="text-primary font-bold mt-0.5">✓</span> {item}
                    </li>
                  ))}
                </ul>
                <Link href={s.href} className={`inline-flex items-center gap-2 font-bold px-5 py-3 rounded-xl transition-all w-full justify-center ${s.highlight ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-card border-2 border-primary text-primary hover:bg-primary/5'}`}>
                  {s.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === §4 PROOF === */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-3 text-center">Proof · 실제 도입 결과</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-12 tracking-tight">
            한국 중소기업 <span className="text-primary">실제 사례</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {cases.map((c) => (
              <div key={c.tag} className="bg-card border-2 border-foreground/10 rounded-2xl p-6">
                <span className="text-sm font-bold text-primary bg-primary/15 px-3 py-1 rounded-full">{c.tag}</span>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="bg-[var(--accent-red)]/10 rounded-lg px-5 py-4 text-[var(--accent-red)] text-base font-medium">
                    <b>이전</b>: {c.before}
                  </div>
                  <div className="text-foreground text-center text-lg font-bold">↓</div>
                  <div className="bg-primary/15 rounded-lg px-5 py-4 text-primary text-base font-bold flex items-center justify-between gap-2">
                    <span><b>이후</b>: {c.after}</span>
                    <span className="text-3xl font-black ml-1">{c.highlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* KPI summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {kpi.map((k) => (
              <div key={k.label} className="bg-card border-2 border-foreground/15 rounded-2xl p-6 text-center">
                <p className="text-4xl md:text-5xl font-black text-primary mb-1 tracking-tight">{k.big}</p>
                <p className="text-base font-bold text-foreground">{k.label}</p>
              </div>
            ))}
          </div>
          <p className="text-base text-foreground/85 font-medium text-center mt-6">도입 6개월 평균 결과 (3개 사례 추적)</p>
        </div>
      </section>

      {/* === §5 SAFETY === */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-3 text-center">Safety · 우려 해소</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-4 tracking-tight">
            <span className="text-primary">5가지 우려</span>, 모두 답이 있습니다
          </h2>
          <p className="text-lg text-foreground/85 font-medium text-center mb-12 max-w-2xl mx-auto">
            도입 검토 시 가장 큰 5가지 걱정과 VISIONC의 해결 방법.
          </p>
          <div className="space-y-4">
            {safety.map((s, i) => (
              <div key={i} className="bg-card border-2 border-foreground/15 rounded-2xl p-6 flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary shrink-0">{s.icon}</div>
                <div>
                  <h3 className="text-xl font-black text-foreground mb-2 tracking-tight">{s.q}</h3>
                  <p className="text-base text-foreground/90 font-medium leading-relaxed">{s.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === §6 ACADEMY === */}
      <section id="academy" className="py-20 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-3 text-center">Enterprise Academy</p>
          <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-4 tracking-tight">
            사내 출강 강좌
          </h2>
          <p className="text-lg text-foreground/85 font-medium text-center mb-12 max-w-2xl mx-auto">
            중소기업 도입·운영 노하우를 사내 교육으로 전달합니다. 커리큘럼은 공개, 자료(PPT·스피커 노트)는 비밀번호로 보호됩니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {courses.map((c) => (
              <Link key={c.href} href={c.href}
                className="group rounded-2xl border-2 border-foreground/15 bg-card p-7 hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <p className="text-sm font-mono font-bold text-primary tracking-wider">{c.badge}</p>
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${c.statusColor === 'green' ? 'bg-[var(--accent-green-text)]/15 text-[var(--accent-green-text)]' : 'bg-[var(--accent-amber)]/15 text-[var(--accent-amber)]'}`}>{c.status}</span>
                </div>
                <h3 className="text-xl font-black text-foreground tracking-tight mb-2">{c.title}</h3>
                <p className="text-base text-foreground/85 font-medium mb-4">{c.sub}</p>
                <p className="text-base text-primary font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  커리큘럼 보기 <ArrowRight className="w-4 h-4" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === §7 FAQ === */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-12 tracking-tight">자주 묻는 질문</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card border-2 border-foreground/15 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left text-base md:text-lg font-bold text-foreground">
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-primary shrink-0 ml-3" /> : <ChevronDown className="w-5 h-5 text-foreground/70 shrink-0 ml-3" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-base text-foreground/90 font-medium leading-relaxed border-t border-foreground/10 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === BOTTOM CTA === */}
      <section className="py-24 px-6 bg-background text-center" style={{ background: 'radial-gradient(ellipse at center, color-mix(in oklch, var(--primary) 18%, transparent) 0%, var(--background) 70%)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <Mascot pose="cheer" category="emotion" size="sm" className="h-28 w-auto" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-5 tracking-tight">지금 시작하세요</h2>
          <p className="text-xl text-foreground/90 font-medium mb-10">100만원대부터 단계별로. 어떤 부서·어떤 업무가 적합한지 함께 정합니다.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 py-4 rounded-xl transition-all text-lg">
              <Briefcase className="w-5 h-5" /> 도입 상담 신청
            </Link>
            <Link href="#academy" className="inline-flex items-center gap-2 bg-card border-2 border-primary text-primary hover:bg-primary/5 font-bold px-8 py-4 rounded-xl transition-all text-lg">
              <GraduationCap className="w-5 h-5" /> 사내 출강 강좌 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
