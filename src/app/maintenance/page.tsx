'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CheckSquare, ChevronDown, ChevronUp, Shield, PenLine, Eye, BarChart3 } from 'lucide-react'

const checklistItems = [
  '홈페이지를 만든 업체와 연락이 끊겼다',
  '글 하나 수정하려면 개발자를 찾아야 한다',
  '보안 업데이트를 마지막으로 한 게 언제인지 모른다',
  '사이트가 느려졌는데 원인을 모른다',
  '고객이 "사이트 오류가 났다"고 연락해서 처음 알았다',
  '매달 얼마 내는지도 모르는 호스팅 계약이 있다',
]

const stats = [
  { value: '68%', label: '중소기업 보안 업데이트 미적용 비율' },
  { value: '56%', label: 'WordPress 해킹 중 구버전 플러그인 원인' },
  { value: '4.7h', label: '모니터링 없을 때 사이트 다운 인지 평균' },
  { value: '3~8건', label: '장애 1시간당 손실 문의 건수' },
]

const solutions = [
  { icon: Shield,    title: '보안 패치',           desc: '취약점 발견 시 즉시 업데이트. 해킹 피해 사전 차단.' },
  { icon: PenLine,   title: '콘텐츠 수정',          desc: '요청 후 영업일 1일 내 처리. 기다릴 필요 없습니다.' },
  { icon: Eye,       title: '24시간 모니터링',      desc: '사이트 다운되면 담당자가 먼저 연락합니다.' },
  { icon: BarChart3, title: '월간 리포트',          desc: '방문자·속도·보안 상태를 매달 정리해서 드립니다.' },
]

const plans = [
  {
    name: 'Basic', price: '월 99,000원',
    items: ['월 3회 콘텐츠 수정', '보안 패치 월 1회', '이메일 지원', '월간 리포트'],
    excluded: ['업타임 모니터링', '소규모 기능 추가'],
    highlight: false,
  },
  {
    name: 'Standard', price: '월 199,000원',
    items: ['무제한 콘텐츠 수정', '보안 패치 즉시 적용', '카카오톡 채널 지원', '주간 리포트', '업타임 모니터링'],
    excluded: ['소규모 기능 추가'],
    highlight: true,
  },
  {
    name: 'Premium', price: '월 399,000원',
    items: ['무제한 수정', '24시간 모니터링', '전화·카톡 우선 지원', '월간 성과 리포트', '소규모 기능 추가'],
    excluded: [],
    highlight: false,
  },
]

const steps = [
  { num: '01', title: '현재 사이트 점검', duration: '무료', desc: '서버 환경, 보안 현황, 플러그인 버전 체크.' },
  { num: '02', title: '플랜 선택 & 계약', duration: '최소 3개월', desc: '현재 상황에 맞는 플랜 추천 후 계약.' },
  { num: '03', title: '유지보수 시작',   duration: '즉시', desc: '담당자 배정. 카카오 채널 또는 이메일 연동.' },
  { num: '04', title: '정기 리포트',     duration: '매월', desc: '사이트 상태 리포트 발송. 이상 시 사전 고지.' },
]

const faqs = [
  { q: '지금 당장 계약하면 언제부터 관리가 시작되나요?', a: '계약 완료 후 영업일 기준 2일 내에 현재 사이트 점검을 시작합니다. 그날부터 모니터링이 켜집니다.' },
  { q: '콘텐츠 수정은 어디까지 포함되나요?', a: '텍스트·이미지·메뉴 수정이 포함됩니다. 새 페이지 추가나 기능 개발은 별도 견적 대상입니다.' },
  { q: '어떤 방식으로 수정 요청을 하면 되나요?', a: '카카오톡 채널 또는 이메일로 요청하시면 됩니다. Standard 이상은 담당자와 1:1 채널이 개설됩니다.' },
  { q: '중간에 해지할 수 있나요?', a: '최소 계약 기간 3개월 이후에는 한 달 전 통보로 해지할 수 있습니다. 위약금은 없습니다.' },
  { q: 'WordPress가 아닌 다른 플랫폼도 관리 가능한가요?', a: '네. 자체 개발 사이트, Cafe24, 그누보드 등도 관리 가능합니다. 상담 시 사이트 종류를 알려주시면 확인해드립니다.' },
  { q: '유지보수 중 해킹이 발생하면 어떻게 되나요?', a: 'Standard 이상 플랜에서 계약 기간 중 해킹 피해 발생 시, 복구 작업을 추가 비용 없이 진행합니다.' },
]

export default function MaintenancePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-28 pb-20 px-6 bg-background" style={{ background: 'radial-gradient(ellipse at bottom right, rgba(220,38,38,0.15) 0%, var(--background) 60%)' }}>
        <div className="max-w-6xl mx-auto">
          <span className="inline-block border border-destructive/50 text-red-400 text-xs font-bold px-3 py-1 rounded-full mb-6">홈페이지 유지보수</span>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 max-w-2xl">
            홈페이지 만들고 방치하다<br />
            <span className="text-destructive">해킹당한</span> 사장님이 생각보다 많습니다
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
            월 99,000원으로 보안·수정·장애 대응을<br />
            한 파트너에게 맡기세요.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base">
            어떤 플랜이 맞는지 무료 상담받기 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">혹시 이런 상황이세요?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {checklistItems.map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-5 flex items-start gap-3 border-l-2 border-transparent hover:border-destructive transition-all">
                <CheckSquare className="w-5 h-5 text-red-300 mt-0.5 shrink-0" />
                <span className="text-gray-800 font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="border-l-4 border-destructive bg-red-50 px-6 py-4 rounded-r-xl">
            <p className="text-gray-800 font-semibold">하나라도 해당된다면, 지금 당장 유지보수가 필요합니다.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center p-6">
                <div className="text-4xl font-black text-destructive mb-2">{s.value}</div>
                <div className="text-gray-400 text-sm leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">유지보수 후 이렇게 달라집니다</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {solutions.map((s, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">{s.title}</p>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">내 사이트에 맞는 플랜을 선택하세요</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((p, i) => (
              <div key={i} className={`rounded-2xl p-8 border-2 relative ${p.highlight ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'}`}>
                {p.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">★ 추천</span>}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{p.name}</h3>
                <p className={`text-2xl font-black mb-6 ${p.highlight ? 'text-primary' : 'text-gray-700'}`}>{p.price}</p>
                <ul className="space-y-2 mb-4">
                  {p.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-primary font-bold">✓</span> {item}
                    </li>
                  ))}
                  {p.excluded.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                      <span>—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition-all">
              플랜 추천받기 <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">진행 방식</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-sm font-black mb-4">{s.num}</div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-900">{s.title}</span>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-medium">{s.duration}</span>
                </div>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">자주 묻는 질문</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900">
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-primary shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 bg-background text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">지금 사이트 상태가 걱정된다면</h2>
          <p className="text-muted-foreground text-lg mb-8">현재 보안 상태를 무료로 점검해드립니다.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-10 py-4 rounded-xl transition-all text-lg">
            무료 보안 점검 신청하기 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
