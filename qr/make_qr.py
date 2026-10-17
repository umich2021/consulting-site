# Makes the business card QR code with segno (offline, no QR service).
# Run: uv run --with segno python qr/make_qr.py
import segno, re
url = "https://consulting.jimsonyang.com"
qr = segno.make(url, error='q', micro=False)
qr.save("qr.svg", border=0, scale=1, dark="#000", light=None, xmldecl=False, svgns=True)
qr.save("qr.png", border=4, scale=20)
s = open("qr.svg").read()
print(qr.version, qr.symbol_size(border=0))
print(len(s))
