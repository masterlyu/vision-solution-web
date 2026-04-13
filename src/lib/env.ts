import { z } from 'zod'

const envSchema = z.object({
  // Telegram — 신청 알림 및 보고서 승인 흐름에 필요
  TELEGRAM_BOT_TOKEN: z.string().min(1),
  TELEGRAM_CHAT_ID: z.string().min(1),

  // Upstash Redis — 보고서 승인 대기 데이터 임시 저장 (24h TTL)
  UPSTASH_REDIS_REST_URL: z.string().min(1),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),

  // Gmail — 고객에게 PDF 리포트 이메일 발송
  GMAIL_USER: z.string().min(1),
  GMAIL_APP_PASSWORD: z.string().min(1),

  // Telegram 웹훅 보안 — setWebhook() 호출 시 secret_token과 동일한 값으로 설정 (권장)
  TELEGRAM_WEBHOOK_SECRET: z.string().optional(),

  // 공개 환경변수 — 창작물 승인 콜백 URL 생성에 사용 (기본값 있음)
  NEXT_PUBLIC_BASE_URL: z.string().optional().default('https://www.visionc.co.kr'),
})

function validateEnv() {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    const lines = result.error.issues.map(
      (issue) => `  - ${issue.path.join('.')}: ${issue.message}`
    )
    throw new Error(
      `[환경변수 오류] 다음 환경변수가 누락되었거나 잘못되었습니다:\n${lines.join('\n')}\n\n` +
        `.env.local 파일을 확인하세요. .env.example을 참고하여 값을 채우세요.`
    )
  }

  return result.data
}

export const env = validateEnv()
