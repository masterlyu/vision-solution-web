import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function loadFont(): Promise<ArrayBuffer> {
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap',
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  ).then(r => r.text())

  const match = css.match(/src: url\(([^)]+\.ttf)\)/)
  if (!match) throw new Error('font url not found')

  return fetch(match[1]).then(r => r.arrayBuffer())
}

export async function GET() {
  const fontData = await loadFont()

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          backgroundColor: '#0f0a1e',
          fontFamily: 'NotoSansKR',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 퍼플 글로우 — 우상단 */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-60px',
          width: '480px', height: '480px', borderRadius: 240,
          backgroundColor: 'rgba(139,92,246,0.22)',
          display: 'flex',
        }} />

        {/* 퍼플 글로우 — 좌하단 */}
        <div style={{
          position: 'absolute', bottom: '-120px', left: '-80px',
          width: '400px', height: '400px', borderRadius: 200,
          backgroundColor: 'rgba(139,92,246,0.12)',
          display: 'flex',
        }} />

        {/* 메인 콘텐츠 */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          width: '100%', height: '100%',
          position: 'relative',
        }}>
          {/* 상단 로고 + 배지 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 34, color: '#ffffff', display: 'flex' }}>
              VISIONC
            </div>
            <div style={{
              display: 'flex',
              backgroundColor: 'rgba(139,92,246,0.18)',
              borderRadius: 20,
              paddingTop: 8, paddingBottom: 8, paddingLeft: 22, paddingRight: 22,
              fontSize: 16, color: '#c4b5fd',
            }}>
              무료 AI 진단
            </div>
          </div>

          {/* 메인 카피 */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 60, color: '#ffffff', lineHeight: 1.15, display: 'flex' }}>
              홈페이지가 고객을
            </div>
            <div style={{ fontSize: 60, color: '#a78bfa', lineHeight: 1.15, display: 'flex', marginBottom: 24 }}>
              놓치고 있습니까?
            </div>
            <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.6)', display: 'flex' }}>
              URL 하나로 48시간 내 AI 진단 · 리뉴얼·보안·AI 솔루션 원스톱
            </div>
          </div>

          {/* 하단 도메인 */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 36, height: 3, backgroundColor: '#8b5cf6', marginRight: 14, display: 'flex' }} />
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', display: 'flex' }}>
              visionc.co.kr
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'NotoSansKR', data: fontData, style: 'normal', weight: 400 }],
    }
  )
}
