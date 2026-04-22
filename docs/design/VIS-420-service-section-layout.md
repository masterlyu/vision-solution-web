# VIS-420 — 홈페이지 서비스 섹션 레이아웃 설계

## 목적
`FeaturesSection` (`src/components/landing/features-section.tsx`) 리뉴얼.  
각 서비스 카드에 **가격 범위**와 **자세히 보기 CTA**를 추가하여 전환율을 높인다.

---

## 카드 구성 요소 (위→아래 순서)

| 순서 | 요소 | 현재 | 변경 |
|------|------|------|------|
| 1 | 번호 + 아이콘 | ✅ 유지 | — |
| 2 | 수치 (stat) | ✅ 유지 | — |
| 3 | 서비스명 | ✅ 유지 | — |
| **4** | **가격 배지** | ❌ 없음 | **신규 추가** |
| 5 | 설명 | 3~4줄 | 2줄 이내로 clamp |
| 6 | CTA | hover reveal | ✅ 유지 |

**스캔 경로**: 수치(눈에 띔) → 이름 → 가격 → CTA

---

## 가격 데이터

```ts
const services = [
  { ..., price: '80만원~',   priceLabel: '시작가' },  // 홈페이지 리뉴얼
  { ..., price: '150만원~',  priceLabel: '시작가' },  // 신규 사이트 구축
  { ..., price: '15만원~',   priceLabel: '월' },      // 유지보수
  { ..., price: '30만원~',   priceLabel: '시작가' },  // 보안 진단
  { ..., price: '300만원~',  priceLabel: '시작가' },  // 앱·시스템 개발
  { ..., price: '200만원~',  priceLabel: '시작가' },  // AI 솔루션
]
```

---

## 가격 배지 컴포넌트 스펙

```tsx
/* PriceBadge — 서비스 카드 내부 인라인 */
<div className="inline-flex items-center gap-1.5 px-3 py-1.5
                bg-primary/[0.08] border border-primary/20
                rounded-full w-fit">
  <span className="text-[10px] font-medium text-muted-foreground">
    {service.priceLabel}
  </span>
  <span className="text-[13px] font-semibold text-primary">
    {service.price}
  </span>
</div>
```

### 설계 근거
- `oklch` 기반 `--primary` 변수만 사용 → hex 금지 원칙 준수
- 배지 형태(pill) → 가격 영역임을 즉시 인식
- 낮은 불투명도(8%) → 강조하되 카드 배경과 자연스럽게 어울림
- `border-primary/20` → 테두리로 영역 구분, 과하지 않게

---

## 설명 텍스트 clamp

```tsx
<p className="text-muted-foreground text-sm leading-relaxed
              line-clamp-2">
  {service.desc}
</p>
```

현재 3~4줄 → 2줄 강제 clamp. 시각 밀도 통일, AI 티 제거.

---

## 카드 전체 구조 (퍼블리셔 구현 기준)

```tsx
<Link key={s.title} href={s.href}
  className={`group relative bg-card p-8 flex flex-col gap-5
              hover:bg-card/80 transition-all duration-500
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
  style={{ transitionDelay: `${i * 80}ms` }}>

  {/* ① 번호 + 아이콘 */}
  <div className="flex items-start justify-between">
    <span className="text-muted-foreground/40 text-sm font-mono">{s.number}</span>
    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20
                    flex items-center justify-center group-hover:bg-primary/20 transition-all">
      <s.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
    </div>
  </div>

  {/* ② 수치 */}
  <div>
    <div className="text-3xl font-black text-primary mb-1">{s.stat.value}</div>
    <div className="text-muted-foreground text-xs">{s.stat.label}</div>
  </div>

  {/* ③ 서비스명 */}
  <h3 className="text-foreground font-bold text-lg">{s.title}</h3>

  {/* ④ 가격 배지 — NEW */}
  <div className="inline-flex items-center gap-1.5 px-3 py-1.5
                  bg-primary/[0.08] border border-primary/20
                  rounded-full w-fit">
    <span className="text-[10px] font-medium text-muted-foreground">{s.priceLabel}</span>
    <span className="text-[13px] font-semibold text-primary">{s.price}</span>
  </div>

  {/* ⑤ 설명 (2줄 clamp) */}
  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
    {s.desc}
  </p>

  {/* ⑥ CTA */}
  <div className="flex items-center gap-1 text-primary text-sm font-semibold
                  mt-auto opacity-0 group-hover:opacity-100 transition-all
                  -translate-x-2 group-hover:translate-x-0">
    자세히 보기 <ArrowRight className="w-4 h-4" />
  </div>
</Link>
```

---

## 그리드 레이아웃

기존 그리드 구조 유지 (변경 없음):

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
```

---

## 파일 변경 범위

| 파일 | 변경 내용 |
|------|----------|
| `src/components/landing/features-section.tsx` | `services` 배열에 `price`, `priceLabel` 필드 추가; 카드 JSX에 가격 배지 삽입; 설명 `line-clamp-2` 추가 |

---

## 미리보기

`mockups/VIS-420-service-section-mockup.html` — 브라우저에서 직접 확인 가능.

---

## 완료 기준 체크리스트 (퍼블리셔용)

- [ ] `services` 배열에 `price` / `priceLabel` 필드 추가
- [ ] 가격 배지 렌더링 (pill, `bg-primary/[0.08]`, `border-primary/20`)
- [ ] 설명 `line-clamp-2` 적용
- [ ] hex 색상 미사용 (CSS 변수만)
- [ ] `npm run build` 통과
- [ ] `/` 페이지에서 카드 확인
