# HANDOFF — VISIONC 기업 AI 도입 강좌 자료 제작

**작성:** 2026-06-05 (이전 세션 종료 시점)
**용도:** 새 Claude 세션이 즉시 작업 시작할 수 있도록 컨텍스트 인계

---

## 1. 현재 상태

페이지 인프라(메뉴 라벨·페이지·다운로드 API) 모두 배포 완료. 자료 파일만 미업로드.

- **사이트:** visionc.co.kr/ai-solution (Vercel 라이브, HTTP 200)
- **강좌 페이지:** /ai-solution/academy/dept-ai (15강 커리큘럼 노출 중), /build-ai (30강)
- **다운로드 API:** `/api/academy/download/[key]` — 키 4종 등록됨, 인증 동작 확인됨
  - 현재 응답: 인증 OK + 파일 없음 → 500 "file not available"
- **패스워드:** `visioncDown` (env.ACADEMY_PASSWORD 미설정 시 fallback)

## 2. 이번 세션 작업

**dept-ai 1편 (2강) 자료 제작 → 사령관님 컨펌 받기 → 컨펌 후 나머지 진행**

### dept-ai 1편 강의 목록 (확정)
1. **01강 — 우리 회사가 LLM으로 얻을 수 있는 것 — 도입 ROI 사례**
2. **02강 — 프롬프트 기본기 + 데이터·기밀 보안 가이드라인**

(편 정보: "기반 다지기 — 전 직원 공통, AI 도입의 첫걸음")

### 결과물 형식
- `dept-ai-slides.pptx` — 1편 2강 통합 PPT (강의 단위로 섹션 구분)
- `dept-ai-speaker-notes.pdf` — 강사용 스피커 노트 (멘트·실습·시간배분·청중질문)

### 제작 가이드 (기존 LV1·LV2 패턴 참고)
- 작업 디렉토리: `/tmp/visionc_academy_dept_ai_v1/` 새로 생성
- 슬라이드: `slides.html` → Playwright로 PNG 렌더링 → python-pptx로 PPTX 빌드
- 스피커 노트: `speaker_notes.html` → 브라우저 print to PDF 또는 weasyprint
- LV1 패턴: `/tmp/visionc_academy_lv1/` 참조 (build_pptx.py, render.py, render_notes.py)
- LV2 패턴: `/tmp/visionc_academy_lv2_master/` (PPTX·PDF 둘 다 완성본 있음)
- 강의당 약 10~12 슬라이드, 50~60분 분량

### 톤 & 콘텐츠 가이드
- **대상:** 중소기업 B2B 의사결정자 + 일반 직원
- **톤:** 전문적이되 친근. 사례 중심. 한국 중소기업 실무 양식 (세금계산서, 거래명세서, 견적서, 보고서)
- **차별점 (Anthropic Skilljar 대비):** 한국어, 실무 중심, "복붙해서 바로 쓰는 프롬프트 3종" 포함
- **금기:** 무료 강좌 톤 (이 강좌는 사내 출강 유료). "신용카드 불필요" 같은 표현 금지

## 3. 배포 흐름

```bash
# 자료 미니PC 업로드 (오라클 → 미니PC)
scp dept-ai-slides.pptx       minipc:/home/ubuntu/company/website/src/storage/academy/
scp dept-ai-speaker-notes.pdf minipc:/home/ubuntu/company/website/src/storage/academy/

# 미니PC에서 git 추가·커밋·푸시
ssh minipc 'cd ~/company/website && \
  git add src/storage/academy/dept-ai-slides.pptx src/storage/academy/dept-ai-speaker-notes.pdf && \
  git commit -m "content(ai-solution): dept-ai 1편 강의 자료 (slides + speaker notes)" && \
  git push origin main'
```

배포 후 visionc.co.kr/ai-solution/academy/dept-ai에서 "visioncDown" 입력 → 다운로드 동작 확인.

## 4. 핵심 파일 위치

| 파일 | 위치 |
|------|------|
| 사이트 코드 | minipc:/home/ubuntu/company/website/ |
| 자료 업로드 경로 | minipc:/home/ubuntu/company/website/src/storage/academy/ |
| dept-ai 페이지 | minipc:src/app/ai-solution/academy/dept-ai/page.tsx |
| build-ai 페이지 | minipc:src/app/ai-solution/academy/build-ai/page.tsx |
| 다운로드 API | minipc:src/app/api/academy/download/[key]/route.ts |
| 인증 API | minipc:src/app/api/academy/auth/route.ts |
| LV1 자료 패턴 참고 | oracle:/tmp/visionc_academy_lv1/ |
| LV2 자료 패턴 참고 | oracle:/tmp/visionc_academy_lv2_master/ |
| 기획서 | oracle:/tmp/visionc_academy/VISIONC_Academy_강좌기획서_2026-06-04.md |
| 페이지 사양서 | oracle:/tmp/visionc_academy/페이지_재구성_사양서_2026-06-05.md |
| 메모리 | oracle:/home/ubuntu/.claude/projects/-home-ubuntu-trading-citadel/memory/project_visionc_academy_enterprise.md |

## 5. 사령관님 확정 사항 (절대 변경 금지)

- /academy LV1~LV8 = 무료 강의 (그대로 유지)
- /ai-solution = 유료 사내 출강 + 컨설팅
- 메뉴 라벨: "기업 AI 도입 및 컨설팅" 통일
- 강좌 자료: PPT + 스피커노트 **둘 다 비밀번호 잠금** (academy/lv1·lv2와의 차이점)
- 패스워드: `visioncDown`
- 1편 먼저, 컨펌 후 다음 진행

## 6. 새 세션 시작 시 첫 액션

1. 이 핸드오프 문서 읽기 (이미 완료)
2. dept-ai 1편 1강 콘텐츠 작성 시작 (제목: "우리 회사가 LLM으로 얻을 수 있는 것 — 도입 ROI 사례")
3. 사령관님께 작업 시작 알림 + 예상 소요 시간 보고
4. 1편 2강 완성 → PPT/PDF 빌드 → 미니PC 업로드 → git push
5. 라이브 확인 후 사령관님께 컨펌 요청
