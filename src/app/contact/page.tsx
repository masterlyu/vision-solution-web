'use client'
import { useState } from 'react'
import { Mail, Globe, Clock, Loader2, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch {}
    setLoading(false)
    setDone(true)
  }

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const inputCls = 'w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all'
  const labelCls = 'text-foreground/70 text-sm font-medium mb-1.5 block'

  if (done) return (
    <div className="min-h-screen pt-28 pb-24 bg-background flex items-center justify-center">
      <div className="bg-card border border-border rounded-2xl p-14 text-center max-w-md w-full mx-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-7 h-7 text-primary" strokeWidth={1.5} />
        </div>
        <h2 className="text-foreground text-2xl font-bold mb-3">문의가 접수됐습니다</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">영업일 기준 1일 내 이메일로 연락드립니다.</p>
      </div>
    </div>
  )

  const info = [
    { icon: Mail,  title: '이메일',    val: 'biztalktome@gmail.com', href: 'mailto:biztalktome@gmail.com' },
    { icon: Globe, title: '웹사이트',  val: 'visionc.co.kr',         href: null },
    { icon: Clock, title: '응답 시간', val: '영업일 기준 48시간 내',  href: null },
  ]

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-16">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">CONTACT</p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">문의하기</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            견적은 무료입니다.<br />48시간 내 답장드립니다.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* Left: info cards */}
          <div className="space-y-4">
            {info.map(i => (
              <div key={i.title} className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-200 group">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all">
                  <i.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-foreground font-bold mb-1">{i.title}</h3>
                {i.href
                  ? <a href={i.href} className="text-primary text-sm hover:underline">{i.val}</a>
                  : <span className="text-muted-foreground text-sm">{i.val}</span>}
              </div>
            ))}
          </div>

          {/* Right: form */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-8">
            <h2 className="text-foreground text-xl font-bold mb-6">무료 상담 신청</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>이름 <span className="text-primary">*</span></label>
                  <input type="text" value={form.name} onChange={set('name')} placeholder="홍길동" required className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>이메일 <span className="text-primary">*</span></label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="example@company.com" required className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>회사명</label>
                <input type="text" value={form.company} onChange={set('company')} placeholder="(선택)" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>문의 서비스 <span className="text-primary">*</span></label>
                <select value={form.service} onChange={set('service')} required className={inputCls}>
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
                <label className={labelCls}>문의 내용 <span className="text-primary">*</span></label>
                <textarea value={form.message} onChange={set('message')} rows={5} required
                  placeholder="현재 상황과 원하시는 내용을 자유롭게 적어주세요."
                  className={`${inputCls} resize-none`} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-sm">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />전송 중...</> : '문의 전송 →'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
