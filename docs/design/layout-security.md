# 레이아웃 명세 — `/security` (보안 진단)

> VIS-6006 루틴 산출물 | AI 디자이너 작성 | 2026-09-02
> 이전 VIS-196(2026-04-17) 명세를 현행 구현 기준으로 전면 재작성.

---

## 0. 디자인 방향

- **분위기**: 긴장감(해킹 위협) → 공감(내 상황 인식) → 이해(위험 수치) → 확신(진단 과정) → 안도(무료 진단 CTA)
- **색상**: `--primary` (주요 버튼·강조) + `--destructive` / `--accent-red` (위협 강조) + `--accent-green` (안전 확인) + `--accent-amber` (경고) + `--accent-orange` (주의)
- **Hero 배경**: `radial-gradient(ellipse at 50% -10%, color-mix(in oklch, var(--destructive) 18%, transparent) 0%, transparent 65%)` — 위협 분위기
- **타이포**: H1 `text-5xl md:text-6xl lg:text-7xl font-black`, H2 `text-3xl md:text-4xl font-black`
- **인터랙션**: Framer Motion `fadeInUp` + stagger (SSR 안전 — `initial={false}`), CountUpNumber (카운트업), RadialGauge (반원 SVG 애니메이션)
- **Lottie**: `/lottie/lock.json`, `/lottie/alert.json`, `/lottie/scan.json`, `/lottie/check.json` — 동적 import (SSR 비활성화)
- **마스코트**: 각 위치에 적합한 pose/category 사용

---

## 1. 섹션 구조 (상단 → 하단)

| 순번 | 섹션 명 | 배경 | 레이아웃 |
|------|---------|------|---------|
| 1 | Hero | `background` + radial 빨강 그래디언트 오버레이 | 2열 (텍스트 좌 + 일러스트·마스코트 우) |
| 2 | 공감 체크리스트 | `secondary` | 2열 카드 그리드 + 하단 CTA 배너 |
| 3 | Stats (통계) | `foreground/[0.02]` + border-y | 4열 RadialGauge + 카운트업 |
| 4 | 위험 사례 | `background` | 2×2 카드 그리드 (색상별) |
| 5 | 점검 항목 | `foreground/[0.02]` + border-y | 2×4 → 4×3 카드 그리드 |
| 6 | 중간 CTA | `background` + 빨강 radial | 중앙 정렬 단일 열 |
| 7 | 진행 과정 | `background` | 6단계 수평 스텝퍼 (데스크톱) / 세로 (모바일) |
| 8 | 지원 사이트 유형 | `foreground/[0.02]` + border-y | 3열 카드 그리드 |
| 9 | 관련 서비스 (모의해킹) | `background` | 단일 가로 배너 카드 |
| 10 | FAQ | `secondary` | 아코디언 목록 |
| 11 | 가격 안내 | `background` | 탭 바 + 상세 패키지 카드 |
| 12 | CTA + 폼 | `background` | 2열 (안내 좌 + 폼 우, sticky) |

---

## 2. 섹션별 상세 명세

### Section 1 — Hero

```
레이아웃: min-h-screen, flex 중앙 정렬, max-w-[1100px]
배경: radial-gradient(ellipse at 50% -10%, var(--destructive) 18% mix → transparent 65%)

[2열 grid lg:grid-cols-2, gap-10, items-center]

[좌측] Framer Motion stagger, initial={false} animate="visible"
  얼럿 배지 (항상 visible — SSR 키워드):
    bg-[var(--accent-red)]/10, border-[var(--accent-red)]/30, text-[var(--accent-red)]
    text-xs font-bold, px-4 py-1.5, rounded-full, w-fit
    · 빨강 닷 w-1.5 h-1.5 animate-pulse
    · "지금 이 순간도 해킹 시도 중"

  H1 (font-black, leading-tight):
    크기: text-5xl md:text-6xl lg:text-7xl
    1행: "지금 내 사이트,"
    2행: "털리고 있지 않나요?" (color: var(--accent-red))

  서브텍스트 (text-muted-foreground text-lg):
    "국내 중소기업 73%가 지금 해킹에 노출되어 있습니다."

  CTA 버튼:
    bg-primary text-primary-foreground, font-bold, px-9 py-3.5, rounded-xl
    href="#cta-form" "무료로 내 사이트 확인하기 →"

[우측] 세로 정렬, 중앙
  Mascot pose="svc_security" category="service" size="md" h-48
  SecurityHeroIllust (SVG 방패 + 마스코트 analytics/sm)
    방패 SVG: primary stroke, destructive 경고 배지, accent-green 체크 배지
```

---

### Section 2 — 공감 체크리스트 "혹시 이런 상황이세요?"

```
배경: bg-secondary, py-16, max-w-[1100px]

H2 (text-3xl md:text-4xl font-black, text-center): "혹시 이런 상황이세요?"

[2열 grid (sm:grid-cols-2), gap-4]
  7개 항목 — bg-card rounded-xl shadow-sm p-5, flex items-start gap-3
  아이콘: w-5 h-5 text-foreground/60
  텍스트: font-medium text-sm
  목록:
    1. Lock — "주소창에 자물쇠 표시가 없다"
    2. Clock — "마지막으로 보안 점검을 한 게 언제인지 모른다"
    3. Phone — "홈페이지를 만든 업체와 연락이 끊겼다"
    4. CircleHelp — "고객이 '이 사이트 안전한가요?'라고 물어본 적 있다"
    5. Key — "비밀번호를 한 번도 바꾼 적 없는 관리자 계정이 있다"
    6. Plug — "워드프레스나 플러그인 업데이트를 오래 안 했다"
    7. AlertTriangle — "어느 날 갑자기 사이트가 이상한 페이지로 바뀐 적 있다"

하단 CTA 배너:
  border-l-4 border-destructive, bg-destructive/10, px-6 py-4, rounded-r-xl
  "하나라도 해당된다면, 지금 보안 셀프 점검을 받아 보세요."
  버튼: bg-destructive text-destructive-foreground, font-bold, px-5 py-2.5, rounded-lg, text-sm
        "지금 무료 보안 진단 받기 →" href="#cta-form"
```

---

### Section 3 — Stats (통계 수치)

```
배경: bg-foreground/[0.02], border-y border-border, py-16
컨테이너: max-w-[1100px]

[4열 grid (grid-cols-2 lg:grid-cols-4), gap-8, text-center]
  4개 항목 — 각:
    RadialGauge(반원 SVG 애니메이션) — size=80, IntersectionObserver 트리거
    CountUpNumber — text-5xl font-black text-primary, tabular-nums
    설명 — text-muted-foreground text-sm

  데이터:
    · 73% / color=red / "중소기업 기본 보안 미설정"
    · 43초 / color=orange / "글로벌 해킹 공격 주기"
    · 3000만원 / color=amber / "개인정보 유출 최대 과태료"
    · 95% / color=red / "구글 위험 경고 시 즉시 이탈"
```

---

### Section 4 — 위험 사례 (Danger Cases)

```
배경: bg-background, py-16
컨테이너: max-w-[1100px]

H2 (font-black, text-center):
  '"우리 같은 작은 회사는 괜찮아"'
  '— 이 생각이 가장 위험합니다' (color: var(--accent-red))

[2×2 카드 grid (md:grid-cols-2), gap-5]
  4개 카드 — border rounded-xl p-6, flex-col items-center gap-3
  색상 테마별 배경/테두리:
    red: border-[var(--accent-red)]/30 bg-[var(--accent-red)]/5
    orange: border-[var(--accent-orange)]/30 bg-[var(--accent-orange)]/5
    amber: border-[var(--accent-amber)]/30 bg-[var(--accent-amber)]/5
    blue: border-[var(--accent-blue)]/30 bg-[var(--accent-blue)]/5

  아이콘 영역 h-[100px] — Lottie(100×100) 또는 Lucide 아이콘 h-14 w-14 text-foreground/70
  제목: font-bold text-base text-center
  사례 배너: border rounded-xl px-4 py-2, text-xs, Pin 아이콘 inline

  데이터:
    1. CreditCard / red / "고객 카드정보가 통째로 빠져나갑니다" / "쇼핑몰 2,300명 카드 유출..."
    2. Skull / orange / "내 사이트가 범죄 도구로 쓰입니다" / "소규모 병원 홈페이지 악성코드..."
    3. /lottie/alert.json / amber / "고객 DB가 경쟁사 손에 들어갑니다" / "인테리어 업체 견적 DB..."
    4. /lottie/scan.json / blue / "구글에서 영원히 사라집니다" / "여행사 블로그 월 5천 → 0명"
```

---

### Section 5 — 점검 항목 "무엇을 점검하나요?"

```
배경: bg-foreground/[0.02], border-y, py-16
컨테이너: max-w-[1100px]

H2 (font-black, text-center): "무엇을 점검하나요?"

[4열 카드 grid (grid-cols-2 md:grid-cols-4), gap-4]
  12개 항목 — bg-card border border-border rounded-xl p-5
              flex-col items-center gap-2.5 text-center
              hover:border-primary/40 transition-colors
  아이콘 영역 h-[72px] — Lottie(72×72) 또는 Lucide h-9 w-9 text-foreground/60
  소제목: text-primary text-xs font-bold (점검 항목명)
  제목: text-foreground font-bold text-sm leading-snug (질문형)

  데이터:
    1. /lottie/lock.json — "SSL/TLS A+~F 등급" — "암호화가 안전한가요?"
    2. Shield — "보안 헤더 13종" — "해킹 차단막이 있나요?"
    3. Lock — "쿠키 보안 플래그" — "세션이 보호되나요?"
    4. Globe — "CORS 설정 오류" — "데이터가 새고 있나요?"
    5. Mail — "이메일 보안 DNS" — "피싱 메일 차단됐나요?"
    6. FolderOpen — "민감 파일 30경로" — "소스코드가 노출됐나요?"
    7. Bug — "악성코드 탐지" — "바이러스가 숨어 있나요?"
    8. Ban — "구글·보안기관 블랙리스트" — "검색에서 차단됐나요?"
    9. /lottie/scan.json — "CMS·서버 버전 노출" — "해커에게 힌트 주고 있나요?"
    10. Key — "관리자 접근 보안" — "뒷문이 열려 있나요?"
    11. /lottie/alert.json — "SEO·신뢰도" — "구글이 경고하나요?"
    12. /lottie/check.json — "속도·성능" — "3초 안에 열리나요?"
```

---

### Section 6 — 중간 CTA

```
배경: background + radial-gradient(ellipse at 50% 50%, var(--destructive) 8% mix, transparent 70%)
py-12, text-center

레이블: text-[var(--accent-red)] text-xs font-bold tracking-[0.15em] uppercase mb-4
        "지금 바로 확인"
H2 (font-black, mb-6): "내 사이트는 안전한가요?"
CTA 버튼: bg-primary text-primary-foreground, font-bold, px-9 py-3.5, rounded-xl
          "사이트 보안 셀프 점검 →" href="#cta-form"
```

---

### Section 7 — 진행 과정 (6단계 스텝퍼)

```
배경: background, py-16
컨테이너: max-w-[1100px]

H2 (font-black, text-center, mb-12): "신청부터 완료까지"

[데스크톱 lg:flex] 수평 스텝퍼
  연결선: absolute top-6, h-0.5 bg-foreground/8 (첫~마지막 사이)
  각 스텝 w-[15%]:
    원형 번호 뱃지: w-12 h-12 rounded-full bg-primary text-primary-foreground
                  font-black text-sm, shadow-lg shadow-primary/30
    스텝 제목: font-bold text-sm text-center

[모바일 flex-col]
  각 스텝: 원형 뱃지 + 세로 연결선(w-0.5 h-8 bg-primary/20) + 스텝 제목 + Mascot

  6단계 데이터:
    01 — URL 입력 (pose=develop, process)
    02 — 자동 정밀 스캔 (pose=analytics, process)
    03 — 전문가 검토 (pose=thinking, emotion)
    04 — 알기 쉬운 결과 이메일 (pose=education, process)
    05 — 맞춤 견적 제안 (pose=guide, situation)
    06 — 개선 + 재진단 (pose=cheer, emotion)
```

---

### Section 8 — 지원 사이트 유형

```
배경: bg-foreground/[0.02], border-y, py-16
컨테이너: max-w-[700px], text-center

H2 (font-black, mb-10): "어떤 사이트에 가능한가요?"

[3열 grid (grid-cols-3), gap-3.5]
  6개 카드 — bg-card border rounded-xl py-4 px-3
  테두리 색상: ok=true → accent-green/30, ok=null → accent-amber/30, ok=false → accent-red/20 opacity-55
  아이콘: w-7 h-7 text-foreground/60
  레이블: font-bold text-sm
  O/△/✗ 마크: text-xl font-bold (색상 대응)

  데이터:
    Globe / 워드프레스 / ok=true  ✓
    Home / 일반 홈페이지 / ok=true  ✓
    ShoppingCart / 쇼핑몰 / ok=true  ✓
    Monitor / 커스텀 서버 / ok=true  ✓
    Store / 카페24 / 아임웹 / ok=null △
    Store / 스마트스토어 / ok=false ✗
```

---

### Section 9 — 관련 서비스 (모의해킹 배너)

```
배경: background, py-16
컨테이너: max-w-[900px]

배너 카드: rounded-xl border-2 border-primary/30 bg-primary/5 p-8 md:p-10
           flex flex-col md:flex-row gap-6 items-start md:items-center

[좌] Target 아이콘 w-12 h-12 text-primary
[중] 레이블: text-xs font-black uppercase tracking-[0.15em] text-primary-light
            "관련 서비스"
     H2: "실제 침투 테스트가 필요하다면 — 모의해킹 진단"
     설명: text-muted-foreground
[우] Link to /pentest: bg-primary, px-7 py-3.5, rounded-xl
                       "모의해킹 진단 보기 →"
```

---

### Section 10 — FAQ

```
배경: bg-secondary, py-16
컨테이너: max-w-[800px]

H2 (font-black, text-center, mb-10): "보안 진단 FAQ"

아코디언 목록 (space-y-2):
  각 항목: bg-card rounded-xl border border-border overflow-hidden
  버튼: w-full, flex items-center justify-between, p-5, text-left, font-semibold
        ChevronDown/Up w-5 h-5 (닫힘: muted, 열림: primary)
  내용 패널: grid transition-all duration-200
             grid-rows-[1fr] (열림) / grid-rows-[0fr] (닫힘)
             px-5 pb-5 text-muted-foreground text-sm leading-relaxed
             border-t border-border pt-4
```

---

### Section 11 — 가격 안내

```
배경: bg-background, py-16
컨테이너: max-w-[720px]

헤더: H2 "취약점 발견 시 개선 비용은?" (font-bold)
      설명: "진단은 무료. 개선 작업은 범위에 따라 별도 견적입니다."

[탭 바]: flex gap-1.5, p-1, bg-secondary, rounded-xl, mb-5
  4개 탭 버튼 (flex-1, py-2 px-2, rounded-lg):
    선택: bg-card shadow-sm text-foreground
    미선택: text-muted-foreground
    배지: absolute -top-1.5 -right-0.5 text-[9px] rounded-full
          추천→bg-primary text-primary-foreground, 나머지→bg-border

  탭 레이블: A 기본 / B 표준 / C 고급 / D 구독

[선택 패키지 카드]:
  Framer Motion animate 전환 (duration 0.18)
  rounded-xl border-2 — 추천(B): border-primary bg-primary/5, 나머지: border-border bg-card

  헤더 (p-6 pb-5 border-b):
    패키지명 font-bold + 가격 text-3xl font-black (추천: text-primary)
    대상 p: bg-secondary px-3 py-1.5 rounded-lg text-xs

  핵심 항목 목록 (p-6):
    체크 마크: 추천 → bg-primary/20 text-primary, 나머지 → bg-accent-green/15 text-accent-green
    더보기 토글 (ChevronDown/Up text-xs font-semibold)
    점검·수정 상세 목록 (펼침 시 표시, border-t pt-4)
    리포트 타입 뱃지:
      auto(A) → accent-green/10 border-accent-green/20 text-accent-green (FileText 아이콘)
      manual → accent-amber/10 border-accent-amber/20 text-accent-amber (ClipboardList 아이콘)

  CTA (px-6 pb-6):
    A 자동 → href="#cta-form" "사이트 보안 셀프 점검 →"
    B/C/D 수동 → href="/contact?service=security" "전문가 상담 신청하기 →"
    스타일: 추천→bg-primary, 나머지→bg-secondary border

  4개 패키지:
    A 보안 위생 패치 / ₩299,000 / auto / 핵심: SSL+헤더+쿠키+관리자 URL 변경
    B 표준 보안 강화 / ₩799,000 / manual / 핵심: A + XSS·SQLi·CORS·SPF·DMARC·민감파일
    C 심층 진단 + 수정 / ₩1,990,000 / manual / 핵심: B + WAF·Rate Limit·33항목 모의해킹·코드리뷰
    D 정기 모니터링 / ₩299,000/월 / manual / 핵심: 월1회 스캔+즉시 알림+월간 리포트

하단 주석: "※ 진단 결과서 기준으로 정확한 견적을 제공합니다. 부가세 별도."
```

---

### Section 12 — CTA + 폼

```
배경: background, id="cta-form", py-16
컨테이너: max-w-[1100px]

[2열 grid (lg:grid-cols-2), gap-12, items-start]

[좌측] 안내
  H2 (font-black, mb-6, leading-snug):
    "지금 바로 확인하세요."
    "무료입니다." (text-primary)

  무료 리포트 안내 카드:
    bg-card border-primary/20 rounded-xl p-5, mb-5
    레이블: text-xs font-bold text-primary uppercase tracking-wider
    10개 항목 리스트 (Lock/Shield/Search/Globe/Mail/FolderOpen/Bug/Monitor/Shield/DollarSign 아이콘)
    각 항목: 아이콘 + 제목(font-semibold text-sm) + 설명(text-muted-foreground text-xs)
    하단 주석: CheckCircle(accent-green) + 이메일 인증 → PDF 리포트 + 견적서 발송

  패키지 안내 카드:
    bg-[accent-amber]/5, border-[accent-amber]/20, rounded-xl px-4 py-3.5, mb-5
    레이블: text-[accent-amber] text-xs font-bold
    4줄 패키지 요약 (A/B/C/D — 이름/가격/설명)
    상담 링크: href="/contact?service=security" text-xs font-bold

  마스코트: pose="cheer" category="emotion" size="sm" h-28
            bubble="보안 걱정은 저한테 맡겨요!" bubbleDir="right"

[우측] lg:sticky lg:top-24
  UrlAnalysisForm
    serviceType="security"
    title="무료 보안 진단 신청"
    notice="도메인 이메일 인증 후 자동 분석 → PDF 리포트 발송 — 인증 링크 24시간 유효"
```

---

## 3. 컴포넌트 명세

### LottiePlayer (내부 유틸)
- dynamic import `lottie-react` (ssr: false)
- useEffect로 fetch → setData
- 미마운트/미로드 시: placeholder `<div style={{ width, height }} />`

### CountUpNumber (내부 유틸)
- useInView(margin: -100px, once: true) 트리거
- useMotionValue + useSpring(duration: 1500, bounce: 0)
- useTransform으로 정수 포맷

### RadialGauge (내부 유틸)
- 반원(180°) SVG path: `M (cx-r),(cy) A r,r 0 0 1 (cx+r),(cy)`
- 배경 track: text-foreground/10 strokeWidth=8
- 애니메이션 track: color-map(red/orange/amber) strokeWidth=8
- IntersectionObserver 트리거, useSpring(duration: 1500)

### SecurityHeroIllust (내부)
- SVG 방패 + 마스코트 analytics/sm 나란히
- 방패: primary stroke, destructive 경고 배지(!), accent-green 체크 배지(✓), amber 닷

---

## 4. 애니메이션 원칙

- **SSR 안전**: Hero 영역 `initial={false} animate="visible"` — SSR에서 숨김 없이 표시
- **스크롤 트리거**: Stats/Gauge/CountUp은 `useInView(once: true, margin: -100px)`
- **전환**: 패키지 카드 Framer Motion `animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}`
- **아코디언**: CSS grid-rows 트랜지션 (grid-rows-[0fr] → grid-rows-[1fr]), overflow-hidden
