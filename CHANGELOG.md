# CHANGELOG — Vision Solution 웹사이트


---

## [2026-05-26] — llms.txt 데이터 분리 및 콘텐츠 강화

### 개요
`/llms.txt` 엔드포인트를 데이터 주도형 구조로 리팩터링. 하드코딩된 서비스·FAQ·수치·회사정보를
`content/company/*.json` 파일로 분리하여, 코드 수정 없이 JSON 파일만 편집하면 자동 반영되도록 개선.
동시에 누락된 서비스(모의해킹, 챗봇 상담, 포트폴리오)·회사 신뢰 정보·FAQ·성과 수치를 추가하여
AI 검색 엔진(ChatGPT, Perplexity, Claude 등) 노출 품질 향상.

### 커밋
- `8a70543` feat: enhance llms.txt with full service list, FAQ, and company details
- `a5a28f2` refactor: make llms.txt data-driven from JSON files

---

### 1. 신규 데이터 파일

**추가 파일:** `content/company/info.json`, `services.json`, `faq.json`, `metrics.json`

| 파일 | 내용 | 업데이트 주체 |
|------|------|------------|
| `info.json` | 회사명·설립연도·위치·인증·이메일 | 회사 정보 변경 시 수동 |
| `services.json` | 서비스 목록·URL·설명·상세 항목 | 서비스 추가·변경 시 수동 |
| `faq.json` | Q&A 목록 | FAQ 추가·변경 시 수동 |
| `metrics.json` | 핵심 성과 수치 | 실적 갱신 시 수동 |

### 2. llms.txt 콘텐츠 개선

| 항목 | 이전 | 이후 |
|------|------|------|
| 서비스 수 | 7개 | 8개 (모의해킹·챗봇 상담 추가) |
| 포트폴리오 섹션 | 없음 | 추가 (주요 고객사 목록 포함) |
| 회사 신뢰 정보 | 없음 | 2007년 설립·247건+·벤처기업·인증 6종 |
| 성과 수치 | 없음 | 문의 3.2배·CS 70%·PageSpeed 38→91점 등 |
| 위치 정보 | 없음 | 인천 계양구 (지역 검색 노출 강화) |
| FAQ | 없음 | 7개 Q&A |

### 3. route.ts 구조 변경

**적용 파일:** `src/app/llms.txt/route.ts`

- 기존: 서비스·FAQ·수치 모두 `route.ts` 내 하드코딩
- 변경: `fs.readFileSync`로 JSON 파일 읽기 → 템플릿 조립
- 블로그 목록은 기존과 동일하게 `getAllPosts()` 동적 로딩 유지



## [2026-05-18] — 모의해킹 진단 서비스 페이지 신규 추가

### 개요
실전 모의해킹 진단 서비스(`/pentest`) 랜딩 페이지 신규 구현 및 관련 페이지·약관 일괄 개정.
경쟁자 대비 차별화(매주 갱신되는 위협 인텔리전스 · AI 한글 보고서 · 보안 기초 해설서 5편) 강조 + 후킹 카피(KISA 침해사고 통계) + 법적 책임 명시 + 신청 시 별도 동의 체크박스 구조 설계.

### 커밋
- `976537d` feat(pentest): 모의해킹 진단 서비스 페이지 신규 추가
- `ea4dbca` chore: 미사용 대용량 파일 cat_bow.mp4(12MB) git 제거 (VIS-1412)

---

### 1. 신규 페이지 `/pentest`

**적용 파일:** `src/app/pentest/page.tsx`, `src/app/pentest/layout.tsx`

| 항목 | 내용 |
|------|------|
| 단일 가격 | **290,000원** (1~2일 소요, 단일 사이트 기준) |
| Hero | "당신의 사이트, 진짜 해커는 어디까지 들어올 수 있을까요?" |
| 3대 차별화 | 기술 우위(매주 갱신) · 쉬운 전달(AI 한글 + 해설서 5편) · 안정 퀄리티(표준 체크리스트) |
| 위협 DB 섹션 | 후킹 통계 박스(KISA·중소기업 70%) + 매주 신규 위협을 일반인 용어로 표시 + 카테고리별 점검 패턴 수 |
| 비교표 | 자동 진단 업체 · 수동 포함 업체 · VISIONC — 점검 항목 상세 비교 (★ 차별 영역 표시) |
| 법적 책임 | 요약 박스 1개(5줄) + "신청 단계 별도 동의서로 한 번 더 안내" + 약관 링크 |
| FAQ | 7항목 (합법성·다운 우려·기밀 보장·가격 합리화·자력 이해·규모·산출물) |
| 블로그 카드 | 보안 기초 해설서 5편 슬러그 노출 (글은 후속 작성 예정) |
| 마스코트 | `cat_svc_hacker.png` (sm/md/lg 3종) |

### 2. 메뉴 추가

**적용 파일:** `src/components/landing/navigation.tsx`, `src/components/Header.tsx`

| 위치 | 변경 |
|------|------|
| 데스크탑 서비스 드롭다운 | 「보안 진단」 바로 아래에 「모의해킹 진단」 추가 |
| Header.tsx (legacy) | NAV 배열에 모의해킹 항목 추가 (현재 미사용 컴포넌트, 호환성용) |

### 3. 문의 폼 모의해킹 옵션

**적용 파일:** `src/app/contact/page.tsx`

| 항목 | 변경 |
|------|------|
| service select | 「모의해킹 진단 (29만원)」 옵션 추가 |
| URL 파라미터 | `?service=pentest` 진입 시 일반 상담 탭 + service 자동 선택 |
| 동의 체크박스 | 모의해킹 선택 시 5가지 법적 사항 동의 박스 자동 노출 (필수) |
| 제출 차단 | 동의 미체크 시 「문의 전송」 버튼 비활성화 |
| 페이로드 | `pentestAgreed: boolean` 필드 동봉 |

### 4. 개인정보처리방침·이용약관 개정

**적용 파일:** `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`

| 항목 | 변경 |
|------|------|
| 시행일 | 2025-01-01 → **2026-05-18** (모의해킹 진단 서비스 추가 개정) |
| Privacy 제1조 | "모의해킹 진단 서비스 제공 및 결과 보고" 추가 |
| Privacy 제2조 | 점검 대상 도메인·IP, 시스템 구성 정보, 진단 범위 합의서 수집 항목 추가 |
| Privacy 제3조 | 보고서 전달 즉시(당일) 회사 측 보유분 일괄 삭제 + 삭제 확인서 발급 명시 |
| Privacy 제7조 | 모의해킹 결과물 암호화 + 보고서 PDF 암호 설정 명시 |
| Terms 제2조 | "모의해킹 진단" 용어 정의 추가 |
| Terms 제5조 | 모의해킹 진단 서비스 특별 조항 신설 (사전 동의·NDA·즉시 삭제·시점적 한계·의사결정 책임 6개 항목) |
| Terms 제6·7조 | 정당 권한 없는 시스템 신청 금지 + 신청자 권한 미입증 시 서비스 제한 추가 |
| Terms 제9조 | 보고서 지식재산권·내부 사용 한정 추가 |

### 5. 가격 정책 결정 근거 (시장조사)

| 비교 대상 | 가격 | 소요 | 모의해킹 |
|----------|------|------|---------|
| 크몽 STANDARD | 189,000원 | 2일 | 자동만 (수동 불포함) |
| **VISIONC** | **290,000원** | **1~2일** | **자동 + 수동 핵심 1~2건** |
| 크몽 DELUXE | 599,000원 | 6일 | 자동 + 수동 |
| 크몽 PREMIUM | 1,100,000원 | 10일 | 자동 + 수동 (대형) |

→ STANDARD 대비 1.53배 가격으로 **수동 침투 + AI 한글 분석 + 해설서 5편** 차별화.
→ DELUXE의 절반 가격에 **속도 3배** + **무료 보조 콘텐츠** 제공.

### 6. 미사용 파일 정리
- `public/mascot/lg/company/cat_bow.mp4` 12MB 원본 제거 (ESRGAN 원본, 웹 서빙 미사용)
- `cat_bow_web.mp4` 84KB만 유지 (메인 마스코트 동영상에 실제 참조)

---

## [2026-05-12] — 무료 진단·상담 폼 UX 개선 (전체 페이지 공통 적용)

### 개요
홈페이지 전반의 무료 진단·상담 신청 폼이 배경에 묻혀 눈에 띄지 않는 문제를 개선.
폼 컨테이너 카드 강조 + 입력창 시각 구분 + 텍스트 크기 확대를 전체 페이지에 일관 적용.

### 커밋
- `eb3b39b` feat: 무료 진단 폼 시각 강화 — 입력창 primary 테두리·glow·버튼 shadow 전체 적용
- `c95da69` feat: 진단·상담 폼 카드 박스 강조 — 상단 primary 액센트 바 + glow shadow + 입력창 border 선명화
- `fea9f87` feat: 폼 강조 강화 — 상단 accent 바, border 65% 불투명도, 라벨 text-base, 글자 크기 확대
- `a754820` feat: 폼 입력창 배경색 bg-secondary로 변경 — 카드 배경 대비 시각적 구분 강화

---

### 1. 폼 컨테이너 카드 강조

**적용 파일:** `src/components/UrlAnalysisForm.tsx`, `src/app/contact/page.tsx`

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 배경 | `bg-[var(--background-deep)]` | `bg-card` |
| 테두리 | `border-border/30` (중립, 거의 안 보임) | `border-primary/60` (보라색, 선명) |
| 상단 액센트 | 없음 | `h-[3px] bg-primary` absolute 바 |
| 그림자 | 없음 | `shadow-[0_4px_40px_rgba(139,92,246,0.25)]` |

### 2. 입력창 스타일 강화

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 배경색 | `bg-[var(--card-deep)]` — oklch(0.10), 폼과 거의 동일 | `bg-secondary` — oklch(0.18), 명확히 구분 |
| 테두리 | `border-border/40` (중립) | `border-primary/50` (보라 tint) |
| focus ring | `ring-primary/25` | `ring-primary/40` |
| 패딩 | `px-4 py-3.5` | `px-5 py-4` |
| 글자 크기 | `text-base` | `text-[1.05rem]` |

### 3. 텍스트 크기 확대

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 폼 제목 | `text-xl font-bold` | `text-2xl font-black` |
| 라벨 | `text-sm font-semibold` | `text-base font-bold` |
| 하단 안내 | `text-xs` | `text-sm` |

### 4. 버튼 강조

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 그림자 | 없음 | `shadow-lg shadow-primary/40` |
| hover | 없음 | `hover:shadow-primary/60` |

### 5. 인라인 URL 폼 (히어로·CTA 섹션)

**적용 파일:** `src/components/landing/hero-section.tsx`, `src/components/landing/cta-section.tsx`

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 입력창 테두리 | `border` 1px `border-white/20` (거의 안 보임) | `border-2 border-primary/60` |
| focus | 없음 | `focus:ring-2 focus:ring-primary/30` |
| 버튼 그림자 | 없음 | `shadow-lg shadow-primary/50` |

---

### 색상 계층 구조 (변경 후)

```
페이지 배경    --background  oklch(0.08)  ← 가장 어두움
폼 컨테이너   --card        oklch(0.11)  ← 폼 카드 (보라 테두리 + 상단 bar)
입력창 배경   --secondary   oklch(0.18)  ← 입력 필드 (밝은 회색)
```

**적용 범위:** 보안 진단 페이지, 리뉴얼 페이지, 포트폴리오 페이지, about 페이지, 문의 페이지, 홈 히어로·CTA 섹션

---

## [2026-05-12] — 보안 서비스 페이지 Phase 1·2 반영 + 스캐너 고도화

### 개요
VISIONC 보안 진단 스캐너 Phase 1(5종)·Phase 2(6종) 구현 완료.
스캔 항목 표준 8개 → 최대 28개로 확대. 홈페이지 보안 서비스 페이지 전면 반영.

### 커밋
- `0059f82` feat: 보안 서비스 페이지 — Phase 1 반영 + 4개 패키지 구조로 개편
- `cb853f8` feat: 보안 서비스 페이지 — Phase 2 반영 (심층 진단 항목 업데이트)

---

### 1. 보안 스캐너 Phase 1 (Oracle 대시보드 — 전 모드 공통)

파일: trading-dashboard/lib/security/scanner.ts

| 체크 | 설명 |
|------|------|
| ssl_tls | SSL Labs API — A+~F 등급, TLS 1.0/1.1, Forward Secrecy |
| cookie_flags | Set-Cookie HttpOnly·Secure·SameSite 누락 탐지 |
| cors | 임의 Origin 반영·와일드카드+Credentials 오류 탐지 |
| email_security | Cloudflare DoH — SPF·DKIM·DMARC 레코드 점검 |
| sensitive_files | 30개 경로 노출 탐지 (.env·.git·백업·CMS 설정 등) |

---

### 2. 보안 스캐너 Phase 2 (deep·pentest 모드)

파일: trading-dashboard/lib/security/scanner.ts

| 체크 | 설명 |
|------|------|
| rate_limiting | 15회 연속 요청 — 429·RateLimit 헤더 감지 |
| waf_detection | 헤더 핑거프린트 + XSS 프로브 차단 여부 |
| subdomain_takeover | 10개 서브도메인 CNAME 댕글링·탈취 서명 확인 |
| error_disclosure | 404·SQLi 프로브 → 스택트레이스·파일경로 노출 탐지 |
| mixed_content | HTTPS 페이지 내 HTTP 리소스 참조 탐지 |
| cms_cve | WordPress·Joomla·Drupal·Magento 버전 → CVE 매핑 |

스캔 단계: standard 13 / deep 23 / pentest 28

---

### 3. 보안 서비스 페이지 업데이트

파일: src/app/security/page.tsx

- 무료 점검 항목 카드 8개 → 12개 확장 (SSL 상세·쿠키·CORS·이메일DNS·민감파일 추가)
- 패키지 C 점검 항목: Phase 2 기준으로 갱신 (Rate Limiting·WAF·서브도메인·에러노출·MixedContent·CMS CVE)
- 패키지 C 수정 항목: 에러 페이지·Mixed Content·CMS 보안업데이트 추가

---

### 4. 견적 이메일 PRICE_MAP 확장

파일: trading-dashboard/app/api/security/scans/[id]/quote-email/route.ts

Phase 1·2 신규 10개 항목 추가 (기존 13개 → 23개):

| check_type | 단가 |
|---|---|
| ssl_tls | 150,000원 |
| cookie_flags | 80,000원 |
| cors | 200,000원 |
| email_security | 80,000원 |
| rate_limiting | 100,000원 |
| waf_detection | 300,000원 |
| subdomain_takeover | 150,000원 |
| error_disclosure | 80,000원 |
| mixed_content | 100,000원 |
| cms_cve | 200,000원 |

---

## [2026-05-12 오후] — Paperclip manager 에이전트 tasks:assign 권한 부여

### 개요
디자인 검증관 루틴이 2시간마다 CSS 위반 이슈를 생성하지만 퍼블리셔에게 배정하지 못하는 문제(403 Forbidden) 근본 해결.
manager role 6개 에이전트 전원에게 `tasks:assign` 권한 부여.

---

### 문제 분석

**증상**: 디자인 검증관 루틴 실행 시 VIS-1171, VIS-1172 등 이슈 생성 후 퍼블리셔 배정 실패 → 미배정 누적

**근본 원인**: 에이전트 permissions에 `tasks:assign` 권한이 없어 `PATCH /api/issues/{id}` assignee 변경 시 403

**의사결정**: CTO 경유 방식(모든 배정 요청을 CTO에게 전달) vs 개별 권한 부여 비교 검토 후 **개별 권한 방식** 채택
- CTO 경유는 2시간 루틴마다 추가 Opus 호출 발생 → 불필요한 비용/지연
- 배정 대상이 이미 명확히 정해진 워크플로우(검증관 → 담당 에이전트)
- manager role에만 제한, worker는 기존대로

---

### 적용 내용

**대상**: manager role 에이전트 6명 전원

| 에이전트 | ID | 부여 방식 |
|---------|-----|---------|
| 디자인 검증관 | bb200001 | API (`PATCH /api/agents/:id/permissions`) |
| 마케팅 검증관 | bb100001 | API |
| 기술 검증관 | bb300001 | API |
| 통합 검증관 | bb600001 | API |
| 보안 검증관 | bb400001 | API |
| AI 솔루션 검증관 | bb500001 | DB 직접 삽입 (urlKey 충돌로 API 우회) |

**AI 솔루션 검증관 특이사항**: urlKey가 "ai"로 단축되어 AI 디자이너·AI 엔지니어와 충돌(ambiguous). isUuidLike() 정규식이 RFC 4122 표준 UUID만 인식하므로 synthetic ID가 shortname으로 처리됨. `principal_permission_grants` 테이블에 직접 INSERT로 해결.

---

### 효과
다음 루틴 실행(KST 12:00)부터 디자인 검증관이 CSS 위반 이슈 생성 → 퍼블리셔 직접 배정까지 완전 자동화.

---

## [2026-05-12 오전] — Nemotron Shim ReAct 루프 구현 + Paperclip 에이전트 복구

### 개요
Nemotron으로 교체된 4개 에이전트(콘텐츠 라이터, 트렌드 스카우트, 가이드 컨설턴트, 아카이브 매니저)가
Paperclip 태스크를 처리하지 못하는 근본 원인을 분석하고, shim에 ReAct 아gentic loop를 구현해 해결.

---

### 문제 분석

**증상**: VIS-1150 블로그 글 작성 태스크가 할당 후 이틀째 `todo` 상태 유지

**근본 원인**: Nemotron shim이 텍스트 생성만 하고 tool use(bash 실행)를 지원하지 않음

```
기존 구조 (broken):
Paperclip → shim → Nemotron API → 텍스트 출력만
→ curl/bash 실행 불가 → checkout/PATCH 호출 불가 → 이슈 영원히 todo

수정 후:
Paperclip → shim → Nemotron이 <bash>curl...</bash> 생성
                 → shim이 subprocess.run() 실행
                 → 결과를 다음 메시지로 피드백 (ReAct 루프)
                 → <done> 태그까지 반복
```

---

### 수정 내용

**파일**: `~/company/nemotron-claude-shim.py`

#### 핵심 변경: 단순 LLM 호출 → ReAct agentic loop

| 항목 | 기존 | 개선 |
|------|------|------|
| 동작 방식 | 프롬프트 1회 전송 → 텍스트 반환 | ReAct 루프 (최대 30회 반복) |
| Tool use | 없음 | `<bash>`, `<read>`, `<write>`, `<done>` 태그 파싱 + 실행 |
| Paperclip API 호출 | 불가 | bash 태그 → subprocess → curl 실행 |
| 이슈 checkout | 불가 | 정상 동작 |
| 이슈 done 처리 | 불가 | 정상 동작 |
| 비용 | 무료 (Nemotron) | 무료 유지 (Nemotron) |

#### ReAct 루프 구조

```python
for i in range(MAX_ITER=30):
    response = call_nemotron(messages)   # Nemotron에 판단 요청
    
    if <done>:   break                   # 완료
    if <bash>:   output = subprocess.run(cmd)   # bash 실행
    if <read>:   output = open(path).read()     # 파일 읽기
    if <write>:  open(path).write(content)      # 파일 쓰기
    
    messages.append({"role":"user","content": output})  # 결과 피드백
```

#### 지원 태그

```xml
<bash>curl -s -H "Authorization: Bearer $PAPERCLIP_API_KEY" ...</bash>
<read>/path/to/file.md</read>
<write path="/path/to/output.md">내용</write>
<done>완료 요약</done>
```

---

### 적용 결과

| 에이전트 | 조치 |
|---------|------|
| 콘텐츠 라이터 | Nemotron shim 적용 + VIS-1150 처리 완료 |
| 트렌드 스카우트 | Nemotron shim 적용 |
| 가이드 컨설턴트 | Nemotron shim 적용 |
| 아카이브 매니저 | Nemotron shim 적용 |

**검증**: VIS-1173 테스트 이슈로 동작 확인
- `echo shim-test-ok` 실행 → 코멘트 포스팅 → `done` 처리 성공

---

### 중간 조치 (임시)
VIS-1150 블로그 글 작성 태스크 처리를 위해 콘텐츠 라이터를 일시적으로 Claude Haiku로 원복.
VIS-1150은 Claude Haiku가 처리 완료. 이후 Nemotron shim으로 복귀.

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
