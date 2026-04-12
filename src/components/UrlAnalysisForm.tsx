'use client'
import { useState } from 'react'

interface Props {
  serviceType: 'renewal' | 'maintenance' | 'security'
  title: string
  placeholder?: string
  notice?: string
}

export default function UrlAnalysisForm({ serviceType, title, placeholder, notice }: Props) {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url || !email) return
    if (serviceType === 'security' && !agreed) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setLoading(false)
    setDone(true)
  }

  if (done) return (
    <div className="glass rounded-2xl p-8 text-center border border-[#C8001F]/30">
      <div className="text-5xl mb-4">✅</div>
      <h3 className="text-white text-xl font-bold mb-2">분석 요청 완료!</h3>
      <p className="text-gray-400 text-sm">AI 분석이 시작됩니다. 결과는 <strong className="text-white">{email}</strong>로 발송됩니다.</p>
      <p className="text-gray-600 text-xs mt-3">보통 24~48시간 내 발송됩니다.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 border border-[#2A2A2A] hover:border-[#C8001F]/30 transition-all">
      <h3 className="text-white font-bold text-lg mb-6">{title}</h3>
      <div className="space-y-4">
        <div>
          <label className="text-gray-400 text-sm mb-1 block">분석할 사이트 URL *</label>
          <input type="url" value={url} onChange={e => setUrl(e.target.value)}
            placeholder={placeholder || 'https://example.com'}
            required
            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#C8001F] focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-1 block">이메일 주소 *</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="결과를 받을 이메일"
            required
            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#C8001F] focus:outline-none transition-colors" />
        </div>
        <div>
          <label className="text-gray-400 text-sm mb-1 block">회사명 (선택)</label>
          <input type="text" value={company} onChange={e => setCompany(e.target.value)}
            placeholder="회사 또는 담당자명"
            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#C8001F] focus:outline-none transition-colors" />
        </div>
        {serviceType === 'security' && (
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
              className="mt-1 accent-[#C8001F]" required />
            <span className="text-gray-400 text-sm">
              본인이 소유하거나 운영자로부터 허가를 받은 사이트임을 확인합니다.
              무단 진단은 정보통신망법 위반입니다.
            </span>
          </label>
        )}
        {notice && <p className="text-gray-600 text-xs bg-[#1A1A1A] rounded-lg p-3">{notice}</p>}
        <button type="submit" disabled={loading || (serviceType === 'security' && !agreed)}
          className="w-full py-4 bg-[#C8001F] text-white font-bold rounded-xl hover:bg-[#E0001F] transition-all disabled:opacity-50 disabled:cursor-not-allowed glow-red">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              AI 분석 중...
            </span>
          ) : '무료 분석 신청 →'}
        </button>
      </div>
    </form>
  )
}
