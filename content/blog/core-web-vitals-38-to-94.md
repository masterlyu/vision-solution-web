---
title: "Core Web Vitals 60점대 → 94점으로 올린 5가지 방법"
date: "2026-03-08"
tag: "개발 팁"
summary: "이미지 최적화, 폰트 로딩 전략, 코드 스플리팅... 실제 적용한 방법을 코드와 함께 설명합니다."
---

## Core Web Vitals란?

구글이 검색 순위에 직접 반영하는 3가지 성능 지표입니다.

- **LCP (Largest Contentful Paint)**: 가장 큰 콘텐츠가 로드되는 시간. 2.5초 이내가 "좋음"
- **FID/INP (Interaction to Next Paint)**: 사용자 인터랙션 응답 속도. 200ms 이내가 "좋음"
- **CLS (Cumulative Layout Shift)**: 화면이 예기치 않게 이동하는 정도. 0.1 이하가 "좋음"

점수가 낮으면 구글 검색 노출이 줄고 방문자 이탈이 증가합니다.

## 5가지 개선 방법

### 1. Next.js Image 컴포넌트 사용

일반 `<img>` 태그를 `<Image>` 컴포넌트로 교체하기만 해도 LCP가 크게 개선됩니다.

```jsx
// Before (나쁜 예)
<img src="/hero.jpg" alt="히어로 이미지" />

// After (좋은 예)
import Image from 'next/image'
<Image
  src="/hero.jpg"
  alt="히어로 이미지"
  width={1200}
  height={600}
  priority // 첫 화면 이미지에만 사용
/>
```

**효과**: LCP 평균 1.8초 단축

### 2. 폰트 최적화

외부 폰트 로딩은 LCP의 숨은 적입니다.

```jsx
// next/font 사용 (최적화 자동 적용)
import { Noto_Sans_KR } from 'next/font/google'

const font = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap', // 폰트 로딩 중 대체 폰트 표시
})
```

**효과**: FOUT(Flash of Unstyled Text) 제거, FID 개선

### 3. 이미지 dimensions 명시

CLS의 주요 원인은 이미지 크기 미지정입니다. 이미지가 로드되면서 레이아웃이 밀려납니다.

항상 `width`와 `height`를 명시하거나, `aspect-ratio` CSS를 사용하세요.

```css
.image-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
```

**효과**: CLS 0.28 → 0.02

### 4. 코드 스플리팅

사용하지 않는 JavaScript를 초기 로드에서 제거합니다.

```jsx
// 필요할 때만 로드
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <div>로딩 중...</div>,
  ssr: false, // 서버사이드 렌더링 불필요한 경우
})
```

**효과**: 초기 JS 번들 크기 40% 감소

### 5. 서버 컴포넌트 최대 활용

Next.js 13+의 App Router에서 기본은 서버 컴포넌트입니다. 클라이언트 상태가 필요 없는 컴포넌트는 서버 컴포넌트로 유지하세요.

```jsx
// 서버 컴포넌트 (default) - JavaScript 번들에 포함 안 됨
async function ProductList() {
  const products = await fetchProducts() // 서버에서 실행
  return <ul>{products.map(p => <li>{p.name}</li>)}</ul>
}
```

**효과**: 클라이언트 JS 번들 30-50% 감소

## 실측 결과

이 5가지를 모두 적용한 고객사의 실제 결과입니다.

| 지표 | Before | After |
|------|--------|-------|
| PageSpeed (모바일) | 63점 | 94점 |
| LCP | 4.8초 | 1.3초 |
| CLS | 0.28 | 0.02 |
| 바운스율 | 68% | 42% |

## 지금 내 사이트 점수 확인하기

[PageSpeed Insights](https://pagespeed.web.dev)에서 무료로 확인할 수 있습니다. 점수가 70점 미만이라면 저희에게 문의해주세요. 무료 분석 리포트를 제공해드립니다.
