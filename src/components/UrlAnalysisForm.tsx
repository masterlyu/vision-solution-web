'use client'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

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

  if (done) return (
    <div className="card-highlight text-center p-10">
      <div className="w-14 h-14 rounded-full bg-brand/20 flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
      <h3 className="text-white text-xl font-bold mb-2">분석 요청 완료!</h3>
      <p className="text-neutral-300 text-sm">AI 분석이 시작됩니다. 결과는 이메일로 발송됩니다.</p>
      <p className="text-brand font-semibold mt-2">{email}</p>
      <p className="text-neutral-400 text-sm mt-1">영업일 기준 1~2일 내 발송됩니다.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h3 className="text-white font-bold text-lg">{title}</h3>
      <div>
        <label className="text-neutral-300 text-sm font-medium mb-1.5 block">분석할 사이트 URL <span className="text-brand">*</span></label>
        <input type="url" value={url} onChange={e => setUrl(e.target.value)}
          placeholder="https://example.com" required className="input" />
      </div>
      <div>
        <label className="text-neutral-300 text-sm font-medium mb-1.5 block">이메일 주소 <span className="text-brand">*</span></label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="결과 리포트를 받을 이메일" required className="input" />
      </div>
      <div>
        <label className="text-neutral-300 text-sm font-medium mb-1.5 block">회사명 <span className="text-neutral-500">(선택)</span></label>
        <input type="text" value={company} onChange={e => setCompany(e.target.value)}
          placeholder="회사 또는 담당자명" className="input" />
      </div>
      {serviceType === 'security' && (
        <label className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
            required className="mt-0.5 w-4 h-4 flex-shrink-0 accent-brand" />
          <span className="text-neutral-300 text-sm leading-relaxed">
            본인이 소유하거나 운영자로부터 서면 허가를 받은 사이트임을 확인합니다.
            <br /><span className="text-amber-500 text-sm">무단 진단은 정보통신망법 위반입니다.</span>
          </span>
        </label>
      )}
      {notice && (
        <p className="text-neutral-300 text-sm bg-neutral-900 rounded-xl p-4 border border-neutral-800 leading-relaxed">
          {notice}
        </p>
      )}
      <button type="submit"
        disabled={loading || (serviceType === 'security' && !agreed)}
        className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" />AI 분석 요청 중...</> : '무료 분석 신청 →'}
      </button>
    </form>
  )
}
