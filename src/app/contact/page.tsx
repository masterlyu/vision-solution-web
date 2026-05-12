'use client'
import { useState } from 'react'
import { Mail, Globe, Clock, Loader2 } from 'lucide-react'
import { VisiMascot } from '@/components/visi/VisiMascot'

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

  const inputCls = 'w-full bg-[var(--card-deep)] border-2 border-primary/35 rounded-xl px-4 py-4 text-foreground placeholder:text-foreground/35 text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all'
  const labelCls = 'text-foreground/90 text-sm font-semibold mb-2 block'

  if (done) return (
    <div className="min-h-screen pt-28 pb-24 bg-background flex items-center justify-center">
      <div className="bg-card border border-border rounded-2xl p-14 text-center max-w-md w-full mx-4">
        <div className="flex justify-center mb-4">
          <VisiMascot pose="thumbsUp" size={130} bubble="문의 접수 완료!" bubbleDir="right" />
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
            <div className="flex justify-center mb-2">
              <VisiMascot pose="wave" size={110} bubble="무엇이든 물어보세요!" bubbleDir="right" />
            </div>
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
          <div className="lg:col-span-2 bg-card border-2 border-primary/35 border-t-4 border-t-primary rounded-2xl p-8 shadow-[0_4px_40px_rgba(139,92,246,0.18)]">
            <h2 className="text-foreground text-2xl font-black mb-6">무료 상담 신청</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                <label className={labelCls}>회사명 <span className="text-foreground/30 font-normal text-xs ml-1">(선택)</span></label>
                <input type="text" value={form.company} onChange={set('company')} placeholder="회사명 또는 담당자명" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>문의 서비스 <span className="text-primary">*</span></label>
                <select value={form.service} onChange={set('service')} required
                  className={`${inputCls} appearance-none`}
                  style={{ colorScheme: 'dark' }}>
                  <option value="" disabled>어떤 서비스가 필요하신가요?</option>
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
                <textarea value={form.message} onChange={set('message')} rows={6} required
                  placeholder="현재 상황과 원하시는 내용을 자유롭게 적어주세요.&#10;예) 홈페이지 리뉴얼을 원하고, 예산은 OOO 정도입니다."
                  className={`${inputCls} resize-none leading-relaxed`} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-base shadow-lg shadow-primary/40 hover:shadow-primary/60">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" />전송 중...</> : '문의 전송 →'}
              </button>
              <p className="text-center text-muted-foreground text-xs">영업일 기준 48시간 내 이메일로 답장드립니다</p>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}
