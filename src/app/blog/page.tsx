import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getAllTags } from '@/lib/blog'

export const metadata: Metadata = {
  title: '홈페이지·보안·AI 인사이트 블로그',
  description: '중소기업 사장님을 위한 홈페이지·보안·AI 실전 가이드. 실제 사례와 수치를 공개합니다.',
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

interface PageProps {
  searchParams: Promise<{ tag?: string }>
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { tag: activeTag } = await searchParams
  const allPosts = getAllPosts()
  const tags = getAllTags()
  const posts = activeTag ? allPosts.filter(p => p.tag === activeTag) : allPosts

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-12">
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">BLOG</p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">인사이트 & 사례</h1>
          <p className="text-muted-foreground text-lg">실전에서 검증된 웹 전략과 AI 활용법을 공유합니다.</p>
        </div>

        {/* Tag Filter */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <Link
              href="/blog"
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                !activeTag
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              전체
            </Link>
            {tags.map(tag => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  activeTag === tag
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <p className="text-muted-foreground py-16 text-center">해당 카테고리의 글이 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-200 group block"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tagClass(post.tag)}`}>
                    {post.tag}
                  </span>
                  <span className="text-muted-foreground text-sm">{post.date}</span>
                </div>
                <h2 className="text-foreground font-bold text-base mb-3 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{post.summary}</p>
                <div className="mt-5 text-primary text-sm font-semibold">읽기 →</div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-foreground mb-3">
            내 사이트도 개선할 수 있을까요?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            무료 분석 리포트로 현재 사이트의 문제점과 개선 방향을 확인해보세요.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-primary-foreground font-bold px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors"
          >
            무료 분석 신청하기
          </Link>
        </div>
      </div>
    </div>
  )
}
