import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/lib/env'

export const dynamic = 'force-dynamic'

const TOKEN   = env.TELEGRAM_BOT_TOKEN
const CHAT_ID = env.TELEGRAM_CHAT_ID

async function sendTelegram(text: string) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
  })
}

export async function GET(req: NextRequest) {
  const sp      = new URL(req.url).searchParams
  const scan    = sp.get('scan')  ?? ''
  const quoteNo = sp.get('q')     ?? ''
  const site    = sp.get('site')  ?? ''
  const email   = sp.get('email') ?? ''
  const amt     = sp.get('amt')   ?? ''

  const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  try {
    const msg = [
      `🔔 <b>견적 동의 접수!</b>`,
      ``,
      `🌐 사이트: <b>${site}</b>`,
      `📋 견적번호: <code>${quoteNo}</code>`,
      `💰 금액: <b>${amt}</b>`,
      `👤 담당자: ${email}`,
      ``,
      `✅ 계약금 50% 입금 확인 후 작업을 시작하세요!`,
      ``,
      `⏰ ${now}`,
    ].join('\n')
    await sendTelegram(msg)
  } catch (_) {}

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>견적 동의 완료 — VISIONC</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#0D0D0D;font-family:'Apple SD Gothic Neo',Arial,sans-serif;color:#eee;
         min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
    .card{background:#161616;border:1px solid #222;border-radius:16px;padding:40px 36px;
          max-width:480px;width:100%;text-align:center}
    .icon{font-size:56px;margin-bottom:20px}
    .title{font-size:22px;font-weight:800;color:#34C759;margin-bottom:10px}
    .sub{font-size:14px;color:#aaa;line-height:1.8;margin-bottom:24px}
    .info{background:#1E1E1E;border-radius:10px;padding:16px;font-size:12px;
          color:#888;text-align:left;line-height:2.2}
    .info b{color:#ccc}
    .brand{margin-top:28px;color:#555;font-size:12px}
    .brand span{color:#FF6D5A;font-weight:700}
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">&#x2705;</div>
    <div class="title">견적 동의가 완료되었습니다!</div>
    <div class="sub">
      <b style="color:#eee">${site}</b> 보안 개선 작업 의뢰가 접수되었습니다.<br>
      담당자가 <b style="color:#eee">1영업일 이내</b>에 연락드립니다.
    </div>
    <div class="info">
      <b>견적번호</b>&nbsp;&nbsp;${quoteNo}<br>
      <b>접수 이메일</b>&nbsp;&nbsp;${email}<br>
      <b>접수 시각</b>&nbsp;&nbsp;${now}
    </div>
    <div class="brand">Powered by <span>VISIONC</span> Security</div>
  </div>
</body>
</html>`

  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
