# 레이아웃 명세 — `/about` (회사 소개 페이지)

> VIS-5961 루틴 산출물 | AI 디자이너 작성 | 2026-09-01

---

## 0. 디자인 방향

- **분위기**: 신뢰·전문성·친근함. "중소기업의 동반자"라는 정체성을 수치·스토리·팀 소개로 구체화. 딱딱한 기업 소개가 아닌, 사람 냄새 나는 IT 파트너 이미지.
- **색상**: `--primary`, `--primary-light` 중심. 배경은 `var(--background)`, `var(--background-deep)`, `var(--card)` 3종 교차. 강조 수치는 `--accent-green`.
- **타이포**: H1 font-weight 900 / clamp(2.2rem, 7vw, 3.8rem), H2 font-weight 900 / clamp(1.6rem, 4vw, 2.6rem), 본문 `--muted-foreground`.
- **UI 원칙**: borderRadius 12px(rounded-xl). 카드 상단 3px gradient 바(`--primary` → `--primary-alt`). 카드 기반 grid, 반응형 auto-fit.
- **애니메이션**: `FadeInSection` (CSS keyframe fadeInUp, delay 순차 적용). 숫자는 IntersectionObserver 기반 CountUp.
- **모바일 퍼스트**: grid `auto-fit` → 1열 스택. Hero는 2열 → 1열.

---

## 1. 섹션 구조 (상단 → 하단)

| 순번 | 섹션 명 | 배경 | 레이아웃 유형 |
|------|---------|------|--------------|
| 1 | Hero | `background-deep` + radial-gradient primary/13 | 2열 (텍스트 좌 + 마스코트·일러스트 우) |
| 2 | 수치 증거 | `background` | 4열 수치 카드 그리드 |
| 3 | 미션/비전 + 창업 스토리 | `card` | 2열 (스토리 좌 + 미션/비전 박스 우) |
| 4 | 팀·서비스 소개 | `background-deep` | 6열 (auto-fit) 카드 그리드 |
| 5 | 차별화 3가지 | `background` | 3열 카드 |
| 6 | 연혁 타임라인 | `card` | 단일 열 수직 타임라인 (max-w-720) |
| 7 | 고객 신뢰 | `background-deep` | 인증 뱃지 + 리뷰 카드 3개 |
| 8a | 고객사 로고 띠 | `background` | 가로 flex wrap 로고 목록 |
| 8b | FAQ | `card` | 단일 열 Q&A 목록 (max-w-760) |
| 9 | 최종 CTA | `background-deep` + radial-gradient | 중앙 정렬 + 마스코트 + CTA 2개 |

---

## 2. 섹션별 상세 명세

### Section 1 — Hero

```
레이아웃: 2열 auto-fit 그리드 (min(320px, 100%))
배경: background-deep + radial-gradient(ellipse 80% 40% at 50% 0%, primary/13 → transparent)
최대 폭: max-w-[1100px]
상하 패딩: pt-[100px] pb-[80px]

[좌측 텍스트]
  - 배지(pill):
      텍스트: "회사 소개"
      스타일: primary/18 배경, primary-light 텍스트, primary/40 테두리, borderRadius 999,
              font-size 0.68rem, font-weight 800, letter-spacing 0.08em, uppercase
              padding: 4px 12px
  - H1 (font-weight 900, clamp(2.2rem, 7vw, 3.8rem), leading 1.15, letter-spacing -0.03em):
      "AI 도입, 막막한"
      "[중소기업의 동반자]" → primary-light 강조
  - 본문 (text-muted-foreground, 1.1rem, line-height 1.7):
      "Vision Solution은 [중소기업이 AI를 안전하게 도입·운영하도록 동반]합니다."
        → [] 부분: font-weight 700, foreground
      "부서별 LLM 활용부터 사내 자체 에이전트 구축까지 —"
      "[컨설팅·구축·사내 출강 교육]을 한 곳에서 제공합니다."
  - CTA 버튼 2개 (flex wrap, gap 14px):
      Primary: "[Briefcase] 도입 상담 신청 →" → bg-primary, px 36, py 15, radius 10
      Secondary: "[GraduationCap] 사내 출강 강좌 보기"
               → transparent, primary-light 텍스트, primary/55 border
  - 보조 문구 (0.82rem, muted-foreground):
      "누적 247건+ 프로젝트 · 재의뢰율 97% · 평균 응답 24시간 내"

[우측 — 중앙 정렬, flex-col, gap 16]
  - Mascot: pose="about" category="company" size="md" h-56
            alt="VISIONC 마스코트 — 회사 소개"
  - AboutHeroIllust (SVG, 260×240):
      · 노트북 바디 (rx=12, background-deep 배경, primary 테두리)
      · 화면 영역 (background), 헤더 바 (macOS 트래픽 라이트 포함)
      · URL 바 "visionc.co.kr" 텍스트
      · 막대 그래프 5개 (primary, 투명도 0.35~1.0)
      · 트렌드 라인 (accent-green polyline + 원 끝점)
      · "+240% 문의 증가" 뱃지 (accent-green/90 배경)
      · 우측 스마트폰 (문의+3건, 계약완료 ✓ 표시)
      · 노트북 베이스/힌지
  - Mascot happy/emotion/sm (h-24) — 일러스트 옆 보조
```

---

### Section 2 — 수치 증거 (FadeInSection)

```
배경: background
패딩: py-[88px] px-6
최대 폭: max-w-[1100px]

[섹션 헤더 — 중앙 정렬, mb-52]
  레이블: "실적 수치" (0.7rem, weight 800, uppercase, letter-spacing 0.16em, primary-light)
  H2: "숫자로 증명하는 Vision Solution"
  서브: "대형 에이전시 수준의 컨설팅·구축을, 중소기업도 부담 없는 가격으로 — AI 도입의 가장 합리적인 동반자가 되겠습니다."
        → max-w-520, muted-foreground

[수치 카드 4개] — grid auto-fit(min 240px), gap 20
  공통 스타일: bg-card, border border-border, radius 12, p-[36px 24px], text-center
               상단 3px gradient 바 (primary → primary-alt)

  카드 1: 수치 CountUp 247 + suffix "+"
           라벨: "완료한 프로젝트 수"
           서브: "중소기업·소상공인 고객사 기준"
  카드 2: 수치 CountUp 30 + suffix "일"
           라벨: "평균 납기 기간"
           서브: "상담 → 설계 → 구축 → 인수 평균"
  카드 3: 수치 CountUp 4.9 (소수 1자리) + suffix ""
           라벨: "고객 만족도"
           서브: "납품 후 고객 설문 기준 / 5.0점 만점"
  카드 4: 수치 CountUp 97 + suffix "%"
           라벨: "재의뢰율"
           서브: "한 번 함께하면 계속 함께합니다"

  수치 폰트: clamp(2.8rem, 6vw, 4rem), weight 900, letter-spacing -0.04em, primary-light, line-height 1
```

---

### Section 3 — 미션/비전 + 창업 스토리 (FadeInSection)

```
배경: card
패딩: py-[88px] px-6
최대 폭: max-w-[1100px]
레이아웃: 2열 auto-fit(min 320px), gap 60, align-items center

[좌측 — 창업 스토리]
  레이블: "창업 스토리" (uppercase, primary-light, 0.7rem)
  H2: '"AI를 몰라도,'
      '[도입에서 뒤처지면 안 된다]"' → primary-light 강조
  본문 3단락 (muted-foreground, line-height 1.7):
    1. "중소기업 사장님들을 만나면 공통점이 있습니다..."
    2. "대형 컨설팅사는 비싸고, 강의만 듣자니 실행이 막막하고..."
    3. "Vision Solution은 컨설팅·구축·사내 출강 교육을 한 곳에서 받을 수 있도록..."

[우측 — 미션/비전 박스 + CTA]
  미션/비전 박스:
    스타일: primary/35 테두리, primary/8 배경, radius 12, padding 32px 36px
    아이템 2개 (상하 border 구분):
      미션: ✦ 아이콘(primary-light) + 레이블 "미션" + 텍스트
            → "[중소기업이 AI를 안전하게 도입·운영하도록 동반]한다." (primary-light bold)
      비전: ✦ 아이콘 + 레이블 "비전" + 텍스트
            → "대한민국 중소기업 [10만 곳의 AI 도입 동반자]" (primary-light bold)

  CTA (mt-28):
    "기업 AI 도입 트랙 보러 가기 →" → bg-primary, full-width, radius 10, p-[15px 36px]
    보조: "컨설팅 · 구축 · 사내 출강 교육 한 곳에서" (0.82rem, muted-foreground, center)
```

---

### Section 4 — 팀·서비스 소개 (FadeInSection delay 순차)

```
배경: background-deep
패딩: py-[88px] px-6
최대 폭: max-w-[1100px]

[섹션 헤더 — 중앙 정렬, mb-52]
  레이블: "팀 소개" (uppercase, primary-light, 0.7rem)
  H2: "각 분야 전문가가 한 팀으로 움직입니다"
  서브: "컨설팅·구축·교육·보안·사후관리가 따로 일하는 구조가 아닙니다.
        처음 상담부터 운영까지, [같은 팀이 끝까지 책임합니다.]" → bold foreground

[카드 6개] — grid auto-fit(min 280px), gap 18
  공통 스타일: bg-card, border border-border, radius 12, p-[28px 24px]
               상단 3px gradient 바, height 100%, position relative overflow hidden

  카드 1: [Target 아이콘/primary-light] + 제목 "AI 컨설팅"
           태그라인: '"우리 회사에 맞는 AI는?"부터 시작' (primary-light, 0.82rem, bold)
           설명: "업무 진단 → 도입 우선순위 설계 → ROI 추정 → 단계별 도입 로드맵 제시"
  카드 2: [Bot] "AI 구축" / "LLM·자동화·자율 에이전트"
           설명: "챗봇·RAG·자체 에이전트까지. 고객사 상황에 맞춰 운영 비용 [30% 절감] 사례"
           → 30% 절감: accent-green bold
  카드 3: [GraduationCap] "사내 출강 강좌" / "visionc Enterprise Academy"
           설명: "부서별 AI 활용 [15강] + 사내 AI 구축 [30강] 사내 출강 트랙" (accent-green bold)
  카드 4: [Lock] "보안 진단·모의해킹" / "AI 도입의 첫 관문은 보안"
           설명: "SSL·보안헤더·취약점 진단 + 실제 침투 테스트. 납품 전 [20개 보안 항목] 필수 통과"
  카드 5: [Zap] "웹·앱 개발" / "모바일 앱부터 사내 시스템까지"
           설명: "풀스택 구축 + Google Core Web Vitals 기준 통과 납품. 누적 [120건+] 납품 실적"
  카드 6: [Users] "사후 관리·운영" / "납품 후가 진짜 시작입니다"
           설명: "[6개월 무상 유지보수] + 월 관리 플랜 + AI 모델·인프라 운영 대행"
```

---

### Section 5 — 차별화 3가지 (FadeInSection delay 순차)

```
배경: background
패딩: py-[88px] px-6
최대 폭: max-w-[1100px]

[섹션 헤더 — 중앙 정렬, mb-52]
  레이블: "우리가 다른 이유" (uppercase, primary-light, 0.7rem)
  H2: '"맡기고 나서도 안심"이 가능한 이유'

[카드 3개] — grid auto-fit(min 280px), gap 20
  공통 스타일: bg-card, border border-border, radius 12, p-[32px 28px], height 100%

  카드 1:
    번호: "01" (2.8rem, weight 900, primary/35, letter-spacing -0.04em)
    제목: "납기 준수 약속" (1.1rem, weight 800)
    설명: "약속한 날짜에 못 납품하면, [지연된 일수만큼 비용 환불].
          '3주 완성'이라고 하면 진짜 3주입니다." (accent-green bold)
  카드 2:
    번호: "02"
    제목: "가격 투명 공개"
    설명: "'상담 후 안내'라고만 쓰인 견적서는 드리지 않습니다.
          [기본형 100만원대부터], 범위를 먼저 안내드립니다." (accent-green bold)
  카드 3:
    번호: "03"
    제목: "납품 후 6개월 무상 A/S"
    설명: "납품 완료 후 [6개월은 추가 비용 없이] 수정 가능합니다.
          연락 두절? 저희는 다음날도 전화 받습니다." (accent-green bold)
```

---

### Section 6 — 연혁 타임라인 (FadeInSection delay 순차)

```
배경: card
패딩: py-[88px] px-6

[섹션 헤더 — 중앙 정렬, mb-52]
  레이블: "연혁" (uppercase, primary-light, 0.7rem)
  H2: "Vision Solution의 성장 기록"

[타임라인] — max-w-720, mx-auto, position relative
  수직 라인: position absolute, left 110px, top 0 ~ bottom 0, width 2px
              linear-gradient(to bottom, primary → primary/10)

  각 항목 (historyData 기준):
    레이아웃: flex, padding 20px 0
    - 연도 라벨: width 110px, text-right, paddingRight 28, weight 800, 0.9rem, primary-light
    - 타임라인 닷: width/height 14px, border-radius 50%, primary 배경
                  (accent 항목: linear-gradient primary → primary-alt)
                  border 2px solid background, z-index 1
    - 내용: paddingLeft 20px, flex 1
        제목: 0.95rem, weight 700 (accent 항목: primary-light 색)
        설명: 0.86rem, muted-foreground, line-height 1.55

  데이터 출처: content/company/history.json
```

---

### Section 7 — 고객 신뢰 (FadeInSection)

```
배경: background-deep
패딩: py-[88px] px-6
최대 폭: max-w-[1100px]

[섹션 헤더 — 중앙 정렬, mb-48]
  레이블: "고객 신뢰" (uppercase, primary-light, 0.7rem)
  H2: "직접 확인하세요"

[인증 뱃지 목록] — grid auto-fit(min 280px), gap 14, max-w-900, mx-auto, mb-52
  각 뱃지: bg-card, border, radius 12, p-[20px 22px], flex, gap 14, align center
  - 아이콘 (28px, primary-light): Rocket / ScrollText / Lock / Coffee / BadgeCheck / Building2
  - 텍스트: 제목(0.9rem, weight 800) + 서브(0.78rem, muted-foreground)
  데이터 출처: content/company/certifications.json

[실제 고객 후기]
  레이블: "실제 고객 후기" (0.72rem, uppercase, muted-foreground, center, mb-20)
  리뷰 카드 3개 — grid auto-fit(min 260px), gap 18
    각 카드: bg-card, border, radius 12, p-28
    - 별점 (Star 아이콘 5개, accent-amber fill) + "5.0 / 5.0" (0.78rem, accent-amber)
    - 큰따옴표 장식: "1.6rem, primary-light
    - 후기 본문 (0.93rem, italic, line-height 1.65)
    - 출처 (0.82rem, muted-foreground, weight 600): "— [지역] 소재 [업종] 대표"

  캐러셀 닷 (시각적 장식):
    flex justify-center, mt-20
    활성 닷: width 24, height 6, radius 3, primary
    비활성 닷: width 6, height 6, radius 3, border 색
```

---

### Section 8a — 고객사 로고 띠 (FadeInSection)

```
배경: background
패딩: py-[56px] px-6
최대 폭: max-w-[1100px]

레이블: "신뢰하는 고객사" (0.72rem, uppercase, letter-spacing 0.14em, muted-foreground, center, mb-28)
로고 목록: flex, gap 16, flex-wrap, justify center, align center
  각 로고: bg-card, border, radius 10, p-[12px 22px]
           0.78rem, weight 700, muted-foreground, letter-spacing 0.02em
  데이터 출처: content/company/clients.json → clients.featured 배열
```

---

### Section 8b — FAQ (FadeInSection delay 순차)

```
배경: card
패딩: py-[88px] px-6
최대 폭: max-w-760, mx-auto

[섹션 헤더 — 중앙 정렬, mb-48]
  레이블: "자주 묻는 질문" (uppercase, primary-light, 0.7rem)
  H2: "궁금하신 점이 있으신가요?"

FAQ 항목 7개 — border-bottom 구분 (마지막 항목 제외)
  각 항목: padding 22px 0
  - 질문: 1rem, weight 700, flex, gap 10
      번호: "Q{i+1}" → primary-light, shrink-0
      질문 텍스트
  - 답변: 0.9rem, muted-foreground, line-height 1.65, paddingLeft 28

  FAQ 항목:
    Q1. AI 도입 컨설팅 비용 / 100만원대부터, 1차 분석 후 견적
    Q2. IT 전담 인력 없어도 가능 / 한 팀이 전 과정 책임
    Q3. 데이터 유출 걱정 / 온프레미스·프라이빗 클라우드, PII 필터링
    Q4. visionc Enterprise Academy / 15강 + 30강, 사내 방문 강의
    Q5. 미팅 대면 여부 / 화상 가능, 카카오톡/이메일 소통
    Q6. 납품 후 수정 요청 / 6개월 무상, 이후 월정액 플랜
    Q7. 기존 홈페이지 리뉴얼 / 기존 도메인 유지하며 리뉴얼 가능
```

---

### Section 9 — 최종 CTA (FadeInSection)

```
레이아웃: 중앙 정렬
배경: background-deep + radial-gradient(ellipse 90% 60% at 50% 0%, primary/18 → transparent)
패딩: py-[100px] px-6
최대 폭: max-w-[1100px]

[마스코트]
  Mascot: pose="cheer" category="emotion" size="sm" h-32
          bubble="AI 도입, 같이 시작해요!" bubbleDir="left"

[긴급 배지]
  스타일: primary/18 배경, primary-light 텍스트, primary/40 border
          padding 6px 14px, radius 999, 0.72rem, uppercase, letter-spacing 0.08em
  인디케이터 닷: width/height 6px, border-radius 50%, primary-light
  텍스트: "지금 시작하세요"

H2: "AI 도입, 어디부터 시작할지"
    "[막막하지 않으셔도 됩니다.]" → primary-light
    max-w-700, mb-18

본문 (1.05rem, muted-foreground, max-w-560, mb-44):
  "업무 진단부터 도입 우선순위 설계까지 — 1시간 상담으로 우리 회사에 맞는 AI 로드맵을 그려 드립니다."
  "[컨설팅·구축·사내 출강 교육]을 한 팀이 끝까지 책임집니다." → bold foreground

CTA 버튼 2개 (flex wrap, justify center, gap 14):
  Primary: "[Briefcase] 도입 상담 신청 →" → bg-primary, px 40, py 16, radius 10, 1.05rem
  Secondary: "[GraduationCap] 사내 출강 강좌 보기"
             → transparent, primary-light, primary/55 border

연락처 (0.84rem, muted-foreground):
  "[Phone 아이콘] 평일 09:00~18:00 | 카카오톡 문의 가능 | biztalktome@gmail.com"
  ※ 이메일은 dangerouslySetInnerHTML + Cloudflare email_off 주석으로 래핑 (CF obfuscation 우회)
```

---

## 3. 데이터 의존성

| 파일 | 사용 섹션 |
|------|----------|
| `content/company/history.json` | Section 6 (연혁 타임라인) |
| `content/company/clients.json` → `clients.featured` | Section 8a (고객사 로고) |
| `content/company/certifications.json` | Section 7 (인증 뱃지) |

---

## 4. 특이사항

- **FadeInSection**: CSS keyframe `fadeInUp` 자동 재생 방식. `globals.css`에 정의. IO 기반 "숨기기→드러내기" 패턴 사용 금지(VIS-5373 이후 폐기).
- **CountUp**: IntersectionObserver + requestAnimationFrame. rootMargin `-80px` 적용.
- **AboutHeroIllust**: 인라인 SVG 컴포넌트. 노트북+스마트폰 모형에 성과 수치(+240% 문의, 계약완료) 포함. CSS 변수로 다크/라이트 대응.
- **이메일 표시**: `dangerouslySetInnerHTML`로 Cloudflare `<!--email_off-->` 래핑 필수 (React hydration 오류 방지, VIS 기준).
- **Lottie**: `dynamic(() => import('lottie-react'), { ssr: false })`로 SSR 방지.
