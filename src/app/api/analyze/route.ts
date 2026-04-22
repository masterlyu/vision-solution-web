import { NextRequest, NextResponse } from 'next/server'
import { analyzeUrl } from '@/lib/siteAnalyzer'
import { generatePdfBuffer } from '@/lib/pdfReport'
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
