---
title: "진료기록 AI 비식별화, 3단계 실습"
date: "2026-09-28"
tag: "AI 활용"
tags: "진료기록 비식별화,OpenMed,로컬 AI,의료 문서 자동화"
image: "/images/blog/openmed-local-clinic-notes-deid-guide.svg"
summary: "진료기록 비식별화와 약품·질환 정보 추출을 내 컴퓨터에서 시작하는 3단계 실습입니다. 민감한 기록을 외부 AI에 붙여넣기 어려운 작은 의원과 상담센터를 위해, 무료 오픈소스 OpenMed 설치와 합성 문서 확인, 업무 연결 방법 및 한계까지 정리했습니다."
---

진료가 끝난 뒤에도 기록 정리는 남습니다. 이름과 연락처를 가리고, 약품명과 핵심 내용을 다시 옮기다 보면 퇴근 시간이 밀립니다. 그렇다고 민감한 문장을 외부 AI에 그대로 넣기는 망설여집니다.

2026년 9월 15일 공개된 OpenMed 2.5.0은 진료 문서 비식별화와 임상 정보 추출을 내 컴퓨터에서 실행하는 오픈소스 도구입니다. [공식 저장소](https://github.com/maziyarpanahi/openmed)와 [Python 패키지 안내](https://pypi.org/project/openmed/)에서 설치법과 기능을 확인할 수 있습니다. 비식별화는 기록에서 사람을 알아볼 수 있는 연결고리를 줄이는 작업입니다. 다만 AI가 이름을 하나 놓치면 보호가 무너질 수 있으므로, 자동 처리를 곧바로 안전한 처리로 여기면 안 됩니다.

![center](/mascot/md/emotion/cat_happy.png)

## OpenMed는 무엇을 해주나요?

사람이 기록을 읽으며 이름을 찾아 형광펜으로 가리는 일을 떠올려 보세요. OpenMed는 문장을 읽고 이름·날짜·식별번호 같은 개인정보 후보를 표시하거나 가리고, 선택한 모델에 따라 약품·질환 등 임상 정보를 구조화합니다. 쉽게 말해 문서 정리의 첫 손을 보태는 도구입니다.

[NIST 용어집](https://csrc.nist.gov/glossary/term/de_identification)은 비식별화를 “식별 정보와 데이터 주체 사이의 연관성을 제거하는 모든 과정의 일반 용어”로 정의합니다. 이 정의가 알려주는 점은 분명합니다. 이름만 지우는 것으로 충분하다고 단정할 수 없고, 문맥과 다른 식별 정보도 함께 살펴야 합니다.

OpenMed SDK는 Apache-2.0 라이선스로 제공되며 Python 3.10 이상이 필요합니다. 모델과 데이터셋은 이용 조건이 서로 다를 수 있습니다. 프로젝트는 필요한 모델 파일을 준비한 뒤 CPU에서도 실행할 수 있다고 안내합니다. 모델을 처음 받을 때는 인터넷 연결이 필요할 수 있고, 캐시에 모델을 준비한 뒤 로컬 전용 설정으로 실행하는 방법도 문서에 나와 있습니다. 설치한 SDK의 라이선스와 모델 가중치의 이용 조건은 별도로 확인해야 합니다.

| 도입 항목 | 확인할 내용 |
|---|---|
| 컴퓨터 | CPU 실행이 지원되며 GPU는 선택 사항입니다. 지원 경로는 기기와 모델 파일에 따라 다르므로, 사용할 모델을 정한 뒤 합성 문서로 먼저 확인하세요. |
| 비용 | SDK는 Apache-2.0으로 공개되어 있습니다. 다만 모델 내려받기와 저장 공간, 기존 컴퓨터의 전기·운영 비용은 따로 고려해야 합니다. |
| 장점 | 문서를 외부 AI 서비스에 보내지 않는 로컬 흐름을 구성할 수 있고, 직접 지어낸 가상 문장으로 실제 기록을 넣기 전에 절차를 연습할 수 있습니다. |
| 한계와 대안 | 설치와 모델 관리가 필요하고, 탐지 결과가 빠짐없이 정확하다고 보장되지 않습니다. 설치 부담이 더 크다면 승인된 클라우드 서비스를 검토할 수 있지만, 전송·보관 조건을 먼저 확인해야 합니다. |

로컬 실행은 데이터 흐름을 통제하는 선택지이지, 비식별화 완료를 인증해 주는 도장이 아닙니다. [OpenMed FAQ](https://github.com/maziyarpanahi/openmed/blob/master/docs/faq.md)도 결과를 검토하라고 안내하며, 탐지는 개인정보 검토 절차를 대신하지 않는다고 밝힙니다.

![center](/mascot/md/emotion/cat_thinking.png)

## 우리 업무에 붙이는 방법

작은 의원에서 매일 작성하는 상담 기록을 예로 들어보겠습니다. 원본을 바로 자동 입력하는 대신, 담당자가 승인한 시험용 CSV 사본을 만들고 합성 기록부터 처리합니다. 먼저 내보내기 항목과 보관 위치를 정하고, 비식별화 결과를 별도 열에 저장한 뒤 직원이 원문과 대조합니다. 검토를 통과한 다음에야 반복 입력을 줄일 수 있는 범위를 정하는 편이 안전합니다.

상담센터나 소규모 사업장도 원리는 같습니다. 예약 메모나 문의 내용처럼 자유롭게 적힌 문장을 로컬에서 가린 다음, 필요한 항목만 엑셀에 옮기는 흐름을 만들 수 있습니다. [OpenMed 예제](https://github.com/maziyarpanahi/openmed/blob/master/docs/examples.md)에는 CSV 문서의 배치 처리와 임상 문서의 비식별화·정보 추출 절차가 있습니다. 실제 업무에 연결할 때는 원본 파일 접근 권한, 임시 파일 삭제, 결과 승인 담당자를 먼저 정하세요.

(주)비젼솔루션의 관점에서 자동화의 기준은 사람이 하던 단계를 무조건 없애는 데 있지 않습니다. 민감한 원문은 누가 보고, 기계가 만든 결과는 누가 확인하며, 틀렸을 때 어디서 멈출지를 먼저 정해야 작은 조직에서도 오래 쓸 수 있습니다.

## 합성 기록으로 3단계 실습

실제 진료 기록은 넣지 마세요. 아래 예시는 모두 가상의 영어 문장으로, 설치와 결과 형태를 익히기 위한 연습입니다. 첫 실행 때 필요한 모델 파일을 내려받을 수 있으며, 이후 인터넷 없이 실행하려면 로컬 캐시 또는 모델 경로를 미리 준비해야 합니다.

![OpenMed 로컬 문서 처리 세 단계](/images/blog/openmed-local-clinic-notes-deid-guide-fig1.svg)
*▲ 합성 문장으로 설치·처리·검토를 차례로 연습합니다 · 출처: OpenMed 공식 설치·사용 예제를 바탕으로 구성했습니다.*

1. **Python 환경을 준비하고 설치합니다.** 공식 문서가 쓰는 Hugging Face 실행 옵션(`openmed[hf]`)을 설치합니다. 같은 설치 명령이 [Python 패키지 안내](https://pypi.org/project/openmed/)와 [임상 정보 추출 안내 문서](https://github.com/maziyarpanahi/openmed/blob/master/skills/extracting-clinical-entities/SKILL.md)에 나와 있습니다. 모델을 내려받는 동안에는 인터넷 연결이 필요할 수 있습니다.

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install "openmed[hf]"
```

Windows PowerShell에서는 가상 환경을 아래처럼 활성화합니다.

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install "openmed[hf]"
```

2. **가상의 기록을 비식별화하고 약품·질환 정보를 추출합니다.** 아래 문장은 예시일 뿐 실제 환자 정보가 아닙니다. 첫 실행에는 선택한 모델을 불러오는 시간이 들 수 있습니다.

```python
import openmed

note = (
    "Patient Alex Example was prescribed 500 mg metformin "
    "for type 2 diabetes."
)

masked = openmed.deidentify(
    note,
    method="mask",
    policy="hipaa_safe_harbor",
)
print(masked.deidentified_text)

result = openmed.analyze_text(
    masked.deidentified_text,
    model_name="disease_detection_superclinical",
)
for item in result.entities:
    print(item.label, item.text, item.confidence)
```

위 예시 문장은 영어입니다. 한국어 기록으로 해보려면 가리기 단계에 언어를 함께 지정하세요 — `openmed.deidentify(note, method="mask", lang="ko")` 형태입니다. [공식 FAQ](https://github.com/maziyarpanahi/openmed/blob/master/docs/faq.md)는 개인정보 탐지와 비식별화가 한국어(`ko`)를 포함한 42개 언어 코드를 지원한다고 안내합니다. 반면 약품·질환을 뽑아내는 쪽은 모델마다 지원 언어와 찾아내는 항목이 다르므로, 쓰려는 모델을 [모델 목록](https://github.com/maziyarpanahi/openmed/blob/master/docs/model-registry.md)에서 먼저 확인해야 합니다. 한국어 양식에서 바로 기대한 결과가 나오지 않는 것은 설치 오류가 아니라 모델 선택의 문제일 수 있습니다.

3. **사람이 결과를 확인하고 작은 업무부터 연결합니다.** 이름과 날짜가 충분히 가려졌는지, 약품·질환 결과가 문맥에 맞는지 원문과 비교합니다. 실제 자료를 다룰 때는 기관의 개인정보 처리 절차와 접근 권한을 먼저 확인하고, 승인된 로컬 폴더의 사본으로 제한해 보세요.

이 코드가 보여주는 것은 처리 흐름입니다. 특정 언어·모델이 여러분의 양식에서 필요한 항목을 빠짐없이 찾아낸다는 뜻은 아닙니다. 오탈자, 별칭, 문맥에 섞인 단서는 놓칠 수 있고, 의료 판단이나 진료 기록의 자동 확정에 사용해서는 안 됩니다. 먼저 합성 자료로 시험하고, 오류 유형과 사람의 수정 시간을 기록해 계속 쓸 가치가 있는지 판단하세요.

복잡한 전자의무기록 연동이나 부서별 권한 설계는 이 실습 범위를 넘어섭니다. 우선 CSV 사본 한 종류에서 시작해 검토 절차까지 작동하는지 확인하면, 우리 조직에 맞는 다음 단계를 더 정확히 고를 수 있습니다.
