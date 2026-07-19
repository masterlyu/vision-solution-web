---
title: "직원 64%가 AI 씁니다 — 오늘 할 일 3가지"
date: "2026-07-20"
tag: "AI 솔루션"
tags: "섀도AI,AI 보안,중소기업 AI,LiteLLM,AI 정책"
image: "/images/blog/shadow-ai-employee-chatgpt-litellm-guide.svg"
summary: "직원 64%가 회사 몰래 ChatGPT를 씁니다. 막는 것이 답이 아닙니다. WatchGuard 2026 보고서가 경고하는 섀도 AI 위험과, LiteLLM 무료 도구로 5분 만에 회사 전용 AI 창구 만드는 법."
---

오후 2시, 경리팀 직원이 화면을 황급히 닫습니다.

ChatGPT 탭이었습니다. 닫기 전에 보였습니다 — 거래처 계약서 내용이 붙어 있었습니다. 막아야 할까요, 그냥 둬야 할까요.

결론부터 말씀드리겠습니다. 둘 다 틀렸습니다. 막는 것도 방치도 아니라 **안전한 출구를 먼저 만들어야** 합니다.

> **섀도 AI 걱정이라면** → **[(주)비젼솔루션 AI 솔루션 무료 상담](https://www.visionc.co.kr/ai-solution)** (지금 신청 가능)

---

![center](/mascot/md/emotion/cat_worried.webp)

## 이미 98%의 회사에서 일어나고 있는 일입니다

2026년 7월, WatchGuard가 발표한 사이버보안 리포트가 업계에 파장을 일으켰습니다. 핵심은 하나였습니다. **"섀도 AI가 2026년 최대 사이버 보안 위협으로 부상했다."**

섀도 AI(Shadow AI)란, 회사의 공식 허가 없이 직원이 개인적으로 사용하는 AI 도구들을 가리킵니다. ChatGPT, Claude, Gemini, 각종 AI 작성 도구 — 이미 수백 가지가 무료로 쏟아져 있습니다. 직원들은 업무를 빠르게 끝내고 싶어서 씁니다. 나쁜 의도는 없습니다. 문제는 그 과정에서 회사 정보가 **어디로 가는지 아무도 모른다**는 점입니다.

숫자를 보면 이미 현실입니다.

![섀도 AI 현황 3대 통계](/images/blog/shadow-ai-employee-chatgpt-litellm-guide-fig1.svg)
*▲ 섀도 AI 현황 3대 통계 · 출처: WatchGuard 2026 Cybersecurity Report, IBM Security Survey*

**전 세계 직원의 64%가 회사 몰래 AI를 씁니다.** 98%의 조직에는 무단 AI 사용자가 최소 1명 이상 있습니다. 하지만 실제로 AI 사용 정책이 있는 기업은 **18%뿐**입니다.

나머지 82%는, 지금 이 순간도 아무 규칙 없이 흘러가고 있는 겁니다.

---

![center](/mascot/md/emotion/cat_surprised.webp)

## 막는다고 해결될까요?

"ChatGPT 사이트를 차단하면 되지 않나?" 하는 생각이 드실 수 있습니다. 현실은 그렇게 단순하지 않습니다.

직원들은 회사 PC가 막히면 핸드폰으로 씁니다. 핸드폰까지 막으면 개인 노트북을 꺼냅니다. 블로킹은 불편함을 줄 뿐, 사용 자체를 막지 못합니다. 오히려 반발심만 키울 수 있습니다.

조사에 따르면 Z세대 직원의 44%가 회사의 AI 도입 제한을 심각한 문제로 인식합니다. 막을수록 좋은 인재가 떠날 위험도 커지는 겁니다.

**진짜 문제는 AI 사용 자체가 아니라, 회사 정보가 외부 서버로 빠져나가는 것**입니다. 해결책도 거기서 나와야 합니다.

---

![center](/mascot/md/emotion/cat_thinking.webp)

## LiteLLM — 회사 전용 AI 창구를 5분에 만드는 법

**LiteLLM**은 회사 안에 하나의 AI 허브를 만들어주는 오픈소스 도구입니다. 직원들이 ChatGPT에 직접 접속하는 대신, **회사가 통제하는 단일 창구**를 통해 AI를 쓰게 합니다.

쉽게 말해, 회사 전용 AI 포털입니다. 관리자가 어떤 AI 모델을 허용할지 설정하고, 사용 기록을 한 곳에서 볼 수 있습니다. 직원은 여전히 AI를 씁니다. 회사는 무엇이 오가는지 파악합니다.

GitHub 스타 40,000개 이상, YC(와이컴비네이터) 투자를 받은 검증된 도구입니다.

![LiteLLM 도입 3단계](/images/blog/shadow-ai-employee-chatgpt-litellm-guide-fig2.svg)
*▲ LiteLLM 도입 흐름 · 출처: github.com/BerriAI/litellm*

### 도입 전 알아야 할 현실 요구사항

| 항목 | 최소 요구 |
|------|-----------|
| 운영체제 | Linux 또는 macOS (Windows는 Docker 필수) |
| RAM | 2GB 이상 |
| Python | 3.8 이상 |
| 비용 | LiteLLM 자체는 무료 / AI 모델 API는 별도 과금 |

**장점**: OpenAI·Anthropic·Gemini 등 어떤 AI든 하나의 창구로 통합 관리. 사용 로그 자동 기록. API 키를 직원에게 줄 필요 없음.

**단점**: 서버가 필요합니다. 초기 설정이 기술적입니다. 운영·유지에 IT 담당자가 필요합니다.

클라우드 AI(ChatGPT, Claude API)는 편하지만 입력 데이터가 외부 서버에 저장될 수 있습니다. 로컬 AI는 보안에 강하지만 품질이 낮을 수 있습니다. LiteLLM은 이 두 선택지 사이의 절충안입니다 — 클라우드 AI 성능을 그대로 쓰되, 창구만 내부로 가져오는 방식입니다.

### 따라 해보는 LiteLLM 설치 (5분)

서버나 본인 PC(테스트용)에서 아래 명령어를 붙여넣으면 됩니다.

**1단계 — LiteLLM 설치**
```bash
pip install litellm[proxy]
```

**2단계 — 설정 파일 만들기**

`config.yaml` 파일을 만들고 아래 내용을 붙여넣습니다:

```yaml
model_list:
  - model_name: gpt-4o
    litellm_params:
      model: openai/gpt-4o
      api_key: "여기에_OpenAI_API_키_입력"
general_settings:
  master_key: "회사_관리자_비밀번호_설정"
```

**3단계 — 서버 실행**
```bash
litellm --config config.yaml --port 4000
```

이제 직원들은 `http://서버주소:4000`으로 접속해 AI를 씁니다. 관리자는 대시보드에서 누가 무엇을 입력했는지 확인할 수 있습니다.

OpenAI API 키가 없으면 [platform.openai.com](https://platform.openai.com)에서 발급받을 수 있습니다. 처음 사용자에게 무료 크레딧이 제공됩니다.

---

## 우리 회사에 도입하면 어떻게 달라질까요?

10명 규모의 유통 회사를 생각해봅시다.

직원들이 ChatGPT를 쓰는 이유는 보통 세 가지입니다. 이메일·보고서 작성, 견적서 초안, 고객 응대 문구 생성. 모두 업무를 빠르게 끝내려는 목적입니다.

LiteLLM 도입 후는 이렇게 바뀝니다. 사장님이 OpenAI API 계정 하나를 만들어두면 됩니다. 직원들은 회사 내부 주소로 접속해 AI를 씁니다. **계약서 내용이 외부로 직접 전송되는 대신 회사 서버를 거쳐 기록이 남습니다.** 문제가 생기면 추적이 가능합니다.

더 나아가, 민감한 키워드가 입력되면 알림을 보내거나 특정 문서 유형을 차단하는 기능도 추가할 수 있습니다. 이게 **"관리된 AI 사용"**과 **"무단 AI 사용"**의 차이입니다.

---

> **(주)비젼솔루션의 시각**
>
> 직원이 AI를 쓰는 건 막을 수 없습니다. 도구가 너무 쉽고, 효과가 너무 좋기 때문입니다. 경영자의 역할은 금지가 아니라 **출구를 설계하는 것**입니다. 좋은 출구가 있으면 나쁜 출구는 자연히 쓰이지 않습니다. 정보 보안의 핵심 원리는 막는 것이 아니라 통로를 만드는 겁니다 — 우리는 그렇게 봅니다.

---

![center](/mascot/md/emotion/cat_cheer.webp)

## 오늘 바로 할 수 있는 3가지

LiteLLM 설치가 아직 부담스러우시다면, 이것부터 해보세요.

**① AI 사용 현황 파악**: 팀장들에게 "현재 AI 도구 쓰는 거 있으면 알려달라"고 물어보세요. 처벌이 아니라 파악이 목적임을 먼저 말씀하세요.

**② 간단한 원칙 1페이지 공유**: "계약서·개인정보·거래 조건은 외부 AI에 입력 금지"만 명문화해도 절반은 됩니다. 복잡한 정책 없이 한 줄로도 출발할 수 있습니다.

**③ LiteLLM 테스트 설치**: IT 담당 직원 PC에 테스트로 설치해보세요. 30분이면 대시보드까지 볼 수 있습니다.

LiteLLM 공식 GitHub: [github.com/BerriAI/litellm](https://github.com/BerriAI/litellm)

더 구체적인 적용 — 우리 회사 시스템에 연결하거나 팀 규모에 맞는 AI 정책 설계가 필요하시다면 아래로 문의 주세요.

> **Vision Solution AI 솔루션 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)
