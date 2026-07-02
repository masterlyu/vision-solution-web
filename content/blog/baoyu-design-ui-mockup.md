---
title: "AI로 UI 시안 3분 완성 — baoyu-design"
date: "2026-06-09"
tag: "AI 활용"
tags: "AI 활용,UI 디자인,무료 도구"
image: "/images/blog/baoyu-design-ui-mockup.svg"
summary: "Anthropic Claude Design의 UI 시안 생성 기능을 로컬에서 무료로 쓰는 오픈소스 도구 baoyu-design. 디자이너 없이도 목업·프로토타입·데크를 HTML로 만드는 법을 초보자도 따라할 수 있게 단계별로 안내합니다."
---

![center](/mascot/md/emotion/cat_surprised.webp)

## "이게 된다고?" — GitHub에서 개발자들이 난리 난 이유

기획서를 보여줬더니 AI가 실제로 클릭되는 UI를 만들어 냈습니다.

버튼도 있고, 메뉴도 있고, 색상도 맞아 떨어지는 진짜 화면이었어요.

디자이너한테 맡기면 2~3일 걸릴 작업을요.

2026년 4월 17일, Anthropic이 [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs)을 공식 출시했습니다. 프롬프트 하나로 UI 시안, 프로토타입, 발표 자료를 만드는 AI 도구예요. 문제는 유료 구독자(Pro·Max·Team·Enterprise)에게만 열려 있다는 거였어요.

그런데 같은 날, 오픈소스 버전이 GitHub에 올라왔습니다.

이름은 **baoyu-design** — 현재 515 stars, 개발자들이 "Claude API 키만 있으면 된다"며 공유가 폭발했어요.

---

## Claude Design, 쉽게 말하면 이겁니다

"UI 시안"이라는 단어가 낯설 수 있어요.

쉽게 말하면 이렇습니다. 앱이나 홈페이지를 만들기 전에 "이렇게 생기겠다"를 미리 보여주는 화면이에요. 예전엔 디자이너가 포토샵이나 피그마(Figma)로 며칠씩 걸려 만들었죠.

Claude Design은 이걸 AI가 대신합니다. "쇼핑몰 앱 홈 화면 만들어줘"라고 말하면, 실제로 클릭해볼 수 있는 HTML 파일을 즉시 만들어줘요.

baoyu-design은 이 기능을 여러분 컴퓨터에서 바로 실행할 수 있게 만든 오픈소스 도구입니다.

![AI 디자인 도구 흐름 — Claude Design 공개부터 baoyu-design 출시까지](/images/blog/baoyu-design-ui-mockup-fig1.svg)
*▲ 2026년 4월 같은 날 공개된 공식 버전과 오픈소스 버전 · 출처: anthropic.com/news, github.com/JimLiu/baoyu-design*

---

![center](/mascot/md/process/cat_design.webp)

## baoyu-design이 실제로 할 수 있는 것들

내장 도구 24가지 중 핵심만 추리면:

| 기능 | 설명 |
|---|---|
| 고화질 목업 | 완성도 높은 UI 시안 |
| 인터랙티브 프로토타입 | 클릭·스크롤 되는 가상 앱 화면 |
| 와이어프레임 | 뼈대만 빠르게 잡는 레이아웃 스케치 |
| 랜딩 페이지 | 제품 홍보용 단일 페이지 |
| 모바일 앱 화면 | iOS / Android 스타일 |
| 발표 자료(데크) | 슬라이드 형식 PT |

모든 결과물은 **HTML 파일 하나**로 저장됩니다. 별도 프로그램 없이 브라우저에서 바로 열어요.

### 현실 요구사항 — 솔직하게

| 항목 | 내용 |
|---|---|
| 필수 | Claude API 키 (claude.ai 계정과 별개, 별도 발급) |
| 권장 모델 | Claude Opus 4.8 (최고 품질) |
| 에디터 | Claude Code, Cursor, Codex Agent 중 하나 |
| 설치 환경 | Node.js + Python 3 (무료) |
| GPU | 불필요 (클라우드 API 사용) |

**솔직한 단점:**
- API 사용 비용은 내 부담. 복잡한 시안 1개에 $0.1~0.5 정도.
- Claude Opus 4.8은 속도가 느릴 수 있음. 복잡한 요청 기준 1~3분.
- 한국어 UI 텍스트는 잘 나오지만 한국어 전용 폰트는 직접 추가해야 함.

### 대안 비교 — 어떤 상황에 뭘 쓸까

| 도구 | 강점 | 약점 | 비용 |
|---|---|---|---|
| **baoyu-design** | 로컬 실행, API만 있으면 됨, HTML 그대로 활용 | API 비용 발생, 에디터 필요 | API 사용료만 |
| **Claude Design 공식** | 가장 정교함, Figma 연동 | Pro 구독 필요 | 월정액 |
| **v0.dev** | React 컴포넌트 바로 생성 | 프론트 개발 지식 필요 | 무료~유료 |
| **bolt.new** | 풀스택 앱까지 한번에 | 시안보다 개발 도구에 가까움 | 무료~유료 |

개발 지식 없는 기획자·창업자에게는 baoyu-design이 가장 낮은 진입 장벽이에요.

---

![center](/mascot/md/emotion/cat_thinking.webp)

## 중소기업이 이걸 어디에 쓸 수 있을까

**상황 1 — 제품 기획 단계**

새 앱이나 서비스를 개발하기 전, 개발자에게 넘기기 전에 시안이 필요해요. 보통 외부 디자이너에게 맡기거나(50~200만 원), 아니면 말로만 설명하다가 서로 상상이 달라 3개월을 버립니다.

baoyu-design으로 하루 안에 클릭 가능한 프로토타입을 만들어서 보여주면 됩니다. "이렇게 생긴 거 맞죠?"를 확인하는 데 돈 쓸 필요가 없어요.

**상황 2 — 고객 제안서·PT**

"우리 서비스 이렇게 만들겠습니다"를 PowerPoint 텍스트가 아니라 실제로 작동하는 화면으로 보여주는 거예요. 투자자나 파트너에게 설득력이 완전히 달라집니다.

**상황 3 — 사내 업무 도구 개선**

회의 때마다 "이 양식 좀 바꿔요"라고 말만 하다 끝나잖아요. AI로 미리 화면을 만들어서 "이런 식으로 바꾸면 어떨까요?" 하고 보여주면 논의가 구체화돼요.

> **내 브랜드 색상·로고 연결하는 법**: `designs/` 폴더에 저장된 HTML 파일에 회사 정보를 텍스트로 적어줄 수 있어요. "우리 회사 색상은 #0f766e, 로고는 왼쪽 상단, 폰트는 Pretendard" 식으로 프롬프트에 포함하면 됩니다. 기존 화면 캡처를 보여주고 "이 스타일로 만들어줘"도 가능해요.

> 복잡한 디자인 시스템 연동이나 실제 개발 코드로의 전환이 필요한 경우는 전문 파트너와 함께하는 게 낫습니다.

---

### (주)비젼솔루션 시각: 도구는 누가 통제하느냐가 중요합니다

claude.ai/design은 Anthropic 서버에서 실행됩니다. 기획 아이디어, 고객 요구사항, 제품 구조가 외부 플랫폼에 올라가요. 구독을 끊으면 접근도 끊깁니다.

baoyu-design은 다릅니다. API를 거치지만, 결과물(HTML 파일)은 내 컴퓨터에 남아요. 플랫폼에 종속되지 않는다는 건 — 특히 시안이나 아이디어처럼 핵심 자산이 걸린 상황에서는 — 단순한 편의 이상의 가치입니다. 도구 선택도 전략이에요.

---

![center](/mascot/md/process/cat_develop.webp)

## 직접 해보기 — 설치부터 첫 시안까지 3단계

**준비물**: Claude Code(또는 Cursor) + Claude API 키

![baoyu-design 설치 및 첫 시안 생성 3단계](/images/blog/baoyu-design-ui-mockup-fig2.svg)
*▲ 터미널 명령어 하나로 설치 완료 · 출처: github.com/JimLiu/baoyu-design*

**① 설치 (30초)**

터미널(명령창)에 입력하세요:

```bash
npx skills add JimLiu/baoyu-design
```

잠깐 기다리면 설치 완료입니다.

**② 요청하기**

Claude Code를 열고 이렇게 입력하세요:

```
UI 목업 만들어줘.
쇼핑몰 앱 홈 화면이야.
상단에 검색창, 중간에 카테고리 카드 6개, 하단에 추천 상품 리스트.
색상은 청록색 계열.
```

**③ 결과 확인 및 수정**

`designs/` 폴더에 HTML 파일이 생성됩니다. 브라우저에서 바로 열려요.

마음에 안 드는 부분은 채팅으로 말하면 됩니다:

```
검색창을 더 크게 해줘. 배경을 흰색으로 바꿔줘.
카테고리 카드에 아이콘 추가해줘.
```

**흔한 실수**: "멋진 UI 만들어줘"처럼 모호하게 말하면 결과도 모호해요. 섹션 구성, 색상, 포함할 요소를 구체적으로 말할수록 원하는 결과가 나옵니다.

---

![center](/mascot/md/emotion/cat_cheer.webp)

## 결론 — 말로 하던 기획이 화면으로 바뀌는 순간

Claude Design이 유료 구독자 전용으로 나왔을 때 많은 분들이 "또 돈 내야 하는 거야?"라고 했어요.

baoyu-design은 그 대답입니다. API 비용만 내면 같은 기능을 씁니다.

프로토타입 한 번 만들어보세요. 말로만 하던 기획이 실제 화면으로 보이는 순간, 대화가 달라지는 경험을 할 수 있어요.

이 글이 도움이 되셨나요? AI 궁금해하는 분 계시면 공유해 주세요. 댓글로 질문하시면 성심껏 답변드릴게요!

> **Vision Solution AI 솔루션 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)
