---
title: "중소기업 사이트 10곳 중 8곳, 기본 보안 헤더 없음"
date: "2026-03-28"
tag: "보안 경고"
summary: "무작위 100개 중소기업 사이트 점검 결과, 83%가 X-Content-Type-Options 미설정. 실제 공격 시나리오와 대응법."
---

## 조사 배경

저희 팀은 무작위 추출한 중소기업 홈페이지 100개를 대상으로 기본 보안 헤더 설정 여부를 점검했습니다. 결과는 예상보다 훨씬 심각했습니다.

## 주요 발견 사항

| 보안 헤더 | 미설정 비율 | 위험도 |
|-----------|-----------|--------|
| X-Content-Type-Options | **83%** | 중 |
| X-Frame-Options | **79%** | 높음 |
| Content-Security-Policy | **91%** | 매우 높음 |
| Strict-Transport-Security | **67%** | 높음 |
| Referrer-Policy | **88%** | 낮음 |

## 실제 공격 시나리오

### 1. Clickjacking (클릭재킹)

`X-Frame-Options`가 없으면 공격자는 여러분의 사이트를 투명한 iframe으로 덮은 가짜 페이지를 만들 수 있습니다.

방문자는 버튼을 클릭하는 것처럼 보이지만, 실제로는 숨겨진 iframe의 "동의" 버튼을 누르게 됩니다.

### 2. MIME 타입 스니핑

`X-Content-Type-Options: nosniff`가 없으면 브라우저가 파일 내용을 분석해 Content-Type을 임의로 변경할 수 있습니다.

예: 이미지로 위장한 JavaScript 파일이 실행될 수 있음

### 3. XSS(크로스 사이트 스크립팅)

CSP가 없으면 악의적인 스크립트가 여러분의 사이트에서 실행될 수 있습니다. 방문자의 쿠키, 세션, 개인정보를 탈취할 수 있습니다.

## 즉시 할 수 있는 조치

Next.js를 사용한다면 `next.config.js`에 다음을 추가하세요:

```javascript
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ],
  }]
}
```

Apache/Nginx 서버라면 서버 설정 파일에 직접 추가하거나, 저희에게 문의해주세요.

## 무료 보안 점검 서비스

저희는 모든 고객사에 **OWASP ZAP 기반 자동 보안 점검**을 무료로 제공합니다. 현재 내 사이트가 얼마나 취약한지 확인하고 싶으시면 지금 문의해주세요.
