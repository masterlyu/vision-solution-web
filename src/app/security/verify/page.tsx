import ScanVerifyClient from './ScanVerifyClient'

export const metadata = { title: 'VISIONC — 보안 진단 인증' }

export default function Page({ searchParams }: { searchParams: { token?: string } }) {
  return <ScanVerifyClient token={searchParams.token ?? ''} />
}
