import nodemailer from 'nodemailer'
import { env } from './env'
import type { RenewalAnalysisResult } from './renewalAnalyzer'

function gradeColor(g: string) {
  return { A: '#22C55E', B: '#84cc16', 'C+': '#F59E0B', D: '#f97316', F: '#EF4444' }[g] ?? '#6B7280'
}

function statusDot(status: 'red' | 'yellow' | 'green') {
  return { red: '🔴', yellow: '🟡', green: '✅' }[status]
}

function timingLabel(t: string) {
  return { now: '즉시', '1m': '1개월 내', '3m': '3개월 내' }[t] ?? t
}

export function buildRenewalEmailHtml(r: RenewalAnalysisResult, email: string): string {
  const gc = gradeColor(r.grade)

  const criticalHtml = r.criticalIssues.map(issue => `
    <div style="background:#fef2f2;border-left:4px solid #ef4444;border-radius:0 8px 8px 0;padding:12px 16px;margin-bottom:8px;">
      <span style="font-size:16px;">🔴</span>
      <span style="font-size:13px;color:#374151;margin-left:8px;">${issue}</span>
    </div>`).join('')

  const priorityHtml = r.priorityActions.slice(0, 5).map((a, i) => `
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:10px 12px;width:28px;">
        <div style="width:26px;height:26px;border-radius:50%;background:${i < 2 ? '#fecaca' : i < 4 ? '#fde68a' : '#bbf7d0'};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${i < 2 ? '#b91c1c' : i < 4 ? '#92400e' : '#065f46'};text-align:center;line-height:26px;">${a.rank}</div>
      </td>
      <td style="padding:10px 12px;">
        <div style="font-size:13px;font-weight:700;color:#111827;">${a.title}</div>
        <div style="font-size:11px;color:#6b7280;margin-top:2px;">${a.description}</div>
      </td>
      <td style="padding:10px 12px;text-align:center;white-space:nowrap;">
        <span style="display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:700;
          background:${a.timing === 'now' ? '#fef2f2' : a.timing === '1m' ? '#fffbeb' : '#f0fdf4'};
          color:${a.timing === 'now' ? '#b91c1c' : a.timing === '1m' ? '#92400e' : '#065f46'};">
          ${timingLabel(a.timing)}
        </span>
      </td>
    </tr>`).join('')

  const axisRows = [
    { name: '⚙️ 기술 기반', score: r.axes.technical.score, max: r.axes.technical.maxScore },
    { name: '👥 사용자 경험', score: r.axes.ux.score, max: r.axes.ux.maxScore },
    { name: '🌐 현대 기준', score: r.axes.modern.score, max: r.axes.modern.maxScore },
  ].map(a => {
    const pct = Math.round((a.score / a.max) * 100)
    const color = pct >= 70 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444'
    return `
      <tr style="border-bottom:1px solid #f5f5f5;">
        <td style="padding:10px 14px;font-size:13px;font-weight:600;">${a.name}</td>
        <td style="padding:10px 14px;">
          <div style="background:#f3f4f6;border-radius:4px;height:8px;width:140px;display:inline-block;vertical-align:middle;">
            <div style="width:${Math.round(pct * 1.4)}px;height:8px;border-radius:4px;background:${color};"></div>
          </div>
        </td>
        <td style="padding:10px 14px;text-align:center;font-size:15px;font-weight:800;color:${color};">${a.score}<span style="font-size:11px;color:#9ca3af;">/${a.max}</span></td>
      </tr>`
  }).join('')

  const techStackHtml = r.techStack.signals.slice(0, 5).map(s => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #f5f5f5;font-size:12px;">
      <span style="color:#374151;font-weight:600;">${s.label}</span>
      <span style="color:#6b7280;">${s.value}
        <span style="display:inline-block;padding:1px 6px;border-radius:100px;font-size:10px;font-weight:700;
          background:${s.confidence === 'confirmed' ? '#dcfce7' : '#fef9c3'};
          color:${s.confidence === 'confirmed' ? '#065f46' : '#854d0e'};">
          ${s.confidence === 'confirmed' ? '확인됨' : '추정됨'}
        </span>
      </span>
    </div>`).join('')

  return `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>홈페이지 운영상태진단 리포트</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Malgun Gothic',sans-serif;">
<div style="max-width:680px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#1e3a5f,#1e40af,#2563eb);padding:36px 40px;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:20px;">
      <div>
        <div style="font-size:22px;font-weight:900;color:#fff;">VISION SOLUTION</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.7);margin-top:4px;">홈페이지 운영상태진단 리포트</div>
        <div style="margin-top:16px;">
          <div style="font-size:13px;color:rgba(255,255,255,0.85);">🌐 ${r.url}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-top:4px;">
            📧 ${email} &nbsp;·&nbsp; 🏢 ${r.siteType.label} &nbsp;·&nbsp; ${r.analyzedAt}
          </div>
        </div>
      </div>
      <div style="text-align:center;background:rgba(255,255,255,0.15);border-radius:16px;padding:20px 28px;">
        <div style="font-size:48px;font-weight:900;color:${gc};line-height:1;">${r.grade}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.7);margin-top:4px;">종합 등급</div>
        <div style="font-size:22px;font-weight:700;color:#fff;margin-top:4px;">${r.totalScore}점</div>
      </div>
    </div>
  </div>

  <!-- Body -->
  <div style="padding:32px 40px;">

    <!-- 사이트 유형 -->
    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
      <div style="font-size:12px;color:#1e40af;font-weight:700;margin-bottom:4px;">🔍 사이트 유형 판단</div>
      <div style="font-size:15px;font-weight:800;color:#1e3a5f;">${r.siteType.label}</div>
      <div style="font-size:12px;color:#3b82f6;margin-top:2px;">판단 신뢰도 ${r.siteType.confidence}% · ${r.siteType.profile} 프로파일 적용</div>
    </div>

    <!-- 긴급 이슈 -->
    ${r.criticalIssues.length > 0 ? `
    <h2 style="font-size:15px;font-weight:700;color:#111;margin:0 0 12px;">🚨 지금 당장 해결이 필요한 문제</h2>
    <div style="margin-bottom:28px;">${criticalHtml}</div>` : ''}

    <!-- 점수 -->
    <h2 style="font-size:15px;font-weight:700;color:#111;margin:0 0 12px;">📊 3축 진단 점수</h2>
    <table width="100%" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;margin-bottom:28px;">
      ${axisRows}
    </table>

    <!-- 기술 스택 -->
    ${r.techStack.signals.length > 0 ? `
    <h2 style="font-size:15px;font-weight:700;color:#111;margin:0 0 12px;">🖥️ 기술 스택 추정 (외부 신호 기반)</h2>
    <div style="border:1px solid #e5e7eb;border-radius:12px;padding:16px 20px;margin-bottom:28px;">
      ${techStackHtml}
      <div style="margin-top:10px;padding:8px 12px;background:#f8fafc;border-radius:8px;font-size:11px;color:#9ca3af;">
        ✅ 확인됨 = 헤더·소스 직접 감지 &nbsp;|&nbsp; ⚠️ 추정됨 = 감지 신호 기반 추론 (DB 직접 접근 없음)
      </div>
    </div>` : ''}

    <!-- 우선순위 -->
    <h2 style="font-size:15px;font-weight:700;color:#111;margin:0 0 12px;">📋 우선순위별 개선 과제</h2>
    <table width="100%" style="border-collapse:collapse;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;margin-bottom:28px;">
      <thead>
        <tr style="background:#f9fafb;">
          <th style="padding:10px 12px;width:40px;"></th>
          <th style="padding:10px 12px;text-align:left;font-size:11px;color:#6b7280;font-weight:600;">개선 과제</th>
          <th style="padding:10px 12px;font-size:11px;color:#6b7280;font-weight:600;white-space:nowrap;">시기</th>
        </tr>
      </thead>
      <tbody>${priorityHtml}</tbody>
    </table>

    <!-- CTA -->
    <div style="text-align:center;padding:28px 24px;background:linear-gradient(135deg,#1e3a5f,#1e40af);border-radius:12px;">
      <div style="font-size:16px;font-weight:800;color:#fff;margin-bottom:8px;">30분 무료 상담으로 개선 순서를 잡아드립니다</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.75);margin-bottom:20px;">견적은 상담 후 제시 · 의무 계약 없음</div>
      <a href="https://www.visionc.co.kr/renewal" style="display:inline-block;background:#fff;color:#1e40af;text-decoration:none;padding:14px 36px;border-radius:100px;font-weight:700;font-size:14px;">상담 신청하기 →</a>
    </div>

    <p style="font-size:11px;color:#9ca3af;text-align:center;margin-top:20px;line-height:1.6;">
      본 리포트는 공개 접근 가능한 정보를 자동 분석한 결과입니다.<br>
      VISION SOLUTION · visionc.co.kr · biztalktome@gmail.com
    </p>
  </div>
</div>
</body></html>`
}

export async function sendRenewalReport(
  result: RenewalAnalysisResult,
  pdfBuffer: Buffer,
  email: string
): Promise<void> {
  const appPass = env.GMAIL_APP_PASSWORD.replace(/\s+/g, '')
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: env.GMAIL_USER, pass: appPass },
  })

  const html = buildRenewalEmailHtml(result, email)

  await transporter.sendMail({
    from: `Vision Solution 진단팀 <${env.GMAIL_USER}>`,
    to: email,
    subject: `[홈페이지 진단] ${result.domain} — 등급 ${result.grade} (${result.totalScore}점) 리포트`,
    html,
    attachments: [{
      filename: `visionc-diagnosis-${result.domain}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf',
    }],
  })
}
