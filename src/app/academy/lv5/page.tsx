import type { Metadata } from 'next'
import Link from 'next/link'
import AcademyDownloadClient from './AcademyDownloadClient'

export const metadata: Metadata = {
  title: 'Lv5 · AI 앱 만들기 (API & MCP) — visionc Academy',
  description: 'Anthropic Claude API + Model Context Protocol 실전. 회사 시스템 연결, 캐싱 70% 절약, 자체 MCP 서버.',
  keywords: ['Claude API', 'MCP', 'Model Context Protocol', 'Prompt Caching', 'Batch API', 'visionc Academy Lv5'],
  alternates: { canonical: '/academy/lv5' },
  openGraph: {
    title: 'Lv5 · AI 앱 만들기 — visionc Academy',
    description: 'Claude API + MCP 실전 — 사내 시스템 연결 + 운영 모범.',
    url: 'https://visionc.co.kr/academy/lv5',
    siteName: 'Vision Solution',
    locale: 'ko_KR',
    type: 'website',
  },
}

const TOPICS = [
  { num: '01', title: '인트로', desc: '"AI 챗봇"에서 "AI 앱"으로' },
  { num: '02', title: '오늘 로드맵', desc: '4 블록 75분 구성' },
  { num: '03', title: '원칙 1 · API ≠ 챗봇', desc: '비용·확장·통합 차이' },
  { num: '04', title: '원칙 2 · MCP', desc: 'USB-C for AI · 표준 프로토콜' },
  { num: '05', title: 'SDK 첫 호출', desc: 'Python 6줄로 시작' },
  { num: '06', title: '비용 절약 — 캐싱', desc: 'Prompt Caching 70% ↓' },
  { num: '07', title: '시나리오 1 · 사내 시스템', desc: 'ERP·그룹웨어·CRM 연결' },
  { num: '08', title: '시나리오 2 · 고객 응대', desc: '사이트·이메일·음성' },
  { num: '09', title: '시나리오 3 · 콘텐츠 대량', desc: 'Batch API + 다국어 + Vision' },
  { num: '10', title: '시나리오 4 · 자체 MCP', desc: 'Python 100줄로 사내 표준' },
  { num: '11', title: '원칙 3 · 운영 모범', desc: 'Rate limit · Observability · Fallback' },
  { num: '12', title: '다음 단계', desc: 'Lv6 Agents / Lv7 Cloud 로드맵' },
]

export default function Lv5Page() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        <nav className="text-xs text-muted-foreground font-mono mb-6 tracking-wider">
          <Link href="/academy" className="hover:text-primary transition-colors">ACADEMY</Link>
          <span className="mx-2 text-border">·</span>
          <span className="text-primary">LV5 · API &amp; MCP</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-3">
            Lv5 · API &amp; MCP
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-5 leading-tight tracking-tight">
            AI 앱 만들기
          </h1>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-full bg-primary/15 text-primary">⏱ 75분</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">12 슬라이드</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">API + MCP 실전</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">FREE</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-10 font-mono">
          출처 · <b className="text-foreground">Anthropic Building with Claude API + Model Context Protocol</b> 공식 풀 커버 + 한국 중소기업 4 시나리오
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
