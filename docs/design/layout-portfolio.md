# 레이아웃 명세 — `/portfolio` (포트폴리오 페이지)

> VIS-5961 루틴 산출물 | AI 디자이너 작성 | 2026-09-01

---

## 0. 디자인 방향

- **분위기**: 실적 기반 신뢰. "18년 경력, 247건 납품"의 사실을 간결하게 전달. 포트폴리오지만 사례 비공개이므로 산업 영역·서비스 영역·프로세스 중심으로 신뢰를 쌓는 구조.
- **색상**: `--primary`, `--primary-light`, `--primary-bright` 중심. 배경은 `var(--background)`, `var(--card)` 교차. 수치 색: `--primary-light`.
- **타이포**: H1 font-black text-4xl~5xl, H2 font-black text-3xl~4xl, 섹션 레이블 text-xs uppercase tracking-[0.15em].
- **UI 원칙**: rounded-xl(12px). 카드 기반 grid (auto-fit 또는 고정 열 수). CTA 2개 (상담 신청 + 강좌 보기).
- **애니메이션**: 컴포넌트 레벨에서 CSS 스타일 객체(fi 함수)로 delay 전달 — 추후 ScrollReveal 교체 여지 있음.
- **모바일 퍼스트**: grid 1열 → 2열 → 3열/5열 반응형. Hero 마스코트는 모바일에서 텍스트 아래로.

---

## 1. 섹션 구조 (상단 → 하단)

| 순번 | 섹션 명 | 배경 | 레이아웃 유형 |
|------|---------|------|--------------|
| 1 | Hero | radial-gradient (primary/12) | 2열 lg (텍스트 좌 + 마스코트 우) |
| 2 | 수치 띠 | `background` | 4열 (2열 sm → 4열 lg) 수치 그리드 |
| 3 | 산업 영역 | `background` | 3열 (1열 sm → 2열 sm → 3열 lg) 카드 |
| 4 | 서비스 영역 | `card` | 3열 (1열 → 2열 → 3열) 카드 |
| 5 | 사례 비공개 안내 | `background` | 단일 열 안내 박스 (max-w-3xl) |
| 6 | 5단계 프로세스 | `background` | 5열 (2열 sm → 3열 sm → 5열 lg) 스텝 카드 |
| 7 | 최종 CTA | radial-gradient (primary/18) | 중앙 정렬 + 마스코트 + CTA 2개 |

---

## 2. 섹션별 상세 명세

### Section 1 — Hero

```
레이아웃: 2열 lg 그리드 (grid lg:grid-cols-2 gap-10 items-center)
배경: radial-gradient(ellipse 80% 40% at 50% 0%, primary/12 → transparent)
최대 폭: max-w-[1100px]
패딩: pt-24 pb-16 px-6

[좌측 텍스트]
  - 배지(pill):
      텍스트: "Portfolio"
      스타일: primary/20 배경, primary-bright 텍스트, primary/40 border
              text-xs, font-black, uppercase, tracking-widest, borderRadius 999
  - H1 (text-4xl md:text-5xl, font-black, tracking-tight, break-keep):
      "다양한 산업의"
      "[디지털 전환을 함께해 왔습니다]" → primary-light 강조
  - 본문 (text-muted-foreground, text-lg, leading-relaxed):
      "2007년 설립 이후 누적 247건+ 프로젝트."
      "중소기업·공공기관·소상공인 대상 [그룹웨어·ERP·홈페이지·앱·AI 솔루션] 전 영역."
      → 강조: bold text-foreground
  - CTA 버튼 2개 (flex gap-3 flex-wrap pt-2):
      Primary: "[Briefcase] 도입 상담 신청 →"
               bg-primary, text-primary-foreground, font-bold, px-8, py-3.5, rounded-xl
      Secondary: "[GraduationCap] 사내 출강 강좌 보기"
                 transparent, primary-light 텍스트, primary/60 border

[우측 — 중앙 정렬]
  Mascot: pose="portfolio" category="service" size="md" h-56
          alt="VISIONC 마스코트 — 포트폴리오"
```

---

### Section 2 — 수치 띠

```
배경: background
패딩: py-16 px-6
최대 폭: max-w-5xl

레이아웃: grid grid-cols-2 lg:grid-cols-4 gap-8, text-center
  공통: flex flex-col items-center gap-1.5

수치 4개:
  1. CountUp 247 suffix "+" → label "완료 프로젝트" / sub "2007년 이후 누적"
  2. CountUp 18 suffix "년+" → label "운영 경력" / sub "벤처기업 등록"
  3. CountUp 4.9 decimals 1 → label "고객 만족도" / sub "납품 후 설문 / 5.0 만점"
  4. CountUp 97 suffix "%" → label "재의뢰율" / sub "한 번 함께하면 계속 함께"

수치 폰트: text-5xl, font-black, tabular-nums, primary-light
라벨: text-sm, font-bold, text-foreground
서브: text-xs, text-muted-foreground
```

---

### Section 3 — 산업 영역 (Industries)

```
배경: background
패딩: py-20 px-6
최대 폭: max-w-5xl

[섹션 헤더]
  레이블: "Industries" (text-xs, font-black, uppercase, tracking-[0.15em], primary-light, mb-2)
  H2: "함께해 온 산업 영역" (text-3xl md:text-4xl, font-black)
  서브: "중소기업·공공기관·소상공인까지. 산업별 업무 특성에 맞춰 솔루션을 설계해 왔습니다."
        → muted-foreground, max-w-2xl

[산업 카드 6개] — grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4
  각 카드: bg-card, border border-border, rounded-xl, p-6, flex, gap-4, items-start

  아이콘 (w-7 h-7, text-primary, shrink-0):
    Factory / Hospital / ShoppingCart / Building2 / Utensils / GraduationCap

  내용:
    제목: font-black, text-foreground, mb-1
    설명: text-sm, text-muted-foreground, leading-snug

  항목 목록:
    제조·B2B     — MES·ERP·그룹웨어 등 사내 인프라
    병원·의원    — 비영리기관 그룹웨어·예약·CRM
    쇼핑몰·유통  — 쇼핑몰·유통 ERP·재고 관리
    공공기관     — 경기도·서울시 산하 웹접근성 사이트
    음식점·서비스업 — 예약·주문·고객 응대 자동화
    교육·학원    — 학원 관리·온라인 강좌·LMS
```

---

### Section 4 — 서비스 영역 (Services)

```
배경: card
패딩: py-20 px-6
최대 폭: max-w-5xl

[섹션 헤더]
  레이블: "Services" (text-xs, font-black, uppercase, tracking-[0.15em], primary-light)
  H2: "제공하는 서비스 영역"
  서브: "기획·설계부터 구축·교육·운영까지. 한 팀이 끝까지 책임지는 통합 트랙입니다."

[서비스 카드 6개] — grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4
  각 카드: bg-background, border border-border, rounded-xl, p-6, flex, gap-4, items-start

  아이콘 (w-7 h-7, text-primary, shrink-0):
    Bot / Lock / Monitor / Smartphone / Settings / Handshake

  내용:
    제목: font-black, text-foreground, mb-1
    설명: text-sm, text-muted-foreground, leading-snug

  항목 목록:
    기업 AI 도입     — 컨설팅 → 구축 → 사내 출강 교육. LLM·자율 에이전트·RAG 챗봇
    보안 진단·모의해킹 — SSL·보안헤더·취약점 진단 + 실제 침투 테스트
    웹사이트·리뉴얼   — 신규 제작·리뉴얼·웹접근성. Core Web Vitals 기준 통과
    앱·시스템 개발    — 모바일 앱·사내 업무 시스템·그룹웨어·ERP 풀스택 구축
    인프라·운영       — 서버 구축·온프레미스·프라이빗 클라우드·SaaS 운영
    사후 관리         — 6개월 무상 + 월정액 유지보수·운영 대행
```

---

### Section 5 — 사례 비공개 안내

```
배경: background
패딩: py-14 px-6
최대 폭: max-w-3xl, mx-auto

안내 박스: bg-card, border border-border, rounded-xl, p-7, flex, flex-col sm:flex-row, gap-5, items-start
  - [Lock 아이콘] w-7 h-7, text-muted-foreground, shrink-0
  - 내용 (flex-1):
      제목: "개별 사례는 비공개 운영입니다" (font-black, text-foreground, mb-2)
      설명: "보안 정책과 의뢰사 NDA로 개별 프로젝트의 식별 가능한 사례는 공개하지 않습니다.
            공개 가능한 사례는 의뢰사 동의를 받아 순차적으로 업데이트할 예정입니다.
            업종·규모가 비슷한 사례는 [도입 상담]에서 직접 안내해 드립니다."
            → [도입 상담]: href=/contact, font-bold, underline, primary-light

  (text-sm, text-muted-foreground, leading-relaxed)
```

---

### Section 6 — 5단계 프로세스 (Process)

```
배경: background
패딩: py-20 px-6
최대 폭: max-w-5xl

[섹션 헤더]
  레이블: "Process" (text-xs, font-black, uppercase, tracking-[0.15em], primary-light)
  H2: "의뢰부터 사후 관리까지, 5단계"
  서브: "처음 의뢰하는 분들도 쉽게 이해할 수 있도록 단계별로 정리했습니다."
        → muted-foreground, max-w-2xl

[스텝 카드 5개] — grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4
  각 카드: bg-card, border border-border, rounded-xl, p-5, flex, flex-col, gap-3, items-start

  번호 배지: w-8 h-8, rounded-lg, primary/20 배경, primary-light 텍스트
             text-xs, font-black, flex items-center justify-center

  마스코트: Mascot h-16

  내용:
    제목: font-black, text-foreground, text-sm
    서브: text-xs, text-muted-foreground, mt-0.5, leading-snug

  스텝 목록:
    01 도입 상담    — pose="greeting" category="situation" | "업무·현황 파악 + 도입 우선순위 정리"
    02 솔루션 설계  — pose="guide" category="situation"   | "요구사항 정리 + 기술 스택·일정·범위"
    03 구축·학습    — pose="develop" category="process"   | "개발·구축 + 사내 인수인계·교육"
    04 인수·검수    — pose="analytics" category="process" | "실사용 검수 + 보안·성능 점검"
    05 사후 관리    — pose="cheer" category="emotion"     | "6개월 무상 + 월정액 유지보수·운영"
```

---

### Section 7 — 최종 CTA

```
레이아웃: 중앙 정렬 flex flex-col items-center gap-5
배경: radial-gradient(ellipse 90% 60% at 50% 0%, primary/18 → transparent)
패딩: py-20 px-6
최대 폭: max-w-2xl, mx-auto

마스코트: Mascot pose="cheer" category="emotion" size="sm" h-28
          bubble="AI 도입, 같이 시작해요!" bubbleDir="left"

H2: "우리 회사에 맞는 솔루션,"
    "[1시간 상담으로 그려 드립니다.]" → primary-light
    text-3xl md:text-4xl, font-black, leading-snug

본문 (muted-foreground, max-w-lg):
  "업무 진단부터 도입 우선순위·ROI 추정까지. 컨설팅·구축·사내 출강 교육을 한 팀이 끝까지 책임집니다."

CTA 버튼 2개 (flex gap-3 flex-wrap justify-center pt-2):
  Primary: "[Briefcase] 도입 상담 신청 →"
           bg-primary, text-primary-foreground, font-bold, px-10, py-4, rounded-xl, text-base
  Secondary: "기업 AI 도입 트랙 보기"
             transparent, primary-light, primary/60 border, px-10, py-4, rounded-xl

연락처 (text-xs, text-muted-foreground, pt-2):
  "[Phone 아이콘] 평일 09:00~18:00 | 카카오톡 문의 가능 | biztalktome@gmail.com"
  ※ 이메일은 dangerouslySetInnerHTML + Cloudflare email_off 주석으로 래핑
```

---

## 3. 특이사항

- **사례 비공개 구조**: NDA·보안 정책으로 개별 프로젝트 사례를 공개하지 않음. 산업·서비스·프로세스 섹션으로 대체하여 신뢰 전달.
- **CountUp**: IntersectionObserver + rAF. rootMargin `-100px` (about 페이지의 `-80px`과 차이 있음).
- **fi() 함수**: 현재 구현에서 delay 스타일 객체를 반환하는 더미 함수 (`const fi = (_delay: number) => ({})`) — 추후 ScrollReveal로 교체 예정.
- **Mascot 포즈**: 각 프로세스 스텝에 맞는 포즈를 지정. `category`와 `pose`는 Mascot 컴포넌트 내부 이미지 경로와 연동.
- **이메일 표시**: `dangerouslySetInnerHTML`로 Cloudflare `<!--email_off-->` 래핑 필수.
