'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

type ModalType = 'privacy' | 'terms' | null

export default function LegalModals() {
  const [open, setOpen] = useState<ModalType>(null)

  return (
    <>
      <button
        onClick={() => setOpen('privacy')}
        className="text-neutral-600 text-xs hover:text-neutral-400 transition-colors"
      >
        개인정보처리방침
      </button>
      <span className="text-neutral-800">·</span>
      <button
        onClick={() => setOpen('terms')}
        className="text-neutral-600 text-xs hover:text-neutral-400 transition-colors"
      >
        이용약관
      </button>

      {/* 개인정보처리방침 */}
      <Dialog open={open === 'privacy'} onOpenChange={v => setOpen(v ? 'privacy' : null)}>
        <DialogContent className="max-w-2xl bg-neutral-950 border-neutral-800 text-neutral-300">
          <DialogHeader>
            <DialogTitle className="text-white text-lg">개인정보처리방침</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-5 text-sm leading-relaxed">
              <p className="text-neutral-500 text-xs">시행일: 2025년 1월 1일</p>

              <section>
                <h3 className="text-white font-semibold mb-2">제1조 (개인정보의 처리 목적)</h3>
                <p>비젼솔루션(이하 "회사")은 다음 목적으로 개인정보를 처리합니다. 처리하는 개인정보는 다음 목적 이외의 용도로 사용되지 않으며, 목적이 변경되는 경우에는 별도 동의를 받겠습니다.</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
                  <li>웹사이트 보안·성능·SEO 무료 진단 서비스 제공</li>
                  <li>진단 리포트 PDF 이메일 발송</li>
                  <li>서비스 이용에 관한 문의·상담 처리</li>
                  <li>마케팅 및 서비스 개선 목적 (동의 시)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제2조 (수집하는 개인정보 항목)</h3>
                <p className="mb-2">회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.</p>
                <ul className="list-disc list-inside space-y-1 text-neutral-400">
                  <li>필수: 이메일 주소, 진단 대상 URL</li>
                  <li>선택: 회사명/담당자명</li>
                  <li>자동 수집: 서비스 이용 기록, IP 주소, 브라우저 정보</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제3조 (개인정보의 처리 및 보유 기간)</h3>
                <p>회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보 수집 시 동의받은 보유·이용 기간 내에서 개인정보를 처리·보유합니다.</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
                  <li>서비스 제공 목적: 서비스 종료 후 즉시 삭제</li>
                  <li>이메일 수신 기록: 3년 (전자상거래법 준용)</li>
                  <li>민원·상담 기록: 3년</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제4조 (개인정보의 제3자 제공)</h3>
                <p>회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
                  <li>이용자가 사전에 동의한 경우</li>
                  <li>법령의 규정에 의거하거나 수사기관의 요구가 있는 경우</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제5조 (개인정보 처리의 위탁)</h3>
                <p>회사는 서비스 향상을 위해 아래와 같이 개인정보 처리 업무를 위탁하고 있습니다.</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
                  <li>이메일 발송 서비스 (Google Workspace): 진단 리포트 발송</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제6조 (정보주체의 권리·의무)</h3>
                <p>이용자는 개인정보 주체로서 다음과 같은 권리를 행사할 수 있습니다.</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
                  <li>개인정보 열람 요구</li>
                  <li>개인정보 오류 정정 요구</li>
                  <li>개인정보 삭제 요구</li>
                  <li>개인정보 처리 정지 요구</li>
                </ul>
                <p className="mt-2">위 권리 행사는 <strong className="text-white">biztalktome@gmail.com</strong>으로 이메일 문의 주시면 처리해드립니다.</p>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제7조 (개인정보의 안전성 확보 조치)</h3>
                <p>회사는 개인정보 보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 조치를 취하고 있습니다.</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
                  <li>개인정보 암호화: 비밀번호 및 중요 정보 암호화 저장</li>
                  <li>해킹 등 대비 조치: SSL 인증서 적용, 보안 서버 운영</li>
                  <li>접근 권한 최소화: 담당자 외 접근 제한</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제8조 (개인정보 보호책임자)</h3>
                <div className="text-neutral-400 space-y-1">
                  <p>회사명: 비젼솔루션</p>
                  <p>개인정보 보호책임자: 대표자</p>
                  <p>이메일: biztalktome@gmail.com</p>
                  <p>웹사이트: visionc.co.kr</p>
                </div>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제9조 (개인정보 처리방침 변경)</h3>
                <p>이 개인정보 처리방침은 2025년 1월 1일부터 적용됩니다. 내용이 변경되는 경우 홈페이지 공지사항을 통해 안내드리겠습니다.</p>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* 이용약관 */}
      <Dialog open={open === 'terms'} onOpenChange={v => setOpen(v ? 'terms' : null)}>
        <DialogContent className="max-w-2xl bg-neutral-950 border-neutral-800 text-neutral-300">
          <DialogHeader>
            <DialogTitle className="text-white text-lg">이용약관</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-5 text-sm leading-relaxed">
              <p className="text-neutral-500 text-xs">시행일: 2025년 1월 1일</p>

              <section>
                <h3 className="text-white font-semibold mb-2">제1조 (목적)</h3>
                <p>이 약관은 비젼솔루션(이하 "회사")이 운영하는 visionc.co.kr(이하 "사이트")에서 제공하는 서비스의 이용 조건 및 절차, 회사와 이용자 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제2조 (용어의 정의)</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-400">
                  <li>"서비스"란 회사가 사이트를 통해 제공하는 웹사이트 보안진단, SEO 분석, 성능 측정, 무료 리포트 발송 등 일체의 서비스를 의미합니다.</li>
                  <li>"이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 자를 의미합니다.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제3조 (약관의 효력 및 변경)</h3>
                <p>이 약관은 서비스를 이용하는 모든 이용자에게 적용됩니다. 회사는 필요한 경우 약관을 변경할 수 있으며, 변경 시 사이트 공지사항을 통해 공지합니다. 변경된 약관에 동의하지 않는 이용자는 서비스 이용을 중단하여야 합니다.</p>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제4조 (서비스 이용)</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-400">
                  <li>서비스는 본인이 소유하거나 운영자로부터 허가받은 사이트에 한해 이용할 수 있습니다.</li>
                  <li>무단 진단·스캔은 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 위반입니다.</li>
                  <li>진단 리포트는 이용자가 입력한 이메일로 발송되며, 이메일 오기입으로 인한 미수신은 회사가 책임지지 않습니다.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제5조 (이용자의 의무)</h3>
                <p className="mb-2">이용자는 다음 행위를 하여서는 안 됩니다.</p>
                <ul className="list-disc list-inside space-y-1 text-neutral-400">
                  <li>타인의 정보 도용 또는 허위 정보 입력</li>
                  <li>서비스를 이용하여 법령 또는 이 약관을 위반하는 행위</li>
                  <li>서비스의 정상적인 운영을 방해하는 행위 (DDoS, 자동화된 요청 등)</li>
                  <li>타인에게 피해를 주거나 미풍양속에 반하는 행위</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제6조 (서비스 제공의 제한)</h3>
                <p>회사는 다음의 경우 서비스 제공을 제한하거나 중단할 수 있습니다.</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
                  <li>시스템 점검, 교체 및 고장, 통신 두절 등의 경우</li>
                  <li>이용자가 이 약관을 위반한 경우</li>
                  <li>천재지변, 불가항력 등 회사의 귀책사유 없이 서비스 제공이 불가한 경우</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제7조 (면책조항)</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-400">
                  <li>회사는 무료로 제공하는 진단 서비스의 정확성에 대해 법적 책임을 지지 않습니다.</li>
                  <li>진단 결과를 바탕으로 한 이용자의 의사결정에 대한 책임은 이용자 본인에게 있습니다.</li>
                  <li>회사는 이용자와 제3자 간의 분쟁에 대해 책임을 지지 않습니다.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제8조 (지식재산권)</h3>
                <p>사이트 내 콘텐츠, 디자인, 코드 등 모든 저작물의 지식재산권은 회사에 귀속됩니다. 이용자는 회사의 명시적인 사전 동의 없이 이를 복제, 배포, 수정하여서는 안 됩니다.</p>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제9조 (준거법 및 관할법원)</h3>
                <p>이 약관에 관한 분쟁은 대한민국 법률에 따르며, 소송은 회사 소재지를 관할하는 법원에 제기합니다.</p>
              </section>

              <section>
                <h3 className="text-white font-semibold mb-2">제10조 (문의)</h3>
                <p>서비스 이용 관련 문의는 아래로 연락 주세요.</p>
                <div className="text-neutral-400 mt-2 space-y-1">
                  <p>이메일: biztalktome@gmail.com</p>
                  <p>웹사이트: visionc.co.kr</p>
                </div>
              </section>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
