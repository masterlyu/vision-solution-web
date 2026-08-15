---
title: "하루 만에 별 6만 개 — AI 직원 레고 조립법"
date: "2026-08-16"
tag: "AI 활용"
tags: "AI 에이전트,업무 자동화,오픈소스 AI,AI 에이전트 프레임워크,중소기업 AI"
image: "/images/blog/deepseek-harness-ai-agent-lego-free-guide.svg"
summary: "딥시크가 공개한 에이전트 프레임워크 Harness, 24시간 만에 GitHub 별 6만 5천 개. AI 모델·도구·메모리·UI를 레고처럼 골라 조립하는 무료 오픈소스. 내 업무에 맞는 AI 직원을 만드는 중소기업 5분 시작 가이드입니다."
---

ChatGPT를 쓰다 보면 이런 순간이 오셨을 겁니다. "우리 회사 상품 정보를 기억하게 하고 싶은데, 고객 문의에 자동으로 답하게 하고 싶은데, 이게 왜 안 되지?"

2026년 8월 13일, 딥시크(DeepSeek)가 그 막힌 벽을 뚫는 도구를 공개했습니다. 이름은 **DeepSeek Harness**입니다. 공개 24시간 만에 GitHub 별 6만 5천 개가 쌓였습니다. AI 에이전트 프레임워크로는 보기 드문 반응 속도였습니다.

> **AI 도입이 막막하다면 먼저 무료 상담부터:**  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)

## AI 직원을 레고처럼 조립한다는 게 무슨 뜻인가요

![center](/mascot/md/emotion/cat_happy.webp)

기존 AI 도구는 완성된 레고 작품 같습니다. 잘 만들어졌지만, 내 회사에 맞게 바꾸는 데는 한계가 있습니다. ChatGPT에 우리 제품 데이터를 붙이거나, 사내 시스템과 연결하거나, 특정 업무만 전담하는 기능을 추가하려면 금방 막힙니다.

Harness는 반대 방향에서 출발합니다. 레고 낱개 블록 통을 건네주는 방식입니다.

딥시크는 이 구조를 **"Everything is a Plugin(모든 것이 플러그인)"**이라고 불렀습니다. 네 가지 블록을 각자 고릅니다.

- **모델(뇌)** — 딥시크 모델, 또는 원하는 다른 AI 모델로 바꿀 수 있습니다
- **도구(손)** — 웹 검색, 파일 처리, 이메일 발송 등 필요한 기능만 추가합니다
- **메모리(기억)** — 고객 대화 기록, 회사 문서, 제품 정보를 연결합니다
- **UI(얼굴)** — 채팅창, 슬랙 연동, 대시보드 등 원하는 인터페이스를 고릅니다

이 블록들을 조합하면 "고객 문의 전담 AI", "보고서 자동 작성 AI", "재고 알림 AI"처럼 내 회사 업무에 딱 맞는 AI 직원이 만들어집니다.

![DeepSeek Harness 핵심 수치](/images/blog/deepseek-harness-ai-agent-lego-free-guide-fig1.svg)
*▲ DeepSeek Harness 주요 수치 · 출처: github.com/deepseek-ai/deepseek-harness*

그럼 실제로 내 회사 컴퓨터에서 쓸 수 있는지 따져보겠습니다.

## 진짜 쓸 수 있나요? — 요구사항과 솔직한 비교

![center](/mascot/md/emotion/cat_thinking.webp)

솔직하게 따져보겠습니다. Harness는 두 가지 방식으로 쓸 수 있습니다.

**방법 1 — DeepSeek API 연결 (초보자 권장)**

[deploy.deepseek.com](https://deploy.deepseek.com)에서 API 키를 발급받아 Harness에 연결하는 방식입니다. 내 컴퓨터 사양은 관계없습니다. AI 연산은 딥시크 서버에서 처리합니다. 무료 크레딧으로 먼저 테스트할 수 있습니다.

단점은 명확합니다. 입력한 데이터가 딥시크 서버를 거칩니다. 고객 개인정보나 영업 기밀은 입력하지 않아야 합니다.

**방법 2 — 로컬 모델 연결 (보안이 중요한 회사)**

오픈소스 AI 모델을 자체 서버에 설치해 Harness와 연결하는 방식입니다. 데이터가 외부로 나가지 않아 보안 규정이 엄격한 업종(의료·법률·금융)에 적합합니다. 다만 GPU가 탑재된 전용 서버가 필요합니다. 처음 도입하는 중소기업이라면 API 방식으로 먼저 테스트하는 게 현실적입니다.

| | DeepSeek Harness | LangChain | Dify |
|---|---|---|---|
| 비용 | 무료 (MIT) | 무료 (MIT) | 무료 플랜 있음 |
| 플러그인 조립 | ✅ 핵심 구조 | ⚠️ 코드로 구현 | ✅ 노코드 UI |
| 모델 교체 | ✅ 자유롭게 | ✅ 자유롭게 | ✅ 자유롭게 |
| 초보자 진입장벽 | ⚠️ 중간 | ❌ 코딩 필수 | ✅ 낮음 |
| 커스터마이징 깊이 | ✅ 높음 | ✅ 매우 높음 | ⚠️ 제한적 |

Harness가 모든 면에서 최고인 건 아닙니다. 완전 노코드 방식은 Dify가 더 쉽고, 개발자가 정교하게 제어하고 싶다면 LangChain이 더 강력합니다. Harness는 그 중간 어딘가, "레고처럼 조립하는 구조가 직관적으로 이해되는" 경우에 잘 맞습니다.

> **어떤 도구가 우리 회사에 맞는지 모르겠다면:**  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)

## 중소기업 회사에서 이렇게 씁니다

![center](/mascot/md/emotion/cat_surprised.webp)

Harness로 만들 수 있는 AI 직원 시나리오 세 가지를 보겠습니다.

**시나리오 1 — 고객 문의 자동 답변 AI**

오후 6시 이후, 주말에도 고객 문의가 들어옵니다. FAQ 데이터와 상품 정보를 Harness 메모리에 연결하면, AI가 "배송은 며칠 걸리나요?", "환불 정책이 어떻게 되나요?" 같은 반복 질문을 자동으로 처리합니다. 사장님은 정말 중요한 문의에만 직접 답하면 됩니다.

**시나리오 2 — 내 문서 연결 AI 비서**

회사 계약서, 제품 매뉴얼, 보고서가 쌓여 있다면 이 문서들을 Harness 메모리에 연결해 자연어로 물을 수 있습니다. "지난 분기 매출 현황 요약해줘", "이 계약서에서 위약금 조항 찾아줘" 같은 질문에 즉시 답이 나옵니다. 문서를 일일이 뒤지는 시간이 줄어듭니다.

**시나리오 3 — 반복 업무 자동화 에이전트**

매일 아침 업계 뉴스를 모아 요약해서 메일로 보내거나, 재고가 일정 수준 이하로 떨어지면 알림을 보내는 에이전트를 만들 수 있습니다. 사람이 매번 확인하지 않아도 되는 반복 업무입니다. 자사 시스템이나 데이터베이스에 깊게 연결하는 고급 설정부터는 전문가와 함께하는 게 빠릅니다.

---

> *(주)비젼솔루션이 보는 관점: Harness의 핵심은 "AI를 조립한다"는 개념 자체입니다. 지금까지는 AI 회사가 만들어준 기능을 쓰는 방식이었습니다. 이제는 내가 필요한 기능만 골라 붙이는 방식이 됐습니다. 도구가 레고처럼 바뀌었다는 것은, AI 활용의 주도권이 기술 회사에서 사용자 쪽으로 한 발 더 이동했다는 뜻입니다. 중소기업 입장에서 중요한 건 이 변화의 속도입니다. 조립 방법을 먼저 익히는 회사와 아직 관망하는 회사의 격차는 6개월 안에 가시적으로 나타납니다.*

---

## 5분 실습 — 첫 AI 직원 직접 만들어보기

![Harness 시작 3단계](/images/blog/deepseek-harness-ai-agent-lego-free-guide-fig2.svg)
*▲ Harness 시작 3단계 · 출처: github.com/deepseek-ai/deepseek-harness*

복잡하지 않습니다. 아래 단계를 따라해보세요.

**1단계 — DeepSeek API 키 발급 (2분)**

1. [deploy.deepseek.com](https://deploy.deepseek.com)에 접속합니다
2. 이메일로 무료 계정을 만듭니다
3. 대시보드에서 API 키를 발급받아 복사해둡니다

무료 크레딧이 제공되므로 처음에는 비용이 없습니다.

**2단계 — Harness 내려받기 (1분)**

터미널(맥) 또는 명령 프롬프트(윈도우)에서 아래를 실행합니다:

```bash
git clone https://github.com/deepseek-ai/deepseek-harness
cd deepseek-harness
pip install -r requirements.txt
```

파이썬이 없다면 [python.org](https://www.python.org/)에서 먼저 설치하세요.

**3단계 — 첫 에이전트 설정 (2분)**

GitHub README에 안내된 설정 파일(`config.yaml` 또는 `.env`)을 열어 발급받은 API 키를 입력합니다:

```yaml
model:
  provider: deepseek
  api_key: "여기에_복사한_API_키_입력"

plugins:
  - web_search
  - file_reader
```

저장 후 실행하면 첫 대화창이 뜹니다. 이것이 내 첫 번째 AI 직원입니다.

*정확한 실행 명령과 설정 옵션은 [GitHub README](https://github.com/deepseek-ai/deepseek-harness)를 참고하세요. 버전별로 달라질 수 있습니다.*

![center](/mascot/md/emotion/cat_cheer.webp)

### 자주 묻는 질문

**Q. 코딩을 전혀 몰라도 쓸 수 있나요?**  
A. 위 실습 수준은 복붙으로 가능합니다. 다만 고객 데이터 연결이나 사내 시스템 통합 같은 심화 설정에는 개발자 도움이 필요합니다.

**Q. 비용이 전혀 없는 건가요?**  
A. Harness 자체는 무료입니다. API 방식을 선택하면 DeepSeek API 사용량에 따라 비용이 발생합니다. 처음에는 무료 크레딧으로 시작할 수 있습니다.

**Q. 내 데이터가 외부로 나가지 않게 할 수 있나요?**  
A. 로컬 오픈소스 모델(예: Ollama)을 Harness에 연결하면 데이터가 외부 서버로 나가지 않습니다. 설정이 더 복잡해지므로, 처음엔 중요하지 않은 데이터로 먼저 테스트해보는 것을 권장합니다.

**Q. 딥시크 모델 말고 다른 AI 모델을 연결할 수 있나요?**  
A. 됩니다. OpenAI, Anthropic Claude, 그 외 오픈소스 모델도 설정 파일에서 provider만 바꾸면 연결할 수 있습니다.

---

AI 도구가 레고 블록처럼 바뀌고 있습니다. 지금은 조립 방법을 익히는 시기입니다.

> **(주)비젼솔루션 AI 솔루션 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)
