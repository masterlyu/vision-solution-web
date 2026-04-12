import Link from 'next/link'
import { Paintbrush2, Smartphone, Zap, ShieldCheck, BarChart3, Settings } from 'lucide-react'

const features = [
  { icon: Paintbrush2,  title: '맞춤 UI/UX 설계',  desc: '업종·브랜드에 최적화된 독자적 디자인' },
  { icon: Smartphone,   title: '풀 반응형',          desc: '모바일·태블릿·PC 모든 화면에서 완벽 작동' },
  { icon: Zap,          title: '고속 최적화',         desc: 'Core Web Vitals 90점+ 목표, 빠른 초기 로딩' },
  { icon: ShieldCheck,  title: '보안 기본 탑재',      desc: 'SSL, 보안 헤더, XSS/SQL 인젝션 방어 기본 적용' },
  { icon: BarChart3,    title: 'SEO 최적화',          desc: '메타태그·구조화 데이터·사이트맵 자동 생성' },
  { icon: Settings,     title: 'CMS 연동',            desc: '비개발자도 직접 편집 가능한 관리 화면 구축' },
]

const steps = [
  { n: '01', title: '요구사항 분석', desc: '업종·목표 고객·경쟁사 분석' },
  { n: '02', title: '기획·와이어프레임', desc: '사이트맵·화면 구성·정보 구조 설계' },
  { n: '03', title: 'UI 디자인', desc: '브랜드 컬러·서체·레이아웃 시안 제시' },
  { n: '04', title: '개발·구축', desc: '프론트엔드+백엔드 개발·CMS 세팅' },
  { n: '05', title: '검수·론칭', desc: '크로스 브라우저·성능·보안 최종 검수 후 오픈' },
]

export default function NewWebsitePage() {
  return (
    <div className="section min-h-screen pt-28 bg-[#09090B]">
      <div className="container-base">
        <div className="text-center mb-16">
          <span className="label">NEW WEBSITE</span>
          <h1 className="section-title">신규 웹사이트 구축</h1>
          <p className="section-sub max-w-2xl mx-auto">
            처음부터 제대로 만들겠습니다.<br />기획·디자인·개발·론칭까지 원스톱으로 진행합니다.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="btn-primary">프로젝트 상담 신청 →</Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {features.map(f => (
            <div key={f.title} className="card group">
              <div className="icon-box"><f.icon className="w-5 h-5 text-brand" strokeWidth={1.5} /></div>
              <h3 className="text-white font-bold mb-2">{f.title}</h3>
              <p className="text-neutral-300 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mb-16">
          <h2 className="text-xl font-bold text-white mb-8 text-center">진행 프로세스</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {steps.map((s, i) => (
              <div key={s.n} className="flex-1 card text-center">
                <div className="w-9 h-9 rounded-full bg-brand text-white font-black text-sm flex items-center justify-center mx-auto mb-3">{s.n}</div>
                <h3 className="text-white font-bold text-sm mb-1">{s.title}</h3>
                <p className="text-neutral-300 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card-highlight text-center py-12">
          <h2 className="text-xl font-bold text-white mb-3">예산이 고민되시나요?</h2>
          <p className="text-neutral-300 mb-6 text-sm">규모·기능에 따라 300만원~부터 가능합니다. 먼저 무료 상담을 받아보세요.</p>
          <Link href="/contact" className="btn-primary">무료 견적 문의</Link>
        </div>
      </div>
    </div>
  )
}
