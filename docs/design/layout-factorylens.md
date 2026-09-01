# 레이아웃 명세 — `/factorylens` (FactoryLens 제품 페이지)

> VIS-5951 루틴 산출물 | AI 디자이너 작성 | 2026-09-01

---

## 0. 디자인 방향

- **분위기**: 산업 현장의 신뢰감 + 기술 정밀성 → "지금 돌아가는 화면을 그대로 보여준다"
- **색상**: `--primary` 중심, `--secondary` 배경 교차로 섹션 구분. 신규 색상 금지.
- **타이포**: H1 font-black (text-4xl~5xl), H2 font-black (text-3xl~4xl), 본문 text-muted-foreground
- **UI 원칙**: 카드 기반 단일 열·2열·3열 반응형. rounded-xl(12px). CTA 2개 이상 (라이브 데모 + 문의).
- **ScrollReveal**: Hero 이외 모든 섹션에 `<ScrollReveal>` 래퍼 적용 — 스크롤 등장 애니메이션.
- **모바일 퍼스트**: Hero 이미지는 모바일에서도 보임(이미지 비율 유지). 카드는 1열로 수직 스택.

---

## 1. 섹션 구조 (상단 → 하단)

| 순번 | 섹션 명 | 배경 | 레이아웃 유형 |
|------|---------|------|--------------|
| 1 | Hero | bg-background (primary/10 그라디언트 오버레이) | 2열 (텍스트 + 대시보드 스크린샷) |
| 2 | 문제 3연 | bg-secondary/40 | 3열 카드 그리드 |
| 3 | 제품 구조 | bg-background | 3열 카드 (→ 화살표 연결) |
| 4 | 7대 봇 | bg-secondary/30 | 2열(sm)→3열(lg) 카드 그리드 |
| 5 | 라이브 데모 | bg-background | 풀 폭 이미지 + 3개 수치 카드 + CTA |
| 6 | 신뢰/차별점 | bg-secondary/40 | 3열 카드 그리드 |
| 7 | 도입 과정 | bg-background | 2열(sm)→5열(lg) 스텝 카드 |
| 8 | FAQ | bg-secondary/30 | 단일 열 아코디언 |
| 9 | 최종 CTA | bg-background | 중앙 정렬 + 마스코트 + 버튼 2개 |

---

## 2. 섹션별 상세 명세

### Section 1 — Hero

```
레이아웃: 2열 lg 그리드 (텍스트 좌 | 이미지 우)
배경: bg-background + absolute 인셋 bg-gradient-to-br from-primary/10 via-background to-background
최대 폭: max-w-[1200px]
상하 패딩: pt-28 pb-20

[좌측 텍스트]
  - 배지(pill):
      아이콘: Database (w-3.5)
      텍스트: "표준 온톨로지 · 설명가능 AI (XAI)"
      스타일: bg-primary/15 border border-primary/30 text-primary text-xs font-bold px-4 py-1.5 rounded-full
  - H1:
      "뿔뿔이 흩어진 공장 데이터를,"
      "하나의 [지식 그래프]로"
      → [지식 그래프]: text-primary 강조
      폰트: text-4xl md:text-5xl font-black leading-tight
  - 서브텍스트 (text-muted-foreground text-lg):
      "MES·ERP·엑셀 — 형식이 달라도 표준 데이터 모델(온톨로지) 하나로 통합합니다."
      "[모든 판단에는 근거 그래프가 함께 따라옵니다.]" → bold text-foreground 강조
  - 보조 설명 (text-muted-foreground text-sm):
      "노코드 연결 · 국제표준(AAS·ISA-95) 호환 설계 · 연결까지 약 2주"
  - CTA 버튼 2개 (flex-col sm:flex-row gap-4):
      Primary: "라이브 데모 바로 보기 [ExternalLink]"
               → bg-primary text-primary-foreground rounded-xl px-8 py-4 font-bold
               → href: https://factorylens.visionc.co.kr (target=_blank)
      Secondary: "도입 문의 [ArrowRight]"
               → border border-foreground/20 text-foreground/70 rounded-xl px-8 py-4 font-medium
               → href: /contact

[우측 이미지]
  - Next/Image: /factorylens/factorylens-dashboard-viewport.png
  - 크기: 1280×720 (w-full h-auto)
  - 스타일: rounded-xl border border-border shadow-2xl shadow-primary/10
  - priority: true
```

---

### Section 2 — 문제 3연 (ScrollReveal)

```
배경: bg-secondary/40
패딩: py-16 px-6

[섹션 헤더]
  H2: "데이터가 아니라, [구조]가 문제입니다"
  → [구조]: text-primary, 나머지: text-foreground
  font-black text-3xl md:text-4xl, mb-12 text-center

[카드 × 3] — grid md:grid-cols-3 gap-6
  각 카드: bg-card border border-border rounded-xl p-6
    - 아이콘 컨테이너: w-11 h-11 rounded-xl bg-primary/10, mb-4
      → 아이콘: w-5 h-5 text-primary
    - H3: font-bold text-foreground mb-2
    - 설명: text-sm text-muted-foreground leading-relaxed

  항목:
    1. [Puzzle] "서로 다른 데이터 구조라 하나로 못 묶인다"
    2. [HelpCircle] "이상 신호의 근거를 추적할 방법이 없다"
    3. [Settings2] "판정 기준이 코드에 박혀 있어 못 고친다"
```

---

### Section 3 — 제품 구조 3열 (ScrollReveal)

```
배경: bg-background
패딩: py-20 px-6

[섹션 헤더]
  H2: "제품 구조" (font-black text-3xl md:text-4xl text-center mb-4)
  서브: "세 개의 층이 함께 작동해 어떤 시스템이든 표준 방식으로 다룹니다." (text-muted-foreground text-center mb-14)

[카드 × 3] — grid md:grid-cols-3 gap-6, max-w-5xl
  각 카드: bg-card border border-border rounded-xl p-6 (position: relative)
  → 카드 1·2 오른쪽 끝에 연결 화살표 (absolute top-10 -right-3 w-6 h-px bg-primary/40, hidden md:block)

  카드 구조:
    - 아이콘 원: w-10 h-10 rounded-full bg-primary/20 text-primary
      + 스텝 라벨: text-xs font-mono text-muted-foreground "STEP N"
    - H3: text-lg font-bold text-foreground mb-2
    - 설명: text-sm text-muted-foreground leading-relaxed

  항목:
    STEP 1: [Database] "표준 온톨로지"
    STEP 2: [Workflow] "노코드 매핑 엔진"
    STEP 3: [GitBranch] "그래프 탐색 + 룰 엔진"
```

---

### Section 4 — 7대 봇 (ScrollReveal)

```
배경: bg-secondary/30
패딩: py-20 px-6

[섹션 헤더]
  H2: "감지·예측 봇" (font-black text-3xl md:text-4xl text-center mb-4)
  서브: "표준 데이터 위에서 도메인별로 동작하는 결정론적 알고리즘입니다. ..." (text-muted-foreground text-center mb-14)

[카드 × 7] — grid sm:grid-cols-2 lg:grid-cols-3 gap-4, max-w-5xl
  각 카드: bg-card border border-border rounded-xl p-5
    - 헤더 행: flex items-center gap-2.5 mb-3
      → 아이콘 컨테이너: w-8 h-8 rounded-lg bg-primary/10, [아이콘] w-4 h-4 text-primary
      → H3: font-bold text-foreground text-sm
    - 설명: text-xs text-muted-foreground leading-relaxed

  봇 목록:
    [Wallet] 수금·출하 통제
    [SearchCode] 불량 역추적
    [Package] 적정재고
    [Gauge] 예지보전
    [Route] 납기·병목
    [Users] 공급사 평가
    [BookOpen] 지식 전수
```

---

### Section 5 — 라이브 데모 (ScrollReveal)

```
배경: bg-background
패딩: py-20 px-6

[섹션 헤더]
  H2: "말이 아니라, 지금 돌아가는 화면" (font-black text-3xl md:text-4xl text-center mb-4)
  서브: "아래는 라이브 데모의 실제 화면입니다. 표시된 수치는 데모 데이터 기준 실측값입니다." (text-muted-foreground text-center mb-10)

[대시보드 스크린샷]
  - Next/Image: /factorylens/factorylens-cash-detail.png
  - 크기: 1280×900 (w-full h-auto)
  - 스타일: rounded-xl border border-border shadow-xl mb-6

[수치 3개] — grid sm:grid-cols-3 gap-4 mb-8
  각 카드: bg-card border border-border rounded-xl p-5 text-center
    - 수치: text-2xl font-black text-primary mb-1
    - 라벨: text-xs text-muted-foreground
  
  수치:
    ₩10,000,000 / 오늘 출하 보류로 막은 금액
    21건 / 임계경로 계산 기준 납기 지연 위험
    19곳 / 이력 기반 정량 평가된 공급사

[CTA] — text-center
  "라이브 데모 직접 조작해보기 [ExternalLink]"
  → bg-primary text-primary-foreground rounded-xl px-8 py-4 font-bold
  → href: https://factorylens.visionc.co.kr (target=_blank)
```

---

### Section 6 — 신뢰/차별점 (ScrollReveal)

```
배경: bg-secondary/40
패딩: py-20 px-6

[섹션 헤더]
  H2: "판단을 믿을 수 있어야 씁니다" (font-black text-3xl md:text-4xl text-center mb-14)

[카드 × 3] — grid md:grid-cols-3 gap-6, max-w-5xl
  각 카드: bg-card border border-border rounded-xl p-6
    - 아이콘: w-11 h-11 rounded-xl bg-primary/10, [아이콘] w-5 h-5 text-primary, mb-4
    - H3: font-bold text-foreground mb-2
    - 설명: text-sm text-muted-foreground leading-relaxed

  항목:
    [Eye] "설명가능 AI (XAI)" — 근거 그래프 함께 제시
    [ShieldCheck] "Actions·Write-back" — 사람 승인 1단계
    [Lock] "기본값은 읽기전용" — 원본 시스템 안전
```

---

### Section 7 — 도입 과정 (ScrollReveal)

```
배경: bg-background
패딩: py-20 px-6

[섹션 헤더]
  H2: "연결까지 [약 2주]" → [약 2주]: text-primary
  font-black text-3xl md:text-4xl text-center mb-4
  서브: "가동 전, 과거 3개월 데이터로 먼저 재현해 효과를 숫자로 검증합니다(백테스팅)."
  text-muted-foreground text-sm text-center mb-14

[스텝 카드 × 5] — grid sm:grid-cols-2 lg:grid-cols-5 gap-4, max-w-4xl
  각 카드: bg-card border border-border rounded-xl p-5
    - 번호: text-primary/50 text-xs font-mono ("01" ~ "05")
    - H3: font-bold text-foreground text-sm mt-1 mb-2
    - 설명: text-xs text-muted-foreground leading-relaxed

  스텝:
    01. 템플릿 로드
    02. 연결·매핑
    03. 데이터 정합성 확인
    04. 룰 튜닝
    05. 백테스팅·가동

[하단 주석]
  "국제표준(AAS·ISA-95) 호환으로 설계되어, ..."
  text-center text-xs text-muted-foreground mt-8
```

---

### Section 8 — FAQ (ScrollReveal)

```
배경: bg-secondary/30
패딩: py-20 px-6

[섹션 헤더]
  H2: "자주 묻는 질문" (font-black text-2xl md:text-3xl text-center mb-10)

[아코디언 × 6] — space-y-3, max-w-2xl
  각 항목: bg-card border border-border rounded-xl overflow-hidden
    - 버튼 행: flex items-center justify-between px-5 py-4 text-left
      → 질문: text-sm font-semibold text-foreground pr-4
      → ChevronDown: w-4 h-4 text-muted-foreground, rotate-180 when open
    - 답변 영역: grid-rows 애니메이션 (0fr ↔ 1fr) duration-200
      → 내용: px-5 pb-5, text-sm text-muted-foreground leading-relaxed

  FAQ 항목:
    Q1. 온톨로지가 뭔가요?
    Q2. 우리 MES·ERP도 연결되나요?
    Q3. MES 없이 엑셀로 관리하는데도 가능한가요?
    Q4. AI가 왜 그렇게 판단했는지 알 수 있나요?
    Q5. 데이터 유출이 걱정됩니다.
    Q6. 도입 비용과 기간은 어떻게 되나요?
```

---

### Section 9 — 최종 CTA (ScrollReveal)

```
배경: bg-background
패딩: py-24 px-6

[마스코트]
  pose="cheer" category="emotion" size="sm" h-28
  bubble: "근거 그래프까지 함께 보여드려요" (bubbleDir="left")
  mb-6 flex justify-center

[헤드라인]
  H2: "지금 데이터가 어떻게 연결되는지"
      "[직접 확인해보세요]" → text-primary
  font-black text-3xl md:text-4xl text-center mb-4

[서브텍스트]
  "라이브 데모는 가입 없이 바로 열람 가능합니다."
  "도입 규모·비용은 상담을 통해 협의로 안내드립니다."
  text-muted-foreground text-center mb-8

[CTA 버튼 2개] — flex-col sm:flex-row gap-4 justify-center
  Primary: "라이브 데모 바로 보기 [ExternalLink]"
           → bg-primary text-primary-foreground rounded-xl px-10 py-4 font-bold
           → href: https://factorylens.visionc.co.kr (target=_blank)
  Secondary: "도입 문의 [ArrowRight]"
           → border border-foreground/20 text-foreground/70 rounded-xl px-8 py-4 font-medium
           → href: /contact
```

---

## 3. 공통 컴포넌트 규칙

| 컴포넌트 | 규격 |
|---------|------|
| CTA 버튼 (primary) | bg-primary / text-primary-foreground / px-8 py-4 / rounded-xl / font-bold |
| CTA 버튼 (secondary) | border border-foreground/20 / text-foreground/70 / px-8 py-4 / rounded-xl / font-medium |
| 섹션 카드 | bg-card / border border-border / rounded-xl / p-5~6 |
| 아이콘 컨테이너 (대) | w-11 h-11 rounded-xl bg-primary/10 |
| 아이콘 컨테이너 (소) | w-8 h-8 rounded-lg bg-primary/10 |
| 배지(pill) | bg-primary/15 border-primary/30 text-primary text-xs font-bold px-4 py-1.5 rounded-full |
| 섹션 패딩 | py-16~20 px-6 |
| 최대 폭 | max-w-4xl (중간 섹션) / max-w-5xl (넓은 카드) / max-w-[1200px] (Hero) |

---

## 4. 모바일 반응형 규칙

| 섹션 | 데스크탑 | 태블릿 (sm) | 모바일 |
|------|---------|-------------|--------|
| Hero | 2열 (텍스트 + 이미지) | 1열 (이미지 하단) | 1열 스택 |
| 문제 | 3열 | 2열 | 1열 |
| 제품 구조 | 3열 + 연결선 | 2열 | 1열 |
| 봇 | 3열 (lg) | 2열 (sm) | 1열 |
| 라이브 데모 수치 | 3열 | 3열 | 2열 |
| 도입 과정 | 5열 (lg) | 2열 (sm) | 1열 |
| FAQ | 단일 열 | 동일 | 동일 |

---

## 5. ScrollReveal 적용 범위

| 섹션 | ScrollReveal |
|------|-------------|
| Hero | ✗ (즉시 표시) |
| 문제 3연 | ✓ |
| 제품 구조 | ✓ |
| 7대 봇 | ✓ |
| 라이브 데모 | ✓ |
| 신뢰/차별점 | ✓ |
| 도입 과정 | ✓ |
| FAQ | ✓ |
| 최종 CTA | ✓ |

---

*저장 위치: `~/company/website/docs/design/layout-factorylens.md`*
