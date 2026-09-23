---
title: "AI 도구가 파일 몰래 업로드 — 5분 안전 점검법"
date: "2026-09-24"
tag: "보안 경고"
tags: "AI 보안,중소기업 AI,오픈소스 AI,AI 도구 선택,Continue.dev"
image: "/images/blog/zcode-ai-tool-security-continue-dev-sme-guide.svg"
summary: "중국 AI 코딩 도구 ZCode가 동의 없이 프로젝트 전체(깃 히스토리 포함)를 313MB 암호화 파일로 묶어 외부 클라우드에 올리려 한 사실이 드러났습니다. AI 도구 도입을 검토하는 중소기업이 지금 바로 확인해야 할 5가지 체크리스트와 무료 로컬 대안 Continue.dev 실습 가이드."
---

AI 도구 하나 설치했을 뿐인데, 회사 코드가 통째로 중국 클라우드에 올라갈 뻔했습니다.

2026년 9월, 한 개발자가 노트북 디스크 공간을 정리하다 이상한 파일을 발견했습니다. ZCode라는 AI 코딩 도구의 폴더가 700MB 넘게 차지하고 있었고, 그 안에 회사 프로젝트 파일 4만 2천여 개를 암호화해 묶은 313MB짜리 파일이 있었습니다. 기록을 보니 이 파일을 알리바바 클라우드 저장소로 564번이나 올리려다 실패한 상태였습니다. 동의를 구한 적은 없었습니다.

## ZCode 사건, 정확히 무슨 일이 있었나

ZCode는 중국 AI 기업 Z.ai가 만든 코딩 보조 도구입니다. VS Code 같은 편집기에 설치해서 쓰는 방식으로, AI가 코드 작성과 수정을 도와줍니다.

사건은 9월 18일 개발자 ferstar가 분석 글을 공개하면서 알려졌습니다. ZCode가 사용자 동의 없이 전체 깃(Git) 히스토리를 포함한 작업 폴더를 암호화해 알리바바 클라우드 저장소로 보내도록 만들어져 있었다는 내용입니다. 313MB 파일은 용량 제한에 걸려 끝내 올라가지 못했지만, 같은 방식으로 만든 작은 저장소(약 15KB)는 서버가 받아들였습니다. 그 이전에 다른 파일이 올라갔는지는 확인할 수 없다고 발견자는 밝혔습니다. Z.ai는 9월 21일 이 기능을 고친 새 버전(v3.14.0)을 내고, 같은 날 소스코드를 GitHub에 공개했습니다.

![ZCode 사건 타임라인](/images/blog/zcode-ai-tool-security-continue-dev-sme-guide-fig1.svg)
*▲ ZCode 사건 타임라인 · 출처: ferstar 분석 글, The Next Web (2026년 9월)*

Z.ai는 사과하고 수정 버전을 냈으며 소스코드도 공개했습니다. 외부 점검에서는 해당 클라우드 저장소가 비어 있는 것으로 확인됐지만, 발견자는 "지웠다는 주장은 지운 당사자의 말에 기댈 뿐"이라고 지적했습니다. 개발자 커뮤니티의 반응도 싸늘했습니다. 성공했든 실패했든, 동의 없이 회사 코드를 외부로 보내려 한 것 자체가 문제였으니까요.

![center](/mascot/md/emotion/cat_worried.webp)

코딩 도구를 아예 쓰지 않는 회사라면 상관없는 얘기처럼 들릴 수 있습니다. 그런데 지금 직원들이 업무에 쓰는 AI 도구가 ZCode뿐일까요? AI 요약 도구, AI 번역 플러그인, AI 미팅 기록 도구. 이런 것들이 회사 내부 자료를 어디로 보내는지 확인해 본 적 있으신가요?

## AI 도구 설치 전, 지금 바로 확인할 5가지

이미 사용 중인 도구가 있다면 오늘 바로 점검하세요. 아직 도입 전이라면 아래 다섯 가지를 설치 전 체크리스트로 쓰시면 됩니다.

![center](/mascot/md/emotion/cat_thinking.webp)

**① 개인정보처리방침에 '데이터 수집' 항목을 확인하세요**

"we may collect", "로그를 수집합니다", "서비스 개선 목적으로 활용" 같은 문구가 있다면, 실제로 무엇을 얼마나 수집하는지 더 따져봐야 합니다. 5분이면 읽을 수 있습니다.

**② 데이터가 어느 나라 서버를 거치는지 확인하세요**

EU 서버는 GDPR, 미국 서버는 미국법, 중국 서버는 중국 사이버보안법의 적용을 받습니다. 중국법에는 정부 요청 시 데이터 제공 의무 규정이 있습니다. 서버 위치가 중요합니다.

**③ 인터넷을 차단해도 기본 기능이 돌아가는지 확인하세요**

오프라인에서도 동작하는 도구라면, 그 기능은 외부로 데이터를 보내지 않는 것입니다. 인터넷이 끊기는 즉시 사용 불가라면, 클라우드 서버 의존도가 높은 도구입니다.

**④ 네트워크 모니터로 실제 전송 여부를 직접 보세요**

Windows는 `작업 관리자 > 성능 > 리소스 모니터 > 네트워크` 탭에서, Mac은 터미널에서 `lsof -i` 명령으로 어떤 앱이 어디로 통신하는지 확인할 수 있습니다. ZCode 사건의 발견자는 디스크 정리 중 AI 도구 폴더가 이상하게 큰 것을 보고 의심을 시작했습니다. 용량이 비정상적으로 큰 AI 도구 폴더도 점검 신호입니다.

**⑤ 오픈소스이거나 독립 보안 감사 보고서가 있는지 확인하세요**

소스코드가 공개된 도구는 제3자가 직접 코드를 검증할 수 있습니다. 비공개 도구라면 독립적인 보안 감사(security audit) 보고서가 있는지 찾아보세요.

## Continue.dev — 코드를 내 PC 밖으로 보내지 않는 무료 AI 코딩 도우미

AI 코딩 도우미를 쓰고 싶지만 데이터 유출이 걱정된다면, 지금 바로 쓸 수 있는 대안이 있습니다. Continue.dev입니다.

![center](/mascot/md/service/cat_svc_hacker.webp)

Continue.dev는 VS Code와 JetBrains(IntelliJ, PyCharm 등)에서 동작하는 오픈소스 AI 코딩 도우미입니다. GitHub에 소스코드가 모두 공개되어 있고, 내 PC나 회사 내부 서버의 AI 모델과 연결해 쓸 수 있습니다. 로컬 모델로 연결하면 코드가 외부 AI 서버로 나가지 않습니다. 다만 공식 문서는 인터넷 없이 쓰려면 설정에서 익명 사용 통계(Allow Anonymous Telemetry)를 끄라고 안내하니, 설치 후 이 설정도 꼭 확인하세요. Apache-2.0 라이선스라 상업적으로도 무료입니다.

**VS Code 기준 5분 설치 가이드:**

1. VS Code를 열고 확장 탭(Ctrl+Shift+X)에서 `Continue` 검색 후 설치
2. 왼쪽 사이드바에 Continue 아이콘이 나타나면 클릭
3. 첫 실행 시 모델 선택 화면에서 **"Local Models"** 탭 선택
4. [ollama.com](https://ollama.com)에서 Ollama를 내 PC에 설치 → Continue.dev가 자동 연결
5. 설정에서 **Allow Anonymous Telemetry**(익명 사용 통계)를 끄기
6. 코드 편집 화면에서 **Ctrl+I**를 누르면 AI 코딩 도우미 활성화

![Continue.dev 로컬 설치 흐름](/images/blog/zcode-ai-tool-security-continue-dev-sme-guide-fig2.svg)
*▲ Continue.dev 로컬 AI 코딩 설정 3단계 · 출처: continue.dev 공식 문서*

솔직하게 말씀드리면, 클라우드 기반 코딩 AI보다 응답 속도는 느립니다. RAM 16GB 이상 PC라면 Llama 3 8B 정도 모델을 로컬에서 무리 없이 돌릴 수 있고, 코드 자동완성·오류 설명·리팩터링 수준은 실무에 충분합니다. 다만 GitHub Copilot이나 클라우드 서비스의 최신 대형 모델 품질을 기대하시면 차이가 느껴질 수 있습니다.

| 항목 | Continue.dev (로컬) | 클라우드 AI 도구 |
|------|-------------------|--------------|
| 비용 | 무료 | 유/무료 혼용 |
| 데이터 외부 전송 | 로컬 모델 사용 시 없음 (통계 설정 확인) | 있음 |
| 응답 속도 | PC 사양에 따라 다름 | 빠름 |
| 오프라인 동작 | 가능 (로컬 모델 설정 시) | 불가 |
| 오픈소스 | 완전 공개 | 대부분 비공개 |

회사 내부 코드베이스를 AI에 학습시키거나 사내 시스템과 연결하는 고급 설정은 기술 담당자나 외부 전문가의 도움이 필요합니다.

AI 도구 선택은 결국 "편리함과 통제권의 교환"입니다. 클라우드 AI는 빠르고 강력하지만, 코드와 문서가 외부 서버를 거치는 것이 전제 조건입니다. 로컬 AI는 세팅이 필요하고 느릴 수 있지만, 회사 데이터가 밖으로 나가지 않습니다. 어느 쪽이 맞는지는 다루는 데이터의 민감도에 달려 있습니다. 계약서, 고객 개인정보, 내부 코드를 AI에게 보여줄 때마다 "이게 어디에 저장되는가?"를 한 번씩 물어보는 습관 — 그것이 작은 회사일수록 더 중요합니다. — (주)비젼솔루션

![center](/mascot/md/emotion/cat_cheer.webp)

Continue.dev GitHub: [https://github.com/continuedev/continue](https://github.com/continuedev/continue)

> **정정 (2026-09-24)**: 처음 발행한 글에는 313MB 파일이 실제로 전송됐다는 표현, 사건 발견 경위와 날짜, 출처를 확인할 수 없는 Z.ai 해명 인용, Continue.dev 라이선스(MIT → Apache-2.0)에 오류가 있어 바로잡았습니다. 근거: [ferstar 분석 글](https://blog.ferstar.org/en/posts/zcode-silent-workspace-snapshot-upload/), [The Next Web](https://thenextweb.com/news/zai-zcode-open-source-commit-history-security-assessment), [Continue 오프라인 가이드](https://docs.continue.dev/guides/running-continue-without-internet)

> **Vision Solution AI 솔루션 문의**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)
