import type { Metadata } from 'next'
import ServiceJsonLd from '@/components/ServiceJsonLd'

export const metadata: Metadata = {
  title: 'FactoryLens | 제조 데이터를 하나의 지식 그래프로',
  description: 'MES·ERP·엑셀을 표준 온톨로지로 통합하고, 판단마다 근거 그래프를 보여주는 설명가능 AI 생산관리 솔루션. 노코드 연결, 약 2주 온보딩.',
  openGraph: {
    title: 'FactoryLens — 표준 온톨로지 + 설명가능 AI 제조 솔루션 | VISIONC',
    description: '수주·생산·출하·수금·품질·재고를 하나의 데이터 모델로 묶고, 모든 판단에 근거 그래프를 함께 보여줍니다.',
    images: [{ url: '/factorylens/factorylens-dashboard-viewport.png', width: 1280, height: 720, alt: 'FactoryLens 커맨드센터 대시보드' }],
  },
}

export default function FactoryLensLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceJsonLd
        name="FactoryLens"
        description="MES·ERP·엑셀을 표준 온톨로지로 통합하고 판단마다 근거 그래프를 보여주는 설명가능 AI 제조 생산관리 솔루션."
        url="https://visionc.co.kr/factorylens"
        serviceType="제조 AI 생산관리 솔루션"
        faqs={[
          { q: '온톨로지가 뭔가요?', a: '수주·생산·출하·수금·품질·재고처럼 서로 다른 데이터를 하나의 표준 모델로 묶어, MES·ERP 종류에 상관없이 같은 방식으로 연결하고 분석할 수 있게 하는 데이터 구조입니다.' },
          { q: '우리 MES·ERP도 연결되나요?', a: '더존·이카운트 등 국내 ERP는 물론 자체 개발 MES도 필드 단위로 매핑해 연결합니다. 유사도 알고리즘이 필드명을 자동으로 추천해 연결 작업 시간을 줄입니다.' },
          { q: 'MES 없이 엑셀로 관리하는데도 가능한가요?', a: '가능합니다. 엑셀·CSV 파일을 업로드하면 헤더를 자동으로 인식해 같은 방식으로 연결됩니다.' },
          { q: 'AI가 왜 그렇게 판단했는지 알 수 있나요?', a: '자동매칭·불량 원인·재고 권고 등 모든 판단에 근거가 되는 데이터와 관계를 그래프로 함께 보여줍니다. 결과만 던지는 블랙박스 방식이 아닙니다.' },
          { q: '데이터 유출이 걱정됩니다.', a: '기본값은 읽기전용입니다. 원본 시스템에 실제로 반영하는 기능은 별도로 켜야 하며, 켜더라도 사람 승인 후 감사 기록과 함께 실행되고 언제든 되돌릴 수 있습니다.' },
          { q: '도입 비용과 기간은 어떻게 되나요?', a: '회사 규모와 연결할 시스템 구조에 따라 달라 협의로 안내드립니다. 온보딩은 통상 약 2주가 걸립니다.' },
        ]}
      />
      {children}
    </>
  )
}
