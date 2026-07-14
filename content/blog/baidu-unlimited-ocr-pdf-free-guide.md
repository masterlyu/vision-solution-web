---
title: "100페이지 PDF 무료 OCR — 바이두 오픈소스"
date: "2026-07-15"
tag: "AI 활용"
tags: "AI 활용,OCR,PDF 변환,오픈소스 AI,무료 도구"
image: "/images/blog/baidu-unlimited-ocr-pdf-free-guide.svg"
summary: "바이두가 2026년 6월 공개한 Unlimited-OCR은 100페이지 PDF를 끊김 없이 통째로 파싱하는 3B 오픈소스 모델입니다. OmniDocBench 93.9점, MIT 무료, HuggingFace 데모에서 설치 없이 바로 써볼 수 있고 로컬 실행은 7GB VRAM이면 됩니다."
---

거래처 계약서가 60페이지다. 꼭 확인해야 할 위약 조항은 어딘가 끼어 있다. 담당자가 프린트해서 밑줄 치고, 핵심 추려 메모하고, 다시 검토 요청하는 과정이 반복된다. ChatGPT에 올리면 어떨까 — 파일이 길면 중간 내용을 흘려버리거나, 페이지 단위로 잘라 보내야 해서 맥락이 끊긴다.

바이두가 2026년 6월 22일 공개한 **Unlimited-OCR**은 이 문제를 다르게 접근한다. 문서를 자르지 않고, 처음부터 끝까지 한 번에 읽는다. 출시 5일 만에 GitHub 별이 1만 개를 넘었다.

---

## 기존 OCR과 뭐가 다른가 — 통째로 읽는 구조

![center](/mascot/md/emotion/cat_happy.webp)

대부분의 OCR 도구는 PDF를 페이지 단위 이미지로 변환한 뒤 각 페이지를 따로 처리한다. 이 방식의 문제는 페이지 경계를 넘는 맥락 처리다. 한 조항이 39페이지에서 시작해 40페이지에서 끝나면, 두 처리 결과를 이어붙여야 하고 그 이음새에서 오류가 생긴다.

Unlimited-OCR이 쓴 기술은 **R-SWA(Reference Sliding Window Attention)**다. 핵심은 KV 캐시를 평탄하게(flat) 유지하는 것. 문서가 아무리 길어도 모델이 유지해야 할 메모리 크기가 늘지 않는다. 덕분에 100페이지 문서를 처음 페이지처럼 마지막 페이지도 같은 정확도로 처리한다.

성능은 수치로 나왔다. OmniDocBench v1.6 기준 **93.9%**, DeepSeek OCR 대비 긴 문서에서 **약 35% 빠른 속도**.

---

## 내 컴퓨터에서 돌아가나 — 스펙과 현실 요구사항

![center](/mascot/md/emotion/cat_thinking.webp)

![Unlimited-OCR 핵심 스펙 3가지](/images/blog/baidu-unlimited-ocr-pdf-free-guide-fig1.svg)
*▲ Unlimited-OCR 핵심 스펙 · 출처: GitHub baidu/Unlimited-OCR*

| 항목 | 내용 |
|------|------|
| 모델 크기 | 3B 파라미터 |
| 라이선스 | MIT (상업 사용 무료, 조건 없음) |
| 로컬 실행 — FP16 | 약 7GB VRAM |
| 로컬 실행 — INT4 양자화 | 약 2GB VRAM |
| 클라우드 GPU 최저 비용 | 약 $0.77/시간 |

RTX 3060 (12GB) 이상이면 FP16 풀 모델을 로컬에서 쓸 수 있다. 8GB GPU라면 INT4 양자화 버전으로 실행 가능하다. 그마저도 없다면 아래 HuggingFace 웹 데모로 먼저 테스트해보면 된다.

**솔직한 한계:** 한국어 문서 처리 성능은 별도 검증이 필요하다. 영어·중문 중심으로 훈련된 모델이라 한글 계약서·보고서에서 어느 정도 정확도가 나오는지 실제 테스트로 확인해야 한다.

**대안 도구 비교:**

| 도구 | 장점 | 단점 |
|------|------|------|
| Unlimited-OCR | 긴 문서 특화, MIT 무료, 로컬 가능 | GPU 필요, 한국어 성능 별도 확인 |
| Adobe Acrobat AI | UI 편함, 한국어 강함 | 유료 구독 |
| Tesseract OCR | 초경량, 완전 무료 | 정확도 낮음, 레이아웃 인식 약함 |
| Google Cloud Vision | 정확도 높음 | 페이지당 과금, 외부 서버 전송 |

---

## 지금 당장 써보기 — HuggingFace 웹 데모 실습

![center](/mascot/md/emotion/cat_surprised.webp)

![HuggingFace Space 3단계 실습 순서](/images/blog/baidu-unlimited-ocr-pdf-free-guide-fig2.svg)
*▲ 설치 없이 브라우저에서 바로 · 출처: HuggingFace baidu/Unlimited-OCR*

[HuggingFace Space](https://huggingface.co/spaces/baidu/Unlimited-OCR)를 열면 설치 없이 바로 쓸 수 있다. Zero GPU 방식으로 무료 운영되므로 사용량이 몰릴 때는 대기가 생길 수 있다.

**실습 순서:**

1. [https://huggingface.co/spaces/baidu/Unlimited-OCR](https://huggingface.co/spaces/baidu/Unlimited-OCR) 접속
2. **Upload File** 버튼 클릭 → PDF 또는 이미지 파일 선택
3. **Parse** 버튼 클릭 후 대기 (분량에 따라 10초~1분)
4. 출력된 Markdown 텍스트 복사
5. ChatGPT 또는 Claude에 붙여넣기 → "이 계약서에서 위약 조항만 요약해줘" 방식으로 활용

처음에는 1~3페이지 분량으로 먼저 테스트해보고, 결과가 만족스러우면 분량을 늘려가는 게 좋다.

---

## 내 회사에서 실제로 쓰려면 — 로컬 설치와 API 연동

![center](/mascot/md/emotion/cat_cheer.webp)

웹 데모는 편리하지만 기밀 문서를 외부 서버에 올리는 건 조심스럽다. 계약서, 내부 보고서, 고객 데이터가 담긴 파일이라면 로컬 설치가 맞다.

**빠른 시작 (Python):**

```bash
pip install transformers torch
```

```python
from transformers import AutoModel, AutoTokenizer

model = AutoModel.from_pretrained("baidu/Unlimited-OCR", trust_remote_code=True)
tokenizer = AutoTokenizer.from_pretrained("baidu/Unlimited-OCR")
```

GitHub 저장소([github.com/baidu/Unlimited-OCR](https://github.com/baidu/Unlimited-OCR))에 OpenAI 호환 API 서버 실행 예시도 포함되어 있다. 사내 서버에 올려두면 직원들이 웹 브라우저로 접근하는 방식도 가능하다.

**실무 시나리오:**

- **계약서 검토**: 거래처 PDF 30페이지 → 텍스트 추출 → "위약금·납기 조항만 정리해줘" → 5분 안에 파악
- **견적서 비교**: 공급사 3곳 PDF 각각 추출 → "단가와 납기를 표로 비교해줘" → 담당자 하루 작업 10분으로 단축
- **보고서 요약**: 매월 50페이지 업계 보고서 → 핵심 지표 3개 자동 추출 → 임원 보고용 요약본 자동 생성

---

## (주)비젼솔루션 관점

바이두가 3B 모델로 이 결과를 낸 게 흥미롭다. "긴 문서 처리 = 더 큰 모델"이 공식처럼 통했는데, R-SWA는 그 공식을 구조로 깼다. 중소기업 입장에서 실질적인 의미는 하나다 — 클라우드 구독 없이, 사무실 서버 한 대로도 돌릴 수 있는 문서 AI가 생겼다. 계약서 검토, 제품 카탈로그 텍스트 추출, 거래명세서 자동 입력 같은 반복 업무에 붙여볼 만하다. MIT 라이선스라 비용 부담 없이 시도할 수 있다는 점이 진입 장벽을 낮춰준다. 한국어 성능 검증은 필수지만, 웹 데모에서 5분이면 판단할 수 있다.

---

> **AI 솔루션 도입 문의 · (주)비젼솔루션**  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)
