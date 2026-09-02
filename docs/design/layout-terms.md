# 레이아웃 명세 — `/terms` (이용약관)

> VIS-5984 루틴 산출물 | AI 디자이너 작성 | 2026-09-02

---

## 0. 디자인 방향

- **분위기**: 신뢰·법적 명확성. `privacy`와 동일한 설계 언어. 이용약관 특성상 중요 서비스 조항(모의해킹 특별 조항 등) 가독성 강조.
- **색상**: 본문 `text-muted-foreground`, 제목 `text-foreground`. 별도 primary 색상 없음.
- **타이포**: H1 `text-3xl font-bold`, H2 `text-lg font-semibold`, 본문 `text-sm leading-relaxed`.
- **UI 원칙**: `max-w-3xl` 단일 열, `space-y-10` 섹션 간격. 장식 컴포넌트 없음.
- **네비게이션**: 페이지 최상단에 홈 귀환 링크(`← 홈으로`).

---

## 1. 섹션 구조 (상단 → 하단)

| 순번 | 섹션 명 | 배경 | 레이아웃 유형 |
|------|---------|------|--------------|
| 1 | 메타 헤더 | `background` | 단일 열, 좌측 정렬 |
| 2 | 본문 (약관 조항 목록) | `background` | 단일 열 섹션 스택 |

---

## 2. 섹션별 상세 명세

### Section 1 — 메타 헤더

```
페이지 래퍼: min-h-screen bg-background
콘텐츠 컨테이너: max-w-3xl mx-auto px-6 py-24 lg:py-32

[홈 링크]
  텍스트: "← 홈으로"
  스타일: text-sm text-muted-foreground hover:text-foreground transition-colors
          mb-8 inline-block

[H1]
  텍스트: "이용약관"
  스타일: text-3xl font-bold text-foreground mb-2

[시행일 메타]
  텍스트: "시행일: 2026년 6월 6일 (회원·유료서비스 조항 대비 개정)"
  스타일: text-sm text-muted-foreground mb-12
  (privacy와 달리 회사 주소 메타 없음)
```

---

### Section 2 — 본문 (약관 조항 목록)

```
래퍼: space-y-10 text-sm leading-relaxed text-muted-foreground

각 조항(<section>):
  H2: text-lg font-semibold text-foreground mb-3
  본문(p): text-sm leading-relaxed text-muted-foreground
  목록(ul): list-disc list-inside space-y-1.5

조항 목록 (총 13조):
  제1조  목적
  제2조  용어의 정의
  제3조  약관의 효력 및 변경
  제4조  서비스 이용
  제5조  회원 가입 및 계정
  제6조  모의해킹 진단 서비스 특별 조항
  제7조  이용자의 의무
  제8조  서비스 제공의 제한
  제9조  유료 서비스 및 환불
  제10조 면책조항
  제11조 지식재산권
  제12조 준거법 및 관할법원
  제13조 문의

[조항별 혼합 레이아웃 — 제6조]
  하위 설명 단락(p.mb-3) + 목록(ul.list-disc) 혼합:
  단락 먼저, 이후 세부 조건 목록 표시

[문의 정보 — 제13조]
  div.mt-3.space-y-1.5:
    회사명·이메일(p): text-sm text-muted-foreground
    웹사이트(p): text-sm text-muted-foreground
  링크 처리 안 함 — 일반 텍스트 표시
```

---

## 3. privacy vs terms 비교

| 항목 | privacy | terms |
|------|---------|-------|
| H1 | "개인정보처리방침" | "이용약관" |
| 메타 정보 | 시행일 + 회사 주소 | 시행일만 |
| 조항 수 | 11조 | 13조 |
| 특이 조항 | 국외 이전 위탁사 목록 | 모의해킹 특별 조항 |
| 강조 요소 | 이메일 `<strong>` | 없음 |
| 레이아웃 | 동일 | 동일 |

두 페이지는 동일한 구조·스타일 패턴을 공유. 향후 법적 고지 페이지 추가 시 이 패턴 재사용.

---

## 4. 반응형 규칙

```
모바일(~md):
  px-6 유지, max-w-3xl 자연 축소
  py-24 (lg:py-32 — 데스크톱 여백 더 넓음)

별도 그리드·카드 없음 — 단일 열 텍스트 페이지
```

---

## 5. 특이사항

- **전역 Nav/Footer**: `layout.tsx`가 자동 추가.
- **인터랙션 없음**: 폼, 애니메이션, 마스코트 없음. 순수 정적 텍스트 페이지.
- **SEO 메타**: `title="이용약관"`, `description` 서비스 이용 조건 요약.
- **유료 서비스 조항**: 제9조에 결제·환불 규정 포함 — 유료 서비스 도입 시 이 조항을 구체화(PG사 정보·결제 프로세스 추가) 필요. 현재는 포괄 조항으로 운영.
- **모의해킹 특별 조항**: 제6조 — 실제 공격 기술을 포함하는 서비스이므로 서면 동의·NDA·데이터 삭제 확인서 발급 등 법적 보호 조항 명시. 디자인 강조 없이 일반 텍스트로 표시(법적 문서 중립성).
