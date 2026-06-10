/**
 * Health check endpoint — GET /api/health
 *
 * Returns 200 OK with basic runtime info when the server is up.
 * Used for uptime monitoring (e.g. UptimeRobot, Vercel cron ping, or any HTTP monitor).
 *
 * Response shape is stable — add fields but never remove them.
 */

import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      version: process.env.NEXT_PUBLIC_APP_VERSION ?? '0.1.0',
      ts: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        // Do not cache health responses
        'Cache-Control': 'no-store',
      },
    }
  )
}
