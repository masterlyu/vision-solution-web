import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts, getAllTags } from '@/lib/blog'
import Mascot from '@/components/Mascot'

export const metadata: Metadata = {
  title: '홈페이지·보안·AI 인사이트 블로그',
  description: '중소기업 사장님을 위한 홈페이지·보안·AI 실전 가이드. 실제 사례와 수치를 공개합니다.',
  keywords: ['중소기업 블로그', '홈페이지 보안', 'AI 챗봇 사례', '홈페이지 리뉴얼 사례', '(주)비젼솔루션 블로그'],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: '홈페이지·보안·AI 인사이트 블로그 | Vision Solution',
    description: '중소기업 사장님을 위한 홈페이지·보안·AI 실전 가이드. 실제 사례와 수치를 공개합니다.',
    url: 'https://visionc.co.kr/blog',
    siteName: 'Vision Solution',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: '(주)비젼솔루션 블로그' }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '홈페이지·보안·AI 인사이트 블로그 | Vision Solution',
    description: '중소기업 사장님을 위한 홈페이지·보안·AI 실전 가이드.',
    images: ['/api/og'],
  },
}

const TAG_COLORS: Record<string, string> = {
  // 파랑 — 리뉴얼
  '리뉴얼 사례':   'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]',
  '리뉴얼 비용':   'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]',
  '홈페이지 리뉴얼': 'bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]',
  // 빨강 — 보안
  '보안 경고':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '보안 점검':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '보안 진단':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '웹 보안':       'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '웹보안':        'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '웹 보안 진단':  'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '중소기업 보안':  'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '홈페이지 보안':  'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '랜섬웨어':      'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '해킹 방지':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '해킹 방어':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '사이버보안':    'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'KISA':          'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'AI공격':        'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '보안체크리스트': 'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '사기 예방':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '보안':          'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '다크웹':        'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '사이버 공격':   'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '보안 취약점':   'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'AI 해킹':       'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '모의해킹':      'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '공공기관 보안':  'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '해킹 예방':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'AI 보안':       'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'AI 보안정책':   'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '침해사고':      'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '홈페이지 해킹':  'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '보안 헤더':     'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '취약점':        'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '데이터 보안':   'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'HTTPS':         'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'ASM':           'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'API 키 관리':   'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '정보보호':      'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '개인정보 보호': 'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  'KISA 무료 지원': 'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '안전진단':      'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '섀도AI':        'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  '데이터거버넌스': 'bg-[var(--accent-red)]/10 text-[var(--accent-red)]',
  // primary — AI · 자동화
  'AI 활용':       'bg-primary/10 text-primary',
  'AI 영상':       'bg-primary/10 text-primary',
  '소라 대안':     'bg-primary/10 text-primary',
  'AI 솔루션':     'bg-primary/10 text-primary',
  'AI 뉴스':       'bg-primary/10 text-primary',
  '중소기업 AI':   'bg-primary/10 text-primary',
  '오픈소스 AI':   'bg-primary/10 text-primary',
  '업무 자동화':   'bg-primary/10 text-primary',
  '무료 AI':       'bg-primary/10 text-primary',
  '소상공인 AI':   'bg-primary/10 text-primary',
  'AI 에이전트':   'bg-primary/10 text-primary',
  '무료 AI 도구':  'bg-primary/10 text-primary',
  'ChatGPT':       'bg-primary/10 text-primary',
  '로컬 AI':       'bg-primary/10 text-primary',
  '챗봇':          'bg-primary/10 text-primary',
  'AI 생산성':     'bg-primary/10 text-primary',
  'AI 도구':       'bg-primary/10 text-primary',
  '오피스 자동화': 'bg-primary/10 text-primary',
  '회의록 자동화': 'bg-primary/10 text-primary',
  '클로드':        'bg-primary/10 text-primary',
  'Gemini':        'bg-primary/10 text-primary',
  'Google Antigravity': 'bg-primary/10 text-primary',
  '구글 AI':       'bg-primary/10 text-primary',
  '생성형 AI':     'bg-primary/10 text-primary',
  '중소기업AI':    'bg-primary/10 text-primary',
  '사내 AI 채팅':  'bg-primary/10 text-primary',
  'Open WebUI':    'bg-primary/10 text-primary',
  'AI 글쓰기':     'bg-primary/10 text-primary',
  'AI홈페이지':    'bg-primary/10 text-primary',
  'AI챗봇':        'bg-primary/10 text-primary',
  'Colibri':       'bg-primary/10 text-primary',
  'GLM-5.2':       'bg-primary/10 text-primary',
  '유튜브 BGM':    'bg-primary/10 text-primary',
  '생성형AI':      'bg-primary/10 text-primary',
  '업무효율':      'bg-primary/10 text-primary',
  '업무자동화':    'bg-primary/10 text-primary',
  'AI 자동화':     'bg-primary/10 text-primary',
  '반복업무 제거': 'bg-primary/10 text-primary',
  '컴퓨터 자동화': 'bg-primary/10 text-primary',
  'DeepSeek':      'bg-primary/10 text-primary',
  'Anthropic':     'bg-primary/10 text-primary',
  'GPT-6':         'bg-primary/10 text-primary',
  '지식관리':      'bg-primary/10 text-primary',
  '구조도 자동화': 'bg-primary/10 text-primary',
  '무료 도구':     'bg-primary/10 text-primary',
  '이미지 생성':   'bg-primary/10 text-primary',
  'Flowise':       'bg-primary/10 text-primary',
  'AI 이미지 편집': 'bg-primary/10 text-primary',
  'SenseNova U1':  'bg-primary/10 text-primary',
  '포토샵 대안':   'bg-primary/10 text-primary',
  // 초록 — 개발
  '개발 팁':       'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  '앱 개발':       'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  '오픈소스':      'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  'SemIf':         'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  '바이브코딩':    'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  '노코드':        'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  'GitHub':        'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  'GitHub 트렌딩': 'bg-[var(--accent-green)]/10 text-[var(--accent-green)]',
  // 앰버 — 홈페이지 · 비즈니스
  '홈페이지 제작': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '유지보수':      'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '중소기업':      'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '소상공인':      'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '마이크로소프트': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'SEO':           'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'SEO 최적화':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'SNS 마케팅':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '온라인마케팅':  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '홈페이지 진단': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '중소기업 마케팅': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '소상공인 마케팅': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '비용 절감':     'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'AI 비용 절감':  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '중소기업 AI 도입': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '경쟁사 분석':   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '마케팅 도구':   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '중소기업 지원사업': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '정부 지원':     'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '정부지원사업':  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'GEO':           'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'AEO':           'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '검색최적화':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '디지털전환':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '온라인 쇼핑':   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '매출 자동화':   'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '초보자 가이드': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '체크리스트':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '모두의AI':      'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '4K 상품 사진':  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '워드프레스 유지보수': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '중소기업 홈페이지': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'Wix Symphony':  'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '마케팅':        'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '마케팅 AI':     'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '마케팅 자동화': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'SNS 자동화':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  'E-E-A-T':       'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '검색엔진최적화': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '광고비용':      'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '네이버광고':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '구글 알고리즘': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '구글 코어 업데이트': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '구글 코어업데이트': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '카카오톡 마케팅': 'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
  '카카오채널':    'bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]',
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
        <div className="mt-20 bg-primary/5 border border-primary/20 rounded-xl p-8 md:p-12 text-center">
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
