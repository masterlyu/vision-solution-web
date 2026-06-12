import nodemailer from 'nodemailer'
import { env } from './env'
import type { RenewalAnalysisResult } from './renewalAnalyzer'

function gradeColor(_g: string) {
  return '#ffffff'
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
    <div style="background:#f3f4f6;border-left:4px solid #111827;border-radius:0 8px 8px 0;padding:12px 16px;margin-bottom:8px;">
      <span style="font-size:13px;font-weight:700;color:#000000;">✗</span>
      <span style="font-size:13px;color:#111827;margin-left:8px;">${issue}</span>
    </div>`).join('')

  const priorityHtml = r.priorityActions.slice(0, 5).map((a, i) => `
    <tr style="border-bottom:1px solid #e5e7eb;">
      <td style="padding:10px 12px;width:28px;">
        <div style="width:26px;height:26px;border-radius:50%;background:${i < 2 ? '#d1d5db' : i < 4 ? '#e5e7eb' : '#f3f4f6'};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${i < 2 ? '#000000' : i < 4 ? '#374151' : '#6b7280'};text-align:center;line-height:26px;">${a.rank}</div>
      </td>
      <td style="padding:10px 12px;">
        <div style="font-size:13px;font-weight:700;color:#111827;">${a.title}</div>
        <div style="font-size:11px;color:#374151;margin-top:2px;">${a.description}</div>
      </td>
      <td style="padding:10px 12px;text-align:center;white-space:nowrap;">
        <span style="display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:700;
          background:#f3f4f6;
          color:${a.timing === 'now' ? '#000000' : a.timing === '1m' ? '#374151' : '#6b7280'};
          border:1px solid #d1d5db;">
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
    const color = pct >= 70 ? '#374151' : pct >= 50 ? '#4b5563' : '#111827'
    return `
      <tr style="border-bottom:1px solid #e5e7eb;">
        <td style="padding:10px 14px;font-size:13px;font-weight:600;color:#111827;">${a.name}</td>
        <td style="padding:10px 14px;">
          <div style="background:#e5e7eb;border-radius:4px;height:8px;width:140px;display:inline-block;vertical-align:middle;">
            <div style="width:${Math.round(pct * 1.4)}px;height:8px;border-radius:4px;background:${color};"></div>
          </div>
        </td>
        <td style="padding:10px 14px;text-align:center;font-size:15px;font-weight:800;color:${color};">${a.score}<span style="font-size:11px;color:#6b7280;">/${a.max}</span></td>
      </tr>`
  }).join('')

  const techStackHtml = r.techStack.signals.slice(0, 5).map(s => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #e5e7eb;font-size:12px;">
      <span style="color:#111827;font-weight:600;">${s.label}</span>
      <span style="color:#374151;">${s.value}
        <span style="display:inline-block;padding:1px 6px;border-radius:100px;font-size:10px;font-weight:700;
          background:#f3f4f6;color:#374151;border:1px solid #d1d5db;">
          ${s.confidence === 'confirmed' ? '확인됨' : '추정됨'}
        </span>
      </span>
    </div>`).join('')

  return `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>홈페이지 운영상태진단 리포트</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Malgun Gothic',sans-serif;">
<div style="max-width:680px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#111827,#1f2937);padding:36px 40px;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:20px;">
      <div>
        <div style="font-size:22px;font-weight:900;color:#fff;">VISION SOLUTION</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.9);margin-top:4px;">홈페이지 운영상태진단 리포트</div>
        <div style="margin-top:16px;">
          <div style="font-size:13px;color:rgba(255,255,255,0.95);">${r.url}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.85);margin-top:4px;">
            ${email} &nbsp;·&nbsp; ${r.siteType.label} &nbsp;·&nbsp; ${r.analyzedAt}
          </div>
        </div>
      </div>
      <div style="text-align:center;background:rgba(255,255,255,0.2);border-radius:16px;padding:20px 28px;">
        <div style="font-size:48px;font-weight:900;color:${gc};line-height:1;">${r.grade}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.9);margin-top:4px;">종합 등급</div>
        <div style="font-size:22px;font-weight:700;color:#fff;margin-top:4px;">${r.totalScore}점</div>
      </div>
    </div>
  </div>

  <!-- Body -->
  <div style="padding:32px 40px;">

    <!-- 사이트 유형 -->
    <div style="background:#f3f4f6;border:1px solid #d1d5db;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
      <div style="font-size:12px;color:#374151;font-weight:700;margin-bottom:4px;">사이트 유형 판단</div>
      <div style="font-size:15px;font-weight:800;color:#111827;">${r.siteType.label}</div>
      <div style="font-size:12px;color:#6b7280;margin-top:2px;">판단 신뢰도 ${r.siteType.confidence}% · ${r.siteType.profile} 프로파일 적용</div>
    </div>

    <!-- 긴급 이슈 -->
    ${r.criticalIssues.length > 0 ? `
    <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 12px;">⚠ 지금 당장 해결이 필요한 문제</h2>
    <div style="margin-bottom:28px;">${criticalHtml}</div>` : ''}

    <!-- 점수 -->
    <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 12px;">3축 진단 점수</h2>
    <table width="100%" style="border-collapse:collapse;border:1px solid #d1d5db;border-radius:12px;overflow:hidden;margin-bottom:28px;">
      ${axisRows}
    </table>

    <!-- 기술 스택 -->
    ${r.techStack.signals.length > 0 ? `
    <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 12px;">기술 스택 추정 (외부 신호 기반)</h2>
    <div style="border:1px solid #d1d5db;border-radius:12px;padding:16px 20px;margin-bottom:28px;">
      ${techStackHtml}
      <div style="margin-top:10px;padding:8px 12px;background:#f9fafb;border-radius:8px;font-size:11px;color:#374151;">
        확인됨 = 헤더·소스 직접 감지 &nbsp;|&nbsp; 추정됨 = 감지 신호 기반 추론 (DB 직접 접근 없음)
      </div>
    </div>` : ''}

    <!-- 우선순위 -->
    <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 12px;">우선순위별 개선 과제</h2>
    <table width="100%" style="border-collapse:collapse;border:1px solid #d1d5db;border-radius:12px;overflow:hidden;margin-bottom:28px;">
      <thead>
        <tr style="background:#f3f4f6;">
          <th style="padding:10px 12px;width:40px;"></th>
          <th style="padding:10px 12px;text-align:left;font-size:11px;color:#374151;font-weight:600;">개선 과제</th>
          <th style="padding:10px 12px;font-size:11px;color:#374151;font-weight:600;white-space:nowrap;">시기</th>
        </tr>
      </thead>
      <tbody>${priorityHtml}</tbody>
    </table>

    <!-- CTA -->
    <div style="text-align:center;padding:28px 24px;background:linear-gradient(135deg,#111827,#1f2937);border-radius:12px;">
      <div style="font-size:16px;font-weight:800;color:#fff;margin-bottom:8px;">30분 무료 상담으로 개선 순서를 잡아드립니다</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.9);margin-bottom:20px;">견적은 상담 후 제시 · 의무 계약 없음</div>
      <a href="https://www.visionc.co.kr/renewal" style="display:inline-block;background:#fff;color:#111827;text-decoration:none;padding:14px 36px;border-radius:100px;font-weight:700;font-size:14px;">상담 신청하기 →</a>
    </div>

    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:14px 18px;margin-top:8px;">
      <p style="font-size:11px;color:#374151;margin:0;line-height:1.7;">
        ⚠ <strong>AI 자동 분석 안내</strong><br>
        본 리포트는 AI가 공개 접근 가능한 외부 정보를 자동으로 분석한 결과입니다. 서버 내부에 직접 접근하지 않으므로 일부 항목은 실제 구현 상태와 다를 수 있습니다. 정확한 진단은 전문가 검토를 통해 확인하시기 바랍니다.
      </p>
    </div>
    <p style="font-size:11px;color:#374151;text-align:center;margin-top:16px;line-height:1.6;">
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
