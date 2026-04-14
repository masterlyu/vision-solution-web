import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/lib/env'
import { checkRateLimit, getClientId } from '@/lib/rateLimit'

const TOKEN = env.TELEGRAM_BOT_TOKEN
const CHAT_ID = env.TELEGRAM_CHAT_ID

// 창의적 산출물 승인 요청 API
// 에이전트가 호출: POST /api/creative-approve
// body: { issueTitle, previewUrl, description, agentName, screenshotUrl? }

export async function POST(req: NextRequest) {
  const rl = await checkRateLimit('creative-approve', getClientId(req), { limit: 5, windowSec: 60 })
  if (!rl.success) {
    return NextResponse.json(
      { error: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rl.resetAt - Math.floor(Date.now() / 1000)),
          'X-RateLimit-Remaining': '0',
        },
      }
    )
  }

  const { issueTitle, previewUrl, description, agentName, screenshotUrl } = await req.json()

  const callbackBase = `${env.NEXT_PUBLIC_BASE_URL}/api/creative-callback`

  const msg = [
    `🎨 <b>창작물 검수 요청</b>`,
    ``,
    `담당: <b>${agentName}</b>`,
    `이슈: ${issueTitle}`,
    ``,
    `📝 ${description}`,
    previewUrl ? `\n🔗 미리보기: ${previewUrl}` : '',
    ``,
    `⏰ ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`,
  ].filter(Boolean).join('\n')

  const keyboard = {
    inline_keyboard: [[
      { text: '✅ 승인 — 배포 진행', callback_data: `approve:${encodeURIComponent(issueTitle)}` },
      { text: '❌ 반려 — 수정 요청', callback_data: `reject:${encodeURIComponent(issueTitle)}` },
    ]]
  }

  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: msg,
      parse_mode: 'HTML',
      reply_markup: keyboard,
    }),
  })

  const data = await res.json()
  return NextResponse.json({ ok: true, messageId: data.result?.message_id })
}
