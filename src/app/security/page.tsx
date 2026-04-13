import Link from 'next/link'
import UrlAnalysisForm from '@/components/UrlAnalysisForm'
import {
  ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle, XCircle,
  Lock, Eye, CreditCard, Database, Skull, TrendingDown, Clock,
  Wrench, FileSearch, ArrowRight, Users, Globe, Server, Building
} from 'lucide-react'

const dangers = [
  {
    icon: CreditCard,
    title: '고객 카드정보가 통째로 빠져나갑니다',
    desc: '보안 설정이 없는 쇼핑몰은 결제 페이지에서 카드번호, 비밀번호가 해커에게 실시간으로 전송됩니다. 고객은 아무것도 모른 채로.',
    case: '실제 사례: 국내 중소 쇼핑몰 A사 — 3개월간 고객 2,300명 카드정보 유출. 폐업.',
  },
  {
    icon: Skull,
    title: '사이트가 해킹 도구로 악용됩니다',
    desc: '내 사이트가 다른 사람을 공격하는 무기로 쓰입니다. 모르는 사이에 범죄에 연루될 수 있습니다.',
    case: '실제 사례: 소규모 병원 홈페이지가 악성코드 유포지로 이용 — 구글 검색에서 완전 차단.',
  },
  {
    icon: Eye,
    title: '경쟁사가 내 고객 DB를 봅니다',
    desc: '회원가입 정보, 주문 내역, 상담 내용이 그대로 노출됩니다. 개인정보보호법 위반으로 과태료 최대 3,000만원.',
    case: '실제 사례: 인테리어 업체 — 고객 견적 문의 DB 전체 유출, 경쟁사에 넘어감.',
  },
  {
    icon: TrendingDown,
    title: '구글에서 영원히 사라집니다',
    desc: '구글은 악성코드가 발견된 사이트를 검색 결과에서 즉시 제거합니다. 복구까지 수개월.',
    case: '실제 사례: 여행사 블로그 — SEO로 월 5천 방문자 → 해킹 후 구글 차단 → 방문자 0명.',
  },
]

const checks = [
  {
    icon: Lock,
    title: '자물쇠가 제대로 잠겼나요?',
    subtitle: 'SSL/HTTPS 보안 연결',
    simple: '인터넷 뱅킹할 때 주소창에 자물쇠 아이콘 보이시죠? 그게 없으면 고객이 입력하는 모든 정보가 암호화 없이 전송됩니다.',
    danger: 'HTTPS 없는 사이트는 공공 와이파이에서 누구나 데이터를 훔쳐볼 수 있습니다.',
  },
  {
    icon: ShieldAlert,
    title: '해커가 내 사이트 안에 들어올 수 있나요?',
    subtitle: '보안 헤더 6가지 점검',
    simple: '현관문에 자물쇠는 있는데 창문이 열려 있는 상황입니다. 보안 헤더는 창문, 뒷문, 지붕의 구멍을 막는 역할입니다.',
    danger: '설정 안 된 보안 헤더 1개당 해킹 성공률 약 40% 상승.',
  },
  {
    icon: Eye,
    title: '사이트 정보가 외부에 줄줄 새고 있나요?',
    subtitle: '정보 노출 점검',
    simple: '해커들은 공격 전에 정찰합니다. 사용 중인 프로그램 버전, 서버 종류 등이 노출되면 맞춤형 공격을 받게 됩니다.',
    danger: '워드프레스 버전 노출 → 해당 버전 취약점 자동 공격 봇 존재.',
  },
  {
    icon: Database,
    title: '로그인 없이 관리자 페이지 들어갈 수 있나요?',
    subtitle: '관리자 접근 보안',
    simple: 'example.com/admin, /wp-admin 같은 주소를 아무나 접근할 수 있으면 무작위 비밀번호 대입 공격을 받습니다.',
    danger: '워드프레스 관리자 페이지 무차별 공격 — 하루 수천~수만 회 시도.',
  },
  {
    icon: Globe,
    title: '구글이 내 사이트를 위험하다고 판단하나요?',
    subtitle: 'SEO 및 신뢰도 점검',
    simple: '보안 문제가 있으면 구글은 방문자에게 "이 사이트는 위험합니다" 경고를 띄웁니다. 고객이 들어오다가 도망갑니다.',
    danger: '구글 위험 경고 뜨면 방문자의 95%가 뒤로 가기 클릭.',
  },
  {
    icon: Clock,
    title: '사이트가 느리면 고객이 도망갑니다',
    subtitle: '속도 및 성능 측정',
    simple: '3초 안에 안 열리면 고객의 53%는 떠납니다. 느린 사이트는 구글 검색 순위도 떨어집니다.',
    danger: '로딩 1초 지연 = 전환율 7% 하락 (아마존 내부 데이터).',
  },
]

const process = [
  {
    step: '01',
    title: 'URL 입력 (30초)',
    desc: '사이트 주소만 입력하면 됩니다. 회원가입 없음. 개인정보 최소 수집.',
    icon: Globe,
  },
  {
    step: '02',
    title: '자동 정밀 분석 (10~20분)',
    desc: '전 세계 보안 전문가들이 쓰는 도구로 사이트 전체를 꼼꼼히 스캔합니다.',
    icon: FileSearch,
  },
  {
    step: '03',
    title: '전문가 검토',
    desc: '자동 분석 결과를 전문가가 직접 확인합니다. 오탐(잘못된 경보) 제거 후 최종 리포트 작성.',
    icon: Eye,
  },
  {
    step: '04',
    title: '쉬운 언어로 리포트 발송',
    desc: 'IT 비전공자도 바로 이해할 수 있게 작성합니다. 각 문제마다 실제 피해 사례와 해결 방법 포함.',
    icon: FileSearch,
  },
  {
    step: '05',
    title: '맞춤 견적 제안',
    desc: '발견된 문제 기준으로 정확한 견적을 제안합니다. 필요 없는 항목은 빼고, 꼭 필요한 것만.',
    icon: CheckCircle,
  },
  {
    step: '06',
    title: '개선 작업 진행',
    desc: '승인하시면 작업 시작. 대부분 1~3일 내 완료. 완료 후 재진단으로 개선 확인.',
    icon: Wrench,
  },
]

const siteTypes = [
  { icon: Globe,    label: '워드프레스',       ok: true,  note: '가장 빠르고 효과적' },
  { icon: Building, label: '일반 홈페이지',     ok: true,  note: 'HTML/PHP/ASP 모두 가능' },
  { icon: CreditCard, label: '쇼핑몰 (자사몰)', ok: true,  note: '결제 보안 집중 점검' },
  { icon: Server,   label: '커스텀 서버',       ok: true,  note: 'SSH 접근 시 가능' },
  { icon: Users,    label: '카페24/아임웹',     ok: null,  note: '진단 가능, 일부 개선 제한' },
  { icon: XCircle,  label: '네이버 스마트스토어', ok: false, note: '플랫폼 정책상 개선 불가' },
]

const faqs = [
  {
    q: '진단하면 내 사이트가 느려지거나 다운되나요?',
    a: '아닙니다. 저희 진단은 외부에서 사이트를 관찰하는 방식입니다. 사이트 내부에 아무것도 설치하지 않으며, 정상 운영에 전혀 영향이 없습니다.',
  },
  {
    q: '워드프레스가 뭔지도 모르는데 괜찮나요?',
    a: '네, 괜찮습니다. 홈페이지 제작사에게 의뢰하셨다면 대부분 워드프레스입니다. 모르셔도 됩니다. 저희가 다 확인합니다.',
  },
  {
    q: '개선 작업할 때 사이트가 다운되나요?',
    a: '대부분의 보안 설정 작업은 무중단으로 진행됩니다. 불가피하게 재시작이 필요한 경우 새벽 시간대에 진행하며 사전에 안내드립니다.',
  },
  {
    q: '한 번 개선하면 영구적으로 안전한가요?',
    a: '아닙니다. 해킹 기술은 계속 발전합니다. 분기마다 재점검을 권장드리며, 정기 유지보수 서비스를 이용하시면 지속적으로 보호받을 수 있습니다.',
  },
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <div className="pt-28 pb-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-2 rounded-full mb-6">
              <ShieldAlert className="w-3.5 h-3.5" /> 지금 이 순간에도 해킹 시도가 진행 중일 수 있습니다
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
              내 홈페이지,<br />
              <span className="text-red-400">지금 안전</span>한가요?
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed mb-8">
              국내 중소기업 홈페이지의 <strong className="text-foreground">73%</strong>가 기본 보안조차 설정되지 않았습니다.<br />
              URL 하나만 입력하면 <strong className="text-foreground">10분 안에</strong> 확인할 수 있습니다.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {['✓ 무료 진단', '✓ IT 지식 불필요', '✓ 사이트 영향 없음', '✓ 쉬운 언어 리포트'].map(t => (
                <span key={t} className="flex items-center gap-1">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Danger cases */}
      <div className="py-16 px-6 lg:px-12 bg-red-950/20 border-y border-red-500/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-red-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">실제 피해 사례</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              보안 무방비 상태의 사이트에서<br />실제로 일어나는 일들
            </h2>
            <p className="text-muted-foreground">"우리 같은 작은 회사를 왜 해킹해?"라고 생각하신다면 — 오히려 작은 회사가 더 쉬운 표적입니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dangers.map(d => (
              <div key={d.title} className="bg-card border border-red-500/20 rounded-2xl p-6 hover:border-red-500/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                  <d.icon className="w-6 h-6 text-red-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-foreground font-bold text-lg mb-2">{d.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{d.desc}</p>
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3">
                  <p className="text-red-400 text-xs leading-relaxed">{d.case}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What we check */}
      <div className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">진단 항목</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              무엇을, 어떻게 점검하나요?
            </h2>
            <p className="text-muted-foreground text-lg">전문 용어 없이 설명합니다. IT 몰라도 바로 이해됩니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {checks.map(c => (
              <div key={c.title} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all group">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all">
                  <c.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <p className="text-primary text-xs font-bold mb-1">{c.subtitle}</p>
                <h3 className="text-foreground font-bold text-base mb-3">{c.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{c.simple}</p>
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
                  <p className="text-amber-400 text-xs leading-relaxed">⚠ {c.danger}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="py-16 px-6 lg:px-12 bg-card/50 border-y border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">진행 과정</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              신청부터 개선까지<br />이렇게 진행됩니다
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {process.map((p, i) => (
              <div key={p.step} className="bg-background border border-border rounded-2xl p-6 hover:border-primary/40 transition-all relative">
                <span className="text-primary/30 text-5xl font-black absolute top-4 right-5">{p.step}</span>
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-foreground font-bold mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Site types */}
      <div className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">적용 범위</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
              어떤 사이트에 적용 가능한가요?
            </h2>
            <p className="text-muted-foreground text-lg">진단은 모든 사이트 가능합니다. 개선은 아래 기준으로 확인하세요.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {siteTypes.map(s => (
              <div key={s.label} className={`bg-card border rounded-xl p-5 ${s.ok === true ? 'border-green-500/30' : s.ok === null ? 'border-amber-500/30' : 'border-red-500/20'}`}>
                <div className="flex items-center gap-3 mb-2">
                  {s.ok === true  && <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />}
                  {s.ok === null  && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
                  {s.ok === false && <XCircle className="w-5 h-5 text-red-400 shrink-0" />}
                  <span className="text-foreground font-bold text-sm">{s.label}</span>
                </div>
                <p className={`text-xs ${s.ok === true ? 'text-green-400' : s.ok === null ? 'text-amber-400' : 'text-red-400'}`}>{s.note}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-6">✓ 진단 = 어떤 사이트든 가능 &nbsp;&nbsp; ⚠ 개선 = 서버/관리자 접근 필요</p>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 px-6 lg:px-12 bg-card/50 border-y border-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12">
            <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">자주 묻는 질문</p>
            <h2 className="text-3xl font-black text-foreground">궁금한 점이 있으신가요?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {faqs.map(f => (
              <div key={f.q} className="bg-background border border-border rounded-2xl p-6">
                <p className="text-foreground font-bold mb-3 flex items-start gap-2">
                  <span className="text-primary shrink-0">Q.</span>{f.q}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed pl-5">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA + Form */}
      <div className="py-16 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">무료 보안 진단</p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                지금 바로 확인하세요.<br />
                <span className="text-primary">무료입니다.</span>
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  '비용 없음 — 진단 자체는 완전 무료',
                  '시간 없음 — URL 하나 입력이 전부',
                  '지식 없음 — IT 몰라도 리포트 이해 가능',
                  '부담 없음 — 진단 후 개선은 선택사항',
                ].map(t => (
                  <div key={t} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{t}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
                <p className="text-amber-400 font-bold mb-1">⚠ 주의사항</p>
                <p className="text-muted-foreground text-sm leading-relaxed">본인이 소유하거나 운영자로부터 허가받은 사이트만 신청 가능합니다. 무단 진단은 정보통신망법 위반입니다.</p>
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
