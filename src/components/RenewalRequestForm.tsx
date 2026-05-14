'use client'
import { useState } from 'react'
import { Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  title: string
  notice?: string
}

export default function RenewalRequestForm({ title, notice }: Props) {
  const [form, setForm] = useState({ url: '', name: '', email: '', company: '' })
  const [step, setStep] = useState<'form' | 'loading' | 'done' | 'error'>('form')

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const inputCls = "w-full bg-secondary border-2 border-primary/50 rounded-xl px-5 py-4 text-foreground text-[1.05rem] placeholder:text-foreground/45 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep('loading')
    try {
      const message = form.url
        ? `리뉴얼·무료진단 상담 신청\n분석 요청 사이트: ${form.url}`
        : '리뉴얼·무료진단 상담 신청'
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          service: 'renewal',
          message,
        }),
      })
      setStep('done')
    } catch {
      setStep('error')
    }
  }

  if (step === 'done') return (
    <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-5">
      <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h3 className="text-foreground font-bold text-xl mb-2">상담 신청이 접수됐습니다</h3>
        <p className="text-muted-foreground text-sm">영업일 기준 48시간 내 이메일로 연락드립니다.</p>
      </div>
      <button onClick={() => { setStep('form'); setForm({ url: '', name: '', email: '', company: '' }) }}
        className="text-primary text-sm hover:underline">
        다시 신청하기 →
      </button>
    </div>
  )

  if (step === 'error') return (
    <div className="bg-card border border-border rounded-2xl p-8 text-center space-y-4">
      <p className="text-foreground font-bold">전송 중 오류가 발생했습니다</p>
      <p className="text-muted-foreground text-sm">잠시 후 다시 시도하거나, 이메일로 직접 문의해주세요.</p>
      <p className="text-primary text-sm">biztalktome@gmail.com</p>
      <button onClick={() => setStep('form')} className="text-primary text-sm hover:underline">다시 시도 →</button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="relative bg-card border-2 border-primary/60 rounded-2xl p-7 space-y-5 shadow-[0_4px_40px_rgba(var(--primary-rgb),0.25)]">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-primary rounded-t-2xl pointer-events-none" />
      <h3 className="text-foreground font-black text-2xl mb-2">{title}</h3>
      <div>
        <label className="text-foreground text-base font-bold mb-2 block">
          현재 사이트 URL <span className="text-muted-foreground/50">(선택)</span>
        </label>
        <input
          type="text"
          value={form.url}
          onChange={set('url')}
          placeholder="example.com"
          className={inputCls}
        />
      </div>
      <div>
        <label className="text-foreground text-base font-bold mb-2 block">
          이름 <span className="text-primary">*</span>
        </label>
        <input type="text" value={form.name} onChange={set('name')}
          placeholder="홍길동" required className={inputCls} />
      </div>
      <div>
        <label className="text-foreground text-base font-bold mb-2 block">
          이메일 <span className="text-primary">*</span>
          <span className="text-muted-foreground/60 font-normal ml-2">— 상담 연락처</span>
        </label>
        <input type="email" value={form.email} onChange={set('email')}
          placeholder="example@company.com" required className={inputCls} />
      </div>
      <div>
        <label className="text-foreground text-base font-bold mb-2 block">
          회사명 <span className="text-muted-foreground/50">(선택)</span>
        </label>
        <input type="text" value={form.company} onChange={set('company')}
          placeholder="회사 또는 담당자명" className={inputCls} />
      </div>
      {notice && (
        <p className="text-foreground/45 text-sm bg-foreground/5 border border-foreground/10 rounded-xl p-4 leading-relaxed">{notice}</p>
      )}
      <Button type="submit" disabled={step === 'loading'}
        className="w-full h-14 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold disabled:opacity-40 shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-all">
        {step === 'loading'
          ? <><Loader2 className="w-5 h-5 animate-spin mr-2" />전송 중...</>
          : '무료 상담 신청하기 →'}
      </Button>
      <p className="text-center text-muted-foreground text-sm">전문가가 직접 검토 후 48시간 내 이메일로 연락드립니다</p>
    </form>
  )
}
