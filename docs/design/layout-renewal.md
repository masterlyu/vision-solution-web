# 레이아웃 명세 — `/renewal` (홈페이지 리뉴얼)

> 마지막 갱신: 2026-09-02 | AI 디자이너 재작성 (VIS-6012)
> 이전 명세(VIS-196, 2026-04-17)는 현행 구현과 크게 달라 전면 재작성.
> 주요 추가: 운영·유지보수 플랜 섹션, 자동 진단 폼 섹션.

---

## 0. 디자인 방향

- **분위기**: 긴장감(낡음·이탈) → 안도감(진단·개선·운영)으로 이어지는 서사 흐름
- **색상**: `--primary` 중심, `--destructive` 체크리스트 결론·Hero 강조
- **특징**: 단일 무료 진단 CTA를 앵커로 활용해 Hero→폼 섹션으로 자연스럽게 유도
- **마스코트**: Hero 우측 `svc_renewal/service`, 프로세스 각 스텝, 진단 폼 섹션 상단에 배치

---

## 1. 섹션 구조

| 순번 | 섹션명 | 레이아웃 유형 | 배경 |
|------|--------|--------------|------|
| 1 | Hero | 2열 (텍스트 + 마스코트·SVG) | background |
| 2 | 공감 체크리스트 | 2열 카드 + 결론 배너 | secondary |
| 3 | 수치 근거 | 4열 빅 넘버 타일 (2열 모바일) | background |
| 4 | 솔루션 | 수직 리스트 (아이콘+제목+설명) | card |
| 5 | 진행 프로세스 | 수직 스텝 + 마스코트 | secondary |
| 6 | 가격표 (리뉴얼) | 3열 카드 | background |
| 7 | 운영·유지보수 플랜 | 3열 + 4열 기능 타일 | card |
| 8 | FAQ | 아코디언 단일 열 | secondary |
| 9 | 자동 진단 폼 | 중앙 폼 카드 + 마스코트 | card |

---

## 2. 섹션별 상세 명세

### Section 1 — Hero

```
레이아웃: 2열 (lg:grid-cols-2, gap-12)
배경: bg-background overflow-hidden
패딩: pt-28 pb-20 px-6

[좌측]
  - 배지: "홈페이지 리뉴얼"
    → bg-primary/20 border border-primary/40 text-primary text-xs font-bold, rounded-full
  - H1 (3줄): "지금 이 순간도,\n고객이 당신 사이트에서\n떠나고 있습니다"
    → text-4xl md:text-5xl / font-black / leading-tight
    → "떠나고" → text-destructive 강조
  - 본문 (2줄):
      "홈페이지가 낡았다는 걸 알지만 어디서부터 시작해야 할지 모르겠다면,
       URL 하나만 입력하세요. 자동 분석 리포트를 이메일로 발송해 드립니다."
    → text-muted-foreground text-lg leading-relaxed
  - CTA: "사이트 현황 자동 분석 →" → <a href="#diagnosis-form"> (앵커 링크)
    → bg-primary / text-primary-foreground / font-semibold / px-8 py-4 / rounded-xl / ArrowRight 아이콘

[우측 (hidden lg:flex, flex-col gap-6)]
  - <Mascot pose="svc_renewal" category="service" size="md" h-48 />
  - <RenewalHeroIllust /> — 인라인 SVG 컴포넌트
    SVG 내용 (340×280):
      BEFORE 브라우저 (뒤, opacity 0.6):
        - 뒤에 위치, 흐리게, 오래된 사이트 느낌 (rect 불규칙 배치)
        - 좌상단 BEFORE 레이블: destructive fill
      화살표: primary 점선 + 삼각형
      AFTER 브라우저 (앞, 밝게):
        - 깔끔한 히어로·카드 레이아웃
        - 좌상단 AFTER 레이블: primary fill
      스파클 ✦ 2개
    우하단 절대 위치:
      <Mascot pose="cheer" category="emotion" size="sm" bubble="훨씬 좋죠?" bubbleDir="left" />
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

  1. "홈페이지를 만든 지 3년이 넘었다"
  2. "모바일로 보면 글자가 너무 작거나 레이아웃이 깨진다"
  3. "구글·네이버에서 우리 회사가 잘 검색되지 않는다"
  4. "홈페이지는 있는데 문의가 거의 없다"
  5. "경쟁사 사이트와 비교했을 때 우리 사이트가 초라해 보인다"
  6. "페이지 로딩이 느려서 고객이 기다리다 떠날 것 같다"

[결론 배너] border-l-4 border-destructive bg-destructive/10 px-6 py-4 rounded-r-xl
  "2개 이상 해당된다면, 홈페이지가 매출의 발목을 잡고 있습니다."
  → text-foreground font-semibold
```

---

### Section 3 — 수치 근거

```
레이아웃: 2열 (grid-cols-2) md:4열 (md:grid-cols-4), gap-6
배경: bg-background
패딩: py-20 px-6

[H2] "수치로 보는 현실"
  → text-2xl font-bold / text-center / mb-10

[타일 × 4] bg-card rounded-xl text-center p-6
  - 수치: text-4xl font-black text-primary mb-2
  - 설명: text-muted-foreground text-sm leading-snug

  53% / 로딩 3초 초과 시 이탈률 급등
  67% / 모바일 미최적화 전환율 손실
  2.3배 / 리뉴얼 후 문의 증가 (자사 기준)
  140% / 검색 노출 개편 3개월 내 유입 증가
```

---

### Section 4 — 솔루션 (리뉴얼 후 달라지는 점)

```
레이아웃: 수직 리스트 (space-y-4)
배경: bg-card
패딩: py-20 px-6

[H2] "리뉴얼 후 이렇게 달라집니다"
  → text-2xl font-bold / mb-10

[항목 × 4] flex items-start gap-5, bg-foreground/5 border border-foreground/10 rounded-xl p-5
  - 아이콘 박스: w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center
  - 아이콘: w-5 h-5 text-primary
  - 텍스트: <span font-bold text-foreground>제목</span> <span text-muted-foreground>→ 설명</span>

  Zap 아이콘 — 속도 최적화 → "로딩 3초 → 0.8초. 고객이 기다리지 않습니다."
  Smartphone — 모바일 퍼스트 설계 → "스마트폰으로 봐도 버튼이 크고 글씨가 선명합니다."
  Target — 문의 유도 화면 재설계 → "방문자가 자연스럽게 '문의하기'를 누르게 됩니다."
  Search — 검색 노출 구조 개편 → "구글·네이버에서 경쟁사보다 먼저 노출됩니다."
```

---

### Section 5 — 진행 프로세스

```
레이아웃: 수직 스텝 나열 (space-y-6), 각 스텝 = flex gap-4
배경: bg-secondary
패딩: py-20 px-6

[H2] "진행 프로세스"
  → text-2xl font-bold / mb-10

[스텝 × 4]
  구조:
    - 좌측 (sm 이상): w-20 마스코트 (h-20 w-20 object-contain)
    - 번호 원: w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-black mt-1
    - 내용 카드: bg-card rounded-xl p-5 flex-1
      - 제목 + 기간 pill (bg-primary/10 text-primary text-xs rounded-full)
      - 설명: text-muted-foreground text-sm
      - 모바일 전용: MessageCircle 아이콘 + 말풍선 텍스트 (sm:hidden)

  STEP 01 — 현황 자동 진단 (2일)
    마스코트: pose="analytics" category="process"
    말풍선: "뭐가 문제인지 볼게요!"
    "현재 사이트 속도·검색 노출·화면 분석 결과서. 비용 없음."

  STEP 02 — 기획·설계 (1주)
    마스코트: pose="thinking" category="emotion"
    말풍선: "어떻게 만들면 좋을까?"
    "사이트 구성, 화면 배치, 디자인 시안 3종 제시 후 확정."

  STEP 03 — 개발·이전 (2~3주)
    마스코트: pose="develop" category="process"
    말풍선: "열심히 만들고 있어요!"
    "데이터 손실 없이 기존 콘텐츠를 새 사이트로 옮깁니다."

  STEP 04 — 검수·배포 (3일)
    마스코트: pose="cheer" category="emotion"
    말풍선: "완성! 확인해보세요"
    "모든 기기에서 최종 점검 후 도메인 무중단 전환."

[하단 주석] "전체 기간: 평균 4~5주 / 일정 초과 시 사전 고지 의무"
  → text-muted-foreground text-sm text-right mt-4
```

---

### Section 6 — 가격표 (리뉴얼 제작)

```
레이아웃: 1열 (md:grid-cols-3, gap-6)
배경: bg-background
패딩: py-20 px-6

[H2] "기본형 100만원대부터 시작합니다"
  → text-2xl font-bold / mb-2
[부제] "정확한 견적은 도입 상담 후 제공합니다."
  → text-muted-foreground / mb-10

[카드 × 3] rounded-xl p-8 border-2
  기본 구조: 이름(text-xl font-bold) + 가격(text-2xl font-black) + 항목 목록(text-sm)

  기본형 / 100만원대~
    항목: 디자인 리뉴얼 / 모바일 최적화 / 속도 개선
    강조: 없음 (border-border)

  표준형 / 200만원대~ ★추천
    항목: 기본형 전체 / 검색 노출 구조 개편 / 문의 버튼 배치 재설계
    강조: border-primary bg-primary/5 / 가격 text-primary / "-top-3" "추천" pill

  확장형 / 300만원대~
    항목: 표준형 전체 / 콘텐츠 전략 / 분석 도구 연동
    강조: 없음 (border-border)

[하단 CTA] "도입 상담 신청" (Briefcase + ArrowRight) → /contact
  → bg-primary / text-primary-foreground / font-semibold / px-8 py-4 / rounded-xl / text-center
```

---

### Section 7 — 운영·유지보수 플랜

```
레이아웃: 상단 3열 플랜 카드 + 하단 4열 기능 타일
배경: bg-card
섹션 ID: id="maintenance" scroll-mt-24
패딩: py-20 px-6

[상단 라벨] "Maintenance"
  → text-xs font-black uppercase tracking-[0.15em] text-primary mb-2

[H2] "납품 이후의 운영·유지보수 플랜"
[설명] "리뉴얼·신규 제작 후 6개월 무상 유지보수 + 월정액 운영 플랜..."

[플랜 카드 × 3] (md:grid-cols-3, gap-6)
  공통: rounded-xl p-7 border-2 / 이름(text-xl font-bold) + 가격(text-2xl font-black) + 항목

  Basic / 월 99,000원
    항목: 월 3회 콘텐츠 수정 / 보안 패치 월 1회 / 이메일 지원 / 월간 리포트

  Standard / 월 199,000원 ★추천
    border-primary bg-primary/5 / 가격 text-primary
    항목: 무제한 콘텐츠 수정 / 보안 패치 즉시 적용 / 카카오톡 채널 지원 / 주간 리포트 / 업타임 모니터링

  Premium / 월 399,000원
    항목: 무제한 수정 / 24시간 모니터링 / 전화·카톡 우선 지원 / 월간 성과 리포트 / 소규모 기능 추가

[기능 타일 × 4] (sm:grid-cols-2 lg:grid-cols-4, gap-4)
  bg-background border border-border rounded-xl p-5
  - 아이콘 (h-6 w-6 text-primary) + 제목(font-bold text-sm) + 설명(text-xs text-muted-foreground)

  Shield — 보안 패치 / "취약점 발견 시 즉시 업데이트"
  Pencil — 콘텐츠 수정 / "요청 후 영업일 1일 내 처리"
  Eye — 24시간 모니터링 / "사이트 다운 시 담당자가 먼저 연락"
  BarChart2 — 월간 리포트 / "방문자·속도·보안 상태 정리 발송"

[하단 CTA] "운영·유지보수 상담 신청" (Briefcase + ArrowRight) → /contact
[주석] "최소 계약 3개월 · 한 달 전 통보 시 해지 가능 · 위약금 없음"
  → text-xs text-muted-foreground mt-3
```

---

### Section 8 — FAQ

```
레이아웃: 아코디언 단일 열 (max-w-3xl)
배경: bg-secondary
패딩: py-20 px-6

[H2] "자주 묻는 질문"
  → text-2xl font-bold / text-center / mb-10

[아코디언] bg-card rounded-xl border border-border (얇은 단선)
  - 열기/닫기: ChevronDown / ChevronUp
  - 내용: border-t border-border pt-4 pb-5 text-muted-foreground text-sm leading-relaxed

데이터 원천: src/app/renewal/faqs.ts

항목 × 6:
  Q1. 리뉴얼하면 기존 고객 데이터나 구글 검색 순위가 날아가지 않나요?
  Q2. 기간이 얼마나 걸리나요?
  Q3. 완성 후 수정이 필요하면 어떻게 하나요?
  Q4. 리뉴얼 중에도 기존 사이트를 계속 운영할 수 있나요?
  Q5. 어떤 업종의 사이트를 많이 만드셨나요?
  Q6. 계약금은 얼마나 되나요?
```

---

### Section 9 — 홈페이지 운영상태 자동 진단 폼

```
레이아웃: 중앙 정렬 (max-w-2xl)
배경: bg-card
섹션 ID: id="diagnosis-form"
패딩: py-24 px-6

[마스코트 영역] flex justify-center mb-8
  <Mascot pose="cheer" category="emotion" size="sm" h-28 />
  + 말풍선 (absolute, -top-2, bg-card, shadow-lg):
      "URL과 회사 이메일만 입력하면 자동 분석됩니다!"
      삼각형 꼬리: border-t-card 방향 아래

[H2] "홈페이지 운영상태 자동 진단"
  → text-3xl md:text-4xl / font-black / text-center / mb-3

[설명] "URL 입력 즉시 자동 분석 · 결과 리포트 PDF를 이메일로 발송합니다"
  → text-muted-foreground text-center mb-8

[폼 카드] bg-background border border-border rounded-xl p-8 shadow-sm
  <RenewalDiagnosisForm /> 컴포넌트 (src/components/RenewalDiagnosisForm.tsx)

[하단 주석] "진단은 공개 접근 가능한 정보만 분석합니다 · 서버/DB 직접 접근 없음"
  → text-center text-xs text-muted-foreground mt-6

비고:
  - Hero CTA가 이 섹션으로 앵커 이동 (#diagnosis-form)
  - API 엔드포인트: /api/renewal-analyze
```

---

## 3. 데이터 파일 위치

| 데이터 | 파일 |
|--------|------|
| 체크리스트 항목 | `page.tsx` const `checklistItems` |
| 수치 타일 | `page.tsx` const `stats` |
| 솔루션 항목 | `page.tsx` const `solutions` |
| 프로세스 스텝 | `page.tsx` const `steps` |
| 리뉴얼 가격 플랜 | `page.tsx` const `plans` |
| 유지보수 플랜 | `page.tsx` (인라인 배열, 유지보수 섹션) |
| FAQ | `src/app/renewal/faqs.ts` |

---

## 4. 주요 컴포넌트

| 컴포넌트 | 사용 위치 | 설명 |
|---------|----------|------|
| `<Mascot>` | Hero, 프로세스, 진단 폼 | 포즈·카테고리별 마스코트 |
| `<RenewalHeroIllust>` | Hero 우측 | BEFORE/AFTER SVG 브라우저 일러스트 |
| `<RenewalDiagnosisForm>` | 진단 폼 섹션 | URL 입력 → 이메일 리포트 자동 발송 폼 |
| `<Link>` | 가격·유지보수 CTA | Next.js 라우팅 |

---

*저장 위치: `docs/design/layout-renewal.md`*
