import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { env } from '@/lib/env'

const TOKEN = env.TELEGRAM_BOT_TOKEN
const CHAT_ID = env.TELEGRAM_CHAT_ID

function verifySignature(req: NextRequest, rawBody: string): boolean {
  const secret = env.DEPLOY_WEBHOOK_SECRET
  if (!secret) {
    return process.env.NODE_ENV !== 'production'
  }

  const signature = req.headers.get('x-vercel-signature') ?? ''
  if (!signature) return false

  const expected = createHmac('sha1', secret).update(rawBody).digest('hex')
  if (signature.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}

async function sendTelegram(text: string) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
  })
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()

    if (!verifySignature(req, rawBody)) {
      return NextResponse.json({ error: 'invalid signature' }, { status: 403 })
    }

    const body = JSON.parse(rawBody)
    const { type, name, state, meta } = body

    if (state === 'READY' || type === 'deployment.succeeded') {
      const commitMsg = meta?.githubCommitMessage || name || '업데이트'
      const branch = meta?.githubCommitRef || 'main'
      const sha = (meta?.githubCommitSha || '').slice(0, 7)

      const lines = [
        '✅ <b>사이트 배포 완료</b>',
        '',
        `브랜치: <code>${branch}</code>`,
        sha ? `커밋: <code>${sha}</code>` : '',
        `내용: ${commitMsg}`,
        '',
        '🌐 <a href=https://www.visionc.co.kr>www.visionc.co.kr</a>',
        `⏰ ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`,
      ].filter(Boolean).join('\n')

      await sendTelegram(lines)
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
