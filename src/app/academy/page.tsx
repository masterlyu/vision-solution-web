import type { Metadata } from 'next'
import Link from 'next/link'
import Mascot from '@/components/Mascot'

export const metadata: Metadata = {
  title: 'visionc Academy — 무료 AI 강의 | Vision Solution',
  description: 'AI를 가장 빠르게 익히는 한국어 강의 플랫폼. Lv1부터 Lv7까지 단계별 무료 강의 + 자료 다운로드.',
  keywords: ['AI 강의', 'Claude 강의', 'ChatGPT 강의', '4D 프레임워크', 'AI Fluency', 'visionc Academy', '무료 AI 교육'],
  alternates: { canonical: '/academy' },
  openGraph: {
    title: 'visionc Academy — 무료 AI 강의',
    description: 'AI를 가장 빠르게 익히는 한국어 강의 플랫폼. 강의 자료(PPT + 스피커 노트) 무료 다운로드.',
    url: 'https://visionc.co.kr/academy',
    siteName: 'Vision Solution',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'visionc Academy' }],
    locale: 'ko_KR',
    type: 'website',
  },
}

type LevelCard = {
  tag: string
  title: string
  subtitle: string
  description: string
  status: 'available' | 'soon' | 'planned'
  href?: string
}

const LEVELS: LevelCard[] = [
  {
    tag: 'LV1 · 기초',
    title: '기초 AI 상식',
    subtitle: 'Foundation',
    description: '모든 AI에 통하는 사용 원칙 — 4D 프레임워크 입문',
    status: 'available',
    href: '/academy/lv1',
  },
  {
    tag: 'LV2 · 실용',
    title: 'AI로 일하는 법',
    subtitle: 'Practical',
    description: '마케팅·고객응대·문서·데이터 실전 적용',
    status: 'soon',
  },
  {
    tag: 'LV3 · 활용',
    title: 'Claude Code 입문',
    subtitle: 'Coding',
    description: '코드 작성과 자동화 워크플로우',
    status: 'planned',
  },
  {
    tag: 'LV4 · 개발',
    title: 'AI 앱 만들기',
    subtitle: 'API & MCP',
    description: 'Claude API와 Model Context Protocol 입문',
    status: 'planned',
  },
  {
    tag: 'LV5 · 고급',
    title: 'Agents & Skills',
    subtitle: 'Advanced',
    description: '자율 에이전트 설계와 Sub-agent 활용',
    status: 'planned',
  },
  {
    tag: 'LV6 · 엔터프라이즈',
    title: '클라우드 AI',
    subtitle: 'Enterprise',
    description: 'AWS Bedrock · Google Vertex AI',
    status: 'planned',
  },
  {
    tag: 'LV7 · 교육',
    title: '교사·강사를 위한 AI',
    subtitle: 'Education',
    description: '교육 현장 활용 트랙 (특화)',
    status: 'planned',
  },
]

function StatusBadge({ status }: { status: LevelCard['status'] }) {
  if (status === 'available') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-primary text-primary-foreground">
        ● 수강 가능
      </span>
    )
  }
  if (status === 'soon') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider bg-[var(--accent-cyan-text)]/15 text-[var(--accent-cyan-text)]">
        Coming Soon
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider bg-muted text-muted-foreground">
      예정
    </span>
  )
}

export default function AcademyPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Hero */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <Mascot pose="vision" category="company" size="md" className="h-32 w-auto" alt="visionc Academy 마스코트" />
          </div>
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-4">
            visionc · ACADEMY
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight tracking-tight">
            AI를 가장 빠르게<br />
            <span className="bg-gradient-to-r from-primary via-[var(--accent)] to-[var(--accent-cyan-text)] bg-clip-text text-transparent">
              익히는 한국어 강의
            </span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Claude · ChatGPT · Gemini · Perplexity — 어떤 AI를 쓰든 통하는 글로벌 표준 4D 프레임워크부터<br className="hidden md:block" />
            기업 엔터프라이즈 AI까지. 단계별 무료 강의와 자료 다운로드.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8 text-xs font-mono text-muted-foreground">
            <span className="px-3 py-1.5 rounded-full bg-muted">7단계 코스</span>
            <span className="px-3 py-1.5 rounded-full bg-muted">무료 자료 제공</span>
            <span className="px-3 py-1.5 rounded-full bg-muted">PPT + 스피커노트</span>
            <span className="px-3 py-1.5 rounded-full bg-muted">100% AI 제작</span>
          </div>
        </div>

        {/* Levels grid */}
        <div className="mb-16">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">전체 코스 로드맵</h2>
            <p className="text-sm text-muted-foreground font-mono tracking-widest hidden md:block">LV1 → LV7</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LEVELS.map((lv) => {
              const card = (
                <article
                  className={`group relative h-full rounded-3xl border p-7 transition-all ${
                    lv.status === 'available'
                      ? 'border-primary/40 bg-gradient-to-br from-primary/10 to-transparent hover:border-primary hover:shadow-[0_0_60px_-15px_rgba(118,75,229,0.5)]'
                      : 'border-border bg-card hover:border-border/80'
                  }`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <p className="text-xs font-mono font-bold tracking-[0.16em] text-primary">{lv.tag}</p>
                    <StatusBadge status={lv.status} />
                  </div>
                  <h3 className="text-2xl font-extrabold text-foreground mb-1 tracking-tight">{lv.title}</h3>
                  <p className="text-xs font-mono text-muted-foreground mb-4">{lv.subtitle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{lv.description}</p>
                  {lv.status === 'available' && (
                    <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                      자료 보기
                      <span>→</span>
                    </div>
                  )}
                </article>
              )
              return lv.href ? (
                <Link key={lv.tag} href={lv.href} className="block">
                  {card}
                </Link>
              ) : (
                <div key={lv.tag}>{card}</div>
              )
            })}
          </div>
        </div>

        {/* Why visionc Academy */}
        <div className="mb-16 rounded-3xl border border-border bg-card p-8 md:p-12">
          <p className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-primary mb-4">Why visionc Academy</p>
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-8 tracking-tight">왜 이 강의인가</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">글로벌 표준 기반</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Rick Dakan(Ringling College) + Joseph Feller(University College Cork) 두 교수가 만들고 Anthropic이 공식 채택한 <b className="text-foreground">AI Fluency 4D 프레임워크</b> 기반.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">자료가 곧 데모</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                강의 자료(슬라이드·디자인·이미지)가 <b className="text-foreground">100% AI로 제작</b>되었습니다. 자료 자체가 'AI로 이런 결과물이 가능하다'는 증거.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">한국 현장 사례</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                미국 자료엔 없는 <b className="text-foreground">한국 비즈니스 사례·자영업·중소기업 적용법</b> 중심. 내일 업무에 바로 쓰는 실전 가이드.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-[var(--accent)]/10 to-transparent p-10 md:p-14">
          <p className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-primary mb-4">Consulting</p>
          <h2 className="text-2xl md:text-4xl font-black text-foreground mb-4 tracking-tight">우리 회사에 맞게 적용하고 싶다면</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Lv1~Lv7로는 부족한, <b className="text-foreground">우리 업무에 직접 적용</b>이 필요하다면 visionc 1:1 컨설팅을 추천드립니다.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors"
          >
            컨설팅 문의하기
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
