# CHANGELOG — Vision Solution 웹사이트

---

## [2026-05-11] — VISI 마스코트 전사 적용 + 홈페이지 섹션 개편

### 개요
전체 서비스 페이지에 VISI 마스코트 통합, 홈페이지 하단 섹션 현행 컨셉 통일, 다크 테마 Lottie 아이콘 버그 수정, 폼 UX 개선, CSS 토큰 하드코딩 교체.

---

### 1. VISI 마스코트 전사 적용

**컴포넌트**: `src/components/visi/VisiMascot.tsx`

| 항목 | 내용 |
|------|------|
| 스타일 | 카카오 프렌즈 계열, 크림색 바디 + 직사각형 보라 안경 |
| 포즈 | default · thumbsUp · wave · thinking · typing · pointing · magnify · happy · cheering · writing |
| 말풍선 | `bg-card border-border text-foreground` (CSS 토큰) — 다크모드 대응 |
| import | named export `import { VisiMascot } from '@/components/visi/VisiMascot'` |

**적용 페이지**

| 페이지 | 파일 | VISI 위치 |
|--------|------|-----------|
| 홈페이지 리뉴얼 | `src/app/renewal/page.tsx` | 히어로 일러스트, 스텝 카드, CTA |
| 신규 사이트 구축 | `src/app/new-website/page.tsx` | 히어로, 스텝, CTA |
| 유지보수 | `src/app/maintenance/page.tsx` | 히어로, 스텝, CTA |
| AI 솔루션 | `src/app/ai-solution/page.tsx` | 히어로, 스텝, CTA |
| 앱·시스템 개발 | `src/app/app-dev/page.tsx` | 히어로, 스텝, CTA |
| 보안 진단 | `src/app/security/page.tsx` | 히어로 일러스트, 스텝 포즈, CTA |
| 챗봇 | `src/app/chatbot/page.tsx` | 히어로, 스텝 카드, CTA |
| 소개 | `src/app/about/page.tsx` | 히어로 일러스트, Final CTA |
| 포트폴리오 | `src/app/portfolio/page.tsx` | 히어로 일러스트, 스텝 카드, CTA |
| 문의 | `src/app/contact/page.tsx` | 완료 상태, 좌측 정보 컬럼 |

**히어로 패턴**: 2컬럼 레이아웃 (좌: 텍스트, 우: 커스텀 SVG 일러스트 + VISI)
- 일러스트 60~70%, VISI 30~40% 비중
- 각 서비스 특성에 맞는 커스텀 SVG 제작 (인라인)

---

### 2. 홈페이지 서비스 이후 섹션 리디자인

**파일**: `src/components/landing/`

#### 서비스 카드 (FeaturesSection)
- 레이아웃: `gap-px bg-border` 구분선 그리드 → `gap-4` 개별 `rounded-2xl` 카드
- 호버 효과: `bg-card/80` (거의 변화 없음) → **`bg-primary` 완전 색 반전**
  - 배경·텍스트·아이콘·배지 모두 흰색 전환
  - `-translate-y-2` 리프트 + `shadow-primary/30`
  - "자세히 보기 →" CTA 호버 시 페이드인

#### 프로세스 섹션 (HowItWorksSection)
- 우측 패널: 빈 숫자 박스 → VISI 마스코트 (단계별 포즈 자동 전환)
  - `AnimatePresence` scale+opacity 트랜지션
  - 상단 진행 dots 추가
- 애니메이션: `IntersectionObserver` CSS → Framer Motion `whileInView`

#### 후기 섹션 (TestimonialsSection)
- 헤더 우측: VISI `thumbsUp` 추가 ("실제 고객 후기예요!")
- Framer Motion 스태거 등장 적용

#### CTA 섹션 (CtaSection)
- VISI `cheering` 헤딩 위 추가
- URL 입력창: `rounded-full` → `rounded-xl`, `bg-[#12101e] border-2 border-white/20`
- Framer Motion 적용

---

### 3. 폼 UX 개선 (전체 통일)

**대상**: `UrlAnalysisForm`, 문의 페이지 폼

```
변경 전: bg-background border border-border rounded-lg
변경 후: bg-[#12101e] border-2 border-white/20 rounded-xl px-4 py-3.5 text-base placeholder:text-white/25
```

- 레이블: `font-semibold` + `text-foreground/90`
- 폼 컨테이너: `bg-[#0f0d1a] border-2 border-white/10 rounded-2xl`
- 제출 버튼: `h-14 rounded-xl text-base font-bold`
- 드롭다운: `appearance-none` + `colorScheme: 'dark'`

---

### 4. Lottie 아이콘 버그 수정

**원인**: 어두운 배경(`#0d0d16`)에서 흰색/라이트 계열 아트워크를 가진 Lottie 파일이 렌더링되지 않음

| 페이지 | 대상 파일 | 교체 |
|--------|-----------|------|
| 보안 진단 | `hacker.json` (danger 01) | 💳 이모지 |
| 보안 진단 | `warning.json` (danger 02) | ☠️ 이모지 |
| 보안 진단 | `shield.json` (check 02) | 🛡️ 이모지 |
| 보안 진단 | `hacker.json` (check 04) | 🔑 이모지 |
| 소개 | `ring.json` (프로젝트 수) | 🚀 이모지 |
| 소개 | `ring.json` (납기 준수율) | ⚡ 이모지 |
| 소개 | `star.json` (고객 만족도) | ⭐ 이모지 |
| 소개 | `check.json` (재의뢰율) | 🤝 이모지 |

---

### 5. 소개 페이지 수치 섹션 개선

**파일**: `src/app/about/page.tsx`

- 3개 카드 좌측 쏠림 → `display: grid auto-fit minmax(240px, 1fr)` 균등 분배
- 4번째 카드 추가: **97% 재의뢰율** (청록 accent, 🤝)
- `height: 100%`로 카드 높이 통일

---

### 6. CSS 토큰 하드코딩 교체

| 파일 | 항목 | 변경 |
|------|------|------|
| `VisiMascot.tsx` | 말풍선 `bg-white text-gray-900` | `bg-card border-border text-foreground` |
| `navigation.tsx` | 히어로 CTA `bg-white text-black` | `bg-primary text-primary-foreground` |

---

### 7. Paperclip 루틴 등록

**루틴**: 블로그 자동 발행 (3일 1회)
- **ID**: `dc0c84d6-da82-4305-a66a-4a02590d6b24`
- **스케줄**: `0 9 */3 * *` (Asia/Seoul) — 매 3일 오전 9시
- **워크플로우**:
  1. 트렌드 스카우트 → 실제 뉴스/통계 리서치 (출처 필수, 해외자료 한글번역 필수)
  2. 콘텐츠 라이터 → 작성 (사실 기반 100%, 강력 후킹 제목, 내부 링크, SEO 최적화)
  3. 마케팅 검증관 → 팩트체크 + SEO + 제목-내용 일치 검증
  4. 퍼블리셔 → MD 파일 생성 + 빌드 + git push
- **목적**: visionc.co.kr 유입 증대 (블로그 → 서비스 페이지 → 문의 전환)

---

### Paperclip 종결 이슈

| 이슈 | 처리 내용 |
|------|-----------|
| VIS-1136 | nav CTA 토큰 교체 후 종결 |
| VIS-1139 | VIS-1136 종결로 불필요 → 종결 |
| VIS-1140 | VisiMascot 말풍선 토큰 교체 후 종결 |
| VIS-1141 | VIS-1140 종결로 불필요 → 종결 |
| VIS-1108 | 환경 제약 → 홈페이지 세션 종료와 함께 종결 |

---

### 커밋 이력 (이번 세션)

| 해시 | 내용 |
|------|------|
| `7e99ebf` | fix: CSS 토큰 하드코딩 교체 (말풍선·nav CTA) |
| `71bbf86` | fix: 소개 페이지 Lottie → 이모지 교체 |
| `751d45e` | fix: 소개 수치 섹션 4번째 카드 + 그리드 레이아웃 |
| `ba25471` | feat: 서비스 카드 호버 색 반전 효과 |
| `44e4b61` | refactor: 홈페이지 하단 3개 섹션 현행 컨셉 통일 |
| `9407d31` | fix: 보안 페이지 Lottie → 이모지 교체 |
| `0acd6da` | style: 전체 폼 입력 가시성 개선 |
| `e2d65ce` | feat: contact·about·portfolio VISI 마스코트 통합 |
| `a5ddbd2` | feat: security·chatbot VISI 마스코트 통합 |
| `b2955af` | feat: ai-solution·app-dev·new-website·maintenance VISI 통합 |
| `a03b576` | feat: VisiMascot 컴포넌트 신규 추가 + renewal 적용 |
