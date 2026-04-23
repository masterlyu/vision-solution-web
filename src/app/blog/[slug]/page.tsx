import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { markdownToHtml } from '@/lib/markdownToHtml'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} | 비전솔루션 블로그`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

const TAG_COLORS: Record<string, string> = {
  '리뉴얼 사례': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  '보안 경고':   'bg-red-500/10 text-red-600 dark:text-red-400',
  'AI 활용':     'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  '개발 팁':     'bg-green-500/10 text-green-600 dark:text-green-400',
}

function tagClass(tag: string) {
  return TAG_COLORS[tag] ?? 'bg-primary/10 text-primary'
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const contentHtml = markdownToHtml(post.content)

  // Get related posts (same tag, excluding current)
  const allPosts = getAllPosts()
  const related = allPosts.filter(p => p.slug !== slug && p.tag === post.tag).slice(0, 2)

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[800px] mx-auto px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground flex items-center gap-2">
          <Link href="/blog" className="hover:text-foreground transition-colors">블로그</Link>
          <span>/</span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${tagClass(post.tag)}`}>{post.tag}</span>
        </nav>

        {/* Post Header */}
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            <time dateTime={post.date}>{post.date}</time>
            <span>·</span>
            <span>비전솔루션</span>
          </div>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-4">
            {post.summary}
          </p>
        </header>

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
