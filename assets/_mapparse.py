import io, re, math

SRC = 'c:/Users/Admin/echoes-we-carry/assets/_cand_am_low.svg'
s = io.open(SRC, encoding='utf-8', errors='replace').read()
paths = re.findall(r'<path\s+id="([^"]+)"\s+title="([^"]*)"[^>]*?\/?>', s, re.S)
print('paths:', len(paths))

TOKEN = re.compile(r'([AaCcHhLlMmQqSsTtVvZz])|(-?\d*\.?\d+(?:[eE][-+]?\d+)?)')

def numlist(d):
    return [float(m.group(2)) for m in TOKEN.finditer(d) if m.group(1) is None]

def bbox_abs(numlist):
    xs, ys = [], []
    for i in range(0, len(numlist)-1, 2):
        xs.append(numlist[i]); ys.append(numlist[i+1])
    return (min(xs), min(ys), max(xs), max(ys))

gx = [] ; gy = []
for pid, title in paths:
    m2 = re.search(r'id="%s"[^>]*?d="([^"]*)"' % re.escape(pid), s, re.S)
    d = m2.group(1)
    p = numlist(d)
    x0,y0,x1,y1 = bbox_abs(p)
    gx += [x0,x1]; gy += [y0,y1]
    if pid == 'IN-JK':
        print('JK bbox', x0,y0,x1,y1, ' coords:', len(p))
print('GLOBAL', min(gx), min(gy), max(gx), max(gy))

# ASCII render of IN-JK outline
m2 = re.search(r'id="IN-JK"[^>]*?d="([^"]*)"', s, re.S)
d = m2.group(1)
n = numlist(d)
xs = n[0::2]; ys = n[1::2]
x0,y0,x1,y1 = min(xs), min(ys), max(xs), max(ys)
cols, rows = 110, 52
g = [[' ']*cols for _ in range(rows)]
for x,y in zip(xs,ys):
    cx = int((x-x0)/(x1-x0)*(cols-1))
    cy = int((y-y0)/(y1-y0)*(rows-1))
    if 0<=cx<cols and 0<=cy<rows:
        g[cy][cx]='#'
for r in g:
    print(''.join(r))