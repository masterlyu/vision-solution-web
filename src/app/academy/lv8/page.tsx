import type { Metadata } from 'next'
import Link from 'next/link'
import AcademyDownloadClient from './AcademyDownloadClient'

export const metadata: Metadata = {
  title: 'Lv8 · AI 시대 교육의 철학 — visionc Academy',
  description: '교사·강사·학생·학부모를 위한 통합 강좌. Harari·Dewey·Freire·Vygotsky 사상 + Anthropic 원리 + 실무 프롬프트. 45슬라이드 4~5시간.',
  keywords: ['AI 교육', '교사 AI', 'AI 시대 교육 철학', 'Harari 교육', 'Dewey AI', '교사 연수', 'visionc Academy Lv8'],
  alternates: { canonical: '/academy/lv8' },
  openGraph: {
    title: 'Lv8 · AI 시대 교육의 철학 — visionc Academy',
    description: '원리·철학·실무를 잇다. 교사·학생·학부모 통합 강좌 45슬라이드.',
    url: 'https://visionc.co.kr/academy/lv8',
    siteName: 'Vision Solution',
    locale: 'ko_KR',
    type: 'website',
  },
}

const BLOCKS = [
  {
    name: 'Block A · 거시 관점',
    desc: '60분 · 10 슬라이드',
    topics: [
      { num: '01', title: '인트로', desc: '4년 만의 인류적 변화' },
      { num: '02', title: '오늘 로드맵', desc: '5 블록 4~5시간' },
      { num: '03', title: 'AI 기술 타임라인', desc: '2017→2030' },
      { num: '04', title: 'Harari 1 · Nexus', desc: 'AI = 외계 지능' },
      { num: '05', title: 'Harari 2 · 21 Lessons', desc: '학교 80% 위기' },
      { num: '06', title: 'Harari 3 · Homo Deus', desc: '데이터교·자유의지' },
      { num: '07', title: 'Harari 4 · Sapiens', desc: '허구 생산 비용 0' },
      { num: '08', title: 'Anthropic 철학', desc: 'Safety·Augment·CAI' },
      { num: '09', title: '★ 원리 1 · Transformer', desc: '귤 비유로 직관' },
      { num: '10', title: '★ 원리 2 · 환각·정렬·CAI', desc: '학습 4단계' },
    ],
  },
  {
    name: 'Block B · 교육의 본질',
    desc: '60분 · 10 슬라이드',
    topics: [
      { num: '11', title: 'Dewey 1938', desc: '교육 = 삶 자체' },
      { num: '12', title: 'Freire 1968', desc: '함께 질문하는 사람' },
      { num: '13', title: 'Vygotsky · ZPD', desc: 'AI = 24h 동반자' },
      { num: '14', title: 'Gardner 8지능', desc: 'AI vs 사람 영역' },
      { num: '15', title: 'Dweck · Growth Mindset', desc: 'AI 시대 신종 Fixed' },
      { num: '16', title: 'Bloom × AI 매트릭스', desc: '⑤⑥이 교육의 미래' },
      { num: '17', title: '4C 재정의', desc: 'Critical 1순위' },
      { num: '18', title: '메타 학습', desc: 'Learning How to Learn' },
      { num: '19', title: 'AI 못하는 3 영역', desc: '정체성·감정·관계' },
      { num: '20', title: '통합 명제', desc: '교육 정의의 재작성' },
    ],
  },
  {
    name: 'Block C · 교사 실무',
    desc: '60분 · 10 슬라이드',
    topics: [
      { num: '21', title: '교사 4 모드', desc: 'Tutor·Coach·Researcher·Co-creator' },
      { num: '22', title: '수업 준비 자동화', desc: '주 24h → 7h' },
      { num: '23', title: '수업 중 AI', desc: '30명 30가지 학습' },
      { num: '24', title: '평가의 위기', desc: '이 시험은 무엇이었나' },
      { num: '25', title: '새 평가 4종', desc: '과정·메타인지·협업·윤리' },
      { num: '26', title: '채점 자동화', desc: '200명 37h → 7h' },
      { num: '27', title: '학부모 보고·상담', desc: '다국어 + 진단' },
      { num: '28', title: '교사용 RAG', desc: '학원비 0' },
      { num: '29', title: '한국 교육 정책 2026', desc: 'AIDT·시도교육청' },
      { num: '30', title: '교사 윤리 4 기둥', desc: '데이터·평등·공정·의존' },
    ],
  },
  {
    name: 'Block D · 학생 실무',
    desc: '60분 · 10 슬라이드',
    topics: [
      { num: '31', title: '학생 현실', desc: '87% 매주 AI · 62% 베끼기' },
      { num: '32', title: '좋고 나쁨 매트릭스', desc: 'Bloom 단계별' },
      { num: '33', title: '학생용 4D', desc: 'Delegate·Describe·Discern·Diligence' },
      { num: '34', title: '개인 Tutor 활용', desc: '답 말고 힌트' },
      { num: '35', title: '탐구·리서치', desc: '출처 검증 4단계' },
      { num: '36', title: '글쓰기·논술', desc: '내 생각 %가 70% 이상' },
      { num: '37', title: '코딩·프로젝트', desc: '문제 정의가 더 중요' },
      { num: '38', title: '학생 윤리 자가 진단', desc: '4 질문' },
      { num: '39', title: '부모를 위한 가이드', desc: '의존 신호 5가지' },
      { num: '40', title: '평생 학습 로드맵', desc: 'Lv1~Lv7' },
    ],
  },
  {
    name: 'Block E · 미래와 결단',
    desc: '30분 · 5 슬라이드',
    topics: [
      { num: '41', title: '다음 4년', desc: 'Agentic·Embodied·BCI' },
      { num: '42', title: '한국 교육 분기점', desc: '입시·평등·교사·사교육' },
      { num: '43', title: '교사 4 시나리오', desc: '대체·분화·증강·재정의' },
      { num: '44', title: '토론 주제 8선', desc: '2개월 토론 캘린더' },
      { num: '45', title: '마무리', desc: '교육의 본질로의 회귀' },
    ],
  },
]

export default function Lv8Page() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        <nav className="text-xs text-muted-foreground font-mono mb-6 tracking-wider">
          <Link href="/academy" className="hover:text-primary transition-colors">ACADEMY</Link>
          <span className="mx-2 text-border">·</span>
          <span className="text-primary">LV8 · EDUCATION</span>
        </nav>

        <div className="mb-10">
          <p className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-3">
            Lv8 · Education
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-5 leading-tight tracking-tight">
            AI 시대 교육의 철학
          </h1>
          <p className="text-lg text-muted-foreground mb-5 leading-snug">
            원리·철학·실무를 잇다 — 교사·강사·학생·학부모·교육 행정가 통합 강좌
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-full bg-primary/15 text-primary">⏱ 4~5시간</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">45 슬라이드</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">5 블록</span>
            <span className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground">FREE</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-10 font-mono">
          출처 · <b className="text-foreground">Harari + Dewey + Freire + Vygotsky + Anthropic + 김누리·이오덕·김상봉</b> 통합 설계 (B 융합 — 철학·원리·실무 3축)
        </p>

        <div className="mb-12 space-y-8">
          <h2 className="text-xl md:text-2xl font-black text-foreground tracking-tight">강의 목차 — 5 블록 45 슬라이드</h2>
          {BLOCKS.map((blk) => (
            <div key={blk.name}>
              <div className="flex items-baseline justify-between mb-4 pb-2 border-b-2 border-primary/50">
                <h3 className="text-base font-extrabold text-primary tracking-tight">{blk.name}</h3>
                <span className="text-xs font-mono text-muted-foreground">{blk.desc}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {blk.topics.map((t) => (
                  <div key={t.num} className="flex items-start gap-4 p-4 rounded-2xl border-2 border-foreground/15 bg-card hover:border-primary/50 transition-colors">
                    <span className="text-xs font-mono font-bold text-primary mt-1 tracking-wider">{t.num}</span>
                    <div>
                      <h4 className="text-base font-bold text-foreground tracking-tight">{t.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <AcademyDownloadClient />

        <div className="mt-10 text-xs text-muted-foreground leading-relaxed font-mono">
          · 사상가 인용 14명 (Harari 4편 + Dewey + Freire + Vygotsky + Gardner + Dweck + Bloom + Anthropic + 김누리 + 이오덕 + 김상봉 + 정여울 + 채사장 + 이혜정)<br />
          · 핵심 비유 50+ · 실전 프롬프트 90+ · 토론 주제 8선 + 2개월 토론 캘린더<br />
          · 각 슬라이드 노트 구조: 핵심 개념 · 강의 멘트 · 사례·비유 · 실전 프롬프트 · 토론 질문 · 시간 배분 · 3관점(교사·학생·학부모)
        </div>
      </div>
    </div>
  )
}
