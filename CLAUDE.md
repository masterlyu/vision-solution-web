# CLAUDE.md — visionc.co.kr 개발 참고 문서

> 이 문서는 Claude가 이 프로젝트 작업 시 반드시 먼저 읽어야 할 핵심 구조 설명입니다.

## 프로젝트 개요

- **사이트**: visionc.co.kr (AI 보안 솔루션 회사 홈페이지)
- **배포**: Vercel (main 브랜치 push → 자동 배포)
- **프레임워크**: Next.js 16 (App Router), TypeScript strict, Tailwind CSS v4
- **이메일**: Gmail SMTP (nodemailer)
- **알림**: Telegram Bot

---

## 핵심 플로우 1 — 보안 진단 이메일 인증

### 개요
고객이 사이트 보안 진단을 신청하면 **즉시 분석하지 않고**, 도메인 소유자 인증 후 분석한다.

### 단계별 흐름

```
고객 입력 (URL + 이메일)
    ↓
POST /api/analyze
    ├─ 도메인 일치 검증 (이메일 도메인 ↔ URL 도메인)
    ├─ HMAC-JWT 토큰 생성 (exp: 24시간)
    ├─ 인증 메일 발송 (sendVerificationEmail)
    ├─ Telegram 알림 전송
    └─ { ok: true, pending: true } 반환 (분석 안 함)

고객이 메일의 "인증하고 보안 진단 시작" 버튼 클릭
    ↓
GET /security/verify?token=xxx
    ↓
ScanVerifyClient (클라이언트 컴포넌트) 자동 실행
    ↓
POST /api/analyze/run  { token }
    ├─ HMAC 서명 검증 + 만료 확인
    ├─ analyzeUrl(url) — 실제 보안 분석
    ├─ generatePdfBuffer() — PDF 생성
    ├─ sendReportEmail() — PDF 이메일 발송
    ├─ Telegram 결과 알림
    ├─ await POST → 대시보드 기록 (아래 플로우 2 참고)
    └─ { ok: true, grade, total } 반환
```

### 핵심 파일

| 파일 | 역할 |
|------|------|
| `src/app/api/analyze/route.ts` | 인증 메일 발송 + HMAC 토큰 생성 |
| `src/app/api/analyze/run/route.ts` | 토큰 검증 → 분석 → PDF → 대시보드 기록 |
| `src/app/security/verify/page.tsx` | 서버 컴포넌트 — searchParams를 **await** 필수 (Next.js 16) |
| `src/app/security/verify/ScanVerifyClient.tsx` | 클라이언트 컴포넌트 — 페이지 마운트 시 자동으로 /api/analyze/run 호출 |
| `src/lib/emailSender.ts` | 인증 메일 HTML 생성 + Gmail SMTP 발송 |
| `src/lib/siteAnalyzer.ts` | 실제 보안 분석 로직 (헤더, SSL, SEO, 성능) |
| `src/lib/pdfReport.tsx` | PDF 리포트 생성 |
| `src/components/UrlAnalysisForm.tsx` | /security 페이지 신청 폼 |

### HMAC 토큰 구조

```typescript
// 토큰 = base64url(payload) + '.' + base64url(HMAC-SHA256 서명)
// 서명 키: env.TELEGRAM_BOT_TOKEN
// payload: { url, email, company, exp: Date.now() + 86_400_000 }

// 중요: btoa() 사용 금지 — 한글 company명에서 에러 발생
// 반드시 Buffer.from(JSON.stringify(payload)).toString('base64url') 사용
```

### 도메인 검증 규칙

```typescript
const ADMIN_EMAILS = ['biztalktome@gmail.com']
// ADMIN_EMAILS는 모든 도메인 진단 가능 (도메인 체크 우회)
// 일반 사용자: 이메일 도메인 === URL 도메인이어야 신청 가능
// 예: https://abc.com 진단 → someone@abc.com 만 허용
```

### 주의사항

- `verify/page.tsx`에서 `searchParams`는 반드시 `await`해야 함 (Next.js 16 변경사항)
  ```typescript
  export default async function Page({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
    const { token } = await searchParams  // ← await 필수
    return <ScanVerifyClient token={token ?? ''} />
  }
  ```
- Redis 미사용 — 과거 Upstash Redis 코드가 일부 남아있을 수 있으나, `/api/analyze` 플로우는 완전히 HMAC 자체 서명으로 전환됨
- `env.ts`의 `UPSTASH_REDIS_*`는 레거시 (renewal 플로우에서만 사용)

---

## 핵심 플로우 2 — 대시보드 진단 기록

### 개요
보안 진단이 완료되면 Oracle 서버의 내부 대시보드 DB에 기록한다.

### 구조

```
/api/analyze/run (Vercel)
    └─ await fetch(`${DASHBOARD_INTERNAL_URL}/api/security/simple-checks`, {
         method: 'POST',
         headers: { 'x-internal-token': VISIONC_INTERNAL_TOKEN },
         body: { targetUrl, customerEmail, customerCompany, grade, scoreTotal,
                 scoreSecurity, scoreSeo, scorePerf, highRisks }
       })
           ↓
Oracle 서버 (134.185.118.87:8080) — THE CITADEL 대시보드
    └─ /api/security/simple-checks  (POST)
           ↓
mini PC Postgres (100.116.174.66:5432)
    └─ DB: archive / schema: security / table: simple_checks
```

### Vercel 환경변수 (필수)

```
DASHBOARD_INTERNAL_URL=http://134.185.118.87:8080
VISIONC_INTERNAL_TOKEN=2c2590e1ede987d226d929d4085ec1474c5a793fc5b73f71cd8a78d9f9373948
```

### simple_checks 테이블 컬럼

```sql
id, target_url, customer_email, customer_company,
grade, score_total, score_security, score_seo, score_perf,
high_risks, telegram_sent, approved, email_sent, created_at
```

### 주의사항

- **반드시 `await` 사용** — fire-and-forget(`fetch().catch(() => {})`)으로 하면 Vercel 서버리스 함수가 먼저 반환되어 요청이 중단됨
- Oracle 서버 OS 방화벽(iptables)과 OCI VCN Security List 모두 8080 포트 개방되어 있음
- Oracle 서버 Tailscale IP `100.89.247.7`은 Vercel에서 접근 불가 — 반드시 공인 IP `134.185.118.87` 사용

---

## 환경변수 전체 목록

### Vercel (프로덕션 필수)

| 변수 | 용도 |
|------|------|
| `TELEGRAM_BOT_TOKEN` | Telegram 알림 + **HMAC 서명 키** |
| `TELEGRAM_CHAT_ID` | Telegram 채널 ID |
| `GMAIL_USER` | Gmail 발신 계정 |
| `GMAIL_APP_PASSWORD` | Gmail 앱 비밀번호 |
| `NEXT_PUBLIC_BASE_URL` | `https://www.visionc.co.kr` |
| `DASHBOARD_INTERNAL_URL` | `http://134.185.118.87:8080` |
| `VISIONC_INTERNAL_TOKEN` | 대시보드 내부 API 인증 토큰 |

### 로컬 (.env.local)

위 항목 + `DASHBOARD_INTERNAL_URL=http://100.89.247.7:8080` (Tailscale로 접근 가능)

---

## 네트워크 구성

```
[Vercel] ──(공인 인터넷)──► [Oracle 서버 134.185.118.87:8080] ──(Tailscale)──► [mini PC Postgres]
                                  THE CITADEL 대시보드
[mini PC 100.116.174.66] ── Tailscale ──► Oracle 서버 (100.89.247.7)
                웹사이트 소스 코드 보관, Git push → Vercel 자동 배포
```

---

## 배포

```bash
git add .
git commit -m "..."
git push origin main  # Vercel 자동 배포 트리거
```

커밋 후 Vercel 배포 완료까지 약 1~2분 소요.
