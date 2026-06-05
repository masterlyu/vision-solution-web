import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import { verifyAcademyCookie } from '../../auth/route'

const COOKIE_NAME = 'visionc_academy_auth'

type Entry = { file: string; filename: string; mime: string }

const PPTX_MIME = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
const PDF_MIME = 'application/pdf'

const DOWNLOADS: Record<string, Entry> = {
  'lv1-speaker-notes': {
    file: 'src/storage/academy/lv1-speaker-notes.pdf',
    filename: 'visionc-academy-lv1-speaker-notes.pdf',
    mime: PDF_MIME,
  },
  'lv2-speaker-notes': {
    file: 'src/storage/academy/lv2-speaker-notes.pdf',
    filename: 'visionc-academy-lv2-speaker-notes.pdf',
    mime: PDF_MIME,
  },
  'lv3-speaker-notes': {
    file: 'src/storage/academy/lv3-speaker-notes.pdf',
    filename: 'visionc-academy-lv3-speaker-notes.pdf',
    mime: PDF_MIME,
  },
  'lv4-speaker-notes': {
    file: 'src/storage/academy/lv4-speaker-notes.pdf',
    filename: 'visionc-academy-lv4-speaker-notes.pdf',
    mime: PDF_MIME,
  },
  'lv5-speaker-notes': {
    file: 'src/storage/academy/lv5-speaker-notes.pdf',
    filename: 'visionc-academy-lv5-speaker-notes.pdf',
    mime: PDF_MIME,
  },
  'lv6-speaker-notes': {
    file: 'src/storage/academy/lv6-speaker-notes.pdf',
    filename: 'visionc-academy-lv6-speaker-notes.pdf',
    mime: PDF_MIME,
  },
  'lv7-speaker-notes': {
    file: 'src/storage/academy/lv7-speaker-notes.pdf',
    filename: 'visionc-academy-lv7-speaker-notes.pdf',
    mime: PDF_MIME,
  },
  'lv8-speaker-notes': {
    file: 'src/storage/academy/lv8-speaker-notes.pdf',
    filename: 'visionc-academy-lv8-speaker-notes.pdf',
    mime: PDF_MIME,
  },
  // === dept-ai (Course 01) — 편별 ===
  'dept-ai-part1-slides': {
    file: 'src/storage/academy/dept-ai-part1-slides.pptx',
    filename: 'visionc-enterprise-dept-ai-part1-slides.pptx',
    mime: PPTX_MIME,
  },
  'dept-ai-part1-speaker-notes': {
    file: 'src/storage/academy/dept-ai-part1-speaker-notes.pdf',
    filename: 'visionc-enterprise-dept-ai-part1-speaker-notes.pdf',
    mime: PDF_MIME,
  },
  'dept-ai-part2-slides': {
    file: 'src/storage/academy/dept-ai-part2-slides.pptx',
    filename: 'visionc-enterprise-dept-ai-part2-slides.pptx',
    mime: PPTX_MIME,
  },
  'dept-ai-part2-speaker-notes': {
    file: 'src/storage/academy/dept-ai-part2-speaker-notes.pdf',
    filename: 'visionc-enterprise-dept-ai-part2-speaker-notes.pdf',
    mime: PDF_MIME,
  },
  'dept-ai-part3-slides': {
    file: 'src/storage/academy/dept-ai-part3-slides.pptx',
    filename: 'visionc-enterprise-dept-ai-part3-slides.pptx',
    mime: PPTX_MIME,
  },
  'dept-ai-part3-speaker-notes': {
    file: 'src/storage/academy/dept-ai-part3-speaker-notes.pdf',
    filename: 'visionc-enterprise-dept-ai-part3-speaker-notes.pdf',
    mime: PDF_MIME,
  },
  'dept-ai-part4-slides': {
    file: 'src/storage/academy/dept-ai-part4-slides.pptx',
    filename: 'visionc-enterprise-dept-ai-part4-slides.pptx',
    mime: PPTX_MIME,
  },
  'dept-ai-part4-speaker-notes': {
    file: 'src/storage/academy/dept-ai-part4-speaker-notes.pdf',
    filename: 'visionc-enterprise-dept-ai-part4-speaker-notes.pdf',
    mime: PDF_MIME,
  },
  'dept-ai-part5-slides': {
    file: 'src/storage/academy/dept-ai-part5-slides.pptx',
    filename: 'visionc-enterprise-dept-ai-part5-slides.pptx',
    mime: PPTX_MIME,
  },
  'dept-ai-part5-speaker-notes': {
    file: 'src/storage/academy/dept-ai-part5-speaker-notes.pdf',
    filename: 'visionc-enterprise-dept-ai-part5-speaker-notes.pdf',
    mime: PDF_MIME,
  },
  // === 향후 추가될 키 (자료 업로드 시 활성화) ===
  // dept-ai-part2-slides, dept-ai-part2-speaker-notes,
  // dept-ai-part3-slides ... dept-ai-part5-speaker-notes,
  // build-ai-part1-slides ... build-ai-part11-slides
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
