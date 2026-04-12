import Link from 'next/link'
import { Star } from 'lucide-react'

const posts = [
  { tag: '리뉴얼 사례', title: '리뉴얼 후 문의량 3.2배 — ○○유통 Before/After',  date: '2026-04-05', summary: '10년 된 PHP 사이트를 Next.js로 교체한 결과 PageSpeed 38→91점, 이탈률 72%→41%로 개선됐습니다.', href: '#' },
  { tag: '보안 경고',   title: '중소기업 사이트 10곳 중 8곳, 기본 보안 헤더 없음', date: '2026-03-28', summary: '무작위 100개 중소기업 사이트 점검 결과, 83%가 X-Content-Type-Options 미설정. 실제 공격 시나리오와 대응법.', href: '#' },
  { tag: 'AI 활용',    title: '직원 3명 쇼핑몰이 AI 챗봇으로 CS 80% 절감한 방법', date: '2026-03-15', summary: '하루 50건 문의 중 40건을 AI가 자동 처리. 도입 비용과 ROI 계산서를 공개합니다.', href: '#' },
  { tag: '개발 팁',    title: 'Core Web Vitals 60점대 → 94점으로 올린 5가지 방법',  date: '2026-03-08', summary: '이미지 최적화, 폰트 로딩 전략, 코드 스플리팅... 실제 적용한 방법을 코드와 함께 설명합니다.', href: '#' },
]

export default function BlogPage() {
  return (
    <div className="section min-h-screen pt-28 bg-[#09090B]">
      <div className="container-base">
        <div className="text-center mb-16">
          <span className="label">BLOG</span>
          <h1 className="section-title">인사이트 & 사례</h1>
          <p className="section-sub">실전에서 검증된 웹 전략과 AI 활용법을 공유합니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map(post => (
            <Link key={post.title} href={post.href} className="card group block">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-brand font-bold bg-brand/10 px-2.5 py-1 rounded-full">{post.tag}</span>
                <span className="text-neutral-400 text-sm">{post.date}</span>
              </div>
              <h2 className="text-white font-bold text-base mb-3 group-hover:text-brand transition-colors leading-snug">{post.title}</h2>
              <p className="text-neutral-300 text-sm leading-relaxed">{post.summary}</p>
              <div className="mt-5 text-brand text-sm font-semibold">읽기 →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
