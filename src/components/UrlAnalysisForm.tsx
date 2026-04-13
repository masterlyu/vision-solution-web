'use client'
import { useState } from 'react'
import { Loader2, Globe, Shield, Search, Zap, Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  serviceType: 'renewal' | 'maintenance' | 'security'
  title: string
  notice?: string
}

const STEPS = [
  { icon: Globe,  label: 'URL 접근' },
  { icon: Shield, label: '보안 헤더' },
  { icon: Search, label: 'SEO 분석' },
  { icon: Zap,    label: '성능 측정' },
]

export default function UrlAnalysisForm({ serviceType, title, notice }: Props) {
  const [url, setUrl]         = useState('')
  const [email, setEmail]     = useState('')
  const [company, setCompany] = useState('')
  const [agreed, setAgreed]   = useState(false)
  const [step, setStep]       = useState<'form' | 'analyzing' | 'done' | 'error'>('form')
  const [progress, setProgress] = useState(0)
  const [grade, setGrade]     = useState('')
  const [total, setTotal]     = useState(0)

  const inputCls = "w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground text-sm placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"

  const normalizeUrl = (raw: string) => {
    const t = raw.trim()
    if (!t) return ''
    return /^https?:\/\//i.test(t) ? t : `https://${t}`
  }

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
      <p className="text-muted-foreground text-xs">보안·SEO·성능 분석 후 PDF 리포트를 이메일로 발송합니다 (20~40초)</p>
    </div>
  )

  // ── Done ──
  if (step === 'done') return (
    <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-5">
      <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h3 className="text-foreground font-bold text-xl mb-2">리포트가 발송됐습니다</h3>
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-3">
          <Mail className="w-4 h-4" />
          <span className="text-primary font-medium">{email}</span>
          <span>으로 전송됨</span>
        </div>
        {grade && (
          <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-xl px-5 py-3 mt-2">
            <div>
              <p className="text-muted-foreground text-xs">종합 등급</p>
              <p className="text-primary text-3xl font-black">{grade}</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-muted-foreground text-xs">종합 점수</p>
              <p className="text-foreground text-3xl font-black">{total}<span className="text-sm font-normal text-muted-foreground">점</span></p>
            </div>
          </div>
        )}
      </div>
      <div className="text-muted-foreground text-sm space-y-1">
        <p>📄 상세 진단 결과 및 수정 견적서가 첨부됩니다.</p>
        <p>스팸함을 확인해주세요. 영업일 기준 1일 내 상담 연락드립니다.</p>
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
      <p className="text-foreground font-bold">분석 중 오류가 발생했습니다</p>
      <p className="text-muted-foreground text-sm">잠시 후 다시 시도하거나, 이메일로 직접 문의해주세요.</p>
      <p className="text-primary text-sm">biztalktome@gmail.com</p>
      <button onClick={() => setStep('form')} className="text-primary text-sm hover:underline">다시 시도 →</button>
    </div>
  )

  // ── Form ──
  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-7 space-y-4">
      <h3 className="text-foreground font-bold text-lg">{title}</h3>
      <div>
        <label className="text-muted-foreground text-sm font-medium mb-1.5 block">
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
        <label className="text-muted-foreground text-sm font-medium mb-1.5 block">
          이메일 <span className="text-primary">*</span>
          <span className="text-muted-foreground/60 font-normal ml-2">— 진단 리포트 PDF 발송</span>
        </label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="report@example.com" required className={inputCls} />
      </div>
      <div>
        <label className="text-muted-foreground text-sm font-medium mb-1.5 block">
          회사명 <span className="text-muted-foreground/50">(선택)</span>
        </label>
        <input type="text" value={company} onChange={e => setCompany(e.target.value)}
          placeholder="회사 또는 담당자명" className={inputCls} />
      </div>
      {serviceType === 'security' && (
        <label className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required
            className="mt-0.5 w-4 h-4 flex-shrink-0 accent-primary" />
          <span className="text-muted-foreground text-sm leading-relaxed">
            본인이 소유하거나 운영자로부터 허가받은 사이트임을 확인합니다.
            <br /><span className="text-amber-500 text-xs">무단 진단은 정보통신망법 위반입니다.</span>
          </span>
        </label>
      )}
      {notice && (
        <p className="text-muted-foreground text-sm bg-border/20 rounded-xl p-4 leading-relaxed">{notice}</p>
      )}
      <Button type="submit" disabled={serviceType === 'security' && !agreed}
        className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white disabled:opacity-40">
        무료 진단 후 리포트 받기 →
      </Button>
      <p className="text-center text-muted-foreground text-xs">분석 완료 후 입력한 이메일로 PDF 리포트와 견적서가 발송됩니다</p>
    </form>
  )
}
