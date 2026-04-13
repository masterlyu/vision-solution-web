import { Redis } from '@upstash/redis'
import { env } from './env'

const redis = new Redis({
  url:   env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
})

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  limit: number
  /** Window duration in seconds */
  windowSec: number
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number // Unix timestamp (seconds)
}

/**
 * Fixed-window rate limiter using Upstash Redis.
 * Key format: `rl:{endpoint}:{identifier}`
 */
export async function checkRateLimit(
  endpoint: string,
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const key = `rl:${endpoint}:${identifier}`
  const now = Math.floor(Date.now() / 1000)
  const windowStart = Math.floor(now / config.windowSec) * config.windowSec
  const windowKey = `${key}:${windowStart}`
  const resetAt = windowStart + config.windowSec

  // INCR atomically increments and returns new value; EXPIRE sets TTL if not already set
  const count = await redis.incr(windowKey)
  if (count === 1) {
    await redis.expire(windowKey, config.windowSec)
  }

  const remaining = Math.max(0, config.limit - count)
  return {
    success: count <= config.limit,
    remaining,
    resetAt,
  }
}

/** Extracts a best-effort client identifier from the request (IP address). */
export function getClientId(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return 'unknown'
}
