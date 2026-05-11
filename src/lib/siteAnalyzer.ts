import { inferZapAlertsFromHeaders, type ZapAlert } from './zapScanner'

export { type ZapAlert }

export interface ZapInlineResult {
  alerts: ZapAlert[]
  summary: { high: number; medium: number; low: number; informational: number; total: number }
  zapScore: number
  source: 'inferred' | 'daemon'
}

function calcZapSummary(alerts: ZapAlert[]) {
  const s = { high: 0, medium: 0, low: 0, informational: 0, total: alerts.length }
  for (const a of alerts) {
    if (a.riskdesc === 'High') s.high++
    else if (a.riskdesc === 'Medium') s.medium++
    else if (a.riskdesc === 'Low') s.low++
    else s.informational++
  }
  return { summary: s, zapScore: Math.max(0, 100 - s.high * 25 - s.medium * 10 - s.low * 3) }
}

export interface SecurityHeaderCheck {
  key: string
  label: string
  present: boolean
  value?: string
  severity: 'HIGH' | 'MEDIUM' | 'LOW'
  description: string
  fix: string
}

export interface SeoResult {
  title: string
  description: string
  hasH1: boolean
  hasCanonical: boolean
  score: number
  issues: string[]
}

export interface PerfResult {
  available: boolean
  score: number
  lcp?: number
  fcp?: number
  cls?: number
}

export interface MalwareResult {
  available: boolean
  clean: boolean
  blacklisted: boolean
  blacklistItems: string[]
  malwareFound: boolean
  malwareTypes: string[]
}

export interface CmsResult {
  detected: string | null
  version: string | null
  versionExposed: boolean
  infoLeaks: string[]
}

export interface AnalysisResult {
  url: string
  analyzedAt: string
  ssl: { valid: boolean; note: string }
  headers: SecurityHeaderCheck[]
  seo: SeoResult
  performance: PerfResult
  malware: MalwareResult
  cms: CmsResult
  score: { security: number; seo: number; performance: number; total: number; grade: 'A' | 'B' | 'C' | 'D' | 'F' }
  estimate: { items: Array<{ name: string; priceRange: string; reason: string }> }
  zap?: ZapInlineResult
  error?: string
}

const HEADER_DEFS = [
  { key: 'strict-transport-security', label: 'HSTS', severity: 'HIGH' as const, description: 'HTTP→HTTPS 강제 전환 미설정. 중간자 공격(MITM)에 취약합니다.', fix: 'Strict-Transport-Security: max-age=31536000; includeSubDomains' },
  { key: 'content-security-policy',   label: 'Content-Security-Policy', severity: 'HIGH' as const, description: 'XSS 공격을 차단하는 CSP 헤더가 없습니다. 스크립트 인젝션 위험.', fix: "Content-Security-Policy: default-src 'self'" },
  { key: 'x-frame-options',           label: 'X-Frame-Options', severity: 'MEDIUM' as const, description: 'iframe을 악용한 클릭재킹 공격에 취약합니다.', fix: 'X-Frame-Options: DENY' },
  { key: 'x-content-type-options',    label: 'X-Content-Type-Options', severity: 'MEDIUM' as const, description: 'MIME 스니핑 공격으로 파일 유형을 위장할 수 있습니다.', fix: 'X-Content-Type-Options: nosniff' },
  { key: 'referrer-policy',           label: 'Referrer-Policy', severity: 'LOW' as const, description: '방문자 URL 정보가 외부 사이트로 유출될 수 있습니다.', fix: 'Referrer-Policy: strict-origin-when-cross-origin' },
  { key: 'permissions-policy',        label: 'Permissions-Policy', severity: 'LOW' as const, description: '카메라·마이크·위치 등 브라우저 기능 제한이 없습니다.', fix: 'Permissions-Policy: camera=(), microphone=(), geolocation=()' },
]

function toGrade(n: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (n >= 90) return 'A'
  if (n >= 75) return 'B'
  if (n >= 60) return 'C'
  if (n >= 40) return 'D'
  return 'F'
}

// ── CMS 탐지 ──────────────────────────────────────────────────────────────
function detectCms(html: string, responseHeaders: Response['headers']): CmsResult {
  const generator = (
    html.match(/<meta[^>]+name=["']generator["'][^>]+content=["']([^"']+)/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']generator["']/i)?.[1] ?? ''
  ).trim()

  let detected: string | null = null
  let version: string | null = null
  let versionExposed = false

  if (/wordpress/i.test(generator)) {
    detected = 'WordPress'
    version = generator.match(/WordPress\s+([\d.]+)/i)?.[1] ?? null
    if (version) versionExposed = true
  } else if (/joomla/i.test(generator)) {
    detected = 'Joomla'
    version = generator.match(/Joomla!\s*([\d.]+)/i)?.[1] ?? null
    if (version) versionExposed = true
  } else if (/drupal/i.test(generator)) {
    detected = 'Drupal'
  } else if (/rhymix/i.test(generator)) {
    detected = 'Rhymix (XE)'
  } else if (/xe\s/i.test(generator)) {
    detected = 'XE'
  } else if (/gnuboard/i.test(generator)) {
    detected = 'Gnuboard'
  }

  if (!detected) {
    if (/wp-content\//i.test(html) || /wp-includes\//i.test(html)) {
      detected = 'WordPress'
    } else if (/rhymix/i.test(html) || /\/layouts\/xe_/i.test(html)) {
      detected = 'Rhymix (XE)'
    } else if (/gnuboard|\/bbs\//i.test(html)) {
      detected = 'Gnuboard'
    } else if (/cafe24/i.test(html)) {
      detected = 'Cafe24'
    }
  }

  const infoLeaks: string[] = []
  const serverHeader = responseHeaders.get('server') ?? ''
  const poweredBy = responseHeaders.get('x-powered-by') ?? ''

  if (serverHeader && /\/[\d.]+/.test(serverHeader)) {
    infoLeaks.push(`서버 버전 노출: ${serverHeader}`)
  }
  if (poweredBy) {
    infoLeaks.push(`기술 스택 노출: X-Powered-By: ${poweredBy}`)
  }
  if (versionExposed && version) {
    infoLeaks.push(`CMS 버전 노출: ${detected} ${version} (generator 태그)`)
  }

  return { detected, version, versionExposed, infoLeaks }
}

// ── 악성코드·블랙리스트 탐지 (Sucuri SiteCheck) ───────────────────────────
async function checkMalware(domain: string): Promise<MalwareResult> {
  const empty: MalwareResult = { available: false, clean: true, blacklisted: false, blacklistItems: [], malwareFound: false, malwareTypes: [] }
  try {
    const res = await fetch(
      `https://sitecheck.sucuri.net/api/v3/?scan=${encodeURIComponent(domain)}`,
      {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VISIONCBot/1.0)' },
        signal: AbortSignal.timeout(15000),
      }
    )
    if (!res.ok) return empty
    const data = await res.json()

    const blacklistData: Record<string, unknown> = data?.scan?.blacklists ?? {}
    const blacklistItems = Object.entries(blacklistData)
      .filter(([, v]) => v === true)
      .map(([k]) => k)
    const blacklisted = blacklistItems.length > 0

    const malwareArr: unknown[] = Array.isArray(data?.malware) ? data.malware : []
    const malwareFound = malwareArr.length > 0
    const malwareTypes = malwareArr
      .map((m: any) => (m?.type ?? m?.name ?? '알 수 없는 악성코드') as string)
      .slice(0, 3)

    const clean = !blacklisted && !malwareFound && (data?.scan?.clean !== false)

    return { available: true, clean, blacklisted, blacklistItems, malwareFound, malwareTypes }
  } catch {
    return empty
  }
}

export async function analyzeUrl(rawUrl: string): Promise<AnalysisResult> {
  const url = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`
  const analyzedAt = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  // --- 1. URL 접근 ---
  let response: Response | null = null
  let html = ''
  let ssl = { valid: false, note: 'HTTPS 연결 실패' }

  try {
    response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(12000),
      redirect: 'follow',
    })
    html = await response.text()
    ssl = { valid: url.startsWith('https://'), note: url.startsWith('https://') ? 'HTTPS 연결 정상' : 'HTTP만 지원 (HTTPS 미설정)' }
  } catch (e: any) {
    const emptyMalware: MalwareResult = { available: false, clean: true, blacklisted: false, blacklistItems: [], malwareFound: false, malwareTypes: [] }
    const emptyCms: CmsResult = { detected: null, version: null, versionExposed: false, infoLeaks: [] }
    return {
      url, analyzedAt, ssl,
      headers: [],
      seo: { title: '', description: '', hasH1: false, hasCanonical: false, score: 0, issues: ['사이트 접속 불가'] },
      performance: { available: false, score: 0 },
      malware: emptyMalware,
      cms: emptyCms,
      score: { security: 0, seo: 0, performance: 0, total: 0, grade: 'F' },
      estimate: { items: [] },
      error: `사이트 접속 실패: ${e.message}`,
    }
  }

  // --- 2. 보안 헤더 ---
  const headers: SecurityHeaderCheck[] = HEADER_DEFS.map(h => {
    const value = response!.headers.get(h.key) ?? undefined
    return { ...h, present: !!value, value }
  })

  const headerSecScore = (() => {
    const got = headers.reduce((s, h) => s + (h.present ? (h.severity === 'HIGH' ? 30 : h.severity === 'MEDIUM' ? 20 : 8) : 0), 0)
    const max = HEADER_DEFS.reduce((s, h) => s + (h.severity === 'HIGH' ? 30 : h.severity === 'MEDIUM' ? 20 : 8), 0)
    return Math.round((got / max) * 100)
  })()

  // --- 3. ZAP 경량 추론 ---
  const rawHeaderMap: Record<string, string | null> = {}
  for (const h of HEADER_DEFS) rawHeaderMap[h.key] = response.headers.get(h.key)
  for (const extra of ['server', 'x-powered-by']) rawHeaderMap[extra] = response.headers.get(extra)
  const zapAlerts = inferZapAlertsFromHeaders(rawHeaderMap)
  const { summary: zapSummary, zapScore } = calcZapSummary(zapAlerts)
  const zap: ZapInlineResult = { alerts: zapAlerts, summary: zapSummary, zapScore, source: 'inferred' }

  // --- 4. SEO ---
  const title = (html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ?? '').trim()
  const description = (
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i)?.[1] ?? ''
  ).trim()
  const hasH1 = /<h1[\s>]/i.test(html)
  const hasCanonical = /rel=["']canonical["']/i.test(html)

  const seoIssues: string[] = []
  if (!title) seoIssues.push('title 태그 없음')
  else if (title.length < 10) seoIssues.push('title 너무 짧음 (10자 미만)')
  else if (title.length > 60) seoIssues.push('title 너무 김 (60자 초과)')
  if (!description) seoIssues.push('meta description 없음')
  else if (description.length < 50) seoIssues.push('meta description 너무 짧음 (50자 미만)')
  if (!hasH1) seoIssues.push('H1 태그 없음')
  if (!hasCanonical) seoIssues.push('canonical 태그 없음')
  if (!ssl.valid) seoIssues.push('HTTPS 미사용 (SEO 페널티)')

  const seoScore = Math.max(0, 100 - seoIssues.length * 18)
  const seo: SeoResult = { title, description, hasH1, hasCanonical, score: seoScore, issues: seoIssues }

  // --- 5. CMS 탐지 ---
  const cms = detectCms(html, response.headers)

  // --- 6. PageSpeed + Sucuri 병렬 실행 ---
  const domain = (() => { try { return new URL(url).hostname } catch { return url } })()

  const [psResult, malware] = await Promise.all([
    // PageSpeed
    fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=PERFORMANCE`,
      { signal: AbortSignal.timeout(20000) }
    ).then(async r => {
      if (!r.ok) return null
      return r.json()
    }).catch(() => null),

    // Sucuri SiteCheck
    checkMalware(domain),
  ])

  let performance: PerfResult = { available: false, score: 50 }
  if (psResult) {
    const audits = psResult.lighthouseResult?.audits
    performance = {
      available: true,
      score: Math.round((psResult.lighthouseResult?.categories?.performance?.score ?? 0) * 100),
      lcp: audits?.['largest-contentful-paint']?.numericValue,
      fcp: audits?.['first-contentful-paint']?.numericValue,
      cls: audits?.['cumulative-layout-shift']?.numericValue,
    }
  }

  // --- 7. 종합 점수 ---
  const perfScore = performance.available ? performance.score : 50

  // 정보 노출 및 악성코드 보안 페널티
  const infoLeakPenalty = Math.min(cms.infoLeaks.length * 5, 15)
  const malwarePenalty  = malware.blacklisted ? 30 : malware.malwareFound ? 20 : 0
  const secScore = Math.max(0, headerSecScore - infoLeakPenalty - malwarePenalty)

  const total = Math.round(secScore * 0.5 + seoScore * 0.2 + perfScore * 0.3)

  // --- 8. 견적 ---
  const highMissing = headers.filter(h => !h.present && h.severity === 'HIGH').length
  const medMissing  = headers.filter(h => !h.present && h.severity === 'MEDIUM').length
  const items: Array<{ name: string; priceRange: string; reason: string }> = []

  if (malware.malwareFound) {
    items.push({ name: '악성코드 긴급 제거', priceRange: '150만원~300만원', reason: '사이트 내 악성코드 발견 — 즉시 조치 필요' })
  }
  if (malware.blacklisted) {
    items.push({ name: '블랙리스트 해제 + 보안 복구', priceRange: '200만원~400만원', reason: `구글/보안기관 블랙리스트 등재 (${malware.blacklistItems.join(', ')})` })
  }

  if (total < 45 || (highMissing >= 2 && seoScore < 60 && perfScore < 60)) {
    items.push({ name: '홈페이지 전면 리뉴얼', priceRange: '200만원~400만원', reason: '보안·SEO·성능 복합 개선 필요' })
  } else {
    if (highMissing >= 2) items.push({ name: '보안 취약점 긴급 패치', priceRange: '80만원~150만원', reason: `HIGH 위험 헤더 ${highMissing}개 누락` })
    else if (highMissing === 1 || medMissing >= 2) items.push({ name: '보안 기본 설정', priceRange: '30만원~80만원', reason: '주요 보안 헤더 누락' })
    if (cms.infoLeaks.length > 0) items.push({ name: '정보 노출 차단', priceRange: '20만원~50만원', reason: `서버·CMS 버전 정보 노출 ${cms.infoLeaks.length}건` })
    if (performance.available && perfScore < 50) items.push({ name: '성능 최적화', priceRange: '80만원~150만원', reason: `PageSpeed ${perfScore}점 (권장 90+)` })
    else if (performance.available && perfScore < 75) items.push({ name: '속도 개선', priceRange: '50만원~80만원', reason: `PageSpeed ${perfScore}점 — 개선 여지 있음` })
    if (seoScore < 60) items.push({ name: 'SEO 개선', priceRange: '30만원~70만원', reason: `SEO 항목 ${seoIssues.length}개 미비` })
  }
  if (items.length === 0) {
    items.push({ name: '정기 유지보수 계약', priceRange: '월 10만원~20만원', reason: '현재 상태 양호 — 정기 모니터링 권장' })
  }

  return {
    url, analyzedAt, ssl, headers, seo, performance, malware, cms,
    score: { security: secScore, seo: seoScore, performance: perfScore, total, grade: toGrade(total) },
    estimate: { items },
    zap,
  }
}
