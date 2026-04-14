# VIS-112 Design Decisions — /security v2 Mockup

> 크리에이티브 디렉터 작성 (Phase 1)
> CEO 게이트 #2 대기 중

---

## 핵심 결정 사항

### 1. Hero — Lottie 위로 올리고 배지 4개 → CTA 버튼 1개로 대체

**결정**: Hero 최상단에 shield.json Lottie를 240px 크게 배치. 기존 배지 4개("완전 무료", "IT 지식 불필요" 등) 삭제하고 CTA 버튼 1개로 대체.

**이유**: 
- Lottie가 먼저 눈에 들어와야 "보안 사이트"임을 3초 내 직관적으로 전달 (design_taste.md 직관성 원칙)
- 배지 4개는 "특성 나열" 패턴 → 스캔 불가. CTA 1개로 행동 유도에 집중
- H1이 공간을 더 많이 받아 임팩트 강화

### 2. H1 — 3줄→2줄 단순화

**결정**: "지금 이 순간, 내 사이트 털리고 있지 않나요?" 2줄로 압축.

**이유**: 
- 기존 "지금 이 순간," + 2줄 span = 3줄 구조가 리듬 깨짐
- 2줄로 단축하면 글자 더 크게 = 더 임팩트 (design_taste.md: 선명하고, 크고, 짧게)

### 3. Checklist — 이모지+Title만 (simple/warn 삭제)

**결정**: 6개 카드 각각 Lottie 72px + 카테고리 레이블 + 짧은 의문형 제목만 표시.

**이유**:
- 기존 2줄 "simple" + amber warn 박스 = 카드당 6줄 → 총 36줄 이상
- "무엇을 점검하나요?" 섹션의 목적은 "목록 파악" — 상세 설명은 리포트에서 제공
- 의문형 제목("자물쇠가 잠겼나요?")이 고객 자가진단 느낌 유도 → 호기심 → CTA 전환
- warn 박스는 공포 마케팅 과도 → Danger 섹션이 담당하므로 중복

### 4. 중간 CTA 섹션 신규 추가 (Checklist 직후)

**결정**: Checklist와 Process 사이에 미니 CTA 섹션 삽입.

**이유**:
- VISIONC_PRINCIPLES.md: CTA 최소 3곳 필수 (Hero + 중간 + 하단 Form)
- 기존 페이지는 Hero + 하단 Form만 = 2곳 (미달)
- Checklist 직후 = 고객이 "아, 내 사이트 이게 다 문제일 수 있구나" 느끼는 감정 최고점 → CTA 적기

### 5. Danger Cases — desc 삭제, case 배지만 유지

**결정**: Lottie(100px) + 이모지 제거(Lottie가 역할 대체) + 제목 + case 배지만.

**이유**:
- desc는 "제목"과 내용 겹침. 예: 제목 "고객 카드정보가 통째로 빠져나갑니다" = 이미 충분한 설명
- case 배지(실제 사례)가 신뢰 근거 — 유지 필수
- 이모지 + Lottie 중복 → Lottie로 통일 (design_taste.md: 의미 없는 중복 지양)

### 6. Site Types — note 삭제, O/△/X만

**결정**: 이모지 + 라벨 + ✓/△/✗ 심볼만. 설명 note 삭제.

**이유**:
- note 텍스트("가장 빠르고 효과적", "HTML/PHP/ASP 모두 가능" 등)는 2차 정보
- 고객이 궁금한 건 "내 사이트 가능한가 안 가능한가" — O/X가 충분
- 상세 설명은 상담 시 제공

### 7. Process — desc 삭제, 동사형 5단어 이내 제목

**결정**: 6 스텝 번호 + 짧은 동사형 제목만.

**이유**:
- "이렇게 진행됩니다" 섹션의 목적은 "프로세스 맥락 파악" — 상세 불필요
- linear.app 레퍼런스: 아이콘+한 단어로 직관적

### 8. CTA + Form — overline 삭제, 혜택 이모지+title만

**결정**: 혜택 4개 박스에서 desc 삭제, 이모지+font-bold title만 남김.

**이유**:
- "비용 없음 / 시간 없음 / 지식 없음 / 부담 없음" 4단어가 이미 모든 걸 설명
- desc("진단 자체는 완전 무료" 등) = 제목의 반복 → 삭제
- form 컴포넌트 자체는 이미 전환율 검증됨 → 변경 금지

---

## 색상 선택 근거

- 배경: `oklch(0.12 0.01 240)` — 기존 visionc 다크 배경 유지
- 포인트: `oklch(0.65 0.22 27)` — 기존 --primary (빨강 계열), 위기감 표현
- 텍스트: 흰색 계열 유지

→ 색상 3개 이내 원칙 준수 (design_taste.md)

---

## 폰트

- Pretendard 유지 (기존 CDN preload)
- 헤드라인 weight: 900 (font-black)
- 본문: 없음 or 0.8~0.875rem muted

---

## 텍스트 감축 결과

| 섹션 | 기존 | mockup | 감축 |
|------|------|--------|------|
| Hero | 10줄 | 4줄 | -60% |
| Stats | 8줄 | 4줄 | -50% |
| Danger | 16줄 | 10줄 | -37% |
| Checklist | 27줄 | 7줄 | -74% |
| Process | 15줄 | 7줄 | -53% |
| Site Types | 15줄 | 8줄 | -47% |
| CTA | 11줄 | 6줄 | -45% |
| **합계** | **102줄** | **46줄** | **-55%** |

---

## Lottie 자리 placeholder 요약

| 위치 | 파일 | 상태 |
|------|------|------|
| Hero | shield.json | 기존 |
| Stats | gauge SVG | 기존 컴포넌트 |
| Danger 1 | hacker.json | 기존 |
| Danger 2 | warning.json | 기존 |
| Danger 3 | alert.json | 기존 |
| Danger 4 | scan.json | 기존 |
| Checklist SSL | lock.json | 신규 필요 |
| Checklist 관리자 | shield-protect.json | 신규 필요 |
| Process 장식 | timeline.json | 신규 필요 |
| CTA | check.json | 기존 |

**총 10개 Lottie** (기존 6 + 신규 3 + check 1)

---

## CEO 게이트 #2 체크리스트

- [x] mockup HTML 생성: `mockups/VIS-112-security-v2-mockup.html`
- [x] 텍스트 감축: 102줄 → 46줄 (-55%)
- [x] Lottie placeholder 10개 명시
- [x] design-decisions.md 작성
- [x] CTA 3곳: Hero + Checklist 후 중간(신규) + 하단 Form
- [x] CTA form 위치/디자인 변경 금지 — 준수
