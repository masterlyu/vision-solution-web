# -*- coding: utf-8 -*-
"""SLIDES → slides.html (코스1 다크 프리미엄 스타일, 슬라이드당 1280x720 div)."""
import sys, html, re
sys.path.insert(0, "/home/ubuntu/company/website/scripts/academy")
from buildai_part1_data import SLIDES, TOTAL, META

def esc(t): return html.escape(t)
def clean(t):  # 다크 슬라이드: 깨지는 이모지 제거 (색상으로 구분)
    for e in ("🟦", "🟨", "⏱", "🏛", "⚠️", "✅", "❌"):
        t = t.replace(e, "")
    return t.strip()

# 2칼럼 비교 슬라이드 (코스1 BEFORE/AFTER 스타일)
COMPARE = {
    3: [("클라우드 API", "지능을 빌린다", "질문할 때마다 요금. 내 질문(=회사 데이터)이 그 두뇌에게 전달된다.", "cyan"),
        ("온프레미스", "지능을 소유한다", "초기 비용·관리 부담. 그러나 아무도 내 생각을 들여다보지 못한다.", "purple")],
    6: [("택시 · 클라우드", "편하고 초기비용 0", "그러나 탈 때마다 요금, 기사가 내 목적지(=의도·데이터)를 안다.", "cyan"),
        ("자가용 · 온프레미스", "차값·정비 부담", "그러나 내 차·내 통제. 아무도 내 동선을 모른다.", "purple")],
    10:[("자체 구축으로", "민감·상시 업무", "고객정보·계약·설계 — 절대 밖으로 나가면 안 되는 것.", "purple"),
        ("클라우드로", "가끔·비민감·최고성능", "일상 업무·아이디어 — 최고 모델을 빌려 쓴다.", "cyan")],
}
# 4-스탯 슬라이드 (코스1 73%/29% 스타일)
STATS = {
    5: [("①", "의존성", "모든 외주엔 보이지 않는 비용이 있다"),
        ("②", "비가역성", "데이터는 한 번 나가면 못 되찾는다"),
        ("③", "정체성", "통제권의 가치는 회사가 정한다"),
        ("✦", "불변", "도구가 바뀌어도 이 셋은 그대로")],
    9: [("①", "주권", "데이터가 밖으로 나가도 되는가"),
        ("②", "규모", "월 사용량이 손익분기를 넘는가"),
        ("③", "민감도", "개인정보·국외이전 대상인가"),
        ("④·⑤", "역량·연속성", "운영 인력 있는가 / 끊겨도 버티는가")],
    14:[("0–6", "씨앗", "1개 부서·1개 업무·측정"),
        ("6–12", "뿌리", "수평 확장·사내 챗봇/RAG·거버넌스"),
        ("12–24", "숲", "에이전트·자체 호스팅·보안/감사"),
        ("∞", "불변", "작게 증명 → 넓게 정착 → 깊게 자동화")],
}

def is_title(sl): return "TITLE" in sl["cat"]

def split_lead(b):
    # 글머리 앞부분을 굵게 (— : = → 앞). rest는 구분자 포함 유지.
    m = re.search(r"\s(—|=|:|→)\s", b)
    if m:
        return b[:m.start()].strip(), b[m.start():].strip()
    # ①②③ ✅ ❌ 머리표는 그대로
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
.em{background:linear-gradient(90deg,#5EE0FF,#9B82FF);-webkit-background-clip:text;background-clip:text;color:transparent;}
.body{position:absolute;left:64px;right:64px;}

/* 타이틀 슬라이드 */
.t-kick{position:absolute;left:64px;top:150px;}
.t-h1{position:absolute;left:62px;top:196px;font-size:74px;font-weight:800;line-height:1.06;letter-spacing:-.01em;}
.t-sub{position:absolute;left:64px;top:430px;right:80px;font-size:23px;color:#C2CAD6;font-weight:500;line-height:1.4;}
.t-meta{position:absolute;left:64px;top:540px;font-size:15px;color:#8C95A5;font-weight:500;}
.t-meta b{color:#E5E9F0;font-weight:700;}
.t-meta .sep{color:#3A4150;margin:0 14px;}

/* 콘텐츠 헤더 */
.c-kick{position:absolute;left:64px;top:150px;}
.c-h1{position:absolute;left:62px;top:184px;right:64px;font-size:50px;font-weight:800;line-height:1.1;letter-spacing:-.01em;}
.c-sub{position:absolute;left:64px;top:262px;font-size:17px;font-weight:700;}
.c-sub.b{color:#7FA6FF;} .c-sub.a{color:#F0B255;} .c-sub.p{color:#46C7EE;}

/* 불릿 리스트 */
.bul{position:absolute;left:64px;right:70px;top:330px;}
.bul.nosub{top:300px;}
.bi{display:flex;gap:18px;align-items:flex-start;padding:13px 0;}
.bi+.bi{border-top:1px solid rgba(255,255,255,.07);}
.mk{flex:0 0 auto;width:26px;height:26px;border-radius:8px;margin-top:2px;
    background:linear-gradient(135deg,#8D6DF0,#46C7EE);display:flex;align-items:center;
    justify-content:center;font-size:13px;font-weight:800;color:#0A0A12;}
.bt{font-size:21px;line-height:1.35;color:#D7DEE8;font-weight:500;}
.bt b{color:#fff;font-weight:800;}

/* 2칼럼 비교 카드 */
.cmp{position:absolute;left:64px;right:64px;top:320px;display:flex;gap:26px;}
.cc{flex:1;border:1px solid rgba(255,255,255,.11);border-radius:18px;padding:30px 30px 32px;
    background:rgba(255,255,255,.035);}
.cc .lab{font-size:13px;letter-spacing:.16em;font-weight:800;text-transform:uppercase;}
.cc.cyan .lab{color:#46C7EE;} .cc.purple .lab{color:#9B82FF;}
.cc .ct{font-size:28px;font-weight:800;color:#fff;margin:14px 0 12px;}
.cc .cb{font-size:18px;color:#AEB7C4;line-height:1.5;font-weight:500;}
.arrow{position:absolute;left:50%;top:430px;transform:translateX(-50%);font-size:34px;color:#5C6678;z-index:2;}

/* 4-스탯 그리드 */
.stat{position:absolute;left:64px;right:64px;top:330px;display:flex;gap:20px;}
.sc{flex:1;border:1px solid rgba(255,255,255,.10);border-radius:18px;padding:26px 24px 28px;
    background:rgba(255,255,255,.03);}
.sc .num{font-size:54px;font-weight:800;line-height:1;
    background:linear-gradient(135deg,#5EE0FF,#9B82FF);-webkit-background-clip:text;background-clip:text;color:transparent;}
.sc .nlab{font-size:20px;font-weight:800;color:#fff;margin:14px 0 8px;}
.sc .ncap{font-size:14.5px;color:#9AA4B2;line-height:1.45;font-weight:500;}

/* 강조 콜아웃 바 */
.callout{position:absolute;left:64px;right:64px;bottom:96px;border:1px solid rgba(141,109,240,.45);
    border-radius:16px;padding:22px 28px;background:linear-gradient(90deg,rgba(141,109,240,.16),rgba(70,199,238,.07));
    font-size:20px;font-weight:700;color:#EAE8FF;}
.callout b{color:#fff;}
"""

def title_slide(sl):
    meta = (f'강사 · <b>VISIONC</b><span class="sep">·</span>'
            f'코스 · <b>사내 출강</b><span class="sep">·</span>'
            f'분량 · <b>{esc(sl["time"].split("·")[0].strip())}</b>')
    sub = esc(sl.get("sub","")) or esc(META["subtitle"])
    return f"""
<div class="topbar"></div>
<div class="head"><b>●</b> visionc · ENTERPRISE ACADEMY</div>
<div class="t-kick kicker">COURSE 02 · {esc(META['part'])} · {esc(sl['lesson'])}</div>
<div class="t-h1">{render_headline(sl['headline'])}</div>
<div class="t-sub">{sub}</div>
<div class="t-meta">{meta}</div>
<div class="footl">{esc(META['part'].upper())} · {esc(META['part_title'])}</div>
<div class="footr">{sl['no']:02d} / {TOTAL}</div>
"""

def render_headline(h):
    # 마지막 어절 또는 따옴표 강조어를 em 처리하지 않고, 그대로. (가독 우선)
    return esc(h)

def content_header(sl):
    sub_cls = "p"
    sub = sl.get("sub","")
    if "가변" in sub: sub_cls="a"
    elif "불변" in sub: sub_cls="b"
    cat = esc(sl["cat"])
    parts = [
        '<div class="topbar"></div>',
        '<div class="head"><b>●</b> visionc · ENTERPRISE ACADEMY</div>',
        f'<div class="c-kick kicker">{cat}</div>',
        f'<div class="c-h1">{esc(sl["headline"])}</div>',
    ]
    if sub:
        parts.append(f'<div class="c-sub {sub_cls}">{esc(clean(sub))}</div>')
    parts.append(f'<div class="footl">{esc(sl["lesson"])} · {cat.split("·")[0].strip()}</div>')
    parts.append(f'<div class="footr">{sl["no"]:02d} / {TOTAL}</div>')
    return "".join(parts), bool(sub)

def bullets_body(sl, has_sub):
    rows=[]
    for i,b in enumerate(sl["bullets"],1):
        lead, rest = split_lead(b)
        mk = str(i)
        if b[:1] in "①②③④⑤✅❌✦":
            mk = b[:1]
            lead, rest = split_lead(b[1:].strip())
        if lead:
            txt = f'<b>{esc(lead)}</b> {esc(rest)}'
        else:
            txt = esc(b if mk.isdigit() else b[1:].strip())
        rows.append(f'<div class="bi"><div class="mk">{esc(mk)}</div><div class="bt">{txt}</div></div>')
    cls = "bul" + ("" if has_sub else " nosub")
    return f'<div class="{cls}">' + "".join(rows) + '</div>'

def compare_body(cards):
    cc="".join(
        f'<div class="cc {color}"><div class="lab">{esc(lab)}</div>'
        f'<div class="ct">{esc(title)}</div><div class="cb">{esc(body)}</div></div>'
        for (lab,title,body,color) in cards)
    return f'<div class="cmp">{cc}</div><div class="arrow">→</div>'

def stats_body(cards):
    sc="".join(
        f'<div class="sc"><div class="num">{esc(num)}</div>'
        f'<div class="nlab">{esc(lab)}</div><div class="ncap">{esc(cap)}</div></div>'
        for (num,lab,cap) in cards)
    return f'<div class="stat">{sc}</div>'

def slide_html(sl):
    if is_title(sl):
        inner = title_slide(sl)
    elif sl["no"] in COMPARE:
        hdr,_ = content_header(sl); inner = hdr + compare_body(COMPARE[sl["no"]])
    elif sl["no"] in STATS:
        hdr,_ = content_header(sl); inner = hdr + stats_body(STATS[sl["no"]])
    else:
        hdr,has_sub = content_header(sl); inner = hdr + bullets_body(sl, has_sub)
    return f'<div class="slide" id="s{sl["no"]:02d}">{inner}</div>'

doc = (f'<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>{CSS}</style></head>'
       f'<body>' + "\n".join(slide_html(sl) for sl in SLIDES) + '</body></html>')

out = "/home/ubuntu/company/website/scripts/academy/_buildai_part1_slides.html"
with open(out,"w",encoding="utf-8") as f: f.write(doc)
print("slides.html 저장:", out, "/", len(SLIDES), "슬라이드")
