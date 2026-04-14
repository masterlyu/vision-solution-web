import nodemailer from 'nodemailer'
import { env } from './env'
import { generateQuotePdfBuffer } from './quotePdfGenerator'
import type { QuoteData } from '@/app/api/quote-approve/route'

function buildQuoteEmailHtml(quote: QuoteData): string {
  const breakdownRows = quote.breakdown.map(item => `
    <tr style="border-bottom:1px solid #f0eeff;">
      <td style="padding:10px 14px;font-size:13px;font-weight:700;">${item.name}</td>
      <td style="padding:10px 14px;font-size:12px;color:#6b7280;">${item.description}</td>
      <td style="padding:10px 14px;font-size:14px;font-weight:700;color:#7C3AED;text-align:right;white-space:nowrap;">${item.price}</td>
    </tr>`).join('')

  const serviceList = quote.services.join(' · ')

  return `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>VISIONC 웹 리뉴얼 견적서</title></head>
<body style="margin:0;padding:0;background:#f5f3ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:680px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(124,58,237,0.1);">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#7C3AED,#5b21b6);padding:32px 40px;">
    <div style="font-size:24px;font-weight:900;color:#fff;letter-spacing:-0.5px;">VISIONC</div>
    <div style="font-size:13px;color:rgba(255,255,255,0.7);margin-top:4px;">홈페이지 리뉴얼 견적서</div>
    <div style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.2);">
      <div style="font-size:13px;color:rgba(255,255,255,0.9);margin-bottom:4px;">🌐 ${quote.clientUrl}</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.7);">
        🏢 ${quote.clientName}${quote.contactName ? `  ·  ${quote.contactName} 담당자님` : ''}
      </div>
    </div>
  </div>

  <!-- Body -->
  <div style="padding:32px 40px;">

    <!-- 서비스 범위 -->
    <h2 style="font-size:15px;font-weight:700;color:#111;margin:0 0 12px;">제안 서비스</h2>
    <div style="background:#faf8ff;border:1px solid #ede9fe;border-radius:12px;padding:16px 20px;margin-bottom:28px;">
      <div style="font-size:14px;color:#374151;">${serviceList}</div>
    </div>

    <!-- 견적 상세 -->
    <h2 style="font-size:15px;font-weight:700;color:#111;margin:0 0 12px;">견적 상세</h2>
    <table width="100%" style="border-collapse:collapse;border:1px solid #ede9fe;border-radius:12px;overflow:hidden;margin-bottom:16px;">
      <thead>
        <tr style="background:#faf8ff;">
          <th style="padding:10px 14px;text-align:left;font-size:11px;color:#6b7280;font-weight:600;">항목</th>
          <th style="padding:10px 14px;text-align:left;font-size:11px;color:#6b7280;font-weight:600;">내용</th>
          <th style="padding:10px 14px;text-align:right;font-size:11px;color:#6b7280;font-weight:600;">예상 금액</th>
        </tr>
      </thead>
      <tbody>${breakdownRows}</tbody>
    </table>

    <!-- 합계 -->
    <div style="background:linear-gradient(135deg,#faf8ff,#ede9fe);border:1px solid #ede9fe;border-radius:12px;padding:16px 20px;margin-bottom:28px;text-align:right;">
      <span style="font-size:12px;color:#6b7280;">예상 합계 (VAT 별도)</span>
      <div style="font-size:24px;font-weight:900;color:#7C3AED;margin-top:4px;">${quote.totalPrice}</div>
    </div>

    ${quote.note ? `
    <!-- 메모 -->
    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:16px 20px;margin-bottom:28px;">
      <div style="font-size:12px;font-weight:700;color:#92400e;margin-bottom:6px;">📝 추가 안내</div>
      <div style="font-size:13px;color:#374151;">${quote.note}</div>
    </div>` : ''}

    <!-- 안내 문구 -->
    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px 16px;margin-bottom:28px;font-size:11px;color:#6b7280;">
      ※ 본 견적은 예상 비용이며, 실제 작업 범위 확인 후 최종 확정됩니다.<br>
      ※ 부가세(VAT 10%)는 별도입니다.<br>
      ※ 견적 유효기간: 발송일로부터 14일
    </div>

    <!-- CTA -->
    <div style="text-align:center;padding:24px;background:linear-gradient(135deg,#faf8ff,#ede9fe);border-radius:12px;">
      <p style="font-size:13px;color:#374151;margin:0 0 16px;">
        견적에 대한 문의사항이 있으시면 언제든지 연락 주세요.
      </p>
      <a href="https://visionc.co.kr/contact"
         style="display:inline-block;background:#7C3AED;color:#fff;text-decoration:none;padding:12px 32px;border-radius:8px;font-weight:700;font-size:13px;">
        상담 신청하기 →
      </a>
    </div>
  </div>

  <!-- Footer -->
  <div style="background:#f5f3ff;padding:20px 40px;text-align:center;">
    <div style="font-size:11px;color:#9ca3af;">VISIONC  ·  visionc.co.kr  ·  biztalktome@gmail.com</div>
    <div style="font-size:10px;color:#d1d5db;margin-top:4px;">본 견적서는 자동 생성됩니다. 무단 배포를 금합니다.</div>
  </div>
</div>
</body></html>`
}

export async function sendQuoteEmail(quote: QuoteData): Promise<void> {
  const appPass = env.GMAIL_APP_PASSWORD.replace(/\s+/g, '')
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: env.GMAIL_USER,
      pass: appPass,
    },
  })

  const [html, pdfBuffer] = await Promise.all([
    Promise.resolve(buildQuoteEmailHtml(quote)),
    generateQuotePdfBuffer(quote),
  ])

  const safeClientName = quote.clientName.replace(/[^\w가-힣]/g, '_')
  const contactLine = quote.contactName ? ` ${quote.contactName} 담당자님` : ''

  await transporter.sendMail({
    from: `VISIONC 리뉴얼팀 <${env.GMAIL_USER}>`,
    to: quote.clientEmail,
    subject: `[VISIONC] ${quote.clientName}${contactLine} — 홈페이지 리뉴얼 견적서 (${quote.totalPrice})`,
    html,
    attachments: [
      {
        filename: `visionc-quote-${safeClientName}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  })
}
