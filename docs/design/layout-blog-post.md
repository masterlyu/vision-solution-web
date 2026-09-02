# 레이아웃 명세 — `/blog/[slug]` (블로그 포스트 상세 페이지)

> VIS-5989 루틴 산출물 | AI 디자이너 작성 | 2026-09-02
> 적용 대상: `/blog/[slug]` (동적 라우트 — 모든 블로그 글 상세 페이지)

---

## 0. 디자인 방향

- **분위기**: 가독성 최우선. 읽기 편안한 긴 텍스트 레이아웃. SEO 최적화(JSON-LD, OG 이미지).
- **색상**: `--primary` 강조. 태그별 색상 시스템(파랑/빨강/초록/노랑). 본문은 `--foreground`.
- **레이아웃**: 단일 열, `max-w-[800px]` 컨테이너 (본문 가독성 최적화).
- **폰트**: 본문은 prose 클래스(`prose-blog`) 적용. 헤더/메타는 font-bold/black.
- **SEO**: JSON-LD (BlogPosting + BreadcrumbList) 필수. OG 이미지는 동적 생성(`/api/og`).

---

## 1. 섹션 구조 (상단 → 하단)

| 순번 | 섹션 | 표시 조건 |
|------|------|---------|
| 1 | Breadcrumb (블로그 > 태그) | 항상 |
| 2 | Hero 이미지 | `post.image` 있을 때 |
| 3 | Post Header (제목 + 메타 + 태그 + 요약) | 항상 |
| 4 | 목차 (Table of Contents) | heading 1개 이상일 때 |
| 5 | 본문 (`prose-blog`) | 항상 |
| 6 | CTA 섹션 (무료 상담 유도) | 항상 |
| 7 | 관련 글 그리드 | 같은 태그 글 1개 이상일 때 |
| 8 | Back link | 항상 |

---

## 2. 섹션별 상세 명세

### Section 1 — Breadcrumb

```
여백: mb-8
스타일: text-sm text-muted-foreground flex items-center gap-2

[블로그] — Link href="/blog", hover:text-foreground
[/]      — 구분자
[태그 뱃지] — px-2.5 py-0.5 rounded-full text-xs font-bold
  색상: 태그별 색상 시스템 (아래 참조)
```

#### 태그 색상 시스템

| 태그 | 배경 | 텍스트 |
|------|------|--------|
| 리뉴얼 사례, 리뉴얼 비용 | `accent-blue/10` | `accent-blue` |
| 보안 경고, 보안 점검 | `accent-red/10` | `accent-red` |
| AI 활용, AI 솔루션 | `primary/10` | `primary` |
| 개발 팁, 앱 개발 | `accent-green/10` | `accent-green` |
| 홈페이지 제작, 유지보수 | `accent-amber/10` | `accent-amber` |
| (기타) | `primary/10` | `primary` |

---

### Section 2 — Hero 이미지 (조건부)

```
조건: post.image 있을 때만 표시
여백: mb-10

컨테이너: relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-muted
<Image> fill, object-cover, sizes="(max-width: 800px) 100vw, 800px"
  SVG: unoptimized={true}
  priority: true (LCP 최적화)
```

---

### Section 3 — Post Header

```
여백: mb-10

[H1] 글 제목
  스타일: text-3xl md:text-4xl font-black text-foreground leading-tight
  여백: mb-4

[메타 행] flex items-center gap-3 text-muted-foreground text-sm
  구성: [날짜 <time>] · [(주)비젼솔루션] · [약 N분]
  N = Math.max(1, Math.round(단어수 / 250))

[태그 목록] flex flex-wrap gap-2 mt-3
  각 태그: Link href="/blog?tag=대표태그"
  스타일: text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground
  hover: bg-primary/10 text-primary (transition-colors)

[요약 (summary)] mt-4 text-lg text-muted-foreground leading-relaxed
  강조 스타일: border-l-4 border-primary pl-4
```

---

### Section 4 — 목차 (Table of Contents, 조건부)

```
조건: 본문에 H2/H3 헤딩이 1개 이상일 때
여백: mb-10

<details open>
  컨테이너: bg-muted/40 border border-border rounded-xl overflow-hidden

  <summary> — px-6 py-4 cursor-pointer select-none list-none
    좌측: ClipboardList 아이콘(h-4 w-4) + "목차"
    우측: "클릭하여 접기/펼치기" (text-xs text-muted-foreground)
    기본: 열린 상태(open)

  <ol> — px-6 pb-5 pt-1 space-y-2
    각 항목: flex items-start gap-2.5 text-sm
      [번호] text-primary font-bold (1. 2. 3. ...)
      [링크] href="#heading-id" text-foreground/80 hover:text-primary leading-snug
```

---

### Section 5 — 본문

```
<article className="prose-blog">
  dangerouslySetInnerHTML={{ __html: contentHtml }}

prose-blog 클래스 정의 (전역 CSS):
  - H2: text-xl font-bold mt-10 mb-4 text-foreground
  - H3: text-lg font-bold mt-8 mb-3 text-foreground
  - p: leading-relaxed mb-4 text-foreground/90
  - a: text-primary hover:underline
  - code: font-mono bg-muted px-1.5 py-0.5 rounded text-sm
  - pre: bg-muted rounded-xl p-5 overflow-x-auto text-sm
  - blockquote: border-l-4 border-primary pl-4 text-muted-foreground italic
  - ul/ol: pl-6 space-y-2
  - img: rounded-xl max-w-full mx-auto
  - table: w-full border-collapse text-sm
  - thead: bg-muted/40 font-bold
  - td, th: border border-border px-4 py-2

heading ID 생성: extractHeadings()로 각 H2/H3에 id 속성 부여 (목차 앵커 연결용)
```

---

### Section 6 — CTA 섹션

```
여백: mt-16
배경: bg-primary/5 border border-primary/20 rounded-xl p-8 text-center

[H2] "우리 회사도 이렇게 할 수 있을까요?"
  스타일: text-xl md:text-2xl font-black text-foreground
  여백: mb-3

[설명] "무료 상담을 통해 현재 상황에 맞는 솔루션을 제안해드립니다."
  스타일: text-muted-foreground text-sm md:text-base
  여백: mb-6

[버튼 행] flex flex-col sm:flex-row gap-3 justify-center
  버튼 1 — "무료 상담 신청"
    href="/contact"
    스타일: bg-primary text-primary-foreground font-bold px-7 py-3 rounded-xl
    hover: bg-primary/90

  버튼 2 — "다른 글 보기"
    href="/blog"
    스타일: border border-border text-foreground font-semibold px-7 py-3 rounded-xl
    hover: bg-muted
```

---

### Section 7 — 관련 글 (조건부)

```
조건: 같은 태그(post.tag)의 다른 글이 1개 이상일 때 (최대 2개 표시)
여백: mt-12

[H3] "관련 글"
  스타일: text-lg font-bold text-foreground
  여백: mb-6

[카드 그리드] grid grid-cols-1 sm:grid-cols-2 gap-4

[카드] Link href="/blog/[slug]"
  bg-card border border-border rounded-xl p-5
  hover: border-primary/40 (transition-all duration-200)
  group 클래스 사용 (hover 효과 연동)

  카드 내부:
    [태그 뱃지] text-xs font-bold px-2.5 py-1 rounded-full (태그 색상 시스템)
    [제목] mt-3 text-sm font-bold text-foreground group-hover:text-primary leading-snug
    [요약] mt-2 text-xs text-muted-foreground line-clamp-2
```

---

### Section 8 — Back link

```
여백: mt-10

"← 블로그 목록"
  Link href="/blog"
  스타일: text-muted-foreground text-sm hover:text-foreground inline-flex items-center gap-1
```

---

## 3. SEO / 구조화 데이터

```
JSON-LD 2종 (script type="application/ld+json"):

1. BlogPosting
   - headline: post.title
   - description: post.summary (전체 텍스트, 80자 제한 없음)
   - datePublished / dateModified: post.date
   - author: { @type: Organization, name: "(주)비젼솔루션" }
   - image: post.image | /api/og (fallback)

2. BreadcrumbList
   - 홈 → 블로그 → 글 제목

OG/Twitter 이미지:
   URL: /api/og?title=ENCODED_TITLE&tag=ENCODED_TAG
   크기: 1200×630
   메타 description: naverDesc() — 80자 이내 자연 절단
```

---

## 4. 전체 페이지 컨테이너

```
<div className="min-h-screen pt-28 pb-24 bg-background">
  <div className="max-w-[800px] mx-auto px-6 lg:px-8">
    ...
  </div>
</div>

※ 본문 가독성 최적화: max-w-800 (포스트 상세) vs max-w-1200 (목록/메인)
```

---

*저장 위치: `~/company/website/docs/design/layout-blog-post.md`*
