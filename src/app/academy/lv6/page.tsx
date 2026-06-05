import type { Metadata } from 'next'
import Link from 'next/link'
import AcademyDownloadClient from './AcademyDownloadClient'

export const metadata: Metadata = {
  title: 'Lv6 · Agents & Skills — visionc Academy',
  description: 'Anthropic Building Effective Agents 백서 풀 커버. 5 패턴 + Skills + 4 실전 Agent + 안전·관찰.',
  keywords: ['Anthropic Agents', 'Building Effective Agents', 'Skills', 'Orchestrator', 'Evaluator', 'visionc Academy Lv6'],
  alternates: { canonical: '/academy/lv6' },
  openGraph: {
    title: 'Lv6 · Agents & Skills — visionc Academy',
    description: 'Anthropic 백서 기반 Agent 설계 풀 커버.',
    url: 'https://visionc.co.kr/academy/lv6',
    siteName: 'Vision Solution',
    locale: 'ko_KR',
    type: 'website',
  },
}

const TOPICS = [
  { num: '01', title: '인트로', desc: '"한 번 응답"에서 "끝까지 처리"로' },
  { num: '02', title: '오늘 로드맵', desc: '4 블록 75분' },
  { num: '03', title: '원칙 1 · Workflow vs Agent', desc: 'Anthropic 정의 + 선택 기준' },
  { num: '04', title: '원칙 2 · 5 패턴 요약', desc: 'Chain·Route·Parallel·Orchestrator·Evaluator' },
  { num: '05', title: 'Chaining + Routing', desc: '게이트 검증 + 비용 효율' },
  { num: '06', title: 'Parallel + Orchestrator', desc: '속도·다중 관점·작업 분해' },
  { num: '07', title: 'Evaluator-Optimizer', desc: '품질 우선 작업 (번역·코드)' },
  { num: '08', title: '원칙 3 · Skills', desc: 'Reusable Capabilities' },
  { num: '09', title: '4 실전 Agent', desc: 'Support·Coder·Research·Operations' },
  { num: '10', title: '원칙 4 · 관찰 가능성', desc: 'Trace · 비용 가드 · 무한 루프 차단' },
  { num: '11', title: '원칙 5 · 쓰지 않을 때', desc: 'Anti-patterns + Anthropic 권장' },
  { num: '12', title: '다음 단계', desc: 'Lv7 Cloud · Lv8 Education 로드맵' },
]

export default function Lv6Page() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        <nav className="text-xs text-muted-foreground font-mono mb-6 tracking-wider">
          <Link href="/academy" className="hover:text-primary transition-colors">ACADEMY</Link>
          <span className="mx-2 text-border">·</span>
          <span className="text-primary">LV6 · ADVANCED</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-3">
            Lv6 · Advanced
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-5 leading-tight tracking-tight">
            Agents &amp; Skills
          </h1>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-full bg-primary/15 text-primary">⏱ 75분</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">12 슬라이드</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">5 패턴 + Skills</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">FREE</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-10 font-mono">
          출처 · <b className="text-foreground">Anthropic Building Effective Agents (2024.12)</b> 백서 풀 커버 + Skills 공식 문서
        </p>

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

        <AcademyDownloadClient />

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
