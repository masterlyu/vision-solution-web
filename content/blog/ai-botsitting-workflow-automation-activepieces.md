---
title: "AI 봇시팅 — 주 6시간 낭비 막는 자동화 3단계"
date: "2026-07-23"
tag: "업무 자동화"
tags: "업무 자동화,봇시팅,AI 활용"
image: "/images/blog/ai-botsitting-workflow-automation-activepieces.svg"
summary: "ChatGPT 구독비 냈는데 직원이 더 바빠졌다면? 6,000명 설문에서 밝혀진 '봇시팅' — 주 6.4시간 AI 감시 낭비를 ActivePieces 무료 자동화로 끊어내는 3단계 실습 가이드입니다."
---

직원이 ChatGPT에 뭔가를 시켰습니다. 결과물이 나왔어요.

그런데 그걸 읽고, 확인하고, 수정하고, 이메일에 붙여넣고, 팀 채팅에 옮기고…

결국 예전보다 시간이 더 걸렸습니다. 이게 하루에도 몇 번씩 반복됩니다.

"AI 도입했는데 왜 더 바빠진 거죠?" — 중소기업 사장님들이 요즘 가장 많이 하는 말 중 하나입니다. 이 현상에 이름이 생겼습니다. **봇시팅(Botsitting)**입니다.

![center](/mascot/md/emotion/cat_surprised.png)

## 봇시팅이란? — AI를 감시하느라 더 바빠지는 역설

2026년 초, Glean이 스탠퍼드·UC버클리 연구팀과 함께 직장인 6,000명을 대상으로 'Work AI Index 2026' 설문을 진행했습니다.

결과가 충격적이었습니다. AI를 사용하는 직장인 중 상당수가 **AI 출력물을 확인·수정·재작업하는 데만 주당 평균 6.4시간**을 쓰고 있었습니다. 하루 1시간 이상이 AI 감시에 날아가고 있는 겁니다.

영국 IT 전문매체 The Register는 이 현상을 이렇게 표현했습니다.

> "영국 직장인들이 AI를 돌보느라 주당 거의 6시간을 낭비하고 있다."

봇시팅이란, 쉽게 말하면 이런 상황입니다.

**AI를 비서로 뒀는데, 그 비서 뒷처리를 내가 하게 된 것.** 시간을 아끼려고 도입했더니, 다른 종류의 일이 더 생겨버린 역설입니다.

![center](/mascot/md/process/cat_analytics.png)

## 봇시팅이 생기는 3가지 이유

봇시팅은 AI가 나쁜 게 아닙니다. 구조 문제입니다. 대부분의 회사에서 AI는 이런 방식으로 쓰입니다.

![AI 봇시팅 핵심 통계 — Work AI Index 2026](/images/blog/ai-botsitting-workflow-automation-activepieces-fig1.svg)
*▲ Work AI Index 2026 (Glean, Stanford/UC Berkeley 공동 연구, 6,000명 설문)*

**① AI가 만든 결과물을 사람이 검토해야 합니다**
ChatGPT 답변을 그대로 쓸 수 있는 경우는 많지 않습니다. 숫자가 틀리거나, 맥락이 빠지거나, 우리 회사 어투와 달라서 매번 손이 갑니다.

**② AI와 다른 도구 사이를 사람이 연결합니다**
ChatGPT에서 나온 요약을 직원이 직접 복사해서 슬랙에 붙여넣습니다. 엑셀에 옮깁니다. 이메일에 넣습니다. AI는 생성만 했고, 그 이후 단계는 여전히 사람 손을 탑니다.

**③ 같은 작업을 매번 새로 시킵니다**
"지난주 고객 문의 요약해줘"를 매주 직접 ChatGPT에 입력합니다. 결과를 복사합니다. 붙여넣습니다. 이게 한 달이면 수십 번 반복됩니다.

Bloomberg는 2026년 6월 보도에서 이렇게 짚었습니다: "AI는 시간을 아껴주지만, 대부분의 회사는 그 이득을 낭비하고 있다." 이득이 낭비되는 지점이 바로 이 세 가지 구간입니다.

---

봇시팅을 끊는 방법은 하나입니다. **AI가 만든 결과물이 사람 손 없이 다음 단계로 자동으로 흘러가게 만드는 것.** CIO.com이 "거버넌스 없이는 고칠 수 없는 AI 시간 절약의 적"이라고 표현한 이유도 같습니다. 자동화 흐름(거버넌스) 없이는 봇시팅을 피할 수 없습니다.

## ActivePieces — 무료로 AI 결과물을 자동 흘려보내는 도구

자동화 흐름을 만들 수 있는 오픈소스 도구가 있습니다. **ActivePieces**입니다.

쉽게 말하면, "ChatGPT 출력 → 자동 처리 → 결과 전달"을 한 번만 설계해두면, 이후에는 사람 손 없이 알아서 반복 실행됩니다. GitHub에 공개된 완전 무료 오픈소스입니다.

| 항목 | 내용 |
|------|------|
| 라이선스 | MIT (무료, 상업 사용 가능) |
| GitHub | github.com/activepieces/activepieces |
| GitHub 별 | 23,000개+ (2026년 기준) |
| 연동 앱 수 | 700개 이상 (Gmail, Slack, Notion, 구글시트 등) |
| 설치 방법 | Docker 셀프 호스팅 또는 클라우드 유료 플랜 |
| 필요 사양 | RAM 4GB 이상, Docker 설치된 PC 또는 서버 |

**다른 도구와 비교하면 어떤가요?**

n8n도 많이 쓰이는 자동화 도구지만, 코딩 지식이 어느 정도 있어야 편합니다. ActivePieces는 드래그앤드롭 방식이라 코딩 몰라도 설정할 수 있고, 한국어 인터페이스도 지원합니다. 단점이라면 n8n보다 한국어 커뮤니티가 작고, 복잡한 분기 로직은 여전히 손이 갑니다.

Zapier·Make 같은 SaaS 서비스와 비교하면, 클라우드 서비스는 월 이용료가 발생하고 회사 데이터가 외부 서버를 거칩니다. ActivePieces는 직접 서버에 설치하면 데이터가 밖으로 나가지 않아 보안 측면에서 유리합니다.

![center](/mascot/md/process/cat_develop.png)

## 우리 회사에 붙이는 방법 — 3가지 시나리오

ActivePieces를 설치했다면, 실제로 봇시팅을 어떻게 없앨 수 있을까요?

![ActivePieces 자동화 3단계 흐름](/images/blog/ai-botsitting-workflow-automation-activepieces-fig2.svg)
*▲ AI 결과물이 사람 손 없이 다음 단계로 흐르는 구조*

**시나리오 1: 고객 이메일 자동 요약 → 슬랙 전달**

매일 오는 고객 이메일을 ChatGPT가 3줄로 요약한 다음, 슬랙 채팅방으로 자동 전송합니다. 직원이 이메일을 열어 정리하고 팀에 전달하는 시간이 없어집니다.

```
Gmail 새 이메일 수신 → ChatGPT: 3줄 요약 → Slack #고객문의 채널 전송
```

**시나리오 2: 홈페이지 문의 자동 분류 → 구글시트 기록**

문의 폼에서 들어온 내용을 ChatGPT가 규모별로 분류(소규모·중규모·대규모)하고, 구글시트에 자동으로 기록합니다. 영업 담당자가 매번 옮겨 적는 작업이 사라집니다.

```
홈페이지 문의 폼 → ChatGPT: 규모 분류 → 구글시트 자동 행 추가
```

**시나리오 3: SNS 댓글 감성 분류 → 담당자 알림**

인스타그램·블로그 댓글을 ChatGPT가 긍정·부정·중립으로 분류해, 부정 댓글이 올 때만 담당자에게 알림을 보냅니다. 소셜 모니터링을 사람이 직접 매일 보지 않아도 됩니다.

```
SNS 댓글 수집 → ChatGPT: 감성 분류 → 부정이면 카카오 알림
```

이처럼 "AI가 판단 → 자동으로 다음 단계"가 흐르게 만들면, 봇시팅의 핵심 원인인 '중간 다리 역할'이 없어집니다.

---

> **(주)비젼솔루션 관점** — 봇시팅은 AI 품질 문제가 아닙니다. 도구를 구독한 것과 업무 흐름 속에 녹아드는 것은 전혀 다른 이야기입니다. AI가 어디서 시작해서 어디에 결과를 내야 하는지 설계하는 것, 그게 AI 도입의 실제 작업입니다. "ChatGPT 샀는데 아직 쓸 일이 없어요"라는 말은 대부분 이 설계가 빠진 경우입니다.*

![center](/mascot/md/emotion/cat_thinking.png)

## 실습 — ActivePieces 3단계 시작하기

초보자도 따라할 수 있습니다. PC에 Docker가 설치되어 있어야 합니다.

**1단계: Docker로 ActivePieces 실행**

터미널(Windows는 PowerShell)에 아래 명령을 복붙하세요.

```bash
docker run -d \
  -p 8080:80 \
  -v $(pwd)/ap_data:/root/.local/share/activepieces \
  activepieces/activepieces:latest
```

실행 후 브라우저에서 `http://localhost:8080`으로 접속하면 ActivePieces가 열립니다.

**2단계: OpenAI(ChatGPT) 연동**

- 상단 메뉴 → Connections → OpenAI 선택
- OpenAI API 키 입력 (platform.openai.com에서 발급, 소량 무료 크레딧 제공)
- Gmail, Slack, 구글시트 등 회사에서 쓰는 앱도 같은 방식으로 연동합니다

**3단계: 첫 번째 자동화 만들기**

새 Flow 생성 → Trigger로 "Gmail - New Email" 선택 → Step 추가 → OpenAI → "Ask ChatGPT" 선택.

아래 프롬프트를 그대로 복붙하세요.

```
아래 이메일을 한국어로 3줄 요약해줘.
요청 내용, 연락처, 긴급도를 포함해.

{{이메일 본문}}
```

마지막 Step → Slack → "Send Message" 선택 → 팀 채널 지정 → Flow 저장 후 활성화.

이제 Gmail에 새 이메일이 오면 ChatGPT가 자동 요약해서 슬랙으로 보내줍니다. 더 복잡한 연동이나 회사 내부 시스템(ERP, CRM) 연결은 전문 설정이 필요합니다. 기본 흐름까지는 직접, 그 이상은 문의로 해결하시면 됩니다.

---

봇시팅은 AI를 잘못 산 게 아닙니다. 자동화 설계 없이 쓰고 있어서 생기는 현상입니다. ActivePieces로 '사람이 중간에 뛰어다니는 구간'을 없애는 것, 그게 진짜 AI 도입의 시작입니다.

AI 자동화 설계가 막막하다면 [(주)비젼솔루션 무료 상담](/contact)으로 편하게 물어보세요. 어떤 구간을 자동화할 수 있는지 함께 찾아드립니다.

이 글이 도움이 되셨나요? AI 도입 고민 중인 사장님께 공유해 주세요. 댓글로 질문하시면 성심껏 답변드릴게요!

![center](/mascot/md/emotion/cat_cheer.png)


<!-- related-links -->

## 함께 보면 좋은 글

- [아이폰에서 27B AI 무료로 5분 실습](/blog/bonsai-27b-smartphone-ai)
- [보고서 2시간을 5분으로 — Gemini AI 무료 자동화](/blog/gemini-google-docs-automation-3steps)
- [섀도AI — 직원 64%가 몰래 씁니다, 해법 3가지](/blog/shadow-ai-litellm-sme-guide)
