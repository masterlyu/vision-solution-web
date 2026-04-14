# Vision Solution

AI 기반 웹솔루션 전문 회사 홈페이지 (visionc.co.kr)

## 기술 스택

- Next.js 15 (App Router)
- TypeScript (strict)
- Tailwind CSS v4
- shadcn/ui + Framer Motion
- Upstash Redis (Rate Limiting, ZAP 이력)
- OWASP ZAP (자동화 보안 스캔)

## 보안 현황

| 항목 | 상태 |
|------|------|
| 보안 헤더 (CSP, HSTS, X-Frame-Options 등) | ✅ 적용 |
| CSRF 방어 (Origin 헤더 검증) | ✅ 적용 |
| API Rate Limiting | ✅ 적용 |
| Telegram 웹훅 서명 검증 | ✅ 적용 |
| 환경변수 Zod 검증 | ✅ 적용 |
| OWASP ZAP 자동화 스캔 | ✅ 통합 완료 |

자세한 보안 구현 내역: `knowledge/security_implementation.md`

## 주요 페이지

- `/` 메인
- `/security` 보안 서비스 (OWASP ZAP 스캔 UI 포함)
- `/security/scan-history` ZAP 스캔 이력 대시보드

## 배포

- Vercel (자동 배포, `main` 브랜치)

## 개발

```bash
npm install
npm run dev
```

## OWASP ZAP 로컬 실행

```bash
# ZAP 데몬 시작 (Docker 필요)
docker-compose up -d

# 환경변수 설정
cp .env.example .env.local
# ZAP_API_KEY, ZAP_API_URL, UPSTASH_REDIS_* 설정 필요
```
