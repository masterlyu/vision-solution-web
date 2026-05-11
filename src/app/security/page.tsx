'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView, type Variants } from 'framer-motion'
import UrlAnalysisForm from '@/components/UrlAnalysisForm'
import { CheckCircle, XCircle, AlertTriangle, CheckSquare, ChevronDown, ChevronUp } from 'lucide-react'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import { VisiMascot } from '@/components/visi/VisiMascot'

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
    icon: '💳',
    title: '고객 카드정보가 통째로 빠져나갑니다',
    case: '국내 쇼핑몰 2,300명 카드 유출 → 3개월 만에 폐업.',
    color: 'red',
  },
  {
    icon: '☠️',
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
  { lottie: '/lottie/lock.json',  sub: 'SSL/HTTPS',              title: '자물쇠가 잠겼나요?' },
  { icon: '🛡️',                  sub: '보안 헤더 6가지',          title: '해킹 차단막이 있나요?' },
  { icon: '🦠',                   sub: '악성코드 탐지',            title: '바이러스가 숨어 있나요?' },
  { icon: '🚫',                   sub: '구글·보안기관 블랙리스트', title: '검색에서 차단됐나요?' },
  { lottie: '/lottie/scan.json',  sub: 'CMS·서버 버전 노출',      title: '해커에게 힌트 주고 있나요?' },
  { icon: '🔑',                   sub: '관리자 접근 보안',         title: '뒷문이 열려 있나요?' },
  { lottie: '/lottie/alert.json', sub: 'SEO·신뢰도',              title: '구글이 경고하나요?' },
  { lottie: '/lottie/check.json', sub: '속도·성능',               title: '3초 안에 열리나요?' },
]

const steps = [
  { step: '01', title: 'URL 입력', pose: 'typing' as const },
  { step: '02', title: '자동 정밀 스캔', pose: 'magnify' as const },
  { step: '03', title: '전문가 검토', pose: 'thinking' as const },
  { step: '04', title: '알기 쉬운 결과 이메일', pose: 'writing' as const },
  { step: '05', title: '맞춤 견적 제안', pose: 'pointing' as const },
  { step: '06', title: '개선 + 재진단', pose: 'cheering' as const },
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
  { q: '결과 보고서에는 어떤 내용이 담기나요?', a: '① HTTPS/자물쇠 상태 ② 보안 헤더 6가지 점검 ③ 악성코드 탐지 (Sucuri 연동) ④ 구글·노턴 등 블랙리스트 등재 여부 ⑤ CMS·서버 버전 정보 노출 여부 ⑥ SEO 노출도 ⑦ Google PageSpeed 성능 점수 — 이 7가지 항목의 등급과 개선 방법이 PDF로 발송됩니다.' },
  { q: '결과를 받고 나서 어떻게 해야 하나요?', a: '항목별 우선순위와 직접 조치 방법이 함께 제공됩니다. 직접 수정이 어렵다면 개선 작업을 의뢰할 수 있으며, 별도 견적을 드립니다.' },
  { q: 'WordPress가 아닌 사이트도 진단되나요?', a: '네. WordPress, Cafe24, 자체 개발 사이트 등 플랫폼에 관계없이 URL 기반으로 분석합니다.' },
  { q: '이미 보안이 잘 되어 있는 사이트도 진단하면 의미가 있나요?', a: '네. 진단 결과 "이상 없음"이 나오면 그것 자체가 증거입니다. 결과서를 고객 신뢰 자료로 활용하는 분들도 있습니다.' },
  { q: '진단 후 영업 연락이 오나요?', a: '원하지 않으시면 연락드리지 않습니다. 이메일 주소를 입력하시면 결과서만 발송됩니다. 추가 연락 여부는 선택 사항입니다.' },
]

const securityPricing = [
  {
    name: '기본 보안 설정',
    price: '30만원~',
    highlight: false,
    badge: null,
    target: '보안이 전혀 안 된 소규모 홈페이지',
    reportNote: '무료 자동 진단 리포트로 확인 가능',
    reportType: 'auto' as const,
    checkItems: [
      'HTTPS/SSL 인증서 적용 여부',
      '보안 헤더 6가지 (HSTS·CSP·X-Frame-Options·X-Content-Type·Referrer·Permissions)',
      '관리자 페이지(/admin·/wp-admin) 노출 여부',
    ],
    fixItems: [
      'HTTPS 인증서 설치 + 자동 전환 설정',
      '보안 헤더 6종 서버 적용',
      '관리자 URL 변경 및 IP 접근 제한',
    ],
  },
  {
    name: '표준 취약점 개선',
    price: '80만원~',
    highlight: true,
    badge: '추천',
    target: '워드프레스·그누보드 등 CMS 운영 사이트',
    reportNote: '전문가 수동 분석 심층 리포트 제공',
    reportType: 'manual' as const,
    checkItems: [
      '기본 보안 설정 6가지 전체 포함',
      'CMS·플러그인 버전 취약점 스캔',
      '관리자 계정·권한 설정 점검',
      '디렉터리 노출·오류 메시지 정보 누출',
    ],
    fixItems: [
      '플러그인·CMS 최신 보안 버전 업데이트',
      '관리자 계정 분리 및 2단계 인증 설정',
      '불필요 디렉터리 접근 차단',
      '오류 페이지 민감정보 노출 차단',
    ],
  },
  {
    name: '심층 보안 강화',
    price: '200만원~',
    highlight: false,
    badge: '고급',
    target: '쇼핑몰·고객 개인정보 취급 사이트',
    reportNote: '전문가 수동 분석 + 코드 리뷰 리포트 제공',
    reportType: 'manual' as const,
    checkItems: [
      '표준 취약점 개선 전체 포함',
      '소스코드 보안 취약점 전수 분석',
      'SQL 인젝션·XSS·CSRF 취약점 점검',
      'API 엔드포인트 노출 및 인증 점검',
    ],
    fixItems: [
      '위험 코드 직접 패치 및 입력 검증 추가',
      'WAF(웹방화벽) 설치 및 규칙 최적화',
      '24시간 실시간 모니터링 설정',
      '분기별 재진단 1회 포함',
    ],
  },
]

// ── SecurityHeroIllust ─────────────────────────────────────────────────────
function SecurityHeroIllust() {
  return (
    <div className="flex items-end gap-2 justify-center">
      <svg viewBox="0 0 260 290" width="250" height="275" xmlns="http://www.w3.org/2000/svg">
        {/* Outer glow ring */}
        <circle cx="130" cy="135" r="115" fill="none" stroke="#8B5CF6" strokeWidth="1" opacity="0.12" strokeDasharray="6,6"/>
        {/* Shield body */}
        <path d="M130 25 L215 65 L215 152 C215 202 172 234 130 252 C88 234 45 202 45 152 L45 65 Z" fill="#16102a" stroke="#8B5CF6" strokeWidth="2.5"/>
        {/* Shield inner line */}
        <path d="M130 42 L202 78 L202 152 C202 196 164 224 130 239 C96 224 58 196 58 152 L58 78 Z" fill="none" stroke="#8B5CF6" strokeWidth="1" opacity="0.25"/>
        {/* Scan lines */}
        <line x1="48" y1="105" x2="212" y2="105" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4,5" opacity="0.28"/>
        <line x1="48" y1="165" x2="212" y2="165" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4,5" opacity="0.28"/>
        {/* Lock body */}
        <rect x="108" y="140" width="44" height="38" rx="8" fill="#8B5CF6"/>
        {/* Lock shackle */}
        <path d="M115 140 L115 123 A15 15 0 0 1 145 123 L145 140" fill="none" stroke="#8B5CF6" strokeWidth="7" strokeLinecap="round"/>
        <path d="M121 140 L121 126 A9 9 0 0 1 139 126 L139 140" fill="none" stroke="#16102a" strokeWidth="4" strokeLinecap="round"/>
        {/* Keyhole */}
        <circle cx="130" cy="156" r="6" fill="#16102a"/>
        <rect x="127" y="159" width="6" height="9" rx="2" fill="#16102a"/>
        {/* Warning badge top-right */}
        <circle cx="208" cy="58" r="22" fill="#ef4444" opacity="0.95"/>
        <text x="208" y="66" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="sans-serif">!</text>
        {/* Check badge bottom-left */}
        <circle cx="52" cy="215" r="22" fill="#22c55e" opacity="0.9"/>
        <text x="52" y="223" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="sans-serif">✓</text>
        {/* Amber dot */}
        <circle cx="192" cy="210" r="6" fill="#fbbf24" opacity="0.85"/>
        <circle cx="208" cy="226" r="4" fill="#fbbf24" opacity="0.5"/>
      </svg>
      <VisiMascot pose="magnify" size={92} />
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function SecurityPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-12 relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% -10%, color-mix(in oklch, var(--destructive) 18%, transparent) 0%, transparent 65%)',
        }}
      >
        <div className="max-w-[1100px] mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: text */}
            <motion.div
              className="flex flex-col gap-6"
              variants={staggerSlow}
              initial="hidden"
              animate="visible"
            >
              {/* 얼럿 배지 — SSR 무관하게 항상 visible (스모크 테스트 키워드) */}
              <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-1.5 rounded-full w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                지금 이 순간도 해킹 시도 중
              </motion.span>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight"
              >
                지금 내 사이트,<br />
                <span className="text-red-400">털리고 있지 않나요?</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-muted-foreground text-lg">
                국내 중소기업 73%가 지금 해킹에 노출되어 있습니다.
              </motion.p>

              <motion.div variants={fadeInUp}>
                <a
                  href="#cta-form"
                  className="inline-block bg-primary text-primary-foreground text-base font-bold px-9 py-3.5 rounded-xl hover:opacity-85 transition-opacity"
                >
                  무료로 내 사이트 확인하기 →
                </a>
              </motion.div>
            </motion.div>

            {/* Right: illustration */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex justify-center"
            >
              <SecurityHeroIllust />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 공감 체크리스트 (신규) ── */}
      <section className="py-16 px-6 lg:px-12 bg-secondary">
        <div className="max-w-[1100px] mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-black text-foreground text-center mb-10"
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
              <motion.div key={i} variants={fadeInUp} className="bg-card rounded-xl shadow-sm p-5 flex items-start gap-3">
                <span className="text-xl shrink-0">{item.emoji}</span>
                <span className="text-foreground font-medium text-sm">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="border-l-4 border-destructive bg-destructive/10 px-6 py-4 rounded-r-xl flex items-center justify-between gap-4 flex-wrap"
          >
            <p className="text-foreground font-semibold">하나라도 해당된다면, 지금 당장 무료 진단을 받으세요.</p>
            <a href="#cta-form" className="inline-flex items-center gap-2 bg-destructive text-destructive-foreground font-bold px-5 py-2.5 rounded-lg text-sm shrink-0">
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
                {'icon' in d
                  ? <div className="text-6xl h-[100px] flex items-center justify-center">{d.icon}</div>
                  : <LottiePlayer src={d.lottie} width={100} height={100} />}
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
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
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
                {'icon' in c
                  ? <div className="text-4xl h-[72px] flex items-center justify-center">{c.icon}</div>
                  : <LottiePlayer src={c.lottie} width={72} height={72} />}
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
        style={{ background: 'radial-gradient(ellipse at 50% 50%, color-mix(in oklch, var(--destructive) 8%, transparent) 0%, transparent 70%)' }}
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
                <div className="pt-1 pb-6 flex items-center gap-3">
                  <h3 className="text-foreground font-bold text-sm flex-1">{s.title}</h3>
                  <div className="shrink-0 hidden sm:block">
                    <VisiMascot pose={s.pose} size={52} />
                  </div>
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
      <section className="py-16 px-6 lg:px-12 bg-secondary">
        <div className="max-w-[800px] mx-auto">
          <motion.h2
            className="text-3xl font-black text-foreground text-center mb-10"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            보안 진단 FAQ
          </motion.h2>
          <div className="space-y-2">
            {securityFaqs.map((faq, i) => (
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

      {/* ── 가격 안내 ── */}
      <section className="py-16 px-6 lg:px-12 bg-background">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">취약점 발견 시 개선 비용은?</h2>
            <p className="text-muted-foreground mb-10">진단은 무료. 개선 작업은 범위에 따라 별도 견적입니다.</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {securityPricing.map((p, i) => (
              <motion.div key={i} variants={fadeInUp} className={`rounded-2xl border-2 relative flex flex-col ${p.highlight ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                {p.badge && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full ${p.highlight ? 'bg-primary text-primary-foreground' : 'bg-border text-foreground'}`}>
                    {p.badge}
                  </span>
                )}

                {/* 헤더 */}
                <div className="p-6 pb-4 border-b border-border/50">
                  <h3 className="text-lg font-bold text-foreground mb-1">{p.name}</h3>
                  <p className={`text-2xl font-black mb-3 ${p.highlight ? 'text-primary' : 'text-foreground'}`}>{p.price}</p>
                  <p className="text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-lg inline-block">
                    🎯 {p.target}
                  </p>
                </div>

                {/* 점검 항목 */}
                <div className="p-6 pb-3 flex-1">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">점검 항목</p>
                  <ul className="space-y-2 mb-5">
                    {p.checkItems.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="text-blue-400 font-bold shrink-0 mt-0.5">🔍</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">보완 내용</p>
                  <ul className="space-y-2 mb-5">
                    {p.fixItems.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="text-green-400 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 리포트 타입 안내 */}
                  <div className={`rounded-lg px-3 py-2 text-xs mb-4 ${p.reportType === 'auto' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'}`}>
                    {p.reportType === 'auto'
                      ? '📄 무료 자동 진단 → 즉시 이메일 발송'
                      : '📋 전문가 수동 분석 → 개별 리포트 발송'}
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 pb-6">
                  {p.reportType === 'auto' ? (
                    <a
                      href="#cta-form"
                      className={`block text-center text-sm font-bold py-3 rounded-xl transition-opacity ${p.highlight ? 'bg-primary text-primary-foreground hover:opacity-85' : 'bg-secondary border border-border text-foreground hover:border-primary/40'}`}
                    >
                      무료 진단 신청하기 →
                    </a>
                  ) : (
                    <a
                      href="/contact?service=security"
                      className={`block text-center text-sm font-bold py-3 rounded-xl transition-opacity ${p.highlight ? 'bg-primary text-primary-foreground hover:opacity-85' : 'bg-secondary border border-border text-foreground hover:border-primary/40'}`}
                    >
                      전문가 상담 신청하기 →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-muted-foreground text-sm text-center mt-6">※ 진단 결과서 기준으로 정확한 견적을 제공합니다. 부가세 별도.</p>
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

              {/* 무료 리포트 안내 */}
              <motion.div variants={fadeInUp} className="bg-card border border-primary/20 rounded-2xl p-5 mb-5">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">📄 무료 리포트에 담기는 내용</p>
                <ul className="space-y-2.5">
                  {[
                    ['🔒', 'HTTPS 자물쇠 상태', 'SSL 인증서 유효 여부 + 등급'],
                    ['🛡️', '보안 헤더 6가지 점검', '해킹·XSS·클릭재킹 차단 설정 확인'],
                    ['🦠', '악성코드 탐지', '전 세계 보안 DB(Sucuri) 연동 스캔'],
                    ['🚫', '구글·보안기관 블랙리스트', '검색 차단·경고 등재 여부 확인'],
                    ['🖥️', 'CMS·서버 버전 노출', '워드프레스 등 버전 정보 유출 점검'],
                    ['🔍', 'SEO 노출 평가', '구글 신뢰도·검색 노출 영향 분석'],
                    ['⚡', '페이지 속도 측정', 'Google PageSpeed 기준 성능 등급'],
                    ['💰', '자동 견적서 포함', '발견된 취약점 기준 예상 수정 비용'],
                  ].map(([icon, title, desc]) => (
                    <li key={title} className="flex items-start gap-2.5">
                      <span className="text-base shrink-0 mt-0.5">{icon}</span>
                      <div>
                        <span className="text-foreground font-semibold text-sm">{title}</span>
                        <span className="text-muted-foreground text-xs ml-2">— {desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                  ✅ URL 입력 후 <strong className="text-foreground">20~40초</strong> 내 자동 분석 완료 →
                  입력한 이메일로 <strong className="text-foreground">PDF 리포트 즉시 발송</strong>
                </div>
              </motion.div>

              {/* 표준/심층 안내 */}
              <motion.div variants={fadeInUp} className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3.5 mb-5">
                <p className="text-amber-400 text-xs font-bold mb-1">📋 표준 · 심층 플랜을 원하신다면?</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  표준·심층은 전문가가 직접 수동 분석해 개별 리포트를 발송합니다.
                  아래 버튼으로 상담을 신청하시면 연락드립니다.
                </p>
                <a href="/contact?service=security"
                  className="inline-block mt-2.5 text-xs font-bold text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg hover:bg-amber-500/10 transition-colors">
                  전문가 보안 상담 신청 →
                </a>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex justify-center">
                <VisiMascot pose="cheering" size={110} bubble="보안 걱정은 저한테 맡겨요!" bubbleDir="right" />
              </motion.div>
            </motion.div>

            <div className="lg:sticky lg:top-24">
              <UrlAnalysisForm
                serviceType="security"
                title="무료 보안 진단 신청"
                notice="URL 입력 후 20~40초 내 자동 분석 → 입력한 이메일로 PDF 리포트 즉시 발송"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
