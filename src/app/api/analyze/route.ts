import { NextRequest, NextResponse } from 'next/server'
import { analyzeUrl } from '@/lib/siteAnalyzer'
import { generatePdfBuffer } from '@/lib/pdfReport'
import { sendReportEmail } from '@/lib/emailSender'
import { env } from '@/lib/env'

const TOKEN   = env.TELEGRAM_BOT_TOKEN
const CHAT_ID = env.TELEGRAM_CHAT_ID

export const maxDuration = 60

export async function GET() {
  return Response.json({
    GMAIL_USER:         env.GMAIL_USER         ? '✓ set' : '✗ missing',
    GMAIL_APP_PASSWORD: env.GMAIL_APP_PASSWORD  ? '✓ set' : '✗ missing',
    TELEGRAM_BOT_TOKEN: env.TELEGRAM_BOT_TOKEN  ? '✓ set' : '✗ missing',
  })
}

export async function POST(req: NextRequest) {
  const { url, email, company } = await req.json()
  if (!url || !email) return NextResponse.json({ error: 'URL과 이메일이 필요합니다.' }, { status: 400 })

  try {
    // 1. 분석
    const result = await analyzeUrl(url)

    // 2. PDF 생성
    const pdfBuffer = await generatePdfBuffer(result, email, company)

    // 3. 고객에게 리포트 이메일 직접 발송
    await sendReportEmail(result, pdfBuffer, email, company)

    // 4. 텔레그램 어드민 알림 (발송 완료 통보)
    const g: Record<string, string> = { A: '🟢', B: '🟡', C: '🟠', D: '🔴', F: '⛔' }
    const emoji = g[result.score.grade] ?? '❓'
    const highMissing = result.headers.filter(h => !h.present && h.severity === 'HIGH').map(h => h.label)

    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: [
          `${emoji} <b>보안 진단 리포트 발송 완료</b>`,
          ``,
          `🌐 ${result.url}`,
          `📧 ${email}${company ? `  ·  ${company}` : ''}`,
          `📊 ${result.score.total}점 (등급 ${result.score.grade})`,
          `  · 보안 ${result.score.security}점 / SEO ${result.score.seo}점 / 성능 ${result.score.performance}점`,
          highMissing.length > 0 ? `🚨 HIGH 위험: ${highMissing.join(', ')}` : `✅ HIGH 위험 없음`,
          `💰 견적: ${result.estimate.items.map(i => `${i.name} ${i.priceRange}`).join(' / ')}`,
        ].join('\n'),
        parse_mode: 'HTML',
      }),
    }).catch(e => console.error('[analyze] Telegram 알림 실패:', e))

    // 5. 대시보드 기록 (fire-and-forget)
    const dashboardUrl = process.env.DASHBOARD_INTERNAL_URL
    const internalToken = process.env.VISIONC_INTERNAL_TOKEN
    if (dashboardUrl && internalToken) {
      fetch(`${dashboardUrl}/api/security/simple-checks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-internal-token': internalToken },
        body: JSON.stringify({
          targetUrl: result.url,
          customerEmail: email,
          customerCompany: company ?? null,
          grade: result.score.grade,
          scoreTotal: result.score.total,
          scoreSecurity: result.score.security,
          scoreSeo: result.score.seo,
          scorePerf: result.score.performance,
          highRisks: highMissing,
        }),
        signal: AbortSignal.timeout(5_000),
      }).catch(err => console.error('[analyze] dashboard log 실패:', err))
    }

    return NextResponse.json({ ok: true, grade: result.score.grade, total: result.score.total })
  } catch (e: any) {
    console.error('[analyze]', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
