---
title: "구글이 무료로 AI 직원을 바꿔치기 했다 — Antigravity 5분 시작 가이드"
date: "2026-06-13"
tag: "AI 활용"
tags: "구글 AI,Antigravity,AI 에이전트 도구,Google I/O,무료 AI 서비스"
image: "/images/blog/google-antigravity-free-ai-agent-sme-guide.svg"
summary: "구글이 개발자 10만 명이 쓰던 무료 AI 도구를 6월 18일에 조용히 교체합니다. 새로 나온 Antigravity는 기획부터 실행까지 혼자 다 하는 AI 에이전트인데 — 개인 사용은 여전히 무료입니다. 중소기업 업무에 어떻게 쓸 수 있는지 5분으로 정리했어요."
---

이번 주 개발자 커뮤니티에서 난리가 났습니다.

구글이 무려 **GitHub 별 10만 개**를 받은 오픈소스 AI 도구를 종료하고
새 도구로 교체한다는 공지를 올렸거든요.

종료 날짜는 **6월 18일 — 딱 5일 뒤**입니다.

교체 도구 이름은 **Antigravity**.

구글 I/O 2026에서 깜짝 공개된 이 도구가
중소기업 업무 자동화에 어떻게 쓰일 수 있는지 빠르게 정리해드립니다.

![center](/mascot/md/emotion/cat_surprised.webp)

---

## 무슨 일이 있었던 건가요?

**2025년 11월**, 구글은 **Gemini CLI**라는 무료 AI 에이전트를 오픈소스로 공개했어요.
터미널(명령창)에서 AI에게 일을 시킬 수 있는 도구였습니다.

개발자들 반응이 폭발적이었어요.
출시 몇 달 만에 GitHub 별 10만 개를 돌파했습니다.

그런데 **2026년 6월**, 구글이 갑자기 공지를 올렸어요.

> "6월 18일부터 무료 Gemini CLI 서비스를 종료합니다.
> 대신 새로 나온 **Antigravity**를 써주세요."

개발자들은 황당해했습니다.
수천 명이 코드로 기여한 오픈소스 도구를 하루아침에 닫고,
이번엔 **비공개 소스**로 교체한 거니까요.

그런데 여기서 중요한 사실 하나.

**Antigravity의 개인 요금제(Individual)는 여전히 무료입니다.**

그리고 기능은 Gemini CLI보다 훨씬 강력해졌어요.

![인포그래픽: Gemini CLI vs Antigravity 비교](/images/blog/google-antigravity-free-ai-agent-sme-guide-fig1.svg)
*▲ Gemini CLI와 Antigravity의 핵심 차이 · 출처: Google Developers Blog*

---

## Antigravity가 뭐가 다른가요?

Gemini CLI는 "내가 명령하면 AI가 실행"하는 방식이었어요.

Antigravity는 달라요.

> "내가 목표를 말하면 AI가 스스로 계획 → 실행 → 검증 → 수정"까지 합니다.

구글 공식 문서에 이렇게 나와 있어요.

> "코드 작성, 터미널 명령 실행, 브라우저 테스트, 오류 수정, 결과 검증까지
> Antigravity 에이전트가 전체 과정을 자율 처리합니다."

*(출처: elancer.co.kr — Antigravity 사용법 가이드)*

쉽게 말하면 이렇습니다.

기존 도구: "이메일 초안 써줘" → AI가 씀
Antigravity: "거래처 이메일 관리 자동화 만들어줘" → AI가 계획 세우고, 직접 만들고, 테스트하고, 오류 잡고 완성

단순 지시가 아니라 **프로젝트 단위 업무**를 맡길 수 있어요.

![center](/mascot/md/service/cat_svc_ai.webp)

---

## 솔직한 장단점 (무료 티어 기준)

### 무료로 뭘 할 수 있나요?

| 항목 | 개인(Individual) — 무료 |
|------|------------------------|
| 사용 요금 | 무료 |
| AI 모델 | Gemini 3 Pro (기본), Claude Sonnet 선택 가능 |
| 에이전트 작업 | 기획 → 실행 → 검증 자동 처리 |
| 사용 한도 | 주 단위 컴퓨팅 한도 있음 |

한도가 있다는 게 아쉽긴 해요.
코드 약 2,000줄 분량 작업 후 일주일을 기다려야 하는 경우도 있다고 해요.

하지만 **일주일에 한 번 큰 프로젝트**를 맡기는 방식으로 쓰면
중소기업에서 충분히 유용합니다.

### 장점

- 개인 요금제 완전 무료
- 기획부터 실행까지 스스로 진행 — 중간에 개입 최소화
- Gemini 3 Pro + Claude Sonnet 두 AI 엔진 선택 사용
- 작업 과정을 화면에 실시간 표시 — 무슨 일 하는지 투명하게 보임

### 솔직한 단점

- 무료 한도 초과 시 최대 7일 대기 필요
- 오픈소스가 아님 — Gemini CLI처럼 커뮤니티가 함께 개선하는 방식 아님
- CLI(명령창) 기반 — 비개발자에겐 초기 설치가 생소할 수 있음

![인포그래픽: Antigravity 사용 흐름](/images/blog/google-antigravity-free-ai-agent-sme-guide-fig2.svg)
*▲ Antigravity 에이전트 작업 흐름 · 출처: Google Developers Blog*

![center](/mascot/md/emotion/cat_thinking.webp)

---

## 중소기업 업무에 어떻게 쓸 수 있나요?

Antigravity는 개발자 도구로 소개됐지만,
실제로는 **반복 업무를 자동화하는 모든 곳**에 쓸 수 있어요.

아래 3가지 시나리오를 보세요.

### [시나리오 1] 소규모 쇼핑몰 — 상품 페이지 대량 업데이트

엑셀에 200개 상품 정보가 있고, 각 상품 설명을 새로 써야 한다면?

보통 직원이 며칠 걸려 하나씩 씁니다.

Antigravity에게 이렇게 말하세요:
"엑셀 파일에서 상품 정보 읽어서, 각각 SEO 최적화된 설명 200개 만들고, 결과를 새 엑셀로 저장해줘."

AI가 파일을 열고, 읽고, 설명 쓰고, 저장합니다.
중간에 오류가 나면 스스로 수정해요.

### [시나리오 2] 서비스업 — 월간 보고서 자동화

매달 담당자가 여러 데이터를 모아 보고서를 만드는 회사라면?

"폴더 안에 있는 6월 데이터 파일들 취합해서 월간 보고서 만들어줘. 지난달이랑 비교 수치도 넣어줘."

파일 읽기 → 데이터 정리 → 비교 분석 → 보고서 작성까지 자동으로 합니다.

### [시나리오 3] 제조업 — 거래처 이메일 분류 + 응답 초안

하루에 50통씩 오는 거래처 이메일.
Antigravity에게 메일함 접근 권한을 주면:
- 유형별 분류 (견적 요청 / 불만 / 일반 문의)
- 유형에 맞는 응답 초안 작성
- 우선순위 높은 건 따로 표시

![center](/mascot/md/process/cat_analytics.webp)

---

## 비젼솔루션 생각 한 마디

구글이 Gemini CLI를 닫는 방식이 논란이 됐어요. 10만 명이 쓰던 도구를, 기여자들과 상의도 없이 하루아침에 닫았으니까요. 그런데 저희가 Antigravity를 써보고 드는 생각은 좀 달랐습니다. 도구가 바뀐 건 아쉽지만, 기능은 확실히 앞으로 나아갔어요. AI가 계획부터 실행까지 스스로 한다는 게 — 작은 회사일수록 더 큰 의미입니다. 사람 한 명이 할 일을 AI 혼자 처리할 수 있으면, 그 사람은 더 중요한 일에 집중할 수 있으니까요. 도구는 바뀌어도, AI가 업무를 대신하는 흐름은 계속됩니다.

— (주)비젼솔루션

---

## 지금 바로 시작해보세요 — 3단계

**준비물:** 구글 계정, 컴퓨터(윈도우 / macOS / 리눅스)

**① Antigravity CLI 설치**

```bash
npm install -g @google/agy
```

또는 [antigravity.google.com](https://antigravity.google.com)에서 데스크탑 앱 설치

**② 구글 계정으로 로그인**

```bash
agy auth login
```

브라우저가 열리면서 구글 계정으로 로그인합니다.
별도 API 키 불필요.

**③ 첫 번째 업무 맡겨보기**

```bash
agy
```

실행 후 이렇게 입력해보세요:

```
이번 주 할 일 목록을 정리한 텍스트 파일을 만들어줘.
업무 우선순위 기준으로 정렬하고, 예상 소요시간도 붙여줘.
```

AI가 파일을 만들고 저장까지 스스로 처리합니다.

---

참고로, 오픈소스 Gemini CLI는 6월 18일 이후에도 **구글 AI Studio API 키**가 있으면 계속 무료로 사용할 수 있어요.
API 키는 [aistudio.google.com](https://aistudio.google.com)에서 무료로 발급됩니다.

공식 문서: [Antigravity 개발자 가이드](https://developers.google.com/gemini-code-assist) | GitHub(Gemini CLI): [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

![center](/mascot/md/process/cat_develop.webp)

---

이 글이 도움이 되셨나요? AI 도구 변화가 빠르게 일어나고 있는 요즘, 우리 회사에 맞는 도구를 찾기 어려우시다면 [(주)비젼솔루션 무료 상담](/contact)으로 편하게 문의해 주세요.
