import { NextRequest, NextResponse } from 'next/server'
import { analyzeUrl } from '@/lib/siteAnalyzer'
import { generatePdfBuffer } from '@/lib/pdfReport'
import { sendReportEmail } from '@/lib/emailSender'

const TOKEN   = process.env.TELEGRAM_BOT_TOKEN!
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!

export const maxDuration = 60

async function notifyTelegram(result: Awaited<ReturnType<typeof analyzeUrl>>, email: string, company?: string) {
  const g: Record<string, string> = { A: '🟢', B: '🟡', C: '🟠', D: '🔴', F: '⛔' }
  const emoji = g[result.score.grade] ?? '❓'
  const highMissing = result.headers.filter(h => !h.present && h.severity === 'HIGH').map(h => h.label)
  const medMissing  = result.headers.filter(h => !h.present && h.severity === 'MEDIUM').map(h => h.label)

  const lines = [
    `${emoji} <b>웹 진단 완료 — 리포트 발송됨</b>`,
    ``,
    `🌐 URL: <code>${result.url}</code>`,
    `📧 이메일: ${email}`,
    company ? `🏢 회사: ${company}` : null,
    ``,
    `📊 <b>종합: ${result.score.total}점 (등급 ${result.score.grade})</b>`,
    `  · 보안 ${result.score.security}점 / SEO ${result.score.seo}점 / 성능 ${result.score.performance}점`,
    ``,
    result.ssl.valid ? `✅ SSL 정상` : `❌ HTTPS 미설정`,
    highMissing.length > 0 ? `🚨 HIGH: ${highMissing.join(', ')}` : `✅ HIGH 위험 없음`,
    medMissing.length > 0  ? `⚠️ MEDIUM: ${medMissing.join(', ')}` : null,
    result.seo.issues.length > 0 ? `🔍 SEO: ${result.seo.issues.join(' / ')}` : `✅ SEO 양호`,
    ``,
    `💰 견적: ${result.estimate.items.map(i => `${i.name} ${i.priceRange}`).join(' / ')}`,
    ``,
    `⏰ ${result.analyzedAt}`,
  ].filter((l): l is string => l !== null)

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: lines.join('\n'), parse_mode: 'HTML' }),
  }).catch(() => {})
}

export async function POST(req: NextRequest) {
  const { url, email, company } = await req.json()
  if (!url || !email) return NextResponse.json({ error: 'URL과 이메일이 필요합니다.' }, { status: 400 })

  try {
    // 1. Analyze
    const result = await analyzeUrl(url)

    // 2. Generate PDF
    const pdfBuffer = await generatePdfBuffer(result, email, company)

    // 3. Send email (with PDF attachment)
    await sendReportEmail(result, pdfBuffer, email, company)

    // 4. Notify team via Telegram (non-blocking)
    notifyTelegram(result, email, company).catch(() => {})

    return NextResponse.json({ ok: true, grade: result.score.grade, total: result.score.total })
  } catch (e: any) {
    console.error('[analyze]', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
