# 레이아웃 명세 — `/contact` (도입 상담 신청 페이지)

> VIS-5966 루틴 산출물 | AI 디자이너 작성 | 2026-09-01

---

## 0. 디자인 방향

- **분위기**: 신뢰·접근성·전환 최적화. 문의 장벽을 최소화하고 "지금 바로 신청"을 유도. 마스코트로 따뜻한 상담 감성 연출.
- **색상**: `--primary` 중심. 카드 테두리 `primary/60`, 입력 포커스 `primary/40`. 서비스별 탭 활성 시 `bg-primary text-primary-foreground`.
- **구조**: 좌(정보 카드 1열) + 우(탭 폼 2열) 3열 그리드. 모바일은 1열 스택.
- **폼 UX**: 서비스별 탭 전환(일반 상담·보안 점검·홈페이지 진단), URL 파라미터(`?service=`)로 진입 탭 사전 선택 지원.
- **접근성**: 필수 입력 `<span class="text-primary">*</span>` 표시, 선택 항목은 `(선택)` 텍스트.

---

## 1. 섹션 구조 (상단 → 하단)

| 순번 | 섹션 명 | 배경 | 레이아웃 유형 |
|------|---------|------|--------------|
| 1 | 헤더 (마스코트 + 타이틀) | `background` | 중앙 정렬 |
| 2 | 콘텐츠 그리드 | `background` | 3열 (정보 카드 1 + 탭 폼 2) |
| 2-L | 정보 카드 열 | — | 마스코트 버블 + 카드 3개 세로 |
| 2-R | 탭 폼 패널 | `card` | 탭 바 + 탭별 폼 |

---

## 2. 섹션별 상세 명세

### Section 1 — 헤더

```
배경: background
상하 패딩: pt-28 pb-0 (페이지 공통 상단 여백)
mb: 16 (mb-16)
정렬: 중앙(text-center 아님, 좌측 정렬 — 아래 타이틀 좌측)

[마스코트]
  pose="inquiry" category="support" size="md"
  높이: h-56
  정렬: flex justify-center, mb-6

[배지]
  텍스트: "CONTACT"
  스타일: text-primary, text-xs, font-bold, tracking-[0.2em], uppercase, mb-4

[H1]
  텍스트: "도입 상담 신청"
  스타일: text-4xl md:text-5xl, font-black, text-foreground, mb-4

[부제목]
  텍스트: "도입 상담은 무료입니다.\n영업일 기준 1일 내 답장드립니다."
  스타일: text-muted-foreground, text-lg, leading-relaxed
```

---

### Section 2-L — 정보 카드 열

```
레이아웃: space-y-4 세로 스택
상단: 마스코트 버블 (pose="greeting", category="situation", size="sm", h-28)
      bubble="무엇이든 물어보세요!" bubbleDir="right"

[정보 카드 3개] — bg-card border border-border rounded-xl p-6
  hover: border-primary/40 transition-all duration-200

  카드 내부:
    아이콘 컨테이너: w-11 h-11 rounded-xl bg-primary/10 border border-primary/20
                    flex items-center justify-center, mb-4
                    hover: bg-primary/20 border-primary/40
    아이콘: w-5 h-5 text-primary strokeWidth 1.5

    제목: text-foreground, font-bold, mb-1
    값 (링크): text-primary text-sm hover:underline
    값 (텍스트): text-muted-foreground text-sm

  카드 목록:
    1. Mail     | 이메일     | biztalktome@gmail.com (mailto 링크)
    2. Globe    | 웹사이트   | visionc.co.kr (텍스트)
    3. Clock    | 응답 시간  | 영업일 기준 1일 내 (텍스트)
```

---

### Section 2-R — 탭 폼 패널

```
레이아웃: lg:col-span-2
컨테이너: relative bg-card border-2 border-primary/60 rounded-xl
          shadow-[0_4px_40px_rgba(var(--primary-rgb),0.25)] overflow-hidden

[상단 강조 바]
  absolute inset-x-0 top-0 h-[3px] bg-primary

[탭 바]
  border-b border-border, pt-5 px-5, gap-1, flex

  탭 버튼 3개 (flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-bold):
    - 일반 상담  (MessageSquare 아이콘)
    - 보안 점검  (Shield 아이콘)
    - 홈페이지 진단 (MonitorCheck 아이콘)

  활성 탭: bg-primary text-primary-foreground
  비활성 탭: text-muted-foreground hover:text-foreground hover:bg-muted

[탭 콘텐츠 영역]
  p-8

  ─────────────────────────────────────────────
  탭 A: 일반 상담 (tab=contact)
  ─────────────────────────────────────────────
  H2: "[Briefcase 아이콘] 도입 상담 신청"
      text-foreground text-2xl font-black mb-6

  폼 (space-y-5):
    행 1 — 2열 그리드 (sm:grid-cols-2):
      이름* | 이메일*
    행 2:
      회사명 (선택)
    행 3:
      문의 서비스* (select)
      옵션: FactoryLens / 기업 AI 도입 및 컨설팅 / 보안 진단 /
             모의해킹 진단 (29만원) / 홈페이지 리뉴얼·운영 /
             앱·시스템 개발 / AI 챗봇 설치 / 기타
    행 4:
      문의 내용* (textarea rows=6)

    [pentest 선택 시 추가 동의 박스]
      bg-primary/5 border border-primary/30 rounded-xl p-5
      체크리스트 5개 (✓ primary 색상, text-xs)
      동의 체크박스 + 약관 링크

    제출 버튼:
      w-full h-14 bg-primary rounded-xl font-bold text-base
      shadow-lg shadow-primary/40 hover:shadow-primary/60
      disabled: opacity-40 cursor-not-allowed
      로딩 시: Loader2 animate-spin + "전송 중..."

    안내: "영업일 기준 1일 내 이메일로 답장드립니다" (text-center text-muted-foreground text-sm)

  ─────────────────────────────────────────────
  탭 A 완료 상태 (done=true)
  ─────────────────────────────────────────────
    py-10 text-center
    마스코트: pose="cheer" bubble="문의 접수 완료!" h-28
    H2: "문의가 접수됐습니다" (text-2xl font-bold mb-3)
    부제: "영업일 기준 1일 내 이메일로 답장드립니다" (text-sm)

  ─────────────────────────────────────────────
  탭 B: 보안 점검 (tab=security)
  ─────────────────────────────────────────────
    H2: "사이트 보안 셀프 점검" (text-2xl font-black mb-6)
    컴포넌트: <UrlAnalysisForm serviceType="security" embedded />
    안내 텍스트: "도메인 이메일 인증 후 자동 분석 → PDF 리포트 발송
                 (인증 링크 24시간 유효)"

  ─────────────────────────────────────────────
  탭 C: 홈페이지 진단 (tab=renewal)
  ─────────────────────────────────────────────
    H2: "홈페이지 현황 자동 진단" (text-2xl font-black mb-6)
    컴포넌트: <RenewalDiagnosisForm />
```

---

## 3. 입력 스타일 공통 (inputCls)

```
bg-secondary border-2 border-primary/50 rounded-xl
px-5 py-4 text-foreground text-[1.05rem]
placeholder: text-foreground/40
focus: border-primary ring-2 ring-primary/40
transition-all
```

---

## 4. URL 파라미터 진입 동작

| 파라미터 | 동작 |
|---------|------|
| `?service=security` | 보안 점검 탭으로 자동 전환 |
| `?service=renewal` | 홈페이지 진단 탭으로 자동 전환 |
| `?service=pentest` | 일반 상담 탭 유지, 서비스 select를 pentest로 사전 선택 |

---

## 5. 반응형

| 뷰포트 | 레이아웃 |
|--------|---------|
| 모바일 (<lg) | 1열 — 정보 카드 먼저, 탭 폼 아래 |
| 데스크톱 (≥lg) | 3열 그리드 (lg:col-span-2) |
