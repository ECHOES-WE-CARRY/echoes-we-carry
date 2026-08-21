import io, re, math

SRC = 'c:/Users/Admin/echoes-we-carry/assets/_cand_am_low.svg'
s = io.open(SRC, encoding='utf-8', errors='replace').read()
paths = re.findall(r'<path\s+id="([^"]+)"\s+title="([^"]*)"', s, re.S)
print('paths:', len(paths))

def parse_d(d):
    """Command-aware tokenizer. Returns list of absolute point lists per subpath."""
    toks = re.findall(r'[MmLlHhVvZzCcQqSsTtAa]|-?\d*\.?\d+(?:[eE][-+]?\d+)?', d)
    subpaths = []
    subs = []
    cur = []
    x = y = 0.0
    sx = sy = 0.0
    i = 0
    while i < len(toks):
        t = toks[i]
        if t in 'MmLlHhVvCcQqSsTtAaZz':
            cmd = t
            i += 1
            if cmd in 'Mm':
                vals = []
                while i < len(toks) and not toks[i].isalpha() and toks[i] != 'z' and toks[i] != 'Z':
                    vals.append(float(toks[i])); i += 1
                # could be M followed by implicit L
                j = 0
                while j + 1 < len(vals):
                    nx, ny = (x + vals[j], y + vals[j+1]) if cmd == 'm' else (vals[j], vals[j+1])
                    if j == 0:
                        if cur:
                            subs.append(cur)
                        cur = []
                        sx, sy = nx, ny
                        cur.append((nx, ny))
                        cmd = 'l' if cmd == 'm' else 'L'
                    else:
                        cur.append((nx, ny))
                    x, y = nx, ny
                    j += 2
                continue
            # L/H/V
            argarrays = []
            vals = []
            while i < len(toks) and not toks[i].isalpha() and toks[i] != 'z' and toks[i] != 'Z':
                vals.append(float(toks[i])); i += 1
            if cmd in 'Ll':
                j = 0
                while j + 1 < len(vals):
                    nx, ny = (x + vals[j], y + vals[j+1]) if cmd == 'l' else (vals[j], vals[j+1])
                    cur.append((nx, ny)); x, y = nx, ny
                    j += 2
            elif cmd in 'HhVv':
                rep = 1 if cmd.islower() else 1
                for v in vals:
                    if cmd in 'Hh':
                        nx = x + v if cmd == 'h' else v
                        ny = y
                    else:
                        nx = x
                        ny = y + v if cmd == 'v' else v
                    cur.append((nx, ny)); x, y = nx, ny
            elif cmd in 'CcQq':
                # cubic or quadratic: approximate by end point
                j = 0
                while j + 1 < len(vals):
                    cnt = 6 if cmd in 'Cc' else 4
                    if j >= len(vals) - cnt + 1:
                        break
                    ex, ey = vals[j+cnt-2], vals[j+cnt-1]
                    nx = x + ex if cmd.islower() else ex
                    ny = y + ey if cmd.islower() else ey
                    cur.append((nx, ny)); x, y = nx, ny
                    j += cnt
            elif cmd in 'Zz':
                subs.append(cur)
                cur = []
                x, y = sx, sy
    if cur:
        subs.append(cur)
    return subs

def bbox_subs(subs):
    pts = [p for sub in subs for p in sub]
    x0 = min(p[0] for p in pts) if pts else 0
    y0 = min(p[1] for p in pts) if pts else 0
    x1 = max(p[0] for p in pts) if pts else 0
    y1 = max(p[1] for p in pts) if pts else 0
    return (round(x0,2), round(y0,2), round(x1,2), round(y1,2))

gx0, gy0, gx1, gy1 = 1e9, 1e9, -1e9, -1e9
for pid, title in paths:
    m2 = re.search(r'id="%s" class="[^"]*" d="([^"]*)"' % re.escape(pid), s, re.S)
    if not m2:
        m2 = re.search(r'id="%s"[^>]*?d="([^"]*)"' % re.escape(pid), s, re.S)
    d = m2.group(1)
    subs = parse_d(d)
    b = bbox_subs(subs)
    gx0 = min(gx0, b[0]); gy0 = min(gy0, b[1]); gx1 = max(gx1, b[2]); gy1 = max(gy1, b[3])
    print(pid, title, b, 'nsub:', len(subs))
print('GLOBAL', gx0, gy0, gx1, gy1)