# 레이아웃 명세 — `/blog` (인사이트 & 사례 블로그 목록 페이지)

> VIS-5966 루틴 산출물 | AI 디자이너 작성 | 2026-09-01 | 태그 현황 업데이트 2026-09-15 (VIS-6729) | 앰버 버킷 정정·코드 현황 갱신 2026-09-15 (VIS-6758) | primary 버킷 신규 태그 3건·수치 정정 2026-09-16 (VIS-6769) | [slug] 수량 오기 정정 61개 2026-09-16 (VIS-6783) | [slug] 신규 태그 29건 추가 90개 2026-09-17 (VIS-6834) | [slug] 신규 태그 3건 추가 93개 2026-09-17 (VIS-6848) | [slug] 신규 태그 2건 추가 95개 2026-09-17 (VIS-6868) | blog/page.tsx TAG_COLORS 21→95개 동기화 코드 현황 반영 2026-09-18 (VIS-6883) | primary 버킷 신규 태그 1건 추가 96개 2026-09-18 (VIS-6901) | primary 버킷 신규 태그 1건 추가 97개 2026-09-19 (VIS-6974) | primary 버킷 신규 태그 1건 추가 98개 2026-09-21 (VIS-7046) | primary·앰버 버킷 신규 태그 6건 추가 98→104개 2026-09-21 (VIS-7066) | 의미적 불일치 5건 수정 104→109개 2026-09-21 (VIS-7072) | 보안 계열 미등록 태그 13건 추가 109→122개 2026-09-21 (VIS-7077) | 미분류 태그 24건 추가 122→146개 2026-09-21 (VIS-7086)

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
      ※ SVG 커버 이미지 내 하드코딩 텍스트는 frontmatter title과 반드시 일치해야 함
        → 상세 규칙: layout-blog-post.md Section 2 참조 (VIS-6435 사례)

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

5색 버킷 + 기본값(fallback). 새 태그는 의미상 가장 가까운 버킷에 배치하거나, 어디에도 속하지 않으면 기본값 사용.

| 색상 버킷 | 현재 포함 태그 (blog/page.tsx) | 배경 | 텍스트 |
|-----------|-------------------------------|------|-------|
| 파랑 (리뉴얼) | 리뉴얼 사례 · 리뉴얼 비용 | `--accent-blue/10` | `--accent-blue` |
| 빨강 (보안) | 보안 경고 · 보안 점검 · 웹 보안 진단 · **사이버 공격** · **보안 취약점** · **AI 해킹** · **모의해킹** · **공공기관 보안** · **해킹 예방** · **AI 보안** · **AI 보안정책** · **침해사고** · **홈페이지 해킹** · **보안 헤더** · **취약점** · **데이터 보안** | `--accent-red/10` | `--accent-red` |
| primary (AI·자동화) | AI 활용 · AI 솔루션 · AI 에이전트 · 업무 자동화 · 생성형 AI · 오픈소스 AI · AI 뉴스 · 로컬 AI · **AI 영상** · **소라 대안** · **이미지 생성** · **Google Antigravity** · **Flowise** · **AI 이미지 편집** · **SenseNova U1** · **포토샵 대안** | `primary/10` | `primary` |
| 초록 (개발) | 개발 팁 · 앱 개발 | `--accent-green/10` | `--accent-green` |
| 앰버 (홈페이지·비즈니스) | 홈페이지 제작 · 유지보수 · 홈페이지 진단 · SEO 최적화 · SNS 마케팅 · 온라인마케팅 · **모두의AI** · **4K 상품 사진** | `--accent-amber/10` | `--accent-amber` |
| 기본값(fallback) | 매핑되지 않은 미분류 태그 | `primary/10` | `primary` |

> **코드 현황(2026-09-21 업데이트, VIS-7086):** `blog/page.tsx`와 `blog/[slug]/page.tsx` 모두 TAG_COLORS **146개**로 완전 동기화됨. 미분류 태그 24건 추가(VIS-7086, 122→146): 빨강(보안) 9건(HTTPS·ASM·API 키 관리·정보보호·개인정보 보호·KISA 무료 지원·안전진단·섀도AI·데이터거버넌스), 초록(개발) 2건(GitHub·GitHub 트렌딩), 앰버(비즈니스) 13건(마케팅·마케팅 AI·마케팅 자동화·SNS 자동화·E-E-A-T·검색엔진최적화·광고비용·네이버광고·구글 알고리즘·구글 코어 업데이트·구글 코어업데이트·카카오톡 마케팅·카카오채널). 이전: VIS-7077에서 보안 13건 추가(109→122).

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
