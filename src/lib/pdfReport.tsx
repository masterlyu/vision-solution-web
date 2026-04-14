import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font, renderToBuffer } from '@react-pdf/renderer'
import type { AnalysisResult } from './siteAnalyzer'

// NotoSansKR from jsDelivr — supports Korean
Font.register({
  family: 'NotoKR',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-kr@5/files/noto-sans-kr-korean-400-normal.woff2', fontWeight: 400 },
    { src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-kr@5/files/noto-sans-kr-korean-700-normal.woff2', fontWeight: 700 },
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
}

const s = StyleSheet.create({
  page:       { fontFamily: 'NotoKR', backgroundColor: C.bg, paddingHorizontal: 44, paddingVertical: 40, fontSize: 9, color: C.text },
  header:     { borderBottom: `2px solid ${C.primary}`, paddingBottom: 14, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  brand:      { fontSize: 18, fontWeight: 700, color: C.primary },
  brandSub:   { fontSize: 8, color: C.muted, marginTop: 2 },
  gradeBox:   { alignItems: 'center' },
  grade:      { fontSize: 36, fontWeight: 700 },
  gradeLabel: { fontSize: 7, color: C.muted },
  section:    { marginBottom: 18 },
  sectionTitle: { fontSize: 11, fontWeight: 700, color: C.primary, borderBottom: `1px solid ${C.border}`, paddingBottom: 5, marginBottom: 10 },
  row:        { flexDirection: 'row', gap: 8, marginBottom: 8 },
  scoreCard:  { flex: 1, backgroundColor: C.surface, borderRadius: 6, padding: 10, alignItems: 'center', border: `1px solid ${C.border}` },
  scoreNum:   { fontSize: 22, fontWeight: 700, marginTop: 2 },
  scoreLbl:   { fontSize: 7, color: C.muted, marginTop: 1 },
  chip:       { fontSize: 7, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10, fontWeight: 700, marginLeft: 6 },
  tableHeader: { flexDirection: 'row', backgroundColor: C.surface, borderRadius: 4, padding: '6 8', marginBottom: 4 },
  tableRow:   { flexDirection: 'row', borderBottom: `1px solid ${C.border}`, padding: '5 8' },
  col1:       { flex: 2 },
  col2:       { flex: 1, textAlign: 'center' },
  col3:       { flex: 3 },
  footer:     { borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' },
  footerTxt:  { fontSize: 7, color: C.muted },
})

function gradeColor(g: string) {
  return { A: C.green, B: '#84cc16', C: C.amber, D: '#f97316', F: C.red }[g] ?? C.text
}

function severityColor(sev: string) {
  return { HIGH: C.red, MEDIUM: C.amber, LOW: C.blue }[sev] ?? C.muted
}

const PdfDoc = ({ r, email, company }: { r: AnalysisResult; email: string; company?: string }) => (
  <Document title={`VISIONC 보안 진단 리포트 — ${r.url}`} author="VISIONC">
    <Page size="A4" style={s.page}>

      {/* Header */}
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

      {/* Scores */}
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
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: r.ssl.valid ? '#f0fdf4' : '#fef2f2', border: `1px solid ${r.ssl.valid ? C.green : C.red}`, borderRadius: 4, padding: '5 8' }}>
            <Text style={{ fontSize: 8, color: r.ssl.valid ? C.green : C.red, fontWeight: 700 }}>
              {r.ssl.valid ? '✓ HTTPS 정상' : '✗ HTTPS 미설정'}
            </Text>
            <Text style={{ fontSize: 8, color: C.muted, marginLeft: 8 }}>{r.ssl.note}</Text>
          </View>
        </View>
      </View>

      {/* Security Headers */}
      <View style={s.section}>
        <Text style={s.sectionTitle}>보안 헤더 점검</Text>
        <View style={s.tableHeader}>
          <Text style={[s.col1, { fontWeight: 700, fontSize: 8 }]}>헤더</Text>
          <Text style={[s.col2, { fontWeight: 700, fontSize: 8 }]}>상태</Text>
          <Text style={[s.col1, { fontWeight: 700, fontSize: 8 }]}>위험도</Text>
          <Text style={[s.col3, { fontWeight: 700, fontSize: 8 }]}>설명</Text>
        </View>
        {r.headers.map(h => (
          <View key={h.key} style={s.tableRow}>
            <Text style={[s.col1, { fontSize: 8 }]}>{h.label}</Text>
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
        ))}
      </View>

      {/* SEO */}
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

      {/* Performance */}
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

      {/* Estimate */}
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

      {/* ZAP Scan Results */}
      {r.zap && r.zap.alerts.length > 0 && (
        <View style={s.section}>
          <Text style={s.sectionTitle}>OWASP ZAP 취약점 스캔 결과</Text>
          {/* Summary cards */}
          <View style={[s.row, { marginBottom: 10 }]}>
            {[
              { label: 'ZAP 점수',     val: `${r.zap.zapScore}점`, color: r.zap.zapScore >= 80 ? C.green : r.zap.zapScore >= 60 ? C.amber : C.red },
              { label: 'High 위험',    val: String(r.zap.summary.high),    color: r.zap.summary.high    > 0 ? C.red   : C.green },
              { label: 'Medium 위험',  val: String(r.zap.summary.medium),  color: r.zap.summary.medium  > 0 ? C.amber : C.green },
              { label: 'Low 위험',     val: String(r.zap.summary.low),     color: r.zap.summary.low     > 0 ? C.blue  : C.green },
            ].map(card => (
              <View key={card.label} style={s.scoreCard}>
                <Text style={s.scoreLbl}>{card.label}</Text>
                <Text style={[{ fontSize: 16, fontWeight: 700 }, { color: card.color }]}>{card.val}</Text>
              </View>
            ))}
          </View>
          {/* Alert list (최대 8개) */}
          <View style={s.tableHeader}>
            <Text style={[{ flex: 2, fontWeight: 700, fontSize: 8 }]}>항목</Text>
            <Text style={[{ flex: 1, fontWeight: 700, fontSize: 8 }]}>위험도</Text>
            <Text style={[{ flex: 3, fontWeight: 700, fontSize: 8 }]}>설명</Text>
          </View>
          {r.zap.alerts.slice(0, 8).map((alert, i) => (
            <View key={i} style={s.tableRow}>
              <Text style={{ flex: 2, fontSize: 8, fontWeight: 700 }}>{alert.name}</Text>
              <Text style={{ flex: 1, fontSize: 8, color: severityColor(alert.riskdesc), fontWeight: 700 }}>
                {alert.riskdesc}
              </Text>
              <Text style={{ flex: 3, fontSize: 7, color: C.muted, lineHeight: 1.4 }}>
                {alert.description.slice(0, 120)}{alert.description.length > 120 ? '…' : ''}
              </Text>
            </View>
          ))}
          {r.zap.alerts.length > 8 && (
            <Text style={{ fontSize: 7, color: C.muted, marginTop: 4 }}>
              외 {r.zap.alerts.length - 8}개 항목 — 전문가 상담 시 전체 리포트 제공
            </Text>
          )}
          <View style={{ backgroundColor: '#fef9f0', border: `1px solid ${C.amber}30`, borderRadius: 4, padding: '5 8', marginTop: 6 }}>
            <Text style={{ fontSize: 7, color: C.muted }}>
              ※ 헤더 기반 자동 추론 결과입니다. 정밀 진단(Full OWASP ZAP 스캔)은 심화 진단 서비스에서 제공합니다.
            </Text>
          </View>
        </View>
      )}

      {/* Footer */}
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
