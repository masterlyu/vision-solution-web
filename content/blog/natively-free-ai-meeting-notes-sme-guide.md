---
title: "Otter.ai 대신 0원 — AI 회의록 5분 설치"
date: "2026-09-03"
tag: "AI 활용"
tags: "AI 활용,무료 AI 도구,회의록 자동화,소상공인 AI,업무 자동화"
image: "/images/blog/natively-free-ai-meeting-notes-sme-guide.svg"
summary: "월 구독료 내던 AI 회의록 앱, GitHub에서 무료 대안이 나왔습니다. Natively — 실시간 회의 내용을 AI가 받아쓰고 정리해줍니다. 로컬 실행으로 보안도 해결. 설치부터 첫 회의 기록까지 5분이면 충분합니다."
---

회의가 끝나면 가장 번거로운 일이 남습니다. 30분 회의에 회의록 작성 30분이 더 붙습니다. "이거 AI가 해주면 안 되나" 싶었던 분들을 위한 얘기입니다.

Otter.ai나 Fireflies.ai 같은 AI 회의록 서비스가 있습니다. 유용한데, 월 구독료가 붙습니다. 게다가 회의 내용이 외부 서버로 올라갑니다. 거래처 이름, 계약 금액, 고객 정보가 담긴 회의라면 신경 쓰이는 부분입니다.

이번 주 GitHub 트렌딩에 다른 선택지가 나타났습니다. 이름은 **Natively**입니다. 설치형, 개인·비상업용 무료입니다.

> **AI 도구 도입이 어렵게 느껴진다면 먼저 알아보세요:**  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)

## AI가 회의록을 받아씁니다 — Natively란

![center](/mascot/md/emotion/cat_happy.webp)

Natively는 내 컴퓨터에서 실행되는 AI 회의록 도구입니다. 마이크로 들어오는 소리를 실시간으로 받아써서 AI가 정리해줍니다. Zoom, 구글 미트, 카카오톡 통화 등 어떤 방식의 회의든 상관없습니다. 소리가 나는 곳이라면 작동합니다.

개인·교육·비상업적 용도는 무료입니다. 단, 상업적 사용은 유료 Pro 플랜이 필요합니다(출처: Natively Personal Use Source License v1.0). GitHub에서 코드를 받아 설치하는 방식이라 월정액 구독이 없습니다(개인·비상업용 기준).

핵심 기능을 정리하면 이렇습니다. 실시간 음성 인식과 텍스트 변환, AI를 통한 회의 요약 자동 생성, 내 회사 문서와 연결하는 로컬 RAG 기능, 그리고 스텔스 모드까지 포함되어 있습니다. 한국어를 포함한 다국어 음성 인식을 지원하니 한국어 회의에도 문제없습니다.

![Natively 핵심 숫자 3가지](/images/blog/natively-free-ai-meeting-notes-sme-guide-fig1.svg)
*▲ Natively 핵심 수치 · 출처: Natively GitHub (github.com/Natively-AI-assistant/natively-cluely-ai-assistant)*

실제로 내 회사에서 쓸 수 있을지, 솔직하게 따져보겠습니다.

## 현실 요구사항과 유료 앱 비교

![center](/mascot/md/emotion/cat_thinking.webp)

**설치에 필요한 것**

Node.js가 설치된 컴퓨터가 있으면 됩니다. 특별한 GPU나 고성능 서버가 필요하지 않습니다. Windows, macOS를 지원합니다. (Linux는 현재 미지원) AI 요약 기능을 사용하려면 OpenAI API 키 또는 Ollama(로컬 AI 실행 도구)가 필요합니다. OpenAI API는 사용한 만큼 과금되는데, 1시간 회의 요약 기준으로 대략 100~200원 수준입니다.

**솔직한 장단점**

장점이 분명합니다. 회의 내용이 외부 서버로 나가지 않습니다. 유료 구독이 없습니다. 우리 회사 문서와 연결해 AI가 관련 내용을 함께 참고하게 만들 수 있습니다.

단점도 있습니다. 초기 설치에 터미널 명령 실행이 필요합니다. IT에 익숙하지 않다면 처음 한 번은 도움이 필요할 수 있습니다. 음성 인식 정확도는 조용한 환경에서 더 좋고, 배경 소음이 많은 공간에서는 오류가 생깁니다.

| | Natively | Otter.ai | Fireflies.ai |
|---|---|---|---|
| 월 비용 | 무료 | $15~/인 | $10~/인 |
| 데이터 저장 | 내 PC (로컬) | 외부 서버 | 외부 서버 |
| 한국어 | ✅ | ✅ | ✅ |
| 설치형 | ✅ | ❌ | ❌ |
| 회사 문서 연결 | ✅ 로컬 RAG | 일부 유료 플랜 | 일부 유료 플랜 |

보안이 중요한 업종이나 구독료를 줄이고 싶은 회사에는 충분히 현실적인 선택입니다.

> **AI 솔루션 도입 사례가 궁금하다면:**  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)

## 중소기업에서 이렇게 씁니다

![center](/mascot/md/emotion/cat_surprised.webp)

제조업 거래처 미팅을 예로 들어보겠습니다. 납품 일정과 단가 협의가 오가는 자리입니다. Natively를 켜두면 회의가 끝난 뒤 주요 합의 사항, 추가 논의 필요 항목, 다음 미팅 일정이 정리된 요약문이 자동으로 만들어집니다. 30분이 걸리던 회의록 작성이 5분 검토로 바뀝니다.

고객 상담 내용 정리에도 씁니다. 상담 중 놓쳤던 고객 요구사항이 텍스트로 남으니, 다음 상담이나 견적 작성에 활용할 수 있습니다.

내부 교육이나 강의를 녹음하고 정리하는 용도도 있습니다. 외부 강사를 불러 진행한 교육 내용이 자동으로 정리되어 팀원과 공유할 수 있는 자료가 됩니다.

더 깊은 연동이나 기존 시스템과의 맞춤 연결이 필요하다면, 그 단계부터는 설계 전문가가 필요합니다.

---

> *(주)비젼솔루션이 보는 관점: AI 회의록 서비스의 진짜 비용은 구독료만이 아닙니다. 회의 내용을 외부 서버에 올리는 순간, 그 데이터 통제권은 내 손을 떠납니다. 거래처 협상 내용, 고객 개인정보가 담긴 회의라면 더욱 그렇습니다. 로컬에서 실행되는 오픈소스 도구가 항상 편리하지는 않지만, 데이터 주권만큼은 지킬 수 있습니다. AI 도구를 선택할 때 편리함과 통제권 사이의 균형을 따져보는 것이 첫 번째 판단 기준이 되어야 한다고 봅니다.*

---

## 5분 안에 설치하기

![Natively 설치 3단계](/images/blog/natively-free-ai-meeting-notes-sme-guide-fig2.svg)
*▲ Natively 설치 3단계 · 출처: Natively GitHub*

![center](/mascot/md/emotion/cat_cheer.webp)

처음이어도 따라하실 수 있습니다.

**1단계 — Node.js 설치 (이미 있으면 건너뛰기)**

1. [nodejs.org](https://nodejs.org/) 접속
2. LTS 버전 다운로드 후 설치
3. 설치 확인: 명령 프롬프트(Windows) 또는 터미널(Mac)에서 `node -v` 입력, 버전 숫자가 뜨면 성공입니다

**2단계 — Natively 다운로드**

```bash
git clone https://github.com/Natively-AI-assistant/natively-cluely-ai-assistant
cd natively-cluely-ai-assistant
npm install
```

**3단계 — 실행**

```bash
npm start
```

브라우저에서 `localhost:3000`을 열면 화면이 나타납니다. 마이크 권한을 허용하면 준비가 끝납니다.

AI 요약 기능을 사용하려면 설정에서 OpenAI API 키를 입력합니다. API 키는 [platform.openai.com](https://platform.openai.com/)에서 무료로 발급받을 수 있습니다. (API 사용료는 소량 발생합니다)

### 자주 묻는 질문

**Q. 한국어 음성 인식이 잘 되나요?**  
A. 한국어를 포함한 다국어 음성 인식을 지원합니다. 조용한 환경에서 마이크를 가까이 두면 인식률이 높아집니다.

**Q. Zoom이나 구글 미트 회의에도 쓸 수 있나요?**  
A. 됩니다. 시스템 오디오를 캡처하도록 설정하면 온라인 회의도 녹음·정리가 가능합니다.

**Q. IT 담당자가 없는 소기업도 설치할 수 있나요?**  
A. Node.js 설치와 터미널 명령 3줄이면 됩니다. 위 단계를 그대로 따라하면 30분 이내에 세팅이 완료됩니다. 막히는 부분이 있다면 외부 도움을 요청하는 것이 빠릅니다.

---

회의 끝나고 회의록 작성에 30분을 더 쓰는 게 아깝다면, 오늘 한 번 시도해볼 만합니다.

> **(주)비젼솔루션 AI 솔루션 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)


<!-- related-links -->

## 함께 보면 좋은 글

- [엔비디아 무료 AI — 설치 없이 5분에 계약서 검토](/blog/nvidia-nemotron-lightning-free-ai-sme-guide)
- [AI가 실수하는 이유 4가지 — 5분 무료 해결법](/blog/karpathy-claude-md-ai-4rules-guide)
- [14MB AI로 공장·매장 자동화 — 설치비 0원](/blog/needle2-offline-ai-14mb-guide)
