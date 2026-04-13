'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import UrlAnalysisForm from '@/components/UrlAnalysisForm'
import {
  ShieldAlert, CheckCircle, XCircle, AlertTriangle,
} from 'lucide-react'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

// Wrapper: fetches JSON from /public/lottie/ then renders Lottie
function LottiePlayer({ src, width = 200, height = 200, loop = true, className = '' }: {
  src: string; width?: number; height?: number; loop?: boolean; className?: string
}) {
  const [data, setData] = useState<object | null>(null)
  useEffect(() => {
    fetch(src).then(r => r.json()).then(setData).catch(() => {})
  }, [src])
  if (!data) return <div style={{ width, height }} />
  return (
    <Lottie
      animationData={data}
      loop={loop}
      autoplay
      style={{ width, height }}
      className={className}
    />
  )
}

const dangers = [
  {
    lottie: '/lottie/hacker.json',
    emoji: '💳',
    title: '고객 카드정보가 통째로 빠져나갑니다',
    desc: '보안 설정이 없는 쇼핑몰은 결제 페이지에서 카드번호와 비밀번호가 해커에게 실시간으로 전송됩니다. 고객은 아무것도 모른 채로.',
    case: '실제 사례: 국내 중소 쇼핑몰 — 3개월간 고객 2,300명 카드정보 유출 후 폐업.',
    color: 'red',
  },
  {
    lottie: '/lottie/warning.json',
    emoji: '💀',
    title: '내 사이트가 범죄 도구로 쓰입니다',
    desc: '해커가 내 사이트를 다른 사람 공격에 이용합니다. 모르는 사이에 범죄에 연루될 수 있습니다.',
    case: '실제 사례: 소규모 병원 홈페이지가 악성코드 유포지로 이용 → 구글 검색 완전 차단.',
    color: 'orange',
  },
  {
    lottie: '/lottie/alert.json',
    emoji: '📋',
    title: '고객 DB가 경쟁사 손에 들어갑니다',
    desc: '회원 정보, 주문 내역, 상담 내용이 그대로 노출됩니다. 개인정보보호법 위반 과태료 최대 3,000만원.',
    case: '실제 사례: 인테리어 업체 — 고객 견적 문의 DB 전체 유출, 경쟁사에 넘어감.',
    color: 'amber',
  },
  {
    lottie: '/lottie/scan.json',
    emoji: '🔍',
    title: '구글에서 영원히 사라집니다',
    desc: '구글은 악성코드 발견 즉시 검색 결과에서 제거합니다. 복구까지 수개월 걸립니다.',
    case: '실제 사례: 여행사 블로그 — 월 5천 방문자 → 해킹 후 구글 차단 → 방문자 0명.',
    color: 'blue',
  },
]

const colorMap: Record<string, string> = {
  red:    'border-red-500/30 bg-red-500/5',
  orange: 'border-orange-500/30 bg-orange-500/5',
  amber:  'border-amber-500/30 bg-amber-500/5',
  blue:   'border-blue-500/30 bg-blue-500/5',
}
const caseColorMap: Record<string, string> = {
  red:    'bg-red-500/10 border-red-500/20 text-red-400',
  orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
  amber:  'bg-amber-500/10 border-amber-500/20 text-amber-400',
  blue:   'bg-blue-500/10 border-blue-500/20 text-blue-400',
}

const checks = [
  { emoji: '🔒', title: '자물쇠가 제대로 잠겼나요?', sub: 'SSL/HTTPS', simple: '인터넷 뱅킹 할 때 주소창에 자물쇠 아이콘 보이시죠? 그게 없으면 고객이 입력하는 모든 정보가 암호화 없이 전송됩니다.', warn: 'HTTPS 없으면 공공 와이파이에서 누구나 데이터를 훔쳐볼 수 있습니다.' },
  { emoji: '🪟', title: '창문이 열려 있지는 않나요?', sub: '보안 헤더 6가지', simple: '현관문 자물쇠는 있는데 창문이 열려 있는 상황입니다. 보안 헤더는 창문·뒷문·지붕 구멍을 막는 역할입니다.', warn: '보안 헤더 1개 미설정 = 해킹 성공률 약 40% 상승.' },
  { emoji: '🕵️', title: '해커가 내 사이트를 정찰 중입니다', sub: '정보 노출 점검', simple: '해커들은 공격 전에 정찰합니다. 사용 중인 프로그램 버전이 노출되면 그 버전의 취약점으로 맞춤 공격을 받습니다.', warn: '워드프레스 버전 노출 → 자동 해킹봇 즉시 공격 시작.' },
  { emoji: '🚪', title: '뒷문이 열려 있지는 않나요?', sub: '관리자 접근 보안', simple: 'example.com/admin 주소를 아무나 접근할 수 있으면 비밀번호 무작위 대입 공격을 하루 수만 번 받습니다.', warn: '관리자 페이지 무방비 상태 = 계정 탈취 위험.' },
  { emoji: '🚨', title: '구글이 위험하다고 경고하나요?', sub: 'SEO·신뢰도', simple: '보안 문제가 있으면 구글은 방문자에게 "이 사이트는 위험합니다" 경고를 띄웁니다. 고객이 들어오다 도망갑니다.', warn: '구글 위험 경고 뜨면 방문자 95%가 뒤로 가기 클릭.' },
  { emoji: '🐌', title: '3초 안에 안 열리면 고객이 떠납니다', sub: '속도·성능', simple: '로딩이 3초 넘으면 방문자의 53%가 떠납니다. 느린 사이트는 구글 검색 순위도 떨어집니다.', warn: '로딩 1초 지연 = 전환율 7% 하락 (아마존 내부 데이터).' },
]

const steps = [
  { step: '01', emoji: '⌨️', title: 'URL 입력 (30초)', desc: '사이트 주소만 입력하면 됩니다. 회원가입 없음. IT 지식 없어도 됩니다.' },
  { step: '02', emoji: '🔬', title: '자동 정밀 분석', desc: '전 세계 보안 전문가들이 쓰는 도구로 사이트 전체를 꼼꼼히 스캔합니다.' },
  { step: '03', emoji: '👨‍💻', title: '전문가 직접 검토', desc: '자동 분석 결과를 전문가가 확인합니다. 오탐(잘못된 경보) 제거 후 최종 리포트 작성.' },
  { step: '04', emoji: '📄', title: '쉬운 언어 리포트 발송', desc: 'IT 비전공자도 바로 이해할 수 있게 작성. 각 문제마다 실제 피해 사례와 해결 방법 포함.' },
  { step: '05', emoji: '💰', title: '맞춤 견적 제안', desc: '발견된 문제 기준으로 정확한 견적 제안. 필요 없는 항목은 빼고, 꼭 필요한 것만.' },
  { step: '06', emoji: '🛡️', title: '개선 완료 + 재진단', desc: '작업 완료 후 재진단으로 실제로 개선됐는지 확인까지 해드립니다.' },
]

const siteTypes = [
  { emoji: '🌐', label: '워드프레스', ok: true,  note: '가장 빠르고 효과적' },
  { emoji: '🏠', label: '일반 홈페이지', ok: true,  note: 'HTML/PHP/ASP 모두 가능' },
  { emoji: '🛒', label: '쇼핑몰 (자사몰)', ok: true,  note: '결제 보안 집중 점검' },
  { emoji: '🖥️', label: '커스텀 서버', ok: true,  note: 'SSH 접근 시 가능' },
  { emoji: '🏪', label: '카페24 / 아임웹', ok: null, note: '진단 가능, 일부 개선 제한' },
  { emoji: '🏬', label: '네이버 스마트스토어', ok: false, note: '플랫폼 정책상 개선 불가' },
]

const stats = [
  { num: '73%', desc: '국내 중소기업 사이트가\n기본 보안조차 미설정' },
  { num: '43초', desc: '해킹 공격은 43초마다\n전 세계에서 발생' },
  { num: '3,000만원', desc: '개인정보 유출 시\n과태료 최대 금액' },
  { num: '95%', desc: '구글 위험 경고 뜨면\n방문자가 떠나는 비율' },
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="pt-24 pb-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-2 rounded-full mb-6 animate-pulse">
                <ShieldAlert className="w-3.5 h-3.5" /> 지금 이 순간도 해킹 시도가 진행 중일 수 있습니다
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
                내 홈페이지,<br />
                <span className="text-red-400">지금 안전</span>한가요?
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                국내 중소기업 홈페이지의 <strong className="text-foreground">73%</strong>가 기본 보안조차 설정되지 않았습니다.<br />
                URL 하나만 입력하면 <strong className="text-foreground">10분 안에</strong> 확인할 수 있습니다.
              </p>
              <div className="flex flex-wrap gap-3">
                {['✓ 완전 무료', '✓ IT 지식 불필요', '✓ 사이트 영향 없음', '✓ 쉬운 리포트'].map(t => (
                  <span key={t} className="bg-primary/10 border border-primary/20 text-primary text-sm px-3 py-1.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <LottiePlayer src="/lottie/shield.json" width={320} height={320} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="py-12 px-6 lg:px-12 bg-primary/5 border-y border-primary/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.num} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-primary mb-2">{s.num}</div>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Danger Cases ── */}
      <div className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-red-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">실제 피해 사례</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              &ldquo;우리 같은 작은 회사는 해킹 안 당해&rdquo;<br />
              <span className="text-red-400">— 이 생각이 가장 위험합니다</span>
            </h2>
            <p className="text-muted-foreground">오히려 작은 회사가 더 쉬운 표적입니다. 보안이 허술하니까요.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dangers.map(d => (
              <div key={d.title} className={`border rounded-2xl p-6 transition-all hover:scale-[1.01] ${colorMap[d.color]}`}>
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <LottiePlayer src={d.lottie} width={96} height={96} />
                  </div>
                  <div>
                    <div className="text-2xl mb-1">{d.emoji}</div>
                    <h3 className="text-foreground font-bold text-base mb-2">{d.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
                  </div>
                </div>
                <div className={`mt-4 border rounded-xl p-3 text-xs leading-relaxed ${caseColorMap[d.color]}`}>
                  📌 {d.case}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── What we check ── */}
      <div className="py-16 px-6 lg:px-12 bg-card/40 border-y border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">진단 항목</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              무엇을 어떻게 점검하나요?
            </h2>
            <p className="text-muted-foreground text-lg">전문 용어 없이 설명합니다. IT 몰라도 바로 이해됩니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {checks.map(c => (
              <div key={c.title} className="bg-background border border-border rounded-2xl p-6 hover:border-primary/40 transition-all group">
                <div className="text-4xl mb-4">{c.emoji}</div>
                <p className="text-primary text-xs font-bold mb-1">{c.sub}</p>
                <h3 className="text-foreground font-bold text-base mb-3">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{c.simple}</p>
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
                  <p className="text-amber-400 text-xs leading-relaxed">⚠ {c.warn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Process ── */}
      <div className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">진행 과정</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-10">
                신청부터 완료까지<br />이렇게 진행됩니다
              </h2>
              <div className="space-y-5">
                {steps.map(p => (
                  <div key={p.step} className="flex gap-4 items-start">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xl">
                      {p.emoji}
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-primary text-xs font-bold">{p.step}</span>
                        <h3 className="text-foreground font-bold">{p.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <LottiePlayer src="/lottie/scan.json" width={340} height={340} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Site types ── */}
      <div className="py-16 px-6 lg:px-12 bg-card/40 border-y border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 text-center">
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">적용 범위</p>
            <h2 className="text-3xl font-black text-foreground mb-4">어떤 사이트에 적용 가능한가요?</h2>
            <p className="text-muted-foreground">진단은 모든 사이트 가능합니다. 개선은 아래 기준을 확인하세요.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {siteTypes.map(s => (
              <div key={s.label} className={`bg-background border rounded-2xl p-5 text-center ${s.ok === true ? 'border-green-500/30' : s.ok === null ? 'border-amber-500/30' : 'border-red-500/20 opacity-60'}`}>
                <div className="text-3xl mb-2">{s.emoji}</div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  {s.ok === true  && <CheckCircle className="w-4 h-4 text-green-400" />}
                  {s.ok === null  && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                  {s.ok === false && <XCircle className="w-4 h-4 text-red-400" />}
                  <span className="text-foreground font-bold text-sm">{s.label}</span>
                </div>
                <p className={`text-xs ${s.ok === true ? 'text-green-400' : s.ok === null ? 'text-amber-400' : 'text-red-400'}`}>{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA + Form ── */}
      <div className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">무료 보안 진단</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                지금 바로 확인하세요.<br />
                <span className="text-primary">무료입니다.</span>
              </h2>
              <div className="space-y-3 mb-8">
                {[
                  ['💰', '비용 없음', '진단 자체는 완전 무료'],
                  ['⏱️', '시간 없음', 'URL 하나 입력이 전부'],
                  ['🧠', '지식 없음', 'IT 몰라도 리포트 이해 가능'],
                  ['😌', '부담 없음', '진단 후 개선은 선택사항'],
                ].map(([e, t, d]) => (
                  <div key={t} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
                    <span className="text-2xl">{e}</span>
                    <div>
                      <p className="text-foreground font-bold text-sm">{t}</p>
                      <p className="text-muted-foreground text-xs">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <LottiePlayer src="/lottie/check.json" width={120} height={120} loop={false} />
              </div>
            </div>
            <div className="lg:sticky lg:top-24">
              <UrlAnalysisForm
                serviceType="security"
                title="무료 보안 진단 신청"
                notice="분석 완료 후 전문가 검토를 거쳐 이메일로 리포트를 발송합니다."
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
