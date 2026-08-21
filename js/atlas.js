/* =========================================================================
   Echoes We Carry - Cultural Atlas: interactive map layer (Phase 2)
   Vanilla JS, no dependencies. Consumes:
     - window.ATLAS_INDIA_SVG  (js/india-map-data.js)
     - ECHOES_ATLAS            (js/cultural-data.js)
   Loaded after main.js + the two data scripts (all `defer`, so the data
   globals exist by the time this runs). Touches only `#atlas` DOM.
   Mirrors main.js ES5 conventions (var, qsa, prefersReducedMotion).
   ========================================================================= */
(function () {
  'use strict';

  // Graceful no-op if Phase-2 data is missing (progressive enhancement).
  if (window.ATLAS_INDIA_SVG === undefined || window.ECHOES_ATLAS === undefined) {
    return;
  }

  var doc = document;
  var prefersReducedMotion = (window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ---- utils (mirror main.js) ---- */
  function qs(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function on(el, type, fn) { if (el) el.addEventListener(type, fn, false); }
  function setText(el, t) { if (el) el.textContent = t; }
  function escapeHTML(s) {
    if (s == null) return '';
    var d = doc.createElement('div');
    d.textContent = String(s);
    return d.innerHTML;
  }
  function debounce(fn, ms) {
    var t;
    return function () {
      var a = arguments, c = this;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(c, a); }, ms);
    };
  }

  /* ---- cache DOM ---- */
  var root = qs('#atlas');
  if (!root) return;
  var mapBox = qs('#atlas-map', root);
  var panel = qs('#atlas-panel', root);
  var search = qs('#atlas-search', root);
  var filtersBox = qs('.atlas-filters', root);
  var announcer = qs('#atlas-announcer', root);
  var svg = null; // the injected map

  /* ---- index the 36 profiles by stable id ---- */
  var regions = [];
  var byId = {};
  (function buildIndex() {
    var keys = Object.keys(ECHOES_ATLAS);
    for (var i = 0; i < keys.length; i++) {
      var p = ECHOES_ATLAS[keys[i]];
      if (!p || !p.profile) continue;
      var r = {
        id: keys[i],
        name: p.name,
        type: p.type,
        region: p.region,
        capital: p.capital,
        languages: p.languages || [],
        preview: p.preview || ''
      };
      regions.push(r);
      byId[r.id] = r;
    }
  })();

  /* ---- profile section contract (14 sections, fixed render order) ---- */
  var LABELS = {
    land: 'Land', history: 'History', architecture: 'Architecture',
    arts: 'Arts', music: 'Music', dance: 'Dance', dress: 'Dress',
    beliefs: 'Beliefs', food: 'Food', festivals: 'Festivals',
    crafts: 'Crafts', heritage: 'Heritage', thenNow: 'Then & Now', wonder: 'The Wonder We Carry'
  };
  // bolded "title" field inside each object-array item (remainder follows in author order)
  var TITLE_FIELD = {
    history: 'era', architecture: 'name', food: 'dish',
    festivals: 'name', crafts: 'craft', heritage: 'site', thenNow: 'theme'
  };

  var current = null;     // selected region id
  var activeFilter = 'all';
  var searchTerm = '';

  /* ---- 1. inject the generated SVG ---- */
  function injectMap() {
    if (!mapBox) return;
    mapBox.innerHTML = window.ATLAS_INDIA_SVG;
    svg = qs('svg', mapBox);
    var paths = qsa('.atlas-region', mapBox);
    // dedupe the duplicate `id="region-dd"` (IN-DD + IN-DN share the dd id)
    var seen = {};
    paths.forEach(function (path) {
      var id = path.getAttribute('id');
      if (id && seen[id]) { path.removeAttribute('id'); }
      if (id) seen[id] = true;
      path.setAttribute('tabindex', '-1');
      path.setAttribute('role', 'img');
      on(path, 'mouseenter', onHover);
      on(path, 'mouseleave', offHover);
      on(path, 'click', onClick);
    });
    // make the whole map focusable for keyboard arrow navigation
    if (svg) {
      svg.setAttribute('tabindex', '0');
      on(svg, 'keydown', onMapKey);
    }
    buildRegionPills();
    refreshVisibility();
    announce('Cultural Atlas loaded: ' + regions.length + ' regions. Arrow keys move between regions; Enter selects.');
  }

  /* ---- 2. dynamic region filter pills (labels sourced from data) ---- */
  function buildRegionPills() {
    if (!filtersBox) return;
    var order = [], seenR = {};
    regions.forEach(function (r) {
      if (!seenR[r.region]) { seenR[r.region] = true; order.push(r.region); }
    });
    order.sort();
    order.forEach(function (name) {
      var btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-btn';
      btn.setAttribute('data-filter', name);
      btn.setAttribute('aria-pressed', 'false');
      btn.textContent = name;
      filtersBox.appendChild(btn);
    });
  }

  /* ---- 3. selection + highlight ---- */
  function selectRegion(id) {
    if (!byId[id]) return;
    current = id;
    qsa('.atlas-region', mapBox).forEach(function (path) {
      var active = path.getAttribute('data-state') === id;
      path.classList.toggle('is-selected', active);
    });
    renderProfile(id);
    if (svg) svg.focus();
    announce(byId[id].name + ', ' + byId[id].type + '. Selected. ' + byId[id].preview);
  }

  function onHover(e) {
    if (prefersReducedMotion) return;
    var id = e.currentTarget.getAttribute('data-state');
    qsa('.atlas-region', mapBox).forEach(function (path) {
      path.classList.toggle('is-hovered', path.getAttribute('data-state') === id);
    });
  }
  function offHover() {
    qsa('.atlas-region', mapBox).forEach(function (path) { path.classList.remove('is-hovered'); });
  }
  function onClick(e) {
    selectRegion(e.currentTarget.getAttribute('data-state'));
  }

  function clearSelection() {
    qsa('.atlas-region', mapBox).forEach(function (path) { path.classList.remove('is-selected', 'is-hovered'); });
    current = null;
    panel.innerHTML = '<div class="atlas-panel__placeholder">' +
      '<p class="atlas-panel__hint">Hover a state or union territory on the map to preview its echoes. Click to read its full profile.</p>' +
      '</div>';
  }

  /* ---- 4. profile rendering ---- */
  function renderProfile(id) {
    var p = ECHOES_ATLAS[id];
    if (!p) return;
    var h = [];
    h.push('<div class="atlas-profile" data-region="' + id + '">');
    // hero
    h.push('<header class="atlas-hero">');
    h.push('<h3 class="atlas-hero__title">' + escapeHTML(p.name) + '</h3>');
    h.push('<p class="atlas-hero__meta">' + escapeHTML(p.type) + ' \u00b7 ' + escapeHTML(p.region) +
      (p.capital ? ' \u00b7 ' + escapeHTML(p.capital) : '') + '</p>');
    if (p.languages && p.languages.length) {
      h.push('<p class="atlas-hero__lang">' + escapeHTML(p.languages.join(', ')) + '</p>');
    }
    h.push('<p class="atlas-hero__preview">' + escapeHTML(p.preview) + '</p>');
    h.push('</header>');
    // 14 sections in canonical order (wonder rendered separately at the end)
    var prof = p.profile || {};
    Object.keys(LABELS).forEach(function (key) {
      if (key === 'wonder') return;
      renderSection(h, key, prof[key]);
    });
    // "The Wonder We Carry" - only object section, special layout
    if (prof.wonder) {
      h.push('<div class="atlas-block atlas-wonder">');
      h.push('<h4 class="atlas-block__title">' + LABELS.wonder + '</h4>');
      if (prof.wonder.type) h.push('<span class="atlas-wonder__badge">' + escapeHTML(prof.wonder.type) + '</span>');
      if (prof.wonder.title) h.push('<p class="atlas-wonder__title">' + escapeHTML(prof.wonder.title) + '</p>');
      if (prof.wonder.note) h.push('<p class="atlas-wonder__note">' + escapeHTML(prof.wonder.note) + '</p>');
      h.push('</div>');
    }
    h.push('</div>');
    panel.innerHTML = h.join('');
    if (!prefersReducedMotion && panel.scrollIntoView) {
      panel.scrollIntoView({ block: 'nearest' });
    }
  }

  function renderSection(h, key, val) {
    if (val == null || val === '') return;
    h.push('<div class="atlas-block">');
    h.push('<h4 class="atlas-block__title">' + LABELS[key] + '</h4>');
    h.push('<div class="atlas-block__body">' + renderValue(key, val) + '</div>');
    h.push('</div>');
  }

  function renderValue(key, val) {
    if (typeof val === 'string') {
      return '<p class="atlas-para">' + escapeHTML(val) + '</p>';
    }
    if (Array.isArray(val)) {
      var tf = TITLE_FIELD[key];
      var items = val.map(function (it) {
        if (typeof it === 'string') return '<li>' + escapeHTML(it) + '</li>';
        var rest = [];
        Object.keys(it).forEach(function (k) {
          if (k === tf) return;
          var v = it[k];
          if (v == null || v === '') return;
          rest.push(escapeHTML(v));
        });
        return '<li><span class="atlas-item__title">' + escapeHTML(it[tf] || '') + '</span>' +
          (rest.length ? ' <span class="atlas-item__meta">' + escapeHTML(rest.join(' \u00b7 ')) + '</span>' : '') +
        '</li>';
      });
      return '<ul class="atlas-list">' + items.join('') + '</ul>';
    }
    return '<p class="atlas-para">' + escapeHTML(String(val)) + '</p>';
  }

  /* ---- 5. filtering + search (AND logic) ---- */
  function applies(id) {
    var r = byId[id];
    if (!r) return false;
    if (activeFilter === 'state') { if (r.type.toLowerCase() !== 'state') return false; }
    else if (activeFilter === 'ut') { if (r.type.toLowerCase() !== 'union territory') return false; }
    else if (activeFilter !== 'all') { if (r.region !== activeFilter) return false; }
    if (searchTerm) {
      var hay = (r.name + ' ' + (r.capital || '') + ' ' + r.region + ' ' + r.type).toLowerCase();
      if (hay.indexOf(searchTerm.toLowerCase()) === -1) return false;
    }
    return true;
  }

  function refreshVisibility() {
    qsa('.atlas-region', mapBox).forEach(function (path) {
      var visible = applies(path.getAttribute('data-state'));
      path.classList.toggle('is-filtered-out', !visible);
      path.setAttribute('tabindex', visible ? '0' : '-1');
    });
  }

  function visibleIds() {
    var seen = {}, out = [];
    qsa('.atlas-region', mapBox).forEach(function (path) {
      if (path.classList.contains('is-filtered-out')) return;
      var id = path.getAttribute('data-state');
      if (!seen[id]) { seen[id] = true; out.push({ id: id, path: path }); }
    });
    return out;
  }

  function bindSearch() {
    if (!search) return;
    on(search, 'input', debounce(function () {
      searchTerm = search.value || '';
      refreshVisibility();
    }, 200));
  }

  function bindFilters() {
    if (!filtersBox) return;
    var buttons = qsa('button[data-filter]', filtersBox);
    buttons.forEach(function (btn) {
      on(btn, 'click', function () {
        buttons.forEach(function (b) {
          var on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', String(on).toLowerCase());
        });
        activeFilter = btn.getAttribute('data-filter');
        refreshVisibility();
        announce(filterSummary());
      });
    });
  }

  function filterSummary() {
    if (activeFilter === 'all' && !searchTerm) return 'All regions shown.';
    var parts = [];
    if (activeFilter === 'state') parts.push('states');
    else if (activeFilter === 'ut') parts.push('union territories');
    else if (activeFilter !== 'all') parts.push(activeFilter.toLowerCase());
    if (searchTerm) parts.push('matching \u201c' + searchTerm + '\u201d');
    var n = visibleIds().length;
    return parts.length ? (parts.join(' + ') + ', ' + n + ' shown.') : 'No regions match.';
  }

  /* ---- 6. keyboard navigation (map container is the single tab stop) ---- */
  function onMapKey(e) {
    var list = visibleIds();
    if (!list.length) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      var idx = current ? list.findIndex(function (x) { return x.id === current; }) : -1;
      selectRegion(list[(idx + 1) % list.length].id);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      var idx2 = current ? list.findIndex(function (x) { return x.id === current; }) : 0;
      selectRegion(list[(idx2 - 1 + list.length) % list.length].id);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!current) selectRegion(list[0].id);
    } else if (e.key === 'Escape') {
      clearSelection();
    }
  }

  /* ---- 7. announcements (off-screen, polite) ---- */
  function announce(msg) {
    if (!announcer) return;
    setText(announcer, '');
    setTimeout(function () { setText(announcer, msg); }, 50);
  }

  /* ---- 8. deep-link (?region=dd) + history support ---- */
  function readDeepLink() {
    var m = location.search.match(/[?&=]region=([^&]+)/);
    if (m && byId[m[1]]) {
      activeFilter = 'all'; searchTerm = '';
      refreshVisibility();
      selectRegion(m[1]);
    }
  }
  on(window, 'popstate', function (e) {
    var id = (e.state && e.state.region) || null;
    if (id && byId[id]) selectRegion(id);
    else clearSelection();
  });

  /* ---- init ---- */
  function init() {
    injectMap();
    bindSearch();
    bindFilters();
    on(window, 'load', readDeepLink);
  }

  if (doc.readyState === 'complete' || doc.readyState === 'interactive') {
    init();
  } else {
    on(doc, 'DOMContentLoaded', init);
  }
})();