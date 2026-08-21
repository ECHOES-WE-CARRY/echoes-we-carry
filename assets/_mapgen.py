import re, io, json

SVG = 'c:/Users/Admin/echoes-we-carry/assets/_cand_am_low.svg'
s = io.open(SVG, encoding='utf-8', errors='replace').read()

# collect all path id -> d
paths = re.findall(r'<path\s+id="([^"]+)"\s+title="([^"]*)"[^>]*?d="([^"]*)"', s, re.S)
print('total paths:', len(paths))

def nums(txt):
    # match coordinate pairs: number,number separated by l/m/z etc
    return [float(v) for v in re.findall(r'-?\d+(?:\.\d+)?', txt)]

def bbox(d):
    n = nums(d)
    xs = n[0::2]
    ys = n[1::2]
    return (min(xs), min(ys), max(xs), max(ys))

gxs, gys = [], []
for pid, title, d in paths:
    x0,y0,x1,y1 = bbox(d)
    gxs += [x0,x1]; gys += [y0,y1]
    if pid in ('IN-JK','IN-UP','IN-HP','IN-PB','IN-LD','IN-TN','IN-DD','IN-DN','IN-GJ','IN-RJ'):
        print(pid, title, 'bbox', round(x0,1), round(y0,1), round(x1,1), round(y1,1))

print('GLOBAL bbox x:', min(gxs), max(gxs), ' y:', min(gys), max(gys))

# print the IN-JK path d compactly (convert absolute L commands to coordinate list)
for pid, title, d in paths:
    if pid == 'IN-JK':
        print('JK d head:', d[:1200])
        print('JK d len:', len(d))