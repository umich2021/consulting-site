import sys
d = open(sys.argv[1]).read().strip()
qr = f'<svg viewBox="0 0 33 33" width="150" height="150" shape-rendering="crispEdges"><path d="{d}" stroke="#183A2E" stroke-width="1" fill="none"/></svg>'
css = """
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=Work+Sans:wght@400;500;600&display=swap');
*{box-sizing:border-box}
body{margin:0;font-family:'Work Sans',sans-serif}
.card{width:750px;height:450px;overflow:hidden;page-break-after:always}
"""
front = """<div class="card" id="front" style="background:#183A2E;padding:53px;display:flex;">
<div style="flex-grow:1;border:1.5px solid #C8A464;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:#F2EBDD;">
<div style="font-family:'Playfair Display',serif;font-size:66px;font-weight:500;line-height:1;">Jimson Yang</div>
<div style="display:flex;align-items:center;gap:16px;"><div style="width:40px;height:1.5px;background:#C8A464;"></div>
<div style="font-size:20px;font-weight:600;letter-spacing:6px;color:#C8A464;">CORRINO TECH</div>
<div style="width:40px;height:1.5px;background:#C8A464;"></div></div>
<div style="font-size:18px;letter-spacing:1px;color:#D9D1BF;">Mobile app consulting</div>
</div></div>"""
label = 'font-size:14px;font-weight:600;letter-spacing:2px;color:#6E5E3A;'
back = f"""<div class="card" id="back" style="background:#FAF7F0;display:flex;color:#183A2E;">
<div style="width:89px;flex-shrink:0;padding-left:25px;background:#183A2E;border-right:3px solid #C8A464;display:flex;align-items:center;justify-content:center;">
<div style="writing-mode:vertical-rl;transform:rotate(180deg);font-size:16px;font-weight:600;letter-spacing:6px;color:#C8A464;">CORRINO TECH</div></div>
<div style="flex-grow:1;padding:65px 69px 65px 44px;display:flex;flex-direction:column;justify-content:space-between;">
<div style="display:flex;flex-direction:column;gap:2px;">
<div style="font-family:'Playfair Display',serif;font-size:40px;font-weight:600;line-height:1.05;">Jimson Yang</div>
<div style="font-size:18px;color:#6E5E3A;font-weight:500;">Founder · Mobile app consulting</div></div>
<div style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;">
<div style="display:grid;grid-template-columns:66px auto;row-gap:10px;align-items:baseline;font-size:20px;">
<span style="{label}">TEL</span><span>269-883-0074</span>
<span style="{label}">EMAIL</span><span>jimsonyangbusiness@gmail.com</span>
<span style="{label}">WEB</span><span>consulting.jimsonyang.com</span></div>
<div style="padding:15px;display:flex;margin:-15px;">{qr}</div>
</div></div></div>"""
open('cards.html','w').write(f'<!doctype html><html><head><meta charset="utf-8"><style>{css}</style></head><body>{front}{back}</body></html>')
