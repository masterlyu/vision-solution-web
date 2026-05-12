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
  { lottie: '/lottie/lock.json',  sub: 'SSL/TLS A+~F 등급',       title: '암호화가 안전한가요?' },
  { icon: '🛡️',                  sub: '보안 헤더 13종',            title: '해킹 차단막이 있나요?' },
  { icon: '🍪',                   sub: '쿠키 보안 플래그',          title: '세션이 보호되나요?' },
  { icon: '🌐',                   sub: 'CORS 설정 오류',            title: '데이터가 새고 있나요?' },
  { icon: '📧',                   sub: '이메일 보안 DNS',           title: '피싱 메일 차단됐나요?' },
  { icon: '📁',                   sub: '민감 파일 30경로',          title: '소스코드가 노출됐나요?' },
  { icon: '🦠',                   sub: '악성코드 탐지',             title: '바이러스가 숨어 있나요?' },
  { icon: '🚫',                   sub: '구글·보안기관 블랙리스트',  title: '검색에서 차단됐나요?' },
  { lottie: '/lottie/scan.json',  sub: 'CMS·서버 버전 노출',       title: '해커에게 힌트 주고 있나요?' },
  { icon: '🔑',                   sub: '관리자 접근 보안',          title: '뒷문이 열려 있나요?' },
  { lottie: '/lottie/alert.json', sub: 'SEO·신뢰도',               title: '구글이 경고하나요?' },
  { lottie: '/lottie/check.json', sub: '속도·성능',                title: '3초 안에 열리나요?' },
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
  { q: '결과 보고서에는 어떤 내용이 담기나요?', a: '① HTTPS·SSL Labs 등급 ② 보안 헤더 13종 점검 (HSTS·CSP·XFO 등) ③ 쿠키 보안 플래그 (HttpOnly·Secure·SameSite) ④ CORS 설정 오류 탐지 ⑤ 이메일 보안 레코드 (SPF·DMARC) ⑥ 민감 파일 30경로 노출 점검 (.env·.git·DB 백업 등) ⑦ 악성코드·블랙리스트 탐지 (Sucuri 연동) ⑧ CMS·서버 버전 정보 노출 ⑨ SEO 노출도 ⑩ Google PageSpeed 성능 점수 — 10가지 항목의 등급·취약 원인·개선 방법이 PDF로 발송됩니다.' },
  { q: '결과를 받고 나서 어떻게 해야 하나요?', a: '항목별 우선순위와 직접 조치 방법이 함께 제공됩니다. 직접 수정이 어렵다면 개선 작업을 의뢰할 수 있으며, 별도 견적을 드립니다.' },
  { q: 'WordPress가 아닌 사이트도 진단되나요?', a: '네. WordPress, Cafe24, 자체 개발 사이트 등 플랫폼에 관계없이 URL 기반으로 분석합니다.' },
  { q: '이미 보안이 잘 되어 있는 사이트도 진단하면 의미가 있나요?', a: '네. 진단 결과 "이상 없음"이 나오면 그것 자체가 증거입니다. 결과서를 고객 신뢰 자료로 활용하는 분들도 있습니다.' },
  { q: '진단 후 영업 연락이 오나요?', a: '원하지 않으시면 연락드리지 않습니다. 이메일 주소를 입력하시면 결과서만 발송됩니다. 추가 연락 여부는 선택 사항입니다.' },
]

const securityPricing = [
  {
    nameShort: 'A 기본',
    name: '패키지 A — 보안 위생 패치',
    price: '₩299,000',
    highlight: false,
    badge: null as null,
    target: '기본 보안 설정이 안 된 소규모 홈페이지',
    reportType: 'auto' as const,
    coreItems: [
      '자물쇠·HTTPS 보안 등급 강화 (SSL/TLS)',
      '보안 헤더 13종 일괄 설정 (HSTS·CSP·XFO 등)',
      '쿠키·세션 보안 속성 추가 (HttpOnly·SameSite)',
      '관리자 페이지 URL 변경 및 접근 제한',
    ],
    checkItems: [
      'HTTPS·SSL/TLS A등급 설정',
      '보안 헤더 13종 일괄 적용 (HSTS·CSP·XFO 등)',
      '쿠키 보안 플래그 (HttpOnly·Secure·SameSite)',
      'X-Powered-By·Server 헤더 노출 제거',
      '관리자 페이지 URL 변경 및 접근 제한',
    ],
    fixItems: [
      'HTTPS 인증서 설치 + 강제 전환',
      '보안 헤더 13종 서버 일괄 적용',
      '쿠키 보안 속성 전체 추가',
      '서버 정보 은닉 설정',
    ],
  },
  {
    nameShort: 'B 표준',
    name: '패키지 B — 표준 보안 강화',
    price: '₩799,000',
    highlight: true,
    badge: '추천' as const,
    target: 'CMS·회원가입·로그인 기능이 있는 사이트',
    reportType: 'manual' as const,
    coreItems: [
      '패키지 A 전체 포함',
      '해킹 공격 차단 코드 수정 (XSS·SQLi·CSRF)',
      '이메일 위조 방어 레코드 설정 (SPF·DKIM·DMARC)',
      '민감 파일 30개 경로 접근 차단',
    ],
    checkItems: [
      '패키지 A 전체 포함',
      '이메일 위조 방어 레코드 점검 (SPF·DKIM·DMARC)',
      '민감 파일 30개 경로 노출 차단',
      '외부 데이터 유출 차단 점검 (CORS)',
      '해킹 공격 입력값 필터링 점검 (XSS·SQL Injection)',
      '위조 요청 방어 점검 (CSRF)',
    ],
    fixItems: [
      '도메인 이메일 보안 레코드 설정',
      '민감 파일·소스코드 접근 차단',
      '외부 도메인 허용 목록 정책 적용 (CORS)',
      '입력값 이스케이프·Prepared Statement 적용',
      '상태 변경 폼 위조 방어 토큰 추가 (CSRF)',
    ],
  },
  {
    nameShort: 'C 고급',
    name: '패키지 C — 심층 진단 + 수정',
    price: '₩1,990,000',
    highlight: false,
    badge: '고급' as const,
    target: '쇼핑몰·개인정보·핀테크 운영 사이트',
    reportType: 'manual' as const,
    coreItems: [
      '패키지 B 전체 포함',
      '방화벽 + 무제한 공격 차단 시스템 (WAF·Rate Limit)',
      '모의해킹 전수 점검 33개 항목',
      '전문가 코드 리뷰 + 재진단 1회 무료',
    ],
    checkItems: [
      '패키지 B 전체 포함',
      '방화벽 + 무제한 공격 차단 탐지 (WAF·Rate Limiting)',
      '서브도메인 탈취·에러 정보 노출·Mixed Content 점검',
      'CMS 보안 취약점 점검 (WordPress·Joomla·Drupal 등)',
      '요청 조작·캐시 오염 탐지 (HTTP 스머글링·캐시 포이즈닝)',
      '로그인 토큰 위조 방어 점검 (JWT)',
      '서버 코드 해킹 탐지 (SSTI 템플릿 인젝션)',
      '투명 클릭 도용 방어 (Clickjacking)',
    ],
    fixItems: [
      '로그인·API 무제한 요청 차단 설정 (Rate Limit + WAF)',
      '요청 조작·캐시 오염 방어 설정',
      '로그인 토큰 알고리즘·만료 시간 강화 (JWT)',
      '서버 코드 인젝션·정보 노출·Mixed Content 패치',
      'CMS 최신 버전 업데이트 + 재진단 1회 포함',
    ],
  },
  {
    nameShort: 'D 구독',
    name: '패키지 D — 정기 모니터링',
    price: '₩299,000/월',
    highlight: false,
    badge: '월정액' as const,
    target: '상시 보안 관리가 필요한 운영 사이트',
    reportType: 'manual' as const,
    coreItems: [
      '월 1회 13개 항목 자동 전체 스캔',
      '새 취약점 발견 즉시 알림 (텔레그램)',
      '월간 보안 현황 리포트 발송',
      '긴급 이슈 48시간 내 패치 지원',
    ],
    checkItems: [
      '월 1회 13개 항목 전체 자동 스캔',
      '새 취약점 발견 즉시 알림 (텔레그램)',
      '전월 대비 보안 점수 변화 추적',
      '월간 보안 현황 리포트 발송',
    ],
    fixItems: [
      '긴급 이슈 48시간 내 패치 지원',
      '신규 취약점 발견 시 즉시 대응',
      '연간 계약 시 1개월 무료',
      '전담 보안 담당자 배정',
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
  const [selectedPkg, setSelectedPkg] = useState(1)
  const [showMore, setShowMore] = useState(false)

  const handlePkgChange = (i: number) => {
    setSelectedPkg(i)
    setShowMore(false)
  }

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
        <div className="max-w-[720px] mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">취약점 발견 시 개선 비용은?</h2>
            <p className="text-muted-foreground mb-8">진단은 무료. 개선 작업은 범위에 따라 별도 견적입니다.</p>
          </motion.div>

          {/* 탭 바 */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex gap-1.5 mb-5 p-1 bg-secondary rounded-xl"
          >
            {securityPricing.map((p, i) => (
              <button
                key={i}
                onClick={() => handlePkgChange(i)}
                className={`relative flex-1 py-2 px-2 rounded-lg text-xs sm:text-sm font-bold transition-all
                  ${selectedPkg === i
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                {p.nameShort}
                {p.badge && (
                  <span className={`absolute -top-1.5 -right-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none
                    ${p.highlight ? 'bg-primary text-primary-foreground' : 'bg-border text-foreground/70'}`}>
                    {p.badge}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* 선택된 패키지 카드 */}
          {securityPricing.map((p, i) =>
            selectedPkg !== i ? null : (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className={`rounded-2xl border-2 flex flex-col ${p.highlight ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}
              >
                {/* 헤더 */}
                <div className="p-6 pb-5 border-b border-border/50">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{p.name}</h3>
                      <p className={`text-3xl font-black ${p.highlight ? 'text-primary' : 'text-foreground'}`}>{p.price}</p>
                    </div>
                    <p className="text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-lg self-start mt-0.5">
                      🎯 {p.target}
                    </p>
                  </div>
                </div>

                {/* 핵심 항목 (항상 표시) */}
                <div className="p-6 pb-4">
                  <ul className="space-y-3 mb-4">
                    {p.coreItems.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5
                          ${p.highlight ? 'bg-primary/20 text-primary' : 'bg-green-500/15 text-green-400'}`}>
                          ✓
                        </span>
                        <span className="text-foreground/90 text-sm leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* 더보기 토글 버튼 */}
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mb-5"
                  >
                    {showMore
                      ? <><ChevronUp className="w-3.5 h-3.5" />접기</>
                      : <><ChevronDown className="w-3.5 h-3.5" />전체 항목 {p.checkItems.length + p.fixItems.length}개 보기</>
                    }
                  </button>

                  {/* 더보기 내용 */}
                  {showMore && (
                    <div className="border-t border-border/50 pt-4 mb-5 space-y-5">
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">점검 항목</p>
                        <ul className="space-y-1.5">
                          {p.checkItems.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-foreground/70">
                              <span className="text-blue-400 shrink-0 mt-0.5 text-xs">🔍</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">수정 내용</p>
                        <ul className="space-y-1.5">
                          {p.fixItems.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-foreground/70">
                              <span className="text-green-400 shrink-0 mt-0.5 text-xs">🔧</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* 리포트 타입 */}
                  <div className={`rounded-lg px-3 py-2 text-xs mb-5
                    ${p.reportType === 'auto'
                      ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                      : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'}`}>
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
                      className={`block text-center text-sm font-bold py-3 rounded-xl transition-opacity
                        ${p.highlight ? 'bg-primary text-primary-foreground hover:opacity-85' : 'bg-secondary border border-border text-foreground hover:border-primary/40'}`}
                    >
                      무료 진단 신청하기 →
                    </a>
                  ) : (
                    <a
                      href="/contact?service=security"
                      className={`block text-center text-sm font-bold py-3 rounded-xl transition-opacity
                        ${p.highlight ? 'bg-primary text-primary-foreground hover:opacity-85' : 'bg-secondary border border-border text-foreground hover:border-primary/40'}`}
                    >
                      전문가 상담 신청하기 →
                    </a>
                  )}
                </div>
              </motion.div>
            )
          )}

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
                    ['🔒', 'SSL/TLS 등급 (A+~F)', 'SSL Labs 기준 상세 등급 · 취약 프로토콜 탐지'],
                    ['🛡️', '보안 헤더 13종 점검', 'HSTS·CSP·XFO·쿠키플래그 등 전체 확인'],
                    ['🍪', '쿠키 보안 플래그', 'HttpOnly·Secure·SameSite 설정 여부'],
                    ['🌐', 'CORS 설정 오류', '임의 도메인 접근 허용 여부 자동 탐지'],
                    ['📧', '이메일 보안 (SPF·DKIM·DMARC)', '피싱·도메인 위조 방어 레코드 점검'],
                    ['📁', '민감 파일 30개 경로 노출', '.env·.git·백업·설정파일 노출 점검'],
                    ['🦠', '악성코드·블랙리스트 탐지', '전 세계 보안 DB(Sucuri) 연동 스캔'],
                    ['🖥️', 'CMS·서버 버전 노출', '워드프레스·서버 기술 스택 정보 유출'],
                    ['🔍', 'SEO·페이지 속도', '구글 신뢰도·PageSpeed 성능 등급'],
                    ['💰', '자동 견적서 포함', '발견된 취약점 기준 패키지별 예상 비용'],
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
                  ✅ URL 입력 후 <strong className="text-foreground">40초~2분</strong> 내 자동 분석 완료 →
                  입력한 이메일로 <strong className="text-foreground">PDF 리포트 + 자동 견적서 즉시 발송</strong>
                </div>
              </motion.div>

              {/* 패키지 안내 */}
              <motion.div variants={fadeInUp} className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3.5 mb-5">
                <p className="text-amber-400 text-xs font-bold mb-2">💼 수정까지 원하신다면? 4가지 패키지</p>
                <div className="space-y-1.5 mb-3">
                  {[
                    ['A', '보안 위생 패치',    '₩299,000',   '헤더·SSL·쿠키 설정 수정'],
                    ['B', '표준 보안 강화',    '₩799,000',   'A + XSS·SQLi·CORS 코드 패치'],
                    ['C', '심층 진단 + 수정',  '₩1,990,000', 'B + WAF·Rate Limit + 코드 리뷰'],
                    ['D', '정기 모니터링',     '₩299,000/월','월 1회 자동 스캔 + 즉시 알림'],
                  ].map(([pkg, name, price, desc]) => (
                    <div key={pkg} className="flex items-center gap-2 text-xs">
                      <span className="w-5 h-5 rounded bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[10px]">{pkg}</span>
                      <span className="text-foreground font-semibold w-28 shrink-0">{name}</span>
                      <span className="text-amber-400 font-bold w-24 shrink-0">{price}</span>
                      <span className="text-muted-foreground">{desc}</span>
                    </div>
                  ))}
                </div>
                <a href="/contact?service=security"
                  className="inline-block text-xs font-bold text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg hover:bg-amber-500/10 transition-colors">
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
