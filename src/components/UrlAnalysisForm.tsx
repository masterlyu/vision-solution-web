'use client'
import { useState } from 'react'
import { Loader2, Globe, Shield, Search, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DiagnosticResults from './DiagnosticResults'
import type { AnalysisResult } from '@/lib/siteAnalyzer'

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
  const [step, setStep]       = useState<'form' | 'analyzing' | 'done'>('form')
  const [progress, setProgress] = useState(0)
  const [result, setResult]   = useState<AnalysisResult | null>(null)
  const [reporting, setReporting] = useState(false)
  const [reported, setReported]   = useState(false)

  const inputCls = "w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground text-sm placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep('analyzing')
    setProgress(0)

    // Fake progress while API runs
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 85) { clearInterval(timer); return p }
        return p + Math.random() * 8
      })
    }, 600)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data: AnalysisResult = await res.json()
      clearInterval(timer)
      setProgress(100)
      await new Promise(r => setTimeout(r, 400))
      setResult(data)
      setStep('done')
    } catch {
      clearInterval(timer)
      setStep('form')
      alert('분석 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }

  const handleReport = async () => {
    if (!result) return
    setReporting(true)
    try {
      await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result, email, company }),
      })
    } catch {}
    setReporting(false)
    setReported(true)
  }

  if (step === 'analyzing') return (
    <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-6">
      <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
        <Loader2 className="w-7 h-7 text-primary animate-spin" />
      </div>
      <div>
        <h3 className="text-foreground font-bold text-lg mb-1">사이트 분석 중...</h3>
        <p className="text-muted-foreground text-sm">{url}</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {STEPS.map((s, i) => {
          const threshold = ((i + 1) / STEPS.length) * 90
          const active = progress >= (i / STEPS.length) * 90
          return (
            <div key={s.label} className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition-all ${
              active ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-background border-border text-muted-foreground'
            }`}>
              <s.icon className="w-3.5 h-3.5 shrink-0" />
              <span className="text-xs font-medium">{s.label}</span>
              {active && <Loader2 className="w-3 h-3 animate-spin ml-auto" />}
            </div>
          )
        })}
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>진행 중</span><span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <p className="text-muted-foreground text-xs">보안 헤더, SEO, Google PageSpeed 분석 중 (10~20초 소요)</p>
    </div>
  )

  if (step === 'done' && result) return (
    <DiagnosticResults
      result={result}
      email={email}
      company={company}
      onReport={handleReport}
      reporting={reporting}
      reported={reported}
    />
  )

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-7 space-y-4">
      <h3 className="text-foreground font-bold text-lg">{title}</h3>
      <div>
        <label className="text-muted-foreground text-sm font-medium mb-1.5 block">분석할 사이트 URL <span className="text-primary">*</span></label>
        <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" required className={inputCls} />
      </div>
      <div>
        <label className="text-muted-foreground text-sm font-medium mb-1.5 block">이메일 <span className="text-primary">*</span></label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="결과를 받을 이메일" required className={inputCls} />
      </div>
      <div>
        <label className="text-muted-foreground text-sm font-medium mb-1.5 block">회사명 <span className="text-muted-foreground/50">(선택)</span></label>
        <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="회사 또는 담당자명" className={inputCls} />
      </div>
      {serviceType === 'security' && (
        <label className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required className="mt-0.5 w-4 h-4 flex-shrink-0 accent-primary" />
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
        무료 진단 시작 →
      </Button>
    </form>
  )
}
