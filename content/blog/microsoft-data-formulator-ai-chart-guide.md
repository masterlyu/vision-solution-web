---
title: "엑셀 없이 차트 — MS 무료 AI 5분 실습"
date: "2026-08-25"
tag: "AI 활용"
tags: "AI 활용,무료 AI 도구,데이터 분석,엑셀 대체,업무 자동화"
image: "/images/blog/microsoft-data-formulator-ai-chart-guide.svg"
summary: "마이크로소프트가 2026년 8월 AI 차트 도구 'Data Formulator 0.8 베타'를 무료 공개했습니다. 엑셀 함수 없이 말 한마디로 매출·재고 데이터를 차트로 만드는 5분 실습 가이드입니다. GitHub 별점 16,900개, MIT 완전 무료."
---

월말이면 어김없이 반복됩니다. 매출 데이터는 엑셀에 다 있는데, 차트를 그리려면 피벗 테이블이니 VLOOKUP이니 하는 함수와 씨름해야 합니다. 직원한테 맡겨도 반나절이 걸리고, 결국 "그냥 숫자로 보자"고 타협하게 됩니다.

2026년 8월, 마이크로소프트가 이 문제를 완전히 다른 방식으로 해결한 AI 도구를 무료로 공개했습니다. **Data Formulator** — 엑셀 함수 없이, 말 한마디로 데이터를 차트로 만드는 도구입니다. GitHub 별점 16,900개를 받은 오픈소스이고, 상업적으로도 무료입니다.

> **지금 바로 데이터 분석 도입을 고민 중이시라면**:  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)

## 마이크로소프트가 무료로 공개한 AI 차트 도구

![center](/mascot/md/emotion/cat_happy.webp)

Data Formulator는 마이크로소프트 리서치 팀이 만든 **오픈소스 AI 데이터 분석 도구**입니다. 쉽게 말하면, 여러분의 엑셀 파일이나 CSV 데이터를 AI에게 보여주고 "지난 6개월 매출을 월별로 막대 차트로 그려줘"라고 말하면 — 그걸 바로 해줍니다.

2026년 8월 15일 버전 0.8 베타 1이 공개된 이후 GitHub에서 빠르게 주목받고 있습니다. MIT 라이선스라 상업적으로도 완전히 무료로 쓸 수 있습니다.

기존 도구와 비교해보면 차이가 분명합니다:

| 도구 | 방식 | 비용 |
|------|------|------|
| 엑셀 차트 | 함수 + 피벗 + 수동 설정 | 월 구독료 |
| ChatGPT 데이터 분석 | AI에 파일 첨부 후 분석 | 월 $20 이상 |
| **Data Formulator** | **AI에게 말로 명령, 반복 수정 가능** | **완전 무료** |
| Google Looker Studio | 클라우드 기반 대시보드 | 무료(구성 복잡) |

![Data Formulator 3단계 사용 흐름](/images/blog/microsoft-data-formulator-ai-chart-guide-fig2.svg)
*▲ Data Formulator 사용 3단계 · 출처: (주)비젼솔루션 정리*

ChatGPT에도 파일 첨부 분석 기능이 있지만, Data Formulator는 **반복적으로 수정하고 발전시키는 과정**에 특화되어 있습니다. "이걸 꺾은선으로 바꿔줘", "이 항목만 빼줘", "색을 바꿔줘" 같은 대화형 수정이 자연스럽게 이어집니다.

> **이미 데이터 분석 자동화를 도입한 기업의 사례가 궁금하시다면**:  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)

## 진짜 무료인가요? 솔직한 요구사항

![center](/mascot/md/emotion/cat_thinking.webp)

Data Formulator 자체는 완전히 무료이지만, 솔직히 말씀드리면 한 가지 필수 조건이 있습니다.

**AI 언어 모델 API 키**가 필요합니다. Data Formulator는 내부적으로 GPT-4나 Claude 같은 AI 모델을 활용해 여러분의 명령을 이해하고 데이터를 처리합니다. 이 AI 모델은 유료 API를 사용합니다.

현실적인 비용을 따져보면, 매달 데이터 분석을 많이 하지 않는다면 월 몇 천 원 이내로도 충분히 운영할 수 있습니다. OpenAI나 Anthropic 모두 가입 시 무료 크레딧도 제공합니다.

**요구사항 한눈에 보기:**

| 항목 | 최소 사양 |
|------|---------|
| 운영체제 | Windows / Mac / Linux |
| Python | 3.8 이상 (또는 Node.js) |
| 인터넷 | 필수 (AI API 연결) |
| AI API 키 | OpenAI 또는 Anthropic |
| 데이터 형식 | CSV, Excel (.xlsx) |

![Data Formulator 현황](/images/blog/microsoft-data-formulator-ai-chart-guide-fig1.svg)
*▲ Data Formulator 현황 수치 (2026년 8월 기준) · 출처: GitHub microsoft/data-formulator*

**솔직한 단점도 있습니다.** 현재 0.8 베타 버전이라 가끔 오류가 날 수 있습니다. 한국어 데이터 컬럼명은 영어로 바꿔두면 더 안정적으로 작동합니다. 수십만 행 이상의 대용량 데이터에서는 AI 처리 속도가 느려질 수 있습니다. 이런 점은 앞으로 정식 버전에서 개선될 예정입니다.

## 우리 회사 매출 데이터에 붙여보면

중소기업·소상공인에게 실제로 유용한 시나리오는 세 가지입니다.

**편의점·소매업 케이스**
POS 기기에서 뽑은 매출 CSV를 올리고 "요일별 평균 매출을 막대 차트로, 월~일 순서로 정렬해줘"라고 입력하면 바로 차트가 완성됩니다. 이전에 엑셀 피벗 테이블 설정에 20분 이상 걸렸던 작업입니다.

**제조업·도매 케이스**
거래처별 월 매출 데이터를 올리고 "매출 상위 5개 거래처만 뽑아서 꺾은선 차트로, 6개월 추이 보여줘"라고 하면 됩니다. 주력 거래처의 매출 추이를 한눈에 파악할 수 있습니다.

**식당·카페 케이스**
배달앱 정산 내역 CSV를 올리고 "메뉴별 주문 건수를 원형 차트로, 많은 순으로 정렬해줘"라고 하면 어떤 메뉴가 잘 나가는지 바로 확인할 수 있습니다.

이 시나리오들의 공통점은 하나입니다 — 여러분이 이미 갖고 있는 데이터에, 함수 없이 말로만 접근할 수 있다는 것입니다.

---

> **(주)비젼솔루션의 시각**
>
> 데이터를 보는 것과 데이터에서 의미를 읽는 것은 다릅니다. Data Formulator 같은 AI 도구는 '보는 것'을 쉽게 만들어줍니다. 그런데 정작 중요한 것은 "이 차트에서 무엇을 물어야 할지"입니다. 좋은 질문이 좋은 차트를 만들고, 좋은 차트가 좋은 결정으로 이어집니다. AI 도구가 아무리 발전해도, 우리 회사 데이터에서 무엇을 봐야 하는지 아는 사람은 사장님 본인입니다 — 우리는 그렇게 봅니다.

## 지금 당장 5분 실습 시작하기

![center](/mascot/md/emotion/cat_cheer.webp)

아래 순서대로 따라하면 5분 안에 실행해볼 수 있습니다.

**방법 1: pip으로 설치 (Python이 있으신 분)**

```bash
pip install data-formulator
data-formulator
```

**방법 2: npx로 실행 (Node.js가 있으신 분)**

```bash
npx data-formulator
```

두 명령어 모두 실행하면 브라우저가 자동으로 열리면서 Data Formulator 화면이 나타납니다.

**첫 실행 순서:**

1. 화면 오른쪽 상단 설정에서 **AI 모델 선택** (GPT-4 또는 Claude) 후 API 키 입력
2. 왼쪽 "데이터 업로드" 버튼으로 **CSV 또는 엑셀 파일 올리기**
3. 하단 채팅창에 **원하는 차트 설명 입력** (예: "월별 매출 합계를 막대 차트로 보여줘")
4. Enter 누르면 AI가 **차트 자동 생성**
5. 수정이 필요하면 채팅창에 "꺾은선으로 바꿔줘", "색을 파란색으로" 등 입력

**복붙해서 바로 쓰는 프롬프트 예시:**

- `월별 매출 합계를 막대 차트로, 가장 높은 달이 맨 앞에 오게 정렬해줘`
- `상위 5개 제품의 매출 비중을 원형 차트로 보여줘`
- `이번 달과 지난달 매출을 나란히 비교하는 막대 차트 만들어줘`

공식 GitHub(무료 다운로드): [github.com/microsoft/data-formulator](https://github.com/microsoft/data-formulator)

---

### 자주 묻는 질문 (FAQ)

**Q. Python을 모르는데 설치할 수 있나요?**

A. Python 설치 자체는 python.org에서 클릭 몇 번으로 가능합니다. 설치 후 윈도우 키 → `cmd` 검색 → 명령 프롬프트에서 위 명령어를 복붙하면 됩니다. Node.js도 nodejs.org에서 동일하게 설치할 수 있습니다.

**Q. AI API 키는 어디서 구하나요?**

A. OpenAI API 키는 platform.openai.com에서, Claude API 키는 console.anthropic.com에서 발급받을 수 있습니다. 둘 다 처음 가입 시 무료 크레딧이 제공됩니다.

**Q. 회사 데이터를 올려도 보안에 문제없나요?**

A. 데이터는 AI API(OpenAI 또는 Anthropic 서버)로 전송됩니다. 민감한 고객 정보나 영업 기밀이 포함된 데이터라면, 이름·연락처 등 개인정보를 제거하거나 샘플 데이터로 먼저 테스트해보시는 걸 권장합니다.

---

> **AI 솔루션·데이터 분석 도입 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)
