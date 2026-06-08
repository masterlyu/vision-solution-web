# -*- coding: utf-8 -*-
"""SLIDES → slides.html (코스1 다크 프리미엄 스타일, 슬라이드당 1280x720 div).
레이아웃은 각 slide dict의 lay 키로 지정: title / bullets / compare / stats / table."""
import sys, html, re
sys.path.insert(0, "/home/ubuntu/company/website/scripts/academy")
from buildai_part3_data import SLIDES, TOTAL, META

def esc(t): return html.escape(t)
def clean(t):  # 다크 슬라이드: 깨지는 이모지 제거 (색상으로 구분)
    for e in ("🟦", "🟨", "⏱", "🏛", "⚠️", "✅", "❌"):
        t = t.replace(e, "")
    return t.strip()

def split_lead(b):
    m = re.search(r"\s(—|=|:|→)\s", b)
    if m:
        return b[:m.start()].strip(), b[m.start():].strip()
    return None, b

CSS = """
@font-face{font-family:'NotoKR';src:url('file:///home/ubuntu/.fonts/NotoSansKR.ttf') format('truetype');font-weight:400 800;}
*{margin:0;padding:0;box-sizing:border-box;-webkit-print-color-adjust:exact;}
body{background:#222;}
.slide{width:1280px;height:720px;position:relative;overflow:hidden;color:#fff;
 font-family:'NotoKR',sans-serif;
 background:radial-gradient(900px 520px at 80% -12%, rgba(141,109,240,.30), transparent 62%),
            radial-gradient(720px 460px at 8% 116%, rgba(70,199,238,.18), transparent 60%),
            #070810;}
.topbar{position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,#8D6DF0,#46C7EE);}
.head{position:absolute;top:30px;left:64px;font-size:13px;letter-spacing:.16em;color:#C7D0DE;font-weight:700;}
.head b{color:#8D6DF0;}
.footl{position:absolute;bottom:30px;left:64px;font-size:12px;letter-spacing:.20em;color:#5C6678;font-weight:700;}
.footr{position:absolute;bottom:30px;right:64px;font-size:12px;letter-spacing:.20em;color:#5C6678;font-weight:700;}
.kicker{color:#46C7EE;letter-spacing:.26em;font-weight:700;font-size:15px;text-transform:uppercase;}

/* 타이틀 슬라이드 */
.t-kick{position:absolute;left:64px;top:150px;}
.t-h1{position:absolute;left:62px;top:196px;right:80px;font-size:70px;font-weight:800;line-height:1.07;letter-spacing:-.01em;}
.t-sub{position:absolute;left:64px;top:430px;right:80px;font-size:23px;color:#C2CAD6;font-weight:500;line-height:1.4;}
.t-meta{position:absolute;left:64px;top:548px;font-size:15px;color:#8C95A5;font-weight:500;}
.t-meta b{color:#E5E9F0;font-weight:700;}
.t-meta .sep{color:#3A4150;margin:0 14px;}

/* 콘텐츠 헤더 */
.c-kick{position:absolute;left:64px;top:148px;}
.c-h1{position:absolute;left:62px;top:182px;right:64px;font-size:48px;font-weight:800;line-height:1.1;letter-spacing:-.01em;}
.c-sub{position:absolute;left:64px;top:256px;font-size:17px;font-weight:700;}
.c-sub.b{color:#7FA6FF;} .c-sub.a{color:#F0B255;} .c-sub.p{color:#46C7EE;}

/* 불릿 */
.bul{position:absolute;left:64px;right:70px;top:330px;}
.bul.nosub{top:300px;}
.bi{display:flex;gap:18px;align-items:flex-start;padding:12px 0;}
.bi+.bi{border-top:1px solid rgba(255,255,255,.07);}
.mk{flex:0 0 auto;width:26px;height:26px;border-radius:8px;margin-top:2px;
    background:linear-gradient(135deg,#8D6DF0,#46C7EE);display:flex;align-items:center;
    justify-content:center;font-size:13px;font-weight:800;color:#0A0A12;}
.bt{font-size:20px;line-height:1.34;color:#D7DEE8;font-weight:500;}
.bt b{color:#fff;font-weight:800;}

/* 2칼럼 비교 */
.cmp{position:absolute;left:64px;right:64px;top:322px;display:flex;gap:26px;}
.cc{flex:1;border:1px solid rgba(255,255,255,.11);border-radius:18px;padding:28px 30px 30px;
    background:rgba(255,255,255,.035);}
.cc .lab{font-size:13px;letter-spacing:.14em;font-weight:800;text-transform:uppercase;}
.cc.cyan .lab{color:#46C7EE;} .cc.purple .lab{color:#9B82FF;}
.cc .ct{font-size:27px;font-weight:800;color:#fff;margin:13px 0 11px;}
.cc .cb{font-size:17px;color:#AEB7C4;line-height:1.5;font-weight:500;}
.arrow{position:absolute;left:50%;top:430px;transform:translateX(-50%);font-size:32px;color:#5C6678;z-index:2;}

/* 4-스탯 */
.stat{position:absolute;left:64px;right:64px;top:330px;display:flex;gap:20px;}
.sc{flex:1;border:1px solid rgba(255,255,255,.10);border-radius:18px;padding:24px 22px 26px;
    background:rgba(255,255,255,.03);}
.sc .num{font-size:50px;font-weight:800;line-height:1;
    background:linear-gradient(135deg,#5EE0FF,#9B82FF);-webkit-background-clip:text;background-clip:text;color:transparent;}
.sc .nlab{font-size:19px;font-weight:800;color:#fff;margin:13px 0 7px;}
.sc .ncap{font-size:14px;color:#9AA4B2;line-height:1.42;font-weight:500;}

/* 표 */
.tbl{position:absolute;left:64px;right:64px;top:322px;border-collapse:separate;border-spacing:0;width:auto;}
.tbl th,.tbl td{text-align:left;padding:13px 18px;font-size:16.5px;}
.tbl th{color:#46C7EE;font-weight:800;font-size:13px;letter-spacing:.08em;text-transform:uppercase;
    border-bottom:1.5px solid rgba(70,199,238,.4);}
.tbl td{color:#D7DEE8;font-weight:500;border-bottom:1px solid rgba(255,255,255,.07);}
.tbl td:first-child{color:#fff;font-weight:800;}
.tbl tr:last-child td{border-bottom:none;}
"""

def fmt_bullet(b):
    if b[:1] in "①②③④⑤✅❌✦":
        mk = b[:1]
        lead, rest = split_lead(b[1:].strip())
    else:
        mk = None
        lead, rest = split_lead(b)
    if lead:
        txt = f'<b>{esc(lead)}</b> {esc(rest)}'
    else:
        txt = esc(rest if mk else b)
    return mk, txt

def title_slide(sl):
    meta = (f'강사 · <b>VISIONC</b><span class="sep">·</span>'
            f'코스 · <b>사내 출강</b><span class="sep">·</span>'
            f'분량 · <b>{esc(sl["time"].split("·")[0].strip())}</b>')
    sub = esc(sl.get("sub","")) or esc(META["subtitle"])
    return f"""
<div class="t-kick kicker">COURSE 02 · {esc(META['part'])} · {esc(sl['lesson'])}</div>
<div class="t-h1">{esc(sl['headline'])}</div>
<div class="t-sub">{sub}</div>
<div class="t-meta">{meta}</div>
"""

def content_header(sl):
    sub = sl.get("sub","")
    cls = "p"
    if "가변" in sub: cls="a"
    elif "불변" in sub: cls="b"
    h = [f'<div class="c-kick kicker">{esc(sl["cat"])}</div>',
         f'<div class="c-h1">{esc(sl["headline"])}</div>']
    if sub:
        h.append(f'<div class="c-sub {cls}">{esc(clean(sub))}</div>')
    return "".join(h)

def bullets_body(sl):
    rows=[]
    for b in sl["bullets"]:
        mk, txt = fmt_bullet(b)
        idx = len(rows)+1
        marker = mk if mk else str(idx)
        rows.append(f'<div class="bi"><div class="mk">{esc(marker)}</div><div class="bt">{txt}</div></div>')
    cls = "bul" + ("" if sl.get("sub") else " nosub")
    return f'<div class="{cls}">' + "".join(rows) + '</div>'

def compare_body(sl):
    cc="".join(
        f'<div class="cc {color}"><div class="lab">{esc(lab)}</div>'
        f'<div class="ct">{esc(title)}</div><div class="cb">{esc(body)}</div></div>'
        for (lab,title,body,color) in sl["cards"])
    return f'<div class="cmp">{cc}</div><div class="arrow">→</div>'

def stats_body(sl):
    sc="".join(
        f'<div class="sc"><div class="num">{esc(num)}</div>'
        f'<div class="nlab">{esc(lab)}</div><div class="ncap">{esc(cap)}</div></div>'
        for (num,lab,cap) in sl["stats"])
    return f'<div class="stat">{sc}</div>'

def table_body(sl):
    th="".join(f'<th>{esc(c)}</th>' for c in sl["cols"])
    trs=""
    for r in sl["rows"]:
        trs+="<tr>"+"".join(f'<td>{esc(c)}</td>' for c in r)+"</tr>"
    return f'<table class="tbl"><thead><tr>{th}</tr></thead><tbody>{trs}</tbody></table>'

BODY = {"compare":compare_body,"stats":stats_body,"table":table_body,"bullets":bullets_body}

def slide_html(sl):
    lay = sl.get("lay","bullets")
    shell = ['<div class="topbar"></div>',
             '<div class="head"><b>●</b> visionc · ENTERPRISE ACADEMY</div>']
    if lay == "title":
        shell.append(title_slide(sl))
        shell.append(f'<div class="footl">{esc(META["part"].upper())} · {esc(META["part_title"])}</div>')
    else:
        shell.append(content_header(sl))
        shell.append(BODY[lay](sl))
        shell.append(f'<div class="footl">{esc(sl["lesson"])} · {esc(sl["cat"].split("·")[0].strip())}</div>')
    shell.append(f'<div class="footr">{sl["no"]:02d} / {TOTAL}</div>')
    return f'<div class="slide" id="s{sl["no"]:02d}">' + "".join(shell) + '</div>'

doc = (f'<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>{CSS}</style></head>'
       f'<body>' + "\n".join(slide_html(sl) for sl in SLIDES) + '</body></html>')

out = "/home/ubuntu/company/website/scripts/academy/_buildai_part3_slides.html"
with open(out,"w",encoding="utf-8") as f: f.write(doc)
print("slides.html 저장:", out, "/", len(SLIDES), "슬라이드")
