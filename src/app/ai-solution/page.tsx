import Link from 'next/link'
import { Bot, BarChart3, PenLine, Mail, Brain, TrendingUp, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const solutions = [
  { icon: Bot,        title: 'AI 챗봇 구축',        desc: '고객 응대·FAQ 자동화. GPT 기반 맞춤 학습 챗봇' },
  { icon: BarChart3,  title: '데이터 분석 대시보드', desc: '매출·재고·고객 데이터 자동 집계·시각화' },
  { icon: PenLine,    title: 'AI 콘텐츠 생성',       desc: '블로그·SNS·상품 설명 AI 자동 작성 시스템' },
  { icon: Mail,       title: '자동화 리포트',         desc: '정기 보고서 AI 생성·이메일 자동 발송' },
  { icon: Brain,      title: 'LLM 비즈니스 통합',    desc: '사내 문서 검색·업무 자동화 AI 에이전트 구축' },
  { icon: TrendingUp, title: '예측 모델링',           desc: '수요 예측·이탈 예측·추천 시스템 구축' },
]

const cases = [
  { company: '○○ 제조사 (직원 30명)', before: '고객 문의 응대에 하루 2시간 소요', after: 'AI 챗봇 도입 후 85% 자동 처리, 담당자 응대 15%만 남음' },
  { company: '○○ 온라인몰', before: '상품 설명 1개 작성에 30분', after: 'AI 자동 생성으로 1분 이내, 월 300건 처리' },
]

export default function AiSolutionPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">AI SOLUTION</p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">AI 솔루션</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            AI, 대기업만의 이야기가 아닙니다.<br />중소기업에 맞는 실용적인 AI를 도입하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {solutions.map(s => (
            <div key={s.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-200 group">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all">
                <s.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-foreground font-bold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-xl font-bold text-foreground mb-8">도입 사례</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map(c => (
              <div key={c.company} className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-200">
                <div className="text-primary text-sm font-bold mb-4">{c.company}</div>
                <div className="space-y-3">
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="text-muted-foreground text-xs font-bold mb-1">BEFORE</div>
                    <p className="text-foreground text-sm">{c.before}</p>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                    <div className="text-primary text-xs font-bold mb-1">AFTER</div>
                    <p className="text-foreground text-sm">{c.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-primary/20 rounded-2xl py-14 px-8">
          <h2 className="text-xl font-bold text-foreground mb-3">어떤 업무를 자동화할 수 있을까요?</h2>
          <p className="text-muted-foreground mb-6">현재 업무 프로세스를 공유해 주시면 AI 도입 가능 영역을 무료로 분석해 드립니다.</p>
          <Button asChild className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 gap-2">
            <Link href="/contact">무료 AI 도입 분석 신청 <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
