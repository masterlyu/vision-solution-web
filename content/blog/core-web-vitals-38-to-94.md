---
title: "Core Web Vitals 60점대 → 94점으로 올린 5가지 방법"
date: "2026-03-08"
tag: "개발 팁"
tags: "개발 팁,성능 최적화,Core Web Vitals,SEO"
image: "/images/blog/core-web-vitals-38-to-94.svg"
summary: "이미지 최적화, 폰트 로딩 전략, 코드 스플리팅... 실제 적용한 방법을 코드와 함께 설명합니다."
---

## 📉 홈페이지 점수가 낮으면 손님을 잃고 있는 겁니다

혹시 이런 경험 있으신가요? 홈페이지를 만들었는데 방문자가 들어오자마자 나가버리는 상황. 이유는 단 하나일 수 있습니다 — **홈페이지가 느리기 때문**입니다.

구글은 느린 홈페이지를 검색 결과 아래로 밀어냅니다. 그리고 방문자도 3초 이상 로딩되면 포기하고 떠납니다. 지금 소개하는 5가지 방법으로 실제 고객사는 점수를 **63점 → 94점**으로 올렸습니다!

---

## 📊 Core Web Vitals란 무엇인가요?

구글이 검색 순위에 직접 반영하는 3가지 성능 지표입니다.

> 💡 **쉽게 이해하기**: 홈페이지 "성적표" 같은 거예요. 점수가 높을수록 구글이 더 위에 보여줍니다!

- **LCP (Largest Contentful Paint)**: 가장 큰 콘텐츠가 로드되는 시간입니다. 2.5초 이내가 "좋음"
  > 💡 메인 이미지나 큰 제목이 화면에 뜨는 속도라고 생각하면 됩니다.
- **FID/INP (Interaction to Next Paint)**: 사용자 인터랙션 응답 속도입니다. 200ms 이내가 "좋음"
  > 💡 버튼을 클릭했을 때 반응하는 속도예요.
- **CLS (Cumulative Layout Shift)**: 화면이 예기치 않게 이동하는 정도입니다. 0.1 이하가 "좋음"
  > 💡 글을 읽다가 갑자기 내용이 밀려내려가는 현상을 수치화한 것입니다.

점수가 낮으면 구글 검색 노출이 줄고 방문자 이탈이 증가합니다.

---

## ⚡ 5가지 개선 방법

### 1. 🖼️ Next.js Image 컴포넌트 사용

일반 `<img>` 태그를 `<Image>` 컴포넌트로 교체하기만 해도 LCP가 크게 개선됩니다.

> 💡 **Next.js란?** 홈페이지를 만들 때 쓰는 개발 도구입니다. 이 도구의 Image 기능을 쓰면 이미지를 자동으로 최적화해줘요.

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

**🎉 효과**: LCP 평균 1.8초 단축

---

### 2. 🔤 폰트 최적화

외부 폰트 로딩은 LCP의 숨은 적입니다.

> 💡 **폰트(font)란?** 글자 모양을 결정하는 파일입니다. 나눔고딕, 나눔명조 같은 것들이 폰트예요. 이 파일을 외부에서 불러오면 속도가 느려질 수 있습니다.

```jsx
// next/font 사용 (최적화 자동 적용)
import { Noto_Sans_KR } from 'next/font/google'

const font = Noto_Sans_KR({
  subsets: ['latin'],
  display: 'swap', // 폰트 로딩 중 대체 폰트 표시
})
```

**🎉 효과**: FOUT(Flash of Unstyled Text — 폰트 로딩 전 잠깐 이상한 글자가 보이는 현상) 제거, FID 개선

---

### 3. 📐 이미지 dimensions 명시

CLS의 주요 원인은 이미지 크기 미지정입니다. 이미지가 로드되면서 레이아웃이 밀려납니다.

항상 `width`와 `height`를 명시하거나, `aspect-ratio` CSS를 사용하세요.

```css
.image-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
```

**🎉 효과**: CLS 0.28 → 0.02

---

### 4. ✂️ 코드 스플리팅

사용하지 않는 JavaScript를 초기 로드에서 제거합니다.

> 💡 **코드 스플리팅이란?** 한 번에 모든 코드를 불러오는 대신, 필요한 코드만 그때그때 불러오는 기법입니다. 마트에서 필요한 것만 장바구니에 담는 것처럼요!

```jsx
// 필요할 때만 로드
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <div>로딩 중...</div>,
  ssr: false, // 서버사이드 렌더링 불필요한 경우
})
```

**🎉 효과**: 초기 JS 번들 크기 40% 감소

---

### 5. 🖥️ 서버 컴포넌트 최대 활용

Next.js 13+의 App Router에서 기본은 서버 컴포넌트입니다. 클라이언트 상태가 필요 없는 컴포넌트는 서버 컴포넌트로 유지하세요.

> 💡 **서버 컴포넌트란?** 방문자 브라우저가 아닌 서버에서 미리 처리해서 완성된 화면을 보내주는 방식입니다. 방문자 입장에서는 훨씬 빠르게 느껴집니다!

```jsx
// 서버 컴포넌트 (default) - JavaScript 번들에 포함 안 됨
async function ProductList() {
  const products = await fetchProducts() // 서버에서 실행
  return <ul>{products.map(p => <li>{p.name}</li>)}</ul>
}
```

**🎉 효과**: 클라이언트 JS 번들 30-50% 감소

---

## 🏆 실측 결과

이 5가지를 모두 적용한 고객사의 실제 결과입니다.

| 지표 | Before | After |
|------|--------|-------|
| PageSpeed (모바일) | 63점 | **94점** 🚀 |
| LCP | 4.8초 | **1.3초** ⚡ |
| CLS | 0.28 | **0.02** ✅ |
| 바운스율 | 68% | **42%** 📈 |

---

## 🔎 지금 내 사이트 점수 확인하기

[PageSpeed Insights](https://pagespeed.web.dev)에서 무료로 확인할 수 있습니다. 점수가 70점 미만이라면 저희에게 문의해주세요. 무료 분석 리포트를 제공해드립니다.

→ **[무료 성능 분석 신청하기 — visionc.co.kr](https://visionc.co.kr)**
