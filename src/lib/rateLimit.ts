// 인메모리 rate limiter — Upstash Redis 의존성 제거
// 서버리스 환경에서 인스턴스 간 공유는 안 되지만 단일 인스턴스 내 단순 공격은 차단 가능

interface Window {
  count: number
  resetAt: number
}

const store = new Map<string, Window>()

function cleanup() {
  const now = Math.floor(Date.now() / 1000)
  for (const [key, win] of store) {
    if (win.resetAt < now) store.delete(key)
  }
}

export interface RateLimitConfig {
  limit: number
  windowSec: number
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number
}

export async function checkRateLimit(
  endpoint: string,
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const now = Math.floor(Date.now() / 1000)
  const windowStart = Math.floor(now / config.windowSec) * config.windowSec
  const resetAt = windowStart + config.windowSec
  const key = `rl:${endpoint}:${identifier}:${windowStart}`

  if (store.size > 500) cleanup()

  const win = store.get(key) ?? { count: 0, resetAt }
  win.count += 1
  store.set(key, win)

  const remaining = Math.max(0, config.limit - win.count)
  return { success: win.count <= config.limit, remaining, resetAt }
}

export function getClientId(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return 'unknown'
}
