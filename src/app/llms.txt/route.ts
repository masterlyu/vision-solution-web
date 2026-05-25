import { getAllPosts } from '@/lib/blog'

const BASE = 'https://visionc.co.kr'

export async function GET() {
  const posts = getAllPosts()

  const blogLines = posts
    .map(p => `- [${p.title}](${BASE}/blog/${p.slug}): ${p.summary}`)
    .join('\n')

  const text = `# (주)비전솔루션 — Vision Solution

> 중소기업 홈페이지 보안 진단·AI 챗봇·홈페이지 리뉴얼·앱 개발 전문 IT 솔루션 회사.
> URL 하나로 48시간 내 AI 보안 진단 무료 제공.

## 주요 서비스

- [홈페이지 보안 진단](${BASE}/security): AI 기반 홈페이지 보안 취약점 자동 진단. 중소기업 무료 제공.
- [AI 챗봇 도입](${BASE}/ai-solution): 반복 문의 70% 자동화. 24시간 고객 응대 AI 챗봇 구축.
- [홈페이지 리뉴얼](${BASE}/renewal): 전환율 중심 홈페이지 리뉴얼. 문의량 3배 사례 다수.
- [신규 홈페이지 제작](${BASE}/new-website): 중소기업 맞춤형 홈페이지 제작.
- [앱 개발](${BASE}/app-dev): iOS·Android 앱 외주 개발.
- [유지보수](${BASE}/maintenance): 홈페이지 운영 유지보수·장애 대응.
- [무료 상담](${BASE}/contact): 부담 없는 1:1 상담. 당일 회신 보장.

## 블로그 — 중소기업 IT 실무 정보

${blogLines}

## 회사 정보

- 상호: (주)비전솔루션
- 서비스: 홈페이지 보안, AI 챗봇, 홈페이지 제작·리뉴얼, 앱 개발, 유지보수
- 대상 고객: 중소기업, 소상공인
- 홈페이지: ${BASE}
- 상담 문의: ${BASE}/contact
`

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  })
}
