---
title: "영업·면접 AI 코치 — Natively 5분 설치"
date: "2026-06-14"
tag: "AI 활용"
tags: "AI 활용,AI 생산성,실시간 AI 코칭"
image: "/images/blog/natively-ai-realtime-coach-free-guide.svg"
summary: "유료 AI 영업·면접 코치가 월 $20~$149인 시대. 오픈소스 Natively는 0원으로 내 PC에서 실시간 AI 코칭을 제공합니다. 기업 기밀 유출 없는 로컬 실행, 7가지 모드(영업·채용·팀미팅)와 Windows·Mac 5분 설치 가이드."
---

![center](/mascot/md/emotion/cat_happy.png)

오후 3시, 영업 담당자 K씨가 전화기를 듭니다.

상대방은 까다로운 신규 고객입니다. 경쟁사 얘기가 나오고 가격 협상이 이어집니다. K씨는 머릿속이 하얘집니다. "이때 뭐라고 해야 하지?"

통화가 끊기고 나서야 떠오릅니다. "그때 이렇게 말했어야 했는데."

통화 중에 AI가 실시간으로 다음 말을 제안해준다면 어떨까요. 2026년 6월, 그 기능을 오픈소스로 공개한 도구가 GitHub 트렌딩 상위권에 진입했습니다. 이름은 **Natively**. 월 수만~수십만 원짜리 유료 AI 코칭 서비스를 0원으로 대체하는 오픈소스입니다.

> **AI 도구 도입이 막막하다면 무료로 상담 먼저:**  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)

---

## Natively가 뭔가요? — 통화 중 AI가 귓속말

"AI 회의 도구"라고 하면 많은 분이 회의록 자동 요약을 떠올립니다. 회의가 끝난 뒤 AI가 내용을 정리해주는 방식이죠. 지난번 소개한 [Meetily](/blog/meetily-ai-meeting-notes-free)가 그런 도구입니다.

Natively는 다릅니다. 핵심은 **'지금 이 순간'**입니다.

통화나 회의가 진행되는 동안 AI가 화면 한쪽에 제안을 띄워줍니다. "이 질문에는 이렇게 답하세요", "지금 경쟁사 비교가 나왔습니다 — 우리 강점은 이겁니다" 식으로요. 회의가 끝난 뒤에 보는 게 아니라, 말하는 그 순간에 씁니다.

작동 방식은 이렇습니다. 마이크와 스피커 음성을 동시에 잡아 Whisper(오픈소스 음성인식)로 문자로 바꿉니다. 이를 AI(GPT, Claude, 또는 로컬 Llama)에 보내면 즉각 제안이 생성됩니다. 응답 속도는 500ms 미만, 대화 흐름이 끊기지 않습니다.

7가지 모드가 있습니다.

| 모드 | 용도 |
|------|------|
| Sales | 영업·고객 통화 중 대응 제안 |
| Recruiting | 채용 면접 중 질문·평가 안내 |
| Technical Interview | 기술 면접 실시간 지원 |
| Team Meeting | 내부 회의 중 아이디어 보완 |
| Lecture | 강의·발표 보조 |
| General | 일반 상담·대화 |
| Looking for Work | 구직·커리어 코칭 |

한마디로 정리하면 이렇습니다. 회의가 끝난 뒤 요약이 필요하면 Meetily, 회의 중 실시간 제안이 필요하면 Natively입니다. 둘은 목적이 다른 보완 관계입니다.

![Natively 작동 원리 3단계](/images/blog/natively-ai-realtime-coach-free-guide-fig2.svg)
*▲ Natively 실시간 AI 코칭 흐름 · 출처: GitHub 공식 README*

그럼 이 도구, 실제로 내 PC에서 돌아가는지 따져봅시다.

---

## 솔직한 사양·비용·한계

![center](/mascot/md/emotion/cat_thinking.png)

GitHub 트렌딩 진입이라도 내 PC에서 돌아가는지가 먼저입니다.

### 시스템 요구사항

| 항목 | 조건 |
|------|------|
| 운영체제 | macOS 12 이상, Windows 10/11 |
| RAM | 8GB 이상 (로컬 AI 모드: 16GB 권장) |
| 인터넷 | API 모드는 필요, Ollama 로컬 모드는 불필요 |
| Linux | 현재 미지원 (향후 커뮤니티 추가 예정) |

Windows와 Mac은 모두 됩니다. Linux 서버 환경은 아직 안 됩니다.

### 비용 구조

Natively 앱 자체는 무료입니다. AI 모델을 직접 선택합니다.

**방법 A — BYOK(내 API 키 연결)**: OpenAI, Anthropic, Gemini, Groq 등의 API 키를 발급받아 연결합니다. 사용량만큼 과금됩니다. 1시간 영업 통화 기준 GPT-4o mini는 수백 원 수준입니다.

**방법 B — 로컬 Ollama**: Ollama 설치 후 Llama·Mistral 같은 로컬 모델을 연결하면 API 비용 없이 씁니다. RAM 16GB 이상 PC가 쾌적합니다.

### 유료 서비스와 비교

![AI 코칭 서비스 월 이용료 비교](/images/blog/natively-ai-realtime-coach-free-guide-fig1.svg)
*▲ 유사 서비스 월 이용료 비교 · 출처: Natively GitHub README (2026.06 기준, 경쟁사 가격은 Natively 측 자료)*

Natively GitHub에 따르면 유사 서비스는 Cluely($20/월), LockedIn AI($70/월), Final Round AI($149/월)입니다. 이들은 클라우드 방식이라 회의 내용이 외부 서버로 전송됩니다. Natively의 로컬 모드는 음성과 텍스트 모두 내 PC에서만 처리하므로 기업 기밀이 외부로 나가지 않습니다.

### 솔직한 단점

한국어 제안은 직접 설정해야 합니다. 컨텍스트 노트에 "모든 제안을 한국어로 작성하라"고 명시하면 해결됩니다. 로컬 소형 모델은 GPT-4o보다 제안 품질이 낮습니다. 아직 활발히 개발 중인 도구라 완성도는 유료 서비스보다 낮습니다.

완성도 높은 경험을 원한다면 유료 서비스가 낫습니다. 예산을 최소화하면서 실험하고 싶은 팀에게 맞는 도구입니다.

---

## 중소기업이 쓰는 3가지 시나리오

### 시나리오 1 — 영업 담당자의 첫 통화

10인 이하 제조업체 영업 담당자가 새 거래처와 처음 통화합니다.

상대가 "납기가 얼마나 걸리냐"고 묻습니다. Natively 화면에는 이미 제품 정보와 납기 정책이 컨텍스트로 입력돼 있습니다. AI가 즉각 제안합니다: "표준 납기 14일, 긴급 발주 시 7일 가능, 수량 기준 추가 할인 안내."

자료를 뒤질 필요 없이 통화 흐름을 유지하면서 정확한 답변이 나옵니다. 설정: Sales 모드 → 컨텍스트 노트에 제품 카탈로그 핵심 내용 붙여넣기.

### 시나리오 2 — 대표가 직접 보는 채용 면접

인사팀이 없는 30인 규모 회사의 대표가 직접 면접을 봅니다.

직무 경험을 묻다가 막히는 순간, Natively가 Recruiting 모드에서 다음 질문을 제안합니다: "해당 프로젝트에서 본인의 역할과 기여 비율을 구체적으로 말해달라." 면접 경험이 많지 않아도 구조화된 질문 흐름을 유지할 수 있습니다.

설정: Recruiting 모드 → 컨텍스트에 채용 공고·직무 요건 입력.

### 시나리오 3 — 팀 미팅 아이디어 보완

5명짜리 마케팅팀 주간 회의. 신제품 출시 방향을 논의 중입니다.

팀원들이 아이디어를 내는 동안, 팀장 PC의 Natively가 General 모드에서 빠진 관점을 짚어줍니다: "SNS 타겟 연령대별 채널 분리 전략이 빠졌습니다." 회의 중 빠진 관점을 실시간으로 잡아주는 보조 도구로 씁니다.

---

> **AI 도입을 검토 중이라면 먼저 상담하세요 — 무료입니다:**  
> 📧 biztalktome@gmail.com | 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)

---

**(주)비젼솔루션 관점**

실시간 AI 코칭 도구가 나왔다고 해서 그것이 '사람 대신 AI가 말한다'는 뜻은 아닙니다. 도구는 현장에서 판단하는 사람을 보조합니다. AI가 제안하는 내용을 걸러 쓸 줄 아는 사람이 있어야 한다는 점이 핵심입니다. Natively 같은 도구의 진짜 가치는 "AI가 알아서 한다"가 아니라 "사람이 더 잘 판단하도록 돕는다"에 있습니다. 도구를 현명하게 쓰는 조직이 결국 앞서 나간다고 봅니다.

---

## Windows에서 5분에 시작하기

![center](/mascot/md/emotion/cat_cheer.png)

Windows 10/11 기준입니다. Mac도 동일한 흐름입니다.

**Step 1 — 설치 파일 받기**

GitHub Releases 페이지에서 최신 버전을 받습니다.

```
https://github.com/Natively-AI-assistant/natively-cluely-ai-assistant/releases/latest
```

Windows는 `.exe`, Mac은 `.dmg` 파일을 선택합니다.

**Step 2 — 설치 실행**

받은 파일을 더블클릭합니다. Windows "알 수 없는 게시자" 경고가 나오면 "추가 정보 → 실행"을 클릭합니다. 오픈소스 앱에서 흔한 현상입니다.

**Step 3 — API 키 등록**

앱을 처음 열면 API 설정 화면이 나옵니다.

OpenAI 사용 시:
1. `platform.openai.com` 접속 → API Keys → Create new secret key
2. 생성된 키를 복사해 Natively에 붙여넣기
3. 모델: `gpt-4o-mini` 선택 (저렴하고 빠릅니다)

무료 로컬 모드: `ollama.com`에서 Ollama 설치 후 Natively에서 로컬 모델 선택.

**Step 4 — 모드 선택 후 시작**

상단에서 모드를 선택(Sales, Recruiting, General 등)합니다. 컨텍스트 노트에 관련 정보를 입력합니다. 마이크 권한 허용 후 통화·회의를 시작합니다.

**Step 5 — 테스트**

자신에게 "우리 제품 가격이 어떻게 되나요?"라고 말해보세요. 화면에 AI 제안이 나타나면 성공입니다.

---

## 자주 묻는 질문

**Q: API 비용 없이 완전 무료로 쓸 수 있나요?**  
A: 네, Ollama 설치 후 로컬 모델(Llama, Mistral 등)을 연결하면 API 비용 없이 씁니다. RAM 16GB 이상 PC를 권장합니다.

**Q: 회의 내용이 외부로 나가지 않나요?**  
A: Ollama 로컬 모드에서는 음성과 텍스트 모두 내 PC에서만 처리됩니다. BYOK(API 키) 모드는 텍스트가 해당 AI 서비스(OpenAI 등)로 전송됩니다.

**Q: 한국어로 제안이 나오나요?**  
A: Whisper 음성인식은 한국어를 지원합니다. 컨텍스트 노트에 "모든 제안을 한국어로 작성하라"고 입력하면 한국어 제안이 나옵니다.

---

> **Vision Solution AI 솔루션 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)
