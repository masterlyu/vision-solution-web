import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '이용약관 | Vision Solution',
  description: '비젼솔루션 이용약관 - 서비스 이용 조건 및 절차, 권리·의무 및 책임사항을 안내합니다.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-24 lg:py-32">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
        >
          &larr; 홈으로
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-2">이용약관</h1>
        <p className="text-sm text-muted-foreground mb-12">시행일: 2025년 1월 1일</p>

        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제1조 (목적)</h2>
            <p>이 약관은 비젼솔루션(이하 &ldquo;회사&rdquo;)이 운영하는 visionc.co.kr(이하 &ldquo;사이트&rdquo;)에서 제공하는 서비스의 이용 조건 및 절차, 회사와 이용자 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제2조 (용어의 정의)</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>&ldquo;서비스&rdquo;란 회사가 사이트를 통해 제공하는 웹사이트 보안진단, SEO 분석, 성능 측정, 무료 리포트 발송 등 일체의 서비스를 의미합니다.</li>
              <li>&ldquo;이용자&rdquo;란 이 약관에 따라 회사가 제공하는 서비스를 받는 자를 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제3조 (약관의 효력 및 변경)</h2>
            <p>이 약관은 서비스를 이용하는 모든 이용자에게 적용됩니다. 회사는 필요한 경우 약관을 변경할 수 있으며, 변경 시 사이트 공지사항을 통해 공지합니다. 변경된 약관에 동의하지 않는 이용자는 서비스 이용을 중단하여야 합니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제4조 (서비스 이용)</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>서비스는 본인이 소유하거나 운영자로부터 허가받은 사이트에 한해 이용할 수 있습니다.</li>
              <li>무단 진단·스캔은 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 위반입니다.</li>
              <li>진단 리포트는 이용자가 입력한 이메일로 발송되며, 이메일 오기입으로 인한 미수신은 회사가 책임지지 않습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제5조 (이용자의 의무)</h2>
            <p className="mb-3">이용자는 다음 행위를 하여서는 안 됩니다.</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>타인의 정보 도용 또는 허위 정보 입력</li>
              <li>서비스를 이용하여 법령 또는 이 약관을 위반하는 행위</li>
              <li>서비스의 정상적인 운영을 방해하는 행위 (DDoS, 자동화된 요청 등)</li>
              <li>타인에게 피해를 주거나 미풍양속에 반하는 행위</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제6조 (서비스 제공의 제한)</h2>
            <p>회사는 다음의 경우 서비스 제공을 제한하거나 중단할 수 있습니다.</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>시스템 점검, 교체 및 고장, 통신 두절 등의 경우</li>
              <li>이용자가 이 약관을 위반한 경우</li>
              <li>천재지변, 불가항력 등 회사의 귀책사유 없이 서비스 제공이 불가한 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제7조 (면책조항)</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>회사는 무료로 제공하는 진단 서비스의 정확성에 대해 법적 책임을 지지 않습니다.</li>
              <li>진단 결과를 바탕으로 한 이용자의 의사결정에 대한 책임은 이용자 본인에게 있습니다.</li>
              <li>회사는 이용자와 제3자 간의 분쟁에 대해 책임을 지지 않습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제8조 (지식재산권)</h2>
            <p>사이트 내 콘텐츠, 디자인, 코드 등 모든 저작물의 지식재산권은 회사에 귀속됩니다. 이용자는 회사의 명시적인 사전 동의 없이 이를 복제, 배포, 수정하여서는 안 됩니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제9조 (준거법 및 관할법원)</h2>
            <p>이 약관에 관한 분쟁은 대한민국 법률에 따르며, 소송은 회사 소재지를 관할하는 법원에 제기합니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제10조 (문의)</h2>
            <p>서비스 이용 관련 문의는 아래로 연락 주세요.</p>
            <div className="mt-3 space-y-1.5">
              <p>이메일: biztalktome@gmail.com</p>
              <p>웹사이트: visionc.co.kr</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
