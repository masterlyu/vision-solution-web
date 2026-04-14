'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, ShieldAlert, Clock, TrendingUp, AlertTriangle } from 'lucide-react'

interface ScanSummary {
  high: number; medium: number; low: number; informational: number; total: number
}

interface ScanRecord {
  id: string
  profile: 'baseline' | 'full' | 'api'
  targetUrl: string
  scannedAt: string
  durationSec: number
  summary: ScanSummary
  zapScore: number
  reportUrl?: string
  triggeredBy: 'ci' | 'schedule' | 'manual'
}

const PROFILE_LABEL: Record<string, string> = {
  baseline: 'Baseline',
  full:     'Full',
  api:      'API',
}

const TRIGGER_LABEL: Record<string, string> = {
  ci:       '배포 자동',
  schedule: '주간 스케줄',
  manual:   '수동 실행',
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? '#22C55E' : score >= 60 ? '#F59E0B' : '#EF4444'
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border-4"
        style={{ borderColor: color, color }}
      >
        {score}
      </div>
      <span className="text-xs text-gray-400 mt-1">ZAP 점수</span>
    </div>
  )
}

function AlertBadge({ count, label, color }: { count: number; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center px-3">
      <span className="text-lg font-bold" style={{ color: count > 0 ? color : '#6B7280' }}>{count}</span>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  )
}

function TrendChart({ records }: { records: ScanRecord[] }) {
  if (records.length < 2) return null
  const recent = [...records].slice(0, 10).reverse()
  const maxScore = 100
  return (
    <div className="bg-gray-900 rounded-xl p-5 mb-6">
      <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-purple-400" />
        ZAP 점수 추이 (최근 {recent.length}회)
      </h3>
      <div className="flex items-end gap-1 h-20">
        {recent.map((r, i) => {
          const h = Math.round((r.zapScore / maxScore) * 80)
          const color = r.zapScore >= 80 ? '#22C55E' : r.zapScore >= 60 ? '#F59E0B' : '#EF4444'
          return (
            <div key={i} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-xs text-gray-400">{r.zapScore}</span>
              <div
                className="w-full rounded-t"
                style={{ height: `${h}px`, backgroundColor: color, opacity: 0.85 }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ScanHistoryPage() {
  const [records, setRecords] = useState<ScanRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    fetch('/api/zap-scan?limit=20')
      .then(r => r.json())
      .then(d => { setRecords(d.records ?? []); setLoading(false) })
      .catch(() => { setError('데이터를 불러오는 중 오류가 발생했습니다.'); setLoading(false) })
  }, [])

  const latest = records[0]
  const avgScore = records.length
    ? Math.round(records.slice(0, 5).reduce((s, r) => s + r.zapScore, 0) / Math.min(records.length, 5))
    : null

  return (
    <main className="min-h-screen bg-gray-950 text-white pt-20 pb-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <ShieldCheck className="w-8 h-8 text-purple-400" />
          <div>
            <h1 className="text-2xl font-bold">OWASP ZAP 스캔 대시보드</h1>
            <p className="text-gray-400 text-sm mt-1">visionc.co.kr 자동화 취약점 스캔 이력</p>
          </div>
        </div>

        {/* Summary cards */}
        {latest && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: '최근 ZAP 점수', value: `${latest.zapScore}점`, icon: <ShieldCheck className="w-5 h-5 text-purple-400" />, color: latest.zapScore >= 80 ? 'text-green-400' : latest.zapScore >= 60 ? 'text-yellow-400' : 'text-red-400' },
              { label: '5회 평균 점수', value: avgScore != null ? `${avgScore}점` : '-', icon: <TrendingUp className="w-5 h-5 text-blue-400" />, color: 'text-blue-300' },
              { label: '마지막 스캔', value: latest.scannedAt.slice(0, 10), icon: <Clock className="w-5 h-5 text-gray-400" />, color: 'text-gray-300' },
              { label: '총 스캔 횟수', value: `${records.length}회`, icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />, color: 'text-yellow-300' },
            ].map(c => (
              <div key={c.label} className="bg-gray-900 rounded-xl p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-gray-400">{c.icon}{c.label}</div>
                <span className={`text-xl font-bold ${c.color}`}>{c.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Trend chart */}
        <TrendChart records={records} />

        {/* Records */}
        {loading && <p className="text-gray-400 text-center py-12">스캔 이력 불러오는 중...</p>}
        {error   && <p className="text-red-400 text-center py-12">{error}</p>}

        {!loading && !error && records.length === 0 && (
          <div className="bg-gray-900 rounded-xl p-10 text-center">
            <ShieldAlert className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">아직 스캔 이력이 없습니다.</p>
            <p className="text-gray-500 text-sm mt-1">GitHub Actions에서 ZAP 스캔을 실행하면 이곳에 기록됩니다.</p>
          </div>
        )}

        <div className="space-y-4">
          {records.map(rec => (
            <div key={rec.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-900 text-purple-300">
                      {PROFILE_LABEL[rec.profile] ?? rec.profile}
                    </span>
                    <span className="text-xs text-gray-500">
                      {TRIGGER_LABEL[rec.triggeredBy] ?? rec.triggeredBy}
                    </span>
                    <span className="text-xs text-gray-500">·</span>
                    <span className="text-xs text-gray-500">{rec.durationSec}초</span>
                  </div>
                  <p className="text-sm text-gray-300 font-mono">{rec.targetUrl}</p>
                  <p className="text-xs text-gray-500 mt-1">{rec.scannedAt}</p>
                </div>

                <ScoreRing score={rec.zapScore} />
              </div>

              <div className="flex items-center gap-1 mt-4 border-t border-gray-800 pt-4">
                <AlertBadge count={rec.summary.high}   label="High"   color="#EF4444" />
                <div className="w-px h-8 bg-gray-800" />
                <AlertBadge count={rec.summary.medium} label="Medium" color="#F59E0B" />
                <div className="w-px h-8 bg-gray-800" />
                <AlertBadge count={rec.summary.low}    label="Low"    color="#3B82F6" />
                <div className="w-px h-8 bg-gray-800" />
                <AlertBadge count={rec.summary.informational} label="정보" color="#6B7280" />

                {rec.reportUrl && (
                  <a
                    href={rec.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-xs text-purple-400 hover:text-purple-300 underline"
                  >
                    상세 리포트 →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/security" className="text-sm text-purple-400 hover:text-purple-300">
            ← 보안 서비스로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  )
}
