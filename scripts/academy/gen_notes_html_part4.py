# -*- coding: utf-8 -*-
"""SLIDES → 스피커노트 HTML (코스1 화이트 에디토리얼 · 박스 노트카드 스타일)."""
import sys, html
sys.path.insert(0, "/home/ubuntu/company/website/scripts/academy")
from buildai_part4_data import SLIDES, TOTAL, META

# 코스1: 흑백, SAY/STORY/Q = 실선 박스 + 칩 라벨, BRIDGE = 점선 + 이탤릭
TAGS = {
    "SAY": "solid", "STORY": "solid", "Q": "solid",
    "DO": "solid", "TIP": "solid", "BRIDGE": "dashed",
}

BLUE_SQ = '<span style="color:#2563EB">■</span>'
AMBER_SQ = '<span style="color:#D97706">■</span>'
def esc(t):
    # 이스케이프 후 2층 마커만 색상 사각형으로 (나머지 이모지는 NotoEmoji가 렌더)
    return html.escape(t).replace("🟦", BLUE_SQ).replace("🟨", AMBER_SQ)

FONT = "file:///home/ubuntu/.fonts/NotoSansKR.ttf"
EMOJI = "file:///home/ubuntu/.fonts/NotoEmoji.ttf"

css = """
@font-face{font-family:'NotoKR';src:url('%s') format('truetype');font-weight:400 800;}
@font-face{font-family:'NotoEmoji';src:url('%s') format('truetype');}
*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
html,body{margin:0;padding:0;font-family:'NotoKR','NotoEmoji',sans-serif;color:#111;}
@page{size:A4;margin:16mm 15mm;}
.cover{height:262mm;display:flex;flex-direction:column;page-break-after:always;position:relative;}
.cover .brand{font-weight:800;letter-spacing:.22em;font-size:13pt;color:#111;margin-top:6mm;}
.cover .mid{margin-top:auto;}
.cover .kick{font-weight:700;letter-spacing:.22em;font-size:11pt;color:#444;}
.cover h1{font-size:30pt;line-height:1.18;margin:5mm 0 0;font-weight:800;letter-spacing:-.01em;}
.cover .sub{font-size:14pt;color:#222;margin-top:6mm;font-weight:600;}
.cover table{margin-top:9mm;border-collapse:collapse;font-size:10.5pt;}
.cover td{padding:1.7mm 0;vertical-align:top;}
.cover td.k{color:#666;width:22mm;font-weight:600;}
.cover td.v{color:#111;font-weight:600;}
.cover td.v b{font-weight:800;}
.cover .foot{margin-top:auto;font-weight:700;letter-spacing:.14em;font-size:8.5pt;color:#666;
  border-top:1px solid #111;padding-top:3mm;}
/* 콘텐츠 페이지 */
.shead{display:flex;justify-content:space-between;align-items:baseline;
  border-bottom:1.6px solid #111;padding-bottom:2mm;margin-bottom:5mm;
  font-size:9.5pt;font-weight:800;letter-spacing:.12em;color:#111;}
.slide{margin-bottom:7mm;}
.sumbox{border:1.4px solid #111;border-radius:3mm;padding:5mm 6mm;page-break-inside:avoid;break-inside:avoid;}
.sumbox .cat{font-size:8.5pt;font-weight:800;letter-spacing:.16em;color:#555;}
.sumbox .htitle{font-size:17pt;font-weight:800;margin:1.5mm 0 1mm;line-height:1.2;}
.sumbox .ssub{font-size:10pt;color:#444;font-weight:600;}
.sumbox .bul{margin:3mm 0 0;padding-left:5mm;}
.sumbox .bul li{font-size:9.5pt;color:#333;margin:.6mm 0;line-height:1.4;}
.time{margin:4mm 0 4mm;font-size:9.5pt;font-weight:700;color:#111;
  border-bottom:1px solid #ddd;padding-bottom:2mm;}
.note{border:1.2px solid #111;border-radius:2.5mm;padding:3.5mm 4.5mm;margin:3mm 0;page-break-inside:avoid;break-inside:avoid;}
.shead{page-break-after:avoid;}
.note.dashed{border-style:dashed;background:#fafafa;}
.note .chip{display:inline-block;border:1.2px solid #111;border-radius:1.5mm;
  font-size:8pt;font-weight:800;letter-spacing:.1em;padding:.6mm 2.2mm;margin-bottom:2.2mm;}
.note .ntext{font-size:10.5pt;line-height:1.62;color:#111;}
.note.dashed .ntext{font-style:italic;color:#333;}
.legend{font-size:8.5pt;color:#666;margin:4mm 0 6mm;line-height:1.5;}
""" % (FONT, EMOJI)

def summary_items(sl):
    """레이아웃에 따라 슬라이드 핵심을 PDF 요약 글머리로 변환."""
    lay = sl.get("lay","bullets")
    items=[]
    if sl.get("bullets"):
        items += [esc(b) for b in sl["bullets"]]
    if lay=="compare":
        items += [f'<b>{esc(t)}</b> ({esc(l)}) — {esc(bd)}' for (l,t,bd,_c) in sl.get("cards",[])]
    elif lay=="stats":
        items += [f'<b>{esc(n)} {esc(l)}</b> — {esc(c)}' for (n,l,c) in sl.get("stats",[])]
    elif lay=="table":
        cols=sl.get("cols",[])
        for r in sl.get("rows",[]):
            cells=" · ".join(f'{esc(c)}' for c in r)
            items.append(cells)
    return items

def slide_html(sl):
    parts=['<div class="slide">']
    parts.append(
        f'<div class="shead"><span>VISIONC · ENT · {esc(sl["lesson"])}</span>'
        f'<span>SLIDE {sl["no"]:02d} / {TOTAL}</span></div>')
    bul="".join(f'<li>{b}</li>' for b in summary_items(sl))
    ssub=f'<div class="ssub">{esc(sl["sub"])}</div>' if sl.get("sub") else ""
    parts.append(
        f'<div class="sumbox"><div class="cat">{esc(sl["cat"])}</div>'
        f'<div class="htitle">{esc(sl["headline"])}</div>{ssub}'
        f'<ul class="bul">{bul}</ul></div>')
    parts.append(f'<div class="time">⏱ {esc(sl["time"])}</div>')
    for tag,text in sl["notes"]:
        style = TAGS.get(tag,"solid")
        cls = "note dashed" if style=="dashed" else "note"
        parts.append(f'<div class="{cls}"><span class="chip">{tag}</span>'
                     f'<div class="ntext">{esc(text)}</div></div>')
    parts.append('</div>')
    return "".join(parts)

cover=f"""
<div class="cover">
  <div class="brand">VISIONC · ENTERPRISE ACADEMY</div>
  <div class="mid">
    <div class="kick">COURSE 02 · {esc(META['part'])} · SPEAKER NOTES</div>
    <h1>{esc(META['part_title'])} — {esc(META['subtitle'])}</h1>
    <div class="sub">{esc(META['lessons'])} (총 120분)</div>
    <table>
      <tr><td class="k">코스</td><td class="v"><b>{esc(META['course'])}</b></td></tr>
      <tr><td class="k">강의</td><td class="v"><b>{esc(META['duration'])}</b></td></tr>
      <tr><td class="k">대상</td><td class="v">{esc(META['audience'])}</td></tr>
      <tr><td class="k">URL</td><td class="v"><b>{esc(META['url'])}</b></td></tr>
      <tr><td class="k">비밀번호</td><td class="v"><b>{esc(META['password'])}</b></td></tr>
      <tr><td class="k">형식</td><td class="v">{esc(META['format'])}</td></tr>
    </table>
  </div>
  <div class="foot">VISIONC ENTERPRISE ACADEMY · INTERNAL SPEAKER GUIDE · build-ai v1 · 2026</div>
</div>
"""

legend=('<div class="legend"><b>표기</b> · '
        'SAY 그대로 말하기 / STORY 사례·맥락 / Q 청중 질문 / DO 실습 / TIP 강사 팁 / '
        'BRIDGE 다음 연결(점선) &nbsp;|&nbsp; '
        '🟦 불변층(근본·영구) · 🟨 가변층(2026.6 예시·업데이트 대상)</div>')

doc=(f'<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>{css}</style></head>'
     f'<body>{cover}{legend}'+"".join(slide_html(sl) for sl in SLIDES)+'</body></html>')

out="/home/ubuntu/company/website/scripts/academy/_buildai_part4_notes.html"
open(out,"w",encoding="utf-8").write(doc)
print("notes.html 저장:", out)
