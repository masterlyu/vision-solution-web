/**
 * Structured JSON logger — Edge Runtime compatible.
 *
 * Emits one JSON line per call to stdout/stderr.
 * Each entry includes: ts, level, msg, and any caller-supplied context.
 *
 * Log level is controlled by LOG_LEVEL env var (debug|info|warn|error, default: info).
 */

type Level = 'debug' | 'info' | 'warn' | 'error'

export interface LogContext {
  requestId?: string
  path?: string
  method?: string
  statusCode?: number
  durationMs?: number
  userId?: string
  [key: string]: unknown
}

const LEVEL_VALUES: Record<Level, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
}

function minLevel(): number {
  const raw = (process.env.LOG_LEVEL ?? 'info').toLowerCase() as Level
  return LEVEL_VALUES[raw] ?? LEVEL_VALUES.info
}

function emit(level: Level, msg: string, ctx: LogContext): void {
  if (LEVEL_VALUES[level] < minLevel()) return

  const entry = JSON.stringify({
    ts: new Date().toISOString(),
    level,
    msg,
    ...ctx,
  })

  // Route warn/error to stderr so log aggregators can split by severity
  if (level === 'error' || level === 'warn') {
    console.error(entry)
  } else {
    console.log(entry)
  }
}

export const logger = {
  debug: (msg: string, ctx: LogContext = {}) => emit('debug', msg, ctx),
  info:  (msg: string, ctx: LogContext = {}) => emit('info',  msg, ctx),
  warn:  (msg: string, ctx: LogContext = {}) => emit('warn',  msg, ctx),
  error: (msg: string, ctx: LogContext = {}) => emit('error', msg, ctx),
}
