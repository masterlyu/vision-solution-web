import UrlAnalysisForm from '@/components/UrlAnalysisForm'

const checkItems = [
  { icon: '🔐', title: 'SSL/TLS 분석', desc: '인증서 유효성, 암호화 강도, HSTS 설정 확인' },
  { icon: '🛡️', title: '보안 헤더', desc: 'CSP, X-Frame-Options, X-XSS-Protection 등 누락 여부' },
  { icon: '🔍', title: '공개 취약점', desc: 'CVE 데이터베이스 기반 사용 중인 라이브러리 취약점 조회' },
  { icon: '📂', title: '노출 정보', desc: '오픈 디렉토리, 민감 파일 노출, 에러 정보 누출 확인' },
  { icon: '📝', title: '입력 폼 점검', desc: 'XSS 기초 점검, 비암호화 폼 전송 확인' },
  { icon: '📊', title: '종합 리포트', desc: '위험도 등급별 취약점 목록 + 조치 가이드 PDF' },
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#C8001F] text-sm font-medium mb-3 tracking-widest">SECURITY AUDIT</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            웹 보안 진단
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            해킹보다 먼저 발견합니다.<br />
            비침투적 방식으로 취약점을 찾고 해결책을 제시합니다.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs px-4 py-2 rounded-full">
            ⚠️ 본인 소유 또는 허가된 사이트에만 신청 가능합니다
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">진단 항목</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {checkItems.map(item => (
                <div key={item.title} className="glass rounded-xl p-5 hover:border-[#C8001F]/40 transition-all">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h3 className="text-white font-bold mb-1 text-sm">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <UrlAnalysisForm
              serviceType="security"
              title="보안 진단 신청"
              notice="진단 결과는 위험도 HIGH/MEDIUM/LOW로 분류되어 PDF로 발송됩니다. 실제 침투 테스트가 아닌 비침투적 분석입니다."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
