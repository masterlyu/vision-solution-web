---
title: "장바구니 30% 늘리는 AI — Anthropic 무료 공개"
date: "2026-09-10"
tag: "AI 활용"
tags: "AI 에이전트,온라인 쇼핑,Anthropic,오픈소스 AI,매출 자동화"
image: "/images/blog/claude-commerce-agents-shopping-sme-guide.svg"
summary: "Anthropic이 9월 2일 무료 공개한 Claude Commerce Agents — 실제 도입사에서 장바구니 크기 30% 증가, 구매완료율 60% 상승이 확인됐습니다. Apache 2.0 오픈소스라 GitHub에서 지금 바로 내려받아 소형 쇼핑몰에도 적용 가능합니다."
---

오후 2시, 방문객이 상품 페이지를 열었다가 5분 만에 닫습니다. 장바구니는 비어 있습니다. 이런 일이 하루에 수십 번 반복되는 쇼핑몰이라면, 9월 2일 Anthropic이 공개한 AI가 정확히 이 문제를 겨냥합니다.

이름은 **Claude Commerce Agents**. 소비자용 **쇼핑 에이전트**와 판매자용 **머천트 에이전트** 세트로 구성됩니다. Apache 2.0 라이선스로 무료 공개됐고, 소매·여행·통신·엔터테인먼트 4개 업종 데모 코드까지 GitHub에 함께 올라왔습니다.

![center](/mascot/md/emotion/cat_happy.png)

## 두 에이전트가 하는 일 — 고객 vs 판매자

**쇼핑 에이전트(고객용)**: 고객이 "30대 여성 선물, 5만 원짜리 가방 찾아줘"라고 말하면 상품을 검색·비교해서 장바구니에 담아줍니다. 필터를 하나하나 건드리거나 상품 페이지를 넘기지 않아도 됩니다. 말 한마디로 구매 직전 단계까지 진행됩니다.

**머천트 에이전트(판매자용)**: 재고 현황을 확인하고, 가격 조정 제안을 내놓거나, 마케팅 문구 초안을 자동으로 만듭니다. 사장님이 직접 수치를 뒤지거나 홍보 문구를 처음부터 쓰지 않아도 됩니다.

![두 에이전트 역할 비교](/images/blog/claude-commerce-agents-shopping-sme-guide-fig1.svg)
*▲ 쇼핑 에이전트 vs 머천트 에이전트 역할 · 출처: Anthropic Commerce Agents GitHub*

![center](/mascot/md/emotion/cat_thinking.png)

## 30%와 60% — 숫자의 실체와 현실 요구사항

Anthropic이 공개한 도입사 실측 수치는 이렇습니다. 장바구니 크기 30~35% 증가, 구매 완료율 60% 상승.

단, 이 수치는 Anthropic이 직접 지원한 파트너사 결과라는 점을 알아두셔야 합니다. 내 쇼핑몰에 그대로 적용된다는 보장은 없습니다. 상품 데이터 품질, 고객 유입 경로, 쇼핑몰 업종에 따라 결과가 달라집니다.

![도입 성과 수치](/images/blog/claude-commerce-agents-shopping-sme-guide-fig2.svg)
*▲ Anthropic 파트너사 실측 결과 · 출처: Anthropic 공식 블로그(2026.09.02)*

Apache 2.0이라 무료지만, 실행에는 **Claude API 키**가 필요합니다. Anthropic이 신규 계정에 무료 크레딧을 제공하기 때문에 소규모 테스트는 비용 없이 시작할 수 있습니다. 트래픽이 늘면 API 사용료가 붙고, 대량 운영에는 비용 계산이 별도로 필요합니다.

기술 수준도 현실적으로 봐야 합니다. GitHub에서 코드를 내려받아 데모를 실행하는 것은 혼자 가능합니다. 내 쇼핑몰 상품 DB나 재고 시스템에 연결하는 단계는 개발자 도움이 필요합니다.

| 항목 | Claude Commerce Agents | 유료 쇼핑 AI SaaS |
|------|------------------------|------------------|
| 비용 | API 사용료만 (테스트 무료) | 월 구독료 |
| 커스텀 | 코드 수정 자유 | 제한적 |
| 설치 난이도 | 개발자 필요 | 어드민 설정만 |
| 기술 지원 | GitHub 커뮤니티 | 전담 CS |

![center](/mascot/md/emotion/cat_surprised.png)

## 내 쇼핑몰에 직접 연결하는 방법

소형 쇼핑몰이라면 세 단계로 접근할 수 있습니다.

**1단계** — 상품 목록을 CSV나 JSON으로 내보냅니다. 카페24·아임웹·메이크샵 등 대부분의 솔루션에서 지원합니다.

**2단계** — Commerce Agents 코드에서 상품 검색 기능을 이 파일에 연결합니다. 소매업종 데모 코드를 기준으로 수정하면 됩니다.

**3단계** — 웹 채팅창이나 카카오톡 채널에 에이전트를 붙입니다.

지금 바로 데모를 실행해볼 수 있습니다.

```bash
git clone https://github.com/anthropics/commerce-agents
cd commerce-agents
pip install -r requirements.txt
# .env 파일에 ANTHROPIC_API_KEY 입력 후
python demo/retail/run_demo.py
```

기술 지식이 없다면 GitHub에 올라온 데모 영상으로 먼저 작동 방식을 확인한 뒤 판단하셔도 됩니다. "이게 우리 쇼핑몰에 맞겠다"는 확신이 생길 때 본격적으로 진행하는 편이 현실적입니다.

---

> **(주)비젼솔루션 관점** — 이번 공개는 쇼핑 AI의 진입 장벽이 사라졌음을 보여줍니다. 지금까지 대형 플랫폼만 가질 수 있던 대화형 쇼핑 기능이, 소형 쇼핑몰에도 같은 기술 위에서 출발할 수 있게 됐습니다. 단, 도구가 공개됐다고 결과가 자동으로 따라오진 않습니다. 어떤 상품 데이터를 어떤 고객 흐름에 연결하느냐가 진짜 경쟁력입니다. 기술보다 비즈니스 로직이 먼저입니다.

![center](/mascot/md/emotion/cat_cheer.png)

> **Vision Solution AI 솔루션 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)
