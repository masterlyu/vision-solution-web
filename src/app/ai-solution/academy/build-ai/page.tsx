import type { Metadata } from 'next'
import Link from 'next/link'
import SectionCard from './SectionCard'

export const metadata: Metadata = {
  title: 'Course 02 · 사내 AI 구축·운영 종합 가이드 — visionc Enterprise',
  description: '사내 출강 강좌. IT 담당자·관리자 대상 자체 호스팅·에이전트·하네스·보안·관리자 운영 (11편 30강). 90일 안에 사내 AI 인프라 1차 가동.',
  keywords: ['사내 AI 구축', 'LLM 자체 호스팅', 'Claude Code 기업', '자율 에이전트', '하네스 엔지니어링', 'Open WebUI', 'RAG', 'MCP'],
  alternates: { canonical: '/ai-solution/academy/build-ai' },
  openGraph: {
    title: 'Course 02 · 사내 AI 구축·운영 종합 가이드',
    description: '사내 출강 강좌. 자체 호스팅·에이전트·보안·운영 (11편 30강).',
    url: 'https://visionc.co.kr/ai-solution/academy/build-ai',
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
  star?: boolean
  ready: boolean
  slidesKey?: string
  notesKey?: string
  lessons: Lesson[]
}

const SECTIONS: Section[] = [
  { part: '1편', title: '의사결정', desc: '도입 전 비교·로드맵', ready: true,
    slidesKey: 'build-ai-part1-slides', notesKey: 'build-ai-part1-speaker-notes',
    lessons: [['01', '클라우드 API vs 온프레미스 — 규모별 손익분기점'], ['02', '단계별 도입 로드맵 — 6/12/24개월']] },
  { part: '2편', title: '인프라', desc: '서버·OS·네트워크', ready: true,
    slidesKey: 'build-ai-part2-slides', notesKey: 'build-ai-part2-speaker-notes',
    lessons: [['03', '하드웨어 — GPU 선택, 미니PC/워크스테이션/서버'], ['04', 'OS·드라이버·컨테이너 — Ubuntu·NVIDIA·Docker'], ['05', '네트워크·보안 — 사내망 격리, Reverse Proxy, mTLS']] },
  { part: '3편', title: '모델·추론 엔진', desc: '무료 LLM·한국어·양자화', ready: true,
    slidesKey: 'build-ai-part3-slides', notesKey: 'build-ai-part3-speaker-notes',
    lessons: [['06', '무료 LLM 비교 — Llama, Qwen, Mistral, DeepSeek, GPT-OSS'], ['07', '한국어 특화 — Solar, EXAONE, KULLM, Bllossom'], ['08', '추론 엔진 — Ollama, vLLM, llama.cpp, TGI + 양자화']] },
  { part: '4편', title: '챗봇·RAG 플랫폼', desc: '사내 직원이 매일 쓰는 UI', ready: true,
    slidesKey: 'build-ai-part4-slides', notesKey: 'build-ai-part4-speaker-notes',
    lessons: [['09', '사내 챗봇 UI — Open WebUI, Dify, LibreChat, AnythingLLM'], ['10', 'RAG — LlamaIndex, Qdrant, 사내 문서 학습'], ['11', 'MCP — ERP·메일·CAD·문서 시스템 연결']] },
  { part: '5편', title: '에이전트 기초·생태계', desc: '자율 에이전트 핵심', star: true, ready: false,
    lessons: [['12', '에이전트란 무엇인가 — 챗봇과의 차이, 4요소'], ['13', '공식 에이전트 Claude Code — 권한·슬래시 커맨드'], ['14', '오픈 에이전트 총망라 — OpenCode, Cline, Aider, Roo Code']] },
  { part: '6편', title: '하네스 엔지니어링', desc: '회사 정책을 코드로 자동 적용', star: true, ready: false,
    lessons: [['15', 'settings.json — 권한·환경변수·모델·토큰 한도'], ['16', 'Hooks — PreToolUse/PostToolUse로 정책 자동 적용'], ['17', 'Skills·Slash Commands·MCP — 부서 도메인 지식 패키징']] },
  { part: '7편', title: '사내 에이전트 배포·운영', desc: '직원 전체에게 안전하게 배포', star: true, ready: false,
    lessons: [['18', '부서별 권한 매트릭스 — 영업/설계/생산 도구·데이터 격리'], ['19', '위험 차단 안전장치 — 위험 명령 차단·비용 한도'], ['20', '에이전트 백업·감사 — 변경 로깅·스냅샷·롤백'], ['21', '사내 에이전트 카탈로그 — 부서별 봇 마켓플레이스']] },
  { part: '8편', title: '자체 에이전트 만들기', desc: '회사 전용 에이전트 개발', ready: false,
    lessons: [['22', 'Claude Agent SDK 기본 — Tool, Memory'], ['23', '실전 — 견적 자동화 에이전트 (메일→사양→BOM→견적서)']] },
  { part: '9편', title: '보안·권한·감사', desc: '엔터프라이즈급 보안', ready: false,
    lessons: [['24', '데이터 보안 — 분류, PII 마스킹, 데이터 격리'], ['25', 'LLM 보안 — 프롬프트 인젝션·데이터 유출·탈옥 방지'], ['26', '키 관리·감사 — Vault·sops·ELK/Grafana']] },
  { part: '10편', title: '백업·재해 복구', desc: '운영 안정성', ready: false,
    lessons: [['27', '백업 — RAG DB·대화 이력·모델·Git'], ['28', 'DR 시나리오 — 정전·장애·랜섬웨어·RPO/RTO']] },
  { part: '11편', title: '관리자 운영·효용성·최적화', desc: '도입 후 운영·Fine-tuning', ready: false,
    lessons: [['29', '권한·온보딩·KPI — RBAC, SSO, ROI 대시보드'], ['30', 'Fine-tuning·비용 모니터링 — LoRA·QLoRA·Unsloth']] },
]

const totalLessons = SECTIONS.reduce((s, sec) => s + sec.lessons.length, 0)
const readyCount = SECTIONS.filter((s) => s.ready).reduce((s, sec) => s + sec.lessons.length, 0)

export default function BuildAiCourse() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">

        {/* Breadcrumb */}
        <nav className="text-sm text-foreground/85 font-mono font-medium mb-6 tracking-wider">
          <Link href="/ai-solution" className="hover:text-primary transition-colors">ENTERPRISE</Link>
          <span className="mx-2 text-foreground/40">·</span>
          <span className="text-primary font-bold">COURSE 02 · BUILD AI</span>
        </nav>

        {/* Hero */}
        <div className="mb-10">
          <p className="text-sm font-mono font-bold tracking-[0.3em] uppercase text-[var(--accent-cyan-text)] mb-3">
            Course 02 · Build AI
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-5 leading-tight tracking-tight">
            사내 AI 구축·운영 종합 가이드
          </h1>
          <p className="text-lg text-foreground/90 font-medium mb-5 max-w-2xl">
            자체 호스팅·에이전트·보안·운영 — IT 담당자·관리자 대상
          </p>
          <div className="flex flex-wrap gap-2 text-sm font-mono font-bold">
            <span className="px-3 py-1.5 rounded-full bg-primary/20 text-primary">⏱ 약 10시간</span>
            <span className="px-3 py-1.5 rounded-full bg-foreground/10 text-foreground">11편 {totalLessons}강</span>
            <span className="px-3 py-1.5 rounded-full bg-foreground/10 text-foreground">사내 출강</span>
            <span className="px-3 py-1.5 rounded-full bg-[var(--accent-green-text)]/20 text-[var(--accent-green-text)]">📥 1편 자료 공개 ({readyCount}/{totalLessons}강)</span>
          </div>
        </div>

        {/* Authority */}
        <p className="text-base text-foreground/85 font-medium mb-12 font-mono">
          기획 · <b className="text-foreground font-black">visionc</b> · Claude Code Harness 공식 문서 + 무료 LLM·자율 에이전트 최신 생태계 기반
        </p>

        {/* Curriculum */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6 tracking-tight">전체 커리큘럼</h2>
          <p className="text-base text-foreground/85 font-medium mb-6">
            <span className="text-[var(--accent-green-text)] font-bold">1편이 먼저 공개</span>됐습니다 — <b>편 카드를 클릭하면 PPT 슬라이드와 강사용 스피커 노트를 내려받을 수 있습니다.</b> 나머지 편은 <span className="text-[var(--accent-amber)] font-bold">📅 자료 준비 중</span>으로 순차 공개됩니다.
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
                star={sec.star}
                slidesKey={sec.slidesKey}
                notesKey={sec.notesKey}
              />
            ))}
          </div>
        </div>

        {/* Coming soon notice */}
        <div className="rounded-3xl border-2 border-[var(--accent-amber)]/40 bg-gradient-to-br from-[var(--accent-amber)]/15 via-transparent to-transparent p-8 md:p-10 mb-12">
          <p className="text-sm font-mono font-bold tracking-[0.2em] uppercase text-[var(--accent-amber)] mb-3">Coming Soon</p>
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-3 tracking-tight">5편부터 순차 공개</h2>
          <p className="text-base text-foreground/90 font-medium leading-relaxed mb-4">
            Course 02는 IT 담당자·관리자용 11편 30강 자료를 순차 공개합니다. 1편~4편을 지금 내려받을 수 있고, 5편(에이전트 기초)부터 이어집니다.
          </p>
          <Link href="/ai-solution/academy/dept-ai" className="inline-flex items-center gap-1 text-base text-primary font-bold hover:gap-2 transition-all font-mono">
            → Course 01 (자료 공개 중)으로
          </Link>
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
