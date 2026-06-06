import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '이용약관 | Vision Solution',
  description: '(주)비젼솔루션 이용약관 - 서비스 이용 조건 및 절차, 회원·권리·의무 및 책임사항을 안내합니다.',
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
        <p className="text-sm text-muted-foreground mb-12">시행일: 2026년 6월 6일 (회원·유료서비스 조항 대비 개정)</p>

        <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제1조 (목적)</h2>
            <p>이 약관은 (주)비젼솔루션(이하 &ldquo;회사&rdquo;)이 운영하는 visionc.co.kr(이하 &ldquo;사이트&rdquo;)에서 제공하는 서비스의 이용 조건 및 절차, 회사와 이용자 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제2조 (용어의 정의)</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>&ldquo;서비스&rdquo;란 회사가 사이트를 통해 제공하는 웹사이트 보안진단, 모의해킹 진단, SEO 분석, 성능 측정, 무료 리포트 발송, AI 챗봇, 강의(Academy) 등 일체의 서비스를 의미합니다.</li>
              <li>&ldquo;모의해킹 진단&rdquo;이란 이용자가 사전 서면 동의한 범위 내에서 회사가 실제 침투 시나리오를 수행하여 보안 취약점을 확인하고 결과를 보고하는 유료 서비스를 의미합니다.</li>
              <li>&ldquo;이용자&rdquo;란 이 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 의미합니다.</li>
              <li>&ldquo;회원&rdquo;이란 회사가 정한 절차에 따라 가입하여 계정을 부여받은 이용자를 의미합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제3조 (약관의 효력 및 변경)</h2>
            <p>이 약관은 서비스를 이용하는 모든 이용자에게 적용됩니다. 회사는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있으며, 변경 시 적용일자 및 사유를 사이트 공지를 통해 사전 공지합니다. 변경된 약관에 동의하지 않는 이용자는 서비스 이용을 중단하거나 회원 탈퇴를 할 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제4조 (서비스 이용)</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>보안·모의해킹 진단 서비스는 본인이 소유하거나 운영자로부터 허가받은 사이트에 한해 이용할 수 있습니다.</li>
              <li>무단 진단·스캔은 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 위반입니다.</li>
              <li>진단 리포트는 이용자가 입력한 이메일로 발송되며, 이메일 오기입으로 인한 미수신은 회사가 책임지지 않습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제5조 (회원 가입 및 계정)</h2>
            <p className="mb-3">회사가 회원 서비스를 제공하는 경우 다음이 적용됩니다.</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>회원 가입은 이용자가 약관 및 개인정보 처리에 동의하고 회사가 정한 가입 양식을 작성하여 신청하며, 회사의 승낙으로 성립합니다.</li>
              <li>이용자는 정확한 정보를 제공해야 하며, 타인의 정보 도용·허위 기재 시 서비스 이용이 제한될 수 있습니다.</li>
              <li>계정·비밀번호의 관리 책임은 회원에게 있으며, 회원은 이를 제3자에게 양도·대여할 수 없습니다. 계정 도용·부정사용을 인지한 경우 즉시 회사에 통지해야 합니다.</li>
              <li>회원은 언제든지 탈퇴를 요청할 수 있으며, 회사는 관련 법령에 따른 보존 의무가 있는 경우를 제외하고 지체 없이 회원 정보를 파기합니다.</li>
              <li>강의(Academy) 등 일부 자료는 비밀번호 등으로 접근이 제한되며, 회원은 부여받은 접근 권한을 타인과 공유할 수 없습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제6조 (모의해킹 진단 서비스 특별 조항)</h2>
            <p className="mb-3">모의해킹 진단 서비스는 다음 조건 아래에서만 진행됩니다.</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>이용자(또는 시스템 정당 소유자)의 서면 동의서 체결을 진단 개시 조건으로 합니다.</li>
              <li>동의서에는 진단 대상·범위·일정·중단 조건이 명시되어야 하며, 합의된 범위를 벗어난 진단은 수행하지 않습니다.</li>
              <li>회사와 이용자는 비밀유지계약(NDA)을 체결하며, 진단 과정에서 알게 된 정보는 외부에 공개되지 않습니다.</li>
              <li>진단으로 인해 발생할 수 있는 일시적 서비스 영향은 사전에 협의하며, 영향 최소화 방식으로 진행합니다. 부하 테스트 등 영향이 큰 시나리오는 별도 동의를 받습니다.</li>
              <li>회사는 진단 완료 후 최종 보고서를 암호화하여 전달하며, 전달 즉시(당일) 회사 보유 진단 데이터·캡처·로그를 일괄 삭제합니다(삭제 확인서 발급).</li>
              <li>진단 결과는 진단 시점의 시스템 상태 기준이며, 이후 시스템 변경에 따른 새 취약점은 별도 진단이 필요합니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제7조 (이용자의 의무)</h2>
            <p className="mb-3">이용자는 다음 행위를 하여서는 안 됩니다.</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>타인의 정보 도용 또는 허위 정보 입력</li>
              <li>서비스를 이용하여 법령 또는 이 약관을 위반하는 행위</li>
              <li>서비스의 정상적인 운영을 방해하는 행위 (DDoS, 자동화된 요청 등)</li>
              <li>정당한 권한이 없는 시스템을 모의해킹 진단 대상으로 신청하는 행위</li>
              <li>강의 자료 등 회사 콘텐츠를 무단 복제·배포하는 행위</li>
              <li>타인에게 피해를 주거나 미풍양속에 반하는 행위</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제8조 (서비스 제공의 제한)</h2>
            <p>회사는 다음의 경우 서비스 제공을 제한하거나 중단할 수 있습니다.</p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>시스템 점검·교체·고장, 통신 두절 등의 경우</li>
              <li>이용자가 이 약관을 위반한 경우</li>
              <li>모의해킹 진단 신청자가 시스템 정당 소유 또는 위임을 입증하지 못하는 경우</li>
              <li>천재지변, 불가항력 등 회사의 귀책사유 없이 서비스 제공이 불가한 경우</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제9조 (유료 서비스 및 환불)</h2>
            <p>유료 서비스(모의해킹 진단, 유료 강의·구독 등)의 요금·결제·환불은 해당 서비스 안내 또는 별도 계약·약관에 따릅니다. 「전자상거래 등에서의 소비자보호에 관한 법률」 등 관련 법령에 따른 청약철회·환불 규정이 적용되며, 이미 제공이 완료된 용역 등 법령상 청약철회가 제한되는 경우는 그러하지 아니합니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제10조 (면책조항)</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>회사는 무료로 제공하는 진단 서비스의 정확성에 대해 법적 책임을 지지 않습니다.</li>
              <li>모의해킹 진단은 합의된 범위·시점 기준의 분석이며, 진단 이후 시스템 변경이나 새 취약점에 대해서는 책임을 지지 않습니다.</li>
              <li>AI 챗봇의 답변은 참고용이며, 답변의 정확성·완전성을 보증하지 않습니다.</li>
              <li>진단·답변 결과를 바탕으로 한 이용자의 의사결정에 대한 책임은 이용자 본인에게 있습니다.</li>
              <li>회사는 이용자와 제3자 간의 분쟁에 대해 책임을 지지 않습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제11조 (지식재산권)</h2>
            <p>사이트 내 콘텐츠·디자인·코드·강의 자료 등 모든 저작물의 지식재산권은 회사 또는 정당한 권리자에게 귀속됩니다. 이용자는 회사의 명시적 사전 동의 없이 이를 복제·배포·수정할 수 없습니다. 강의(Academy) 자료는 각 자료에 명시된 이용 조건(예: 출처 표시 후 사내 교육 사용 가능, 상업적 재배포 사전 문의)을 따르며, 모의해킹 진단 보고서는 이용자의 자사 내부 보안 개선 목적으로만 사용할 수 있습니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제12조 (준거법 및 관할법원)</h2>
            <p>이 약관에 관한 분쟁은 대한민국 법률에 따르며, 소송은 민사소송법상 관할법원에 제기합니다.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">제13조 (문의)</h2>
            <p>서비스 이용 관련 문의는 아래로 연락 주세요.</p>
            <div className="mt-3 space-y-1.5">
              <p>(주)비젼솔루션 · 이메일: biztalktome@gmail.com</p>
              <p>웹사이트: visionc.co.kr</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
