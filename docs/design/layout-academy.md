# 레이아웃 명세 — `/academy` (visionc Academy 강의 목록 페이지)

> VIS-5966 루틴 산출물 | AI 디자이너 작성 | 2026-09-01

---

## 0. 디자인 방향

- **분위기**: 활기참·성취감·체계성. AI 강의 플랫폼 특성상 레벨(단계) 구조가 시각적으로 명확하게 드러나야 함. 무료·접근 가능 느낌.
- **색상**: `--primary` 중심. 수강 가능 카드는 `primary/15` 그라디언트 + `primary/60` 테두리 + 발광 shadow. 예정/준비 중 카드는 `foreground/15` 테두리 + `card` 배경.
- **구조**: 중앙 헤더 + 3열 카드 그리드(responsive).
- **폰트**: font-mono 강조(레벨 태그·subtitle). 카드 타이틀 font-extrabold.
- **인터랙션**: 수강 가능 카드 hover 시 shadow 심화 (`60px/-12px`). "자료 보기 →" 화살표 gap 증가 애니메이션.

---

## 1. 섹션 구조 (상단 → 하단)

| 순번 | 섹션 명 | 배경 | 레이아웃 유형 |
|------|---------|------|--------------|
| 1 | 헤더 (마스코트 + 타이틀) | `background` | 중앙 정렬 |
| 2 | 강의 레벨 카드 그리드 | `background` | 3열 반응형 그리드 |

---

## 2. 섹션별 상세 명세

### Section 1 — 헤더

```
배경: background
전체 여백: pt-28 pb-24
헤더 mb: mb-16
정렬: text-center

[마스코트]
  pose="cheer" category="emotion" size="md"
  높이: h-28
  정렬: flex justify-center, mb-6

[배지]
  텍스트: "visionc · ACADEMY"
  스타일: text-primary, text-xs, font-bold, tracking-[0.3em], uppercase, mb-3

[H1]
  텍스트: "무료 AI 강의 플랫폼"
  스타일: text-4xl md:text-5xl, font-black, text-foreground,
          leading-tight, tracking-tight
```

---

### Section 2 — 강의 레벨 카드 그리드

```
레이아웃: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5

카드 8개 (LV1~LV8):
  - LV1: 기초 AI 상식 / Foundation
  - LV2: Claude 마스터 / Master
  - LV3: AI로 일하는 법 / Practical
  - LV4: Claude Code 입문 / Coding
  - LV5: AI 앱 만들기 / API & MCP
  - LV6: Agents & Skills / Advanced
  - LV7: 클라우드 AI / Enterprise
  - LV8: AI 시대 교육의 철학 / Education

[수강 가능 카드 (status=available)] — <Link href="/academy/lvN">
  border: border-2 border-primary
  배경: bg-gradient-to-br from-primary/15 to-card
  shadow: shadow-[0_0_30px_-12px_rgba(var(--primary-rgb),0.4)]
  hover shadow: shadow-[0_0_60px_-12px_rgba(var(--primary-rgb),0.7)]
  rounded-xl p-7 transition-all h-full

[예정 카드 (status=soon / planned)] — <div>
  border: border-2 border-foreground/15
  배경: bg-card
  hover border: border-foreground/30
  rounded-xl p-7 transition-all h-full

카드 내부:
  ─ 상단 행 (flex items-start justify-between, mb-5):
      좌: 레벨 태그 (text-xs font-mono font-bold tracking-[0.16em] text-primary)
          예: "LV1 · 기초"
      우: StatusBadge

  ─ 타이틀 (H3):
      text-2xl font-extrabold text-foreground tracking-tight, mb-1
  ─ 서브타이틀:
      text-xs font-mono text-muted-foreground, mb-3
  ─ 수강 가능 시 하단 링크:
      flex items-center gap-2 text-sm font-bold text-primary, mt-4
      hover gap-3 transition-all
      텍스트: "자료 보기 →"
```

---

### StatusBadge 컴포넌트 스타일

| 상태 | 배경 | 텍스트 색상 | 표시 |
|------|------|------------|------|
| `available` | `bg-primary` | `text-primary-foreground` | `● 수강 가능` |
| `soon` | `bg-[--accent-cyan-text]/15` | `text-[--accent-cyan-text]` | `Coming Soon` |
| `planned` | `bg-muted` | `text-muted-foreground` | `예정` |

공통: `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tracking-wider`

---

## 3. SEO / 구조화 데이터

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "visionc Academy — 무료 AI 강의",
  "itemListElement": [
    {
      "@type": "ListItem",
      "item": {
        "@type": "Course",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW", "category": "Free" }
      }
    }
  ]
}
```

---

## 4. 반응형

| 뷰포트 | 그리드 |
|--------|--------|
| 모바일 (<md) | 1열 |
| 태블릿 (≥md) | 2열 |
| 데스크톱 (≥lg) | 3열 |
