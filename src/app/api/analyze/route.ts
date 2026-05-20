import { NextRequest, NextResponse } from 'next/server'
import { sendVerificationEmail } from '@/lib/emailSender'
import { env } from '@/lib/env'

const ADMIN_EMAILS = ['biztalktome@gmail.com']

export const maxDuration = 15

function getHostname(raw: string): string {
  try { return new URL(raw).hostname.replace(/^www\./i, '') } catch { return '' }
}

function domainsMatch(urlHostname: string, emailAddr: string): boolean {
  const emailDomain = emailAddr.slice(emailAddr.indexOf('@') + 1).toLowerCase()
  return urlHostname === emailDomain ||
    urlHostname.endsWith(`.${emailDomain}`) ||
    emailDomain.endsWith(`.${urlHostname}`)
}

async function signToken(payload: Record<string, unknown>, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  )
  const sigBytes = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  const sig = Buffer.from(sigBytes).toString('base64url')
  return `${data}.${sig}`
}

export async function GET() {
  return Response.json({
    GMAIL_USER:         env.GMAIL_USER         ? '✓ set' : '✗ missing',
    GMAIL_APP_PASSWORD: env.GMAIL_APP_PASSWORD  ? '✓ set' : '✗ missing',
    TELEGRAM_BOT_TOKEN: env.TELEGRAM_BOT_TOKEN  ? '✓ set' : '✗ missing',
    token_backend: 'hmac-jwt-v2 (no redis)',
    _v: 'hmac-v2',
  })
}

export async function POST(req: NextRequest) {
  const { url, email, company } = await req.json()
  if (!url || !email) return NextResponse.json({ error: 'URL과 이메일이 필요합니다.' }, { status: 400 })

  if (!ADMIN_EMAILS.includes(email.toLowerCase())) {
    const urlHost = getHostname(url)
    if (!urlHost || !domainsMatch(urlHost, email)) {
      return NextResponse.json(
        { error: '이메일 도메인이 스캔 대상 URL의 도메인과 일치해야 합니다. 해당 사이트의 담당자 이메일을 입력해 주세요.' },
        { status: 400 },
      )
    }
  }

  try {
    const exp = Date.now() + 86_400_000  // 24h
    const token = await signToken({ url, email, company: company ?? '', exp }, env.TELEGRAM_BOT_TOKEN)

    const baseUrl = env.NEXT_PUBLIC_BASE_URL ?? 'https://www.visionc.co.kr'
    await sendVerificationEmail(email, url, token, baseUrl)

    const TBOT  = env.TELEGRAM_BOT_TOKEN
    const TCHAT = env.TELEGRAM_CHAT_ID
    await fetch(`https://api.telegram.org/bot${TBOT}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TCHAT,
        text: [
          `🔐 <b>보안 진단 인증 요청</b>`,
          ``,
          `🌐 ${url}`,
          `📧 ${email}${company ? `  ·  ${company}` : ''}`,
          `\n인증 대기 중 — 링크 24시간 유효`,
        ].join('\n'),
        parse_mode: 'HTML',
      }),
    }).catch(() => {})

    return NextResponse.json({ ok: true, pending: true })
  } catch (e: any) {
    console.error('[analyze]', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
