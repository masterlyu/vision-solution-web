const TIMEOUT = 10_000
const UA = 'VisionC-DiagBot/1.0 (+https://visionc.co.kr)'

// ── Types ────────────────────────────────────────────────────────────────────

export interface CheckItem {
  id: string
  title: string
  currentState: string
  status: 'red' | 'yellow' | 'green'
  impact: 'high' | 'mid' | 'low'
  tobe: string
  tags: string[]
}

export interface AxisResult {
  score: number
  maxScore: number
  items: CheckItem[]
}

export interface TechStack {
  cms: string | null
  cmsVersion: string | null
  cmsConfidence: 'confirmed' | 'inferred' | 'unknown'
  phpVersion: string | null
  phpConfidence: 'confirmed' | 'inferred' | 'unknown'
  phpEol: boolean
  dbType: string | null
  dbVersion: string | null
  dbConfidence: 'inferred' | 'unknown'
  dbEol: boolean
  webServer: string | null
  hosting: string | null
  isWordPress: boolean
  pluginCount: number | null
  signals: Array<{ label: string; value: string; confidence: 'confirmed' | 'inferred' }>
}

export interface SiteTypeResult {
  primary: 'manufacturer' | 'public' | 'nonprofit' | 'service' | 'unknown'
  label: string
  profile: string
  confidence: number
  signals: string[]
}

export interface PriorityAction {
  rank: number
  title: string
  description: string
  timing: 'now' | '1m' | '3m'
  impact: string
}

export interface RenewalAnalysisResult {
  url: string
  domain: string
  analyzedAt: string
  siteType: SiteTypeResult
  techStack: TechStack
  axes: { technical: AxisResult; ux: AxisResult; modern: AxisResult }
  totalScore: number
  grade: 'A' | 'B' | 'C+' | 'D' | 'F'
  criticalIssues: string[]
  priorityActions: PriorityAction[]
  loadTimeMs: number
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function extractBaseDomain(raw: string): string {
  const s = raw.trim().replace(/^https?:\/\//, '').split('/')[0].split('?')[0]
  return s.replace(/^www\./, '').toLowerCase()
}

function extractEmailDomain(email: string): string {
  return (email.split('@')[1] ?? '').toLowerCase()
}

export function domainsMatch(url: string, email: string): boolean {
  return extractBaseDomain(url) === extractEmailDomain(email)
}

async function fetchSafe(url: string, timeout = TIMEOUT): Promise<{ res: Response; text: string } | null> {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeout)
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { 'User-Agent': UA },
      redirect: 'follow',
    })
    const text = await res.text()
    return { res, text }
  } catch {
    return null
  } finally {
    clearTimeout(t)
  }
}

async function probe(url: string): Promise<number | null> {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 5000)
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { 'User-Agent': UA }, redirect: 'follow' })
    return res.status
  } catch {
    return null
  } finally {
    clearTimeout(t)
  }
}

function metaContent(html: string, name: string): string | null {
  const m = html.match(new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i'))
    ?? html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${name}["']`, 'i'))
  return m?.[1] ?? null
}

function hasScript(html: string, ...patterns: string[]): boolean {
  return patterns.some(p => html.includes(p))
}

// ── Tech Stack Detection ─────────────────────────────────────────────────────

async function detectTechStack(base: string, html: string, headers: Headers): Promise<TechStack> {
  const stack: TechStack = {
    cms: null, cmsVersion: null, cmsConfidence: 'unknown',
    phpVersion: null, phpConfidence: 'unknown', phpEol: false,
    dbType: null, dbVersion: null, dbConfidence: 'unknown', dbEol: false,
    webServer: null, hosting: null,
    isWordPress: false, pluginCount: null,
    signals: [],
  }

  // Webserver
  const srv = headers.get('server') ?? ''
  if (/apache/i.test(srv)) stack.webServer = 'Apache'
  else if (/nginx/i.test(srv)) stack.webServer = 'nginx'
  else if (/iis/i.test(srv)) stack.webServer = 'IIS'
  else if (/cloudflare/i.test(srv)) stack.webServer = 'Cloudflare'
  if (stack.webServer) stack.signals.push({ label: '웹서버', value: stack.webServer, confidence: 'confirmed' })

  // Hosting fingerprint
  if (headers.get('cf-ray')) { stack.hosting = 'Cloudflare'; stack.signals.push({ label: '호스팅', value: 'Cloudflare', confidence: 'confirmed' }) }
  else if (/cafe24/i.test(srv) || html.includes('cafe24')) { stack.hosting = '카페24'; stack.signals.push({ label: '호스팅', value: '카페24', confidence: 'confirmed' }) }
  else if (/gabia/i.test(srv)) { stack.hosting = '가비아'; stack.signals.push({ label: '호스팅', value: '가비아', confidence: 'confirmed' }) }

  // PHP
  const xPowered = headers.get('x-powered-by') ?? ''
  const phpMatch = xPowered.match(/PHP\/([\d.]+)/i)
  if (phpMatch) {
    stack.phpVersion = phpMatch[1]
    stack.phpConfidence = 'confirmed'
    const major = parseInt(phpMatch[1])
    stack.phpEol = major < 8
    stack.signals.push({ label: 'PHP 버전', value: `PHP ${phpMatch[1]}`, confidence: 'confirmed' })
  } else if (html.includes('.php') || html.includes('<?php')) {
    stack.phpConfidence = 'inferred'
    stack.signals.push({ label: 'PHP 사용', value: '.php URL 패턴 감지', confidence: 'inferred' })
  }

  // WordPress
  const wpGenerator = html.match(/<meta[^>]+name=["']generator["'][^>]+content=["']WordPress ([\d.]+)["']/i)
  const hasWpContent = html.includes('/wp-content/') || html.includes('/wp-includes/')
  const wpStatus = await probe(`https://${base}/wp-login.php`)

  if (wpGenerator) {
    stack.cms = 'WordPress'
    stack.cmsVersion = wpGenerator[1]
    stack.cmsConfidence = 'confirmed'
    stack.isWordPress = true
    stack.signals.push({ label: 'CMS', value: `WordPress ${wpGenerator[1]}`, confidence: 'confirmed' })
    // plugin count estimate
    const pluginMatches = html.match(/\/wp-content\/plugins\//g)
    stack.pluginCount = pluginMatches ? Math.max(pluginMatches.length, 1) : null
    // infer PHP if not already confirmed
    if (!phpMatch) {
      stack.phpConfidence = 'inferred'
      stack.phpEol = true // WP 5.x era commonly uses PHP 7.x
      stack.signals.push({ label: 'PHP', value: 'PHP 7.x 이하 추정 (WP 조합)', confidence: 'inferred' })
    }
    // infer MySQL
    stack.dbType = 'MySQL'
    stack.dbVersion = '5.7'
    stack.dbConfidence = 'inferred'
    stack.dbEol = true
    stack.signals.push({ label: '데이터베이스', value: 'MySQL 5.7 추정 (WP 기본 조합)', confidence: 'inferred' })
  } else if (hasWpContent || wpStatus === 200) {
    stack.cms = 'WordPress'
    stack.cmsConfidence = 'inferred'
    stack.isWordPress = true
    stack.signals.push({ label: 'CMS', value: 'WordPress (경로 패턴 감지)', confidence: 'inferred' })
  }

  // Joomla
  if (!stack.cms && (html.includes('/components/com_') || html.includes('Joomla!'))) {
    stack.cms = 'Joomla'
    stack.cmsConfidence = 'inferred'
    stack.signals.push({ label: 'CMS', value: 'Joomla (패턴 감지)', confidence: 'inferred' })
  }

  // XE / Gnuboard (Korean CMS)
  if (!stack.cms && (html.includes('/xe/') || html.includes('XpressEngine'))) {
    stack.cms = 'XpressEngine (XE)'
    stack.cmsConfidence = 'inferred'
    stack.signals.push({ label: 'CMS', value: 'XpressEngine (XE)', confidence: 'inferred' })
  }
  if (!stack.cms && (html.includes('gnuboard') || html.includes('gnu.gz'))) {
    stack.cms = 'Gnuboard'
    stack.cmsConfidence = 'inferred'
    stack.signals.push({ label: 'CMS', value: 'Gnuboard', confidence: 'inferred' })
  }

  return stack
}

// ── Site Type Detection ──────────────────────────────────────────────────────

function detectSiteType(domain: string, html: string): SiteTypeResult {
  const lower = html.toLowerCase()
  const signals: string[] = []
  const scores: Record<string, number> = { manufacturer: 0, public: 0, nonprofit: 0, service: 0 }

  // Domain TLD
  if (domain.endsWith('.go.kr')) { scores.public += 50; signals.push('.go.kr 도메인 (공공기관 전용)') }
  if (domain.endsWith('.or.kr')) { scores.nonprofit += 30; scores.public += 20; signals.push('.or.kr 도메인 (공공·비영리)') }

  // Manufacturer keywords
  const mfgKw = ['제조', '가공', '납품', 'oem', 'odm', '부품', '공장', '생산', '도면', '견적', 'iso인증', '특허', '기계', '금속', '철강', '플라스틱', '사출']
  const mfgHits = mfgKw.filter(k => lower.includes(k))
  if (mfgHits.length >= 3) { scores.manufacturer += mfgHits.length * 5; signals.push(`제조업 키워드 ${mfgHits.length}개 감지`) }

  // Address patterns (Korean industrial zones)
  if (/산업단지|공단로|공업단지|산단/.test(html)) { scores.manufacturer += 20; signals.push('산업단지 주소 패턴') }

  // Public institution keywords
  const pubKw = ['공공', '기관', '행정', '민원', '정책', '공지사항', '공시', '정보공개']
  const pubHits = pubKw.filter(k => lower.includes(k))
  if (pubHits.length >= 2) { scores.public += pubHits.length * 5; signals.push(`공공기관 키워드 ${pubHits.length}개 감지`) }

  // Nonprofit keywords
  const npoKw = ['재단', '협회', '복지', '후원', '기부', '봉사', '사단법인', '비영리']
  const npoHits = npoKw.filter(k => lower.includes(k))
  if (npoHits.length >= 2) { scores.nonprofit += npoHits.length * 5; signals.push(`비영리 키워드 ${npoHits.length}개 감지`) }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]
  const confidence = Math.min(95, best[1])
  const primary = confidence >= 20 ? (best[0] as SiteTypeResult['primary']) : 'unknown'

  const labels: Record<string, [string, string]> = {
    manufacturer: ['중소 제조업체', 'B2B 제조형'],
    public: ['공공기관', '공공기관형'],
    nonprofit: ['비영리·협회', '비영리형'],
    service: ['서비스업', '일반기업형'],
    unknown: ['일반기업', '일반기업형'],
  }
  const [label, profile] = labels[primary]
  return { primary, label, profile, confidence, signals }
}

// ── Axis 1: Technical ────────────────────────────────────────────────────────

function analyzeTechnical(html: string, headers: Headers, base: string, loadMs: number,
  sitemapOk: boolean, robotsOk: boolean): AxisResult {
  const items: CheckItem[] = []
  let score = 0

  // SEO tags
  const title = html.match(/<title[^>]*>([^<]{1,100})<\/title>/i)?.[1]?.trim()
  const desc = metaContent(html, 'description')
  const ogTitle = metaContent(html, 'og:title')
  const ogImage = metaContent(html, 'og:image')

  const seoScore = (title ? 2 : 0) + (desc ? 2 : 0) + (ogTitle ? 1 : 0) + (ogImage ? 1 : 0)
  score += seoScore
  items.push({
    id: 'seo-tags',
    title: '네이버·구글 검색 노출 설정',
    currentState: seoScore >= 5
      ? `페이지 제목·설명·이미지 정상 설정됨`
      : `${!title ? '페이지 제목 없음 ' : ''}${!desc ? '설명 없음 ' : ''}${!ogImage ? 'SNS 공유 이미지 없음' : ''}`.trim(),
    status: seoScore >= 5 ? 'green' : seoScore >= 3 ? 'yellow' : 'red',
    impact: 'high',
    tobe: '검색 결과에 회사명·업종·연락처가 자동 노출되도록 태그 설정',
    tags: ['all'],
  })

  // Sitemap
  score += sitemapOk ? 3 : 0
  items.push({
    id: 'sitemap',
    title: '사이트맵 (sitemap.xml)',
    currentState: sitemapOk ? '사이트맵 정상' : '사이트맵 없음 — 신규 페이지 검색 반영 지연',
    status: sitemapOk ? 'green' : 'red',
    impact: 'mid',
    tobe: '사이트맵 생성 → 신규 페이지 2~4주 내 검색 반영',
    tags: ['all'],
  })

  // robots.txt
  score += robotsOk ? 2 : 0
  items.push({
    id: 'robots',
    title: 'robots.txt (검색엔진 안내 파일)',
    currentState: robotsOk ? 'robots.txt 정상' : 'robots.txt 없음',
    status: robotsOk ? 'green' : 'yellow',
    impact: 'mid',
    tobe: 'robots.txt 생성으로 검색엔진 크롤링 안내 설정',
    tags: ['all'],
  })

  // HTTPS
  const isHttps = base.startsWith('https') || !base.startsWith('http')
  score += isHttps ? 5 : 0
  items.push({
    id: 'https',
    title: 'HTTPS 보안 접속',
    currentState: isHttps ? 'HTTPS 적용됨 (자물쇠 정상)' : 'HTTP만 사용 중 — 개인정보 유출 위험',
    status: isHttps ? 'green' : 'red',
    impact: 'high',
    tobe: 'SSL 인증서 적용으로 보안 접속 보장',
    tags: ['all'],
  })

  // Security headers (check 5 key headers)
  const secHeaders = [
    'strict-transport-security', 'x-frame-options',
    'x-content-type-options', 'referrer-policy', 'content-security-policy',
  ]
  const presentHeaders = secHeaders.filter(h => headers.has(h))
  const hScore = presentHeaders.length // 1pt each, max 5
  score += hScore
  items.push({
    id: 'sec-headers',
    title: '해킹 방어 설정 (보안 헤더)',
    currentState: `5개 항목 중 ${presentHeaders.length}개 설정됨`,
    status: hScore >= 4 ? 'green' : hScore >= 2 ? 'yellow' : 'red',
    impact: 'high',
    tobe: '5개 보안 헤더 전체 설정 → 클릭재킹·XSS 등 자동 방어',
    tags: ['all'],
  })

  // Loading speed
  const speedScore = loadMs < 2000 ? 6 : loadMs < 4000 ? 3 : 0
  score += speedScore
  items.push({
    id: 'speed',
    title: `홈페이지 첫 화면 로딩 속도`,
    currentState: `첫 응답 ${(loadMs / 1000).toFixed(1)}초 (권장 2초 이내)`,
    status: loadMs < 2000 ? 'green' : loadMs < 4000 ? 'yellow' : 'red',
    impact: 'high',
    tobe: '이미지 압축·코드 최적화로 2초 이내 달성 → 이탈률 40% 감소 예상',
    tags: ['all'],
  })

  // Mobile viewport
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html)
  score += hasViewport ? 4 : 0
  items.push({
    id: 'viewport',
    title: '모바일 최적화 (반응형 설정)',
    currentState: hasViewport ? '모바일 반응형 설정됨' : '모바일 반응형 설정 없음 — 스마트폰에서 잘림',
    status: hasViewport ? 'green' : 'red',
    impact: 'high',
    tobe: '반응형 설정 적용 → 스마트폰 방문자 경험 정상화',
    tags: ['all'],
  })

  // CMS security: WordPress version exposure
  const wpOldVersion = html.match(/<meta[^>]+content=["']WordPress (4|5\.[0-8])\./i)
  if (wpOldVersion) {
    items.push({
      id: 'wp-version',
      title: 'CMS 버전 보안 위험',
      currentState: `WordPress ${wpOldVersion[1]}버전 노출 — 보안 패치 미적용 위험`,
      status: 'red',
      impact: 'high',
      tobe: 'WordPress 최신 버전 업데이트 + 버전 정보 숨김 처리',
      tags: ['all'],
    })
  } else score += 5 // 버전 이슈 없으면 5점 추가

  return { score: Math.min(score, 35), maxScore: 35, items }
}

// ── Axis 2: UX ───────────────────────────────────────────────────────────────

function analyzeUX(html: string): AxisResult {
  const items: CheckItem[] = []
  let score = 0

  // H1 clarity
  const h1 = html.match(/<h1[^>]*>([^<]{3,})<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim()
  const h1Score = h1 && h1.length > 5 ? 6 : h1 ? 3 : 0
  score += h1Score
  items.push({
    id: 'h1',
    title: '첫 화면 핵심 메시지 (H1)',
    currentState: h1 ? `H1: "${h1.slice(0, 40)}${h1.length > 40 ? '…' : ''}"` : '페이지 대표 제목(H1) 없음',
    status: h1Score >= 6 ? 'green' : h1Score >= 3 ? 'yellow' : 'red',
    impact: 'high',
    tobe: '첫 화면에 업종·전문 분야·강점을 30자 이내로 명시',
    tags: ['all'],
  })

  // CTA / contact presence
  const hasTel = /href=["']tel:/i.test(html)
  const hasMailto = /href=["']mailto:/i.test(html)
  const hasContactForm = /<form/i.test(html)
  const ctaScore = (hasTel ? 3 : 0) + (hasMailto || hasContactForm ? 3 : 0)
  score += ctaScore
  items.push({
    id: 'cta',
    title: '연락·문의 버튼 접근성',
    currentState: hasTel && (hasMailto || hasContactForm)
      ? '전화·이메일·문의 폼 모두 있음'
      : `${!hasTel ? '전화 링크 없음' : ''} ${!hasMailto && !hasContactForm ? '이메일·문의 폼 없음' : ''}`.trim(),
    status: ctaScore >= 5 ? 'green' : ctaScore >= 3 ? 'yellow' : 'red',
    impact: 'high',
    tobe: '전화·이메일·문의 폼을 첫 화면에서 바로 접근 가능하게 배치',
    tags: ['all'],
  })

  // Navigation
  const hasNav = /<nav[\s>]/i.test(html)
  const navLinks = (html.match(/<nav[^>]*>[\s\S]*?<\/nav>/gi) ?? []).join('').match(/<a /gi)?.length ?? 0
  const navScore = hasNav ? (navLinks >= 4 ? 5 : 3) : 0
  score += navScore
  items.push({
    id: 'nav',
    title: '메뉴·네비게이션 구조',
    currentState: hasNav ? `메뉴 있음 (링크 ${navLinks}개 이상)` : '명확한 네비게이션 메뉴 없음',
    status: navScore >= 5 ? 'green' : navScore >= 3 ? 'yellow' : 'red',
    impact: 'mid',
    tobe: '명확한 메인 메뉴 구성으로 방문자 탐색 편의성 확보',
    tags: ['all'],
  })

  // Readability: lang attribute + text content
  const hasLang = /html[^>]+lang=/i.test(html)
  const bodyText = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  const textScore = (hasLang ? 2 : 0) + (bodyText.length > 300 ? 3 : bodyText.length > 100 ? 1 : 0)
  score += textScore
  items.push({
    id: 'readability',
    title: '콘텐츠 가독성 기본 설정',
    currentState: hasLang ? '한국어 언어 설정 정상' : 'HTML 언어 속성 미설정',
    status: textScore >= 5 ? 'green' : textScore >= 3 ? 'yellow' : 'red',
    impact: 'low',
    tobe: '언어 설정·충분한 콘텐츠 텍스트로 접근성 및 SEO 개선',
    tags: ['all'],
  })

  // Image alt text
  const totalImgs = (html.match(/<img /gi) ?? []).length
  const altImgs = (html.match(/<img [^>]*alt=["'][^"']+["']/gi) ?? []).length
  const altRatio = totalImgs > 0 ? altImgs / totalImgs : 1
  const altScore = altRatio > 0.8 ? 4 : altRatio > 0.5 ? 2 : 0
  score += altScore
  items.push({
    id: 'img-alt',
    title: '이미지 설명 텍스트 (alt 태그)',
    currentState: totalImgs === 0
      ? '이미지 없음'
      : `이미지 ${totalImgs}개 중 ${altImgs}개에 설명 텍스트 있음`,
    status: altScore >= 4 ? 'green' : altScore >= 2 ? 'yellow' : 'red',
    impact: 'mid',
    tobe: '모든 이미지에 설명 텍스트 추가 → 검색 노출 + 장애인 접근성 개선',
    tags: ['all'],
  })

  // Contact info in footer
  const footerHtml = html.match(/<footer[\s\S]*?<\/footer>/i)?.[0] ?? ''
  const hasFooterContact = /\d{2,4}-\d{3,4}-\d{4}|@[a-zA-Z0-9]/.test(footerHtml)
  score += hasFooterContact ? 5 : 0
  items.push({
    id: 'footer-contact',
    title: '하단 연락처·사업자 정보',
    currentState: hasFooterContact ? '하단에 연락처 정보 있음' : '하단 연락처·사업자번호 없음',
    status: hasFooterContact ? 'green' : 'red',
    impact: 'mid',
    tobe: '전화번호·이메일·사업자번호·주소를 하단에 명시',
    tags: ['all'],
  })

  // Basic accessibility
  const hasSkipNav = /skip[\s-]?nav|건너뛰기/i.test(html)
  const accScore = (hasLang ? 2 : 0) + (hasSkipNav ? 2 : 0)
  score += accScore
  items.push({
    id: 'accessibility',
    title: '웹 접근성 기초 준수',
    currentState: hasSkipNav ? '건너뛰기 링크 있음' : '키보드 접근성·건너뛰기 링크 없음',
    status: accScore >= 4 ? 'green' : accScore >= 2 ? 'yellow' : 'red',
    impact: 'high',
    tobe: '웹접근성 KWCAG 2.1 기준 충족 → 공공기관 법적 의무, 일반기업 신뢰도 상승',
    tags: ['all', 'pub'],
  })

  return { score: Math.min(score, 35), maxScore: 35, items }
}

// ── Axis 3: Modern Standards ─────────────────────────────────────────────────

function analyzeModern(html: string, domain: string, techStack: TechStack): AxisResult {
  const items: CheckItem[] = []
  let score = 0

  // Analytics
  const hasGA = hasScript(html, 'gtag(', 'ga(', 'analytics.js', 'googletagmanager.com')
  const hasNaver = hasScript(html, 'wcs.naver.com', 'NAV_ANALYTICS', '_nasa')
  const analyticsScore = (hasGA || hasNaver) ? 6 : 0
  score += analyticsScore
  items.push({
    id: 'analytics',
    title: '방문자 분석 도구 설치',
    currentState: hasGA ? 'Google Analytics 설치됨' : hasNaver ? '네이버 애널리틱스 설치됨' : '방문자 분석 도구 없음',
    status: analyticsScore > 0 ? 'green' : 'red',
    impact: 'high',
    tobe: 'GA4 설치 → 어느 페이지에 바이어가 많이 오는지, 어디서 이탈하는지 파악 가능',
    tags: ['all'],
  })

  // OG Image for social sharing
  const ogImage = metaContent(html, 'og:image')
  score += ogImage ? 4 : 0
  items.push({
    id: 'og-image',
    title: 'SNS 공유 시 대표 이미지',
    currentState: ogImage ? 'OG 이미지 설정됨' : '공유 시 이미지·설명 없음 — URL만 표시됨',
    status: ogImage ? 'green' : 'yellow',
    impact: 'mid',
    tobe: 'OG 이미지 설정 → 카카오·링크드인 공유 시 회사 로고+소개 자동 표시',
    tags: ['all'],
  })

  // Privacy policy
  const hasPrivacy = /개인정보처리방침|개인정보\s*보호\s*정책|privacy\s*policy/i.test(html)
  score += hasPrivacy ? 4 : 0
  items.push({
    id: 'privacy',
    title: '개인정보처리방침',
    currentState: hasPrivacy ? '개인정보처리방침 페이지 있음' : '개인정보처리방침 없음 — 법적 의무 위반 위험',
    status: hasPrivacy ? 'green' : 'red',
    impact: 'high',
    tobe: '개인정보처리방침 페이지 작성 및 하단 링크 연결 (법적 의무)',
    tags: ['all', 'pub'],
  })

  // Schema.org
  const hasSchema = html.includes('application/ld+json') || html.includes('schema.org')
  score += hasSchema ? 4 : 0
  items.push({
    id: 'schema',
    title: '구조화 데이터 마크업 (Schema.org)',
    currentState: hasSchema ? '구조화 데이터 마크업 있음' : '구조화 데이터 없음 — 구글 리치 결과 불가',
    status: hasSchema ? 'green' : 'yellow',
    impact: 'mid',
    tobe: 'Schema.org 마크업 추가 → 구글 검색 결과에 회사 정보 강조 표시',
    tags: ['all'],
  })

  // Tech modernity (CMS/PHP version risk)
  const techScore = techStack.phpEol || techStack.dbEol ? 0 : techStack.cms === null ? 5 : 3
  score += techScore
  items.push({
    id: 'tech-age',
    title: '기술 스택 현대성',
    currentState: techStack.phpEol
      ? `PHP ${techStack.phpVersion ?? '7.x'} 지원 종료(EOL) — 보안 패치 없음`
      : techStack.cms
        ? `${techStack.cms} 기반 (관리 필요)`
        : '최신 기술 스택 사용',
    status: techScore >= 5 ? 'green' : techScore >= 3 ? 'yellow' : 'red',
    impact: 'high',
    tobe: '최신 버전 업데이트 또는 현대 스택으로 전환 → 보안·성능·유지보수성 개선',
    tags: ['all'],
  })

  // Social channels
  const hasSocial = /instagram\.com|youtube\.com|facebook\.com|blog\.naver\.com|pf\.kakao\.com/i.test(html)
  score += hasSocial ? 3 : 0
  items.push({
    id: 'social',
    title: 'SNS·채널 연동',
    currentState: hasSocial ? 'SNS 채널 링크 있음' : 'SNS·채널 링크 없음',
    status: hasSocial ? 'green' : 'yellow',
    impact: 'low',
    tobe: '인스타그램·유튜브·카카오 채널 링크 추가',
    tags: ['all'],
  })

  // Multilingual (especially important for manufacturers)
  const hasEnglish = /href=["'][^"']*\/en[\/"]|lang=["']en["']|english/i.test(html)
  score += hasEnglish ? 5 : 0
  items.push({
    id: 'multilingual',
    title: '영문 페이지 (해외 바이어 대응)',
    currentState: hasEnglish ? '영문 페이지 있음' : '영문 페이지 없음 — 해외 바이어 즉시 이탈',
    status: hasEnglish ? 'green' : 'red',
    impact: 'high',
    tobe: '회사 소개·제품 목록·견적 문의를 영문으로 구성 → 수출·해외 납품 기회 확보',
    tags: ['mfg'],
  })

  // Chat/contact widget
  const hasChat = /kakao.*channel|pf\.kakao|channeltalk|channel\.io|tawkto|tidio|bootpay/i.test(html)
  score += hasChat ? 4 : 0
  items.push({
    id: 'chat',
    title: '실시간 상담 채널 (채팅)',
    currentState: hasChat ? '실시간 채팅 채널 있음' : '실시간 상담 채널 없음',
    status: hasChat ? 'green' : 'yellow',
    impact: 'mid',
    tobe: '카카오 채널 또는 채팅 위젯 연동 → 즉각 문의 응대 가능',
    tags: ['all'],
  })

  return { score: Math.min(score, 30), maxScore: 30, items }
}

// ── Grade ────────────────────────────────────────────────────────────────────

function calcGrade(score: number): RenewalAnalysisResult['grade'] {
  if (score >= 85) return 'A'
  if (score >= 70) return 'B'
  if (score >= 55) return 'C+'
  if (score >= 40) return 'D'
  return 'F'
}

// ── Priority Actions ─────────────────────────────────────────────────────────

function buildPriorityActions(
  tech: AxisResult, ux: AxisResult, modern: AxisResult
): PriorityAction[] {
  const redItems = [
    ...tech.items.filter(i => i.status === 'red').map(i => ({ ...i, axis: '기술' })),
    ...ux.items.filter(i => i.status === 'red').map(i => ({ ...i, axis: '경험' })),
    ...modern.items.filter(i => i.status === 'red').map(i => ({ ...i, axis: '현대' })),
  ].sort((a, b) => (a.impact === 'high' ? 0 : 1) - (b.impact === 'high' ? 0 : 1))

  const timingMap: Record<string, PriorityAction['timing']> = {
    'seo-tags': 'now', 'sec-headers': 'now', 'analytics': 'now', 'privacy': 'now',
    'cta': 'now', 'h1': 'now', 'https': 'now',
    'sitemap': '1m', 'speed': '1m', 'multilingual': '1m', 'schema': '1m',
    'tech-age': '3m', 'wp-version': '1m',
  }

  return redItems.slice(0, 7).map((item, i) => ({
    rank: i + 1,
    title: item.title,
    description: item.currentState,
    timing: timingMap[item.id] ?? '1m',
    impact: item.tobe,
  }))
}

// ── Main Entry ───────────────────────────────────────────────────────────────

export async function analyzeRenewal(rawUrl: string): Promise<RenewalAnalysisResult> {
  const base = extractBaseDomain(rawUrl)
  const url = `https://${base}`

  const start = Date.now()
  const main = await fetchSafe(url)
  const loadMs = Date.now() - start

  if (!main) throw new Error('사이트에 접근할 수 없습니다. URL을 확인해 주세요.')

  const html = main.text
  const headers = main.res.headers

  // Parallel probes
  const [sitemapStatus, robotsStatus] = await Promise.all([
    probe(`${url}/sitemap.xml`),
    probe(`${url}/robots.txt`),
  ])

  const techStack = await detectTechStack(url, html, headers)
  const siteType = detectSiteType(base, html)

  const technical = analyzeTechnical(html, headers, url, loadMs, sitemapStatus === 200, robotsStatus === 200)
  const ux = analyzeUX(html)
  const modern = analyzeModern(html, base, techStack)

  const totalScore = technical.score + ux.score + modern.score
  const grade = calcGrade(totalScore)

  const criticalIssues = [
    ...technical.items.filter(i => i.status === 'red' && i.impact === 'high').map(i => i.currentState),
    ...ux.items.filter(i => i.status === 'red' && i.impact === 'high').map(i => i.currentState),
    ...modern.items.filter(i => i.status === 'red' && i.impact === 'high').map(i => i.currentState),
  ].slice(0, 3)

  const priorityActions = buildPriorityActions(technical, ux, modern)

  return {
    url, domain: base, analyzedAt: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    siteType, techStack,
    axes: { technical, ux, modern },
    totalScore, grade, criticalIssues, priorityActions, loadTimeMs: loadMs,
  }
}
