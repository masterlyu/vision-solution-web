'use client'

import { useState } from 'react'

type AuthState = 'idle' | 'checking' | 'authed' | 'wrong' | 'rate-limited'

type Props = {
  slidesKey: string
  notesKey: string
  slidesDesc?: string
  notesDesc?: string
}

export default function EnterpriseDownloadClient({
  slidesKey,
  notesKey,
  slidesDesc = '강의용 PPT 슬라이드.',
  notesDesc = '강사용 스피커 노트.',
}: Props) {
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
        setMessage('잠금 해제됨. 슬라이드·스피커 노트 다운로드 버튼이 활성화되었습니다.')
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

  const authed = state === 'authed'

  return (
    <div className="rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/25 via-[var(--accent)]/10 to-background p-6 md:p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/25 flex items-center justify-center text-xl">🔐</div>
        <div>
          <p className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-primary mb-0.5">Downloads</p>
          <h4 className="text-lg md:text-xl font-black text-foreground tracking-tight">강의 자료 다운로드</h4>
        </div>
      </div>
      <p className="text-sm text-foreground/85 font-medium mb-5">사내 출강 강좌. 슬라이드·스피커 노트 모두 비밀번호로 보호됩니다.</p>

      {!authed && (
        <form onSubmit={unlock} className="mb-5">
          <div className="flex flex-col sm:flex-row gap-2 max-w-md">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              autoComplete="off"
              spellCheck={false}
              className="flex-1 px-4 py-2.5 rounded-full bg-background border border-input text-foreground text-sm font-medium placeholder:text-foreground/50 focus:outline-none focus:border-primary transition-colors"
            />
            <button
              type="submit"
              disabled={state === 'checking' || !password}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-bold hover:bg-foreground/85 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {state === 'checking' ? '확인 중…' : '🔓 잠금 해제'}
            </button>
          </div>
          {message && (
            <p className={`text-sm mt-2 font-medium ${state === 'wrong' || state === 'rate-limited' ? 'text-[var(--accent-red)]' : 'text-foreground/85'}`}>
              {message}
            </p>
          )}
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Slides */}
        <div className="rounded-xl border-2 border-border bg-background/80 p-5 flex flex-col">
          <p className={`text-xs font-mono font-bold tracking-wider mb-2 ${authed ? 'text-[var(--accent-green-text)]' : 'text-[var(--accent-amber)]'}`}>
            {authed ? 'UNLOCKED · 다운로드 가능' : 'LOCKED · 비밀번호 필요'}
          </p>
          <h3 className="text-base font-bold text-foreground mb-1">PPT 슬라이드 (.pptx)</h3>
          <p className="text-sm text-foreground/85 font-medium mb-4 leading-relaxed flex-1">{slidesDesc}</p>
          {authed ? (
            <a
              href={`/api/academy/download/${slidesKey}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors w-fit"
            >
              <span>📥</span> PPTX 다운로드
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground/10 text-foreground/85 text-sm font-medium w-fit cursor-not-allowed">
              🔒 잠금 상태
            </span>
          )}
        </div>

        {/* Speaker notes */}
        <div className="rounded-xl border-2 border-border bg-background/80 p-5 flex flex-col">
          <p className={`text-xs font-mono font-bold tracking-wider mb-2 ${authed ? 'text-[var(--accent-green-text)]' : 'text-[var(--accent-amber)]'}`}>
            {authed ? 'UNLOCKED · 다운로드 가능' : 'LOCKED · 비밀번호 필요'}
          </p>
          <h3 className="text-base font-bold text-foreground mb-1">스피커 노트 (.pdf)</h3>
          <p className="text-sm text-foreground/85 font-medium mb-4 leading-relaxed flex-1">{notesDesc}</p>
          {authed ? (
            <a
              href={`/api/academy/download/${notesKey}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors w-fit"
            >
              <span>📥</span> 스피커 노트 다운로드
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground/10 text-foreground/85 text-sm font-medium w-fit cursor-not-allowed">
              🔒 잠금 상태
            </span>
          )}
        </div>
      </div>

      <p className="text-xs text-foreground/75 font-medium mt-5 leading-relaxed">
        · 자료는 출처 명시(visionc Academy) 후 사내 교육·재강의에 자유롭게 사용하실 수 있습니다.<br />
        · 상업적 재배포는 사전 문의 부탁드립니다.
      </p>
    </div>
  )
}
