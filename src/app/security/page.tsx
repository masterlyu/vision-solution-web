'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView, type Variants } from 'framer-motion'
import UrlAnalysisForm from '@/components/UrlAnalysisForm'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

// ── Lottie Player ──────────────────────────────────────────────────────────
function LottiePlayer({ src, width = 200, height = 200, loop = true, className = '' }: {
  src: string; width?: number; height?: number; loop?: boolean; className?: string
}) {
  const [data, setData] = useState<object | null>(null)
  useEffect(() => {
    fetch(src).then(r => r.json()).then(setData).catch(() => {})
  }, [src])
  if (!data) return <div style={{ width, height }} />
  return (
    <Lottie
      animationData={data}
      loop={loop}
      autoplay
      style={{ width, height }}
      className={className}
    />
  )
}

// ── CountUpNumber ──────────────────────────────────────────────────────────
function CountUpNumber({ value, suffix = '', prefix = '', duration = 1.5 }: {
  value: number; suffix?: string; prefix?: string; duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 })
  const display = useTransform(spring, v => `${prefix}${Math.round(v).toLocaleString()}${suffix}`)

  useEffect(() => {
    if (isInView) motionVal.set(value)
  }, [isInView, value, motionVal])

  return <motion.span ref={ref}>{display}</motion.span>
}

// ── RadialGauge ────────────────────────────────────────────────────────────
function RadialGauge({ percent, color, size = 80 }: {
  percent: number; color: string; size?: number
}) {
  const ref = useRef<SVGPathElement>(null)
  const isInView = useInView({ current: ref.current ? ref.current.ownerSVGElement : null } as React.RefObject<Element>, { once: true, margin: '-100px' })
  const r = 36
  const cx = 50
  const cy = 50
  const circumference = Math.PI * r
  const strokeDasharray = circumference
  const strokeDashoffset = useMotionValue(circumference)
  const spring = useSpring(strokeDashoffset, { duration: 1500, bounce: 0 })

  useEffect(() => {
    if (isInView) {
      strokeDashoffset.set(circumference * (1 - percent))
    }
  }, [isInView, percent, circumference, strokeDashoffset])

  const colorMap: Record<string, string> = {
    red: '#f87171',
    orange: '#fb923c',
    amber: '#fbbf24',
  }
  const strokeColor = colorMap[color] ?? '#a78bfa'

  return (
    <svg viewBox="0 0 100 60" width={size} height={size * 0.6} className="overflow-visible">
      <path
        d={`M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        className="text-white/10"
        strokeLinecap="round"
      />
      <motion.path
        ref={ref}
        d={`M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`}
        fill="none"
        stroke={strokeColor}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={strokeDasharray}
        style={{ strokeDashoffset: spring }}
      />
    </svg>
  )
}

// ── Animation Variants ─────────────────────────────────────────────────────
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

// ── Data ───────────────────────────────────────────────────────────────────
const stats = [
  { value: 73,   suffix: '%',   gaugePercent: 0.73, color: 'red',    desc: '중소기업 기본 보안 미설정' },
  { value: 43,   suffix: '초',  gaugePercent: 0.43, color: 'orange', desc: '글로벌 해킹 공격 주기' },
  { value: 3000, suffix: '만원', gaugePercent: 0.6,  color: 'amber',  desc: '개인정보 유출 최대 과태료' },
  { value: 95,   suffix: '%',   gaugePercent: 0.95, color: 'red',    desc: '구글 위험 경고 시 즉시 이탈' },
]

const dangers = [
  {
    lottie: '/lottie/hacker.json',
    title: '고객 카드정보가 통째로 빠져나갑니다',
    case: '국내 쇼핑몰 2,300명 카드 유출 → 3개월 만에 폐업.',
    color: 'red',
  },
  {
    lottie: '/lottie/warning.json',
    title: '내 사이트가 범죄 도구로 쓰입니다',
    case: '소규모 병원 홈페이지 악성코드 유포지 → 구글 완전 차단.',
    color: 'orange',
  },
  {
    lottie: '/lottie/alert.json',
    title: '고객 DB가 경쟁사 손에 들어갑니다',
    case: '인테리어 업체 견적 DB 전체 유출 → 경쟁사에 넘어감.',
    color: 'amber',
  },
  {
    lottie: '/lottie/scan.json',
    title: '구글에서 영원히 사라집니다',
    case: '여행사 블로그 월 5천 방문자 → 해킹 후 → 방문자 0명.',
    color: 'blue',
  },
]

const dangerColorMap: Record<string, string> = {
  red:    'border-red-500/30 bg-red-500/5',
  orange: 'border-orange-500/30 bg-orange-500/5',
  amber:  'border-amber-500/30 bg-amber-500/5',
  blue:   'border-blue-500/30 bg-blue-500/5',
}
const dangerCaseBg: Record<string, string> = {
  red:    'bg-red-500/10 border-red-500/20 text-red-400',
  orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  amber:  'bg-amber-500/10 border-amber-500/20 text-amber-400',
  blue:   'bg-blue-500/10 border-blue-500/20 text-blue-400',
}

const checks = [
  { lottie: '/lottie/lock.json',    sub: 'SSL/HTTPS',      title: '자물쇠가 잠겼나요?' },
  { lottie: '/lottie/shield.json',  sub: '보안 헤더 6가지',  title: '창문이 열려 있나요?' },
  { lottie: '/lottie/scan.json',    sub: '정보 노출 점검',   title: '해커가 정찰 중인가요?' },
  { lottie: '/lottie/hacker.json',  sub: '관리자 접근 보안', title: '뒷문이 열려 있나요?' },
  { lottie: '/lottie/alert.json',   sub: 'SEO·신뢰도',      title: '구글이 경고하나요?' },
  { lottie: '/lottie/check.json',   sub: '속도·성능',        title: '3초 안에 열리나요?' },
]

const steps = [
  { step: '01', title: 'URL 입력' },
  { step: '02', title: '자동 정밀 스캔' },
  { step: '03', title: '전문가 검토' },
  { step: '04', title: '쉬운 리포트 발송' },
  { step: '05', title: '맞춤 견적 제안' },
  { step: '06', title: '개선 + 재진단' },
]

const siteTypes = [
  { emoji: '🌐', label: '워드프레스',      ok: true  },
  { emoji: '🏠', label: '일반 홈페이지',   ok: true  },
  { emoji: '🛒', label: '쇼핑몰',          ok: true  },
  { emoji: '🖥️', label: '커스텀 서버',     ok: true  },
  { emoji: '🏪', label: '카페24 / 아임웹', ok: null  },
  { emoji: '🏬', label: '스마트스토어',    ok: false },
]

// ── Page ───────────────────────────────────────────────────────────────────
export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 text-center relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% -10%, color-mix(in oklch, var(--destructive) 18%, transparent) 0%, transparent 65%)',
        }}
      >
        <motion.div
          className="max-w-4xl mx-auto flex flex-col items-center gap-6"
          variants={staggerSlow}
          initial="hidden"
          animate="visible"
        >
          {/* Lottie 최상단 — 240px */}
          <motion.div variants={fadeInUp}>
            <LottiePlayer src="/lottie/shield.json" width={240} height={240} />
          </motion.div>

          {/* 얼럿 배지 */}
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
              지금 이 순간도 해킹 시도 중
            </span>
          </motion.div>

          {/* H1: 2줄 */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-tight"
          >
            지금 내 사이트,<br />
            <span className="text-red-400">털리고 있지 않나요?</span>
          </motion.h1>

          {/* P: 1줄 */}
          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
            국내 중소기업 73%가 지금 해킹에 노출되어 있습니다.
          </motion.p>

          {/* CTA 버튼 1개 */}
          <motion.div variants={fadeInUp}>
            <a
              href="#cta-form"
              className="inline-block bg-primary text-primary-foreground text-base font-bold px-9 py-3.5 rounded-xl hover:opacity-85 transition-opacity"
            >
              무료로 내 사이트 확인하기 →
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 px-6 lg:px-12 border-y border-border" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {stats.map(s => (
              <motion.div key={s.desc} variants={fadeInUp} className="flex flex-col items-center gap-2">
                <RadialGauge percent={s.gaugePercent} color={s.color} size={80} />
                <div className="text-5xl font-black text-primary tabular-nums">
                  <CountUpNumber value={s.value} suffix={s.suffix} duration={1.5} />
                </div>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Danger Cases ── */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-black text-foreground text-center mb-10 leading-snug"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            &ldquo;우리 같은 작은 회사는 괜찮아&rdquo;<br />
            <span className="text-red-400">— 이 생각이 가장 위험합니다</span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {dangers.map(d => (
              <motion.div
                key={d.title}
                variants={fadeInUp}
                className={`border rounded-2xl p-6 flex flex-col items-center gap-3 ${dangerColorMap[d.color]}`}
              >
                <LottiePlayer src={d.lottie} width={100} height={100} />
                <h3 className="text-foreground font-bold text-base text-center">{d.title}</h3>
                <div className={`border rounded-xl px-4 py-2 text-xs text-center w-full ${dangerCaseBg[d.color]}`}>
                  📌 {d.case}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Checklist ── */}
      <section className="py-16 px-6 lg:px-12 border-y border-border" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-[1100px] mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-black text-foreground text-center mb-10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            무엇을 점검하나요?
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {checks.map(c => (
              <motion.div
                key={c.title}
                variants={fadeInUp}
                className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center gap-2.5 text-center hover:border-primary/40 transition-colors"
              >
                <LottiePlayer src={c.lottie} width={72} height={72} />
                <p className="text-primary text-xs font-bold">{c.sub}</p>
                <h3 className="text-foreground font-bold text-sm leading-snug">{c.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Middle CTA (신규) ── */}
      <section
        className="py-12 px-6 text-center"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(220,38,38,0.08) 0%, transparent 70%)' }}
      >
        <p className="text-red-400 text-xs font-bold tracking-[0.15em] uppercase mb-4">지금 바로 확인</p>
        <h2 className="text-3xl font-black text-foreground mb-6">내 사이트는 안전한가요?</h2>
        <a
          href="#cta-form"
          className="inline-block bg-primary text-primary-foreground text-base font-bold px-9 py-3.5 rounded-xl hover:opacity-85 transition-opacity"
        >
          무료 진단 신청하기 →
        </a>
      </section>

      {/* ── Process Stepper ── */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-black text-foreground text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            신청부터 완료까지
          </motion.h2>

          {/* Desktop stepper */}
          <motion.div
            className="hidden lg:flex items-start justify-between relative"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="absolute top-6 left-[calc(8.33%+20px)] right-[calc(8.33%+20px)] h-0.5 bg-white/8" />
            {steps.map(s => (
              <motion.div key={s.step} variants={fadeInUp} className="flex flex-col items-center text-center w-[15%] gap-2.5 relative">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-black text-sm flex items-center justify-center z-10 shadow-lg shadow-primary/30">
                  {s.step}
                </div>
                <h3 className="text-foreground font-bold text-sm leading-snug">{s.title}</h3>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile stepper */}
          <motion.div
            className="flex lg:hidden flex-col gap-0"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {steps.map((s, i) => (
              <motion.div key={s.step} variants={fadeInUp} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-black text-xs flex items-center justify-center shrink-0 z-10">
                    {s.step}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 h-8 bg-primary/20 my-1" />
                  )}
                </div>
                <div className="pt-2 pb-6">
                  <h3 className="text-foreground font-bold text-sm">{s.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Site Types ── */}
      <section className="py-16 px-6 lg:px-12 border-y border-border" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-[700px] mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-black text-foreground mb-10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            어떤 사이트에 가능한가요?
          </motion.h2>

          <motion.div
            className="grid grid-cols-3 gap-3.5"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {siteTypes.map(s => (
              <motion.div
                key={s.label}
                variants={fadeInUp}
                className={`bg-card border rounded-2xl py-4 px-3 flex flex-col items-center gap-1.5 ${
                  s.ok === true  ? 'border-green-500/30' :
                  s.ok === null  ? 'border-amber-500/30' :
                  'border-red-500/20 opacity-55'
                }`}
              >
                <span className="text-3xl">{s.emoji}</span>
                <span className="text-foreground font-bold text-sm">{s.label}</span>
                <span className={`text-xl font-bold ${s.ok === true ? 'text-green-400' : s.ok === null ? 'text-amber-400' : 'text-red-400'}`}>
                  {s.ok === true ? '✓' : s.ok === null ? '△' : '✗'}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA + Form ── */}
      <section id="cta-form" className="py-16 px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              variants={staggerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-black text-foreground mb-6 leading-snug">
                지금 바로 확인하세요.<br />
                <span className="text-primary">무료입니다.</span>
              </motion.h2>
              <motion.div variants={stagger} className="space-y-2.5 mb-7">
                {[
                  ['💰', '비용 없음'],
                  ['⏱️', '시간 없음'],
                  ['🧠', '지식 없음'],
                  ['😌', '부담 없음'],
                ].map(([e, t]) => (
                  <motion.div key={t} variants={fadeInUp} className="flex items-center gap-3.5 bg-card border border-border rounded-xl px-4 py-3.5">
                    <span className="text-2xl">{e}</span>
                    <span className="text-foreground font-bold text-sm">{t}</span>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeInUp} className="flex justify-center">
                <LottiePlayer src="/lottie/check.json" width={100} height={100} loop={false} />
              </motion.div>
            </motion.div>

            <div className="lg:sticky lg:top-24">
              <UrlAnalysisForm
                serviceType="security"
                title="무료 보안 진단 신청"
                notice="분석 완료 후 전문가 검토를 거쳐 이메일로 리포트를 발송합니다."
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
