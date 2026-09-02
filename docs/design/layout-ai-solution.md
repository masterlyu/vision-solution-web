# 레이아웃 명세 — `/ai-solution` (AI 솔루션)

> 마지막 갱신: 2026-09-02 | AI 디자이너 재작성 (VIS-6012)
> 이전 명세(VIS-196, 2026-04-17)는 현행 구현과 크게 달라 전면 재작성.

---

## 0. 디자인 방향

- **분위기**: 중소기업 의사결정자의 3가지 도입 고민(WHY·WHAT·HOW) → 해결 경로 제시
- **색상**: `--primary` 중심, `--accent-cyan-text` 라벨용 단조 악센트, `--accent-red` 도입 전 강조
- **특징**: 문제→해결→증거→우려해소 흐름. 카드 그리드가 아닌 섹션 단위 서사 구조
- **마스코트**: Hero·Bottom CTA에 `<Mascot>` 컴포넌트 배치 (Hero: develop/process, CTA: cheer/emotion)

---

## 1. 섹션 구조

| 순번 | 섹션명 | 레이아웃 유형 | 배경 |
|------|--------|--------------|------|
| 1 | Hero | 2열 (텍스트 + 마스코트) | background + radial gradient (primary 22%) |
| 2 | 제조업 교차 유도 배너 | 가로 양끝 정렬 | secondary/40 |
| 3 | Problem — AI 도입 막히는 3가지 | 3열 카드 (WHY·WHAT·HOW) | background |
| 4 | Solution — VISIONC 3-스택 | 3열 카드 (A·B·C, B 강조) | secondary |
| 5 | Proof — 실제 도입 결과 | 2열 사례 카드 + 4열 KPI | background |
| 6 | Safety — 5가지 우려 | 수직 리스트 (아이콘+Q&A) | secondary |
| 7 | Academy — 사내 출강 강좌 | 2열 카드 (course 01·02) | background |
| 8 | FAQ | 아코디언 단일 열 | secondary |
| 9 | Bottom CTA | 중앙 정렬 + 마스코트 | background + radial gradient |

---

## 2. 섹션별 상세 명세

### Section 1 — Hero

```
레이아웃: 2열 (lg:grid-cols-2, gap-12)
배경: radial-gradient(ellipse at top right, primary 22% → background 60%)
패딩: pt-28 pb-20 px-6

[좌측]
  - 배지: "기업 AI 도입 · 컨설팅 · 사내 출강"
    → bg-primary/25 border-2 border-primary/40 text-primary, rounded-full, sm bold
  - H1 (3줄): "중소기업 AI 도입,\n어디부터 시작할지\n모르겠다면"
    → text-5xl md:text-6xl / font-black / tracking-tight
    → "어디부터 시작" → text-primary 강조
  - 본문: "진단·구축·교육·운영까지 한 곳에서.\nVISIONC가 100만원대부터 안전하게 시작해드립니다."
    → text-xl / text-foreground/90 / font-medium / leading-relaxed
    → "진단·구축·교육·운영" → bold text-foreground
  - CTA 버튼 2개 (가로 나열):
      1. "도입 상담 신청" (primary 배경, Briefcase 아이콘) → /contact
      2. "사내 출강 강좌 보기" (card 배경, border-2 border-primary, text-primary) → #academy
    → 버튼: px-8 py-4 rounded-xl text-lg font-bold
  - 사회적 증거: "247건+ 프로젝트 · 재의뢰율 97% · 정부 지원사업 연계"
    → mt-5 text-base text-foreground/85 font-medium

[우측 (hidden lg:flex)]
  - <Mascot pose="develop" category="process" size="md" h-56 />
  - 모바일: 숨김
```

---

### Section 2 — 제조업 교차 유도 배너

```
레이아웃: flex row (sm 이상), 양끝 정렬
배경: bg-secondary/40 border-y border-border
패딩: py-8 px-6

- 좌측 텍스트: "제조업이라면 — MES·ERP 데이터를 표준 온톨로지로 통합하는 FactoryLens를 확인해보세요."
  → "제조업이라면" → text-primary font-bold
  → text-sm font-medium text-foreground/85
- 우측 링크: "FactoryLens 알아보기 →" → /factorylens
  → text-primary text-sm font-bold, hover시 gap 증가
```

---

### Section 3 — Problem (AI 도입 막히는 3가지)

```
레이아웃: 1열 (md: 3열), gap-6
배경: bg-background
패딩: py-20 px-6

[상단 라벨] "The Problem" — font-mono tracking-[0.3em] uppercase accent-cyan-text
[H2] "AI 도입, 이 3가지에서 막힙니다"
[설명] "중소기업 의사결정자가 도입 검토 시 가장 자주 묻는 질문들입니다."

[카드 × 3] border-2 border-foreground/15 bg-card rounded-xl p-7
  카드 구조:
    - 좌: 아이콘 박스 (w-14 h-14, bg-primary/15, text-primary) + 태그(font-mono primary) + H3
    - 인용구 2개 each: border-l-3 border-primary/40 pl-4 italic text-foreground/85

  카드 1: WHY — MessageCircleQuestion 아이콘
    "우리에게 맞는 AI를 모름"
    인용1: "다른 회사가 도입했다고 들었는데, 우리에게도 맞는지 모르겠습니다."
    인용2: "어느 부서·어떤 업무부터 시작해야 할지 막막합니다."

  카드 2: WHAT — HelpCircle 아이콘
    "투자 대비 성과 불확실"
    인용1: "몇 백만원을 투자했을 때 얼마나 줄어들지 구체적으로 알고 싶습니다."
    인용2: "실패 사례가 있으면 어쩌나 걱정됩니다."

  카드 3: HOW — Wrench 아이콘
    "안전한 도입 방법 모름"
    인용1: "IT 인력이 없어서 도입 후 운영을 누가 할지 모르겠습니다."
    인용2: "고객 정보·설계 도면이 외부로 유출되는 것이 두렵습니다."
```

---

### Section 4 — Solution (VISIONC 3-스택)

```
레이아웃: 1열 (md: 3열), gap-6
배경: bg-secondary
패딩: py-20 px-6

[상단 라벨] "The Solution"
[H2] "VISIONC 3-스택으로 해결"
[설명] "컨설팅·구축·교육 3가지 영역을 회사 상황에 맞춰 단독 또는 결합 진행합니다."

[카드 × 3]
  공통 구조: 아이콘박스(w-14 h-14) + 배지(font-mono) + H3 + 가격·기간 pill + 설명 + 해결문제 + 항목 목록 + CTA 버튼

  카드 A — 도입 컨설팅 (Briefcase 아이콘)
    배지: "A · 도입 컨설팅"
    제목: "진단·청사진·우선순위"
    가격: "100만원대~" / 기간: "약 1주"
    설명: "회사 업무를 분석해 가장 효과 큰 도입 영역 1개를 결정하고 청사진을 제공합니다."
    해결: "WHY 문제", "WHAT 문제" (accent-green-text 배지)
    항목: 업무 프로세스 진단 / 도입 가능 영역 분석 / ROI 시뮬레이션 / 우선순위 도출 청사진
    CTA: "컨설팅 문의" → /contact (카드 배경)

  카드 B — 구축·운영 ★추천 (Wrench 아이콘, 강조)
    배지: "B · 구축·운영"
    배경: border-primary bg-primary/8, "-top-3 left-7" 위치에 "추천" pill
    제목: "직접 만들고 운영 대행"
    가격: "200~500만원대~" / 기간: "2~6주"
    설명: "챗봇·자동화·자체 호스팅 LLM을 회사에 맞춰 구축하고 운영까지 대행합니다."
    해결: "HOW 문제"
    항목: AI 챗봇·자동화 구축 / 데이터 대시보드 / RAG·자체 호스팅 / 인수인계 + 30일 A/S
    CTA: "구축 견적 문의" → /contact (primary 배경)

  카드 C — 사내 출강 강좌 (GraduationCap 아이콘)
    배지: "C · 사내 출강 강좌"
    제목: "직원 AI 활용 능력 확보"
    가격: "별도 견적" / 기간: "워크숍 반나절~1일"
    설명: "직원 전체가 안전하고 효과적으로 LLM을 활용하도록 사내 출강 + 자료 제공."
    해결: "WHY 문제", "HOW 문제"
    항목: Course 01: 부서별 활용 5편 15강 / Course 02: 사내 구축 11편 30강 / PPT + 스피커 노트 제공 / 사내 가이드라인 작성 지원
    CTA: "커리큘럼 보기" → #academy (카드 배경)
```

---

### Section 5 — Proof (실제 도입 결과)

```
레이아웃: 상단 2열 사례 카드 (md:grid-cols-2) + 하단 4열 KPI (md:grid-cols-4)
배경: bg-background
패딩: py-20 px-6

[상단 라벨] "Proof · 실제 도입 결과"
[H2] "한국 중소기업 실제 사례"

[사례 카드 × 4] bg-card border-2 border-foreground/10 rounded-xl p-6
  카드 구조:
    - 업종 태그 pill (text-primary bg-primary/15)
    - "이전" 블록: bg-accent-red/10, text-accent-red — "이전: {before}"
    - 화살표: ↓ (text-lg font-bold 중앙)
    - "이후" 블록: bg-primary/15, text-primary — "이후: {after}" + 수치 (text-3xl font-black)

  사례 1: 제조사 (30명)
    이전: 고객 문의 하루 2시간 수동
    이후: AI 챗봇 85% 자동 / 강조: 85%

  사례 2: 온라인몰
    이전: 상품 설명 건당 30분
    이후: 1분 + 사람 검수 3분 / 강조: −93%

  사례 3: 서비스업
    이전: 매일 아침 보고서 1.5시간
    이후: 자동 생성·발송, 0분 / 강조: 0분

  사례 4: 소매업
    이전: 주 2회 2시간 엑셀 집계
    이후: 실시간 대시보드 / 강조: 실시간

[KPI 타일 × 4] bg-card border-2 border-foreground/15 rounded-xl p-6 text-center
  −35% / 반복 업무 시간
  −42% / CS 운영 비용
  +24% / 고객 만족도
  3.4m  / 평균 손익분기

[하단 주석] "도입 6개월 평균 결과 (3개 사례 추적)"
```

---

### Section 6 — Safety (5가지 우려 해소)

```
레이아웃: 수직 리스트 (space-y-4), 최대 폭 max-w-5xl
배경: bg-secondary
패딩: py-20 px-6

[상단 라벨] "Safety · 우려 해소"
[H2] "5가지 우려, 모두 답이 있습니다"
[설명] "도입 검토 시 가장 큰 5가지 걱정과 VISIONC의 해결 방법."

[항목 × 5] bg-card border-2 border-foreground/15 rounded-xl p-6 flex items-start gap-5
  - 아이콘 박스 (w-12 h-12, bg-primary/15, text-primary)
  - H3 (질문, font-black)
  - 답변 (text-foreground/90 font-medium leading-relaxed)

  1. Shield 아이콘 — "데이터 유출 우려?"
     "자체 호스팅 옵션으로 외부 송출 0%. 데이터 4분류 + PII 마스킹 가이드를 함께 제공합니다."

  2. Users 아이콘 — "IT 인력 부재?"
     "구축 후 사내 담당자 인수인계 + 30일 무상 A/S. 운영 매뉴얼·SOP까지 함께 납품합니다."

  3. GraduationCap 아이콘 — "직원 반발·미사용?"
     "사내 출강 강좌(Course 01)로 전 직원 AI 활용 능력 확보. 즉시 사용 프롬프트 라이브러리 제공."

  4. AlertTriangle 아이콘 — "AI 오답·법적 리스크?"
     "외부 송신 직전 사람 검수 절차 + 사내 가이드라인 8체크 + 실제 사고 사례 학습으로 사전 방지."

  5. BotMessageSquare 아이콘 — "실패 우려?"
     "소규모 파일럿 → 베이스라인 측정 → 단계별 확대. ROI 미충족 시 환불 정책 적용."
```

---

### Section 7 — Academy (사내 출강 강좌)

```
레이아웃: 2열 카드 (md:grid-cols-2), 최대 폭 max-w-5xl
배경: bg-background
섹션 ID: id="academy" (Hero CTA·Bottom CTA 앵커)
패딩: py-20 px-6

[상단 라벨] "Enterprise Academy"
[H2] "사내 출강 강좌"
[설명] "중소기업 도입·운영 노하우를 사내 교육으로 전달합니다. 커리큘럼은 공개, 자료(PPT·스피커 노트)는 비밀번호로 보호됩니다."

[강좌 카드 × 2] rounded-xl border-2 border-foreground/15 bg-card p-7
  hover: border-primary/50 transition-colors
  카드 구조: 배지 + 상태 pill + H3 + 부제 + "커리큘럼 보기 →"

  Course 01: "부서별로 일하는 AI"
    배지: "COURSE 01"
    부제: "일반 직원·관리자 대상 · 5편 15강"
    상태: "자료 공개 중 (1편)" — green pill
    링크: /ai-solution/academy/dept-ai

  Course 02: "사내 AI 구축·운영 종합 가이드"
    배지: "COURSE 02"
    부제: "IT 담당자·관리자 대상 · 11편 30강"
    상태: "자료 준비 중" — amber pill
    링크: /ai-solution/academy/build-ai
```

---

### Section 8 — FAQ

```
레이아웃: 아코디언 단일 열 (max-w-3xl)
배경: bg-secondary
패딩: py-20 px-6

[H2] "자주 묻는 질문"
[아코디언] bg-card border-2 border-foreground/15 rounded-xl
  - 열기/닫기: ChevronDown / ChevronUp
  - 내용: border-t border-foreground/10 pt-4

데이터 원천: src/app/ai-solution/faqs.ts (ServiceJsonLd 구조화 데이터와 공유)

항목 × 6:
  Q1. 강좌(사내 출강)와 컨설팅·구축은 어떻게 다른가요?
  Q2. IT 전문 지식이 없어도 운영할 수 있나요?
  Q3. 우리 회사 데이터가 외부에 유출되지 않나요?
  Q4. 도입하면 직원을 줄여야 하나요?
  Q5. 월 비용이 추가로 발생하나요?
  Q6. 실패 사례가 있나요?
```

---

### Section 9 — Bottom CTA

```
레이아웃: 중앙 정렬, 최대 폭 max-w-2xl
배경: radial-gradient(ellipse at center, primary 18% → background 70%)
패딩: py-24 px-6

- <Mascot pose="cheer" category="emotion" size="sm" h-28 />
- H2: "지금 시작하세요" (text-3xl md:text-5xl font-black)
- 설명: "100만원대부터 단계별로. 어떤 부서·어떤 업무가 적합한지 함께 정합니다."
  → text-xl text-foreground/90 font-medium mb-10
- CTA 버튼 2개 (가운데 정렬):
    1. "도입 상담 신청" (primary 배경, Briefcase 아이콘) → /contact
    2. "사내 출강 강좌 보기" (card 배경, border-2 border-primary) → #academy
```

---

## 3. 데이터 파일 위치

| 데이터 | 파일 |
|--------|------|
| FAQ 목록 | `src/app/ai-solution/faqs.ts` |
| 문제 카드 | `page.tsx` const `problems` |
| 솔루션 카드 | `page.tsx` const `solutions` |
| 도입 사례 | `page.tsx` const `cases` |
| KPI 타일 | `page.tsx` const `kpi` |
| 우려 해소 | `page.tsx` const `safety` |
| 강좌 목록 | `page.tsx` const `courses` |

---

## 4. 주요 컴포넌트

| 컴포넌트 | 사용 위치 | 설명 |
|---------|----------|------|
| `<Mascot>` | Hero, Bottom CTA | 마스코트 SVG |
| `<ServiceJsonLd>` | 페이지 최상단 | FAQ 구조화 데이터 |
| `<Link>` | CTA, 카드 | Next.js 라우팅 |

---

*저장 위치: `docs/design/layout-ai-solution.md`*
