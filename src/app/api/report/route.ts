import { NextRequest, NextResponse } from 'next/server'
import type { AnalysisResult } from '@/lib/siteAnalyzer'
import { env } from '@/lib/env'

const TOKEN = env.TELEGRAM_BOT_TOKEN
const CHAT_ID = env.TELEGRAM_CHAT_ID

export async function POST(req: NextRequest) {
  const { result, email, company } = await req.json() as { result: AnalysisResult; email: string; company?: string }

  const gradeEmoji: Record<string, string> = { A: '🟢', B: '🟡', C: '🟠', D: '🔴', F: '⛔' }
  const g = gradeEmoji[result.score.grade] ?? '❓'

  const highMissing = result.headers.filter(h => !h.present && h.severity === 'HIGH').map(h => h.label)
  const medMissing  = result.headers.filter(h => !h.present && h.severity === 'MEDIUM').map(h => h.label)

  const lines = [
    `${g} <b>웹 진단 리포트 신청</b>`,
    ``,
    `🌐 URL: <code>${result.url}</code>`,
    `📧 이메일: ${email}`,
    company ? `🏢 회사: ${company}` : null,
    ``,
    `📊 <b>종합 점수: ${result.score.total}점 (등급 ${result.score.grade})</b>`,
    `  · 보안: ${result.score.security}점`,
    `  · SEO: ${result.score.seo}점`,
    `  · 성능: ${result.score.performance}점${result.performance.available ? '' : ' (추정)'}`,
    ``,
    result.ssl.valid ? `✅ SSL: 정상` : `❌ SSL: HTTPS 미설정`,
    highMissing.length > 0 ? `🚨 HIGH 위험: ${highMissing.join(', ')}` : `✅ HIGH 위험 없음`,
    medMissing.length > 0  ? `⚠️ MEDIUM 위험: ${medMissing.join(', ')}` : null,
    ``,
    result.seo.issues.length > 0 ? `🔍 SEO 이슈: ${result.seo.issues.join(' / ')}` : `✅ SEO 기본 충족`,
    result.performance.available && result.performance.lcp
      ? `⚡ LCP: ${(result.performance.lcp / 1000).toFixed(1)}s  FCP: ${((result.performance.fcp ?? 0) / 1000).toFixed(1)}s`
      : null,
    ``,
    `💰 <b>견적</b>`,
    ...result.estimate.items.map(i => `  · ${i.name}: <b>${i.priceRange}</b>\n    (${i.reason})`),
    ``,
    `⏰ ${result.analyzedAt}`,
  ].filter((l): l is string => l !== null)

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: lines.join('\n'), parse_mode: 'HTML' }),
  })

  return NextResponse.json({ ok: true })
}
