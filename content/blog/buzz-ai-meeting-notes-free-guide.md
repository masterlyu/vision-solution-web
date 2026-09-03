---
title: "Buzz 무료 AI 회의록 — 5분 설치 완료"
date: "2026-09-03"
tag: "AI 활용"
tags: "AI 활용,무료 AI 도구,회의록 자동화,소상공인 AI,업무 자동화"
image: "/images/blog/buzz-ai-meeting-notes-free-guide.svg"
summary: "유료 AI 회의록 서비스 대신 GitHub 오픈소스 Buzz를 씁니다. 내 컴퓨터에서만 돌아가니 회의 내용이 외부로 나가지 않습니다. 설치부터 첫 음성 텍스트 변환까지 5분이면 됩니다."
---

회의가 끝나면 가장 번거로운 일이 남습니다. 30분 회의에 회의록 작성 30분이 더 붙습니다. "이거 AI가 해주면 안 되나" 싶었던 분들을 위한 얘기입니다.

Otter.ai나 Fireflies.ai 같은 AI 회의록 서비스가 있습니다. 유용한데, 월 구독료가 붙습니다. 게다가 회의 내용이 외부 서버로 올라갑니다. 거래처 이름, 계약 금액, 고객 정보가 담긴 회의라면 신경 쓰이는 부분입니다.

GitHub 스타 21,000개를 넘긴 오픈소스 도구가 있습니다. 이름은 **Buzz**입니다. 설치형, MIT 라이선스, 완전 무료입니다.

## AI가 회의 내용을 받아씁니다 — Buzz란

![center](/mascot/md/emotion/cat_happy.webp)

Buzz는 내 컴퓨터에서 실행되는 음성 텍스트 변환 도구입니다. OpenAI가 만든 Whisper 모델을 내 PC에서 직접 돌립니다. 마이크로 들어오는 소리를 실시간으로 받아쓰거나, 녹음 파일을 열어 텍스트로 변환해줍니다. Zoom, 구글 미트, 카카오톡 통화 등 어떤 방식의 회의든 상관없습니다.

MIT 라이선스 오픈소스입니다. 개인·상업적 용도 모두 비용 없이 쓸 수 있습니다. 월정액 구독이 없습니다.

핵심 기능을 정리하면 이렇습니다. 실시간 마이크 받아쓰기, 오디오·영상 파일 텍스트 변환, 화자 구분, TXT·SRT·VTT 형식 내보내기입니다. Whisper 모델이 99개 언어를 지원하니 한국어 회의에도 문제없습니다.

![Buzz 핵심 수치 3가지](/images/blog/buzz-ai-meeting-notes-free-guide-fig1.svg)
*▲ Buzz 핵심 수치 · 출처: github.com/chidiwilliams/buzz*

실제로 내 회사에서 쓸 수 있을지, 솔직하게 따져보겠습니다.

## 현실 요구사항과 유료 앱 비교

![center](/mascot/md/emotion/cat_thinking.webp)

**설치에 필요한 것**

특별한 GPU나 고성능 서버가 필요하지 않습니다. Windows, macOS(Apple Silicon), Linux 모두 지원합니다. 설치 파일 하나만 내려받으면 됩니다. 텍스트 변환 모델은 처음 사용할 때 자동으로 내려받습니다.

Whisper 모델 크기를 선택할 수 있습니다. 가장 가벼운 Tiny 모델은 일반 사무용 PC로도 작동합니다. 정확도가 높은 Large 모델은 RAM 16GB 이상을 권장합니다. 한국어 회의에는 Small 또는 Medium 모델이 적당합니다.

AI 요약 기능을 원한다면 한 단계가 더 있습니다. Buzz는 텍스트 변환만 해주므로, 변환된 텍스트를 ChatGPT 무료 버전이나 Claude에 붙여넣으면 회의 요약을 받을 수 있습니다. 완전히 로컬에서 처리하고 싶다면 Ollama(로컬 AI 실행 도구)와 연결하는 방법도 있습니다.

**솔직한 장단점**

장점이 분명합니다. 회의 내용이 외부 서버로 나가지 않습니다. 유료 구독이 없습니다. 인터넷 없이도 작동합니다.

단점도 있습니다. Otter.ai처럼 AI 요약이 자동으로 생성되지 않습니다. 텍스트를 직접 복사해 AI 도구에 붙여넣는 한 단계가 필요합니다. macOS는 Apple Silicon(M1~M4) 최적화가 되어 있습니다. Intel 맥도 X64 빌드로 지원합니다.

| | Buzz | Otter.ai | Fireflies.ai |
|---|---|---|---|
| 월 비용 | 무료 | $8.33~/인 (연간) | $10~/인 (연간) |
| 데이터 저장 | 내 PC (로컬) | 외부 서버 | 외부 서버 |
| 한국어 | ✅ | ✅ | ✅ |
| 설치형 | ✅ | ❌ | ❌ |
| 오프라인 작동 | ✅ | ❌ | ❌ |
| 자동 AI 요약 | ❌ 수동 | ✅ | ✅ |

보안이 중요한 업종이나 구독료를 줄이고 싶은 회사라면 충분히 현실적인 선택입니다.

## 중소기업에서 이렇게 씁니다

![center](/mascot/md/emotion/cat_surprised.webp)

제조업 거래처 미팅을 예로 들어보겠습니다. 납품 일정과 단가 협의가 오가는 자리입니다. Buzz를 켜두면 회의 내용이 그대로 텍스트로 남습니다. 회의가 끝나면 그 텍스트를 ChatGPT 무료 버전에 붙여넣고 "회의 요약해줘"를 입력합니다. 주요 합의 사항, 다음 미팅 일정, 추가 논의 항목이 정리됩니다. 30분이 걸리던 회의록 작성이 5분 검토로 바뀝니다.

고객 상담 내용 정리에도 씁니다. 상담 중 놓쳤던 고객 요구사항이 텍스트로 남으니, 다음 상담이나 견적 작성에 활용할 수 있습니다. 상담 후 녹음 파일을 Buzz로 변환해도 됩니다.

내부 교육이나 강의를 녹음하고 정리하는 용도도 있습니다. 외부 강사가 진행한 교육 내용이 텍스트로 정리되어 팀원과 공유할 수 있는 자료가 됩니다.

---

> *(주)비젼솔루션이 보는 관점: AI 회의록 서비스의 진짜 비용은 구독료만이 아닙니다. 회의 내용을 외부 서버에 올리는 순간, 그 데이터 통제권은 내 손을 떠납니다. 거래처 협상 내용, 고객 개인정보가 담긴 회의라면 더욱 그렇습니다. Buzz처럼 로컬에서 실행되는 도구가 항상 편리하지는 않지만, 데이터가 어디에 있는지 내가 확인할 수 있다는 점 하나만큼은 분명합니다. AI 도구를 선택할 때 편리함과 통제권 사이의 균형을 따져보는 것, 그것이 첫 번째 판단 기준이 되어야 한다고 봅니다.*

---

## 5분 안에 설치하기

![Buzz 설치 3단계](/images/blog/buzz-ai-meeting-notes-free-guide-fig2.svg)
*▲ Buzz 설치 3단계 · 출처: github.com/chidiwilliams/buzz/releases*

![center](/mascot/md/emotion/cat_cheer.webp)

처음이어도 따라하실 수 있습니다.

**1단계 — 설치 파일 내려받기**

1. [github.com/chidiwilliams/buzz/releases](https://github.com/chidiwilliams/buzz/releases) 접속
2. 내 운영체제에 맞는 파일 선택
   - Windows: `.exe` 파일
   - macOS: `.dmg` 파일 (Apple Silicon)
   - Linux: `.AppImage` 또는 Flatpak
3. 파일 다운로드

**2단계 — 설치**

내려받은 파일을 실행합니다. Windows는 설치 마법사를 따라가면 됩니다. macOS는 .dmg를 열어 앱을 응용 프로그램 폴더로 드래그합니다.

**3단계 — 첫 실행**

Buzz를 실행합니다.

- **실시간 받아쓰기**: `New Recording` → 마이크 선택 → Whisper 모델 선택 → `Record`
- **파일 변환**: `New Transcription` → 오디오·영상 파일 열기 → `Transcribe`

처음 실행 시 마이크 권한을 허용합니다. Whisper 모델은 첫 변환 시 자동으로 내려받습니다. 텍스트 변환이 끝나면 `Export`로 TXT나 SRT 파일로 저장하거나 그대로 복사해 사용합니다.

### 자주 묻는 질문

**Q. 한국어 음성 인식이 잘 되나요?**  
A. Whisper가 99개 언어를 지원해 한국어 인식이 가능합니다. 조용한 환경에서 마이크를 가까이 두면 인식률이 높아집니다.

**Q. Zoom이나 구글 미트 회의에도 쓸 수 있나요?**  
A. 됩니다. 시스템 오디오를 캡처하도록 설정하면 온라인 회의 소리도 받아쓰기가 가능합니다.

**Q. 회의 요약은 어떻게 받나요?**  
A. Buzz가 만든 텍스트를 복사해 ChatGPT 무료 버전에 붙여넣고 "이 회의록을 요약해줘"라고 입력하면 됩니다.

---

회의 끝나고 회의록 작성에 30분을 더 쓰는 게 아깝다면, 오늘 한 번 시도해볼 만합니다.

> **(주)비젼솔루션 AI 솔루션 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)


<!-- related-links -->

## 함께 보면 좋은 글

- [엔비디아 무료 AI — 설치 없이 5분에 계약서 검토](/blog/nvidia-nemotron-lightning-free-ai-sme-guide)
- [AI가 실수하는 이유 4가지 — 5분 무료 해결법](/blog/karpathy-claude-md-ai-4rules-guide)
- [14MB AI로 공장·매장 자동화 — 설치비 0원](/blog/needle2-offline-ai-14mb-guide)
