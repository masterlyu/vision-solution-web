import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '개인정보처리방침 | Vision Solution',
  description: '비젼솔루션 개인정보처리방침 - 개인정보의 처리 목적, 수집 항목, 보유 기간 등을 안내합니다.',
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
        <p className="text-sm text-muted-foreground mb-12">시행일: 2025년 1월 1일</p>

        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제1조 (개인정보의 처리 목적)</h2>
            <p>비젼솔루션(이하 &ldquo;회사&rdquo;)은 다음 목적으로 개인정보를 처리합니다. 처리하는 개인정보는 다음 목적 이외의 용도로 사용되지 않으며, 목적이 변경되는 경우에는 별도 동의를 받겠습니다.</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>웹사이트 보안·성능·SEO 무료 진단 서비스 제공</li>
              <li>진단 리포트 PDF 이메일 발송</li>
              <li>서비스 이용에 관한 문의·상담 처리</li>
              <li>마케팅 및 서비스 개선 목적 (동의 시)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제2조 (수집하는 개인정보 항목)</h2>
            <p className="mb-3">회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>필수: 이메일 주소, 진단 대상 URL</li>
              <li>선택: 회사명/담당자명</li>
              <li>자동 수집: 서비스 이용 기록, IP 주소, 브라우저 정보</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제3조 (개인정보의 처리 및 보유 기간)</h2>
            <p>회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보 수집 시 동의받은 보유·이용 기간 내에서 개인정보를 처리·보유합니다.</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>서비스 제공 목적: 서비스 종료 후 즉시 삭제</li>
              <li>이메일 수신 기록: 3년 (전자상거래법 준용)</li>
              <li>민원·상담 기록: 3년</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제4조 (개인정보의 제3자 제공)</h2>
            <p>회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나 수사기관의 요구가 있는 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제5조 (개인정보 처리의 위탁)</h2>
            <p>회사는 서비스 향상을 위해 아래와 같이 개인정보 처리 업무를 위탁하고 있습니다.</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>이메일 발송 서비스 (Google Workspace): 진단 리포트 발송</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제6조 (정보주체의 권리·의무)</h2>
            <p>이용자는 개인정보 주체로서 다음과 같은 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>개인정보 열람 요구</li>
              <li>개인정보 오류 정정 요구</li>
              <li>개인정보 삭제 요구</li>
              <li>개인정보 처리 정지 요구</li>
            </ul>
            <p className="mt-3">위 권리 행사는 <strong className="text-foreground">biztalktome@gmail.com</strong>으로 이메일 문의 주시면 처리해드립니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제7조 (개인정보의 안전성 확보 조치)</h2>
            <p>회사는 개인정보 보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 조치를 취하고 있습니다.</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>개인정보 암호화: 비밀번호 및 중요 정보 암호화 저장</li>
              <li>해킹 등 대비 조치: SSL 인증서 적용, 보안 서버 운영</li>
              <li>접근 권한 최소화: 담당자 외 접근 제한</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제8조 (개인정보 보호책임자)</h2>
            <div className="space-y-1.5">
              <p>회사명: 비젼솔루션</p>
              <p>개인정보 보호책임자: 대표자</p>
              <p>이메일: biztalktome@gmail.com</p>
              <p>웹사이트: visionc.co.kr</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제9조 (개인정보 처리방침 변경)</h2>
            <p>이 개인정보 처리방침은 2025년 1월 1일부터 적용됩니다. 내용이 변경되는 경우 홈페이지 공지사항을 통해 안내드리겠습니다.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
