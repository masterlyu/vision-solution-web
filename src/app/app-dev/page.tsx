import Link from 'next/link'

const techs = [
  { name: 'React Native', desc: 'iOS + Android 동시 개발' },
  { name: 'Capacitor', desc: '기존 웹앱을 앱으로 변환' },
  { name: 'PWA', desc: '설치 없는 웹앱 경험' },
  { name: 'REST API', desc: '기존 웹서버 연동' },
  { name: 'Push 알림', desc: 'FCM 기반 실시간 알림' },
  { name: 'App Store', desc: 'iOS/Android 스토어 출시' },
]

export default function AppDevPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#C8001F] text-sm font-medium mb-3 tracking-widest">APP DEVELOPMENT</p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">앱 개발</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            기존 웹사이트·시스템과 연계되는<br />
            iOS · Android 하이브리드 앱 개발.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">왜 하이브리드 앱인가?</h2>
            <div className="space-y-4">
              {[
                ['비용 절감', '네이티브 앱 대비 개발비 40~60% 절감'],
                ['빠른 출시', '단일 코드베이스로 iOS·Android 동시 배포'],
                ['기존 연동', '현재 운영 중인 웹/DB와 바로 연결'],
                ['유지보수', '웹과 동일한 기술로 관리 부담 최소화'],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-3">
                  <span className="text-[#C8001F] font-bold mt-0.5">✓</span>
                  <div>
                    <div className="text-white font-medium text-sm">{t}</div>
                    <div className="text-gray-500 text-xs">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white mb-6">활용 기술</h2>
            <div className="grid grid-cols-2 gap-3">
              {techs.map(t => (
                <div key={t.name} className="glass rounded-xl p-4 hover:border-[#C8001F]/40 transition-all">
                  <div className="text-white font-bold text-sm mb-1">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/contact"
            className="inline-block px-10 py-4 bg-[#C8001F] text-white font-bold rounded-xl hover:bg-[#E0001F] transition-all glow-red">
            앱 개발 상담 →
          </Link>
        </div>
      </div>
    </div>
  )
}
