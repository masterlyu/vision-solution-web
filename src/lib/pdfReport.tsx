import React from 'react'
import path from 'path'
import { Document, Page, Text, View, StyleSheet, Font, renderToBuffer } from '@react-pdf/renderer'
import type { AnalysisResult } from './siteAnalyzer'

// 로컬 TTF 사용 — woff2 Korean subset은 숫자·영문 렌더링 불가
const fontPath = path.join(process.cwd(), 'public/fonts/NotoSansKR-Regular.ttf')
Font.register({
  family: 'NotoKR',
  fonts: [
    { src: fontPath, fontWeight: 400 },
    { src: fontPath, fontWeight: 700 },
  ],
})

const C = {
  bg: '#ffffff',
  surface: '#f3f4f6',
  border: '#9ca3af',
  text: '#111827',
  muted: '#1f2937',
  dim: '#374151',
  dangerBg: '#f3f4f6',
  successBg: '#f9fafb',
  neutralBg: '#f9fafb',
  warningBg: '#f3f4f6',
}

const s = StyleSheet.create({
  page:         { fontFamily: 'NotoKR', backgroundColor: C.bg, fontSize: 9, color: C.text },
  // ── 다크 헤더 밴드 ──
  headerBand:   { backgroundColor: '#111827', paddingHorizontal: 44, paddingTop: 28, paddingBottom: 22 },
  headerRow:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  brand:        { fontSize: 18, fontWeight: 700, color: '#ffffff' },
  brandSub:     { fontSize: 8, color: 'rgba(255,255,255,0.9)', marginTop: 3 },
  gradeBox:     { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8, padding: '14 20' },
  grade:        { fontSize: 36, fontWeight: 700, color: '#ffffff', lineHeight: 1 },
  gradeLabel:   { fontSize: 7, color: 'rgba(255,255,255,0.9)', marginTop: 3 },
  gradeScore:   { fontSize: 14, fontWeight: 700, color: '#ffffff', marginTop: 3 },
  headerMeta:   { marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.25)' },
  headerMetaTxt:{ fontSize: 8, color: 'rgba(255,255,255,0.9)', marginTop: 2 },
  // ── 본문 ──
  body:         { paddingHorizontal: 44, paddingTop: 20 },
  section:      { marginBottom: 18 },
  sectionTitle: { fontSize: 11, fontWeight: 700, color: '#111827', borderBottom: '1px solid #d1d5db', paddingBottom: 5, marginBottom: 10 },
  row:          { flexDirection: 'row', gap: 8, marginBottom: 8 },
  scoreCard:    { flex: 1, backgroundColor: C.surface, borderRadius: 6, padding: 10, alignItems: 'center', border: '1px solid #d1d5db' },
  scoreNum:     { fontSize: 22, fontWeight: 700, marginTop: 2, color: '#111827' },
  scoreLbl:     { fontSize: 7, color: C.dim, marginTop: 1 },
  tableHeader:  { flexDirection: 'row', backgroundColor: C.surface, borderRadius: 4, padding: '6 8', marginBottom: 4 },
  tableRow:     { flexDirection: 'row', borderBottom: '1px solid #e5e7eb', padding: '5 8' },
  col1:         { flex: 2 },
  col2:         { flex: 1, textAlign: 'center' },
  col3:         { flex: 3 },
  alertBox:     { borderRadius: 4, padding: '6 8', marginBottom: 6, flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  footer:       { borderTop: '1px solid #d1d5db', paddingTop: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' },
  footerTxt:    { fontSize: 7, color: C.dim },
})

function severityColor(sev: string) {
  return { HIGH: '#000000', MEDIUM: '#374151', LOW: '#6b7280' }[sev] ?? C.dim
}

const HEADER_BEGINNER: Record<string, string> = {
  'strict-transport-security':    '자물쇠 강제설정',
  'content-security-policy':      '해킹 스크립트 차단막',
  'x-frame-options':              '클릭재킹 방어',
  'x-content-type-options':       '파일 위장 방어',
  'referrer-policy':              '방문기록 보호',
  'permissions-policy':           '기기 권한 차단',
  'cross-origin-opener-policy':   '탭 간 정보 보호',
  'cross-origin-resource-policy': '리소스 도용 방어',
  'cross-origin-embedder-policy': '외부 콘텐츠 격리',
  'x-xss-protection':             'XSS 자동 필터',
  'cache-control':                '민감 페이지 캐시 방지',
  'expect-ct':                    '인증서 위조 탐지',
  'feature-policy':               '브라우저 기능 제한',
}

const PdfDoc = ({ r, email, company }: { r: AnalysisResult; email: string; company?: string }) => (
  <Document title={`VISIONC 보안 진단 리포트 — ${r.url}`} author="VISIONC">
    <Page size="A4" style={s.page}>

      {/* ── 다크 헤더 밴드 ── */}
      <View style={s.headerBand}>
        <View style={s.headerRow}>
          <View>
            <Text style={s.brand}>VISIONC</Text>
            <Text style={s.brandSub}>웹 보안 진단 리포트</Text>
          </View>
          <View style={s.gradeBox}>
            <Text style={s.grade}>{r.score.grade}</Text>
            <Text style={s.gradeLabel}>종합 등급</Text>
            <Text style={s.gradeScore}>{r.score.total}점</Text>
          </View>
        </View>
        <View style={s.headerMeta}>
          <Text style={s.headerMetaTxt}>{r.url}</Text>
          <Text style={s.headerMetaTxt}>신청자: {email}{company ? `  ·  ${company}` : ''}</Text>
          <Text style={s.headerMetaTxt}>분석일: {r.analyzedAt}</Text>
        </View>
      </View>

      {/* ── 본문 ── */}
      <View style={s.body}>

        {/* 악성코드·블랙리스트 긴급 경고 */}
        {r.malware.available && (r.malware.blacklisted || r.malware.malwareFound) && (
          <View style={[s.section, { backgroundColor: C.dangerBg, border: '1px solid #374151', borderRadius: 6, padding: '10 12' }]}>
            <Text style={{ fontSize: 10, fontWeight: 700, color: '#000000', marginBottom: 6 }}>
              ⚠ 긴급 위험 탐지 — 즉시 조치 필요
            </Text>
            {r.malware.blacklisted && (
              <Text style={{ fontSize: 8, color: C.text, marginBottom: 4 }}>
                블랙리스트 등재: {r.malware.blacklistItems.join(', ')}
              </Text>
            )}
            {r.malware.malwareFound && (
              <Text style={{ fontSize: 8, color: C.text }}>
                악성코드 유형: {r.malware.malwareTypes.join(', ')}
              </Text>
            )}
          </View>
        )}

        {/* 영역별 점수 */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>영역별 점수</Text>
          <View style={s.row}>
            {[
              { label: '보안', score: r.score.security },
              { label: 'SEO', score: r.score.seo },
              { label: `성능${r.performance.available ? '' : '(추정)'}`, score: r.score.performance },
              { label: '종합', score: r.score.total },
            ].map(item => (
              <View key={item.label} style={s.scoreCard}>
                <Text style={s.scoreLbl}>{item.label}</Text>
                <Text style={s.scoreNum}>{item.score}</Text>
                <Text style={s.scoreLbl}>/ 100</Text>
              </View>
            ))}
          </View>
          <View style={[s.row, { marginTop: 4 }]}>
            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface, border: '1px solid #d1d5db', borderRadius: 4, padding: '5 8' }}>
              <Text style={{ fontSize: 8, color: r.ssl.valid ? C.muted : '#000000', fontWeight: 700 }}>
                {r.ssl.valid ? '✓ HTTPS 정상' : '✗ HTTPS 미설정'}
              </Text>
              <Text style={{ fontSize: 8, color: C.dim, marginLeft: 8 }}>{r.ssl.note}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface, border: '1px solid #d1d5db', borderRadius: 4, padding: '5 8', gap: 6 }}>
              <Text style={{ fontSize: 7, color: C.dim }}>SSL Labs 등급</Text>
              <Text style={{ fontSize: 11, fontWeight: 700, color: '#111827' }}>
                {r.ssl.grade ?? (r.ssl.gradeChecked ? '—' : '미확인')}
              </Text>
            </View>
          </View>
        </View>

        {/* 악성코드·블랙리스트 진단 */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>악성코드 및 블랙리스트 진단</Text>
          {!r.malware.available ? (
            <View style={[s.alertBox, { backgroundColor: C.neutralBg, border: '1px solid #d1d5db' }]}>
              <Text style={{ fontSize: 8, color: C.muted }}>Sucuri 악성코드 탐지 서비스 응답 없음 — 수동 확인 권장</Text>
            </View>
          ) : r.malware.clean ? (
            <View style={[s.alertBox, { backgroundColor: C.successBg, border: '1px solid #d1d5db' }]}>
              <Text style={{ fontSize: 8, color: C.muted, fontWeight: 700 }}>✓ 정상</Text>
              <Text style={{ fontSize: 8, color: C.muted, marginLeft: 4 }}>악성코드 미탐지 · 블랙리스트 미등재 (Sucuri SiteCheck)</Text>
            </View>
          ) : (
            <View>
              {r.malware.blacklisted && (
                <View style={[s.alertBox, { backgroundColor: C.dangerBg, border: '1px solid #374151' }]}>
                  <Text style={{ fontSize: 8, color: '#000000', fontWeight: 700 }}>✗ 블랙리스트 등재:</Text>
                  <Text style={{ fontSize: 8, color: C.text, marginLeft: 4 }}>{r.malware.blacklistItems.join(', ')}</Text>
                </View>
              )}
              {r.malware.malwareFound && (
                <View style={[s.alertBox, { backgroundColor: C.dangerBg, border: '1px solid #374151' }]}>
                  <Text style={{ fontSize: 8, color: '#000000', fontWeight: 700 }}>✗ 악성코드 발견:</Text>
                  <Text style={{ fontSize: 8, color: C.text, marginLeft: 4 }}>{r.malware.malwareTypes.join(', ')}</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* CMS·서버 정보 */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>CMS 및 서버 정보 점검</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
            <View style={[s.scoreCard, { flex: 1, alignItems: 'flex-start' }]}>
              <Text style={[s.scoreLbl, { marginBottom: 3 }]}>탐지된 CMS</Text>
              <Text style={{ fontSize: 9, fontWeight: 700, color: C.text }}>
                {r.cms.detected ?? '탐지 안 됨'}
                {r.cms.version ? ` ${r.cms.version}` : ''}
              </Text>
            </View>
            <View style={[s.scoreCard, { flex: 1, alignItems: 'flex-start' }]}>
              <Text style={[s.scoreLbl, { marginBottom: 3 }]}>정보 노출</Text>
              <Text style={{ fontSize: 9, fontWeight: 700, color: r.cms.infoLeaks.length > 0 ? '#000000' : C.muted }}>
                {r.cms.infoLeaks.length > 0 ? `${r.cms.infoLeaks.length}건 노출` : '노출 없음'}
              </Text>
            </View>
          </View>
          {r.cms.infoLeaks.length > 0 && (
            <View>
              {r.cms.infoLeaks.map((leak, i) => (
                <View key={i} style={[s.alertBox, { backgroundColor: C.warningBg, border: '1px solid #9ca3af' }]}>
                  <Text style={{ fontSize: 8, color: C.muted, fontWeight: 700 }}>⚠</Text>
                  <Text style={{ fontSize: 8, color: C.text, marginLeft: 4 }}>{leak}</Text>
                </View>
              ))}
              <View style={{ backgroundColor: C.neutralBg, border: '1px solid #d1d5db', borderRadius: 4, padding: '5 8', marginTop: 4 }}>
                <Text style={{ fontSize: 7, color: C.dim }}>
                  서버·CMS 버전 노출 시 해커가 알려진 취약점(CVE)을 바로 공격할 수 있습니다. Server 헤더 숨김 처리를 권장합니다.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* 쿠키 보안 플래그 */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>쿠키 보안 플래그 점검</Text>
          <Text style={{ fontSize: 7, color: C.dim, marginBottom: 8 }}>
            로그인 쿠키가 안전하게 보호되고 있는지 확인합니다. 플래그가 없으면 해커가 로그인 정보를 훔칠 수 있습니다.
          </Text>
          {r.cookie.total === 0 ? (
            <View style={[s.alertBox, { backgroundColor: C.successBg, border: '1px solid #d1d5db' }]}>
              <Text style={{ fontSize: 8, color: C.muted, fontWeight: 700 }}>✓ 해당 없음</Text>
              <Text style={{ fontSize: 8, color: C.dim, marginLeft: 4 }}>응답에서 쿠키가 발견되지 않았습니다. (로그인 기능 없는 사이트)</Text>
            </View>
          ) : (
            <>
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
                {[
                  { label: '총 쿠키', val: String(r.cookie.total), bold: false },
                  { label: 'HttpOnly 미설정', val: String(r.cookie.missingHttpOnly), bold: r.cookie.missingHttpOnly > 0 },
                  { label: 'Secure 미설정', val: String(r.cookie.missingSecure), bold: r.cookie.missingSecure > 0 },
                  { label: 'SameSite 미설정', val: String(r.cookie.missingSameSite), bold: r.cookie.missingSameSite > 0 },
                ].map(item => (
                  <View key={item.label} style={[s.scoreCard, { flex: 1 }]}>
                    <Text style={s.scoreLbl}>{item.label}</Text>
                    <Text style={{ fontSize: 14, fontWeight: 700, color: item.bold ? '#000000' : C.muted }}>{item.val}</Text>
                  </View>
                ))}
              </View>
              {r.cookie.issues.map((issue, i) => (
                <View key={i} style={[s.alertBox, { backgroundColor: C.warningBg, border: '1px solid #9ca3af' }]}>
                  <Text style={{ fontSize: 8, color: C.muted, fontWeight: 700 }}>⚠</Text>
                  <Text style={{ fontSize: 8, color: C.text, marginLeft: 4 }}>{issue}</Text>
                </View>
              ))}
              {r.cookie.issues.length === 0 && (
                <View style={[s.alertBox, { backgroundColor: C.successBg, border: '1px solid #d1d5db' }]}>
                  <Text style={{ fontSize: 8, color: C.muted, fontWeight: 700 }}>✓ 정상</Text>
                  <Text style={{ fontSize: 8, color: C.dim, marginLeft: 4 }}>모든 쿠키에 보안 플래그가 설정되어 있습니다.</Text>
                </View>
              )}
            </>
          )}
        </View>

        {/* CORS 점검 */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>CORS 설정 점검 (다른 사이트 데이터 도용 방어)</Text>
          <Text style={{ fontSize: 7, color: C.dim, marginBottom: 8 }}>
            다른 웹사이트가 내 사이트 데이터를 몰래 가져가는 것을 막는 설정입니다. 잘못 설정하면 회원 정보가 유출될 수 있습니다.
          </Text>
          {!r.cors.tested ? (
            <View style={[s.alertBox, { backgroundColor: C.neutralBg, border: '1px solid #d1d5db' }]}>
              <Text style={{ fontSize: 8, color: C.dim }}>CORS 점검을 수행할 수 없었습니다.</Text>
            </View>
          ) : r.cors.vulnerable ? (
            <View>
              <View style={[s.alertBox, { backgroundColor: C.dangerBg, border: '1px solid #374151' }]}>
                <Text style={{ fontSize: 8, color: '#000000', fontWeight: 700 }}>✗ 취약 ({r.cors.severity})</Text>
                <Text style={{ fontSize: 8, color: C.text, marginLeft: 4 }}>{r.cors.detail}</Text>
              </View>
              {r.cors.allowCredentials && (
                <View style={{ backgroundColor: C.neutralBg, borderRadius: 4, padding: '4 8', marginTop: 2 }}>
                  <Text style={{ fontSize: 7, color: C.dim }}>
                    Access-Control-Allow-Credentials: true 설정으로 인해 로그인 세션 탈취 가능. 즉각 수정 필요.
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={[s.alertBox, { backgroundColor: C.successBg, border: '1px solid #d1d5db' }]}>
              <Text style={{ fontSize: 8, color: C.muted, fontWeight: 700 }}>✓ 정상</Text>
              <Text style={{ fontSize: 8, color: C.dim, marginLeft: 4 }}>{r.cors.detail}</Text>
            </View>
          )}
        </View>

        {/* 이메일 보안 */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>이메일 보안 (SPF · DMARC)</Text>
          <Text style={{ fontSize: 7, color: C.dim, marginBottom: 8 }}>
            내 도메인 이름으로 가짜 피싱 이메일을 보내는 것을 막는 설정입니다. 설정이 없으면 고객이 사칭 이메일에 속을 수 있습니다.
          </Text>
          <View style={s.tableHeader}>
            <Text style={[{ flex: 2, fontWeight: 700, fontSize: 8, color: C.text }]}>항목</Text>
            <Text style={[{ flex: 1, fontWeight: 700, fontSize: 8, color: C.text }]}>상태</Text>
            <Text style={[{ flex: 4, fontWeight: 700, fontSize: 8, color: C.text }]}>레코드</Text>
          </View>
          {[
            {
              label: 'SPF',
              sub: '내 도메인을 사칭한 가짜 이메일 발송 차단',
              present: r.emailSec.spf.present,
              record: r.emailSec.spf.record,
              missing: '도메인 사칭 이메일 차단 불가 — 피싱 위험',
            },
            {
              label: `DMARC${r.emailSec.dmarc.policy ? ` (정책: ${r.emailSec.dmarc.policy})` : ''}`,
              sub: 'SPF 실패 메일 처리 정책 — 피싱 차단',
              present: r.emailSec.dmarc.present,
              record: r.emailSec.dmarc.record,
              missing: '피싱 메일 차단 정책 없음 — 브랜드 도용 위험',
            },
          ].map((item, i) => (
            <View key={i} style={s.tableRow}>
              <View style={{ flex: 2 }}>
                <Text style={{ fontSize: 8, fontWeight: 700, color: C.text }}>{item.label}</Text>
                <Text style={{ fontSize: 7, color: C.dim, marginTop: 1 }}>{item.sub}</Text>
              </View>
              <Text style={{ flex: 1, fontSize: 8, fontWeight: 700, color: item.present ? C.muted : '#000000' }}>
                {item.present ? '설정됨' : '미설정'}
              </Text>
              <Text style={{ flex: 4, fontSize: 7, color: item.present ? C.dim : '#000000', lineHeight: 1.4, fontWeight: item.present ? 400 : 700 }}>
                {item.present ? (item.record ?? '') : item.missing}
              </Text>
            </View>
          ))}
        </View>

        {/* 민감 파일 점검 */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>민감 파일 30경로 점검</Text>
          <Text style={{ fontSize: 7, color: C.dim, marginBottom: 8 }}>
            비밀번호·DB 정보가 담긴 설정 파일(.env, .git 등)이 외부에 공개되어 있는지 30개 경로를 확인합니다.
          </Text>
          {r.sensitiveFiles.exposed.length === 0 ? (
            <View style={[s.alertBox, { backgroundColor: C.successBg, border: '1px solid #d1d5db' }]}>
              <Text style={{ fontSize: 8, color: C.muted, fontWeight: 700 }}>✓ 정상</Text>
              <Text style={{ fontSize: 8, color: C.dim, marginLeft: 4 }}>
                점검한 {r.sensitiveFiles.checked}개 경로에서 노출된 파일 없음 (.env · .git · DB 백업 등)
              </Text>
            </View>
          ) : (
            <View>
              <View style={[s.alertBox, { backgroundColor: C.dangerBg, border: '1px solid #374151' }]}>
                <Text style={{ fontSize: 8, color: '#000000', fontWeight: 700 }}>✗ {r.sensitiveFiles.exposed.length}개 경로 노출</Text>
                <Text style={{ fontSize: 8, color: C.text, marginLeft: 4 }}>즉각 접근 차단 필요</Text>
              </View>
              {r.sensitiveFiles.exposed.map((p, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                  <Text style={{ fontSize: 8, color: C.text, marginRight: 6 }}>•</Text>
                  <Text style={{ fontSize: 8, color: C.text }}>{p}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 보안 헤더 점검 */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>보안 헤더 점검</Text>
          <Text style={{ fontSize: 7, color: C.dim, marginBottom: 8 }}>
            웹 서버가 브라우저에게 보내는 보안 지침입니다. 없으면 해킹·클릭재킹 등 다양한 공격에 노출됩니다.
          </Text>
          <View style={s.tableHeader}>
            <Text style={[s.col1, { fontWeight: 700, fontSize: 8, color: C.text }]}>헤더</Text>
            <Text style={[s.col2, { fontWeight: 700, fontSize: 8, color: C.text }]}>상태</Text>
            <Text style={[s.col1, { fontWeight: 700, fontSize: 8, color: C.text }]}>위험도</Text>
            <Text style={[s.col3, { fontWeight: 700, fontSize: 8, color: C.text }]}>설명</Text>
          </View>
          {r.headers.map(h => {
            const beginner = HEADER_BEGINNER[h.key]
            return (
              <View key={h.key} style={s.tableRow}>
                <View style={s.col1}>
                  {beginner ? <Text style={{ fontSize: 8, fontWeight: 700, color: C.text }}>{beginner}</Text> : null}
                  <Text style={{ fontSize: 7, color: C.dim }}>{h.label}</Text>
                </View>
                <Text style={[s.col2, { fontSize: 8, color: h.present ? C.muted : '#000000', fontWeight: 700 }]}>
                  {h.present ? '통과' : '미설정'}
                </Text>
                <Text style={[s.col1, { fontSize: 8, color: h.present ? C.dim : severityColor(h.severity), fontWeight: h.present ? 400 : 700 }]}>
                  {h.present ? '-' : h.severity}
                </Text>
                <Text style={[s.col3, { fontSize: 7, color: C.dim, lineHeight: 1.4 }]}>
                  {h.present ? (h.value ?? '') : h.description}
                </Text>
              </View>
            )
          })}
        </View>

        {/* SEO */}
        {r.seo.issues.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>SEO 점검 결과</Text>
            {r.seo.title && (
              <View style={{ backgroundColor: C.surface, borderRadius: 4, padding: '5 8', marginBottom: 6, border: '1px solid #d1d5db' }}>
                <Text style={{ fontSize: 8, color: C.text }}>Title: {r.seo.title}</Text>
              </View>
            )}
            {r.seo.issues.map(issue => (
              <View key={issue} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ color: C.muted, fontSize: 8, marginRight: 6 }}>⚠</Text>
                <Text style={{ fontSize: 8, color: C.text }}>{issue}</Text>
              </View>
            ))}
          </View>
        )}

        {/* 성능 */}
        {r.performance.available && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>성능 측정 (Google PageSpeed Insights)</Text>
            <View style={s.row}>
              {[
                { label: 'LCP',       val: r.performance.lcp,   div: 1000, unit: 's',  good: 2.5 },
                { label: 'FCP',       val: r.performance.fcp,   div: 1000, unit: 's',  good: 1.8 },
                { label: 'CLS',       val: r.performance.cls,   div: 1,    unit: '',   good: 0.1 },
                { label: 'PageSpeed', val: r.performance.score, div: 1,    unit: '점', good: 90 },
              ].filter(m => m.val != null).map(m => {
                const v = (m.val! / m.div)
                const good = v <= m.good
                return (
                  <View key={m.label} style={s.scoreCard}>
                    <Text style={s.scoreLbl}>{m.label}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 700, color: good ? C.muted : '#000000' }}>
                      {v.toFixed(m.div === 1000 ? 1 : m.unit === '점' ? 0 : 3)}{m.unit}
                    </Text>
                    <Text style={[s.scoreLbl, { color: good ? C.dim : '#000000', fontWeight: good ? 400 : 700 }]}>{good ? '양호' : '개선필요'}</Text>
                  </View>
                )
              })}
            </View>
          </View>
        )}

        {/* 견적 */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>수정 견적서 (예상)</Text>
          <View style={s.tableHeader}>
            <Text style={[{ flex: 3, fontWeight: 700, fontSize: 8, color: C.text }]}>서비스</Text>
            <Text style={[{ flex: 2, fontWeight: 700, fontSize: 8, color: C.text }]}>사유</Text>
            <Text style={[{ flex: 2, fontWeight: 700, fontSize: 8, color: C.text, textAlign: 'right' }]}>예상 비용</Text>
          </View>
          {r.estimate.items.map((item, i) => (
            <View key={i} style={[s.tableRow, i === r.estimate.items.length - 1 ? { borderBottom: 'none' } : {}]}>
              <Text style={{ flex: 3, fontSize: 8, fontWeight: 700, color: C.text }}>{item.name}</Text>
              <Text style={{ flex: 2, fontSize: 7, color: C.dim, lineHeight: 1.4 }}>{item.reason}</Text>
              <Text style={{ flex: 2, fontSize: 8, fontWeight: 700, color: '#111827', textAlign: 'right' }}>{item.priceRange}</Text>
            </View>
          ))}
          <View style={{ backgroundColor: C.neutralBg, border: '1px solid #d1d5db', borderRadius: 4, padding: '6 8', marginTop: 6 }}>
            <Text style={{ fontSize: 7, color: C.dim }}>※ 본 견적은 자동 분석 기반 예상 비용입니다. 실제 견적은 상담 후 확정됩니다. 부가세 별도.</Text>
          </View>
        </View>

        {/* ZAP 스캔 */}
        {r.zap && r.zap.alerts.length > 0 && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>OWASP ZAP 취약점 스캔 결과</Text>
            <View style={[s.row, { marginBottom: 10 }]}>
              {[
                { label: 'ZAP 점수',    val: `${r.zap.zapScore}점`, bold: r.zap.zapScore < 60 },
                { label: 'High 위험',   val: String(r.zap.summary.high),   bold: r.zap.summary.high   > 0 },
                { label: 'Medium 위험', val: String(r.zap.summary.medium), bold: r.zap.summary.medium > 0 },
                { label: 'Low 위험',    val: String(r.zap.summary.low),    bold: false },
              ].map(card => (
                <View key={card.label} style={s.scoreCard}>
                  <Text style={s.scoreLbl}>{card.label}</Text>
                  <Text style={{ fontSize: 16, fontWeight: 700, color: card.bold ? '#000000' : C.muted }}>{card.val}</Text>
                </View>
              ))}
            </View>
            <View style={s.tableHeader}>
              <Text style={[{ flex: 2, fontWeight: 700, fontSize: 8, color: C.text }]}>항목</Text>
              <Text style={[{ flex: 1, fontWeight: 700, fontSize: 8, color: C.text }]}>위험도</Text>
              <Text style={[{ flex: 3, fontWeight: 700, fontSize: 8, color: C.text }]}>설명</Text>
            </View>
            {r.zap.alerts.slice(0, 6).map((alert, i) => (
              <View key={i} style={s.tableRow}>
                <Text style={{ flex: 2, fontSize: 8, fontWeight: 700, color: C.text }}>{alert.name}</Text>
                <Text style={{ flex: 1, fontSize: 8, color: severityColor(alert.riskdesc), fontWeight: 700 }}>
                  {alert.riskdesc}
                </Text>
                <Text style={{ flex: 3, fontSize: 7, color: C.dim, lineHeight: 1.4 }}>
                  {alert.description.slice(0, 100)}{alert.description.length > 100 ? '…' : ''}
                </Text>
              </View>
            ))}
            {r.zap.alerts.length > 6 && (
              <Text style={{ fontSize: 7, color: C.dim, marginTop: 4 }}>
                외 {r.zap.alerts.length - 6}개 항목 — 전문가 상담 시 전체 리포트 제공
              </Text>
            )}
          </View>
        )}

        {/* 푸터 */}
        <View style={s.footer}>
          <Text style={s.footerTxt}>VISIONC — visionc.co.kr</Text>
          <Text style={s.footerTxt}>biztalktome@gmail.com</Text>
          <Text style={s.footerTxt}>본 리포트는 자동 생성됩니다. 무단 배포를 금합니다.</Text>
        </View>

      </View>
    </Page>
  </Document>
)

export async function generatePdfBuffer(result: AnalysisResult, email: string, company?: string): Promise<Buffer> {
  const buf = await renderToBuffer(<PdfDoc r={result} email={email} company={company} />)
  return Buffer.from(buf)
}
