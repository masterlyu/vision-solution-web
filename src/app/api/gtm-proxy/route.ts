import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  const upstream = await fetch(
    'https://www.googletagmanager.com/gtag/js?id=G-8732WT2VFX',
    { next: { revalidate: 3600 } }
  )
  if (!upstream.ok) return new NextResponse('', { status: 502 })

  const js = await upstream.text()
  return new NextResponse(js, {
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
