/* ==========================================================================
   ECHOES WE CARRY — PHASE 4 INTERACTIVITY
   1. Heritage of India — layered interactive map + story panels
   2. Culture at Risk — scroll journey, expandable cards, sliders
   Vanilla ES5 mirroring main.js/atlas.js conventions. Consumes
   js/heritage-data.js globals; reuses ATLAS_INDIA_SVG + ECHOES_ATLAS names.
   Touches only its own scoped DOM ids/classes.
   ========================================================================== */
(function () {
  'use strict';

  if (typeof window.ECHOES_HERITAGE === 'undefined') return;

  var HD = window.ECHOES_HERITAGE;
  var RK = window.ECHOES_RISK || null;
  var ATLAS_NAMES = window.ECHOES_ATLAS || {};
  var doc = document;
  var reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- utils (mirror main.js / atlas.js) ---- */
  function qs(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function on(el, type, fn, opts) { if (el) el.addEventListener(type, fn, opts || false); }
  function esc(s) {
    if (s == null) return '';
    var d = doc.createElement('div');
    d.textContent = String(s);
    return d.innerHTML;
  }

  function stateName(id) {
    return (ATLAS_NAMES[id] && ATLAS_NAMES[id].name) || String(id || '').toUpperCase();
  }

  /* ---- layer metadata ---- */
  var CAT_META = [
    { key: 'all', label: 'All Layers' },
    { key: 'monument', label: '\uD83C\uDFDB Monuments' },
    { key: 'unesco', label: '\uD83D\uDFE1 UNESCO' },
    { key: 'natural', label: '\uD83C\uDF3F Natural Heritage' },
    { key: 'living', label: '\uD83C\uDFAD Living Traditions' },
    { key: 'historic', label: '\uD83C\uDFFA Historical Sites' }
  ];
  function catLabel(key) {
    for (var i = 0; i < CAT_META.length; i++) {
      if (CAT_META[i].key === key) return CAT_META[i].label.replace(/^[^\s]+\s/, '');
    }
    return key;
  }

  /* stylised gradient plates used as image placeholders (no photos shipped) */
  var ART = [
    'radial-gradient(circle at 30% 28%, rgba(232,189,85,.5), transparent 48%), linear-gradient(135deg,#1b1f3b,#2a2f5c)',
    'radial-gradient(circle at 68% 30%, rgba(217,122,88,.45), transparent 48%), linear-gradient(135deg,#7a3a26,#b25539)',
    'radial-gradient(circle at 32% 62%, rgba(127,174,131,.45), transparent 48%), linear-gradient(135deg,#23342a,#4c6b4f)',
    'radial-gradient(circle at 58% 40%, rgba(169,139,208,.4), transparent 48%), linear-gradient(135deg,#2f2637,#4a2230)',
    'radial-gradient(circle at 40% 30%, rgba(243,220,154,.42), transparent 48%), linear-gradient(135deg,#45321f,#7c5a2e)',
    'radial-gradient(circle at 64% 64%, rgba(232,189,85,.38), transparent 48%), linear-gradient(135deg,#191430,#2a2f5c)',
    'radial-gradient(circle at 36% 36%, rgba(217,122,88,.4), transparent 48%), linear-gradient(135deg,#4a2230,#6b2a3e)',
    'radial-gradient(circle at 50% 58%, rgba(127,174,131,.35), transparent 48%), linear-gradient(135deg,#1f3a2c,#2a1a33)'
  ];

  /* percent position of lon/lat inside the SVG viewBox */
  function posPct(lon, lat) {
    var p = HD.project(lon, lat);
    return {
      x: ((p.x - HD.view.x) / HD.view.w) * 100,
      y: ((p.y - HD.view.y) / HD.view.h) * 100
    };
  }

  /* ======================= 1. HERITAGE MAP ================================ */
  var H = {
    root: null, wrap: null, world: null, marksBox: null, panel: null,
    tip: null, live: null, searchEl: null, filtersBox: null,
    filter: 'all', term: '', selected: null,
    zoom: 1, tx: 0, ty: 0,
    byId: {}, routesDrawn: false
  };

  function buildSitesIndex() {
    (HD.sites || []).forEach(function (s) { H.byId[s.id] = s; });
  }

  function injectBaseMap(world) {
    var box = qs('.hmap-basemap', world);
    if (!box || typeof window.ATLAS_INDIA_SVG === 'undefined') return false;
    box.innerHTML = String(window.ATLAS_INDIA_SVG)
      .replace(/\s+(?:id|aria-labelledby)="[^"]*"/g, '');
    var svgEl = qs('svg', box);
    if (svgEl) {
      svgEl.setAttribute('aria-hidden', 'true');
      svgEl.setAttribute('focusable', 'false');
    }
    return true;
  }

  function buildMarkers(marksBox) {
    var html = [];
    (HD.sites || []).forEach(function (s, i) {
      var pct = posPct(s.lng, s.lat);
      html.push(
        '<button type="button" class="hm-mark" data-cat="' + esc(s.cat) + '" data-site="' + esc(s.id) + '"' +
        ' style="--mx:' + pct.x.toFixed(3) + '%;--my:' + pct.y.toFixed(3) + '%;--pulse-delay:' + ((i % 7) * 0.4).toFixed(1) + 's"' +
        ' aria-label="' + esc(s.name) + ', ' + esc(catLabel(s.cat)) +
        (s.unesco ? ', UNESCO World Heritage' : '') + '. Press for details.">' +
        '<span class="hm-mark__ring" aria-hidden="true"></span>' +
        '<span class="hm-mark__dot" aria-hidden="true"></span></button>'
      );
    });
    marksBox.innerHTML = html.join('');
    qsa('.hm-mark', marksBox).forEach(function (btn) {
      var id = btn.getAttribute('data-site');
      on(btn, 'mouseenter', function (e) { showTip(id, e); });
      on(btn, 'mouseleave', hideTip);
      on(btn, 'blur', hideTip);
      on(btn, 'focus', function () {
        var r = btn.getBoundingClientRect();
        showTip(id, { clientX: r.left + r.width / 2, clientY: r.top });
      });
      on(btn, 'click', function () { selectSite(id); });
    });
  }

  function routePath(stops) {
    var pts = [];
    (stops || []).forEach(function (id) {
      var s = H.byId[id];
      if (s) pts.push(HD.project(s.lng, s.lat));
    });
    if (pts.length < 2) return '';
    var d = 'M' + pts[0].x.toFixed(1) + ',' + pts[0].y.toFixed(1);
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1], b = pts[i];
      var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      var dx = b.x - a.x, dy = b.y - a.y;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      var bend = (i % 2 ? 0.16 : -0.16) * len;
      d += ' Q' + (mx - dy / len * bend).toFixed(1) + ',' + (my + dx / len * bend).toFixed(1) +
           ' ' + b.x.toFixed(1) + ',' + b.y.toFixed(1);
    }
    return d;
  }

  function buildRoutes(world) {
    var NS = 'http://www.w3.org/2000/svg';
    var svgEl = doc.createElementNS(NS, 'svg');
    svgEl.setAttribute('class', 'hm-routes');
    svgEl.setAttribute('viewBox', HD.view.x + ' ' + HD.view.y + ' ' + HD.view.w + ' ' + HD.view.h);
    svgEl.setAttribute('aria-hidden', 'true');
    svgEl.setAttribute('focusable', 'false');
    var defs = doc.createElementNS(NS, 'defs');
    var grad = doc.createElementNS(NS, 'linearGradient');
    grad.setAttribute('id', 'hmRouteGrad');
    grad.setAttribute('x1', '0'); grad.setAttribute('y1', '0');
    grad.setAttribute('x2', '1'); grad.setAttribute('y2', '1');
    [['0%', '#f3dc9a'], ['50%', '#ddb65f'], ['100%', '#d97a58']].forEach(function (stop) {
      var st = doc.createElementNS(NS, 'stop');
      st.setAttribute('offset', stop[0]);
      st.setAttribute('stop-color', stop[1]);
      grad.appendChild(st);
    });
    defs.appendChild(grad);
    svgEl.appendChild(defs);
    (HD.trails || []).forEach(function (t, i) {
      var d = routePath(t.stops);
      if (!d) return;
      var p = doc.createElementNS(NS, 'path');
      p.setAttribute('d', d);
      p.setAttribute('class', 'hm-route');
      p.setAttribute('data-trail', t.key);
      p.style.transitionDelay = (i * 260) + 'ms';
      svgEl.appendChild(p);
    });
    world.appendChild(svgEl);
  }

  /* ---- cursor-following preview card ---- */
  function initTip(wrap) {
    if (window.matchMedia('(hover: none)').matches) return;
    H.tip = doc.createElement('div');
    H.tip.className = 'hm-tip';
    H.tip.setAttribute('aria-hidden', 'true');
    doc.body.appendChild(H.tip);
    on(wrap, 'mousemove', placeTip);
  }

  function placeTip(e) {
    if (!H.tip || !H.tip.classList.contains('is-on')) return;
    var x = e.clientX + 16, y = e.clientY + 16;
    if (x + 280 > doc.documentElement.clientWidth) x = e.clientX - 296;
    if (y + 190 > window.innerHeight) y = e.clientY - 196;
    H.tip.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  }

  function showTip(id, e) {
    var s = H.byId[id];
    if (!s || !H.tip) return;
    H.tip.innerHTML =
      '<span class="hm-tip__strip" style="background:' + ART[(s.art || 0) % ART.length] + '"></span>' +
      '<strong class="hm-tip__name">' + esc(s.name) + '</strong>' +
      '<em class="hm-tip__type">' + esc(catLabel(s.cat)) + (s.unesco ? ' \u00b7 UNESCO WHS' : '') + '</em>' +
      '<span class="hm-tip__place">' + esc(s.place) + ', ' + esc(stateName(s.st)) + '</span>' +
      '<span class="hm-tip__hint">Click for the story</span>';
    H.tip.classList.add('is-on');
    if (e && e.clientX != null) placeTip(e);
  }

  function hideTip() { if (H.tip) H.tip.classList.remove('is-on'); }

  /* ---- filters + search ----------------------------------------------------- */
  function applyFilters() {
    var term = H.term.toLowerCase();
    qsa('.hm-mark', H.marksBox).forEach(function (btn) {
      var s = H.byId[btn.getAttribute('data-site')];
      if (!s) return;
      var passCat = H.filter === 'all' ||
        (H.filter === 'unesco' ? !!s.unesco : s.cat === H.filter);
      var hay = (s.name + ' ' + s.place + ' ' + stateName(s.st)).toLowerCase();
      var passTerm = !term || hay.indexOf(term) !== -1;
      btn.classList.toggle('is-off', !(passCat && passTerm));
    });
    /* routes dim when any endpoint is filtered away */
    qsa('.hm-route', H.world).forEach(function (route) {
      var key = route.getAttribute('data-trail');
      var trail = null;
      (HD.trails || []).forEach(function (t) { if (t.key === key) trail = t; });
      if (!trail) return;
      var allVisible = trail.stops.every(function (id) {
        var b = qs('.hm-mark[data-site="' + id + '"]', H.marksBox);
        return b && !b.classList.contains('is-off');
      });
      route.classList.toggle('is-dimmed', !allVisible);
    });
    updateLegendCounts();
  }

  function setFilter(key) {
    H.filter = key;
    qsa('.p4-filter', H.filtersBox).forEach(function (b) {
      var active = b.getAttribute('data-filter') === key;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    applyFilters();
    announce('Layer: ' + keyLabel(key) + '.');
  }

  function keyLabel(key) {
    for (var i = 0; i < CAT_META.length; i++) {
      if (CAT_META[i].key === key) return CAT_META[i].label;
    }
    return key;
  }

  function buildFilterBar() {
    if (!H.filtersBox) return;
    var html = [];
    CAT_META.forEach(function (c, i) {
      html.push('<button type="button" class="p4-filter' + (i === 0 ? ' is-active' : '') +
        '" data-filter="' + c.key + '" aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' +
        esc(c.label) + '</button>');
    });
    H.filtersBox.innerHTML = html.join('');
    qsa('.p4-filter', H.filtersBox).forEach(function (b) {
      on(b, 'click', function () { setFilter(b.getAttribute('data-filter')); });
    });
  }

  function bindSearch() {
    if (!H.searchEl) return;
    var timer;
    on(H.searchEl, 'input', function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        H.term = H.searchEl.value.trim();
        applyFilters();
      }, 160);
    });
  }

  function updateLegendCounts() {
    var counts = { all: 0, monument: 0, historic: 0, natural: 0, living: 0 };
    var unesco = 0;
    (HD.sites || []).forEach(function (s) {
      counts.all++;
      if (s.unesco) unesco++;
      counts[s.cat]++;
    });
    qsa('[data-count-for]', H.root).forEach(function (el) {
      var k = el.getAttribute('data-count-for');
      el.textContent = k === 'unesco' ? String(unesco) : String(counts[k] || 0);
    });
  }

/* ---- selection + story panel ---------------------------------------------- */
  function selectSite(id) {
    var s = H.byId[id];
    if (!s) return;
    if (H.selected === id) return;
    H.selected = id;
    qsa('.hm-mark', H.marksBox).forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-site') === id);
    });
    renderProfile(s);
    announce(s.name + ', ' + catLabel(s.cat) + '. Details shown in the panel.');
  }

  function renderProfile(s) {
    if (!H.panel) return;
    var h = [];
    h.push('<article class="hprofile">');
    h.push('<div class="hprofile__art" style="background:' + ART[(s.art || 0) % ART.length] + '" role="img"' +
      ' aria-label="Stylised illustration plate for ' + esc(s.name) + '">');
    h.push('<span class="hprofile__art-label">' + esc(catLabel(s.cat)) +
      (s.unesco ? ' \u00b7 UNESCO World Heritage' : '') + '</span>');
    h.push('</div>');
    h.push('<div class="hprofile__badges">');
    h.push('<span class="hp-badge">' + esc(catLabel(s.cat)) + '</span>');
    if (s.unesco) h.push('<span class="hp-badge hp-badge--gold">UNESCO WHS</span>');
    if (s.year) h.push('<span class="hp-badge hp-badge--plain">' + esc(s.year) + '</span>');
    h.push('</div>');
    h.push('<h3 class="hprofile__title">' + esc(s.name) + '</h3>');
    h.push('<p class="hprofile__meta"><strong>' + esc(s.place) + '</strong> \u00b7 ' + esc(stateName(s.st)) + '</p>');
    h.push('<div class="hp-block"><h4>History</h4><p>' + esc(s.history) + '</p></div>');
    h.push('<div class="hp-block"><h4>Cultural significance</h4><p>' + esc(s.signif) + '</p></div>');
    h.push('<div class="hp-block"><h4>Living traditions</h4><ul class="hp-trads">');
    (s.trads || []).forEach(function (t) { h.push('<li>' + esc(t) + '</li>'); });
    h.push('</ul></div>');
    h.push('<div class="hp-block"><h4>Why it matters</h4><p class="hp-why">\u201C' + esc(s.why) + '\u201D</p></div>');
    h.push('<div class="hp-actions">');
    h.push('<button type="button" class="text-link hp-atlas-link" data-goto="' + esc(s.st) + '">' +
      '<span>Explore ' + esc(stateName(s.st)) + ' in the Atlas</span>' +
      '<svg class="icon text-link__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg></button>');
    h.push('<button type="button" class="text-link hp-clear-link"><span>Close panel</span></button>');
    h.push('</div>');
    h.push('</article>');
    H.panel.innerHTML = h.join('');

    var atlasBtn = qs('.hp-atlas-link', H.panel);
    if (atlasBtn) {
      var target = atlasBtn.getAttribute('data-goto');
      on(atlasBtn, 'click', function () { goToAtlas(target); });
    }
    on(qs('.hp-clear-link', H.panel), 'click', clearSelection);

    if (!reducedMotion && H.panel.scrollIntoView) {
      H.panel.scrollIntoView({ block: 'nearest' });
    }
  }

  function clearSelection() {
    H.selected = null;
    qsa('.hm-mark', H.marksBox).forEach(function (b) { b.classList.remove('is-active'); });
    if (H.panel) {
      H.panel.innerHTML =
        '<div class="hmap-panel__placeholder">' +
        '<svg class="icon hmap-panel__glyph" viewBox="0 0 24 24" aria-hidden="true">' +
        '<circle cx="12" cy="12" r="9"/><path d="M15.5 15.5L20 20"/><path d="M12 8v8M8 12h8"/></svg>' +
        '<p>Hover a glowing marker for a preview.<br>Click one to read its story.</p>' +
        '</div>';
    }
  }

  function goToAtlas(id) {
    var atlas = qs('#atlas');
    if (!atlas) return;
    atlas.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    window.setTimeout(function () {
      var path = qs('#atlas-map .atlas-region[data-state="' + id + '"]');
      if (path && typeof MouseEvent === 'function') {
        try { path.dispatchEvent(new MouseEvent('click', { bubbles: false })); } catch (e) { /* noop */ }
      }
    }, reducedMotion ? 250 : 750);
  }

  function announce(msg) { if (H.live) H.live.textContent = msg; }

/* ---- zoom / pan / reveal --------------------------------------------------- */
  function clampPan() {
    var w = H.wrap.clientWidth;
    var h = H.wrap.clientHeight;
    var slack = 60;
    var minX = Math.min(0, w - w * H.zoom) - slack;
    var minY = Math.min(0, h - h * H.zoom) - slack;
    H.tx = Math.max(minX, Math.min(slack, H.tx));
    H.ty = Math.max(minY, Math.min(slack, H.ty));
  }

  function applyTransform() {
    if (!H.world) return;
    clampPan();
    H.world.style.transform =
      'translate(' + H.tx.toFixed(1) + 'px,' + H.ty.toFixed(1) + 'px) scale(' + H.zoom.toFixed(3) + ')';
  }

  function setZoom(z, fx, fy) {
    var w = H.wrap ? H.wrap.clientWidth : 0;
    var h = H.wrap ? H.wrap.clientHeight : 0;
    var nz = Math.max(1, Math.min(3, z));
    if (fx == null) { fx = w / 2; fy = h / 2; }
    /* keep focal point stable while scaling */
    var rx = (fx - H.tx), ry = (fy - H.ty);
    var ratio = nz / (H.zoom || 1);
    H.tx = fx - rx * ratio;
    H.ty = fy - ry * ratio;
    H.zoom = nz;
    if (nz <= 1.001) { H.tx = 0; H.ty = 0; }
    applyTransform();
    announce('Map zoom ' + Math.round(H.zoom * 100) + ' percent.');
  }

  function centerOn(lon, lat) {
    var w = H.wrap.clientWidth, h = H.wrap.clientHeight;
    var p = HD.project(lon, lat);
    var px = ((p.x - HD.view.x) / HD.view.w) * w;
    var py = ((p.y - HD.view.y) / HD.view.h) * h;
    if (H.zoom === 1) setZoom(1.9);
    H.tx = w / 2 - px * H.zoom;
    H.ty = h / 2 - py * H.zoom;
    applyTransform();
  }

  function bindZoomPan() {
    if (!H.mapEl) return;
    on(qs('#hm-zoom-in'), 'click', function () { setZoom(H.zoom * 1.4); });
    on(qs('#hm-zoom-out'), 'click', function () { setZoom(H.zoom / 1.4); });
    on(qs('#hm-zoom-reset'), 'click', function () {
      H.zoom = 1; H.tx = 0; H.ty = 0; applyTransform();
      announce('Map view reset.');
    });

    var pointers = {};
    var lastMid = null, lastDist = 0, moved = false;

    function midOf(evs) {
      var xs = 0, ys = 0;
      evs.forEach(function (p) { xs += p.clientX; ys += p.clientY; });
      return { x: xs / evs.length, y: ys / evs.length };
    }

    on(H.mapEl, 'pointerdown', function (e) {
      pointers[e.pointerId] = e;
      moved = false;
      try { H.mapEl.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
      if (Object.keys(pointers).length === 1) {
        H.mapEl.classList.add('is-dragging');
        H._start = { x: e.clientX, y: e.clientY, tx: H.tx, ty: H.ty };
      } else if (Object.keys(pointers).length === 2) {
        var two = Object.keys(pointers).map(function (k) { return pointers[k]; });
        lastDist = Math.hypot(two[0].clientX - two[1].clientX, two[0].clientY - two[1].clientY);
        lastMid = midOf(two);
      }
    });

    on(H.mapEl, 'pointermove', function (e) {
      if (!pointers[e.pointerId]) return;
      pointers[e.pointerId] = e;
      var count = Object.keys(pointers).length;
      if (count === 1 && H._start) {
        var dx = e.clientX - H._start.x;
        var dy = e.clientY - H._start.y;
        if (Math.abs(dx) + Math.abs(dy) > 6) moved = true;
        if (H.zoom > 1) {
          H.tx = H._start.tx + dx;
          H.ty = H._start.ty + dy;
          applyTransform();
          H.mapEl.classList.add('is-panning');
        }
      } else if (count === 2) {
        var two = Object.keys(pointers).map(function (k) { return pointers[k]; });
        var dist = Math.hypot(two[0].clientX - two[1].clientX, two[0].clientY - two[1].clientY);
        var mid = midOf(two);
        if (lastDist > 0) {
          setZoom(H.zoom * (dist / lastDist), mid.x - H.mapEl.getBoundingClientRect().left, mid.y - H.mapEl.getBoundingClientRect().top);
        }
        lastDist = dist;
        lastMid = mid;
        moved = true;
      }
    });

    function release(e) {
      delete pointers[e.pointerId];
      if (Object.keys(pointers).length === 0) {
        H.mapEl.classList.remove('is-dragging');
        H.mapEl.classList.remove('is-panning');
        H._start = null;
        lastDist = 0;
        /* treat as click when barely moved */
        if (!moved && e.type === 'pointerup') { /* click handlers fire natively */ }
      }
    }
    on(H.mapEl, 'pointerup', release);
    on(H.mapEl, 'pointercancel', release);

    on(H.mapEl, 'wheel', function (e) {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      var rect = H.mapEl.getBoundingClientRect();
      setZoom(H.zoom * (e.deltaY < 0 ? 1.12 : 0.89), e.clientX - rect.left, e.clientY - rect.top);
    }, { passive: false });

    on(H.mapEl, 'dblclick', function (e) {
      var rect = H.mapEl.getBoundingClientRect();
      setZoom(H.zoom * 1.5, e.clientX - rect.left, e.clientY - rect.top);
    });

    on(H.mapEl, 'keydown', function (e) {
      var step = 40;
      if (e.key === '+' || e.key === '=') { setZoom(H.zoom * 1.25); }
      else if (e.key === '-' || e.key === '_') { setZoom(H.zoom / 1.25); }
      else if (e.key === 'ArrowLeft') { H.tx += step; applyTransform(); }
      else if (e.key === 'ArrowRight') { H.tx -= step; applyTransform(); }
      else if (e.key === 'ArrowUp') { H.ty += step; applyTransform(); }
      else if (e.key === 'ArrowDown') { H.ty -= step; applyTransform(); }
      else return;
      e.preventDefault();
    });
  }

/* ---- heritage init --------------------------------------------------------- */
  function initHeritage() {
    H.root = qs('#heritage');
    if (!H.root || typeof window.ATLAS_INDIA_SVG === 'undefined') return;
    H.wrap = qs('.hmap-map-wrap', H.root);
    H.mapEl = qs('#heritage-map', H.root);
    H.panel = qs('#heritage-panel', H.root);
    H.live = qs('#heritage-live');
    H.filtersBox = qs('#heritage-filters', H.root);
    H.searchEl = qs('#heritage-search', H.root);
    if (!H.mapEl) return;

    buildSitesIndex();

    var world = doc.createElement('div');
    world.className = 'hmap-world';
    world.innerHTML =
      '<div class="hmap-basemap" aria-hidden="true"></div>' +
      '<div class="hm-marks"></div>';
    H.mapEl.appendChild(world);
    H.world = world;
    H.marksBox = qs('.hm-marks', world);

    injectBaseMap(world);
    buildRoutes(world);
    buildMarkers(H.marksBox);
    initTip(H.wrap);
    bindZoomPan();
    buildFilterBar();
    bindSearch();
    clearSelection();
    updateLegendCounts();
    H.mapEl.setAttribute('tabindex', '0');
    H.mapEl.setAttribute('aria-label',
      'Interactive heritage map of India. Use plus and minus to zoom, arrow keys to pan.');

    /* routes bloom in when the section scrolls into view */
    if ('IntersectionObserver' in window && !reducedMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          io.disconnect();
          qsa('.hm-route', H.world).forEach(function (r) { r.classList.add('is-on'); });
        });
      }, { threshold: 0.25 });
      io.observe(H.wrap);
    } else {
      qsa('.hm-route', H.world).forEach(function (r) { r.classList.add('is-on'); });
    }

    countUpAll(H.root);
  }

  function countUpAll(scope) {
    if (reducedMotion || !('IntersectionObserver' in window)) return;
    var nums = qsa('[data-hcount]', scope);
    if (!nums.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        countUp(en.target);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) {
      n.textContent = '0';
      io.observe(n);
    });
  }

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-hcount'), 10) || 0;
    var t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / 1400);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

/* ======================= 2. CULTURE AT RISK ============================== */
  var R = { root: null, grid: null, filtersBox: null, statesBox: null,
            rail: null, progress: null, cat: 'all', st: 'all' };

  var STATUS_META = {
    critical:   { label: 'Critical', pct: 90 },
    endangered: { label: 'Endangered', pct: 62 },
    vulnerable: { label: 'Vulnerable', pct: 34 }
  };

  function initRisk() {
    if (!RK) return;
    R.root = qs('#at-risk');
    if (!R.root) return;
    R.grid = qs('#risk-grid', R.root);
    R.filtersBox = qs('#risk-filters', R.root);
    R.statesBox = qs('#risk-states', R.root);
    R.rail = qs('#risk-rail', R.root);
    R.progress = qs('#risk-progress', R.root);

    buildRiskCards();
    buildRiskFilters();
    buildCounters();
    buildEfforts();
    buildActions();
    buildCompares();
    bindChapters();
  }

  function buildRiskFilters() {
    var cats = ['all'];
    (RK.cards || []).forEach(function (c) {
      if (cats.indexOf(c.cat) === -1) cats.push(c.cat);
    });
    if (R.filtersBox) {
      var html = [];
      cats.forEach(function (c, i) {
        html.push('<button type="button" class="p4-filter' + (i === 0 ? ' is-active' : '') +
          '" data-rcat="' + esc(c.toLowerCase()) + '" aria-pressed="' + (i === 0 ? 'true' : 'false') + '">' +
          esc(c === 'all' ? 'All threads' : c) + '</button>');
      });
      R.filtersBox.innerHTML = html.join('');
      qsa('[data-rcat]', R.filtersBox).forEach(function (b) {
        on(b, 'click', function () {
          qsa('[data-rcat]', R.filtersBox).forEach(function (x) {
            x.classList.toggle('is-active', x === b);
            x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
          });
          R.cat = b.getAttribute('data-rcat');
          applyRiskFilter();
        });
      });
    }
    if (R.statesBox) {
      var seen = {}, chips =
        ['<button type="button" class="p4-filter is-active" data-rst="all" aria-pressed="true">All regions</button>'];
      (RK.cards || []).forEach(function (c) {
        if (c.st && !seen[c.st]) {
          seen[c.st] = true;
          chips.push('<button type="button" class="p4-filter" data-rst="' + esc(c.st) +
            '" aria-pressed="false">' + esc(stateName(c.st)) + '</button>');
        }
      });
      R.statesBox.innerHTML = chips.join('');
      qsa('[data-rst]', R.statesBox).forEach(function (b) {
        on(b, 'click', function () {
          qsa('[data-rst]', R.statesBox).forEach(function (x) {
            x.classList.toggle('is-active', x === b);
            x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
          });
          R.st = b.getAttribute('data-rst');
          applyRiskFilter();
        });
      });
    }
  }

  function applyRiskFilter() {
    qsa('.risk-card', R.grid).forEach(function (card) {
      var passCat = R.cat === 'all' || card.getAttribute('data-cat') === R.cat;
      var passSt = R.st === 'all' || card.getAttribute('data-st') === R.st;
      card.classList.toggle('is-off', !(passCat && passSt));
    });
  }

  function buildRiskCards() {
    if (!R.grid || !RK.cards) return;
    var html = [];
    RK.cards.forEach(function (c, i) {
      var meta = STATUS_META[c.status] || STATUS_META.vulnerable;
      html.push('<article class="risk-card" data-cat="' + esc(c.cat.toLowerCase()) +
        '" data-st="' + esc(c.st || '') + '">');
      html.push('<button type="button" class="risk-card__head" aria-expanded="false" aria-controls="rc-' + i + '">');
      html.push('<span class="risk-card__cat">' + esc(c.cat) + '</span>');
      html.push('<span class="risk-card__title">' + esc(c.title) + '</span>');
      html.push('<span class="risk-card__place">' + esc(c.place) + '</span>');
      html.push('<svg class="icon risk-card__chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>');
      html.push('</button>');
      html.push('<div class="risk-card__body" id="rc-' + i + '" hidden>');
      html.push('<div class="risk-meter"><div class="risk-meter__bar"><i style="--pct:' + meta.pct + '%"></i></div>' +
        '<span class="risk-meter__label">Status \u00b7 ' + meta.label + '</span></div>');
      html.push('<p><strong>What it is.</strong> ' + esc(c.what) + '</p>');
      html.push('<p><strong>Why it slips.</strong> ' + esc(c.why) + '</p>');
      html.push('<p><strong>What is changing.</strong> ' + esc(c.change) + '</p>');
      html.push('<p class="risk-done"><strong>What is being done.</strong> ' + esc(c.done) + '</p>');
      html.push('<p class="risk-help"><strong>How you can help.</strong> ' + esc(c.help) + '</p>');
      html.push('</div></article>');
    });
    R.grid.innerHTML = html.join('');

    qsa('.risk-card__head', R.grid).forEach(function (head) {
      on(head, 'click', function () {
        var body = head.nextElementSibling;
        var open = body.hasAttribute('hidden');
        if (open) body.removeAttribute('hidden');
        else body.setAttribute('hidden', '');
        head.setAttribute('aria-expanded', String(open));
        head.parentNode.classList.toggle('is-open', open);
      });
    });
  }

/* ---- risk counters, efforts, actions -------------------------------------- */
  function buildCounters() {
    var box = qs('#risk-counters', R.root);
    if (!box || !RK.stats) return;
    var html = [];
    RK.stats.forEach(function (s, i) {
      html.push('<div class="risk-stat' + (s.hope ? ' risk-stat--hope' : '') + '" data-p4-reveal style="--d:' + (i * 90) + 'ms">');
      html.push('<span class="risk-stat__num" data-hcount="' + s.v + '">' + String(s.v) + '</span>');
      html.push('<span class="risk-stat__label">' + esc(s.label) + '</span>');
      html.push('<span class="risk-stat__src">' + esc(s.src) + '</span>');
      html.push('</div>');
    });
    box.innerHTML = html.join('');
    countUpAll(box);
  }

  function buildEfforts() {
    var box = qs('#risk-efforts', R.root);
    if (!box || !RK.efforts) return;
    var html = [];
    RK.efforts.forEach(function (e, i) {
      html.push('<li class="risk-effort" data-p4-reveal style="--d:' + (i * 110) + 'ms">');
      html.push('<span class="risk-effort__era">' + esc(e.era) + '</span>');
      html.push('<div><h4>' + esc(e.title) + '</h4><p>' + esc(e.text) + '</p></div>');
      html.push('</li>');
    });
    box.innerHTML = html.join('');
  }

  var ACTION_ICONS = {
    buy: '<path d="M5 7h14l-1.2 12.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/>',
    learn: '<path d="M12 5L3 9l9 4 9-4-9-4z"/><path d="M7 11v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5"/>',
    record: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.4"/><path d="M12 3.5v3M12 17.5v3"/>',
    audience: '<path d="M4 17c1.5-3 4.5-5 8-5s6.5 2 8 5"/><path d="M9.5 9.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0z"/>',
    support: '<path d="M12 20s-7-4.3-7-9.3A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7 3.1c0 5-7 9.3-7 9.3z"/>'
  };

  function buildActions() {
    var box = qs('#risk-actions', R.root);
    if (!box || !RK.actions) return;
    var html = [];
    RK.actions.forEach(function (a, i) {
      var icon = ACTION_ICONS[a.icon] || ACTION_ICONS.support;
      html.push('<article class="risk-action" data-p4-reveal style="--d:' + (i * 90) + 'ms">');
      html.push('<svg class="icon risk-action__icon" viewBox="0 0 24 24" aria-hidden="true">' + icon + '</svg>');
      html.push('<h4>' + esc(a.title) + '</h4>');
      html.push('<p>' + esc(a.text) + '</p>');
      html.push('</article>');
    });
    box.innerHTML = html.join('');
  }

  /* ---- then / now comparison sliders ---------------------------------------- */
  function buildCompares() {
    var box = qs('#risk-compare', R.root);
    if (!box || !RK.compares) return;
    var html = [];
    RK.compares.forEach(function (cmp) {
      html.push('<figure class="cmp" data-cmp="' + esc(cmp.key) + '">');
      html.push('<div class="cmp__stage">');
      html.push('<div class="cmp__layer cmp__layer--then" aria-hidden="true"></div>');
      html.push('<div class="cmp__layer cmp__layer--now" aria-hidden="true"></div>');
      html.push('<span class="cmp__tag cmp__tag--then">' + esc(cmp.thenLabel) + '</span>');
      html.push('<span class="cmp__tag cmp__tag--now">' + esc(cmp.nowLabel) + '</span>');
      html.push('<div class="cmp__handle" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100"' +
        ' aria-valuenow="50" aria-label="Drag to compare then and now: ' + esc(cmp.title) + '"><i></i></div>');
      html.push('</div>');
      html.push('<figcaption class="cmp__caption">');
      html.push('<strong>' + esc(cmp.title) + '</strong>');
      html.push('<span class="cmp__cap cmp__cap--then is-on">' + esc(cmp.thenCap) + '</span>');
      html.push('<span class="cmp__cap cmp__cap--now">' + esc(cmp.nowCap) + '</span>');
      html.push('</figcaption>');
      html.push('</figure>');
    });
    box.innerHTML = html.join('');

    qsa('.cmp', box).forEach(function (fig) {
      var handle = qs('.cmp__handle', fig);
      var capThen = qs('.cmp__cap--then', fig);
      var capNow = qs('.cmp__cap--now', fig);
      var pos = 50;
      var dragging = false;

      function render() {
        fig.style.setProperty('--pos', pos.toFixed(1) + '%');
        handle.setAttribute('aria-valuenow', String(Math.round(pos)));
        var showThen = pos > 55;
        capThen.classList.toggle('is-on', showThen);
        capNow.classList.toggle('is-on', !showThen);
      }

      function fromEvent(e) {
        var rect = qs('.cmp__stage', fig).getBoundingClientRect();
        pos = Math.max(4, Math.min(96, ((e.clientX - rect.left) / rect.width) * 100));
        render();
      }

      on(fig, 'pointerdown', function (e) {
        dragging = true;
        fromEvent(e);
        try { fig.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
      });
      on(fig, 'pointermove', function (e) { if (dragging) fromEvent(e); });
      on(fig, 'pointerup', function () { dragging = false; });
      on(fig, 'pointercancel', function () { dragging = false; });
      on(handle, 'keydown', function (e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { pos = Math.max(4, pos - 4); render(); e.preventDefault(); }
        else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { pos = Math.min(96, pos + 4); render(); e.preventDefault(); }
      });
      render();
    });
  }

/* ---- chapter scroll-spy + reveals + boot ----------------------------------- */
  function bindChapters() {
    var chapters = qsa('.risk-chapter', R.root);
    var links = qsa('#risk-rail a', R.root);
    if (!chapters.length) return;

    function setActive(idx) {
      links.forEach(function (l, i) { l.classList.toggle('is-active', i === idx); });
      chapters.forEach(function (ch, i) { ch.classList.toggle('is-current', i === idx); });
      if (R.progress) {
        R.progress.style.height = (chapters.length > 1 ? (idx / (chapters.length - 1)) * 100 : 0) + '%';
      }
    }

    if ('IntersectionObserver' in window && !reducedMotion) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          setActive(chapters.indexOf(en.target));
        });
      }, { rootMargin: '-42% 0px -52% 0px' });
      chapters.forEach(function (ch) { spy.observe(ch); });
    } else {
      setActive(0);
    }

    links.forEach(function (l, idx) {
      on(l, 'click', function (e) {
        e.preventDefault();
        chapters[idx].scrollIntoView({
          behavior: reducedMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      });
    });

    revealScoped(qsa('[data-p4-reveal]', R.root));
    revealScoped(chapters);
  }

  function revealScoped(els) {
    if (!els || !els.length) return;
    if (!('IntersectionObserver' in window) || reducedMotion) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) en.target.classList.add('is-in');
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- boot ------------------------------------------------------------------ */
  function boot() {
    initHeritage();
    initRisk();
  }

  if (doc.readyState === 'interactive' || doc.readyState === 'complete') boot();
  else on(doc, 'DOMContentLoaded', boot);
})();