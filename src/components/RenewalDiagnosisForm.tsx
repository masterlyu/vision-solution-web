'use client'
import { useState } from 'react'
import { Loader2, CheckCircle, AlertCircle, Globe, Mail } from 'lucide-react'

function extractBaseDomain(raw: string): string {
  return raw.trim().replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '').toLowerCase()
}

function extractEmailDomain(email: string): string {
  return (email.split('@')[1] ?? '').toLowerCase()
}

export default function RenewalDiagnosisForm() {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [domainError, setDomainError] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [consent, setConsent] = useState(false)

  const ADMIN_EMAILS = ['biztalktome@gmail.com']

  function validateDomain() {
    if (!url || !email) return true
    if (ADMIN_EMAILS.includes(email.toLowerCase())) return true
    const site = extractBaseDomain(url)
    const mail = extractEmailDomain(email)
    if (!site || !mail) return true
    if (site !== mail) {
      setDomainError(`이메일 도메인(${mail})이 사이트 도메인(${site})과 일치하지 않습니다`)
      return false
    }
    setDomainError('')
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateDomain()) return

    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/renewal-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email }),
      })
      const data = await res.json()
      if (!res.ok) { setErrorMsg(data.error ?? '오류가 발생했습니다.'); setState('error'); return }
      setState('done')
    } catch {
      setErrorMsg('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
      setState('error')
    }
  }

  const inputCls = 'w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition'

  if (state === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-6">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <div className="text-center">
          <p className="text-foreground font-bold text-lg mb-2">사이트를 분석하고 있습니다</p>
          <p className="text-muted-foreground text-sm">기술 스택 감지 · 3축 진단 · 리포트 생성 중...</p>
          <p className="text-muted-foreground text-xs mt-2">약 20~40초 소요됩니다</p>
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground">
          {['기술 기반', '사용자 경험', '현대 기준'].map(t => (
            <span key={t} className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium animate-pulse">{t}</span>
          ))}
        </div>
      </div>
    )
  }

  if (state === 'done') {
    return (
      <div className="flex flex-col items-center text-center py-10 gap-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <div>
          <p className="text-foreground font-bold text-lg mb-2">진단이 완료되었습니다</p>
          <p className="text-muted-foreground text-sm">
            홈페이지 운영상태진단 리포트를 아래 이메일로 발송했습니다.
          </p>
          <p className="text-primary font-semibold text-sm mt-1">{email}</p>
          <p className="text-muted-foreground text-xs mt-3">PDF 보고서 첨부 · 수신까지 1~2분 소요될 수 있습니다</p>
        </div>
        <button
          onClick={() => { setState('idle'); setUrl(''); setEmail(''); setConsent(false) }}
          className="mt-2 px-6 py-2.5 border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition">
          다른 사이트 진단하기
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* URL */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          <Globe className="inline w-4 h-4 mr-1 text-primary" />
          진단할 홈페이지 주소 <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          value={url}
          onChange={e => { setUrl(e.target.value); setDomainError('') }}
          onBlur={validateDomain}
          placeholder="https://www.your-company.co.kr"
          required
          className={inputCls}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          <Mail className="inline w-4 h-4 mr-1 text-primary" />
          회사 이메일 <span className="text-primary">*</span>
          <span className="ml-2 text-xs text-muted-foreground font-normal">사이트 도메인과 동일해야 합니다</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setDomainError('') }}
          onBlur={validateDomain}
          placeholder={url ? `info@${extractBaseDomain(url) || 'your-company.co.kr'}` : 'info@your-company.co.kr'}
          required
          className={inputCls}
        />
        {domainError && (
          <div className="flex items-center gap-2 mt-2 text-destructive text-xs">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {domainError}
          </div>
        )}
      </div>

      {/* Domain match notice */}
      {url && email && !domainError && extractBaseDomain(url) && (
        <div className="flex items-center gap-2 text-xs text-primary bg-primary/10 rounded-lg px-3 py-2">
          <CheckCircle className="w-3.5 h-3.5 shrink-0" />
          {ADMIN_EMAILS.includes(email.toLowerCase())
            ? <>관리자 계정 — <span className="font-bold">모든 도메인 허용</span></>
            : <>도메인 일치 확인 — <span className="font-bold">{extractBaseDomain(url)}</span></>
          }
        </div>
      )}

      {state === 'error' && (
        <div className="flex items-start gap-2 bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          {errorMsg}
        </div>
      )}

      {/* Consent */}
      <div className="bg-secondary/60 border border-border rounded-xl px-4 py-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={e => setConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 shrink-0 accent-primary cursor-pointer"
          />
          <div>
            <p className="text-sm text-foreground leading-snug">
              본인이 소유하거나 운영자로부터 허가받은 사이트임을 확인합니다.
            </p>
            <p className="text-xs text-destructive mt-1 font-medium">
              무단 진단은 정보통신망법 위반입니다.
            </p>
          </div>
        </label>
      </div>

      <button
        type="submit"
        disabled={!!domainError || !consent}
        className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed text-base shadow-lg shadow-primary/30">
        무료 진단 시작 →
      </button>

      <p className="text-center text-xs text-muted-foreground">
        분석 20~40초 소요 · 결과는 입력한 이메일로 PDF와 함께 발송됩니다<br />
        <span className="text-primary/70">* 실제 사이트 소유자 확인을 위해 회사 이메일이 필요합니다</span>
      </p>
    </form>
  )
}
