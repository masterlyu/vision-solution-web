import { NextRequest, NextResponse } from 'next/server'
import { analyzeUrl } from '@/lib/siteAnalyzer'
import { generatePdfBuffer } from '@/lib/pdfReport'
import { sendAdminNotification } from '@/lib/emailSender'
import { Redis } from '@upstash/redis'
import { randomUUID } from 'crypto'
import { checkRateLimit, getClientId } from '@/lib/rateLimit'
import { env } from '@/lib/env'

const TOKEN   = env.TELEGRAM_BOT_TOKEN
const CHAT_ID = env.TELEGRAM_CHAT_ID

const redis = new Redis({
  url:   env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
})

export const maxDuration = 60

// Temp debug
export async function GET() {
  return Response.json({
    GMAIL_USER:               env.GMAIL_USER               ? '✓ set' : '✗ missing',
    GMAIL_APP_PASSWORD:       env.GMAIL_APP_PASSWORD        ? '✓ set' : '✗ missing',
    TELEGRAM_BOT_TOKEN:       env.TELEGRAM_BOT_TOKEN        ? '✓ set' : '✗ missing',
    UPSTASH_REDIS_REST_URL:   env.UPSTASH_REDIS_REST_URL    ? '✓ set' : '✗ missing',
    UPSTASH_REDIS_REST_TOKEN: env.UPSTASH_REDIS_REST_TOKEN  ? '✓ set' : '✗ missing',
  })
}

export async function POST(req: NextRequest) {
  // Rate limit — Redis 실패 시 요청 허용 (가용성 우선)
  try {
    const rl = await checkRateLimit('analyze', getClientId(req), { limit: 3, windowSec: 60 })
    if (!rl.success) {
      return NextResponse.json(
        { error: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rl.resetAt - Math.floor(Date.now() / 1000)),
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }
  } catch (e) {
    console.error('[analyze] rate limit 오류 (무시):', e)
  }

  const { url, email, company } = await req.json()
  if (!url || !email) return NextResponse.json({ error: 'URL과 이메일이 필요합니다.' }, { status: 400 })

  try {
    // 1. 분석
    const result = await analyzeUrl(url)

    // 2. PDF 생성
    const pdfBuffer = await generatePdfBuffer(result, email, company)

    // 3. Redis에 저장 (24시간 TTL)
    const id = randomUUID()
    await redis.setex(`pending:${id}`, 86400, JSON.stringify({ result, email, company }))

    // 4. Telegram으로 PDF + 승인 버튼 전송
    const g: Record<string, string> = { A: '🟢', B: '🟡', C: '🟠', D: '🔴', F: '⛔' }
    const emoji = g[result.score.grade] ?? '❓'
    const highMissing = result.headers.filter(h => !h.present && h.severity === 'HIGH').map(h => h.label)

    const caption = [
      `${emoji} <b>새 진단 신청 — 검토 후 발송해주세요</b>`,
      ``,
      `🌐 URL: <code>${result.url}</code>`,
      `📧 고객 이메일: ${email}`,
      company ? `🏢 회사: ${company}` : null,
      ``,
      `📊 <b>종합: ${result.score.total}점 (등급 ${result.score.grade})</b>`,
      `  · 보안 ${result.score.security}점 / SEO ${result.score.seo}점 / 성능 ${result.score.performance}점`,
      highMissing.length > 0 ? `🚨 HIGH 위험: ${highMissing.join(', ')}` : `✅ HIGH 위험 없음`,
      ``,
      `💰 견적: ${result.estimate.items.map(i => `${i.name} ${i.priceRange}`).join(' / ')}`,
    ].filter((l): l is string => l !== null).join('\n')

    // PDF를 Telegram에 문서로 전송 (multipart/form-data)
    const formData = new FormData()
    formData.append('chat_id', CHAT_ID)
    formData.append('caption', caption)
    formData.append('parse_mode', 'HTML')
    formData.append('document', new Blob([new Uint8Array(pdfBuffer)], { type: 'application/pdf' }), `report-${new URL(result.url).hostname}.pdf`)
    formData.append('reply_markup', JSON.stringify({
      inline_keyboard: [[
        { text: '✅ 고객에게 발송', callback_data: `approve:${id}` },
        { text: '❌ 취소',         callback_data: `reject:${id}` },
      ]]
    }))

    const telegramRes = await fetch(`https://api.telegram.org/bot${TOKEN}/sendDocument`, {
      method: 'POST',
      body: formData,
    })

    // 어드민 이메일 알림 (fire-and-forget)
    const gradeColors: Record<string, string> = { A: '#22c55e', B: '#84cc16', C: '#f59e0b', D: '#f97316', F: '#ef4444' }
    const gc = gradeColors[result.score.grade] ?? '#6b7280'
    const notifyHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <h2 style="color:#7C3AED;margin:0 0 16px;">🔍 새 보안 진단 신청</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px 0;font-weight:700;width:100px;">URL</td><td style="padding:8px 0;">${result.url}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700;">이메일</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
          ${company ? `<tr><td style="padding:8px 0;font-weight:700;">회사</td><td style="padding:8px 0;">${company}</td></tr>` : ''}
          <tr><td style="padding:8px 0;font-weight:700;">등급</td><td style="padding:8px 0;"><span style="font-size:20px;font-weight:900;color:${gc};">${result.score.grade}</span> / ${result.score.total}점</td></tr>
        </table>
        <p style="margin-top:16px;color:#6b7280;font-size:12px;">텔레그램에서 승인하면 고객에게 리포트가 발송됩니다.</p>
      </div>`
    sendAdminNotification(`[VISIONC] 보안 진단 신청 — ${new URL(result.url).hostname} (등급 ${result.score.grade})`, notifyHtml)
      .catch(e => console.error('[analyze] 이메일 알림 실패:', e))

    // 대시보드에 간편 점검 요청 기록 (fire-and-forget)
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
          telegramSent: telegramRes.ok,
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
