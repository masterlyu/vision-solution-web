'use client'
import { useState } from 'react'

const SERVICE_OPTIONS = ['웹 리뉴얼', '신규 제작', '유지보수', '보안 진단', '앱 개발', 'AI 솔루션', '기타']

export default function ContactPage() {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setDone(true)
  }

  const inputCls = "w-full bg-[#111] border border-[#2E2E2E] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:border-[#C8001F] focus:outline-none focus:ring-1 focus:ring-[#C8001F]/30 transition-all"

  if (done) return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-6">
      <div className="glass rounded-2xl p-14 text-center max-w-md border border-[#C8001F]/30 bg-[#C8001F]/5">
        <div className="w-20 h-20 rounded-full bg-[#C8001F]/15 border border-[#C8001F]/30 flex items-center justify-center text-4xl mx-auto mb-5">🎉</div>
        <h2 className="text-white text-2xl font-bold mb-3">문의 접수 완료!</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          <strong className="text-white">{email}</strong>로<br />
          빠른 시일 내 연락드리겠습니다.<br />
          <span className="text-gray-600 text-xs mt-2 block">보통 24시간 이내 회신됩니다.</span>
        </p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-label">CONTACT</span>
          <h1 className="text-4xl font-black text-white mb-3">무료 상담 신청</h1>
          <p className="text-gray-500 text-sm">24시간 내 담당자가 연락드립니다</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-gray-500 text-xs font-medium mb-1.5 block">
                담당자명 <span className="text-[#C8001F]">*</span>
              </label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="홍길동" required className={inputCls} />
            </div>
            <div>
              <label className="text-gray-500 text-xs font-medium mb-1.5 block">회사명</label>
              <input type="text" value={company} onChange={e => setCompany(e.target.value)}
                placeholder="(주)비전솔루션" className={inputCls} />
            </div>
            <div>
              <label className="text-gray-500 text-xs font-medium mb-1.5 block">
                이메일 <span className="text-[#C8001F]">*</span>
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="email@company.com" required className={inputCls} />
            </div>
            <div>
              <label className="text-gray-500 text-xs font-medium mb-1.5 block">연락처</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="010-0000-0000" className={inputCls} />
            </div>
          </div>
          <div>
            <label className="text-gray-500 text-xs font-medium mb-1.5 block">관심 서비스</label>
            <select value={service} onChange={e => setService(e.target.value)}
              className={inputCls + ' cursor-pointer'}>
              <option value="">선택해주세요</option>
              {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-gray-500 text-xs font-medium mb-1.5 block">문의 내용</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)}
              rows={4}
              placeholder="프로젝트 내용, 예산, 일정 등을 자유롭게 적어주세요."
              className={inputCls + ' resize-none'} />
          </div>
          <button type="submit" disabled={loading}
            className="w-full btn-primary justify-center text-sm disabled:opacity-50">
            {loading
              ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> 전송 중...</>
              : '상담 신청하기 →'}
          </button>
          <p className="text-gray-600 text-xs text-center">
            입력하신 정보는 상담 목적으로만 사용되며 외부에 공유되지 않습니다.
          </p>
        </form>
      </div>
    </div>
  )
}
