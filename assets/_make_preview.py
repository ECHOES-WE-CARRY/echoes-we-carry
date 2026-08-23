import io, re

src = io.open('index.html', encoding='utf-8').read()

head_end = src.index('</head>')
head = src[:head_end] + '  <link rel="stylesheet" href="css/_preview5.css" />\n</head>\n'

scripts = re.findall(r'<script[^>]*src="js/[^"]+"[^>]*></script>', src)

start = src.index('<!-- ============ PHASE 5')
end = src.index('</main>')
sections = src[start:end]

drive = '''
<script>
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    function click(sel) { var el = document.querySelector(sel); if (el && el.click) el.click(); }
    if (/[?&]part=carry/.test(location.search)) {
      var st = document.createElement('style');
      st.textContent = '#story{display:none!important}';
      document.head.appendChild(st);
    }
    var mOff = location.search.match(/[?&]off=(\d+)/);
    if (mOff) {
      var st2 = document.createElement('style');
      st2.textContent = 'html{margin-top:-' + mOff[1] + 'px !important}';
      document.head.appendChild(st2);
    }
    click('#bys-begin');
    click('.region-chip[data-id="tn"]');
    var t = document.querySelectorAll('#bys-options-tradition .bys-option'); if (t[0]) t[0].click();
    var c = document.querySelectorAll('#bys-options-craft .bys-option'); if (c[0]) c[0].click();
    var s = document.querySelectorAll('#bys-options-sound .bys-option--sound'); if (s[0]) s[0].click();
    var sy = document.querySelectorAll('#bys-options-story .bys-option'); if (sy[0]) sy[0].click();
    click('[data-next="tradition"]'); click('[data-next="craft"]');
    click('[data-next="sound"]'); click('#bys-seal');
    var mb = document.getElementById('bys-carry-map');
    if (mb && typeof window.ATLAS_INDIA_SVG !== 'undefined') {
      mb.innerHTML = String(window.ATLAS_INDIA_SVG)
        .replace(/<title[^>]*>[\\s\\S]*?<\\/title>/g, '');
      var sv = mb.querySelector('svg');
      if (sv) sv.classList.add('bys-map--thread', 'is-drawn');
    }
    var scene = document.getElementById('bys-carry-scene');
    if (scene) scene.classList.add('is-seen', 'has-logo');
  }, 80);
});
</script>
'''

html = head + '<body id="top">' + sections + \
       '<div id="preview-note">PREVIEW BUILD \u2014 Phase 5 visual harness</div>' + \
       drive + ''.join(scripts) + '</body></html>'

# assets/ lives one level deep — rewrite relative asset paths
html = html.replace('href="css/', 'href="../css/')
html = html.replace('src="js/', 'src="../js/')

io.open('assets/_preview5.html', 'w', encoding='utf-8').write(html)
print('written assets/_preview5.html', len(html))