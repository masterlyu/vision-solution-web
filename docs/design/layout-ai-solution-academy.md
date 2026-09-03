# 레이아웃 명세 — `/ai-solution/academy/[course]` (기업용 강좌 상세 페이지)

> VIS-5989 루틴 산출물 | AI 디자이너 작성 | 2026-09-02 | VIS-6042 브레드크럼 정정 (2026-09-03)
> 적용 대상:
>   - `/ai-solution/academy/build-ai` — Course 02: 사내 AI 구축·운영
>   - `/ai-solution/academy/dept-ai` — Course 01: 부서별로 일하는 AI

---

## 0. 디자인 방향

- **분위기**: 기업 출강 강좌. 신뢰감·체계성·전문성. B2B 의사결정자 대상.
- **색상**: `--primary` 중심. 핵심 섹션은 `star` 뱃지 + `border-primary/40`. 준비 중은 `accent-amber`. 공개는 `accent-green-text`.
- **레이아웃**: 단일 열, `max-w-[1200px]` 컨테이너. 편(Part) 목록은 세로 스택.
- **인터랙션**: 자료 공개 편 클릭 시 강의 자료 다운로드 패널 펼치기(아코디언). 준비 중 편은 클릭 불가.

---

## 1. 섹션 구조 (상단 → 하단)

| 순번 | 섹션 | 레이아웃 유형 |
|------|------|-------------|
| 1 | Breadcrumb | 좌측 정렬, font-mono |
| 2 | Hero (강좌 뱃지 + H1 + 메타 칩 + 설명) | 좌측 정렬 |
| 3 | 진도 표시 (공개 강 수 / 전체 강 수) | 좌측 정렬 |
| 4 | 편(Part) 카드 목록 + 아코디언 다운로드 | 세로 스택 |
| 5 | Back link | 좌측 정렬 |

---

## 2. 섹션별 상세 명세

### Section 1 — Breadcrumb

```
여백: mb-6
스타일: text-sm text-foreground/85 font-mono font-medium tracking-wider

[ENTERPRISE] — Link href="/ai-solution", hover:text-primary, transition-colors
[·]           — text-foreground/40 (mx-2)
[ACADEMY]     — Link href="/ai-solution", hover:text-primary, transition-colors
              (별도 /ai-solution/academy 인덱스 없음 → /ai-solution 링크)
[·]           — text-foreground/40
[강좌 제목]   — span (text-primary font-bold, 현재 페이지 표시)
```

---

### Section 2 — Hero

```
여백: mb-10

[강좌 뱃지] — 1줄
  스타일: text-xs font-mono font-bold tracking-[0.3em] uppercase text-primary
  여백: mb-3
  예: "COURSE 02 · ENTERPRISE AI"

[H1] 강좌 제목
  스타일: text-4xl md:text-5xl font-black text-foreground leading-tight tracking-tight
  여백: mb-3

[부제목]
  스타일: text-lg md:text-xl text-foreground/70 font-medium
  여백: mb-6
  예: "사내 AI 구축·운영 종합 가이드"

[메타 칩 행] — flex flex-wrap gap-2 text-xs font-mono mb-5
  칩 1: bg-primary/15 text-primary rounded-full px-3 py-1.5
    예: "⏱ 출강"
  칩 2~N: bg-muted text-muted-foreground rounded-full px-3 py-1.5
    예: "11편 30강", "IT 담당자·관리자", "90일 AI 인프라 구축"

[강좌 설명]
  스타일: text-base text-foreground/85 leading-relaxed max-w-prose
```

---

### Section 3 — 진도 표시

```
여백: mb-8

형식:
  [총 강 수 표시] — text-sm text-muted-foreground font-mono
  예: "총 30강 (30강 자료 공개)"

  프로그레스 바 (선택):
    bg-muted h-1.5 rounded-full w-full
    내부: bg-primary h-full rounded-full (width: readyCount/totalLessons * 100%)
```

---

### Section 4 — 편(Part) 카드 목록

```
레이아웃: 세로 스택 (flex flex-col gap-4)

[카드 × N편] — <SectionCard> 컴포넌트

카드 기본 구조:
  ┌────────────────────────────────────────────────────┐
  │ [편 번호] [제목]     [핵심★] [자료 공개/준비 중]   │
  │ [편 설명]                          [자료 보기 ↓]  │
  │ ─────────────────────────────────────────────────── │
  │ [강 01] 강의 제목               [강 02] 강의 제목  │
  │ [강 03] 강의 제목               [강 04] 강의 제목  │
  └────────────────────────────────────────────────────┘

카드 스타일:
  기본:   border-2 border-foreground/15 bg-card rounded-xl p-6
  핵심★: border-2 border-primary/40 bg-primary/5 rounded-xl p-6
  hover (자료 공개 카드): border-primary/50

편 번호: text-sm font-mono font-bold text-primary tracking-wider
제목:   text-xl font-black text-foreground tracking-tight
핵심★ 뱃지: Star 아이콘(w-3 h-3) + "핵심", text-xs text-primary font-bold
자료 공개 뱃지: Download 아이콘 + "자료 공개", accent-green-text 배경/텍스트
준비 중 뱃지: Calendar 아이콘 + "자료 준비 중", accent-amber 배경/텍스트

편 설명: text-base text-foreground/85 font-medium mb-5

강의 목록:
  grid grid-cols-1 md:grid-cols-2 gap-2
  각 강: flex items-start gap-3 p-3 rounded-xl bg-background/50
    강 번호: text-sm font-mono font-bold text-primary mt-0.5
    강 제목: text-sm text-foreground font-medium

[접기/펼치기 토글] — 자료 공개 편만 활성화
  ml-auto inline-flex items-center gap-1 text-sm font-mono font-bold text-primary
  접기: ChevronUp 아이콘
  펼치기: ChevronDown 아이콘

[다운로드 패널] — 펼쳤을 때만 표시
  위치: 카드 바로 아래, ml-4 md:ml-10 relative pl-6 md:pl-10
  연결선: 카드 하단과 다운로드 패널을 수직선(primary)으로 연결
  컴포넌트: <EnterpriseDownloadClient slidesKey notesKey slidesDesc notesDesc />
    - 슬라이드 다운로드 (N강 통합 PPT)
    - 스피커 노트 다운로드 (강사용 — 멘트·실습·시간 배분 포함)
```

---

### Section 5 — Back link

```
여백: mt-10 mb-4

"← AI 솔루션" 또는 "← ENTERPRISE"
  Link href="/ai-solution"
  스타일: text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1
```

---

## 3. 강좌별 구분

### Course 01 — `/ai-solution/academy/dept-ai`

```
제목: 부서별로 일하는 AI
설명: 사내 출강 강좌. 중소기업 부서별 LLM 활용법. 5편 15강. 영업·마케팅·생산·품질·설계·인사·회계.
타겟: 부서 실무자 전 직원
강좌 뱃지: "COURSE 01 · DEPT AI"
메타 칩: "⏱ 출강", "5편 15강", "전 직원", "30% 시간 절감"
편 구성:
  1편: 기반 다지기 (전 직원 공통)
  2편: 전 부서 공통 실전 활용
  3편: 코어 부서 — 업종별 적용
  4편: 심화 — 고부가 업무 적용
  5편: 지속 성장 — AI 문화 만들기
```

### Course 02 — `/ai-solution/academy/build-ai`

```
제목: 사내 AI 구축·운영 종합 가이드
설명: 사내 출강 강좌. IT 담당자·관리자 대상. 자체 호스팅·에이전트·하네스·보안. 11편 30강. 90일 AI 인프라 1차 가동.
타겟: IT 담당자, 시스템 관리자
강좌 뱃지: "COURSE 02 · ENTERPRISE AI"
메타 칩: "⏱ 출강", "11편 30강", "IT 담당자·관리자", "90일 인프라 구축"
편 구성:
  1편: 의사결정 — 도입 전 비교·로드맵
  2편: 인프라 — 서버·OS·네트워크
  3편: 모델·추론 엔진 — 무료 LLM·한국어·양자화
  4편: 챗봇·RAG 플랫폼 — 사내 직원이 매일 쓰는 UI
  5편: 에이전트 기초·생태계 ★핵심
  6편: 하네스 엔지니어링 ★핵심
  7편: 사내 에이전트 배포·운영 ★핵심
  8편: 자체 에이전트 만들기 ★핵심
  9편: 보안·권한·감사 ★핵심
  10편: 백업·재해 복구 ★핵심
  11편: 관리자 운영·효용성·최적화 ★핵심
```

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

*저장 위치: `~/company/website/docs/design/layout-ai-solution-academy.md`*
