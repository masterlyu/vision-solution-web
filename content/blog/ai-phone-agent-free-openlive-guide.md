---
title: "손님 전화, AI가 24시간 대신 받는다"
date: "2026-09-15"
tag: "AI 활용"
tags: "AI 활용,AI 솔루션,중소기업 AI,음성 AI"
image: "/images/blog/ai-phone-agent-free-openlive-guide.svg"
summary: "2026년 9월 OpenAI가 분당 $0.05짜리 AI 음성 상담 API를 공개했습니다. 같은 기능을 월 0원으로 구현하는 오픈소스 도구 2가지(Openlive·OpenGPT Live)와 중소기업·소상공인 활용법을 정리했습니다."
---

오후 7시. 가게 문 닫고 퇴근했는데 부재중 전화가 8통입니다.

"오늘 예약 가능한가요?", "영업시간이 어떻게 되나요?", "주차되나요?" 전부 같은 패턴입니다. 주말도, 명절도 마찬가지입니다.

이 문제를 AI가 대신 해결하는 기술이 나왔습니다. 2026년 9월, OpenAI가 실시간 AI 음성 대화 API인 GPT-Live-1을 공개했고, 같은 기술을 **완전 무료**로 구현한 오픈소스 도구들이 GitHub에 등장했습니다.

> **AI 음성 상담원 도입이 궁금하다면** → [3분 안에 무료 상담 신청하기](https://www.visionc.co.kr/ai-solution)

![center](/mascot/md/emotion/cat_happy.png)

## OpenAI GPT-Live-1 — 전화를 AI가 받는 기술

GPT-Live-1은 사람과 AI가 실시간으로 음성 대화를 주고받는 기술입니다. 전화 상담원처럼 질문에 즉시 말로 답하고, 예약도 접수하고, 자주 묻는 내용을 안내합니다. 24시간 지치지 않습니다.

OpenAI는 이 기술을 **분당 $0.05**로 API를 통해 제공합니다. 전화가 많은 사업장이라면 월 수십만 원이 나올 수 있는 금액입니다. 그런데 같은 구조를 오픈소스로 구현한 도구들이 GitHub에 올라왔습니다. 서버만 있으면 **월 0원**입니다.

![AI 음성 상담 비용 비교](/images/blog/ai-phone-agent-free-openlive-guide-fig1.svg)
*▲ GPT-Live-1 유료 vs 오픈소스 자체 호스팅 비교 · 출처: OpenAI 공식 발표 및 GitHub 저장소*

## 지금 쓸 수 있는 무료 오픈소스 도구 2가지

> **어느 도구가 우리 회사에 맞는지 모르겠다면** → [전문가에게 5분 물어보기](https://www.visionc.co.kr/ai-solution)

![center](/mascot/md/emotion/cat_thinking.png)

GitHub에 올라온 두 가지 도구를 소개합니다. 둘 다 무료이고, 자체 서버에서 운영할 수 있습니다.

**Openlive** — Rust 기반, 빠르고 가벼운 음성 AI 런타임 ([GitHub](https://github.com/byte271/Openlive), Apache 2.0)

ChatGPT Advanced Voice Mode를 오픈소스로 재구현한 프로젝트입니다. WebRTC 방식으로 실시간 음성을 주고받고, Piper라는 무료 TTS 엔진도 연결할 수 있습니다. OpenAI 호환 API를 지원해 자체 AI 모델도 붙일 수 있습니다. Windows·macOS 데스크톱 앱도 제공합니다.

→ 필요 사양: Rust 1.83 이상

**OpenGPT Live** — TypeScript 기반, 웹 인터페이스 설치가 편리 ([GitHub](https://github.com/study8677/open-gpt-live), MIT)

Next.js로 만들어진 브라우저 기반 음성 AI 인터페이스입니다. 실시간 자막, 음성 인식, TTS를 모두 지원합니다. Ollama를 통해 로컬 AI 모델에도 연결할 수 있어 OpenAI API 없이 완전 무료 운영도 가능합니다(실험 단계).

→ 필요 사양: Node.js 22.13 이상, pnpm

| 구분 | Openlive | OpenGPT Live |
|---|---|---|
| 언어 | Rust | TypeScript |
| 라이선스 | Apache 2.0 | MIT |
| 데스크톱 앱 | 있음 | 없음(웹) |
| 로컬 AI 연결 | 가능 | 가능(Ollama, 실험 단계) |
| 설치 난이도 | 중급(Rust) | 초중급(Node.js) |

**솔직한 한계**: 두 도구 모두 실제 전화망과 직접 연결되지는 않습니다. 홈페이지 음성 챗으로는 바로 쓸 수 있지만, 010·02 번호 전화 연동은 VoIP 브리지 설정이 추가로 필요합니다.

## 중소기업·소상공인이 실제로 쓰는 방법

AI 음성 상담원 활용은 난이도에 따라 두 단계로 나뉩니다.

**첫 번째 단계 — 홈페이지 음성 상담 챗**

가장 빠르게 시작하는 방법입니다. OpenGPT Live를 서버에 올리고 홈페이지에 버튼 하나를 넣으면, 방문자가 눌렀을 때 AI가 음성으로 응대합니다. FAQ 정보는 텍스트로 넣어두면 그 내용을 바탕으로 답변합니다.

"영업시간은 오전 10시에서 오후 8시입니다", "주차는 건물 지하 1층에 가능합니다" 처럼 자주 묻는 내용을 미리 입력해두면 됩니다.

**두 번째 단계 — 실제 전화 연동**

FreeSWITCH나 Asterisk 같은 VoIP 서버를 통해 전화를 AI 음성 런타임으로 라우팅합니다. 난이도가 올라가지만 24시간 전화 자동 응대가 가능해집니다. 예약제 업종(미용실, 치과, 학원, 음식점)에서 효과가 큽니다.

![오픈소스 AI 음성 상담원 구축 단계](/images/blog/ai-phone-agent-free-openlive-guide-fig2.svg)
*▲ 오픈소스 AI 음성 상담원 구축 3단계 · (주)비젼솔루션 정리*

## 5분 실습 — OpenGPT Live 설치해보기

![center](/mascot/md/emotion/cat_cheer.png)

**필요한 것**: Node.js 22.13 이상, pnpm, OpenAI API 키(또는 Ollama)

① pnpm 설치 (Node.js 먼저 설치 후)
```
npm install -g pnpm
```

② 소스 코드 내려받기
```
git clone https://github.com/study8677/open-gpt-live
cd open-gpt-live
pnpm install
```

③ 환경 설정 파일 만들기 (`.env` 파일 생성)
```
OPENAI_API_KEY=여기에_API키_붙여넣기
```

④ 실행
```
pnpm dev
```

브라우저에서 `http://localhost:3000`에 접속하면 AI와 음성 대화를 바로 테스트할 수 있습니다. Ollama를 연결하면 OpenAI API 없이도 테스트할 수 있습니다(실험 단계).

## 비젼솔루션이 보는 관점

음성 AI 기술이 오픈소스로 공개됐습니다. 코드는 있고, 무료입니다.

그러나 기술이 공개됐다고 도입이 쉬운 건 아닙니다. 설치는 30분이지만 실제 업무 연동 — FAQ 설계, 오답 대응, 전화망 연결 — 은 다른 수준의 작업입니다. "어디까지 직접 하고, 어디서 전문가를 쓸지"를 먼저 파악하는 것이 시간 낭비를 줄이는 첫걸음입니다. 기술이 열려 있다는 것과, 그 기술이 내 사업에 맞게 작동한다는 것은 다른 이야기입니다.
— (주)비젼솔루션

## 자주 묻는 질문

**Q. 전화 상담과 웹사이트 음성 챗은 어떻게 다른가요?**
A. 웹사이트 음성 챗은 설치 후 바로 쓸 수 있습니다. 실제 전화(010, 02 번호)로 들어오는 전화를 AI가 받으려면 VoIP 서버 연동이 추가로 필요합니다.

**Q. AI가 잘못된 정보를 안내하면 어떻게 되나요?**
A. 미리 입력한 FAQ 범위 안에서만 답하도록 설정할 수 있습니다. 범위 밖 질문은 "담당자에게 연결해 드리겠습니다"로 처리하도록 프롬프트를 짜두면 오답 위험을 줄일 수 있습니다.

**Q. 이 오픈소스 도구들을 상업적으로 써도 되나요?**
A. 네. Openlive는 Apache 2.0, OpenGPT Live는 MIT 라이선스로 상업적 이용이 허용됩니다.

---

> **AI 음성 상담원 도입 문의 — (주)비젼솔루션**  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)
