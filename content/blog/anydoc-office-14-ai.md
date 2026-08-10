---
title: "오피스 문서 14종 AI에 5분 만에 먹이는 법"
date: "2026-08-10"
tag: "AI 활용"
tags: "AI 활용,문서 변환,오피스 자동화,anydoc"
image: "/images/blog/anydoc-office-14-ai.svg"
summary: "Word·PPT·엑셀 등 오피스 문서 14종을 4.4ms 만에 Markdown으로 바꿔주는 무료 오픈소스 anydoc. 최대 256배 빠르고 설치도 명령어 한 줄이면 됩니다. 사내 문서 전체를 ChatGPT·Claude에 먹이는 5분 실습 가이드입니다."
---

직원이 이런 말을 꺼낸 적 있으셨나요? "ChatGPT한테 이 계약서 분석해달라고 했더니, Word 파일을 못 읽는다고 해요."

사실 AI는 텍스트를 잘 이해합니다. 문제는 Word·엑셀·PPT 같은 파일 '형식'입니다. 그런데 이 문제, 명령어 한 줄로 해결됩니다. 이름도 낯선 무료 오픈소스 도구 하나로요.

오늘은 회사에 쌓인 계약서·견적서·발표자료를 ChatGPT나 Claude에 통째로 먹이는 방법을 5분 실습으로 정리합니다.

---

## AI가 Word·PPT를 바로 못 읽는 이유

![center](/mascot/md/emotion/cat_thinking.png)

ChatGPT나 Claude 같은 AI는 텍스트를 굉장히 잘 이해합니다. 그런데 Word(.docx)나 PowerPoint(.pptx)를 그대로 넘기면 AI가 헤맵니다. 이유가 있습니다.

Word 파일 내부는 텍스트와 서식, 그림, 레이아웃 정보가 뒤섞인 복잡한 구조로 되어 있습니다. AI 입장에서는 "글이 어디서 시작하고 어디서 끝나는지"조차 한눈에 파악하기 어렵습니다.

그래서 필요한 작업이 **문서를 AI가 읽기 좋은 형태로 변환하는 것**입니다. AI가 가장 잘 읽는 형식이 **Markdown**인데, 쉽게 말하면 복잡한 사무 서류를 제목·표·목록만 남긴 깔끔한 메모지로 다시 써주는 작업입니다.

이 변환을 자동으로 해주는 도구가 오늘 소개할 **anydoc**입니다. Firecrawl(AI 스타트업)이 GitHub에 100% 무료로 공개했습니다.

그 다음 문제가 생겼습니다. 이미 이런 변환 도구는 여러 개 있었거든요. anydoc이 주목받은 이유는 따로 있습니다.

---

## 속도 차이의 이유, 그리고 한계

![center](/mascot/md/emotion/cat_surprised.png)

[anydoc](https://github.com/firecrawl/anydoc)의 가장 눈에 띄는 수치는 속도입니다. Word 파일 하나를 Markdown으로 바꾸는 데 **중앙값(median) 4.4ms** — 1밀리초는 1/1000초입니다. 사람 눈 깜짝하는 시간(약 300ms)보다 68배 짧습니다.

![문서 변환 속도 비교](/images/blog/anydoc-office-14-ai-fig1.svg)
*▲ 문서 변환 속도 비교 (100개 실제 문서 기준) · 출처: firecrawl.dev/blog/anydoc-and-pdf-inspector*

대체 도구들이 52ms에서 1,130ms까지 걸리는 것과 비교하면 **최대 256배** 빠릅니다. Microsoft가 오픈소스로 공개한 MarkItDown보다 약 31배, 기업용으로 널리 쓰이는 Unstructured보다 약 130배 빠릅니다.

**왜 이렇게 빠를까요?** 비결은 단순함에 있습니다. anydoc은 머신러닝 모델을 전혀 쓰지 않습니다. 복잡한 AI 추론 없이 문서 구조를 직접 파싱해서 텍스트를 뽑아냅니다. 외부 의존성도 거의 없고, Node.js 하나만 있으면 바로 실행됩니다.

Firecrawl 팀은 anydoc을 만든 이유를 이렇게 설명했습니다.

> "No single existing library reliably covers every common document format... AnyDoc is the part that stops being plumbing."
>
> — Firecrawl 공식 발표 (firecrawl.dev)

기존 도구들이 특정 형식만 잘 처리했던 문제를 해결하겠다는 뜻입니다.

### anydoc이 변환하는 14종 파일 형식

![anydoc 핵심 수치](/images/blog/anydoc-office-14-ai-fig2.svg)
*▲ anydoc 주요 사양 · 출처: github.com/firecrawl/anydoc*

| 분류 | 파일 형식 |
|------|-----------|
| Microsoft Office | Word(.doc·.docx·.docm), PowerPoint(.ppt·.pptx), Excel(.xls·.xlsx·.xlsm) |
| PDF | .pdf (텍스트 기반) |
| OpenDocument | .odt, .ods, .odp |
| 기타 | RTF, EPUB, CSV |

### 솔직한 현실 요구사항

- **필요한 것**: Node.js 18 이상이 설치된 PC (Windows·Mac·Linux 모두 가능)
- **GPU 불필요**: ML 모델이 없으니 일반 사무용 PC에서 바로 실행됩니다
- **인터넷 불필요**: 로컬 오프라인 실행 가능 — 기밀 문서도 외부로 나가지 않습니다
- **라이선스**: MIT — 상업적으로도 완전 무료, 사내 서버에 올려도 됩니다
- **한계 한 가지**: 스캔한 이미지 PDF(종이 서류 사진)는 변환 불가입니다. OCR 기능이 없어서 텍스트가 없는 이미지 파일은 처리하지 못합니다. 텍스트가 있는 디지털 문서 전용입니다.

---

## 중소기업 문서를 AI에 연결하는 방법

![center](/mascot/md/emotion/cat_happy.png)

소규모 건설 자재 회사를 예로 들어보겠습니다. 이 회사는 거래처와 계약서를 Word로 작성하고, 자재 견적은 엑셀로, 공사 제안서는 PPT로 관리합니다. 5년치 문서가 사내 폴더에 수백 개입니다.

anydoc을 쓰면 이런 작업이 가능해집니다.

**계약서 분석**: Word 계약서 50개를 한꺼번에 Markdown으로 변환한 뒤 Claude에 "이 계약서들 중 위약금 조항이 있는 건 어떤 건가요?"라고 물으면 AI가 전체 내용을 훑고 답해줍니다.

**견적 요약**: 엑셀 견적서를 변환해서 "이번 분기 자재비가 가장 많이 든 프로젝트 3개 알려줘"라고 하면 AI가 숫자를 정리해줍니다.

**제안서 비교**: PPT 파일을 변환한 뒤 "A안과 B안의 핵심 차이점 요약해줘"라고 하면 수십 장 슬라이드가 한 단락으로 정리됩니다.

이게 "회사 문서 전체를 AI 비서에게 주는 법"입니다. 일일이 복사·붙여넣기 없이, 파일을 Markdown으로 변환하기만 하면 됩니다.

**더 깊은 자동화를 원한다면**: 매일 신규 문서를 자동 변환해서 RAG(검색 보강 생성) 시스템에 연결하면 AI가 회사 문서 전체를 실시간으로 참조하게 됩니다. 이 단계는 약간의 추가 설정이 필요합니다. 먼저 기본 실습부터 시작해보시고, 전체 시스템 연결은 전문가와 상의하시는 게 빠릅니다.

---

**(주)비젼솔루션의 시각**: AI 도입을 막는 가장 큰 장벽은 기술이 아니라 '형식 불일치'라고 봅니다. 대부분의 중소기업 문서는 Word·엑셀·PPT인데, 이 파일들이 AI와 연결되지 못해서 "우리는 AI 쓰기 어렵다"는 결론으로 이어지고 있습니다. anydoc이 의미 있는 이유는 속도 때문만이 아닙니다. '지금 당장 가진 문서, 그대로' AI에 연결할 수 있다는 것 — 그 접근 허들 자체를 없앤 것이 핵심입니다. 기술의 민주화는 늘 이런 방식으로 시작됩니다.

---

## 5분 실습: 명령어 한 줄로 시작합니다

![center](/mascot/md/emotion/cat_cheer.png)

Node.js가 설치된 PC라면 지금 바로 따라 하실 수 있습니다. 별도 설치 없이 `npx` 명령어 하나로 실행됩니다.

**1단계 — Node.js 설치 확인**

명령 프롬프트(Windows) 또는 터미널(Mac·Linux)을 열고 입력합니다.

```bash
node --version
```

`v18.0.0` 이상이 나오면 준비 완료입니다. Node.js가 없으면 [nodejs.org](https://nodejs.org)에서 무료로 내려받으세요.

**2단계 — 파일 변환 실행**

```bash
npx @firecrawl/anydoc 계약서.docx
```

처음 실행할 때 패키지를 설치하겠냐고 물으면 Enter를 누르시면 됩니다. 잠시 후 같은 폴더에 `계약서.md` 파일이 생성됩니다.

**3단계 — 출력 파일 지정 (선택)**

파일명을 직접 지정하고 싶을 때는 `-o` 옵션을 씁니다.

```bash
npx @firecrawl/anydoc 계약서.docx -o 계약서_변환.md
```

**4단계 — 폴더 전체 변환**

폴더 안의 모든 문서를 한꺼번에 처리하려면:

```bash
npx @firecrawl/anydoc ./계약서폴더
```

**5단계 — AI에 붙여넣기**

변환된 `.md` 파일을 메모장으로 열고 내용 전체를 복사한 뒤, ChatGPT나 Claude 대화창에 붙여넣고 질문하세요.

```
[여기에 변환된 텍스트 붙여넣기]

위 계약서에서 납기일과 위약금 조항을 찾아서 정리해줘.
```

브라우저에서 먼저 체험해보고 싶으시면 [anydoc 온라인 데모](https://firecrawl.github.io/anydoc/)에서 파일을 올려 결과를 바로 확인하실 수 있습니다. 데모는 WebAssembly로 구동되어 파일이 서버로 전송되지 않습니다.

---

지금 회사 문서 폴더를 열어보시면, AI가 읽지 못했던 파일들이 있을 겁니다. anydoc은 그 파일들을 순식간에 AI가 읽을 수 있는 텍스트로 바꿔줍니다.

비용은 0원. 특별한 사양도 필요 없습니다. "AI를 쓰고 싶은데 우리 문서가 안 맞아서"라고 미루셨다면, 오늘이 시작할 날입니다.

> **Vision Solution AI 활용 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)


<!-- related-links -->

## 함께 보면 좋은 글

- [AI CRM 무료 공개 — 영업 자동화 5단계](/blog/ai-crm-agentic-open-source-trycompai)
- [Cloudflare OS로 AI 사무실 — 5분 실습](/blog/cloudflare-os-free-ai-workspace-guide)
- [AI 비용 61% 줄여주는 텐센트 무료 실습](/blog/tencentdb-agent-memory-token-saving)
