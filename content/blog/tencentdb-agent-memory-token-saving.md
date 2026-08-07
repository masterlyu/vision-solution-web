---
title: "AI 비용 61% 줄여주는 텐센트 무료 실습"
date: "2026-08-07"
tag: "AI 활용"
tags: "TencentDB Agent Memory,토큰 절약,AI 에이전트 메모리,GitHub 트렌딩,중소기업 AI"
image: "/images/blog/tencentdb-agent-memory-token-saving.svg"
summary: "텐센트가 공개한 무료 AI 기억 창고 TencentDB Agent Memory. 이 오픈소스로 AI 토큰 비용을 61.38% 줄이고, 중소기업에서 직접 써보는 실습법을 소개합니다."
---

월 AI 구독비를 꼬박꼬박 내고 있는데, 이상합니다. 지난주에 분명히 제품 목록을 다 알려줬는데 오늘 AI는 또 처음 본 것처럼 물어봅니다. 그 사이 토큰은 계속 빠져나가고 있습니다.

2026년 8월, 텐센트가 이 문제를 무료 오픈소스로 해결했습니다. 폭발적인 속도로 GitHub 스타를 모으고 있는 **TencentDB Agent Memory**입니다.

![center](/mascot/md/emotion/cat_happy.png)

## AI가 기억을 못 하는 진짜 이유

일반적인 AI 서비스는 대화가 끝나면 내용을 전부 지웁니다. 다음 대화를 시작할 때는 회사 이름도, 지난달 작업 맥락도, 고객 응대 방식도 처음부터 다시 설명해야 합니다.

결과적으로 AI를 쓰면 쓸수록 맥락 설명에 더 많은 토큰을 씁니다. AI 직원을 고용했는데 매일 아침 입사 첫날처럼 회사 소개를 반복해야 하는 구조입니다.

이 구조적 문제를 해결하는 기술이 **AI 에이전트 메모리 허브**입니다. AI가 배운 내용을 별도 저장소에 쌓아두고, 다음에 같은 상황이 오면 바로 꺼내 쓰는 방식이죠.

그럼 텐센트의 이 도구, 4가지 기억 창고가 실제로 어떻게 구성돼 있을까요?

---

## 4계층 기억 창고 — 뭘 어디에 저장하나

![center](/mascot/md/emotion/cat_thinking.png)

TencentDB Agent Memory는 AI가 배운 내용을 목적에 따라 4가지 저장소에 나눠 보관합니다.

| 계층 | 이름 | 저장 내용 | 중소기업 활용 예시 |
|------|------|----------|----------------|
| 1계층 | Chat Memory | 대화 기록 | "A거래처와 나눈 납기 협의 이력" |
| 2계층 | Skill | 반복 업무 방법 | "우리 회사 이메일 답변 형식" |
| 3계층 | LLM-Wiki | 업무 지식 | "제품 카탈로그, 가격표, 회사 규정" |
| 4계층 | Code-Graph | 코드 구조 | "사내 시스템 연동 로직" |

이 4개 저장소에 쌓인 내용을 여러 AI 에이전트가 동시에 꺼내 씁니다. 영업 AI, 고객응대 AI, 재고관리 AI가 같은 기억 창고를 공유하는 구조입니다.

### 도입하면 얼마나 달라지나

![TencentDB Agent Memory 도입 효과 수치](/images/blog/tencentdb-agent-memory-token-saving-fig1.svg)
*▲ OpenClaw 통합 기준 성능 측정 결과 · 출처: GitHub TencentCloud/TencentDB-Agent-Memory*

![center](/mascot/md/emotion/cat_surprised.png)

OpenClaw 통합 테스트 기준으로 **토큰 사용량이 61.38% 감소**합니다. 작업 성공률은 **51.52% 향상**됩니다. 이미 학습한 맥락을 재사용하기 때문에 같은 결과를 더 적은 토큰으로 낼 수 있습니다.

이 수치에 개발자들이 주목했습니다. 2026년 8월 5일 기준 GitHub 스타가 12,900개를 넘었고 하루 1,100개 이상씩 늘었습니다. MIT 라이선스라 상업적으로도 무료로 쓸 수 있습니다.

### 솔직한 장단점 비교

**장점**: 완전 무료(MIT 라이선스), 팀 내 여러 AI가 같은 메모리 공유 가능, Docker 지원으로 팀 서버 배포 수월.

**단점**: 처음 지식 베이스를 구성하는 데 시간이 걸립니다. Docker나 Node.js 환경이 처음이라면 초기 설정에 30~60분 정도 필요합니다.

**클라우드 대안과 비교**: Azure AI Memory나 AWS Bedrock의 유사 기능은 사용량에 따라 월정액이 붙습니다. TencentDB Agent Memory는 서버만 있으면 추가 비용이 없습니다. 초기 설정 부담이 있지만 장기 운영 비용은 훨씬 낮습니다.

**필요 사양**: Node.js 22.16 이상, Docker 필수, RAM 4GB 이상 권장. GPU는 필요 없습니다.

그렇다면 실제 사무실에서는 어떻게 쓸 수 있을까요?

---

## 중소기업 실제 활용 시나리오

소규모 제조업 영업팀을 예로 들겠습니다.

![AI 토큰 사용량 도입 전후 비교](/images/blog/tencentdb-agent-memory-token-saving-fig2.svg)
*▲ 기억 허브 도입 전후 AI 토큰 사용량 변화 (개념도) · 출처: (주)비젼솔루션 구성*

**도입 전**: AI에게 "A거래처 납기 조건 알려줘"라고 할 때마다 담당자가 거래처 파일을 직접 복붙해 넣습니다. 대화 한 번에 맥락 설명만으로 토큰이 수백 개 나갑니다. 월이 지나면 적지 않은 요금이 됩니다.

**도입 후**: LLM-Wiki에 거래처 조건을 한 번 저장해 두면 AI가 자동으로 참조합니다. 질문 한 줄에 답이 바로 나옵니다. 영업 AI, 발주 AI, 재고 AI가 모두 같은 정보를 공유합니다.

직원이 퇴사해도 그 직원이 AI와 쌓은 업무 맥락은 Chat Memory와 Skill 계층에 그대로 남습니다. 인수인계 누락 걱정이 줄어드는 이유입니다.

**(주)비젼솔루션의 관점**: AI 도입 비용의 핵심은 모델 성능이 아닙니다. 회사 지식을 AI에게 얼마나 효율적으로 전달하느냐입니다. 메모리 허브는 그 전달 비용을 처음 한 번만 내는 구조로 바꿔줍니다. "AI를 쓸수록 비용이 줄어드는" 선순환은 기억 인프라를 제대로 갖출 때 비로소 시작됩니다.

---

## 10분 실습 — 오늘 바로 써보기

Node.js 22.16 이상과 Docker가 설치된 PC라면 지금 시작할 수 있습니다.

![center](/mascot/md/emotion/cat_cheer.png)

**1단계 — 저장소 클론**

```bash
git clone https://github.com/TencentCloud/TencentDB-Agent-Memory.git
```

**2단계 — 환경 파일 설정**

```bash
cd TencentDB-Agent-Memory/deploy/global-images
cp .env.example .env
```

`.env` 파일을 열어 `PROXY_UPSTREAM_URL`(LLM 엔드포인트)과 API 키를 입력합니다.

**3단계 — 전체 실행**

```bash
./start-all.sh
```

메모리 서버와 관리 패널이 함께 올라옵니다.

**4단계 — 관리 패널 접속**

브라우저에서 `http://localhost:8125`로 접속합니다. 팀을 만들고 에이전트를 추가한 뒤 메모리 자산(회사 FAQ, 제품 규격, 거래처 조건 등)을 적재하세요.

팀 서버에 올리면 전 직원의 AI 에이전트가 하나의 기억 창고를 씁니다. Python SDK(`MemoryClient` 클래스)를 통한 코드 연동 방법은 [공식 GitHub 저장소](https://github.com/TencentCloud/TencentDB-Agent-Memory)에서 확인하세요.

기존 사내 ERP나 재고 시스템과 직접 연결하거나, 업무 자동화 흐름에 맞게 구성하려면 전문적인 설정이 필요합니다. 기업 환경에 맞는 맞춤 구성이 필요하시다면 [(주)비젼솔루션](https://www.visionc.co.kr/ai-solution)에 문의해 주세요.


<!-- related-links -->

## 함께 보면 좋은 글

- [무료 AI 오피스 GenOffice — 10분 실습 가이드](/blog/genoffice-free-ai-office-suite-guide)
- [구글 지도 리뷰 AI 답변 — Gemini 5분 설정](/blog/gemini-google-review-ai-reply-5min)
- [ElevenLabs 대신 무료 AI 목소리 복제 5분 실습](/blog/chatterbox-free-voice-clone-sme-guide)
