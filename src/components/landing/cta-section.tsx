'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Mascot from '@/components/Mascot'
import Link from 'next/link'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

void Briefcase

export function CtaSection() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [primaryRgb, setPrimaryRgb] = useState('139,92,246')

  useEffect(() => {
    setPrimaryRgb(getComputedStyle(document.documentElement).getPropertyValue('--primary-rgb').trim() || '139,92,246')
  }, [])

  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="relative border-2 border-foreground/15 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          onMouseMove={e => {
            const r = e.currentTarget.getBoundingClientRect()
            setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
          }}
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(${primaryRgb},0.3), transparent 50%)` }} />

          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <motion.div
              className="flex flex-col items-center text-center"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <Mascot pose="cheer" category="emotion" size="sm" className="h-32 w-auto" bubble="함께 시작해요!" bubbleDir="right" />
              </motion.div>

              <motion.p variants={fadeInUp} className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-6">지금 시작하세요</motion.p>

              <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
                중소기업 AI 도입<br />지금 시작하세요
              </motion.h2>

              <motion.p variants={fadeInUp} className="text-foreground/90 text-lg md:text-xl font-medium mb-10 max-w-xl leading-relaxed">
                100만원대부터 단계별로. 어떤 부서·어떤 업무가 적합한지<br className="hidden md:block" />
                <b className="text-foreground">VISIONC와 함께 정합니다.</b>
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-6">
                <Button asChild size="lg" className="h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 shadow-lg shadow-primary/50 hover:shadow-primary/70 transition-all">
                  <Link href="/contact">💼 도입 상담 신청 <ArrowRight className="w-4 h-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-7 rounded-xl border-2 border-primary text-primary hover:bg-primary/10 font-bold gap-2 transition-all">
                  <Link href="/ai-solution/academy/dept-ai"><GraduationCap className="w-4 h-4" /> 사내 출강 강좌 보기</Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center justify-center gap-6 text-sm text-foreground/85 font-medium">
                <Link href="/portfolio" className="hover:text-primary transition-colors font-bold">📂 도입 사례</Link>
                <span>·</span>
                <Link href="/blog" className="hover:text-primary transition-colors font-bold">📰 인사이트 블로그</Link>
                <span>·</span>
                <span>247건+ 누적</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
