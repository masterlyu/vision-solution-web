import ScanVerifyClient from './ScanVerifyClient'

export const metadata = { title: 'VISIONC — 보안 진단 인증' }

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams
  return <ScanVerifyClient token={token ?? ''} />
}
