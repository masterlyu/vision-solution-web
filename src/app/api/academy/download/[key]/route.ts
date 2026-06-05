import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import { verifyAcademyCookie } from '../../auth/route'

const COOKIE_NAME = 'visionc_academy_auth'

type Entry = { file: string; filename: string; mime: string }

const DOWNLOADS: Record<string, Entry> = {
  'lv1-speaker-notes': {
    file: 'src/storage/academy/lv1-speaker-notes.pdf',
    filename: 'visionc-academy-lv1-speaker-notes.pdf',
    mime: 'application/pdf',
  },
  'lv2-speaker-notes': {
    file: 'src/storage/academy/lv2-speaker-notes.pdf',
    filename: 'visionc-academy-lv2-speaker-notes.pdf',
    mime: 'application/pdf',
  },
  'dept-ai-slides': {
    file: 'src/storage/academy/dept-ai-slides.pptx',
    filename: 'visionc-enterprise-dept-ai-slides.pptx',
    mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  },
  'dept-ai-speaker-notes': {
    file: 'src/storage/academy/dept-ai-speaker-notes.pdf',
    filename: 'visionc-enterprise-dept-ai-speaker-notes.pdf',
    mime: 'application/pdf',
  },
  'build-ai-slides': {
    file: 'src/storage/academy/build-ai-slides.pptx',
    filename: 'visionc-enterprise-build-ai-slides.pptx',
    mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  },
  'build-ai-speaker-notes': {
    file: 'src/storage/academy/build-ai-speaker-notes.pdf',
    filename: 'visionc-enterprise-build-ai-speaker-notes.pdf',
    mime: 'application/pdf',
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
        'Content-Type': entry.mime,
        'Content-Disposition': `attachment; filename="${entry.filename}"`,
        'Cache-Control': 'private, no-store',
      },
    })
  } catch {
    return NextResponse.json({ error: 'file not available' }, { status: 500 })
  }
}
