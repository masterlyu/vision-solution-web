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

  const srv = headers.get('server') ?? ''
  const xPowered = headers.get('x-powered-by') ?? ''

  // ── 웹서버 ──
  if (/apache/i.test(srv))          stack.webServer = 'Apache'
  else if (/nginx/i.test(srv))      stack.webServer = 'nginx'
  else if (/iis/i.test(srv))        stack.webServer = 'IIS (Windows)'
  else if (/vercel/i.test(srv))     stack.webServer = 'Vercel Edge'
  else if (/cloudflare/i.test(srv)) stack.webServer = 'Cloudflare'
  else if (/netlify/i.test(srv))    stack.webServer = 'Netlify'
  else if (/openresty/i.test(srv))  stack.webServer = 'OpenResty (nginx 기반)'
  else if (/litespeed/i.test(srv))  stack.webServer = 'LiteSpeed'
  if (stack.webServer) stack.signals.push({ label: '웹서버', value: stack.webServer, confidence: 'confirmed' })

  // ── 호스팅 감지 (헤더 기반) ──
  if (headers.get('x-vercel-id') || /vercel/i.test(srv)) {
    stack.hosting = 'Vercel'
    stack.signals.push({ label: '호스팅', value: 'Vercel', confidence: 'confirmed' })
  } else if (headers.get('x-nf-request-id') || /netlify/i.test(srv)) {
    stack.hosting = 'Netlify'
    stack.signals.push({ label: '호스팅', value: 'Netlify', confidence: 'confirmed' })
  } else if (headers.get('x-amz-cf-id')) {
    stack.hosting = 'AWS CloudFront'
    stack.signals.push({ label: '호스팅', value: 'AWS CloudFront (CDN)', confidence: 'confirmed' })
  } else if (headers.get('x-amz-request-id')) {
    stack.hosting = 'AWS S3'
    stack.signals.push({ label: '호스팅', value: 'AWS S3 (정적 호스팅)', confidence: 'confirmed' })
  } else if (headers.get('x-github-request-id')) {
    stack.hosting = 'GitHub Pages'
    stack.signals.push({ label: '호스팅', value: 'GitHub Pages', confidence: 'confirmed' })
  } else if (headers.get('x-azure-ref')) {
    stack.hosting = 'Microsoft Azure'
    stack.signals.push({ label: '호스팅', value: 'Microsoft Azure', confidence: 'confirmed' })
  } else if (/cafe24/i.test(srv) || html.includes('cdn.cafe24')) {
    stack.hosting = '카페24'
    stack.signals.push({ label: '호스팅', value: '카페24', confidence: 'confirmed' })
  } else if (/gabia/i.test(srv) || headers.get('x-gabia-server')) {
    stack.hosting = '가비아'
    stack.signals.push({ label: '호스팅', value: '가비아', confidence: 'confirmed' })
  } else if (headers.get('cf-ray')) {
    stack.hosting = 'Cloudflare (CDN/프록시)'
    stack.signals.push({ label: 'CDN', value: 'Cloudflare (원본 호스팅 미확인)', confidence: 'confirmed' })
  }

  // ── JavaScript 프레임워크 감지 ──
  const isNextJs = html.includes('__NEXT_DATA__') || html.includes('/_next/static/') || html.includes('/_next/chunks/')
  const isNuxt = html.includes('__NUXT__') || html.includes('/_nuxt/') || html.includes('window.__nuxt')
  const isGatsby = html.includes('___gatsby') || html.includes('/gatsby-chunk') || html.includes('gatsby-image')
  const isReact = html.includes('data-reactroot') || html.includes('react.min.js') || html.includes('react-dom')
  const isVue = html.includes('data-v-app') || html.includes('__vue_app__') || /vue(?:\.runtime)?\.(?:min\.)?js/i.test(html)
  const isAngular = html.includes('ng-version') || html.includes('[ng-') || html.includes('angular.min.js')
  const isAstro = html.includes('data-astro-cid') || html.includes('@astrojs')

  if (isNextJs) {
    stack.cms = 'Next.js'
    stack.cmsConfidence = 'confirmed'
    stack.signals.push({ label: '프레임워크', value: 'Next.js (React 기반 SSR/SSG)', confidence: 'confirmed' })
    if (!stack.hosting) {
      stack.hosting = 'Vercel 또는 Node.js 서버'
      stack.signals.push({ label: '호스팅 추정', value: 'Vercel 또는 Node.js 호환 호스팅', confidence: 'inferred' })
    }
    if (!stack.webServer) stack.webServer = 'Node.js'
    stack.signals.push({ label: '런타임', value: 'Node.js', confidence: 'inferred' })
  } else if (isNuxt) {
    stack.cms = 'Nuxt.js'
    stack.cmsConfidence = 'confirmed'
    stack.signals.push({ label: '프레임워크', value: 'Nuxt.js (Vue 기반 SSR)', confidence: 'confirmed' })
    stack.signals.push({ label: '런타임', value: 'Node.js', confidence: 'inferred' })
  } else if (isGatsby) {
    stack.cms = 'Gatsby'
    stack.cmsConfidence = 'confirmed'
    stack.signals.push({ label: '프레임워크', value: 'Gatsby (React 정적사이트)', confidence: 'confirmed' })
  } else if (isAstro) {
    stack.cms = 'Astro'
    stack.cmsConfidence = 'confirmed'
    stack.signals.push({ label: '프레임워크', value: 'Astro (정적사이트 생성기)', confidence: 'confirmed' })
  } else if (isReact) {
    stack.signals.push({ label: '프론트엔드', value: 'React.js', confidence: 'confirmed' })
  } else if (isVue) {
    stack.signals.push({ label: '프론트엔드', value: 'Vue.js', confidence: 'confirmed' })
  } else if (isAngular) {
    stack.signals.push({ label: '프론트엔드', value: 'Angular', confidence: 'confirmed' })
  }

  // ── ASP.NET ──
  const isAspNet = /asp\.net/i.test(xPowered) || html.includes('__VIEWSTATE') || /\.aspx/i.test(html) || headers.get('x-aspnet-version')
  if (isAspNet) {
    if (!stack.cms) { stack.cms = 'ASP.NET'; stack.cmsConfidence = 'confirmed' }
    stack.webServer = stack.webServer ?? 'IIS (Windows)'
    stack.signals.push({ label: '서버 기술', value: 'ASP.NET (Microsoft .NET)', confidence: 'confirmed' })
    stack.signals.push({ label: 'OS 추정', value: 'Windows Server', confidence: 'inferred' })
    if (!stack.dbType) {
      stack.dbType = 'MSSQL'
      stack.dbConfidence = 'inferred'
      stack.signals.push({ label: '데이터베이스', value: 'MS SQL Server 추정 (ASP.NET 기본 조합)', confidence: 'inferred' })
    }
  }

  // ── Express / Node.js ──
  if (/express/i.test(xPowered)) {
    stack.signals.push({ label: '서버 기술', value: 'Node.js (Express)', confidence: 'confirmed' })
    if (!stack.webServer) stack.webServer = 'Node.js'
  }

  // ── PHP ──
  const phpMatch = xPowered.match(/PHP\/([\d.]+)/i)
  if (phpMatch) {
    stack.phpVersion = phpMatch[1]
    stack.phpConfidence = 'confirmed'
    stack.phpEol = parseInt(phpMatch[1]) < 8
    stack.signals.push({ label: 'PHP 버전', value: `PHP ${phpMatch[1]}${stack.phpEol ? ' (보안 지원 종료)' : ''}`, confidence: 'confirmed' })
  } else if (!isNextJs && !isNuxt && !isGatsby && !isAspNet && (html.includes('.php') || html.includes('<?php'))) {
    stack.phpConfidence = 'inferred'
    stack.signals.push({ label: 'PHP 사용', value: '.php URL 패턴 감지', confidence: 'inferred' })
  }

  // ── Java (JSP/Spring) ──
  if (/jsp/i.test(xPowered) || html.includes('.jsp') || html.includes('spring') || headers.get('x-application-context')) {
    stack.signals.push({ label: '서버 기술', value: 'Java (JSP/Spring 추정)', confidence: 'inferred' })
  }

  // ── OS 추정 ──
  if (/IIS|Windows/i.test(stack.webServer ?? '')) {
    stack.signals.push({ label: 'OS', value: 'Windows Server', confidence: 'inferred' })
  } else if (stack.webServer && /apache|nginx|openresty|litespeed/i.test(stack.webServer)) {
    stack.signals.push({ label: 'OS', value: 'Linux', confidence: 'inferred' })
  } else if (isNextJs || isNuxt || /express/i.test(xPowered)) {
    stack.signals.push({ label: 'OS', value: 'Linux (Node.js 환경)', confidence: 'inferred' })
  }

  // ── WordPress ──
  const wpGenerator = html.match(/<meta[^>]+name=["']generator["'][^>]+content=["']WordPress ([\d.]+)["']/i)
  const hasWpContent = html.includes('/wp-content/') || html.includes('/wp-includes/')
  const wpStatus = await probe(`https://${base}/wp-login.php`)

  if (wpGenerator) {
    stack.cms = 'WordPress'
    stack.cmsVersion = wpGenerator[1]
    stack.cmsConfidence = 'confirmed'
    stack.isWordPress = true
    stack.signals.push({ label: 'CMS', value: `WordPress ${wpGenerator[1]}`, confidence: 'confirmed' })
    const pluginMatches = html.match(/\/wp-content\/plugins\//g)
    stack.pluginCount = pluginMatches ? Math.max(pluginMatches.length, 1) : null
    if (!phpMatch) {
      stack.phpConfidence = 'inferred'
      stack.phpEol = true
      stack.signals.push({ label: 'PHP', value: 'PHP 7.x 이하 추정 (WP 조합)', confidence: 'inferred' })
    }
    stack.dbType = 'MySQL'; stack.dbVersion = '5.7'; stack.dbConfidence = 'inferred'; stack.dbEol = true
    stack.signals.push({ label: '데이터베이스', value: 'MySQL 5.7 추정 (WP 기본 조합)', confidence: 'inferred' })
  } else if (!stack.cms && (hasWpContent || wpStatus === 200)) {
    stack.cms = 'WordPress'
    stack.cmsConfidence = 'inferred'
    stack.isWordPress = true
    stack.signals.push({ label: 'CMS', value: 'WordPress (경로 패턴 감지)', confidence: 'inferred' })
  }

  // ── 한국형 CMS ──
  if (!stack.cms) {
    if (html.includes('/xe/') || html.includes('XpressEngine')) {
      stack.cms = 'XpressEngine (XE)'; stack.cmsConfidence = 'inferred'
      stack.signals.push({ label: 'CMS', value: 'XpressEngine (XE)', confidence: 'inferred' })
      stack.dbType = stack.dbType ?? 'MySQL'; stack.dbConfidence = 'inferred'
    } else if (html.includes('gnuboard') || html.includes('gnu.gz')) {
      stack.cms = 'Gnuboard'; stack.cmsConfidence = 'inferred'
      stack.signals.push({ label: 'CMS', value: 'Gnuboard', confidence: 'inferred' })
      stack.dbType = stack.dbType ?? 'MySQL'; stack.dbConfidence = 'inferred'
    } else if (html.includes('youngcart') || html.includes('Youngcart')) {
      stack.cms = '영카트'; stack.cmsConfidence = 'inferred'
      stack.signals.push({ label: 'CMS', value: '영카트 (한국형 쇼핑몰)', confidence: 'inferred' })
    }
  }

  // ── Joomla / Drupal ──
  if (!stack.cms) {
    if (html.includes('/components/com_') || html.includes('Joomla!')) {
      stack.cms = 'Joomla'; stack.cmsConfidence = 'inferred'
      stack.signals.push({ label: 'CMS', value: 'Joomla (패턴 감지)', confidence: 'inferred' })
    } else if (html.includes('drupal') || html.includes('/sites/default/files/')) {
      stack.cms = 'Drupal'; stack.cmsConfidence = 'inferred'
      stack.signals.push({ label: 'CMS', value: 'Drupal (패턴 감지)', confidence: 'inferred' })
    }
  }

  // ── Shopify / Cafe24 쇼핑몰 ──
  if (html.includes('cdn.shopify.com') || html.includes('myshopify.com')) {
    stack.cms = 'Shopify'; stack.cmsConfidence = 'confirmed'
    stack.signals.push({ label: '플랫폼', value: 'Shopify (쇼핑몰)', confidence: 'confirmed' })
  } else if (html.includes('cafe24.com') || html.includes('ec-cdn.cafe24')) {
    stack.hosting = stack.hosting ?? '카페24'
    stack.signals.push({ label: '플랫폼', value: '카페24 쇼핑몰', confidence: 'confirmed' })
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

  // IT·web service keywords (high weight — specific to digital agencies, software cos)
  const itKw = ['홈페이지', '웹사이트', '앱개발', '앱 개발', '모바일앱', '소프트웨어', 'it솔루션', '웹개발', '웹 개발', '시스템개발', '디지털', '개발사', '에이전시', 'ui/ux', '리뉴얼', 'ux디자인', '프론트엔드', '백엔드']
  const itHits = itKw.filter(k => lower.includes(k))
  if (itHits.length >= 2) { scores.service += itHits.length * 8; signals.push(`IT·웹서비스 키워드 ${itHits.length}개 감지`) }

  // General service keywords (lower weight)
  const svcKw = ['컨설팅', '솔루션', '서비스업', '에이전시', '스튜디오', '기획', '마케팅', '광고']
  const svcHits = svcKw.filter(k => lower.includes(k))
  if (svcHits.length >= 2) { scores.service += svcHits.length * 3 }

  // Manufacturer keywords — strictly physical manufacturing only (납품/견적 제외: 서비스업도 사용)
  const mfgKw = ['제조', '가공', 'oem', 'odm', '부품', '공장', '생산라인', '도면', 'iso인증', '기계', '금속', '철강', '플라스틱', '사출', '압출', '용접', '주조', '단조']
  const mfgHits = mfgKw.filter(k => lower.includes(k))
  if (mfgHits.length >= 2) { scores.manufacturer += mfgHits.length * 5; signals.push(`제조업 키워드 ${mfgHits.length}개 감지`) }

  // Address patterns (Korean industrial zones — 제조업 전용)
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

  // Dynamic label: IT keywords detected → IT 서비스업 표기
  const isItService = itHits.length >= 2
  const labels: Record<string, [string, string]> = {
    manufacturer: ['중소 제조업체', 'B2B 제조형'],
    public: ['공공기관', '공공기관형'],
    nonprofit: ['비영리·협회', '비영리형'],
    service: [isItService ? '중소 IT·웹 서비스업' : '서비스업', isItService ? 'IT서비스형' : '일반기업형'],
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
    title: '검색 노출 기본 태그 (Title/Description/OG)',
    currentState: seoScore >= 5
      ? `페이지 제목·설명·공유 이미지 모두 설정됨`
      : [!title && '페이지 제목(title) 없음', !desc && '검색 설명(description) 없음', !ogImage && 'SNS 공유 이미지(og:image) 없음'].filter(Boolean).join(' · '),
    status: seoScore >= 5 ? 'green' : seoScore >= 3 ? 'yellow' : 'red',
    impact: 'high',
    tobe: 'title·description·og:image 완성 → 구글·네이버 검색 결과 클릭률 직접 향상',
    tags: ['all'],
  })

  // Sitemap
  score += sitemapOk ? 3 : 0
  items.push({
    id: 'sitemap',
    title: '사이트맵 (sitemap.xml)',
    currentState: sitemapOk ? 'sitemap.xml 정상 확인' : 'sitemap.xml 없음 — 신규 페이지 검색 반영 수주~수개월 지연 가능',
    status: sitemapOk ? 'green' : 'red',
    impact: 'mid',
    tobe: 'sitemap.xml 생성 후 서치콘솔 등록 → 신규 페이지 2~4주 내 검색 반영',
    tags: ['all'],
  })

  // robots.txt
  score += robotsOk ? 2 : 0
  items.push({
    id: 'robots',
    title: 'robots.txt (크롤링 안내 파일)',
    currentState: robotsOk ? 'robots.txt 정상' : 'robots.txt 없음 — 검색엔진 크롤러 방향 미설정',
    status: robotsOk ? 'green' : 'yellow',
    impact: 'mid',
    tobe: 'robots.txt 생성 → 크롤러 허용/차단 경로 명시, sitemap 위치 안내',
    tags: ['all'],
  })

  // Canonical tag
  const hasCanonical = /<link[^>]+rel=["']canonical["']/i.test(html)
  score += hasCanonical ? 2 : 0
  items.push({
    id: 'canonical',
    title: '대표 URL 설정 (Canonical 태그)',
    currentState: hasCanonical ? 'Canonical 태그 설정됨 — 중복 URL 방지' : 'Canonical 태그 없음 — www/비www 중복 페이지 검색 페널티 위험',
    status: hasCanonical ? 'green' : 'yellow',
    impact: 'mid',
    tobe: '<link rel="canonical"> 추가 → 대표 URL 명시로 중복 콘텐츠 페널티 방지',
    tags: ['all'],
  })

  // HTTPS
  const isHttps = base.startsWith('https') || !base.startsWith('http')
  score += isHttps ? 5 : 0
  items.push({
    id: 'https',
    title: 'HTTPS 보안 접속',
    currentState: isHttps ? 'HTTPS 적용됨 (주소창 자물쇠 정상)' : 'HTTP만 사용 중 — 개인정보 유출 위험, 크롬 경고 표시',
    status: isHttps ? 'green' : 'red',
    impact: 'high',
    tobe: 'SSL 인증서 적용 → 보안 접속 보장, 구글 검색 가산점',
    tags: ['all'],
  })

  // Security headers (check 5 key headers)
  const secHeaders = [
    'strict-transport-security', 'x-frame-options',
    'x-content-type-options', 'referrer-policy', 'content-security-policy',
  ]
  const presentHeaders = secHeaders.filter(h => headers.has(h))
  const hScore = presentHeaders.length
  score += hScore
  items.push({
    id: 'sec-headers',
    title: '해킹 방어 보안 헤더',
    currentState: hScore >= 4
      ? `보안 헤더 ${presentHeaders.length}/5개 설정됨`
      : `보안 헤더 ${presentHeaders.length}/5개만 설정 — 클릭재킹·XSS 등 공격 노출 위험`,
    status: hScore >= 4 ? 'green' : hScore >= 2 ? 'yellow' : 'red',
    impact: 'high',
    tobe: 'HSTS·X-Frame-Options·CSP 등 5개 보안 헤더 전체 설정 → 주요 웹 공격 자동 차단',
    tags: ['all'],
  })

  // Loading speed
  const speedScore = loadMs < 2000 ? 6 : loadMs < 4000 ? 3 : 0
  score += speedScore
  items.push({
    id: 'speed',
    title: '첫 화면 로딩 속도',
    currentState: `첫 응답 ${(loadMs / 1000).toFixed(1)}초 ${loadMs < 2000 ? '(권장 기준 충족)' : loadMs < 4000 ? '(권장 2초 초과)' : '(매우 느림 — 방문자 즉시 이탈)'}`,
    status: loadMs < 2000 ? 'green' : loadMs < 4000 ? 'yellow' : 'red',
    impact: 'high',
    tobe: '이미지 WebP 변환·코드 압축으로 2초 이내 달성 → 이탈률 40% 감소 효과',
    tags: ['all'],
  })

  // Compression
  const encoding = headers.get('content-encoding') ?? ''
  const hasCompression = /gzip|br|deflate/i.test(encoding)
  score += hasCompression ? 2 : 0
  items.push({
    id: 'compression',
    title: '파일 압축 전송 (gzip/brotli)',
    currentState: hasCompression ? `압축 전송 적용됨 (${encoding})` : '압축 전송 미적용 — HTML·CSS·JS 원본 그대로 전송 중',
    status: hasCompression ? 'green' : 'yellow',
    impact: 'mid',
    tobe: 'gzip/brotli 압축 활성화 → 전송 데이터 60~80% 절감, 로딩 속도 개선',
    tags: ['all'],
  })

  // Mobile viewport
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html)
  score += hasViewport ? 4 : 0
  items.push({
    id: 'viewport',
    title: '모바일 반응형 설정 (viewport)',
    currentState: hasViewport ? '모바일 반응형 설정됨' : '모바일 반응형 없음 — 스마트폰에서 가로 스크롤 발생',
    status: hasViewport ? 'green' : 'red',
    impact: 'high',
    tobe: 'viewport 메타 태그 + 반응형 CSS 적용 → 스마트폰·태블릿 방문자 경험 정상화',
    tags: ['all'],
  })

  // Cache-Control
  const cacheHeader = headers.get('cache-control') ?? ''
  const hasCaching = /max-age|s-maxage|immutable/i.test(cacheHeader)
  score += hasCaching ? 1 : 0
  items.push({
    id: 'caching',
    title: '브라우저 캐시 설정',
    currentState: hasCaching ? `캐시 설정됨 — 재방문자 빠른 로딩` : '캐시 헤더 없음 — 재방문 시에도 전체 자원 재다운로드',
    status: hasCaching ? 'green' : 'yellow',
    impact: 'low',
    tobe: 'Cache-Control max-age 설정 → 재방문자 로딩 속도 개선, 서버 부하 감소',
    tags: ['all'],
  })

  // CMS security: WordPress version exposure
  const wpOldVersion = html.match(/<meta[^>]+content=["']WordPress (4|5\.[0-8])\./i)
  if (wpOldVersion) {
    items.push({
      id: 'wp-version',
      title: 'CMS 구버전 보안 위험',
      currentState: `WordPress ${wpOldVersion[1]}버전 노출 — 알려진 취약점 다수, 해킹 위험 높음`,
      status: 'red',
      impact: 'high',
      tobe: 'WordPress 최신 버전 업데이트 + 제너레이터 태그 숨김 처리',
      tags: ['all'],
    })
  } else score += 5

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
    currentState: h1 ? `H1 있음: "${h1.slice(0, 40)}${h1.length > 40 ? '…' : ''}"` : '페이지 대표 제목(H1) 없음 — 검색엔진이 페이지 주제 파악 불가',
    status: h1Score >= 6 ? 'green' : h1Score >= 3 ? 'yellow' : 'red',
    impact: 'high',
    tobe: '첫 화면 H1에 업종·전문 분야·핵심 강점을 30자 이내로 명시',
    tags: ['all'],
  })

  // Heading structure H2/H3
  const h2Count = (html.match(/<h2[\s>]/gi) ?? []).length
  const h3Count = (html.match(/<h3[\s>]/gi) ?? []).length
  const headingScore = h2Count >= 3 ? 3 : h2Count >= 1 ? 2 : 0
  score += headingScore
  items.push({
    id: 'heading-structure',
    title: '소제목 계층 구조 (H2/H3)',
    currentState: h2Count > 0
      ? `H2 ${h2Count}개, H3 ${h3Count}개 사용 — 콘텐츠 구조 명확`
      : '소제목(H2/H3) 없음 — 섹션 구분 없이 텍스트 나열, SEO 손실',
    status: headingScore >= 3 ? 'green' : headingScore >= 2 ? 'yellow' : 'red',
    impact: 'mid',
    tobe: '각 섹션마다 H2 소제목 설정 → 가독성·검색엔진 구조 파악 동시 개선',
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
    title: '문의·연락 버튼 접근성',
    currentState: hasTel && (hasMailto || hasContactForm)
      ? '전화·이메일·문의 폼 모두 제공됨'
      : [!hasTel && '전화 링크 없음', !hasMailto && !hasContactForm && '이메일·문의 폼 없음'].filter(Boolean).join(' · '),
    status: ctaScore >= 5 ? 'green' : ctaScore >= 3 ? 'yellow' : 'red',
    impact: 'high',
    tobe: '전화 링크(tel:)·문의 폼을 첫 화면 스크롤 없이 접근 가능하게 배치',
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
    currentState: hasNav ? `메뉴 구조 있음 (링크 ${navLinks}개 감지)` : '명확한 네비게이션 메뉴 없음 — 방문자 탐색 불가',
    status: navScore >= 5 ? 'green' : navScore >= 3 ? 'yellow' : 'red',
    impact: 'mid',
    tobe: '명확한 메인 메뉴(제품/서비스/회사소개/문의)로 방문자 탐색 편의성 확보',
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
      ? '이미지 감지 없음'
      : `이미지 ${totalImgs}개 중 ${altImgs}개에 alt 텍스트 있음 (${Math.round(altRatio * 100)}%)`,
    status: altScore >= 4 ? 'green' : altScore >= 2 ? 'yellow' : 'red',
    impact: 'mid',
    tobe: '모든 이미지에 alt 텍스트 추가 → 이미지 검색 노출 + 웹접근성 법적 기준 충족',
    tags: ['all'],
  })

  // Contact info in footer
  const footerHtml = html.match(/<footer[\s\S]*?<\/footer>/i)?.[0] ?? ''
  const hasFooterContact = /\d{2,4}-\d{3,4}-\d{4}|@[a-zA-Z0-9]/.test(footerHtml)
  score += hasFooterContact ? 5 : 0
  items.push({
    id: 'footer-contact',
    title: '하단 연락처 표시',
    currentState: hasFooterContact ? '하단에 연락처 정보 있음' : '하단 연락처·사업자 정보 없음 — 신뢰도 저하',
    status: hasFooterContact ? 'green' : 'red',
    impact: 'mid',
    tobe: '전화번호·이메일·주소를 하단에 명시 → 방문자 신뢰도 즉시 향상',
    tags: ['all'],
  })

  // Social proof
  const hasCertification = /인증|특허|수상|iso|qs|협력사|파트너|고객사|납품처|공급업체/i.test(html)
  const hasTestimonial = /후기|리뷰|사례|추천|만족|도입|활용/i.test(html)
  const spScore = (hasCertification ? 2 : 0) + (hasTestimonial ? 2 : 0)
  score += spScore
  items.push({
    id: 'social-proof',
    title: '신뢰 요소 (인증·실적·납품처)',
    currentState: hasCertification && hasTestimonial
      ? '인증/실적 및 도입 사례 모두 확인됨'
      : hasCertification
        ? '인증/실적 정보 있음 — 납품 사례·후기 추가 권장'
        : hasTestimonial
          ? '도입 사례 있음 — 인증·실적 정보 추가 권장'
          : '인증서·납품 실적·고객 후기 없음 — 방문자 신뢰 확보 어려움',
    status: spScore >= 4 ? 'green' : spScore >= 2 ? 'yellow' : 'red',
    impact: 'high',
    tobe: 'ISO 인증·특허·납품처 로고·도입 후기를 메인에 배치 → 문의 전환율 직접 상승',
    tags: ['all'],
  })

  // Business registration info
  const hasBusinessNum = /\d{3}-\d{2}-\d{5}/.test(html)
  const hasPhysicalAddr = /서울|부산|대구|인천|광주|대전|울산|경기|강원|충북|충남|전북|전남|경북|경남|제주/.test(html)
  const bizScore = (hasBusinessNum ? 2 : 0) + (hasPhysicalAddr ? 1 : 0)
  score += bizScore
  items.push({
    id: 'business-info',
    title: '사업자 등록정보 공개',
    currentState: hasBusinessNum
      ? `사업자등록번호 표시됨${hasPhysicalAddr ? ' · 주소 확인됨' : ''}`
      : `사업자등록번호 없음${!hasPhysicalAddr ? ' · 주소 불명확' : ''}`,
    status: bizScore >= 3 ? 'green' : bizScore >= 1 ? 'yellow' : 'red',
    impact: 'mid',
    tobe: '사업자등록번호·대표자명·주소를 하단에 명시 → 법적 의무 충족 + 신뢰도 상승',
    tags: ['all'],
  })

  // Readability: lang attribute + text content
  const hasLang = /html[^>]+lang=/i.test(html)
  const bodyText = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  const textScore = (hasLang ? 2 : 0) + (bodyText.length > 300 ? 3 : bodyText.length > 100 ? 1 : 0)
  score += textScore
  items.push({
    id: 'readability',
    title: '언어 설정 및 콘텐츠 충분도',
    currentState: hasLang
      ? `한국어 언어 설정 정상 · 본문 텍스트 ${bodyText.length.toLocaleString()}자`
      : `HTML 언어 속성 미설정 · 본문 텍스트 ${bodyText.length.toLocaleString()}자`,
    status: textScore >= 5 ? 'green' : textScore >= 3 ? 'yellow' : 'red',
    impact: 'low',
    tobe: 'lang="ko" 설정 + 충분한 설명 텍스트 → 접근성 및 SEO 개선',
    tags: ['all'],
  })

  // Basic accessibility
  const hasSkipNav = /skip[\s-]?nav|건너뛰기/i.test(html)
  const accScore = (hasLang ? 2 : 0) + (hasSkipNav ? 2 : 0)
  score += accScore
  items.push({
    id: 'accessibility',
    title: '웹 접근성 기초 (키보드·건너뛰기)',
    currentState: hasSkipNav ? '건너뛰기 링크 있음 — 키보드 접근성 기초 충족' : '건너뛰기 링크 없음 — 키보드 탐색 불편, 공공기관 법적 의무 미충족',
    status: accScore >= 4 ? 'green' : accScore >= 2 ? 'yellow' : 'red',
    impact: 'high',
    tobe: '건너뛰기 링크 + ARIA 레이블 추가 → KWCAG 2.1 기준 충족, 공공기관 법적 의무',
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
    currentState: hasGA ? 'Google Analytics(GA4) 설치됨' : hasNaver ? '네이버 애널리틱스 설치됨' : '방문자 분석 도구 없음 — 유입 경로·이탈 구간 파악 불가',
    status: analyticsScore > 0 ? 'green' : 'red',
    impact: 'high',
    tobe: 'GA4 설치 → 어느 페이지에 방문자가 많은지, 어디서 이탈하는지 데이터 기반 파악',
    tags: ['all'],
  })

  // OG Image for social sharing
  const ogImage = metaContent(html, 'og:image')
  score += ogImage ? 4 : 0
  items.push({
    id: 'og-image',
    title: 'SNS 공유 시 대표 이미지 (OG)',
    currentState: ogImage ? 'OG 이미지 설정됨' : '공유 시 이미지·설명 없음 — URL 텍스트만 표시됨',
    status: ogImage ? 'green' : 'yellow',
    impact: 'mid',
    tobe: 'og:image 설정 → 카카오·링크드인·네이버 공유 시 회사 로고+소개 자동 표시',
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
    tobe: '개인정보처리방침 페이지 작성 및 하단 링크 연결 (정보통신망법 의무)',
    tags: ['all', 'pub'],
  })

  // Schema.org
  const hasSchema = html.includes('application/ld+json') || html.includes('schema.org')
  score += hasSchema ? 4 : 0
  items.push({
    id: 'schema',
    title: '구조화 데이터 마크업 (Schema.org)',
    currentState: hasSchema ? '구조화 데이터 마크업 있음' : '구조화 데이터 없음 — 구글 리치 결과(별점·FAQ) 불가',
    status: hasSchema ? 'green' : 'yellow',
    impact: 'mid',
    tobe: 'Organization·LocalBusiness 마크업 추가 → 구글 검색 결과에 회사 정보 강조 표시',
    tags: ['all'],
  })

  // Tech modernity (CMS/PHP version risk)
  const techScore = techStack.phpEol || techStack.dbEol ? 0 : techStack.cms === null ? 5 : 3
  score += techScore
  items.push({
    id: 'tech-age',
    title: '기술 스택 현대성',
    currentState: techStack.phpEol
      ? `PHP ${techStack.phpVersion ?? '7.x'} 지원 종료(EOL) — 보안 패치 없음, 해킹 위험`
      : techStack.cms
        ? `${techStack.cms} 기반 — 지속적 업데이트 관리 필요`
        : '최신 기술 스택 사용 중',
    status: techScore >= 5 ? 'green' : techScore >= 3 ? 'yellow' : 'red',
    impact: 'high',
    tobe: '최신 버전 업데이트 또는 현대 프레임워크로 전환 → 보안·성능·유지보수성 동시 개선',
    tags: ['all'],
  })

  // Social channels
  const hasSocial = /instagram\.com|youtube\.com|facebook\.com|blog\.naver\.com|pf\.kakao\.com/i.test(html)
  score += hasSocial ? 3 : 0
  items.push({
    id: 'social',
    title: 'SNS·채널 연동',
    currentState: hasSocial ? 'SNS 채널 링크 있음' : 'SNS·소셜 채널 링크 없음 — 브랜드 노출 기회 손실',
    status: hasSocial ? 'green' : 'yellow',
    impact: 'low',
    tobe: '인스타그램·유튜브·카카오 채널 링크 추가 → 브랜드 채널로 유입 경로 다변화',
    tags: ['all'],
  })

  // Cookie consent banner
  const hasCookieConsent = /cookie.*consent|쿠키.*동의|쿠키.*설정|cookieconsent|cookiebot|gdpr/i.test(html)
  score += hasCookieConsent ? 3 : 0
  items.push({
    id: 'cookie-consent',
    title: '쿠키·개인정보 동의 배너',
    currentState: hasCookieConsent ? '쿠키 동의 처리 있음' : '쿠키 동의 배너 없음 — 개인정보보호법 위반 위험',
    status: hasCookieConsent ? 'green' : 'yellow',
    impact: 'mid',
    tobe: '쿠키 동의 팝업 추가 → 개인정보보호법 대응 + 방문자 신뢰 향상',
    tags: ['all'],
  })

  // Naver search advisor
  const hasNaverVerify = /naver-site-verification/i.test(html)
  score += hasNaverVerify ? 2 : 0
  items.push({
    id: 'naver-verify',
    title: '네이버 서치어드바이저 등록',
    currentState: hasNaverVerify ? '네이버 서치어드바이저 인증 완료' : '네이버 서치어드바이저 미등록 — 네이버 검색 최적화 불가',
    status: hasNaverVerify ? 'green' : 'yellow',
    impact: 'mid',
    tobe: '네이버 서치어드바이저 등록 → 네이버 검색 유입 현황 파악 및 키워드 최적화',
    tags: ['all'],
  })

  // Chat/contact widget
  const hasChat = /kakao.*channel|pf\.kakao|channeltalk|channel\.io|tawkto|tidio|bootpay/i.test(html)
  score += hasChat ? 4 : 0
  items.push({
    id: 'chat',
    title: '실시간 상담 채널 (채팅)',
    currentState: hasChat ? '실시간 채팅 채널 있음' : '실시간 상담 채널 없음 — 방문자 즉시 이탈 가능',
    status: hasChat ? 'green' : 'yellow',
    impact: 'mid',
    tobe: '카카오 채널 또는 채팅 위젯 연동 → 즉각 문의 응대, 리드 이탈 방지',
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
    'cta': 'now', 'h1': 'now', 'https': 'now', 'heading-structure': 'now',
    'business-info': 'now', 'naver-verify': 'now', 'canonical': 'now',
    'sitemap': '1m', 'speed': '1m', 'schema': '1m', 'wp-version': '1m',
    'social-proof': '1m', 'cookie-consent': '1m', 'compression': '1m', 'caching': '1m',
    'tech-age': '3m',
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
