---
title: "MarkItDown: PDF·엑셀 AI 읽기 5분 실습"
date: "2026-07-06"
tag: "AI 활용"
tags: "AI 활용,문서 변환,중소기업 AI,MarkItDown,로컬 AI"
image: "/images/blog/markitdown-pdf-excel-ai-free-guide.svg"
summary: "PDF·엑셀·워드 파일을 AI가 바로 읽는 형태로 변환하는 마이크로소프트 무료 도구 MarkItDown. GitHub 15만 스타, GPU 불필요, MIT 라이선스. 사내 문서를 AI 챗봇에 학습시키는 5분 실습 가이드."
---

"우리 회사 규정집을 AI에게 알려주고 싶은데, PDF로 올리면 제대로 읽지 못하더라고요."

중소기업 대표님들에게 자주 듣는 말입니다. 실제로 ChatGPT나 Claude에 PDF를 그냥 올리면 표가 깨지고, 엑셀 수식은 날아가고, 레이아웃이 뒤엉킵니다. AI가 '이해'하기 전에 '읽기'조차 힘든 겁니다.

마이크로소프트가 이 문제를 해결하는 도구를 GitHub에 무료로 공개했습니다. 이름은 **MarkItDown**. PDF·워드·엑셀·파워포인트를 AI가 바로 처리할 수 있는 텍스트 형식으로 변환합니다. GitHub 스타가 15만 개를 넘어섰고, 2,700개 이상의 실제 프로젝트에서 쓰이고 있습니다.

## AI는 왜 PDF를 제대로 못 읽나

![center](/mascot/md/emotion/cat_thinking.png)

PDF는 '인쇄용' 포맷입니다. 사람 눈에는 깔끔하게 보이지만, 내부 구조는 각 글자의 위치 좌표를 일일이 저장하는 방식입니다. AI 모델은 이 구조를 읽어내다가 표의 행·열이 섞이거나, 다단 레이아웃의 문장 순서가 뒤집히는 경우가 생깁니다.

엑셀도 마찬가지입니다. 셀 참조 수식이나 피벗 테이블은 일반 텍스트로 넘기면 그냥 숫자 나열이 됩니다.

MarkItDown은 이 과정을 자동화합니다. 파일을 넣으면 **마크다운**(Markdown) 형식의 깔끔한 텍스트로 꺼내줍니다. 마크다운이란 `## 제목`, `| 표 |`, `- 목록` 같은 간단한 기호로 구조를 표현하는 텍스트 형식으로, AI 모델이 가장 잘 처리하는 입력 방식 중 하나입니다.

![MarkItDown 지원 포맷과 활용 흐름](/images/blog/markitdown-pdf-excel-ai-free-guide-fig1.svg)
*▲ MarkItDown 지원 포맷 · 출처: github.com/microsoft/markitdown*

## 실제로 쓸 수 있나요? — 요구사항과 솔직한 장단점

![center](/mascot/md/emotion/cat_surprised.png)

**필요한 것은 파이썬뿐입니다.** GPU는 필요 없습니다. 100페이지 PDF를 12초 안에 처리합니다. MIT 라이선스라 상업적으로 써도 비용이 없습니다.

| 항목 | 내용 |
|------|------|
| 라이선스 | MIT (무료·상업 이용 OK) |
| GitHub 스타 | 15만+ |
| 필요 사양 | 파이썬 3.8+, CPU만 OK |
| GPU | 불필요 |
| 처리 속도 | 100페이지 약 12초 |
| 지원 포맷 | PDF, Word, Excel, PowerPoint, HTML, CSV, JSON, XML, ZIP, 이미지 등 12종 이상 |

**솔직한 한계도 알아야 합니다:**

- **스캔 이미지 PDF는 불가.** 복사기로 스캔한 PDF는 내부에 텍스트가 없고 이미지만 있어 MarkItDown만으로는 처리할 수 없습니다. 이 경우 별도 OCR 도구(예: Tesseract)를 먼저 거쳐야 합니다.
- **복잡한 표 레이아웃.** 셀이 병합된 복잡한 표는 변환 후 구조가 단순화될 수 있습니다.
- **파이썬 설치 필요.** 터미널(명령 프롬프트) 한 줄이지만, 파이썬을 한 번도 써보지 않은 분은 설치가 첫 관문입니다.

클라우드 방식 대안(Adobe PDF Services, Azure Document Intelligence)도 있지만 유료이고 데이터가 외부 서버를 거칩니다. 사내 기밀 문서를 처리한다면 MarkItDown을 직접 설치해 로컬에서 돌리는 쪽이 보안상 낫습니다.

## 중소기업이 쓸 수 있는 시나리오 3가지

![center](/mascot/md/emotion/cat_happy.png)

거창한 AI 시스템을 구축하지 않아도 됩니다. 지금 있는 회사 문서를 AI에게 먹이는 것만으로도 업무가 달라집니다.

**시나리오 1 — 사내 규정집·매뉴얼을 AI 챗봇에게 학습**

취업규칙, 업무 매뉴얼, 제품 스펙서를 MarkItDown으로 텍스트화한 뒤 ChatGPT나 Dify 같은 RAG(검색 기반 생성) 챗봇에 업로드하면, 직원이 "출장비 정산 규정이 어떻게 돼요?"라고 물을 때 AI가 바로 답합니다. HR 담당자에게 오는 반복 문의를 줄일 수 있습니다.

**시나리오 2 — 월별 보고서·계약서 요약**

매달 10페이지짜리 실적 보고서를 MarkItDown으로 변환한 뒤 "이 보고서의 핵심 3가지와 전월 대비 차이를 요약해줘"라고 프롬프트를 넣으면 AI가 30초 안에 요점을 뽑아줍니다. 계약서에서 핵심 조항만 뽑는 데도 쓸 수 있습니다.

**시나리오 3 — 엑셀 데이터 AI 분석**

재고 현황이나 매출 데이터가 담긴 엑셀을 CSV 변환 → MarkItDown 텍스트화한 뒤 AI에게 넘기면, "이번 달 재고 소진율이 가장 높은 품목 5개 뽑아줘"처럼 직접 물어볼 수 있습니다.

회사 시스템과의 자동화 연결(예: 매일 자동으로 보고서 변환 → AI 요약 → 슬랙 발송)까지 원한다면 그 단계부터는 설계 전문가의 도움이 필요합니다.

![MarkItDown 중소기업 활용 흐름](/images/blog/markitdown-pdf-excel-ai-free-guide-fig2.svg)
*▲ 사내 문서 → AI 분석 3단계 흐름 · 출처: (주)비젼솔루션 정리*

---

> **(주)비젼솔루션이 보는 관점:** AI 도입의 가장 흔한 착각은 "좋은 AI 모델을 쓰면 된다"는 생각입니다. 실제 장벽은 데이터 형식입니다. 회사 안에 수년치 문서가 쌓여 있어도, AI가 읽지 못하는 형태라면 무용지물입니다. MarkItDown 같은 도구가 중요한 이유는 기술이 화려해서가 아니라, 이미 있는 자산을 AI가 쓸 수 있게 변환하는 '다리' 역할을 하기 때문입니다. 도구보다 데이터 준비가 먼저입니다.*

---

## 지금 바로 따라해보세요 — 5분 실습

![center](/mascot/md/emotion/cat_cheer.png)

**준비물:** 파이썬 3.8 이상이 설치된 PC (Windows/Mac/Linux 모두 OK)

**1단계 — 설치**

명령 프롬프트(Windows) 또는 터미널(Mac·Linux)을 열고 아래를 입력합니다:

```bash
pip install markitdown[all]
```

설치에 1~2분 걸립니다.

**2단계 — 변환 스크립트 작성**

메모장이나 텍스트 에디터에 아래 코드를 붙여넣고 `convert.py`로 저장합니다:

```python
from markitdown import MarkItDown

md = MarkItDown()
result = md.convert("내파일.pdf")   # 파일명을 실제 파일로 바꾸세요
print(result.text_content)
```

**3단계 — 실행**

```bash
python convert.py
```

터미널에 마크다운 형식의 텍스트가 출력됩니다. 이 텍스트를 복사해서 ChatGPT 또는 Claude 채팅창에 붙여넣으면 AI가 문서 내용을 기반으로 답변합니다.

**결과를 파일로 저장하고 싶다면:**

```python
from markitdown import MarkItDown

md = MarkItDown()
result = md.convert("내파일.pdf")

with open("결과.txt", "w", encoding="utf-8") as f:
    f.write(result.text_content)

print("변환 완료! 결과.txt를 확인하세요.")
```

### 자주 묻는 질문

**Q. 한국어 문서도 잘 변환되나요?**
A. 예, 잘 됩니다. 한글 PDF·워드 모두 지원합니다. 단, 스캔 이미지 형태의 PDF는 변환이 안 됩니다.

**Q. 변환한 내용이 외부로 나가나요?**
A. 아닙니다. MarkItDown은 내 컴퓨터에서만 동작합니다. 인터넷 연결 없이도 실행됩니다. 변환 결과를 ChatGPT 등에 붙여넣을 때만 해당 서비스 서버를 거칩니다.

**Q. 엑셀 파일에서 수식 값도 가져오나요?**
A. 수식의 계산된 결과값은 가져옵니다. 수식 자체(=SUM(A1:A10))는 변환되지 않습니다.

---

사내 문서를 AI가 읽을 수 있는 형태로 바꾸는 첫걸음은 어렵지 않습니다. 명령어 한 줄로 시작할 수 있습니다.

> **(주)비젼솔루션 AI 솔루션 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)


<!-- related-links -->

## 함께 보면 좋은 글

- [샤오미 무료 AI가 Claude를 능가? 5분 실습](/blog/xiaomi-mimo-v25-pro-free-coding-agent)
- [대화 끝나도 AI가 기억한다 — Mem0 5분 실습](/blog/mem0-ai-chatbot-memory-free-guide)
- [Claude Sonnet 5 무료 — 바뀐 3가지](/blog/claude-sonnet5-free-upgrade-sme-guide)
