const posts = [
  { tag: '웹 리뉴얼', title: '10년 된 PHP 쇼핑몰, Next.js로 전환 후 전환율 2.3배 상승', date: '2025.04.10', read: '5분' },
  { tag: '보안', title: 'SQL Injection으로 DB 탈취 위기, 48시간 내 패치 완료 사례', date: '2025.04.05', read: '4분' },
  { tag: 'AI 솔루션', title: '제조업체 ERP에 AI 붙여 재고 예측 정확도 87% 달성', date: '2025.03.28', read: '6분' },
  { tag: '앱 개발', title: '기존 쇼핑몰 → 앱 전환, 앱 매출 비중 40% 달성까지', date: '2025.03.20', read: '5분' },
  { tag: '유지보수', title: '서버 다운 2시간, 매출 손실 380만원... 예방 가능했던 이유', date: '2025.03.15', read: '3분' },
  { tag: '웹 리뉴얼', title: 'WordPress 속도 문제, 최적화로 PageSpeed 34 → 92 달성', date: '2025.03.08', read: '4분' },
]

const tagColors: Record<string, string> = {
  '웹 리뉴얼': 'bg-blue-500/20 text-blue-400',
  '보안': 'bg-red-500/20 text-red-400',
  'AI 솔루션': 'bg-purple-500/20 text-purple-400',
  '앱 개발': 'bg-green-500/20 text-green-400',
  '유지보수': 'bg-yellow-500/20 text-yellow-400',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[#C8001F] text-sm font-medium mb-3 tracking-widest">BLOG</p>
          <h1 className="text-4xl font-black text-white mb-4">프로젝트 & 인사이트</h1>
          <p className="text-gray-500">고객사 정보는 익명 처리됩니다</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <article key={post.title}
              className="glass rounded-2xl p-6 hover:border-[#C8001F]/40 transition-all group cursor-pointer">
              {/* Blurred client placeholder */}
              <div className="w-full h-32 bg-[#1A1A1A] rounded-xl mb-4 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center gap-4">
                  <div className="w-16 h-8 bg-[#2A2A2A] rounded blur-sm opacity-60" />
                  <div className="w-12 h-6 bg-[#333] rounded blur-sm opacity-40" />
                </div>
                <div className="absolute inset-0 backdrop-blur-md" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-600 text-xs">CLIENT CONFIDENTIAL</span>
                </div>
              </div>
              <span className={`inline-block px-2 py-1 text-xs rounded-md mb-3 ${tagColors[post.tag] || 'bg-gray-500/20 text-gray-400'}`}>
                {post.tag}
              </span>
              <h2 className="text-white font-bold leading-snug mb-3 group-hover:text-[#C8001F] transition-colors text-sm">
                {post.title}
              </h2>
              <div className="flex items-center justify-between text-gray-600 text-xs">
                <span>{post.date}</span>
                <span>읽기 {post.read}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
