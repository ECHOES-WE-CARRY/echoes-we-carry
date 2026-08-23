import re, sys

def check_brackets(path):
    s = open(path, encoding='utf-8').read()
    s = re.sub(r'/\*.*?\*/', '', s, flags=re.S)
    if not path.endswith('.css'):
        s = re.sub(r'//[^\n]*', '', s)
    # strip strings (single, double, template)
    s = re.sub(r'"(?:\\.|[^"\\\n])*"', '""', s)
    s = re.sub(r"'(?:\\.|[^'\\\n])*'", "''", s)
    s = re.sub(r'`(?:\\.|[^`\\])*`', '``', s)

    pairs = {'(': ')', '[': ']', '{': '}'}
    stack = []
    line = 1
    ok = True
    i = 0
    while i < len(s):
        ch = s[i]
        if ch == '\n':
            line += 1
            i += 1
            continue
        if ch in pairs:
            stack.append((ch, line))
        elif ch in pairs.values():
            if not stack or pairs[stack[-1][0]] != ch:
                print(f'MISMATCH {ch!r} at line {line} in {path}')
                ok = False
                break
            stack.pop()
        i += 1
    if ok and stack:
        print(f'unbalanced in {path}, trailing openers:')
        for item in stack[-8:]:
            print('   ', item)
        ok = False
    if ok:
        print(f'OK   {path}')

if __name__ == '__main__':
    for p in sys.argv[1:]:
        check_brackets(p)
