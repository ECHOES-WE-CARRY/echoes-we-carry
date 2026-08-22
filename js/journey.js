/* ==========================================================================
   ECHOES WE CARRY — PHASE 5 · BEGIN YOUR STORY ENGINE
   Build-your-culture journey: REGION → TRADITION → CRAFT → SOUND → STORY.
   All facts are pulled from the project's verified Phase 2–4 data sets
   (ECHOES_ATLAS, ECHOES_SOUND, ECHOES_EXPERIENCE) + js/journey-data.js.
   Audio is synthesised live as an interpretive placeholder (same stance as
   Phase 4). Vanilla JS, ES5 conventions, touches only its own IDs.
   ========================================================================== */
(function () {
  'use strict';

  if (typeof window.ECHOES_JOURNEY === 'undefined') return;

  var J = window.ECHOES_JOURNEY;
  var ATLAS = window.ECHOES_ATLAS || null;
  var SOUND = (window.ECHOES_SOUND && window.ECHOES_SOUND.regions) || null;
  var STORIES = (window.ECHOES_EXPERIENCE && window.ECHOES_EXPERIENCE.stories) || null;

  var doc = document;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = doc.getElementById('story');
  if (!root) return;

  /* ---- utils (mirror atlas.js/sound.js conventions) ---- */
  function qs(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function on(el, type, fn, opts) { if (el) el.addEventListener(type, fn, opts || false); }
  function esc(s) {
    if (s == null) return '';
    var d = doc.createElement('div');
    d.textContent = String(s);
    return d.innerHTML;
  }
  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

  /* ---- data lookups (all already-verified project data) ---- */
  function meta(id) { return ATLAS && ATLAS[id] ? ATLAS[id] : null; }
  function regionName(id) {
    var m = meta(id);
    if (m) return m.name;
    if (SOUND && SOUND[id]) return SOUND[id].name;
    return String(id).toUpperCase();
  }
  function regionZone(id) {
    var m = meta(id);
    if (m && m.region) return m.region;
    if (SOUND && SOUND[id]) return SOUND[id].zone;
    return 'India';
  }
  function craftsOf(id) {
    var m = meta(id);
    if (m && m.profile && Array.isArray(m.profile.crafts)) {
      return m.profile.crafts.slice(0, 3);
    }
    return [];
  }
  function traditionsOf(id) {
    return (J.traditions && J.traditions[id]) || [];
  }
  function soundOf(id) {
    if (SOUND && SOUND[id]) {
      var s = SOUND[id];
      return { id: id, name: s.name, zone: s.zone, modeName: s.modeName, desc: s.desc, instruments: s.instruments || [], tonic: s.tonic, tempo: s.tempo, scale: s.scale, classical: s.classical, folk: s.folk };
    }
    if (J.soundFallbacks && J.soundFallbacks[id]) {
      var f = J.soundFallbacks[id];
      return { id: id, name: regionName(id), zone: regionZone(id), modeName: f.modeName, desc: f.desc, instruments: f.instruments || [], tonic: f.tonic, tempo: f.tempo, scale: f.scale, classical: f.classical, folk: f.folk };
    }
    return null;
  }
  function storiesOrderedFor(region) {
    var all = STORIES ? STORIES.slice() : [];
    all.sort(function (a, b) {
      var ha = a.stateId === region ? 0 : 1;
      var hb = b.stateId === region ? 0 : 1;
      return ha - hb;
    });
    return all;
  }
/* ---- journey state ---- */
  var STEPS = ['region', 'tradition', 'craft', 'sound', 'story'];
  var picks = { region: null, tradition: null, craft: null, sound: null, story: null };
  var completed = 0;            // steps fully finished
  var answered = {};            // keys -> chosen label object
  var threadDrawn = 0;          // thread progress 0..5
  var particleRunning = 0;

  var threadPath = qs('#bys-path');
  var threadGlow = qs('#bys-path-glow');
  var rail = qs('#bys-rail');
  var journey = qs('#bys-journey');
  var stepper = qs('#bys-stepper');
  var stepBoxes = {};

  function stepEl(key) { return stepBoxes[key] || (stepBoxes[key] = qs('.bys-step[data-step="' + key + '"]')); }
  function selEl(key) { return qs('#bys-sel-' + key); }

  /* =====================================================================
     1. THREAD — the growing golden thread across the journey board
  ===================================================================== */
  var nodes = [];

  function layoutThread() {
    if (!rail || !threadPath) return;
    var w = rail.offsetWidth;
    var h = rail.offsetHeight;
    if (w <= 0 || h <= 0) return;
    try {
      threadPath.parentNode.setAttribute('viewBox', '0 0 ' + w.toFixed(1) + ' ' + h.toFixed(1));
    } catch (e) { /* noop */ }

    var x = w / 2;
    nodes = [];
    STEPS.forEach(function (key, i) {
      var el = stepEl(key);
      if (!el) return;
      var y = el.offsetTop + el.offsetHeight / 2;
      nodes.push({ key: key, x: x, y: y, i: i });
    });
    drawThreadPath();
    syncNodes();
  }

  function drawThreadPath() {
    if (!threadPath || !nodes.length) return;
    var d = 'M' + nodes[0].x.toFixed(1) + ' ' + nodes[0].y.toFixed(1);
    for (var i = 1; i < nodes.length; i++) {
      d += 'L' + nodes[i].x.toFixed(1) + ' ' + nodes[i].y.toFixed(1);
    }
    if (threadPath.getAttribute('d') !== d) {
      threadPath.setAttribute('d', d);
      if (threadGlow) threadGlow.setAttribute('d', d);
    }
  }

  function setThreadDrawn(n) {
    threadDrawn = clamp(n, 0, STEPS.length);
    if (!threadPath) return;
    threadPath.style.transition = reduced ? 'none' : 'stroke-dashoffset 1.2s var(--ease-elegant)';
    threadPath.style.strokeDashoffset = String(100 - (threadDrawn / STEPS.length) * 100);
  }

  function marker(key) {
    return qs('.bys-node[data-node="' + key + '"]', rail);
  }

  function syncNodes() {
    if (!rail) return;
    nodes.forEach(function (n) {
      var m = marker(n.key);
      if (!m) {
        m = doc.createElement('span');
        m.className = 'bys-node';
        m.setAttribute('data-node', n.key);
        m.innerHTML = '<i></i>';
        rail.appendChild(m);
      }
      m.style.top = n.y.toFixed(1) + 'px';
      m.style.left = n.x.toFixed(1) + 'px';
      var filled = STEPS.indexOf(n.key) < completed;
      m.classList.toggle('is-filled', filled);
      m.classList.toggle('is-answered', answered[n.key] != null);
    });
  }

  /* slow glowing particles that travel the drawn thread */
  var particles = [];
  var particleRaf = 0;

  function initParticles() {
    if (reduced) return;
    particles = qsa('.bys-thread__particle', rail);
    if (!particles.length || !threadPath) return;
    var loop = function (ts) {
      if (!particleRunning) return;
      if (!threadPath.getTotalLength) return;
      var total = threadPath.getTotalLength();
      if (!total) { particleRaf = window.requestAnimationFrame(loop); return; }
      var drawLen = (threadDrawn / STEPS.length) * 100;
      if (drawLen > 2) drawLen -= 2; else drawLen = 0;
      var usable = total * (drawLen / 100);
      for (var i = 0; i < particles.length; i++) {
        var seg = ((ts / 950) + i / particles.length) % 1;
        var p = particles[i];
        if (usable <= 0) { p.style.opacity = '0'; continue; }
        try {
          var pt = threadPath.getPointAtLength(clamp(seg, 0, 0.9999) * usable);
          p.style.transform = 'translate3d(' + pt.x.toFixed(1) + 'px,' + pt.y.toFixed(1) + 'px,0)';
          p.style.opacity = String(0.25 + 0.75 * Math.abs(Math.sin((seg + i) * 6.2831853)));
        } catch (e) { /* geometry not ready */ }
      }
      particleRaf = window.requestAnimationFrame(loop);
    };
    particleRunning = true;
    particleRaf = window.requestAnimationFrame(loop);
  }
/* =====================================================================
     2. STEP NAVIGATION
  ===================================================================== */
  var heroEl = qs('#bys-hero');
  var beginBtn = qs('#bys-begin');
  var current = 0;

  function activateStep(i) {
    current = clamp(i, 0, STEPS.length - 1);
    qsa('.bys-step', root).forEach(function (el, idx) {
      var act = idx === current;
      el.classList.toggle('is-active', act);
      el.setAttribute('aria-hidden', act ? 'false' : 'true');
    });
    qsa('.bys-stepper__item', stepper).forEach(function (b, idx) {
      b.classList.toggle('is-active', idx === current);
      b.setAttribute('aria-current', idx === current ? 'true' : 'false');
      b.disabled = idx > completed;
    });
  }

  function goto(key) {
    var i = STEPS.indexOf(key);
    if (i < 0) return;
    if (i > completed) return; // only completed/current steps are reachable
    activateStep(i);
    var el = stepEl(key);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
  }

  function announce(msg) {
    var el = qs('#bys-live');
    if (!el) {
      el = doc.createElement('p');
      el.id = 'bys-live';
      el.className = 'visually-hidden';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      root.appendChild(el);
    }
    el.textContent = msg;
  }

  /* ---- options rendering ------------------------------------------------- */
  function renderOptions(container, list, makeCard) {
    if (!container) return;
    var html = [];
    list.forEach(function (item, i) {
      html.push(makeCard(item, i));
    });
    container.innerHTML = html.join('');
  }

  function wireOptions(container, onPick) {
    if (!container) return;
    qsa('.bys-option', container).forEach(function (card) {
      on(card, 'click', function () {
        qsa('.bys-option', container).forEach(function (c) {
          c.classList.toggle('is-selected', c === card);
          c.setAttribute('aria-checked', c === card ? 'true' : 'false');
        });
        onPick(card.getAttribute('data-value'), card);
      });
    });
  }

  function setStepChoice(key, label, note) {
    answered[key] = { label: label, note: note || '' };
    picks[key] = label;
    syncNodes();
    var el = selEl(key);
    if (el) el.textContent = String(label) + (note ? ' — ' + String(note) : '');
    updateStepperPick(key, label);
  }

  function clearStepChoice(key) {
    answered[key] = null;
    picks[key] = null;
    syncNodes();
    var el = selEl(key);
    if (el) el.textContent = '';
    updateStepperPick(key, '');
  }

/* =====================================================================
     3. REGION STEP — interactive India map
  ===================================================================== */
  var regionMap = qs('#bys-region-map');
  var regionChips = qs('#bys-region-chips');
  var regionListCache = [];

  function installRegionMap() {
    if (!regionMap || typeof window.ATLAS_INDIA_SVG === 'undefined') return;
    var svgOnly = String(window.ATLAS_INDIA_SVG)
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<title[^>]*>[\s\S]*?<\/title>/g, '');
    regionMap.innerHTML = svgOnly;
    var svg = qs('svg', regionMap);
    if (svg) {
      svg.classList.add('bys-map');
      svg.setAttribute('focusable', 'false');
    }
    qsa('.atlas-region', regionMap).forEach(function (p) {
      var id = p.getAttribute('data-state');
      if (!id) return;
      var featured = J.regions.indexOf(id) !== -1;
      p.classList.toggle('is-featured', featured);
      if (!featured) return;
      p.setAttribute('tabindex', '0');
      p.setAttribute('role', 'button');
      p.setAttribute('aria-label', 'Choose ' + regionName(id));
      on(p, 'click', function (e) { e.preventDefault(); chooseRegion(id); });
      on(p, 'keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chooseRegion(id); }
      });
    });
    regionListCache = qsa('.atlas-region', regionMap);
  }

  function regionPaths() {
    if (!regionPathsCache.length) regionPathsCache = qsa('.atlas-region', regionMap);
    return regionPathsCache;
  }
  var regionPathsCache = [];

  function chooseRegion(id) {
    picks.region = id;
    gainRegion(id);
    drawRegionState(id);
    refreshStep('region');
    announce(regionName(id) + ' chosen. Now choose a tradition to carry from ' + regionName(id) + '.');
  }

  function drawRegionState(id) {
    regionPaths().forEach(function (p) {
      var pid = p.getAttribute('data-state');
      p.classList.toggle('is-lit', pid === id);
      p.classList.toggle('is-dim', pid !== id);
    });
    qsa('.region-chip', regionChips).forEach(function (c) {
      c.classList.toggle('is-active', c.getAttribute('data-id') === id);
      c.setAttribute('aria-pressed', c.getAttribute('data-id') === id ? 'true' : 'false');
    });
    var m = meta(id);
    var lede = qs('[data-lede="region"]', root);
    if (lede) lede.textContent = m && m.preview ? m.preview.split('.')[0] + '.' : regionName(id);
  }

  function gainRegion(id) {
    var el = selEl('region');
    if (!el) return;
    var m = meta(id);
    var preview = m && m.preview ? m.preview : 'A ground with songs, looms and skies of its own.';
    el.innerHTML = '<strong>' + esc(regionName(id)) + '</strong> &middot; ' + esc(regionZone(id)) +
      ' India<br /><em>' + esc(preview) + '</em>';
  }

  function buildRegionChips() {
    if (!regionChips) return;
    var html = [];
    J.regions.forEach(function (id) {
      html.push('<button type="button" class="region-chip" data-id="' + esc(id) + '">' + esc(regionName(id)) + '</button>');
    });
    regionChips.innerHTML = html.join('');
    qsa('.region-chip', regionChips).forEach(function (c) {
      on(c, 'click', function () { chooseRegion(c.getAttribute('data-id')); });
    });
  }
  function updateStepperPick(key, label) {
    qsa('[data-stepper-pick="' + key + '"]').forEach(function (p) {
      p.textContent = label ? String(label) : '';
    });
  }

  function bysBtn(key) { return qs('.bys-step[data-step="' + key + '"] .bys-next'); }
  function bysBack(key) { return qs('.bys-step[data-step="' + key + '"] [data-back]'); }

  function refreshStep(key) {
    var btn = bysBtn(key);
    if (btn) btn.disabled = answered[key] == null;
    if (key === 'story' && btn) {
      btn.setAttribute('aria-disabled', answered[key] == null ? 'true' : 'false');
      btn.setAttribute('tabindex', answered[key] == null ? '-1' : '0');
    }
    var back = bysBack(key);
    if (back) back.disabled = key === 'region';
  }

/* =====================================================================
     4. TRADITION · CRAFT · SOUND · STORY builders
  ===================================================================== */
  function buildTraditionStep() {
    var box = qs('#bys-options-tradition');
    if (!box) return;
    var list = traditionsOf(picks.region);
    if (!list.length) {
      var m = meta(picks.region);
      if (m && m.profile) {
        list = [];
        if (m.profile.dance) list.push({ title: m.profile.dance.split(',')[0].split(';')[0].trim(), note: m.profile.dance });
        if (m.profile.music) list.push({ title: m.profile.music.split(',')[0].split(';')[0].trim(), note: m.profile.music });
        if (m.profile.festivals && m.profile.festivals.length) {
          m.profile.festivals.slice(0, 2).forEach(function (f) {
            list.push({ title: f.name, note: f.note });
          });
        }
        list = list.slice(0, 3);
      }
    }
    renderOptions(box, list, function (t, i) {
      return '<button type="button" class="bys-option bys-option--card" data-value="' + esc(t.title) +
        '" role="radio" aria-checked="false" tabindex="' + (i === 0 ? '0' : '-1') + '">' +
        '<span class="bys-option__glyph" aria-hidden="true"><svg viewBox="0 0 24 24" class="icon"><circle cx="12" cy="12" r="7.5"/><path d="M12 4.5a7.5 7.5 0 0 1 0 15"/></svg></span>' +
        '<span class="bys-option__body"><strong>' + esc(t.title) + '</strong>' +
        '<em>' + esc(t.note) + '</em></span>' +
        '<span class="bys-option__check" aria-hidden="true"><svg viewBox="0 0 24 24" class="icon"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span></button>';
    });
    wireOptions(box, function (v, card) {
      var idx = Number(card.getAttribute('data-index') || 0);
      var t = list[idx];
      if (!t) return;
      setStepChoice('tradition', t.title, t.note);
      refreshStep('tradition');
    });
    qsa('.bys-option', box).forEach(function (c, idx) { c.setAttribute('data-index', String(idx)); });
  }
/* ---- SOUND step + mini synth ----------------------------------------- */
  var audioCtx = null;
  var currentGain = null;

  function ensureAudio() {
    if (audioCtx) {
      if (audioCtx.state === 'suspended' && audioCtx.resume) {
        try {
          var pr = audioCtx.resume();
          if (pr && pr.catch) pr.catch(function () { /* autoplay policy */ });
        } catch (e) { /* noop */ }
      }
      return audioCtx;
    }
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
    return audioCtx;
  }

  /* Soft interpretive chime: low drone + a short pluck run up the raga scale */
  function playEcho(cfg, bars) {
    var ctx = ensureAudio();
    if (!ctx) return;
    var master = ctx.createGain();
    master.gain.value = 0.0;
    master.connect(ctx.destination);
    master.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 0.35);

    var tone = cfg.tonic || 130.81;
    var scale = cfg.scale || [0, 2, 4, 7, 9];

    /* drone */
    var o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.value = tone / 2;
    var og = ctx.createGain();
    og.gain.value = 0.5;
    var lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 420;
    o.connect(og); og.connect(lp); lp.connect(master);
    o.start();
    o.stop(ctx.currentTime + 5.2);

        /* plucks, one quarter note apart */
    var i;
    for (i = 0; i < 6; i++) {
      var semi = scale[(i * 2) % scale.length] + (i > 2 ? 12 : 0);
      var freq = tone * Math.pow(2, semi / 12);
      (function (noteFreq, tStart) {
        var p = ctx.createOscillator();
        p.type = 'sine';
        p.frequency.value = noteFreq;
        var pg = ctx.createGain();
        pg.gain.setValueAtTime(0.5, tStart);
        pg.gain.exponentialRampToValueAtTime(0.001, tStart + 1.6);
        var bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = noteFreq;
        bp.Q.value = 2.2;
        p.connect(bp); bp.connect(pg); pg.connect(master);
        p.start(tStart);
        p.stop(tStart + 1.7);
      })(freq, ctx.currentTime + 0.3 + i * 0.24);
    }

    /* a soft bell-bounce to mark the choice */
    var b = ctx.createOscillator();
    b.type = 'sine';
    b.frequency.value = tone * 2;
    var bg = ctx.createGain();
    bg.gain.setValueAtTime(0.12, ctx.currentTime);
    bg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    b.connect(bg); bg.connect(master);
    b.start();
    b.stop(ctx.currentTime + 1.3);

    if (bars) flashBars(4);
  }

  function flashBars(times) {
    var eq = qs('.bys-eq', root);
    if (!eq) return;
    var cs = qsa('i', eq);
    var n = 0;
    var t = window.setInterval(function () {
      n++;
      if (n > times) { window.clearInterval(t); return; }
      cs.forEach(function (b) {
        var v = 0.3 + Math.random() * 0.7;
        b.style.transform = 'scaleY(' + v + ')';
      });
    }, 260);
    window.setTimeout(function () {
      cs.forEach(function (b) { b.style.transform = 'scaleY(0.18)'; });
    }, times * 260 + 200);
  }

  function buildSoundStep() {
    var box = qs('#bys-options-sound');
    if (!box) return;
    var list = [];
    var own = picks.region;
    var ownCfg = soundOf(own);
    var seen = {};
    if (ownCfg) { list.push(ownCfg); seen[ownCfg.id] = true; }
    (J.soundRotation || []).forEach(function (id) {
      if (seen[id]) return;
      var cfg = soundOf(id);
      if (cfg) { list.push(cfg); seen[id] = true; }
    });
    /* also surface the region map's non-chosen sounds so no region is orphaned */
    J.regions.forEach(function (id) {
      if (seen[id]) return;
      if (list.length >= 7) return;
      var cfg = soundOf(id);
      if (cfg) { list.push(cfg); seen[id] = true; }
    });

    renderOptions(box, list, function (cfg, i) {
      var instr = (cfg.instruments || []).slice(0, 3);
      return '<div class="bys-option bys-option--sound' + (cfg.id === own ? ' is-own' : '') + '"' +
        ' role="radio" aria-checked="false" tabindex="' + (i === 0 ? '0' : '-1') +
        '" data-value="' + esc(cfg.id) + '" data-index="' + i + '">' +
        '<button type="button" class="bys-sound__play" aria-label="Hear a synthesised hint of ' + esc(cfg.name) + '">' +
        '<svg viewBox="0 0 24 24" class="icon bys-sound__playicon"><path d="M8 5v14l11-7z"/></svg></button>' +
        '<div class="bys-sound__body">' +
        (cfg.id === own ? '<span class="bys-sound__tag">Your region\u2019s rhythm</span>' :
          '<span class="bys-sound__zone">' + esc(cfg.zone) + ' India</span>') +
        '<strong>' + esc(cfg.name) + '</strong>' +
        '<em>' + esc(cfg.modeName) + '</em>' +
        '<span class="bys-sound__instr">' + instrChips(cfg) + '</span>' +
        '<span class="bys-eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>' +
        '</div></div>';
    });

    function instrChips(cfg) {
      return (cfg.instruments || []).slice(0, 4).map(function (n) {
        return '<i>' + esc(n) + '</i>';
      }).join('');
    }

    wireOptions(box, function (v, card) {
      var cfg = list[Number(card.getAttribute('data-index') || 0)];
      if (!cfg) return;
      playChime(cfg);
      setStepChoice('sound', cfg.name + ' · ' + cfg.modeName, cfg.desc || '');
      refreshStep('sound');
    });
    qsa('.bys-sound__play', box).forEach(function (btn) {
      on(btn, 'click', function (e) {
        e.stopPropagation();
        var card = btn.closest('.bys-option');
        var cfg = list[Number(card && card.getAttribute('data-index') || 0)];
        if (cfg) playChime(cfg);
      });
    });
  }

  function buildCraftStep() {
    var box = qs('#bys-options-craft');
    if (!box) return;
    var list = craftsOf(picks.region);
    renderOptions(box, list, function (c, i) {
      return '<button type="button" class="bys-option bys-option--card" data-value="' + esc(c.craft) + '"' +
        ' role="radio" aria-checked="false" tabindex="' + (i === 0 ? '0' : '-1') + '">' +
        '<span class="bys-option__glyph" aria-hidden="true"><svg viewBox="0 0 24 24" class="none"><path d="M4 7.5h16M4 12h16M4 16.5h16"/></svg></span>' +
        '<span class="bys-option__body"><strong>' + esc(c.craft) + '</strong>' +
        '<em>' + esc(c.place) + ' — ' + esc(c.note) + '</em></span>' +
        '<span class="bys-option__check" aria-hidden="true"><svg viewBox="0 0 24 24" class="icon"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>' +
        '</button>';
    });
    wireOptions(box, function (v, card) {
      var idx = Number(card.getAttribute('data-index') || 0);
      var c = list[idx];
      if (!c) return;
      setStepChoice('craft', c.craft, c.place + ' · ' + c.note);
      weaveThread(c);
      refreshStep('craft');
    });
    qsa('.bys-option', box).forEach(function (c, i) { c.setAttribute('data-index', String(i)); });
  }

  function weaveThread(craft) {
    var weave = qs('.bys-weave', root);
    if (!weave) return;
    if (craft && craft.craft !== '') weave.classList.add('is-live');
    if (reduced) return;
    /* animate the weave bands in sequence */
    var lines = qsa('.bys-weave__thread', weave);
    lines.forEach(function (l, i) {
      l.style.transitionDelay = (0.15 * i) + 's';
    });
  }
function playChime(cfg) {
    if (!cfg) return;
    playEcho(cfg, true);
  }

  /* ---- STORY step -------------------------------------------------------- */
  function buildStoryStep() {
    var box = qs('#bys-options-story');
    if (!box) return;
    var list = storiesOrderedFor(picks.region || '');
    renderOptions(box, list, function (s, i) {
      return '<button type="button" class="bys-option bys-option--card" data-value="' + esc(s.title) + '"' +
        ' role="radio" aria-checked="false" tabindex="' + (i === 0 ? '0' : '-1') + '">' +
        (s.stateId === picks.region ? '<span class="bys-option__tag">From your region</span>' : '') +
        '<span class="bys-option__glyph" aria-hidden="true"><svg viewBox="0 0 24 24" class="icon"><path d="M4 5h16v11H9l-5 4z"/></svg></span>' +
        '<span class="bys-option__body"><strong>' + esc(s.title) + '</strong>' +
        '<em>' + esc(s.tagline) + '</em>' +
        '<span class="bys-option__meta">' + esc(s.region) + ' &middot; ' + esc(s.cat) + '</span></span>' +
        '<span class="bys-option__check" aria-hidden="true"><svg viewBox="0 0 24 24" class="icon"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>' +
        '</button>';
    });
    wireOptions(box, function (v, card) {
      var idx = Number(card.getAttribute('data-index') || 0);
      var s = list[idx];
      if (!s) return;
      setStepChoice('story', s.title, s.tagline + ' — ' + s.region);
      refreshStep('story');
    });
    qsa('.bys-option', box).forEach(function (c, i) { c.setAttribute('data-index', String(i)); });
  }

  /* =====================================================================
     5. FINISH — the heritage card (YOUR ECHO)
  ===================================================================== */
  function finishJourney() {
    if (completed < STEPS.length) completed = STEPS.length;
    setThreadDrawn(completed);
    renderEchoCard();
    var target = qs('#your-echo');
    if (target) target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }

  function renderEchoCard() {
    var no = qs('#bys-card-no');
    if (no) no.textContent = String(100 + Math.floor(Math.random() * 900));

    var p = picks;
    function fillMap() {
      var out = {};
      out.region = p.region ? regionName(p.region) : '—';
      out.tradition = p.tradition || '—';
      out.craft = p.craft || '—';
      out.sound = p.sound || '—';
      out.story = p.story || '—';
      return out;
    }
    var vals = fillMap();
    ['region', 'tradition', 'craft', 'sound', 'story'].forEach(function (k) {
      var el = qs('#bys-val-' + k);
      if (el) {
        el.textContent = vals[k];
        el.parentNode.classList.add('is-filled');
      }
    });

    var st = qs('#bys-card-statement');
    if (st) {
      var soundName = vals.sound === '—' ? 'a rhythm of your own' : String(vals.sound).split(' · ')[0];
      var craftName = vals.craft === '—' ? 'a craft unnamed' : vals.craft;
      var storyName = vals.story === '—' ? 'a story untold' : vals.story;
      st.innerHTML = '“You chose the rhythm of <strong>' + esc(soundName) + '</strong>, the craft of <strong>' +
        esc(craftName) + '</strong>, and the story of <strong>' + esc(storyName) + '</strong>.”' +
        (vals.region && vals.region !== '—' ? '<cite>Carried from ' + esc(vals.region) + '.</cite>' : '');
    }

    var card = qs('#bys-echocard');
    if (card) card.classList.add('is-ready');
    announce('Your Echo is ready.');
  }

  function bindEchoCard() {
    var restart = qs('#bys-restart');
    if (restart) on(restart, 'click', function () { resetJourney(); });
  }

  function resetJourney() {
    [['region', ''], ['tradition', ''], ['craft', ''], ['sound', ''], ['story', '']].forEach(function (pair) {
      var k = pair[0];
      answered[k] = null;
      picks[k] = null;
    });
    completed = 0;
    setThreadDrawn(0);
    syncNodes();
    qsa('.bys-option', root).forEach(function (c) {
      c.classList.remove('is-selected');
      c.setAttribute('aria-checked', 'false');
    });
    regionPaths().forEach(function (p) {
      p.classList.remove('is-lit', 'is-dim');
    });
    qsa('.region-chip', regionChips).forEach(function (c) {
      c.classList.remove('is-active');
      c.setAttribute('aria-pressed', 'false');
    });
    STEPS.forEach(function (k) {
      var el = selEl(k);
      if (el) el.textContent = '';
      updateStepperPick(k, '');
      refreshStep(k);
    });
    var card = qs('#bys-echocard');
    if (card) card.classList.remove('in');
    var weave = qs('.bys-weave', root);
    if (weave) weave.classList.remove('is-live');
    qsa('.bys-step', root).forEach(function (s, i) { s.classList.remove('is-active'); });
    activateStep(0);
    var hero = qs('#bys-hero');
    if (hero) hero.classList.remove('is-done');
    setThreadDrawn(0);
    goto('region');
  }
/* =====================================================================
     6. FINALE — "What will you carry?"
  ===================================================================== */
  var carryScene = qs('#bys-carry-scene');
  var carryRan = false;

  function runFinale() {
    if (carryRan) return;
    carryRan = true;
    if (carryScene) carryScene.classList.add('is-seen');

    var words = qsa('.bys-carry__word', qs('#carry'));
    var wait = reduced ? 0 : 320;
    words.forEach(function (w, i) {
      window.setTimeout(function () {
        w.classList.add('is-out');
        if (i < words.length - 1) {
          window.setTimeout(function () { w.classList.add('is-hidden'); }, reduced ? 0 : 950);
        }
      }, reduced ? 0 : wait + i * 760);
    });

    window.setTimeout(drawFinale, reduced ? 240 : wait + words.length * 760);
  }

  function drawFinale() {
    var mapBox = qs('#bys-carry-map');
    if (!mapBox) return;
    if (typeof window.ATLAS_INDIA_SVG === 'undefined') {
      var logo = qs('#bys-carry-logo');
      if (logo) logo.classList.add('is-lit');
      var tag = qs('#bys-carry-tagline');
      if (tag) tag.classList.add('is-lit');
      return;
    }
    if (reduced) {
      drawMapSilhouette();
      window.setTimeout(revealLogo, 260);
      return;
    }
    drawMapSilhouette();
  }

  function drawMapSilhouette() {
    var mapBox = qs('#bys-carry-map');
    if (!mapBox) return;
    var svgOnly = String(window.ATLAS_INDIA_SVG)
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<title[^>]*>[\s\S]*?<\/title>/g, '')
      .replace(/<defs[\s\S]*?<\/defs>/g, '');
    mapBox.innerHTML = svgOnly;
    var svg = qs('svg', mapBox);
    if (!svg) return;
    svg.classList.add('bys-map--thread');

    var paths = qsa('.atlas-region', mapBox);
    var total = paths.length;
    paths.forEach(function (p, idx) {
      try {
        var len = p.getTotalLength ? p.getTotalLength() : 400;
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);
        window.setTimeout(function () { p.style.strokeDashoffset = '0'; }, 240 + idx * 26);
      } catch (e) { /* noop */ }
    });
    window.setTimeout(function () { svg.classList.add('is-drawn'); }, 1200 + total * 26);
    window.setTimeout(revealLogo, 3200 + total * 26);
  }

  function revealLogo() {
    var scene = qs('#bys-carry-scene');
    var tag = qs('#bys-carry-tagline');
    if (scene) scene.classList.add('has-logo');
    if (tag) tag.classList.add('is-lit');
  }
/* =====================================================================
     7. MICRO-INTERACTIONS
  ===================================================================== */
  function wireMotion() {
    var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    if (reduced || !fine || !root) return;

    var motif = qs('.bys__motif', root);
    var aurora = qs('.bys__aurora', root);
    if (motif || aurora) {
      var rx = 0, ry = 0, tx = 0, ty = 0;
      on(root, 'mousemove', function (e) {
        var r = root.getBoundingClientRect();
        rx = (e.clientX - r.left) / r.width - 0.5;
        ry = (e.clientY - r.top) / r.height - 0.5;
      });
      (function drift() {
        tx += (rx - tx) * 0.05;
        ty += (ry - ty) * 0.05;
        if (motif) motif.style.transform = 'translate(' + (tx * -16).toFixed(2) + 'px,' + (ty * -12).toFixed(2) + 'px)';
        if (aurora) aurora.style.transform = 'translate(' + (tx * 12).toFixed(2) + 'px,' + (ty * 10).toFixed(2) + 'px)';
        window.requestAnimationFrame(drift);
      })();
    }

    root.addEventListener('pointerover', function (e) {
      var card = e.target && e.target.closest ? e.target.closest('.bys-option') : null;
      if (!card || card.classList.contains('bys-option--sound')) return;
      var move = function (ev) {
        var r = card.getBoundingClientRect();
        var dx = (ev.clientX - r.left) / r.width - 0.5;
        var dy = (ev.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--rx', (-dy * 7).toFixed(2) + 'deg');
        card.style.setProperty('--ry', (dx * 7).toFixed(2) + 'deg');
        card.style.setProperty('--gx', ((dx * 0.5 + 0.5) * 100).toFixed(1) + '%');
        card.style.setProperty('--gy', ((dy * 0.5 + 0.5) * 100).toFixed(1) + '%');
      };
      var done = function () {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
        card.removeEventListener('pointermove', move);
        card.removeEventListener('pointerleave', done);
      };
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerleave', done);
    });

    function magnetic(btn, strength) {
      var move = function (e) {
        var r = btn.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        btn.style.setProperty('--mx', (dx * strength).toFixed(1) + 'px');
        btn.style.setProperty('--my', (dy * strength).toFixed(1) + 'px');
      };
      var clear = function () { btn.style.setProperty('--mx', '0px'); btn.style.setProperty('--my', '0px'); };
      on(btn, 'mousemove', move);
      on(btn, 'mouseleave', clear);
    }
    qsa('.bys-btn', root).forEach(function (b) { magnetic(b, 0.13); });
    qsa('.bys-echocard__foot .bys-btn').forEach(function (b) { magnetic(b, 0.16); });
  }

  function wireHero() {
    if (!beginBtn) return;
    on(beginBtn, 'click', function () {
      if (heroEl) heroEl.classList.add('is-done');
      activateStep(0);
      goto('region');
      window.requestAnimationFrame(layoutThread);
    });
  }

  function wireStepper() {
    if (!stepper) return;
    qsa('.bys-stepper__item', stepper).forEach(function (b) {
      on(b, 'click', function () { goto(b.getAttribute('data-goto')); });
    });
  }

  function wireNextBack() {
    var map = { region: 'tradition', tradition: 'craft', craft: 'sound', sound: 'story' };
    Object.keys(map).forEach(function (key) {
      var btn = bysBtn(key);
      if (!btn) return;
      on(btn, 'click', function () {
        if (answered[key] == null) { announce('Choose first — what would you carry?'); return; }
        completed = Math.max(completed, current + 1);
        setThreadDrawn(completed);
        if (key === 'craft') animateWeaveFor('craft');
        var nxt = map[key];
        activateStep(STEPS.indexOf(nxt));
        var el = stepEl(nxt);
        if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
        window.requestAnimationFrame(layoutThread);
      });
    });

    var seal = qs('#bys-seal');
    if (seal) on(seal, 'click', function (e) {
      e.preventDefault();
      if (answered.story == null) { announce('Choose your story first.'); return; }
      finishJourney();
    });

    qsa('[data-back]', root).forEach(function (b) {
      on(b, 'click', function () {
        var key = b.getAttribute('data-back');
        var i = STEPS.indexOf(key);
        if (i < 0) return;
        completed = Math.max(0, i);
        setThreadDrawn(completed);
        activateStep(i);
        var el = stepEl(key);
        if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
      });
    });
  }

  function animateWeaveFor(key) {
    if (key !== 'craft') return;
    var weave = qs('.bys-weave', root);
    if (weave) weave.classList.add('is-live');
  }

/* =====================================================================
     8. INIT
  ===================================================================== */
  function initFinale() {
    var scene = qs('#carry');
    if (!scene) return;
    var started = false;

    function startOnce() {
      if (started) return;
      started = true;
      runFinale();
      window.removeEventListener('scroll', onScroll);
    }
    function onScroll() {
      if (started) return;
      var r = scene.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.72 && r.bottom > 0) startOnce();
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) startOnce();
        });
      }, { threshold: 0.3 });
      io.observe(scene);
    }
    on(window, 'scroll', onScroll, { passive: true });
    onScroll();

    /* dev/e2e hook — inert without ?e2e=1 (headless cannot scroll) */
    if (/[?&]e2e=1/.test(window.location.search)) {
      window.__bysFinale = startOnce;
      window.__bysLayout = layoutThread;
    }
  }

  function layoutWatch() {
    var t;
    on(window, 'resize', function () {
      clearTimeout(t);
      t = window.setTimeout(function () { layoutThread(); }, 180);
    });
  }

  function init() {
    if (!journey || !root) return;

    buildRegionChips();
    installRegionMap();

    wireHero();
    wireStepper();
    wireNextBack();
    bindEchoCard();
    wireMotion();

    activateStep(0);

    /* dependent steps rebuild whenever the region is (re)chosen */
    var origChoose = chooseRegion;
    chooseRegion = function (id) {
      origChoose(id);
      answered.region = { label: regionName(id) };
      updateStepperPick('region', regionName(id));
      refreshStep('region');
      syncNodes();
      buildTraditionStep();
      buildCraftStep();
      buildSoundStep();
      buildStoryStep();
    };

    setThreadDrawn(0);

    if ('IntersectionObserver' in window) {
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { layoutThread(); io2.disconnect(); }
        });
      }, { threshold: 0.05 });
      io2.observe(journey);
    }

    layoutThread();
    initParticles();
    layoutWatch();
    initFinale();
  }

  function layouts() { layoutThread(); }

  window.addEventListener('load', function () { layouts(); });

  if (doc.readyState === 'loading') {
    on(doc, 'DOMContentLoaded', init);
  } else {
    init();
  }
})();