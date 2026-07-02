---
title: "AI 플러그인 70,000명 API 키 털렸다 — 30초 무료 점검법"
date: "2026-06-20"
tag: "보안 경고"
tags: "보안 경고,AI 활용,보안 점검,API 키 관리"
image: "/images/blog/jetbrains-ai-plugin-api-key-stolen-bumblebee-guide.svg"
summary: "2026년 6월, AI 코딩 도구로 위장한 JetBrains 악성 플러그인 15개가 70,000명의 ChatGPT·Claude API 키를 훔쳤습니다. 무료 오픈소스 스캐너 Bumblebee로 내 컴퓨터를 30초 안에 점검하는 방법을 알려드립니다."
---

"내 ChatGPT 요금이 갑자기 두 배가 됐어요."

지난달 이런 문의를 받은 건 처음이 아닙니다. API 키가 도난당하면 피해자가 쓰지도 않은 AI 사용 요금이 청구됩니다. 해커가 그 키로 밤새 GPT를 돌렸으니까요.

2026년 6월 16일, 보안 매체 BleepingComputer는 충격적인 사건을 보도했습니다. **JetBrains Marketplace에서 AI 코딩 도구로 위장한 악성 플러그인 15개가 발견됐고, 이 플러그인들은 총 70,000회 이상 설치됐습니다.** 설치한 개발자의 OpenAI, DeepSeek, Claude API 키를 조용히 훔쳐 해커 서버로 전송한 겁니다.

같은 주에는 npm 패키지 생태계에서도 `@mastra` 관련 패키지 144개에서 비슷한 백도어가 발견됐습니다.

> **지금 VSCode나 Cursor, JetBrains 계열 IDE를 쓰고 계신다면**, 이 글을 끝까지 읽어보세요.

![API 키 도난 피해 현황](/images/blog/jetbrains-ai-plugin-api-key-stolen-bumblebee-guide-fig2.svg)
*▲ 2026년 6월 JetBrains 악성 플러그인 사건 피해 현황 · 출처: BleepingComputer*

---

## API 키가 뭔데 훔쳐가는 걸까요?

![center](/mascot/md/emotion/cat_thinking.webp)

API 키란 쉽게 말하면 **ChatGPT·Claude·DeepSeek 같은 AI 서비스를 쓸 수 있는 비밀 암호**입니다.

우리가 편의점에서 물건을 살 때 신용카드를 꺼내듯, 개발자는 AI를 쓸 때 이 API 키를 제시합니다. 그리고 사용한 만큼 요금이 청구되죠.

문제는 이 키를 **누군가 훔쳐가면** 그 사람이 내 신용카드로 마음껏 AI를 쓸 수 있다는 겁니다. 피해는 두 가지로 나타납니다.

첫째, **예상치 못한 요금 폭탄**입니다. 해커는 훔친 키로 대량의 AI 요청을 보냅니다. OpenAI 계정에 갑자기 수십만 원짜리 청구서가 날아오는 경우가 실제로 발생했습니다.

둘째, **업무 데이터 유출**입니다. AI 플러그인은 코드를 분석하고 개선안을 제안하는 과정에서 내부 코드, 기획서, 고객 데이터를 처리하기도 합니다. 이 과정이 해커에게 노출될 수 있습니다.

![2026년 AI 보안 사건 타임라인](/images/blog/jetbrains-ai-plugin-api-key-stolen-bumblebee-guide-fig1.svg)
*▲ 2026년 5~6월 AI 개발 도구 공급망 공격 주요 사건 · 출처: BleepingComputer, MarkTechPost*

---

## 악성 플러그인은 어떻게 모르고 설치하게 됐을까?

![center](/mascot/md/emotion/cat_surprised.webp)

이번 사건이 특히 무서운 이유가 있습니다. 피해자들은 "유명한 AI 플러그인인 줄 알고 설치했다"고 말합니다.

악성 플러그인은 `AI Assistant Pro`, `DeepSeek Copilot`, `Claude Helper` 같은 이름으로 마켓플레이스에 올라왔습니다. 진짜 도구처럼 기능도 작동하는 것처럼 보였습니다. 그러면서 뒤에서는 조용히 API 키를 빼돌렸습니다.

JetBrains 마켓플레이스는 공식 마켓플레이스인데도 이런 일이 발생했다는 게 핵심입니다. "공식 스토어니까 안전하다"는 믿음이 깨진 셈입니다. VSCode Extension Marketplace, Cursor의 확장 기능도 같은 취약점을 갖고 있습니다.

그럼 어떻게 점검할 수 있을까요?

---

## Bumblebee — 30초 안에 내 컴퓨터 스캔하기

Perplexity AI가 2026년 5월 23일 오픈소스로 공개한 **Bumblebee**는 바로 이런 위협을 감지하기 위해 만들어진 도구입니다.

Bumblebee가 하는 일은 단순합니다. 내 컴퓨터에 설치된 npm 패키지, pip 패키지, Go 모듈, Ruby gem, VSCode/Cursor/Windsurf 확장 기능, MCP 서버의 **메타데이터를 읽어서 악성 여부를 판별**합니다. 코드를 실행하거나 서버에 데이터를 보내지 않기 때문에 그 자체로는 안전합니다.

**지원 환경:** macOS, Linux / Apache 2.0 라이선스 (완전 무료)

**사용 가능한 스캔 대상:**
- npm, pip, Go, Ruby 패키지
- VSCode, Cursor, Windsurf 확장 기능
- MCP (Model Context Protocol) 서버

**솔직한 한계:** Bumblebee는 알려진 악성 패키지 데이터베이스를 기반으로 작동합니다. 데이터베이스에 등록되지 않은 최신 악성 도구는 잡아내지 못할 수 있습니다. 또한 Windows는 아직 지원하지 않습니다. Windows 사용자는 후술하는 수동 점검법을 활용하세요.

**다른 선택지와 비교:**

| 방법 | 비용 | 속도 | 커버리지 |
|------|------|------|---------|
| Bumblebee | 무료 | 30초 | npm/pip/VSCode 등 |
| 상용 EDR 솔루션 | 월 수만 원 | 실시간 | 포괄적 |
| 수동 확인 | 무료 | 수십 분 | 자신이 확인한 것만 |

---

## Bumblebee 설치 및 실행 (macOS/Linux 기준)

> 터미널(Terminal, 명령 프롬프트)을 처음 써보신다면, Mac에서는 `Command + Space`를 누른 뒤 "Terminal"을 검색해서 열면 됩니다.

**① Homebrew로 설치 (macOS 권장)**

```bash
brew install bumblebee
```

**② 또는 npm으로 설치**

```bash
npm install -g @perplexityai/bumblebee
```

**③ 스캔 실행**

```bash
bumblebee scan
```

실행하면 30초 내외로 결과가 나옵니다. 의심 패키지가 발견되면 빨간색으로 표시됩니다.

**④ VSCode 확장 기능만 따로 스캔할 때**

```bash
bumblebee scan --target vscode
```

**⑤ 전체 상세 결과 보기**

```bash
bumblebee scan --verbose
```

의심 항목이 발견되면 즉시 제거하고, 해당 AI 서비스의 API 키를 재발급받으세요. OpenAI는 platform.openai.com, Anthropic Claude는 console.anthropic.com에서 키 재발급이 가능합니다.

GitHub 저장소: [github.com/perplexityai/bumblebee](https://github.com/perplexityai/bumblebee)

---

## 중소기업 담당자라면 이렇게 적용하세요

![center](/mascot/md/emotion/cat_worried.webp)

직원이 업무용 PC에서 AI 도구를 쓰고 있다면, 아래 시나리오가 실제로 발생할 수 있습니다.

**홈페이지 제작·관리 담당자** 분이 VSCode에 "AI 코딩 어시스턴트"를 설치했다고 가정해봅시다. 그 플러그인이 악성이라면, 회사 코드베이스와 함께 ChatGPT API 키가 빠져나갑니다. 이후 회사 계정에 예상치 못한 AI 요금이 청구되고, 최악의 경우 고객 데이터가 포함된 코드가 외부로 유출됩니다.

실무 적용 방법은 세 단계입니다.

**지금 당장:** 직원 PC에서 `bumblebee scan` 실행. 10분이면 전 직원 PC를 한 번씩 돌릴 수 있습니다.

**정기 점검:** 월 1회 스캔을 습관으로 만드세요. 새 플러그인을 설치할 때마다 스캔하면 더 좋습니다.

**API 키 관리 기준 수립:** AI 서비스 API 키는 개인 계정이 아닌 회사 계정으로 발급하고, 분기마다 재발급하는 정책을 만드세요.

---

## API 키를 안전하게 관리하는 3가지 원칙

**원칙 1 — 키는 코드에 직접 넣지 않는다**

`.env` 파일이나 환경변수로 관리하고, GitHub 같은 공개 저장소에 절대 올리지 않습니다. 실수로 올렸다면 즉시 재발급해야 합니다.

**원칙 2 — 사용 내역을 주기적으로 확인한다**

OpenAI, Anthropic 등 AI 서비스 대시보드에는 API 사용 내역이 표시됩니다. 한 달에 한 번은 확인하는 습관을 들이세요. 갑자기 사용량이 급증했다면 키가 유출됐을 가능성이 있습니다.

**원칙 3 — 필요한 권한만 부여한다**

API 키를 발급할 때 사용 한도(월 예산 상한)를 설정하세요. 키가 탈취돼도 피해 규모를 제한할 수 있습니다. OpenAI는 월 사용 한도 설정 기능을 제공합니다.

![비젼솔루션 관점](/images/blog/jetbrains-ai-plugin-api-key-stolen-bumblebee-guide-fig3.svg)
*▲ AI 보안에 대한 (주)비젼솔루션의 관점*

---

## 마치며 — 도구는 믿되, 확인은 직접

AI 개발 도구의 편리함은 진짜입니다. 하지만 이번 사건은 "공식 마켓플레이스라도 맹목적으로 신뢰하면 안 된다"는 교훈을 남겼습니다.

Bumblebee 한 번 실행하는 데 30초입니다. API 키 재발급은 5분이면 됩니다. 그 5분이 수십만 원의 피해와 데이터 유출을 막을 수 있습니다.

![center](/mascot/md/emotion/cat_cheer.webp)

**오늘 바로 터미널 열고 `bumblebee scan` 한 번 실행해보세요.**

---

## 자주 묻는 질문

**Q. Windows도 Bumblebee를 쓸 수 있나요?**
A. 현재(2026년 6월 기준) macOS와 Linux만 지원합니다. Windows 사용자는 VSCode 확장 기능 목록을 직접 확인하거나, 설치된 확장의 publisher 정보가 공식 개발사인지 검색으로 확인하는 수동 방법을 사용하세요.

**Q. API 키가 도난당한 것 같은데 어떻게 확인하나요?**
A. OpenAI는 platform.openai.com → Usage, Anthropic Claude는 console.anthropic.com → Usage에서 사용 내역을 확인할 수 있습니다. 본인이 쓰지 않은 날짜나 시간대에 사용량이 있다면 즉시 키를 비활성화하고 재발급하세요.

**Q. Bumblebee가 악성으로 판정한 패키지가 있어요. 어떻게 하나요?**
A. 즉시 해당 패키지를 제거하고(`npm uninstall`, `pip uninstall` 등), 관련 API 키를 모두 재발급하세요. 회사 내 다른 PC도 함께 점검하는 것을 권장합니다.

---

> **Vision Solution AI 보안 점검 문의**:
> 📧 biztalktome@gmail.com
> 🌐 [https://www.visionc.co.kr/security](https://www.visionc.co.kr/security)
>
> Bumblebee 설치부터 API 키 관리 정책 수립, 직원 PC 보안 점검까지 한 번에 도와드립니다.
