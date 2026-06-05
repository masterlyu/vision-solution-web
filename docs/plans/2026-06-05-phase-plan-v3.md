# visionc.co.kr 단계별 실행 계획 v3

**작성일:** 2026-06-05
**범위:** 메인·소개·포트폴리오·서비스 페이지·헤더·푸터·공통 CSS·CTA 통일·모바일
**원칙:**
1. **흐린 글자 0** — globals.css·tokens·컴포넌트 전수 점검
2. **CTA·문의 어휘 통일** — 모든 페이지 동일 표현
3. **일관된 사이즈·디자인** — /ai-solution 기준
4. **단계별 분리 배포** — Phase 0~7, 각 Phase별 commit + Vercel 확인

---

## 🎨 Phase 0 — 공통 디자인 시스템 (선행, 모든 페이지 영향)

### 0-1. globals.css 토큰 점검

**현재 문제:** `--muted-foreground` 값이 너무 흐림 → 모든 컴포넌트가 회색 글자 사용

**조치:**
```css
/* globals.css 색 토큰 조정 */
:root {
  /* 기존 */
  --muted-foreground: oklch(...회색...);

  /* 변경 — 더 진하게 */
  --muted-foreground: oklch(0.78 0.01 240);  /* 회색 → 진한 회색 */

  /* 또는 폐기하고 직접 사용 금지 정책 */
}
```

**대안 (더 안전):** `--muted-foreground` 값은 그대로 두되, 페이지·컴포넌트에서 사용 금지. 대신 `text-foreground/85` `text-foreground/90` `text-foreground/75` 3단계만 사용.

### 0-2. 디자인 토큰 표준화 — "절대 흐림 0" 정책

| 용도 | 변경 전 (회색 흐림) | 변경 후 (진한 톤) |
|------|--------------------|--------------------|
| 본문 (1차) | `text-foreground` | `text-foreground` (유지) |
| 본문 (2차) | `text-muted-foreground` | **`text-foreground/85 font-medium`** |
| 본문 (3차) | `text-muted-foreground text-sm` | **`text-foreground/75 font-medium`** |
| 메타·캡션 | `text-xs text-muted-foreground` | **`text-sm text-foreground/85 font-mono`** |
| 링크 비강조 | `text-muted-foreground` | **`text-foreground hover:text-primary`** |
| 비활성 | `text-muted-foreground` | **`text-foreground/50`** (의도적 비활성만) |

### 0-3. 폰트 사이즈·위계 표준화

| 요소 | 표준 클래스 | 비고 |
|------|-----------|------|
| 페이지 H1 | `text-4xl md:text-5xl lg:text-6xl font-black tracking-tight` | 모바일 작게 |
| 섹션 H2 | `text-3xl md:text-4xl font-black tracking-tight` | |
| 카드 제목 H3 | `text-xl font-black tracking-tight` | |
| 본문 (강조) | `text-lg text-foreground font-medium` | Hero 부제 |
| 본문 (기본) | `text-base text-foreground/90 font-medium leading-relaxed` | |
| 본문 (보조) | `text-sm text-foreground/85 font-medium` | |
| 메타칩 | `text-sm font-mono font-bold` | bg-primary/20 text-primary 등 |

### 0-4. CTA·문의 어휘 통일 (★ 사령관님 요청)

**원칙: 모든 페이지 동일 표현**

| 위치 | 통일 어휘 | 변경 전 (혼재) |
|------|----------|--------------|
| **메인 CTA** | "💼 도입 상담 신청" | 무료 진단 / 무료 상담 / 무료 도입 분석 / 견적 받기 |
| **부 CTA (학습)** | "🎓 사내 출강 강좌 보기" | 강좌 둘러보기 / 자료 보기 |
| **부 CTA (사례)** | "📂 사례 보기" | 포트폴리오 / 사례 / Case Studies |
| **헤더 우상단 버튼** | "💼 도입 상담" | 무료 진단 받기 |
| **푸터 CTA** | "💼 도입 상담 신청 →" | 무료 상담 신청하기 → |
| **연락처 표현** | "biztalktome@gmail.com" | 동일 유지 |
| **링크** | 모든 CTA → `/contact` | 일부 /renewal 섞임 |

**금지 어휘 (전면 삭제):**
- "무료 진단" (헤더 메뉴 포함)
- "무료 AI 진단"
- "무료 도입 분석"
- "URL 입력 무료 진단"
- "48시간 안에..."
- "신용카드 불필요"

### 0-5. 헤더 NAV 정리

**현재 (8개):** VISIONC / 서비스 / 소개 / 포트폴리오 / 블로그 / **무료 진단**

**변경 (5개):**
- 로고 VISIONC
- 서비스 (드롭다운 4개: AI 도입 / 보안 / 웹사이트 / 앱)
- 소개
- 포트폴리오
- 블로그
- (우상단 버튼) **"💼 도입 상담"** → /contact

→ "무료 진단" 메뉴 자체 제거. CTA 버튼만 우상단에 1개로 통일.

---

## 📋 Phase 1 — 헤더·푸터·서비스 메뉴 정리 (메뉴 전체 일괄)

### 1-1. 헤더 변경 (Header.tsx + landing/navigation.tsx)
- NAV 5개로: 서비스(드롭다운) / 소개 / 포트폴리오 / 블로그
- 우상단 버튼: "💼 도입 상담" → /contact (기존 "무료 진단 받기" 변경)
- 모바일 햄버거: 동일 5개 + 큰 CTA 버튼

### 1-2. 푸터 변경 (Footer.tsx + landing/footer-section.tsx)
- 서비스 4개:
  - 기업 AI 도입 및 컨설팅 (최상단)
  - 웹 보안 진단·모의해킹
  - 웹사이트 리뉴얼·운영
  - 앱·시스템 개발
- 소개 문구: "URL 하나로 홈페이지 문제를 AI가 진단합니다..." → **"중소기업 AI 도입 동반자. 컨설팅·구축·교육을 한 곳에서."**
- 푸터 CTA: "무료 상담 신청하기 →" → **"💼 도입 상담 신청 →"**

### 1-3. 홈 SERVICES 카드 (features-section.tsx)
- 6개 → 4개로 재정렬
- 01 = AI 도입 (메인 카드 — 크기·강조 다르게)
- 02 = 보안
- 03 = 웹사이트
- 04 = 앱

### 1-4. 서비스 페이지 통합·삭제
- `/new-website` → 301 → `/renewal`
- `/maintenance` → 301 → `/renewal`
- `/pentest` → 유지하되 메뉴에서 빼고 `/security`에서 링크
- `next.config.ts`에 redirects 추가

### 1-5. llms.txt 데이터
- `content/company/services.json` 6 → 4 항목
- AI 도입 최상단

### Phase 1 commit
`refactor(menu): 서비스 4개 재정렬 + 무료 진단 메뉴 제거 + CTA "도입 상담" 통일`

---

## 🏠 Phase 2 — 메인 페이지 재구성

### 2-1. Hero (hero-section.tsx)
- H1: **"중소기업 AI 도입, 어디부터 시작할지 모르겠다면"**
- 부제: 진단·구축·교육·운영까지 한 곳에서
- CTA-A: 💼 도입 상담 신청 → /contact
- CTA-B: 🎓 사내 출강 강좌 보기 → /ai-solution/academy/dept-ai
- 신뢰 칩: 247건+ · 재의뢰 97%

### 2-2. SERVICES (features-section.tsx)
- 4개 카드 + 01번(AI)이 크게 강조

### 2-3. Process (how-it-works-section.tsx)
- URL 진단 5단계 폐기
- AI 도입 컨설팅 4단계: ① 도입 상담 → ② 솔루션 설계 → ③ 구축·학습 → ④ 인수·운영

### 2-4. Metrics (metrics-section.tsx)
- "0건+" 카운터 버그 수정
- 실제 KPI: 247 / 97% / 4.9 / 30일 등

### 2-5. Testimonials (testimonials-section.tsx)
- AI 후기 4건 추가 (Course 01 강좌 사례 가공)
- 웹/앱 후기 2건만 유지

### 2-6. CTA (cta-section.tsx)
- "48시간 안에 답이 옵니다" → "**지금 시작하세요**"
- 무료 진단 표현 모두 제거

### Phase 2 commit
`feat(home): 홈페이지 AI 도입 동반자 톤으로 전면 재구성`

---

## 👥 Phase 3 — 소개 페이지 (/about)

### 3-1. Hero 교체
- "홈페이지 업체 연락 두절" → **"AI 도입, 막막한 중소기업의 동반자"**

### 3-2. 미션·비전 재작성
- 미션: "중소기업이 AI를 안전하게 도입·운영하도록 동반"
- 비전: "대한민국 중소기업 10만 곳의 AI 도입 동반자"

### 3-3. 팀 소개 (6영역 → 6영역 재정렬)
- 01 AI 컨설팅 (★ 신규 영역 1)
- 02 AI 구축 (★ 신규 영역 2)
- 03 사내 출강 강좌
- 04 보안
- 05 웹·앱 개발
- 06 사후 관리

### 3-4. 연혁 강화
- 2007~2022 기존 유지 (그룹웨어·웹·ERP)
- 2023 AI 챗봇 도입
- 2025 AI 솔루션·홈페이지 진단 확장
- **2026 visionc Enterprise Academy 출범 — Course 01 (15강) 공개·사내 출강 시작**

### 3-5. FAQ 추가 (AI 4개)
- 컨설팅 비용은?
- IT 전담 없어도 가능?
- 데이터 유출 우려는?
- 사내 출강 강좌는 무엇?

### 3-6. Metrics 버그 수정
- 247건+ / 97% / 4.9 / 정확한 수치 표시

### Phase 3 commit
`feat(about): 소개 페이지 AI 도입 동반자 톤 + 팀·연혁·FAQ 재편`

---

## 🎯 Phase 4 — 포트폴리오 (/portfolio)

### 4-1. Hero 교체
- "홈페이지 바꿨더니 문의 3배" → **"AI 도입 후 시간 35% · 비용 42% 절감"**

### 4-2. 사례 8건 재구성 (AI 우선)
- 1. 제조사 30명 — CS 자동화 (85% 자동, 인건비 -180만/월)
- 2. 온라인몰 — 콘텐츠 생성 (CTR +18%)
- 3. 서비스업 — 자동 리포트 (PM 시간 +7.5h/주)
- 4. 소매업 — 실시간 대시보드
- 5. 음식점·카페 — 웹 리뉴얼 (예약 +240%)
- 6. 병원 — 신규 사이트 (신규 상담 +180%)
- 7. 쇼핑몰 — AI 챗봇 (주문 +320%)
- 8. 인테리어 — 앱 자동화 (전화 80% 감소)

### 4-3. 필터 순서
- 서비스: AI 도입 / 웹사이트 / 보안 / 앱

### 4-4. Process 재정의
- URL 진단 5단계 폐기
- AI 도입 4단계 (메인과 통일)

### 4-5. Metrics 버그 수정

### 4-6. BEFORE/AFTER 처리
- 스크린샷 미완성 → **KPI 표 (시간·비용·만족도 수치)**로 대체

### Phase 4 commit
`feat(portfolio): 포트폴리오 AI 사례 우선 + BEFORE/AFTER → KPI 표`

---

## 🔧 Phase 5 — 서비스 페이지 통합·정리

### 5-1. /renewal 통합 (리뉴얼 + 유지보수)
- 기존 /renewal 콘텐츠 + 유지보수 섹션 흡수
- /renewal#maintenance 앵커 추가

### 5-2. /maintenance 리다이렉트
- next.config.ts: `{ source: '/maintenance', destination: '/renewal#maintenance', permanent: true }`

### 5-3. /new-website 제거
- 디렉토리 삭제
- next.config.ts: `{ source: '/new-website', destination: '/renewal', permanent: true }`

### 5-4. /security에 /pentest 링크 (사령관님 결정 따라)

### Phase 5 commit
`refactor(services): /maintenance·/new-website 통합/리다이렉트`

---

## 💬 Phase 6 — CTA·문의 통일 + /contact 점검

### 6-1. /contact 페이지 검토
- 폼 입력 필드 점검 (이름·이메일·회사·문의 내용)
- 무료 진단·48시간 표현 제거
- "도입 상담 신청 폼"으로 재정의

### 6-2. 모든 페이지 CTA 어휘·링크 통일
- 위 §0-4 어휘로 일괄 교체
- 검증: grep으로 "무료 진단" "48시간" 0개 확인

### 6-3. Footer CTA 일관성
- "무료 진단 시작하기" → "도입 상담 신청"
- "biztalktome@gmail.com" 클릭 시 mailto: 자동

### Phase 6 commit
`refactor(cta): 전 페이지 CTA·문의 어휘 통일 + 무료 진단 표현 제거`

---

## 📱 Phase 7 — 모바일·반응형·디자인 검증

### 7-1. 모바일 햄버거 메뉴
- 메뉴 5개 (서비스 드롭다운 + 소개·포트폴리오·블로그)
- 폰트 16px+
- 탭 타겟 ≥ 44×44px
- CTA 큰 버튼 1개

### 7-2. 모바일 Hero
- H1 자동 축소 (`text-4xl md:text-6xl`)
- 마스코트 모바일 hide
- CTA full width

### 7-3. 모바일 카드 그리드
- 1열 → 2열 → 4열 자동
- 카드 텍스트 줄바꿈 자연스럽게

### 7-4. 모바일 폼
- 입력 필드 48px
- 키보드 표시 시 폼 scroll into view

### 7-5. Lighthouse 검증
- Performance ≥ 90
- Accessibility ≥ 95
- 색 대비 WCAG AA 통과

### 7-6. 흐린 글자 grep 검증
```bash
grep -rn "text-muted-foreground" src/ | wc -l   # 목표: 0 또는 최소
```

### Phase 7 commit
`fix(mobile): 모바일 햄버거·Hero·CTA·폼 + 흐린 글자 전수 제거`

---

## 📊 단계별 진행 시간 추정

| Phase | 작업 | 소요 |
|-------|------|------|
| Phase 0 | 공통 디자인 시스템 (선행) | 30분 |
| Phase 1 | 헤더·푸터·서비스 메뉴 | 30분 |
| Phase 2 | 메인 페이지 | 45분 |
| Phase 3 | 소개 페이지 | 30분 |
| Phase 4 | 포트폴리오 | 30분 |
| Phase 5 | /renewal 통합 | 20분 |
| Phase 6 | CTA 통일 + /contact | 20분 |
| Phase 7 | 모바일·검증 | 30분 |
| **합계** | | **약 4시간** |

---

## ✅ 사령관님 확정 — Q1~Q4

**Q1.** 단계별 commit 분리 (Phase 7개) OK?

**Q2.** 헤더 우상단 버튼:
- A. "💼 도입 상담" (CTA 명확)
- B. "🎓 사내 출강 강좌" (학습 우선)
- C. "💼 도입 상담" + "🎓 강좌" 둘 다 (모바일에서 좁아질 수 있음)

**Q3.** Phase 7 (모바일·검증) Lighthouse 점수 목표:
- A. Performance 90+, Accessibility 95+ (현재 권장)
- B. 90+ / 90+ (완화)
- C. 점수 신경 안 쓰고 시각 검증만

**Q4.** 진행 방식:
- A. Phase 0~7 순차 진행 (4시간, 단계별 확인)
- B. Phase 0~2 먼저 (디자인 시스템 + 메뉴 + 메인 — 2시간), 확인 후 나머지
- C. 사령관님이 일부 페이지만 우선 진행 (선택)

답변 주시면 즉시 Phase 0 (공통 디자인 시스템 점검)부터 들어갑니다.
