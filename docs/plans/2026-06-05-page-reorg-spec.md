# visionc.co.kr 페이지 재구성 사양서
## "AI 솔루션" → "기업 AI 도입 및 컨설팅" 변경

**작성일:** 2026-06-05
**대상 페이지:** `/ai-solution`
**작업 범위:** 메뉴 라벨 변경 + 페이지 콘텐츠 재구성 (강좌 트랙 추가)

---

## 1. 변경 위치 체크리스트

### 1-1. 메뉴 라벨 변경 (6곳)

| # | 위치 | 변경 전 | 변경 후 |
|---|------|---------|---------|
| 1 | 헤더 > 서비스 드롭다운 | `AI 솔루션` | `기업 AI 도입 및 컨설팅` |
| 2 | 푸터 > 서비스 영역 | `AI 솔루션` | `기업 AI 도입 및 컨설팅` |
| 3 | 홈페이지 SERVICES 카드 (06번) | `AI 솔루션` | `기업 AI 도입 및 컨설팅` |
| 4 | 홈페이지 SERVICES 카드 설명 | `AI 챗봇·자동화·데이터 분석을 중소기업 규모에 맞게 도입합니다.` | `LLM·자율 에이전트 도입부터 사내 인프라 구축까지, 무료 강좌로 학습하고 컨설팅으로 실행합니다.` |
| 5 | 페이지 `<title>` | `중소기업 AI 솔루션 도입 \| Vision Solution` | `기업 AI 도입 및 컨설팅 — 무료 강좌 + 실행 컨설팅 \| Vision Solution` |
| 6 | 페이지 `<h1>` | `중소기업 AI 솔루션` | `기업 AI 도입 및 컨설팅` |

### 1-2. URL 처리
- 기존 URL `/ai-solution` **유지** (SEO 보존)
- 필요 시 `/enterprise-ai`로 별칭 추가 (canonical → `/ai-solution`)

---

## 2. 신규 페이지 콘텐츠 구조

```
[1] 히어로
    제목: 기업 AI 도입 및 컨설팅
    부제: 무료 강좌로 배우고, 컨설팅으로 실행합니다
    CTA-A: 무료 강좌 시작하기 → /ai-solution#academy
    CTA-B: 도입 컨설팅 신청 → /contact

[2] 두 갈래 진입 (NEW ⭐)
    A. "스스로 배우고 싶다" → 중소기업 AI 마스터플랜 무료 강좌
    B. "전문가 도움이 필요하다" → 도입 컨설팅·구축 서비스

[3] 중소기업 AI 마스터플랜 강좌 트랙 (NEW ⭐)
    코스 1: 부서별로 일하는 AI (15강)
    코스 2: 사내 AI 구축·운영 종합 가이드 (30강)

[4] 페인 포인트 (기존 유지 — "혹시 이런 상황이세요?")

[5] 실제 도입 사례 (기존 유지 — 4개)

[6] 솔루션 유형 6개 (기존 유지)

[7] 진행 프로세스 4단계 (기존 유지)

[8] 가격 3티어 (기존 유지)

[9] FAQ (기존 유지 + 강좌 관련 2개 추가)

[10] CTA (두 갈래)
     - 무료 강좌 시작 → /ai-solution#academy
     - 무료 도입 분석 신청 → /contact
```

---

## 3. 섹션별 콘텐츠 시안

### [1] 히어로 (변경)

```html
<section class="hero">
  <h1>기업 AI 도입 및 컨설팅</h1>
  <p class="lead">
    무료 강좌로 배우고, 컨설팅으로 실행합니다.<br>
    부서별 LLM 활용부터 사내 자체 에이전트 구축까지 — 중소기업에 맞춰 단계별로 안내합니다.
  </p>
  <div class="cta-group">
    <a href="#academy" class="btn-primary">🎓 무료 강좌 시작하기</a>
    <a href="/contact" class="btn-secondary">💼 도입 컨설팅 신청</a>
  </div>
  <p class="note">100만원대부터 시작 · 무료 진단 1시간 · 신용카드 불필요</p>
</section>
```

### [2] 두 갈래 진입 (신규)

```html
<section class="two-paths">
  <h2>두 가지 방법으로 시작하세요</h2>

  <div class="path-cards">
    <div class="path-card">
      <div class="icon">🎓</div>
      <h3>스스로 배우고 싶다</h3>
      <p>무료 공개 강좌로 우리 회사에 맞는 AI 도입 방법을 체계적으로 학습</p>
      <ul>
        <li>부서별 LLM 활용법 15강</li>
        <li>사내 AI 구축 종합 가이드 30강</li>
        <li>300+ 한국어 프롬프트 라이브러리</li>
        <li>수료증 발급</li>
      </ul>
      <a href="#academy" class="btn">강좌 둘러보기 →</a>
    </div>

    <div class="path-card recommended">
      <div class="badge">추천</div>
      <div class="icon">💼</div>
      <h3>전문가 도움이 필요하다</h3>
      <p>강좌 내용을 우리 회사에 직접 구축하고 운영하는 풀서비스 컨설팅</p>
      <ul>
        <li>도입 가능 영역 무료 진단 1시간</li>
        <li>맞춤 솔루션 설계 → 구축 → 인수인계</li>
        <li>사내 직원 교육 포함</li>
        <li>운영 후 30일 A/S</li>
      </ul>
      <a href="/contact" class="btn-primary">무료 진단 신청 →</a>
    </div>
  </div>
</section>
```

### [3] 중소기업 AI 마스터플랜 강좌 트랙 (신규)

```html
<section id="academy" class="academy-tracks">
  <div class="section-header">
    <span class="tag">중소기업 AI 마스터플랜</span>
    <h2>무료 강좌 트랙</h2>
    <p>중소기업에 특화된 한국어 LLM·에이전트 도입 종합 교육. 영상·워크북·프롬프트 라이브러리 모두 무료.</p>
  </div>

  <div class="course-cards">
    <!-- 코스 1 -->
    <div class="course-card">
      <div class="course-badge">COURSE 01 · 활용 트랙</div>
      <h3>부서별로 일하는 AI</h3>
      <p class="subtitle">중소기업 LLM 활용법 — 일반 직원·관리자 대상</p>
      <div class="course-meta">
        <span>📚 5편 15강</span>
        <span>⏱ 약 4시간</span>
        <span>🎯 도입 30일 안에 시간 30% 절감</span>
      </div>
      <ul class="curriculum">
        <li>1편. 기반 다지기 (2강)</li>
        <li>2편. 전 부서 공통 실전 활용 (3강)</li>
        <li>3편. 코어 부서 — 업종별 적용 (4강)</li>
        <li>4편. 지원 부서 (4강)</li>
        <li>5편. 수주형 비즈니스 통합 흐름 (2강)</li>
      </ul>
      <a href="/ai-solution/academy/dept-ai" class="btn">전체 커리큘럼 보기 →</a>
    </div>

    <!-- 코스 2 -->
    <div class="course-card highlight">
      <div class="course-badge">COURSE 02 · 구축 트랙</div>
      <h3>사내 AI 구축·운영 종합 가이드</h3>
      <p class="subtitle">자체 호스팅·에이전트·보안·운영 — IT 담당자·관리자 대상</p>
      <div class="course-meta">
        <span>📚 11편 30강</span>
        <span>⏱ 약 10시간</span>
        <span>🎯 90일 안에 사내 AI 인프라 1차 가동</span>
      </div>
      <ul class="curriculum">
        <li>1~4편. 인프라·모델·플랫폼 (11강)</li>
        <li>5~6편. 에이전트·하네스 엔지니어링 (6강) ⭐</li>
        <li>7편. 사내 에이전트 배포·운영 (4강) ⭐</li>
        <li>8편. 자체 에이전트 만들기 (2강)</li>
        <li>9~11편. 보안·백업·관리자 운영 (7강)</li>
      </ul>
      <a href="/ai-solution/academy/build-ai" class="btn">전체 커리큘럼 보기 →</a>
    </div>
  </div>

  <div class="academy-benefits">
    <h4>강좌 수강 시 제공</h4>
    <ul>
      <li>✓ 사내 AI 도입 청사진 PDF (30/100/300명 규모별)</li>
      <li>✓ RBAC 권한 매트릭스 템플릿</li>
      <li>✓ 하네스 표준 패키지 (settings.json + hooks + skills)</li>
      <li>✓ 부서별 프롬프트 라이브러리 300+개</li>
      <li>✓ 견적·8D·설계 RAG 에이전트 샘플 코드</li>
      <li>✓ 수료증 + 도입 진단 1시간 무료</li>
    </ul>
  </div>
</section>
```

### [4]~[8] 기존 콘텐츠 유지
- 페인 포인트, 도입 사례, 솔루션 유형, 프로세스, 가격 → 변경 없음
- 단, 솔루션 유형 카드 위에 다음 문구 추가:
  > "강좌만으로 부족하다면, 아래 영역을 직접 구축해드립니다."

### [9] FAQ 추가 (강좌 관련 2개)

```
Q. 강좌만 듣고 직접 구축하면 컨설팅 안 받아도 되나요?
A. 네, 무료 강좌만으로 충분히 1차 도입 가능합니다. 다만 설계도면·고객 데이터·MES 연동 등 보안·신뢰성이 중요한 영역은 컨설팅을 권합니다.

Q. 강좌 수강 후 컨설팅 받으면 할인되나요?
A. 강좌 수료증 보유 시 도입 진단 1시간이 무료로 제공되며, 본 컨설팅 계약 시 진단 결과 기준 10% 할인됩니다.
```

### [10] CTA (변경)

```html
<section class="bottom-cta">
  <h2>지금 시작하세요</h2>
  <div class="cta-group">
    <a href="#academy" class="btn-primary-lg">🎓 무료 강좌 시작</a>
    <a href="/contact" class="btn-secondary-lg">💼 무료 도입 진단 신청</a>
  </div>
  <p class="note">강좌·진단 모두 무료 · 신용카드 불필요</p>
</section>
```

---

## 4. 신규 라우팅 (서브 페이지)

```
/ai-solution                          ← 메인 (위 콘텐츠)
/ai-solution/academy/dept-ai          ← 코스 1 상세 + 15강 목록
/ai-solution/academy/dept-ai/01 ~ /15 ← 강의별 페이지
/ai-solution/academy/build-ai         ← 코스 2 상세 + 30강 목록
/ai-solution/academy/build-ai/01 ~ /30 ← 강의별 페이지
```

**강의 페이지 공통 컴포넌트:**
- YouTube 임베드 (16:9)
- 학습 목표·체크리스트
- "복붙 프롬프트 3종" 코드 박스
- PDF 워크북 다운로드 버튼
- 다음 강의 / 이전 강의 네비
- 상단 진행률 바 (localStorage 기반)
- 하단 CTA: "도입 진단 1시간 무료 신청"

---

## 5. SEO 메타데이터

```html
<title>기업 AI 도입 및 컨설팅 — 무료 강좌 + 실행 컨설팅 | Vision Solution</title>
<meta name="description" content="중소기업을 위한 LLM·에이전트 도입 종합 가이드. 무료 강좌 45강 + 도입 컨설팅 100만원대부터. Claude·OpenCode·Open WebUI·RAG·MCP 등 자율 에이전트 시대 대응.">
<meta name="keywords" content="중소기업 AI, 기업 AI 도입, 사내 AI 구축, LLM 자체 호스팅, Claude Code 기업, 부서별 AI 활용, AI 컨설팅, Open WebUI, RAG, MCP">

<meta property="og:title" content="기업 AI 도입 및 컨설팅 — 무료 강좌 + 실행 컨설팅">
<meta property="og:description" content="중소기업 부서별 LLM 활용부터 사내 자체 에이전트 구축까지. 무료 강좌 45강 + 컨설팅 100만원대~.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://visionc.co.kr/ai-solution">
```

---

## 6. 작업 순서 (Sprint 1: 06-05 ~ 06-10)

1. ☐ 메뉴 라벨 6곳 변경 (헤더·푸터·홈 SERVICES 카드)
2. ☐ `/ai-solution` 페이지 콘텐츠 교체
   - 히어로 + 두 갈래 진입 + 강좌 트랙 섹션 추가
   - 기존 페인포인트·사례·솔루션·프로세스·가격 유지
   - FAQ 2개 추가, CTA 두 갈래로 변경
3. ☐ 서브 라우팅 골격 생성
   - `/ai-solution/academy/dept-ai` 코스 1 페이지 (강의 목록 placeholder)
   - `/ai-solution/academy/build-ai` 코스 2 페이지 (강의 목록 placeholder)
4. ☐ 강의 페이지 컴포넌트 시안 1개 (LV3 1강 placeholder)
5. ☐ SEO 메타데이터 적용
6. ☐ 빌드 + 배포
7. ☐ 사령관님 확인 → 피드백 반영

---

## 7. 사이트 코드 위치 (확인 필요)

**현재 상황:**
- 오라클 서버 `/home/ubuntu/`: visionc 사이트 코드 없음
- 미니PC `/home/ubuntu/`: visionc 사이트 코드 없음 (chatbot-portal은 챗봇 관리용)
- Cloudflare 헤더 확인됨 → 별도 호스팅 (Vercel/Netlify/외부 VPS 가능성)

**사령관님 확인 요청:**
- visionc.co.kr 사이트는 어디서 호스팅되고 있나요?
- 소스 코드 저장소 위치 (GitHub Repo URL? 로컬 디렉토리?)
- 배포 방식 (Vercel auto-deploy? 수동 빌드 + scp? 다른 방식?)

→ 알려주시면 Sprint 1을 직접 수행하겠습니다.
→ 외부 호스팅(Vercel 등)이면 GitHub Repo 접근 권한 필요합니다.

---

## 부록: 향후 강의 페이지 데이터 구조 (참고)

```json
{
  "course": "dept-ai",
  "lesson_id": "01",
  "title": "우리 회사가 LLM으로 얻을 수 있는 것 — 도입 ROI 사례",
  "duration_min": 14,
  "youtube_id": "TBD",
  "objectives": [
    "LLM 도입의 4대 효용(시간/품질/속도/일관성) 이해",
    "중소기업 도입 사례 3개에서 ROI 패턴 파악",
    "우리 회사에 적용할 1순위 영역 1개 식별"
  ],
  "prompts": [
    {"title": "회의록 자동 정리", "text": "..."},
    {"title": "이메일 응답 초안", "text": "..."},
    {"title": "보고서 1쪽 요약", "text": "..."}
  ],
  "workbook_pdf": "/downloads/dept-ai/01-workbook.pdf",
  "next": "02",
  "prev": null
}
```
