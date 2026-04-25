'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView, type Variants } from 'framer-motion'
import UrlAnalysisForm from '@/components/UrlAnalysisForm'
import { CheckCircle, XCircle, AlertTriangle, CheckSquare, ChevronDown, ChevronUp } from 'lucide-react'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

// ── Lottie Player ──────────────────────────────────────────────────────────
function LottiePlayer({ src, width = 200, height = 200, loop = true, className = '' }: {
  src: string; width?: number; height?: number; loop?: boolean; className?: string
}) {
  const [data, setData] = useState<object | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetch(src).then(r => r.json()).then(setData).catch(() => {})
  }, [src])

  if (!mounted) return <div style={{ width, height }} />
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
  { lottie: '/lottie/shield.json',  sub: '기본 보안 설정 6가지',  title: '창문이 열려 있나요?' },
  { lottie: '/lottie/scan.json',    sub: '정보 노출 점검',   title: '해커가 정찰 중인가요?' },
  { lottie: '/lottie/hacker.json',  sub: '관리자 접근 보안', title: '뒷문이 열려 있나요?' },
  { lottie: '/lottie/alert.json',   sub: 'SEO·신뢰도',      title: '구글이 경고하나요?' },
  { lottie: '/lottie/check.json',   sub: '속도·성능',        title: '3초 안에 열리나요?' },
]

const steps = [
  { step: '01', title: 'URL 입력' },
  { step: '02', title: '자동 정밀 스캔' },
  { step: '03', title: '전문가 검토' },
  { step: '04', title: '알기 쉬운 결과 이메일' },
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

// ── Security-specific data ─────────────────────────────────────────────────
const empathyItems = [
  { emoji: '🔒', text: '주소창에 자물쇠(🔒) 표시가 없다' },
  { emoji: '⏰', text: '마지막으로 보안 점검을 한 게 언제인지 모른다' },
  { emoji: '📞', text: '홈페이지를 만든 업체와 연락이 끊겼다' },
  { emoji: '❓', text: '고객이 "이 사이트 안전한가요?"라고 물어본 적 있다' },
  { emoji: '🔑', text: '비밀번호를 한 번도 바꾼 적 없는 관리자 계정이 있다' },
  { emoji: '🔌', text: '워드프레스나 플러그인 업데이트를 오래 안 했다' },
  { emoji: '🚨', text: '어느 날 갑자기 사이트가 이상한 페이지로 바뀐 적 있다' },
]

const securityFaqs = [
  { q: '진단이 진짜 무료인가요? 나중에 비용이 청구되지 않나요?', a: '보안 진단 결과서는 완전 무료입니다. 결과를 받은 후 취약점 개선 작업을 의뢰하실지는 전적으로 선택이며, 강요하지 않습니다.' },
  { q: 'URL만 입력하면 되나요? 관리자 계정이나 서버 접근이 필요한가요?', a: '밖에서 볼 수 있는 공개된 보안 요소만 분석합니다. 관리자 계정, 비밀번호, 서버 접근 정보는 전혀 필요하지 않습니다.' },
  { q: '진단 중에 사이트가 느려지거나 오류가 생기지 않나요?', a: '사이트 운영에 전혀 영향을 주지 않는 방식으로 분석합니다. 방문자도 아무것도 느끼지 못합니다.' },
  { q: '결과 보고서에는 어떤 내용이 담기나요?', a: '① 자물쇠(HTTPS) 상태 ② 기본 해킹 차단 설정 6가지 ③ 개인정보 노출 여부 ④ 관리자 접근 보안 ⑤ 구글 신뢰도 영향 ⑥ 페이지 속도 — 이 6가지 항목에 대한 등급과 개선 방법이 포함됩니다.' },
  { q: '결과를 받고 나서 어떻게 해야 하나요?', a: '항목별 우선순위와 직접 조치 방법이 함께 제공됩니다. 직접 수정이 어렵다면 개선 작업을 의뢰할 수 있으며, 별도 견적을 드립니다.' },
  { q: 'WordPress가 아닌 사이트도 진단되나요?', a: '네. WordPress, Cafe24, 자체 개발 사이트 등 플랫폼에 관계없이 URL 기반으로 분석합니다.' },
  { q: '이미 보안이 잘 되어 있는 사이트도 진단하면 의미가 있나요?', a: '네. 진단 결과 "이상 없음"이 나오면 그것 자체가 증거입니다. 결과서를 고객 신뢰 자료로 활용하는 분들도 있습니다.' },
  { q: '진단 후 영업 연락이 오나요?', a: '원하지 않으시면 연락드리지 않습니다. 이메일 주소를 입력하시면 결과서만 발송됩니다. 추가 연락 여부는 선택 사항입니다.' },
]

const securityPricing = [
  { name: '기본 보안 설정', price: '30만원~', items: ['자물쇠(HTTPS) 적용', '기본 해킹 차단 설정 6가지', '관리자 주소 변경'], highlight: false },
  { name: '표준 취약점 개선', price: '80만원~', items: ['기본 설정 전체 포함', '플러그인 업데이트', '권한·계정 설정 강화'], highlight: true },
  { name: '심층 보안 강화', price: '200만원~', items: ['전체 코드 취약점 스캔', 'WAF 설치', '24시간 모니터링 설정'], highlight: false },
]

// ── Page ───────────────────────────────────────────────────────────────────
export default function SecurityPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 text-center relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% -10%, color-mix(in oklch, var(--destructive) 18%, transparent) 0%, transparent 65%)',
        }}
      >
        {/* 얼럿 배지 — SSR 무관하게 항상 visible (스모크 테스트 키워드) */}
        <span className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
          지금 이 순간도 해킹 시도 중
        </span>

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

      {/* ── 공감 체크리스트 (신규) ── */}
      <section className="py-16 px-6 lg:px-12 bg-[#F8F9FA]">
        <div className="max-w-[1100px] mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            혹시 이런 상황이세요?
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {empathyItems.map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white rounded-xl shadow-sm p-5 flex items-start gap-3">
                <span className="text-xl shrink-0">{item.emoji}</span>
                <span className="text-gray-800 font-medium text-sm">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="border-l-4 border-destructive bg-red-50 px-6 py-4 rounded-r-xl flex items-center justify-between gap-4 flex-wrap"
          >
            <p className="text-gray-800 font-semibold">하나라도 해당된다면, 지금 당장 무료 진단을 받으세요.</p>
            <a href="#cta-form" className="inline-flex items-center gap-2 bg-destructive text-white font-bold px-5 py-2.5 rounded-lg text-sm shrink-0">
              지금 무료 보안 진단 받기 →
            </a>
          </motion.div>
        </div>
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

      {/* ── FAQ (신규) ── */}
      <section className="py-16 px-6 lg:px-12 bg-[#F8F9FA]">
        <div className="max-w-[800px] mx-auto">
          <motion.h2
            className="text-3xl font-black text-gray-900 text-center mb-10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            보안 진단 FAQ
          </motion.h2>
          <div className="space-y-2">
            {securityFaqs.map((faq, i) => (
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

      {/* ── 가격 안내 (신규) ── */}
      <section className="py-16 px-6 lg:px-12 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">취약점 발견 시 개선 비용은?</h2>
            <p className="text-gray-500 mb-10">진단은 무료. 개선 작업은 범위에 따라 별도 견적입니다.</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {securityPricing.map((p, i) => (
              <motion.div key={i} variants={fadeInUp} className={`rounded-2xl p-8 border-2 relative ${p.highlight ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                {p.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">추천</span>}
                <h3 className="text-lg font-bold text-gray-900 mb-1">{p.name}</h3>
                <p className={`text-2xl font-black mb-6 ${p.highlight ? 'text-primary' : 'text-gray-700'}`}>{p.price}</p>
                <ul className="space-y-2">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-primary font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-gray-500 text-sm text-center mt-6">진단 결과서 기준으로 정확한 견적을 제공합니다.</p>
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
                notice="분석 완료 후 전문가 검토를 거쳐 이메일로 결과서를 발송합니다."
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
