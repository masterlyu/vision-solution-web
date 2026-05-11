# CHANGELOG — Vision Solution 웹사이트

---

## [2026-05-11] — 보안 취약점 수정 (모의해킹 결과 반영)

### 개요
visionc.co.kr 자체 모의해킹 스캔(VISIONC 보안 진단) 결과 점수 28점 → 취약점 4건 수정.

---

### 1. XSS 취약점 수정 — 마크다운 링크 URL 검증

**파일**: `src/lib/markdownToHtml.ts`

**취약점**: `inlineFormat()` 함수의 링크 처리 시 URL을 검증 없이 `href`에 직접 삽입
→ `[클릭](javascript:alert(1))` 형태의 마크다운이 XSS로 실행 가능

**수정 내용**:
```typescript
// 수정 전 (취약)
.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
  '<a href="$2" ...>$1</a>')

// 수정 후 (안전)
.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
  const safe = /^(https?:\/\/|mailto:|\/|#)/.test(url.trim()) ? url.trim() : '#'
  return `<a href="${safe}" ...>${label}</a>`
})
```
- 허용 프로토콜: `https://`, `http://`, `mailto:`, `/` (상대경로), `#` (앵커)
- 그 외 (`javascript:`, `data:` 등) → `#` 으로 대체

---

### 2. HTTP 메서드 차단 — 미들웨어 강화

**파일**: `src/middleware.ts`

**취약점**: PUT·DELETE·TRACE·CONNECT 메서드 허용 → 정보 노출 및 불필요한 공격 경로

**수정 내용**: CSRF 검증 이전에 차단 로직 추가
```typescript
const BLOCKED_METHODS = ['PUT', 'DELETE', 'TRACE', 'CONNECT']
if (BLOCKED_METHODS.includes(req.method)) {
  return new NextResponse('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'GET, POST, HEAD, OPTIONS, PATCH' },
  })
}
```

---

### 3. X-Powered-By 헤더 제거

**파일**: `src/middleware.ts`, `next.config.ts`

**취약점**: `X-Powered-By: Next.js` 헤더 노출 → 기술 스택 정보 유출

**수정 내용**:
- `middleware.ts`: `response.headers.delete('X-Powered-By')` 추가
- `next.config.ts`: `poweredByHeader: false` 추가 (이중 차단)

---

### 4. 블로그 태그 파라미터 입력값 검증

**파일**: `src/app/blog/page.tsx`

**취약점**: `?tag=` 쿼리 파라미터를 검증 없이 사용 → 비정상 입력값 통과 가능

**수정 내용**:
```typescript
// 수정 전
const { tag: activeTag } = await searchParams

// 수정 후
const { tag: rawTag } = await searchParams
const knownTags = new Set(getAllTags())
const activeTag = rawTag && knownTags.has(rawTag) ? rawTag : undefined
```
- `getAllTags()`에서 반환하는 실제 태그 목록과 대조 후 유효한 값만 사용

---

### 커밋

| 해시 | 내용 |
|------|------|
| `dcc92a4` | fix: security vulnerabilities (XSS, HTTP methods, server headers, input validation) |

---

## [2026-05-11] — 보안 진단 고도화: 악성코드·CMS 탐지 + PDF 수정 + 보안 페이지 개편

### 개요
VISIONC 보안 서비스의 무료 진단 품질을 경쟁 서비스 대비 차별화. Sucuri 악성코드 탐지·CMS 버전 노출 점검을 실제 진단·이메일·PDF 전 영역에 추가. PDF 한글 깨짐 근본 해결. 보안 서비스 페이지를 3개 플랜 상세 정보로 전면 개편.

---

### 1. SEO 정식 주소(canonical) 추가

**파일**: `src/app/page.tsx`

- 홈페이지 canonical 태그 누락으로 자체 진단 점수 81점 → 수정 후 85점+
- `alternates: { canonical: '/' }` 메타데이터 추가

---

### 2. 보안 서비스 페이지 전면 개편

**파일**: `src/app/security/page.tsx`

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 가격 플랜 상세 | 가격만 표시 | 점검 항목(🔍) + 보완 내용(✓) + 대상 고객 뱃지 |
| 무료 리포트 안내 | 없음 | 8가지 항목 설명 박스 (초보자 대상) |
| 표준·심층 CTA | 단순 문의 버튼 | "전문가 수동 분석 리포트" 안내 + `/contact?service=security` 연결 |
| 점검 항목 수 | 6개 | 8개 (악성코드 탐지·구글 블랙리스트·CMS 버전 노출 추가) |
| 그리드 | 2×3 | 2×4 |

**플랜별 reportType 구분**
- 기본: `reportType: 'auto'` → `#cta-form`으로 연결
- 표준·심층: `reportType: 'manual'` → `/contact?service=security`로 연결

---

### 3. 진단 엔진 고도화

**파일**: `src/lib/siteAnalyzer.ts`

#### 신규 기능
- **악성코드 탐지**: Sucuri SiteCheck API (`https://sitecheck.sucuri.net/api/v3/?scan={domain}`) 연동
  - 구글·노턴·맥아피 등 블랙리스트 등재 여부
  - 악성코드 유형 분류
- **CMS 자동 감지**: WordPress·Joomla·Drupal·Rhymix·Gnuboard·Cafe24
  - generator 메타 태그, wp-content/ 경로 패턴 등
  - 버전 정보 노출 여부 판단
- **서버 정보 노출**: `Server:`, `X-Powered-By:` 헤더 버전 포함 여부

#### 보안 점수 계산 변경
```
infoLeakPenalty = min(cms.infoLeaks.length × 5, 15)
malwarePenalty  = 블랙리스트 등재 ? 30 : 악성코드 발견 ? 20 : 0
secScore        = max(0, headerSecScore − infoLeakPenalty − malwarePenalty)
```

#### 성능
- PageSpeed API + Sucuri API `Promise.all()` 병렬 실행

#### 견적 자동 추가
- 악성코드 발견 시: 악성코드 제거(150~300만원), 블랙리스트 해제(200~400만원)
- 정보 노출 발견 시: 정보 노출 차단(20~50만원)

---

### 4. PDF 리포트 한글 깨짐 수정

**파일**: `src/lib/pdfReport.tsx`, `next.config.ts`, `public/fonts/NotoSansKR-Regular.ttf`

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 폰트 소스 | jsDelivr CDN woff2 Korean-subset | 로컬 TTF (NotoSansKR-Regular.ttf, 10MB) |
| 문제 | Korean-subset에 숫자·영문 글리프 없어 박스 표시 | TTF 전체 글리프 — 한글·숫자·영문 모두 정상 |
| Vercel 번들링 | 미설정 (서버리스에서 폰트 미포함) | `outputFileTracingIncludes: { '/api/analyze': ['./public/fonts/**/*'] }` |

**PDF 신규 섹션**
- 악성코드 탐지 위험 시 상단 경고 박스
- "악성코드 및 블랙리스트 진단" 섹션 (3가지 상태)
- "CMS 및 서버 정보 점검" 섹션

---

### 5. 이메일 리포트 섹션 추가

**파일**: `src/lib/emailSender.ts`

- `malwareHtml()`: 악성코드·블랙리스트 결과 (미확인/정상/위험 3가지 스타일)
- `cmsHtml()`: 감지된 CMS·버전 노출·서버 정보 노출 경고 (amber 스타일)
- 두 섹션이 "Security Headers" 앞에 삽입됨

---

### 6. Oracle 대시보드 보안 모듈 구현 스펙 작성

**파일**: `docs/security-dashboard-spec.md`

THE CITADEL 대시보드(`/security` 페이지) 구현을 위한 전체 스펙:
- 표준 취약점 개선 / 심층보안강화 / 모의공격 3개 프로그램
- DB 스키마 4개 테이블 (security_clients, scans, findings, pentest_logs)
- 스캔 엔진 8가지 점검 항목 상세 (HTTP fetch 기반, 외부 도구 불필요)
- 심층 스캔 8가지 추가 항목 (SQLi, XSS, CSRF, 민감파일, 인증 우회 등)
- 모의공격 5가지 시나리오
- Next.js API Route 구조 + 프론트엔드 레이아웃 가이드

---

### 7. Paperclip 블로그 글 작성 태스크 등록

- **이슈**: VIS-1150
- **담당**: 콘텐츠 라이터 에이전트
- 기본 보안 점검 초보자 가이드 블로그 글
- 실제 해킹 뉴스 인용, 8가지 점검 항목 설명, 무료 진단 신청 CTA 포함

---

## [2026-05-11] — VISI 마스코트 전사 적용 + 홈페이지 섹션 개편

### 개요
전체 서비스 페이지에 VISI 마스코트 통합, 홈페이지 하단 섹션 현행 컨셉 통일, 다크 테마 Lottie 아이콘 버그 수정, 폼 UX 개선, CSS 토큰 하드코딩 교체.

---

### 1. VISI 마스코트 전사 적용

**컴포넌트**: `src/components/visi/VisiMascot.tsx`

| 항목 | 내용 |
|------|------|
| 스타일 | 카카오 프렌즈 계열, 크림색 바디 + 직사각형 보라 안경 |
| 포즈 | default · thumbsUp · wave · thinking · typing · pointing · magnify · happy · cheering · writing |
| 말풍선 | `bg-card border-border text-foreground` (CSS 토큰) — 다크모드 대응 |
| import | named export `import { VisiMascot } from '@/components/visi/VisiMascot'` |

**적용 페이지**

| 페이지 | 파일 | VISI 위치 |
|--------|------|-----------|
| 홈페이지 리뉴얼 | `src/app/renewal/page.tsx` | 히어로 일러스트, 스텝 카드, CTA |
| 신규 사이트 구축 | `src/app/new-website/page.tsx` | 히어로, 스텝, CTA |
| 유지보수 | `src/app/maintenance/page.tsx` | 히어로, 스텝, CTA |
| AI 솔루션 | `src/app/ai-solution/page.tsx` | 히어로, 스텝, CTA |
| 앱·시스템 개발 | `src/app/app-dev/page.tsx` | 히어로, 스텝, CTA |
| 보안 진단 | `src/app/security/page.tsx` | 히어로 일러스트, 스텝 포즈, CTA |
| 챗봇 | `src/app/chatbot/page.tsx` | 히어로, 스텝 카드, CTA |
| 소개 | `src/app/about/page.tsx` | 히어로 일러스트, Final CTA |
| 포트폴리오 | `src/app/portfolio/page.tsx` | 히어로 일러스트, 스텝 카드, CTA |
| 문의 | `src/app/contact/page.tsx` | 완료 상태, 좌측 정보 컬럼 |

**히어로 패턴**: 2컬럼 레이아웃 (좌: 텍스트, 우: 커스텀 SVG 일러스트 + VISI)
- 일러스트 60~70%, VISI 30~40% 비중
- 각 서비스 특성에 맞는 커스텀 SVG 제작 (인라인)

---

### 2. 홈페이지 서비스 이후 섹션 리디자인

**파일**: `src/components/landing/`

#### 서비스 카드 (FeaturesSection)
- 레이아웃: `gap-px bg-border` 구분선 그리드 → `gap-4` 개별 `rounded-2xl` 카드
- 호버 효과: `bg-card/80` (거의 변화 없음) → **`bg-primary` 완전 색 반전**
  - 배경·텍스트·아이콘·배지 모두 흰색 전환
  - `-translate-y-2` 리프트 + `shadow-primary/30`
  - "자세히 보기 →" CTA 호버 시 페이드인

#### 프로세스 섹션 (HowItWorksSection)
- 우측 패널: 빈 숫자 박스 → VISI 마스코트 (단계별 포즈 자동 전환)
  - `AnimatePresence` scale+opacity 트랜지션
  - 상단 진행 dots 추가
- 애니메이션: `IntersectionObserver` CSS → Framer Motion `whileInView`

#### 후기 섹션 (TestimonialsSection)
- 헤더 우측: VISI `thumbsUp` 추가 ("실제 고객 후기예요!")
- Framer Motion 스태거 등장 적용

#### CTA 섹션 (CtaSection)
- VISI `cheering` 헤딩 위 추가
- URL 입력창: `rounded-full` → `rounded-xl`, `bg-[#12101e] border-2 border-white/20`
- Framer Motion 적용

---

### 3. 폼 UX 개선 (전체 통일)

**대상**: `UrlAnalysisForm`, 문의 페이지 폼

```
변경 전: bg-background border border-border rounded-lg
변경 후: bg-[#12101e] border-2 border-white/20 rounded-xl px-4 py-3.5 text-base placeholder:text-white/25
```

- 레이블: `font-semibold` + `text-foreground/90`
- 폼 컨테이너: `bg-[#0f0d1a] border-2 border-white/10 rounded-2xl`
- 제출 버튼: `h-14 rounded-xl text-base font-bold`
- 드롭다운: `appearance-none` + `colorScheme: 'dark'`

---

### 4. Lottie 아이콘 버그 수정

**원인**: 어두운 배경(`#0d0d16`)에서 흰색/라이트 계열 아트워크를 가진 Lottie 파일이 렌더링되지 않음

| 페이지 | 대상 파일 | 교체 |
|--------|-----------|------|
| 보안 진단 | `hacker.json` (danger 01) | 💳 이모지 |
| 보안 진단 | `warning.json` (danger 02) | ☠️ 이모지 |
| 보안 진단 | `shield.json` (check 02) | 🛡️ 이모지 |
| 보안 진단 | `hacker.json` (check 04) | 🔑 이모지 |
| 소개 | `ring.json` (프로젝트 수) | 🚀 이모지 |
| 소개 | `ring.json` (납기 준수율) | ⚡ 이모지 |
| 소개 | `star.json` (고객 만족도) | ⭐ 이모지 |
| 소개 | `check.json` (재의뢰율) | 🤝 이모지 |

---

### 5. 소개 페이지 수치 섹션 개선

**파일**: `src/app/about/page.tsx`

- 3개 카드 좌측 쏠림 → `display: grid auto-fit minmax(240px, 1fr)` 균등 분배
- 4번째 카드 추가: **97% 재의뢰율** (청록 accent, 🤝)
- `height: 100%`로 카드 높이 통일

---

### 6. CSS 토큰 하드코딩 교체

| 파일 | 항목 | 변경 |
|------|------|------|
| `VisiMascot.tsx` | 말풍선 `bg-white text-gray-900` | `bg-card border-border text-foreground` |
| `navigation.tsx` | 히어로 CTA `bg-white text-black` | `bg-primary text-primary-foreground` |

---

### 7. Paperclip 루틴 등록

**루틴**: 블로그 자동 발행 (3일 1회)
- **ID**: `dc0c84d6-da82-4305-a66a-4a02590d6b24`
- **스케줄**: `0 9 */3 * *` (Asia/Seoul) — 매 3일 오전 9시
- **워크플로우**:
  1. 트렌드 스카우트 → 실제 뉴스/통계 리서치 (출처 필수, 해외자료 한글번역 필수)
  2. 콘텐츠 라이터 → 작성 (사실 기반 100%, 강력 후킹 제목, 내부 링크, SEO 최적화)
  3. 마케팅 검증관 → 팩트체크 + SEO + 제목-내용 일치 검증
  4. 퍼블리셔 → MD 파일 생성 + 빌드 + git push
- **목적**: visionc.co.kr 유입 증대 (블로그 → 서비스 페이지 → 문의 전환)

---

### Paperclip 종결 이슈

| 이슈 | 처리 내용 |
|------|-----------|
| VIS-1136 | nav CTA 토큰 교체 후 종결 |
| VIS-1139 | VIS-1136 종결로 불필요 → 종결 |
| VIS-1140 | VisiMascot 말풍선 토큰 교체 후 종결 |
| VIS-1141 | VIS-1140 종결로 불필요 → 종결 |
| VIS-1108 | 환경 제약 → 홈페이지 세션 종료와 함께 종결 |

---

### 커밋 이력 (이번 세션)

| 해시 | 내용 |
|------|------|
| `7e99ebf` | fix: CSS 토큰 하드코딩 교체 (말풍선·nav CTA) |
| `71bbf86` | fix: 소개 페이지 Lottie → 이모지 교체 |
| `751d45e` | fix: 소개 수치 섹션 4번째 카드 + 그리드 레이아웃 |
| `ba25471` | feat: 서비스 카드 호버 색 반전 효과 |
| `44e4b61` | refactor: 홈페이지 하단 3개 섹션 현행 컨셉 통일 |
| `9407d31` | fix: 보안 페이지 Lottie → 이모지 교체 |
| `0acd6da` | style: 전체 폼 입력 가시성 개선 |
| `e2d65ce` | feat: contact·about·portfolio VISI 마스코트 통합 |
| `a5ddbd2` | feat: security·chatbot VISI 마스코트 통합 |
| `b2955af` | feat: ai-solution·app-dev·new-website·maintenance VISI 통합 |
| `a03b576` | feat: VisiMascot 컴포넌트 신규 추가 + renewal 적용 |
