const posts = [
  { tag: '웹 리뉴얼', title: '10년 된 PHP 쇼핑몰 → Next.js 전환, 전환율 2.3배 상승', date: '2025.04.10', read: '5분', emoji: '🔄' },
  { tag: '보안', title: 'SQL Injection 취약점 발견·48시간 내 패치 완료 사례', date: '2025.04.05', read: '4분', emoji: '🛡️' },
  { tag: 'AI 솔루션', title: '제조업체 ERP에 AI 붙여 재고 예측 정확도 87% 달성', date: '2025.03.28', read: '6분', emoji: '🤖' },
  { tag: '앱 개발', title: '기존 쇼핑몰 → 하이브리드 앱 전환, 앱 매출 40% 돌파', date: '2025.03.20', read: '5분', emoji: '📱' },
  { tag: '유지보수', title: '서버 다운 2시간으로 매출 손실 380만원... 예방 가능했던 이유', date: '2025.03.15', read: '3분', emoji: '🔧' },
  { tag: '웹 리뉴얼', title: 'WordPress PageSpeed 34→92, 방문자 이탈률 28% 감소', date: '2025.03.08', read: '4분', emoji: '⚡' },
]

const tagStyle: Record<string, string> = {
  '웹 리뉴얼': 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  '보안': 'bg-red-500/15 text-red-400 border-red-500/20',
  'AI 솔루션': 'bg-purple-500/15 text-purple-400 border-purple-500/20',
  '앱 개발': 'bg-green-500/15 text-green-400 border-green-500/20',
  '유지보수': 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="section-label">BLOG & PORTFOLIO</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">프로젝트 & 인사이트</h1>
          <p className="text-gray-500 text-sm">
            고객사 정보(로고·상호)는 모두 익명·블러 처리됩니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map(post => (
            <article key={post.title}
              className="glass rounded-2xl overflow-hidden card-hover cursor-pointer">
              {/* 썸네일 */}
              <div className="w-full h-36 bg-[#111] relative flex items-center justify-center">
                <div className="text-5xl opacity-20">{post.emoji}</div>
                {/* 블러 클라이언트 로고 효과 */}
                <div className="absolute inset-0 flex items-center justify-start px-6 gap-3">
                  <div className="w-20 h-7 bg-[#2A2A2A] rounded-md filter blur-sm" />
                  <div className="w-14 h-5 bg-[#222] rounded filter blur-sm" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#111] to-transparent" />
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/50 rounded text-[9px] text-gray-500 font-mono">CLIENT CONFIDENTIAL</div>
              </div>
              <div className="p-5">
                <span className={`tag border text-xs mb-3 ${tagStyle[post.tag] || 'bg-gray-500/15 text-gray-400 border-gray-500/20'}`}>
                  {post.tag}
                </span>
                <h2 className="text-white font-bold text-sm leading-snug mb-3 hover:text-[#C8001F] transition-colors">
                  {post.title}
                </h2>
                <div className="flex items-center justify-between text-gray-600 text-xs">
                  <span>{post.date}</span>
                  <span>읽기 {post.read}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-sm">더 많은 프로젝트 사례는 문의 시 NDA 체결 후 공유 가능합니다.</p>
        </div>
      </div>
    </div>
  )
}
