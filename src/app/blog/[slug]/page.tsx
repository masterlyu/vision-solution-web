import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { markdownToHtml, extractHeadings } from '@/lib/markdownToHtml'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

const BASE = 'https://visionc.co.kr'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const url = `${BASE}/blog/${slug}`
  // SNS/LLM 공유 미리보기: SVG는 카카오·페북·X가 렌더 못 하므로 PNG(OG 라우트) 사용 — 글 제목·태그 주입
  const ogImage = `${BASE}/api/og?title=${encodeURIComponent(post.title)}&tag=${encodeURIComponent(post.tag)}`
  return {
    title: `${post.title} | (주)비젼솔루션 블로그`,
    description: post.summary,
    keywords: post.tags.join(', '),
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      url,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: ['(주)비젼솔루션'],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [ogImage],
    },
  }
}

const TAG_COLORS: Record<string, string> = {
  '리뉴얼 사례': 'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]',
  '리뉴얼 비용': 'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]',
  '보안 경고':   'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '보안 점검':   'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'AI 활용':     'bg-primary/10 text-primary',
  'AI 솔루션':   'bg-primary/10 text-primary',
  '개발 팁':     'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  '앱 개발':     'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  '홈페이지 제작': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '유지보수':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
}

function tagClass(tag: string) {
  return TAG_COLORS[tag] ?? 'bg-primary/10 text-primary'
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const contentHtml = markdownToHtml(post.content)
  const headings = extractHeadings(post.content)
  const readingMinutes = Math.max(1, Math.round(post.content.split(/\s+/).length / 250))

  // Get related posts (same tag, excluding current)
  const allPosts = getAllPosts()
  const related = allPosts.filter(p => p.slug !== slug && p.tag === post.tag).slice(0, 2)

  const pageUrl = `${BASE}/blog/${slug}`
  const imageUrl = post.image ? `${BASE}${post.image}` : `${BASE}/api/og`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    image: imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(', '),
    author: {
      '@type': 'Organization',
      name: '(주)비젼솔루션',
      url: BASE,
    },
    publisher: {
      '@type': 'Organization',
      name: '(주)비젼솔루션',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    url: pageUrl,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: BASE },
      { '@type': 'ListItem', position: 2, name: '블로그', item: `${BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl },
    ],
  }

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-[800px] mx-auto px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground flex items-center gap-2">
          <Link href="/blog" className="hover:text-foreground transition-colors">블로그</Link>
          <span>/</span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${tagClass(post.tag)}`}>{post.tag}</span>
        </nav>

        {/* Hero Image */}
        {post.image && (
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-10 bg-muted">
            <Image
              src={post.image}
              alt={post.title}
              fill
              unoptimized={post.image.endsWith('.svg')}
              className="object-cover"
              sizes="(max-width: 800px) 100vw, 800px"
              priority
            />
          </div>
        )}

        {/* Post Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            <time dateTime={post.date}>{post.date}</time>
            <span>·</span>
            <span>(주)비젼솔루션</span>
            <span>·</span>
            <span>약 {readingMinutes}분</span>
          </div>
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map(t => (
                <Link
                  key={t}
                  href={`/blog?tag=${encodeURIComponent(post.tag)}`}
                  className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  #{t}
                </Link>
              ))}
            </div>
          )}
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-4">
            {post.summary}
          </p>
        </header>

        {/* Table of Contents */}
        {headings.length > 0 && (
          <details
            className="mb-10 bg-muted/40 border border-border rounded-2xl overflow-hidden"
            open
          >
            <summary className="cursor-pointer px-6 py-4 font-bold text-foreground text-sm flex items-center justify-between select-none list-none">
              <span>📋 목차</span>
              <span className="text-xs text-muted-foreground font-normal">클릭하여 접기/펼치기</span>
            </summary>
            <ol className="px-6 pb-5 pt-1 space-y-2">
              {headings.map((h, idx) => (
                <li key={h.id} className="flex items-start gap-2.5 text-sm">
                  <span className="text-primary font-bold shrink-0">{idx + 1}.</span>
                  <a
                    href={`#${h.id}`}
                    className="text-foreground/80 hover:text-primary transition-colors leading-snug"
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        )}

        {/* Post Content */}
        <article
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* CTA Section — auto-inserted */}
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
          <h2 className="text-xl md:text-2xl font-black text-foreground mb-3">
            우리 회사도 이렇게 할 수 있을까요?
          </h2>
          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            무료 상담을 통해 현재 상황에 맞는 솔루션을 제안해드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-primary text-primary-foreground font-bold px-7 py-3 rounded-xl hover:bg-primary/90 transition-colors"
            >
              무료 상담 신청
            </Link>
            <Link
              href="/blog"
              className="inline-block border border-border text-foreground font-semibold px-7 py-3 rounded-xl hover:bg-muted transition-colors"
            >
              다른 글 보기
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-bold text-foreground mb-6">관련 글</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map(p => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-all duration-200 group"
                >
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tagClass(p.tag)}`}>{p.tag}</span>
                  <h4 className="mt-3 text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {p.title}
                  </h4>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{p.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="text-muted-foreground text-sm hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← 블로그 목록
          </Link>
        </div>

      </div>
    </div>
  )
}
