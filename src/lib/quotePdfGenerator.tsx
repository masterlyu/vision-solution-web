import React from 'react'
import { Document, Page, Text, View, StyleSheet, Font, renderToBuffer } from '@react-pdf/renderer'
import type { QuoteData } from '@/app/api/quote-approve/route'

Font.register({
  family: 'NotoKR',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-kr@5/files/noto-sans-kr-korean-400-normal.woff2', fontWeight: 400 },
    { src: 'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-kr@5/files/noto-sans-kr-korean-700-normal.woff2', fontWeight: 700 },
  ],
})

const C = {
  primary:  '#7C3AED',
  bg:       '#ffffff',
  surface:  '#f8f7ff',
  border:   '#e5e3f0',
  text:     '#111827',
  muted:    '#6B7280',
  green:    '#22C55E',
}

const s = StyleSheet.create({
  page:         { fontFamily: 'NotoKR', backgroundColor: C.bg, paddingHorizontal: 44, paddingVertical: 40, fontSize: 9, color: C.text },
  header:       { borderBottom: `2px solid ${C.primary}`, paddingBottom: 14, marginBottom: 20 },
  brand:        { fontSize: 18, fontWeight: 700, color: C.primary },
  brandSub:     { fontSize: 8, color: C.muted, marginTop: 2 },
  clientInfo:   { marginTop: 10, fontSize: 9, color: C.muted },
  section:      { marginBottom: 18 },
  sectionTitle: { fontSize: 11, fontWeight: 700, color: C.primary, borderBottom: `1px solid ${C.border}`, paddingBottom: 5, marginBottom: 10 },
  serviceTag:   { backgroundColor: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, padding: '4 8', fontSize: 9, marginBottom: 4, color: C.text },
  tableHeader:  { flexDirection: 'row', backgroundColor: C.surface, borderRadius: 4, padding: '6 8', marginBottom: 2 },
  tableRow:     { flexDirection: 'row', borderBottom: `1px solid ${C.border}`, padding: '7 8' },
  col1:         { flex: 2, fontWeight: 700 },
  col2:         { flex: 3, color: C.muted },
  col3:         { flex: 1, textAlign: 'right', fontWeight: 700, color: C.primary },
  totalBox:     { backgroundColor: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: '12 14', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel:   { fontSize: 9, color: C.muted },
  totalValue:   { fontSize: 16, fontWeight: 700, color: C.primary },
  noteBox:      { backgroundColor: '#fffbeb', border: `1px solid #fde68a`, borderRadius: 4, padding: '8 12', marginTop: 8 },
  noteLabel:    { fontSize: 8, fontWeight: 700, color: '#92400e', marginBottom: 3 },
  noteText:     { fontSize: 8, color: '#374151' },
  notice:       { marginTop: 8, fontSize: 7, color: C.muted },
  footer:       { borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' },
  footerTxt:    { fontSize: 7, color: C.muted },
})

const QuotePdfDoc = ({ quote }: { quote: QuoteData }) => {
  const now = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Seoul' })
  return (
    <Document title={`VISIONC 견적서 — ${quote.clientName}`} author="VISIONC">
      <Page size="A4" style={s.page}>

        {/* Header */}
        <View style={s.header}>
          <Text style={s.brand}>VISIONC</Text>
          <Text style={s.brandSub}>홈페이지 리뉴얼 견적서</Text>
          <View style={s.clientInfo}>
            <Text>발행일: {now}</Text>
            <Text>업체명: {quote.clientName}{quote.contactName ? `  ·  ${quote.contactName} 담당자님` : ''}</Text>
            <Text>이메일: {quote.clientEmail}</Text>
            <Text>URL: {quote.clientUrl}</Text>
          </View>
        </View>

        {/* 제안 서비스 */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>제안 서비스</Text>
          {quote.services.map((svc, i) => (
            <Text key={i} style={s.serviceTag}>· {svc}</Text>
          ))}
        </View>

        {/* 견적 상세 */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>견적 상세</Text>
          <View style={s.tableHeader}>
            <Text style={[s.col1, { fontSize: 8, color: C.muted }]}>항목</Text>
            <Text style={[s.col2, { fontSize: 8, color: C.muted }]}>내용</Text>
            <Text style={[s.col3, { fontSize: 8, color: C.muted }]}>예상 금액</Text>
          </View>
          {quote.breakdown.map((item, i) => (
            <View key={i} style={s.tableRow}>
              <Text style={s.col1}>{item.name}</Text>
              <Text style={s.col2}>{item.description}</Text>
              <Text style={s.col3}>{item.price}</Text>
            </View>
          ))}

          {/* 합계 */}
          <View style={s.totalBox}>
            <Text style={s.totalLabel}>예상 합계 (VAT 별도)</Text>
            <Text style={s.totalValue}>{quote.totalPrice}</Text>
          </View>
        </View>

        {/* 메모 */}
        {quote.note && (
          <View style={s.noteBox}>
            <Text style={s.noteLabel}>추가 안내</Text>
            <Text style={s.noteText}>{quote.note}</Text>
          </View>
        )}

        {/* 안내 문구 */}
        <Text style={s.notice}>
          ※ 본 견적은 예상 비용이며, 실제 작업 범위 확인 후 최종 확정됩니다.{'\n'}
          ※ 부가세(VAT 10%)는 별도입니다.{'\n'}
          ※ 견적 유효기간: 발송일로부터 14일
        </Text>

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerTxt}>VISIONC  ·  visionc.co.kr</Text>
          <Text style={s.footerTxt}>biztalktome@gmail.com</Text>
        </View>
      </Page>
    </Document>
  )
}

export async function generateQuotePdfBuffer(quote: QuoteData): Promise<Buffer> {
  const buffer = await renderToBuffer(<QuotePdfDoc quote={quote} />)
  return Buffer.from(buffer)
}
