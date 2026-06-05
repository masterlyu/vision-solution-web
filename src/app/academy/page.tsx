import type { Metadata } from 'next'
import Link from 'next/link'
import Mascot from '@/components/Mascot'

export const metadata: Metadata = {
  title: 'visionc Academy — 무료 AI 강의 | Vision Solution',
  description: 'AI를 가장 빠르게 익히는 한국어 강의 플랫폼.',
  keywords: ['AI 강의', 'Claude 강의', 'ChatGPT 강의', '4D 프레임워크', 'AI Fluency', 'visionc Academy'],
  alternates: { canonical: '/academy' },
  openGraph: {
    title: 'visionc Academy',
    description: 'AI를 가장 빠르게 익히는 한국어 강의 플랫폼.',
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
  status: 'available' | 'soon' | 'planned'
  href?: string
}

const LEVELS: LevelCard[] = [
  { tag: 'LV1 · 기초', title: '기초 AI 상식', subtitle: 'Foundation', status: 'available', href: '/academy/lv1' },
  { tag: 'LV2 · 마스터', title: 'Claude 마스터', subtitle: 'Master', status: 'available', href: '/academy/lv2' },
  { tag: 'LV3 · 실용', title: 'AI로 일하는 법', subtitle: 'Practical', status: 'available', href: '/academy/lv3' },
  { tag: 'LV4 · 활용', title: 'Claude Code 입문', subtitle: 'Coding', status: 'available', href: '/academy/lv4' },
  { tag: 'LV5 · 개발', title: 'AI 앱 만들기', subtitle: 'API & MCP', status: 'available', href: '/academy/lv5' },
  { tag: 'LV6 · 고급', title: 'Agents & Skills', subtitle: 'Advanced', status: 'available', href: '/academy/lv6' },
  { tag: 'LV7 · 엔터프라이즈', title: '클라우드 AI', subtitle: 'Enterprise', status: 'available', href: '/academy/lv7' },
  { tag: 'LV8 · 교육', title: 'AI 시대 교육의 철학', subtitle: 'Education', status: 'available', href: '/academy/lv8' },
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

        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Mascot pose="cheer" category="emotion" size="md" className="h-28 w-auto" alt="visionc Academy" />
          </div>
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3">
            visionc · ACADEMY
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground leading-tight tracking-tight">
            무료 AI 강의 플랫폼
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LEVELS.map((lv) => {
            const card = (
              <article
                className={`group relative h-full rounded-3xl border-2 p-7 transition-all ${
                  lv.status === 'available'
                    ? 'border-primary bg-gradient-to-br from-primary/15 to-card shadow-[0_0_30px_-12px_rgba(118,75,229,0.4)] hover:shadow-[0_0_60px_-12px_rgba(118,75,229,0.7)]'
                    : 'border-foreground/15 bg-card hover:border-foreground/30'
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <p className="text-xs font-mono font-bold tracking-[0.16em] text-primary">{lv.tag}</p>
                  <StatusBadge status={lv.status} />
                </div>
                <h3 className="text-2xl font-extrabold text-foreground mb-1 tracking-tight">{lv.title}</h3>
                <p className="text-xs font-mono text-muted-foreground mb-3">{lv.subtitle}</p>
                {lv.status === 'available' && (
                  <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all mt-4">
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
    </div>
  )
}
