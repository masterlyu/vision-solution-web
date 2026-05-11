/**
 * GET /api/zap-scan/[id]/report?type=executive|technical|remediation&format=html|pdf|json
 *
 * 대시보드의 /api/security/reports/:id/download 프록시가 여기를 호출합니다.
 * 로컬 디스크에 저장된 파일을 그대로 스트림으로 반환.
 */
import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const REPORT_DIR = process.env.SECURITY_REPORT_DIR ?? '/home/ubuntu/company/website/storage/security-reports'
const INTERNAL_TOKEN = process.env.VISIONC_INTERNAL_TOKEN ?? ''

const ALLOWED_TYPES = new Set(['executive', 'technical', 'remediation', 'simple'])
const ALLOWED_FORMATS = new Set(['html', 'pdf', 'json'])

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const token = req.headers.get('x-internal-token')
  if (token !== INTERNAL_TOKEN || !INTERNAL_TOKEN) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { id } = await ctx.params
  const scanId = Number(id)
  if (!Number.isFinite(scanId)) {
    return NextResponse.json({ error: 'invalid id' }, { status: 400 })
  }

  const type = req.nextUrl.searchParams.get('type') ?? 'executive'
  const format = req.nextUrl.searchParams.get('format') ?? 'html'
  if (!ALLOWED_TYPES.has(type) || !ALLOWED_FORMATS.has(format)) {
    return NextResponse.json({ error: 'invalid type/format' }, { status: 400 })
  }

  const filename = `scan-${scanId}-${type}.${format}`
  const filepath = path.resolve(REPORT_DIR, filename)

  // path traversal 방지
  if (!filepath.startsWith(path.resolve(REPORT_DIR))) {
    return NextResponse.json({ error: 'invalid path' }, { status: 400 })
  }

  try {
    const body = await readFile(filepath)
    const contentType = format === 'pdf' ? 'application/pdf'
                      : format === 'json' ? 'application/json; charset=utf-8'
                      : 'text/html; charset=utf-8'
    return new NextResponse(body, {
      status: 200,
      headers: { 'Content-Type': contentType },
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: 'report not found', detail: msg }, { status: 404 })
  }
}
