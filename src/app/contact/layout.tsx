import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '도입 상담 신청',
  description: 'AI 도입·보안·웹사이트·앱 개발 도입 상담. 컨설팅·구축·사내 출강 교육·운영을 한 팀이 끝까지 책임집니다.',
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
