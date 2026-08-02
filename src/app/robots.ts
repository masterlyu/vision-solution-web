import { MetadataRoute } from "next"

const BASE = "https://visionc.co.kr"

// 생성형 AI 검색이 우리 콘텐츠를 인용하려면 그 크롤러가 들어올 수 있어야 한다(GEO).
// 반대로 학습용 대량 수집만 하고 트래픽을 돌려주지 않는 스크래퍼는 막는다.
const AI_SEARCH = [
  "GPTBot", "ChatGPT-User", "OAI-SearchBot",   // OpenAI
  "Google-Extended", "Gemini-Web",              // 구글 AI
  "ClaudeBot", "anthropic-ai", "Claude-Web",    // Anthropic
  "PerplexityBot", "Applebot",                  // 퍼플렉시티·애플
]
const SCRAPERS = ["CCBot", "Bytespider", "Amazonbot", "meta-externalagent", "Applebot-Extended"]

// 검색엔진 크롤러 지침 (App Router). ★public/robots.txt는 App Router에 가려 서빙되지
// 않으므로 이 파일이 유일한 정본이다(과거 두 파일이 공존해 설정이 죽어 있었음).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "Yeti", allow: "/", disallow: ["/api/"] },        // 네이버
      { userAgent: "Googlebot", allow: "/", disallow: ["/api/"] },   // 구글
      ...AI_SEARCH.map(ua => ({ userAgent: ua, allow: "/", disallow: ["/api/"] })),
      { userAgent: SCRAPERS, disallow: "/" },
    ],
    sitemap: [`${BASE}/sitemap.xml`, `${BASE}/rss.xml`],
    host: BASE,
  }
}
