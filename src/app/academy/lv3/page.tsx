import type { Metadata } from 'next'
import Link from 'next/link'
import AcademyDownloadClient from './AcademyDownloadClient'

export const metadata: Metadata = {
  title: 'Lv3 · AI로 일하는 법 — visionc Academy',
  description: 'Anthropic AI Fluency 기반. 매일 30분으로 시작하는 직장인 실무 가이드. 5 원칙 + 4 부서 시나리오.',
  keywords: ['AI 실무', 'AI Fluency', 'Augmentation', '직장인 AI', '부서별 AI', 'visionc Academy Lv3'],
  alternates: { canonical: '/academy/lv3' },
  openGraph: {
    title: 'Lv3 · AI로 일하는 법 — visionc Academy',
    description: 'Anthropic AI Fluency 기반 직장인 실무 가이드 — 5 원칙 + 4 부서 시나리오.',
    url: 'https://visionc.co.kr/academy/lv3',
    siteName: 'Vision Solution',
    locale: 'ko_KR',
    type: 'website',
  },
}

const TOPICS = [
  { num: '01', title: '인트로', desc: '"AI로 일한다"는 진짜 무엇인가' },
  { num: '02', title: '오늘 로드맵', desc: '4 블록 75분 구성' },
  { num: '03', title: '원칙 1 · 증강 > 대체', desc: 'Anthropic Augmentation 철학' },
  { num: '04', title: '원칙 2 · 주간 4D 사이클', desc: 'Delegate·Describe·Discern·Diligence 응용' },
  { num: '05', title: '원칙 3 · Compounding', desc: '매일 30분 → 연 120시간' },
  { num: '06', title: '시나리오 1 · 영업·기획', desc: '이메일·제안서·미팅 자료' },
  { num: '07', title: '시나리오 2 · 관리자', desc: '회의록·요약·1:1 피드백' },
  { num: '08', title: '시나리오 3 · 마케팅·전략', desc: '리서치·콘텐츠·번역' },
  { num: '09', title: '시나리오 4 · 재무·운영', desc: '데이터 정리·보고서·자동화' },
  { num: '10', title: '원칙 4 · 보안 4원칙', desc: '고객정보·내부 데이터 다루는 법' },
  { num: '11', title: '원칙 5 · D4 Diligence', desc: '검증·환각·최종 결정 책임' },
  { num: '12', title: '다음 단계', desc: 'Lv4 코드 / Lv5 API·MCP 로드맵' },
]

export default function Lv3Page() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        <nav className="text-xs text-muted-foreground font-mono mb-6 tracking-wider">
          <Link href="/academy" className="hover:text-primary transition-colors">ACADEMY</Link>
          <span className="mx-2 text-border">·</span>
          <span className="text-primary">LV3 · PRACTICAL</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-3">
            Lv3 · Practical
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-5 leading-tight tracking-tight">
            AI로 일하는 법
          </h1>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-full bg-primary/15 text-primary">⏱ 75분</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">12 슬라이드</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">5 원칙 + 4 시나리오</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">FREE</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-10 font-mono">
          출처 · <b className="text-foreground">Anthropic AI Fluency</b> Communication + Augmentation 철학 기반 + 한국 중소기업 4개 부서 실무 보강
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
