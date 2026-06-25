import { MetadataRoute } from "next"

const BASE = "https://visionc.co.kr"

// 검색엔진 크롤러 지침 (App Router). 네이버 Yeti·구글봇 명시 허용 + 사이트맵 위치 안내.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "Yeti", allow: "/", disallow: ["/api/"] },        // 네이버
      { userAgent: "Googlebot", allow: "/", disallow: ["/api/"] },   // 구글
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
