---
title: "AI가 엑셀·워드 직접 편집 — 3분 설치 무료"
date: "2026-07-10"
tag: "AI 솔루션"
tags: "사무 자동화,OfficeCLI,AI 도구,엑셀 자동화,오피스 자동화"
image: "/images/blog/officecli-ai-excel-word-edit-free-guide.svg"
summary: "ChatGPT한테 엑셀 수정 시켰더니 못 한다고 한 경험 있으세요? OfficeCLI로 AI가 .docx·.xlsx·.pptx를 직접 편집합니다. GitHub 별 1.3만 개, Office 설치 없이 3분이면 충분합니다."
---

AI한테 엑셀 파일 고쳐 달라고 했더니 이런 말 받아본 적 있으시죠?

**"죄송합니다, 저는 파일을 직접 열거나 수정할 수 없습니다."**

그래서 결국 본인이 직접 다시 열어서 수정했을 겁니다. 이 경험이 있다면, OfficeCLI를 알면 반응이 달라집니다.

---

## AI가 엑셀을 못 고치는 진짜 이유

![center](/mascot/md/emotion/cat_thinking.png)

ChatGPT든 Claude든, Office 파일을 못 만지는 건 능력 문제가 아닙니다. 파일 시스템에 직접 접근할 "손"이 없기 때문입니다.

AI는 두뇌는 있는데 손이 없는 상황입니다. 엑셀 내용을 말로 설명하면 수정 방법은 알려주지만, 파일을 직접 열어서 고치는 건 못 합니다. 플러그인이나 도구가 연결되지 않은 채 출시됐으니까요.

OfficeCLI는 이 빈틈을 정확히 겨냥했습니다. AI 에이전트가 명령을 내리면, OfficeCLI가 실제 파일을 열고 내용을 바꾸고 저장합니다. Claude Desktop에 MCP(Model Context Protocol) 방식으로 연결하면 AI가 직접 Office 파일을 다루는 작업이 가능해집니다.

**OfficeCLI를 한 줄로 정의하면:** AI 에이전트가 Word·Excel·PowerPoint 파일을 자동으로 읽고 편집할 수 있게 설계된 오픈소스 커맨드라인 도구입니다.

그럼 실제로 쓸 수 있는 도구인지 확인해 보겠습니다.

---

## OfficeCLI — 지금 바로 쓸 수 있는 무료 도구

GitHub 주소: [https://github.com/iOfficeAI/OfficeCLI](https://github.com/iOfficeAI/OfficeCLI)

2026년 3월 출시됐고, 2026년 7월 10일 기준 GitHub 별 **13,808개**, 포크 937개입니다. Apache 2.0 라이선스라 무료로 쓸 수 있고, 상업 이용도 가능합니다. 최신 버전은 v1.0.135입니다.

![OfficeCLI 핵심 지표](/images/blog/officecli-ai-excel-word-edit-free-guide-fig1.svg)
*▲ OfficeCLI 핵심 지표 · 출처: GitHub iOfficeAI/OfficeCLI (2026-07-10 기준)*

### 지원 기능

| 항목 | 내용 |
|------|------|
| 지원 파일 형식 | .docx (Word), .xlsx (Excel), .pptx (PowerPoint) |
| 설치 방법 | npm, Homebrew, curl 스크립트, Scoop |
| 운영체제 | Windows, macOS, Linux (x64 및 ARM64) |
| Microsoft Office 필요 여부 | 불필요 (단일 바이너리, 내장 런타임) |
| Excel 함수 지원 | 350개 이상 자동 계산 |
| AI 연동 방식 | MCP 서버 (Claude, Cursor 등) |
| 라이선스 | Apache 2.0 — 무료·상업이용 가능 |

### 솔직한 장단점과 대안 비교

**잘하는 것:**
- Office 설치 없이 .docx·.xlsx·.pptx를 읽고 쓴다
- 단일 바이너리라 설치가 간단하고, 서버·Docker 환경에서도 돌아간다
- Claude·Cursor에 MCP로 바로 연결되고, JSON 출력이 기본이라 AI 친화적이다

**못하는 것:**
- Excel VBA 매크로 실행은 지원하지 않는다
- 정교한 서식(조건부 서식, 복잡한 차트)은 원본과 미세하게 달라질 수 있다
- 2026년 3월 출시된 신생 도구라 일부 엣지케이스에서 버그가 있을 수 있다

**다른 선택지와 비교:**

| 도구 | 무료 | AI 연동 | Office 불필요 | 난이도 |
|------|------|---------|-------------|------|
| OfficeCLI | ✅ | ✅ MCP | ✅ | 낮음 |
| python-docx / openpyxl | ✅ | 직접 연결해야 함 | ✅ | 높음 (Python 코딩 필요) |
| Microsoft Graph API | ❌ (Azure 비용) | ✅ | ✅ | 높음 |
| LibreOffice | ✅ | ❌ | ✅ | 중간 |

AI 연동 없이 간단한 파일 조작만 필요하면 python-docx도 충분합니다. AI가 직접 파일을 편집하게 하려면 OfficeCLI가 현재 가장 쉬운 경로입니다.

---

## 중소기업에서 쓰는 방법 — 실제 시나리오

![center](/mascot/md/emotion/cat_happy.png)

### 시나리오 1 — 월간 보고서 자동 생성

영업팀이 매달 실적 데이터를 엑셀에 입력합니다. 지금까지는 관리자가 그 데이터를 보고용 Word 파일로 직접 옮겼습니다. OfficeCLI + AI 조합이면:

1. AI가 `sales.xlsx`에서 해당 월 실적을 읽는다
2. `보고서_template.docx`의 지정 위치에 자동으로 채워 넣는다
3. `보고서_2026_07.docx`로 저장한다

### 시나리오 2 — 계약서 자동 완성

거래처마다 조금씩 다른 계약서를 매번 복붙해서 만들던 작업입니다. OfficeCLI의 template merge 기능을 쓰면 간단합니다.

계약서 `template.docx`에 `{{company}}`, `{{amount}}`, `{{period}}` 자리를 만들어 두고, 거래처 데이터 JSON을 넘기면 파일이 자동 생성됩니다. 실수도 줄고 시간도 줄어듭니다.

### 시나리오 3 — PPT 수치 자동 업데이트

제품 소개 PPT를 분기마다 수치만 바꾸는 작업입니다. AI가 최신 수치가 담긴 엑셀을 읽고, PPT 슬라이드의 해당 텍스트를 자동 교체합니다.

세 가지 시나리오 모두 코딩 경험 없이도 Claude Desktop + OfficeCLI MCP 설정으로 시작할 수 있습니다.

> **(주)비젼솔루션 관점:** AI가 Office 파일을 못 만진다는 건 사실 "설계 선택"의 결과였습니다. ChatGPT는 웹 서비스라 로컬 파일에 접근할 권한이 없고, 파일 조작 도구를 연결하지 않은 채 출시됐습니다. OfficeCLI는 이 빈틈을 정확히 겨냥했습니다. 도구가 없어서 못 했던 일들이 이제 도구가 생겼으니, AI 도입을 고민하는 회사라면 이 지점부터 다시 검토해볼 만합니다.*

---

## 3분 실습 — 지금 바로 설치하기

![center](/mascot/md/emotion/cat_cheer.png)

### 설치 요구사항

- OS: Windows 10+, macOS 10.15+, Linux (x64 또는 ARM64)
- Microsoft Office: 불필요 (내장 런타임 포함)
- 별도 의존성: 없음

![AI + OfficeCLI 작동 방식](/images/blog/officecli-ai-excel-word-edit-free-guide-fig2.svg)
*▲ OfficeCLI 작동 흐름 · 출처: OfficeCLI README (github.com/iOfficeAI/OfficeCLI)*

### 설치 방법 (3가지 중 선택)

**① npm (Node.js가 설치되어 있으면)**
```bash
npm install -g @officecli/officecli
```

**② Homebrew (Mac 사용자)**
```bash
brew install officecli
```

**③ 자동 설치 스크립트 (Mac/Linux)**
```bash
curl -fsSL https://raw.githubusercontent.com/iOfficeAI/OfficeCLI/main/install.sh | bash
```

**Windows PowerShell:**
```powershell
irm https://raw.githubusercontent.com/iOfficeAI/OfficeCLI/main/install.ps1 | iex
```

### 기본 명령어 (복붙 후 바로 실행)

**1단계 — 설치 확인**
```bash
officecli --version
```

**2단계 — 엑셀 파일 셀 내용 읽기**
```bash
officecli get 내파일.xlsx /sheet[1]/cell[A1] --json
```

**3단계 — 워드 파일 내용 수정**
```bash
officecli set 내파일.docx '/body/para[1]' --prop text="수정할 내용 입력"
```

**4단계 — 템플릿에 데이터 채우기**
```bash
officecli merge template.docx output.docx '{"name":"홍길동","amount":"500만원"}'
```

**5단계 — 파일 브라우저 미리보기**
```bash
officecli watch 내파일.xlsx
```
위 명령 실행 후 브라우저에서 `http://localhost:26315` 접속하면 파일 내용이 시각적으로 표시됩니다.

### Claude Desktop에 MCP로 연결하려면

Claude Desktop이 설치되어 있다면 OfficeCLI를 MCP 서버로 연결해 Claude가 직접 Office 파일을 편집하게 할 수 있습니다. 자세한 설정은 [공식 GitHub의 MCP 섹션](https://github.com/iOfficeAI/OfficeCLI)을 참고하세요.

---

### 자주 묻는 질문

**Q. Microsoft Office가 없어도 되나요?**  
네. OfficeCLI는 Office와 완전히 독립된 단일 바이너리입니다. Office 없이 .docx·.xlsx·.pptx를 읽고 씁니다.

**Q. 무료로 회사 업무에 써도 되나요?**  
Apache 2.0 라이선스입니다. 무료·상업 이용·수정·재배포 모두 가능합니다.

**Q. Excel 매크로(VBA)도 실행되나요?**  
VBA 매크로 실행은 지원하지 않습니다. 수식(함수)은 350개 이상 지원합니다.

---

> **AI 사무 자동화 도입이 막막하다면**:  
> 📧 biztalktome@gmail.com  
> 🌐 [https://www.visionc.co.kr/ai-solution](https://www.visionc.co.kr/ai-solution)
