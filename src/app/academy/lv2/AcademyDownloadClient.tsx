'use client'

import { useState } from 'react'

type AuthState = 'idle' | 'checking' | 'authed' | 'wrong' | 'rate-limited'

export default function AcademyDownloadClient() {
  const [password, setPassword] = useState('')
  const [state, setState] = useState<AuthState>('idle')
  const [message, setMessage] = useState<string | null>(null)

  async function unlock(e: React.FormEvent) {
    e.preventDefault()
    if (state === 'checking') return
    setState('checking')
    setMessage(null)
    try {
      const res = await fetch('/api/academy/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        setState('authed')
        setMessage('잠금 해제됨. 스피커 노트 다운로드 버튼이 활성화되었습니다.')
      } else if (res.status === 429) {
        setState('rate-limited')
        const data = await res.json().catch(() => ({}))
        setMessage(data?.error ?? '잠시 후 다시 시도해주세요.')
      } else {
        setState('wrong')
        setMessage('비밀번호가 일치하지 않습니다.')
      }
    } catch {
      setState('wrong')
      setMessage('요청 처리 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/15 via-[var(--accent)]/8 to-transparent p-7 md:p-10">
      <p className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-primary mb-3">Downloads</p>
      <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6 tracking-tight">자료 다운로드</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 flex flex-col">
          <p className="text-xs font-mono text-[var(--accent-green-text)] font-bold tracking-wider mb-2">FREE · 누구나 다운로드</p>
          <h3 className="text-lg font-bold text-foreground mb-1">PPT 슬라이드 (.pptx)</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
            12장 슬라이드. PowerPoint·Keynote·Google Slides 자유 편집.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="/academy/lv2-slides.pptx"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
            >
              <span>📥</span> PPTX 다운로드
            </a>
            <a
              href="/academy/lv2-slides.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-bold hover:border-primary/50 transition-colors"
            >
              <span>📄</span> PDF
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 flex flex-col">
          <p className="text-xs font-mono text-[var(--accent-amber)] font-bold tracking-wider mb-2">LOCKED · 비밀번호 필요</p>
          <h3 className="text-lg font-bold text-foreground mb-1">스피커 노트 (.pdf)</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
            강사용 상세 가이드. 슬라이드별 멘트·배경·실전 팁 (13페이지, 흑백 인쇄용).
          </p>

          {state !== 'authed' ? (
            <form onSubmit={unlock} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                  autoComplete="off"
                  spellCheck={false}
                  className="flex-1 px-4 py-2.5 rounded-full bg-background border border-input text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  disabled={state === 'checking' || !password}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-bold hover:bg-foreground/85 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {state === 'checking' ? '확인 중…' : '🔓 잠금 해제'}
                </button>
              </div>
              {message && (
                <p className={`text-xs mt-1 font-medium ${state === 'wrong' || state === 'rate-limited' ? 'text-[var(--accent-red)]' : 'text-muted-foreground'}`}>
                  {message}
                </p>
              )}
            </form>
          ) : (
            <div className="flex flex-col gap-2">
              <a
                href="/api/academy/download/lv2-speaker-notes"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors w-fit"
              >
                <span>📥</span> 스피커 노트 다운로드
              </a>
              {message && (
                <p className="text-xs text-[var(--accent-green-text)] font-medium">{message}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
        · 자료는 출처 명시(visionc Academy) 후 사내 교육·재강의에 자유롭게 사용하실 수 있습니다.<br />
        · 상업적 재배포는 사전 문의 부탁드립니다.
      </p>
    </div>
  )
}
