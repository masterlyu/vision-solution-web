# 레이아웃 명세 — `/academy/lv[1-8]` (아카데미 레벨 강의 상세 페이지)

> VIS-5989 루틴 산출물 | AI 디자이너 작성 | 2026-09-02
> 적용 대상: `/academy/lv1` ~ `/academy/lv8` (공통 레이아웃)

---

## 0. 디자인 방향

- **분위기**: 학습 플랫폼. 체계적·신뢰감. 무료·접근 가능한 느낌.
- **색상**: `--primary` 중심. 레벨 배지는 `--accent-cyan-text`. 메타 칩은 `primary/15` 또는 `muted`.
- **레이아웃**: 단일 열, `max-w-[1200px]` 컨테이너. 목차만 2열 그리드.
- **폰트**: breadcrumb·레벨 배지·메타 칩은 font-mono. H1은 font-black.
- **인터랙션**: 목차 카드 hover 시 `border-primary/50` 전환.

---

## 1. 섹션 구조 (상단 → 하단)

| 순번 | 섹션 | 레이아웃 유형 |
|------|------|-------------|
| 1 | Breadcrumb | 좌측 정렬, font-mono |
| 2 | Hero (레벨 배지 + H1 + 메타 칩) | 좌측 정렬 |
| 3 | Authority (권위 출처 표기) | 좌측 정렬, 1줄 |
| 4 | 강의 목차 카드 그리드 | 2열 반응형 그리드 |
| 5 | 자료 다운로드 (`AcademyDownloadClient`) | 서버-컴포넌트 위임 |
| 6 | Back link | 중앙 정렬 |

---

## 2. 섹션별 상세 명세

### Section 1 — Breadcrumb

```
여백: mb-6
스타일: text-xs text-muted-foreground font-mono tracking-wider

[ACADEMY] — Link href="/academy", hover:text-primary
[·]       — text-border (mx-2)
[LV# · LEVEL_NAME] — text-primary (현재 페이지 표시)

레벨별 표기:
  LV1 · FOUNDATION
  LV2 · MASTER
  LV3 · PRACTICAL
  LV4 · CODING
  LV5 · API & MCP
  LV6 · ADVANCED
  LV7 · ENTERPRISE
  LV8 · EDUCATION
```

---

### Section 2 — Hero

```
여백: mb-10

[레벨 배지] — 1줄 텍스트
  스타일: text-xs font-mono font-bold tracking-[0.3em] uppercase
  색상: text-[var(--accent-cyan-text)]
  여백: mb-3
  내용 예시: "Lv1 · Foundation"

[H1] — 강의 제목
  스타일: text-4xl md:text-5xl font-black text-foreground leading-tight tracking-tight
  여백: mb-5

[메타 칩 행] — flex flex-wrap gap-2 text-xs font-mono
  칩 1 (강의 시간): bg-primary/15 text-primary, rounded-full, px-3 py-1.5
    내용: "⏱ N분" 형식
  칩 2 (슬라이드 수): bg-muted text-muted-foreground, rounded-full, px-3 py-1.5
    내용: "N 슬라이드"
  칩 3 (수강료): bg-muted text-muted-foreground, rounded-full, px-3 py-1.5
    내용: "FREE"
  칩 4 (선택): 추가 뱃지 (인증 관련 등) — 같은 muted 스타일
```

---

### Section 3 — Authority (권위 출처)

```
여백: mb-10
스타일: text-sm text-muted-foreground font-mono 1줄

형식: "출처 · [강사명](글자 bold) · [소속](글자 bold) · Anthropic 공식 채택"
예: "출처 · Rick Dakan(Ringling College) + Joseph Feller(University College Cork) · Anthropic 공식 채택"

참고: 레벨별 권위 출처가 다를 수 있음. 없으면 섹션 생략.
```

---

### Section 4 — 강의 목차 (Topics)

```
여백: mb-12

[H2] "강의 목차"
  스타일: text-xl md:text-2xl font-black text-foreground tracking-tight
  여백: mb-5

[카드 그리드]
  레이아웃: grid grid-cols-1 md:grid-cols-2 gap-3

[카드 × N개]
  구조: flex items-start gap-4 p-4 rounded-xl
  border: border-2 border-foreground/15
  배경: bg-card
  hover: border-primary/50 (transition-colors)

  카드 내부:
    ┌────────────────────────────────────────────┐
    │  [슬라이드 번호]  [제목]                    │
    │  "01"             강의 제목 (text-base bold) │
    │  text-primary     설명 1줄 (text-sm muted)  │
    └────────────────────────────────────────────┘

    번호: text-xs font-mono font-bold text-primary mt-1 tracking-wider
    제목: text-base font-bold text-foreground tracking-tight
    설명: text-sm text-muted-foreground mt-1
```

---

### Section 5 — 자료 다운로드

```
구현: <AcademyDownloadClient /> 클라이언트 컴포넌트
위치: 목차 아래

동작:
  - 슬라이드 다운로드 버튼 (PDF/PPTX)
  - 발표자 노트 다운로드 버튼 (선택적)
  - Supabase Storage에서 파일 URL 조회 후 다운로드 링크 제공
  - 파일 미준비 시 버튼 비활성화 + "준비 중" 안내

스타일:
  - 다운로드 버튼: primary 배경 또는 outlined 형태
  - 섹션 경계: border-t border-border 또는 카드 컨테이너
```

---

### Section 6 — Back link

```
여백: mt-10
정렬: text-center

[링크] "← 전체 코스"
  href="/academy"
  스타일: inline-flex items-center gap-2 text-sm font-bold
  색상: text-muted-foreground hover:text-primary (transition-colors)
```

---

## 3. 레벨별 강의 메타 정보

| 레벨 | 제목 | 시간 | 슬라이드 | 비고 |
|------|------|------|--------|------|
| Lv1 | 기초 AI 상식 | 60분 | 11장 | 4D 프레임워크 기반 |
| Lv2 | Claude 마스터 | 75분 | 12장 | Claude 101 공식, 인증 포함 |
| Lv3 | AI로 일하는 법 | 미정 | 미정 | Practical 실무 활용 |
| Lv4 | Claude Code 입문 | 미정 | 미정 | Coding 코딩 입문 |
| Lv5 | AI 앱 만들기 | 미정 | 미정 | API & MCP |
| Lv6 | Agents & Skills | 미정 | 미정 | Advanced 심화 |
| Lv7 | 클라우드 AI | 미정 | 미정 | Enterprise 기업 |
| Lv8 | AI 시대 교육의 철학 | 미정 | 미정 | Education |

---

## 4. 전체 페이지 컨테이너

```
<div className="min-h-screen pt-28 pb-24 bg-background">
  <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
    ...
  </div>
</div>
```

---

*저장 위치: `~/company/website/docs/design/layout-academy-lv.md`*
