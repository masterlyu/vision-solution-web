---
title: "AI CRM 무료 공개 — 영업 자동화 5단계"
date: "2026-08-09"
tag: "AI 활용"
tags: "AI CRM,영업 자동화,오픈소스 CRM,무료 CRM,중소기업 AI,고객 관리 자동화"
image: "/images/blog/ai-crm-agentic-open-source-trycompai.svg"
summary: "2026년 8월, AI 에이전트가 스스로 고객 정보를 수집하고 영업 기록을 남기는 오픈소스 CRM이 공개됐습니다. GitHub별 2,000개를 받은 trycompai/crm — 무료로 설치해 중소기업 영업팀이 쓰는 방법을 5단계로 정리했습니다."
---

CRM은 있는데 아무도 쓰지 않는 회사, 주변에 꽤 많습니다. 비싼 구독료를 내면서도 결국 엑셀로 돌아가거나, 입력이 밀려 데이터에 구멍이 생깁니다.

이유는 하나입니다. 입력하는 게 일이라는 겁니다. 영업사원은 통화를 마치자마자 다음 고객에게 가야 합니다. CRM에 기록을 남길 여유가 없습니다. 기억이 흐릿해진 다음에야 시스템을 열고, 결국 빠진 정보투성이 레코드가 쌓입니다.

2026년 8월, 이 구조 자체를 바꾸는 오픈소스 CRM이 GitHub에 공개됐습니다. **Comp AI CRM**([trycompai/crm](https://github.com/trycompai/crm)) — AI 에이전트가 직접 이메일을 읽고, 고객 정보를 수집하고, 영업 기록을 남기는 시스템입니다. 공개 후 며칠 만에 GitHub 별(Star) 2,000개를 넘겼고, MIT 라이선스라 무료입니다.

> **AI로 영업팀 업무를 자동화하고 싶은데 어디서 시작해야 할지 모르겠다면?**  
> 30분 무료 상담으로 우리 회사에 맞는 방법을 찾아드립니다. → [AI 솔루션 상담](https://www.visionc.co.kr/ai-solution)

---

## AI CRM이 기존 CRM과 다른 이유

![center](/mascot/md/emotion/cat_happy.png)

CRM이란 Customer Relationship Management — 고객 관계를 관리하는 소프트웨어입니다. 누구를 언제 만났는지, 어떤 상담을 했는지, 다음 약속은 언제인지 기록하는 시스템이죠.

기존 CRM에서 AI는 보조 역할이었습니다. "이 고객에게 어떤 멘트가 좋을까요?"처럼 사람이 결정하면 AI가 옆에서 제안하는 방식이었습니다.

**Comp AI CRM은 순서가 반대입니다.** 에이전트가 일을 합니다. 사람이 입력하는 게 아니라, AI 에이전트가 이메일 받은 편지함을 읽고, 회의 메모에서 정보를 뽑아내고, CRM 레코드를 직접 업데이트합니다.

Comp AI CRM 공식 문서([docs/agent.md](https://github.com/trycompai/crm/blob/main/docs/agent.md))에서는 이렇게 설명합니다:

> "에이전트는 CRM의 기능이 아닙니다. CRM은 에이전트가 노트를 남기는 공간입니다."

도구가 사람을 돕는 구조가 아닙니다. **AI 에이전트가 실제로 일하고, 그 기록이 CRM에 축적되는 구조**입니다.

---

## 에이전트는 어떻게 동작하나요?

![center](/mascot/md/emotion/cat_thinking.png)

에이전트가 실제로 하는 일은 세 가지입니다.

**① 정보 수집 — 추측하지 않습니다:** 이메일, 회의 메모, 공개된 회사 정보에서 고객 데이터를 끌어옵니다. 중요한 원칙이 있습니다. **확실하지 않은 정보는 채우지 않습니다.** "그럴 것 같다"는 이유로 데이터를 추측해 넣는 걸 원천 차단한 구조입니다. AI가 신뢰도 점수를 매겨 채운 틀린 정보가 오히려 더 큰 문제를 만들기 때문입니다.

**② 자율 스케줄링 — 브라우저를 닫아도 계속됩니다:** 에이전트는 자체 작업 큐(Queue, 할 일 목록)를 갖고 있습니다. 다음에 어떤 고객을 살펴볼지 스스로 결정하고, 팔로업 시점을 잡습니다. 담당자가 자리를 비워도 에이전트는 계속 돌아갑니다.

**③ 예산 제어 — 비용이 무한정 늘지 않습니다:** 에이전트가 외부 AI API(GPT, Claude 등)를 써서 조사를 진행할 때 비용이 발생합니다. 지정한 예산 안에서만 작동하는 구조라, 월말에 청구서가 예상치 못하게 뛸 걱정이 없습니다.

![Comp AI CRM — 에이전트 동작 3단계](/images/blog/ai-crm-agentic-open-source-trycompai-fig1.svg)
*▲ 에이전트 핵심 동작 흐름 · 출처: trycompai/crm docs/agent.md*

보안도 빠뜨릴 수 없습니다. 행(Row) 단위 접근 제어로 에이전트가 볼 수 있는 데이터를 제한하고, 모든 에이전트 행동에 감사 로그(Audit Trail)가 남습니다. 외부 AI API에 데이터를 보내기 전에 이름·연락처 같은 개인정보를 마스킹하는 프라이버시 모드도 지원합니다.

### 설치 요건 — 솔직하게 공개합니다

| 항목 | 내용 |
|------|------|
| 필수 소프트웨어 | Bun(패키지 관리자), Docker |
| 데이터베이스 | PostgreSQL (Docker로 자동 실행) |
| 서버 사양 | 테스트: 일반 노트북 가능 / 운영: 2코어 4GB RAM 이상 권장 |
| 기술 수준 | 터미널 기본 명령어를 다룰 수 있는 담당자 필요 |
| 비용 | 소프트웨어 무료(MIT) / 서버비·외부 AI API 사용 요금 별도 |

**솔직한 장단점 비교:**

장점은 세 가지입니다. 완전 오픈소스(MIT 라이선스)라 무료로 수정·배포가 가능하고, 회사 서버에 설치하면 고객 데이터가 외부로 나가지 않습니다. GitHub 커뮤니티도 빠르게 성장하고 있습니다.

단점도 솔직하게 말씀드립니다. 현재 영문 전용 UI이고, 한국어 지원이 없습니다. 2026년 8월 막 공개된 초기 단계라 완성도가 클라우드 유료 CRM에 비해 낮습니다. IT 담당자 없이는 초기 설정이 어렵습니다.

**다른 선택지와 비교하면:** Salesforce, HubSpot 같은 클라우드 CRM은 바로 쓸 수 있지만 월 구독료가 만만치 않습니다. Comp AI CRM은 비용 대신 설치·관리 노력이 필요합니다. 데이터를 외부 서버에 올리고 싶지 않거나, IT 담당자가 있는 회사라면 현실적인 선택지입니다.

---

## 중소기업 영업팀이 쓴다면 — 실제 시나리오

![center](/mascot/md/emotion/cat_surprised.png)

직원 15명 규모의 포장재 납품 회사를 예로 들어봅니다.

**지금 방식:** 영업사원 3명이 각자 엑셀로 거래처를 관리합니다. 담당자가 바뀔 때마다 인수인계가 엉킵니다. "그 대리님이 그 거래처에 뭐라고 했더라?"를 다시 물어보는 데 하루 30분이 날아갑니다.

**Comp AI CRM 도입 후:** 영업사원이 고객과 미팅을 마치면 에이전트가 이메일·회의 메모에서 핵심 내용을 뽑아 CRM에 기록합니다. 팔로업 기한이 오면 에이전트가 알림을 줍니다. 담당자가 바뀌어도 히스토리가 그대로 남아 있습니다.

**내 데이터 연결 방법:**

Gmail을 연동하면 에이전트가 이메일을 자동으로 수집합니다. Google Calendar를 연결하면 미팅 기록이 자동으로 업데이트됩니다. 모든 데이터는 회사 서버의 PostgreSQL에 보관됩니다. 외부 유출 걱정이 없습니다.

깊은 맞춤 적용이 필요하다면 — 기존 ERP나 재고 시스템과 연동하거나, 에이전트 동작 방식을 수정하는 작업은 개발 지원이 필요합니다. 그 수준의 커스텀은 전문가와 상의하는 게 현실적입니다.

![CRM 도입 효과 — 검증 수치](/images/blog/ai-crm-agentic-open-source-trycompai-fig2.svg)
*▲ CRM 도입 효과 수치 · 출처: SellersCommerce CRM Statistics 2026, SLT Creative CRM Statistics 2026, The AI Sales Advantage 2026(Salesfully)*

### (주)비젼솔루션이 보는 관점

CRM 도입이 실패하는 패턴은 거의 같습니다. 결국 아무도 입력하지 않는다는 겁니다. 바쁜 현장에서 CRM 입력은 언제나 부수적인 일이었고, 미루다 보면 데이터에 구멍이 생기고, 시스템은 쓰지 않는 비용 덩어리가 됩니다.

Comp AI CRM이 제안하는 방향은 단순합니다. "사람이 도구를 채운다"에서 "에이전트가 스스로 채운다"로. 이 방향이 맞다고 생각합니다. 다만 아직 초기 단계입니다. 한국어 지원도 없고, 완성도도 더 쌓아야 합니다. 지금은 전사 도입보다, IT 담당자가 있는 팀이 먼저 설치해보고 "이 방향이 맞는지" 확인하는 게 현실적인 출발점입니다.

---

## 지금 설치하는 방법 — 5단계 실습

준비물: Docker가 설치된 PC, 터미널(명령 프롬프트)

**1단계 — 코드 내려받기**
```bash
git clone https://github.com/trycompai/crm.git
cd crm
```

**2단계 — 패키지 설치**
```bash
# Bun이 없으면 먼저 설치: https://bun.sh
bun install
```

**3단계 — 데이터베이스 실행**
```bash
# Docker로 PostgreSQL 자동 실행 (포트 5432)
docker compose up -d
```

**4단계 — 환경 설정**
```bash
cp .env.example .env
# .env 파일 열어 아래 4가지 값 입력:
# DATABASE_URL, BETTER_AUTH_SECRET, API_URL, APP_URL
bun run db:deploy
bun run db:seed   # 샘플 데이터로 먼저 확인하고 싶다면
```

**5단계 — 실행**
```bash
bun run dev
# 앱: http://localhost:3000
# API: http://localhost:3001
```

브라우저에서 `http://localhost:3000`을 열면 됩니다. `bun run db:seed`를 실행했다면 샘플 영업 파이프라인이 바로 보입니다. 실제 운영 환경에서는 `API_URL`과 `APP_URL`을 실제 서버 주소로 바꾸고, Gmail·Calendar 연동을 위해 Google OAuth 설정이 추가로 필요합니다.

공식 GitHub: [https://github.com/trycompai/crm](https://github.com/trycompai/crm)  
공식 웹사이트: [https://trycrm.ai](https://trycrm.ai)

CRM 입력을 미루는 게 팀원의 문제가 아닐 수 있습니다. 바쁜 영업 현장에서 시스템 입력은 언제나 우선순위 밖이었습니다. Comp AI CRM은 그 순서를 바꿉니다. 영업사원이 아니라 에이전트가 데이터를 채우는 시스템입니다.

아직 초기 단계이고 영문 전용이지만, "AI가 직접 채워준다"는 경험 자체를 먼저 해보는 것 — 그게 이 도구의 출발점입니다.

![center](/mascot/md/emotion/cat_cheer.png)

> **Vision Solution AI 솔루션 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)
