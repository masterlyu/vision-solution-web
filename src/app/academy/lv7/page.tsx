import type { Metadata } from 'next'
import Link from 'next/link'
import AcademyDownloadClient from './AcademyDownloadClient'

export const metadata: Metadata = {
  title: 'Lv7 · 클라우드 AI (Enterprise) — visionc Academy',
  description: 'AWS Bedrock · GCP Vertex · Azure AI에서 Claude 대규모 운영. 한국 컴플라이언스·KISA·금감원·CSAP 보강.',
  keywords: ['AWS Bedrock', 'Vertex AI', 'Azure AI', 'KISA CSAP', 'Claude Enterprise', 'visionc Academy Lv7'],
  alternates: { canonical: '/academy/lv7' },
  openGraph: {
    title: 'Lv7 · 클라우드 AI — visionc Academy',
    description: 'AWS·GCP·Azure에서 Claude 운영 + 한국 컴플라이언스.',
    url: 'https://visionc.co.kr/academy/lv7',
    siteName: 'Vision Solution',
    locale: 'ko_KR',
    type: 'website',
  },
}

const TOPICS = [
  { num: '01', title: '인트로', desc: '전사 규모 Claude 운영' },
  { num: '02', title: '오늘 로드맵', desc: '4 블록 75분' },
  { num: '03', title: '원칙 1 · 왜 클라우드', desc: 'Standard API vs 클라우드 차이' },
  { num: '04', title: '원칙 2 · 3대 클라우드 비교', desc: 'AWS·GCP·Azure 매트릭스' },
  { num: '05', title: '원칙 3 · 선택 가이드', desc: '4 질문 의사결정 트리' },
  { num: '06', title: '한국 운영 모범', desc: '서울 리전·VPC·KMS·감사 4중망' },
  { num: '07', title: '엔터프라이즈 패턴', desc: 'Multi-Tenant·Failover·Hybrid·Cost' },
  { num: '08', title: '한국 규제 대응', desc: '금감원·개인정보·의료·정부' },
  { num: '09', title: '원칙 4 · 모니터링', desc: '사용·비용·이상·감사' },
  { num: '10', title: '원칙 5 · 거버넌스', desc: '정책·교육·책임·감사' },
  { num: '11', title: '원칙 6 · 미래 트렌드', desc: '온프레미스·한국 모델·Edge' },
  { num: '12', title: '마무리', desc: 'Lv1~7 완주 + 다음 행보' },
]

export default function Lv7Page() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        <nav className="text-xs text-muted-foreground font-mono mb-6 tracking-wider">
          <Link href="/academy" className="hover:text-primary transition-colors">ACADEMY</Link>
          <span className="mx-2 text-border">·</span>
          <span className="text-primary">LV7 · ENTERPRISE</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-3">
            Lv7 · Enterprise
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-5 leading-tight tracking-tight">
            클라우드 AI
          </h1>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-full bg-primary/15 text-primary">⏱ 75분</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">12 슬라이드</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">AWS·GCP·Azure</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">FREE</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-10 font-mono">
          출처 · <b className="text-foreground">Anthropic + AWS Bedrock + GCP Vertex + Azure AI</b> 공식 문서 (C 하이브리드 — 한국 컴플라이언스·CSAP·금감원 보강)
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
