import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import { verifyAcademyCookie } from '../../auth/route'

const COOKIE_NAME = 'visionc_academy_auth'

const DOWNLOADS: Record<string, { file: string; filename: string }> = {
  'lv1-speaker-notes': {
    file: 'src/storage/academy/lv1-speaker-notes.pdf',
    filename: 'visionc-academy-lv1-speaker-notes.pdf',
  },
  'lv2-speaker-notes': {
    file: 'src/storage/academy/lv2-speaker-notes.pdf',
    filename: 'visionc-academy-lv2-speaker-notes.pdf',
  },
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ key: string }> },
) {
  const { key } = await context.params
  const entry = DOWNLOADS[key]
  if (!entry) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  const cookie = req.cookies.get(COOKIE_NAME)?.value
  if (!verifyAcademyCookie(cookie)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const filePath = path.join(process.cwd(), entry.file)
  try {
    const data = await readFile(filePath)
    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${entry.filename}"`,
        'Cache-Control': 'private, no-store',
      },
    })
  } catch {
    return NextResponse.json({ error: 'file not available' }, { status: 500 })
  }
}
