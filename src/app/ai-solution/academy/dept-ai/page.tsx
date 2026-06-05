import type { Metadata } from 'next'
import Link from 'next/link'
import SectionCard from './SectionCard'

export const metadata: Metadata = {
  title: 'Course 01 · 부서별로 일하는 AI — visionc Enterprise',
  description: '사내 출강 강좌. 중소기업 부서별 LLM 활용법 (5편 15강). 영업·마케팅·생산·품질·설계·인사·회계 부서별 일상 업무 30% 시간 절감.',
  keywords: ['기업 AI 도입', '사내 AI 강좌', '부서별 AI 활용', 'LLM 사내 출강', '중소기업 AI 교육'],
  alternates: { canonical: '/ai-solution/academy/dept-ai' },
  openGraph: {
    title: 'Course 01 · 부서별로 일하는 AI',
    description: '사내 출강 강좌. 중소기업 부서별 LLM 활용법 (5편 15강).',
    url: 'https://visionc.co.kr/ai-solution/academy/dept-ai',
    siteName: 'Vision Solution',
    locale: 'ko_KR',
    type: 'website',
  },
}

type Lesson = [string, string]
type Section = {
  part: string
  title: string
  desc: string
  lessons: Lesson[]
  ready: boolean
  slidesKey?: string
  notesKey?: string
}

const SECTIONS: Section[] = [
  {
    part: '1편',
    title: '기반 다지기',
    desc: '전 직원 공통 — AI 도입의 첫걸음',
    lessons: [
      ['01', '우리 회사가 LLM으로 얻을 수 있는 것 — 도입 ROI 사례'],
      ['02', '프롬프트 기본기 + 데이터·기밀 보안 가이드라인'],
    ],
    ready: true,
    slidesKey: 'dept-ai-part1-slides',
    notesKey: 'dept-ai-part1-speaker-notes',
  },
  {
    part: '2편',
    title: '전 부서 공통 실전 활용',
    desc: '도입 첫 주에 효과 체감되는 영역',
    lessons: [
      ['03', '문서 자동화 — 회의록·보고서·이메일·업무 일지'],
      ['04', '데이터·정보 처리 — 엑셀·PDF·매뉴얼 검색·뉴스 요약'],
      ['05', '해외 업무 지원 — 영문 메일·계약서·기술문서 번역·응대'],
    ],
    ready: false,
  },
  {
    part: '3편',
    title: '코어 부서 — 업종별 적용',
    desc: '제조·유통·서비스·IT 사례 박스 포함',
    lessons: [
      ['06', '생산·운영 — SOP·일보·트러블슈팅'],
      ['07', '품질·검수 — 8D·5 Why·FMEA·클레임 분류'],
      ['08', '설계·기획 — 사양서·BOM·특허 RAG·변경 이력'],
      ['09', '구매·조달 — 견적 비교·계약 검토·단가 분석'],
    ],
    ready: false,
  },
  {
    part: '4편',
    title: '지원 부서',
    desc: '모든 회사 공통 — 즉시 도입 가능',
    lessons: [
      ['10', '영업 — B2B 견적·제안서·CRM 응대'],
      ['11', '마케팅 — 카탈로그·콘텐츠·SEO'],
      ['12', '인사/총무 — 채용·교육·사규 Q&A'],
      ['13', '회계·CS — 거래 분류·세무·클레임 응대'],
    ],
    ready: false,
  },
  {
    part: '5편',
    title: '수주형 비즈니스 통합 흐름',
    desc: '견적→설계→납품 전 과정 AI 통합',
    lessons: [
      ['14', '견적→설계→납품 통합 파이프라인'],
      ['15', '우리 회사 전용 AI 만들기 — Claude Projects 기초'],
    ],
    ready: false,
  },
]

const totalLessons = SECTIONS.reduce((s, sec) => s + sec.lessons.length, 0)
const readyLessons = SECTIONS.filter((s) => s.ready).reduce((s, sec) => s + sec.lessons.length, 0)

export default function DeptAiCourse() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        {/* Breadcrumb */}
        <nav className="text-sm text-foreground/85 font-mono font-medium mb-6 tracking-wider">
          <Link href="/ai-solution" className="hover:text-primary transition-colors">ENTERPRISE</Link>
          <span className="mx-2 text-foreground/40">·</span>
          <span className="text-primary font-bold">COURSE 01 · DEPARTMENT AI</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <p className="text-sm font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-3">
            Course 01 · Department AI
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-5 leading-tight tracking-tight">
            부서별로 일하는 AI
          </h1>
          <p className="text-lg text-foreground/90 font-medium mb-5 max-w-2xl">
            중소기업 LLM 활용법 — 일반 직원·관리자 대상
          </p>
          <div className="flex flex-wrap gap-2 text-sm font-mono font-bold">
            <span className="px-3 py-1.5 rounded-full bg-primary/20 text-primary">⏱ 약 4시간</span>
            <span className="px-3 py-1.5 rounded-full bg-foreground/10 text-foreground">5편 {totalLessons}강</span>
            <span className="px-3 py-1.5 rounded-full bg-foreground/10 text-foreground">사내 출강</span>
            <span className="px-3 py-1.5 rounded-full bg-[var(--accent-green-text)]/20 text-[var(--accent-green-text)]">자료 공개: {readyLessons}/{totalLessons}강</span>
          </div>
        </div>

        {/* Authority */}
        <p className="text-base text-foreground/85 font-medium mb-12 font-mono">
          기획 · <b className="text-foreground font-black">visionc</b> · 중소기업 도입 사례 + Anthropic Skilljar 한글화 기반
        </p>

        {/* Curriculum — 편별 카드 + 편별 다운로드 (토글) */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6 tracking-tight">전체 커리큘럼</h2>
          <p className="text-base text-foreground/85 font-medium mb-6">
            자료가 공개된 편(<span className="text-[var(--accent-green-text)] font-bold">📥 자료 공개</span>)은 클릭하면 다운로드가 펼쳐집니다.
          </p>
          <div className="space-y-6">
            {SECTIONS.map((sec) => (
              <SectionCard
                key={sec.part}
                part={sec.part}
                title={sec.title}
                desc={sec.desc}
                lessons={sec.lessons}
                ready={sec.ready}
                slidesKey={sec.slidesKey}
                notesKey={sec.notesKey}
              />
            ))}
          </div>
        </div>

        {/* Bottom — back link */}
        <div className="mt-12 text-center">
          <Link href="/ai-solution" className="inline-flex items-center gap-1 text-base font-bold text-foreground hover:text-primary transition-colors font-mono">
            ← 기업 AI 도입 및 컨설팅으로
          </Link>
        </div>
      </div>
    </div>
  )
}
