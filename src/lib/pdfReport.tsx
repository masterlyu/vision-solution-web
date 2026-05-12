import React from 'react'
import path from 'path'
import { Document, Page, Text, View, StyleSheet, Font, renderToBuffer } from '@react-pdf/renderer'
import type { AnalysisResult, CookieResult, CorsResult, EmailSecResult, SensitiveFilesResult } from './siteAnalyzer'

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
  primary: '#7C3AED',
  bg: '#ffffff',
  surface: '#f8f7ff',
  border: '#e5e3f0',
  text: '#111827',
  muted: '#6B7280',
  red: '#EF4444',
  amber: '#F59E0B',
  green: '#22C55E',
  blue: '#3B82F6',
  orange: '#f97316',
}

const s = StyleSheet.create({
  page:         { fontFamily: 'NotoKR', backgroundColor: C.bg, paddingHorizontal: 44, paddingVertical: 40, fontSize: 9, color: C.text },
  header:       { borderBottom: `2px solid ${C.primary}`, paddingBottom: 14, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  brand:        { fontSize: 18, fontWeight: 700, color: C.primary },
  brandSub:     { fontSize: 8, color: C.muted, marginTop: 2 },
  gradeBox:     { alignItems: 'center' },
  grade:        { fontSize: 36, fontWeight: 700 },
  gradeLabel:   { fontSize: 7, color: C.muted },
  section:      { marginBottom: 18 },
  sectionTitle: { fontSize: 11, fontWeight: 700, color: C.primary, borderBottom: `1px solid ${C.border}`, paddingBottom: 5, marginBottom: 10 },
  row:          { flexDirection: 'row', gap: 8, marginBottom: 8 },
  scoreCard:    { flex: 1, backgroundColor: C.surface, borderRadius: 6, padding: 10, alignItems: 'center', border: `1px solid ${C.border}` },
  scoreNum:     { fontSize: 22, fontWeight: 700, marginTop: 2 },
  scoreLbl:     { fontSize: 7, color: C.muted, marginTop: 1 },
  tableHeader:  { flexDirection: 'row', backgroundColor: C.surface, borderRadius: 4, padding: '6 8', marginBottom: 4 },
  tableRow:     { flexDirection: 'row', borderBottom: `1px solid ${C.border}`, padding: '5 8' },
  col1:         { flex: 2 },
  col2:         { flex: 1, textAlign: 'center' },
  col3:         { flex: 3 },
  alertBox:     { borderRadius: 4, padding: '6 8', marginBottom: 6, flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  footer:       { borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' },
  footerTxt:    { fontSize: 7, color: C.muted },
})

function gradeColor(g: string) {
  return { A: C.green, B: '#84cc16', C: C.amber, D: C.orange, F: C.red }[g] ?? C.text
}
function severityColor(sev: string) {
  return { HIGH: C.red, MEDIUM: C.amber, LOW: C.blue }[sev] ?? C.muted
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

      {/* ── 헤더 ── */}
      <View style={s.header}>
        <View>
          <Text style={s.brand}>VISIONC</Text>
          <Text style={s.brandSub}>웹 보안 진단 리포트</Text>
          <Text style={{ fontSize: 8, color: C.muted, marginTop: 6 }}>{r.url}</Text>
          <Text style={{ fontSize: 8, color: C.muted, marginTop: 2 }}>
            신청자: {email}{company ? `  ·  ${company}` : ''}
          </Text>
          <Text style={{ fontSize: 8, color: C.muted, marginTop: 2 }}>분석일: {r.analyzedAt}</Text>
        </View>
        <View style={s.gradeBox}>
          <Text style={[s.grade, { color: gradeColor(r.score.grade) }]}>{r.score.grade}</Text>
          <Text style={s.gradeLabel}>종합 등급</Text>
          <Text style={{ fontSize: 14, fontWeight: 700, color: gradeColor(r.score.grade), marginTop: 2 }}>
            {r.score.total}점
          </Text>
        </View>
      </View>

      {/* ── 악성코드·블랙리스트 경고 (발견 시만) ── */}
      {r.malware.available && (r.malware.blacklisted || r.malware.malwareFound) && (
        <View style={[s.section, { backgroundColor: '#fef2f2', border: `1px solid ${C.red}30`, borderRadius: 6, padding: '10 12' }]}>
          <Text style={{ fontSize: 10, fontWeight: 700, color: C.red, marginBottom: 6 }}>
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

      {/* ── 영역별 점수 ── */}
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
              <Text style={[s.scoreNum, { color: item.score >= 80 ? C.green : item.score >= 60 ? C.amber : C.red }]}>
                {item.score}
              </Text>
              <Text style={s.scoreLbl}>/ 100</Text>
            </View>
          ))}
        </View>
        <View style={[s.row, { marginTop: 4 }]}>
          <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', backgroundColor: r.ssl.valid ? '#f0fdf4' : '#fef2f2', border: `1px solid ${r.ssl.valid ? C.green : C.red}`, borderRadius: 4, padding: '5 8' }}>
            <Text style={{ fontSize: 8, color: r.ssl.valid ? C.green : C.red, fontWeight: 700 }}>
              {r.ssl.valid ? '✓ HTTPS 정상' : '✗ HTTPS 미설정'}
            </Text>
            <Text style={{ fontSize: 8, color: C.muted, marginLeft: 8 }}>{r.ssl.note}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: '5 8', gap: 6 }}>
            <Text style={{ fontSize: 7, color: C.muted }}>SSL Labs 등급</Text>
            <Text style={{ fontSize: 11, fontWeight: 700, color: r.ssl.grade ? (r.ssl.grade.startsWith('A') ? C.green : r.ssl.grade === 'B' ? '#84cc16' : C.amber) : C.muted }}>
              {r.ssl.grade ?? (r.ssl.gradeChecked ? '—' : '미확인')}
            </Text>
          </View>
        </View>
      </View>

      {/* ── 악성코드·블랙리스트 진단 ── */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>악성코드 및 블랙리스트 진단</Text>
        {!r.malware.available ? (
          <View style={[s.alertBox, { backgroundColor: '#f9fafb', border: `1px solid ${C.border}` }]}>
            <Text style={{ fontSize: 8, color: C.muted }}>Sucuri 악성코드 탐지 서비스 응답 없음 — 수동 확인 권장</Text>
          </View>
        ) : r.malware.clean ? (
          <View style={[s.alertBox, { backgroundColor: '#f0fdf4', border: `1px solid ${C.green}40` }]}>
            <Text style={{ fontSize: 8, color: C.green, fontWeight: 700 }}>✓ 정상</Text>
            <Text style={{ fontSize: 8, color: C.muted, marginLeft: 4 }}>악성코드 미탐지 · 블랙리스트 미등재 (Sucuri SiteCheck)</Text>
          </View>
        ) : (
          <View>
            {r.malware.blacklisted && (
              <View style={[s.alertBox, { backgroundColor: '#fef2f2', border: `1px solid ${C.red}40` }]}>
                <Text style={{ fontSize: 8, color: C.red, fontWeight: 700 }}>✗ 블랙리스트 등재:</Text>
                <Text style={{ fontSize: 8, color: C.text, marginLeft: 4 }}>{r.malware.blacklistItems.join(', ')}</Text>
              </View>
            )}
            {r.malware.malwareFound && (
              <View style={[s.alertBox, { backgroundColor: '#fef2f2', border: `1px solid ${C.red}40` }]}>
                <Text style={{ fontSize: 8, color: C.red, fontWeight: 700 }}>✗ 악성코드 발견:</Text>
                <Text style={{ fontSize: 8, color: C.text, marginLeft: 4 }}>{r.malware.malwareTypes.join(', ')}</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* ── CMS·서버 정보 ── */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>CMS 및 서버 정보 점검</Text>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
          <View style={[s.scoreCard, { flex: 1, alignItems: 'flex-start' }]}>
            <Text style={[s.scoreLbl, { marginBottom: 3 }]}>탐지된 CMS</Text>
            <Text style={{ fontSize: 9, fontWeight: 700, color: r.cms.detected ? C.primary : C.muted }}>
              {r.cms.detected ?? '탐지 안 됨'}
              {r.cms.version ? ` ${r.cms.version}` : ''}
            </Text>
          </View>
          <View style={[s.scoreCard, { flex: 1, alignItems: 'flex-start' }]}>
            <Text style={[s.scoreLbl, { marginBottom: 3 }]}>정보 노출</Text>
            <Text style={{ fontSize: 9, fontWeight: 700, color: r.cms.infoLeaks.length > 0 ? C.red : C.green }}>
              {r.cms.infoLeaks.length > 0 ? `${r.cms.infoLeaks.length}건 노출` : '노출 없음'}
            </Text>
          </View>
        </View>
        {r.cms.infoLeaks.length > 0 && (
          <View>
            {r.cms.infoLeaks.map((leak, i) => (
              <View key={i} style={[s.alertBox, { backgroundColor: '#fffbeb', border: `1px solid ${C.amber}30` }]}>
                <Text style={{ fontSize: 8, color: C.amber, fontWeight: 700 }}>⚠</Text>
                <Text style={{ fontSize: 8, color: C.text, marginLeft: 4 }}>{leak}</Text>
              </View>
            ))}
            <View style={{ backgroundColor: '#f9fafb', border: `1px solid ${C.border}`, borderRadius: 4, padding: '5 8', marginTop: 4 }}>
              <Text style={{ fontSize: 7, color: C.muted }}>
                서버·CMS 버전 노출 시 해커가 알려진 취약점(CVE)을 바로 공격할 수 있습니다. Server 헤더 숨김 처리를 권장합니다.
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* ── 쿠키 보안 플래그 ── */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>쿠키 보안 플래그 점검</Text>
        <Text style={{ fontSize: 7, color: C.muted, marginBottom: 8 }}>
          로그인 쿠키가 안전하게 보호되고 있는지 확인합니다. 플래그가 없으면 해커가 로그인 정보를 훔칠 수 있습니다.
        </Text>
        {r.cookie.total === 0 ? (
          <View style={[s.alertBox, { backgroundColor: '#f0fdf4', border: `1px solid ${C.green}40` }]}>
            <Text style={{ fontSize: 8, color: C.green, fontWeight: 700 }}>✓ 해당 없음</Text>
            <Text style={{ fontSize: 8, color: C.muted, marginLeft: 4 }}>응답에서 쿠키가 발견되지 않았습니다. (로그인 기능 없는 사이트)</Text>
          </View>
        ) : (
          <>
            <View style={{ flexDirection: 'row', gap: 8, marginBottom: 6 }}>
              {[
                { label: '총 쿠키', val: String(r.cookie.total), color: C.text },
                { label: 'HttpOnly 미설정', val: String(r.cookie.missingHttpOnly), color: r.cookie.missingHttpOnly > 0 ? C.red : C.green },
                { label: 'Secure 미설정', val: String(r.cookie.missingSecure), color: r.cookie.missingSecure > 0 ? C.red : C.green },
                { label: 'SameSite 미설정', val: String(r.cookie.missingSameSite), color: r.cookie.missingSameSite > 0 ? C.amber : C.green },
              ].map(item => (
                <View key={item.label} style={[s.scoreCard, { flex: 1 }]}>
                  <Text style={s.scoreLbl}>{item.label}</Text>
                  <Text style={{ fontSize: 14, fontWeight: 700, color: item.color }}>{item.val}</Text>
                </View>
              ))}
            </View>
            {r.cookie.issues.map((issue, i) => (
              <View key={i} style={[s.alertBox, { backgroundColor: '#fffbeb', border: `1px solid ${C.amber}30` }]}>
                <Text style={{ fontSize: 8, color: C.amber, fontWeight: 700 }}>⚠</Text>
                <Text style={{ fontSize: 8, color: C.text, marginLeft: 4 }}>{issue}</Text>
              </View>
            ))}
            {r.cookie.issues.length === 0 && (
              <View style={[s.alertBox, { backgroundColor: '#f0fdf4', border: `1px solid ${C.green}40` }]}>
                <Text style={{ fontSize: 8, color: C.green, fontWeight: 700 }}>✓ 정상</Text>
                <Text style={{ fontSize: 8, color: C.muted, marginLeft: 4 }}>모든 쿠키에 보안 플래그가 설정되어 있습니다.</Text>
              </View>
            )}
          </>
        )}
      </View>

      {/* ── CORS 점검 ── */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>CORS 설정 점검 (다른 사이트 데이터 도용 방어)</Text>
        <Text style={{ fontSize: 7, color: C.muted, marginBottom: 8 }}>
          다른 웹사이트가 내 사이트 데이터를 몰래 가져가는 것을 막는 설정입니다. 잘못 설정하면 회원 정보가 유출될 수 있습니다.
        </Text>
        {!r.cors.tested ? (
          <View style={[s.alertBox, { backgroundColor: '#f9fafb', border: `1px solid ${C.border}` }]}>
            <Text style={{ fontSize: 8, color: C.muted }}>CORS 점검을 수행할 수 없었습니다.</Text>
          </View>
        ) : r.cors.vulnerable ? (
          <View>
            <View style={[s.alertBox, { backgroundColor: '#fef2f2', border: `1px solid ${C.red}40` }]}>
              <Text style={{ fontSize: 8, color: C.red, fontWeight: 700 }}>✗ 취약 ({r.cors.severity})</Text>
              <Text style={{ fontSize: 8, color: C.text, marginLeft: 4 }}>{r.cors.detail}</Text>
            </View>
            {r.cors.allowCredentials && (
              <View style={{ backgroundColor: '#f9fafb', borderRadius: 4, padding: '4 8', marginTop: 2 }}>
                <Text style={{ fontSize: 7, color: C.muted }}>
                  Access-Control-Allow-Credentials: true 설정으로 인해 로그인 세션 탈취 가능. 즉각 수정 필요.
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={[s.alertBox, { backgroundColor: '#f0fdf4', border: `1px solid ${C.green}40` }]}>
            <Text style={{ fontSize: 8, color: C.green, fontWeight: 700 }}>✓ 정상</Text>
            <Text style={{ fontSize: 8, color: C.muted, marginLeft: 4 }}>{r.cors.detail}</Text>
          </View>
        )}
      </View>

      {/* ── 이메일 보안 ── */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>이메일 보안 (SPF · DMARC)</Text>
        <Text style={{ fontSize: 7, color: C.muted, marginBottom: 8 }}>
          내 도메인 이름으로 가짜 피싱 이메일을 보내는 것을 막는 설정입니다. 설정이 없으면 고객이 사칭 이메일에 속을 수 있습니다.
        </Text>
        <View style={s.tableHeader}>
          <Text style={[{ flex: 2, fontWeight: 700, fontSize: 8 }]}>항목</Text>
          <Text style={[{ flex: 1, fontWeight: 700, fontSize: 8 }]}>상태</Text>
          <Text style={[{ flex: 4, fontWeight: 700, fontSize: 8 }]}>레코드</Text>
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
              <Text style={{ fontSize: 8, fontWeight: 700 }}>{item.label}</Text>
              <Text style={{ fontSize: 7, color: C.muted, marginTop: 1 }}>{item.sub}</Text>
            </View>
            <Text style={{ flex: 1, fontSize: 8, fontWeight: 700, color: item.present ? C.green : C.red }}>
              {item.present ? '설정됨' : '미설정'}
            </Text>
            <Text style={{ flex: 4, fontSize: 7, color: C.muted, lineHeight: 1.4 }}>
              {item.present ? (item.record ?? '') : item.missing}
            </Text>
          </View>
        ))}
      </View>

      {/* ── 민감 파일 점검 ── */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>민감 파일 30경로 점검</Text>
        <Text style={{ fontSize: 7, color: C.muted, marginBottom: 8 }}>
          비밀번호·DB 정보가 담긴 설정 파일(.env, .git 등)이 외부에 공개되어 있는지 30개 경로를 확인합니다.
        </Text>
        {r.sensitiveFiles.exposed.length === 0 ? (
          <View style={[s.alertBox, { backgroundColor: '#f0fdf4', border: `1px solid ${C.green}40` }]}>
            <Text style={{ fontSize: 8, color: C.green, fontWeight: 700 }}>✓ 정상</Text>
            <Text style={{ fontSize: 8, color: C.muted, marginLeft: 4 }}>
              점검한 {r.sensitiveFiles.checked}개 경로에서 노출된 파일 없음 (.env·.git·DB 백업 등)
            </Text>
          </View>
        ) : (
          <View>
            <View style={[s.alertBox, { backgroundColor: '#fef2f2', border: `1px solid ${C.red}40` }]}>
              <Text style={{ fontSize: 8, color: C.red, fontWeight: 700 }}>✗ {r.sensitiveFiles.exposed.length}개 경로 노출</Text>
              <Text style={{ fontSize: 8, color: C.text, marginLeft: 4 }}>즉각 접근 차단 필요</Text>
            </View>
            {r.sensitiveFiles.exposed.map((p, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                <Text style={{ fontSize: 8, color: C.red, marginRight: 6 }}>•</Text>
                <Text style={{ fontSize: 8, color: C.text, fontFamily: 'NotoKR' }}>{p}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* ── 보안 헤더 ── */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>보안 헤더 점검</Text>
        <Text style={{ fontSize: 7, color: C.muted, marginBottom: 8 }}>
          웹 서버가 브라우저에게 보내는 보안 지침입니다. 없으면 해킹·클릭재킹 등 다양한 공격에 노출됩니다.
        </Text>
        <View style={s.tableHeader}>
          <Text style={[s.col1, { fontWeight: 700, fontSize: 8 }]}>헤더</Text>
          <Text style={[s.col2, { fontWeight: 700, fontSize: 8 }]}>상태</Text>
          <Text style={[s.col1, { fontWeight: 700, fontSize: 8 }]}>위험도</Text>
          <Text style={[s.col3, { fontWeight: 700, fontSize: 8 }]}>설명</Text>
        </View>
        {r.headers.map(h => {
          const beginner = HEADER_BEGINNER[h.key]
          return (
            <View key={h.key} style={s.tableRow}>
              <View style={s.col1}>
                {beginner ? <Text style={{ fontSize: 8, fontWeight: 700 }}>{beginner}</Text> : null}
                <Text style={{ fontSize: 7, color: C.muted }}>{h.label}</Text>
              </View>
              <Text style={[s.col2, { fontSize: 8, color: h.present ? C.green : C.red, fontWeight: 700 }]}>
                {h.present ? '통과' : '미설정'}
              </Text>
              <Text style={[s.col1, { fontSize: 8, color: h.present ? C.muted : severityColor(h.severity) }]}>
                {h.present ? '-' : h.severity}
              </Text>
              <Text style={[s.col3, { fontSize: 7, color: C.muted, lineHeight: 1.4 }]}>
                {h.present ? (h.value ?? '') : h.description}
              </Text>
            </View>
          )
        })}
      </View>

      {/* ── SEO ── */}
      {r.seo.issues.length > 0 && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>SEO 점검 결과</Text>
          {r.seo.title && (
            <View style={{ backgroundColor: C.surface, borderRadius: 4, padding: '5 8', marginBottom: 6, border: `1px solid ${C.border}` }}>
              <Text style={{ fontSize: 8 }}>Title: {r.seo.title}</Text>
            </View>
          )}
          {r.seo.issues.map(issue => (
            <View key={issue} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Text style={{ color: C.amber, fontSize: 8, marginRight: 6 }}>⚠</Text>
              <Text style={{ fontSize: 8, color: C.text }}>{issue}</Text>
            </View>
          ))}
        </View>
      )}

      {/* ── 성능 ── */}
      {r.performance.available && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>성능 측정 (Google PageSpeed Insights)</Text>
          <View style={s.row}>
            {[
              { label: 'LCP', val: r.performance.lcp, div: 1000, unit: 's', good: 2.5 },
              { label: 'FCP', val: r.performance.fcp, div: 1000, unit: 's', good: 1.8 },
              { label: 'CLS', val: r.performance.cls, div: 1,    unit: '',  good: 0.1 },
              { label: 'PageSpeed', val: r.performance.score, div: 1, unit: '점', good: 90 },
            ].filter(m => m.val != null).map(m => {
              const v = (m.val! / m.div)
              const good = v <= m.good
              return (
                <View key={m.label} style={s.scoreCard}>
                  <Text style={s.scoreLbl}>{m.label}</Text>
                  <Text style={[{ fontSize: 16, fontWeight: 700 }, { color: good ? C.green : C.amber }]}>
                    {v.toFixed(m.div === 1000 ? 1 : m.unit === '점' ? 0 : 3)}{m.unit}
                  </Text>
                  <Text style={[s.scoreLbl, { color: good ? C.green : C.amber }]}>{good ? '양호' : '개선필요'}</Text>
                </View>
              )
            })}
          </View>
        </View>
      )}

      {/* ── 견적 ── */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>수정 견적서 (예상)</Text>
        <View style={s.tableHeader}>
          <Text style={[{ flex: 3, fontWeight: 700, fontSize: 8 }]}>서비스</Text>
          <Text style={[{ flex: 2, fontWeight: 700, fontSize: 8 }]}>사유</Text>
          <Text style={[{ flex: 2, fontWeight: 700, fontSize: 8, textAlign: 'right' }]}>예상 비용</Text>
        </View>
        {r.estimate.items.map((item, i) => (
          <View key={i} style={[s.tableRow, i === r.estimate.items.length - 1 ? { borderBottom: 'none' } : {}]}>
            <Text style={{ flex: 3, fontSize: 8, fontWeight: 700 }}>{item.name}</Text>
            <Text style={{ flex: 2, fontSize: 7, color: C.muted, lineHeight: 1.4 }}>{item.reason}</Text>
            <Text style={{ flex: 2, fontSize: 8, fontWeight: 700, color: C.primary, textAlign: 'right' }}>{item.priceRange}</Text>
          </View>
        ))}
        <View style={{ backgroundColor: '#faf8ff', border: `1px solid ${C.primary}20`, borderRadius: 4, padding: '6 8', marginTop: 6 }}>
          <Text style={{ fontSize: 7, color: C.muted }}>※ 본 견적은 자동 분석 기반 예상 비용입니다. 실제 견적은 상담 후 확정됩니다. 부가세 별도.</Text>
        </View>
      </View>

      {/* ── ZAP 스캔 ── */}
      {r.zap && r.zap.alerts.length > 0 && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>OWASP ZAP 취약점 스캔 결과</Text>
          <View style={[s.row, { marginBottom: 10 }]}>
            {[
              { label: 'ZAP 점수',    val: `${r.zap.zapScore}점`, color: r.zap.zapScore >= 80 ? C.green : r.zap.zapScore >= 60 ? C.amber : C.red },
              { label: 'High 위험',   val: String(r.zap.summary.high),   color: r.zap.summary.high   > 0 ? C.red   : C.green },
              { label: 'Medium 위험', val: String(r.zap.summary.medium), color: r.zap.summary.medium > 0 ? C.amber : C.green },
              { label: 'Low 위험',    val: String(r.zap.summary.low),    color: r.zap.summary.low    > 0 ? C.blue  : C.green },
            ].map(card => (
              <View key={card.label} style={s.scoreCard}>
                <Text style={s.scoreLbl}>{card.label}</Text>
                <Text style={[{ fontSize: 16, fontWeight: 700 }, { color: card.color }]}>{card.val}</Text>
              </View>
            ))}
          </View>
          <View style={s.tableHeader}>
            <Text style={[{ flex: 2, fontWeight: 700, fontSize: 8 }]}>항목</Text>
            <Text style={[{ flex: 1, fontWeight: 700, fontSize: 8 }]}>위험도</Text>
            <Text style={[{ flex: 3, fontWeight: 700, fontSize: 8 }]}>설명</Text>
          </View>
          {r.zap.alerts.slice(0, 6).map((alert, i) => (
            <View key={i} style={s.tableRow}>
              <Text style={{ flex: 2, fontSize: 8, fontWeight: 700 }}>{alert.name}</Text>
              <Text style={{ flex: 1, fontSize: 8, color: severityColor(alert.riskdesc), fontWeight: 700 }}>
                {alert.riskdesc}
              </Text>
              <Text style={{ flex: 3, fontSize: 7, color: C.muted, lineHeight: 1.4 }}>
                {alert.description.slice(0, 100)}{alert.description.length > 100 ? '…' : ''}
              </Text>
            </View>
          ))}
          {r.zap.alerts.length > 6 && (
            <Text style={{ fontSize: 7, color: C.muted, marginTop: 4 }}>
              외 {r.zap.alerts.length - 6}개 항목 — 전문가 상담 시 전체 리포트 제공
            </Text>
          )}
        </View>
      )}

      {/* ── 푸터 ── */}
      <View style={s.footer}>
        <Text style={s.footerTxt}>VISIONC — visionc.co.kr</Text>
        <Text style={s.footerTxt}>biztalktome@gmail.com</Text>
        <Text style={s.footerTxt}>본 리포트는 자동 생성됩니다. 무단 배포를 금합니다.</Text>
      </View>
    </Page>
  </Document>
)

export async function generatePdfBuffer(result: AnalysisResult, email: string, company?: string): Promise<Buffer> {
  const buf = await renderToBuffer(<PdfDoc r={result} email={email} company={company} />)
  return Buffer.from(buf)
}
