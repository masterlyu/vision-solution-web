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
  // Semi-circle: left to right across bottom (180 degrees)
  const circumference = Math.PI * r  // half circle arc length
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
      {/* Track */}
      <path
        d={`M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        className="text-white/10"
        strokeLinecap="round"
      />
      {/* Fill */}
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
  { value: 73, suffix: '%', gaugePercent: 0.73, color: 'red', desc: '국내 중소기업 사이트가\n기본 보안조차 미설정' },
  { value: 43, suffix: '초', gaugePercent: 0.43, color: 'orange', desc: '해킹 공격 43초마다\n전 세계 발생' },
  { value: 3000, suffix: '만원', gaugePercent: 0.6, color: 'amber', desc: '개인정보 유출 시\n과태료 최대 금액' },
  { value: 95, suffix: '%', gaugePercent: 0.95, color: 'red', desc: '구글 위험 경고 뜨면\n방문자 이탈 비율' },
]

const dangers = [
  {
    lottie: '/lottie/hacker.json',
    emoji: '💳',
    title: '고객 카드정보가 통째로 빠져나갑니다',
    desc: '결제할 때 입력한 카드번호와 비밀번호가 해커에게 그대로 전송됩니다.',
    case: '국내 쇼핑몰 2,300명 카드 유출 → 3개월 만에 폐업.',
    color: 'red',
  },
  {
    lottie: '/lottie/warning.json',
    emoji: '💀',
    title: '내 사이트가 범죄 도구로 쓰입니다',
    desc: '모르는 사이에 내 사이트가 다른 사람을 공격하는 범죄 도구가 됩니다.',
    case: '소규모 병원 홈페이지 악성코드 유포지로 악용 → 구글 완전 차단.',
    color: 'orange',
  },
  {
    lottie: '/lottie/alert.json',
    emoji: '📋',
    title: '고객 DB가 경쟁사 손에 들어갑니다',
    desc: '회원 정보와 상담 내역이 유출되면 과태료 최대 3,000만원입니다.',
    case: '인테리어 업체 견적 DB 전체 유출 → 경쟁사에 넘어감.',
    color: 'amber',
  },
  {
    lottie: '/lottie/scan.json',
    emoji: '🔍',
    title: '구글에서 영원히 사라집니다',
    desc: '악성코드 발견 즉시 구글 검색에서 삭제, 복구까지 수개월 걸립니다.',
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
  { emoji: '🔒', title: '자물쇠가 제대로 잠겼나요?', sub: 'SSL/HTTPS', simple: '주소창 자물쇠가 없으면 고객 정보가 암호화 없이 전송됩니다.', warn: 'HTTPS 없으면 공공 와이파이에서 누구나 데이터를 훔쳐볼 수 있습니다.' },
  { emoji: '🪟', title: '창문이 열려 있지는 않나요?', sub: '보안 헤더 6가지', simple: '보안 헤더는 해커가 침입할 수 있는 창문·뒷문을 모두 잠그는 역할입니다.', warn: '보안 헤더 1개 미설정 = 해킹 성공률 40% 상승.' },
  { emoji: '🕵️', title: '해커가 내 사이트를 정찰 중입니다', sub: '정보 노출 점검', simple: '프로그램 버전이 노출되면 그 약점을 노린 맞춤 공격을 받습니다.', warn: '워드프레스 버전 노출 → 해킹봇 자동 공격 즉시 시작.' },
  { emoji: '🚪', title: '뒷문이 열려 있지는 않나요?', sub: '관리자 접근 보안', simple: '관리자 페이지가 무방비 상태면 하루 수만 번 비밀번호 무작위 대입 공격을 받습니다.', warn: '관리자 무방비 = 하루 수만 번 공격 → 계정 탈취.' },
  { emoji: '🚨', title: '구글이 위험하다고 경고하나요?', sub: 'SEO·신뢰도', simple: '보안 문제가 있으면 구글이 \'위험한 사이트\' 경고를 띄워 고객이 도망갑니다.', warn: '구글 위험 경고 = 방문자 95% 즉시 이탈.' },
  { emoji: '🐌', title: '3초 안에 안 열리면 고객이 떠납니다', sub: '속도·성능', simple: '로딩 3초 초과 시 방문자 53%가 이탈하고 구글 검색 순위도 하락합니다.', warn: '로딩 1초 지연 = 구매 전환율 7% 하락 (아마존 실측).' },
]

const steps = [
  { step: '01', title: 'URL 입력 (30초)', desc: 'URL 입력만. 회원가입 없음, IT 지식 불필요.' },
  { step: '02', title: '자동 정밀 분석', desc: '전문가 도구로 사이트 전체 자동 스캔.' },
  { step: '03', title: '전문가 직접 검토', desc: '전문가가 결과 확인, 오탐 제거 후 리포트 완성.' },
  { step: '04', title: '쉬운 언어 리포트 발송', desc: 'IT 몰라도 이해하는 리포트 — 사례 + 해결책 포함.' },
  { step: '05', title: '맞춤 견적 제안', desc: '발견된 문제만 기준으로 꼭 필요한 항목만 견적.' },
  { step: '06', title: '개선 완료 + 재진단', desc: '개선 완료 후 재진단으로 효과 검증까지.' },
]

const siteTypes = [
  { emoji: '🌐', label: '워드프레스', ok: true,  note: '가장 빠르고 효과적' },
  { emoji: '🏠', label: '일반 홈페이지', ok: true,  note: 'HTML/PHP/ASP 모두 가능' },
  { emoji: '🛒', label: '쇼핑몰 (자사몰)', ok: true,  note: '결제 보안 집중 점검' },
  { emoji: '🖥️', label: '커스텀 서버', ok: true,  note: 'SSH 접근 시 가능' },
  { emoji: '🏪', label: '카페24 / 아임웹', ok: null, note: '진단 가능, 일부 개선 제한' },
  { emoji: '🏬', label: '네이버 스마트스토어', ok: false, note: '플랫폼 정책상 개선 불가' },
]

// ── Page ───────────────────────────────────────────────────────────────────
export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 text-center relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, color-mix(in oklch, var(--destructive) 15%, transparent) 0%, transparent 70%)',
        }}
      >
        <motion.div
          className="max-w-4xl mx-auto flex flex-col items-center gap-6"
          variants={staggerSlow}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-2 rounded-full animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              지금 이 순간도 해킹 시도 중
            </span>
          </motion.div>

          <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-tight">
            지금 이 순간,<br />
            <span className="text-red-400">내 사이트 털리고<br />있지 않나요?</span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed">
            국내 중소기업 73%가 기본 보안조차 없습니다.<br />URL 1개, 10분이면 확인됩니다.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 justify-center">
            {['✓ 완전 무료', '✓ IT 지식 불필요', '✓ 사이트 영향 없음', '✓ 쉬운 리포트'].map(t => (
              <span key={t} className="bg-primary/10 border border-primary/20 text-primary text-sm px-4 py-2 rounded-full">
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <LottiePlayer src="/lottie/shield.json" width={280} height={280} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 px-6 lg:px-12 bg-primary/5 border-y border-primary/10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {stats.map(s => (
              <motion.div key={s.desc} variants={fadeInUp} className="flex flex-col items-center gap-3">
                <RadialGauge percent={s.gaugePercent} color={s.color} size={80} />
                <div className="text-5xl md:text-6xl font-black text-primary tabular-nums">
                  <CountUpNumber value={s.value} suffix={s.suffix} duration={1.5} />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed text-center whitespace-pre-line">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Danger Cases ── */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="text-red-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">실제 피해 사례</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              &ldquo;우리 같은 작은 회사는 해킹 안 당해&rdquo;<br />
              <span className="text-red-400">— 이 생각이 가장 위험합니다</span>
            </h2>
            <p className="text-muted-foreground">오히려 작은 회사가 더 쉬운 표적입니다.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {dangers.map(d => (
              <motion.div
                key={d.title}
                variants={fadeInUp}
                className={`border rounded-2xl p-6 flex flex-col gap-4 hover:scale-[1.01] transition-transform ${dangerColorMap[d.color]}`}
              >
                <div className="flex flex-col items-center gap-3">
                  <LottiePlayer src={d.lottie} width={120} height={120} />
                  <div className="text-3xl">{d.emoji}</div>
                  <h3 className="text-foreground font-bold text-lg text-center">{d.title}</h3>
                  <p className="text-muted-foreground text-sm text-center leading-relaxed">{d.desc}</p>
                </div>
                <div className={`border rounded-xl px-4 py-2.5 text-xs font-medium text-center ${dangerCaseBg[d.color]}`}>
                  📌 {d.case}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Checklist ── */}
      <section className="py-16 px-6 lg:px-12 bg-card/40 border-y border-border">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">진단 항목</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">무엇을 어떻게 점검하나요?</h2>
            <p className="text-muted-foreground text-lg">전문 용어 없이 설명합니다.</p>
          </motion.div>

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
                className="bg-background border border-border rounded-2xl p-5 hover:border-primary/40 transition-colors flex flex-col gap-3"
              >
                <span className="text-5xl">{c.emoji}</span>
                <div>
                  <p className="text-primary text-xs font-bold mb-1">{c.sub}</p>
                  <h3 className="text-foreground font-bold text-sm leading-snug">{c.title}</h3>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed flex-1">{c.simple}</p>
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-3 py-2">
                  <p className="text-amber-400 text-xs">⚠ {c.warn}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Process Stepper ── */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">진행 과정</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground">
              신청부터 완료까지<br />이렇게 진행됩니다
            </h2>
          </motion.div>

          {/* Desktop stepper */}
          <motion.div
            className="hidden lg:flex items-start justify-between relative"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Connector line */}
            <div className="absolute top-6 left-[calc(8.33%+24px)] right-[calc(8.33%+24px)] h-0.5 bg-primary/20" />

            {steps.map((s, i) => (
              <motion.div key={s.step} variants={fadeInUp} className="flex flex-col items-center text-center w-[15%] gap-3 relative">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-black text-sm flex items-center justify-center z-10 shadow-lg shadow-primary/20">
                  {s.step}
                </div>
                <h3 className="text-foreground font-bold text-sm leading-snug">{s.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
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
                  <h3 className="text-foreground font-bold text-sm mb-1">{s.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Site Types ── */}
      <section className="py-16 px-6 lg:px-12 bg-card/40 border-y border-border">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            className="mb-12 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">적용 범위</p>
            <h2 className="text-3xl font-black text-foreground mb-4">어떤 사이트에 적용 가능한가요?</h2>
            <p className="text-muted-foreground">진단은 모든 사이트 가능합니다. 개선은 아래 기준을 확인하세요.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {siteTypes.map(s => (
              <motion.div
                key={s.label}
                variants={fadeInUp}
                className={`bg-background border rounded-2xl p-5 text-center ${
                  s.ok === true  ? 'border-green-500/30' :
                  s.ok === null  ? 'border-amber-500/30' :
                  'border-red-500/20 opacity-60'
                }`}
              >
                <div className="text-3xl mb-2">{s.emoji}</div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {s.ok === true  && <CheckCircle className="w-4 h-4 text-green-400" />}
                  {s.ok === null  && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                  {s.ok === false && <XCircle className="w-4 h-4 text-red-400" />}
                  <span className="text-foreground font-bold text-sm">{s.label}</span>
                </div>
                <p className={`text-xs ${s.ok === true ? 'text-green-400' : s.ok === null ? 'text-amber-400' : 'text-red-400'}`}>
                  {s.note}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA + Form ── */}
      <section className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              variants={staggerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.p variants={fadeInUp} className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">무료 보안 진단</motion.p>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-black text-foreground mb-6">
                지금 바로 확인하세요.<br />
                <span className="text-primary">무료입니다.</span>
              </motion.h2>
              <motion.div variants={stagger} className="space-y-3 mb-8">
                {[
                  ['💰', '비용 없음', '진단 자체는 완전 무료'],
                  ['⏱️', '시간 없음', 'URL 하나 입력이 전부'],
                  ['🧠', '지식 없음', 'IT 몰라도 리포트 이해 가능'],
                  ['😌', '부담 없음', '진단 후 개선은 선택사항'],
                ].map(([e, t, d]) => (
                  <motion.div key={t} variants={fadeInUp} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
                    <span className="text-2xl">{e}</span>
                    <div>
                      <p className="text-foreground font-bold text-sm">{t}</p>
                      <p className="text-muted-foreground text-xs">{d}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div variants={fadeInUp} className="flex justify-center">
                <LottiePlayer src="/lottie/check.json" width={120} height={120} loop={false} />
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
