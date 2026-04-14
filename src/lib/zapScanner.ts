/**
 * OWASP ZAP API 연동 모듈
 *
 * ZAP 데몬(docker-compose.yml)과 통신하여 Baseline / Full / API 스캔을 수행.
 * 결과는 취약점 목록 + 위험도별 집계로 반환.
 */

export type ZapRiskLevel = 'High' | 'Medium' | 'Low' | 'Informational'

export interface ZapAlert {
  pluginId: string
  alertRef: string
  name: string
  riskCode: string
  riskdesc: ZapRiskLevel
  confidence: string
  description: string
  solution: string
  reference: string
  url: string
  method: string
  evidence: string
  cweid: string
  wascid: string
}

export interface ZapScanResult {
  scanId: string
  profile: 'baseline' | 'full' | 'api'
  targetUrl: string
  scannedAt: string
  durationSec: number
  alerts: ZapAlert[]
  summary: {
    high: number
    medium: number
    low: number
    informational: number
    total: number
  }
  zapScore: number   // 100점 만점, High 1개당 -25, Medium -10, Low -3
}

export interface ZapScanOptions {
  profile: 'baseline' | 'full' | 'api'
  zapUrl?: string     // ZAP 데몬 주소 (기본: ZAP_API_URL env)
  apiKey?: string     // ZAP API 키 (기본: ZAP_API_KEY env)
  maxWaitMs?: number  // 스캔 최대 대기 (기본: baseline 90s, full 600s)
  contextName?: string
}

// ─── 내부 헬퍼 ────────────────────────────────────────────────────────────────

function zapBase(zapUrl: string, apiKey: string) {
  return {
    async call(path: string, params: Record<string, string> = {}) {
      const query = new URLSearchParams({ apikey: apiKey, ...params })
      const res = await fetch(`${zapUrl}/${path}?${query}`, {
        signal: AbortSignal.timeout(15_000),
      })
      if (!res.ok) throw new Error(`ZAP API 오류: ${res.status} ${path}`)
      return res.json()
    },
  }
}

async function waitForPassiveScan(zap: ReturnType<typeof zapBase>, maxMs: number) {
  const deadline = Date.now() + maxMs
  while (Date.now() < deadline) {
    const r = await zap.call('JSON/pscan/view/recordsToScan/')
    if (parseInt(r.recordsToScan, 10) === 0) return
    await new Promise(r => setTimeout(r, 2_000))
  }
  throw new Error('패시브 스캔 타임아웃')
}

async function waitForActiveScan(zap: ReturnType<typeof zapBase>, scanId: string, maxMs: number) {
  const deadline = Date.now() + maxMs
  while (Date.now() < deadline) {
    const r = await zap.call('JSON/ascan/view/status/', { scanId })
    const pct = parseInt(r.status, 10)
    if (pct >= 100) return
    await new Promise(r => setTimeout(r, 5_000))
  }
  throw new Error('액티브 스캔 타임아웃')
}

function buildSummary(alerts: ZapAlert[]) {
  const s = { high: 0, medium: 0, low: 0, informational: 0, total: alerts.length }
  for (const a of alerts) {
    if (a.riskdesc === 'High') s.high++
    else if (a.riskdesc === 'Medium') s.medium++
    else if (a.riskdesc === 'Low') s.low++
    else s.informational++
  }
  const score = Math.max(0, 100 - s.high * 25 - s.medium * 10 - s.low * 3)
  return { summary: s, zapScore: score }
}

// ─── 공개 API ─────────────────────────────────────────────────────────────────

/**
 * OWASP ZAP으로 대상 URL을 스캔합니다.
 *
 * - baseline : Spider + Passive scan (빠름, ~90초)
 * - full     : Spider + Passive + Active scan (정밀, ~10분)
 * - api      : OpenAPI 정의 기반 Active scan
 */
export async function runZapScan(targetUrl: string, opts: ZapScanOptions): Promise<ZapScanResult> {
  const zapUrl  = opts.zapUrl  ?? process.env.ZAP_API_URL  ?? 'http://localhost:8080'
  const apiKey  = opts.apiKey  ?? process.env.ZAP_API_KEY  ?? 'changeme'
  const profile = opts.profile
  const maxWait = opts.maxWaitMs ?? (profile === 'full' ? 600_000 : 90_000)

  const zap   = zapBase(zapUrl, apiKey)
  const start = Date.now()

  // 1. 기존 세션 초기화
  await zap.call('JSON/core/action/newSession/', { name: `visionc-${profile}-${Date.now()}`, overwrite: 'true' })

  // 2. Spider (baseline / full)
  if (profile !== 'api') {
    const spiderRes = await zap.call('JSON/spider/action/scan/', { url: targetUrl, maxChildren: '10', recurse: 'true' })
    const spiderId  = spiderRes.scan
    // Spider 완료 대기 (최대 60초)
    const spiderDeadline = Date.now() + 60_000
    while (Date.now() < spiderDeadline) {
      const s = await zap.call('JSON/spider/view/status/', { scanId: spiderId })
      if (parseInt(s.status, 10) >= 100) break
      await new Promise(r => setTimeout(r, 2_000))
    }
  } else {
    // API 스캔: URL을 직접 액세스 포인트로 추가
    await zap.call('JSON/core/action/accessUrl/', { url: targetUrl, followRedirects: 'true' })
  }

  // 3. Passive scan 완료 대기
  await waitForPassiveScan(zap, Math.min(maxWait, 60_000))

  // 4. Active scan (full / api만)
  if (profile === 'full' || profile === 'api') {
    const ascanRes = await zap.call('JSON/ascan/action/scan/', {
      url: targetUrl,
      recurse: 'true',
      inScopeOnly: 'false',
      scanPolicyName: '',
    })
    await waitForActiveScan(zap, ascanRes.scan, maxWait)
  }

  // 5. 알림 수집
  const alertsRes = await zap.call('JSON/core/view/alerts/', { baseurl: targetUrl, start: '0', count: '200' })
  const rawAlerts: ZapAlert[] = (alertsRes.alerts ?? []).map((a: Record<string, string>) => ({
    pluginId:    a.pluginId ?? '',
    alertRef:    a.alertRef ?? '',
    name:        a.name ?? '',
    riskCode:    a.riskcode ?? '',
    riskdesc:    (a.riskdesc ?? 'Informational') as ZapRiskLevel,
    confidence:  a.confidence ?? '',
    description: a.description ?? '',
    solution:    a.solution ?? '',
    reference:   a.reference ?? '',
    url:         a.url ?? '',
    method:      a.method ?? '',
    evidence:    a.evidence ?? '',
    cweid:       a.cweid ?? '',
    wascid:      a.wascid ?? '',
  }))

  // 중복 제거 (같은 pluginId + url 조합)
  const seen = new Set<string>()
  const alerts = rawAlerts.filter(a => {
    const key = `${a.pluginId}::${a.url}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  const { summary, zapScore } = buildSummary(alerts)

  return {
    scanId:      `zap-${profile}-${Date.now()}`,
    profile,
    targetUrl,
    scannedAt:   new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    durationSec: Math.round((Date.now() - start) / 1_000),
    alerts,
    summary,
    zapScore,
  }
}

/**
 * ZAP 데몬 연결 상태 확인
 */
export async function checkZapHealth(zapUrl?: string, apiKey?: string): Promise<boolean> {
  const url = zapUrl ?? process.env.ZAP_API_URL ?? 'http://localhost:8080'
  const key = apiKey ?? process.env.ZAP_API_KEY ?? 'changeme'
  try {
    const res = await fetch(`${url}/JSON/core/view/version/?apikey=${key}`, {
      signal: AbortSignal.timeout(5_000),
    })
    return res.ok
  } catch {
    return false
  }
}

/**
 * ZAP 없이도 동작하는 경량 취약점 추론 (Vercel 서버리스 환경용)
 *
 * HTTP 응답 헤더 기반으로 ZAP의 주요 패시브 스캔 항목을 모사.
 * 실제 ZAP 스캔보다 정확도가 낮지만 외부 스캐너 없이 즉시 사용 가능.
 */
export function inferZapAlertsFromHeaders(headers: Record<string, string | null>): ZapAlert[] {
  const alerts: ZapAlert[] = []
  const h = (k: string) => headers[k.toLowerCase()] ?? null

  const serverHeader = h('server')
  if (serverHeader && /apache|nginx|iis|lighttpd/i.test(serverHeader)) {
    alerts.push({
      pluginId: '10036', alertRef: '10036', name: '서버 정보 노출 (Server 헤더)',
      riskCode: '1', riskdesc: 'Low',
      confidence: 'High',
      description: '서버 헤더에 소프트웨어 및 버전 정보가 노출되어 있습니다.',
      solution: 'Server 응답 헤더에서 서버 버전 정보를 제거하세요.',
      reference: 'https://owasp.org/www-project-web-security-testing-guide/',
      url: '', method: 'GET', evidence: serverHeader, cweid: '200', wascid: '13',
    })
  }

  if (!h('x-content-type-options')) {
    alerts.push({
      pluginId: '10021', alertRef: '10021', name: 'X-Content-Type-Options 헤더 누락',
      riskCode: '1', riskdesc: 'Low',
      confidence: 'Medium',
      description: 'X-Content-Type-Options 헤더가 설정되지 않아 MIME 스니핑 공격에 취약합니다.',
      solution: '응답 헤더에 X-Content-Type-Options: nosniff를 추가하세요.',
      reference: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options',
      url: '', method: 'GET', evidence: '', cweid: '693', wascid: '14',
    })
  }

  if (!h('x-frame-options') && !h('content-security-policy')?.includes('frame-ancestors')) {
    alerts.push({
      pluginId: '10020', alertRef: '10020', name: 'X-Frame-Options 헤더 누락',
      riskCode: '2', riskdesc: 'Medium',
      confidence: 'Medium',
      description: 'X-Frame-Options 헤더가 설정되지 않아 클릭재킹 공격에 취약합니다.',
      solution: '응답 헤더에 X-Frame-Options: DENY 또는 SAMEORIGIN을 추가하세요.',
      reference: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options',
      url: '', method: 'GET', evidence: '', cweid: '1021', wascid: '15',
    })
  }

  if (!h('strict-transport-security')) {
    alerts.push({
      pluginId: '10035', alertRef: '10035', name: 'HSTS(HTTP Strict Transport Security) 미설정',
      riskCode: '2', riskdesc: 'Medium',
      confidence: 'High',
      description: 'HSTS 헤더가 설정되지 않아 HTTP 다운그레이드 공격에 취약합니다.',
      solution: 'Strict-Transport-Security: max-age=31536000; includeSubDomains 헤더를 추가하세요.',
      reference: 'https://owasp.org/www-community/attacks/HTTP_Strict_Transport_Security',
      url: '', method: 'GET', evidence: '', cweid: '319', wascid: '4',
    })
  }

  if (!h('content-security-policy')) {
    alerts.push({
      pluginId: '10038', alertRef: '10038', name: 'Content Security Policy (CSP) 미설정',
      riskCode: '2', riskdesc: 'Medium',
      confidence: 'High',
      description: 'CSP 헤더가 없어 XSS 및 데이터 인젝션 공격에 취약합니다.',
      solution: "응답 헤더에 적절한 Content-Security-Policy를 설정하세요. (예: default-src 'self')",
      reference: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP',
      url: '', method: 'GET', evidence: '', cweid: '693', wascid: '14',
    })
  }

  const xpowered = h('x-powered-by')
  if (xpowered) {
    alerts.push({
      pluginId: '10037', alertRef: '10037', name: 'X-Powered-By 정보 노출',
      riskCode: '1', riskdesc: 'Low',
      confidence: 'Medium',
      description: `X-Powered-By 헤더(${xpowered})가 서버 기술 스택을 노출합니다.`,
      solution: '응답 헤더에서 X-Powered-By를 제거하세요.',
      reference: 'https://owasp.org/www-project-web-security-testing-guide/',
      url: '', method: 'GET', evidence: xpowered, cweid: '200', wascid: '13',
    })
  }

  return alerts
}
