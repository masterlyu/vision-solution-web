import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Mascot from '@/components/Mascot'
import AcademyDownloadClient from './AcademyDownloadClient'

export const metadata: Metadata = {
  title: 'Lv1 · 기초 AI 상식 — visionc Academy',
  description: '모든 AI에 통하는 사용 원칙 4D 프레임워크. Rick Dakan + Joseph Feller 공동 개발, Anthropic 공식 채택. PPT 슬라이드 무료 다운로드.',
  keywords: ['AI 기초', '4D Framework', 'AI Fluency', 'Claude 사용법', 'ChatGPT 활용', 'visionc Academy Lv1'],
  alternates: { canonical: '/academy/lv1' },
  openGraph: {
    title: 'Lv1 · 기초 AI 상식 — visionc Academy',
    description: 'Rick Dakan + Joseph Feller 공동 개발, Anthropic 공식 채택의 4D 프레임워크.',
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

        {/* Hero */}
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 items-center mb-16">
          <div>
            <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-4">
              Lv1 · Foundation
            </p>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight tracking-tight">
              기초 AI 상식
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
              모든 AI에 통하는 사용 원칙 — <b className="text-foreground">4D 프레임워크</b>
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-full bg-primary/15 text-primary">⏱ 60분</span>
              <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">11 슬라이드</span>
              <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">초보자 OK</span>
              <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">FREE</span>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <Mascot pose="intro" category="situation" size="lg" className="h-72 w-auto" alt="Lv1 마스코트" />
          </div>
        </div>

        {/* Authority */}
        <div className="rounded-3xl border border-border bg-card p-7 mb-12">
          <p className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-primary mb-3">Source · 학술 출처</p>
          <p className="text-base md:text-lg text-foreground leading-relaxed">
            본 강의는 <b className="text-primary">Rick Dakan 교수</b>(Ringling College of Art and Design)와 <b className="text-primary">Joseph Feller 교수</b>(University College Cork)가 공동 개발한 <b>AI Fluency 4D Framework</b>를 기반으로 합니다. <b>Anthropic이 공식 채택</b>하여 전 세계 대학·기업의 표준 교육 자료로 사용 중입니다.
          </p>
        </div>

        {/* Topics */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6 tracking-tight">강의 목차</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TOPICS.map((t) => (
              <div key={t.num} className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors">
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

        {/* What you learn */}
        <div className="mt-14 rounded-3xl border border-border bg-card p-8 md:p-10">
          <p className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[var(--accent-cyan-text)] mb-3">Outcomes</p>
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6 tracking-tight">이 강의 듣고 나면</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-2xl mb-2">🎯</p>
              <h3 className="font-bold text-foreground mb-2">어떤 AI든 자신 있게</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Claude·ChatGPT·Gemini·Perplexity 중 무엇을 만나도 통하는 사용 원칙을 익힙니다.</p>
            </div>
            <div>
              <p className="text-2xl mb-2">✍️</p>
              <h3 className="font-bold text-foreground mb-2">좋은 결과 얻는 지시문</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">역할·맥락·작업·형식 4요소를 활용해 1분 안에 효과적인 프롬프트 작성.</p>
            </div>
            <div>
              <p className="text-2xl mb-2">🔎</p>
              <h3 className="font-bold text-foreground mb-2">AI 실수 알아채는 눈</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">할루시네이션·편향·맥락 오류를 검증하는 3단계 점검 기법.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
          >
            ← 전체 코스 로드맵 보기
          </Link>
        </div>
      </div>
    </div>
  )
}
