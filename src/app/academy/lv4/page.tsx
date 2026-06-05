import type { Metadata } from 'next'
import Link from 'next/link'
import AcademyDownloadClient from './AcademyDownloadClient'

export const metadata: Metadata = {
  title: 'Lv4 · Claude Code 입문 — visionc Academy',
  description: 'Anthropic Claude Code 101 + Claude Code in Action 한국어판. IT가 아니어도 터미널 첫걸음.',
  keywords: ['Claude Code', 'Agentic Coding', 'Anthropic', 'AI 자동화', 'CLI', 'visionc Academy Lv4'],
  alternates: { canonical: '/academy/lv4' },
  openGraph: {
    title: 'Lv4 · Claude Code 입문 — visionc Academy',
    description: 'Anthropic Claude Code 101 + Claude Code in Action 풀 커버.',
    url: 'https://visionc.co.kr/academy/lv4',
    siteName: 'Vision Solution',
    locale: 'ko_KR',
    type: 'website',
  },
}

const TOPICS = [
  { num: '01', title: '인트로', desc: '"AI 동료"가 컴퓨터에 살게 되는 시대' },
  { num: '02', title: '오늘 로드맵', desc: '4 블록 75분 구성' },
  { num: '03', title: '원칙 1 · Agentic Coding', desc: 'Anthropic이 만든 새 카테고리' },
  { num: '04', title: '원칙 2 · 왜 터미널인가', desc: '파일·도구·보안의 강력한 손' },
  { num: '05', title: '설치 + 첫 명령', desc: '5분 만에 실전 가능' },
  { num: '06', title: '필수 명령 10개', desc: '/init · /clear · /cost · CLAUDE.md' },
  { num: '07', title: '시나리오 1 · 보고서 자동화', desc: 'cron + Claude로 매주 자동' },
  { num: '08', title: '시나리오 2 · 데이터 정리', desc: '엑셀·PDF·이메일 분류·영수증' },
  { num: '09', title: '시나리오 3 · 로컬 웹앱', desc: '외주 견적 500만 → $20' },
  { num: '10', title: '원칙 3 · 권한 모델', desc: '3 레이어 안전망' },
  { num: '11', title: '원칙 4 · 감사·로그', desc: 'Git revert + /cost' },
  { num: '12', title: '다음 단계', desc: 'Lv5 API·MCP / Lv6 Agents 로드맵' },
]

export default function Lv4Page() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        <nav className="text-xs text-muted-foreground font-mono mb-6 tracking-wider">
          <Link href="/academy" className="hover:text-primary transition-colors">ACADEMY</Link>
          <span className="mx-2 text-border">·</span>
          <span className="text-primary">LV4 · CODING</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-3">
            Lv4 · Coding
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-5 leading-tight tracking-tight">
            Claude Code 입문
          </h1>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-full bg-primary/15 text-primary">⏱ 75분</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">12 슬라이드</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">Agentic Coding</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">FREE</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-10 font-mono">
          출처 · <b className="text-foreground">Anthropic Claude Code 101 + Claude Code in Action</b> 공식 풀 커버 + 한국 중소기업 4 시나리오
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
