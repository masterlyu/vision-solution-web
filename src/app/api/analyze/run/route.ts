import { NextRequest, NextResponse } from 'next/server'
import { analyzeUrl } from '@/lib/siteAnalyzer'
import { generatePdfBuffer } from '@/lib/pdfReport'
import { sendReportEmail } from '@/lib/emailSender'
import { env } from '@/lib/env'

export const maxDuration = 60

function pad(s: string) {
  return s + '='.repeat((4 - (s.length % 4)) % 4)
}

async function verifyToken(
  token: string,
  secret: string,
): Promise<{ url: string; email: string; company: string } | null> {
  const parts = token.split('.')
  if (parts.length !== 2) return null
  const [data, sigB64] = parts
  try {
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey(
      'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'],
    )
    const sig = Uint8Array.from(
      atob(pad(sigB64.replace(/-/g, '+').replace(/_/g, '/'))),
      c => c.charCodeAt(0),
    )
    const valid = await crypto.subtle.verify('HMAC', key, sig, encoder.encode(data))
    if (!valid) return null
    const payload = JSON.parse(atob(pad(data.replace(/-/g, '+').replace(/_/g, '/'))))
    if (payload.exp && Date.now() > payload.exp) return null
    return { url: payload.url, email: payload.email, company: payload.company ?? '' }
  } catch {
    return null
  }
}

export async function POST(req: NextRequest) {
  const { token } = await req.json()
  if (!token) return NextResponse.json({ error: '토큰이 필요합니다.' }, { status: 400 })

  const payload = await verifyToken(token, env.TELEGRAM_BOT_TOKEN)
  if (!payload) {
    return NextResponse.json(
      { error: '인증 링크가 만료되었거나 유효하지 않습니다. 다시 신청해 주세요.' },
      { status: 410 },
    )
  }

  const { url, email, company } = payload

  try {
    const result = await analyzeUrl(url)
    const pdfBuffer = await generatePdfBuffer(result, email, company)
    await sendReportEmail(result, pdfBuffer, email, company)

    const TBOT  = env.TELEGRAM_BOT_TOKEN
    const TCHAT = env.TELEGRAM_CHAT_ID
    const g: Record<string, string> = { A: '🟢', B: '🟡', C: '🟠', D: '🔴', F: '⛔' }
    const emoji = g[result.score.grade] ?? '❓'
    const highMissing = result.headers.filter(h => !h.present && h.severity === 'HIGH').map(h => h.label)

    await fetch(`https://api.telegram.org/bot${TBOT}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TCHAT,
        text: [
          `${emoji} <b>보안 진단 완료 (인증 후 스캔)</b>`,
          ``,
          `🌐 ${result.url}`,
          `📧 ${email}${company ? `  ·  ${company}` : ''}`,
          `📊 ${result.score.total}점 (등급 ${result.score.grade})`,
          highMissing.length > 0 ? `🚨 HIGH: ${highMissing.join(', ')}` : `✅ HIGH 위험 없음`,
        ].join('\n'),
        parse_mode: 'HTML',
      }),
    }).catch(() => {})

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
      }).catch(() => {})
    }

    return NextResponse.json({ ok: true, grade: result.score.grade, total: result.score.total })
  } catch (e: any) {
    console.error('[analyze/run]', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
