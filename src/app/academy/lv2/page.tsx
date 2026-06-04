import type { Metadata } from 'next'
import Link from 'next/link'
import AcademyDownloadClient from './AcademyDownloadClient'

export const metadata: Metadata = {
  title: 'Lv2 · Claude 마스터 — visionc Academy',
  description: 'Anthropic 공식 Claude 101 풀버전. Projects · Artifacts · Skills · Tools 풀 커버. 시험 통과 가이드 포함.',
  keywords: ['Claude 101', 'Claude 마스터', 'Anthropic', 'Projects', 'Artifacts', 'Skills', 'visionc Academy Lv2'],
  alternates: { canonical: '/academy/lv2' },
  openGraph: {
    title: 'Lv2 · Claude 마스터 — visionc Academy',
    description: 'Anthropic 공식 Claude 101 풀버전 — 시험 통과 가이드.',
    url: 'https://visionc.co.kr/academy/lv2',
    siteName: 'Vision Solution',
    locale: 'ko_KR',
    type: 'website',
  },
}

const TOPICS = [
  { num: '01', title: '인트로', desc: 'Claude 마스터 학습 약속' },
  { num: '02', title: '오늘 로드맵', desc: '5개 모듈 75분' },
  { num: '03', title: 'Claude는 무엇인가', desc: 'Anthropic · 모델 · 안전성' },
  { num: '04', title: '첫 대화', desc: '채팅 인터페이스 마스터' },
  { num: '05', title: '좋은 결과', desc: 'Claude 특화 프롬프트 4기법' },
  { num: '06', title: '데스크탑 3 모드', desc: 'Chat · Cowork · Code' },
  { num: '07', title: 'Projects', desc: '지속 컨텍스트' },
  { num: '08', title: 'Artifacts', desc: '실시간 실물 결과' },
  { num: '09', title: 'Skills', desc: '반복 작업 자동화' },
  { num: '10', title: 'Tools · Search · Research', desc: '외부 세계와 연결' },
  { num: '11', title: '역할별 활용', desc: '기획·디자인·개발·마케팅' },
  { num: '12', title: '인증서 + 다음 단계', desc: 'Claude 101 시험 가이드' },
]

export default function Lv2Page() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        <nav className="text-xs text-muted-foreground font-mono mb-6 tracking-wider">
          <Link href="/academy" className="hover:text-primary transition-colors">ACADEMY</Link>
          <span className="mx-2 text-border">·</span>
          <span className="text-primary">LV2 · MASTER</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-3">
            Lv2 · Master
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-5 leading-tight tracking-tight">
            Claude 마스터
          </h1>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-full bg-primary/15 text-primary">⏱ 75분</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">12 슬라이드</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">Claude 101 시험 통과</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">FREE</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-10 font-mono">
          출처 · <b className="text-foreground">Anthropic 공식 Claude 101</b> 5개 모듈 풀 커버 (Skilljar)
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
