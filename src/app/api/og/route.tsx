import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const fontData = await readFile(
    path.join(process.cwd(), 'public/fonts/NotoSansKR-Regular.ttf')
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0f0a1e 0%, #1a0f35 50%, #0d1b2a 100%)',
          fontFamily: 'NotoSansKR',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 배경 장식 원 */}
        <div style={{
          position: 'absolute', top: '-120px', right: '-80px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: '-150px', left: '-100px',
          width: '450px', height: '450px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* 그리드 라인 장식 */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          display: 'flex',
        }} />

        {/* 콘텐츠 */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          height: '100%',
          position: 'relative',
        }}>
          {/* 상단: 로고 + 배지 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{
              fontSize: '36px', fontWeight: 900, color: '#ffffff',
              letterSpacing: '-1px',
              display: 'flex',
            }}>
              VISIONC
            </div>
            <div style={{
              background: 'rgba(139,92,246,0.2)',
              border: '1px solid rgba(139,92,246,0.5)',
              borderRadius: '24px',
              padding: '8px 20px',
              fontSize: '15px',
              color: '#c4b5fd',
              display: 'flex',
            }}>
              무료 AI 진단
            </div>
          </div>

          {/* 중앙: 메인 카피 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              fontSize: '62px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-2px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <span style={{ display: 'flex' }}>홈페이지가 고객을</span>
              <span style={{ display: 'flex', color: '#a78bfa' }}>놓치고 있습니까?</span>
            </div>
            <div style={{
              fontSize: '22px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.6,
              display: 'flex',
            }}>
              URL 하나로 48시간 내 AI 진단 · 리뉴얼·보안·AI 솔루션 원스톱
            </div>
          </div>

          {/* 하단: 도메인 + 구분선 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '40px', height: '3px',
              background: 'linear-gradient(90deg, #8b5cf6, transparent)',
              display: 'flex',
            }} />
            <div style={{
              fontSize: '18px', color: 'rgba(255,255,255,0.5)',
              display: 'flex',
            }}>
              visionc.co.kr
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'NotoSansKR', data: fontData, style: 'normal' }],
    }
  )
}
