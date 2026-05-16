'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import RenewalRequestForm from '@/components/RenewalRequestForm'
import historyData from '../../../content/company/history.json'
import clientsData from '../../../content/company/clients.json'
import certificationsData from '../../../content/company/certifications.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import { VisiMascot } from '@/components/visi/VisiMascot'

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

// ── CountUpNumber ──────────────────────────────────────────────────────────
function CountUpNumber({ value, suffix = '', prefix = '', decimals = 0, duration = 1.5 }: {
  value: number; suffix?: string; prefix?: string; decimals?: number; duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const motionVal = useMotionValue(0)
  const springVal = useSpring(motionVal, { duration: duration * 1000, bounce: 0 })
  const display = useTransform(springVal, v =>
    `${prefix}${decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString()}${suffix}`
  )

  useEffect(() => {
    if (isInView) motionVal.set(value)
  }, [isInView, value, motionVal])

  return <motion.span ref={ref}>{display}</motion.span>
}

// ── FadeInSection ──────────────────────────────────────────────────────────
function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ── AboutHeroIllust ────────────────────────────────────────────────────────
function AboutHeroIllust() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
      <svg viewBox="0 0 260 240" width="250" height="230" xmlns="http://www.w3.org/2000/svg">
        {/* Laptop body */}
        <rect x="28" y="38" width="204" height="144" rx="12" fill="var(--background-deep)" stroke="var(--primary)" strokeWidth="2"/>
        {/* Screen */}
        <rect x="40" y="50" width="180" height="120" rx="7" fill="var(--background)"/>
        {/* Header bar */}
        <rect x="40" y="50" width="180" height="24" rx="7" fill="var(--background-deep)"/>
        {/* Traffic light dots */}
        <circle cx="56" cy="62" r="4" fill="var(--macos-red)" opacity="0.8"/>
        <circle cx="69" cy="62" r="4" fill="var(--macos-yellow)" opacity="0.8"/>
        <circle cx="82" cy="62" r="4" fill="var(--macos-green)" opacity="0.8"/>
        {/* URL bar */}
        <rect x="100" y="57" width="106" height="10" rx="5" fill="var(--background-deep)"/>
        <text x="107" y="66" fill="var(--muted-foreground)" fontSize="7" fontFamily="sans-serif">visionc.co.kr</text>
        {/* Bar chart */}
        <rect x="54" y="134" width="14" height="20" rx="3" fill="var(--primary)" opacity="0.35"/>
        <rect x="74" y="120" width="14" height="34" rx="3" fill="var(--primary)" opacity="0.5"/>
        <rect x="94" y="104" width="14" height="50" rx="3" fill="var(--primary)" opacity="0.65"/>
        <rect x="114" y="86" width="14" height="68" rx="3" fill="var(--primary)" opacity="0.8"/>
        <rect x="134" y="68" width="14" height="86" rx="3" fill="var(--primary)"/>
        {/* Trend line */}
        <polyline points="61,138 81,126 101,110 121,90 141,74" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="141" cy="74" r="5" fill="var(--accent-green)"/>
        {/* +240% badge */}
        <rect x="154" y="72" width="56" height="24" rx="7" fill="var(--accent-green)" opacity="0.9"/>
        <text x="161" y="83" style={{ fill: "var(--primary-foreground)" }} fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">문의 +240%</text>
        <text x="163" y="92" style={{ fill: "var(--primary-foreground)" }} fontSize="7.5" fontFamily="sans-serif">리뉴얼 3개월 후</text>
        {/* Phone beside laptop */}
        <rect x="202" y="100" width="42" height="74" rx="10" fill="var(--background-deep)" stroke="var(--primary)" strokeWidth="1.5"/>
        <rect x="208" y="110" width="30" height="54" rx="5" fill="var(--background)"/>
        <rect x="210" y="116" width="26" height="14" rx="4" fill="var(--primary)"/>
        <text x="213" y="127" style={{ fill: "var(--primary-foreground)" }} fontSize="7.5" fontFamily="sans-serif">문의 +3건</text>
        <rect x="210" y="134" width="26" height="10" rx="3" fill="var(--accent-green)" opacity="0.8"/>
        <text x="213" y="142" style={{ fill: "var(--primary-foreground)" }} fontSize="7" fontFamily="sans-serif">계약완료 ✓</text>
        {/* Laptop base */}
        <rect x="8" y="182" width="244" height="12" rx="4" fill="var(--background-deep)" stroke="var(--primary)" strokeWidth="1.5"/>
        <rect x="88" y="194" width="84" height="6" rx="3" fill="var(--background-deep)"/>
      </svg>
      <VisiMascot pose="happy" size={90} />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="min-h-screen">

      {/* ── SECTION 1: HERO ──────────────────────────────────────────────── */}
      <section style={{
        padding: '100px 24px 80px',
        background: 'var(--background-deep)',
        backgroundImage: 'radial-gradient(ellipse 80% 40% at 50% 0%, color-mix(in oklch, var(--primary) 13%, transparent), transparent)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeInSection>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 48, alignItems: 'center' }}>
              {/* Left: text */}
              <div>
                {/* Badge */}
                <div style={{ marginBottom: 18 }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '4px 12px', borderRadius: 999,
                    fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                    background: 'color-mix(in oklch, var(--primary) 18%, transparent)', color: 'var(--primary-light)',
                    border: '1px solid color-mix(in oklch, var(--primary) 40%, transparent)',
                  }}>
                    회사 소개
                  </span>
                </div>

                {/* H1 */}
                <h1 style={{
                  fontSize: 'clamp(2.2rem, 7vw, 3.8rem)', fontWeight: 900,
                  lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: 22,
                  color: 'var(--foreground)',
                }}>
                  홈페이지 업체에 맡겼다가<br />
                  <span style={{ color: 'var(--primary-light)' }}>연락 두절 된 적 있으신가요?</span>
                </h1>

                {/* Sub */}
                <p style={{
                  color: 'var(--muted-foreground)', fontSize: '1.1rem', lineHeight: 1.7,
                  marginBottom: 38,
                }}>
                  Vision Solution은 그 경험을 바꾸고 싶어서 만들어진 회사입니다.<br />
                  우리는 <strong style={{ color: 'var(--foreground)' }}>"문의 주시면 검토 후 연락드리겠습니다"</strong> 대신,<br />
                  <strong style={{ color: 'var(--foreground)' }}>48시간 안에 리포트를 드립니다.</strong>
                </p>

                {/* CTA #1 */}
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 24 }}>
                  <Link href="/contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'var(--primary)', color: 'var(--primary-foreground)',
                    padding: '15px 36px', borderRadius: 10,
                    fontSize: '1rem', fontWeight: 700, textDecoration: 'none',
                  }}>
                    무료 상담 신청하기 →
                  </Link>
                  <Link href="/portfolio" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'transparent', color: 'var(--primary-light)',
                    padding: '15px 36px', borderRadius: 10,
                    fontSize: '1rem', fontWeight: 700, textDecoration: 'none',
                    border: '1.5px solid color-mix(in oklch, var(--primary) 55%, transparent)',
                  }}>
                    포트폴리오 보기
                  </Link>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)' }}>
                  지금 신청하시면 48시간 안에 담당자가 연락드립니다
                </p>
              </div>

              {/* Right: illustration */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <AboutHeroIllust />
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      {/* ── SECTION 2: 수치 증거 ─────────────────────────────────────────── */}
      <section style={{ padding: '88px 24px', background: 'var(--background)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeInSection>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{
                fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: 12,
              }}>실적 수치</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>
                숫자로 증명하는 Vision Solution
              </h2>
              <p style={{
                color: 'var(--muted-foreground)', marginTop: 14,
                maxWidth: 520, marginLeft: 'auto', marginRight: 'auto',
              }}>
                대형 에이전시 수준의 결과물을, 중소기업도 부담 없는 가격으로 만든다 — 그것이 우리의 포지셔닝입니다.
              </p>
            </div>
          </FadeInSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 20 }}>
            {/* Stat 1 — 프로젝트 수 */}
            <FadeInSection delay={0.05}>
              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '36px 24px', textAlign: 'center',
                position: 'relative', overflow: 'hidden', height: '100%',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--primary), var(--primary-alt))' }} />
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18, fontSize: '3rem', lineHeight: 1 }}>🚀</div>
                <div style={{ fontSize: 'clamp(2.8rem, 6vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--primary-light)', lineHeight: 1 }}>
                  <CountUpNumber value={200} suffix="+" />
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, margin: '8px 0 6px' }}>완료한 프로젝트 수</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)' }}>중소기업·소상공인 고객사 기준</div>
              </div>
            </FadeInSection>

            {/* Stat 2 — 납기 준수율 */}
            <FadeInSection delay={0.10}>
              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '36px 24px', textAlign: 'center',
                position: 'relative', overflow: 'hidden', height: '100%',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--accent-green), var(--accent-green-alt))' }} />
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18, fontSize: '3rem', lineHeight: 1 }}>⚡</div>
                <div style={{ fontSize: 'clamp(2.8rem, 6vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--accent-green)', lineHeight: 1 }}>
                  <CountUpNumber value={98} suffix="%" />
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, margin: '8px 0 6px' }}>납기 준수율</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)' }}>약속한 날짜를 지킵니다</div>
              </div>
            </FadeInSection>

            {/* Stat 3 — 고객 만족도 */}
            <FadeInSection delay={0.15}>
              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '36px 24px', textAlign: 'center',
                position: 'relative', overflow: 'hidden', height: '100%',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--accent-amber), var(--accent-amber-alt))' }} />
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18, fontSize: '3rem', lineHeight: 1 }}>⭐</div>
                <div style={{ fontSize: 'clamp(2.8rem, 6vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--accent-amber)', lineHeight: 1 }}>
                  <CountUpNumber value={4.9} suffix="" decimals={1} />
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, margin: '8px 0 6px' }}>고객 만족도</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)' }}>납품 후 고객 설문 기준 / 5.0점 만점</div>
              </div>
            </FadeInSection>

            {/* Stat 4 — 재의뢰율 */}
            <FadeInSection delay={0.20}>
              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 16, padding: '36px 24px', textAlign: 'center',
                position: 'relative', overflow: 'hidden', height: '100%',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))' }} />
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18, fontSize: '3rem', lineHeight: 1 }}>🤝</div>
                <div style={{ fontSize: 'clamp(2.8rem, 6vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--accent-cyan-text)', lineHeight: 1 }}>
                  <CountUpNumber value={97} suffix="%" />
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, margin: '8px 0 6px' }}>재의뢰율</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)' }}>한 번 함께하면 계속 함께합니다</div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      {/* ── SECTION 3: 미션/비전 + 창업 스토리 ───────────────────────────── */}
      <section style={{ padding: '88px 24px', background: 'var(--card)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 60, alignItems: 'center' }}>
            {/* 창업 스토리 */}
            <FadeInSection>
              <p style={{
                fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.16em',
                textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: 12,
              }}>창업 스토리</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 22 }}>
                "기술을 몰라도,<br />
                <span style={{ color: 'var(--primary-light)' }}>디지털에서 지면 안 된다"</span>
              </h2>
              <div style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                <p style={{ marginBottom: 14 }}>중소기업 사장님들을 만나면 공통점이 있었습니다. 홈페이지 때문에 손해를 보고 있는데, 어디에 맡겨야 할지 모른다는 것.</p>
                <p style={{ marginBottom: 14 }}>대형 에이전시는 비싸고, 싼 곳은 믿기 어렵고, 친구 소개로 맡겼더니 사후 관리가 없고.</p>
                <p>Vision Solution은 그 가운데 지점을 만들기 위해 시작했습니다.</p>
              </div>
            </FadeInSection>

            {/* 미션/비전 박스 + CTA #2 */}
            <FadeInSection delay={0.1}>
              <div style={{
                border: '1px solid color-mix(in oklch, var(--primary) 35%, transparent)',
                borderRadius: 14,
                background: 'color-mix(in oklch, var(--primary) 8%, transparent)',
                padding: '32px 36px',
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--primary-light)', fontWeight: 900, fontSize: '1.1rem', flexShrink: 0, marginTop: 2 }}>✦</span>
                  <div>
                    <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: 6 }}>미션</p>
                    <p style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.5 }}>
                      기술을 모르는 사장님도 디지털에서 이길 수 있도록, <strong style={{ color: 'var(--primary-light)' }}>공정한 기회를 만든다.</strong>
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '16px 0' }}>
                  <span style={{ color: 'var(--primary-light)', fontWeight: 900, fontSize: '1.1rem', flexShrink: 0, marginTop: 2 }}>✦</span>
                  <div>
                    <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: 6 }}>비전</p>
                    <p style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.5 }}>
                      대한민국 중소기업 <strong style={{ color: 'var(--primary-light)' }}>10만 곳의</strong> 신뢰할 수 있는 디지털 파트너
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA #2 (중단) */}
              <div style={{ marginTop: 28 }}>
                <Link href="/#services" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: 'var(--primary)', color: 'var(--primary-foreground)',
                  padding: '15px 36px', borderRadius: 10,
                  fontSize: '1rem', fontWeight: 700, textDecoration: 'none', width: '100%',
                }}>
                  우리 서비스 보러 가기 →
                </Link>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)', textAlign: 'center', marginTop: 10 }}>
                  홈페이지 제작부터 AI 솔루션까지
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      {/* ── SECTION 4: 팀 소개 ───────────────────────────────────────────── */}
      <section style={{ padding: '88px 24px', background: 'var(--background-deep)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeInSection>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: 12 }}>팀 소개</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>
                각 분야 전문가가 한 팀으로 움직입니다
              </h2>
              <p style={{ color: 'var(--muted-foreground)', marginTop: 14, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
                기획 1명, 디자인 1명, 개발 2명이 각각 따로 일하는 구조가 아닙니다.<br />
                처음 상담부터 납품까지, <strong style={{ color: 'var(--foreground)' }}>같은 팀이 끝까지 책임집니다.</strong>
              </p>
            </div>
          </FadeInSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 18 }}>
            {[
              { icon: '🎯', title: '전략기획', tagline: '"왜 만드는가"를 먼저 묻습니다', desc: '고객 동선 설계 → 전환율 목표 설정 → 페이지 구조 설계' },
              { icon: '🎨', title: 'UI/UX 디자인', tagline: '보기 좋은 것보다 쓰기 쉬운 것', desc: '모바일 우선 설계 → 고객 눈에 3초 안에 들어오는 레이아웃' },
              { icon: '⚡', title: '풀스택 개발', tagline: '최신 기술 스택, 빠른 속도', desc: 'Google Core Web Vitals 기준 통과 납품' },
              { icon: '🤖', title: 'AI 솔루션', tagline: '챗봇부터 자동화까지', desc: <>고객사 상황에 맞는 AI 도입으로 운영 비용 <strong style={{ color: 'var(--accent-green)' }}>30% 절감</strong> 사례</> },
              { icon: '🔒', title: '보안 전문', tagline: '아무도 신경 안 쓰는 것을 우리가 챙깁니다', desc: <>납품 전 <strong style={{ color: 'var(--accent-green)' }}>20개 보안 항목</strong> 필수 통과</> },
              { icon: '🤝', title: '사후 관리', tagline: '납품 후가 진짜 시작입니다', desc: <><strong style={{ color: 'var(--accent-green)' }}>6개월 무상 유지보수</strong> + 월 관리 플랜 운영</> },
            ].map((item, i) => (
              <FadeInSection key={item.title} delay={i * 0.05}>
                <div style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: '28px 24px', position: 'relative', overflow: 'hidden', height: '100%',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--primary), var(--primary-alt))' }} />
                  <div style={{ fontSize: '2rem', marginBottom: 14 }}>{item.icon}</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--primary-light)', fontWeight: 700, marginBottom: 10 }}>{item.tagline}</div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--muted-foreground)', lineHeight: 1.55 }}>{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      {/* ── SECTION 5: 차별화 3가지 ─────────────────────────────────────── */}
      <section style={{ padding: '88px 24px', background: 'var(--background)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeInSection>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: 12 }}>우리가 다른 이유</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>
                "맡기고 나서도 안심"이 가능한 이유
              </h2>
            </div>
          </FadeInSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 20 }}>
            {[
              {
                num: '01', title: '납기 준수 약속',
                desc: <>약속한 날짜에 못 납품하면, <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>지연된 일수만큼 비용 환불</span>.<br /><br />"3주 완성"이라고 하면 진짜 3주입니다.</>
              },
              {
                num: '02', title: '가격 투명 공개',
                desc: <>"상담 후 안내"라고만 쓰인 견적서는 드리지 않습니다.<br /><br /><span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>기본형 100만원대부터</span>, 범위를 먼저 안내드립니다.</>
              },
              {
                num: '03', title: '납품 후 6개월 무상 A/S',
                desc: <>납품 완료 후 <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>6개월은 추가 비용 없이</span> 수정 가능합니다.<br /><br />연락 두절? 저희는 다음날도 전화 받습니다.</>
              },
            ].map((item, i) => (
              <FadeInSection key={item.num} delay={i * 0.07}>
                <div style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 16, padding: '32px 28px', height: '100%',
                }}>
                  <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'color-mix(in oklch, var(--primary) 35%, transparent)', letterSpacing: '-0.04em', marginBottom: 8 }}>{item.num}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 10 }}>{item.title}</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      {/* ── SECTION 6: 연혁 타임라인 ────────────────────────────────────── */}
      <section style={{ padding: '88px 24px', background: 'var(--card)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeInSection>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: 12 }}>연혁</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>
                Vision Solution의 성장 기록
              </h2>
            </div>
          </FadeInSection>

          <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute', left: 110, top: 0, bottom: 0, width: 2,
              background: 'linear-gradient(to bottom, var(--primary), color-mix(in oklch, var(--primary) 10%, transparent))',
            }} />

            {historyData.map((item, i) => (
              <FadeInSection key={item.year} delay={i * 0.06}>
                <div style={{ display: 'flex', gap: 0, padding: '20px 0', position: 'relative' }}>
                  <div style={{
                    width: 110, flexShrink: 0, paddingRight: 28, textAlign: 'right',
                    fontWeight: 800, fontSize: '0.9rem', color: 'var(--primary-light)', paddingTop: 2,
                  }}>{item.year}</div>
                  <div style={{
                    width: 14, height: 14, borderRadius: '50%',
                    background: item.accent ? 'linear-gradient(135deg, var(--primary), var(--primary-alt))' : 'var(--primary)',
                    border: '2px solid var(--background)',
                    flexShrink: 0, marginTop: 3, position: 'relative', zIndex: 1,
                  }} />
                  <div style={{ paddingLeft: 20, flex: 1 }}>
                    <strong style={{
                      display: 'block', fontSize: '0.95rem', fontWeight: 700, marginBottom: 4,
                      color: item.accent ? 'var(--primary-light)' : undefined,
                    }}>{item.title}</strong>
                    <p style={{ fontSize: '0.86rem', color: 'var(--muted-foreground)', lineHeight: 1.55 }}>{item.desc}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      {/* ── SECTION 7: 고객 신뢰 ─────────────────────────────────────────── */}
      <section style={{ padding: '88px 24px', background: 'var(--background-deep)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeInSection>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: 12 }}>고객 신뢰</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>직접 확인하세요</h2>
            </div>
          </FadeInSection>

          {/* Trust badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 14, marginBottom: 52, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
            {certificationsData.map((badge, i) => (
              <FadeInSection key={badge.title} delay={i * 0.05}>
                <div style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>{badge.icon}</div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, marginBottom: 2 }}>{badge.title}</strong>
                    <span style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>{badge.sub}</span>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* Review cards */}
          <FadeInSection delay={0.1}>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted-foreground)', marginBottom: 20, textAlign: 'center' }}>실제 고객 후기</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
              {[
                { body: '처음엔 반신반의했는데, 약속한 날짜에 딱 납품해줬습니다. 지금까지 제가 만난 업체 중 유일하게 전화를 바로 받아요.', author: '서울 소재 제조업 대표 ⭐⭐⭐⭐⭐' },
                { body: '가격을 처음부터 명확하게 알려줘서 믿음이 갔습니다. 다른 업체들은 추가 비용이 계속 나왔거든요.', author: '경기도 소재 서비스업 대표 ⭐⭐⭐⭐⭐' },
                { body: 'AI 챗봇 도입 후 고객 문의 응대 시간이 60% 줄었습니다. IT를 전혀 모르는 저도 쉽게 사용할 수 있어요.', author: '부산 소재 소매업 대표 ⭐⭐⭐⭐⭐' },
              ].map((review, i) => (
                <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: 28 }}>
                  <div style={{ fontSize: '1.6rem', color: 'var(--primary-light)', marginBottom: 10, lineHeight: 1 }}>"</div>
                  <p style={{ fontSize: '0.93rem', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 16 }}>{review.body}</p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--muted-foreground)', fontWeight: 600 }}>— {review.author}</p>
                </div>
              ))}
            </div>
            {/* Carousel dots */}
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 20 }}>
              <span style={{ width: 24, height: 6, borderRadius: 3, background: 'var(--primary)', display: 'block' }} />
              <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--border)', display: 'block' }} />
              <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--border)', display: 'block' }} />
            </div>
          </FadeInSection>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      {/* ── SECTION 8a: 고객사 로고 띠 ──────────────────────────────────── */}
      <section style={{ padding: '56px 24px', background: 'var(--background)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeInSection>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted-foreground)', textAlign: 'center', marginBottom: 28 }}>신뢰하는 고객사</p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
              {clientsData.featured.map(name => (
                <div key={name} style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: '12px 22px',
                  fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted-foreground)',
                  letterSpacing: '0.02em', textAlign: 'center',
                }}>
                  {name}
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      {/* ── SECTION 8b: FAQ ───────────────────────────────────────────────── */}
      <section style={{ padding: '88px 24px', background: 'var(--card)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <FadeInSection>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: 12 }}>자주 묻는 질문</p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>궁금하신 점이 있으신가요?</h2>
            </div>
          </FadeInSection>

          {[
            { q: '미팅은 꼭 대면으로 해야 하나요?', a: '아닙니다. 전국 어디서든 화상 미팅으로 진행 가능합니다. 카카오톡/이메일로도 소통됩니다.' },
            { q: 'IT를 전혀 모르는데 상담이 가능한가요?', a: '오히려 IT를 모르시는 분들을 위해 만든 회사입니다. 전문 용어 없이 쉽게 설명드립니다.' },
            { q: '납품 후 수정 요청은 어떻게 하나요?', a: '납품 후 6개월은 추가 비용 없이 수정 가능합니다. 이후에는 월정액 유지보수 플랜으로 전환할 수 있습니다.' },
            { q: '예산이 얼마나 있어야 의뢰할 수 있나요?', a: '기본형 웹사이트는 100만원대부터 시작합니다. 정확한 견적은 무료 상담 후 제공드리며, 예산에 맞는 방향을 먼저 안내드립니다.' },
            { q: '이전에 만든 홈페이지가 있는데, 리뉴얼도 되나요?', a: '네, 가능합니다. 기존 도메인·콘텐츠를 유지하면서 디자인과 성능만 개선하는 리뉴얼 서비스도 운영 중입니다.' },
          ].map((item, i) => (
            <FadeInSection key={i} delay={i * 0.05}>
              <div style={{ borderBottom: i < 4 ? '1px solid var(--border)' : 'none', padding: '22px 0' }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 10, display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--primary-light)', flexShrink: 0 }}>Q{i + 1}</span>
                  {item.q}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', lineHeight: 1.65, paddingLeft: 28 }}>{item.a}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

      {/* ── SECTION 9: Final CTA ─────────────────────────────────────────── */}
      <section style={{
        padding: '100px 24px',
        textAlign: 'center',
        background: 'var(--background-deep)',
        backgroundImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, color-mix(in oklch, var(--primary) 18%, transparent), transparent)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeInSection>
            {/* VISI cheering */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
              <VisiMascot pose="cheering" size={130} bubble="48시간 안에 리포트 드려요!" bubbleDir="left" />
            </div>

            {/* Urgency badge */}
            <div style={{ marginBottom: 20 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 999,
                fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
                background: 'color-mix(in oklch, var(--primary) 18%, transparent)', color: 'var(--primary-light)',
                border: '1px solid color-mix(in oklch, var(--primary) 40%, transparent)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary-light)', display: 'inline-block' }} />
                지금 이 순간도
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 900, letterSpacing: '-0.02em',
              maxWidth: 700, margin: '0 auto 18px',
            }}>
              경쟁사 홈페이지가<br />
              <span style={{ color: 'var(--primary-light)' }}>고객을 가로채고 있을 수 있습니다.</span>
            </h2>

            <p style={{ color: 'var(--muted-foreground)', maxWidth: 520, margin: '0 auto 44px', fontSize: '1.05rem', lineHeight: 1.7 }}>
              무료 상담으로 우리 사이트의 문제점부터 진단받으세요.<br />
              <strong style={{ color: 'var(--foreground)' }}>48시간 안에 리포트를 드립니다.</strong>
            </p>

            <div style={{ marginBottom: 28 }}>
              <RenewalRequestForm
                title="무료 상담 신청"
                notice="전문가가 직접 검토 후 48시간 내 이메일로 연락드립니다."
              />
            </div>

            {/* CTA #3 */}
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--primary)', color: 'var(--primary-foreground)',
                padding: '16px 40px', borderRadius: 10,
                fontSize: '1.05rem', fontWeight: 700, textDecoration: 'none',
              }}>
                무료 상담 신청하기 →
              </Link>
              <Link href="/" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', color: 'var(--primary-light)',
                padding: '16px 40px', borderRadius: 10,
                fontSize: '1.05rem', fontWeight: 700, textDecoration: 'none',
                border: '1.5px solid color-mix(in oklch, var(--primary) 55%, transparent)',
              }}>
                서비스 둘러보기
              </Link>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--muted-foreground)' }}>
              📞 평일 09:00~18:00 &nbsp;|&nbsp; 카카오톡 문의 가능 &nbsp;|&nbsp; 주말 응급 연락 가능
            </p>
          </FadeInSection>
        </div>
      </section>

    </main>
  )
}
