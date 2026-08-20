# -*- coding: utf-8 -*-
"""Build assets/india-map.svg + js/india-map-data.js from the amCharts base map."""
import io, re, math, os

SRC = 'c:/Users/Admin/echoes-we-carry/assets/_cand_am_low.svg'
OUT_SVG = 'c:/Users/Admin/echoes-we-carry/assets/india-map.svg'
OUT_JS = 'c:/Users/Admin/echoes-we-carry/js/india-map-data.js'

s = io.open(SRC, encoding='utf-8', errors='replace').read()

LEFT, RIGHT = 68.189980, 97.419638
TOP, BOTTOM = 37.053798, 6.746236
X0, X1 = 0.0, 611.92
Y0, Y1 = 101.41, 791.93
MERC = lambda lat: math.log(math.tan(math.pi/4.0 + math.radians(lat)/2.0))
MTOP, MBOT = MERC(TOP), MERC(BOTTOM)

def to_px(lon, lat):
    x = (lon - LEFT) / (RIGHT - LEFT) * (X1 - X0)
    y = Y0 + (MTOP - MERC(lat)) / (MTOP - MBOT) * (Y1 - Y0)
    return (x, y)

TOK = re.compile(r'([MmLlHhVvZzCcQqSsTtAa])|(-?\d*\.?\d+(?:[eE][-+]?\d+)?)')

def subpaths(d):
    toks = []
    for m in TOK.finditer(d):
        if m.group(1):
            toks.append(m.group(1))
        else:
            toks.append(float(m.group(2)))
    subs, cur = [], []
    x = y = sx = sy = 0.0
    i = 0
    while i < len(toks):
        cmd = toks[i]; i += 1
        if cmd in 'MmLl':
            v = []
            while i < len(toks) and not isinstance(toks[i], str):
                v.append(toks[i]); i += 1
            rel = (cmd == 'm')
            j = 0; first = (cmd == 'M' or cmd == 'm')
            while j + 1 < len(v):
                nx = x + v[j] if rel else v[j]
                ny = y + v[j+1] if rel else v[j+1]
                if first:
                    if cur: subs.append(cur)
                    cur = []; sx, sy = nx, ny; first = False
                cur.append((nx, ny)); x, y = nx, ny
                j += 2
        elif cmd in 'HhVv':
            known_count = 0
            while i < len(toks) and not isinstance(toks[i], str):
                val = toks[i]; i += 1
                if cmd in 'Hh':
                    x = x + val if cmd == 'h' else val
                else:
                    y = y + val if cmd == 'v' else val
                cur.append((x, y))
        elif cmd in 'Zz':
            if cur: subs.append(cur)
            cur = []; x, y = sx, sy
        else:
            # A/A C/C Q/Q S/S T/T - not used in this low-res map - skip quietly
            while i < len(toks) and not isinstance(toks[i], str):
                i += 1
    if cur: subs.append(cur)
    return subs

def fmt(v):
    return ('%.2f' % v).rstrip('0').rstrip('.')
# ---------- areas ----------
areas = re.findall(r'<path\s+id="([^"]+)"\s+title="([^"]*)"[^>]*?d="([^"]*)"', s, re.S)
raw = {pid: d for pid, title, d in areas}

MAP_ID = {'AN':'an','AP':'ap','AR':'ar','AS':'as','BR':'br','CH':'ch','CT':'cg',
          'DD':'dd','DL':'dl','DN':'dd','GA':'ga','GJ':'gj','HP':'hp','HR':'hr',
          'JH':'jh','JK':'jk','KA':'ka','KL':'kl','LD':'ld','MH':'mh','ML':'ml',
          'MN':'mn','MP':'mp','MZ':'mz','NL':'nl','OR':'od','PB':'pb','PY':'py',
          'RJ':'rj','SK':'sk','TG':'tg','TN':'tn','TR':'tr','UP':'up','UT':'uk','WB':'wb'}

# ---------- Ladakh derivation ----------
jk_pts = max(subpaths(raw['IN-JK']), key=len)
n = len(jk_pts)
div_geo = [(73.90,34.05),(74.20,34.09),(74.75,33.95),(75.25,33.72),
           (75.85,33.55),(76.45,33.42),(77.05,33.25),(77.65,33.15),(78.15,33.06)]
div = [to_px(lon, lat) for lon, lat in div_geo]

def side(p):
    x, y = p
    if x < div[0][0]:
        (x0, y0), (x1, y1) = div[0], div[1]
    elif x > div[-1][0]:
        (x0, y0), (x1, y1) = div[-2], div[-1]
    else:
        for k in range(len(div)-1):
            (x0, y0), (x1, y1) = div[k], div[k+1]
            if x0 <= x <= x1:
                break
    if x1 == x0:
        return 0.0
    yline = y0 + (y1-y0)*(x-x0)/(x1-x0)
    return yline - y

print('JK bbox', min(p[0] for p in jk_pts), max(p[0] for p in jk_pts), min(p[1] for p in jk_pts), max(p[1] for p in jk_pts))
print('div px', [(round(x,1), round(y,1)) for x, y in div])
print('kanyakumari px', tuple(round(v,1) for v in to_px(77.5, 8.07)))
print('leh px', tuple(round(v,1) for v in to_px(77.58, 34.15)))
sides = [side(p) for p in jk_pts]
print('sides>0:', sum(1 for v in sides if v > 0), 'of', len(sides), 'minmax', round(min(sides),2), round(max(sides),2), 'MTOP MBOT', round(MTOP,4), round(MBOT,4))

def seg_cross(p1, p2):
    d1, d2 = side(p1), side(p2)
    if d1 == 0: return p1
    if d2 == 0: return p2
    if d1*d2 > 0: return None
    if d1 > 0:
        lo, hi = p1, p2
    else:
        lo, hi = p2, p1
    for _ in range(42):
        mid = ((lo[0]+hi[0])/2.0, (lo[1]+hi[1])/2.0)
        dm = side(mid)
        if dm == 0: return mid
        if dm > 0: lo = mid
        else: hi = mid
    return mid

# find every outline edge that straddles the divider, then pick the pair that
# bounds the long northern (Ladakh) arc
crossings = []
for k in range(n):
    pk, pn = jk_pts[k], jk_pts[(k + 1) % n]
    sk, sn = side(pk), side(pn)
    if (sk >= 0 > sn) or (sn >= 0 > sk):
        pt = seg_cross(pk, pn)
        if pt is not None:
            crossings.append((k, pt))
if len(crossings) > 2:
    # keep the two crossings with the largest separation in x
    best = None
    for i1 in range(len(crossings)):
        for i2 in range(i1+1, len(crossings)):
            d = abs(crossings[i1][1][0] - crossings[i2][1][0])
            if best is None or d > best[0]:
                best = (d, i1, i2)
    _, i1, i2 = best
    crossings = [crossings[i1], crossings[i2]]
elif len(crossings) < 2:
    raise SystemExit('Ladakh split failed: found %d crossings' % len(crossings))

cA, cB = crossings[0][1], crossings[1][1]
arc_p = [eq for eq in range(n) for (a, b) in [(crossings[0][0] + 1, crossings[1][0])] if a <= eq <= b]
north_a = crossings[0][0] + 1 if crossings[0][0] < n else 0
chain = [jk_pts[(north_a + q) % n] for q in range(0, len(arc_p) or 1)] if False else None

# decide arc orientation: try each direction and keep the one made of north pts
def make_chain(start, end):
    """outline indices start..end inclusive (mod n)"""
    out = []
    k = start % n
    while True:
        out.append(jk_pts[k])
        if k == end % n: break
        k = (k + 1) % n
    return out

a1, b1 = crossings[0][0] + 1, crossings[1][0]
a2, b2 = crossings[1][0] + 1, crossings[0][0]
chain1 = make_chain(a1, b1)
chain2 = make_chain(a2, b2)
north1 = sum(1 for p in chain1 if side(p) > 0)
north2 = sum(1 for p in chain2 if side(p) > 0)
if north1 >= north2:
    c_in, c_out, chain = crossings[0][1], crossings[1][1], chain1
else:
    c_in, c_out, chain = crossings[1][1], crossings[0][1], chain2
inner = [p for p in div if min(c_in[0], c_out[0]) <= p[0] <= max(c_in[0], c_out[0])]
lad_poly = [c_in] + chain + [c_out] + inner[::-1] + [c_in]
print('crossings', len(crossings), 'chain pts', len(chain), 'north pts in chain', max(north1, north2))

def poly_d(poly):
    return 'M' + 'L'.join('%s,%s' % (fmt(x), fmt(y)) for x, y in poly) + 'Z'

lad_d = poly_d(lad_poly)

# ---------- output svg ----------
# verified global content bbox (from clean parse of all region paths)
gx0, gy0, gx1, gy1 = 0.06, 101.41, 611.92, 791.93
PAD = 8
vw = gx1 - gx0 + 2*PAD; vh = gy1 - gy0 + 2*PAD
vx0, vy0 = gx0 - PAD, gy0 - PAD

regions_out = []
for pid, title, d in areas:
    key = MAP_ID[pid.replace('IN-', '')]
    regions_out.append(
        '<path id="region-%s" class="atlas-region" data-state="%s" d="%s">'
        '<title>%s</title></path>' % (key, key, d.replace('"', "'"), title)
    )
regions_out.append(
    '<path id="region-la" class="atlas-region" data-state="la" d="%s">'
    '<title>Ladakh</title></path>' % lad_d
)

svg = (
    '<!-- Echoes We Carry - Cultural Atlas of India - interactive map -->\n'
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="%s %s %s %s" '
    'role="group" aria-labelledby="atlas-map-title">\n'
    '<title id="atlas-map-title">Interactive map of India</title>\n'
    '%s\n</svg>\n'
) % (fmt(vx0), fmt(vy0), fmt(vw), fmt(vh), '\n'.join(regions_out))

io.open(OUT_SVG, 'w', encoding='utf-8', newline='\n').write(svg)
js = '/* Echoes We Carry - generated map data (embedded for file:// support) */\n'
js += 'window.ATLAS_INDIA_SVG = `' + svg + '`;\n'
io.open(OUT_JS, 'w', encoding='utf-8', newline='\n').write(js)
print('viewBox', vx0-PAD, vy0-PAD, vw, vh)
print('ladakh pts', len(lad_poly), 'lad_d len', len(lad_d))
print('svg bytes', len(svg.encode('utf-8')), 'js bytes', len(js.encode('utf-8')))

# ---- ASCII sanity render: JK outline (#) vs Ladakh polygon (L) ----
cols, rows = 110, 50
l0x = min(q[0] for q in jk_pts); l1x = max(q[0] for q in jk_pts)
l0y = min(q[1] for q in jk_pts); l1y = max(q[1] for q in jk_pts)
g = [[' ']*cols for _ in range(rows)]
def put(px, py, ch):
    cx = int((px-l0x)/(l1x-l0x)*(cols-1)); cy = int((py-l0y)/(l1y-l0y)*(rows-1))
    if 0 <= cx < cols and 0 <= cy < rows: g[cy][cx] = ch
for q in jk_pts: put(q[0], q[1], '#')
for q in lad_poly: put(q[0], q[1], 'L')
for r in g: print(''.join(r))