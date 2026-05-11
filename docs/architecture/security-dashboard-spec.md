# THE CITADEL — Security Dashboard 구현 스펙

> **대상:** Oracle 서버(`100.89.247.7`)에서 실행 중인 Claude Code  
> **작업 범위:** `/security` 페이지 신규 구현 (현재 404)  
> **목표:** 클라이언트 웹사이트 대상 보안 서비스 운영 도구 — 표준 취약점 개선 / 심층보안강화

---

## 1. 시스템 컨텍스트

| 항목 | 값 |
|------|-----|
| 대시보드 | THE CITADEL — Next.js 15, Dark theme |
| 대시보드 URL | http://100.89.247.7:8080 |
| DB API (empire) | http://172.17.0.1:3336 (PostgREST) |
| DB API (citadel) | http://172.17.0.1:3333 (PostgREST) |
| 디자인 기준 | 기존 `/ops`, `/trading` 페이지 스타일 그대로 |
| 보안 서비스 사이트 | https://visionc.co.kr/security |

### 현재 사이드바 메뉴 (이미 존재)
```
/ → 홈
/chatbot → 챗봇
/content → 콘텐츠
/ops → 운영
/security → 보안 ← 여기 구현
/trading → 트레이딩
```

---

## 2. 보안 서비스 개요

VISIONC는 클라이언트 웹사이트에 대해 세 등급의 보안 서비스를 제공:

| 등급 | 서비스명 | 대시보드 용도 |
|------|---------|-------------|
| 기본 | 기본 보안 설정 | 자동 진단 (무료 레포트) — 이 대시보드 범위 아님 |
| **표준** | **표준 취약점 개선** | **이 스펙의 주요 대상** |
| **심층** | **심층보안강화** | **이 스펙의 주요 대상** |

---

## 3. 구현할 기능 3종

### A. 점검 (Scan)
클라이언트 사이트에 대해 자동화된 취약점 스캔 실행

### B. 보완 (Remediation)
발견된 취약점별 수정 가이드 생성 + 상태 추적 (발견 → 수정 중 → 완료)

### C. 모의공격 (Pentest Simulation)
통제된 환경에서 공격 시나리오 실행, 취약 여부 검증

---

## 4. DB 스키마 (empire DB에 추가)

> **주의:** `INSERT`만 가능. 사령관이 대시보드에서 직접 UPDATE/DELETE 처리.  
> 테이블 생성은 Oracle 서버에서 직접 PostgreSQL에 접근하거나 DB 관리자에게 요청.

### 4-1. `security_clients` — 보안 서비스 고객사

```sql
CREATE TABLE security_clients (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,           -- 고객사명 (예: "스타트업 A")
  domain      TEXT NOT NULL UNIQUE,    -- 점검 대상 도메인 (예: "startup-a.com")
  tier        TEXT NOT NULL DEFAULT 'standard', -- 'standard' | 'deep'
  contact     TEXT,                    -- 담당자 이메일
  contract_start DATE,
  contract_end   DATE,
  status      TEXT DEFAULT 'active',   -- 'active' | 'paused' | 'completed'
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);
```

### 4-2. `security_scans` — 스캔 이력

```sql
CREATE TABLE security_scans (
  id          SERIAL PRIMARY KEY,
  client_id   INTEGER REFERENCES security_clients(id),
  scan_type   TEXT NOT NULL,   -- 'standard' | 'deep' | 'pentest'
  status      TEXT DEFAULT 'pending', -- 'pending'|'running'|'done'|'failed'
  started_at  TIMESTAMPTZ,
  finished_at TIMESTAMPTZ,
  summary     JSONB,           -- { score, critical, high, medium, low }
  raw_report  JSONB,           -- 전체 스캔 결과
  triggered_by TEXT DEFAULT 'manual',  -- 'manual' | 'scheduled'
  created_at  TIMESTAMPTZ DEFAULT now()
);
```

### 4-3. `security_findings` — 개별 취약점 항목

```sql
CREATE TABLE security_findings (
  id          SERIAL PRIMARY KEY,
  scan_id     INTEGER REFERENCES security_scans(id),
  client_id   INTEGER REFERENCES security_clients(id),
  category    TEXT NOT NULL,   -- 'ssl' | 'headers' | 'admin' | 'injection' | 'xss' | 'csrf' | ...
  severity    TEXT NOT NULL,   -- 'critical' | 'high' | 'medium' | 'low' | 'info'
  title       TEXT NOT NULL,
  description TEXT,
  evidence    TEXT,            -- 실제 발견된 증거 (응답값 등)
  recommendation TEXT,
  remediation_status TEXT DEFAULT 'open', -- 'open' | 'in_progress' | 'resolved' | 'accepted_risk'
  resolved_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT now()
);
```

### 4-4. `security_pentest_logs` — 모의공격 로그

```sql
CREATE TABLE security_pentest_logs (
  id          SERIAL PRIMARY KEY,
  scan_id     INTEGER REFERENCES security_scans(id),
  client_id   INTEGER REFERENCES security_clients(id),
  attack_type TEXT NOT NULL,   -- 'sqli' | 'xss' | 'csrf' | 'traversal' | 'auth_bypass'
  target_url  TEXT NOT NULL,
  payload     TEXT,
  result      TEXT,            -- 'vulnerable' | 'not_vulnerable' | 'error'
  response_code INTEGER,
  evidence    TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);
```

---

## 5. Next.js API Routes 구조

```
src/app/api/security/
  ├── clients/
  │   ├── route.ts          GET(목록) / POST(등록)
  │   └── [id]/route.ts     GET(상세)
  ├── scans/
  │   ├── route.ts          GET(이력 목록)
  │   └── [id]/route.ts     GET(결과 상세)
  ├── scan/
  │   └── route.ts          POST(스캔 실행 — 비동기)
  ├── pentest/
  │   └── route.ts          POST(모의공격 실행)
  └── findings/
      └── route.ts          GET(취약점 목록) / PATCH(상태 변경)
```

---

## 6. 핵심 모듈: 보안 엔진

### 파일 위치
```
src/lib/security/
  ├── scanner.ts       — 표준 취약점 스캔 엔진
  ├── deepScanner.ts   — 심층 스캔 엔진
  ├── pentester.ts     — 모의공격 엔진
  └── reporters.ts     — 리포트 생성
```

---

## 7. 표준 취약점 스캔 엔진 상세 스펙 (`scanner.ts`)

### 점검 항목 8가지 (모두 HTTP fetch 기반, 외부 도구 불필요)

```typescript
interface ScanConfig {
  domain: string          // "example.com" — 프로토콜 없이
  timeout?: number        // ms, default 10000
}

interface FindingItem {
  category: string
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info'
  title: string
  description: string
  evidence?: string
  recommendation: string
}

interface ScanResult {
  score: number           // 0–100
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  findings: FindingItem[]
  summary: { critical: number; high: number; medium: number; low: number }
  scannedAt: string
}
```

#### 점검 1: SSL/TLS 인증서
```
- HTTPS 응답 가능 여부 (fetch https://domain)
- HTTP→HTTPS 자동 리디렉션 (fetch http://domain, 301/302 확인)
- 인증서 만료일 (response headers에서 확인 불가 → SSL Labs API 또는 직접 TLS 핸드셰이크)
- 판정: 인증서 없음=critical, 만료 30일 이내=high, 리디렉션 없음=medium
```

#### 점검 2: 보안 헤더 6종
```
응답 헤더에서 다음 확인:
- Strict-Transport-Security (HSTS) — 없으면 high
- Content-Security-Policy — 없으면 high
- X-Frame-Options — 없으면 medium
- X-Content-Type-Options — 없으면 medium
- Referrer-Policy — 없으면 low
- Permissions-Policy — 없으면 low
```

#### 점검 3: 관리자 페이지 노출
```
다음 경로 순차 요청, 200 응답 시 발견:
/admin, /wp-admin, /administrator, /manage, /dashboard,
/wp-login.php, /login, /admin.php, /cp, /controlpanel
→ 200 응답 = high
→ 로그인 폼 포함 시 = high (html body에 <form> + password field)
```

#### 점검 4: 혼합 콘텐츠 (Mixed Content)
```
메인 페이지 HTML fetch → http:// URL 포함 img/script/link/iframe 검색
→ 발견 시 = medium
```

#### 점검 5: 악성코드 / 구글 블랙리스트
```
Sucuri SiteCheck API 사용 (무료):
GET https://sitecheck.sucuri.net/api/v3/?scan={domain}
→ result.malware.found = true → critical
→ result.blacklists.google = true → critical
→ API 실패 시 = info (확인 불가)
```

#### 점검 6: CMS/서버 버전 노출
```
응답 헤더에서:
- Server: 헤더 버전 포함 여부 (예: "Apache/2.4.41" → medium)
- X-Powered-By: 헤더 존재 여부 (예: "PHP/7.4.3" → medium)
HTML body에서:
- <meta name="generator"> 태그 (예: WordPress 6.x → medium)
- /wp-content/ URL → WordPress 확인 (low, 버전 미노출 시)
```

#### 점검 7: 디렉토리 목록 노출
```
다음 경로 요청, 응답에 "Index of /" 포함 시 발견:
/uploads/, /files/, /backup/, /images/, /assets/
→ high
```

#### 점검 8: 오래된 JavaScript 라이브러리
```
메인 페이지 HTML 파싱 → script src에서 라이브러리 버전 추출
jQuery 3.6 미만, lodash 4.17.20 미만 등 → low
(선택 구현, 복잡하면 생략 가능)
```

### 점수 계산
```typescript
const PENALTY = {
  critical: 30,
  high: 15,
  medium: 7,
  low: 3,
}
// score = max(0, 100 - sum(findings.map(f => PENALTY[f.severity])))
// grade: A>=90, B>=75, C>=60, D>=40, F<40
```

---

## 8. 심층 스캔 엔진 상세 스펙 (`deepScanner.ts`)

표준 스캔 8가지를 모두 포함하고, 추가로:

### 추가 점검 항목 (능동 탐색, 주의 필요)

#### 추가 1: SQL Injection 탐지 (안전한 방식)
```
대상 URL의 쿼리 파라미터에 무해한 패턴 추가:
예: ?id=1' (싱글쿼터만)
응답에서 SQL 오류 메시지 패턴 탐색:
"syntax error", "mysql_fetch", "ORA-", "pg_query", "SQL Server"
→ 발견 시 = critical
→ 실제 데이터 추출 시도 금지 (탐지만)
```

#### 추가 2: XSS Reflection 탐지
```
파라미터에 <script>alert(1)</script> 대신 안전한 마커 사용:
?q=xss_test_visionc_marker_12345
응답 body에 그대로 출력되는지 확인 (reflection)
→ 있으면 = high (실제 실행 여부는 별도)
```

#### 추가 3: CSRF 토큰 부재
```
로그인 폼, 회원가입 폼, 주문 폼 등에서 POST form 발견 시
hidden input[name*="csrf" i], input[name*="token" i] 없으면
→ medium
```

#### 추가 4: 민감 파일 노출
```
다음 경로 요청, 200 응답 시:
/.env, /.git/HEAD, /config.php, /wp-config.php.bak,
/robots.txt (내용 확인), /sitemap.xml, /.htaccess,
/phpinfo.php, /info.php, /server-status
→ .env/.git = critical, config 파일 = high, phpinfo = high
```

#### 추가 5: 인증 우회 테스트
```
관리자 페이지 발견 시:
- 기본 자격증명 시도: admin/admin, admin/password, test/test
  (실제 로그인 성공 여부, 응답 크기/리디렉션 차이로 판단)
- 응답 크기가 로그인 실패와 다르면 = critical
```

#### 추가 6: HTTP 메서드 허용 범위
```
OPTIONS 메서드로 허용 메서드 확인
Allow 헤더에 PUT, DELETE, TRACE 포함 시 = medium
```

#### 추가 7: 쿠키 보안 설정
```
Set-Cookie 헤더에서:
- HttpOnly 없으면 = medium (세션 쿠키인 경우 high)
- Secure 없으면 = medium (HTTPS 사이트인 경우)
- SameSite 없으면 = low
```

#### 추가 8: 오픈 리디렉트
```
?redirect=https://evil.com, ?url=//evil.com 형태로 요청
Location 헤더에 외부 도메인이 포함되면 = medium
```

---

## 9. 모의공격 엔진 상세 스펙 (`pentester.ts`)

> ⚠️ **전제 조건:** 클라이언트가 테스트에 동의한 경우에만 실행. UI에서 동의 체크박스 필수.

### 공격 시나리오 5종

#### 시나리오 1: SQLi 자동화 탐지
```
타겟 URL의 모든 파라미터를 자동 추출 → 각 파라미터에 SQLi 페이로드 순서 적용:
페이로드셋 (안전 패턴):
  "'"        → SQL 오류 탐지
  "1 AND 1=1" → 조건 참 응답 크기 비교
  "1 AND 1=2" → 조건 거짓 응답 크기 비교 (Boolean-based Blind)
  "1 WAITFOR DELAY '0:0:3'" → Time-based (응답 시간 측정)
결과: 각 페이로드별 응답 코드, 크기, 시간, 에러 메시지 기록
```

#### 시나리오 2: XSS 자동화 탐지
```
페이로드셋:
  "<img src=x onerror=1>"
  "<svg onload=1>"
  "javascript:1"
  "'\"<>"
파라미터별 reflection 및 인코딩 여부 확인
응답에서 이스케이프 없이 그대로 출력 = vulnerable
```

#### 시나리오 3: 인증 우회 시나리오
```
로그인 엔드포인트 자동 탐지 (/login, /api/auth, /wp-login.php 등)
테스트 자격증명 목록으로 시도:
  admin/admin, admin/123456, test/test, administrator/password
응답 크기/코드/리디렉션으로 성공 여부 판단
실제 세션 토큰 탈취 시도는 금지
```

#### 시나리오 4: 경로 순회 (Path Traversal)
```
파일 다운로드/읽기 파라미터에 적용:
  ?file=../../../etc/passwd
  ?path=....//....//etc/passwd
  ?doc=%2e%2e%2f%2e%2e%2fetc%2fpasswd
응답에 "root:" 또는 "www-data" 포함 여부 확인
```

#### 시나리오 5: API 엔드포인트 열거
```
/api/, /api/v1/, /api/v2/ 등 탐색
일반적인 API 엔드포인트 요청:
  /api/users, /api/admin, /api/config, /api/backup
인증 없이 200 응답 = high
```

### 모의공격 실행 플로우
```
1. 동의 확인 (UI 체크박스 + 클라이언트 ID 기록)
2. 대상 사이트 응답 확인 (ping check)
3. 시나리오별 순차 실행 (각 시나리오 완료 후 5초 대기 — rate limiting)
4. 결과 pentest_logs에 저장
5. 리포트 생성
```

---

## 10. 프론트엔드 UI 구조

### `/security` 페이지 레이아웃

```
┌─────────────────────────────────────────────────┐
│  🔒 보안 관리              [+ 고객사 등록]        │
├─────────────────────────────────────────────────┤
│  [고객사 목록]  [스캔 이력]  [취약점 현황]          │
├─────────────────────────────────────────────────┤
│                                                 │
│  고객사 카드 목록                                 │
│  ┌──────────────┐  ┌──────────────┐             │
│  │ 스타트업 A    │  │ 쇼핑몰 B     │             │
│  │ startup-a.com│  │ shop-b.co.kr │             │
│  │ 표준 · 활성  │  │ 심층 · 활성  │             │
│  │ 최근: B 82점 │  │ 최근: C 64점 │             │
│  │ [점검] [보완]│  │ [점검] [모의]│             │
│  └──────────────┘  └──────────────┘             │
│                                                 │
├─────────────────────────────────────────────────┤
│  스캔 실행 패널 (고객사 선택 시 오른쪽에 표시)    │
│                                                 │
│  [ 표준 취약점 스캔 ]  [ 심층 보안 스캔 ]         │
│  [ 모의공격 실행 ]                               │
│                                                 │
│  스캔 진행 상황 (실시간):                        │
│  ✓ SSL 인증서      ✓ 보안 헤더                  │
│  ⟳ 관리자 페이지   ○ 악성코드                   │
│                                                 │
└─────────────────────────────────────────────────┘
```

### 스캔 결과 패널

```
┌─────────────────────────────────────────────────┐
│  startup-a.com — 표준 스캔 결과                  │
│  스코어: 72점  등급: C  (2026-05-11 14:30)      │
├─────────────────────────────────────────────────┤
│  🔴 Critical (1)                                │
│  ┌─────────────────────────────────────────┐   │
│  │ 악성코드 탐지됨                          │   │
│  │ Sucuri: 블랙리스트 2곳 등재             │   │
│  │ → 권고: 즉시 악성코드 제거 + 신고 해제  │   │
│  │ [보완 시작]  [완료 처리]                │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  🟠 High (2)                                   │
│  ┌─────────────────────────────────────────┐   │
│  │ HSTS 헤더 없음                          │   │
│  │ CSP 헤더 없음                           │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  [PDF 리포트 다운로드]  [고객 이메일 발송]       │
└─────────────────────────────────────────────────┘
```

---

## 11. 구현 순서 (Claude Code 작업 순서)

### Phase 1: DB 스키마 (30분)
```bash
# Oracle 서버 PostgreSQL에 직접 접근해서 테이블 생성
# 또는 empire DB 관리자에게 SQL 전달
# 4개 테이블: security_clients, security_scans, security_findings, security_pentest_logs
```

### Phase 2: 백엔드 API Routes (1시간)
```
1. src/lib/security/scanner.ts — 표준 스캔 엔진 구현
   (SSL, 헤더, admin, 혼합콘텐츠, 악성코드, CMS 탐지)
2. src/lib/security/deepScanner.ts — 심층 스캔 엔진
   (표준 + SQLi, XSS, CSRF, 민감파일 추가)
3. src/lib/security/pentester.ts — 모의공격 엔진
   (5가지 공격 시나리오)
4. src/app/api/security/ 하위 Route handlers 생성
```

### Phase 3: 프론트엔드 (2시간)
```
1. src/app/security/page.tsx — 메인 페이지 (고객사 목록)
2. src/components/security/ClientCard.tsx — 고객사 카드
3. src/components/security/ScanPanel.tsx — 스캔 실행 패널
4. src/components/security/FindingsList.tsx — 취약점 목록
5. src/components/security/AddClientModal.tsx — 고객사 등록 모달
```

### Phase 4: 실시간 진행 상황 (30분)
```
스캔은 시간이 걸리므로:
- API route에서 스캔 시작 즉시 scan_id 반환
- 프론트는 polling (1초마다 /api/security/scans/{id}) 또는
- Server-Sent Events로 진행 상황 스트리밍
```

---

## 12. 스캔 엔진 핵심 코드 패턴

### scanner.ts 뼈대

```typescript
// src/lib/security/scanner.ts

const POSTGREST = 'http://172.17.0.1:3336'

export async function runStandardScan(domain: string, scanId: number): Promise<ScanResult> {
  const findings: FindingItem[] = []
  const baseUrl = `https://${domain}`
  
  // 병렬 실행 (성능)
  const [headers, adminExposed, malware, cms] = await Promise.allSettled([
    checkSecurityHeaders(baseUrl),
    checkAdminExposure(domain),
    checkMalware(domain),
    detectCms(baseUrl),
  ])
  
  // SSL은 별도 (http → https 리디렉션 확인)
  const ssl = await checkSSL(domain)
  
  findings.push(...ssl, ...extract(headers), ...extract(adminExposed), ...extract(malware), ...extract(cms))
  
  const score = calcScore(findings)
  const grade = calcGrade(score)
  
  // DB 업데이트
  await fetch(`${POSTGREST}/security_scans?id=eq.${scanId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'done', finished_at: new Date().toISOString(), summary: { score, grade } })
  })
  
  // findings 저장
  for (const f of findings) {
    await fetch(`${POSTGREST}/security_findings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify({ scan_id: scanId, ...f })
    })
  }
  
  return { score, grade, findings, summary: summarize(findings), scannedAt: new Date().toISOString() }
}
```

### API Route 패턴 (POST /api/security/scan)

```typescript
// src/app/api/security/scan/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { runStandardScan } from '@/lib/security/scanner'
import { runDeepScan } from '@/lib/security/deepScanner'

const POSTGREST = 'http://172.17.0.1:3336'

export async function POST(req: NextRequest) {
  const { clientId, scanType } = await req.json()
  
  // 클라이언트 정보 조회
  const clientRes = await fetch(`${POSTGREST}/security_clients?id=eq.${clientId}`)
  const [client] = await clientRes.json()
  if (!client) return NextResponse.json({ error: 'client not found' }, { status: 404 })
  
  // 스캔 레코드 생성
  const scanRes = await fetch(`${POSTGREST}/security_scans`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
    body: JSON.stringify({ client_id: clientId, scan_type: scanType, status: 'running', started_at: new Date().toISOString() })
  })
  const [scan] = await scanRes.json()
  
  // 비동기로 스캔 실행 (응답 먼저 반환)
  const scanner = scanType === 'deep' ? runDeepScan : runStandardScan
  scanner(client.domain, scan.id).catch(console.error)
  
  return NextResponse.json({ scanId: scan.id, status: 'running' })
}
```

---

## 13. 디자인 가이드 (THE CITADEL 스타일 준수)

```
배경: #0E0E0E (다크)
액센트: #FF6D5A (오렌지-레드)
텍스트: var(--ct-text)
보더: rgba(255,255,255,0.04)
폰트: Pretendard (이미 CDN 로드됨)

심각도 컬러:
  critical: #EF4444 (red-500)
  high:     #F97316 (orange-500)
  medium:   #EAB308 (yellow-500)
  low:      #3B82F6 (blue-500)
  info:     #6B7280 (gray-500)

버튼 스타일: 기존 /ops 페이지의 버튼 컴포넌트 재사용
카드 스타일: border-white/5 rounded-xl bg-white/3 p-4
```

---

## 14. 보안 주의사항 (Claude Code가 반드시 준수)

1. **모의공격은 동의 기록 필수** — DB에 `consent_confirmed_at` 타임스탬프 저장
2. **스캔 대상은 등록된 클라이언트 도메인만** — 임의 URL 입력 불가, 화이트리스트 검증
3. **Rate limiting** — 동일 도메인 1시간에 스캔 1회 제한
4. **페이로드 안전성** — SQLi/XSS 테스트는 데이터 변경/탈취 불가한 안전 패턴만
5. **결과 접근 제한** — 대시보드 인증 후에만 접근 (현재 대시보드 인증 방식 그대로 따름)
6. **로그 보관** — 모든 스캔 요청과 결과는 DB에 보관 (감사 추적)

---

## 15. 참고 외부 API

| API | 용도 | 인증 |
|-----|------|------|
| Sucuri SiteCheck | 악성코드/블랙리스트 | 무료, 인증 불필요 |
| SSL Labs API | SSL 등급 상세 | 무료, `https://api.ssllabs.com/api/v3/analyze?host={domain}` |
| Google Safe Browsing | 구글 블랙리스트 | API Key 필요 (선택) |

---

## 16. 구현 완료 기준

- [ ] `/security` 페이지 404 → 200 응답
- [ ] 고객사 등록/목록 조회 동작
- [ ] 표준 스캔 실행 → 결과 DB 저장 → UI 표시
- [ ] 심층 스캔 실행 → 추가 항목 포함 결과 표시
- [ ] 모의공격 실행 → 5개 시나리오 → 결과 표시
- [ ] 취약점 상태 변경 (open → in_progress → resolved)
- [ ] 기존 THE CITADEL 디자인과 통일된 UI

---

*작성: VISIONC CEO / 2026-05-11*  
*이 문서를 Oracle 서버의 Claude Code에게 전달하면 됩니다.*
