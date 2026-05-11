/**
 * VisionC → 대시보드 연동: 전문 ZAP 스캔 트리거
 *
 * 대시보드가 이 엔드포인트로 POST를 보내 스캔을 시작합니다.
 * VisionC는 비동기로 ZAP 스캔을 돌리고 결과/진행률을 대시보드 콜백으로 전송합니다.
 *
 * POST /api/zap-scan/trigger
 *   Headers: x-internal-token: $VISIONC_INTERNAL_TOKEN
 *   Body:   { scanId, targetUrl, scanMode: 'quick'|'standard'|'full'|'custom', options? }
 *   Reply:  202 { ok: true, scanId } (즉시 반환, 백그라운드에서 계속)
 */
import { NextRequest, NextResponse } from 'next/server'
import { runZapScan, type ZapScanOptions, type ZapScanResult } from '@/lib/zapScanner'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'
export const maxDuration = 10  // trigger 자체는 빠르게 반환
export const dynamic = 'force-dynamic'

const DASHBOARD_URL = process.env.DASHBOARD_INTERNAL_URL ?? 'http://100.89.247.7:3000'
const INTERNAL_TOKEN = process.env.VISIONC_INTERNAL_TOKEN ?? ''
const REPORT_DIR = process.env.SECURITY_REPORT_DIR ?? '/home/ubuntu/company/website/storage/security-reports'

type ScanMode = 'quick' | 'standard' | 'full' | 'custom'

function mapModeToProfile(mode: ScanMode): ZapScanOptions['profile'] {
  if (mode === 'quick') return 'baseline'
  if (mode === 'standard' || mode === 'full' || mode === 'custom') return 'full'
  return 'baseline'
}

async function postBack(scanId: number, payload: Record<string, unknown>) {
  try {
    await fetch(`${DASHBOARD_URL}/api/security/scans/${scanId}/result`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-token': INTERNAL_TOKEN,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    })
  } catch (e) {
    console.error('[zap-scan] postBack 실패:', e)
  }
}

async function saveReportToDisk(scanId: number, result: ZapScanResult): Promise<Array<{ type: string; format: string; storage_path: string; size_bytes: number }>> {
  await mkdir(REPORT_DIR, { recursive: true })

  const reports: Array<{ type: string; format: string; storage_path: string; size_bytes: number }> = []

  // JSON (기술적 원본)
  const jsonPath = path.join(REPORT_DIR, `scan-${scanId}-technical.json`)
  const jsonBody = JSON.stringify(result, null, 2)
  await writeFile(jsonPath, jsonBody, 'utf8')
  reports.push({ type: 'technical', format: 'json', storage_path: jsonPath, size_bytes: Buffer.byteLength(jsonBody) })

  // Executive HTML
  const execHtml = renderExecutiveHtml(scanId, result)
  const execPath = path.join(REPORT_DIR, `scan-${scanId}-executive.html`)
  await writeFile(execPath, execHtml, 'utf8')
  reports.push({ type: 'executive', format: 'html', storage_path: execPath, size_bytes: Buffer.byteLength(execHtml) })

  // Remediation HTML
  const remHtml = renderRemediationHtml(scanId, result)
  const remPath = path.join(REPORT_DIR, `scan-${scanId}-remediation.html`)
  await writeFile(remPath, remHtml, 'utf8')
  reports.push({ type: 'remediation', format: 'html', storage_path: remPath, size_bytes: Buffer.byteLength(remHtml) })

  return reports
}

function escapeHtml(s: string): string {
  return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]!))
}

function renderExecutiveHtml(scanId: number, r: ZapScanResult): string {
  const { summary, zapScore, targetUrl, scannedAt, durationSec } = r
  const grade = zapScore >= 80 ? { label: '양호', color: '#34C759' }
              : zapScore >= 60 ? { label: '주의', color: '#CA8A04' }
              : zapScore >= 40 ? { label: '취약', color: '#EA580C' }
                               : { label: '매우 취약', color: '#DC2626' }
  return `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><title>보안 점검 경영진 요약 #${scanId}</title>
<style>
 body{font-family:-apple-system,Pretendard,Malgun Gothic,sans-serif;max-width:760px;margin:40px auto;padding:0 20px;color:#222;line-height:1.6}
 .hero{padding:28px;border-radius:16px;background:${grade.color}10;border:1px solid ${grade.color}40;margin-bottom:24px}
 .score{font-size:56px;font-weight:700;color:${grade.color};line-height:1}
 h1{margin:0 0 8px;font-size:22px}
 h2{font-size:16px;margin-top:28px;border-bottom:1px solid #e5e7eb;padding-bottom:6px}
 .kv{display:flex;gap:12px;margin:4px 0;font-size:14px}
 .kv span:first-child{color:#6b7280;min-width:120px}
 .sev{display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;margin-right:6px}
 .crit{background:#fee;color:#dc2626}.hi{background:#fed7aa;color:#ea580c}.mi{background:#fef3c7;color:#ca8a04}.lo{background:#dbeafe;color:#2563eb}
 ul{padding-left:20px}
</style></head><body>
<div class="hero">
 <div style="color:#6b7280;font-size:12px;font-weight:600;letter-spacing:.05em">보안 점검 경영진 요약</div>
 <h1>${escapeHtml(targetUrl)}</h1>
 <div class="score">${zapScore}</div>
 <div style="color:${grade.color};font-weight:700;font-size:18px">${grade.label} 등급</div>
</div>
<div class="kv"><span>점검 일시</span><span>${escapeHtml(scannedAt)}</span></div>
<div class="kv"><span>소요 시간</span><span>${Math.floor(durationSec/60)}분 ${durationSec%60}초</span></div>
<div class="kv"><span>스캔 ID</span><span>#${scanId}</span></div>

<h2>🎯 발견된 취약점 개요</h2>
<p>
 <span class="sev hi">높음 ${summary.high}건</span>
 <span class="sev mi">보통 ${summary.medium}건</span>
 <span class="sev lo">낮음 ${summary.low}건</span>
 <span class="sev" style="background:#f3f4f6;color:#6b7280">참고 ${summary.informational}건</span>
</p>

<h2>📝 이 보고서는</h2>
<p>전문 보안 도구(OWASP ZAP)가 실제 공격 기법을 사용해 귀사 사이트를 테스트한 결과입니다.
<strong>점수가 100에 가까울수록 안전</strong>하며, 아래 "수정 가이드" 보고서에 구체적 조치 방법이 담겨 있습니다.</p>

<h2>✅ 다음 단계</h2>
<ul>
 <li>높음·보통 등급 취약점을 우선 처리하세요.</li>
 <li>기술팀과 "수정 가이드" 보고서를 공유하세요.</li>
 <li>수정 후 재스캔으로 점수 개선을 확인하세요.</li>
</ul>
<p style="color:#9ca3af;font-size:11px;margin-top:40px">VisionC 보안 점검 리포트 · OWASP ZAP 2.17.0</p>
</body></html>`
}

function renderRemediationHtml(scanId: number, r: ZapScanResult): string {
  const groups = new Map<string, typeof r.alerts>()
  for (const a of r.alerts) {
    const key = `${a.pluginId}|${a.name}`
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(a)
  }
  const ordered = Array.from(groups.entries()).sort(([, a], [, b]) => {
    const order = { High: 1, Medium: 2, Low: 3, Informational: 4 }
    return order[a[0].riskdesc] - order[b[0].riskdesc]
  })

  return `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><title>수정 가이드 #${scanId}</title>
<style>
 body{font-family:-apple-system,Pretendard,Malgun Gothic,sans-serif;max-width:860px;margin:40px auto;padding:0 20px;color:#222;line-height:1.6}
 h1{font-size:22px} h2{font-size:16px;margin-top:24px;border-left:3px solid #3b82f6;padding-left:10px}
 .item{margin:14px 0;padding:14px;border:1px solid #e5e7eb;border-radius:8px}
 .badge{display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;margin-right:6px}
 .high{background:#fed7aa;color:#ea580c} .med{background:#fef3c7;color:#ca8a04}
 .low{background:#dbeafe;color:#2563eb} .info{background:#f3f4f6;color:#6b7280}
 code{background:#f3f4f6;padding:2px 6px;border-radius:3px;font-size:12px}
 .urls{color:#6b7280;font-size:12px;margin-top:6px}
</style></head><body>
<h1>🛠️ 수정 가이드 #${scanId}</h1>
<p>대상: <strong>${escapeHtml(r.targetUrl)}</strong> · 점검 ${escapeHtml(r.scannedAt)}</p>

${ordered.map(([, alerts]) => {
  const a = alerts[0]
  const cls = a.riskdesc === 'High' ? 'high' : a.riskdesc === 'Medium' ? 'med' : a.riskdesc === 'Low' ? 'low' : 'info'
  const koRisk = a.riskdesc === 'High' ? '높음' : a.riskdesc === 'Medium' ? '보통' : a.riskdesc === 'Low' ? '낮음' : '참고'
  return `<div class="item">
<h2><span class="badge ${cls}">${koRisk}</span>${escapeHtml(a.name)}</h2>
<p><strong>설명:</strong> ${escapeHtml(a.description)}</p>
<p><strong>수정 방법:</strong> ${escapeHtml(a.solution)}</p>
${a.cweid ? `<p><strong>CWE:</strong> <code>CWE-${escapeHtml(a.cweid)}</code></p>` : ''}
<div class="urls">발견 위치 (${alerts.length}곳): ${alerts.slice(0, 5).map(x => `<code>${escapeHtml(x.url)}</code>`).join(' ')}</div>
</div>`
}).join('\n')}

<p style="color:#9ca3af;font-size:11px;margin-top:40px">
생성: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })} · 총 ${r.alerts.length}개 원본 알림 · ${groups.size}개 유형
</p>
</body></html>`
}

async function sendTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      signal: AbortSignal.timeout(5_000),
    })
  } catch (e) {
    console.error('[zap-scan] Telegram 실패:', e)
  }
}

async function runScanAsync(scanId: number, targetUrl: string, scanMode: ScanMode): Promise<void> {
  try {
    await postBack(scanId, { kind: 'progress', status: 'spider', progress: 5 })

    const profile = mapModeToProfile(scanMode)
    const maxWait = profile === 'full' ? 20 * 60 * 1000 : 3 * 60 * 1000

    const result = await runZapScan(targetUrl, { profile, maxWaitMs: maxWait })

    await postBack(scanId, { kind: 'progress', status: 'active', progress: 90 })

    const reports = await saveReportToDisk(scanId, result)

    await postBack(scanId, {
      kind: 'complete',
      findings: result.alerts,
      summary: result.summary,
      zapScore: result.zapScore,
      reports,
    })

    const s = result.summary
    await sendTelegram(
      `🛡️ <b>보안 스캔 완료</b> #${scanId}\n` +
      `대상: ${targetUrl}\n` +
      `모드: ${scanMode} · 소요 ${Math.floor(result.durationSec / 60)}분\n` +
      `점수: <b>${result.zapScore}/100</b>\n` +
      `High ${s.high} · Medium ${s.medium} · Low ${s.low} · Info ${s.informational}\n` +
      `\n대시보드에서 상세 확인: /security?tab=findings&scan=${scanId}`
    )
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    console.error(`[zap-scan ${scanId}] 실패:`, msg)
    await postBack(scanId, { kind: 'failed', error: msg })
    await sendTelegram(`⚠️ <b>보안 스캔 실패</b> #${scanId}\n${targetUrl}\n${msg}`)
  }
}

export async function POST(req: NextRequest) {
  const token = req.headers.get('x-internal-token')
  if (token !== INTERNAL_TOKEN || !INTERNAL_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const scanId = Number(body?.scanId)
  const targetUrl: string | undefined = body?.targetUrl
  const scanMode: ScanMode = body?.scanMode ?? 'standard'

  if (!Number.isFinite(scanId) || !targetUrl) {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  // Fire-and-forget: 응답은 바로 돌려보내고 스캔은 백그라운드에서 계속
  runScanAsync(scanId, targetUrl, scanMode).catch(err =>
    console.error('[zap-scan] runScanAsync unhandled:', err)
  )

  return NextResponse.json({ ok: true, scanId, status: 'queued' }, { status: 202 })
}
