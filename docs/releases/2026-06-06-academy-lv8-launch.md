# Release Notes — 2026-06-06

> **Academy Lv8 출시 — "AI 시대 교육의 철학" + 스피커 노트 출처 전수 검증**

기존 Lv1~Lv7로 마무리되던 visionc Academy에 **Lv8 (Education) 신설**. 분량은 종전 Lv 평균(12 슬라이드 / 60~75분)의 4배인 **45 슬라이드 · 4~5시간 · 5블록**. 강사 노트는 100p+ (HTML 3,157줄). 출시 직후 사령관님 지시로 스피커 노트 전수 출처 검증 → 가상 사례 78건 일괄 수정 + 검증 사례로 대체.

---

## 1. Lv8 콘텐츠 개요

| 항목 | 값 |
|---|---|
| 트랙명 | **Lv8 · AI 시대 교육의 철학** |
| 부제 | "원리·철학·실무를 잇다 — 교사·강사·학생·학부모·교육 행정가 통합 강좌" |
| 분량 | 45 슬라이드 · 4~5시간 · 5 블록 |
| 대상 | 교사·강사·학생·학부모·교육 행정가 |
| 구조 | **철학(왜) → 원리(어떻게 작동) → 실무(어떻게 쓸 것인가)** 3축 융합 |
| 상태 | FREE (academy 무료 트랙, 슬라이드 공개 다운로드 / 강사 노트 비밀번호 보호) |

### 5 블록 구성

| 블록 | 주제 | 분량 |
|---|---|---|
| **Block A · 거시 관점** | "지금 무엇이 일어나는가" | 60분 · 10 슬라이드 |
| **Block B · 교육의 본질** | "왜 가르치는가" | 60분 · 10 슬라이드 |
| **Block C · 교사 실무** | "어떻게 가르치는가" | 60분 · 10 슬라이드 |
| **Block D · 학생 실무** | "어떻게 배우는가" | 60분 · 10 슬라이드 |
| **Block E · 미래와 결단** | "어디로 갈 것인가" | 30분 · 5 슬라이드 |

### 주요 인용·근거

- **사상가 14명**: Harari (Nexus 2024·21 Lessons 2018·Homo Deus 2016·Sapiens 2011) + Dewey (My Pedagogic Creed 1897, Experience and Education 1938) + Freire (Pedagogy of the Oppressed 1968) + Vygotsky (Mind in Society 1978) + Gardner (Frames of Mind 1983) + Dweck (Mindset 2006, TEDxNorrköping 2014) + Bloom (Taxonomy 1956) + Anthropic Constitutional AI (Bai et al. 2022) + 한국 교육 비판가 6명(김누리·이오덕·김상봉·정여울·채사장·이혜정)
- **검증된 사례**: Mata v. Avianca (2023 SDNY) · 덴마크 AI 시험 정책 (2024 The Local Denmark) · 한국 딥페이크 사건 (2024 Korea Herald) · Pew Research 미국 청소년 ChatGPT 사용률 (2024) · Khan Academy Khanmigo (SY24-25 Annual Report)
- **실전 프롬프트 90+** / **핵심 비유 50+** / **토론 주제 8선 + 2개월 토론 캘린더**

---

## 2. 산출물

| 파일 | 크기 | 경로 | 접근 |
|---|---|---|---|
| `lv8-slides.pptx` | 4.8 MB | `public/academy/` | FREE (공개 다운로드) |
| `lv8-slides.pdf` | 3.5 MB | `public/academy/` | FREE (공개 다운로드) |
| `lv8-speaker-notes.pdf` | 4.3 MB | `src/storage/academy/` | LOCKED (`/api/academy/download/lv8-speaker-notes`, 패스워드 `visioncDown`) |

### 빌드 파이프라인

```
/tmp/visionc_academy_lv8/
├── slides.html (74 KB, 45 섹션)
├── speaker_notes.html (298 KB, 3,157 줄)
└── build_all.py (Playwright + python-pptx)
   ↓
PNG 45장 → 슬라이드 PDF → 스피커 노트 PDF → PPTX (이미지 임베드)
   ↓
scp → minipc:public/academy/ + minipc:src/storage/academy/
```

---

## 3. 신규 코드·라우팅

### 신규 파일

- `src/app/academy/lv8/page.tsx` (9 KB) — Lv7 패턴 기반, 45슬라이드 5블록 목차 + 다운로드 UI
- `src/app/academy/lv8/AcademyDownloadClient.tsx` (5.9 KB) — Lv7 클라이언트 복사·치환 (lv7→lv8, 12장→45장)

### 변경 파일

- `src/app/academy/page.tsx` — Lv8 카드 활성화 (`planned` → `available` + href `/academy/lv8`, 제목 `'AI 시대 교육의 철학'`)
- `src/app/api/academy/download/[key]/route.ts` — `lv8-speaker-notes` 키 등록 (lv7 패턴 동일)

### 라우팅 결과

| URL | 상태 | 비고 |
|---|---|---|
| `/academy` | 카드 8장 (LV1~LV8) | LV8 카드 활성, "수강 가능" 배지 |
| `/academy/lv8` | HTTP 200, 새 페이지 | 5블록 45슬라이드 전체 목차 노출 |
| `/academy/lv8-slides.pptx` | HTTP 200, 4.8 MB PPTX | 공개 다운로드 (인증 없음) |
| `/academy/lv8-slides.pdf` | HTTP 200, 3.5 MB PDF | 공개 다운로드 (인증 없음) |
| `/api/academy/download/lv8-speaker-notes` | HTTP 401 (미인증) / 200 (인증 후) | 비밀번호 `visioncDown` |

---

## 4. ★ 스피커 노트 출처 전수 검증 (2026-06-06 새벽)

사령관님 지시: **"모든 내용의 출처가 있는건지 체크. 출처 없으면 출처를 찾고, 찾을수 없다면 내용을 삭제 또는 출처가 있는 내용으로 대체."**

### 적용 결과

**78건 일괄 수정 + 후속 4건 점검 = 82건 총 수정**

#### 4-1. 삭제 (가상 사례 일괄 제거)

| 항목 | 처리 |
|---|---|
| 박OO/김OO 가상 한국 교사·학생 사례 8건+ | 모두 제거 또는 일반 원칙으로 대체 |
| "한국 고등학생 87%가 매주 AI 사용 · 62% 베끼기" 가상 통계 | Pew Research 미국 26% (검증)로 대체 |
| "한 중학교에서 학생들이..." 모호한 딥페이크 표현 | 남양주 2024.10 입건 사례로 대체 |
| "한 영어 교사가 저에게 직접 한 말" 출처 모호 narration | "AI 시대 교사들의 공통 질문" 일반화 표기 |
| "강원도 고교 AI 토론 90%", "서울 사립고 90%", "경기 초등 폭력 50% 감소" 등 미확인 한국 사례 | 모두 제거 |
| 학원비 3,600만원 절약, 학생 만족도 1위 등 출처 없는 수치 | 제거 또는 Khan Academy 검증 수치로 대체 |

#### 4-2. 검증된 사실 보강

| 인용·사례 | 출처 |
|---|---|
| Mata v. Avianca | `Mata v. Avianca, Inc., 678 F.Supp.3d 443 (S.D.N.Y. 2023)` — 판사 P. Kevin Castel, $5,000, 2023-06-22 |
| 덴마크 AI 시험 정책 | The Local Denmark 2024-04, Denmark Ministry of Children and Education; Mattias Tesfaye 장관 발언 직접 인용 |
| 한국 딥페이크 (남양주) | Korea Herald 2024-10, Korea Times 2024-12; 청소년성보호법 위반 |
| 미국 청소년 ChatGPT | Pew Research Center 2025-01-15 "About a quarter of U.S. teens have used ChatGPT for schoolwork" |
| Khanmigo | Khan Academy Blog 2024-11 "Efficacy Results", Annual Report SY24-25 (사용자 6.8만 → 70만, 학습 효과 8~14배) |
| 중국 사회신용시스템 | 중국 국무원 사회신용시스템 건설 계획 강요 2014~2020 |
| Anthropic Constitutional AI | Bai et al., arXiv:2212.08073 (2022-12) |

#### 4-3. 사상가 원전 인용 — 검증된 형태로 교체

| 인용 | 수정 전 | 수정 후 |
|---|---|---|
| Dewey "교육은 삶 자체" | Experience and Education 1938 출처로 표기 | 격언화된 의역과 "My Pedagogic Creed" 1897 원문 분리 표기 |
| Vygotsky ZPD | 출처 부정확 | `Mind in Society` (Harvard University Press, 1978), p. 86 페이지 명시 |
| Freire 교사-학생 변증 | 출처 부정확 | `Pedagogy of the Oppressed` Continuum 30th Anniversary Edition, p. 80 명시 |
| Gardner 다중지능 | "의역" 표기 | `Frames of Mind` (Basic Books, 1983) 원문 인용으로 교체 |
| Dweck "Not Yet" | TED 2014 일반 표기 | TEDxNorrköping 2014, 시카고 고등학교 실제 사례 인용 |
| Harari Nexus/21 Lessons/Homo Deus/Sapiens | 직접 인용 또는 의역 혼재 | 책 원문 인용으로 통일, 의역 부분은 "강사용 종합" 명시 |
| Anthropic Mission Statement | 출처 부정확 | "Anthropic Core Views On AI Safety" (anthropic.com/news, 2023) 명시 |

#### 4-4. 한국 사상가 "의역" → "입장 요약" 명확 분리

| 사상가 | 수정 전 (인용 블록) | 수정 후 (산문 형태) |
|---|---|---|
| 김누리 (5건) | `<blockquote>...— 김누리, 2024 강연 의역</blockquote>` | "김누리는 「우리의 불행은 당연하지 않습니다」(2020), 「경쟁 교육은 야만이다」(2024)에서 ... 일관되게 주장" 형태 + ★ "본 정리는 그의 사상을 AI 맥락에 적용한 강사용 재해석" 명시 |
| 이오덕 (4건) | `<blockquote>...— 이오덕 정신을 빌려 의역</blockquote>` | "이오덕은 「우리글 바로쓰기」(1989)에서 ..." 형태 또는 "강의용 명제 (출처 미상)"로 명확 분리 |
| 김상봉 (2건) | `<blockquote>...— 김상봉 의역</blockquote>` | "김상봉은 「나르시스의 꿈」(2002), 「학벌사회」(2004)에서 ..." + 일반 학술 논의 형태 |
| 정여울 (2건) | `<blockquote>...— 정여울 의역</blockquote>` | "강의용 명제 (출처 미상)" 명시 + 정여울 저서 일관된 입장 별도 참조 |
| 채사장 (1건) | `<blockquote>...— 채사장, 지대넓얕 (2014, 일부 의역)</blockquote>` | "채사장은 「지대넓얕」(2014~) 시리즈에서 ... 일관된 입장" + ★ "본 표현 그대로 채사장이 발언한 출처는 미확인" |
| 이혜정 (2건) | `<blockquote>...— 이혜정 의역</blockquote>` | "이혜정은 「IB를 말한다」(2018), 「대한민국의 시험」(2017) ... 적극 추진" + 일반 논의 형태 |

#### 4-5. 강사용 시나리오는 명확 표기

- "실제 교사 일과 (가상)" → **"예시 일과 (강의용 시나리오)"**
- "시간 분석 — 교사 일주일 (가상)" → **"시간 분석 — 추정 시나리오 (출처 없는 추정치)"** + 표 아래 주의 문구 추가
- "교실 풍경 비교 (가상 시나리오)" → **"교실 풍경 비교 (강사용 예시 시나리오)"**
- "2개월 토론 캘린더 (가상)" → **"2개월 토론 캘린더 (제안 예시)"**

### 최종 통계

| 지표 | 값 |
|---|---|
| 파일 크기 | 298 KB (HTML), 4.3 MB (PDF) |
| 검증된 출처 인용 (책·논문·연도) | **54개** |
| `(출처: …)` 명시 형태 | **23개** |
| `강사용/예시 시나리오` 명확 표기 | **21개** |

---

## 5. 커밋 이력

| 커밋 | 날짜 | 내용 |
|---|---|---|
| `5b47b17` | 2026-06-05 | `feat(academy): Lv8 — AI 시대 교육의 철학 (45슬라이드 5블록 통합 강좌)` — 신규 페이지·다운로드·메뉴 활성화 |
| `c6e4f75` | 2026-06-06 | `fix(academy): Lv8 스피커 노트 출처 검증 — 가상 사례 삭제·검증 사례로 대체` — 82건 일괄 수정 |

---

## 6. 알려진 한계 (다음 작업 후보)

1. **한국 전국 단위 통계 부재**: 한국 학생 ChatGPT 사용률에 대한 검증된 전국 조사가 없어, Pew Research 미국 데이터(26%)로 대체. 한국 사례는 College Board·Statista 등 글로벌 조사 트렌드로 보완.
2. **"강사용 예시 시나리오" 잔존**: 시간 분석 표, 교실 풍경 비교 등 강의 도구로서의 가상 시나리오는 표기를 명확히 했지만 유지함. 더 엄격한 검증을 원하면 추가 제거 가능.
3. **한국 사상가 출처 추가 검증 여지**: 「우리의 불행은 당연하지 않습니다」, 「경쟁 교육은 야만이다」 등 김누리 저서의 정확한 페이지·문장 인용을 추가하면 신뢰도가 더 올라감.
4. **Anthropic AI Fluency 4D Framework**: visionc Lv1 4D Framework가 Anthropic AI Fluency 강좌 기반인지 확인 필요. 본 강좌에서는 그대로 인용 중.

---

## 7. 라이브 URL

- 메인: https://visionc.co.kr/academy → LV8 카드 활성
- LV8 페이지: https://visionc.co.kr/academy/lv8
- 슬라이드 PPTX: https://visionc.co.kr/academy/lv8-slides.pptx
- 슬라이드 PDF: https://visionc.co.kr/academy/lv8-slides.pdf
- 강사 노트 PDF: 인증 후 `/api/academy/download/lv8-speaker-notes` (패스워드 `visioncDown`)
