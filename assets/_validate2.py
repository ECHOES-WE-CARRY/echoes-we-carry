import io, re, json, os, sys


ROOT = r'c:\Users\Admin\echoes-we-carry'
SRC = os.path.join(ROOT, 'js', 'cultural-data.js')
MAP = os.path.join(ROOT, 'js', 'india-map-data.js')
OUT = os.path.join(ROOT, 'assets', '_check.txt')

# list js and html files
files = []
for d, _, fs in os.walk(ROOT):
    for f in fs:
        if f.endswith(('.html', '.js')) and not d.endswith('assets'):
            files.append(os.path.join(d, f))
    if 'assets' in d:
        pass

w = io.open(OUT, 'w', encoding='utf-8')
w.write('== project files ==\n')
for f in sorted(files):
    w.write(f + '\n')

# parse profile keys
t = io.open(SRC, encoding='utf-8').read()
s = t.split('var ECHOES_ATLAS = ', 1)[1].rstrip()
j = s[:-1].strip()
j = re.sub(r'/\*.*?\*/', '', j, flags=re.S)
j = re.sub(r'//[^\n]*', '', j)
j = re.sub(r',\s*([}\]])', r'\1', j)
jq = re.sub(r'([{,]\s*)([A-Za-z_]\w*)(\s*:)', r'\1"\2"\3', j)
o = json.loads(jq)
profiles = list(o.keys())

# 14 required sections per profile (structure check ported from the legacy _validate.py)
SECTIONS = ['land','history','architecture','arts','music','dance','dress','beliefs',
            'food','festivals','crafts','heritage','thenNow','wonder']
section_missing = []
for k in profiles:
    miss = [r for r in SECTIONS if r not in o[k].get('profile', {})]
    if miss:
        section_missing.append(k + ':' + ','.join(miss))

# parse map data-state ids
m = io.open(MAP, encoding='utf-8').read()
map_ids = re.findall(r'data-state="([^"]+)"', m)
map_set = set(map_ids)
prof_set = set(profiles)

w.write('\n== profile count: %d ==\n' % len(profiles))
w.write(' '.join(profiles) + '\n')
w.write('\n== map path count: %d ==\n' % len(map_ids))
w.write(' '.join(sorted(map_ids)) + '\n')
w.write('\n== profiles WITHOUT a map path ==\n')
w.write(' '.join(sorted(prof_set - map_set)) + '\n')
w.write('\n== map paths WITHOUT a profile ==\n')
w.write(' '.join(sorted(map_set - prof_set)) + '\n')

# section completeness (14 sections across every profile)
if section_missing:
    w.write('\n== MISSING SECTIONS ==\n')
    w.write(' '.join(section_missing) + '\n')
else:
    w.write('\n== ALL_PROFILE_SECTIONS_OK ==\n')
w.write('\n== done ==\n')
w.close()

# stdout verdict (mirrors _check.txt for terminal/automation) + exit code
ok = (not section_missing) and (not (prof_set - map_set)) and (not (map_set - prof_set))
print('VALID count', len(profiles))
print('ALL_PROFILE_SECTIONS_OK' if not section_missing else 'MISSING_SECTIONS ' + ' '.join(section_missing))
if prof_set - map_set:
    print('PROFILES_WITHOUT_MAP ' + ' '.join(sorted(prof_set - map_set)))
else:
    print('map_coverage: OK')
if map_set - prof_set:
    print('MAP_PATHS_WITHOUT_PROFILE ' + ' '.join(sorted(map_set - prof_set)))
else:
    print('map_paths_have_profile: OK')
sys.exit(0 if ok else 1)

