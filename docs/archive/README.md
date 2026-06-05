# Archive

VISIONC 사이트에서 **폐기·통합된 페이지의 카피·레이아웃 명세 보관소.**

각 문서는 작성 당시의 컨텍스트를 보존하기 위해 원문 그대로 유지합니다. 실제 운영 페이지 코드 기준으로 보면 안 됩니다.

## 파일

| 파일 | 원본 위치 | 폐기 사유 | 폐기 시점 |
|---|---|---|---|
| `copy-maintenance.md` | `docs/copy/maintenance.md` | `/maintenance` 페이지 폐기, 콘텐츠 `/renewal#maintenance` 섹션으로 흡수 | 2026-06-05 (Phase 5) |
| `copy-new-website.md` | `docs/copy/new-website.md` | `/new-website` 페이지 폐기, `/renewal`로 통합 | 2026-06-05 (Phase 5) |
| `layout-maintenance.md` | `docs/design/layout-maintenance.md` | 위와 동일 | 2026-06-05 (Phase 5) |
| `layout-new-website.md` | `docs/design/layout-new-website.md` | 위와 동일 | 2026-06-05 (Phase 5) |

## 참고

- 현재 `/renewal` 페이지에 통합된 유지보수 플랜은 `docs/copy/renewal.md`와 라이브 페이지 `src/app/renewal/page.tsx`의 #maintenance 섹션을 참고.
- 리다이렉트는 `next.config.ts`의 redirects() 함수에 정의됨.
