---
title: "AI 챗봇 30분 완성 — RAGFlow 무료 실습"
date: "2026-06-19"
tag: "AI 활용"
tags: "AI 활용,문서 AI,고객 응대 자동화,오픈소스 AI,중소기업 AI"
image: "/images/blog/ragflow-document-chatbot-sme-guide.svg"
summary: "제품 카탈로그·AS 매뉴얼 PDF만 있으면 30분 안에 우리 회사 전용 AI 챗봇을 만들 수 있습니다. GitHub 별 70K+ 무료 오픈소스 RAGFlow로 CS 반복 질문을 자동화하는 방법, Docker 설치부터 실제 활용 시나리오까지 초보자 눈높이로 안내합니다."
---

오후 6시, 퇴근 준비 중입니다. 카카오톡 알림이 8개 쌓여 있습니다.

"배송은 언제 돼요?", "이 제품 A/S 기간이 얼마예요?", "환불은 어떻게 하나요?"

어제도 받은 질문입니다. 그제도, 지난주에도. 직원 한 명이 이런 반복 질문에 하루 1~2시간을 쓰고 있다면, 한 달이면 20~40시간이 사라지는 셈입니다.

챗봇을 써보고 싶어도 막히는 이유가 두 가지입니다. 첫째, "우리 상품을 제대로 아는 AI가 맞게 답할까?" 하는 불안. 둘째, "외주 개발비가 수백만 원 드는 거 아닐까?" 하는 걱정. RAGFlow는 그 두 가지를 동시에 해결합니다.

![center](/mascot/md/emotion/cat_happy.webp)

---

## 우리 회사 PDF가 곧 AI 직원이 된다

RAGFlow(래그플로우)는 **회사 문서를 AI에게 먹여서, 그 문서 기반으로만 답변하게 만드는 오픈소스 엔진**입니다.

신입 직원이 입사했을 때 제품 매뉴얼, AS 규정집, 자주 묻는 질문 자료집을 통째로 읽게 하는 것처럼 — RAGFlow는 AI에게 우리 회사 PDF를 그대로 읽혀서 고객 질문에 답변하게 합니다.

일반 ChatGPT와 결정적으로 다른 점이 여기 있습니다. ChatGPT는 세상 모든 정보를 학습했지만 **우리 회사 제품은 모릅니다.** RAGFlow는 반대입니다. 인터넷 세상은 모르지만 **우리 회사 문서만큼은 정확히 압니다.** 엉뚱한 답변 걱정 없이, 출처(어떤 문서 몇 페이지)까지 표시하며 답변합니다.

**RAG**란 "문서를 검색해서 AI가 답변 생성에 활용하는 기술(Retrieval-Augmented Generation)"입니다. RAGFlow는 이 기술을 누구나 쓸 수 있게 패키징한 완성형 도구로, 2026년 현재 GitHub에서 별 70,000개 이상을 받은 검증된 프로젝트입니다. Apache-2.0 라이선스로 상업적으로도 무료입니다.

![center](/mascot/md/emotion/cat_thinking.webp)

---

## 설치 전 확인 — 솔직한 사양·장단점·대안

RAGFlow는 무료지만 컴퓨터 사양이 어느 정도 필요합니다.

| 항목 | 최소 사양 |
|------|---------|
| CPU | 4코어 이상 |
| RAM | **16GB 이상** (핵심 조건) |
| 저장 공간 | 50GB 이상 여유 |
| 필수 소프트웨어 | Docker Desktop |

RAM 16GB가 핵심입니다. 8GB 노트북에서는 불안정합니다. 중급 이상 사무용 데스크탑이라면 대부분 충족합니다.

**대안과 솔직한 비교:**

![RAGFlow vs 주요 대안 비교](/images/blog/ragflow-document-chatbot-sme-guide-fig1.svg)

*▲ 주요 문서 AI 도구 비교 · (주)비젼솔루션 정리*

- **RAGFlow** — 무료, 내 서버 운영, 데이터 외부 유출 없음. 설치·운영에 기술적 이해 필요.
- **Dify** — 비슷한 오픈소스, 더 단순한 UI. 문서 처리 정밀도는 RAGFlow보다 낮을 수 있음.
- **클라우드 서비스(ChatPDF 등)** — 설치 불필요, 월 유료 구독, 데이터가 외부 서버에 저장됨.

기밀 계약서·고객 데이터를 다루는 회사라면 RAGFlow처럼 내부 서버에서 돌리는 방식이 보안상 유리합니다. IT 담당자가 없는 소규모 사업장이라면 클라우드 서비스가 빠를 수 있습니다.

---

## 우리 회사에 실제로 적용하는 시나리오

**소형 가전 쇼핑몰 A사 사례 시나리오**

에어컨·공기청정기·로봇청소기를 판매하는 A사. CS 문의의 70%가 "보증 기간이 얼마예요?", "필터 교체 주기가 어떻게 돼요?", "A/S 신청은 어떻게 하나요?"입니다. 제품별 PDF 매뉴얼 12개와 AS 규정서 1개가 있습니다.

RAGFlow에 이 PDF 13개를 업로드하면, 고객이 질문했을 때 "로봇청소기 보증 기간은 구매일로부터 1년입니다. (출처: 로봇청소기_RV301_매뉴얼.pdf 8페이지)" 식으로 답변합니다.

**내 데이터 연결 + 반복 업무 자동화 방법:**

1. 제품 출시할 때마다 새 PDF를 RAGFlow 지식베이스에 추가 → 챗봇이 자동으로 최신 정보 반영
2. RAGFlow API를 홈페이지 문의 폼에 연결하면 야간·주말에도 1차 응대 자동화
3. 답변하지 못한 질문은 로그로 쌓여 CS 담당자가 일괄 확인 가능

홈페이지나 카카오톡 채널과의 연동은 API 작업이 추가로 필요합니다. 처음엔 내부 직원용으로 RAGFlow 기본 화면에서만 먼저 써보고, 효과 확인 후 외부 연동을 진행하는 방식을 권합니다.

> **(주)비젼솔루션의 관점:** AI 도구 선택에서 "가격"보다 중요한 것은 데이터 주권이다. 고객 정보와 내부 문서가 외부 서버에 쌓이는 구조는 비용이 0원이라도 리스크가 있다. 작은 회사일수록 데이터를 직접 통제하는 구조가 장기적으로 안전하다. RAGFlow가 가진 진짜 가치는 '무료'가 아니라 '내 서버에서만 돌아간다'는 점이다.*

![center](/mascot/md/emotion/cat_surprised.webp)

---

## 30분 실습 — Docker 설치부터 첫 대화까지

**준비물:** Docker Desktop 설치된 PC, RAM 16GB 이상

**1단계 — Docker Desktop 설치**

[docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) 에서 무료 설치. Windows·macOS 모두 지원.

**2단계 — RAGFlow 다운로드 및 실행**

터미널(Mac) 또는 PowerShell(Windows)을 열고 아래 명령어를 순서대로 입력합니다:

```bash
git clone https://github.com/infiniflow/ragflow.git
cd ragflow/docker
docker compose -f docker-compose.yml up -d
```

처음 실행 시 이미지 다운로드로 5~10분 소요됩니다.

**3단계 — 브라우저 접속 및 회원가입**

설치 완료 후 브라우저에서 `http://localhost` 접속 → 회원가입 → 로그인.

**4단계 — PDF 업로드 및 첫 질문**

상단 메뉴 "Knowledge Base" → "Create" → 회사 PDF 업로드 → "Parse" 클릭. 분석 완료 후 채팅창에서 바로 질문할 수 있습니다.

```
테스트 질문: "이 제품 A/S 기간이 얼마인가요?"
```

답변과 함께 출처 문서·페이지가 표시됩니다.

클라우드에서 먼저 느낌을 보고 싶다면 **[ragflow.io](https://ragflow.io)** 에서 설치 없이 무료 체험 가능합니다.

![RAGFlow 작동 흐름](/images/blog/ragflow-document-chatbot-sme-guide-fig2.svg)

*▲ RAGFlow 작동 원리 3단계 · 출처: infiniflow/ragflow GitHub*

---

## 자주 묻는 질문

**Q. 한국어 PDF도 잘 인식하나요?**  
네. 한국어를 포함한 다국어 문서를 지원하며, 표·수식이 섞인 복잡한 PDF도 처리 가능합니다.

**Q. 인터넷 연결 없이도 작동하나요?**  
초기 설치(Docker 이미지 다운로드)에만 인터넷이 필요합니다. 이후엔 내부 네트워크만으로 동작합니다.

**Q. 챗봇을 홈페이지에 붙이려면 추가 비용이 드나요?**  
RAGFlow 자체는 무료입니다. 홈페이지 연동은 API 작업이 필요하며, 개발자 도움이 필요한 부분입니다.

---

30분 실습으로 어느 정도 자동화가 가능한지 직접 확인해보시길 권합니다. 홈페이지나 카카오 채널 연동까지 진행하고 싶다면 아래로 문의해 주세요.

> **(주)비젼솔루션 AI 솔루션 문의:**  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)


<!-- related-links -->

## 함께 보면 좋은 글

- [AI가 대신 클릭 — 반복 웹작업 무료 자동화 3단계](/blog/browser-use-web-automation-sme-guide)
- [외국어 영상 무료 AI 더빙 — 5분이면 끝](/blog/ai-video-dubbing-free-pyvideotrans)
- [고객 데이터 안 새는 AI — Odysseus 30분 구축](/blog/odysseus-ai-free-workspace-sme-guide)
