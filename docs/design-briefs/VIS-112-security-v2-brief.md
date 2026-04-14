# VIS-112 디자인 브리프 — /security 페이지 v2

> Phase 0 산출물 (디자인 스트래티지스트)
> CEO 게이트 #1 승인 전 Phase 1 진입 금지

---

## 1. 핵심 메시지

**"30초 만에 보안 위협을 느끼게 만들고, URL 입력으로 행동하게 한다."**

- 현재 구조·컨셉·스타일 유지 (처음부터 재설계 금지)
- 작업 본질: 텍스트 압축 + Lottie/아이콘 시각화 레이어 추가
- 목표: 텍스트 55% 감축, Lottie 9개 이상 활용

---

## 2. 레퍼런스 (5개)

| # | 사이트 | 좋은 점 | 적용 방향 |
|---|--------|---------|----------|
| 1 | **tailscale.com** | 보안 SaaS인데 친근함. 아이콘+1줄 설명 조합. 전문용어 없음 | Checklist 섹션 — 6개 아이콘 카드를 타이틀+이모지만으로 축소 |
| 2 | **linear.app** | 프로세스 타임라인을 아이콘+한 단어로 표현. 설명 없어도 직관적 | Process 스텝퍼 — desc 삭제, 짧은 동사형 제목만 |
| 3 | **cloudflare.com/learning/security** | 빅 넘버+짧은 라벨. 배경 대비 강한 타이포 | Stats 섹션 — desc 1줄로 압축 |
| 4 | **1password.com** | 아이콘 그리드. 텍스트 없이 기능 이해. 색상 1개 포인트 | Site Types 섹션 — emoji+라벨+O/X만, note 삭제 |
| 5 | **vercel.com (배포 페이지)** | 다크+Lottie/SVG로 Hero 공간 채움. CTA 즉각적 | Hero — shield Lottie 확대, 배지 제거 |

---

## 3. 분위기 키워드

- **긴장감→안도감** 여정: 위기감(빨강/숫자) → 해결사(방패/체크 Lottie)
- **어둡고 절제된** — 다크 배경, 포인트 1색(빨강/프라이머리)
- **아이콘이 텍스트보다 크게** — 이모지 4rem, 텍스트는 보조

## 4. 반례 (하지 말 것)

- ❌ 각 섹션에 3줄 이상 본문 설명 유지
- ❌ Checklist 카드에 simple + warn 두 설명 모두 유지
- ❌ 새 색상 추가 (현재 --primary/--destructive 조합으로 충분)
- ❌ 전체 레이아웃 재설계

---

## 4. 섹션별 텍스트 압축 계획

### Section 1 — Hero (현재 10줄 → 목표 4줄, -60%)
| 항목 | 현재 | 목표 | 변경 |
|------|------|------|------|
| Badge | 1줄 | 1줄 | 유지 |
| H1 | 3줄(span 포함) | 2줄 | span 1개 통합 |
| P | 2줄 | 1줄 | "국내 중소기업 73%가 지금 해킹에 노출되어 있습니다." |
| 배지 4개 | 4줄 | 삭제 | shield Lottie 아래 CTA 버튼 1개로 대체 |

### Section 2 — Stats (8줄 → 4줄, -50%)
- 4 stat desc 각 2줄 → 1줄로 압축 (핵심 팩트만)

### Section 3 — Danger Cases (16줄 → 10줄, -37%)
- 섹션 헤더 p 삭제, h2 1줄로
- 4 카드: `desc` 삭제, `case`만 뱃지로 유지

### Section 4 — Checklist (27줄 → 7줄, -74%) ← 최대 압축
- 헤더: h2 1줄만
- 6 카드: 이모지+title만, simple·warn 삭제 → 미니 위험도 SVG 바로 대체
- 카드 구조: **이모지(4rem) + 질문 제목 1줄 + 위험도 바**

### Section 5 — Process Stepper (15줄 → 7줄, -53%)
- 헤더 1줄만 (overline 삭제)
- 6 스텝: desc 삭제, title을 5단어 이내 동사형으로
  - 예: "URL 입력 (30초)" (desc 없음)

### Section 6 — Site Types (15줄 → 8줄, -47%)
- 헤더 p 삭제
- 6 카드: note 삭제, 이모지+라벨+O/△/X 아이콘만

### Section 7 — CTA + Form (11줄 → 6줄, -45%)
- overline 삭제
- 4 혜택: 이모지+title만, desc 삭제

---

## 5. Lottie 에셋 계획

### 기존 유지 (6개)
| 파일 | 위치 |
|------|------|
| `/lottie/shield.json` | Hero (크기 280→320px) |
| `/lottie/hacker.json` | Danger #1 |
| `/lottie/warning.json` | Danger #2 |
| `/lottie/alert.json` | Danger #3 |
| `/lottie/scan.json` | Danger #4 |
| `/lottie/check.json` | CTA |

### 신규 필요 (3개, LottieFiles 무료 검색)
| 섹션 | 용도 | 검색 키워드 |
|------|------|-----------|
| Checklist SSL 카드 | 자물쇠 애니 | `lock security animated` |
| Checklist 관리자 카드 | 방어막 | `shield protect` |
| Process 장식 | 진행 흐름 | `progress steps minimal` |

→ **신규 3개 추가 목표 (총 9개 Lottie 사용)**

---

## 6. 추가 제안: 중간 CTA 삽입

현재 중간 CTA 없음 → **Checklist 섹션 직후에 CTA 버튼 추가**

```
지금 바로 무료 진단 신청하기 →
```

(VISIONC_PRINCIPLES.md: CTA 최소 3곳 기준 충족)

---

## 7. 전환율 체크 (VISIONC_PRINCIPLES.md)

- [x] Hero 첫 문장: 고객 고통으로 시작
- [x] CTA 3곳: Hero CTA + Checklist 후 CTA(추가) + 하단 Form
- [x] 수치 근거: Stats 섹션 유지
- [x] 인포그래픽: Lottie 9개 목표
- [x] 기술 용어 → 쉬운 말 (기존 유지)

---

## 8. Phase 1 전달 사항 (크리에이티브 디렉터에게)

- **지켜야 할 것:** oklch CSS 변수, Pretendard, 8/16/24/48 간격 스케일
- **할 것:** 섹션별 압축 계획 그대로 적용한 단일 HTML mockup
- **금지:** 새 색상, 새 폰트, 전체 레이아웃 재설계
- **Lottie placeholder:** mockup에서 `/lottie/shield.json` 재사용 OK, Phase 2에서 신규 에셋 확정
- **중간 CTA:** Checklist 섹션 직후 버튼 삽입

---

## 9. 텍스트 감축 요약

| 섹션 | 현재 줄 | 목표 줄 | 감축율 |
|------|--------|--------|--------|
| Hero | 10 | 4 | -60% |
| Stats | 8 | 4 | -50% |
| Danger | 16 | 10 | -37% |
| **Checklist** | **27** | **7** | **-74%** |
| Process | 15 | 7 | -53% |
| Site Types | 15 | 8 | -47% |
| CTA | 11 | 6 | -45% |
| **합계** | **102** | **46** | **-55%** |

→ 목표 달성 예상: **55% 감축** (기준 50% 이상 초과)
