# 레이아웃 명세 — `/blog` (인사이트 & 사례 블로그 목록 페이지)

> VIS-5966 루틴 산출물 | AI 디자이너 작성 | 2026-09-01

---

## 0. 디자인 방향

- **분위기**: 신뢰·실용·정보성. 중소기업 사장님을 주 독자층으로 상정, 콘텐츠 가독성과 탐색 편의성 우선.
- **색상**: 태그별 색상 체계(파랑·빨강·초록·앰버·primary) 유지. 카드 기본은 `card` + `border`. 활성 필터 태그는 `bg-primary`.
- **구조**: 중앙 헤더 → 태그 필터 바 → 2열 게시물 카드 그리드 → 하단 CTA 박스.
- **이미지**: 커버 이미지 있는 포스트는 상단 `h-44` 이미지 영역 + hover 줌 효과.
- **인터랙션**: 카드 hover 시 `border-primary/40` 전환. 이미지 `scale-105`.

---

## 1. 섹션 구조 (상단 → 하단)

| 순번 | 섹션 명 | 배경 | 레이아웃 유형 |
|------|---------|------|--------------|
| 1 | 헤더 (마스코트 + 타이틀) | `background` | 좌측 정렬 |
| 2 | 태그 필터 바 | `background` | flex wrap |
| 3 | 게시물 카드 그리드 | `background` | 2열 그리드 |
| 3-E | 빈 상태 | `background` | 중앙 텍스트 |
| 4 | 하단 CTA 박스 | `primary/5` + border | 중앙 정렬 박스 |

---

## 2. 섹션별 상세 명세

### Section 1 — 헤더

```
배경: background
전체 여백: pt-28 pb-24
헤더 mb: mb-12

[마스코트]
  pose="blog" category="service" size="sm"
  높이: h-32
  정렬: flex justify-center, mb-6

[배지]
  텍스트: "BLOG"
  스타일: text-primary, text-xs, font-bold, tracking-[0.2em], uppercase, mb-4

[H1]
  텍스트: "인사이트 & 사례"
  스타일: text-4xl md:text-5xl, font-black, text-foreground, mb-4

[부제목]
  텍스트: "실전에서 검증된 웹 전략과 AI 활용법을 공유합니다."
  스타일: text-muted-foreground, text-lg
```

---

### Section 2 — 태그 필터 바

```
조건: tags.length > 0 일 때만 렌더링
레이아웃: flex flex-wrap gap-2, mb-10

[전체 버튼] — Link href="/blog"
  활성(activeTag 없음): bg-primary text-primary-foreground
  비활성: bg-muted text-muted-foreground hover:bg-muted/80
  공통: px-4 py-1.5 rounded-full text-sm font-semibold transition-colors

[태그 버튼들] — Link href="/blog?tag={encoded}"
  각 태그별 동일 스타일 (활성/비활성 동일 로직)
```

---

### Section 3 — 게시물 카드 그리드

```
레이아웃: grid grid-cols-1 md:grid-cols-2 gap-6

[포스트 카드] — Link href="/blog/{slug}"
  컨테이너: bg-card border border-border rounded-xl overflow-hidden
             hover:border-primary/40 transition-all duration-200

  ─ 커버 이미지 (post.image 있을 때):
      relative w-full h-44 overflow-hidden bg-muted
      <Image> object-cover
      hover: scale-105 transition-transform duration-300

  ─ 카드 본문: p-6
      행 1 (flex items-center gap-2, mb-4):
        - 태그 뱃지: text-xs font-bold px-2.5 py-1 rounded-full
                    색상은 TAG_COLORS 매핑 (아래 참고)
        - 날짜: text-muted-foreground text-sm

      제목 (H2): text-foreground font-bold text-base mb-3
                 group-hover:text-primary transition-colors leading-snug

      요약: text-muted-foreground text-sm leading-relaxed

      추가 태그들 (post.tags.slice(1) 있을 때):
        flex flex-wrap gap-1.5, mt-3
        각 태그: text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground
                 "#태그명" 형식

      읽기 링크:
        mt-4 text-primary text-sm font-semibold
        텍스트: "읽기 →"

[빈 상태]
  text-muted-foreground py-16 text-center
  텍스트: "해당 카테고리의 글이 없습니다."
```

---

### 태그 색상 매핑 (TAG_COLORS)

| 태그 | 배경 | 텍스트 |
|------|------|-------|
| 리뉴얼 사례 · 리뉴얼 비용 | `--accent-blue/10` | `--accent-blue` |
| 보안 경고 · 보안 점검 | `--accent-red/10` | `--accent-red` |
| AI 활용 · AI 솔루션 | `primary/10` | `primary` |
| 개발 팁 · 앱 개발 | `--accent-green/10` | `--accent-green` |
| 홈페이지 제작 · 유지보수 | `--accent-amber/10` | `--accent-amber` |
| 기타(fallback) | `primary/10` | `primary` |

---

### Section 4 — 하단 CTA 박스

```
mt-20
컨테이너: bg-primary/5 border border-primary/20 rounded-xl p-8 md:p-12
정렬: text-center

H2: "내 사이트도 개선할 수 있을까요?"
    text-2xl md:text-3xl font-black text-foreground, mb-3

부제목: "무료 분석 리포트로 현재 사이트의 문제점과 개선 방향을 확인해보세요."
        text-muted-foreground, mb-6, max-w-lg, mx-auto

CTA 버튼 — Link href="/contact"
  inline-block bg-primary text-primary-foreground
  font-bold px-8 py-3 rounded-xl
  hover:bg-primary/90 transition-colors
  텍스트: "무료 분석 신청하기"
```

---

## 3. 반응형

| 뷰포트 | 그리드 |
|--------|--------|
| 모바일 (<md) | 1열 |
| 데스크톱 (≥md) | 2열 |

---

## 4. SEO

- `<title>`: "홈페이지·보안·AI 인사이트 블로그"
- 블로그 목록은 서버 컴포넌트 (`getAllPosts()`, `getAllTags()` 서버에서 호출)
- `?tag=` 파라미터: `searchParams` async 처리 (Next.js 16 규칙)
- 개별 포스트: `/blog/[slug]` 별도 페이지
