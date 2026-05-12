'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { VisiMascot } from '@/components/visi/VisiMascot'
import Link from 'next/link'

const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

export function CtaSection() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [url, setUrl] = useState('')
  const [primaryRgb, setPrimaryRgb] = useState('139,92,246')
  const router = useRouter()

  useEffect(() => {
    setPrimaryRgb(getComputedStyle(document.documentElement).getPropertyValue('--primary-rgb').trim() || '139,92,246')
  }, [])

  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          className="relative border border-foreground/20 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          onMouseMove={e => {
            const r = e.currentTarget.getBoundingClientRect()
            setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
          }}
        >
          {/* Mouse glow */}
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
              {/* VISI mascot */}
              <motion.div variants={fadeInUp} className="mb-6">
                <VisiMascot pose="cheering" size={130} bubble="48시간 안에 답이 와요!" bubbleDir="right" />
              </motion.div>

              <motion.p variants={fadeInUp} className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6">지금 시작하세요</motion.p>

              <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
                48시간 안에<br />답이 옵니다
              </motion.h2>

              <motion.p variants={fadeInUp} className="text-muted-foreground text-lg mb-10 max-w-lg">
                지금 바로 URL을 입력하세요.<br />분석·리포트·상담 전부 무료입니다.
              </motion.p>

              <motion.form
                variants={fadeInUp}
                onSubmit={e => { e.preventDefault(); if (url) router.push(`/renewal?url=${encodeURIComponent(url)}`) }}
                className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mb-6"
              >
                <input
                  type="url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://your-website.com"
                  className="flex-1 h-14 px-5 rounded-xl bg-[var(--card-deep)] border-2 border-border/40 text-foreground placeholder:text-foreground/25 text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                />
                <Button type="submit" size="lg" className="h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 shrink-0">
                  무료 진단 <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.form>

              <motion.div variants={fadeInUp} className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <Link href="/contact" className="hover:text-foreground transition-colors">문의하기</Link>
                <span>·</span>
                <Link href="/blog" className="hover:text-foreground transition-colors">사례 보기</Link>
                <span>·</span>
                <span>신용카드 불필요</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
