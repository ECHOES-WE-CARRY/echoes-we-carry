/* ==========================================================================
   ECHOES WE CARRY - PHASE 3 EXPERIENCE LAYER
   Five Senses, Threads, Stories, Makers, culture search + immersive modal.
   Vanilla JS, no dependencies. Mirrors atlas.js/main.js ES5 conventions.
   Consumes js/experience-data.js (ECHOES_EXPERIENCE) and reuses the map
   (ATLAS_INDIA_SVG) + region names (ECHOES_ATLAS). Loaded after them (defer).
   Touches only its own scoped DOM ids.
   ========================================================================== */
(function () {
  'use strict';

  if (typeof window.ECHOES_EXPERIENCE === 'undefined' ||
      typeof window.ATLAS_INDIA_SVG === 'undefined') {
    return;
  }

  var D = ECHOES_EXPERIENCE;
  var doc = document;
  var prefersReducedMotion = (window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ---- utils ---- */
  function qs(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function on(el, type, fn) { if (el) el.addEventListener(type, fn, false); }
  function setText(el, t) { if (el) el.textContent = t; }
  function esc(s) {
    if (s == null) return '';
    var d = doc.createElement('div');
    d.textContent = String(s);
    return d.innerHTML;
  }
  function stripIds(svgMarkup) {
    return svgMarkup.replace(/\s+(?:id|aria-labelledby)="[^"]*"/g, '');
  }

  /* Pull a curated palette of rich gradients for card art (twystack-safe). */
  var ART = [
    'radial-gradient(circle at 32% 26%, rgba(198,153,47,0.5), transparent 46%), linear-gradient(135deg, #1b1f3b, #2a2f5c)',
    'radial-gradient(circle at 70% 24%, rgba(178,85,57,0.45), transparent 46%), linear-gradient(135deg, #7a3a26, #b25539)',
    'radial-gradient(circle at 24% 74%, rgba(76,107,79,0.5), transparent 46%), linear-gradient(135deg, #23342a, #4c6b4f)',
    'radial-gradient(circle at 60% 60%, rgba(221,182,95,0.5), transparent 44%), linear-gradient(135deg, #8a6c22, #c6992f)',
    'radial-gradient(circle at 34% 30%, rgba(246,240,228,0.4), transparent 48%), linear-gradient(135deg, #2f2637, #4a2230)',
    'radial-gradient(circle at 28% 40%, rgba(221,182,95,0.4), transparent 46%), linear-gradient(135deg, #1f3a2c, #3a2333)',
    'radial-gradient(circle at 62% 34%, rgba(178,85,57,0.4), transparent 46%), linear-gradient(135deg, #2a1a22, #6b2a3e)',
    'radial-gradient(circle at 44% 70%, rgba(214,168,84,0.45), transparent 46%), linear-gradient(135deg, #45321f, #7c5a2e)'
  ];

  /* ---- region name resolver (reuses Phase-2 ECHOES_ATLAS when present) ---- */
  var ATLAS = window.ECHOES_ATLAS || null;
  function regionName(id) {
    if (ATLAS && ATLAS[id]) return ATLAS[id].name;
    var map = {
      tn:'Tamil Nadu', kl:'Kerala', gj:'Gujarat', up:'Uttar Pradesh', wb:'West Bengal',
      as:'Assam', od:'Odisha', br:'Bihar', mh:'Maharashtra', pb:'Punjab', rj:'Rajasthan',
      ka:'Karnataka', mp:'Madhya Pradesh'
    };
    return map[id] || id;
  }

  /* ---- inject the shared India map (deduped) into a container ---- */
  function installMap(container, darkBg) {
    if (!container) return {};
    container.innerHTML = stripIds(window.ATLAS_INDIA_SVG);
    var svg = qs(':scope > svg', container);
    if (svg) {
      svg.classList.add('mini-map');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', 'auto');
    }
    var paths = svg ? qsa('.atlas-region', container) : [];
    return { svg: svg, paths: paths };
  }

  function setRegionLit(paths, litIds, dimIds) {
    var lit = {}, dim = {};
    (litIds || []).forEach(function (id) { lit[id] = true; });
    (dimIds || []).forEach(function (id) { dim[id] = true; });
    paths.forEach(function (p) {
      var id = p.getAttribute('data-state');
      p.classList.toggle('is-lit', !!lit[id]);
      p.classList.toggle('is-dim', lit[id] ? false : !!dim[id]);
    });
  }

  /* ========================================================================
     1. THE FIVE SENSES OF INDIA
  ======================================================================== */
  function initSenses() {
    var stage = qs('.senses__grid');
    var mapBox = qs('#senses-map');
    var panel = qs('#senses-panel');
    var nodes = qsa('.sense-node');
    var map = installMap(mapBox);
    var byKey = {};
    D.senses.forEach(function (s) { byKey[s.key] = s; });

    var nodesKey = null;

    nodes.forEach(function (node) {
      var key = node.getAttribute('data-sense');
      var s = byKey[key];
      if (!s) return;
      node.style.setProperty('--accent', s.accent);
      var iconEl = qs('.sense-node__icon', node);
      if (iconEl) iconEl.innerHTML = s.icon;
      var labelEl = qs('.sense-node__label', node);
      if (labelEl) labelEl.textContent = s.title;
      if (node.getAttribute('aria-label') === '') {
        node.setAttribute('aria-label', s.title + ' - ' + s.tagline);
      }
    });

    function highlight(s) {
      setRegionLit(map.paths, s.states, []);
      if (mapBox) mapBox.classList.add('is-active');
    }
    function clearHighlight() {
      if (map.paths) map.paths.forEach(function (p) { p.classList.remove('is-lit', 'is-dim'); });
      if (mapBox) mapBox.classList.remove('is-active');
    }

    function render(s) {
      var h = [];
      h.push('<div class="sense-detail" data-sense="' + esc(s.key) + '">');
      h.push('<div class="sense-detail__visual" style="background:linear-gradient(135deg,' + s.accent + ',' + '#241f1a 72%)" aria-hidden="true"></div>');
      h.push('<p class="sense-detail__kicker">' + esc(s.title) + '</p>');
      h.push('<h3 class="sense-detail__title">' + esc(s.tagline) + '</h3>');
      h.push('<p class="sense-detail__desc">' + esc(s.description) + '</p>');
      h.push('<div class="sense-detail__examples">');
      s.examples.forEach(function (ex) {
        h.push('<span class="sense-example">' + esc(ex) + '</span>');
      });
      h.push('</div>');
      h.push('<div class="sense-detail__states" role="list">');
      s.states.forEach(function (id) {
        h.push('<button type="button" class="exp-state-chip" data-state="' + esc(id) + '">' + esc(regionName(id)) + '</button>');
      });
      h.push('</div>');
      h.push('</div>');
      if (panel) panel.innerHTML = h.join('');
      if (panel) {
        qsa('.exp-state-chip', panel).forEach(function (btn) {
          on(btn, 'click', function () { focusAtlas(btn.getAttribute('data-state')); });
        });
      }
      nodes.forEach(function (n) {
        n.classList.toggle('is-active', n.getAttribute('data-sense') === s.key);
      });
    }

    function selectSense(key) {
      var s = byKey[key];
      if (!s) return;
      nodesKey = key;
      highlight(s);
      render(s);
    }

    function clearSense() {
      nodesKey = null;
      clearHighlight();
      if (panel) {
        panel.innerHTML = '<div class="senses__placeholder"><p>Hover a sensory node to feel a region through that sense.<br>Click to open its full profile.</p></div>';
      }
      nodes.forEach(function (n) { n.classList.remove('is-active'); });
    }

    nodes.forEach(function (node) {
      var key = node.getAttribute('data-sense');
      on(node, 'mouseenter', function () { if (!prefersReducedMotion) highlight(byKey[key]); });
      on(node, 'mouseleave', function () { if (!nodesKey) clearHighlight(); });
      on(node, 'click', function () {
        if (nodesKey === key && !prefersReducedMotion) { clearSense(); return; }
        selectSense(key);
      });
      on(node, 'keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectSense(key); }
        else if (e.key === 'Escape') clearSense();
      });
    });

    if (nodes.length && panel) {
      panel.innerHTML = '<div class="senses__placeholder"><p>Hover a node — SEE · HEAR · TASTE · SMELL · TOUCH — to light the region it awakens.<br>Click to read its full profile.</p></div>';
    }
  }

    /* ========================================================================
     2. THREADS THAT CONNECT US - animated cultural network
  ======================================================================== */
  var SVGNS = 'http://www.w3.org/2000/svg';

  function drawThreads(map, ids) {
    if (!map || !map.svg) return;
    var svg = map.svg;
    var pts = [];
    ids.forEach(function (id) {
      var p = qs('.atlas-region[data-state="' + id + '"]', mapBoxElemFor(map));
      if (!p) return;
      try {
        var b = p.getBBox();
        pts.push({ x: b.x + b.width / 2, y: b.y + b.height / 2 });
      } catch (e) { /* skip */ }
    });
    clearDrawn(svg);
    if (pts.length < 2) return;
    var d, i;
    for (i = 0; i < pts.length; i++) {
      var a = pts[i];
      var b = pts[(i + 1) % pts.length];
      d = arcPath(a, b, (i % 2 === 0 ? 1 : -1));
      var path = doc.createElementNS(SVGNS, 'path');
      path.setAttribute('class', 'threads__arc is-trained');
      path.setAttribute('d', d);
      svg.appendChild(path);
    }
  }

  function mapBoxElemFor(map) { return map._root || null; }

  function arcPath(a, b, dir) {
    var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    var dx = b.x - a.x, dy = b.y - a.y;
    var len = Math.sqrt(dx * dx + dy * dy) || 1;
    var px = -dy / len * dir, py = dx / len * dir;
    var bow = Math.min(64, len * 0.16);
    var cx = mx + px * bow, cy = my + py * bow;
    return 'M' + a.x.toFixed(1) + ' ' + a.y.toFixed(1) +
      ' Q' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' +
      b.x.toFixed(1) + ' ' + b.y.toFixed(1);
  }

  function clearDrawn(svg) {
    if (!svg) return;
    qsa('.threads__arc', svg).forEach(function (n) { n.parentNode.removeChild(n); });
    qsa('.threads__nodepulse', svg).forEach(function (n) { n.parentNode.removeChild(n); });
  }

  function initThreads() {
    var mapBox = qs('#threads-map');
    var catsBox = qs('#threads-cats');
    var info = qs('#threads-info');
    var map = installMap(mapBox);
    map._root = mapBox;

    var allIds = [];
    D.threads.forEach(function (c) {
      c.states.forEach(function (id) { if (allIds.indexOf(id) === -1) allIds.push(id); });
    });

    var byKey = {};
    D.threads.forEach(function (c) { byKey[c.key] = c; });
    var active = D.threads[0] ? D.threads[0].key : null;

    function renderInfo(cat) {
      if (!info) return;
      var h = [];
      h.push('<p class="threads__blurb">' + esc(cat.blurb) + '</p>');
      h.push('<p class="threads__section-label">Traditions carried on this thread</p>');
      h.push('<div class="threads__traditions">');
      cat.traditions.forEach(function (t) {
        h.push('<span class="threads__tradition">' + esc(t) + '</span>');
      });
      h.push('</div>');
      h.push('<p class="threads__section-label">The makers who keep it</p>');
      h.push('<div class="threads__makers">');
      cat.makers.forEach(function (m) {
        h.push('<span class="threads__maker">' + esc(m) + '</span>');
      });
      h.push('</div>');
      h.push('<p class="threads__explain">Tap any state on the map to open its Atlas profile below — the thread leads there.</p>');
      info.innerHTML = h.join('');
    }

    function select(cat) {
      active = cat.key;
      qsa('.thread-btn', catsBox).forEach(function (b) {
        b.classList.toggle('is-active', b.getAttribute('data-cat') === cat.key);
        b.setAttribute('aria-pressed', b.getAttribute('data-cat') === cat.key ? 'true' : 'false');
      });
      setRegionLit(map.paths, cat.states, allIds);
      drawThreads(map, cat.states);
      renderInfo(cat);
    }

    (catsBox ? [] : []); // no-op guard

    if (catsBox && D.threads.length) {
      D.threads.forEach(function (cat, idx) {
        var b = doc.createElement('button');
        b.type = 'button';
        b.className = 'thread-btn';
        b.setAttribute('data-cat', cat.key);
        b.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
        b.textContent = cat.label;
        on(b, 'click', function () { select(cat); });
        catsBox.appendChild(b);
      });
    }

    if (mapBox && map.paths.length) {
      map.paths.forEach(function (p) {
        p.setAttribute('tabindex', '0');
        on(p, 'click', function () {
          var id = p.getAttribute('data-state');
          if (allIds.indexOf(id) !== -1) focusAtlas(id);
        });
      });
    }

    if (active) select(byKey[active]);
  }

    /* ---- take a state id to the Phase-2 Atlas ---- */
  function focusAtlas(id) {
    var atlas = qs('#atlas');
    if (!atlas) return;
    var doIt = function () {
      atlas.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      // select the corresponding region in the Phase-2 atlas map, if present
      var target = qs('.atlas-map .atlas-region[data-state="' + id + '"]');
      if (target && !prefersReducedMotion) {
        window.setTimeout(function () {
          try { target.click(); } catch (e) { /* ignore */ }
        }, 350);
      }
    };
    doIt();
  }

  /* ========================================================================
     3. STORIES BEHIND THE CULTURE
  ======================================================================== */
  function storyLead(s) {
    var t = s.origin.split('.')[0];
    if (!t) return s.echo;
    return t + '.';
  }

  function buildStories() {
    var grid = qs('#stories-grid');
    var filterBox = qs('#stories-filters');
    if (!grid) return;

    var cats = ['all'];
    D.stories.forEach(function (s) { if (cats.indexOf(s.cat) === -1) cats.push(s.cat); });

    if (filterBox) {
      cats.forEach(function (c, idx) {
        var b = doc.createElement('button');
        b.type = 'button';
        b.className = 'story-filter' + (idx === 0 ? ' is-active' : '');
        b.setAttribute('data-cat', c);
        b.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
        b.textContent = c === 'all' ? 'All Stories' : c;
        on(b, 'click', function () {
          qsa('.story-filter', filterBox).forEach(function (x) {
            x.classList.toggle('is-active', x === b);
            x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
          });
          grid.setAttribute('data-filter', c);
          qsa('.story-card', grid).forEach(function (card, i) {
            var show = c === 'all' || card.getAttribute('data-cat') === c;
            card.classList.toggle('is-filtered-out', !show);
          });
        });
        filterBox.appendChild(b);
      });
    }

    D.stories.forEach(function (s, i) {
      var card = doc.createElement('article');
      card.className = 'story-card';
      card.tabIndex = 0;
      card.setAttribute('data-cat', s.cat);
      card.setAttribute('data-story', s.key);
      card.setAttribute('aria-label', s.title + ' — ' + s.tagline);
      var art = ART[i % ART.length];
      var h = [];
      h.push('<div class="story-card__media">');
      h.push('<div class="story-card__art" style="background:' + art + '"></div>');
      h.push('<span class="story-card__region">' + esc(s.region) + '</span>');
      h.push('<span class="story-card__badge">' + esc(s.cat) + '</span>');
      h.push('</div>');
      h.push('<div class="story-card__body">');
      h.push('<h3 class="story-card__title">' + esc(s.title) + '</h3>');
      h.push('<p class="story-card__tagline">' + esc(s.tagline) + '</p>');
      h.push('<p class="story-card__lead">' + esc(storyLead(s)) + '</p>');
      h.push('<span class="story-card__cta">Read the story <svg class="icon" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></svg></span>');
      h.push('</div>');
      card.innerHTML = h.join('');
      on(card, 'click', function () { openStory(s.key); });
      on(card, 'keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openStory(s.key); }
      });
      grid.appendChild(card);
    });
  }

    /* ========================================================================
     4. MEET THE MAKERS
  ======================================================================== */
  function initialsOf(name) {
    return name.split(/\s+/).slice(0, 2).map(function (w) {
      return w.charAt(0).toUpperCase();
    }).join('');
  }

  function buildMakers() {
    var grid = qs('#makers-grid');
    var filterBox = qs('#makers-filters');
    if (!grid) return;

    var cats = ['all'];
    D.makers.forEach(function (m) { if (cats.indexOf(m.craft) === -1) cats.push(m.craft); });

    if (filterBox) {
      cats.forEach(function (c, idx) {
        var b = doc.createElement('button');
        b.type = 'button';
        b.className = 'maker-filter' + (idx === 0 ? ' is-active' : '');
        b.setAttribute('data-cat', c);
        b.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
        b.textContent = c === 'all' ? 'All Makers' : c;
        on(b, 'click', function () {
          qsa('.maker-filter', filterBox).forEach(function (x) {
            x.classList.toggle('is-active', x === b);
            x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
          });
          var showAll = c === 'all';
          qsa('.maker-card', grid).forEach(function (card) {
            var show = showAll || card.getAttribute('data-craft') === c;
            card.classList.toggle('is-filtered-out', !show);
          });
        });
        filterBox.appendChild(b);
      });
    }

    D.makers.forEach(function (m, i) {
      var card = doc.createElement('article');
      card.className = 'maker-card';
      card.tabIndex = 0;
      card.setAttribute('data-craft', m.craft);
      card.setAttribute('data-maker', m.key);
      card.setAttribute('aria-label', m.name + ', ' + m.role + ' — ' + m.region);
      var art = ART[i % ART.length];
      var h = [];
      h.push('<div class="maker-card__portrait" style="background:' + art + '">');
      h.push('<span class="maker-card__initials" aria-hidden="true">' + esc(initialsOf(m.name)) + '</span>');
      h.push('<span class="maker-card__craft">' + esc(m.craft) + '</span>');
      h.push('</div>');
      h.push('<div class="maker-card__body">');
      h.push('<h3 class="maker-card__name">' + esc(m.name) + '</h3>');
      h.push('<p class="maker-card__role">' + esc(m.role) + '</p>');
      h.push('<p class="maker-card__region">' + esc(m.region) + '</p>');
      h.push('<span class="maker-card__cta">Meet the maker <svg class="icon" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></svg></span>');
      h.push('</div>');
      card.innerHTML = h.join('');
      on(card, 'click', function () { openMaker(m.key); });
      on(card, 'keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openMaker(m.key); }
      });
      grid.appendChild(card);
    });
  }

    /* ========================================================================
     5. IMMERSIVE MODAL (shared by stories + makers)
  ======================================================================== */
  var modal = qs('#culture-modal');
  var modalDialog = qs('#culture-modal-dialog');
  var modalClose = qs('#culture-modal-close');
  var lastFocused = null;

  function openModal() {
    if (!modal) return;
    lastFocused = doc.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    doc.body.classList.add('no-scroll');
    if (modalClose) modalClose.focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    doc.body.classList.remove('no-scroll');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  on(modalClose, 'click', closeModal);
  on(modal, 'click', function (e) { if (e.target === modal) closeModal(); });
  on(doc, 'keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
  });

  /* --- story detail builder --- */
  function openStory(key) {
    var s = null;
    D.stories.forEach(function (x) { if (x.key === key) s = x; });
    if (!s || !modalDialog) return;
    var h = [];
    h.push('<div class="story-detail">');
    h.push('<div class="story-detail__art" aria-hidden="true"></div>');
    h.push('<div class="story-detail__head">');
    h.push('<p class="story-detail__kicker">' + esc(s.cat) + ' · ' + esc(s.region) + '</p>');
    h.push('<h3 class="story-detail__title">' + esc(s.title) + '</h3>');
    h.push('<p class="story-detail__tagline">' + esc(s.tagline) + '</p>');
    h.push('</div>');
    h.push('<div class="story-detail__body">');
    h.push('<div class="story-chapter"><p class="story-chapter__label">Origin</p><p>' + esc(s.origin) + '</p></div>');
    h.push('<div class="story-chapter"><p class="story-chapter__label">Meaning</p><p>' + esc(s.meaning) + '</p></div>');
    h.push('<div class="story-chapter"><p class="story-chapter__label">Evolution</p><p>' + esc(s.evolution) + '</p></div>');
    h.push('<div class="story-chapter"><p class="story-chapter__label">Today</p><p>' + esc(s.today) + '</p></div>');
    if (s.thenNow) {
      h.push('<div class="story-thennow">');
      h.push('<div class="story-thennow__bar">');
      h.push('<span class="story-thennow__label story-thennow__label--then">THEN</span>');
      h.push('<span class="story-thennow__label story-thennow__label--now">NOW</span>');
      h.push('<span class="story-thennow__handle"></span>');
      h.push('</div>');
      h.push('<div class="story-thennow__captions">');
      h.push('<p class="story-thennow__cap story-thennow__cap--then">' + esc(s.thenNow.then) + '</p>');
      h.push('<p class="story-thennow__cap story-thennow__cap--now">' + esc(s.thenNow.now) + '</p>');
      h.push('<input class="story-thennow__input" type="range" min="0" max="100" value="50" aria-label="Compare then and now" />');
      h.push('</div>');
      h.push('</div>');
    }
    h.push('<div class="story-echo"><p class="story-chapter__label">The Echo</p><p>' + esc(s.echo) + '</p></div>');
    h.push('</div>');
    h.push('</div>');
    modalDialog.innerHTML = h.join('');
    openModal();
    wireThenNow(modalDialog);
  }

  function wireThenNow(root) {
    var slider = qs('.story-thennow__input', root);
    var block = qs('.story-thennow', root);
    if (!slider || !block) return;
    function apply(v) {
      block.style.setProperty('--pos', v + '%');
      if (prefersReducedMotion) return;
    }
    apply(slider.value);
    on(slider, 'input', function () {
      block.style.setProperty('--pos', slider.value + '%');
    });
  }

  /* --- maker detail builder --- */
  function openMaker(key) {
    var m = null;
    D.makers.forEach(function (x) { if (x.key === key) m = x; });
    if (!m || !modalDialog) return;
    var h = [];
    h.push('<div class="maker-detail">');
    h.push('<div class="maker-detail__head">');
    h.push('<p class="maker-detail__kicker">' + esc(m.craft) + '</p>');
    h.push('<h3 class="maker-detail__name">' + esc(m.name) + '</h3>');
    h.push('<p class="maker-detail__role">' + esc(m.role) + '</p>');
    h.push('<p class="maker-detail__region">' + esc(m.region) + '</p>');
    h.push('</div>');
    h.push('<div class="maker-detail__body">');
    h.push('<div class="maker-chapter"><p class="story-chapter__label">Why they continue</p><p>' + esc(m.whyContinue) + '</p></div>');
    h.push('<div class="maker-pass">');
    h.push('<div class="maker-pass__step"><span class="maker-pass__tag">Learned from</span><span class="maker-pass__txt">' + esc(m.learnedFrom) + '</span></div>');
    h.push('<div class="maker-pass__step"><span class="maker-pass__tag">Practiced</span><span class="maker-pass__txt">' + esc(m.practiced) + '</span></div>');
    h.push('<div class="maker-pass__step"><span class="maker-pass__tag">Passed forward</span><span class="maker-pass__txt">' + esc(m.passedForward) + '</span></div>');
    h.push('</div>');
    h.push('<div class="maker-chapter"><p class="story-chapter__label">Their hope for the future</p><p>' + esc(m.message) + '</p></div>');
    h.push('</div>');
    h.push('</div>');
    modalDialog.innerHTML = h.join('');
    openModal();
  }

    /* ========================================================================
     6. CULTURE SEARCH - one input across states/stories/makers/traditions
  ======================================================================== */
  function buildSearch() {
    var input = qs('#culture-search');
    var results = qs('#culture-search-results');
    if (!input || !results) return;
    var emptyEl = qs('#culture-search-empty');

    function query(q) {
      q = (q || '').toLowerCase().trim();
      results.innerHTML = '';
      if (emptyEl) emptyEl.innerHTML = '';
      if (!q) return;

      var hits = [];

      // states (from Atlas when present)
      if (ATLAS) {
        Object.keys(ATLAS).forEach(function (id) {
          var p = ATLAS[id];
          if (!p) return;
          var hay = (p.name + ' ' + (p.languages || []).join(' ') + ' ' +
            (p.region || '') + ' ' + (p.preview || '')).toLowerCase();
          if (hay.indexOf(q) !== -1) {
            hits.push({ type: 'State', name: p.name, meta: p.region, id: id, go: 'atlas' });
          }
        });
      }
      // stories
      D.stories.forEach(function (s) {
        var hay = (s.title + ' ' + s.cat + ' ' + s.region + ' ' +
          s.origin + ' ' + s.tagline).toLowerCase();
        if (hay.indexOf(q) !== -1) {
          hits.push({ type: 'Story', name: s.title, meta: s.region + ' — ' + s.cat, key: s.key, go: 'story' });
        }
      });
      // makers
      D.makers.forEach(function (m) {
        var hay = (m.name + ' ' + m.craft + ' ' + m.role + ' ' +
          m.region + ' ' + m.message).toLowerCase();
        if (hay.indexOf(q) !== -1) {
          hits.push({ type: 'Maker', name: m.name, meta: m.role, key: m.key, go: 'maker' });
        }
      });
      // traditions (from threads)
      D.threads.forEach(function (t) {
        (t.traditions || []).forEach(function (tr) {
          if (tr.toLowerCase().indexOf(q) !== -1) {
            hits.push({ type: 'Tradition', name: tr, meta: t.label, go: 'thread' });
          }
        });
      });

      if (!hits.length) {
        if (emptyEl) emptyEl.textContent = 'No echoes found for \u201c' + q + '\u201d. Try a state, an art, a festival or a craft.';
        return;
      }
      if (emptyEl) emptyEl.textContent = hits.length + ' echo' + (hits.length === 1 ? '' : 's') + ' found.';

      hits.slice(0, 24).forEach(function (hit) {
        var row = doc.createElement('button');
        row.type = 'button';
        row.className = 'culture-result';
        row.setAttribute('aria-label', hit.type + ' — ' + hit.name);
        var h = [];
        h.push('<span class="culture-result__type">' + esc(hit.type) + '</span>');
        h.push('<span class="culture-result__name">' + esc(hit.name) + '</span>');
        h.push('<span class="culture-result__meta">' + esc(hit.meta || '') + '</span>');
        row.innerHTML = h.join('');
        on(row, 'click', function () {
          if (hit.go === 'story') openStory(hit.key);
          else if (hit.go === 'maker') openMaker(hit.key);
          else if (hit.go === 'atlas') focusAtlas(hit.id);
        });
        results.appendChild(row);
      });
    }

    var t;
    on(input, 'input', function () {
      clearTimeout(t);
      t = setTimeout(function () { query(input.value); }, 160);
    });
    on(results, 'click', function (e) {
      var row = e.target.closest('.culture-result');
      if (!row) return;
      // click handled per-row above; nothing extra needed
    });
  }

  /* ========================================================================
     INIT
  ======================================================================== */
  function init() {
    initSenses();
    initThreads();
    buildStories();
    buildMakers();
    buildSearch();
  }

  if (doc.readyState === 'complete' || doc.readyState === 'interactive') {
    init();
  } else {
    on(doc, 'DOMContentLoaded', init);
  }
})();