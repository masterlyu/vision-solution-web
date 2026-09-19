---
title: "비밀번호 안 줘도 AI가 쇼핑몰 대신 클릭 — BrowserSkill 5분 실습"
date: "2026-09-19"
tag: "오픈소스 AI"
tags: "오픈소스 AI,보안 점검,개발 팁"
image: "/images/blog/browser-skill-ai-automation-no-password-guide.svg"
summary: "쇼핑몰 주문 확인, 배송 현황 입력, SNS 댓글 달기 — 반복 클릭을 AI에게 맡기고 싶지만 비밀번호를 주기 꺼림칙하셨나요? MIT 오픈소스 BrowserSkill은 이미 로그인된 내 브라우저를 AI가 빌려 씁니다. 비밀번호 전달 없이 5분 설치로 반복 업무를 자동화합니다."
---

매일 오전 9시, 담당자가 거래처 쇼핑몰 관리자 페이지를 하나씩 엽니다. 어젯밤 주문 내역을 확인하고, 배송 완료 건은 상태를 바꾸고, 교환·반품 요청은 엑셀에 옮겨 적습니다. 점심 전에 한 번 더, 퇴근 전에 또 한 번. 이 과정이 하루 40분씩입니다.

"이거 AI한테 시키면 안 될까?" 생각해보지 않은 분이 없을 겁니다. 그런데 대부분 여기서 멈추고 맙니다. **AI에게 웹 자동화를 맡기려면 아이디·비밀번호를 줘야 하는 줄** 알고 계시기 때문입니다. 거래처 어드민 계정이 유출되거나 잘못 쓰이면 어떡하나 싶어 선뜻 못 하셨던 거죠.

그런데 그 전제 자체가 틀렸습니다.

> 이번 주 AI 업계 최신 동향 → 우리 회사 맞춤 AI 도입 무료 상담: [지금 문의하기](/contact)

![center](/mascot/md/emotion/cat_worried.png)

---

## 비밀번호 없이 AI 자동화가 가능한 이유

2026년 9월 첫 주, GitHub 트렌딩 최상위에 텐센트(Tencent)가 공개한 오픈소스 도구가 올랐습니다. 이름은 **BrowserSkill**입니다. 공개 이틀 만에 별 4,000개를 넘겼습니다.

이 도구의 핵심 아이디어는 딱 하나입니다.

**AI가 직접 로그인하는 게 아니라, 내가 이미 로그인해 둔 브라우저를 빌려 쓴다.**

비유하면 이렇습니다. AI에게 '열쇠(비밀번호)'를 주는 게 아니라, 이미 내가 열어둔 방 안에 들어가 일을 처리하게 하는 겁니다. 쇼핑몰 관리자 페이지, 거래처 B2B 포털, 사내 ERP — 내가 로그인해 둔 창을 AI가 대신 클릭합니다.

중간에 2단계 인증이나 캡차가 뜨면 사람이 잠깐 개입해 처리하고, 그다음은 AI가 이어서 진행합니다. MIT 라이선스로 공개되어 상업 목적으로도 무료로 쓸 수 있습니다.

공식 GitHub: [github.com/Tencent/BrowserSkill](https://github.com/Tencent/BrowserSkill)

![기존 AI 자동화 방식 vs BrowserSkill 비교](/images/blog/browser-skill-ai-automation-no-password-guide-fig1.svg)
*▲ 기존 방식과 BrowserSkill 보안 구조 비교 · 출처: github.com/Tencent/BrowserSkill*

---

## 설치는 5단계면 충분합니다

설치에는 CLI(명령줄 도구)와 브라우저 확장, 두 가지가 필요합니다. Windows·macOS·Linux 모두 지원합니다.

![BrowserSkill 설치 3단계 핵심 흐름](/images/blog/browser-skill-ai-automation-no-password-guide-fig2.svg)
*▲ CLI → 확장 → AI 연결 3단계 흐름 · 출처: github.com/Tencent/BrowserSkill README*

**1단계 — GitHub 접속**
[github.com/Tencent/BrowserSkill](https://github.com/Tencent/BrowserSkill)에서 README > Quick Start 항목을 확인합니다.

**2단계 — Node.js 설치**
이미 설치되어 있으면 건너뜁니다. nodejs.org에서 LTS 버전을 내려받아 설치합니다.

**3단계 — BrowserSkill CLI 설치**
터미널(Windows는 명령 프롬프트)에서 README에 안내된 npm 설치 명령을 복붙해 실행합니다.

**4단계 — 브라우저 확장 설치**
Chrome 또는 Edge에 BrowserSkill 확장 프로그램을 설치합니다. GitHub README에 링크가 안내되어 있습니다.

**5단계 — 연결 확인 후 첫 명령**
터미널에서 연결 확인 명령을 실행하면 CLI와 브라우저가 연결됩니다. 이제 준비 완료입니다.

> 설치가 막히거나 회사 환경에 맞게 세팅하고 싶다면 → **(주)비젼솔루션 AI 도입 지원**: [ai-solution 페이지 보기](/ai-solution)

---

## 쇼핑몰 주문 현황 자동화 — 실제로 써보면

경기도에서 생활용품 도매업을 하는 가상의 C사(직원 8명)를 예로 들겠습니다. 이 회사 담당자는 매일 아침 3개 쇼핑몰의 주문 현황을 확인하고, 배송 완료 건을 엑셀에 옮겨 적습니다.

BrowserSkill을 적용하면 AI에게 이렇게 지시할 수 있습니다.

```
1. [쇼핑몰A] 관리자 > 주문 관리에 들어가줘
2. 어제 날짜 주문 목록을 확인해
3. 배송 완료 상태인 주문만 골라서 주문번호, 상품명, 수량을 정리해줘
4. 오늘 날짜 이름으로 엑셀 파일에 저장해줘
```

AI가 이미 로그인된 쇼핑몰 창에서 직접 클릭하며 데이터를 수집하고, 파일을 만들어 줍니다. 비슷한 방식으로 SNS 댓글 확인, 거래처 발주 현황 취합, 경쟁사 가격 모니터링에도 응용할 수 있습니다.

![center](/mascot/md/process/cat_develop.png)

---

## 도입 전 이것도 확인하세요

모든 도구가 그렇듯 BrowserSkill도 한계가 있습니다. 솔직하게 짚고 넘어갑니다.

- **브라우저 창이 열려 있어야 합니다.** 자동화 실행 중 창을 닫으면 중단됩니다. 야간 무인 자동화보다는 업무 시간 중 반자동화에 적합합니다.
- **캡차·OTP는 사람이 처리합니다.** 2단계 인증이 걸린 사이트는 개입이 필요합니다.
- **구형 ActiveX 사이트는 제한될 수 있습니다.** 표준 웹 기술 기반 사이트에서 안정적으로 동작합니다.
- **LLM API 비용이 별도로 발생합니다.** OpenAI나 Anthropic의 API 키를 연결해 씁니다. 소규모 자동화라면 월 몇천 원 수준입니다.

클라우드 서비스 대신 오픈소스를 택하는 이유는 데이터가 내 환경에 남기 때문입니다. 사이트 구조가 크게 바뀌면 자동화 스크립트를 수정해야 할 수 있다는 점도 미리 알아두세요.

---

**비젼솔루션이 보는 이 흐름**

AI 웹 자동화에서 '비밀번호를 줘야 한다'는 건 오래된 전제였습니다. BrowserSkill이 보여주는 방향은 분명합니다 — 자격 증명을 공유하지 않고도 AI와 협업할 수 있습니다. 작은 회사일수록 계정 하나가 뚫리면 피해가 큽니다. 도구의 성능보다 보안 구조를 먼저 따지는 습관이 이 시대 중소기업에 필요한 태도라고 생각합니다.

— (주)비젼솔루션

![center](/mascot/md/emotion/cat_cheer.png)

---

## 자주 묻는 질문

**Q. BrowserSkill 자체는 무료인가요?**  
A. 네, MIT 라이선스 오픈소스라 도구 자체는 무료입니다. 단, AI 명령 처리를 위해 OpenAI나 Anthropic 등의 API 키가 필요하고, 사용량에 따라 API 비용이 발생합니다. 소규모 자동화라면 월 몇천 원 수준입니다.

**Q. 국내 주요 쇼핑몰에도 쓸 수 있나요?**  
A. 표준 웹 브라우저로 접근 가능한 사이트라면 대부분 작동합니다. 다만 ActiveX가 필수인 구형 사이트는 제한될 수 있어 사전 테스트가 필요합니다.

**Q. 설치가 어렵지 않나요?**  
A. Node.js 설치와 npm 명령 실행 정도가 필요합니다. IT 담당자가 있는 회사라면 30분 안에 기본 세팅이 가능합니다. 처음 도입이라 막히는 부분이 있으면 저희에게 문의해 주세요.

---

반복 클릭 업무, 이제 AI에게 넘겨보세요. BrowserSkill로 시작하면 비밀번호 걱정 없이 첫걸음을 뗄 수 있습니다.

> **AI 업무 자동화 도입이 고민이라면**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)


<!-- related-links -->

## 함께 보면 좋은 글

- [AI가 대신 클릭 — GPT-6 컴퓨터 조종](/blog/gpt6-astra-computer-use-sme-guide)
- [직원이 퇴사해도 회사 노하우가 사라지지 않는 AI — 무료로 만들었습니다](/blog/ai-knowledge-management-claude-obsidian)
- [무료 AI 세계 1위 — DeepSeek V4.1 Flash 5분 실습](/blog/deepseek-v4-flash-free-open-source-sme-guide)
