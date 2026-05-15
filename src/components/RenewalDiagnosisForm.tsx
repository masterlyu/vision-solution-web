'use client'
import { useState } from 'react'
import { Loader2, CheckCircle, AlertCircle, Globe, Mail } from 'lucide-react'

interface AxisItem {
  id: string
  title: string
  currentState: string
  status: 'red' | 'yellow' | 'green'
  impact: 'high' | 'mid' | 'low'
  tobe: string
}

interface AxisResult {
  score: number
  max: number
  items: AxisItem[]
}

interface DiagResult {
  grade: string
  totalScore: number
  siteType: string
  criticalIssues: string[]
  axes: { technical: AxisResult; ux: AxisResult; modern: AxisResult }
  techStack: string | null
  loadTimeMs: number
}

function extractBaseDomain(raw: string): string {
  return raw.trim().replace(/^https?:\/\//, '').split('/')[0].replace(/^www\./, '').toLowerCase()
}

function extractEmailDomain(email: string): string {
  return (email.split('@')[1] ?? '').toLowerCase()
}

const gradeColors: Record<string, string> = {
  A: '#10b981', B: '#84cc16', 'C+': '#f59e0b', D: '#f97316', F: '#ef4444',
}

export default function RenewalDiagnosisForm() {
  const [url, setUrl] = useState('')
  const [email, setEmail] = useState('')
  const [domainError, setDomainError] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<DiagResult | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [consent, setConsent] = useState(false)

  function validateDomain() {
    if (!url || !email) return true
    const site = extractBaseDomain(url)
    const mail = extractEmailDomain(email)
    if (!site || !mail) return true
    if (site !== mail) {
      setDomainError(`이메일 도메인(${mail})이 사이트 도메인(${site})과 일치하지 않습니다`)
      return false
    }
    setDomainError('')
    return true
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateDomain()) return

    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/renewal-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email }),
      })
      const data = await res.json()
      if (!res.ok) { setErrorMsg(data.error ?? '오류가 발생했습니다.'); setState('error'); return }
      setResult(data)
      setState('done')
    } catch {
      setErrorMsg('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
      setState('error')
    }
  }

  const inputCls = 'w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition'

  if (state === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-6">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <div className="text-center">
          <p className="text-foreground font-bold text-lg mb-2">사이트를 분석하고 있습니다</p>
          <p className="text-muted-foreground text-sm">기술 스택 감지 · 3축 진단 · 리포트 생성 중...</p>
          <p className="text-muted-foreground text-xs mt-2">약 20~40초 소요됩니다</p>
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground">
          {['기술 기반', '사용자 경험', '현대 기준'].map(t => (
            <span key={t} className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium animate-pulse">{t}</span>
          ))}
        </div>
      </div>
    )
  }

  if (state === 'done' && result) {
    const gc = gradeColors[result.grade] ?? '#6b7280'
    return (
      <div className="space-y-5">
        {/* Grade banner */}
        <div className="rounded-2xl p-6 text-center" style={{ background: `linear-gradient(135deg, #1e3a5f, #1e40af)` }}>
          <p className="text-white/70 text-sm mb-2">홈페이지 성과 진단 결과</p>
          <div className="text-6xl font-black mb-1" style={{ color: gc }}>{result.grade}</div>
          <div className="text-white text-2xl font-bold">{result.totalScore}점 / 100점</div>
          <div className="text-white/60 text-xs mt-2">{result.siteType} · {result.techStack ?? '스택 감지 없음'}</div>
        </div>

        {/* Axis scores */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '⚙️ 기술', ...result.axes.technical },
            { label: '👥 경험', ...result.axes.ux },
            { label: '🌐 현대', ...result.axes.modern },
          ].map(ax => {
            const pct = ax.score / ax.max
            const color = pct >= 0.7 ? '#10b981' : pct >= 0.5 ? '#f59e0b' : '#ef4444'
            return (
              <div key={ax.label} className="bg-card border border-border rounded-xl p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">{ax.label}</div>
                <div className="text-2xl font-black" style={{ color }}>{ax.score}</div>
                <div className="text-xs text-muted-foreground">/{ax.max}점</div>
                <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct * 100}%`, backgroundColor: color }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Detailed axis breakdown */}
        {([
          { label: '⚙️ 기술 기반', key: 'technical' as const },
          { label: '👥 사용자 경험', key: 'ux' as const },
          { label: '🌐 현대 기준', key: 'modern' as const },
        ]).map(({ label, key }) => {
          const ax = result.axes[key]
          const pct = ax.score / ax.max
          const color = pct >= 0.7 ? '#10b981' : pct >= 0.5 ? '#f59e0b' : '#ef4444'
          return (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-foreground">{label}</p>
                <span className="text-sm font-black" style={{ color }}>{ax.score}<span className="text-xs text-muted-foreground font-normal">/{ax.max}점</span></span>
              </div>
              <div className="space-y-1.5">
                {ax.items.map(item => (
                  <div key={item.id} className={`rounded-lg px-3 py-2.5 border text-xs ${
                    item.status === 'red'
                      ? 'bg-destructive/8 border-destructive/25'
                      : item.status === 'yellow'
                        ? 'bg-amber-50/80 border-amber-200/60 dark:bg-amber-950/20 dark:border-amber-800/40'
                        : 'bg-emerald-50/80 border-emerald-200/60 dark:bg-emerald-950/20 dark:border-emerald-800/40'
                  }`}>
                    <div className="flex items-start gap-2">
                      <span className={`shrink-0 text-[10px] mt-0.5 ${
                        item.status === 'red' ? 'text-destructive' :
                        item.status === 'yellow' ? 'text-amber-500' : 'text-emerald-500'
                      }`}>●</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="font-semibold text-foreground leading-tight">{item.title}</p>
                          {item.impact === 'high' && item.status !== 'green' && (
                            <span className="shrink-0 text-[9px] font-bold bg-destructive/15 text-destructive px-1.5 py-0.5 rounded-full">고영향</span>
                          )}
                        </div>
                        <p className="text-muted-foreground leading-snug">{item.currentState}</p>
                        {item.status !== 'green' && (
                          <p className="text-primary mt-1 leading-snug">→ {item.tobe}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* Email confirmation */}
        <div className="flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl px-4 py-4">
          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-sm font-bold text-foreground">상세 리포트가 이메일로 발송되었습니다</p>
            <p className="text-xs text-muted-foreground mt-0.5">{email} — PDF 첨부 포함</p>
          </div>
        </div>

        <button
          onClick={() => { setState('idle'); setResult(null); setUrl(''); setEmail('') }}
          className="w-full py-3 border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition">
          다른 사이트 진단하기
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* URL */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          <Globe className="inline w-4 h-4 mr-1 text-primary" />
          진단할 홈페이지 주소 <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          value={url}
          onChange={e => { setUrl(e.target.value); setDomainError('') }}
          onBlur={validateDomain}
          placeholder="https://www.your-company.co.kr"
          required
          className={inputCls}
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          <Mail className="inline w-4 h-4 mr-1 text-primary" />
          회사 이메일 <span className="text-primary">*</span>
          <span className="ml-2 text-xs text-muted-foreground font-normal">사이트 도메인과 동일해야 합니다</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setDomainError('') }}
          onBlur={validateDomain}
          placeholder={url ? `info@${extractBaseDomain(url) || 'your-company.co.kr'}` : 'info@your-company.co.kr'}
          required
          className={inputCls}
        />
        {domainError && (
          <div className="flex items-center gap-2 mt-2 text-destructive text-xs">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {domainError}
          </div>
        )}
      </div>

      {/* Domain match notice */}
      {url && email && !domainError && extractBaseDomain(url) && extractEmailDomain(email) && (
        <div className="flex items-center gap-2 text-xs text-primary bg-primary/10 rounded-lg px-3 py-2">
          <CheckCircle className="w-3.5 h-3.5 shrink-0" />
          도메인 일치 확인 — <span className="font-bold">{extractBaseDomain(url)}</span>
        </div>
      )}

      {state === 'error' && (
        <div className="flex items-start gap-2 bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          {errorMsg}
        </div>
      )}

      {/* Consent */}
      <div className="bg-secondary/60 border border-border rounded-xl px-4 py-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={e => setConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 shrink-0 accent-primary cursor-pointer"
          />
          <div>
            <p className="text-sm text-foreground leading-snug">
              본인이 소유하거나 운영자로부터 허가받은 사이트임을 확인합니다.
            </p>
            <p className="text-xs text-destructive mt-1 font-medium">
              무단 진단은 정보통신망법 위반입니다.
            </p>
          </div>
        </label>
      </div>

      <button
        type="submit"
        disabled={!!domainError || !consent}
        className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed text-base shadow-lg shadow-primary/30">
        무료 진단 시작 →
      </button>

      <p className="text-center text-xs text-muted-foreground">
        분석 20~40초 소요 · 결과는 입력한 이메일로 PDF와 함께 발송됩니다<br />
        <span className="text-primary/70">* 실제 사이트 소유자 확인을 위해 회사 이메일이 필요합니다</span>
      </p>
    </form>
  )
}
