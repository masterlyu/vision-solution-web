'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Mascot from '@/components/Mascot'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const steps = [
  { number: '01', title: 'URL 입력',      desc: '분석할 사이트 주소와 이메일만 입력하세요. 30초면 됩니다.',       detail: '신용카드 불필요 · 가입 없음',                    pose: 'develop'   as const, category: 'process'  as const, bubble: '주소만 알려주세요!' },
  { number: '02', title: 'AI 자동 분석',  desc: '성능·보안·디자인·SEO를 AI가 동시에 점검합니다.',              detail: 'PageSpeed · Core Web Vitals · SSL · 보안헤더', pose: 'analytics' as const, category: 'process'  as const, bubble: '꼼꼼히 살펴볼게요!' },
  { number: '03', title: '리포트 생성',   desc: '발견된 문제와 개선 제안을 PDF로 정리합니다.',                  detail: '위험도 분류 · 우선순위 조치 가이드',              pose: 'education' as const, category: 'process'  as const, bubble: '보고서 작성 중...' },
  { number: '04', title: '이메일 발송',   desc: '48시간 내 결과를 이메일로 받아보세요.',                        detail: '영업일 기준 1~2일',                              pose: 'happy'     as const, category: 'emotion'  as const, bubble: '이메일 발송 완료!' },
  { number: '05', title: '1:1 상담',      desc: '결과 기반으로 맞춤 솔루션을 제안드립니다.',                   detail: '무료 · 부담 없음',                               pose: 'cheer'     as const, category: 'emotion'  as const, bubble: '같이 해결해요!' },
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
          <motion.p variants={fadeInUp} className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">PROCESS</motion.p>
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-black text-foreground">URL 입력 하나로<br />전부 해결됩니다</motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: step accordion */}
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
                className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${active === i ? 'bg-primary/10 border-primary/40' : 'bg-transparent border-transparent hover:border-border'}`}
              >
                <div className="flex items-start gap-4">
                  <span className={`font-mono text-sm transition-colors shrink-0 ${active === i ? 'text-primary' : 'text-muted-foreground/40'}`}>{s.number}</span>
                  <div className="w-full">
                    <h3 className={`font-bold mb-1 transition-colors ${active === i ? 'text-foreground' : 'text-muted-foreground'}`}>{s.title}</h3>
                    {active === i && (
                      <div className="mt-2 space-y-1">
                        <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                        <p className="text-primary/70 text-xs font-mono">{s.detail}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Right: VISI panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative h-[400px] lg:h-[460px] rounded-2xl bg-card border border-border overflow-hidden flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />

            {/* Step dots */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active ? 'bg-primary w-5' : 'bg-border hover:bg-primary/40'}`}
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
                  <p className="text-muted-foreground text-xs font-mono mb-1">{steps[active].number} / 0{steps.length}</p>
                  <h3 className="text-xl font-black text-foreground">{steps[active].title}</h3>
                  <p className="text-primary/80 text-xs font-mono mt-1">{steps[active].detail}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
