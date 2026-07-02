---
title: "AI로 Gmail·드라이브 자동화 — MCP 5분 시작"
date: "2026-06-14"
tag: "AI 활용"
tags: "AI 활용,AI 솔루션,업무 자동화"
image: "/images/blog/mcp-gmail-google-drive-ai-automation.svg"
summary: "MCP(Model Context Protocol)로 Claude·ChatGPT가 내 Gmail·Google Drive에 직접 접근합니다. 코딩 없이 5분 안에 설치하는 무료 오픈소스 가이드, 이메일 정리·문서 비교·캘린더 연동 시나리오까지 정리했습니다."
---

오후 5시, 직원이 물었습니다.

"오늘 계약 관련 메일 중에 결재 필요한 거 있어요?"

받은편지함 150개. 하나씩 열어봅니다. 20분이 사라집니다.

그런데 이 질문을 **AI에게 그대로 물어볼 수 있는 방법**이 생겼습니다. Gmail에 직접 들어간 AI가 3초 만에 골라냅니다. 드라이브에 있는 계약서 3개를 비교해달라는 것도 됩니다. 코딩은 없습니다. 설치는 5분입니다.

기술 이름은 MCP(Model Context Protocol). 지금 중소기업에서 가장 빠르게 퍼지는 AI 연결 표준입니다.

> **AI로 업무 자동화를 시작하고 싶다면:**  
> 💡 [무료 상담 신청 — (주)비젼솔루션](https://www.visionc.co.kr/ai-solution)

---

## AI에게 USB 꽂듯 내 업무 도구를 연결한다

AI는 원래 "대화"만 합니다. 물어보면 학습된 지식으로 답하죠. 내 이메일은, 내 드라이브 파일은 들여다보지 못합니다. 그래서 매번 복사해서 붙여넣어야 했습니다.

MCP는 그 번거로움을 끊어냅니다.

쉽게 말하면 **AI판 USB 허브**입니다. 예전엔 프린터·마우스·카메라마다 다른 연결선이 필요했습니다. USB가 생기면서 하나의 규격에 전부 꽂을 수 있게 됐죠. MCP가 AI 세계에서 같은 역할을 합니다.

![center](/mascot/md/emotion/cat_happy.webp)

MCP 서버를 한 번 설치하면, Claude나 ChatGPT가 Gmail을 직접 읽고, Drive 파일을 검색하고, Calendar 일정을 확인합니다. 내가 보내는 것이 아닙니다. AI가 직접 꺼내 옵니다.

Anthropic이 2024년 말 공개한 이 프로토콜은 2026년 Linux Foundation에 이관되면서 산업 표준이 됐습니다. OpenAI와 Anthropic 모두 지원합니다. 어느 AI를 써도 같은 방법으로 연결됩니다.

![MCP 작동 원리 — AI가 MCP를 통해 업무 도구에 접근](/images/blog/mcp-gmail-google-drive-ai-automation-fig1.svg)
*▲ MCP 작동 원리 · 출처: modelcontextprotocol.io*

---

## 지금 바로 쓸 수 있는 무료 도구 2가지

![center](/mascot/md/emotion/cat_thinking.webp)

2026년 기준으로 GitHub에 등록된 MCP 서버는 10,000개를 넘습니다. 이 중 Google Workspace(Gmail·Drive·Docs·Sheets·Calendar)를 묶어서 연결하는 도구는 두 가지가 실전에서 검증돼 있습니다.

### 1. google-docs-mcp (무료, MIT 라이선스)

**GitHub**: [github.com/a-bonus/google-docs-mcp](https://github.com/a-bonus/google-docs-mcp)

Gmail, Google Drive, Docs, Sheets, Calendar를 한 번에 연결합니다. Claude Desktop **무료 플랜**에서 동작합니다. 특별한 서버 사양이 필요 없습니다. 처리는 클라우드에서 하기 때문에 노트북도 충분합니다.

**필요한 것:**
- PC 또는 Mac (RAM·GPU 조건 없음)
- Claude Desktop 앱 (무료 설치)
- Google 계정 + Google Cloud API 자격증명 (설정 10~15분)
- Node.js 18 이상 (무료 설치)

**장단점 비교:**

| 구분 | 내용 |
|------|------|
| ✅ 장점 | 완전 무료, Claude 무료 플랜 가능, Gmail·Drive 통합 연결 |
| ⚠️ 단점 | Google Cloud Console에서 API 활성화 과정 필요 (15분 내) |
| 🔄 대안 | [taylorwilsdon/google_workspace_mcp](https://github.com/taylorwilsdon/google_workspace_mcp) — 같은 기능의 다른 오픈소스 |

### 2. Google 공식 Workspace MCP (구글 제공)

**공식 문서**: [developers.google.com/workspace/guides/configure-mcp-servers](https://developers.google.com/workspace/guides/configure-mcp-servers)

Google이 직접 만들고 유지하는 공식 서버입니다. 안정성과 업데이트 속도가 빠릅니다. 단, **Claude Pro(유료, $20/월) 또는 Gemini Advanced**와 연동해야 합니다. 비용 없이 시작하려면 위의 google-docs-mcp를 먼저 써보는 걸 권합니다.

> **두 선택지 요약**: 무료로 시작 → google-docs-mcp / 안정성 우선 → Google 공식

![MCP 도구 핵심 수치](/images/blog/mcp-gmail-google-drive-ai-automation-fig2.svg)
*▲ MCP 주요 현황 · 출처: GitHub MCP 커뮤니티, modelcontextprotocol.io (2026)*

---

## 우리 회사에서 이렇게 쓴다 — 3가지 실무 시나리오

이론보다 구체적 상황이 더 와닿습니다. 중소기업 실무에서 즉시 적용 가능한 시나리오 3개입니다.

**시나리오 ① — 이메일 정리**

```
"오늘 받은 메일 중에서 미결 사항이 있는 것만 골라 요약해줘."
```

AI가 받은편지함을 직접 읽고, 결재·마감·견적 키워드가 담긴 메일을 추려 요약합니다. 150개 메일을 20분 뒤지던 일이 질문 한 줄로 끝납니다. 특정 발신자 메일만 추리거나, 이번 주 안에 답장해야 할 것만 뽑는 것도 됩니다.

**시나리오 ② — 드라이브 계약서 비교**

```
"드라이브에서 A업체, B업체, C업체 계약서 꺼내서
납품 조건이랑 위약금 항목 비교해줘."
```

파일을 열고, 복사하고, 붙여넣고, 표 만드는 30분 작업이 사라집니다. AI가 세 파일을 동시에 열어 조건을 표로 정리해 줍니다. 폴더 안 파일 목록 전체를 알고 싶다면 그것도 됩니다.

**시나리오 ③ — 캘린더 + 이메일 연동**

```
"다음 주 거래처 미팅 일정 확인하고,
참석자한테 보낼 사전 자료 요청 메일 초안 써줘."
```

캘린더를 보고, 참석자 이름을 확인하고, Gmail 초안을 작성합니다. 지금까지 세 번 앱을 왔다갔다 해야 했던 일을 AI가 한 번에 처리합니다.

![center](/mascot/md/emotion/cat_surprised.webp)

내 데이터를 매번 복사해 AI에게 넘기던 방식에서, AI가 내 업무 공간에 직접 들어와 처리하는 방식으로 바뀝니다. 이 차이가 생각보다 큽니다.

---

## (주)비젼솔루션이 보는 MCP의 본질

도구가 AI를 영리하게 만드는 게 아닙니다. AI가 접근할 수 있는 **정보**가 영리함을 결정합니다.

지금까지 AI는 "학습된 것"만 알았습니다. 내 회사 계약서, 내 메일함, 내 캘린더 일정을 모른 채로 "일반적인 답"만 했습니다. MCP는 그 경계를 없앱니다. 이제 AI는 내 업무 맥락을 알고 답합니다.

대기업은 이미 사내 IT팀이 내부 시스템에 AI를 붙이고 있습니다. MCP는 그 문턱을 코딩 없이 낮춥니다. 중소기업도 같은 방식으로 시작할 수 있는 시대입니다. — (주)비젼솔루션

---

## 5분 실습 — google-docs-mcp 설치하기

초보자가 막힘 없이 따라할 수 있게 순서대로 정리했습니다.

**준비물**: Windows PC 또는 Mac, 인터넷 연결, Google 계정

**1단계 — Claude Desktop 설치**

[claude.ai/download](https://claude.ai/download)에서 무료로 설치합니다. 회원가입 후 무료 플랜으로 시작 가능합니다.

**2단계 — Node.js 설치**

[nodejs.org](https://nodejs.org)에서 LTS 버전을 내려받아 설치합니다.

```bash
# 터미널(명령 프롬프트)에서 확인
node --version
# v18.xx.x 이상이 나와야 합니다
```

**3단계 — google-docs-mcp 다운로드**

```bash
git clone https://github.com/a-bonus/google-docs-mcp.git
cd google-docs-mcp
npm install
```

**4단계 — Google API 연동** (15분 소요)

1. [console.cloud.google.com](https://console.cloud.google.com)에 접속
2. 새 프로젝트 만들기
3. "API 및 서비스 > 라이브러리"에서 Gmail API, Drive API, Google Calendar API 각각 활성화
4. "OAuth 2.0 클라이언트 ID" 생성 → `credentials.json` 다운로드
5. 다운로드한 파일을 `google-docs-mcp/` 폴더 안에 넣기

**5단계 — Claude Desktop 설정 파일 수정**

Claude Desktop 설정 파일(`claude_desktop_config.json`)에 아래 내용을 추가합니다.

```json
{
  "mcpServers": {
    "google-docs": {
      "command": "node",
      "args": ["/여기에/절대경로/google-docs-mcp/src/index.js"],
      "env": {
        "CREDENTIALS_PATH": "/여기에/절대경로/google-docs-mcp/credentials.json"
      }
    }
  }
}
```

파일 위치는 Mac의 경우 `~/Library/Application Support/Claude/`, Windows는 `%APPDATA%\Claude\`입니다.

**6단계 — Claude Desktop 재시작**

Claude Desktop을 완전히 종료 후 다시 엽니다. 채팅창 하단에 🔌 연결 아이콘이 보이면 성공입니다.

이제 이렇게 질문해보세요:

```
오늘 받은 메일 중에서 미결 사항이 있는 것만 요약해줘.
```

![center](/mascot/md/emotion/cat_cheer.webp)

---

## 자주 묻는 질문

**Q. Claude 유료 플랜이 꼭 필요한가요?**  
google-docs-mcp는 Claude Desktop **무료 플랜**에서 작동합니다. 다만 장시간 대용량 문서 처리는 Pro 플랜($20/월)이 안정적입니다.

**Q. 내 이메일 내용이 외부로 새어나가지 않나요?**  
Claude는 대화 내용을 학습에 사용하지 않도록 설정 가능합니다. Google API 연동은 본인 계정 자격증명을 사용하므로 제3자 서버를 경유하지 않습니다. 민감한 데이터 처리 전 Claude 개인 정보 설정을 먼저 확인하세요.

**Q. ChatGPT에서도 같은 방식으로 쓸 수 있나요?**  
네. MCP는 OpenAI도 공식 지원합니다. ChatGPT Desktop 앱에서 동일하게 MCP 서버를 연결할 수 있습니다.

---

> **내 시스템에 맞는 AI 업무 자동화를 구성하고 싶다면:**  
> 사내 DB 연동, 직원 맞춤 AI 워크플로 설계는 전문 설정이 필요합니다.  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)
