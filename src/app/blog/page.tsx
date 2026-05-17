import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, getAllTags } from '@/lib/blog'
import Mascot from '@/components/Mascot'

export const metadata: Metadata = {
  title: '홈페이지·보안·AI 인사이트 블로그',
  description: '중소기업 사장님을 위한 홈페이지·보안·AI 실전 가이드. 실제 사례와 수치를 공개합니다.',
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

interface PageProps {
  searchParams: Promise<{ tag?: string }>
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { tag: rawTag } = await searchParams
  const allPosts = getAllPosts()
  const tags = getAllTags()
  const knownTags = new Set(tags)
  const activeTag = rawTag && knownTags.has(rawTag) ? rawTag : undefined
  const posts = activeTag ? allPosts.filter(p => p.tag === activeTag) : allPosts

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-center mb-6">
            <Mascot pose="blog" category="service" size="sm" className="h-32 w-auto" alt="VISIONC 마스코트 — 블로그" />
          </div>
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
                className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-200 group block"
              >
                {/* Cover Image */}
                {post.image && (
                  <div className="relative w-full h-44 overflow-hidden bg-muted">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      unoptimized={post.image.endsWith('.svg')}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="p-6">
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
                  {/* Tags */}
                  {post.tags && post.tags.length > 1 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.slice(1).map(t => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 text-primary text-sm font-semibold">읽기 →</div>
                </div>
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
