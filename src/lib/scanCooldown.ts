// 무료 보안점검 — 도메인별 중복 차단 + 재점검 주기 관리 (모델 없음, 0층)
// 정책(2026-10-26 사령관 승인): 같은 도메인 7일 이내 재점검 차단, 30일마다 재점검 권장.
// 저장소: Upstash Redis (서버리스 인스턴스 간 공유 필요 — 인메모리 레이트리밋으론 불가).
// 가용성 우선: Redis 미설정/오류 시 모두 "통과"로 폴백해 정상 사용자를 막지 않는다.
import { Redis } from '@upstash/redis'
import { env } from '@/lib/env'

export const COOLDOWN_DAYS = 7
export const RESCAN_DAYS = 30
const DAY = 86_400_000

let _redis: Redis | null = null
function client(): Redis | null {
  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) return null
  if (!_redis) _redis = new Redis({ url: env.UPSTASH_REDIS_REST_URL, token: env.UPSTASH_REDIS_REST_TOKEN })
  return _redis
}

const key = (host: string) => `freescan:last:${host.toLowerCase()}`

// 최근 완료된 무료점검 시각(ms). 없거나 Redis 불가 시 null.
export async function lastScanAt(host: string): Promise<number | null> {
  const r = client()
  if (!r || !host) return null
  try {
    const v = await r.get<number | string>(key(host))
    if (v == null) return null
    const n = typeof v === 'number' ? v : Number(v)
    return Number.isFinite(n) ? n : null
  } catch {
    return null
  }
}

// 쿨다운 판정: 7일 이내면 blocked. daysAgo=직전 점검 경과일(없으면 null).
export async function checkCooldown(host: string): Promise<{ blocked: boolean; daysAgo: number | null }> {
  const last = await lastScanAt(host)
  if (last == null) return { blocked: false, daysAgo: null }
  const elapsed = Date.now() - last
  return { blocked: elapsed < COOLDOWN_DAYS * DAY, daysAgo: Math.floor(elapsed / DAY) }
}

// 점검 완료 시 호출 — 도메인 마지막 점검시각 기록(90일 TTL). 반환: 직전 점검 경과일(없으면 null).
export async function markScanned(host: string): Promise<number | null> {
  const prev = await lastScanAt(host)
  const r = client()
  if (r && host) {
    try {
      await r.set(key(host), Date.now(), { ex: 90 * 24 * 3600 })
    } catch {
      /* 가용성 우선 — 기록 실패해도 점검 자체는 성공으로 둔다 */
    }
  }
  return prev == null ? null : Math.floor((Date.now() - prev) / DAY)
}

// hostname 추출(www 제거). 실패 시 ''.
export function hostOf(raw: string): string {
  try {
    return new URL(raw).hostname.replace(/^www\./i, '')
  } catch {
    return ''
  }
}
