'use client'
import { useEffect, useState } from 'react'
import { CheckCircle, Loader2, Mail, XCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'

type Step = 'scanning' | 'done' | 'expired' | 'error'

export default function ScanVerifyClient({ token }: { token: string }) {
  const [step, setStep]     = useState<Step>('scanning')
  const [grade, setGrade]   = useState('')
  const [total, setTotal]   = useState(0)
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    if (!token) { setErrMsg('토큰이 없습니다.'); setStep('error'); return }

    fetch('/api/analyze/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setErrMsg(data.error)
          setStep(data.error.includes('만료') || data.error.includes('사용') || data.error.includes('유효') ? 'expired' : 'error')
        } else {
          setGrade(data.grade ?? '')
          setTotal(data.total ?? 0)
          setStep('done')
        }
      })
      .catch((e) => { setErrMsg(e?.message ?? 'Network error'); setStep('error') })
  }, [token])

  const card = 'max-w-md mx-auto mt-24 bg-card border border-border rounded-2xl p-10 text-center space-y-5 shadow-xl'

  if (step === 'scanning') return (
    <div className={card}>
      <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
      <div>
        <h2 className="text-foreground font-bold text-xl mb-2">인증 완료! 보안 진단 중...</h2>
        <p className="text-muted-foreground text-sm">사이트를 분석하고 있습니다. 잠시만 기다려 주세요.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
        {['보안 헤더', 'SSL/TLS', '민감 파일', 'CORS', '이메일 보안'].map(s => (
          <span key={s} className="px-2 py-1 bg-primary/5 rounded-full">{s}</span>
        ))}
      </div>
    </div>
  )

  if (step === 'done') return (
    <div className={card}>
      <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h2 className="text-foreground font-bold text-xl mb-2">진단 완료! 리포트 발송됨</h2>
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-4">
          <Mail className="w-4 h-4" />
          <span>이메일로 PDF 리포트를 전송했습니다</span>
        </div>
        {grade && (
          <div className="inline-flex items-center gap-4 bg-primary/10 border border-primary/20 rounded-xl px-6 py-4">
            <div>
              <p className="text-muted-foreground text-xs">종합 등급</p>
              <p className="text-primary text-4xl font-black">{grade}</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <p className="text-muted-foreground text-xs">종합 점수</p>
              <p className="text-foreground text-4xl font-black">
                {total}<span className="text-sm font-normal text-muted-foreground">점</span>
              </p>
            </div>
          </div>
        )}
      </div>
      <p className="text-muted-foreground text-sm">스팸함도 확인해 주세요. 상담이 필요하시면 이메일로 연락주세요.</p>
      <Link href="/security" className="inline-block text-primary text-sm hover:underline">
        다른 사이트 진단하기
      </Link>
    </div>
  )

  if (step === 'expired') return (
    <div className={card}>
      <div className="w-16 h-16 rounded-full bg-[var(--accent-amber)]/10 border border-[var(--accent-amber)]/20 flex items-center justify-center mx-auto">
        <RefreshCw className="w-8 h-8 text-[var(--accent-amber)]" />
      </div>
      <div>
        <h2 className="text-foreground font-bold text-xl mb-2">인증 링크가 만료됐습니다</h2>
        <p className="text-muted-foreground text-sm">인증 링크는 24시간 동안 유효합니다. 다시 신청해 주세요.</p>
      </div>
      <Link href="/security"
        className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors">
        다시 신청하기
      </Link>
    </div>
  )

  return (
    <div className={card}>
      <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto">
        <XCircle className="w-8 h-8 text-destructive" />
      </div>
      <div>
        <h2 className="text-foreground font-bold text-xl mb-2">오류가 발생했습니다</h2>
        {errMsg && <p className="text-destructive text-xs font-mono mt-1 mb-2 break-all">{errMsg}</p>}
        <p className="text-muted-foreground text-sm">잠시 후 다시 시도하거나 이메일로 문의해 주세요.</p>
        <p className="text-primary text-sm mt-2">biztalktome@gmail.com</p>
      </div>
      <Link href="/security" className="inline-block text-primary text-sm hover:underline">
        처음으로
      </Link>
    </div>
  )
}
