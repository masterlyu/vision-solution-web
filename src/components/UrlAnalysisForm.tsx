'use client'
import { useState } from 'react'
import { Loader2, Globe, Shield, Search, Zap, Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  serviceType: 'renewal' | 'maintenance' | 'security'
  title: string
  notice?: string
  embedded?: boolean  // 외부 카드 안에 삽입될 때 자체 래퍼·타이틀 숨김
}

const STEPS = [
  { icon: Globe,  label: 'URL 접근' },
  { icon: Shield, label: '보안 헤더' },
  { icon: Search, label: 'SEO 분석' },
  { icon: Zap,    label: '성능 측정' },
]

export default function UrlAnalysisForm({ serviceType, title, notice, embedded = false }: Props) {
  const [url, setUrl]         = useState('')
  const [email, setEmail]     = useState('')
  const [company, setCompany] = useState('')
  const [agreed, setAgreed]   = useState(false)
  const [step, setStep]       = useState<'form' | 'analyzing' | 'done' | 'error'>('form')
  const [progress, setProgress] = useState(0)
  const [grade, setGrade]     = useState('')
  const [total, setTotal]     = useState(0)
  const [errorMsg, setErrorMsg] = useState('')

  const inputCls = "w-full bg-secondary border-2 border-primary/50 rounded-xl px-5 py-4 text-foreground text-[1.05rem] placeholder:text-foreground/45 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"

  const normalizeUrl = (raw: string) => {
    const t = raw.trim()
    if (!t) return ''
    return /^https?:\/\//i.test(t) ? t : `https://${t}`
  }

  const extractUrlDomain = (raw: string): string => {
    try {
      const normalized = normalizeUrl(raw)
      if (!normalized) return ''
      const hostname = new URL(normalized).hostname
      return hostname.replace(/^www\./i, '')
    } catch {
      return ''
    }
  }

  const extractEmailDomain = (emailVal: string): string => {
    const atIdx = emailVal.indexOf('@')
    if (atIdx < 0) return ''
    return emailVal.slice(atIdx + 1).toLowerCase()
  }

  const ADMIN_EMAILS = ['biztalktome@gmail.com']
  const urlDomain = extractUrlDomain(url)
  const emailDomain = extractEmailDomain(email)
  const domainMismatch =
    serviceType === 'security' &&
    url.trim() !== '' &&
    email.trim() !== '' &&
    urlDomain !== '' &&
    emailDomain !== '' &&
    !ADMIN_EMAILS.includes(email.toLowerCase()) &&
    urlDomain !== emailDomain

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const normalized = normalizeUrl(url)
    if (!normalized) return
    setUrl(normalized)
    setStep('analyzing')
    setProgress(0)

    const timer = setInterval(() => {
      setProgress(p => p >= 85 ? p : p + Math.random() * 6)
    }, 700)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalized, email, company }),
      })
      clearInterval(timer)

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || '서버 오류')
      }
      const data = await res.json()
      setProgress(100)
      setGrade(data.grade ?? '')
      setTotal(data.total ?? 0)
      await new Promise(r => setTimeout(r, 400))
      setStep('done')
    } catch (e: any) {
      clearInterval(timer)
      console.error(e)
      setErrorMsg(e.message || '알 수 없는 오류')
      setStep('error')
    }
  }

  // ── Analyzing ──
  if (step === 'analyzing') return (
    <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-6">
      <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
        <Loader2 className="w-7 h-7 text-primary animate-spin" />
      </div>
      <div>
        <h3 className="text-foreground font-bold text-lg mb-1">사이트 분석 중...</h3>
        <p className="text-muted-foreground text-sm truncate">{url}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {STEPS.map((s, i) => {
          const active = progress >= (i / STEPS.length) * 80
          return (
            <div key={s.label} className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition-all ${active ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-background border-border text-muted-foreground'}`}>
              <s.icon className="w-3.5 h-3.5 shrink-0" />
              <span className="text-xs font-medium">{s.label}</span>
              {active && <Loader2 className="w-3 h-3 animate-spin ml-auto" />}
            </div>
          )
        })}
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>분석 및 리포트 생성 중</span><span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <p className="text-muted-foreground text-xs">인증 이메일 발송 중... 잠시만 기다려 주세요</p>
    </div>
  )

  // ── Done ──
  // ── Done ──
  // ── Done ──
  if (step === 'done') return (
    <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-5">
      <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h3 className="text-foreground font-bold text-xl mb-2">인증 이메일이 발송됐습니다</h3>
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-3">
          <Mail className="w-4 h-4" />
          <span className="text-primary font-medium">{email}</span>
          <span>으로 인증 링크 전송</span>
        </div>
      </div>
      <div className="bg-primary/5 border border-primary/10 rounded-xl px-5 py-4 text-left text-sm space-y-2">
        <p className="font-semibold text-foreground">다음 단계</p>
        <p className="text-muted-foreground">① 이메일 수신함에서 인증 메일을 확인하세요</p>
        <p className="text-muted-foreground">② <strong className="text-foreground">인증하고 보안 진단 시작</strong> 버튼을 클릭하세요</p>
        <p className="text-muted-foreground">③ 진단 완료 후 리포트가 이메일로 자동 발송됩니다</p>
      </div>
      <div className="text-muted-foreground text-sm space-y-1">
        <p>인증 링크는 24시간 동안 유효합니다.</p>
        <p>스팸함도 확인해 주세요.</p>
      </div>
      <button onClick={() => { setStep('form'); setUrl(''); setEmail(''); setCompany('') }}
        className="text-primary text-sm hover:underline">
        다른 사이트 진단하기 →
      </button>
    </div>
  )


  // ── Error ──
  if (step === 'error') return (
    <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-4">
      <p className="text-foreground font-bold">요청 처리 중 오류가 발생했습니다</p>
      {errorMsg && <p className="text-destructive text-sm font-medium">{errorMsg}</p>}
      <p className="text-muted-foreground text-sm">잠시 후 다시 시도하거나, 이메일로 직접 문의해주세요.</p>
      <p className="text-primary text-sm">biztalktome@gmail.com</p>
      <button onClick={() => setStep('form')} className="text-primary text-sm hover:underline">다시 시도 →</button>
    </div>
  )

  // ── Form ──
  return (
    <form onSubmit={handleSubmit} className={embedded ? 'space-y-5' : 'relative bg-card border-2 border-primary/60 rounded-2xl p-7 space-y-5 shadow-[0_4px_40px_rgba(var(--primary-rgb),0.25)]'}>
      {!embedded && <div className="absolute inset-x-0 top-0 h-[3px] bg-primary rounded-t-2xl pointer-events-none" />}
      {!embedded && <h3 className="text-foreground font-black text-2xl mb-2">{title}</h3>}
      <div>
        <label className="text-foreground text-base font-bold mb-2 block">
          분석할 사이트 URL <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="example.com 또는 https://example.com"
          required
          className={inputCls}
        />
      </div>
      <div>
        <label className="text-foreground text-base font-bold mb-2 block">
          이메일 <span className="text-primary">*</span>
          <span className="text-muted-foreground/60 font-normal ml-2">— 진단 리포트 PDF 발송</span>
        </label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="report@example.com" required
          className={`${inputCls} ${domainMismatch ? 'border-[var(--accent-red)] focus:border-[var(--accent-red)] focus:ring-[var(--accent-red)]/30' : ''}`} />
        {domainMismatch && (
          <div className="mt-2 space-y-0.5">
            <p className="text-destructive text-xs font-medium">이메일 도메인이 일치하지 않습니다</p>
            <p className="text-destructive text-xs">
              진단 신청은 <strong>{urlDomain}</strong> 이메일로만 가능합니다.
              해당 사이트의 담당자 이메일을 입력해 주세요. (예: 담당자@{urlDomain})
            </p>
          </div>
        )}
      </div>
      <div>
        <label className="text-foreground text-base font-bold mb-2 block">
          회사명 <span className="text-muted-foreground/50">(선택)</span>
        </label>
        <input type="text" value={company} onChange={e => setCompany(e.target.value)}
          placeholder="회사 또는 담당자명" className={inputCls} />
      </div>
      {serviceType === 'security' && (
        <label className="flex items-start gap-3 p-4 rounded-xl bg-[var(--accent-amber)]/5 border border-[var(--accent-amber)]/20 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required
            className="mt-0.5 w-4 h-4 flex-shrink-0 accent-primary" />
          <span className="text-muted-foreground text-sm leading-relaxed">
            본인이 소유하거나 운영자로부터 허가받은 사이트임을 확인합니다.
            <br /><span className="text-[var(--accent-amber)] text-xs">무단 진단은 정보통신망법 위반입니다.</span>
          </span>
        </label>
      )}
      {notice && (
        <p className="text-foreground/45 text-sm bg-foreground/5 border border-foreground/10 rounded-xl p-4 leading-relaxed">{notice}</p>
      )}
      <Button type="submit" disabled={(serviceType === 'security' && !agreed) || domainMismatch}
        className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold disabled:opacity-40 shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-all">
        무료 진단 후 리포트 받기 →
      </Button>
      <p className="text-center text-muted-foreground text-sm">분석 완료 후 입력한 이메일로 PDF 리포트와 견적서가 발송됩니다</p>
    </form>
  )
}
