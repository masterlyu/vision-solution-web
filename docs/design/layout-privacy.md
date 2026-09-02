# 레이아웃 명세 — `/privacy` (개인정보처리방침)

> VIS-5984 루틴 산출물 | AI 디자이너 작성 | 2026-09-02

---

## 0. 디자인 방향

- **분위기**: 신뢰·법적 명확성. 복잡한 법적 내용을 읽기 쉽게 전달. 장식 최소화, 가독성 우선.
- **색상**: 본문 `text-muted-foreground`, 제목 `text-foreground`, 강조 이메일 `text-foreground font-bold`. 별도 primary 강조 없음(법적 문서 중립성).
- **타이포**: H1 `text-3xl font-bold`, H2 `text-lg font-semibold`, 본문 `text-sm leading-relaxed`.
- **UI 원칙**: 최대 너비 `max-w-3xl` 단일 열. 섹션 간 `space-y-10`. 장식 컴포넌트 없음.
- **네비게이션**: 페이지 최상단에 홈 귀환 링크(`← 홈으로`).

---

## 1. 섹션 구조 (상단 → 하단)

| 순번 | 섹션 명 | 배경 | 레이아웃 유형 |
|------|---------|------|--------------|
| 1 | 메타 헤더 | `background` | 단일 열, 좌측 정렬 |
| 2 | 본문 (법 조항 목록) | `background` | 단일 열 섹션 스택 |

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
  텍스트: "개인정보처리방침"
  스타일: text-3xl font-bold text-foreground mb-2

[시행일 메타]
  텍스트: "시행일: 2026년 6월 6일 (위탁·국외이전·회원서비스 대비 개정)"
  스타일: text-sm text-muted-foreground mb-2

[회사 메타]
  텍스트: "(주)비젼솔루션 · 사업자등록번호 121-81-84378 · 인천광역시 계양구 동양로 10"
  스타일: text-sm text-muted-foreground mb-12
```

---

### Section 2 — 본문 (법 조항 목록)

```
래퍼: space-y-10 text-sm leading-relaxed text-muted-foreground

각 조항(<section>):
  H2: text-lg font-semibold text-foreground mb-3
  본문(p): text-sm leading-relaxed text-muted-foreground
  목록(ul): list-disc list-inside space-y-1.5

조항 목록 (총 11조):
  제1조 개인정보의 처리 목적
  제2조 수집하는 개인정보 항목
  제3조 개인정보의 처리 및 보유 기간
  제4조 개인정보의 제3자 제공
  제5조 개인정보 처리의 위탁 및 국외 이전
  제6조 정보주체의 권리·의무
  제7조 개인정보의 안전성 확보 조치
  제8조 쿠키 등 자동수집 장치
  제9조 만 14세 미만 아동
  제10조 개인정보 보호책임자
  제11조 개인정보 처리방침 변경

[강조 요소 — 제6조 이메일]
  텍스트: "biztalktome@gmail.com"
  스타일: <strong className="text-foreground">
  (연락처·이메일은 text-foreground bold 처리)

[외부 링크 불필요]
  법적 기관 연락처(분쟁조정위원회 등)는 일반 텍스트로 표시 — 링크 처리 안 함
```

---

## 3. 반응형 규칙

```
모바일(~md):
  px-6 유지, max-w-3xl 자연 축소
  py-24 (lg:py-32 — 데스크톱 여백 더 넓음)

별도 그리드·카드 없음 — 단일 열 텍스트 페이지
```

---

## 4. 특이사항

- **전역 Nav/Footer**: 다른 페이지와 동일하게 레이아웃 래퍼(`layout.tsx`)가 자동 추가.
- **인터랙션 없음**: 폼, 애니메이션, 마스코트 없음. 순수 정적 텍스트 페이지.
- **SEO 메타**: `title="개인정보처리방침"`, `description` 개인정보 처리 항목 요약 — `metadata` export로 정의.
- **홈 링크 위치**: `Link href="/"` — 페이지 최상단 고정, 콘텐츠 전 노출.
- **법률 이름 렌더링**: 「법령명」은 HTML `&ldquo;` `&rdquo;` 대신 Korean quotation marks 직접 표기 — 현재 구현과 동일 유지.
