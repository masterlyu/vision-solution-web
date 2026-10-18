// 공개 폼 입력 검사 — 문의·진단 API 공용

const HTML_ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }

/** 텔레그램 HTML·메일 HTML 에 사용자 입력을 넣기 전에 반드시 거친다 */
export function escapeHtml(s: unknown): string {
  return String(s ?? '').replace(/[&<>"']/g, c => HTML_ESCAPES[c])
}

const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/

export function isEmail(s: unknown): s is string {
  return typeof s === 'string' && s.length <= 254 && EMAIL_RE.test(s)
}

/** 문자열이고 앞뒤 공백 뺀 길이가 min~max 이면 다듬은 값, 아니면 null */
export function textField(s: unknown, min: number, max: number): string | null {
  if (s == null || s === '') return min === 0 ? '' : null
  if (typeof s !== 'string') return null
  const t = s.trim()
  return t.length >= min && t.length <= max ? t : null
}

// 진단 메일은 "사이트 도메인 = 메일 도메인"일 때만 보낸다. 무료 메일 도메인은 누구나 주소를 만들 수 있어
// url=naver.com, email=남의주소@naver.com 처럼 남에게 우리 메일을 보내게 만들 수 있다(2026-10-18 점검).
// ponytail: 흔한 무료 메일만 막는 목록 — 다른 무료 메일로 악용되면 여기에 더한다.
const FREE_MAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com', 'naver.com', 'daum.net', 'hanmail.net', 'kakao.com', 'nate.com',
  'korea.com', 'empas.com', 'dreamwiz.com', 'hanmir.com', 'paran.com', 'lycos.co.kr', 'chol.com',
  'hotmail.com', 'outlook.com', 'live.com', 'msn.com', 'yahoo.com', 'yahoo.co.kr', 'icloud.com', 'me.com',
  'aol.com', 'proton.me', 'protonmail.com', 'gmx.com', 'mail.com', 'zoho.com', 'yandex.com', 'qq.com', '163.com',
])

export function isFreeMail(email: string): boolean {
  return FREE_MAIL_DOMAINS.has(email.slice(email.lastIndexOf('@') + 1).toLowerCase())
}
