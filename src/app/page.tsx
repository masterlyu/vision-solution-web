'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

/* ── Ticker ── */
const TICKER_ITEMS = [
  { text: '이번 달 진단 완료 247건 — 가장 많이 발견된 문제는 모바일 미대응', href: '/renewal' },
  { text: '보안 점검에서 평균 23개 취약점 발견 — 당신의 사이트는 안전한가요?', href: '/security' },
  { text: 'AI, 대기업만의 이야기가 아닙니다 — 직원 30명 제조사 도입 사례', href: '/ai-solution' },
  { text: '리뉴얼 후 문의량 평균 3.2배 증가 — 고객사 Before/After', href: '/blog' },
  { text: '개발사가 사라졌나요? 유지보수 인수 · 2시간 내 대응 시작', href: '/maintenance' },
]

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="bg-brand text-white text-xs font-medium overflow-hidden py-2.5">
      <div className="flex animate-ticker whitespace-nowrap" style={{ width: 'max-content' }}>
        {items.map((item, i) => (
          <Link key={i} href={item.href}
            className="inline-flex items-center gap-6 px-8 hover:underline shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ── Hero URL Input ── */
function HeroInput() {
  const [url, setUrl] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return
    router.push(`/renewal?url=${encodeURIComponent(url)}`)
  }

  return (
    <form onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mt-10">
      <input
        type="url"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="https://your-site.com"
        className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-5 py-4 text-white placeholder-neutral-600 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand/30 text-sm transition-all"
      />
      <button type="submit"
        className="btn-red px-7 py-4 text-base font-bold shrink-0 justify-center">
        무료 진단 시작하기 →
      </button>
    </form>
  )
}

/* ── Counter ── */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        let start = 0
        const step = to / 50
        const t = setInterval(() => {
          start += step
          if (start >= to) { setN(to); clearInterval(t) }
          else setN(Math.floor(start))
        }, 35)
      }
    }, { threshold: 0.6 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to])
  return <span ref={ref}>{n}{suffix}</span>
}

/* ── Problems ── */
const PROBLEMS = [
  {
    num: '53%',
    title: '방문자의 53%가 3초 안에 떠납니다',
    desc: '모바일에서 레이아웃이 깨지고, 로딩에 4초 이상 걸리는 사이트는 광고비를 쓸수록 돈이 새는 구조입니다. 5년 넘은 홈페이지 10곳 중 7곳이 이 상태입니다.',
  },
  {
    num: '62%',
    title: '개발사가 사라졌습니다',
    desc: '"이전 업체랑 연락이 안 돼요." 우리가 상담한 기업의 62%가 같은 말을 합니다. 소스코드 접근 불가, 보안 패치 중단 — 방치된 사이트는 해킹의 첫 번째 타깃입니다.',
  },
  {
    num: '8/10',
    title: 'AI 도입, 어디서부터 시작해야 할지 모릅니다',
    desc: '중소기업 대표 10명 중 8명이 AI에 관심은 있지만 "우리 회사에 어떻게 적용하는지"를 모른다고 답합니다. ChatGPT 구독만으로는 업무 자동화가 되지 않습니다.',
  },
]

/* ── Services ── */
const SERVICES = [
  {
    icon: '🔄', title: '웹사이트 리뉴얼', href: '/renewal',
    stats: [['67%', '로딩 속도 개선'], ['2.4배', '모바일 전환율 증가']],
    desc: 'URL만 입력하면 웹기술·디자인·프로그램·DB 구조를 자동 분석합니다. 평균 진단 소요 48시간. 리뉴얼 전 결과를 먼저 확인하고 결정하세요.',
  },
  {
    icon: '🆕', title: '웹사이트 신규 제작', href: '/new-website',
    stats: [['4~6주', '평균 제작 기간'], ['반응형', '다국어 기본 포함']],
    desc: '기획부터 디자인·개발·SEO 세팅까지 원스톱. 관리자 페이지 제공으로 콘텐츠 수정에 개발자가 필요 없습니다.',
  },
  {
    icon: '🛡️', title: '보안 점검', href: '/security',
    stats: [['23개', '평균 취약점 발견'], ['OWASP', 'Top 10 기준 전수 점검']],
    desc: '화이트해커가 직접 사이트와 앱을 진단합니다. SQL 인젝션·XSS·인증 우회 등 전수 점검. 조치 가이드와 견적을 PDF로 제공합니다.',
  },
  {
    icon: '🔧', title: '유지보수', href: '/maintenance',
    stats: [['2시간', '평균 장애 대응'], ['월정액', '보안패치·백업·수정 포함']],
    desc: '개발사가 사라져도 걱정 없습니다. 보안 패치·SSL 갱신·백업·콘텐츠 수정까지 월정액으로 관리합니다.',
  },
  {
    icon: '📱', title: '앱 개발', href: '/app-dev',
    stats: [['원스톱', '기획→출시→유지보수'], ['iOS+Android', '크로스플랫폼']],
    desc: '네이티브·하이브리드·크로스플랫폼 — 비즈니스에 맞는 방식을 제안합니다. 한 팀이 기획부터 출시까지 끝까지 책임집니다.',
  },
  {
    icon: '🤖', title: 'AI 솔루션', href: '/ai-solution',
    stats: [['41%', '반복업무 처리시간 단축'], ['온프레미스', '사내 서버 구축']],
    desc: 'ERP·KMS·Excel 데이터와 연결되는 자체 AI 시스템을 사내 서버에 구축합니다. 하드웨어 선정부터 소프트웨어 개발까지 풀 패키지.',
  },
]

/* ── Process ── */
const PROCESS = [
  { n: '1', t: 'URL 입력', d: '분석 대상 주소와 이메일 입력' },
  { n: '2', t: '자동 분석', d: 'AI 에이전트가 기술·디자인·보안 전수 분석' },
  { n: '3', t: '보고서 생성', d: '견적서 + 상세 분석 PDF 자동 생성' },
  { n: '4', t: '담당자 확인', d: '내부 검토 후 발송 여부 결정' },
  { n: '5', t: 'PDF 이메일 발송', d: '입력하신 이메일로 즉시 전송' },
]

/* ── Testimonials ── */
const TESTIMONIALS = [
  {
    quote: '리뉴얼 전에는 홈페이지 문의가 월 3건이었습니다. URL만 넣었는데 이틀 만에 분석 리포트가 왔고, 우리가 몰랐던 보안 취약점 11개도 같이 잡아줬습니다. 리뉴얼 3개월 후 월 문의가 27건으로 늘었습니다.',
    name: '이정호',
    role: '○○테크 대표이사',
    detail: '제조업 · 직원 45명',
  },
  {
    quote: 'AI 도입이라고 하면 수억 원짜리 프로젝트인 줄 알았습니다. 비젼솔루션은 우리 기존 ERP 데이터를 연결해서 재고 예측 AI를 사내 서버에 올려줬어요. 구축 기간 6주, 비용은 예상의 3분의 1. 지금은 발주 실수가 거의 없어졌습니다.',
    name: '박수연',
    role: '○○유통 IT기획팀장',
    detail: '유통업 · 직원 120명',
  },
]

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      {/* Ticker */}
      <Ticker />

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-10 pb-20 overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(200,0,31,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,0,31,0.04) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }} />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container-base relative text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 border border-neutral-800 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse-dot" />
            URL 하나로 무료 사이트 진단 — 비용 0원, 계약 의무 없음
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight mb-6">
            홈페이지, 그냥 두면<br />
            <span className="text-brand">매일 고객을 잃습니다.</span>
          </h1>

          <p className="text-neutral-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-2">
            URL 하나만 입력하세요.<br />
            웹기술·디자인·보안·DB까지 <strong className="text-white">72시간 안에 전수 분석</strong>해서<br />
            견적과 개선안을 PDF로 보내드립니다.
          </p>
          <p className="text-brand font-bold text-sm mb-8">개선안 비용은 0원.</p>

          <HeroInput />

          <p className="text-neutral-600 text-xs mt-5">
            ✔ 상담 전화 없음 &nbsp;·&nbsp; ✔ 48시간 내 리포트 발송 &nbsp;·&nbsp; ✔ 진단 비용 0원 · 계약 의무 없음
          </p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-y border-neutral-900 bg-neutral-950 py-10">
        <div className="container-base">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n: 247, s: '건+', l: '이번 달 진단 완료' },
              { n: 23, s: '개', l: '평균 취약점 발견' },
              { n: 48, s: 'h', l: '분석 리포트 납기' },
              { n: 97, s: '%', l: '고객 재의뢰율' },
            ].map(({ n, s, l }) => (
              <div key={l}>
                <div className="stat-num"><Counter to={n} suffix={s} /></div>
                <p className="text-neutral-500 text-xs mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problems ── */}
      <section className="section border-b border-neutral-900">
        <div className="container-base">
          <span className="label">PROBLEM</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3">
            지금 이 순간에도<br />벌어지고 있는 일
          </h2>
          <p className="text-neutral-500 text-sm mb-12 max-w-lg">방치된 홈페이지는 매일 비용을 발생시킵니다.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PROBLEMS.map((p, i) => (
              <div key={i} className="card">
                <div className="text-5xl font-black text-brand mb-4 tabular-nums">{p.num}</div>
                <h3 className="text-white font-bold text-base mb-3 leading-snug">{p.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="section border-b border-neutral-900">
        <div className="container-base">
          <span className="label">SERVICES</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3">
            비젼솔루션이<br />해결하는 방법
          </h2>
          <p className="text-neutral-500 text-sm mb-12">URL 입력 → 자동 분석 → 견적서 + PDF 이메일 발송</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(s => (
              <Link key={s.href} href={s.href}
                className="card group flex flex-col hover:border-brand/40">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-brand transition-colors">{s.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-5 flex-1">{s.desc}</p>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-800">
                  {s.stats.map(([val, label]) => (
                    <div key={label}>
                      <div className="text-brand font-black text-xl">{val}</div>
                      <div className="text-neutral-600 text-xs mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-brand text-xs font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  자세히 보기 <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section border-b border-neutral-900 bg-neutral-950">
        <div className="container-base">
          <span className="label">PROCESS</span>
          <h2 className="text-3xl sm:text-4xl font-black mb-12">공통 프로세스</h2>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {PROCESS.map((p, i) => (
              <div key={p.n} className="relative flex flex-col items-start sm:items-center text-left sm:text-center">
                {i < PROCESS.length - 1 && (
                  <div className="hidden sm:block absolute top-5 left-[calc(50%+28px)] right-0 h-px bg-neutral-800 z-0" />
                )}
                <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center text-brand font-black text-sm mb-4 relative z-10">
                  {p.n}
                </div>
                <p className="text-white font-bold text-sm mb-1">{p.t}</p>
                <p className="text-neutral-600 text-xs leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 border border-brand/20 bg-brand/5 rounded-2xl text-center">
            <p className="text-neutral-300 text-sm">
              <strong className="text-white">복잡한 상담 절차 없이,</strong> 결과물을 먼저 확인하고 결정하세요.
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section border-b border-neutral-900">
        <div className="container-base">
          <span className="label">TESTIMONIALS</span>
          <h2 className="text-3xl sm:text-4xl font-black mb-12">고객사 후기</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="card flex flex-col gap-5">
                <div className="text-brand text-4xl leading-none font-black">&ldquo;</div>
                <p className="text-neutral-300 text-sm leading-[1.85] flex-1">{t.quote}</p>
                <div className="pt-4 border-t border-neutral-800">
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-neutral-500 text-xs mt-0.5">{t.role}</p>
                  <p className="text-neutral-700 text-xs">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section">
        <div className="container-base text-center">
          <span className="label">GET STARTED</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            지금 URL을 입력하면,<br />
            <span className="text-brand">48시간 안에 답이 옵니다.</span>
          </h2>
          <p className="text-neutral-500 text-sm mb-2 max-w-md mx-auto leading-relaxed">
            사이트 진단부터 견적까지 완전 무료.<br />
            분석 결과가 마음에 들 때만 진행하면 됩니다.
          </p>
          <p className="text-white font-semibold text-sm mb-10">부담 없이 시작하세요.</p>

          <HeroInput />

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8 text-sm text-neutral-500">
            <span>✔ 상담 전화 없음 — URL 입력만으로 시작</span>
            <span>✔ 48시간 내 분석 리포트 발송</span>
            <span>✔ 진단 비용 0원, 계약 의무 없음</span>
          </div>
        </div>
      </section>
    </div>
  )
}
