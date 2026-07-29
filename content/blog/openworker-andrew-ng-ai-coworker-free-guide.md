---
title: "월급 0원 AI 직원 — OpenWorker 실습"
date: "2026-07-29"
tag: "AI 활용"
tags: "AI 활용,오픈소스 AI,업무 자동화,중소기업 AI,AI 에이전트"
image: "/images/blog/openworker-andrew-ng-ai-coworker-free-guide.svg"
summary: "앤드류 응(Andrew Ng)이 만든 오픈소스 AI 에이전트 OpenWorker. 채팅 답변 대신 완성된 업무물을 돌려줍니다. Slack·Gmail·Notion 등 25개 이상 연동, 데이터는 내 기기에만. Mac에서 5분이면 시작할 수 있는 실습 가이드입니다."
---

"슬랙 요약해줘"라고 AI한테 부탁해보셨나요?

텍스트만 돌아옵니다. "3시 회의에서 박 부장이 일정 조율 필요하다고 했고, 마케팅팀 보고는 다음 주로 밀렸어요" — 고맙지만, 그래서요? 직접 슬랙 열고, 캘린더 열고, 담당자한테 메시지 보내는 건 여전히 제 몫입니다.

AI 도입을 시도했다가 포기하는 가장 흔한 이유가 바로 이겁니다. "설명만 해주고, 정작 일은 내가 한다."

이 방정식을 뒤집은 도구가 이번 주 GitHub 트렌딩 3위를 달리고 있습니다.

---

## 채팅이 아닌 완성물 — OpenWorker란

![center](/mascot/md/emotion/cat_happy.png)

앤드류 응(Andrew Ng)은 AI 교육 분야에서 가장 신뢰받는 이름 중 하나입니다. Coursera 공동창업자이자, 전 Google Brain 책임자, 전 Baidu AI 수장. 그가 2026년 7월 23일 GitHub에 공개한 오픈소스 AI 에이전트가 **OpenWorker**입니다. MIT 라이선스로 무료이며, 공개 5일 만에 GitHub 별 3,300개를 받았습니다.

기존 AI 도구와 비교하면 차이가 명확합니다.

| 업무 | 기존 AI 채팅 | OpenWorker |
|------|------------|------------|
| 슬랙 요약 | 요약 텍스트 반환 | 슬랙 직접 접속 → 요약 → 담당자 DM 발송 |
| 회의 후 일정 | 일정 목록 나열 | Google Calendar에 직접 등록 |
| 이메일 정리 | 분류 방법 안내 | Gmail 접속 → 필터링 → 분류 완료 |
| 보고서 작성 | 초안 텍스트 제공 | Notion에 페이지 생성 + 내용 채우기 |

"AI가 어떻게 하면 된다고 설명하는 것"과 "AI가 직접 완료하는 것" — 이 차이가 OpenWorker의 핵심입니다.

작동 흐름은 이렇습니다. 작업 요청 → AI가 실행 계획 수립 → **사람에게 확인** → 도구 실행 → 완성된 결과물. '사람에게 확인' 단계가 중요합니다. AI가 이메일을 엉뚱한 곳에 보내거나 캘린더를 엉망으로 만드는 사고를 막는 안전장치입니다.

연동 가능한 서비스는 Slack, Gmail, Google Calendar, GitHub, Notion, HubSpot, Microsoft Outlook, Jira, Linear 등 25개 이상입니다. Python FastAPI 백엔드 기반으로 구동되고, 지원 AI 모델은 GPT-5.6 Sol, Claude Fable, Gemini 3.6, DeepSeek, Kimi, GLM, Ollama(로컬 무료)입니다.

그럼 조건은 어떻게 될까요? 솔직하게 짚겠습니다.

---

## 무료로 쓸 수 있나요? — 조건과 단점 정리

![center](/mascot/md/emotion/cat_thinking.png)

OpenWorker 자체는 무료입니다. 하지만 AI 모델은 별도입니다.

**지금 쓸 수 있는 방법 3가지:**

- **Ollama (완전 무료)**: 인터넷 없이 내 PC에서 AI 모델을 돌리는 방식. 비용 0원. 단, PC 성능이 받쳐야 합니다.
- **DeepSeek·Kimi·GLM**: 저렴한 외부 모델. 월 몇천 원 수준.
- **GPT-5.6 Sol·Claude Fable·Gemini 3.6**: 성능은 최고, 비용도 높습니다.

**Ollama 기준 최소 사양:**

| 항목 | 최소 | 권장 |
|------|------|------|
| RAM | 8GB (느림) | 16GB 이상 |
| 저장공간 | 10GB 이상 여유 | 20GB |
| GPU | 없어도 작동 | 있으면 훨씬 빠름 |
| OS | macOS 14 이상 | macOS 14 이상 |

**솔직한 단점:**

지금 당장 Windows에서는 쓸 수 없습니다. Mac 전용이고, Windows 지원은 "예정"입니다. Ollama 로컬 모델은 한국어 답변이 부자연스러울 수 있습니다. GPT나 Claude 쪽이 한국어는 훨씬 자연스럽습니다. 복잡한 다단계 업무에서 AI가 중간에 막히는 경우도 있습니다.

**다른 자동화 도구와 비교:**

| 도구 | 비용 | 한국어 | 데이터 보안 | 초기 세팅 |
|------|------|--------|------------|----------|
| OpenWorker(Ollama) | 무료 | 보통 | 매우 높음 | 중간 |
| Make/Zapier | 월 $10~50 | 좋음 | 서버 저장 | 쉬움 |
| n8n (오픈소스) | 무료 | 좋음 | 높음 | 어려움 |
| ChatGPT Plus | 월 $20 | 좋음 | 서버 저장 | 쉬움 |

OpenWorker는 BYOK(Bring Your Own Key) 방식입니다. 데이터가 내 기기에서만 처리됩니다. 직원 정보, 고객 데이터, 내부 문서 — 외부 서버를 거치지 않습니다. 이 점이 Make, Zapier 같은 클라우드 자동화 서비스와 가장 큰 차이점입니다.

---

## 중소기업 실전 시나리오 3가지

### ① 이메일 정리 — 매일 아침 30분 아끼기

직원 다섯 명짜리 제조업 회사를 예로 들겠습니다. 대표가 매일 아침 이메일 분류에 30분을 씁니다. OpenWorker에 이렇게 지시합니다.

"오늘 받은 이메일 중 견적 요청은 '견적' 폴더에 분류하고, 긴급 건만 표시해서 요약해줘."

OpenWorker가 Gmail에 직접 접속해 실행합니다. 담당자에게 DM을 보낼지 확인합니다. 승인하면 완료입니다. 설명 텍스트가 아닌 **실제 Gmail이 정리된 상태**로 돌아옵니다.

### ② 회의 후 캘린더 자동 등록

영업팀 팀장이 회의를 마쳤습니다. 회의록을 붙여넣고 지시합니다. "여기 나온 일정 Google Calendar에 다 넣어줘. 담당자 이름도 같이."

OpenWorker가 회의록을 분석해 일정을 생성합니다. "등록할까요?" 확인을 거쳐 완료합니다. 일일이 캘린더를 열고 하나씩 입력하는 수고가 사라집니다.

### ③ 슬랙 미결 사항 → Notion 보고서

마케팅 담당자가 퇴근 전 지시합니다. "오늘 슬랙에서 미결 건 정리해서 Notion에 보고서 만들어줘."

OpenWorker가 슬랙을 읽고, Notion 페이지를 생성하고, 내용을 채웁니다. 검토 후 승인하면 팀장 이메일로 링크가 발송됩니다.

세 시나리오 모두 공통점이 있습니다. AI가 실행 전 사람에게 확인을 받습니다. '완전 자동화'가 아닌 '사람이 감독하는 자동화'입니다. 중소기업에서는 오히려 이 방식이 더 안전합니다. 실수가 나도 되돌릴 수 있으니까요.

![인포그래픽: OpenWorker 업무 처리 흐름](/images/blog/openworker-andrew-ng-ai-coworker-free-guide-fig1.svg)
*▲ 기존 AI 채팅 vs OpenWorker 처리 방식 비교 · 출처: github.com/andrewyng/openworker*

---

## (주)비젼솔루션이 보는 시각

AI 도구가 쏟아지는 요즘, 중소기업 경영자가 정작 먼저 답해야 할 질문은 "어떤 AI가 좋은가"가 아닙니다. "내 회사 데이터를 어디까지 공개할 것인가"입니다.

ChatGPT·Gemini 같은 강력한 도구들은 내 데이터가 외부 서버를 반드시 거칩니다. 작은 회사일수록 고객 정보, 거래 내역, 내부 문서가 경쟁력의 전부인 경우가 많습니다. OpenWorker처럼 BYOK 방식이 빠르게 퍼지는 건 단순한 기술 트렌드가 아닙니다. **데이터 주권을 내가 쥐겠다는 선택**의 확산입니다.

도구를 고르기 전에 이 질문을 먼저 정리하는 것이 AI 도입의 진짜 첫 단추라고 저희는 봅니다.

---

## 5분 설치 따라하기

현재 macOS 전용입니다. Python 3.10 이상이 필요합니다.

**1단계 — Python 버전 확인**

```bash
python3 --version
```

3.10 이상이 나오면 다음으로 넘어갑니다. 없으면 [python.org](https://python.org)에서 설치합니다.

**2단계 — Ollama 설치 (무료 로컬 AI)**

[ollama.ai](https://ollama.ai)에서 macOS 버전을 다운로드해 설치합니다. 설치 후 터미널에서:

```bash
ollama pull llama3
```

약 4GB 용량입니다. 다운로드에 시간이 걸립니다.

**3단계 — OpenWorker 다운로드**

```bash
git clone https://github.com/andrewyng/openworker
cd openworker
pip install -r requirements.txt
```

**4단계 — 실행**

```bash
python app.py
```

브라우저에서 `http://localhost:8000`으로 접속합니다. 정확한 실행 명령어는 저장소 README를 따르세요.

**5단계 — 연동 설정**

처음 실행하면 연동할 서비스 선택 화면이 나옵니다. Gmail, Slack, Google Calendar 중 원하는 것을 선택해 OAuth로 연결합니다. 화면 안내를 따라가면 됩니다.

첫 명령은 간단하게 시작하세요.

```
오늘 받은 이메일 5개 요약해줘.
```

AI가 계획을 제시하고 실행 전 확인을 요청합니다. 승인하면 Gmail이 직접 처리됩니다.

---

AI 도입이 막막하게 느껴지신다면 저희가 함께 고민해드릴 수 있습니다.

![center](/mascot/md/emotion/cat_grateful.png)

> **Vision Solution AI 솔루션 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)


<!-- related-links -->

## 함께 보면 좋은 글

- [ChatGPT 구독비 0원 — 290개 AI 무료 연결법](/blog/omniroute-free-ai-gateway-chatgpt-cost-zero)
- [AI에 인터넷 눈 달기 — 무료 오픈소스 5분 실습](/blog/agent-reach-ai-internet-free-sme-guide)
- [GPT-Live 무료 5분 — AI와 전화처럼 대화하기](/blog/chatgpt-gpt-live-voice-ai-guide)
