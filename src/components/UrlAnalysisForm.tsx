'use client'
import { useState } from 'react'

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
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setDone(true)
  }

  if (done) return (
    <div className="glass rounded-2xl p-10 text-center border border-[#C8001F]/30 bg-[#C8001F]/5">
      <div className="w-16 h-16 rounded-full bg-[#C8001F]/20 flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
      <h3 className="text-white text-xl font-bold mb-2">분석 요청 완료!</h3>
      <p className="text-gray-400 text-sm">AI 분석이 시작됩니다.</p>
      <p className="text-white font-semibold mt-1">{email}</p>
      <p className="text-gray-500 text-xs mt-3">영업일 기준 1~2일 내 발송됩니다.</p>
    </div>
  )

  const inputCls = "w-full bg-[#111] border border-[#2E2E2E] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:border-[#C8001F] focus:outline-none focus:ring-1 focus:ring-[#C8001F]/30 transition-all"

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-7 border border-[#2E2E2E]">
      <h3 className="text-white font-bold text-lg mb-6">{title}</h3>
      <div className="space-y-4">
        <div>
          <label className="text-gray-500 text-xs font-medium mb-1.5 block">분석할 사이트 URL <span className="text-[#C8001F]">*</span></label>
          <input type="url" value={url} onChange={e => setUrl(e.target.value)}
            placeholder="https://example.com" required className={inputCls} />
        </div>
        <div>
          <label className="text-gray-500 text-xs font-medium mb-1.5 block">이메일 주소 <span className="text-[#C8001F]">*</span></label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="결과 리포트를 받을 이메일" required className={inputCls} />
        </div>
        <div>
          <label className="text-gray-500 text-xs font-medium mb-1.5 block">회사명 <span className="text-gray-600">(선택)</span></label>
          <input type="text" value={company} onChange={e => setCompany(e.target.value)}
            placeholder="회사 또는 담당자명" className={inputCls} />
        </div>

        {serviceType === 'security' && (
          <label className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
              required className="mt-0.5 accent-[#C8001F] w-4 h-4 flex-shrink-0" />
            <span className="text-gray-400 text-xs leading-relaxed">
              본인이 소유하거나 운영자로부터 서면 허가를 받은 사이트임을 확인합니다.
              <br /><span className="text-yellow-600">무단 진단은 정보통신망법 위반입니다.</span>
            </span>
          </label>
        )}

        {notice && (
          <p className="text-gray-600 text-xs bg-[#111] rounded-xl p-4 border border-[#1E1E1E] leading-relaxed">
            💡 {notice}
          </p>
        )}

        <button type="submit"
          disabled={loading || (serviceType === 'security' && !agreed)}
          className="w-full btn-primary justify-center text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none">
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              AI 분석 요청 중...
            </>
          ) : '무료 분석 신청 →'}
        </button>
      </div>
    </form>
  )
}
