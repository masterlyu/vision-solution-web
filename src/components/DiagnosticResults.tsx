'use client'
import { useRef } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Download, Send, ExternalLink } from 'lucide-react'
import type { AnalysisResult } from '@/lib/siteAnalyzer'

interface Props {
  result: AnalysisResult
  email: string
  company?: string
  onReport: () => void
  reporting: boolean
  reported: boolean
}

const SEVERITY_LABEL: Record<string, string> = { HIGH: '높음', MEDIUM: '중간', LOW: '낮음' }
const SEVERITY_CLS: Record<string, string> = {
  HIGH:   'bg-red-500/10 border-red-500/30 text-red-400',
  MEDIUM: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  LOW:    'bg-blue-500/10 border-blue-500/30 text-blue-400',
}
const GRADE_CLS: Record<string, string> = {
  A: 'text-green-400', B: 'text-lime-400', C: 'text-amber-400', D: 'text-orange-400', F: 'text-red-400',
}

function ScoreRing({ score, label }: { score: number; label: string }) {
  const r = 28, circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const color = score >= 80 ? '#4ade80' : score >= 60 ? '#facc15' : score >= 40 ? '#fb923c' : '#f87171'
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          transform="rotate(-90 36 36)" />
        <text x="36" y="41" textAnchor="middle" fill={color} fontSize="16" fontWeight="bold">{score}</text>
      </svg>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  )
}

export default function DiagnosticResults({ result, email, company, onReport, reporting, reported }: Props) {
  const reportRef = useRef<HTMLDivElement>(null)

  const handlePdf = async () => {
    if (!reportRef.current) return
    const { default: jsPDF } = await import('jspdf')
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(reportRef.current, {
      backgroundColor: '#0d0d14',
      scale: 2,
      useCORS: true,
    })
    const img = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ unit: 'px', format: 'a4', compress: true })
    const pw = pdf.internal.pageSize.getWidth()
    const ph = pdf.internal.pageSize.getHeight()
    const ratio = canvas.width / canvas.height
    const imgH = pw / ratio
    let y = 0
    while (y < imgH) {
      if (y > 0) pdf.addPage()
      pdf.addImage(img, 'PNG', 0, -y, pw, imgH)
      y += ph
    }
    const domain = new URL(result.url).hostname
    pdf.save(`visionc-report-${domain}.pdf`)
  }

  const highCount  = result.headers.filter(h => !h.present && h.severity === 'HIGH').length
  const medCount   = result.headers.filter(h => !h.present && h.severity === 'MEDIUM').length
  const passCount  = result.headers.filter(h => h.present).length

  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex gap-3">
        <button onClick={handlePdf}
          className="flex-1 flex items-center justify-center gap-2 bg-card border border-border hover:border-primary/50 text-foreground text-sm font-medium py-3 rounded-xl transition-all">
          <Download className="w-4 h-4" /> PDF 다운로드
        </button>
        <button onClick={onReport} disabled={reporting || reported}
          className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium py-3 rounded-xl transition-all disabled:opacity-60">
          <Send className="w-4 h-4" />
          {reported ? '전송 완료 ✓' : reporting ? '전송 중...' : '상담 신청하기'}
        </button>
      </div>

      {/* Report content (this gets captured for PDF) */}
      <div ref={reportRef} className="bg-background rounded-2xl p-6 space-y-6">

        {/* Header */}
        <div className="border-b border-border pb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-1">WEB DIAGNOSTIC REPORT</p>
              <h2 className="text-foreground text-xl font-black break-all">{result.url}</h2>
              <p className="text-muted-foreground text-xs mt-1">{result.analyzedAt} · {email}{company ? ` · ${company}` : ''}</p>
            </div>
            <div className={`text-5xl font-black shrink-0 ${GRADE_CLS[result.score.grade]}`}>
              {result.score.grade}
            </div>
          </div>
        </div>

        {/* Scores */}
        <div>
          <h3 className="text-foreground font-bold text-sm mb-4">종합 점수</h3>
          <div className="flex justify-around">
            <ScoreRing score={result.score.security}    label="보안" />
            <ScoreRing score={result.score.seo}         label="SEO" />
            <ScoreRing score={result.score.performance} label={result.performance.available ? '성능' : '성능(추정)'} />
            <ScoreRing score={result.score.total}       label="종합" />
          </div>
        </div>

        {/* Summary badges */}
        <div className="flex flex-wrap gap-2">
          {result.ssl.valid
            ? <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400"><CheckCircle className="w-3 h-3" /> HTTPS 정상</span>
            : <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400"><XCircle className="w-3 h-3" /> HTTPS 미설정</span>
          }
          {highCount > 0
            ? <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400"><AlertTriangle className="w-3 h-3" /> 위험 {highCount}건</span>
            : <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400"><CheckCircle className="w-3 h-3" /> 위험 없음</span>
          }
          {medCount > 0 && <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400"><AlertTriangle className="w-3 h-3" /> 경고 {medCount}건</span>}
          <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary"><CheckCircle className="w-3 h-3" /> 통과 {passCount}건</span>
        </div>

        {/* Security headers */}
        <div>
          <h3 className="text-foreground font-bold text-sm mb-3">보안 헤더 점검</h3>
          <div className="space-y-2">
            {result.headers.map(h => (
              <div key={h.key} className={`rounded-xl border p-4 ${h.present ? 'bg-green-500/5 border-green-500/20' : SEVERITY_CLS[h.severity]}`}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    {h.present
                      ? <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                      : <XCircle className="w-4 h-4 shrink-0" />}
                    <span className="text-sm font-mono font-semibold">{h.label}</span>
                  </div>
                  {!h.present && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${SEVERITY_CLS[h.severity]}`}>
                      {SEVERITY_LABEL[h.severity]}
                    </span>
                  )}
                </div>
                {!h.present ? (
                  <p className="text-xs leading-relaxed ml-6 opacity-80">{h.description}</p>
                ) : h.value && (
                  <p className="text-xs font-mono ml-6 text-green-400/70 truncate">{h.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SEO */}
        {result.seo.issues.length > 0 && (
          <div>
            <h3 className="text-foreground font-bold text-sm mb-3">SEO 점검</h3>
            <div className="space-y-2">
              {result.seo.title && (
                <div className="bg-card border border-border rounded-xl p-3 text-xs">
                  <span className="text-muted-foreground">Title: </span>
                  <span className="text-foreground">{result.seo.title}</span>
                </div>
              )}
              {result.seo.issues.map(issue => (
                <div key={issue} className="flex items-center gap-2 bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-amber-400 text-xs">{issue}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance */}
        {result.performance.available && (
          <div>
            <h3 className="text-foreground font-bold text-sm mb-3">성능 (Google PageSpeed)</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'LCP', val: result.performance.lcp, unit: 's', div: 1000, good: 2500 },
                { label: 'FCP', val: result.performance.fcp, unit: 's', div: 1000, good: 1800 },
                { label: 'CLS', val: result.performance.cls, unit: '', div: 1,    good: 0.1 },
              ].map(m => m.val != null && (
                <div key={m.label} className="bg-card border border-border rounded-xl p-3 text-center">
                  <p className="text-muted-foreground text-xs mb-1">{m.label}</p>
                  <p className={`text-lg font-bold ${(m.val / m.div) <= m.good ? 'text-green-400' : 'text-amber-400'}`}>
                    {(m.val / m.div).toFixed(m.div === 1 ? 3 : 1)}{m.unit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estimate */}
        <div>
          <h3 className="text-foreground font-bold text-sm mb-3">견적서 (예상 비용)</h3>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-muted-foreground font-medium px-4 py-2.5">서비스</th>
                  <th className="text-left text-muted-foreground font-medium px-4 py-2.5">예상 비용</th>
                </tr>
              </thead>
              <tbody>
                {result.estimate.items.map((item, i) => (
                  <tr key={i} className={i < result.estimate.items.length - 1 ? 'border-b border-border' : ''}>
                    <td className="px-4 py-3">
                      <p className="text-foreground font-medium">{item.name}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{item.reason}</p>
                    </td>
                    <td className="px-4 py-3 text-primary font-bold whitespace-nowrap">{item.priceRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-border bg-primary/5 text-xs text-muted-foreground">
              ※ 실제 견적은 상담 후 확정됩니다. 부가세 별도.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border pt-4 flex items-center justify-between">
          <span className="text-muted-foreground text-xs">VISIONC — visionc.co.kr</span>
          <a href="mailto:biztalktome@gmail.com" className="text-primary text-xs hover:underline flex items-center gap-1">
            biztalktome@gmail.com <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>

      {reported && (
        <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
          <p className="text-foreground text-sm font-medium">상담 신청이 접수됐습니다.</p>
          <p className="text-muted-foreground text-xs mt-1">영업일 기준 1일 내 연락드립니다.</p>
        </div>
      )}
    </div>
  )
}
