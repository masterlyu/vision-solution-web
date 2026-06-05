'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react'
import EnterpriseDownloadClient from './EnterpriseDownloadClient'

type Lesson = [string, string]

type Props = {
  part: string
  title: string
  desc: string
  lessons: Lesson[]
  ready: boolean
  star?: boolean
  slidesKey?: string
  notesKey?: string
}

export default function SectionCard({ part, title, desc, lessons, ready, star, slidesKey, notesKey }: Props) {
  const [expanded, setExpanded] = useState(false)

  const cardBase = star
    ? 'border-primary/40 bg-primary/5'
    : 'border-foreground/15 bg-card'

  return (
    <div>
      {/* 편 카드 — ready면 클릭 가능 */}
      <div
        className={`rounded-2xl border-2 p-6 transition-colors ${cardBase} ${ready ? 'cursor-pointer hover:border-primary/50' : ''}`}
        onClick={ready ? () => setExpanded((v) => !v) : undefined}
        role={ready ? 'button' : undefined}
        aria-expanded={ready ? expanded : undefined}
      >
        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
          <span className="text-sm font-mono font-bold text-primary tracking-wider">{part}</span>
          <h3 className="text-xl font-black text-foreground tracking-tight">{title}</h3>
          {star && <span className="text-xs text-primary font-bold">⭐ 핵심</span>}
          {ready ? (
            <span className="text-xs font-mono font-bold text-[var(--accent-green-text)] bg-[var(--accent-green-text)]/15 px-2.5 py-1 rounded-full">
              📥 자료 공개
            </span>
          ) : (
            <span className="text-xs font-mono font-bold text-[var(--accent-amber)] bg-[var(--accent-amber)]/15 px-2.5 py-1 rounded-full">
              <Calendar className="inline w-3 h-3 mr-0.5 -mt-0.5" /> 자료 준비 중
            </span>
          )}
          {ready && (
            <span className="ml-auto inline-flex items-center gap-1 text-sm font-mono font-bold text-primary">
              {expanded ? <>접기 <ChevronUp className="w-4 h-4" /></> : <>강의 자료 보기 <ChevronDown className="w-4 h-4" /></>}
            </span>
          )}
        </div>
        <p className="text-base text-foreground/85 font-medium mb-5">{desc}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {lessons.map(([num, t]) => (
            <div key={num} className="flex items-start gap-3 p-3 rounded-xl bg-background/50">
              <span className="text-sm font-mono font-bold text-primary mt-0.5">{num}</span>
              <span className="text-sm text-foreground font-medium">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 다운로드 — 펼쳐졌을 때만, 시각적으로 카드와 구분 */}
      {ready && expanded && slidesKey && notesKey && (
        <div className="mt-3 ml-4 md:ml-10 relative pl-6 md:pl-10">
          {/* 연결선 — 카드와 다운로드를 시각적으로 연결 */}
          <div className="absolute left-0 top-0 bottom-8 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
          <div className="absolute left-0 top-6 w-6 md:w-10 h-px bg-primary/50"></div>
          <EnterpriseDownloadClient
            slidesKey={slidesKey}
            notesKey={notesKey}
            slidesDesc={`${part} 강의용 PPT 슬라이드 (${lessons.length}강 통합).`}
            notesDesc={`${part} 강사용 스피커 노트. 강의별 멘트·실습·시간 배분·청중 질문 포함.`}
          />
        </div>
      )}
    </div>
  )
}
