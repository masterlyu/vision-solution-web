'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  RefreshCw, Globe, Wrench, ShieldCheck, Code2, Sparkles,
  ChevronRight, ArrowRight, Cpu, Paintbrush2, Lock, BarChart3,
  FileText, Calculator, TrendingUp, Users, Clock, Star,
  CheckCircle2, AlertTriangle, Smartphone,
} from 'lucide-react'

/* ── Ticker ── */
const TICKER = [
  { text: '이번 달 진단 완료 247건 — 가장 많이 발견된 문제는 모바일 미대응', href: '/renewal' },
  { text: '보안 점검에서 평균 23개 취약점 발견 — 당신의 사이트는 안전한가요?', href: '/security' },
  { text: 'AI 솔루션, 직원 30명 제조사도 도입했습니다 — 사례 보기', href: '/ai-solution' },
  { text: '리뉴얼 후 문의량 평균 3.2배 증가 — 고객사 Before/After', href: '/blog' },
  { text: '개발사가 사라졌나요? 유지보수 인수 · 2시간 내 대응 시작', href: '/maintenance' },
]

function Ticker() {
  const items = [...TICKER, ...TICKER]
  return (
    <div className="bg-brand/90 text-white text-sm font-medium overflow-hidden py-2.5">
      <div className="flex animate-ticker whitespace-nowrap" style={{ width: 'max-content' }}>
        {items.map((item, i) => (
          <Link key={i} href={item.href}
            className="inline-flex items-center gap-2 px-8 hover:text-brand-light transition-colors">
            <span className="w-1 h-1 rounded-full bg-white/60 flex-shrink-0" />
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ── Counter ── */
function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect()
      let start = 0
      const step = Math.ceil(end / 60)
      const t = setInterval(() => {
        start = Math.min(start + step, end)
        setVal(start)
        if (start >= end) clearInterval(t)
      }, 24)
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ── HeroInput ── */
function HeroInput() {
  const [url, setUrl] = useState('')
  const router = useRouter()
  return (
    <form onSubmit={e => { e.preventDefault(); if (url) router.push(`/renewal?url=${encodeURIComponent(url)}`) }}
      className="flex flex-col sm:flex-row gap-3 max-w-xl">
      <input type="url" value={url} onChange={e => setUrl(e.target.value)}
        placeholder="https://your-website.com"
        className="flex-1 input text-base h-12" />
      <button type="submit"
        className="btn-primary h-12 px-6 whitespace-nowrap">
        무료 진단 <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  )
}

/* ── Services ── */
const SERVICES = [
  { icon: RefreshCw,   href: '/renewal',      label: '홈페이지 리뉴얼', stat: '평균 로딩 67% 개선', desc: '오래된 사이트를 속도·디자인·SEO 전부 새로 만듭니다.' },
  { icon: Globe,       href: '/new-website',  label: '신규 사이트 구축', stat: '기획부터 론칭까지', desc: '기획·디자인·개발·배포를 원스톱으로 진행합니다.' },
  { icon: Wrench,      href: '/maintenance',  label: '유지보수', stat: '월 15만원~', desc: '장애 대응, 콘텐츠 업데이트, 보안 패치를 정기적으로.' },
  { icon: ShieldCheck, href: '/security',     label: '보안 진단', stat: '평균 23개 취약점 발견', desc: '비침투적 방식으로 취약점을 찾고 조치 가이드를 제공합니다.' },
  { icon: Code2,       href: '/app-dev',      label: '앱·시스템 개발', stat: '모바일·웹·백엔드', desc: '아이디어를 실제 서비스로 만들어 드립니다.' },
  { icon: Sparkles,    href: '/ai-solution',  label: 'AI 솔루션', stat: '업무 자동화 85% 절감 사례', desc: 'AI 챗봇·자동화·데이터 분석을 중소기업 규모에 맞게 도입합니다.' },
]

/* ── Problems ── */
const PROBLEMS = [
  { icon: Smartphone,     pct: '53%', title: '모바일 최적화 안 된 사이트', desc: '방문자의 53%는 모바일로 접속합니다. 모바일에서 깨지면 그냥 나갑니다.' },
  { icon: TrendingUp,     pct: '62%', title: '느린 사이트, 고객이 먼저 이탈', desc: '로딩 3초 초과 시 이탈률 62% 증가. 광고비 대비 전환율이 반토막납니다.' },
  { icon: AlertTriangle,  pct: '8/10', title: '중소기업 사이트 보안 방치', desc: '점검한 사이트 10곳 중 8곳에서 보안 취약점이 발견됩니다.' },
]

/* ── Process ── */
const PROCESS = [
  { n: '01', title: 'URL 입력', desc: '분석할 사이트 주소와 이메일만 입력' },
  { n: '02', title: 'AI 분석', desc: '성능·보안·디자인·SEO 자동 진단' },
  { n: '03', title: '리포트 생성', desc: 'PDF 리포트 + 맞춤 제안서 작성' },
  { n: '04', title: '이메일 발송', desc: '48시간 내 이메일로 전달' },
  { n: '05', title: '무료 상담', desc: '결과 기반 1:1 상담 진행' },
]

/* ── Main ── */
export default function Home() {
  return (
    <div className="bg-[#09090B] min-h-screen">
      <Ticker />

      {/* Hero */}
      <section className="section pt-28">
        <div className="container-base">
          <div className="max-w-3xl">
            <span className="label">WEB SOLUTIONS</span>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.12] mb-6">
              홈페이지, 그냥 두면<br />
              <span className="text-brand">매일 고객을 잃습니다.</span>
            </h1>
            <p className="section-sub mb-8 max-w-xl">
              URL 하나로 현재 사이트의 문제를 AI가 48시간 안에 진단합니다.<br />
              진단 → 리포트 → 상담까지 완전 무료.
            </p>
            <HeroInput />
            <p className="text-neutral-500 text-sm mt-4">신용카드 불필요 · 48시간 내 이메일 수신</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-neutral-800 py-12">
        <div className="container-base">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { end: 247, suffix: '건+', label: '누적 진단 완료' },
              { end: 23,  suffix: '개',  label: '평균 발견 취약점' },
              { end: 48,  suffix: 'h',   label: '리포트 발송 기한' },
              { end: 97,  suffix: '%',   label: '고객 재의뢰율' },
            ].map(s => (
              <div key={s.label}>
                <div className="stat-num"><Counter end={s.end} suffix={s.suffix} /></div>
                <div className="text-neutral-300 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="section">
        <div className="container-base">
          <div className="text-center mb-14">
            <span className="label">PROBLEMS</span>
            <h2 className="section-title">지금 이 순간에도<br />고객이 떠나고 있습니다</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROBLEMS.map(p => (
              <div key={p.title} className="card group">
                <div className="icon-box">
                  <p.icon className="w-5 h-5 text-brand" strokeWidth={1.5} />
                </div>
                <div className="text-4xl font-black text-brand mb-3">{p.pct}</div>
                <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-[#0D0D12]">
        <div className="container-base">
          <div className="text-center mb-14">
            <span className="label">SERVICES</span>
            <h2 className="section-title">필요한 것만, 정확하게</h2>
            <p className="section-sub">작은 유지보수부터 AI 도입까지 단일 파트너로 해결합니다.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map(s => (
              <Link key={s.label} href={s.href} className="card group block">
                <div className="icon-box">
                  <s.icon className="w-5 h-5 text-brand" strokeWidth={1.5} />
                </div>
                <div className="text-brand text-xs font-bold mb-2 tracking-wide">{s.stat}</div>
                <h3 className="text-white font-bold text-base mb-2">{s.label}</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">{s.desc}</p>
                <div className="flex items-center gap-1 text-brand text-sm font-semibold mt-5">
                  자세히 보기 <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container-base">
          <div className="text-center mb-14">
            <span className="label">PROCESS</span>
            <h2 className="section-title">URL 입력 하나로<br />전부 해결됩니다</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {PROCESS.map((p, i) => (
              <div key={p.n} className="relative flex flex-col items-center text-center">
                {i < PROCESS.length - 1 && (
                  <div className="hidden sm:block absolute top-5 left-[calc(50%+22px)] right-[-calc(50%-22px)] h-px bg-brand/20" />
                )}
                <div className="w-10 h-10 rounded-full bg-brand text-white font-black text-sm flex items-center justify-center mb-4 z-10">
                  {p.n}
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{p.title}</h3>
                <p className="text-neutral-400 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-[#0D0D12]">
        <div className="container-base">
          <div className="text-center mb-14">
            <span className="label">TESTIMONIALS</span>
            <h2 className="section-title">실제 고객 후기</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { quote: '"URL 하나 입력했을 뿐인데 48시간 만에 PDF 리포트가 왔습니다. 경쟁사 대비 우리 사이트가 얼마나 뒤처져 있는지 처음으로 수치로 확인했어요. 바로 리뉴얼 진행했습니다."', name: '이정호', role: '○○테크 대표', stars: 5 },
              { quote: '"보안 진단 결과 취약점이 19개나 나왔어요. 무서웠지만 조치 가이드가 명확해서 개발자와 같이 2주 만에 다 해결했습니다. 비용 대비 효과가 확실합니다."', name: '박수연', role: '○○유통 IT 담당자', stars: 5 },
            ].map(t => (
              <div key={t.name} className="card">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand text-brand" />
                  ))}
                </div>
                <p className="text-neutral-200 text-sm leading-relaxed mb-6">{t.quote}</p>
                <div>
                  <div className="text-white font-bold text-sm">{t.name}</div>
                  <div className="text-neutral-400 text-xs mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-base">
          <div className="card-highlight text-center py-16 px-6">
            <span className="label">START NOW</span>
            <h2 className="section-title mb-4">48시간 안에 답이 옵니다</h2>
            <p className="section-sub mb-8 max-w-lg mx-auto">
              지금 바로 URL을 입력하세요. 분석·리포트·상담 전부 무료입니다.
            </p>
            <HeroInput />
          </div>
        </div>
      </section>
    </div>
  )
}
