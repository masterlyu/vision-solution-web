# -*- coding: utf-8 -*-
"""buildai_part1_data.SLIDES → 스피커노트 HTML (Chromium으로 PDF 인쇄)."""
import sys, html
sys.path.insert(0, "/home/ubuntu/company/website/scripts/academy")
from buildai_part1_data import SLIDES, TOTAL, META

TAG = {
    "SAY":   ("그대로 말하기", "#0E9F9A"),
    "STORY": ("사례 · 맥락",   "#7C3AED"),
    "Q":     ("청중 질문",     "#2563EB"),
    "BRIDGE":("다음 연결",     "#64748B"),
    "DO":    ("실습",          "#D97706"),
    "TIP":   ("강사 팁",       "#DC2626"),
}

def esc(t): return html.escape(t)

FONT = "file:///home/ubuntu/.fonts/NotoSansKR.ttf"

css = """
@font-face { font-family:'NotoKR'; src:url('%s') format('truetype'); font-weight:400 700; }
* { box-sizing:border-box; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
html,body { margin:0; padding:0; font-family:'NotoKR',sans-serif; color:#0F172A; }
@page { size:A4; margin:16mm 14mm; }
.cover { height:265mm; display:flex; flex-direction:column; justify-content:center;
         background:#0B1220; color:#fff; padding:0 18mm; page-break-after:always; }
.cover .brand { color:#0E9F9A; font-weight:700; letter-spacing:.18em; font-size:13pt; }
.cover .course { color:#CBD5E1; font-size:13pt; margin-top:6mm; }
.cover .kicker { color:#0E9F9A; font-weight:700; font-size:22pt; margin-top:14mm; }
.cover h1 { color:#fff; font-size:30pt; line-height:1.25; margin:4mm 0 0; font-weight:700; }
.cover .rule { height:3px; width:60mm; background:#0E9F9A; margin:10mm 0; }
.cover table { color:#E2E8F0; font-size:11.5pt; border-collapse:collapse; }
.cover td { padding:2.4mm 0; vertical-align:top; }
.cover td.k { color:#0E9F9A; font-weight:700; width:26mm; }
.slide { page-break-inside:avoid; padding:0 0 7mm; margin-bottom:7mm; border-bottom:1px solid #E2E8F0; }
.slide:last-child { border-bottom:none; }
.shead { display:flex; justify-content:space-between; align-items:baseline;
         font-size:9.5pt; color:#64748B; font-weight:700; letter-spacing:.04em; }
.cat { color:#0E9F9A; }
.htitle { font-size:18pt; font-weight:700; margin:2mm 0 1mm; line-height:1.25; }
.sub { font-size:10.5pt; font-weight:700; margin-bottom:2mm; }
.sub.b { color:#2563EB; } .sub.a { color:#D97706; } .sub.p { color:#0E9F9A; }
.bul { margin:1mm 0 3mm; padding:0; }
.bul li { font-size:10.5pt; color:#1E293B; margin:.8mm 0; }
.time { display:inline-block; font-size:9pt; font-weight:700; color:#0E9F9A;
        background:#0E9F9A14; border:1px solid #0E9F9A33; border-radius:99px; padding:1mm 3mm; margin-bottom:2.5mm; }
.note { display:flex; gap:3mm; margin:2.2mm 0; }
.lab { flex:0 0 26mm; }
.lab .t { display:inline-block; font-size:8.5pt; font-weight:700; color:#fff; border-radius:4px; padding:.6mm 2mm; }
.lab .sub2 { display:block; font-size:7.5pt; color:#94A3B8; margin-top:1mm; }
.ntext { flex:1; font-size:10.5pt; line-height:1.6; color:#0F172A; }
.legend { font-size:9pt; color:#64748B; margin:3mm 0 6mm; }
""" % FONT


def slide_html(sl):
    sub_cls = "p"
    if sl.get("sub"):
        if "가변" in sl["sub"]: sub_cls = "a"
        elif "불변" in sl["sub"]: sub_cls = "b"
    parts = [f'<div class="slide">']
    parts.append(
        f'<div class="shead"><span><span class="cat">{esc(sl["cat"])}</span></span>'
        f'<span>{esc(META["part"])} · SLIDE {sl["no"]:02d} / {TOTAL}</span></div>')
    parts.append(f'<div class="htitle">{esc(sl["headline"])}</div>')
    if sl.get("sub"):
        parts.append(f'<div class="sub {sub_cls}">{esc(sl["sub"])}</div>')
    parts.append('<ul class="bul">' + "".join(f'<li>{esc(b)}</li>' for b in sl["bullets"]) + '</ul>')
    parts.append(f'<div class="time">⏱ {esc(sl["time"])}</div>')
    for tag, text in sl["notes"]:
        label, color = TAG.get(tag, (tag, "#334155"))
        parts.append(
            f'<div class="note"><div class="lab">'
            f'<span class="t" style="background:{color}">{tag}</span>'
            f'<span class="sub2">{esc(label)}</span></div>'
            f'<div class="ntext">{esc(text)}</div></div>')
    parts.append('</div>')
    return "".join(parts)


cover = f"""
<div class="cover">
  <div class="brand">VISIONC · ENTERPRISE ACADEMY</div>
  <div class="course">{esc(META['course'])}</div>
  <div class="kicker">{esc(META['part'])} · {esc(META['part_title'])} · SPEAKER NOTES</div>
  <h1>{esc(META['subtitle'])}</h1>
  <div class="rule"></div>
  <table>
    <tr><td class="k">강의</td><td>{esc(META['lessons'])}</td></tr>
    <tr><td class="k">시간</td><td>{esc(META['duration'])}</td></tr>
    <tr><td class="k">대상</td><td>{esc(META['audience'])}</td></tr>
    <tr><td class="k">형식</td><td>{esc(META['format'])}</td></tr>
    <tr><td class="k">URL</td><td>{esc(META['url'])}</td></tr>
    <tr><td class="k">비밀번호</td><td>{esc(META['password'])}</td></tr>
  </table>
</div>
"""

legend = ('<div class="legend">표기 · '
          'SAY 그대로 말하기 / STORY 사례·맥락 / Q 청중 질문 / '
          'BRIDGE 다음 연결 / DO 실습 / TIP 강사 팁 &nbsp;|&nbsp; '
          '🟦 불변층(근본·영구) · 🟨 가변층(2026.6 예시·업데이트 대상)</div>')

doc = (f'<!doctype html><html lang="ko"><head><meta charset="utf-8">'
       f'<style>{css}</style></head><body>'
       f'{cover}{legend}' + "".join(slide_html(sl) for sl in SLIDES) +
       '</body></html>')

out = "/home/ubuntu/company/website/scripts/academy/_buildai_part1_notes.html"
with open(out, "w", encoding="utf-8") as f:
    f.write(doc)
print("HTML 저장:", out, "/ 슬라이드", len(SLIDES), "+ 표지")
