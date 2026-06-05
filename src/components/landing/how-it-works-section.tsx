'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Mascot from '@/components/Mascot'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const steps = [
  { number: '01', title: '도입 상담',      desc: '회사 업무·페인 포인트 공유 → AI 도입 가능 영역 1차 식별. 30분 화상/방문.', detail: '1일 · 무료',           pose: 'cheer'     as const, category: 'emotion' as const, bubble: '편하게 말씀해 주세요!' },
  { number: '02', title: '솔루션 설계',   desc: '도입 영역 우선순위 · 도구 선정 · ROI 시뮬레이션 · 예산·기간 제안.',           detail: '1주',                 pose: 'thinking'  as const, category: 'emotion' as const, bubble: '맞춤 청사진 만들게요' },
  { number: '03', title: '구축·학습',    desc: '챗봇·자동화·사내 LLM·자율 에이전트 구축 + 데이터 학습 + 사내 교육.',         detail: '2~6주',               pose: 'develop'   as const, category: 'process' as const, bubble: '꼼꼼히 만들고 있어요' },
  { number: '04', title: '인수·운영',    desc: '담당자 인수인계 + SOP·매뉴얼 + 30일 무상 A/S + 월 운영 옵션.',                detail: '상시',                pose: 'happy'     as const, category: 'emotion' as const, bubble: '운영도 함께해요!' },
]

export function HowItWorksSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % steps.length), 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="process" className="py-24 lg:py-32 bg-card/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="mb-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.p variants={fadeInUp} className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">PROCESS · AI 도입 컨설팅</motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-foreground tracking-tight">상담 → 설계 → 구축 → 운영<br />4단계로 진행됩니다</motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-2"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {steps.map((s, i) => (
              <motion.button
                key={s.number}
                variants={fadeInUp}
                onClick={() => setActive(i)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${active === i ? 'bg-primary/10 border-primary/50' : 'bg-transparent border-foreground/10 hover:border-foreground/30'}`}
              >
                <div className="flex items-start gap-4">
                  <span className={`font-mono text-base font-bold transition-colors shrink-0 ${active === i ? 'text-primary' : 'text-foreground/75'}`}>{s.number}</span>
                  <div className="w-full">
                    <h3 className={`font-black text-lg mb-1 transition-colors ${active === i ? 'text-foreground' : 'text-foreground/90'}`}>{s.title}</h3>
                    {active === i && (
                      <div className="mt-2 space-y-1">
                        <p className="text-foreground/90 text-base font-medium leading-relaxed">{s.desc}</p>
                        <p className="text-primary text-sm font-mono font-bold">{s.detail}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative h-[400px] lg:h-[460px] rounded-2xl bg-card border-2 border-foreground/10 overflow-hidden flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />

            <div className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active ? 'bg-primary w-5' : 'bg-foreground/30 hover:bg-primary/40'}`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.88, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative z-10 flex flex-col items-center gap-5 px-8 text-center"
              >
                <Mascot pose={steps[active].pose} category={steps[active].category} size="md" className="h-40 w-auto" bubble={steps[active].bubble} bubbleDir="right" />
                <div>
                  <p className="text-foreground/85 text-sm font-mono font-bold mb-1">{steps[active].number} / 0{steps.length}</p>
                  <h3 className="text-2xl font-black text-foreground tracking-tight">{steps[active].title}</h3>
                  <p className="text-primary text-sm font-mono font-bold mt-1">{steps[active].detail}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
