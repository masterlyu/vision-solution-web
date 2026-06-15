---
title: "나레이션 외주 끊는 법 — AI 음성 5분 만들기"
date: "2026-06-15"
tag: "AI 활용"
tags: "AI 활용,음성 합성,소상공인 AI"
image: "/images/blog/ai-voice-narration-microsoft-vibevoice.svg"
summary: "마이크로소프트가 무료 오픈소스로 공개한 음성 AI VibeVoice. 내 목소리 30초만 있으면 성우 없이 광고 나레이션·ARS·안내방송을 직접 만들 수 있습니다. PC 사양 요건부터 단계별 실습까지 한 번에 정리했어요."
---

성우 섭외, 스튜디오 예약, 수정 반복 요청.
광고 나레이션 하나 만들려면 이 과정을 다 거쳐야 했습니다.

마이크로소프트가 그 번거로움을 없앨 AI를 공개했어요.
이름은 **VibeVoice**. 그것도 **완전 무료**입니다.

## GitHub에서 별이 쏟아진 AI

2026년 초, 마이크로소프트 GitHub 저장소 하나가 조용히 공개됐습니다.
공개 직후 수만 개의 별을 모으며 개발자 커뮤니티를 뒤흔들었어요.

이름은 **VibeVoice**([github.com/microsoft/VibeVoice](https://github.com/microsoft/VibeVoice)).
마이크로소프트가 연구 성과를 그대로 오픈소스로 내놓은 음성 AI입니다.

"또 영어권 기술이겠지" 싶으셨나요?
한국어를 포함한 **50개 언어**를 지원해요.
그것도 내 목소리를 그대로 복제하는 기능까지 품고 있습니다.

학계에서도 인정받았습니다.
VibeVoice-TTS는 AI 분야 최고 학회 중 하나인 **ICLR 2026에서 구두 발표(Oral)** 로 채택됐어요.

![center](/mascot/md/emotion/cat_surprised.png)

## 음성 복제가 뭔가요? 30초면 이해됩니다

**음성 합성(TTS)**이란, 텍스트를 AI가 읽어주는 기술입니다.
네비게이션 안내 목소리를 떠올리면 됩니다.

그런데 VibeVoice는 다릅니다.
기존 TTS는 정해진 목소리만 냈어요.
VibeVoice는 내 목소리 녹음 파일을 넣으면, 그 목소리로 말해줍니다.

이걸 **'제로샷 음성 복제(Zero-shot Voice Cloning)'**라고 해요.
쉽게 말하면, 별도 학습 없이 짧은 샘플만으로 목소리를 재현하는 기술입니다.
**5~30초짜리 녹음 파일**만 있으면 충분해요.

녹음이 길수록 품질이 높아집니다.
20~30초 분량이 가장 안정적이에요.

이렇게 만든 내 목소리로, **최대 90분 분량의 나레이션**을 한 번에 생성할 수 있습니다.
광고 한 편, 매장 안내방송 한 세트, ARS 안내 전체—한꺼번에 가능합니다.

![center](/mascot/md/emotion/cat_thinking.png)

## 내 PC에서 될까요? 솔직하게 따져봅니다

VibeVoice는 두 가지 TTS 모델이 있습니다.
내 PC 사양에 따라 골라 쓰면 됩니다.

![VibeVoice 모델별 VRAM 요구사항](/images/blog/ai-voice-narration-microsoft-vibevoice-fig1.svg)
*▲ VibeVoice 모델 크기별 최소 VRAM 요구사항 · 출처: sacesta.com, sonusahani.com*

| 모델 | 최소 VRAM | 지원 언어 | 특징 |
|------|-----------|-----------|------|
| Realtime-0.5B | 4GB | 9개 언어 | 실시간 생성, 가장 가벼움 |
| VibeVoice-1.5B | 7~8GB | 50개 이상 | 고품질, 한국어 안정 지원 |

RAM은 최소 16GB, 여유가 있으면 32GB가 좋습니다.
GPU가 없다면? **Google Colab(무료 클라우드 GPU)**에서도 돌아갑니다.

### 솔직한 장단점 비교

잘 될 때: 무료인데, 내 데이터가 외부 서버로 나가지 않습니다.
90분 분량 음성도 끊김 없이 만들 수 있고, 수정할 때마다 비용이 들지 않아요.

걸리는 점도 있습니다.
GPU 없이 CPU만으로는 생성 속도가 매우 느려요.
처음 설치하는 과정이 초보자에겐 낯설 수 있고,
목소리 복제 품질은 샘플 녹음 길이와 음질에 크게 좌우됩니다.

### 다른 선택지와 비교하면

| 선택지 | 비용 | 한국어 | 핵심 차이 |
|--------|------|--------|-----------|
| VibeVoice | 무료 | ✅ | 로컬 실행, 무제한 생성 |
| ElevenLabs | 월 $6~$22 (플랜별) | ✅ | UI 쉬움, 클라우드 |
| 성우 외주 (크몽·숨고) | 건당 평균 12만 1천원 | ✅ | 완성도 높음, 수정 번거로움 |

수정이 잦은 콘텐츠라면 VibeVoice가 유리합니다.
완성도 중심의 대형 프로젝트는 여전히 성우가 낫습니다.

![center](/mascot/md/process/cat_analytics.png)

## 중소기업이 실제로 써먹는 3가지 방법

### ① 광고 나레이션 직접 제작

경기도 수원에서 인테리어 회사를 운영하는 A 대표(47세).
분기마다 SNS 광고에 들어가는 나레이션 외주비로 20만 원 이상 써왔습니다.

이제 직접 만들어요.
본인 목소리 30초를 녹음해서 VibeVoice에 넣고, 광고 대본을 입력하면 됩니다.
3분이면 나레이션 파일이 나옵니다.

### ② 매장 안내방송 자동화

카페나 미용실을 운영 중이라면, 안내방송 음성을 직접 만들 수 있어요.
"손님 여러분, 오늘의 추천 메뉴는..." 같은 문구를 입력하면 됩니다.
생성된 파일을 스피커에 연결해 반복 재생하면 끝이에요.

계절마다 문구를 바꿔야 할 때도, 텍스트만 수정하고 다시 생성하면 됩니다.

### ③ ARS 전화 안내 음성 제작

"안녕하세요. 영업 문의는 1번, 배송 문의는 2번을 눌러주세요."
이런 ARS 음성을 성우에게 맡기면 10만~20만 원이 듭니다.

VibeVoice로 직접 생성하면 수정 비용이 없어요.
텍스트만 바꿔서 재생성하면 되거든요.

더 나아가면, 생성된 음성 파일을 홈페이지나 고객 응대 시스템에 연결할 수 있습니다.
ARS·안내방송·챗봇 목소리를 일관된 '회사 목소리'로 통일하는 거예요.
그 이상의 시스템 연동이 필요하다면, 직접 구현보다는 전문가 상담이 효율적입니다.

![center](/mascot/md/process/cat_consulting.png)

## 비젼솔루션이 보는 시각

음성 AI는 이미 수년째 대기업 콜센터에서 쓰이고 있었습니다.
그런데 오픈소스가 되는 순간, 진입 장벽이 사라졌어요.

기술은 평등해졌습니다.
남은 질문은 하나입니다. 쓸 줄 아는가, 모르는가.

마이크로소프트가 무료로 내놓은 도구를 먼저 쓰는 사람과
아직 모르는 사람 사이의 차이는 시간이 갈수록 벌어집니다.
작은 사업장도 이 기술을 충분히 활용할 수 있다—그게 우리가 이 글을 쓰는 이유입니다.

## 직접 따라해보세요 — VibeVoice 설치 5단계

![center](/mascot/md/process/cat_education.png)

![VibeVoice 설치 3단계 흐름](/images/blog/ai-voice-narration-microsoft-vibevoice-fig2.svg)
*▲ VibeVoice 로컬 설치 흐름 · 출처: github.com/microsoft/VibeVoice README*

**준비물:** Windows 10/11 또는 Ubuntu, macOS(M3 이상), Python 3.10 이상, NVIDIA GPU(VRAM 4GB 이상 권장)

**① 저장소 받기**

```bash
git clone https://github.com/microsoft/VibeVoice.git
cd VibeVoice
```

**② 가상환경 만들기**

```bash
python -m venv vibevoice-env
# Windows:
vibevoice-env\Scripts\activate
# macOS/Linux:
source vibevoice-env/bin/activate
```

**③ 패키지 설치**

```bash
pip install torch --index-url https://download.pytorch.org/whl/cu121
pip install -r requirements.txt
```

**④ 내 목소리 녹음**

스마트폰 기본 녹음 앱으로 조용한 환경에서 20~30초를 녹음합니다.
파일을 WAV 형식으로 저장해두세요.
조용한 환경일수록 복제 품질이 올라갑니다.

**⑤ 음성 생성**

실행 방법과 옵션 전체는 공식 GitHub의 `README.md`에 상세히 나와 있습니다.
첫 실행 시 모델 파일이 자동으로 다운로드됩니다(약 3~10GB).

---

**Q. GPU가 없으면 포기해야 하나요?**
아니에요. Google Colab에서 무료 GPU를 이용해 실행할 수 있습니다. [VibeVoice Colab 튜토리얼](https://sonusahani.com/blogs/vibevoice-realtime)을 참고하세요.

**Q. 한국어 품질은 어떤가요?**
Realtime-0.5B는 실험적 지원 수준입니다. 1.5B 이상 모델에서 한국어 품질이 안정됩니다.

---

음성 AI를 사업에 연결하는 게 막막하다면, [무료 상담](/contact)으로 편하게 물어보세요.

이 글이 도움이 되셨나요? AI 궁금해하는 분 계시면 공유해 주세요. 댓글로 질문하시면 성심껏 답변드릴게요!

> **Vision Solution AI 솔루션 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)
