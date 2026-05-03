'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView, type Variants } from 'framer-motion'
import UrlAnalysisForm from '@/components/UrlAnalysisForm'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

// ── LottiePlayer ──────────────────────────────────────────────────────────
function LottiePlayer({ src, width = 120, height = 120, loop = true }: {
  src: string; width?: number; height?: number; loop?: boolean
}) {
  const [data, setData] = useState<object | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetch(src).then(r => r.json()).then(setData).catch(() => {})
  }, [src])

  if (!mounted) return <div style={{ width, height }} />
  if (!data) return <div style={{ width, height }} />
  return <Lottie animationData={data} loop={loop} autoplay style={{ width, height }} />
}

// ── LottiePlaceholder (신규 Lottie 5개 — 파일 미완성) ─────────────────────
function LottiePlaceholder({ label, width = 56, height = 56 }: {
  label: string; width?: number; height?: number
}) {
  return (
    <div style={{
      width, height, flexShrink: 0,
      background: 'var(--card)',
      border: '1px dashed color-mix(in oklch, var(--primary) 40%, transparent)',
      borderRadius: 8,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--primary)',
      fontSize: '0.55rem', fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.06em',
      textAlign: 'center', padding: 4, lineHeight: 1.3,
    }}>
      {label}
    </div>
  )
}

// ── CountUpNumber ─────────────────────────────────────────────────────────
function CountUpNumber({ value, suffix = '', decimals = 0, duration = 1.5 }: {
  value: number; suffix?: string; decimals?: number; duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 })
  const display = useTransform(spring, v =>
    decimals > 0 ? `${v.toFixed(decimals)}${suffix}` : `${Math.round(v).toLocaleString()}${suffix}`
  )
  useEffect(() => { if (isInView) motionVal.set(value) }, [isInView, value, motionVal])
  return <motion.span ref={ref}>{display}</motion.span>
}

// ── BeforeAfterSlider ─────────────────────────────────────────────────────
function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setPos(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)))
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-xl select-none cursor-ew-resize"
      style={{ aspectRatio: '16/9' }}
      onMouseDown={e => { dragging.current = true; updatePos(e.clientX) }}
      onMouseMove={e => { if (dragging.current) updatePos(e.clientX) }}
      onMouseUp={() => { dragging.current = false }}
      onMouseLeave={() => { dragging.current = false }}
      onTouchStart={e => { dragging.current = true; updatePos(e.touches[0].clientX) }}
      onTouchMove={e => { updatePos(e.touches[0].clientX) }}
      onTouchEnd={() => { dragging.current = false }}
    >
      {/* Before */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1"
        style={{ background: 'var(--card)' }}>
        <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Before</span>
        <span className="text-xs text-muted-foreground/40">스크린샷 준비 중</span>
      </div>
      {/* After */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)`, background: 'var(--card-deep)' }}>
        <span className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--primary-bright)' }}>After</span>
        <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>스크린샷 준비 중</span>
      </div>
      {/* Divider + Handle */}
      <div className="absolute top-0 bottom-0 w-0.5 z-10"
        style={{ left: `${pos}%`, background: 'var(--primary)', transform: 'translateX(-50%)' }}>
        <div className="absolute top-1/2 left-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
          style={{ background: 'var(--primary)', transform: 'translate(-50%, -50%)', boxShadow: '0 2px 12px color-mix(in oklch, var(--primary) 50%, transparent)' }}>
          ⇄
        </div>
      </div>
      <span className="absolute bottom-2.5 left-3 z-10 text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full"
        style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--muted-foreground)' }}>Before</span>
      <span className="absolute bottom-2.5 right-3 z-10 text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full"
        style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>After</span>
    </div>
  )
}

// ── FilterTab ─────────────────────────────────────────────────────────────
function FilterTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="px-4 py-2 rounded-lg text-sm font-semibold transition-all border"
      style={{
        background: active ? 'color-mix(in oklch, var(--primary) 20%, transparent)' : 'transparent',
        borderColor: active ? 'color-mix(in oklch, var(--primary) 50%, transparent)' : 'var(--border)',
        color: active ? 'var(--primary-bright)' : 'var(--muted-foreground)',
      }}>
      {label}
    </button>
  )
}

// ── Animation Variants ────────────────────────────────────────────────────
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const staggerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

// ── Data ──────────────────────────────────────────────────────────────────
const industryFilters = ['전체', '음식점/카페', '병원/의원', '쇼핑몰', '제조/B2B', '서비스업', '교육/학원']
const serviceFilters = ['전체', '홈페이지 신규 제작', '사이트 리뉴얼', '앱 개발', 'AI 솔루션', '보안 강화']

const stats = [
  { value: 127, suffix: '+',  decimals: 0, label: '완료 프로젝트', sub: '2021년 창업 이후' },
  { value: 3.2, suffix: '×',  decimals: 1, label: '평균 문의 증가', sub: '리뉴얼 3개월 후 기준' },
  { value: 98,  suffix: '%',  decimals: 0, label: '고객 만족도', sub: '납품 후 설문 기준' },
  { value: 3,   suffix: '주', decimals: 0, label: '평균 납품 기간', sub: '계약 후 착수 기준' },
]

interface CaseItem {
  id: number
  name: string
  location: string
  date: string
  industry: string
  industryBg: string
  industryBorder: string
  industryText: string
  service: string
  metrics: { value: string; label: string; bg: string; border: string; text: string }[]
  quote: string
  author: string
}

const cases: CaseItem[] = [
  {
    id: 1,
    name: 'OO 한정식 레스토랑',
    location: '서울 강남', date: '2025.11',
    industry: '음식점/카페',
    industryBg: 'color-mix(in oklch, var(--accent-amber-dark) 15%, transparent)', industryBorder: 'color-mix(in oklch, var(--accent-amber-dark) 40%, transparent)', industryText: 'var(--accent-amber)',
    service: '사이트 리뉴얼',
    metrics: [
      { value: '+240%', label: '예약 문의', bg: 'color-mix(in oklch, var(--accent-green-dark) 10%, transparent)', border: 'color-mix(in oklch, var(--accent-green-dark) 30%, transparent)', text: 'var(--accent-green-text)' },
      { value: '3주',   label: '납품 기간', bg: 'color-mix(in oklch, var(--primary) 10%, transparent)', border: 'color-mix(in oklch, var(--primary) 30%, transparent)', text: 'var(--primary-light)' },
      { value: '★ 4.9', label: '고객 평점', bg: 'color-mix(in oklch, var(--accent-amber-dark) 10%, transparent)',  border: 'color-mix(in oklch, var(--accent-amber-dark) 30%, transparent)',  text: 'var(--accent-amber)'  },
    ],
    quote: '리뉴얼 후 한 달 만에 예약 전화가 2배 이상 늘었어요.',
    author: '대표 김○○',
  },
  {
    id: 2,
    name: 'OO 피부과 의원',
    location: '경기 성남', date: '2025.09',
    industry: '병원/의원',
    industryBg: 'color-mix(in oklch, var(--accent-green-dark) 20%, transparent)', industryBorder: 'color-mix(in oklch, var(--accent-green-dark) 40%, transparent)', industryText: 'var(--accent-green-text)',
    service: '홈페이지 신규 제작',
    metrics: [
      { value: '+180%', label: '신규 상담', bg: 'color-mix(in oklch, var(--accent-green-dark) 10%, transparent)', border: 'color-mix(in oklch, var(--accent-green-dark) 30%, transparent)', text: 'var(--accent-green-text)' },
      { value: '4주',   label: '납품 기간', bg: 'color-mix(in oklch, var(--primary) 10%, transparent)', border: 'color-mix(in oklch, var(--primary) 30%, transparent)', text: 'var(--primary-light)' },
      { value: '★ 5.0', label: '고객 평점', bg: 'color-mix(in oklch, var(--accent-amber-dark) 10%, transparent)',  border: 'color-mix(in oklch, var(--accent-amber-dark) 30%, transparent)',  text: 'var(--accent-amber)'  },
    ],
    quote: '개원하면서 만든 사이트인데, 기대 이상으로 완성도가 높았어요.',
    author: '원장 이○○',
  },
  {
    id: 3,
    name: 'OO 수제 제과점',
    location: '부산 해운대', date: '2025.12',
    industry: '쇼핑몰',
    industryBg: 'color-mix(in oklch, var(--accent-cyan) 20%, transparent)', industryBorder: 'color-mix(in oklch, var(--accent-cyan) 40%, transparent)', industryText: 'var(--accent-cyan-text)',
    service: 'AI 솔루션',
    metrics: [
      { value: '+320%', label: '온라인 주문', bg: 'color-mix(in oklch, var(--accent-green-dark) 10%, transparent)', border: 'color-mix(in oklch, var(--accent-green-dark) 30%, transparent)', text: 'var(--accent-green-text)' },
      { value: '2주',   label: '납품 기간', bg: 'color-mix(in oklch, var(--primary) 10%, transparent)', border: 'color-mix(in oklch, var(--primary) 30%, transparent)', text: 'var(--primary-light)' },
      { value: '★ 5.0', label: '고객 평점', bg: 'color-mix(in oklch, var(--accent-amber-dark) 10%, transparent)',  border: 'color-mix(in oklch, var(--accent-amber-dark) 30%, transparent)',  text: 'var(--accent-amber)'  },
    ],
    quote: 'AI 챗봇 추가 후 밤새 주문을 놓치지 않게 됐어요. 매출이 확 늘었습니다.',
    author: '대표 박○○',
  },
]

const processSteps = [
  { num: '01', title: 'URL 무료 진단',  sub: '48시간 내 리포트 발송', lottie: '/lottie/scan.json', isNew: false, highlight: false },
  { num: '02', title: '요구사항 미팅',  sub: '30분 화상/전화 상담',   lottie: null,               isNew: true,  highlight: false },
  { num: '03', title: '디자인 시안',    sub: '3~5일 내 초안 공유',    lottie: null,               isNew: true,  highlight: false },
  { num: '04', title: '개발 & 배포',    sub: '평균 2~3주 내 완료',    lottie: null,               isNew: true,  highlight: false },
  { num: '05', title: '납품 + 사후 관리', sub: '3개월 무상 유지보수', lottie: null,               isNew: true,  highlight: true  },
]

// ── Page ──────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [industryFilter, setIndustryFilter] = useState('전체')
  const [serviceFilter, setServiceFilter] = useState('전체')
  const [showAll, setShowAll] = useState(false)

  const filteredCases = cases.filter(c => {
    const industryMatch = industryFilter === '전체' || c.industry === industryFilter
    const serviceMatch = serviceFilter === '전체' || c.service === serviceFilter
    return industryMatch && serviceMatch
  })

  const displayedCases = showAll ? filteredCases : filteredCases.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">

      {/* ── Section 1 — Hero ── */}
      <section
        className="pt-24 pb-16 px-6 text-center relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, color-mix(in oklch, var(--primary) 12%, transparent), transparent)' }}
      >
        <motion.div
          className="max-w-3xl mx-auto flex flex-col items-center gap-5"
          variants={staggerSlow}
          initial="hidden"
          animate="visible"
        >
          {/* Lottie placeholder — portfolio-showcase.json */}
          <motion.div variants={fadeInUp}>
            <LottiePlaceholder label="portfolio-showcase.json" width={140} height={140} />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest"
              style={{ background: 'color-mix(in oklch, var(--primary) 20%, transparent)', color: 'var(--primary-bright)', border: '1px solid color-mix(in oklch, var(--primary) 40%, transparent)' }}>
              Portfolio
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight"
          >
            &ldquo;홈페이지 바꿨더니<br />
            <span style={{ color: 'var(--primary-light)' }}>문의가 3배 늘었어요&rdquo;</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
            실제 의뢰인 사이트. 실제 수치. 직접 확인하세요.
          </motion.p>

          {/* CTA #1 */}
          <motion.div variants={fadeInUp} className="flex gap-3 flex-wrap justify-center">
            <a href="#cases"
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-xl hover:opacity-85 transition-opacity"
              style={{ background: 'var(--primary)' }}>
              포트폴리오 보기 ↓
            </a>
            <a href="#cta-form"
              className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-xl transition-all"
              style={{
                background: 'transparent',
                color: 'var(--primary-light)',
                border: '1.5px solid color-mix(in oklch, var(--primary) 60%, transparent)',
              }}>
              무료 진단 받기 →
            </a>
          </motion.div>
        </motion.div>
      </section>

      <hr className="border-border" />

      {/* ── Section 2 — Stats ── */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {stats.map(s => (
              <motion.div key={s.label} variants={fadeInUp} className="flex flex-col items-center gap-1.5">
                <div className="text-5xl font-black tabular-nums" style={{ color: 'var(--primary-light)' }}>
                  <CountUpNumber value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <div className="text-sm font-bold text-foreground">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ── Section 3 — Filter ── */}
      <section id="cases" className="pt-12 pb-6 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="text-xs font-black uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--primary-light)' }}>
              사례 필터
            </p>
            <h2 className="text-2xl font-black text-foreground mb-6">우리 업종 사례만 골라 보세요</h2>
          </motion.div>

          <motion.div
            className="space-y-3"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest w-10">업종</span>
              {industryFilters.map(f => (
                <FilterTab key={f} label={f} active={industryFilter === f} onClick={() => { setIndustryFilter(f); setShowAll(false) }} />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest w-10">서비스</span>
              {serviceFilters.map(f => (
                <FilterTab key={f} label={f} active={serviceFilter === f} onClick={() => { setServiceFilter(f); setShowAll(false) }} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 4 — Case Cards ── */}
      <section className="pt-6 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {filteredCases.length === 0 ? (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-center py-16 text-muted-foreground"
            >
              해당 조건의 사례가 없습니다. 필터를 변경해 보세요.
            </motion.div>
          ) : (
            <motion.div
              key={`${industryFilter}-${serviceFilter}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {displayedCases.map(c => (
                <motion.div
                  key={c.id}
                  variants={fadeInUp}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  <BeforeAfterSlider />

                  <div className="p-5 pb-6 space-y-3">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider"
                        style={{ background: c.industryBg, border: `1px solid ${c.industryBorder}`, color: c.industryText }}>
                        {c.industry}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider"
                        style={{ background: 'color-mix(in oklch, var(--primary) 20%, transparent)', border: '1px solid color-mix(in oklch, var(--primary) 40%, transparent)', color: 'var(--primary-light)' }}>
                        {c.service}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <div className="font-black text-foreground">{c.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{c.location} — {c.date} 납품</div>
                    </div>

                    {/* 3-cell Infographic */}
                    <div className="grid grid-cols-3 gap-2">
                      {c.metrics.map(m => (
                        <div key={m.label}
                          className="rounded-lg py-2.5 px-2 text-center"
                          style={{ background: m.bg, border: `1px solid ${m.border}` }}>
                          <div className="text-lg font-black" style={{ color: m.text }}>{m.value}</div>
                          <div className="text-xs text-muted-foreground leading-tight mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="rounded-xl p-3.5 text-sm leading-relaxed"
                      style={{ background: 'var(--card)' }}>
                      <p className="text-muted-foreground italic">&ldquo;{c.quote}&rdquo;</p>
                      <p className="text-foreground font-bold text-xs mt-1.5">— {c.author}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* 더 보기 */}
          {filteredCases.length > 3 && !showAll && (
            <div className="text-center mt-9">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 font-bold px-7 py-3 rounded-xl transition-all text-sm"
                style={{
                  background: 'transparent',
                  color: 'var(--primary-light)',
                  border: '1.5px solid color-mix(in oklch, var(--primary) 60%, transparent)',
                }}>
                더 많은 사례 보기 ({filteredCases.length}건) →
              </button>
            </div>
          )}

          {filteredCases.length > 0 && filteredCases.length <= 3 && (
            <div className="text-center mt-9">
              <button
                onClick={() => { setIndustryFilter('전체'); setServiceFilter('전체') }}
                className="inline-flex items-center gap-2 font-bold px-7 py-3 rounded-xl transition-all text-sm"
                style={{
                  background: 'transparent',
                  color: 'var(--primary-light)',
                  border: '1.5px solid color-mix(in oklch, var(--primary) 60%, transparent)',
                }}>
                전체 사례 보기 (127건) →
              </button>
            </div>
          )}
        </div>
      </section>

      <hr className="border-border" />

      {/* ── Section 5 — Mid CTA #2 ── */}
      <section
        className="py-16 px-6 text-center"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, color-mix(in oklch, var(--primary) 10%, transparent), transparent)' }}
      >
        <div className="max-w-lg mx-auto flex flex-col items-center gap-4">
          <LottiePlayer src="/lottie/check.json" width={80} height={80} loop={false} />

          <h2 className="text-3xl md:text-4xl font-black text-foreground leading-snug">
            내 사이트도 이렇게<br />
            <span style={{ color: 'var(--primary-light)' }}>바뀔 수 있을까요?</span>
          </h2>
          <p className="text-muted-foreground">
            URL 하나만 입력하세요. 48시간 내 무료 진단 리포트를 드립니다.
          </p>
          <a href="#cta-form"
            className="inline-flex items-center gap-2 text-white font-bold px-10 py-4 rounded-xl hover:opacity-85 transition-opacity text-base"
            style={{ background: 'var(--primary)' }}>
            무료 진단 시작하기 →
          </a>
          <p className="text-xs text-muted-foreground">비용 없음 · 부담 없음 · 전문가가 직접 분석</p>
        </div>
      </section>

      <hr className="border-border" />

      {/* ── Section 6 — Process Stepper ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="mb-10"
          >
            <p className="text-xs font-black uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--primary-light)' }}>
              프로세스
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-2">의뢰부터 납품까지, 5단계</h2>
            <p className="text-muted-foreground max-w-md">처음 의뢰하는 분들도 쉽게 이해할 수 있도록 단계별로 정리했습니다.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {processSteps.map(s => (
              <motion.div
                key={s.num}
                variants={fadeInUp}
                className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
                  style={{
                    background: s.highlight ? 'color-mix(in oklch, var(--accent-green-dark) 20%, transparent)' : 'color-mix(in oklch, var(--primary) 20%, transparent)',
                    color: s.highlight ? 'var(--accent-green-text)' : 'var(--primary-light)',
                  }}>
                  {s.num}
                </div>

                {s.lottie && !s.isNew
                  ? <LottiePlayer src={s.lottie} width={56} height={56} />
                  : <LottiePlaceholder label={`step-${s.num}.json`} width={56} height={56} />
                }

                <div>
                  <div className="font-black text-foreground text-sm">{s.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ── Section 7 — Final CTA #3 + Form ── */}
      <section id="cta-form" className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left */}
            <motion.div
              variants={staggerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="flex flex-col gap-5"
            >
              <motion.div variants={fadeInUp}>
                <p className="text-xs font-black uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--primary-light)' }}>
                  무료 진단
                </p>
                <h2 className="text-3xl md:text-4xl font-black text-foreground leading-snug">
                  지금 URL만 넣어보세요<br />
                  <span style={{ color: 'var(--primary-light)' }}>48시간 내 리포트 발송</span>
                </h2>
                <p className="text-muted-foreground mt-3">
                  비용 없음 · 부담 없음 · IT 지식 불필요<br />전문가가 직접 분석해 드립니다.
                </p>
              </motion.div>

              {/* Benefit badges */}
              <motion.div variants={stagger} className="flex flex-wrap gap-2">
                {[
                  { icon: '💰', label: '완전 무료' },
                  { icon: '⏱', label: '48시간 내' },
                  { icon: '🔒', label: '개인정보 보호' },
                  { icon: '📋', label: '20항목 체크리스트' },
                ].map(b => (
                  <motion.span
                    key={b.label}
                    variants={fadeInUp}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black"
                    style={{ background: 'color-mix(in oklch, var(--accent-green-dark) 20%, transparent)', border: '1px solid color-mix(in oklch, var(--accent-green-dark) 40%, transparent)', color: 'var(--accent-green-text)' }}
                  >
                    {b.icon} {b.label}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — Form */}
            <div className="lg:sticky lg:top-24">
              <UrlAnalysisForm
                serviceType="renewal"
                title="무료 사이트 진단 신청"
                notice="분석 완료 후 전문가 검토를 거쳐 이메일로 리포트를 발송합니다."
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
