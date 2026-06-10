/**
 * Centralised error reporter.
 *
 * - Always writes a structured log entry via logger.error
 * - Sends a Telegram alert for every reported error so the team sees it immediately
 * - Forwards to Sentry when SENTRY_DSN is configured (optional)
 *
 * Use this in API route catch blocks and unhandled-rejection handlers.
 */

import { logger } from './logger'

export interface ErrorContext {
  requestId?: string
  path?: string
  method?: string
  userId?: string
  extra?: Record<string, unknown>
}

/** Send a plain-text message to the ops Telegram chat. Silently ignores failures. */
async function telegramAlert(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    })
  } catch {
    // Never throw from an error reporter — the original error is already being handled
  }
}

/**
 * Report an error to all configured sinks (logger + Telegram + Sentry if available).
 *
 * @example
 * try { ... } catch (err) {
 *   await reportError(err, { requestId, path: '/api/analyze' })
 *   return NextResponse.json({ error: 'Internal error' }, { status: 500 })
 * }
 */
export async function reportError(err: unknown, ctx: ErrorContext = {}): Promise<void> {
  const error = err instanceof Error ? err : new Error(String(err))

  // 1. Structured log
  logger.error(error.message, {
    requestId: ctx.requestId,
    path: ctx.path,
    method: ctx.method,
    userId: ctx.userId,
    stack: error.stack,
    ...ctx.extra,
  })

  // 2. Sentry — if DSN is present, forward dynamically (avoids hard build-time dep)
  //    Install @sentry/nextjs and add SENTRY_DSN to .env.local to enable.
  if (process.env.SENTRY_DSN) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Sentry = await (eval('import("@sentry/nextjs")') as Promise<any>).catch(() => null)
      if (Sentry) {
        Sentry.captureException(error, {
          extra: { requestId: ctx.requestId, path: ctx.path, ...ctx.extra },
        })
      }
    } catch {
      // Sentry is optional — ignore import or capture failures
    }
  }

  // 3. Telegram alert
  const lines = [
    '🚨 <b>프로덕션 에러 발생</b>',
    '',
    `<b>메시지:</b> ${escapeHtml(error.message)}`,
    ctx.path   ? `<b>경로:</b> ${escapeHtml(ctx.path)}` : null,
    ctx.method ? `<b>메서드:</b> ${escapeHtml(ctx.method)}` : null,
    ctx.requestId ? `<b>요청 ID:</b> <code>${escapeHtml(ctx.requestId)}</code>` : null,
    '',
    `⏰ ${new Date().toISOString()}`,
  ].filter((l): l is string => l !== null).join('\n')

  await telegramAlert(lines)
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
