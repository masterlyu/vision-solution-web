/**
 * ZAP 스캔 이력 API
 *
 * GET  /api/zap-scan          — 최근 스캔 이력 조회 (관리자용)
 * POST /api/zap-scan          — GitHub Actions에서 스캔 결과 저장
 */
import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { env } from '@/lib/env'

const redis = new Redis({
  url:   env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
})

const ZAP_HISTORY_KEY  = 'zap:history'
const ZAP_MAX_RECORDS  = 50

export interface ZapHistoryRecord {
  id: string
  profile: 'baseline' | 'full' | 'api'
  targetUrl: string
  scannedAt: string
  durationSec: number
  summary: { high: number; medium: number; low: number; informational: number; total: number }
  zapScore: number
  reportUrl?: string
  triggeredBy: 'ci' | 'schedule' | 'manual'
}

// POST — GitHub Actions가 스캔 완료 후 결과를 저장
export async function POST(req: NextRequest) {
  // 간단한 내부 키 인증
  const authHeader = req.headers.get('x-zap-webhook-secret')
  if (authHeader !== env.ZAP_API_KEY) {
    return NextResponse.json({ error: '인증 실패' }, { status: 401 })
  }

  const body = await req.json() as ZapHistoryRecord
  if (!body.id || !body.profile || !body.targetUrl) {
    return NextResponse.json({ error: '필수 필드 누락' }, { status: 400 })
  }

  // Redis sorted set (score = timestamp)으로 저장
  const score = Date.now()
  await redis.zadd(ZAP_HISTORY_KEY, { score, member: JSON.stringify(body) })

  // 오래된 레코드 정리 (최대 50건 유지)
  const count = await redis.zcard(ZAP_HISTORY_KEY)
  if (count > ZAP_MAX_RECORDS) {
    await redis.zremrangebyrank(ZAP_HISTORY_KEY, 0, count - ZAP_MAX_RECORDS - 1)
  }

  return NextResponse.json({ ok: true })
}

// GET — 대시보드에서 이력 조회
export async function GET(req: NextRequest) {
  // Vercel Preview 환경에서는 누구나 접근 가능하도록 (실제 배포에서는 인증 추가 권장)
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') ?? '20'), 50)

  const raw = await redis.zrange(ZAP_HISTORY_KEY, 0, limit - 1, { rev: true })
  const records: ZapHistoryRecord[] = raw.map(r => {
    try { return typeof r === 'string' ? JSON.parse(r) : r }
    catch { return null }
  }).filter(Boolean)

  return NextResponse.json({ records })
}
