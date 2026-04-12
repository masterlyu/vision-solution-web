'use client'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  serviceType: 'renewal' | 'maintenance' | 'security'
  title: string
  notice?: string
}

export default function UrlAnalysisForm({ serviceType, title, notice }: Props) {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceType, url, email, company }),
      })
    } catch {}
    setLoading(false)
    setDone(true)
  }

  const inputCls = "w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground text-sm placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"

  if (done) return (
    <div className="bg-primary/10 border border-primary/30 rounded-2xl text-center p-10">
      <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
      <h3 className="text-foreground text-xl font-bold mb-2">분석 요청 완료!</h3>
      <p className="text-muted-foreground text-sm">AI 분석이 시작됩니다. 결과는 이메일로 발송됩니다.</p>
      <p className="text-primary font-semibold mt-2">{email}</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-7 space-y-4">
      <h3 className="text-foreground font-bold text-lg">{title}</h3>
      <div>
        <label className="text-muted-foreground text-sm font-medium mb-1.5 block">분석할 사이트 URL <span className="text-primary">*</span></label>
        <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" required className={inputCls} />
      </div>
      <div>
        <label className="text-muted-foreground text-sm font-medium mb-1.5 block">이메일 주소 <span className="text-primary">*</span></label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="결과 리포트를 받을 이메일" required className={inputCls} />
      </div>
      <div>
        <label className="text-muted-foreground text-sm font-medium mb-1.5 block">회사명 <span className="text-muted-foreground/50">(선택)</span></label>
        <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="회사 또는 담당자명" className={inputCls} />
      </div>
      {serviceType === 'security' && (
        <label className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} required className="mt-0.5 w-4 h-4 flex-shrink-0 accent-primary" />
          <span className="text-muted-foreground text-sm leading-relaxed">
            본인이 소유하거나 운영자로부터 서면 허가를 받은 사이트임을 확인합니다.
            <br /><span className="text-amber-500 text-sm">무단 진단은 정보통신망법 위반입니다.</span>
          </span>
        </label>
      )}
      {notice && (
        <p className="text-muted-foreground text-sm bg-secondary/30 rounded-xl p-4 border border-border leading-relaxed">{notice}</p>
      )}
      <Button type="submit" disabled={loading || (serviceType === 'security' && !agreed)}
        className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white disabled:opacity-40">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" />AI 분석 요청 중...</> : '무료 분석 신청 →'}
      </Button>
    </form>
  )
}
