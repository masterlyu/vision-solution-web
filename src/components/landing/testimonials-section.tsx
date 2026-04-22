'use client'
import { useEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'

const reviews = [
  {
    quote: <>홈페이지가 단순 회사 소개 수준이라 문의가 거의 없었어요. Vision Solution이 리뉴얼해준 뒤 한 달 만에 온라인 견적 문의가 <strong className="font-bold text-primary">5배</strong> 늘었습니다. 바이어들이 '홈페이지 보고 신뢰가 생겼다'고 직접 말할 정도예요.</>,
    name: '박성준', role: '대표이사 · (주)한국정밀기계', stars: 5,
  },
  {
    quote: <>고객 문의가 하루에도 수십 건씩 들어오는데 일일이 답하기가 벅찼어요. AI 상담 챗봇 도입 후 <strong className="font-bold text-primary">고객 응대 시간이 70% 줄었고</strong>, 야간·주말에도 리드를 놓치지 않게 됐습니다. 팀이 핵심 업무에만 집중할 수 있게 됐어요.</>,
    name: '김민지', role: 'CMO · 페이링크(주)', stars: 5,
  },
  {
    quote: <>포트폴리오 사진만 올려뒀던 구식 홈페이지를 새로 만들었는데, 구글 검색 유입이 <strong className="font-bold text-primary">3배</strong> 늘고 상담 전환율이 <strong className="font-bold text-primary">12%에서 31%로 올랐습니다</strong>. 이제는 광고비를 줄여도 문의가 더 많이 들어와요.</>,
    name: '이수현', role: '대표 · 모던하우스 인테리어', stars: 5,
  },
  {
    quote: <>전화 예약 업무에 직원이 거의 반나절을 쏟고 있었어요. 앱 하나로 예약·알림·차트 연동이 자동화되고 나서 <strong className="font-bold text-primary">전화 예약이 80% 줄었습니다</strong>. 직원들이 환자 케어에 집중할 수 있게 됐고, 전분기 대비 매출도 <strong className="font-bold text-primary">23% 올랐어요</strong>.</>,
    name: '정우진', role: '원장 · 서울스마일치과', stars: 5,
  },
  {
    quote: <>학원 운영하면서 홈페이지는 거의 방치하고 블로그만 했는데, Vision Solution이 커리큘럼·후기·상담 신청을 한 곳에 정리해주니까 <strong className="font-bold text-primary">신규 상담 신청이 2배 넘게</strong> 늘었어요. '어떻게 알고 오셨냐'고 물으면 요즘은 절반 이상이 '홈페이지 보고'라고 해요.</>,
    name: '최은영', role: '원장 · 영재사고력수학학원', stars: 5,
  },
]

export function TestimonialsSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">TESTIMONIALS</p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground">실제 고객이 경험한 변화</h2>
          <p className="text-muted-foreground mt-4 text-lg">비슷한 고민을 가진 기업이 먼저 결과를 냈습니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={r.name} className={`bg-card border border-border rounded-2xl p-8 flex flex-col gap-6 transition-all duration-700 hover:border-primary/40 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="flex gap-1">
                {Array.from({ length: r.stars }).map((_, j) => <Star key={j} className="w-4 h-4 fill-primary text-primary" />)}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">"{r.quote}"</p>
              <div>
                <div className="text-foreground font-bold text-sm">{r.name}</div>
                <div className="text-muted-foreground text-xs mt-0.5">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
