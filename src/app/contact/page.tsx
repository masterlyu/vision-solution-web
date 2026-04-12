"use client"
import { useState } from 'react'
import { Mail, Globe, Clock, Loader2 } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    setLoading(false)
    setDone(true)
  }

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  if (done) return (
    <div className="section min-h-screen pt-28 bg-[#09090B] flex items-center justify-center">
      <div className="card-highlight text-center max-w-md w-full p-12">
        <div className="w-14 h-14 rounded-full bg-brand/20 flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
        <h2 className="text-white text-2xl font-bold mb-2">문의가 접수됐습니다</h2>
        <p className="text-neutral-300 text-sm">영업일 기준 1일 내 이메일로 연락드립니다.</p>
      </div>
    </div>
  )

  const info = [
    { icon: Mail,  title: '이메일', val: 'biztalktome@gmail.com', href: 'mailto:biztalktome@gmail.com' },
    { icon: Globe, title: '웹사이트', val: 'visionc.co.kr', href: null },
    { icon: Clock, title: '응답 시간', val: '영업일 기준 48시간 내', href: null },
  ]

  return (
    <div className="section min-h-screen pt-28 bg-[#09090B]">
      <div className="container-base">
        <div className="text-center mb-12">
          <span className="label">CONTACT</span>
          <h1 className="section-title">문의하기</h1>
          <p className="section-sub">48시간 내 답장드립니다. 견적은 무료입니다.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-4">
            {info.map(i => (
              <div key={i.title} className="card">
                <div className="icon-box group"><i.icon className="w-5 h-5 text-brand" strokeWidth={1.5} /></div>
                <h3 className="text-white font-bold mb-1">{i.title}</h3>
                {i.href
                  ? <a href={i.href} className="text-brand text-sm hover:underline">{i.val}</a>
                  : <span className="text-neutral-300 text-sm">{i.val}</span>}
              </div>
            ))}
          </div>
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-neutral-300 text-sm font-medium mb-1.5 block">이름 <span className="text-brand">*</span></label>
                  <input type="text" value={form.name} onChange={set('name')} placeholder="홍길동" required className="input" />
                </div>
                <div>
                  <label className="text-neutral-300 text-sm font-medium mb-1.5 block">이메일 <span className="text-brand">*</span></label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="example@company.com" required className="input" />
                </div>
              </div>
              <div>
                <label className="text-neutral-300 text-sm font-medium mb-1.5 block">회사명</label>
                <input type="text" value={form.company} onChange={set('company')} placeholder="(선택)" className="input" />
              </div>
              <div>
                <label className="text-neutral-300 text-sm font-medium mb-1.5 block">문의 서비스 <span className="text-brand">*</span></label>
                <select value={form.service} onChange={set('service')} required className="input">
                  <option value="">선택하세요</option>
                  <option value="renewal">홈페이지 리뉴얼</option>
                  <option value="new-website">신규 사이트 구축</option>
                  <option value="maintenance">유지보수</option>
                  <option value="security">보안 진단</option>
                  <option value="app-dev">앱·시스템 개발</option>
                  <option value="ai-solution">AI 솔루션</option>
                  <option value="other">기타</option>
                </select>
              </div>
              <div>
                <label className="text-neutral-300 text-sm font-medium mb-1.5 block">문의 내용 <span className="text-brand">*</span></label>
                <textarea value={form.message} onChange={set('message')} rows={5} required
                  placeholder="현재 상황과 원하시는 내용을 자유롭게 적어주세요."
                  className="input resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />전송 중...</> : '문의 전송 →'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
