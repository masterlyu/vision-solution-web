import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Briefcase, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: '사내 AI 구축·운영 종합 가이드 — 자체 호스팅·에이전트·보안 (30강) | Vision Solution',
  description: '중소기업 IT 담당자·관리자용 사내 AI 인프라 구축 30강. 무료 LLM·Open WebUI·RAG·MCP·Claude Code 하네스·에이전트 운영·보안·백업·관리자 권한까지.',
  alternates: { canonical: '/ai-solution/academy/build-ai' },
  openGraph: {
    title: '사내 AI 구축·운영 종합 가이드 (30강)',
    description: '중소기업 사내 AI 인프라 구축·운영 종합 트랙. 무료 LLM·에이전트·하네스·보안 30강.',
    url: 'https://visionc.co.kr/ai-solution/academy/build-ai',
    siteName: 'Vision Solution',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: '사내 AI 구축·운영 종합 가이드' }],
    locale: 'ko_KR',
    type: 'website',
  },
}

const sections = [
  {
    title: '1편. 의사결정',
    desc: '도입 전 반드시 짚어야 할 비교·로드맵',
    lessons: [
      { id: '01', title: '클라우드 API vs 온프레미스 — 규모별 손익분기점', dur: 18 },
      { id: '02', title: '단계별 도입 로드맵 — 6/12/24개월', dur: 15 },
    ],
  },
  {
    title: '2편. 인프라',
    desc: '서버·OS·네트워크 기반',
    lessons: [
      { id: '03', title: '하드웨어 — GPU 선택, 미니PC/워크스테이션/서버', dur: 17 },
      { id: '04', title: 'OS·드라이버·컨테이너 — Ubuntu 24.04, NVIDIA, Docker', dur: 16 },
      { id: '05', title: '네트워크·보안 — 사내망 격리, Reverse Proxy, mTLS, VPN', dur: 18 },
    ],
  },
  {
    title: '3편. 모델·추론 엔진',
    desc: '무료 LLM 총망라 + 한국어 특화 + 양자화',
    lessons: [
      { id: '06', title: '무료 LLM 비교 — Llama 3.3, Qwen 2.5, Mistral, DeepSeek, GPT-OSS', dur: 19 },
      { id: '07', title: '한국어 특화 — Solar, EXAONE, KULLM, Bllossom', dur: 15 },
      { id: '08', title: '추론 엔진 — Ollama, vLLM, llama.cpp, TGI + 양자화', dur: 18 },
    ],
  },
  {
    title: '4편. 챗봇·RAG 플랫폼',
    desc: '사내 직원이 매일 쓰는 UI 구축',
    lessons: [
      { id: '09', title: '사내 챗봇 UI — Open WebUI, Dify, LibreChat, AnythingLLM', dur: 17 },
      { id: '10', title: 'RAG — LlamaIndex, Qdrant, 사내 문서 학습', dur: 18 },
      { id: '11', title: 'MCP — ERP·메일·CAD·문서 시스템 연결', dur: 16 },
    ],
  },
  {
    title: '5편. 에이전트 기초·생태계',
    desc: 'Claude Code·OpenCode·Cline 등 자율 에이전트',
    star: true,
    lessons: [
      { id: '12', title: '에이전트란 무엇인가 — 챗봇과의 차이, 4요소(도구·자율·메모리·하네스)', dur: 14 },
      { id: '13', title: '공식 에이전트 Claude Code — 권한 모드, 슬래시 커맨드, 일상 활용', dur: 17 },
      { id: '14', title: '오픈 에이전트 총망라 — OpenCode, Cline, Aider, Roo Code, Continue.dev 비교', dur: 18 },
    ],
  },
  {
    title: '6편. 하네스 엔지니어링',
    desc: '회사 정책을 코드로 자동 적용',
    star: true,
    lessons: [
      { id: '15', title: 'settings.json — 권한·환경변수·모델·토큰 한도', dur: 14 },
      { id: '16', title: 'Hooks — PreToolUse/PostToolUse/Stop/UserPromptSubmit으로 정책 자동 적용', dur: 17 },
      { id: '17', title: 'Skills·Slash Commands·MCP — 부서 도메인 지식 패키징', dur: 16 },
    ],
  },
  {
    title: '7편. 사내 에이전트 배포·운영',
    desc: '직원 전체에게 에이전트를 안전하게 배포',
    star: true,
    lessons: [
      { id: '18', title: '부서별 권한 매트릭스 — 영업/설계/생산 부서별 도구·데이터 격리', dur: 16 },
      { id: '19', title: '위험 차단 안전장치 — git push·rm·DB DROP 금지 hook, 비용 한도', dur: 15 },
      { id: '20', title: '에이전트 백업·감사 — 모든 변경 로깅, 30분 단위 스냅샷, 롤백', dur: 16 },
      { id: '21', title: '사내 에이전트 카탈로그 — 견적·8D·설계 RAG·번역 봇 마켓플레이스', dur: 17 },
    ],
  },
  {
    title: '8편. 자체 에이전트 만들기',
    desc: 'Claude Agent SDK로 회사 전용 에이전트 개발',
    lessons: [
      { id: '22', title: 'Claude Agent SDK 기본 — Tool definition, Memory', dur: 18 },
      { id: '23', title: '실전 — 견적 자동화 에이전트 (수주 메일 → 사양 → BOM → 견적서)', dur: 22 },
    ],
  },
  {
    title: '9편. 보안·권한·감사',
    desc: '엔터프라이즈급 보안 적용',
    lessons: [
      { id: '24', title: '데이터 보안 — 공개/내부/기밀/극비 분류, PII 마스킹, 데이터 격리', dur: 17 },
      { id: '25', title: 'LLM 보안 — 프롬프트 인젝션 방어, 데이터 유출 차단, 모델 탈옥 방지', dur: 18 },
      { id: '26', title: '키 관리·감사 — Vault, sops, API 키 로테이션, ELK/Grafana 감사', dur: 16 },
    ],
  },
  {
    title: '10편. 백업·재해 복구',
    desc: '운영 안정성',
    lessons: [
      { id: '27', title: '백업 — RAG DB 스냅샷, 대화 이력, 모델·가중치, Git', dur: 15 },
      { id: '28', title: 'DR 시나리오 — 정전·장애·랜섬웨어 대응, RPO/RTO', dur: 16 },
    ],
  },
  {
    title: '11편. 관리자 운영·효용성·최적화',
    desc: '도입 후 운영 KPI·Fine-tuning',
    lessons: [
      { id: '29', title: '권한·온보딩·KPI — RBAC, SSO, 신규 직원 자동 셋업, ROI 대시보드', dur: 17 },
      { id: '30', title: 'Fine-tuning·비용 모니터링 — LoRA·QLoRA·Unsloth, 토큰·GPU 비용 추적', dur: 19 },
    ],
  },
]

const totalLessons = sections.reduce((s, sec) => s + sec.lessons.length, 0)
const totalMins = sections.reduce((s, sec) => s + sec.lessons.reduce((a, l) => a + l.dur, 0), 0)

export default function BuildAiCourse() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-28 pb-12 px-6 bg-background" style={{ background: 'radial-gradient(ellipse at top right, color-mix(in oklch, var(--primary) 18%, transparent) 0%, var(--background) 60%)' }}>
        <div className="max-w-5xl mx-auto">
          <Link href="/ai-solution" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-6">
            <ArrowLeft className="w-4 h-4" /> 기업 AI 도입 및 컨설팅으로
          </Link>
          <div className="text-xs font-bold text-primary mb-3">COURSE 02 · 구축 트랙</div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight">
            사내 AI 구축·운영 종합 가이드
          </h1>
          <p className="text-lg text-muted-foreground mb-6">자체 호스팅·에이전트·보안·운영 — IT 담당자·관리자 대상</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm bg-foreground/5 text-foreground px-3 py-1.5 rounded-full">📚 11편 {totalLessons}강</span>
            <span className="text-sm bg-foreground/5 text-foreground px-3 py-1.5 rounded-full">⏱ 약 {Math.round(totalMins/60*10)/10}시간</span>
            <span className="text-sm bg-foreground/5 text-foreground px-3 py-1.5 rounded-full">🎯 90일 안에 사내 AI 인프라 1차 가동</span>
            <span className="text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-full">무료 · 신용카드 불필요</span>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-background">
        <div className="max-w-5xl mx-auto space-y-8">
          {sections.map((sec, i) => (
            <div key={i} className={`rounded-2xl p-8 border ${sec.star ? 'bg-primary/5 border-primary/30' : 'bg-card border-border'}`}>
              <div className="flex items-baseline gap-2 mb-1">
                <h2 className="text-xl font-bold text-foreground">{sec.title}</h2>
                {sec.star && <span className="text-xs text-primary font-bold">⭐ 핵심</span>}
              </div>
              <p className="text-sm text-muted-foreground mb-5">{sec.desc}</p>
              <ul className="divide-y divide-border">
                {sec.lessons.map((l, j) => (
                  <li key={j} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-xs font-bold text-muted-foreground w-8 shrink-0">{l.id}</span>
                      <span className="text-foreground text-sm">{l.title}</span>
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
          <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">자체 구축 컨설팅이 필요하다면</h2>
          <p className="text-muted-foreground mb-8">강좌만으로도 충분히 1차 도입 가능합니다. 도면·고객 데이터·MES 연동 등 보안·신뢰성이 중요하다면 풀서비스 컨설팅을 권장합니다.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-xl transition-all">
            <Briefcase className="w-5 h-5" /> 무료 도입 진단 신청
          </Link>
        </div>
      </section>
    </div>
  )
}
