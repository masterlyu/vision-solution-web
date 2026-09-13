---
title: "직원이 퇴사해도 회사 노하우가 사라지지 않는 AI — 무료로 만들었습니다"
date: "2026-09-14"
tag: "AI 활용"
tags: "AI 활용,AI 솔루션,지식관리"
image: "/images/blog/ai-knowledge-management-claude-obsidian.svg"
summary: "직원 퇴사 후 함께 사라지는 회사 노하우, AI가 자동으로 문서를 읽고 연결·정리해줍니다. GitHub 별 1만 4천 개를 받은 무료 오픈소스 claude-obsidian으로 회사 지식관리 시스템을 구축하는 방법입니다."
---

오후 3시, 신입 영업 직원이 메신저를 보냈습니다.

"B거래처 납기 조건이 어떻게 됐더라? 지난번에 바뀐 것 같아서요."

팀장은 잠시 멈췄습니다. 그 거래처를 3년 담당했던 직원이 두 달 전에 퇴사했기 때문입니다. 이메일을 뒤지고, 엑셀 파일을 뒤지고, 결국 30분이 지나도 정확한 답이 안 나왔습니다.

회사에 문서는 있었습니다. 하지만 아무도 어디 있는지, 가장 최신 내용이 어떤 것인지 몰랐습니다.

> **AI 도입 무료 상담 신청** — 우리 회사 지식관리를 어떻게 시작할지 30분 안에 점검해드립니다.
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)

---

## 노하우가 사람에게 묶여 있을 때 생기는 일

중소기업에서 핵심 직원이 퇴사하면, 3~5년간 쌓은 거래처 관계와 업무 요령, 시행착오 경험이 함께 사라집니다.

인수인계서를 써도 한계가 있습니다. "납기는 D-3이 기준이다"는 써줄 수 있지만, "이 거래처 대표는 마감 전날 꼭 한번 더 확인 전화를 원한다"는 어디에도 안 써줍니다. 그건 말하지 않아도 아는 감각이었기 때문입니다.

새 직원이 같은 실수를 반복하고, 같은 질문을 여기저기 물어보는 데 몇 달이 걸립니다. 그 사이에 조용히 거래를 끊는 거래처가 생기기도 합니다.

해결책은 의외로 간단합니다. 노하우를 사람 대신 시스템에 남기면 됩니다.

---

## GitHub에서 별 1만 4천 개 받은 무료 AI 도구가 있습니다

올해 개발자 커뮤니티에서 빠르게 확산된 오픈소스 도구가 있습니다. 이름은 **claude-obsidian**입니다.

MIT 라이선스로 완전 무료이며, GitHub 별 1만 4천 개를 넘겼습니다. 링크: [github.com/AgriciDaniel/claude-obsidian](https://github.com/AgriciDaniel/claude-obsidian)

![center](/mascot/md/emotion/cat_happy.png)

이 도구가 하는 일은 명확합니다. **Obsidian**(무료 노트 앱)에 저장된 회사 문서들을 Claude AI가 자동으로 읽고, 연결고리를 만들어줍니다. 그리고 직원이 질문하면 전체 문서를 뒤져 바로 답합니다.

쉽게 말하면, 회사의 모든 문서를 기억하는 AI 동료가 생기는 겁니다. 수십 개 파일을 직접 찾지 않아도, 자연어로 물어보면 됩니다.

Obsidian은 메모와 문서를 관리하는 무료 앱입니다. AI와 데이터 관련 분야의 저명한 연구자 안드레이 카르파티(Andrej Karpathy)가 제안한 'LLM 위키' 개념, 즉 AI에게 자신의 지식을 학습시켜 언제든 꺼내 쓰는 방식을 이 도구가 구현했습니다.

![claude-obsidian 설치 3단계](/images/blog/ai-knowledge-management-claude-obsidian-fig1.svg)
*▲ claude-obsidian 작동 흐름 · 출처: github.com/AgriciDaniel/claude-obsidian*

---

## 실제로 어떻게 쓰나요? — 회사 적용 시나리오

**도입 전 상황**: 영업팀 직원이 퇴사했습니다. 거래처별 특이사항은 그 직원의 노트북에만 있었습니다. 새 직원은 매번 물어볼 사람을 찾아 헤맵니다. 같은 실수가 반복됩니다.

**도입 후 상황**: 회사 매뉴얼, 회의록, 거래처 히스토리를 Obsidian 폴더 하나에 넣어뒀습니다. 새 직원이 "B거래처 납기 조건이 어떻게 됩니까?"라고 물으면 AI가 관련 문서를 찾아 바로 답합니다.

![center](/mascot/md/emotion/cat_thinking.png)

![도입 전후 노하우 접근성 비교](/images/blog/ai-knowledge-management-claude-obsidian-fig2.svg)
*▲ 도입 전후 노하우 접근성 비교 (구성 예시)*

넣을 수 있는 문서 유형은 회사 업무 매뉴얼, 거래처 히스토리, 회의록, 계약서 요약, 제품 사양서 등 텍스트 기반 문서라면 대부분 가능합니다.

**솔직한 한계도 있습니다.** claude-obsidian은 Claude API를 사용하기 때문에 API 호출 비용이 발생합니다. 소규모 팀 기준 월 몇 만 원 수준이 될 수 있으며, 사용량에 따라 달라집니다. 도구 자체는 무료지만 AI 호출 요금은 별도입니다. 또한 초기 설정에 기본적인 기술 지식이 필요합니다.

클라우드 유료 서비스(월 정액) 대비 장점은 데이터를 내 PC에서 관리할 수 있고, 기능 제한이 없다는 점입니다. 단점은 초기 설정이 유료 서비스보다 복잡합니다.

> 💡 **이달 AI 도입 무료 상담 신청 받습니다** — 우리 회사 문서에 어떻게 연결할지 30분 안에 살펴봐드립니다.
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)

---

## 30분 안에 시작하는 방법 — 단계별 따라하기

**필요한 것**: Windows/Mac PC, Claude API 키 (Anthropic 가입 필요)

**1단계** — [obsidian.md](https://obsidian.md)에서 Obsidian을 무료로 설치합니다. 회사 문서를 보관할 폴더(볼트)를 하나 만듭니다.

**2단계** — 거래처 엑셀, 회의록 워드 파일, 업무 지침을 그 폴더에 복사합니다. 한글 문서는 내용을 텍스트 파일로 정리해 넣으면 됩니다.

**3단계** — GitHub에서 claude-obsidian을 내려받습니다.
```
git clone https://github.com/AgriciDaniel/claude-obsidian
```

**4단계** — [console.anthropic.com](https://console.anthropic.com)에서 Claude API 키를 발급받아 연결합니다.

**5단계** — AI 학습을 시작합니다. 폴더 안 모든 문서를 처음 읽는 데 문서 수에 따라 10~30분 소요됩니다. 이후부터는 자연어로 질문하면 바로 답변을 받을 수 있습니다.

![claude-obsidian 주요 현황](/images/blog/ai-knowledge-management-claude-obsidian-fig3.svg)
*▲ claude-obsidian 주요 수치 · 출처: github.com/AgriciDaniel/claude-obsidian, skillsllm.com*

---

### (주)비젼솔루션의 시각

지식은 사람에게 묶여 있을 때 가장 위험합니다. 담당자가 떠나는 순간 그 지식도 함께 사라지니까요. 특히 중소기업은 한 사람이 맡은 영역이 넓어, 그 한 명이 퇴사할 때의 충격이 대기업보다 훨씬 큽니다. claude-obsidian 같은 도구가 주목받는 이유는 단순히 편리해서가 아닙니다. 회사의 지식을 시스템에 남기는 것, 이게 규모에 상관없이 지속 가능한 조직의 기본이라고 저희는 봅니다. 도구는 이미 무료로 공개되어 있습니다. 시작하지 않을 이유가 없습니다.

---

## 자주 묻는 질문

**Q. IT 담당자 없이 설치할 수 있나요?**
기본 컴퓨터 활용에 익숙하다면 도전해볼 수 있습니다. 처음 설정이 어렵게 느껴진다면 저희에게 문의해주시면 지원을 도와드릴 수 있습니다.

**Q. 회사 기밀 문서를 AI에 넣어도 괜찮나요?**
claude-obsidian은 내 PC에서 실행됩니다. 단, 문서 내용이 Claude API로 전송되므로 Anthropic의 데이터 처리 정책을 미리 확인하는 것을 권장합니다. 민감한 문서는 핵심 내용만 요약해 넣는 방식이 안전합니다.

**Q. 한국어 문서도 잘 처리하나요?**
네, Claude는 한국어 이해도가 높습니다. 한글 회의록, 계약서, 이메일도 잘 처리합니다.

![center](/mascot/md/emotion/cat_cheer.png)

직원이 내일 퇴사해도 회사 노하우가 그대로 남아 있는 구조, 무료 도구로 지금 시작해볼 수 있습니다.

> **(주)비젼솔루션 AI 솔루션 문의**
> 📧 biztalktome@gmail.com
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)
