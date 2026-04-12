'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' })
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await new Promise(r => setTimeout(r, 1000))
    setDone(true)
  }

  if (done) return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-6">
      <div className="glass rounded-2xl p-12 text-center max-w-md border border-[#C8001F]/30">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-white text-2xl font-bold mb-3">문의 접수 완료!</h2>
        <p className="text-gray-400">빠른 시일 내 {form.email}로 연락드리겠습니다.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#C8001F] text-sm font-medium mb-3 tracking-widest">CONTACT</p>
          <h1 className="text-4xl font-black text-white mb-4">무료 상담 신청</h1>
          <p className="text-gray-500">24시간 내 담당자가 연락드립니다</p>
        </div>

        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              ['name', '담당자명 *', '홍길동', 'text', true],
              ['company', '회사명', '(주)비전솔루션', 'text', false],
              ['email', '이메일 *', 'email@company.com', 'email', true],
              ['phone', '연락처', '010-0000-0000', 'tel', false],
            ].map(([key, label, ph, type, req]) => (
              <div key={key as string}>
                <label className="text-gray-400 text-sm mb-1 block">{label as string}</label>
                <input
                  type={type as string}
                  placeholder={ph as string}
                  required={req as boolean}
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm(p => ({ ...p, [key as string]: e.target.value }))}
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#C8001F] focus:outline-none transition-colors" />
              </div>
            ))}
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">관심 서비스</label>
            <select value={form.service} onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:border-[#C8001F] focus:outline-none transition-colors">
              <option value="">선택해주세요</option>
              {['웹 리뉴얼', '신규 제작', '유지보수', '보안 진단', '앱 개발', 'AI 솔루션', '기타'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-1 block">문의 내용</label>
            <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              rows={4} placeholder="프로젝트 내용, 예산, 일정 등을 자유롭게 적어주세요."
              className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:border-[#C8001F] focus:outline-none transition-colors resize-none" />
          </div>
          <button type="submit"
            className="w-full py-4 bg-[#C8001F] text-white font-bold rounded-xl hover:bg-[#E0001F] transition-all glow-red text-lg">
            상담 신청하기 →
          </button>
        </form>
      </div>
    </div>
  )
}
