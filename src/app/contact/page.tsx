'use client'
import { useState, useEffect } from 'react'
import { Mail, Globe, Clock, Loader2, MessageSquare, Shield, MonitorCheck } from 'lucide-react'
import Mascot from '@/components/Mascot'
import UrlAnalysisForm from '@/components/UrlAnalysisForm'
import RenewalDiagnosisForm from '@/components/RenewalDiagnosisForm'

type Tab = 'contact' | 'security' | 'renewal'

const TABS = [
  { id: 'contact'  as Tab, label: '일반 상담',    Icon: MessageSquare },
  { id: 'security' as Tab, label: '보안 점검',    Icon: Shield },
  { id: 'renewal'  as Tab, label: '홈페이지 진단', Icon: MonitorCheck },
]

export default function ContactPage() {
  const [tab, setTab] = useState<Tab>('contact')
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [pentestAgree, setPentestAgree] = useState(false)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const service = params.get('service')
    if (service === 'security') setTab('security')
    else if (service === 'renewal') setTab('renewal')
    else if (service === 'pentest') {
      setTab('contact')
      setForm(prev => ({ ...prev, service: 'pentest' }))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.service === 'pentest' && !pentestAgree) return
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pentestAgreed: form.service === 'pentest' ? pentestAgree : undefined }),
      })
    } catch {}
    setLoading(false)
    setDone(true)
  }

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const inputCls = 'w-full bg-secondary border-2 border-primary/50 rounded-xl px-5 py-4 text-foreground text-[1.05rem] placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/40 transition-all'
  const labelCls = 'text-foreground text-base font-bold mb-2 block'

  const info = [
    { icon: Mail,  title: '이메일',    val: 'biztalktome@gmail.com', href: 'mailto:biztalktome@gmail.com' },
    { icon: Globe, title: '웹사이트',  val: 'visionc.co.kr',         href: null },
    { icon: Clock, title: '응답 시간', val: '영업일 기준 1일 내',  href: null },
  ]

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-16">
          <div className="flex justify-center mb-6">
            <Mascot pose="inquiry" category="support" size="md" className="h-56 w-auto" alt="VISIONC 마스코트 — 문의하기" />
          </div>
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">CONTACT</p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">도입 상담 신청</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            도입 상담은 무료입니다.<br />영업일 기준 1일 내 답장드립니다.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

          {/* Left: info cards */}
          <div className="space-y-4">
            <div className="flex justify-center mb-2">
              <Mascot pose="greeting" category="situation" size="sm" className="h-28 w-auto" bubble="무엇이든 물어보세요!" bubbleDir="right" />
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

          {/* Right: tabbed forms */}
          <div className="lg:col-span-2 relative bg-card border-2 border-primary/60 rounded-2xl shadow-[0_4px_40px_rgba(var(--primary-rgb),0.25)] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-primary pointer-events-none" />

            {/* Tab bar */}
            <div className="flex border-b border-border pt-5 px-5 gap-1">
              {TABS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-bold transition-all whitespace-nowrap
                    ${tab === id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-8">

              {/* 일반 상담 */}
              {tab === 'contact' && (
                done ? (
                  <div className="py-10 text-center">
                    <div className="flex justify-center mb-4">
                      <Mascot pose="cheer" category="emotion" size="sm" className="h-28 w-auto" bubble="문의 접수 완료!" bubbleDir="right" />
                    </div>
                    <h2 className="text-foreground text-2xl font-bold mb-3">문의가 접수됐습니다</h2>
                    <p className="text-muted-foreground text-sm">영업일 기준 1일 내 이메일로 답장드립니다.</p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-foreground text-2xl font-black mb-6">💼 도입 상담 신청</h2>
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
                          <option value="pentest">모의해킹 진단 (29만원)</option>
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

                      {form.service === 'pentest' && (
                        <div className="bg-primary/5 border border-primary/30 rounded-xl p-5">
                          <p className="text-foreground text-sm font-bold mb-3">모의해킹 진단 신청 시 아래 사항에 동의해주세요</p>
                          <ul className="text-muted-foreground text-xs space-y-1.5 mb-4 leading-relaxed">
                            <li className="flex items-start gap-2"><span className="text-primary font-bold shrink-0">✓</span><span>사전 서면 동의 후에만 진단이 시작됩니다 (정보통신망법 준수)</span></li>
                            <li className="flex items-start gap-2"><span className="text-primary font-bold shrink-0">✓</span><span>비파괴 진단 원칙 — 시스템 변경·데이터 심기 없음</span></li>
                            <li className="flex items-start gap-2"><span className="text-primary font-bold shrink-0">✓</span><span>NDA 체결 + 보고서 전달 즉시(당일) 회사 측 데이터 일괄 삭제</span></li>
                            <li className="flex items-start gap-2"><span className="text-primary font-bold shrink-0">✓</span><span>결과는 진단 시점 기준 (이후 시스템 변경분 별도 진단 필요)</span></li>
                            <li className="flex items-start gap-2"><span className="text-primary font-bold shrink-0">✓</span><span>진단 결과 의사결정·운영 책임은 이용자에게 귀속</span></li>
                          </ul>
                          <label className="flex items-start gap-2 text-sm text-foreground cursor-pointer">
                            <input type="checkbox" checked={pentestAgree} onChange={e => setPentestAgree(e.target.checked)} required className="mt-1 accent-[var(--primary)]" />
                            <span className="leading-relaxed">위 진단 원칙·법적 사항 전체에 동의합니다. 정식 계약 시 별도 동의서로 한 번 더 안내받습니다.</span>
                          </label>
                          <p className="text-muted-foreground text-xs mt-3">
                            상세 약관: <a href="/terms" className="text-primary hover:underline">이용약관</a> · <a href="/privacy" className="text-primary hover:underline">개인정보처리방침</a>
                          </p>
                        </div>
                      )}

                      <button type="submit" disabled={loading || (form.service === 'pentest' && !pentestAgree)}
                        className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed text-base shadow-lg shadow-primary/40 hover:shadow-primary/60">
                        {loading ? <><Loader2 className="w-5 h-5 animate-spin" />전송 중...</> : '문의 전송 →'}
                      </button>
                      <p className="text-center text-muted-foreground text-sm">영업일 기준 1일 내 이메일로 답장드립니다</p>
                    </form>
                  </>
                )
              )}

              {/* 보안 점검 */}
              {tab === 'security' && (
                <>
                  <h2 className="text-foreground text-2xl font-black mb-6">사이트 보안 셀프 점검</h2>
                  <UrlAnalysisForm
                    serviceType="security"
                    title="사이트 보안 셀프 점검"
                    notice="도메인 이메일 인증 후 자동 분석 → PDF 리포트 발송 (인증 링크 24시간 유효)"
                    embedded
                  />
                </>
              )}

              {/* 홈페이지 진단 */}
              {tab === 'renewal' && (
                <>
                  <h2 className="text-foreground text-2xl font-black mb-6">홈페이지 현황 자동 진단</h2>
                  <RenewalDiagnosisForm />
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
