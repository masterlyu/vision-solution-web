'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, ChevronDown, MessageCircle, Zap, Shield, Clock, TrendingUp, Code2, Smartphone, Store, Building2, GraduationCap, Heart, ShoppingBag } from 'lucide-react'

// ── 페르소나 검증 결과 반영 ──
// B(직원 인건비 1/10) + C(설치 5분·코드 2줄) 복합 → 헤드라인 채택
// 소상공인 45세 여성: "바쁜 가게 운영에 바로 쓸 수 있다"
// 소상공인 53세 여성: "인건비 걱정에 딱 와닿아"

const STEPS = [
  {
    num: '01',
    title: '문의·계약',
    duration: '당일 처리',
    desc: '홈페이지 문의 또는 이메일로 연락하시면 당일 안에 계약을 마칩니다.',
    detail: '서비스 설명 → 간단한 계약서 → 완료',
  },
  {
    num: '02',
    title: '토큰 발급',
    duration: '10분 이내',
    desc: '계약 즉시 귀사 전용 토큰(코드)을 이메일로 발급해드립니다.',
    detail: '이메일 수신 → 코드 1개 확인',
  },
  {
    num: '03',
    title: '내 홈페이지에 붙이기',
    duration: '5분 이내',
    desc: '받은 코드 2줄을 홈페이지에 붙여넣으면 끝입니다. IT 지식 필요 없습니다.',
    detail: '복사 → 붙여넣기 → 챗봇 live!',
  },
]

const PLATFORMS = [
  { name: '일반 HTML', icon: Code2, time: '30초', desc: '</body> 앞에 붙여넣기' },
  { name: 'WordPress', icon: Smartphone, time: '2분', desc: '테마 편집기 → footer.php' },
  { name: 'Cafe24', icon: Store, time: '2분', desc: '레이아웃 HTML 편집' },
  { name: 'Shopify', icon: ShoppingBag, time: '3분', desc: 'theme.liquid 편집' },
  { name: 'Wix', icon: Building2, time: '1분', desc: '맞춤 코드 설정' },
  { name: '기타 모든 사이트', icon: Zap, time: '5분↓', desc: '코드 2줄이면 어디든 OK' },
]

const EFFECTS = [
  { num: '85%', label: '고객 문의 자동 처리', sub: '반복 질문은 AI가 24시간 응대' },
  { num: '1/10', label: '직원 인건비 대비 비용', sub: '월 5만원대~, 직원 채용 없이' },
  { num: '24h', label: '연중무휴 응대', sub: '새벽 2시 문의도 즉시 답변' },
  { num: '5분', label: '설치 소요 시간', sub: '코드 2줄 붙여넣기가 전부' },
]

const CASES = [
  { icon: Store, type: '소매·쇼핑몰', pain: '상품 문의에 하루 2시간 소비', result: 'AI 자동 응대로 업무 시간 80% 절약', color: 'from-violet-500/20 to-violet-500/5' },
  { icon: GraduationCap, type: '학원·교육', pain: '수강료·수업 일정 반복 문의', result: '야간·주말 문의도 즉시 자동 안내', color: 'from-blue-500/20 to-blue-500/5' },
  { icon: Heart, type: '병원·의원', pain: '예약·진료과목 전화 폭주', result: '전화 대신 챗봇으로 50% 전환', color: 'from-pink-500/20 to-pink-500/5' },
  { icon: Building2, type: '부동산·법무', pain: '매물·서류 절차 반복 설명', result: '24시간 FAQ 자동 응대로 신뢰 상승', color: 'from-emerald-500/20 to-emerald-500/5' },
]

const PLANS = [
  {
    name: '스타터',
    price: '월 29,000원',
    setup: '초기 설정비 99,000원',
    items: ['챗봇 1개 (사이트 1개)', '기본 질문 학습 (20개)', '이메일 지원'],
    highlight: false,
    cta: '시작하기',
  },
  {
    name: '비즈니스',
    price: '월 59,000원',
    setup: '초기 설정비 99,000원',
    items: ['챗봇 1개 (사이트 1개)', '홈페이지 전체 자동 학습', '우선 이메일 지원', '월 1회 무료 업데이트'],
    highlight: true,
    cta: '가장 인기',
  },
  {
    name: '프리미엄',
    price: '월 99,000원',
    setup: '초기 설정비 무료',
    items: ['챗봇 3개 (사이트 3개)', '홈페이지 전체 자동 학습', '전화·이메일 지원', '무제한 업데이트', '맞춤 디자인 설정'],
    highlight: false,
    cta: '상담하기',
  },
]

const FAQS = [
  {
    q: 'IT를 전혀 모르는데 설치할 수 있나요?',
    a: '네. 저희가 단계별 설치 가이드(캡처 이미지 포함)를 드립니다. 그래도 어려우시면 원격으로 직접 설치해드립니다. 추가 비용 없습니다.',
  },
  {
    q: '우리 홈페이지가 오래된 사이트인데도 되나요?',
    a: '네. HTML 코드를 수정할 수 있는 사이트라면 어디든 가능합니다. WordPress, Cafe24, Shopify, Wix, 직접 만든 사이트 모두 설치 가능합니다.',
  },
  {
    q: '챗봇이 우리 회사 정보를 어떻게 알고 답하나요?',
    a: '계약 후 귀사 홈페이지를 AI가 자동으로 읽고 학습합니다. 제품·서비스·가격·FAQ 등 홈페이지에 있는 내용을 바탕으로 답변합니다.',
  },
  {
    q: '챗봇이 잘못된 답변을 하면 어떻게 하나요?',
    a: '잘못된 답변이 있으면 저희에게 알려주시면 즉시 수정합니다. 비즈니스·프리미엄 플랜은 정기 업데이트가 포함되어 있습니다.',
  },
  {
    q: '계약 기간이 있나요? 중도 해지가 되나요?',
    a: '최소 계약 기간 없습니다. 월 단위 구독이라 언제든 해지 가능합니다. 해지 시 다음 달부터 청구되지 않습니다.',
  },
  {
    q: '홈페이지를 리뉴얼하면 다시 설치해야 하나요?',
    a: '아니요. 코드 2줄은 새 홈페이지에도 그대로 붙이면 됩니다. 홈페이지 내용이 바뀌면 저희가 챗봇 학습을 새로 돌려드립니다.',
  },
]

export default function ChatbotPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="pt-28 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 text-primary text-xs font-bold px-4 py-1.5 rounded-full mb-6">
            <Zap className="w-3.5 h-3.5" />
            코드 2줄 · 5분 설치 · 24시간 응대
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            직원 월급의 <span className="text-primary">1/10 비용</span>으로<br />
            24시간 고객 응대
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-4 max-w-2xl mx-auto">
            자는 동안에도, 주말에도, 새벽에도—<br />
            AI 챗봇이 고객 문의를 대신 받습니다.<br className="hidden md:block" />
            <strong className="text-foreground">홈페이지에 코드 2줄만 붙이면 내일부터 바로 시작됩니다.</strong>
          </p>
          <p className="text-muted-foreground text-sm mb-10">IT 지식 전혀 필요 없음 · 설치 대행 가능 · 월 단위 구독, 언제든 해지</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl transition-all text-base">
              무료 상담 신청 <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#demo"
              className="inline-flex items-center justify-center gap-2 border border-foreground/20 hover:border-primary/50 text-foreground/70 hover:text-foreground font-medium px-8 py-4 rounded-xl transition-all text-base">
              <MessageCircle className="w-5 h-5" />
              챗봇 직접 체험하기 ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── 수치 효과 ── */}
      <section className="py-16 px-6 bg-secondary/50">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {EFFECTS.map((e) => (
            <div key={e.num} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-primary mb-1">{e.num}</div>
              <div className="text-sm font-bold text-foreground mb-1">{e.label}</div>
              <div className="text-xs text-muted-foreground">{e.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 계약·설치 3단계 ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              계약부터 챗봇 live까지,<br /><span className="text-primary">딱 3단계</span>
            </h2>
            <p className="text-muted-foreground">복잡한 것 없습니다. 오늘 문의하면 내일 챗봇이 일합니다.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.num} className="relative bg-card border border-border rounded-2xl p-6">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-3 w-6 h-px bg-primary/40 z-10" />
                )}
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-primary/20 text-primary font-black text-sm flex items-center justify-center">{s.num}</span>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{s.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                <p className="text-xs font-mono text-primary/70 bg-primary/5 px-3 py-2 rounded-lg">{s.detail}</p>
              </div>
            ))}
          </div>

          {/* 코드 미리보기 */}
          <div className="mt-10 bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
            <p className="text-xs text-zinc-400 mb-3 font-mono">// 받은 코드를 여기에 붙여넣기만 하면 끝 (홈페이지 관리자에게 전달)</p>
            <div className="font-mono text-sm space-y-1">
              <p><span className="text-zinc-500">&lt;script&gt;</span></p>
              <p className="pl-4"><span className="text-emerald-400">window.difyChatbotConfig</span> <span className="text-zinc-400">=</span> {'{'} <span className="text-amber-300">token</span><span className="text-zinc-400">:</span> <span className="text-sky-300">'<span className="bg-sky-900/30 px-1 rounded">귀사 전용 토큰</span>'</span>,  <span className="text-amber-300">baseUrl</span><span className="text-zinc-400">:</span> <span className="text-sky-300">'https://chatbot.visionc.co.kr'</span> {'}'}</p>
              <p><span className="text-zinc-500">&lt;/script&gt;</span></p>
              <p><span className="text-zinc-500">&lt;script </span><span className="text-amber-300">src</span><span className="text-zinc-400">=</span><span className="text-sky-300">"https://chatbot.visionc.co.kr/embed.min.js"</span><span className="text-zinc-400"> defer</span><span className="text-zinc-500">&gt;&lt;/script&gt;</span></p>
            </div>
            <p className="text-xs text-zinc-500 mt-4">← 이게 전부입니다. 복사해서 홈페이지 관리자에게 카톡으로 보내도 됩니다.</p>
          </div>
        </div>
      </section>

      {/* ── 지원 플랫폼 ── */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-3">어떤 홈페이지든 설치 가능합니다</h2>
          <p className="text-muted-foreground text-center mb-10 text-sm">플랫폼마다 설치 가이드를 제공합니다. 어렵다면 원격 설치 대행 드립니다.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PLATFORMS.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.name} className="bg-card border border-border rounded-xl p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">{p.name}</p>
                    <p className="text-xs text-primary font-semibold">{p.time} 설치</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 업종별 적용 사례 ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-3">
            업종 관계없이 바로 적용됩니다
          </h2>
          <p className="text-muted-foreground text-center mb-10 text-sm">쇼핑몰·학원·병원·부동산 — 고객 문의가 있는 곳이라면 어디든</p>
          <div className="grid md:grid-cols-2 gap-5">
            {CASES.map((c) => {
              const Icon = c.icon
              return (
                <div key={c.type} className={`rounded-2xl bg-gradient-to-br ${c.color} border border-border p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-white">{c.type}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-red-400 font-bold shrink-0">Before</span>
                      <span>{c.pain}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-emerald-400 font-bold shrink-0">After</span>
                      <span>{c.result}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 라이브 데모 ── */}
      <section id="demo" className="py-20 px-6 bg-secondary/40">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            지금 바로 체험해보세요
          </h2>
          <p className="text-muted-foreground mb-8 text-sm">
            이 페이지 우측 하단의 <strong className="text-primary">보라색 버튼</strong>을 눌러보세요.<br />
            VISIONC에 도입된 실제 챗봇을 바로 체험할 수 있습니다.
          </p>
          <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-2xl px-6 py-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center animate-pulse">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-white">우측 하단 버튼 클릭</p>
              <p className="text-xs text-muted-foreground">실제로 사용 중인 챗봇 체험 가능</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 가격 플랜 ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
              월 2만원대부터 시작합니다
            </h2>
            <p className="text-muted-foreground text-sm">최소 계약 기간 없음 · 언제든 해지 · 설치 대행 포함</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((p) => (
              <div key={p.name} className={`rounded-2xl p-6 border relative flex flex-col ${
                p.highlight
                  ? 'bg-primary/10 border-primary shadow-lg shadow-primary/10'
                  : 'bg-card border-border'
              }`}>
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                    {p.cta}
                  </span>
                )}
                <div className="mb-4">
                  <p className={`text-sm font-bold mb-1 ${p.highlight ? 'text-primary' : 'text-muted-foreground'}`}>{p.name}</p>
                  <p className="text-2xl font-black text-white">{p.price}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.setup}</p>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact"
                  className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    p.highlight
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'border border-foreground/20 text-foreground/70 hover:border-primary/50 hover:text-foreground'
                  }`}>
                  무료 상담 신청
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">
            * 가격은 부가세 별도입니다. 대량 계약 시 별도 협의 가능합니다.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-10">자주 묻는 질문</h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-white pr-4">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 최종 CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            오늘 문의하면<br /><span className="text-primary">내일 챗봇이 일합니다</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            복잡한 계약 없습니다. 긴 회의 없습니다.<br />
            문의 → 토큰 발급 → 코드 붙이기, 이게 전부입니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-10 py-4 rounded-xl transition-all text-base">
              무료 상담 신청 <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="mailto:biztalktome@gmail.com"
              className="inline-flex items-center justify-center gap-2 border border-foreground/20 hover:border-primary/50 text-foreground/70 hover:text-foreground font-medium px-8 py-4 rounded-xl transition-all text-base">
              이메일 바로 보내기
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-6">영업일 기준 당일 회신 · 설치 대행 무료 · 최소 계약 기간 없음</p>
        </div>
      </section>

    </div>
  )
}
