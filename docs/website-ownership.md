# visionc.co.kr 홈페이지 역할 분담 정의

> 최종 업데이트: 2026-05-12 (KST) — Oracle 서버 역할 상세 추가  
> **목적:** 미니PC Claude / Oracle Claude / Paperclip 에이전트 3곳이 동시에 홈페이지를 수정하면서 발생하는 충돌 방지

---

## 1. 관리 주체 3곳 요약

| 주체 | 위치 | 접근 방식 |
|------|------|---------|
| **미니PC Claude Code** | `~/company/website/` | 직접 코드 수정 → git push → Vercel 배포 |
| **Oracle Claude Code** | `100.89.247.7` THE CITADEL | 별도 레포 or 직접 API 호출 — visionc 코드 직접 수정 안 함 |
| **Paperclip 에이전트** | `localhost:3100` | Paperclip 이슈 → 퍼블리셔(`bb200012`) 등 워커가 코드 수정 → git push |

---

## 2. 영역별 소유권

### visionc.co.kr 프론트엔드 코드 (`~/company/website/`)

| 영역 | 파일/경로 | 소유 주체 | 비고 |
|------|---------|---------|------|
| 보안 헤더·CSP·CSRF | `src/middleware.ts` | **미니PC Claude** | 변경 시 nonce 전파 테스트 필수 |
| 레이아웃·폰트·챗봇 embed | `src/app/layout.tsx` | **미니PC Claude** | Dify 챗봇 defer 방식 유지 필수 |
| 자동 진단 엔진 | `src/lib/siteAnalyzer.ts` | **미니PC Claude** | PageSpeed API 키 환경변수 필요 |
| 이메일 발송 | `src/lib/emailSender.ts` | **미니PC Claude** | Gmail SMTP 환경변수 |
| PDF 리포트 | `src/lib/pdfReport.tsx` | **미니PC Claude** | |
| 보안 서비스 소개 페이지 | `src/app/security/page.tsx` | **Paperclip** | 가격·패키지 변경 시 Oracle 확인 필수 |
| 일반 페이지 (홈·블로그 등) | `src/app/`, `src/components/` | **Paperclip** | 디자인 5-Phase 프로토콜 준수 |
| 성능 최적화 컴포넌트 | `src/components/font-loader.tsx` | **미니PC Claude** | |

### Oracle 서버 영역 (THE CITADEL `100.89.247.7:8080`)

| 영역 | 위치 | 소유 주체 | 비고 |
|------|------|---------|------|
| **보안 스캐너 엔진** | `trading-dashboard/lib/security/scanner.ts` | **Oracle Claude** | standard 13 / deep 23 / pentest 33 단계 |
| **보안 서비스 B패키지** | THE CITADEL `/security` → standard 모드 | **Oracle Claude** | SSL·헤더·쿠키·CORS·이메일DNS·민감파일 등 13종 |
| **보안 서비스 C패키지** | THE CITADEL `/security` → deep 모드 | **Oracle Claude** | B항목 + Rate Limiting·WAF·서브도메인·에러노출·MixedContent·CMS CVE 등 23종 |
| **보안 서비스 D패키지** | THE CITADEL `/security` → pentest 모드 | **Oracle Claude** | C항목 + HTTP 스머글링·캐시포이즈닝·JWT·SSTI·클릭재킹 등 33종 |
| **고객 보안 대시보드 DB** | PostgreSQL `empire` 스키마 | **Oracle Claude** | `security_scans`, `security_findings` 테이블 |
| **견적 이메일 API** | `app/api/security/scans/[id]/quote-email/` | **Oracle Claude** | PRICE_MAP 28항목, Gmail SMTP 발송 |
| **보안 API 라우트** | `app/api/security/` (scan·findings·overview·reports·rulebook 등) | **Oracle Claude** | PostgREST `localhost:3334` 경유 |
| **Dify 챗봇 서버** | `chatbot.visionc.co.kr` (미니PC Docker) | **Oracle Claude** | embed token: `PCt1VlRbyvKH4dX3`, 플로우 편집은 미니PC Dify UI |
| 트레이딩·콘텐츠·운영 모듈 | THE CITADEL 각 페이지 | **Oracle Claude** | |

---

## 3. 공유 자원 및 충돌 방지 규칙

### 3-1. Dify 챗봇
- **서버 위치**: 미니PC Docker (`localhost:80` → Nginx 리버스 프록시 → `chatbot.visionc.co.kr`)
- **서버 관리**: Oracle Claude (플로우·모델·토큰 변경 지시)
- **프론트 embed**: 미니PC Claude (`layout.tsx`의 token·baseUrl)
- **토큰 변경 시**: Oracle Claude가 먼저 변경 → 미니PC Claude에 통보 → `layout.tsx` 업데이트

**Oracle Claude의 Dify 플로우 관리 방법:**
| 작업 | 방법 |
|------|------|
| 플로우 편집 | 미니PC SSH → `http://localhost:80` Dify UI 접속 (또는 chatbot.visionc.co.kr/signin) |
| 로그인 정보 | `DIFY_EMAIL=masterlyu@gmail.com` / Oracle 서버 `.env.local` 참조 |
| API 호출 경로 | Oracle 서버에서 `http://100.116.174.66:80` (DIFY_API_URL) |
| 모델 변경 | Dify UI → 설정 → 모델 공급자 (DeepSeek·OpenAI 등) |
| embed token 확인 | Dify UI → 앱 → 퍼블리시 → embed 코드 내 token 값 |
| token 변경 후 절차 | Oracle Claude → 미니PC Claude에 통보 → `src/app/layout.tsx` difyChatbotConfig.token 업데이트 |

### 3-2. 보안 서비스 소개 페이지 (`/security`)
- **콘텐츠·가격**: Paperclip 에이전트 담당
- **점검 항목 목록**: `siteAnalyzer.ts` 실제 구현과 반드시 일치해야 함
- ⚠️ 가격·패키지 수정 시 Oracle 서버 가격과 동기화 필요 (B:79만/C:199만/D:29만/月)

### 3-3. 환경변수
| 변수 | 관리 주체 | 위치 |
|------|---------|------|
| `PAGESPEED_API_KEY` | 미니PC Claude | Vercel Environment Variables |
| `GMAIL_USER`, `GMAIL_APP_PASSWORD` | 미니PC Claude | Vercel + Oracle 서버 `.env.local` 동일값 |
| `TELEGRAM_BOT_TOKEN` | 미니PC Claude | Vercel |
| `UPSTASH_REDIS_REST_URL/TOKEN` | 미니PC Claude | Vercel |
| Dify 관련 토큰 | Oracle Claude | chatbot.visionc.co.kr |

**Oracle 서버 전용 환경변수** (`trading-dashboard/.env.local`):
| 변수 | 값/설명 | 용도 |
|------|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `http://100.89.247.7:8080` | PostgREST API 엔드포인트 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | JWT (anon role) | PostgREST 인증 토큰 |
| `MINIPC_DB_HOST` | `100.116.174.66` | 미니PC archive DB (BT 캔들 캐시) |
| `MINIPC_DB_USER` / `MINIPC_DB_NAME` | `citadel` / `archive` | BT 데이터 조회용 |
| `VISIONC_INTERNAL_URL` | `http://100.116.174.66:3999` | 보안 스캔 시 visionc 내부 호출 |
| `VISIONC_INTERNAL_TOKEN` | sha256 토큰 | 내부 API 인증 |
| `SMTP_HOST` / `SMTP_PORT` | `smtp.gmail.com:587` | 보안 리포트 이메일 발송 |
| `SMTP_USER` | `biztalktome@gmail.com` | Gmail 계정 |
| `SMTP_PASS` | Gmail App Password | Gmail SMTP 인증 |
| `SMTP_FROM` | `VISIONC Security <biztalktome@gmail.com>` | 발신자 표시명 |
| `TELEGRAM_BOT_TOKEN` | BotFather 토큰 | 보안 스캔 완료 알림 |
| `TELEGRAM_CHAT_ID` | `338242589` | 알림 수신 채팅 ID |
| `DIFY_API_URL` | `http://100.116.174.66:80` | 미니PC Dify 내부 호출 경로 |
| `DIFY_EMAIL` / `DIFY_PASSWORD` | 관리자 계정 | Dify API 인증 |

### 3-4. DNS (Cloudflare)
- **관리 주체**: 사령관 직접 (미니PC·Oracle 모두 변경 불가)
- 현재 설정:
  - `visionc.co.kr` → Vercel Primary (non-www 정규화)
  - SPF: `v=spf1 include:_spf.google.com ~all`
  - DMARC: `v=DMARC1; p=none; rua=mailto:masterlyu@gmail.com`

---

## 4. 수정 금지 규칙

| 주체 | 건드리면 안 되는 것 | 이유 |
|------|-----------------|------|
| **Paperclip 에이전트** | `middleware.ts`, `layout.tsx`, `siteAnalyzer.ts` | CSP nonce 구조 파괴 → 전체 화면 블랙아웃 위험 |
| **Paperclip 에이전트** | `/api/analyze`, `/api/contact`, `/api/notify` | CSRF 검증 구조 변경 시 보안 취약점 발생 |
| **Oracle Claude** | `~/company/website/` 직접 수정 | 별도 레포·API 호출로 처리 |
| **미니PC Claude** | `~/trading_citadel/` | Oracle BT 워커 자동 동기화 대상, 절대 수정 금지 |

---

## 5. 미니PC 활용 가능 자원 (콘텐츠·검수·분석 용도)

### 5-1. NVIDIA Nemotron-Personas-Korea 데이터셋

| 항목 | 내용 |
|------|------|
| **경로** | `/home/ubuntu/datasets/nemotron-personas-korea/` |
| **규모** | 약 100만 명 (parquet 9개, 1.9GB) |
| **라이선스** | CC BY 4.0 (상업적 활용 가능) |
| **컬럼** | 직업·스포츠·예술·여행·요리·가족 페르소나 + 기술·취미 속성 |
| **활용 가이드** | `knowledge/korean_personas_guide.md` |

**활용 예시:**
- 블로그 글 작성 시 "실제 독자층" 기반 검수 — 타깃 페르소나를 샘플링해 공감 여부 확인
- 서비스 소개 페이지 문구가 실제 한국 고객에게 자연스러운지 검증
- 마케팅 카피 A/B 테스트 기준점 수립

---

### 5-2. NVIDIA API (Nemotron 120B)

| 항목 | 내용 |
|------|------|
| **모델** | `nvidia/nemotron-3-super-120b-a12b` |
| **엔드포인트** | `https://integrate.api.nvidia.com/v1` |
| **환경변수** | `NVIDIA_API_KEY` (미니PC 로컬) |
| **비용** | 무료 (NVIDIA API 무료 티어) |
| **컨텍스트** | 1M tokens |
| **Shim 경로** | `~/company/nemotron-claude-shim.py` |

**Paperclip 에이전트 연동 (4개 에이전트):**

| 에이전트 | 역할 | Nemotron 활용 |
|---------|------|-------------|
| 트렌드 스카우트 | 시장 트렌드 수집 | 분류·요약 |
| 콘텐츠 라이터 | 블로그·SNS 글 작성 | 텍스트 생성 |
| 가이드 컨설턴트 | 고객 가이드 문서 작성 | 텍스트 생성 |
| 아카이브 매니저 | 콘텐츠 아카이빙 | 분류·요약 |

> Claude Sonnet 대비 긴 문서 생성·분류·요약에 비용 효율적. 판단·코딩은 Claude 사용.

---

### 5-3. 기타 LLM·AI 도구

| 도구 | 용도 | 위치 |
|------|------|------|
| **Claude Sonnet 4.6** | 코드 수정·판단·보안 분석 (미니PC 메인) | 미니PC Claude Code |
| **Claude Opus 4.7** | Paperclip CEO 에이전트 최종 의사결정 | Paperclip `localhost:3100` |
| **Claude Sonnet** | Paperclip 19개 워커 에이전트 | Paperclip |
| **Nemotron 120B** | 콘텐츠 생성·분류 (무료) | 미니PC shim → NVIDIA API |
| **Dify (챗봇 엔진)** | 고객 상담 자동화 | Oracle 서버 `chatbot.visionc.co.kr` |

---

### 5-4. 콘텐츠 검수 워크플로우

블로그·서비스 페이지 작성 시 권장 순서:

```
1. 콘텐츠 라이터 (Nemotron) — 초안 작성
2. 페르소나 검수 — Nemotron-Personas-Korea 에서 타깃 샘플 추출
   예) 30대 IT 종사자 5명 샘플 → "이 글이 공감이 가는가?" 시뮬레이션
3. Claude Sonnet — 사실 관계·보안 정확성 검수
4. 디자인 검증관 (Paperclip) — AI 티 11항목 검사 후 최종 승인
```

---

## 6. 미니PC 전체 설치 도구 현황

### 6-1. 보안 도구

| 도구 | 위치 | 용도 | 활용 방법 |
|------|------|------|---------|
| **OWASP ZAP** | Docker `zap` (localhost:8080) | 웹 취약점 자동 스캔 | `/api/zap-scan` 엔드포인트로 트리거, Upstash Redis에 이력 저장 |
| **Sucuri SiteCheck** | 외부 API | 악성코드·블랙리스트 점검 | `siteAnalyzer.ts` → `sitecheck.sucuri.net` |
| **SSL Labs API** | 외부 API | SSL 등급 진단 | `siteAnalyzer.ts` → `api.ssllabs.com` |
| **Google PageSpeed API** | 외부 API | 성능 점수 측정 | `siteAnalyzer.ts`, 환경변수 `PAGESPEED_API_KEY` |

> **ZAP 스캔 프로필**: baseline(~90초 패시브) / full(~600초 액티브) / api(OpenAPI 기반)  
> **ZAP 점수**: `100 - (High×25) - (Medium×10) - (Low×3)`

---

### 6-2. AI / LLM 도구

| 도구 | 위치·포트 | 모델 | 용도 |
|------|---------|------|------|
| **Claude Code** | 미니PC 직접 | Sonnet 4.6 | 코드 수정·보안 분석·판단 |
| **Paperclip CEO** | `localhost:3100` | Opus 4.7 | 에이전트 오케스트레이션 최종 의사결정 |
| **Paperclip 워커** | `localhost:3100` | Sonnet 19개 | 코드·콘텐츠·디자인 작업 |
| **NVIDIA Nemotron 120B** | 원격 API `integrate.api.nvidia.com` | nemotron-3-super-120b | 콘텐츠 생성·분류·요약 (무료) |
| **Dify** | Docker `localhost:80` | 플랫폼 | 챗봇 플로우 편집·관리 UI |
| **Ollama** | Docker `localhost:11434` | BGE-M3 (1.1GB) | 로컬 임베딩 (벡터 검색) |
| **DeepSeek** | Dify 플러그인 | deepseek-chat 등 | Dify 챗봇 내 LLM 연동 |
| **Gemini Code Assist** | VSCode 확장 | Gemini | 코드 자동완성 보조 |

---

### 6-3. 인프라·데이터 도구

| 도구 | 위치·포트 | 역할 |
|------|---------|------|
| **Weaviate** | Docker (내부) | 벡터 데이터베이스 — Dify RAG 저장소 |
| **minipc-db** | Docker PostgreSQL 16 (`100.116.174.66:5432`) | 로컬 메인 DB (Paperclip·Oracle 데이터) |
| **Dify PostgreSQL** | Docker `docker-db_postgres-1` | Dify 전용 DB |
| **Dify Redis** | Docker `docker-redis-1` | Dify 캐시·큐 |
| **Nginx** | Docker `localhost:80/443` | Dify 리버스 프록시 |

---

### 6-4. 파이프라인·자동화 스크립트

| 서비스 | 포트·경로 | 역할 |
|--------|---------|------|
| **youtube_api.py** | `:8765` | Oracle 정치 파이프라인 유튜브 자막 수집 |
| **bt_worker.py** | 크론 10분 | Oracle BT 큐 폴링 → citadel-worker 실행 |
| **paperclip_director.py** | — | Paperclip 에이전트 상태 관리 |
| **http.server** | `:8899` | `/home/ubuntu` 로컬 파일 서버 |
| **visionc.co.kr dev** | `:3999` | Next.js 개발 서버 (로컬 미리보기) |

---

### 6-5. 데이터셋

| 데이터셋 | 경로 | 규모 | 용도 |
|---------|------|------|------|
| **Nemotron-Personas-Korea** | `/home/ubuntu/datasets/nemotron-personas-korea/` | 100만 명, 1.9GB | 한국 고객 페르소나 시뮬레이션·콘텐츠 검수 |

---

## 7. 추가 소유권 규칙 (누락 영역)

### GitHub Actions (`.github/workflows/`)
- **소유 주체**: 미니PC Claude 단독
- Paperclip 에이전트·Oracle Claude 수정 금지
- 수정 시 반드시 `npm run build` 통과 확인 후 push

### 빌드·의존성 설정
| 파일 | 소유 주체 | 규칙 |
|------|---------|------|
| `package.json` | Paperclip (단, 미니PC 확인 필요) | 새 패키지 추가 시 빌드 확인 필수 |
| `next.config.ts` | **미니PC Claude** | CSP fallback 헤더 포함, 보안 설정과 연동 |
| `tailwind.config.ts` | Paperclip | CSS 변수 추가 시 기존 `--primary` 등 변수 충돌 확인 |
| `.env.example` | 미니PC Claude | 환경변수 추가 시 Vercel + Oracle 서버 동기화 |

### 환경변수 동기화 프로토콜
변경 발생 시 아래 순서로 처리:
1. Vercel Environment Variables 업데이트
2. Oracle 서버 `.env.local` 동일값으로 업데이트 (GMAIL 관련)
3. `~/company/docs/website-ownership.md` 3-3 표 업데이트

### 3개 시스템 협업 규칙 (2026-05-12 확정)

| 시스템 | 규칙 |
|--------|------|
| **Oracle Claude** | 단위 작업마다 커밋 필수. 커밋 메시지에 변경 내용 명확히 기재 |
| **미니PC Claude** | 홈페이지 작업 시작 전 `git pull origin main && git log --oneline -5` 로 Oracle 작업 여부 확인 (사령관 별도 언급 없어도 자동 수행) |
| **Paperclip 에이전트** | 작업 주기 `0 */2 * * *` (짝수시 정각) — 이 시간대 다른 시스템 직접 push 자제 |

- **충돌 발생 시**: git merge conflict → 미니PC Claude가 최종 판단
- **미니PC 자원·툴 확인 방법**: `~/.claude/CLAUDE.md` (서비스·인프라) + 이 문서 섹션 6 (툴 목록) 두 파일 참조

---

## 8. 변경 시 체크리스트

### 미니PC Claude가 `layout.tsx` 수정 시
- [ ] `async` + `headers()` 유지 여부 확인 (제거 시 CSP nonce 전파 실패)
- [ ] Dify 챗봇 `<script defer>` 방식 유지 (Script 컴포넌트 전략 변경 시 챗봇 미작동)
- [ ] `npm run build` → git push → 배포 후 챗봇 작동 확인

### Paperclip 에이전트가 `/security` 페이지 수정 시
- [ ] 점검 항목이 `siteAnalyzer.ts` 실제 구현 항목과 일치하는지 확인
- [ ] SPF·DKIM·DMARC 표기 주의 — DKIM은 현재 미구현, SPF·DMARC만 표기
- [ ] 가격은 Oracle 서버 기준 (B:79만/C:199만/D:29만/月) 준수

### Oracle Claude가 Dify 챗봇 토큰 변경 시
- [ ] 미니PC Claude에 새 token값 통보
- [ ] `src/app/layout.tsx` 의 `difyChatbotConfig.token` 업데이트 필요
