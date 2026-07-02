---
title: "PDF를 ChatGPT에 넣는 법 — MS 무료 도구"
date: "2026-06-14"
tag: "AI 활용"
tags: "AI 활용,문서변환,ChatGPT 활용,MarkItDown,마이크로소프트"
image: "/images/blog/markitdown-pdf-ai-sme-guide.svg"
summary: "PDF·Word·엑셀 파일을 ChatGPT가 바로 읽을 수 있는 텍스트로 변환해주는 마이크로소프트 무료 오픈소스 MarkItDown. pip 한 줄 설치로 계약서 분석·제품카탈로그 검색·재무제표 요약까지 중소기업도 바로 활용할 수 있습니다."
---

거래처에서 계약서 PDF를 받았습니다. ChatGPT에 올리려고 하면 "텍스트로 붙여넣으세요"라고 나오죠. 복사해도 한글이 깨지거나 표가 뭉개집니다. 결국 처음부터 다시 타이핑하거나 포기하게 됩니다.

마이크로소프트가 이 문제를 해결하는 무료 도구를 만들었습니다. 이름은 **MarkItDown**. GitHub에 공개되자마자 하루 만에 별점 3,000개를 받았고, AI 연구자 사이에서 "드디어 나왔다"는 반응이 쏟아졌습니다. 현재 GitHub 별점 139,000개를 넘긴 역대급 오픈소스입니다.

> **AI 도입 어디서 시작해야 할지 모르겠다면:**  
> 🌐 [(주)비젼솔루션 AI 솔루션 무료 상담](https://www.visionc.co.kr/ai-solution)

---

## MarkItDown이 뭔가요? — PDF를 AI 언어로 바꿔주는 도구

MarkItDown은 마이크로소프트 AutoGen 팀이 만든 오픈소스 변환 도구입니다. 쉽게 말해, PDF·Word·엑셀 같은 회사 문서를 **ChatGPT·Claude 같은 AI가 깔끔하게 읽을 수 있는 텍스트 형식**으로 바꿔줍니다.

마크다운이 무엇인지 몰라도 괜찮습니다. "AI가 오해 없이 읽을 수 있는 정돈된 텍스트 문서"라고 이해하면 충분합니다.

**지원 파일 형식:**
PDF, Word(.docx), Excel(.xlsx), PowerPoint(.pptx), HTML 웹페이지, 이미지(글자 인식), 음성 파일까지 7가지 이상을 처리합니다. GPU나 고성능 컴퓨터 없이, 일반 업무용 노트북 한 대로 충분합니다.

![center](/mascot/md/emotion/cat_happy.webp)

**다른 방법과 비교하면?**

Adobe Acrobat의 PDF 변환은 유료($15/월)이고, 복잡한 표나 한글 폰트에서 오류가 자주 납니다. ChatGPT Plus 파일 업로드($20/월)는 직접 올릴 수 있지만 여러 파일을 한꺼번에 처리하거나 자동화하기 어렵습니다.

MarkItDown은 **무료, 오픈소스, 자동화 가능**이 핵심 강점입니다. 단점은 하나 — Python을 처음 쓰는 분에게 설치 과정이 낯설 수 있습니다. 아래에서 가능한 쉽게 안내합니다.

![MarkItDown 변환 흐름 — PDF에서 ChatGPT 분석까지 3단계](/images/blog/markitdown-pdf-ai-sme-guide-fig1.svg)

*▲ MarkItDown 변환 흐름 3단계 · 출처: github.com/microsoft/markitdown*

---

## 5분 설치하고 바로 써보기

Python을 모른다고 걱정하지 않아도 됩니다. 아래 순서대로만 따라 하면 됩니다.

**준비물:** 윈도우 또는 맥 컴퓨터, 인터넷 연결

**1단계 — Python 설치** (이미 설치되어 있으면 건너뜀)  
python.org에 접속해 "Download Python" 버튼을 클릭합니다.

**2단계 — MarkItDown 설치**  
윈도우는 '명령 프롬프트', 맥은 '터미널'을 열고 아래 한 줄을 붙여넣습니다.

```bash
pip install markitdown
```

**3단계 — 변환 실행**

```bash
markitdown 계약서.pdf > 계약서변환.md
```

`계약서.pdf` 자리에 변환하려는 파일 이름을 넣으면 됩니다.

**4단계 — ChatGPT에 붙여넣기**  
생성된 `계약서변환.md` 파일을 메모장으로 열고, 전체 선택(Ctrl+A) → 복사 → ChatGPT 입력창에 붙여넣으면 끝입니다.

![center](/mascot/md/emotion/cat_thinking.webp)

**설치 없이 체험부터 해보고 싶다면?**  
MarkItDown GitHub 페이지(github.com/microsoft/markitdown) 하단에 온라인 데모 링크가 있습니다. 브라우저에서 파일을 올리면 바로 변환 결과를 확인할 수 있습니다.

![MarkItDown 주요 수치](/images/blog/markitdown-pdf-ai-sme-guide-fig2.svg)

*▲ MarkItDown 주요 스펙 · 출처: github.com/microsoft/markitdown*

---

## 계약서부터 재무제표까지 — 실전 시나리오 3가지

이 세 가지가 중소기업에서 가장 많이 쓰이는 방식입니다.

### ① 계약서·견적서 1차 검토

거래처 계약서를 받을 때마다 변호사에게 보내거나 조항 하나하나를 읽어야 했죠.

계약서 PDF → MarkItDown → ChatGPT에 붙여넣기 → "이 계약서에서 자동 갱신 조항과 위약금 조건을 찾아줘"

법적 판단은 여전히 변호사에게 받아야 합니다. 하지만 놓치기 쉬운 조항을 1분 안에 짚어줍니다. 수백만 원짜리 계약 실수를 줄이는 데 실제로 쓸 수 있습니다.

### ② 수백 페이지 제품 카탈로그 검색

제조업·유통업 담당자가 가장 반기는 기능입니다. 500페이지 부품 카탈로그에서 사양에 맞는 제품을 찾으려면 보통 반나절이 걸리죠.

카탈로그 PDF → MarkItDown → Claude에 붙여넣기 → "전압 12V, 소비전력 5W 이하, 방수 IP67인 제품 목록 뽑아줘"

10초 안에 후보가 나옵니다.

### ③ 재무제표 엑셀 이상치 탐색

"이번 달 지출이 왜 이상하지?" 엑셀 파일 한 장을 ChatGPT에 올리는 것만으로 이상 항목을 짚어낼 수 있습니다.

재무제표 xlsx → MarkItDown → ChatGPT에 붙여넣기 → "전월 대비 10% 이상 증가한 비용 항목과 가능한 원인을 분석해줘"

회계사 없이도 1차 점검이 가능합니다.

![center](/mascot/md/emotion/cat_cheer.webp)

**여러 파일을 한꺼번에, 결과를 자동 저장하려면?**  
위 시나리오는 파일 하나씩 수동으로 처리하는 방식입니다. 매주 계약서 수십 건을 처리하거나, 변환 결과를 내부 시스템에 자동으로 저장하려면 Python 스크립트를 조금 더 손봐야 합니다. 그 이상부터는 회사 환경에 따라 설정이 달라지므로, [(주)비젼솔루션 AI 솔루션 상담](https://www.visionc.co.kr/ai-solution)에서 구체적인 방법을 안내해 드립니다.

---

## (주)비젼솔루션의 관점

MarkItDown 같은 도구가 중요한 이유는 기술 자체보다 **정보 주권** 때문입니다.

지금까지 회사 문서를 AI로 분석하려면 외부 서비스에 파일을 올려야 했습니다. 계약서, 재무제표, 고객 정보가 담긴 문서를요. 내 컴퓨터에서만 실행되는 오픈소스 도구는 이 흐름을 바꿉니다. 변환 과정에서 문서가 외부로 나가지 않습니다. 중소기업일수록 정보 유출 사고가 났을 때의 충격이 큽니다. 편리함과 보안을 하나씩 포기하지 않아도 되는 선택지가 생겼다는 것 — 우리가 이 도구에 주목하는 이유입니다.

---

## 자주 묻는 질문

**Q. Python을 몰라도 쓸 수 있나요?**  
설치는 2단계입니다. Python을 내려받아 설치하고, pip 명령어 한 줄을 터미널에 붙여넣으면 됩니다. 코딩 지식은 필요 없습니다.

**Q. 기밀 문서를 써도 안전한가요?**  
MarkItDown 변환 자체는 내 컴퓨터 안에서만 실행됩니다. 문서가 외부 서버로 전송되지 않습니다. 단, 이후 ChatGPT에 붙여넣을 때는 OpenAI 서버로 데이터가 전송됩니다. 기밀 문서는 사내 구축형 AI(Ollama, LM Studio 등)와 조합해서 쓰는 것을 권장합니다.

**Q. 비용이 드나요?**  
MarkItDown 자체는 완전 무료·오픈소스입니다. GitHub에서 바로 내려받을 수 있습니다.

---

> **Vision Solution AI 솔루션 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)
