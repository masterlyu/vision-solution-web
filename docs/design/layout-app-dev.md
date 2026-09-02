# 레이아웃 명세 — `/app-dev` (앱·시스템 개발)

> 마지막 갱신: 2026-09-02 | AI 디자이너 재작성 (VIS-6012)
> 이전 명세(VIS-196, 2026-04-17)는 현행 구현과 세부사항이 달라 전면 재작성.

---

## 0. 디자인 방향

- **분위기**: 좌절감(엑셀 한계·카오스) → 통제감(체계적 시스템·스프린트 개발)
- **색상**: `--primary` 중심, `--destructive` Hero H1 강조, `--accent-red` 비포/애프터 이전 블록
- **특징**: 이전/이후 3열 비교 행 + 스텝별 마스코트로 친근한 기술 브리핑 분위기
- **마스코트**: Hero 우측에 `svc_custom/service` + `AppDevHeroIllust` SVG 인라인 조합. 프로세스 각 스텝 왼쪽에 단계별 포즈 마스코트. Bottom CTA에 `cheer/emotion` + 말풍선.

---

## 1. 섹션 구조

| 순번 | 섹션명 | 레이아웃 유형 | 배경 |
|------|--------|--------------|------|
| 1 | Hero | 2열 (텍스트 + 마스코트·SVG) | background |
| 2 | 공감 체크리스트 | 2열 카드 + 결론 배너 | secondary |
| 3 | 수치 근거 | 4열 빅 넘버 (2열 모바일) | card |
| 4 | Before / After | 3열 행 나열 | background |
| 5 | 개발 프로세스 | 수직 스텝 + 마스코트 | secondary |
| 6 | 가격표 | 4열 (2열 모바일) | background |
| 7 | FAQ | 아코디언 단일 열 | secondary |
| 8 | Bottom CTA | 중앙 정렬 + 마스코트·말풍선 | primary gradient |

---

## 2. 섹션별 상세 명세

### Section 1 — Hero

```
레이아웃: 2열 (lg:grid-cols-2, gap-12)
배경: bg-background
패딩: pt-28 pb-20 px-6

[좌측]
  - 배지: "앱·시스템 개발"
    → bg-primary/10 border border-primary/30 text-primary text-xs font-bold, rounded-full
  - H1 (2줄): "엑셀로 더 이상\n버틸 수 없는 순간이 있습니다"
    → text-4xl md:text-5xl / font-black / leading-tight
    → "버틸 수 없는 순간" → text-destructive 강조
  - 본문 (3줄):
      "직원 10명이 같은 파일을 열었다가 덮어쓰고,
       '앱으로 만들면 좋겠다'고 생각한 지 1년이 넘었다면—
       지금이 바로 그 순간입니다."
    → text-muted-foreground text-lg leading-relaxed
  - CTA: "도입 상담 신청 →"
    → Briefcase + ArrowRight 아이콘 / bg-primary / rounded-xl / px-8 py-4 font-semibold
    → 링크: /contact

[우측 (hidden lg:flex, flex-col gap-6)]
  - <Mascot pose="svc_custom" category="service" size="md" h-48 />
  - <AppDevHeroIllust /> — 인라인 SVG 컴포넌트 (laptop + phone mock-up)
    SVG 내용:
      - 노트북 (180×120, background-deep fill, primary 테두리)
        - 맥OS 신호등 3개 (macos-red/yellow/green)
        - 코드 라인 시뮬레이션 (primary/primary-light 불투명도 조합 rect)
      - 폰 (46×78, background-deep fill)
        - 앱 화면 시뮬레이션 (primary 라인)
      - 스파클 ✦ 2개 (text, primary)
    - 우하단 절대 위치: <Mascot pose="guide" category="situation" size="sm" bubble="앱도 시스템도!" bubbleDir="left" />
  - 모바일: 숨김
```

---

### Section 2 — 공감 체크리스트

```
레이아웃: 2열 카드 (sm:grid-cols-2, gap-4)
배경: bg-secondary
패딩: py-20 px-6

[H2] "혹시 이런 상황이세요?"
  → text-2xl md:text-3xl / font-bold / text-center / mb-10

[카드 × 6] bg-card rounded-xl shadow-sm p-5 flex items-start gap-3
  아이콘: CheckSquare w-5 h-5 text-muted-foreground
  텍스트: text-foreground font-medium text-sm

  1. "재고·주문·고객 데이터를 아직도 엑셀로 관리한다"
  2. "직원이 늘었는데 업무 공유 방식이 카카오톡과 엑셀 파일뿐이다"
  3. "모바일 앱을 만들고 싶은데 어디에 얼마를 써야 하는지 모른다"
  4. "기존 시스템이 너무 오래돼서 직원들이 불편해하는데 바꾸기 무섭다"
  5. "외주 개발을 한 번 했다가 완성 후 연락이 끊겨서 고생한 적 있다"
  6. "특정 기능이 필요한데 시중 솔루션에는 없어서 직접 만들어야 할 것 같다"

[결론 배너] border-l-4 border-primary bg-card px-6 py-4 rounded-r-xl
  "2개 이상 해당된다면, 맞춤 개발이 장기적으로 더 저렴합니다."
  → text-foreground font-semibold
```

---

### Section 3 — 수치 근거

```
레이아웃: 2열 (grid-cols-2) md:4열 (md:grid-cols-4), gap-6
배경: bg-card
패딩: py-20 px-6

[타일 × 4] text-center p-6
  - 수치: text-4xl font-black text-primary mb-2
  - 설명: text-muted-foreground text-sm leading-snug

  43% / 맞춤 시스템 도입 후 업무 처리 시간 단축
  72% / 수작업 오류 발생률 감소
  38% / 모바일 앱 도입 후 고객 재방문율 증가
  92% / 스프린트 개발 일정 준수율 (자사 기준)
```

---

### Section 4 — Before / After (이렇게 달라집니다)

```
레이아웃: 수직 행 나열 (space-y-4), 각 행 = 3열 grid [auto_1fr_1fr]
배경: bg-background
패딩: py-20 px-6

[H2] "이렇게 달라집니다"
  → text-2xl font-bold / mb-10

[행 × 4]
  열 1 (auto): 태그 pill — bg-primary/10 text-primary text-xs font-bold rounded-full px-3 py-1
  열 2 (1fr): 이전 블록 — bg-accent-red/10 border border-accent-red/30 rounded-xl px-4 py-3 text-accent-red text-sm
  열 3 (1fr): 이후 블록 — bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-primary text-sm font-semibold

  행 1: 모바일 앱 / "앱이 없어서 고객이 불편해한다" / "iOS·Android 동시 출시, 재방문율 상승"
  행 2: 사내 시스템 / "엑셀 파일이 10개, 담당자만 알고 있다" / "전 직원 실시간 공유, 오류 70% 감소"
  행 3: API·백엔드 / "외부 서비스와 연동이 안 돼서 수작업" / "자동 데이터 연동, 사람 손 필요 없음"
  행 4: 레거시 전환 / "수정도 못 하는 낡은 시스템" / "단계적 이전, 기존 데이터 보전 100%"
```

---

### Section 5 — 개발 프로세스

```
레이아웃: 수직 스텝 나열 (space-y-4), 각 스텝 = flex gap-4
배경: bg-secondary
패딩: py-20 px-6

[H2] "개발 프로세스"
  → text-2xl font-bold / mb-10

[스텝 × 4]
  구조:
    - 좌측 (sm 이상): w-20 마스코트 영역 (hidden sm:flex)
    - 번호 원: w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-black
    - 내용 카드: bg-card rounded-xl p-5 flex-1
      - 제목 + 기간 pill (bg-primary/10 text-primary text-xs rounded-full)
      - 설명: text-muted-foreground text-sm

  STEP 01 — 요구사항 분석 (1~3일)
    마스코트: pose="thinking" category="emotion"
    "기능 목록, 사용자 흐름, 데이터 구조 정의."

  STEP 02 — 아키텍처 설계 (1주)
    마스코트: pose="education" category="process"
    "기술 스택 선정, DB 설계, API 명세서 작성. 착수 전 전체 설계 공개."

  STEP 03 — 스프린트 개발 (4~12주)
    마스코트: pose="develop" category="process"
    "2주 단위 스프린트. 중간 시연으로 방향 확인 후 진행."

  STEP 04 — 배포·인수인계 (1주)
    마스코트: pose="cheer" category="emotion"
    "스테이징 검증 → 프로덕션 배포 → 운영 가이드 제공."

[하단 주석] "전체 기간: 평균 6~16주 / 매주 진행 보고"
  → text-muted-foreground text-sm text-right mt-4
```

---

### Section 6 — 가격표

```
레이아웃: 2열 (grid-cols-2) md:4열 (md:grid-cols-4), gap-4
배경: bg-background
패딩: py-20 px-6

[H2] "기본형 300만원대부터 시작합니다"
  → text-2xl font-bold / mb-2
[부제] "'이 정도 기능이면 얼마나 나올까요?' — 상담에서 솔직하게 말씀드립니다."
  → text-muted-foreground / mb-10

[카드 × 4] rounded-xl p-6 border-2
  공통 구조: 제목(text-sm font-bold) + 가격(text-xl font-black) + 항목 목록(text-xs)

  카드 1 — 랜딩·웹뷰 앱 / 200만원대~
    항목: 웹사이트 + 앱 래핑
    강조: 없음 (border-border)

  카드 2 — 사내 관리 시스템 / 300만원대~
    항목: 맞춤 기능 / 관리자 페이지
    강조: 없음 (border-border)

  카드 3 — 모바일 앱 / 500만원대~ ★추천
    항목: iOS·Android / 크로스플랫폼 / 백엔드
    강조: border-primary bg-primary/5 / "-top-3 left-1/2 -translate-x-1/2" 위치에 "추천" pill
    가격: text-primary

  카드 4 — 풀스택 플랫폼 / 1,000만원대~
    항목: 회원 시스템 / 결제 / 대시보드
    강조: 없음 (border-border)

[하단 CTA] "요구사항 공유하고 견적받기 →" (ArrowRight)
  → bg-primary / text-primary-foreground / font-semibold / px-8 py-4 / rounded-xl
  → text-center
```

---

### Section 7 — FAQ

```
레이아웃: 아코디언 단일 열 (max-w-3xl)
배경: bg-secondary
패딩: py-20 px-6

[H2] "자주 묻는 질문"
  → text-2xl font-bold / text-center / mb-10

[아코디언] bg-card rounded-xl border border-border (얇은 단선)
  - 열기/닫기: ChevronDown / ChevronUp
  - 내용: border-t border-border pt-4 pb-5 text-muted-foreground text-sm leading-relaxed

데이터 원천: src/app/app-dev/faqs.ts

항목 × 6:
  Q1. 아직 아이디어 단계인데 상담해도 되나요?
  Q2. 개발 중에 기능을 바꿀 수 있나요?
  Q3. 완성 후 소스 코드를 받을 수 있나요?
  Q4. 완성 후 유지보수는 어떻게 되나요?
  Q5. 개발 진행 상황을 어떻게 확인할 수 있나요?
  Q6. 비슷한 업종의 개발 경험이 있나요?
```

---

### Section 8 — Bottom CTA

```
레이아웃: 중앙 정렬 (max-w-2xl)
배경: linear-gradient(135deg, primary, color-mix(primary 80% + black))
패딩: py-24 px-6

- 마스코트 영역 (flex justify-center mb-6):
    <Mascot pose="cheer" category="emotion" size="sm" h-28 />
    + 말풍선 (absolute, -top-2, 카드 배경): "모바일부터 사내 시스템까지 다 만들어드려요!"
      삼각형 꼬리: border-t-card 방향 아래

- H2: "어떤 시스템이 필요한지, 지금 말씀해주세요"
  → text-3xl md:text-4xl / font-black / text-primary-foreground / mb-4

- 부제: "아이디어 단계부터 기술 검토를 함께 합니다."
  → text-primary-foreground/80 text-lg mb-2

- 보조: "상담 후 24시간 내에 기술 검토 결과를 드립니다."
  → text-primary-foreground/60 text-sm mb-8

- CTA: "무료 기술 검토 신청하기 →" → /contact
  → bg-card hover:bg-secondary / text-primary / font-bold / px-10 py-4 / rounded-xl text-lg
```

---

## 3. 데이터 파일 위치

| 데이터 | 파일 |
|--------|------|
| 체크리스트 항목 | `page.tsx` const `checklistItems` |
| 수치 타일 | `page.tsx` const `stats` |
| 비포/애프터 | `page.tsx` const `comparisons` |
| 프로세스 스텝 | `page.tsx` const `steps` |
| 가격 플랜 | `page.tsx` const `plans` |
| FAQ | `src/app/app-dev/faqs.ts` |

---

## 4. 주요 컴포넌트

| 컴포넌트 | 사용 위치 | 설명 |
|---------|----------|------|
| `<Mascot>` | Hero, 프로세스 각 스텝, Bottom CTA | 포즈·카테고리로 상황별 마스코트 |
| `<AppDevHeroIllust>` | Hero 우측 | 인라인 SVG — 노트북+폰 목업 |
| `<Link>` | CTA 버튼 | Next.js 라우팅 |

---

*저장 위치: `docs/design/layout-app-dev.md`*
