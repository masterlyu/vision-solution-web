# VIS-308 Design Decisions — /portfolio 레이아웃 Mockup

> 크리에이티브 디렉터 작성 (Phase 1)
> CEO 게이트 #2 대기 중

---

## 섹션 구조 (7개)

| # | 섹션 | 목적 |
|---|------|------|
| 1 | Hero | 감성 공감 → 3초 내 인식 ("포트폴리오 맞다") |
| 2 | Stats 인포그래픽 | 수치 신뢰 형성 (CountUp) |
| 3 | Filter UI | 업종/서비스별 탐색 편의 |
| 4 | Case Cards | Before/After 슬라이더 + 결과 수치 시각화 |
| 5 | Mid CTA | 감정 고점에서 행동 유도 (CTA #2) |
| 6 | 프로세스 | 안심 → 절차 신뢰 |
| 7 | Final CTA + Form | 전환 (CTA #3) |

---

## 핵심 결정 사항

### 1. Hero — 고객 후기 인용 H1

**결정**: `"홈페이지 바꿨더니 문의가 3배 늘었어요"` 실제 후기 인용 형식.

**이유**:
- 사회적 증명을 H1에서 직접 사용 → 3초 내 신뢰
- "포트폴리오 사이트에 왜 왔나?" 목적 즉시 이해
- design_taste.md: 선명하고, 크고, 짧게 — 후기 인용 1문장으로 충분

### 2. Stats — 4개 핵심 수치 CountUp

**결정**: 완료 프로젝트 수 / 평균 문의 증가 / 고객 만족도 / 평균 납품 기간. 설명 없이 숫자+짧은 라벨만.

**이유**:
- VISIONC_PRINCIPLES.md: 인포그래픽 우선, 큰 숫자 + 짧은 라벨
- 4개 = 가장 중요한 의사결정 지표 (신뢰, 효과, 품질, 속도)

### 3. Filter UI — 업종 + 서비스 2행 구조

**결정**: 업종 필터(7개) + 서비스 필터(6개) 2행. 탭 스타일, active 상태 명시.

**이유**:
- 고객이 "내 업종 사례"를 빠르게 발견해야 공감 → 전환
- 2행으로 분리하면 각 행의 선택지가 7개 이내로 스캔 가능
- Tailwind 탭 패턴 — 구현 단순

### 4. Case Card — Before/After 슬라이더 + 3-cell 인포그래픽

**결정**:
- 카드 상단: B/A 슬라이더 (드래그 가능, 현재는 50% 고정으로 시각화)
- 카드 하단: 3-cell 결과 수치 (문의증가% / 납품기간 / 평점) + 1줄 고객 후기

**이유**:
- Before/After 슬라이더 = 포트폴리오 사이트 가장 강력한 시각화 패턴
- 3-cell 인포그래픽은 /security stats 패턴과 동일 → 일관성
- 고객 후기(1줄)는 신뢰 마감재 — 카드 당 1개로 충분

### 5. Mid CTA — 감정 고점 활용

**결정**: 케이스 카드 직후 배치. "내 사이트도 이렇게 바뀔 수 있을까요?" 공감형 헤드라인.

**이유**:
- VISIONC_PRINCIPLES.md: CTA 최소 3곳 (Hero + 중간 + 하단)
- 케이스 열람 직후 = 고객이 "나도 저렇게 되고 싶다" 느끼는 감정 최고점 → CTA 적기

### 6. 프로세스 — 5단계 스텝퍼, Lottie + 짧은 동사형 제목

**결정**: 5단계, 단계 번호 + Lottie 아이콘 56px + 짧은 동사형 제목 + 1줄 부제.

**이유**:
- 안심 섹션 목적: "전문 절차가 있구나" 파악 → 상세 불필요
- /security 프로세스 패턴 그대로 계승 — 팀 일관성
- 5단계 = 병원/식당/쇼핑몰 모두 공통 적용 가능한 일반화

### 7. Final Form — UrlAnalysisForm 컴포넌트 재사용

**결정**: 기존 UrlAnalysisForm 컴포넌트 그대로 사용. 위에 혜택 배지 4개만 추가.

**이유**:
- 기존 Form은 전환율 검증됨 → 변경 금지 (CLAUDE.md 원칙)
- 배지 4개 (무료/48시간/개인정보/체크리스트)로 마지막 저항감 제거

---

## 색상 선택 근거

- 배경: `oklch(0.08 0.01 270)` — 기존 visionc 다크 배경 유지
- Primary: `oklch(0.55 0.22 290)` — 기존 --primary (보라/파랑 계열), 신뢰·전문성
- 결과 수치: `oklch(0.55 0.22 145)` — 성장/긍정 (초록)
- 기간/평점: amber `oklch(0.75 0.18 80)` — 따뜻함/완성
- 배경 tint: oklch(0.11 0.01 270) — card bg

→ 색상 3개 이내 원칙 준수 (design_taste.md)

---

## 폰트

- Pretendard 유지 (기존 CDN preload)
- H1 weight: 900 (font-black)
- CountUp: 900, 2.5rem
- 본문: 없음 or muted 0.75~0.85rem

---

## Lottie placeholder 목록

| 위치 | 파일 | 상태 |
|------|------|------|
| Hero | portfolio-showcase.json | 신규 필요 |
| Mid CTA | sparkle-check.json | 재사용 가능 (기존 check.json) |
| Step 1 | url-scan.json | 재사용 가능 (/security scan.json) |
| Step 2 | meeting.json | 신규 필요 |
| Step 3 | design.json | 신규 필요 |
| Step 4 | coding.json | 신규 필요 |
| Step 5 | trophy.json | 신규 필요 |

**총 7개 Lottie** (기존 재사용 2 + 신규 5)

---

## CTA 배치 확인

| 위치 | 텍스트 | 섹션 |
|------|--------|------|
| CTA #1 (Hero) | 무료 진단 받기 → | 상단 |
| CTA #2 (Mid) | 무료 진단 시작하기 → | 케이스 카드 직후 |
| CTA #3 (Form) | 무료 진단 받기 → | 하단 Form |

→ VISIONC_PRINCIPLES.md CTA 3곳 기준 충족 ✓

---

## 텍스트 감축 목표

| 섹션 | 예상 줄 수 | 기준 |
|------|-----------|------|
| Hero | 4줄 | 후기 인용 H1 1줄 + sub 1줄 + CTA |
| Stats | 8줄 | 4 stat × (숫자+라벨+부제) |
| Filter | 2줄 | 탭 버튼만 |
| Case Card | 6줄/카드 | B/A + 3수치 + 후기 |
| Mid CTA | 3줄 | H2 + sub + btn |
| Process | 5줄 | 5스텝 × (제목+부제) |
| Final CTA | 4줄 | H2 + sub + 배지 + form |

---

## CEO 게이트 #2 체크리스트

- [x] mockup HTML 생성: `mockups/VIS-308-portfolio-mockup.html`
- [x] Before/After 슬라이더 UI 설계
- [x] 결과 수치 3-cell 인포그래픽
- [x] 업종/서비스 필터 UI
- [x] CTA 3곳: Hero + Mid + 하단 Form
- [x] Lottie placeholder 7개 명시
- [x] design-decisions.md 작성
- [x] 색상 3개 이내 원칙 준수
- [ ] CEO 게이트 #2 — 사령관님 직접 브라우저 확인 대기
