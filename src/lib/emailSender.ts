import nodemailer from 'nodemailer'
import type { AnalysisResult } from './siteAnalyzer'

function gradeColor(g: string) {
  return { A: '#22C55E', B: '#84cc16', C: '#F59E0B', D: '#f97316', F: '#EF4444' }[g] ?? '#6B7280'
}

function scoreBar(score: number) {
  const color = score >= 80 ? '#22C55E' : score >= 60 ? '#F59E0B' : '#EF4444'
  const w = Math.round(score * 1.4)
  return `<div style="background:#f3f4f6;border-radius:4px;height:8px;width:140px;display:inline-block;vertical-align:middle;margin-left:8px;">
    <div style="width:${w}px;height:8px;border-radius:4px;background:${color};"></div></div>`
}

export function buildEmailHtml(r: AnalysisResult, email: string, company?: string): string {
  const gc = gradeColor(r.score.grade)
  const sevColor: Record<string, string> = { HIGH: '#EF4444', MEDIUM: '#F59E0B', LOW: '#3B82F6' }

  const headerRows = r.headers.map(h => `
    <tr style="border-bottom:1px solid #f0eeff;">
      <td style="padding:8px 12px;font-size:12px;font-weight:600;">${h.label}</td>
      <td style="padding:8px 12px;text-align:center;">
        <span style="display:inline-block;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:700;
          background:${h.present ? '#f0fdf4' : '#fef2f2'};color:${h.present ? '#16a34a' : '#dc2626'};">
          ${h.present ? '통과' : '미설정'}
        </span>
      </td>
      <td style="padding:8px 12px;text-align:center;">
        ${h.present ? '<span style="color:#9ca3af;font-size:11px;">-</span>' :
          `<span style="display:inline-block;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700;
            background:${sevColor[h.severity]}20;color:${sevColor[h.severity]};">${h.severity}</span>`}
      </td>
      <td style="padding:8px 12px;font-size:11px;color:#6b7280;line-height:1.5;">
        ${h.present ? (h.value ? `<code style="font-size:10px;">${h.value.slice(0, 60)}${h.value.length > 60 ? '…' : ''}</code>` : '설정됨') : h.description}
      </td>
    </tr>`).join('')

  const seoRows = r.seo.issues.map(i => `
    <li style="padding:4px 0;font-size:12px;color:#374151;">
      <span style="color:#f59e0b;margin-right:6px;">⚠</span>${i}
    </li>`).join('')

  const perfHtml = r.performance.available ? `
    <table width="100%" style="border-collapse:collapse;margin-top:8px;">
      <tr>
        ${[
          { label: 'PageSpeed', val: r.performance.score, unit: '점', good: r.performance.score >= 90 },
          { label: 'LCP', val: r.performance.lcp ? +(r.performance.lcp / 1000).toFixed(1) : null, unit: 's', good: (r.performance.lcp ?? 9999) <= 2500 },
          { label: 'FCP', val: r.performance.fcp ? +(r.performance.fcp / 1000).toFixed(1) : null, unit: 's', good: (r.performance.fcp ?? 9999) <= 1800 },
          { label: 'CLS', val: r.performance.cls ? +r.performance.cls.toFixed(3) : null, unit: '', good: (r.performance.cls ?? 9) <= 0.1 },
        ].filter(m => m.val != null).map(m => `
          <td style="text-align:center;padding:8px;background:#faf8ff;border-radius:8px;margin:4px;">
            <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">${m.label}</div>
            <div style="font-size:20px;font-weight:700;color:${m.good ? '#22c55e' : '#f59e0b'};">${m.val}${m.unit}</div>
            <div style="font-size:10px;color:${m.good ? '#22c55e' : '#f59e0b'};">${m.good ? '양호' : '개선필요'}</div>
          </td>`).join('<td style="width:8px;"></td>')}
      </tr>
    </table>` : `<p style="color:#6b7280;font-size:12px;">성능 데이터를 가져올 수 없었습니다.</p>`

  const estimateRows = r.estimate.items.map(item => `
    <tr style="border-bottom:1px solid #f0eeff;">
      <td style="padding:10px 14px;font-size:12px;font-weight:700;">${item.name}</td>
      <td style="padding:10px 14px;font-size:11px;color:#6b7280;">${item.reason}</td>
      <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#7C3AED;text-align:right;white-space:nowrap;">${item.priceRange}</td>
    </tr>`).join('')

  return `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>VISIONC 웹 보안 진단 리포트</title></head>
<body style="margin:0;padding:0;background:#f5f3ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:680px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(124,58,237,0.1);">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#7C3AED,#5b21b6);padding:32px 40px;">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <div>
        <div style="font-size:24px;font-weight:900;color:#fff;letter-spacing:-0.5px;">VISIONC</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.7);margin-top:4px;">웹 보안 진단 리포트</div>
      </div>
      <div style="text-align:center;background:rgba(255,255,255,0.15);border-radius:12px;padding:16px 24px;">
        <div style="font-size:42px;font-weight:900;color:${gc};line-height:1;">${r.score.grade}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.7);margin-top:2px;">종합 등급</div>
        <div style="font-size:20px;font-weight:700;color:#fff;margin-top:2px;">${r.score.total}점</div>
      </div>
    </div>
    <div style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.2);">
      <div style="font-size:13px;color:rgba(255,255,255,0.9);margin-bottom:4px;">🌐 ${r.url}</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.6);">신청자: ${email}${company ? `  ·  ${company}` : ''}  ·  ${r.analyzedAt}</div>
    </div>
  </div>

  <!-- Body -->
  <div style="padding:32px 40px;">

    <!-- Scores -->
    <h2 style="font-size:15px;font-weight:700;color:#111;margin:0 0 16px;">영역별 점수</h2>
    <table width="100%" style="border-collapse:collapse;background:#faf8ff;border-radius:12px;overflow:hidden;border:1px solid #ede9fe;margin-bottom:32px;">
      <tr>
        ${[
          { label: '보안', score: r.score.security },
          { label: 'SEO', score: r.score.seo },
          { label: `성능${r.performance.available ? '' : '(추정)'}`, score: r.score.performance },
        ].map(item => `
          <td style="padding:16px;text-align:center;border-right:1px solid #ede9fe;">
            <div style="font-size:11px;color:#6b7280;margin-bottom:6px;">${item.label}</div>
            <div style="font-size:28px;font-weight:900;color:${item.score >= 80 ? '#22c55e' : item.score >= 60 ? '#f59e0b' : '#ef4444'};">${item.score}</div>
            ${scoreBar(item.score)}
          </td>`).join('')}
        <td style="padding:16px;text-align:center;background:#7C3AED10;">
          <div style="font-size:11px;color:#7C3AED;margin-bottom:6px;font-weight:700;">SSL/HTTPS</div>
          <div style="font-size:18px;font-weight:700;color:${r.ssl.valid ? '#22c55e' : '#ef4444'};">
            ${r.ssl.valid ? '✅ 정상' : '❌ 미설정'}
          </div>
        </td>
      </tr>
    </table>

    <!-- Security Headers -->
    <h2 style="font-size:15px;font-weight:700;color:#111;margin:0 0 12px;">보안 헤더 점검</h2>
    <table width="100%" style="border-collapse:collapse;border:1px solid #ede9fe;border-radius:12px;overflow:hidden;margin-bottom:32px;">
      <thead>
        <tr style="background:#faf8ff;">
          <th style="padding:10px 12px;text-align:left;font-size:11px;color:#6b7280;font-weight:600;">헤더</th>
          <th style="padding:10px 12px;text-align:center;font-size:11px;color:#6b7280;font-weight:600;">상태</th>
          <th style="padding:10px 12px;text-align:center;font-size:11px;color:#6b7280;font-weight:600;">위험도</th>
          <th style="padding:10px 12px;text-align:left;font-size:11px;color:#6b7280;font-weight:600;">내용</th>
        </tr>
      </thead>
      <tbody>${headerRows}</tbody>
    </table>

    <!-- SEO -->
    ${r.seo.issues.length > 0 ? `
    <h2 style="font-size:15px;font-weight:700;color:#111;margin:0 0 12px;">SEO 점검 결과</h2>
    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:16px 20px;margin-bottom:32px;">
      ${r.seo.title ? `<div style="background:#fff;border-radius:6px;padding:8px 12px;margin-bottom:10px;font-size:12px;"><strong>Title:</strong> ${r.seo.title}</div>` : ''}
      <ul style="margin:0;padding-left:16px;">${seoRows}</ul>
    </div>` : ''}

    <!-- Performance -->
    <h2 style="font-size:15px;font-weight:700;color:#111;margin:0 0 12px;">성능 측정 (Google PageSpeed)</h2>
    <div style="margin-bottom:32px;">${perfHtml}</div>

    <!-- Estimate -->
    <h2 style="font-size:15px;font-weight:700;color:#111;margin:0 0 12px;">수정 견적서</h2>
    <table width="100%" style="border-collapse:collapse;border:1px solid #ede9fe;border-radius:12px;overflow:hidden;margin-bottom:16px;">
      <thead>
        <tr style="background:#faf8ff;">
          <th style="padding:10px 14px;text-align:left;font-size:11px;color:#6b7280;font-weight:600;">서비스</th>
          <th style="padding:10px 14px;text-align:left;font-size:11px;color:#6b7280;font-weight:600;">사유</th>
          <th style="padding:10px 14px;text-align:right;font-size:11px;color:#6b7280;font-weight:600;">예상 비용</th>
        </tr>
      </thead>
      <tbody>${estimateRows}</tbody>
    </table>
    <div style="background:#faf8ff;border:1px solid #ede9fe;border-radius:8px;padding:10px 14px;font-size:11px;color:#6b7280;">
      ※ 본 견적은 자동 분석 기반 예상 비용입니다. 실제 견적은 상담 후 확정됩니다. 부가세 별도.
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-top:32px;padding:24px;background:linear-gradient(135deg,#faf8ff,#ede9fe);border-radius:12px;">
      <p style="font-size:13px;color:#374151;margin:0 0 16px;">상담을 원하시면 아래 버튼을 클릭하거나 이메일로 연락주세요.</p>
      <a href="https://visionc.co.kr/contact" style="display:inline-block;background:#7C3AED;color:#fff;text-decoration:none;padding:12px 32px;border-radius:8px;font-weight:700;font-size:13px;">무료 상담 신청 →</a>
    </div>
  </div>

  <!-- Footer -->
  <div style="background:#f5f3ff;padding:20px 40px;text-align:center;">
    <div style="font-size:11px;color:#9ca3af;">VISIONC  ·  visionc.co.kr  ·  biztalktome@gmail.com</div>
    <div style="font-size:10px;color:#d1d5db;margin-top:4px;">본 리포트는 자동 생성됩니다. 무단 배포를 금합니다.</div>
  </div>
</div>
</body></html>`
}

export async function sendReportEmail(
  result: AnalysisResult,
  pdfBuffer: Buffer,
  email: string,
  company?: string
) {
  // Strip spaces from app password (Google shows them as 4-char groups)
  const appPass = (process.env.GMAIL_APP_PASSWORD ?? '').replace(/\s+/g, '')
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: appPass,
    },
  })

  const domain = new URL(result.url).hostname
  const html = buildEmailHtml(result, email, company)

  await transporter.sendMail({
    from: `VISIONC 진단팀 <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `[VISIONC] ${domain} 보안 진단 리포트 (등급 ${result.score.grade} / ${result.score.total}점)`,
    html,
    attachments: [
      {
        filename: `visionc-report-${domain}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  })
}
