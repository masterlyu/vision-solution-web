# 레이아웃 명세 — `/` (홈페이지)

> VIS-5975 루틴 산출물 | AI 디자이너 작성 | 2026-09-02 | 애니메이션 정정 2026-09-03

---

## 0. 디자인 방향

- **분위기**: 임팩트·긴박감·전문성. "중소기업이 AI 도입을 안 하면 매일 손해"라는 페인 포인트를 직접 제시하고, 이를 해결하는 파트너임을 수치·사례·과정으로 증명.
- **색상**: `--primary` 강조, 배경은 `var(--background)` 단색. 수치 강조는 `--primary`. 후기 내 성과치는 `--primary` bold.
- **타이포**: H1 font-weight 900 / clamp(3.5rem, 10vw, 5.5rem) / tracking-tight, H2 font-weight 900 / text-4xl~5xl, 본문 `text-foreground/90` font-medium.
- **UI 원칙**: 카드 `rounded-xl`(radius 12). 서비스 카드는 hover 시 `bg-primary`로 반전(배경+텍스트 전환). 섹션 구분은 배경색 교차 최소화 — `background`와 `card/30`으로만 교차.
- **애니메이션**: 2계층 구조. ① 섹션 진입: GSAP `<ScrollReveal>` 래퍼 (TrustSection~CtaSection 6개 섹션, Hero·마스코트영상은 제외). ② 컴포넌트 내부: Framer Motion `fadeInUp` + stagger (viewport once) — TestimonialsSection·HowItWorksSection·CtaSection. IntersectionObserver + requestAnimationFrame 기반 `Counter`(MetricsSection). HeroSection 단어 전환은 자체 블러·페이드 keyframe 애니메이션.
- **모바일 퍼스트**: 서비스 카드 1열 → 2열(md) → 3열(lg), 지표 2×2 → 4열(lg), 후기 1열 → 3열(lg).

---

## 1. 섹션 구조 (상단 → 하단)

| 순번 | 섹션 명 | 배경 | 레이아웃 유형 |
|------|---------|------|--------------|
| 1 | Hero | `background` + AsciiScene + 그래디언트 오버레이 | 단일 열 중앙 정렬, full-screen |
| 2 | 마스코트 영상 | `background` | 중앙 정렬 단일 열 |
| 3 | 신뢰 지표 (Trust) | `secondary` / border-y | 로고 마퀴 2행 + 신뢰 뱃지 5개 |
| 4 | 실적 수치 (Metrics) | `background` / border-y | 4열 카운터 그리드 |
| 5 | 서비스 (Features) | `background` | 플래그십 카드(2열) + 서비스 카드(3열) |
| 6 | 도입 과정 (HowItWorks) | `card/30` | 2열 (스텝 목록 좌 + 마스코트 패널 우) |
| 7 | 도입 사례 후기 (Testimonials) | `background` | 3열 카드 그리드 |
| 8 | CTA | `background` | 중앙 정렬 카드 (마우스 트래킹 그래디언트) |

---

## 2. 섹션별 상세 명세

### Section 1 — Hero (HeroSection)

```
레이아웃: 전체 화면(min-h-screen), flex 중앙 정렬, overflow-hidden
배경: background + AsciiScene (절대 배치, z-0)
      그래디언트 오버레이: from-background/20 via-background/40 to-background (z-1, 절대 전체)

[최대 폭: max-w-[1400px], 중앙 정렬, px-6 lg:px-12, text-center, z-10]

  상단 배지(pill):
    스타일: border border-primary/40, bg-primary/15, primary 텍스트
            text-sm font-bold, px-4 py-1.5, rounded-full, mb-8
    내용:
      · 펄스 닷: w-1.5 h-1.5 bg-primary animate-pulse, rounded-full
      · "기업 AI 도입 · 컨설팅 · 사내 출강"

  H1 (font-black, tracking-tight, leading-[1.05], mb-6):
    크기: text-5xl md:text-7xl lg:text-[88px]
    구조:
      1행: "중소기업은 지금도"
      2행: BlurWord — 2.8초마다 ["업무가 늦어지고", "비용이 새고", "고객을 놓치고"] 순환
           (문자별 blur→clear 트랜지션, cubic-ease, stagger 55ms, duration 500ms)
      3행: "있습니다"

  서브 텍스트 (text-lg md:text-xl, foreground/90, font-medium, mb-12):
    max-w-2xl, mx-auto, leading-relaxed
    "직원이 매일 2시간씩 반복 업무를 합니다."
    "AI 도입으로 [시간 35% · 비용 42% 절감]하세요." → primary bold

  CTA 버튼 2개 (flex-wrap, justify-center, gap-3):
    Primary: "[Briefcase] 도입 상담 신청 →"
             h-14 px-8 rounded-full bg-primary text-primary-foreground
             font-bold text-base, shadow-lg shadow-primary/50
    Secondary: "[GraduationCap] 사내 출강 강좌 보기"
               h-14 px-7 rounded-full, border-2 border-primary
               text-primary, hover:bg-primary/10

  보조 문구 (text-sm, foreground/85, font-medium, mt-4):
    "100만원대부터 시작 · 도입 사례 247건+ · 재의뢰율 97%"

[스크롤 인디케이터]
  위치: absolute bottom-8 left-1/2 -translate-x-1/2, z-10
  세로 선: w-px h-12, gradient from-foreground/0 to-foreground/30
```

---

### Section 2 — 마스코트 영상

```
레이아웃: flex justify-center, py-8, bg-background
  MascotVideo:
    src: /mascot/lg/company/cat_bow_web.mp4
    className: h-52 w-auto
    pauseSeconds: 3
```

---

### Section 3 — 신뢰 지표 (TrustSection)

```
배경: secondary, border-y border-border, py-14, overflow-hidden

[헤더 행] — max-w-[1400px] mx-auto px-6 mb-10
  flex-col sm:flex-row, align center, justify between, gap-4
  FadeIn (duration 700ms, translateY 24→0)
  - 레이블: "TRUSTED BY CLIENTS"
             0.75rem, weight 800, tracking-[0.18em], uppercase, muted-foreground
  - 실적: "누적 [247건+] 프로젝트 완료 · 고객 재의뢰율 [97%]"
           []: primary font-extrabold

[마퀴 행 1 — 좌측 스크롤]
  overflow-hidden, mb-3
  fade-mask: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)
  animate-marquee-left (2배 목록으로 무한 루프), hover:paused
  각 로고 칩: bg-card, border, rounded-lg, px-5 py-2.5
              text-[13px] weight 600, muted-foreground, letter-spacing 0.02em
              hover: border-primary/60, text-foreground, bg-primary/5, scale-105
                    shadow-[0_0_12px_rgba(var(--primary-rgb),0.15)]
  데이터 출처: content/company/clients.json → marqueeRow1

[마퀴 행 2 — 우측 스크롤]
  animate-marquee-right, 내부 2배 확장 (항목 수 부족 보완)
  데이터 출처: content/company/clients.json → marqueeRow2

[신뢰 뱃지 5개] — max-w-[1400px] mx-auto px-6 mt-10
  flex-wrap, justify-center, gap-x-12 gap-y-4
  각 뱃지: flex items-center gap-2
    - 아이콘 (4×4, primary): ShieldCheck / Clock / Wrench / Lock / Gift
    - 텍스트: text-sm weight 600, foreground/90

  데이터:
    · ShieldCheck "도입 상담 무료"
    · Clock       "영업일 1일 내 회신"
    · Wrench      "납품 후 6개월 A/S"
    · Lock        "개인정보 비침투 보장"
    · Gift        "일정 초과 시 전액 환불"
```

---

### Section 4 — 실적 수치 (MetricsSection)

```
배경: background, border-y border-border, py-20

[최대 폭: max-w-[1400px] mx-auto px-6 lg:px-12]
  grid grid-cols-2 lg:grid-cols-4, gap-12
  FadeIn 순차 (각 항목 delay i*100ms, duration 700ms, translateY 32→0)

  수치 폰트: text-5xl lg:text-6xl, font-black, primary, tabular-nums, mb-2
  Counter 컴포넌트: IntersectionObserver(threshold 0.5) → step 카운팅(step=max(1, ceil(end/60)), 24ms interval)

  4개 항목:
    카드 1: CountUp(247, suffix="건+") / 라벨 "누적 도입 프로젝트" / 서브 "중소기업·공공기관 · 18년 누적"
    카드 2: CountUp(35,  suffix="%")   / 라벨 "평균 시간 절감"    / 서브 "도입 6개월 후 반복 업무 기준"
    카드 3: CountUp(30,  suffix="일")  / 라벨 "평균 도입 기간"    / 서브 "상담 → 인수까지"
    카드 4: CountUp(97,  suffix="%")   / 라벨 "고객 재의뢰율"     / 서브 "서비스 만족도 기반"

  라벨: text-base font-bold foreground mb-1
  서브: text-sm font-medium foreground/85
```

---

### Section 5 — 서비스 (FeaturesSection)

```
배경: background (상대 위치), py-24 lg:py-32

[최대 폭: max-w-[1400px] mx-auto px-6 lg:px-12]

[섹션 헤더] FadeIn (duration 700ms), mb-16
  레이블: "SERVICES"
          primary, text-xs, weight 800, tracking-[0.2em], uppercase, mb-4
  H2: "필요한 것만, 정확하게" (text-4xl md:text-5xl font-black)
  서브: "중소기업 AI 도입부터 보안·웹·앱까지 단일 파트너로 해결합니다."
        foreground/90, text-lg font-medium, max-w-xl

──────────────────────────────────────────────────
[플래그십 카드 — FactoryLens]
  스타일: bg-card, border border-primary/30, rounded-xl, mb-4, overflow-hidden
          hover: border-primary, shadow-2xl shadow-primary/20
  레이아웃: grid lg:grid-cols-2

  [좌측 텍스트] p-8 lg:p-10, flex-col justify-center gap-4
    배지: "주력 제품 · FactoryLens" (primary text-xs weight 800 tracking-[0.15em] uppercase)
    H3: "표준 온톨로지 + 설명가능 AI 제조 생산관리 솔루션"
        text-2xl lg:text-3xl font-black leading-snug
    설명: text-sm leading-relaxed muted-foreground max-w-lg
    태그 2개: "시작 약 2주 온보딩" / "비용 협의"
              bg-primary/[0.08], border-primary/20, rounded-full, text-sm font-semibold primary
    링크: "자세히 보기 →" (primary text-sm font-semibold, hover gap 증가)
          "라이브 데모 ↗" (muted-foreground hover foreground text-sm)

  [우측 이미지] relative min-h-[220px] lg:min-h-full bg-secondary/30
    Image: /factorylens/factorylens-dashboard-viewport.png, fill, object-cover object-left-top

──────────────────────────────────────────────────
[서비스 카드 6개] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-4
  공통 스타일: bg-card, border border-border, rounded-xl, p-8, flex-col gap-6
               hover: bg-primary, border-primary, -translate-y-2, shadow-2xl shadow-primary/30
               transition-all duration-300, delay i*80ms

  카드 내부 공통:
    상단: 서비스 번호("01"~"06") + Mascot(pose, category, size="sm", h-24)
    중단: stat 뱃지(수치 bold + 라벨 muted) + 가격 pill(prefix muted + value bold)
    하단: H3(text-xl font-black) + 설명(text-sm leading-relaxed foreground/80)
    hover 시 모든 텍스트 → primary-foreground

  데이터:
    01 / ui_loading     / /ai-solution / "기업 AI 도입 및 컨설팅"     / stat "45강 사내 출강 강좌"    / price "100만원~"
    02 / svc_security   / /security    / "보안 진단"                   / stat "23개 평균 취약점 발견"  / price "30만원~"
    03 / svc_hacker     / /pentest     / "모의해킹 진단"               / stat "1~2일 소요 일수"        / price "단일가 29만원"
    04 / svc_renewal    / /renewal     / "웹사이트 리뉴얼·운영"        / stat "67% 평균 로딩 개선"     / price "80만원~"
    05 / svc_custom     / /app-dev     / "앱·시스템 개발"              / stat "120건+ 납품 실적"       / price "300만원~"
    06 / cheer(emotion) / /chatbot     / "AI 챗봇 설치"                / stat "월 5.9만~ 유지비"       / price "50만원~"
```

---

### Section 6 — 도입 과정 (HowItWorksSection)

```
배경: card/30, py-24 lg:py-32

[최대 폭: max-w-[1400px] mx-auto px-6 lg:px-12]

[섹션 헤더] Framer Motion stagger+fadeInUp, whileInView once, mb-16
  레이블: "PROCESS · AI 도입 컨설팅" (primary text-sm weight 800 tracking-[0.2em] uppercase mb-4)
  H2: "상담 → 설계 → 구축 → 운영 4단계로 진행됩니다"
      text-4xl md:text-5xl font-black tracking-tight

[2열 그리드] grid grid-cols-1 lg:grid-cols-2, gap-16, align-items center

  [좌측 — 스텝 목록] space-y-2
    자동 순환: setInterval 2800ms, active 인덱스 순환
    각 스텝 버튼:
      비활성: bg-transparent, border-2 border-foreground/10, hover:border-foreground/30
      활성:   bg-primary/10, border-2 border-primary/50
      padding: p-6, rounded-xl, 전환 duration 300ms

      내부 레이아웃: flex items-start gap-4
        번호: font-mono text-base font-bold (활성: primary, 비활성: foreground/75)
        제목: font-black text-lg mb-1 (활성: foreground, 비활성: foreground/90)
        세부(활성일 때만 표시):
          설명: foreground/90 text-base font-medium leading-relaxed
          기간: primary text-sm font-mono font-bold

    4개 스텝 데이터:
      01 "도입 상담"   / "30분 화상/방문. 업무·페인 포인트 공유 → AI 적용 영역 식별" / "1일 · 무료"
                        / mascot cheer(emotion) / bubble "편하게 말씀해 주세요!"
      02 "솔루션 설계" / "도입 영역 우선순위·도구 선정·ROI 시뮬레이션·예산·기간 제안" / "1주"
                        / mascot thinking(emotion) / bubble "맞춤 청사진 만들게요"
      03 "구축·학습"   / "챗봇·자동화·사내 LLM·에이전트 구축 + 데이터 학습 + 사내 교육" / "2~6주"
                        / mascot develop(process) / bubble "꼼꼼히 만들고 있어요"
      04 "인수·운영"   / "담당자 인수인계 + SOP·매뉴얼 + 30일 무상 A/S + 월 운영 옵션" / "상시"
                        / mascot happy(emotion) / bubble "운영도 함께해요!"

  [우측 — 마스코트 패널]
    relative h-[400px] lg:h-[460px], rounded-xl, bg-card
    border-2 border-foreground/10, overflow-hidden, flex items-center justify-center

    오버레이: absolute inset-0, gradient from-primary/5 via-transparent to-primary/3

    [상단 도트 인디케이터] absolute top-5 left-1/2 -translate-x-1/2, flex gap-2
      비활성: w-2 h-2 rounded-full bg-foreground/15, hover:bg-foreground/30
      활성:   w-6 h-2 rounded-full bg-primary

    [마스코트 표시영역] Framer Motion AnimatePresence (mode="wait")
      key={active} → fadeInUp 트랜지션 (opacity 0→1, scale 0.95→1, y 20→0)
      Mascot: size="lg" className="h-40 w-auto relative z-10"
              bubble 텍스트 표시 (bubbleDir="left", 마스코트 좌측)

    [스텝 정보 패널] absolute bottom-6, left-4 right-4
      bg-background/90, border border-foreground/10, rounded-xl, p-4
      AnimatePresence 전환 (opacity 0→1, y 10→0)
      제목: text-base font-black foreground
      설명: text-sm foreground/80 font-medium leading-relaxed mt-1
      기간: text-xs primary font-mono font-bold mt-2
```

---

### Section 7 — 도입 사례 후기 (TestimonialsSection)

```
배경: background, py-24 lg:py-32

[최대 폭: max-w-[1400px] mx-auto px-6 lg:px-12]

[섹션 헤더] Framer Motion stagger+fadeInUp, mb-16
  flex-col sm:flex-row, items-start sm:items-end, justify-between, gap-8

  [좌측]
    레이블: "TESTIMONIALS · AI 도입 사례" (primary text-sm weight 800 tracking-[0.2em] uppercase mb-4)
    H2: "실제 도입 결과" (text-4xl md:text-5xl font-black tracking-tight)
    서브: "한국 중소기업 6곳 — 시간·비용·매출 모두 개선했습니다." (foreground/90, text-lg font-medium, mt-4)
  [우측 — hidden sm:block]
    Mascot: pose="cheer" category="emotion" size="sm" h-28 w-auto
            bubble="실제 도입 사례예요!" bubbleDir="left"

[후기 카드 6개] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-6
  각 카드: bg-card, border-2 border-foreground/10, rounded-xl, p-8
           flex-col gap-6, hover:border-primary/50, transition-colors duration-300

  카드 구조:
    별점: Star w-4 h-4 fill-primary text-primary, 5개
    본문: text-base font-medium foreground/90 leading-relaxed flex-1
          (인용 형식, ldquo/rdquo 래핑)
          성과 수치: <strong> font-bold text-primary
    출처:
      이름: text-base font-bold foreground
      역할: text-sm font-medium foreground/85 mt-0.5

  6개 후기 데이터:
    1. "제조사 대표" (자동차 부품 1차 협력사 · 30명) — AI 챗봇 85% 자동처리, 야간 응대 0%→100%
    2. "온라인몰 대표" (패션 자체 브랜드 · 12명) — AI 상품 설명 30분→1분, 매출 증가
    3. "서비스업 원장" (인테리어 시공사 · 45명) — 보고서 자동화 1.5시간→0분
    4. "전자부품 대표" (커스텀 PCBA · 35명) — 견적 사이클 7일→2일, 수주율 +22%
    5. "화학 중기 대표" (화학 첨가제 · 45명) — 통역 외주 200만원→20만원, 수출 +38%
    6. "IT 서비스 인사팀" (직원 60명) — 이력서 스크리닝 2주→2일, 후보 품질 +40%
```

---

### Section 8 — CTA (CtaSection)

```
배경: background, py-24 lg:py-32

[최대 폭: max-w-[1400px] mx-auto px-6 lg:px-12]

[CTA 카드]
  스타일: relative, border-2 border-foreground/15, rounded-xl, overflow-hidden
  마우스 트래킹: onMouseMove → radial-gradient(600px circle at {x}% {y}%, rgba(primary,0.3), transparent 50%)
                 opacity-20, pointer-events-none, 절대 오버레이

  내부 padding: px-8 lg:px-16, py-16 lg:py-24
  중앙 정렬, Framer Motion stagger+fadeInUp, whileInView once

  마스코트: Mascot pose="cheer" category="emotion" size="sm" h-32 w-auto mb-6
            bubble="함께 시작해요!" bubbleDir="right"

  레이블: "지금 시작하세요" (primary text-sm weight 800 tracking-[0.2em] uppercase mb-6)

  H2: "중소기업 AI 도입"
      "지금 시작하세요"
      text-5xl md:text-6xl lg:text-7xl font-black tracking-tight, mb-6, leading-[1.05]

  서브 (text-lg md:text-xl font-medium mb-10, max-w-xl leading-relaxed):
    "100만원대부터 단계별로. 어떤 부서·어떤 업무가 적합한지"
    "[VISIONC와 함께 정합니다.]" → foreground bold

  CTA 버튼 2개 (flex-wrap justify-center gap-3 mb-6):
    Primary: "[Briefcase] 도입 상담 신청 →"
             h-14 px-8, rounded-xl, bg-primary text-primary-foreground
             font-bold, shadow-lg shadow-primary/50 hover:shadow-primary/70
    Secondary: "[GraduationCap] 사내 출강 강좌 보기"
               h-14 px-7, rounded-xl, border-2 border-primary
               text-primary, hover:bg-primary/10

  하단 링크 (flex items-center justify-center gap-6 text-sm foreground/85 font-medium):
    "[FolderOpen] 도입 사례" → /portfolio (hover:primary)
    "·"
    "[Newspaper] 인사이트 블로그" → /blog (hover:primary)
    "·"
    "247건+ 누적"
```

---

## 3. 데이터 의존성

| 파일 | 사용 섹션 |
|------|----------|
| `content/company/clients.json` → `marqueeRow1`, `marqueeRow2` | Section 3 (로고 마퀴) |
| `public/factorylens/factorylens-dashboard-viewport.png` | Section 5 (플래그십 카드 이미지) |
| `/mascot/lg/company/cat_bow_web.mp4` | Section 2 (마스코트 영상) |

---

## 4. 특이사항

- **AsciiScene**: dynamic import (`ssr: false`, loading: null). `background`를 직접 덮지 않고 z-0 → 그래디언트 오버레이(z-1)로 가시성 확보.
- **BlurWord**: 단어 내부는 `white-space: nowrap`, 단어 경계는 줄바꿈 허용 (공백 문자 기준 그룹 분리). 한 단어 내 글자는 stagger 55ms, cubic-ease duration 500ms.
- **서비스 카드 hover 반전**: `hover:bg-primary` 적용 시 `foreground`, `muted-foreground` 등 모든 텍스트 CSS 변수가 그대로 남아있어, 텍스트 가시성을 위해 hover 시 `text-primary-foreground`로 명시적 전환 필요.
- **MascotVideo**: `cat_bow_web.mp4` — 재생 후 `pauseSeconds` 경과 시 멈춤. SSR 안전.
- **HowItWorks 마스코트 패널**: Framer Motion AnimatePresence `mode="wait"` 로 active 전환 시 페이드 트랜지션. 닷 인디케이터도 연동.
- **CTA 마우스 트래킹**: `getComputedStyle`로 `--primary-rgb` 읽어 `useState`에 저장, useEffect 내 실행 (SSR 안전).
- **Framer Motion**: `initial={false}` + `whileInView="visible"` + `viewport={{ once: true, margin: '-100px' }}` 패턴 공통 적용.
