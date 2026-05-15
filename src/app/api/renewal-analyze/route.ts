import { NextRequest, NextResponse } from 'next/server'
import { analyzeRenewal, domainsMatch, extractBaseDomain } from '@/lib/renewalAnalyzer'
import { generateRenewalPdfBuffer } from '@/lib/renewalPdfReport'
import { sendRenewalReport } from '@/lib/renewalEmailSender'
import { env } from '@/lib/env'

export const maxDuration = 60

export async function POST(req: NextRequest) {
  const { url, email } = await req.json()

  if (!url || !email) {
    return NextResponse.json({ error: 'URL과 이메일을 입력해 주세요.' }, { status: 400 })
  }

  // Domain-email match validation
  if (!domainsMatch(url, email)) {
    const siteDomain = extractBaseDomain(url)
    return NextResponse.json({
      error: `이메일 도메인이 사이트 도메인과 일치하지 않습니다. ${siteDomain} 도메인의 이메일을 입력해 주세요. (예: info@${siteDomain})`,
    }, { status: 400 })
  }

  try {
    // 1. Analyze
    const result = await analyzeRenewal(url)

    // 2. Generate PDF
    const pdfBuffer = await generateRenewalPdfBuffer(result)

    // 3. Send email with PDF to customer
    await sendRenewalReport(result, pdfBuffer, email)

    // 4. Telegram admin notification
    const g: Record<string, string> = { A: '🟢', B: '🟡', 'C+': '🟠', D: '🔴', F: '⛔' }
    const emoji = g[result.grade] ?? '📊'
    await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        parse_mode: 'HTML',
        text: [
          `${emoji} <b>홈페이지 성과 진단 완료</b>`,
          ``,
          `🌐 ${result.url}`,
          `📧 ${email}`,
          `🏢 ${result.siteType.label} (신뢰도 ${result.siteType.confidence}%)`,
          `📊 ${result.totalScore}점 (등급 ${result.grade})`,
          `  · 기술 ${result.axes.technical.score}/${result.axes.technical.maxScore} · UX ${result.axes.ux.score}/${result.axes.ux.maxScore} · 현대 ${result.axes.modern.score}/${result.axes.modern.maxScore}`,
          result.techStack.cms ? `🖥️ ${result.techStack.cms}${result.techStack.cmsVersion ? ` ${result.techStack.cmsVersion}` : ''} (${result.techStack.cmsConfidence})` : '',
          `⏱️ 로딩 ${(result.loadTimeMs / 1000).toFixed(1)}초`,
        ].filter(Boolean).join('\n'),
      }),
    }).catch(e => console.error('[renewal-analyze] Telegram 알림 실패:', e))

    const pickItems = (items: typeof result.axes.technical.items) =>
      items.map(({ id, title, currentState, status, impact, tobe }) => ({ id, title, currentState, status, impact, tobe }))

    // Return summary for on-screen display
    return NextResponse.json({
      success: true,
      grade: result.grade,
      totalScore: result.totalScore,
      siteType: result.siteType.label,
      criticalIssues: result.criticalIssues,
      axes: {
        technical: { score: result.axes.technical.score, max: result.axes.technical.maxScore, items: pickItems(result.axes.technical.items) },
        ux: { score: result.axes.ux.score, max: result.axes.ux.maxScore, items: pickItems(result.axes.ux.items) },
        modern: { score: result.axes.modern.score, max: result.axes.modern.maxScore, items: pickItems(result.axes.modern.items) },
      },
      techStack: result.techStack.cms
        ? `${result.techStack.cms}${result.techStack.cmsVersion ? ` ${result.techStack.cmsVersion}` : ''}`
        : null,
      loadTimeMs: result.loadTimeMs,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : '분석 중 오류가 발생했습니다.'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
