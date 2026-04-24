# CEO 지시봇 시스템 (@visionc_bot)

사령관님이 텔레그램에서 직접 Paperclip CEO 지시사항을 등록·조회하고, 에이전트들이 자율적으로 처리 후 완료 보고하는 이벤트 기반 시스템.

## 전체 흐름

```
[CEO]  텔레그램 @visionc_bot 에 /지시 입력
   ↓
[로컬 폴링봇] /지시 파싱 → Paperclip 이슈 생성 → 담당 에이전트 배정
              (키워드 있음 → 직접 / 키워드 없음 → CTO)
   ↓
[담당 에이전트] heartbeat에서 픽업 → ceo-notify.sh 로 접수/계획 응답
   ↓ (세부 진행은 자율, 중간 보고 없음)
[담당 에이전트] 작업 완료 → ceo-report-done.sh 로 최종 완료 보고
   ↓
[CEO]  텔레그램으로 완료 메시지 수신

[CEO 중간 조회 시]
[CEO]  /상태 VIS-XXX  또는  /상태 키워드
   ↓
[로컬 폴링봇] Paperclip 조회 → 상태/서브태스크 진행률/최근 코멘트 응답
```

## 컴포넌트

### 1. 텔레그램 폴링봇 (`@visionc_bot`)
- **위치:** `~/scripts/paperclip_director.py`
- **실행:** systemd user 서비스 `paperclip-director.service`
- **역할:**
  - `/지시 <내용>` → Paperclip 이슈 생성 (파일 첨부 지원)
  - `/상태` / `/상태 VIS-XXX` / `/상태 키워드` → 진행 현황 조회
  - `callback_query` (approve/reject 버튼) → Vercel API로 포워딩
- **Vercel webhook 제거됨**: 기존 `https://vision-solution-web.vercel.app/api/telegram-webhook` 은 로컬 폴링으로 교체. 콜백만 Vercel로 HTTPS 포워딩하여 기존 approve/reject 흐름 유지.

### 2. Paperclip 이슈 생성 로직
- **배정:** 사령관 메시지에 키워드(`퍼블리셔/디자인/보안/AI/앱/마케팅/CTO/리뉴얼/PM/콘텐츠/DB`) 포함 시 해당 에이전트 직접 배정. 없으면 **CTO가 자동 배정받아 검토·분배**.
- **첨부:** 텔레그램 document/photo 업로드 시 캡션에 `/지시` 포함되면 Paperclip 이슈의 attachment 로 자동 업로드. 담당 에이전트가 heartbeat에서 다운로드하여 참조.
- **프로토콜 주입:** 이슈 description에 "접수 응답 → 완료 보고" 2단계 프로토콜을 자동 주입. 이슈 identifier(VIS-XXX)는 생성 직후 PATCH로 치환.

### 3. 에이전트 → CEO 보고 스크립트

| 스크립트 | 용도 | 시점 |
|---|---|---|
| `~/company/ceo-notify.sh VIS-XXX "메시지"` | 접수/계획/중간 알림 | 픽업 직후 1회 필수 |
| `~/company/ceo-report-done.sh VIS-XXX` | 최종 완료 보고 | `done` 처리 직전 |

완료 보고 스크립트는 **Paperclip 마지막 에이전트 코멘트를 자동으로 요약에 포함**합니다. 에이전트는 Paperclip에 완료 코멘트를 먼저 작성한 뒤 스크립트를 호출하면 됩니다.

### 4. CEO 조회 명령 `/상태`

| 입력 | 결과 |
|---|---|
| `/상태` | 진행 중인 [CEO 지시] 이슈 전체 목록 (todo/in_progress/in_review/blocked) |
| `/상태 VIS-612` | 정확 ID 조회 — 상태, 담당자, 서브태스크 진행률(N/M), 최근 코멘트 |
| `/상태 블로그 지침` | 키워드 검색 (Paperclip 풀텍스트) — 1건이면 상세, 여러 건이면 목록 |

## CTO 역할 (키워드 없는 지시 처리)

CTO(`aa000002`)는 직접 구현하지 않고 **검토·분배**합니다:

1. 접수 직후 `ceo-notify.sh`로 계획 응답 (바로 가능 / 중장기 N단계)
2. Paperclip 서브태스크 생성 — 자식 제목 prefix: `[CEO 지시:VIS-XXX]`
3. 각 자식 이슈를 담당 에이전트에 배정
4. 모든 자식이 `done`이 되면 부모 이슈 최종 검수 → CTO가 **한 번만** `ceo-report-done.sh` 호출
5. **자식 에이전트는 개별 CEO 보고 금지** (중복 보고 방지)

## 파일 위치

| 경로 | 역할 | git 관리 |
|---|---|---|
| `~/scripts/paperclip_director.py` | 텔레그램 폴링봇 본체 | ✗ (서버 내 개인 파일) |
| `~/scripts/telegram-scheduler.env` | 봇 환경변수 | ✗ (secret 포함) |
| `~/.config/systemd/user/paperclip-director.service` | systemd 실행 정의 | ✗ |
| `~/company/ceo-notify.sh` + `ceo_notify.py` | 접수/중간 알림 스크립트 | ✗ |
| `~/company/ceo-report-done.sh` + `ceo_report_done.py` | 최종 완료 보고 스크립트 | ✗ |
| `~/company/CLAUDE.md` | 에이전트 프로토콜 (CEO 지시 처리 섹션) | ✗ |
| `src/app/api/telegram-webhook/route.ts` | Vercel 콜백 포워딩 수신 엔드포인트 | ✓ (이 저장소) |
| `docs/architecture/ceo-director-system.md` | 이 문서 | ✓ |

## 인증 토큰

- **`@visionc_bot` 텔레그램 토큰** — 기존과 동일. Vercel webhook은 삭제됨.
- **Paperclip Board API Key** (`pcp_board_...`) — `telegram-director` 라는 이름으로 생성. `~/scripts/telegram-scheduler.env` 와 systemd 서비스 환경변수에 저장.
- **`VISIONC_INTERNAL_TOKEN`** — Vercel 콜백 포워딩 시 `x-internal-token` 헤더로 전달. Vercel의 `verifyTelegramSecret` 함수에 내부 우회 경로 추가 (`route.ts` 수정).

## 운영

```bash
# 서비스 상태
systemctl --user status paperclip-director

# 재시작
systemctl --user restart paperclip-director

# 로그 확인
tail -f ~/scripts/paperclip_director.log

# Paperclip Board Key 재발급 (만료·유출 시)
# DB에 직접 board_api_keys 레코드 추가 (masterlyu 계정 기준)
```

## 검증 사례

**VIS-556 — 4분 40초 자동 완료 (2026-04-24)**
- 00:16:55 CEO `/지시` → 퍼블리셔 배정
- 00:19:44 퍼블리셔 커밋 (`d96d668` — UrlAnalysisForm 이메일 도메인 검증 + LegalModals 신규)
- 00:21:35 Paperclip `done` → Vercel 배포 → `https://www.visionc.co.kr` 반영 확인

## 확장 가능성

- 블로커 감지: 에이전트가 `blocked` 상태로 전환 시 `ceo-notify.sh` 자동 호출 → 현재는 수동
- 장기 과제 일일 요약: 오픈된 [CEO 지시] 이슈가 N일 이상 진행 중이면 주간 요약 자동 발송
- CEO 답장 라우팅: 텔레그램 reply → Paperclip 이슈 코멘트 자동 기록 (현재 미구현)
