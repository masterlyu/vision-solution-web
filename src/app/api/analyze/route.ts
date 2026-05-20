import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { sendVerificationEmail } from '@/lib/emailSender'
import { env } from '@/lib/env'

const TBOT  = env.TELEGRAM_BOT_TOKEN
const TCHAT = env.TELEGRAM_CHAT_ID
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

export async function GET() {
  return Response.json({
    GMAIL_USER:              env.GMAIL_USER              ? '✓ set' : '✗ missing',
    GMAIL_APP_PASSWORD:      env.GMAIL_APP_PASSWORD       ? '✓ set' : '✗ missing',
    TELEGRAM_BOT_TOKEN:      env.TELEGRAM_BOT_TOKEN       ? '✓ set' : '✗ missing',
    UPSTASH_REDIS_REST_URL:  env.UPSTASH_REDIS_REST_URL   ? '✓ set' : '✗ missing',
    UPSTASH_REDIS_REST_TOKEN:env.UPSTASH_REDIS_REST_TOKEN ? '✓ set' : '✗ missing',
  })
}

export async function POST(req: NextRequest) {
  const { url, email, company } = await req.json()
  if (!url || !email) return NextResponse.json({ error: 'URL과 이메일이 필요합니다.' }, { status: 400 })

  // 도메인 소유 확인 — 관리자 이메일은 예외
  if (!ADMIN_EMAILS.includes(email.toLowerCase())) {
    const urlHost = getHostname(url)
    if (!urlHost || !domainsMatch(urlHost, email)) {
      return NextResponse.json(
        { error: '이메일 도메인이 스캔 대상 URL의 도메인과 일치해야 합니다. 해당 사이트의 담당자 이메일을 입력해 주세요.' },
        { status: 400 },
      )
    }
  }

  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ error: '[서버 설정 오류] Redis 환경변수가 설정되지 않았습니다. 관리자에게 문의해 주세요.' }, { status: 503 })
  }

  let step = 'redis'
  try {
    // 토큰 생성 및 Redis 저장 (24시간 TTL)
    const token = crypto.randomUUID()
    const redis = new Redis({ url: env.UPSTASH_REDIS_REST_URL, token: env.UPSTASH_REDIS_REST_TOKEN })
    await redis.set(
      `scan:verify:${token}`,
      JSON.stringify({ url, email, company: company ?? '' }),
      { ex: 86400 },
    )

    // 인증 이메일 발송
    step = 'email'
    const baseUrl = env.NEXT_PUBLIC_BASE_URL ?? 'https://www.visionc.co.kr'
    await sendVerificationEmail(email, url, token, baseUrl)

    // 어드민 알림
    step = 'telegram'
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
    console.error(`[analyze:${step}]`, e)
    return NextResponse.json({ error: `[${step}] ${e.message}` }, { status: 500 })
  }
}
