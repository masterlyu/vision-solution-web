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

export interface AnalysisResult {
  url: string
  analyzedAt: string
  ssl: { valid: boolean; note: string }
  headers: SecurityHeaderCheck[]
  seo: SeoResult
  performance: PerfResult
  score: { security: number; seo: number; performance: number; total: number; grade: 'A' | 'B' | 'C' | 'D' | 'F' }
  estimate: { items: Array<{ name: string; priceRange: string; reason: string }> }
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

export async function analyzeUrl(rawUrl: string): Promise<AnalysisResult> {
  const url = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`
  const analyzedAt = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  // --- 1. Fetch URL ---
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
    return {
      url, analyzedAt, ssl,
      headers: [], seo: { title: '', description: '', hasH1: false, hasCanonical: false, score: 0, issues: ['사이트 접속 불가'] },
      performance: { available: false, score: 0 },
      score: { security: 0, seo: 0, performance: 0, total: 0, grade: 'F' },
      estimate: { items: [] },
      error: `사이트 접속 실패: ${e.message}`,
    }
  }

  // --- 2. Security headers ---
  const headers: SecurityHeaderCheck[] = HEADER_DEFS.map(h => {
    const value = response!.headers.get(h.key) ?? undefined
    return { ...h, present: !!value, value }
  })

  const secScore = (() => {
    const got = headers.reduce((s, h) => s + (h.present ? (h.severity === 'HIGH' ? 30 : h.severity === 'MEDIUM' ? 20 : 8) : 0), 0)
    const max = HEADER_DEFS.reduce((s, h) => s + (h.severity === 'HIGH' ? 30 : h.severity === 'MEDIUM' ? 20 : 8), 0)
    return Math.round((got / max) * 100)
  })()

  // --- 3. SEO ---
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

  // --- 4. PageSpeed (Google API, parallel with above) ---
  let performance: PerfResult = { available: false, score: 50 }
  try {
    const psRes = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&category=PERFORMANCE`,
      { signal: AbortSignal.timeout(20000) }
    )
    if (psRes.ok) {
      const ps = await psRes.json()
      const audits = ps.lighthouseResult?.audits
      performance = {
        available: true,
        score: Math.round((ps.lighthouseResult?.categories?.performance?.score ?? 0) * 100),
        lcp: audits?.['largest-contentful-paint']?.numericValue,
        fcp: audits?.['first-contentful-paint']?.numericValue,
        cls: audits?.['cumulative-layout-shift']?.numericValue,
      }
    }
  } catch {}

  // --- 5. Total score ---
  const perfScore = performance.available ? performance.score : 50
  const total = Math.round(secScore * 0.5 + seoScore * 0.2 + perfScore * 0.3)

  // --- 6. Estimate ---
  const highMissing = headers.filter(h => !h.present && h.severity === 'HIGH').length
  const medMissing  = headers.filter(h => !h.present && h.severity === 'MEDIUM').length
  const items: Array<{ name: string; priceRange: string; reason: string }> = []

  if (total < 45 || (highMissing >= 2 && seoScore < 60 && perfScore < 60)) {
    items.push({ name: '홈페이지 전면 리뉴얼', priceRange: '200만원~400만원', reason: '보안·SEO·성능 복합 개선 필요' })
  } else {
    if (highMissing >= 2) items.push({ name: '보안 취약점 긴급 패치', priceRange: '80만원~150만원', reason: `HIGH 위험 헤더 ${highMissing}개 누락` })
    else if (highMissing === 1 || medMissing >= 2) items.push({ name: '보안 기본 설정', priceRange: '30만원~80만원', reason: '주요 보안 헤더 누락' })
    if (performance.available && perfScore < 50) items.push({ name: '성능 최적화', priceRange: '80만원~150만원', reason: `PageSpeed ${perfScore}점 (권장 90+)` })
    else if (performance.available && perfScore < 75) items.push({ name: '속도 개선', priceRange: '50만원~80만원', reason: `PageSpeed ${perfScore}점 — 개선 여지 있음` })
    if (seoScore < 60) items.push({ name: 'SEO 개선', priceRange: '30만원~70만원', reason: `SEO 항목 ${seoIssues.length}개 미비` })
  }
  if (items.length === 0) {
    items.push({ name: '정기 유지보수 계약', priceRange: '월 10만원~20만원', reason: '현재 상태 양호 — 정기 모니터링 권장' })
  }

  return {
    url, analyzedAt, ssl, headers, seo, performance,
    score: { security: secScore, seo: seoScore, performance: perfScore, total, grade: toGrade(total) },
    estimate: { items },
  }
}
