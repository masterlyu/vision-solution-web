# 레이아웃 명세 — `/chatbot` (AI 챗봇 서비스 페이지)

> VIS-5957 루틴 산출물 | AI 디자이너 작성 | 2026-09-01

---

## 0. 디자인 방향

- **분위기**: 소상공인에게 친숙하고 신뢰감 있는 톤. "쉽다", "빠르다", "저렴하다" 세 가지를 시각적으로 반복 강조.
- **색상**: `--primary` 중심. 배경은 `bg-background`와 `bg-secondary` 교차. 업종 카드는 그래디언트 배경(`from-[var(--accent-*)]/20 to-[var(--accent-*)]/5`).
- **타이포**: H1 font-black text-4xl~5xl, H2 font-black text-2xl~4xl, 본문 text-muted-foreground.
- **UI 원칙**: rounded-xl(12px). 카드 기반 1열·2열·3열·4열 반응형.
- **ScrollReveal**: Hero 제외 모든 섹션 `<ScrollReveal>` 래퍼 적용.
- **모바일 퍼스트**: 모바일에서 2열 → 1열 스택. Hero 일러스트는 모바일에서 텍스트 아래로.

---

## 1. 섹션 구조 (상단 → 하단)

| 순번 | 섹션 명 | 배경 | 레이아웃 유형 |
|------|---------|------|--------------|
| 1 | Hero | bg-background + from-primary/10 그라디언트 | 2열 (텍스트 좌 + 일러스트 우) |
| 2 | 수치 효과 | bg-secondary/50 | 4열 수치 그리드 |
| 3 | 계약·설치 3단계 | bg-background | 3열 스텝 카드 + 코드 미리보기 |
| 4 | 지원 플랫폼 | bg-secondary/30 | 2열(sm)→3열(md) 플랫폼 카드 |
| 5 | 업종별 적용 사례 | bg-background | 2열 Before/After 카드 |
| 6 | 라이브 데모 | bg-secondary/40 | 단일 열 중앙 정렬 데모 안내 |
| 7 | 가격 플랜 | bg-background | 3열 가격 카드 |
| 8 | FAQ | bg-secondary/30 | 단일 열 아코디언 |
| 9 | 최종 CTA | bg-background | 중앙 정렬 + 마스코트 + 버튼 2개 |

---

## 2. 섹션별 상세 명세

### Section 1 — Hero

```
레이아웃: 2열 lg 그리드 (텍스트 좌 | ChatbotHeroIllust 우)
배경: bg-background + absolute inset bg-gradient-to-br from-primary/10 via-background to-background
최대 폭: max-w-[1100px]
상하 패딩: pt-28 pb-20

[좌측 텍스트]
  - 배지(pill):
      아이콘: Zap (w-3.5)
      텍스트: "코드 2줄 · 5분 설치 · 24시간 응대"
      스타일: bg-primary/15 border border-primary/30 text-primary text-xs font-bold px-4 py-1.5 rounded-full
  - H1:
      "직원 월급의 [1/10 비용]으로"
      "24시간 고객 응대"
      → [1/10 비용]: text-primary 강조
      폰트: text-4xl md:text-5xl font-black leading-tight
  - 본문 (text-muted-foreground text-lg leading-relaxed):
      "자는 동안에도, 주말에도, 새벽에도—"
      "AI 챗봇이 고객 문의를 대신 받습니다."
      "[코드 2줄만 붙이면 내일부터 바로 시작됩니다.]" → strong text-foreground 강조
  - 보조 문구 (text-muted-foreground text-sm):
      "IT 지식 전혀 필요 없음 · 설치 대행 가능 · 월 단위 구독, 언제든 해지"
  - CTA 버튼 2개 (flex-col sm:flex-row gap-4):
      Primary: [Briefcase] "도입 상담 신청" [ArrowRight]
               → bg-primary text-primary-foreground rounded-xl px-8 py-4 font-bold
               → href: /contact
      Secondary: [MessageCircle] "챗봇 직접 체험하기 ↓"
               → border border-foreground/20 text-foreground/70 rounded-xl px-8 py-4 font-medium
               → href: #demo

[우측 일러스트 — ChatbotHeroIllust]
  - SVG 인라인 (viewBox 0 0 240 300, w=220 h=275)
  - 스마트폰 프레임 안에 챗봇 대화 시뮬레이션
  - 배경 rect: var(--background-deep), 테두리: var(--primary)
  - 봇 아바타(원) + "VISI 챗봇" 헤더
  - 온라인 표시 dot: var(--accent-green)
  - 버블: 봇(primary 배경) ↔ 사용자(background-deep 배경) 교차
  - 마스코트: pose="greeting" category="situation" size="sm" h-24
```

---

### Section 2 — 수치 효과 (ScrollReveal)

```
배경: bg-secondary/50
패딩: py-16 px-6
최대 폭: max-w-4xl

[수치 4개] — grid grid-cols-2 md:grid-cols-4 gap-6
  각 항목: text-center
    - 수치: text-4xl md:text-5xl font-black text-primary mb-1
    - 라벨: text-sm font-bold text-foreground mb-1
    - 부연: text-xs text-muted-foreground

  항목:
    85% / 고객 문의 자동 처리 / 반복 질문은 AI가 24시간 응대
    1/10 / 직원 인건비 대비 비용 / 월 5만원대~, 직원 채용 없이
    24h / 연중무휴 응대 / 새벽 2시 문의도 즉시 답변
    5분 / 설치 소요 시간 / 코드 2줄 붙여넣기가 전부
```

---

### Section 3 — 계약·설치 3단계 (ScrollReveal)

```
배경: bg-background
패딩: py-20 px-6
최대 폭: max-w-4xl

[섹션 헤더]
  H2: "계약부터 챗봇 live까지,"
      "딱 [3단계]" → [3단계]: text-primary
  font-black text-3xl md:text-4xl text-center mb-4
  서브: "복잡한 것 없습니다. 오늘 문의하면 내일 챗봇이 일합니다."
  text-muted-foreground text-center mb-14

[스텝 카드 × 3] — grid md:grid-cols-3 gap-6
  각 카드: bg-card border border-border rounded-xl p-6 relative
  → 카드 1·2 오른쪽 끝에 연결선: hidden md:block absolute top-10 -right-3 w-6 h-px bg-primary/40

  카드 구조:
    - 헤더 행: flex items-center justify-between mb-4
      → 번호 + 소요시간: flex items-center gap-3
        · 번호 원: w-10 h-10 rounded-full bg-primary/20 text-primary font-black text-sm
        · 소요시간 배지: text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full
      → 마스코트: size="sm" h-16 w-auto
    - H3: text-lg font-bold text-foreground mb-2
    - 본문: text-sm text-muted-foreground mb-3
    - 요약 코드: text-xs font-mono text-primary/70 bg-primary/5 px-3 py-2 rounded-lg

  스텝 항목:
    01 / 당일 처리 / 문의·계약 (pose=greeting)
      "홈페이지 문의 또는 이메일로 연락하시면 당일 안에 계약을 마칩니다."
      요약: "서비스 설명 → 간단한 계약서 → 완료"
    02 / 10분 이내 / 토큰 발급 (pose=develop)
      "계약 즉시 귀사 전용 토큰(코드)을 이메일로 발급해드립니다."
      요약: "이메일 수신 → 코드 1개 확인"
    03 / 5분 이내 / 내 홈페이지에 붙이기 (pose=guide)
      "받은 코드 2줄을 홈페이지에 붙여넣으면 끝입니다. IT 지식 필요 없습니다."
      요약: "복사 → 붙여넣기 → 챗봇 live!"

[코드 미리보기 블록] — mt-10
  배경: bg-[var(--code-bg,theme(colors.zinc.900))] border border-border rounded-xl p-6
  - 주석: text-xs text-muted-foreground mb-3 font-mono
  - 코드: font-mono text-sm (구문 강조: accent-green, accent-amber, accent-cyan)
    window.difyChatbotConfig = { token: '귀사 전용 토큰', baseUrl: '...' }
    <script src="https://chatbot.visionc.co.kr/embed.min.js" defer></script>
  - 설명: text-xs text-muted-foreground/70 mt-4
```

---

### Section 4 — 지원 플랫폼 (ScrollReveal)

```
배경: bg-secondary/30
패딩: py-16 px-6
최대 폭: max-w-4xl

[섹션 헤더]
  H2: "어떤 홈페이지든 설치 가능합니다"
  font-black text-2xl md:text-3xl text-center mb-3
  서브: "플랫폼마다 설치 가이드를 제공합니다. 어렵다면 원격 설치 대행 드립니다."
  text-muted-foreground text-center mb-10 text-sm

[플랫폼 카드 × 6] — grid grid-cols-2 md:grid-cols-3 gap-4
  각 카드: bg-card border border-border rounded-xl p-4 flex items-start gap-3
    - 아이콘 컨테이너: w-9 h-9 rounded-lg bg-primary/10, [아이콘] w-4.5 h-4.5 text-primary, shrink-0
    - 텍스트 그룹:
      · 이름: font-bold text-sm text-foreground
      · 설치 시간: text-xs text-primary font-semibold (e.g. "30초 설치")
      · 설명: text-xs text-muted-foreground mt-0.5

  항목:
    [Code2]       일반 HTML / 30초 / </body> 앞에 붙여넣기
    [Smartphone]  WordPress / 2분 / 테마 편집기 → footer.php
    [Store]       Cafe24 / 2분 / 레이아웃 HTML 편집
    [ShoppingBag] Shopify / 3분 / theme.liquid 편집
    [Building2]   Wix / 1분 / 맞춤 코드 설정
    [Zap]         기타 모든 사이트 / 5분↓ / 코드 2줄이면 어디든 OK
```

---

### Section 5 — 업종별 적용 사례 (ScrollReveal)

```
배경: bg-background
패딩: py-20 px-6
최대 폭: max-w-4xl

[섹션 헤더]
  H2: "업종 관계없이 바로 적용됩니다"
  font-black text-2xl md:text-3xl text-center mb-3
  서브: "쇼핑몰·학원·병원·부동산 — 고객 문의가 있는 곳이라면 어디든"
  text-muted-foreground text-center mb-10 text-sm

[업종 카드 × 4] — grid md:grid-cols-2 gap-5
  각 카드: rounded-xl bg-gradient-to-br {color} border border-border p-6
    - 헤더 행: flex items-center gap-3 mb-4
      · 아이콘 컨테이너: w-10 h-10 rounded-xl bg-background/50, [아이콘] w-5 h-5 text-foreground
      · 업종: font-bold text-foreground
    - Before/After:
      · Before: flex items-start gap-2 text-sm text-muted-foreground
          "Before" label: text-destructive font-bold shrink-0
      · After:  flex items-start gap-2 text-sm text-foreground
          "After" label: text-success font-bold shrink-0

  항목:
    [Store]      소매·쇼핑몰   / from-accent/20 to-accent/5   / 상품 문의→80% 절약
    [GraduationCap] 학원·교육  / from-accent-blue/20 to-/5    / 야간 주말 자동 안내
    [Heart]      병원·의원     / from-accent-red/20 to-/5      / 전화 50% 챗봇 전환
    [Building2]  부동산·법무   / from-accent-green/20 to-/5    / 24h FAQ로 신뢰 상승
```

---

### Section 6 — 라이브 데모 (ScrollReveal)

```
배경: bg-secondary/40
패딩: py-20 px-6
id="demo" (Hero 두 번째 CTA 앵커 타깃)

[중앙 정렬 컨테이너] — max-w-2xl mx-auto text-center
  H2: "지금 바로 체험해보세요"
  font-black text-2xl md:text-3xl text-foreground mb-4
  
  본문: "이 페이지 우측 하단의 [보라색 버튼]을 눌러보세요."
       "VISIONC에 도입된 실제 챗봇을 바로 체험할 수 있습니다."
       → [보라색 버튼]: text-primary 강조
  text-muted-foreground mb-8 text-sm

  [데모 배지]
    스타일: inline-flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl px-6 py-4
    - 아이콘 원: w-10 h-10 rounded-full bg-primary animate-pulse
        [MessageCircle] w-5 h-5 text-primary-foreground
    - 텍스트:
        "우측 하단 버튼 클릭" — text-sm font-bold text-foreground
        "실제로 사용 중인 챗봇 체험 가능" — text-xs text-muted-foreground
```

---

### Section 7 — 가격 플랜 (ScrollReveal)

```
배경: bg-background
패딩: py-20 px-6
최대 폭: max-w-4xl

[섹션 헤더]
  H2: "월 2만원대부터 시작합니다"
  font-black text-2xl md:text-3xl text-center mb-4
  서브: "최소 계약 기간 없음 · 언제든 해지 · 설치 대행 포함"
  text-muted-foreground text-sm text-center mb-12

[가격 카드 × 3] — grid md:grid-cols-3 gap-6
  기본 카드: bg-card border-border rounded-xl p-6 border relative flex flex-col
  하이라이트 카드: bg-primary/10 border-primary shadow-lg shadow-primary/10 rounded-xl p-6 relative flex flex-col
    - 추천 배지: absolute -top-3 left-1/2 -translate-x-1/2
                 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full

  카드 구조:
    - 플랜명: text-sm font-bold mb-1 (기본: text-muted-foreground, 하이라이트: text-primary)
    - 가격: text-2xl font-black text-foreground
    - 초기 설정비: text-xs text-muted-foreground mt-0.5
    - 항목 목록: space-y-2.5 mb-6 flex-1
        각 항목: [Check w-4 h-4 text-primary] text-sm text-muted-foreground
    - CTA 버튼: w-full text-center py-3 rounded-xl font-semibold text-sm
        기본: border border-foreground/20 text-foreground/70
        하이라이트: bg-primary text-primary-foreground
        → href: /contact ([Briefcase] 도입 상담 신청)

  플랜 항목:
    스타터     / 월 29,000원 / 초기 99,000원 / 챗봇1개·기본학습20개·이메일지원 / highlight=false
    비즈니스   / 월 59,000원 / 초기 99,000원 / 전체자동학습·우선이메일·월1회무료업데이트 / highlight=true
    프리미엄   / 월 99,000원 / 초기 무료     / 챗봇3개·전화이메일·무제한·맞춤디자인 / highlight=false

[하단 주석]
  "* 가격은 부가세 별도입니다. 대량 계약 시 별도 협의 가능합니다."
  text-center text-xs text-muted-foreground mt-6
```

---

### Section 8 — FAQ (ScrollReveal)

```
배경: bg-secondary/30
패딩: py-20 px-6
최대 폭: max-w-2xl

[섹션 헤더]
  H2: "자주 묻는 질문"
  font-black text-2xl md:text-3xl text-center mb-10

[아코디언 × 6] — space-y-3
  각 항목: bg-card border border-border rounded-xl overflow-hidden
    - 버튼 행: flex items-center justify-between px-5 py-4 text-left
      → 질문: text-sm font-semibold text-foreground pr-4
      → ChevronDown: w-4 h-4 text-muted-foreground, rotate-180 when open (transition-transform duration-200)
    - 답변 영역: grid-rows 애니메이션 (0fr ↔ 1fr) duration-200
      → 내용: px-5 pb-5, text-sm text-muted-foreground leading-relaxed

  FAQ 항목:
    Q1. IT를 전혀 모르는데 설치할 수 있나요?
    Q2. 우리 홈페이지가 오래된 사이트인데도 되나요?
    Q3. 챗봇이 우리 회사 정보를 어떻게 알고 답하나요?
    Q4. 챗봇이 잘못된 답변을 하면 어떻게 하나요?
    Q5. 계약 기간이 있나요? 중도 해지가 되나요?
    Q6. 홈페이지를 리뉴얼하면 다시 설치해야 하나요?
```

---

### Section 9 — 최종 CTA (ScrollReveal)

```
배경: bg-background
패딩: py-24 px-6
최대 폭: max-w-2xl mx-auto text-center

[마스코트]
  pose="cheer" category="emotion" size="sm" h-28 w-auto
  bubble="오늘 문의하면 내일부터 챗봇이 일해요!" bubbleDir="left"
  flex justify-center mb-6

[헤드라인]
  H2: "오늘 문의하면"
      "[내일 챗봇이 일합니다]" → text-primary
  font-black text-3xl md:text-4xl text-foreground mb-4

[서브텍스트]
  "복잡한 계약 없습니다. 긴 회의 없습니다."
  "문의 → 토큰 발급 → 코드 붙이기, 이게 전부입니다."
  text-muted-foreground mb-8

[CTA 버튼 2개] — flex-col sm:flex-row gap-4 justify-center
  Primary: [Briefcase] "도입 상담 신청" [ArrowRight]
           → bg-primary text-primary-foreground rounded-xl px-10 py-4 font-bold
           → href: /contact
  Secondary: "이메일 바로 보내기"
           → border border-foreground/20 text-foreground/70 rounded-xl px-8 py-4 font-medium
           → href: mailto:biztalktome@gmail.com

[하단 주석]
  "영업일 기준 당일 회신 · 설치 대행 무료 · 최소 계약 기간 없음"
  text-xs text-muted-foreground mt-6
```

---

## 3. 공통 컴포넌트 규칙

| 컴포넌트 | 규격 |
|---------|------|
| CTA 버튼 (primary) | bg-primary / text-primary-foreground / px-8~10 py-4 / rounded-xl / font-bold |
| CTA 버튼 (secondary) | border border-foreground/20 / text-foreground/70 / px-8 py-4 / rounded-xl / font-medium |
| 섹션 카드 | bg-card / border border-border / rounded-xl / p-4~6 |
| 아이콘 컨테이너 (대) | w-10 h-10 rounded-xl bg-primary/10 |
| 아이콘 컨테이너 (소) | w-9 h-9 rounded-lg bg-primary/10 |
| 배지(pill) | bg-primary/15 border-primary/30 text-primary text-xs font-bold px-4 py-1.5 rounded-full |
| 섹션 패딩 | py-16~20 px-6 |
| 최대 폭 | max-w-2xl (텍스트 집중) / max-w-4xl (카드) / max-w-[1100px] (Hero) |

---

## 4. 모바일 반응형 규칙

| 섹션 | 데스크탑 | 태블릿 (sm) | 모바일 |
|------|---------|-------------|--------|
| Hero | 2열 (텍스트 + 일러스트) | 1열 (일러스트 하단) | 1열 스택 |
| 수치 효과 | 4열 | 2열 | 2열 |
| 3단계 | 3열 + 연결선 | 1열 | 1열 |
| 플랫폼 | 3열 | 3열 | 2열 |
| 사례 | 2열 | 2열 | 1열 |
| 데모 | 중앙 정렬 | 동일 | 동일 |
| 가격 | 3열 | 1열 | 1열 |
| FAQ | 단일 열 | 동일 | 동일 |

---

## 5. ScrollReveal 적용 범위

| 섹션 | ScrollReveal |
|------|-------------|
| Hero | ✗ (즉시 표시) |
| 수치 효과 | ✓ |
| 3단계 | ✓ |
| 지원 플랫폼 | ✓ |
| 업종별 사례 | ✓ |
| 라이브 데모 | ✓ |
| 가격 플랜 | ✓ |
| FAQ | ✓ |
| 최종 CTA | ✓ |

---

*저장 위치: `~/company/website/docs/design/layout-chatbot.md`*
