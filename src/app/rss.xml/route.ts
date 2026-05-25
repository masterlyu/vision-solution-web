import { getAllPosts } from '@/lib/blog'

const BASE = 'https://visionc.co.kr'

export async function GET() {
  const posts = getAllPosts()

  const items = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${BASE}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE}/blog/${post.slug}</guid>
      <description><![CDATA[${post.summary}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category><![CDATA[${post.tag}]]></category>
    </item>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>비전솔루션 블로그</title>
    <link>${BASE}/blog</link>
    <description>중소기업 홈페이지 보안·AI 챗봇·리뉴얼·앱 개발 실무 정보</description>
    <language>ko</language>
    <copyright>Copyright (주)비전솔루션</copyright>
    <managingEditor>contact@visionc.co.kr</managingEditor>
    <webMaster>contact@visionc.co.kr</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE}/logo.svg</url>
      <title>비전솔루션 블로그</title>
      <link>${BASE}/blog</link>
    </image>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
