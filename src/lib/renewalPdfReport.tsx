import React from 'react'
import path from 'path'
import { Document, Page, Text, View, StyleSheet, Font, renderToBuffer } from '@react-pdf/renderer'
import type { RenewalAnalysisResult } from './renewalAnalyzer'

const fontPath = path.join(process.cwd(), 'public/fonts/NotoSansKR-Regular.ttf')
Font.register({ family: 'NotoKR', fonts: [{ src: fontPath, fontWeight: 400 }, { src: fontPath, fontWeight: 700 }] })

const C = {
  blue: '#111827', darkBlue: '#111827', lightBlue: '#f3f4f6',
  red: '#111827', redBg: '#f3f4f6',
  amber: '#374151', amberBg: '#f3f4f6',
  green: '#374151', greenBg: '#f9fafb',
  gray: '#1f2937', grayLight: '#f3f4f6', grayBorder: '#9ca3af',
  dark: '#000000', ink: '#111827', white: '#ffffff',
}

function gradeColor(_g: string) {
  return C.white
}
function statusColor(s: string) {
  return { red: '#111827', yellow: '#374151', green: '#4b5563' }[s] ?? C.gray
}
function statusDot(s: string) {
  return { red: '●', yellow: '●', green: '●' }[s] ?? '●'
}
function impactLabel(i: string) {
  return { high: '높음', mid: '중간', low: '낮음' }[i] ?? i
}
function timingLabel(t: string) {
  return { now: '즉시', '1m': '1개월', '3m': '3개월' }[t] ?? t
}

const s = StyleSheet.create({
  page: { fontFamily: 'NotoKR', backgroundColor: C.white, paddingHorizontal: 40, paddingVertical: 36, fontSize: 9, color: C.ink, fontWeight: 400 },
  // Cover
  coverBg: { backgroundColor: C.darkBlue, borderRadius: 12, padding: '28 32', marginBottom: 20 },
  coverTitle: { fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 4 },
  coverSub: { fontSize: 9, color: 'rgba(255,255,255,0.9)', marginBottom: 16 },
  coverMeta: { fontSize: 9, color: 'rgba(255,255,255,0.95)', marginBottom: 2 },
  gradeBox: { position: 'absolute', top: 28, right: 32, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 10, padding: '16 20' },
  gradeNum: { fontSize: 40, fontWeight: 700, lineHeight: 1 },
  gradeSub: { fontSize: 7, color: 'rgba(255,255,255,0.9)', marginTop: 2 },
  gradeScore: { fontSize: 16, fontWeight: 700, color: C.white, marginTop: 4 },
  // Common
  sectionTitle: { fontSize: 11, fontWeight: 700, color: '#000000', borderBottom: `1.5 solid ${C.grayBorder}`, paddingBottom: 6, marginBottom: 10, marginTop: 18 },
  row: { flexDirection: 'row', gap: 8 },
  card: { backgroundColor: C.grayLight, borderRadius: 6, padding: '10 12', flex: 1, border: `1 solid ${C.grayBorder}` },
  cardNum: { fontSize: 20, fontWeight: 700, lineHeight: 1, marginTop: 4, color: C.ink },
  cardLbl: { fontSize: 7, color: C.gray, marginTop: 2 },
  // Site type
  typeBox: { backgroundColor: C.lightBlue, borderRadius: 8, padding: '10 14', marginBottom: 14, border: `1 solid ${C.grayBorder}` },
  typeLbl: { fontSize: 8, fontWeight: 700, color: C.ink, marginBottom: 2 },
  typeVal: { fontSize: 13, fontWeight: 700, color: C.dark },
  typeConf: { fontSize: 8, color: C.gray, marginTop: 2 },
  // Axis
  axisRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '8 10', borderBottom: `1 solid ${C.grayBorder}` },
  axisName: { fontSize: 10, fontWeight: 700, flex: 1, color: C.ink },
  axisBar: { width: 100, height: 6, backgroundColor: C.grayBorder, borderRadius: 3, overflow: 'hidden' },
  axisBarFill: { height: 6, borderRadius: 3 },
  axisScore: { fontSize: 14, fontWeight: 700, width: 50, textAlign: 'right', color: C.ink },
  // Check items
  checkRow: { flexDirection: 'row', padding: '7 10', borderBottom: `1 solid ${C.grayBorder}`, gap: 8 },
  checkDot: { fontSize: 9, width: 14, marginTop: 1 },
  checkBody: { flex: 1 },
  checkTitle: { fontSize: 9, fontWeight: 700, marginBottom: 2, color: C.ink },
  checkCurrent: { fontSize: 8, color: C.ink, marginBottom: 2 },
  checkTobe: { fontSize: 8, color: C.ink, backgroundColor: C.lightBlue, padding: '3 6', borderRadius: 4, marginTop: 3 },
  impactBadge: { fontSize: 7, fontWeight: 700, padding: '1 6', borderRadius: 10 },
  // Tech stack
  techRow: { flexDirection: 'row', justifyContent: 'space-between', padding: '7 10', borderBottom: `1 solid ${C.grayBorder}` },
  techLbl: { fontSize: 9, fontWeight: 700, flex: 1, color: C.ink },
  techVal: { fontSize: 9, color: C.ink, flex: 2 },
  techConf: { fontSize: 7, fontWeight: 700, padding: '1 6', borderRadius: 8 },
  // Priority table
  prioRow: { flexDirection: 'row', padding: '8 10', borderBottom: `1 solid ${C.grayBorder}`, gap: 8, alignItems: 'flex-start' },
  prioRank: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  prioRankTxt: { fontSize: 9, fontWeight: 700 },
  prioTitle: { fontSize: 9, fontWeight: 700, marginBottom: 3, color: C.ink },
  prioDesc: { fontSize: 8, color: C.ink },
  prioTiming: { fontSize: 8, fontWeight: 700, width: 42, textAlign: 'center', padding: '2 0', flexShrink: 0 },
  // Footer
  footer: { borderTop: `1 solid ${C.grayBorder}`, paddingTop: 8, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' },
  footerTxt: { fontSize: 7, color: C.ink },
})

function AxisBar({ score, max }: { score: number; max: number }) {
  const pct = score / max
  const color = pct >= 0.7 ? C.green : pct >= 0.5 ? C.amber : C.red
  return (
    <View style={s.axisBar}>
      <View style={[s.axisBarFill, { width: `${pct * 100}%`, backgroundColor: color }]} />
    </View>
  )
}

function CheckItems({ items }: { items: RenewalAnalysisResult['axes']['technical']['items'] }) {
  const issues = items.filter(i => i.status !== 'green')
  const okCount = items.length - issues.length
  return (
    <View style={{ border: `1 solid ${C.grayBorder}`, borderRadius: 6, overflow: 'hidden' }}>
      {issues.length === 0 ? (
        <View style={[s.checkRow, { backgroundColor: C.greenBg }]}>
          <Text style={[s.checkDot, { color: C.green }]}>●</Text>
          <Text style={[s.checkTitle, { color: C.green }]}>모든 항목 양호</Text>
        </View>
      ) : (
        issues.map(item => (
          <View key={item.id} style={[s.checkRow, {
            backgroundColor: item.status === 'red' ? C.redBg : C.amberBg,
          }]}>
            <Text style={[s.checkDot, { color: statusColor(item.status) }]}>{statusDot(item.status)}</Text>
            <View style={s.checkBody}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                <Text style={s.checkTitle}>{item.title}</Text>
                <Text style={[s.impactBadge, {
                  backgroundColor: item.impact === 'high' ? '#d1d5db' : item.impact === 'mid' ? '#e5e7eb' : '#f3f4f6',
                  color: item.impact === 'high' ? '#000000' : item.impact === 'mid' ? '#374151' : '#6b7280',
                }]}>영향 {impactLabel(item.impact)}</Text>
              </View>
              <Text style={s.checkCurrent}>{item.currentState}</Text>
              <Text style={s.checkTobe}>→ {item.tobe}</Text>
            </View>
          </View>
        ))
      )}
      {okCount > 0 && issues.length > 0 && (
        <View style={[s.checkRow, { backgroundColor: C.greenBg }]}>
          <Text style={[s.checkDot, { color: C.green }]}>●</Text>
          <Text style={[s.checkCurrent, { color: C.green }]}>양호 {okCount}개 항목 — 현재 기준 충족</Text>
        </View>
      )}
    </View>
  )
}

function RenewalReport({ r }: { r: RenewalAnalysisResult }) {
  const gc = gradeColor(r.grade)
  const axes = [
    { name: '기술 기반', result: r.axes.technical },
    { name: '사용자 경험', result: r.axes.ux },
    { name: '현대 기준', result: r.axes.modern },
  ]

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Cover */}
        <View style={s.coverBg}>
          <Text style={s.coverTitle}>홈페이지 운영상태진단 리포트</Text>
          <Text style={s.coverSub}>Vision Solution · visionc.co.kr</Text>
          <Text style={s.coverMeta}>{r.url}</Text>
          <Text style={s.coverMeta}>{r.siteType.label}  ·  {r.analyzedAt}</Text>
          <View style={s.gradeBox}>
            <Text style={[s.gradeNum, { color: gc }]}>{r.grade}</Text>
            <Text style={s.gradeSub}>종합 등급</Text>
            <Text style={s.gradeScore}>{r.totalScore}점</Text>
          </View>
        </View>

        {/* Site type */}
        <View style={s.typeBox}>
          <Text style={s.typeLbl}>사이트 유형 판단</Text>
          <Text style={s.typeVal}>{r.siteType.label}</Text>
          <Text style={s.typeConf}>신뢰도 {r.siteType.confidence}%  ·  {r.siteType.profile} 프로파일 적용</Text>
        </View>

        {/* Score summary */}
        <Text style={s.sectionTitle}>3축 진단 점수</Text>
        <View style={{ border: `1 solid ${C.grayBorder}`, borderRadius: 6, overflow: 'hidden', marginBottom: 8 }}>
          {axes.map(ax => {
            const pct = ax.result.score / ax.result.maxScore
            const color = pct >= 0.7 ? C.green : pct >= 0.5 ? C.amber : C.red
            return (
              <View key={ax.name} style={s.axisRow}>
                <Text style={s.axisName}>{ax.name}</Text>
                <AxisBar score={ax.result.score} max={ax.result.maxScore} />
                <Text style={[s.axisScore, { color }]}>{ax.result.score}<Text style={{ fontSize: 8, color: C.ink }}>/{ax.result.maxScore}</Text></Text>
              </View>
            )
          })}
        </View>

        {/* Score cards */}
        <View style={[s.row, { marginBottom: 16 }]}>
          {[
            { label: '총점', val: `${r.totalScore}/100`, color: gradeColor(r.grade) },
            { label: '즉시 개선', val: `${[...r.axes.technical.items,...r.axes.ux.items,...r.axes.modern.items].filter(i=>i.status==='red').length}건`, color: C.red },
            { label: '개선 권장', val: `${[...r.axes.technical.items,...r.axes.ux.items,...r.axes.modern.items].filter(i=>i.status==='yellow').length}건`, color: C.amber },
            { label: '양호', val: `${[...r.axes.technical.items,...r.axes.ux.items,...r.axes.modern.items].filter(i=>i.status==='green').length}건`, color: C.green },
          ].map(c => (
            <View key={c.label} style={s.card}>
              <Text style={[s.cardNum, { color: c.color }]}>{c.val}</Text>
              <Text style={s.cardLbl}>{c.label}</Text>
            </View>
          ))}
        </View>

        {/* Tech stack */}
        {r.techStack.signals.length > 0 && (
          <>
            <Text style={s.sectionTitle}>기술 스택 추정</Text>
            <View style={{ border: `1 solid ${C.grayBorder}`, borderRadius: 6, overflow: 'hidden', marginBottom: 8 }}>
              {r.techStack.signals.map((sig, i) => (
                <View key={i} style={s.techRow}>
                  <Text style={s.techLbl}>{sig.label}</Text>
                  <Text style={s.techVal}>{sig.value}</Text>
                  <Text style={[s.techConf, {
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                  }]}>{sig.confidence === 'confirmed' ? '확인됨' : '추정됨'}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Footer p1 */}
        <View style={s.footer}>
          <Text style={s.footerTxt}>Vision Solution 홈페이지 운영상태진단 리포트  ·  {r.analyzedAt}</Text>
          <Text style={s.footerTxt}>1 / 2</Text>
        </View>
      </Page>

      {/* Page 2: Detailed checks + Priority actions */}
      <Page size="A4" style={s.page}>

        {/* Technical axis */}
        <Text style={s.sectionTitle}>기술 기반 진단 상세 ({r.axes.technical.score}/{r.axes.technical.maxScore}점)</Text>
        <CheckItems items={r.axes.technical.items} />

        {/* UX axis */}
        <Text style={s.sectionTitle}>사용자 경험 진단 상세 ({r.axes.ux.score}/{r.axes.ux.maxScore}점)</Text>
        <CheckItems items={r.axes.ux.items} />

        {/* Modern axis */}
        <Text style={s.sectionTitle}>현대 기준 진단 상세 ({r.axes.modern.score}/{r.axes.modern.maxScore}점)</Text>
        <CheckItems items={r.axes.modern.items} />

        {/* Priority actions */}
        <Text style={s.sectionTitle}>우선순위별 개선 과제</Text>
        <View style={{ border: `1 solid ${C.grayBorder}`, borderRadius: 6, overflow: 'hidden', marginBottom: 16 }}>
          {r.priorityActions.map((a, i) => (
            <View key={a.rank} style={s.prioRow}>
              <View style={[s.prioRank, {
                backgroundColor: i < 2 ? '#d1d5db' : i < 4 ? '#e5e7eb' : '#f3f4f6',
              }]}>
                <Text style={[s.prioRankTxt, { color: i < 2 ? '#000000' : i < 4 ? '#374151' : '#6b7280' }]}>{a.rank}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={s.prioTitle}>{a.title}</Text>
                <Text style={s.prioDesc}>{a.description}</Text>
              </View>
              <View style={[{ width: 42, flexShrink: 0, borderRadius: 8,
                backgroundColor: '#f3f4f6',
              }]}>
                <Text style={[s.prioTiming, {
                  color: a.timing === 'now' ? '#000000' : a.timing === '1m' ? '#374151' : '#6b7280',
                }]}>{timingLabel(a.timing)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA box */}
        <View style={{ backgroundColor: C.darkBlue, borderRadius: 10, padding: '18 24', alignItems: 'center' }}>
          <Text style={{ fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 6 }}>30분 무료 상담으로 개선 순서를 잡아드립니다</Text>
          <Text style={{ fontSize: 9, color: 'rgba(255,255,255,0.9)', marginBottom: 10 }}>견적은 상담 후 제시  ·  의무 계약 없음  ·  48시간 내 답변</Text>
          <Text style={{ fontSize: 10, fontWeight: 700, color: C.white, backgroundColor: C.blue, padding: '6 20', borderRadius: 20 }}>visionc.co.kr/renewal</Text>
        </View>

        {/* AI disclaimer */}
        <View style={{ backgroundColor: C.grayLight, borderRadius: 6, padding: '8 12', marginTop: 12 }}>
          <Text style={{ fontSize: 7.5, color: C.ink, lineHeight: 1.6 }}>
            ⚠ 본 리포트는 AI가 공개 접근 가능한 정보를 자동 분석한 결과입니다. 서버 내부 접근 없이 외부 신호만을 기반으로 하므로 일부 항목은 실제와 다를 수 있습니다. 최종 판단은 반드시 전문가 검토를 통해 확인하시기 바랍니다.
          </Text>
        </View>

        {/* Footer p2 */}
        <View style={s.footer}>
          <Text style={s.footerTxt}>본 리포트는 공개 접근 정보 자동 분석 결과입니다. 서버 내부 접근 미포함.  ·  Vision Solution</Text>
          <Text style={s.footerTxt}>2 / 2</Text>
        </View>
      </Page>
    </Document>
  )
}

export async function generateRenewalPdfBuffer(result: RenewalAnalysisResult): Promise<Buffer> {
  const buffer = await renderToBuffer(<RenewalReport r={result} />)
  return Buffer.from(buffer)
}
