import type { Metadata } from 'next'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { markdownToHtml } from '@/lib/markdownToHtml'

export const metadata: Metadata = {
  title: 'Course 02 · 01강 미리보기 | Vision Solution Academy',
  description: '사내 AI 구축·운영 — 01강 클라우드 vs 온프레미스 손익분기점 (심화·철학 기반 강의 자료 미리보기).',
  robots: { index: false, follow: false },
}

export default function BuildAiLesson01() {
  const md = fs.readFileSync(
    path.join(process.cwd(), 'content/academy/build-ai-01.md'),
    'utf-8',
  )
  const html = markdownToHtml(md)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-24 lg:py-32">
        <Link
          href="/ai-solution/academy/build-ai"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 inline-block"
        >
          &larr; Course 02 커리큘럼으로
        </Link>
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold">
          강의 자료 미리보기 (내부 검토용)
        </div>
        <article className="academy-content" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}
