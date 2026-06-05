# Release Notes — 2026-06-05

> **AI 도입 동반자 톤 피벗 + IA 재편 + 모바일 안정화**

홈페이지 전체를 "홈페이지 제작 회사"에서 **"중소기업 AI 도입 동반자"**로 톤 피벗하고, 정보 구조(IA)·CTA 어휘·모바일 레이아웃을 일괄 정리한 일일 릴리스.

---

## 1. 톤 피벗 — 핵심 메시지 변화

| 항목 | Before | After |
|---|---|---|
| 사이트 디스크립션 | 홈페이지 무료 AI 진단 | 기업 AI 도입 동반자 — 컨설팅·구축·사내 출강 교육 |
| /about Hero | 홈페이지 업체 연락 두절 | AI 도입, 막막한 중소기업의 동반자 |
| 미션 | 디지털에서 이길 공정한 기회 | 중소기업이 AI를 안전하게 도입·운영하도록 동반 |
| 비전 | 신뢰할 수 있는 디지털 파트너 | 10만 곳의 AI 도입 동반자 |
| 메인 CTA | 무료 진단 / 무료 상담 | 💼 도입 상담 신청 |
| 부 CTA | 포트폴리오 보기 / URL 진단 | 🎓 사내 출강 강좌 보기 |
| 응답 시간 | 48시간 안에 / 48h 리포트 | 영업일 1일 내 |

**금지 어휘 전면 삭제 (7개 핵심 페이지):**
무료 진단 · 무료 상담 · 48시간 안에 · 신용카드 불필요 → 0건

---

## 2. 정보 구조(IA) 재편

### 메뉴 — 5개 항목 (서비스 드롭다운 6개)
- **로고:** VISIONC
- **서비스 드롭다운:**
  1. ★ 기업 AI 도입 및 컨설팅 (`/ai-solution`)
  2. 보안 진단 (`/security`)
  3. 모의해킹 진단 (`/pentest`) **← Phase 5-4에서 신설 노출**
  4. 웹사이트 리뉴얼·운영 (`/renewal`)
  5. 앱·시스템 개발 (`/app-dev`)
  6. 🤖 챗봇 설치 (`/chatbot`)
- 소개 · 포트폴리오 · 블로그
- 우상단 CTA: 💼 도입 상담

### 폐기·통합된 페이지
| 페이지 | 처리 |
|---|---|
| `/new-website` | → `/renewal` 301 리다이렉트, 디렉토리 삭제 |
| `/maintenance` | → `/renewal#maintenance` 301 리다이렉트, 디렉토리 삭제, 콘텐츠는 `/renewal` 페이지 하단 "운영·유지보수 플랜" 섹션으로 흡수 (Basic 99k / Standard 199k / Premium 399k) |

### 홈 SERVICES 카드 (5장 → 6장)
01 기업 AI 도입 및 컨설팅 · 02 보안 진단 · 03 모의해킹 진단 · 04 웹사이트 리뉴얼·운영 · 05 앱·시스템 개발 · 06 🤖 AI 챗봇 설치

---

## 3. 페이지별 변경

### 홈 (`/`)
- **Hero 회전 문구:** 단일 동사(낭비하고/놓치고/뒤처지고/늦어지고) → **주어+동사 페어** (업무가 늦어지고 / 비용이 새고 / 고객을 놓치고)
- BlurWord 컴포넌트 — 공백을 단어 경계로 처리해 모바일에서 단어 단위로 줄바꿈
- letterStates 인덱스 out-of-bounds 크래시 수정 (nullish 폴백)
- SERVICES 카드 마스코트 깨짐 수정 (`cat_svc_chatbot.png` 없음 → `cat_cheer.png`)
- Trust 배지: 무료 진단 보장 → 도입 상담 무료 / 30일 A/S → 6개월 A/S

### `/about` (Phase 3)
- Hero, 미션·비전, 팀 6영역 재정렬(AI 컨설팅·구축·강좌·보안·웹앱·사후관리), 연혁(2026 visionc Enterprise Academy 출범 추가), FAQ AI 4문항 추가, Metrics(247건+ / 30일 평균 납기 / 4.9 / 97%), 하단 CTA 섹션 톤 통일

### `/portfolio` (Phase 4)
- BEFORE/AFTER 슬라이더 + 가짜 사례 3건(OO 한정식·피부과·제과점) 제거
- Industries 6영역 + Services 6영역 정보형 레이아웃으로 재구성
- 사례 비공개 안내(NDA·보안 정책) 섹션 신설
- Process 5단계 (도입 상담 → 솔루션 설계 → 구축·학습 → 인수·검수 → 사후 관리) — about/홈과 통일

### `/contact` (Phase 6)
- H1·메타 "문의하기/무료 상담 문의" → "도입 상담 신청"
- 서비스 옵션 정리: new-website·maintenance 제거, AI 챗봇 설치 추가, 홈 SERVICES 카드 순서로 재정렬 (7개 옵션)
- 보안 진단/홈페이지 진단 탭명: 무료 진단 → 사이트 보안 셀프 점검 / 홈페이지 현황 자동 진단

### `/renewal` (Phase 5-1)
- 신규 섹션 #maintenance 추가 (Basic/Standard/Premium 플랜 + 4영역 카드)
- Hero CTA 톤 정리

### `/security` (Phase 5-4)
- 관련 서비스 배너 추가 → `/pentest`로 가는 CTA

### `/chatbot`, `/app-dev`, `/pentest`
- CTA 어휘 통일
- /chatbot 모바일 코드 미리보기 가로 오버플로우 수정 (overflow-x-auto)

### `/academy/lv1`, `/academy/lv2`
- 비밀번호 입력 박스 모바일 깨짐 수정 (flex-col sm:flex-row 스택)

---

## 4. 디자인 시스템

- **Phase 0:** `--muted-foreground` oklch 0.65 → 0.85 (WCAG AAA 가독성)
- **Phase 7:** 모든 핵심 페이지 모바일 가로 오버플로우 0px, 폼·CTA 버튼 h-14 / 입력 필드 풀폭 검증 통과

---

## 5. 모바일 검증 결과 (iPhone 13 Pro 390×844)

| 페이지 | H1 폰트 | 가로 오버플로우 |
|---|---|---|
| / | 48px | 0px ✓ |
| /about | 35.2px | 0px ✓ |
| /portfolio | 36px | 0px ✓ |
| /contact | 36px | 0px ✓ |
| /renewal | 36px | 0px ✓ |
| /security | 48px | 0px ✓ |
| /chatbot | 36px | 0px ✓ (Phase 7 수정) |
| /app-dev | 36px | 0px ✓ |
| /pentest | 36px | 0px ✓ |
| /academy/lv1 | — | 0px ✓ (lv1 fix) |
| /academy/lv2 | — | 0px ✓ (lv2 fix) |

---

## 6. 커밋 (오늘 누적 — 시간순)

```
6a202c1 design(phase0): globals.css muted-foreground 0.65→0.85
f41fa00 feat(phase1): 헤더·푸터·SERVICES·메뉴 정리 + 신규/유지보수 리다이렉트
c944b4d feat(phase2): 메인 페이지 본문 재구성 — 홈페이지 회사 톤 → AI 도입 동반자
ee82a3b fix(home): 3가지 정정 — 강좌 링크 /academy + SERVICES 챗봇 추가 + Testimonials AI 사례
72e8e9f fix(home): SERVICES 05 챗봇 카드 마스코트 cat_svc_chatbot(없음)→cat_cheer 교체
1c2b4f2 feat(about): 소개 페이지 AI 도입 동반자 톤 + 팀·연혁·FAQ 재편 (Phase 3)
d8d8a4d fix(about): 하단 CTA 섹션도 AI 도입 톤으로 통일
6e3f625 feat(portfolio): 노멀한 정보형 레이아웃으로 재구성 — BEFORE/AFTER + 가짜 사례 제거 (Phase 4)
ca5d938 refactor(services): /maintenance·/new-website 통합/리다이렉트 (Phase 5)
27259b0 feat(menu+home): 보안 진단/모의해킹 분리 + 홈 SERVICES에 모의해킹 카드 추가 (Phase 5-4)
b0898a7 refactor(cta): 전 페이지 CTA·문의 어휘 통일 + 무료 진단 표현 제거 (Phase 6)
cad0b10 fix(contact): 서비스 옵션 정리 — 신규 사이트 구축·유지보수 제거 + 메뉴 순서 통일
1f13ba1 fix(mobile): 모바일 가로 오버플로우 + H1 글자 단위 줄바꿈 (Phase 7)
b65f3cd feat(home-hero): 회전 문구 단어 → 주어+동사 페어로 확장
270cec3 fix(home-hero): 회전 시 letterStates 인덱스 out-of-bounds 크래시
9770b4e fix(academy): lv1·lv2 비밀번호 입력 박스 모바일 깨짐
```

---

## 7. 미완료 / 후속 작업

- **Phase 7-5 Lighthouse 점수 측정** — 사령관님 별도 요청 시 진행
- **Phase 0-1 텍스트 가독성 grep 청소** — `text-muted-foreground` 51개 파일에서 `text-foreground/85` 등으로 점진 교체 (CSS 토큰 가독성은 이미 0.85로 상향 완료, 클래스 청소는 후속)
- **dept-ai 1편 자료 제작** — `/ai-solution/academy/dept-ai` 페이지는 라이브 중이지만 PPTX/PDF 다운로드 파일 미업로드 상태. 별도 세션에서 진행 (구 HANDOFF 문서 참고: `docs/handoffs/2026-06-05-dept-ai-materials.md`)
