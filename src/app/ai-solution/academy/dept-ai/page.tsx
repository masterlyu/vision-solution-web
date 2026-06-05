import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: '부서별로 일하는 AI — 중소기업 LLM 활용법 (15강) | Vision Solution',
  description: '중소기업 부서별 LLM 활용 완성 가이드. 영업·마케팅·생산·품질·설계·인사·회계까지 일상 업무 30% 시간 절감. 무료 5편 15강.',
  alternates: { canonical: '/ai-solution/academy/dept-ai' },
  openGraph: {
    title: '부서별로 일하는 AI — 중소기업 LLM 활용법 (15강)',
    description: '중소기업 부서별 LLM 활용 완성 가이드. 무료 5편 15강. 부서별 프롬프트 300+개 포함.',
    url: 'https://visionc.co.kr/ai-solution/academy/dept-ai',
    siteName: 'Vision Solution',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: '부서별로 일하는 AI' }],
    locale: 'ko_KR',
    type: 'website',
  },
}

const sections = [
  {
    title: '1편. 기반 다지기',
    desc: '전 직원 공통 — AI 도입의 첫걸음',
    lessons: [
      { id: '01', title: '우리 회사가 LLM으로 얻을 수 있는 것 — 도입 ROI 사례', dur: 14 },
      { id: '02', title: '프롬프트 기본기 + 데이터·기밀 보안 가이드라인', dur: 16 },
    ],
  },
  {
    title: '2편. 전 부서 공통 실전 활용',
    desc: '도입 첫 주에 효과 체감되는 가장 강력한 영역',
    lessons: [
      { id: '03', title: '문서 자동화 — 회의록·보고서·이메일·업무 일지', dur: 15 },
      { id: '04', title: '데이터·정보 처리 — 엑셀·PDF·매뉴얼 검색·뉴스 요약', dur: 14 },
      { id: '05', title: '해외 업무 지원 — 영문 메일·계약서·기술문서 번역·응대', dur: 13 },
    ],
  },
  {
    title: '3편. 코어 부서 — 업종별 적용',
    desc: '제조·유통·서비스·IT 사례 박스 포함',
    lessons: [
      { id: '06', title: '생산·운영 — SOP·일보·트러블슈팅', dur: 17 },
      { id: '07', title: '품질·검수 — 8D·5 Why·FMEA·클레임 분류', dur: 16 },
      { id: '08', title: '설계·기획 — 사양서·BOM·특허 RAG·변경 이력', dur: 18 },
      { id: '09', title: '구매·조달 — 견적 비교·계약 검토·단가 분석', dur: 14 },
    ],
  },
  {
    title: '4편. 지원 부서',
    desc: '모든 회사 공통 — 즉시 도입 가능',
    lessons: [
      { id: '10', title: '영업 — B2B 견적·제안서·CRM 응대', dur: 15 },
      { id: '11', title: '마케팅 — 카탈로그·콘텐츠·SEO', dur: 14 },
      { id: '12', title: '인사/총무 — 채용·교육·사규 Q&A', dur: 13 },
      { id: '13', title: '회계·CS — 거래 분류·세무·클레임 응대', dur: 14 },
    ],
  },
  {
    title: '5편. 수주형 비즈니스 통합 흐름',
    desc: '견적→설계→납품 전 과정을 AI로 통합',
    lessons: [
      { id: '14', title: '견적→설계→납품 통합 파이프라인', dur: 18 },
      { id: '15', title: '우리 회사 전용 AI 만들기 — Claude Projects 기초', dur: 16 },
    ],
  },
]

const totalLessons = sections.reduce((s, sec) => s + sec.lessons.length, 0)
const totalMins = sections.reduce((s, sec) => s + sec.lessons.reduce((a, l) => a + l.dur, 0), 0)

export default function DeptAiCourse() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-28 pb-12 px-6 bg-background" style={{ background: 'radial-gradient(ellipse at top right, color-mix(in oklch, var(--primary) 18%, transparent) 0%, var(--background) 60%)' }}>
        <div className="max-w-5xl mx-auto">
          <Link href="/ai-solution" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-6">
            <ArrowLeft className="w-4 h-4" /> 기업 AI 도입 및 컨설팅으로
          </Link>
          <div className="text-xs font-bold text-primary mb-3">COURSE 01 · 활용 트랙</div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight">
            부서별로 일하는 AI
          </h1>
          <p className="text-lg text-muted-foreground mb-6">중소기업 LLM 활용법 — 일반 직원·관리자 대상</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm bg-foreground/5 text-foreground px-3 py-1.5 rounded-full">📚 5편 {totalLessons}강</span>
            <span className="text-sm bg-foreground/5 text-foreground px-3 py-1.5 rounded-full">⏱ 약 {Math.round(totalMins/60*10)/10}시간</span>
            <span className="text-sm bg-foreground/5 text-foreground px-3 py-1.5 rounded-full">🎯 도입 30일 안에 시간 30% 절감</span>
            <span className="text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-full">무료 · 신용카드 불필요</span>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-background">
        <div className="max-w-5xl mx-auto space-y-8">
          {sections.map((sec, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border p-8">
              <h2 className="text-xl font-bold text-foreground mb-1">{sec.title}</h2>
              <p className="text-sm text-muted-foreground mb-5">{sec.desc}</p>
              <ul className="divide-y divide-border">
                {sec.lessons.map((l, j) => (
                  <li key={j} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-xs font-bold text-muted-foreground w-8 shrink-0">{l.id}</span>
                      <span className="text-foreground text-sm truncate">{l.title}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {l.dur}분</span>
                      <span className="text-xs bg-foreground/5 text-muted-foreground px-2 py-0.5 rounded-full">곧 공개</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">강좌 공개 알림 받기</h2>
          <p className="text-muted-foreground mb-8">1편(2강)부터 순차 공개됩니다. 공개 일정 알림과 도입 진단 1시간 무료 혜택을 함께 받으시려면 문의 주세요.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-xl transition-all">
            문의하기
          </Link>
        </div>
      </section>
    </div>
  )
}
