'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform, useInView, type Variants } from 'framer-motion'
import Mascot from '@/components/Mascot'

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

// ── Animation Variants ────────────────────────────────────────────────────
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const staggerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

// ── Data ──────────────────────────────────────────────────────────────────
const stats = [
  { value: 247, suffix: '+',  decimals: 0, label: '완료 프로젝트', sub: '2007년 이후 누적' },
  { value: 18,  suffix: '년+', decimals: 0, label: '운영 경력',    sub: '벤처기업 등록' },
  { value: 4.9, suffix: '',   decimals: 1, label: '고객 만족도',   sub: '납품 후 설문 / 5.0 만점' },
  { value: 97,  suffix: '%',  decimals: 0, label: '재의뢰율',      sub: '한 번 함께하면 계속 함께' },
]

const industries = [
  { icon: '🏭', label: '제조·B2B',          desc: 'MES·ERP·그룹웨어 등 사내 인프라' },
  { icon: '🏥', label: '병원·의원',         desc: '비영리기관 그룹웨어·예약·CRM' },
  { icon: '🛒', label: '쇼핑몰·유통',       desc: '쇼핑몰·유통 ERP·재고 관리' },
  { icon: '🏛️', label: '공공기관',          desc: '경기도·서울시 산하 웹접근성 사이트' },
  { icon: '🍴', label: '음식점·서비스업',   desc: '예약·주문·고객 응대 자동화' },
  { icon: '🎓', label: '교육·학원',         desc: '학원 관리·온라인 강좌·LMS' },
]

const services = [
  { icon: '🤖', title: '기업 AI 도입',      desc: '컨설팅 → 구축 → 사내 출강 교육. LLM·자율 에이전트·RAG 챗봇' },
  { icon: '🔒', title: '보안 진단·모의해킹', desc: 'SSL·보안헤더·취약점 진단 + 실제 침투 테스트' },
  { icon: '💻', title: '웹사이트·리뉴얼',    desc: '신규 제작·리뉴얼·웹접근성. Core Web Vitals 기준 통과' },
  { icon: '📱', title: '앱·시스템 개발',     desc: '모바일 앱·사내 업무 시스템·그룹웨어·ERP 풀스택 구축' },
  { icon: '⚙️', title: '인프라·운영',        desc: '서버 구축·온프레미스·프라이빗 클라우드·SaaS 운영' },
  { icon: '🤝', title: '사후 관리',          desc: '6개월 무상 + 월정액 유지보수·운영 대행' },
]

const processSteps = [
  { num: '01', title: '도입 상담',    sub: '업무·현황 파악 + 도입 우선순위 정리', pose: 'greeting' as const, category: 'situation' as const },
  { num: '02', title: '솔루션 설계',  sub: '요구사항 정리 + 기술 스택·일정·범위',  pose: 'guide' as const, category: 'situation' as const },
  { num: '03', title: '구축·학습',    sub: '개발·구축 + 사내 인수인계·교육',       pose: 'develop' as const, category: 'process' as const },
  { num: '04', title: '인수·검수',    sub: '실사용 검수 + 보안·성능 점검',         pose: 'analytics' as const, category: 'process' as const },
  { num: '05', title: '사후 관리',    sub: '6개월 무상 + 월정액 유지보수·운영',    pose: 'cheer' as const, category: 'emotion' as const, highlight: true },
]

// ── Page ──────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Section 1 — Hero ── */}
      <section
        className="pt-24 pb-16 px-6 relative overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 0%, color-mix(in oklch, var(--primary) 12%, transparent), transparent)' }}
      >
        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              className="flex flex-col gap-5"
              variants={staggerSlow}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest"
                  style={{ background: 'color-mix(in oklch, var(--primary) 20%, transparent)', color: 'var(--primary-bright)', border: '1px solid color-mix(in oklch, var(--primary) 40%, transparent)' }}>
                  Portfolio
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-black leading-tight tracking-tight"
              >
                다양한 산업의<br />
                <span style={{ color: 'var(--primary-light)' }}>디지털 전환을 함께해 왔습니다</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-muted-foreground text-lg leading-relaxed">
                2007년 설립 이후 누적 247건+ 프로젝트.<br />
                중소기업·공공기관·소상공인 대상 <strong className="text-foreground">그룹웨어·ERP·홈페이지·앱·AI 솔루션</strong> 전 영역.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex gap-3 flex-wrap pt-2">
                <Link href="/contact"
                  className="inline-flex items-center gap-2 text-primary-foreground font-bold px-8 py-3.5 rounded-xl hover:opacity-85 transition-opacity"
                  style={{ background: 'var(--primary)' }}>
                  💼 도입 상담 신청 →
                </Link>
                <Link href="/ai-solution/academy/dept-ai"
                  className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-xl transition-all"
                  style={{
                    background: 'transparent',
                    color: 'var(--primary-light)',
                    border: '1.5px solid color-mix(in oklch, var(--primary) 60%, transparent)',
                  }}>
                  🎓 사내 출강 강좌 보기
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex justify-center items-center"
            >
              <Mascot pose="portfolio" category="service" size="md" className="h-56 w-auto" alt="VISIONC 마스코트 — 포트폴리오" />
            </motion.div>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ── Section 2 — Stats ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map(s => (
              <div key={s.label} className="flex flex-col items-center gap-1.5">
                <div className="text-5xl font-black tabular-nums" style={{ color: 'var(--primary-light)' }}>
                  <CountUpNumber value={s.value} suffix={s.suffix} decimals={s.decimals} />
                </div>
                <div className="text-sm font-bold text-foreground">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ── Section 3 — Industries ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--primary-light)' }}>
              Industries
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">함께해 온 산업 영역</h2>
            <p className="text-muted-foreground max-w-2xl">
              중소기업·공공기관·소상공인까지. 산업별 업무 특성에 맞춰 솔루션을 설계해 왔습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map(i => (
              <div key={i.label}
                className="bg-card border border-border rounded-2xl p-6 flex gap-4 items-start">
                <div className="text-3xl shrink-0">{i.icon}</div>
                <div>
                  <div className="font-black text-foreground mb-1">{i.label}</div>
                  <div className="text-sm text-muted-foreground leading-snug">{i.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ── Section 4 — Services ── */}
      <section className="py-20 px-6" style={{ background: 'var(--card)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--primary-light)' }}>
              Services
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">제공하는 서비스 영역</h2>
            <p className="text-muted-foreground max-w-2xl">
              기획·설계부터 구축·교육·운영까지. 한 팀이 끝까지 책임지는 통합 트랙입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(s => (
              <div key={s.title}
                className="bg-background border border-border rounded-2xl p-6 flex gap-4 items-start">
                <div className="text-3xl shrink-0">{s.icon}</div>
                <div>
                  <div className="font-black text-foreground mb-1">{s.title}</div>
                  <div className="text-sm text-muted-foreground leading-snug">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ── Section 5 — 사례 비공개 안내 ── */}
      <section className="py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-7 flex flex-col sm:flex-row gap-5 items-start">
            <div className="text-3xl shrink-0">🔒</div>
            <div className="flex-1">
              <div className="font-black text-foreground mb-2">개별 사례는 비공개 운영입니다</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                보안 정책과 의뢰사 NDA로 개별 프로젝트의 식별 가능한 사례는 공개하지 않습니다.
                공개 가능한 사례는 의뢰사 동의를 받아 순차적으로 업데이트할 예정입니다.
                업종·규모가 비슷한 사례는 <Link href="/contact" className="font-bold underline" style={{ color: 'var(--primary-light)' }}>도입 상담</Link>에서 직접 안내해 드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ── Section 6 — Process Stepper ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--primary-light)' }}>
              Process
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">의뢰부터 사후 관리까지, 5단계</h2>
            <p className="text-muted-foreground max-w-2xl">처음 의뢰하는 분들도 쉽게 이해할 수 있도록 단계별로 정리했습니다.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {processSteps.map(s => (
              <div
                key={s.num}
                className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3 items-start"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
                  style={{
                    background: s.highlight ? 'color-mix(in oklch, var(--accent-green-dark) 20%, transparent)' : 'color-mix(in oklch, var(--primary) 20%, transparent)',
                    color: s.highlight ? 'var(--accent-green-text)' : 'var(--primary-light)',
                  }}>
                  {s.num}
                </div>

                <Mascot pose={s.pose} category={s.category} size="sm" className="h-16 w-auto" />

                <div>
                  <div className="font-black text-foreground text-sm">{s.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* ── Section 7 — Final CTA ── */}
      <section
        className="py-20 px-6 text-center"
        style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 0%, color-mix(in oklch, var(--primary) 18%, transparent), transparent)' }}
      >
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-5">
          <Mascot pose="cheer" category="emotion" size="sm" className="h-28 w-auto" bubble="AI 도입, 같이 시작해요!" bubbleDir="left" />

          <h2 className="text-3xl md:text-4xl font-black text-foreground leading-snug">
            우리 회사에 맞는 솔루션,<br />
            <span style={{ color: 'var(--primary-light)' }}>1시간 상담으로 그려 드립니다.</span>
          </h2>
          <p className="text-muted-foreground max-w-lg">
            업무 진단부터 도입 우선순위·ROI 추정까지. 컨설팅·구축·사내 출강 교육을 한 팀이 끝까지 책임집니다.
          </p>

          <div className="flex gap-3 flex-wrap justify-center pt-2">
            <Link href="/contact"
              className="inline-flex items-center gap-2 text-primary-foreground font-bold px-10 py-4 rounded-xl hover:opacity-85 transition-opacity text-base"
              style={{ background: 'var(--primary)' }}>
              💼 도입 상담 신청 →
            </Link>
            <Link href="/ai-solution"
              className="inline-flex items-center gap-2 font-bold px-10 py-4 rounded-xl transition-all text-base"
              style={{
                background: 'transparent',
                color: 'var(--primary-light)',
                border: '1.5px solid color-mix(in oklch, var(--primary) 60%, transparent)',
              }}>
              기업 AI 도입 트랙 보기
            </Link>
          </div>

          <p className="text-xs text-muted-foreground pt-2">
            📞 평일 09:00~18:00 &nbsp;|&nbsp; 카카오톡 문의 가능 &nbsp;|&nbsp; biztalktome@gmail.com
          </p>
        </div>
      </section>

    </div>
  )
}
