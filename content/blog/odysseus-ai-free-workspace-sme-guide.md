---
title: "사장님, ChatGPT 0원으로 쓰는 법"
date: "2026-06-16"
tag: "AI 활용"
tags: "AI 활용,오픈소스 AI,ChatGPT 대안,중소기업 AI,Odysseus"
image: "/images/blog/odysseus-ai-free-workspace-sme-guide.svg"
summary: "PewDiePie가 공개한 오픈소스 AI 워크스페이스 Odysseus, 2주 만에 GitHub 별 69,000개. ChatGPT 구독 없이 회사 전용 AI 서버를 직접 운영하는 단계별 방법을 정리했습니다."
---

매달 빠져나가는 ChatGPT 구독료, 직원이 늘수록 더 커지죠.

그런데 최근 전 세계 유튜브 구독자 1위 크리에이터 PewDiePie가 GitHub에 뭔가를 공개했습니다. 이름은 **Odysseus**. 오픈소스, AGPL-3.0 라이선스, 완전 무료. 공개 2주 만에 GitHub 별 69,000개가 찍혔습니다.

ChatGPT와 Claude를 대체하는 자체 호스팅 AI 워크스페이스입니다. 내 서버에서 돌리면 월 구독료 0원입니다.

![center](/mascot/md/emotion/cat_happy.png)

## Odysseus, 이게 정확히 뭔데

한마디로 "내 컴퓨터에 설치하는 ChatGPT"입니다.

회사 PC나 서버에 설치하면, 브라우저에서 ChatGPT처럼 쓸 수 있습니다. 대화 내용이 외부 서버로 나가지 않고, 직원 여러 명이 한 서버를 함께 씁니다.

기능은 꽤 넓습니다. 채팅은 기본이고, AI 에이전트(웹 검색·파일 읽기·명령 실행·기억 유지), 여러 웹페이지를 자동으로 찾아 리포트를 만드는 딥 리서치, 문서 편집·이메일·캘린더·메모까지 통합되어 있습니다.

특히 **Cookbook** 기능이 실용적입니다. 내 PC 사양을 자동으로 감지해 적합한 AI 모델을 추천하고, 원클릭으로 설치해줍니다. "어떤 AI 모델을 써야 할지 모르겠다"는 초보자가 부딪히는 첫 번째 장벽을 없애줍니다.

비슷한 도구로 Open WebUI + Ollama 조합이 있지만, Odysseus는 에이전트·딥리서치·문서 편집이 처음부터 통합되어 있어 설치 한 번으로 더 많은 기능을 씁니다.

![center](/mascot/md/emotion/cat_thinking.png)

## 중소기업에 왜 좋은가 — 솔직한 장단점

ChatGPT도 훌륭한 도구입니다. 그런데 두 가지가 걸립니다.

**비용.** 직원 한 명당 월 $20(약 2만7천원), 10명이면 월 27만원, 1년이면 324만원. 업무용 Plus 기준입니다.

**데이터.** 고객 정보, 내부 기획안, 단가표를 ChatGPT에 입력하면 그 데이터는 OpenAI 서버로 올라갑니다. 기업 보안 정책이나 개인정보보호법 관점에서 아슬아슬한 경우가 있습니다.

Odysseus는 이 두 가지를 동시에 해결합니다.

![Odysseus vs ChatGPT 비용·보안 비교](/images/blog/odysseus-ai-free-workspace-sme-guide-fig1.svg)
*▲ ChatGPT vs Odysseus 비용 비교 · 출처: ChatGPT 공식 요금 페이지, Odysseus GitHub 리포지토리*

**설치 전 확인할 PC 사양:**

| 사용 규모 | 최소 사양 | 권장 |
|-----------|-----------|------|
| 혼자 테스트 | RAM 8GB | RAM 16GB |
| 5명 미만 팀 | RAM 16GB, GPU 8GB | RAM 32GB, GPU 12GB |
| 10명 이상 | GPU 24GB 이상 | 서버용 GPU |

GPU 없이도 쓸 수 있지만 응답 속도가 느립니다. 빠른 속도가 필요하면 OpenAI API 키를 연결하면 됩니다(이 경우 API 비용은 발생하지만 구독료보다 저렴합니다). 단점도 있습니다. 설치와 관리를 직접 해야 하고, 고성능 로컬 AI는 PC 사양이 받쳐줘야 합니다.

![center](/mascot/md/emotion/cat_surprised.png)

## 내 회사에 붙이는 방법

중소 제조업체라면 이렇게 씁니다. 납품서·규격서·계약서를 Odysseus에 학습시키면, 직원이 "이 부품 납기 일정 어떻게 돼?"라고 물었을 때 문서를 뒤져서 답합니다. 데이터는 외부로 나가지 않습니다.

부동산 중개소라면, 매물 정보 엑셀을 연결하고 고객 문의 이메일 초안을 자동 작성하는 데 쓸 수 있습니다.

여기까지는 IT에 익숙한 직원이 있으면 직접 설정할 수 있습니다. 회사 문서 연결, 직원 계정 관리, 권한 세팅까지 원하는 경우엔 전문가 도움을 받는 게 낫습니다.

**(주)비젼솔루션 관점:** AI 도구의 핵심은 결국 데이터 주권입니다. 편리함을 위해 모든 대화를 외부 서버로 보내는 것이 내 회사에 맞는 선택인지, 규모가 커질수록 한 번쯤 짚어볼 문제입니다. Odysseus처럼 자체 호스팅 오픈소스가 현실적인 선택지가 됐다는 것은, 이 판단이 더 이상 대기업만의 문제가 아니라는 신호입니다.

## 지금 당장 설치하는 법 (30분)

준비물: PC 또는 서버 1대, 인터넷 연결.

**1단계 — Docker 설치**

Docker는 프로그램을 쉽게 설치·삭제할 수 있는 도구입니다. [docker.com](https://www.docker.com)에서 Docker Desktop을 내려받아 설치합니다. Windows·Mac 모두 지원합니다.

**2단계 — Odysseus 내려받기**

터미널(Windows: PowerShell)에 아래 명령어를 복붙합니다.

```bash
git clone https://github.com/pewdiepie-archdaemon/odysseus
cd odysseus
docker compose up -d
```

**3단계 — 브라우저에서 열기**

`http://localhost:3000`을 브라우저 주소창에 입력합니다. 처음 실행이면 계정 생성 화면이 뜹니다.

**4단계 — Cookbook으로 AI 모델 설치**

Cookbook 메뉴 → 내 PC 사양 자동 감지 → 추천 모델 선택 → 설치 버튼. 10~20분 후 바로 사용할 수 있습니다.

![center](/mascot/md/emotion/cat_cheer.png)

설치가 어렵거나 회사 데이터를 연결하고 싶다면, 아래로 연락 주세요.

> **Vision Solution AI 솔루션 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)


<!-- related-links -->

## 함께 보면 좋은 글

- [나레이션 외주 끊는 법 — AI 음성 5분 만들기](/blog/ai-voice-narration-microsoft-vibevoice)
- [경쟁사 조사 2시간→5분 — DeerFlow 자동화 실습](/blog/deerflow-competitor-analysis-automation)
- [윈도우에 AI가 내장됐다 — 마이크로소프트 Aion 무료 체험](/blog/aion-windows-ai-free-sme-guide)
