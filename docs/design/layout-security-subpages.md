# 레이아웃 명세 — `/security` 하위 페이지

> VIS-5989 루틴 산출물 | AI 디자이너 작성 | 2026-09-02
> 적용 대상:
>   - `/security/scan-history` — OWASP ZAP 스캔 대시보드
>   - `/security/verify` — 보안 진단 인증 확인 페이지

---

## A. `/security/scan-history` — ZAP 스캔 이력 대시보드

### A-0. 디자인 방향

- **분위기**: 기술 대시보드. 보안 모니터링 느낌. 데이터 중심.
- **색상**: 점수 기반 3색 시스템 — 80이상 `accent-green`, 60~79 `accent-amber`, 59이하 `accent-red`.
- **레이아웃**: 단일 열, `max-w-4xl` 컨테이너. 요약 카드 2x2 그리드 → 추이 차트 → 스캔 이력 목록.
- **클라이언트 컴포넌트**: `'use client'` — `/api/zap-scan?limit=20` API에서 데이터 조회.

### A-1. 섹션 구조

| 순번 | 섹션 | 표시 조건 |
|------|------|---------|
| 1 | 페이지 헤더 (ShieldCheck + 제목) | 항상 |
| 2 | 요약 카드 4개 (2x2 그리드) | 최근 스캔 1개 이상일 때 |
| 3 | ZAP 점수 추이 차트 | 스캔 2개 이상일 때 |
| 4 | 스캔 이력 목록 | 로딩 완료 후 |
| 5 | Back link | 항상 |

### A-2. 섹션 상세

#### Header

```
여백: mb-8
레이아웃: flex items-center gap-3

[아이콘] ShieldCheck w-8 h-8 text-primary-light

[텍스트]
  H1: "OWASP ZAP 스캔 대시보드", text-2xl font-bold
  부제목: "visionc.co.kr 자동화 취약점 스캔 이력", text-muted-foreground text-sm mt-1
```

#### 요약 카드 4개

```
레이아웃: grid grid-cols-2 md:grid-cols-4 gap-4 mb-6

[카드] bg-card rounded-xl p-4 flex flex-col gap-2

카드 1 — 최근 ZAP 점수
  아이콘: ShieldCheck w-5 h-5 text-primary-light
  값: "[점수]점"
  색상: 점수 기반 3색 (accent-green/amber/red)

카드 2 — 5회 평균 점수
  아이콘: TrendingUp w-5 h-5 text-accent-cyan
  값: "[평균]점" | "-"
  색상: text-accent-cyan

카드 3 — 마지막 스캔
  아이콘: Clock w-5 h-5 text-muted-foreground
  값: "YYYY-MM-DD" (10자리 슬라이스)
  색상: text-foreground

카드 4 — 총 스캔 횟수
  아이콘: AlertTriangle w-5 h-5 text-accent-amber
  값: "[N]회"
  색상: text-accent-amber
```

#### 추이 차트 (TrendChart)

```
조건: 스캔 2개 이상
여백: mb-6
컨테이너: bg-card rounded-xl p-5

H3: TrendingUp 아이콘 + "ZAP 점수 추이 (최근 N회)", text-sm font-semibold mb-4

[바 차트] flex items-end gap-1 h-20
  최근 10회 (오래된 → 최신 순)
  각 막대: flex flex-col items-center flex-1
    점수 레이블: text-xs text-muted-foreground
    막대: w-full rounded-t opacity-85
      80이상: bg-accent-green
      60~79: bg-accent-amber
      59이하: bg-accent-red
      높이: (score / 100) * 80px
```

#### 스캔 이력 목록

```
레이아웃: space-y-4

로딩 중: "스캔 이력 불러오는 중..." (text-muted-foreground text-center py-12)
에러: 에러 메시지 (text-destructive text-center py-12)
빈 상태: ShieldAlert 아이콘 + "아직 스캔 이력이 없습니다." (bg-card rounded-xl p-10 text-center)

[이력 카드] bg-card border border-border rounded-xl p-5

상단 행: flex items-start justify-between gap-4
  좌측:
    태그 뱃지: bg-secondary text-primary-light text-xs px-2 py-0.5 rounded
      Baseline | Full | API
    트리거 뱃지: text-xs text-muted-foreground
      배포 자동 | 주간 스케줄 | 수동 실행
    소요 시간: text-xs text-muted-foreground "[N]초"
    URL: text-sm text-foreground font-mono
    날짜: text-xs text-muted-foreground

  우측: ScoreRing
    원형 링: w-14 h-14 rounded-full border-4 text-lg font-bold 중앙 정렬
    색상: 점수 기반 3색
    하단: "ZAP 점수" text-xs text-muted-foreground

하단 행: flex items-center gap-1 mt-4 border-t border-border pt-4
  AlertBadge × 4: (구분선 w-px h-8 bg-border)
    High (accent-red) | Medium (accent-amber) | Low (accent-blue) | 정보 (muted)
  각 배지: flex flex-col items-center px-3
    숫자: text-lg font-bold (0이면 muted)
    라벨: text-xs text-muted-foreground
  상세 리포트 링크: ml-auto text-xs text-primary-light hover:text-primary underline
```

#### Back link

```
여백: mt-8 text-center
"← 보안 서비스로 돌아가기"
  Link href="/security"
  스타일: text-sm text-primary-light hover:text-primary
```

---

## B. `/security/verify` — 보안 진단 인증 확인 페이지

### B-0. 디자인 방향

- **분위기**: 토큰 기반 인증 확인 결과 페이지. 성공/실패 명확 구분.
- **색상**: 성공 `accent-green`, 실패/만료 `accent-red`, 로딩 `primary`.
- **레이아웃**: 단일 열, 중앙 정렬 컨테이너. URL 파라미터 `?token=` 기반.
- **클라이언트 컴포넌트**: `ScanVerifyClient` — 토큰으로 서버에서 결과 조회.

### B-1. 섹션 구조

| 상태 | 표시 내용 |
|------|---------|
| 로딩 중 | 스피너 + "인증 확인 중..." |
| 성공 | ShieldCheck 아이콘(green) + 인증 성공 메시지 + 스캔 결과 요약 |
| 실패/만료 | ShieldAlert 아이콘(red) + 오류 메시지 |
| 토큰 없음 | 안내 메시지 |

### B-2. 섹션 상세

```
컨테이너: min-h-screen bg-background pt-20 pb-16 px-4
내부: max-w-2xl mx-auto text-center

[로딩 상태]
  스피너 애니메이션 (animate-spin)
  "인증 확인 중..." text-muted-foreground

[성공 상태]
  아이콘: ShieldCheck w-16 h-16 text-accent-green mx-auto mb-4
  제목: "보안 진단 인증 확인 완료" text-2xl font-bold text-foreground
  부제목: "이 링크의 보안 진단 결과가 인증되었습니다." text-muted-foreground
  
  결과 요약 카드: bg-card border border-border rounded-xl p-6 text-left mt-8
    대상 URL
    스캔 일시
    ZAP 점수 (색상 3단계)
    취약점 수: High / Medium / Low / 정보
    스캔 프로파일
  
  [상세 리포트 링크] (reportUrl 있을 때)
    href=reportUrl, target="_blank"
    스타일: text-primary-light hover:text-primary text-sm

[실패/만료 상태]
  아이콘: ShieldAlert w-16 h-16 text-destructive mx-auto mb-4
  제목: "인증을 확인할 수 없습니다" text-2xl font-bold
  설명: 오류 원인 (토큰 만료, 잘못된 토큰 등) text-muted-foreground

[공통 하단]
  Link href="/security" — "← 보안 서비스"
  스타일: text-sm text-primary-light hover:text-primary mt-8 inline-block
```

---

*저장 위치: `~/company/website/docs/design/layout-security-subpages.md`*
