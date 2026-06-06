import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '개인정보처리방침 | Vision Solution',
  description: '(주)비젼솔루션 개인정보처리방침 - 개인정보의 처리 목적, 수집 항목, 보유 기간, 위탁·국외이전 등을 안내합니다.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-24 lg:py-32">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
        >
          &larr; 홈으로
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-2">개인정보처리방침</h1>
        <p className="text-sm text-muted-foreground mb-2">시행일: 2026년 6월 6일 (위탁·국외이전·회원서비스 대비 개정)</p>
        <p className="text-sm text-muted-foreground mb-12">(주)비젼솔루션 · 사업자등록번호 121-81-84378 · 인천광역시 계양구 동양로 10</p>

        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section>
            <p>(주)비젼솔루션(이하 &ldquo;회사&rdquo;)은 「개인정보 보호법」 및 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」을 준수하며, 정보주체의 개인정보를 보호하기 위해 다음과 같이 개인정보처리방침을 수립·공개합니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제1조 (개인정보의 처리 목적)</h2>
            <p>회사는 다음 목적으로 개인정보를 처리하며, 목적 외의 용도로 사용하지 않습니다. 목적이 변경되는 경우 별도 동의를 받습니다.</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>웹사이트 보안·성능·SEO 무료 진단 및 리포트(PDF) 발송</li>
              <li>모의해킹 진단 서비스 제공 및 결과 보고</li>
              <li>문의·상담 처리 및 서비스 안내</li>
              <li>AI 챗봇을 통한 상담·안내 응대</li>
              <li>마케팅 및 서비스 개선 (동의 시)</li>
              <li>(회원 서비스 도입 시) 회원 가입·인증·관리, 강의(Academy)·고객 포털 등 회원 전용 서비스 제공 및 부정이용 방지</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제2조 (수집하는 개인정보 항목)</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>무료 진단: (필수) 이메일 주소, 진단 대상 URL / (선택) 회사명·담당자명</li>
              <li>모의해킹 진단: 점검 대상 도메인·IP, 시스템 구성 정보, 담당자 연락처, 진단 범위 합의서</li>
              <li>문의·챗봇: 이메일·연락처, 문의 내용, 챗봇 대화에 이용자가 입력한 정보</li>
              <li>자동 수집: 접속 IP, 쿠키, 서비스 이용 기록, 브라우저·기기 정보</li>
              <li>(회원 가입 시) (필수) 아이디(이메일), 비밀번호(암호화 저장), 이름 / (선택) 연락처·소속 / (자동) 로그인·접속 기록. 유료 결제 시 결제수단 정보는 결제대행사를 통해 처리</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제3조 (개인정보의 처리 및 보유 기간)</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>무료 진단: 서비스 제공 목적 달성 후 즉시 삭제</li>
              <li>모의해킹 진단 데이터·캡처·로그: 최종 보고서 전달 즉시(당일) 일괄 삭제 (삭제 확인서 발급)</li>
              <li>이메일 수신·민원·상담 기록: 3년</li>
              <li>챗봇 대화 로그: 서비스 개선·분쟁 대비 목적 보관 후 1년 내 또는 목적 달성 시 파기</li>
              <li>(회원) 탈퇴 시 지체 없이 파기. 단, 법령상 ① 계약·청약철회 및 대금결제 기록 5년 ② 소비자 불만·분쟁 기록 3년(전자상거래법) ③ 로그인 접속기록 3개월 이상(통신비밀보호법) 보존</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제4조 (개인정보의 제3자 제공)</h2>
            <p>회사는 원칙적으로 개인정보를 외부에 제공하지 않습니다. 다만 ① 정보주체가 사전 동의한 경우 ② 법령 또는 수사기관의 적법한 요구가 있는 경우 예외로 합니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제5조 (개인정보 처리의 위탁 및 국외 이전)</h2>
            <p className="mb-3">회사는 서비스 제공을 위해 아래와 같이 개인정보 처리를 위탁하며, 일부 수탁사는 국외에 소재합니다.</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Google LLC (Google Workspace) — 진단 리포트 이메일 발송 — 처리항목: 이메일·리포트 — 소재: 미국</li>
              <li>Vercel Inc. — 웹사이트 호스팅·전송 — 처리항목: 접속 IP·이용기록 — 소재: 미국</li>
              <li>Cloudflare Inc. — CDN·보안·트래픽 처리 — 처리항목: 접속 IP·이용기록 — 소재: 미국</li>
              <li>DeepSeek (deepseek-chat) — AI 챗봇 응답 생성 — 처리항목: 챗봇 대화 내용 — 소재: 중국</li>
            </ul>
            <p className="mt-3">이용자는 국외 이전을 거부할 수 있으며, 이 경우 해당 서비스(예: AI 챗봇) 이용이 제한될 수 있습니다. 챗봇에는 주민등록번호 등 민감·고유식별정보를 입력하지 마시기 바랍니다. 모의해킹 진단 업무는 원칙적으로 회사가 직접 수행하며, 외부 위탁이 필요한 경우 별도 동의를 받습니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제6조 (정보주체의 권리·의무)</h2>
            <p>이용자(법정대리인 포함)는 개인정보 열람·정정·삭제·처리정지를 요구할 수 있으며, 회원 서비스 이용 시 회원 탈퇴 및 동의 철회를 요청할 수 있습니다.</p>
            <p className="mt-3">위 권리 행사는 <strong className="text-foreground">biztalktome@gmail.com</strong>으로 문의 주시면 처리해 드립니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제7조 (개인정보의 안전성 확보 조치)</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>비밀번호 등 중요정보 암호화 저장 (회원 비밀번호는 일방향 암호화)</li>
              <li>SSL 적용·보안 서버 운영, 해킹 등 대비 조치</li>
              <li>접근 권한 최소화·접근통제, 접속기록 보관 및 위·변조 방지</li>
              <li>모의해킹 결과물 암호화 및 전달 즉시 회사 보유 데이터 일괄 삭제</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제8조 (쿠키 등 자동수집 장치)</h2>
            <p>회사는 서비스 제공·이용 분석 및 (회원 서비스 도입 시) 자동 로그인·세션 유지를 위해 쿠키를 사용할 수 있습니다. 이용자는 브라우저 설정에서 쿠키 저장을 거부할 수 있으며, 이 경우 일부 기능 이용이 제한될 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제9조 (만 14세 미만 아동)</h2>
            <p>회사는 만 14세 미만 아동의 개인정보를 원칙적으로 수집하지 않으며, 회원 서비스 도입 시 만 14세 미만은 법정대리인의 동의 절차를 거칩니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제10조 (개인정보 보호책임자)</h2>
            <div className="space-y-1.5">
              <p>회사명: (주)비젼솔루션</p>
              <p>개인정보 보호책임자: 대표</p>
              <p>이메일: biztalktome@gmail.com · 웹사이트: visionc.co.kr</p>
              <p className="mt-2">개인정보 침해 신고·상담: 개인정보분쟁조정위원회(1833-6972), 개인정보침해신고센터(118), 대검찰청 사이버수사과(1301), 경찰청 사이버수사국(182)</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제11조 (개인정보 처리방침 변경)</h2>
            <p>이 개인정보처리방침은 2026년 6월 6일부터 적용됩니다. 내용이 변경되는 경우 홈페이지 공지를 통해 안내드립니다.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
