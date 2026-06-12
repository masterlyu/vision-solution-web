import nodemailer from 'nodemailer'
import type { AnalysisResult } from './siteAnalyzer'
import { env } from './env'

function gradeColor(_g: string) {
  return '#ffffff'
}

function scoreBar(score: number) {
  const color = score >= 80 ? '#374151' : score >= 60 ? '#4b5563' : '#111827'
  const w = Math.round(score * 1.4)
  return `<div style="background:#e5e7eb;border-radius:4px;height:8px;width:140px;display:inline-block;vertical-align:middle;margin-left:8px;">
    <div style="width:${w}px;height:8px;border-radius:4px;background:${color};"></div></div>`
}

const HEADER_BEGINNER: Record<string, string> = {
  'strict-transport-security':   '자물쇠 강제설정',
  'content-security-policy':     '해킹 스크립트 차단막',
  'x-frame-options':             '클릭재킹 방어',
  'x-content-type-options':      '파일 위장 방어',
  'referrer-policy':             '방문기록 보호',
  'permissions-policy':          '기기 권한 차단',
  'cross-origin-opener-policy':  '탭 간 정보 보호',
  'cross-origin-resource-policy':'리소스 도용 방어',
  'cross-origin-embedder-policy':'외부 콘텐츠 격리',
  'x-xss-protection':            'XSS 자동 필터',
  'cache-control':               '민감 페이지 캐시 방지',
  'expect-ct':                   '인증서 위조 탐지',
  'feature-policy':              '브라우저 기능 제한',
}

export function buildEmailHtml(r: AnalysisResult, email: string, company?: string): string {
  const gc = gradeColor(r.score.grade)
  const sevColor: Record<string, string> = { HIGH: '#111827', MEDIUM: '#374151', LOW: '#6b7280' }

  // ── 악성코드·블랙리스트 섹션 ──
  const malwareHtml = (() => {
    if (!r.malware.available) return `
      <div style="background:#f9fafb;border:1px solid #d1d5db;border-radius:8px;padding:12px 16px;font-size:12px;color:#374151;">
        Sucuri 악성코드 탐지 응답 없음 — 수동 확인을 권장합니다.
      </div>`
    if (r.malware.clean) return `
      <div style="background:#f9fafb;border:1px solid #d1d5db;border-radius:8px;padding:12px 16px;display:flex;align-items:center;gap:10px;">
        <span style="font-size:20px;">✓</span>
        <div>
          <div style="font-size:13px;font-weight:700;color:#111827;">정상 — 악성코드 미탐지</div>
          <div style="font-size:11px;color:#374151;margin-top:2px;">구글·노턴·맥아피 등 블랙리스트 미등재 (Sucuri SiteCheck)</div>
        </div>
      </div>`
    return `
      <div style="background:#f3f4f6;border:1px solid #374151;border-radius:8px;padding:14px 16px;">
        <div style="font-size:13px;font-weight:700;color:#000000;margin-bottom:8px;">⚠ 위험 탐지 — 즉시 조치 필요</div>
        ${r.malware.blacklisted ? `<div style="font-size:12px;color:#111827;margin-bottom:4px;">✗ 블랙리스트 등재: <strong>${r.malware.blacklistItems.join(', ')}</strong></div>` : ''}
        ${r.malware.malwareFound ? `<div style="font-size:12px;color:#111827;">✗ 악성코드 유형: <strong>${r.malware.malwareTypes.join(', ')}</strong></div>` : ''}
      </div>`
  })()

  // ── CMS·서버 정보 섹션 ──
  const cmsHtml = (() => {
    const rows = []
    if (r.cms.detected) {
      rows.push(`<div style="font-size:12px;color:#374151;padding:6px 0;border-bottom:1px solid #e5e7eb;">
        <span style="font-weight:600;color:#111827;">탐지된 CMS:</span>
        <span style="margin-left:8px;">${r.cms.detected}${r.cms.version ? ` <strong>${r.cms.version}</strong>` : ''}</span>
        ${r.cms.versionExposed ? '<span style="display:inline-block;background:#e5e7eb;color:#374151;font-size:10px;font-weight:700;padding:1px 6px;border-radius:10px;margin-left:6px;">버전 노출</span>' : ''}
      </div>`)
    }
    if (r.cms.infoLeaks.length > 0) {
      r.cms.infoLeaks.forEach(leak => {
        rows.push(`<div style="font-size:12px;color:#374151;padding:6px 0;border-bottom:1px solid #e5e7eb;">
          <span style="color:#374151;margin-right:6px;">⚠</span>${leak}
        </div>`)
      })
    }
    if (rows.length === 0) {
      return `<div style="background:#f9fafb;border:1px solid #d1d5db;border-radius:8px;padding:10px 14px;font-size:12px;color:#111827;">✓ 서버·CMS 버전 정보 노출 없음</div>`
    }
    return `<div style="border:1px solid #d1d5db;border-radius:8px;overflow:hidden;">
      ${rows.join('')}
      <div style="background:#f3f4f6;padding:8px 12px;font-size:11px;color:#374151;">
        서버·CMS 버전 노출 시 해커가 알려진 취약점을 바로 공격할 수 있습니다. 버전 정보 숨김 처리를 권장합니다.
      </div>
    </div>`
  })()

  const headerRows = r.headers.map(h => {
    const beginner = HEADER_BEGINNER[h.key]
    return `
    <tr style="border-bottom:1px solid #e5e7eb;">
      <td style="padding:8px 12px;">
        ${beginner ? `<div style="font-size:12px;font-weight:700;color:#111827;">${beginner}</div>` : ''}
        <div style="font-size:10px;color:#9ca3af;margin-top:1px;">${h.label}</div>
      </td>
      <td style="padding:8px 12px;text-align:center;">
        <span style="display:inline-block;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:700;
          background:${h.present ? '#f9fafb' : '#f3f4f6'};color:${h.present ? '#374151' : '#000000'};border:1px solid ${h.present ? '#d1d5db' : '#374151'};">
          ${h.present ? '통과' : '미설정'}
        </span>
      </td>
      <td style="padding:8px 12px;text-align:center;">
        ${h.present ? '<span style="color:#6b7280;font-size:11px;">-</span>' :
          `<span style="display:inline-block;padding:2px 8px;border-radius:20px;font-size:11px;font-weight:700;
            background:#e5e7eb;color:${sevColor[h.severity]};">${h.severity}</span>`}
      </td>
      <td style="padding:8px 12px;font-size:11px;color:#374151;line-height:1.5;">
        ${h.present ? (h.value ? `<code style="font-size:10px;">${h.value.slice(0, 60)}${h.value.length > 60 ? '…' : ''}</code>` : '설정됨') : h.description}
      </td>
    </tr>`
  }).join('')

  // ── 쿠키 보안 플래그 ──
  const cookieHtml = (() => {
    if (r.cookie.total === 0) return `
      <div style="background:#f9fafb;border:1px solid #d1d5db;border-radius:8px;padding:10px 14px;font-size:12px;color:#111827;">
        ✓ 쿠키 없음 — 로그인 세션 없는 사이트
      </div>`
    const ok = r.cookie.missingHttpOnly === 0 && r.cookie.missingSecure === 0
    if (ok) return `
      <div style="background:#f9fafb;border:1px solid #d1d5db;border-radius:8px;padding:10px 14px;font-size:12px;color:#111827;">
        ✓ 모든 쿠키에 보안 플래그가 설정되어 있습니다.
      </div>`
    const cells = [
      { label: '총 쿠키', val: r.cookie.total, bad: false },
      { label: 'HttpOnly 미설정', val: r.cookie.missingHttpOnly, bad: r.cookie.missingHttpOnly > 0 },
      { label: 'Secure 미설정', val: r.cookie.missingSecure, bad: r.cookie.missingSecure > 0 },
      { label: 'SameSite 미설정', val: r.cookie.missingSameSite, bad: r.cookie.missingSameSite > 0 },
    ]
    return `
      <table width="100%" style="border-collapse:collapse;margin-bottom:10px;">
        <tr>${cells.map(c => `
          <td style="text-align:center;padding:10px;background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;">
            <div style="font-size:10px;color:#374151;margin-bottom:4px;">${c.label}</div>
            <div style="font-size:22px;font-weight:700;color:${c.bad ? '#000000' : '#374151'};">${c.val}</div>
          </td>`).join('<td style="width:6px;"></td>')}
        </tr>
      </table>
      ${r.cookie.issues.map(i => `<div style="background:#f3f4f6;border:1px solid #d1d5db;border-radius:6px;padding:8px 12px;font-size:11px;color:#374151;margin-top:4px;">⚠ ${i}</div>`).join('')}`
  })()

  // ── CORS ──
  const corsHtml = (() => {
    if (!r.cors.tested) return `
      <div style="background:#f9fafb;border:1px solid #d1d5db;border-radius:8px;padding:10px 14px;font-size:12px;color:#374151;">
        CORS 점검을 수행할 수 없었습니다.
      </div>`
    if (!r.cors.vulnerable) return `
      <div style="background:#f9fafb;border:1px solid #d1d5db;border-radius:8px;padding:10px 14px;font-size:12px;color:#111827;">
        ✓ 정상 — ${r.cors.detail}
      </div>`
    return `
      <div style="background:#f3f4f6;border:1px solid #374151;border-radius:8px;padding:12px 16px;">
        <div style="font-size:13px;font-weight:700;color:#000000;margin-bottom:6px;">⚠ CORS 취약점 발견 (${r.cors.severity})</div>
        <div style="font-size:12px;color:#111827;margin-bottom:4px;">${r.cors.detail}</div>
        ${r.cors.allowCredentials ? `<div style="font-size:11px;color:#000000;font-weight:700;margin-top:6px;">로그인 쿠키까지 외부에 노출될 수 있습니다 — 즉각 수정 필요</div>` : ''}
      </div>`
  })()

  // ── 이메일 보안 ──
  const emailSecHtml = (() => {
    const rows = [
      {
        name: 'SPF',
        desc: '내 도메인을 사칭한 가짜 이메일 발송 차단',
        present: r.emailSec.spf.present,
        record: r.emailSec.spf.record,
        missing: '도메인 사칭 메일 차단 불가 — 피싱 위험',
      },
      {
        name: 'DMARC',
        desc: `SPF/DKIM 실패 메일 처리 정책${r.emailSec.dmarc.policy ? ` (정책: ${r.emailSec.dmarc.policy})` : ''}`,
        present: r.emailSec.dmarc.present,
        record: r.emailSec.dmarc.record,
        missing: '피싱 메일 차단 정책 없음 — 브랜드 도용 위험',
      },
    ]
    return `
      <table width="100%" style="border-collapse:collapse;border:1px solid #d1d5db;border-radius:8px;overflow:hidden;">
        ${rows.map(row => `
        <tr style="border-bottom:1px solid #e5e7eb;">
          <td style="padding:10px 14px;width:30%;">
            <div style="font-size:13px;font-weight:700;color:#111827;">${row.name}</div>
            <div style="font-size:10px;color:#6b7280;margin-top:2px;">${row.desc}</div>
          </td>
          <td style="padding:10px 14px;text-align:center;width:15%;">
            <span style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;
              background:${row.present ? '#f9fafb' : '#f3f4f6'};color:${row.present ? '#374151' : '#000000'};border:1px solid ${row.present ? '#d1d5db' : '#374151'};">
              ${row.present ? '설정됨' : '미설정'}
            </span>
          </td>
          <td style="padding:10px 14px;font-size:11px;color:#374151;line-height:1.5;">
            ${row.present ? (row.record ?? '설정됨') : `<span style="color:#000000;font-weight:700;">${row.missing}</span>`}
          </td>
        </tr>`).join('')}
      </table>`
  })()

  // ── 민감 파일 ──
  const sensitiveFilesHtml = (() => {
    if (r.sensitiveFiles.exposed.length === 0) return `
      <div style="background:#f9fafb;border:1px solid #d1d5db;border-radius:8px;padding:10px 14px;font-size:12px;color:#111827;">
        ✓ 점검한 ${r.sensitiveFiles.checked}개 경로에서 노출된 파일 없음 (.env · .git · DB 백업 등)
      </div>`
    return `
      <div style="background:#f3f4f6;border:1px solid #374151;border-radius:8px;padding:12px 16px;">
        <div style="font-size:13px;font-weight:700;color:#000000;margin-bottom:8px;">⚠ ${r.sensitiveFiles.exposed.length}개 파일 외부 노출 — 즉각 차단 필요</div>
        ${r.sensitiveFiles.exposed.map(p => `
          <div style="font-size:12px;color:#111827;padding:3px 0;border-bottom:1px solid #d1d5db;">
            ✗ ${p}
          </div>`).join('')}
        <div style="font-size:11px;color:#000000;font-weight:700;margin-top:8px;">비밀번호·DB 접속 정보가 담긴 파일이 누구나 볼 수 있는 상태입니다.</div>
      </div>`
  })()

  const seoRows = r.seo.issues.map(i => `
    <li style="padding:4px 0;font-size:12px;color:#111827;">
      <span style="color:#374151;margin-right:6px;">⚠</span>${i}
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
          <td style="text-align:center;padding:8px;background:#f9fafb;border-radius:8px;margin:4px;border:1px solid #e5e7eb;">
            <div style="font-size:11px;color:#374151;margin-bottom:4px;">${m.label}</div>
            <div style="font-size:20px;font-weight:700;color:${m.good ? '#374151' : '#111827'};">${m.val}${m.unit}</div>
            <div style="font-size:10px;color:${m.good ? '#374151' : '#000000'};font-weight:${m.good ? '400' : '700'};">${m.good ? '양호' : '개선필요'}</div>
          </td>`).join('<td style="width:8px;"></td>')}
      </tr>
    </table>` : `<p style="color:#374151;font-size:12px;">성능 데이터를 가져올 수 없었습니다.</p>`

  const estimateRows = r.estimate.items.map(item => `
    <tr style="border-bottom:1px solid #e5e7eb;">
      <td style="padding:10px 14px;font-size:12px;font-weight:700;">${item.name}</td>
      <td style="padding:10px 14px;font-size:11px;color:#374151;">${item.reason}</td>
      <td style="padding:10px 14px;font-size:13px;font-weight:700;color:#111827;text-align:right;white-space:nowrap;">${item.priceRange}</td>
    </tr>`).join('')

  return `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>VISIONC 웹 보안 진단 리포트</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:680px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#111827,#1f2937);padding:32px 40px;">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <div>
        <div style="font-size:24px;font-weight:900;color:#fff;letter-spacing:-0.5px;">VISIONC</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.9);margin-top:4px;">웹 보안 진단 리포트</div>
      </div>
      <div style="text-align:center;background:rgba(255,255,255,0.2);border-radius:12px;padding:16px 24px;">
        <div style="font-size:42px;font-weight:900;color:${gc};line-height:1;">${r.score.grade}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.9);margin-top:2px;">종합 등급</div>
        <div style="font-size:20px;font-weight:700;color:#fff;margin-top:2px;">${r.score.total}점</div>
      </div>
    </div>
    <div style="margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.3);">
      <div style="font-size:13px;color:rgba(255,255,255,0.95);margin-bottom:4px;">🌐 ${r.url}</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.85);">신청자: ${email}${company ? `  ·  ${company}` : ''}  ·  ${r.analyzedAt}</div>
    </div>
  </div>

  <!-- Body -->
  <div style="padding:32px 40px;">

    <!-- Scores -->
    <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 16px;">영역별 점수</h2>
    <table width="100%" style="border-collapse:collapse;background:#f9fafb;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;margin-bottom:32px;">
      <tr>
        ${[
          { label: '보안', score: r.score.security },
          { label: 'SEO', score: r.score.seo },
          { label: `성능${r.performance.available ? '' : '(추정)'}`, score: r.score.performance },
        ].map(item => `
          <td style="padding:16px;text-align:center;border-right:1px solid #e5e7eb;">
            <div style="font-size:11px;color:#374151;margin-bottom:6px;">${item.label}</div>
            <div style="font-size:28px;font-weight:900;color:#111827;">${item.score}</div>
            ${scoreBar(item.score)}
          </td>`).join('')}
        <td style="padding:16px;text-align:center;background:#f3f4f6;">
          <div style="font-size:11px;color:#374151;margin-bottom:6px;font-weight:700;">SSL/HTTPS</div>
          <div style="font-size:18px;font-weight:700;color:${r.ssl.valid ? '#374151' : '#111827'};">
            ${r.ssl.valid ? '✓ 정상' : '✗ 미설정'}
          </div>
          ${r.ssl.grade ? `<div style="margin-top:6px;"><span style="display:inline-block;padding:2px 10px;border-radius:12px;font-size:13px;font-weight:700;background:#f3f4f6;color:#111827;border:1px solid #d1d5db;">SSL Labs ${r.ssl.grade}</span></div>` : ''}
        </td>
      </tr>
    </table>

    <!-- 악성코드·블랙리스트 -->
    <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 12px;">악성코드 및 블랙리스트 진단</h2>
    <div style="margin-bottom:32px;">${malwareHtml}</div>

    <!-- CMS·서버 정보 -->
    <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 12px;">CMS 및 서버 정보 점검</h2>
    <div style="margin-bottom:32px;">${cmsHtml}</div>

    <!-- 쿠키 보안 플래그 -->
    <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px;">쿠키 보안 플래그 점검</h2>
    <p style="font-size:11px;color:#374151;margin:0 0 12px;">로그인 쿠키가 안전하게 보호되고 있는지 확인합니다. 플래그가 없으면 해커가 로그인 정보를 훔칠 수 있습니다.</p>
    <div style="margin-bottom:32px;">${cookieHtml}</div>

    <!-- CORS -->
    <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px;">CORS 설정 점검</h2>
    <p style="font-size:11px;color:#374151;margin:0 0 12px;">다른 웹사이트가 내 사이트 데이터를 몰래 가져가는 것을 막는 설정입니다. 잘못 설정하면 회원 정보가 유출될 수 있습니다.</p>
    <div style="margin-bottom:32px;">${corsHtml}</div>

    <!-- 이메일 보안 -->
    <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px;">이메일 보안 (SPF · DMARC)</h2>
    <p style="font-size:11px;color:#374151;margin:0 0 12px;">내 도메인 이름으로 가짜 피싱 이메일을 보내는 것을 막는 설정입니다. 설정이 없으면 고객이 사칭 이메일에 속을 수 있습니다.</p>
    <div style="margin-bottom:32px;">${emailSecHtml}</div>

    <!-- 민감 파일 노출 -->
    <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px;">민감 파일 30경로 노출 점검</h2>
    <p style="font-size:11px;color:#374151;margin:0 0 12px;">비밀번호·DB 정보가 담긴 설정 파일(.env, .git 등)이 외부에 공개되어 있는지 30개 경로를 점검합니다.</p>
    <div style="margin-bottom:32px;">${sensitiveFilesHtml}</div>

    <!-- Security Headers -->
    <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 4px;">보안 헤더 점검</h2>
    <p style="font-size:11px;color:#374151;margin:0 0 12px;">웹 서버가 브라우저에게 보내는 보안 지침입니다. 없으면 해킹·클릭재킹 등 다양한 공격에 노출됩니다.</p>
    <table width="100%" style="border-collapse:collapse;border:1px solid #d1d5db;border-radius:12px;overflow:hidden;margin-bottom:32px;">
      <thead>
        <tr style="background:#f3f4f6;">
          <th style="padding:10px 12px;text-align:left;font-size:11px;color:#374151;font-weight:600;">헤더</th>
          <th style="padding:10px 12px;text-align:center;font-size:11px;color:#374151;font-weight:600;">상태</th>
          <th style="padding:10px 12px;text-align:center;font-size:11px;color:#374151;font-weight:600;">위험도</th>
          <th style="padding:10px 12px;text-align:left;font-size:11px;color:#374151;font-weight:600;">내용</th>
        </tr>
      </thead>
      <tbody>${headerRows}</tbody>
    </table>

    <!-- SEO -->
    ${r.seo.issues.length > 0 ? `
    <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 12px;">SEO 점검 결과</h2>
    <div style="background:#f3f4f6;border:1px solid #d1d5db;border-radius:12px;padding:16px 20px;margin-bottom:32px;">
      ${r.seo.title ? `<div style="background:#fff;border-radius:6px;padding:8px 12px;margin-bottom:10px;font-size:12px;border:1px solid #e5e7eb;"><strong>Title:</strong> ${r.seo.title}</div>` : ''}
      <ul style="margin:0;padding-left:16px;">${seoRows}</ul>
    </div>` : ''}

    <!-- Performance -->
    <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 12px;">성능 측정 (Google PageSpeed)</h2>
    <div style="margin-bottom:32px;">${perfHtml}</div>

    <!-- Estimate -->
    <h2 style="font-size:15px;font-weight:700;color:#111827;margin:0 0 12px;">수정 견적서</h2>
    <table width="100%" style="border-collapse:collapse;border:1px solid #d1d5db;border-radius:12px;overflow:hidden;margin-bottom:16px;">
      <thead>
        <tr style="background:#f3f4f6;">
          <th style="padding:10px 14px;text-align:left;font-size:11px;color:#374151;font-weight:600;">서비스</th>
          <th style="padding:10px 14px;text-align:left;font-size:11px;color:#374151;font-weight:600;">사유</th>
          <th style="padding:10px 14px;text-align:right;font-size:11px;color:#374151;font-weight:600;">예상 비용</th>
        </tr>
      </thead>
      <tbody>${estimateRows}</tbody>
    </table>
    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:10px 14px;font-size:11px;color:#374151;">
      ※ 본 견적은 자동 분석 기반 예상 비용입니다. 실제 견적은 상담 후 확정됩니다. 부가세 별도.
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-top:32px;padding:24px;background:#f3f4f6;border-radius:12px;border:1px solid #e5e7eb;">
      <p style="font-size:13px;color:#111827;font-weight:600;margin:0 0 16px;">상담을 원하시면 아래 버튼을 클릭하거나 이메일로 연락주세요.</p>
      <a href="https://visionc.co.kr/contact" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:12px 32px;border-radius:8px;font-weight:700;font-size:13px;">무료 상담 신청 →</a>
    </div>
  </div>

  <!-- Footer -->
  <div style="background:#f3f4f6;padding:20px 40px;text-align:center;">
    <div style="font-size:11px;color:#374151;">VISIONC  ·  visionc.co.kr  ·  biztalktome@gmail.com</div>
    <div style="font-size:10px;color:#6b7280;margin-top:4px;">본 리포트는 자동 생성됩니다. 무단 배포를 금합니다.</div>
  </div>
</div>
</body></html>`
}

export async function sendAdminNotification(subject: string, html: string): Promise<void> {
  const gmailUser = env.GMAIL_USER
  const appPass = env.GMAIL_APP_PASSWORD.replace(/\s+/g, '')
  if (!gmailUser || !appPass) return

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: gmailUser, pass: appPass },
  })

  await transporter.sendMail({
    from: `VISIONC 알림 <${gmailUser}>`,
    to: gmailUser,
    subject,
    html,
  })
}

export async function sendReportEmail(
  result: AnalysisResult,
  pdfBuffer: Buffer,
  email: string,
  company?: string
) {
  // Strip spaces from app password (Google shows them as 4-char groups)
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

  const domain = new URL(result.url).hostname
  const html = buildEmailHtml(result, email, company)

  await transporter.sendMail({
    from: `VISIONC 진단팀 <${env.GMAIL_USER}>`,
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


function buildVerificationEmailHtml(domain: string, targetUrl: string, verifyUrl: string): string {
  return `<!DOCTYPE html>
<html lang="ko"><head><meta charset="UTF-8">
<title>VISIONC 보안 진단 인증</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);">
  <div style="background:linear-gradient(135deg,#111827,#1f2937);padding:32px 40px;">
    <div style="font-size:24px;font-weight:900;color:#fff;">VISIONC</div>
    <div style="font-size:14px;color:rgba(255,255,255,0.9);margin-top:4px;">보안 진단 도메인 소유자 인증</div>
  </div>
  <div style="padding:32px 40px;">
    <h2 style="font-size:18px;font-weight:700;color:#111827;margin:0 0 12px;">보안 진단 요청이 접수되었습니다</h2>
    <p style="font-size:13px;color:#374151;margin:0 0 24px;line-height:1.6;">
      아래 사이트에 대한 무료 보안 진단 요청이 있었습니다.<br>
      <strong style="color:#111827;">본인이 요청하셨다면</strong> 아래 버튼을 클릭하여 도메인 소유자임을 인증하세요.<br>
      <strong style="color:#6b7280;">본인이 아니라면</strong> 이 이메일을 무시하시면 됩니다.
    </p>
    <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px;margin-bottom:28px;">
      <div style="font-size:11px;color:#6b7280;margin-bottom:4px;">진단 대상 사이트</div>
      <div style="font-size:15px;font-weight:700;color:#111827;">${domain}</div>
      <div style="font-size:11px;color:#6b7280;margin-top:2px;">${targetUrl}</div>
    </div>
    <div style="text-align:center;margin-bottom:28px;">
      <a href="${verifyUrl}"
        style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:14px 44px;border-radius:10px;font-weight:700;font-size:15px;letter-spacing:-0.2px;">
        인증하고 보안 진단 시작 →
      </a>
    </div>
    <div style="background:#f3f4f6;border:1px solid #d1d5db;border-radius:8px;padding:12px 16px;font-size:11px;color:#374151;">
      ⏰ 이 링크는 <strong>24시간</strong> 동안 유효합니다. 기간이 지나면 다시 신청해 주세요.<br>
      진단이 완료되면 결과 리포트를 이 이메일로 발송해 드립니다.
    </div>
  </div>
  <div style="background:#f3f4f6;padding:20px 40px;text-align:center;">
    <div style="font-size:11px;color:#374151;">VISIONC · visionc.co.kr · biztalktome@gmail.com</div>
    <div style="font-size:10px;color:#6b7280;margin-top:4px;">본인이 신청하지 않으셨다면 이 이메일을 무시하세요.</div>
  </div>
</div>
</body></html>`
}

export async function sendVerificationEmail(
  email: string,
  targetUrl: string,
  token: string,
  baseUrl: string,
): Promise<void> {
  const appPass = env.GMAIL_APP_PASSWORD.replace(/\s+/g, '')
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: env.GMAIL_USER, pass: appPass },
  })

  const domain = (() => { try { return new URL(targetUrl).hostname } catch { return targetUrl } })()
  const verifyUrl = `${baseUrl}/security/verify?token=${token}`

  await transporter.sendMail({
    from: `VISIONC 진단팀 <${env.GMAIL_USER}>`,
    to: email,
    subject: `[VISIONC] ${domain} 보안 진단 — 도메인 소유자 인증 필요`,
    html: buildVerificationEmailHtml(domain, targetUrl, verifyUrl),
  })
}
