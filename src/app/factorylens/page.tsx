'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Mascot from '@/components/Mascot'
import {
  ArrowRight, Check, ChevronDown, ExternalLink,
  Database, Workflow, GitBranch, Eye, ShieldCheck, Lock,
  Wallet, SearchCode, Package, Gauge, Route, Users, BookOpen,
  Puzzle, HelpCircle, Settings2,
} from 'lucide-react'

const PROBLEMS = [
  {
    icon: Puzzle,
    title: '서로 다른 데이터 구조라 하나로 못 묶인다',
    desc: 'MES·ERP·엑셀이 저마다 다른 형식으로 존재해, 전체를 한눈에 보는 화면 자체가 없습니다.',
  },
  {
    icon: HelpCircle,
    title: '이상 신호의 근거를 추적할 방법이 없다',
    desc: '불량이나 지연이 발생해도 원인이 되는 설비·자재·작업자까지 거슬러 올라가기 어렵습니다.',
  },
  {
    icon: Settings2,
    title: '판정 기준이 코드에 박혀 있어 못 고친다',
    desc: '임계값·규칙이 바뀌려면 개발자가 코드를 다시 배포해야 해서, 현장 변화를 못 따라갑니다.',
  },
]

const STRUCTURE = [
  {
    icon: Database,
    title: '표준 온톨로지',
    desc: '수주·생산·출하·수금·품질·재고를 하나의 데이터 모델로 표준화합니다. MES·ERP 종류를 가리지 않고 같은 방식으로 흡수합니다.',
  },
  {
    icon: Workflow,
    title: '노코드 매핑 엔진',
    desc: '유사도 알고리즘(RapidFuzz)이 필드명을 자동으로 추천하고, 드래그앤드롭으로 표준 모델에 연결합니다.',
  },
  {
    icon: GitBranch,
    title: '그래프 탐색 + 룰 엔진',
    desc: '연결된 데이터를 관계형 그래프로 탐색해 원인을 추적하고, 판정 기준은 화면에서 직접 조정합니다(코드 재배포 불필요).',
  },
]

const BOTS = [
  { icon: Wallet, title: '수금·출하 통제', desc: '여신 한도·연체를 넘긴 거래처의 출하를 감지하고, 입금자명 표기가 흔들려도 유사도 매칭으로 계산서와 자동 대사합니다.' },
  { icon: SearchCode, title: '불량 역추적', desc: '불량 LOT에서 설비·자재·작업자까지 그래프로 거슬러 올라가 원인 후보를 좁힙니다.' },
  { icon: Package, title: '적정재고', desc: '소비율과 확정 수주를 근거로 재주문점(ROP)·경제적발주량(EOQ)을 계산해 발주 시점을 권고합니다.' },
  { icon: Gauge, title: '예지보전', desc: '설비 신호(예: 수지온도)의 추세를 외삽해 잔존수명(RUL)을 추정, 임계값 도달 전에 정비를 권고합니다.' },
  { icon: Route, title: '납기·병목', desc: '공정 그래프에서 임계경로(CPM)를 계산해 어느 공정이 납기를 결정하는 병목인지 짚어냅니다.' },
  { icon: Users, title: '공급사 평가', desc: '납기·품질 이력을 근거로 공급사를 정량 평가합니다.' },
  { icon: BookOpen, title: '지식 전수', desc: '현장 노하우를 검색 가능한 지식 항목으로 축적해, 숙련자 부재 시에도 원인 대응 지식을 잃지 않습니다.' },
]

const TRUST = [
  {
    icon: Eye,
    title: '설명가능 AI (XAI)',
    desc: '모든 판단에 근거가 되는 데이터와 관계를 그래프로 함께 제시합니다. 결과만 던지는 블랙박스가 아닙니다.',
  },
  {
    icon: ShieldCheck,
    title: 'Actions·Write-back',
    desc: '판단을 원본 시스템에 되쓰기 전에 사람 승인 1단계를 거칩니다. 모든 실행은 감사 기록으로 남고 되돌릴 수 있습니다.',
  },
  {
    icon: Lock,
    title: '기본값은 읽기전용',
    desc: '별도로 켜지 않는 한 원본 MES·ERP는 조회만 하고 값을 바꾸지 않습니다.',
  },
]

const ONBOARDING = [
  { num: '01', title: '템플릿 로드', desc: '업종 표준 온톨로지·기본 룰 세트를 불러옵니다.' },
  { num: '02', title: '연결·매핑', desc: 'MES·ERP·엑셀 필드를 표준 모델에 자동 추천 매핑으로 연결합니다.' },
  { num: '03', title: '데이터 정합성 확인', desc: '누락·중복·형식 오류를 점검해 판단 기반 데이터 품질을 확보합니다.' },
  { num: '04', title: '룰 튜닝', desc: '여신 한도·온도 상한 등 임계값을 현장 기준에 맞춰 조정합니다.' },
  { num: '05', title: '백테스팅·가동', desc: '과거 3개월 데이터로 먼저 재현해 효과를 숫자로 검증한 뒤 가동합니다.' },
]

const FAQS = [
  { q: '온톨로지가 뭔가요?', a: '수주·생산·출하·수금·품질·재고처럼 서로 다른 데이터를 하나의 표준 모델로 묶어, MES·ERP 종류에 상관없이 같은 방식으로 연결하고 분석할 수 있게 하는 데이터 구조입니다.' },
  { q: '우리 MES·ERP도 연결되나요?', a: '더존·이카운트 등 국내 ERP는 물론 자체 개발 MES도 필드 단위로 매핑해 연결합니다. 유사도 알고리즘이 필드명을 자동으로 추천해 연결 작업 시간을 줄입니다.' },
  { q: 'MES 없이 엑셀로 관리하는데도 가능한가요?', a: '가능합니다. 엑셀·CSV 파일을 업로드하면 헤더를 자동으로 인식해 같은 방식으로 연결됩니다.' },
  { q: 'AI가 왜 그렇게 판단했는지 알 수 있나요?', a: '자동매칭·불량 원인·재고 권고 등 모든 판단에 근거가 되는 데이터와 관계를 그래프로 함께 보여줍니다. 결과만 던지는 블랙박스 방식이 아닙니다.' },
  { q: '데이터 유출이 걱정됩니다.', a: '기본값은 읽기전용입니다. 원본 시스템에 실제로 반영하는 기능은 별도로 켜야 하며, 켜더라도 사람 승인 후 감사 기록과 함께 실행되고 언제든 되돌릴 수 있습니다.' },
  { q: '도입 비용과 기간은 어떻게 되나요?', a: '회사 규모와 연결할 시스템 구조에 따라 달라 협의로 안내드립니다. 온보딩은 통상 약 2주가 걸립니다.' },
]

export default function FactoryLensPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="pt-28 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-5">
              <span className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 text-primary text-xs font-bold px-4 py-1.5 rounded-full w-fit">
                <Database className="w-3.5 h-3.5" />
                표준 온톨로지 · 설명가능 AI (XAI)
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
                뿔뿔이 흩어진 공장 데이터를,<br />
                <span className="text-primary">하나의 지식 그래프</span>로
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                MES·ERP·엑셀 — 형식이 달라도 표준 데이터 모델(온톨로지) 하나로 통합합니다.<br />
                <strong className="text-foreground">모든 판단에는 근거 그래프가 함께 따라옵니다.</strong>
              </p>
              <p className="text-muted-foreground text-sm">노코드 연결 · 국제표준(AAS·ISA-95) 호환 설계 · 연결까지 약 2주</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://factorylens.visionc.co.kr" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-xl transition-all text-base">
                  라이브 데모 바로 보기 <ExternalLink className="w-5 h-5" />
                </a>
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-foreground/20 hover:border-primary/50 text-foreground/70 hover:text-foreground font-medium px-8 py-4 rounded-xl transition-all text-base">
                  도입 문의 <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/10">
              <Image
                src="/factorylens/factorylens-dashboard-viewport.png"
                alt="FactoryLens 커맨드센터 대시보드 — 봇 운영 요약 실화면"
                width={1280}
                height={720}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 문제 3연 ── */}
      <section className="py-16 px-6 bg-secondary/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">데이터가 아니라, <span className="text-primary">구조</span>가 문제입니다</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PROBLEMS.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="bg-card border border-border rounded-2xl p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 제품 구조 3열 ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">제품 구조</h2>
            <p className="text-muted-foreground">세 개의 층이 함께 작동해 어떤 시스템이든 표준 방식으로 다룹니다.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STRUCTURE.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="relative bg-card border border-border rounded-2xl p-6">
                  {i < STRUCTURE.length - 1 && (
                    <div className="hidden md:block absolute top-10 -right-3 w-6 h-px bg-primary/40 z-10" />
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">STEP {i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 7대 봇 메뉴판 ── */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">감지·예측 봇</h2>
            <p className="text-muted-foreground">표준 데이터 위에서 도메인별로 동작하는 결정론적 알고리즘입니다. 학습 데이터가 없어도 규칙과 그래프로 바로 작동합니다.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BOTS.map((b) => {
              const Icon = b.icon
              return (
                <div key={b.title} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground text-sm">{b.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 라이브 데모 ── */}
      <section id="demo" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">말이 아니라, 지금 돌아가는 화면</h2>
            <p className="text-muted-foreground">아래는 라이브 데모의 실제 화면입니다. 표시된 수치는 데모 데이터 기준 실측값입니다.</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border shadow-xl mb-6">
            <Image
              src="/factorylens/factorylens-cash-detail.png"
              alt="FactoryLens 수금·출하 통제 봇 실화면 — 미수금 연령 구간 그래프"
              width={1280}
              height={900}
              className="w-full h-auto"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-5 text-center">
              <div className="text-2xl font-black text-primary mb-1">₩10,000,000</div>
              <div className="text-xs text-muted-foreground">오늘 출하 보류로 막은 금액</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 text-center">
              <div className="text-2xl font-black text-primary mb-1">21건</div>
              <div className="text-xs text-muted-foreground">임계경로 계산 기준 납기 지연 위험</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 text-center">
              <div className="text-2xl font-black text-primary mb-1">19곳</div>
              <div className="text-xs text-muted-foreground">이력 기반 정량 평가된 공급사</div>
            </div>
          </div>
          <div className="text-center">
            <a href="https://factorylens.visionc.co.kr" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-xl transition-all text-base">
              라이브 데모 직접 조작해보기 <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 신뢰(차별점) ── */}
      <section className="py-20 px-6 bg-secondary/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">판단을 믿을 수 있어야 씁니다</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TRUST.map((t) => {
              const Icon = t.icon
              return (
                <div key={t.title} className="bg-card border border-border rounded-2xl p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{t.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 도입 과정 ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              연결까지 <span className="text-primary">약 2주</span>
            </h2>
            <p className="text-muted-foreground text-sm">가동 전, 과거 3개월 데이터로 먼저 재현해 효과를 숫자로 검증합니다(백테스팅).</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ONBOARDING.map((o) => (
              <div key={o.num} className="bg-card border border-border rounded-xl p-5">
                <span className="text-primary/50 text-xs font-mono">{o.num}</span>
                <h3 className="font-bold text-foreground text-sm mt-1 mb-2">{o.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-8">국제표준(AAS·ISA-95) 호환으로 설계되어, 임의 커스텀이 아닌 표준 데이터 모델을 따릅니다.</p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-foreground text-center mb-10">자주 묻는 질문</h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-foreground pr-4">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`grid transition-all duration-200 ${openFaq === i ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden px-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 최종 CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Mascot pose="cheer" category="emotion" size="sm" className="h-28 w-auto" bubble="근거 그래프까지 함께 보여드려요" bubbleDir="left" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            지금 데이터가 어떻게 연결되는지<br /><span className="text-primary">직접 확인해보세요</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            라이브 데모는 가입 없이 바로 열람 가능합니다.<br />
            도입 규모·비용은 상담을 통해 협의로 안내드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://factorylens.visionc.co.kr" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 py-4 rounded-xl transition-all text-base">
              라이브 데모 바로 보기 <ExternalLink className="w-5 h-5" />
            </a>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-foreground/20 hover:border-primary/50 text-foreground/70 hover:text-foreground font-medium px-8 py-4 rounded-xl transition-all text-base">
              도입 문의 <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
