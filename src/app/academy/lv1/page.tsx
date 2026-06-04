import type { Metadata } from 'next'
import Link from 'next/link'
import AcademyDownloadClient from './AcademyDownloadClient'

export const metadata: Metadata = {
  title: 'Lv1 · 기초 AI 상식 — visionc Academy',
  description: '4D 프레임워크 기반 무료 AI 강의 Lv1.',
  keywords: ['AI 기초', '4D Framework', 'AI Fluency', 'visionc Academy Lv1'],
  alternates: { canonical: '/academy/lv1' },
  openGraph: {
    title: 'Lv1 · 기초 AI 상식 — visionc Academy',
    description: '4D 프레임워크 기반 무료 AI 강의 Lv1.',
    url: 'https://visionc.co.kr/academy/lv1',
    siteName: 'Vision Solution',
    locale: 'ko_KR',
    type: 'website',
  },
}

const TOPICS = [
  { num: '01', title: '학습 목표', desc: '60분 후 무엇이 가능해지나' },
  { num: '02', title: 'AI 시대', desc: '왜 지금 모두가 배우는가' },
  { num: '03', title: '작동 원리', desc: 'AI는 자동완성이다' },
  { num: '04', title: '4대 AI 비교', desc: 'Claude · ChatGPT · Gemini · Perplexity' },
  { num: '05', title: '4D 프레임워크', desc: '글로벌 표준 협업 원칙' },
  { num: '06', title: 'D1 위임', desc: '무엇을 AI에 맡길 것인가' },
  { num: '07', title: 'D2 설명', desc: '좋은 지시문 = 4요소' },
  { num: '08', title: 'D3 판단력', desc: '결과를 어떻게 판단할까' },
  { num: '09', title: 'D4 성실성', desc: '최종 책임은 사람에게' },
  { num: '10', title: '오늘 정리', desc: '다음 단계 로드맵' },
]

export default function Lv1Page() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground font-mono mb-6 tracking-wider">
          <Link href="/academy" className="hover:text-primary transition-colors">ACADEMY</Link>
          <span className="mx-2 text-border">·</span>
          <span className="text-primary">LV1 · FOUNDATION</span>
        </nav>

        {/* Hero — 타이틀 + 메타 칩만 */}
        <div className="mb-10">
          <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-3">
            Lv1 · Foundation
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-5 leading-tight tracking-tight">
            기초 AI 상식
          </h1>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-full bg-primary/15 text-primary">⏱ 60분</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">11 슬라이드</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">FREE</span>
          </div>
        </div>

        {/* Authority — 1줄 */}
        <p className="text-sm text-muted-foreground mb-10 font-mono">
          출처 · <b className="text-foreground">Rick Dakan</b>(Ringling College) + <b className="text-foreground">Joseph Feller</b>(University College Cork) · Anthropic 공식 채택
        </p>

        {/* Topics */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-black text-foreground mb-5 tracking-tight">강의 목차</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TOPICS.map((t) => (
              <div key={t.num} className="flex items-start gap-4 p-4 rounded-2xl border-2 border-foreground/15 bg-card hover:border-primary/50 transition-colors">
                <span className="text-xs font-mono font-bold text-primary mt-1 tracking-wider">{t.num}</span>
                <div>
                  <h3 className="text-base font-bold text-foreground tracking-tight">{t.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Downloads */}
        <AcademyDownloadClient />

        {/* Back */}
        <div className="mt-10 text-center">
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
          >
            ← 전체 코스
          </Link>
        </div>
      </div>
    </div>
  )
}
