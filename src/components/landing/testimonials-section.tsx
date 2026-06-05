'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Mascot from '@/components/Mascot'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const reviews = [
  {
    quote: <>고객 문의 하루 2시간 수동 응대를 AI 챗봇으로 자동화했어요. <strong className="font-bold text-primary">85% 자동 처리</strong>, 야간·주말 응대율 <strong className="font-bold text-primary">0%→100%</strong>, 영업 점수도 올라갔습니다. 도입 비용 3개월 안에 회수.</>,
    name: '제조사 대표', role: '자동차 부품 1차 협력사 · 직원 30명', stars: 5,
  },
  {
    quote: <>상품 설명 건당 30분 걸리던 작업이 <strong className="font-bold text-primary">AI 자동 생성 1분</strong>으로 줄었어요. 월 300건 처리하던 마케터 시간이 풀려서 신규 카테고리 기획·인플루언서 콜라보까지 — 매출이 오히려 늘었습니다.</>,
    name: '온라인몰 대표', role: '패션 자체 브랜드 · 직원 12명', stars: 5,
  },
  {
    quote: <>매일 아침 1.5시간 수작업 보고서가 <strong className="font-bold text-primary">자동 생성·메일 발송 0분</strong>으로. PM 시간 주 7.5시간 회수로 신규 현장 견적까지. 임원 회의도 9시 정시 시작이 가능해졌습니다.</>,
    name: '서비스업 원장', role: '인테리어 시공사 · 직원 45명', stars: 5,
  },
  {
    quote: <>설계자 2명이 사양→BOM에 5일씩 걸리던 견적 사이클을 AI로 <strong className="font-bold text-primary">7일→2일</strong>로 단축. 응답 가능 견적이 월 25건→50건이 되니 <strong className="font-bold text-primary">수주율도 +22%</strong> 올랐어요.</>,
    name: '전자부품 대표', role: '커스텀 PCBA · 직원 35명', stars: 5,
  },
  {
    quote: <>해외 영업 1명에 의존해서 휴가만 가면 응대 정지였는데, DeepL+Claude 콤보로 내근 직원 누구나 영문·일문 응대 가능. 통역 외주 <strong className="font-bold text-primary">월 200만원→20만원</strong>, 수출 매출 <strong className="font-bold text-primary">+38%</strong>.</>,
    name: '화학 중기 대표', role: '화학 첨가제 · 직원 45명', stars: 5,
  },
  {
    quote: <>HR 1명이 분기 채용 100~200건 이력서 직접 스크리닝하느라 2주 소요. AI 1차 스크리닝 도입으로 <strong className="font-bold text-primary">2일</strong>로 단축. 면접 도달 후보 품질도 <strong className="font-bold text-primary">+40%</strong>.</>,
    name: 'IT 서비스 인사팀', role: '직원 60명 · 분기 채용 8~12명', stars: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <motion.p variants={fadeInUp} className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">TESTIMONIALS · AI 도입 사례</motion.p>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-foreground tracking-tight">실제 도입 결과</motion.h2>
            <motion.p variants={fadeInUp} className="text-foreground/90 mt-4 text-lg font-medium">한국 중소기업 6곳 — 시간·비용·매출 모두 개선했습니다.</motion.p>
          </div>
          <motion.div variants={fadeInUp} className="shrink-0 hidden sm:block">
            <Mascot pose="cheer" category="emotion" size="sm" className="h-28 w-auto" bubble="실제 도입 사례예요!" bubbleDir="left" />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {reviews.map((r) => (
            <motion.div
              key={r.name}
              variants={fadeInUp}
              className="bg-card border-2 border-foreground/10 rounded-2xl p-8 flex flex-col gap-6 hover:border-primary/50 transition-colors duration-300"
            >
              <div className="flex gap-1">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/90 text-base font-medium leading-relaxed flex-1">&ldquo;{r.quote}&rdquo;</p>
              <div>
                <div className="text-foreground font-bold text-base">{r.name}</div>
                <div className="text-foreground/85 text-sm font-medium mt-0.5">{r.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
