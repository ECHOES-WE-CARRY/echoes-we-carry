/* ==========================================================================
   ECHOES WE CARRY — PHASE 4 · SOUND OF INDIA ENGINE
   Map-connected regional sound cards + a generative Web Audio player.
   All audio is synthesised live (drone, melody phrases, percussion) as an
   interpretive placeholder — no recordings ship, nothing copyrighted.
   Vanilla ES5 mirroring main.js/atlas.js conventions.
   ========================================================================== */
(function () {
  'use strict';

  if (typeof window.ECHOES_SOUND === 'undefined' ||
      typeof window.ATLAS_INDIA_SVG === 'undefined') {
    return;
  }

  var D = window.ECHOES_SOUND;
  var doc = document;
  var reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- utils (mirror main.js) ---- */
  function qs(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function on(el, type, fn, opts) { if (el) el.addEventListener(type, fn, opts || false); }
  function esc(s) {
    if (s == null) return '';
    var d = doc.createElement('div');
    d.textContent = String(s);
    return d.innerHTML;
  }

  var S = {
    root: qs('#sound'),
    mapBox: qs('#sound-map'),
    deck: qs('#sound-deck'),
    chips: qs('#sound-chips'),
    live: qs('#sound-live'),
    paths: [],
    byId: {},
    current: null,
    engine: null
  };
  if (!S.root || !S.mapBox || !S.deck) return;

  Object.keys(D.regions).forEach(function (id) { S.byId[id] = D.regions[id]; });

  /* ---- map wiring ------------------------------------------------------- */
  function installMap() {
    S.mapBox.innerHTML = stripIds(window.ATLAS_INDIA_SVG);
    var svgEl = qs('svg', S.mapBox);
    if (svgEl) {
      svgEl.classList.add('mini-map');
      svgEl.setAttribute('aria-hidden', 'true');
      svgEl.setAttribute('focusable', 'false');
    }
    S.paths = qsa('.atlas-region', S.mapBox);
    S.paths.forEach(function (p) {
      var id = p.getAttribute('data-state');
      p.setAttribute('tabindex', '-1');
      if (!S.byId[id]) return;
      p.classList.add('has-sound');
      on(p, 'click', function () { selectRegion(id); });
      on(p, 'mouseenter', function () {
        if (!reducedMotion && S.current !== id) pulseAt(id);
      });
    });
  }

  /* soft glow marks playable states before anything is selected */
  function markPlayable() {
    S.paths.forEach(function (p) {
      p.classList.toggle('has-sound', !!S.byId[p.getAttribute('data-state')]);
    });
  }

  function highlight(id) {
    S.paths.forEach(function (p) {
      var pid = p.getAttribute('data-state');
      p.classList.toggle('is-lit', pid === id);
      p.classList.toggle('is-dim', !!S.current && pid !== id);
    });
    pulseAt(id);
  }

  function clearHighlight() {
    S.paths.forEach(function (p) { p.classList.remove('is-lit', 'is-dim'); });
    var dot = qs('.sound-pulse', S.mapBox);
    if (dot && dot.parentNode) dot.parentNode.removeChild(dot);
  }

  /* pulsing beacon pinned to a region centroid (percent of viewBox) */
  function pulseAt(id) {
    var p = qs('.atlas-region[data-state="' + id + '"]', S.mapBox);
    var svgEl = qs('svg', S.mapBox);
    if (!p || !svgEl) return;
    try {
      var b = p.getBBox();
      var vb = (svgEl.getAttribute('viewBox') || '').split(/\s+/).map(Number);
      if (vb.length !== 4 || !vb[2]) return;
      var x = ((b.x + b.width / 2) - vb[0]) / vb[2] * 100;
      var y = ((b.y + b.height / 2) - vb[1]) / vb[3] * 100;
      var dot = qs('.sound-pulse', S.mapBox);
      if (!dot) {
        dot = doc.createElement('span');
        dot.className = 'sound-pulse';
        dot.setAttribute('aria-hidden', 'true');
        S.mapBox.appendChild(dot);
      }
      dot.style.left = x.toFixed(2) + '%';
      dot.style.top = y.toFixed(2) + '%';
    } catch (e) { /* geometry not ready yet */ }
  }

  /* ---- quick-switch chips ----------------------------------------------- */
  function stripIds(m) {
    return String(m).replace(/\s+(?:id|aria-labelledby)="[^"]*"/g, '');
  }

  function regionLabel(id) {
    if (S.byId[id]) return S.byId[id].name;
    if (window.ECHOES_ATLAS && window.ECHOES_ATLAS[id]) return window.ECHOES_ATLAS[id].name;
    return String(id).toUpperCase();
  }

  function announce(msg) { if (S.live) S.live.textContent = msg; }

  function buildChips() {
    if (!S.chips) return;
    var order = Object.keys(S.byId).sort(function (a, b) {
      return S.byId[a].name.localeCompare(S.byId[b].name);
    });
    var html = [];
    order.forEach(function (id) {
      html.push('<button type="button" class="sound-chip" data-region="' + esc(id) + '">' +
        esc(S.byId[id].name) + '</button>');
    });
    S.chips.innerHTML = html.join('');
    qsa('.sound-chip', S.chips).forEach(function (btn) {
      on(btn, 'click', function () { selectRegion(btn.getAttribute('data-region')); });
    });
  }

  function placeholderDeck() {
    S.deck.innerHTML =
      '<div class="sound-placeholder"><p>Choose a glowing state on the map \u2014 or a chip below \u2014 and its rhythm will find you.</p><span aria-hidden="true">\u266A \u266B \u266A</span></div>';
  }

  function selectRegion(id) {
    var cfg = S.byId[id];
    if (!cfg) return;
    if (S.engine && S.engine.playing()) S.engine.stop();
    S.current = id;
    qsa('.sound-chip', S.chips).forEach(function (c) {
      c.classList.toggle('is-active', c.getAttribute('data-region') === id);
    });
    highlight(id);
    renderDeck(id, cfg);
    announce(cfg.name + ': ' + cfg.modeName + '. Press play to listen.');
  }

  /* take the visitor to the full Phase-2 Atlas profile for this state */
  function goToAtlas(id) {
    var atlas = qs('#atlas');
    if (!atlas) return;
    atlas.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
    window.setTimeout(function () {
      var path = qs('#atlas-map .atlas-region[data-state="' + id + '"]');
      if (path && typeof MouseEvent === 'function') {
        try { path.dispatchEvent(new MouseEvent('click', { bubbles: false })); } catch (e) { /* noop */ }
      }
    }, reducedMotion ? 250 : 750);
  }

  /* ---- deck rendering ---------------------------------------------------- */
  function renderDeck(id, cfg) {
    var h = [];
    h.push('<article class="sound-card is-entering" data-region="' + esc(id) + '">');
    h.push('<header class="sound-card__head"><div>');
    h.push('<p class="sound-card__zone">' + esc(cfg.zone) + ' India</p>');
    h.push('<h3 class="sound-card__title">' + esc(cfg.name) + '</h3>');
    h.push('<p class="sound-card__mode">' + esc(cfg.modeName) + '</p>');
    h.push('</div></header>');
    h.push('<p class="sound-card__desc">' + esc(cfg.desc) + '</p>');
    h.push('<dl class="sound-card__facts">');
    h.push('<div><dt>Classical</dt><dd>' + esc(cfg.classical) + '</dd></div>');
    h.push('<div><dt>Folk</dt><dd>' + esc(cfg.folk) + '</dd></div>');
    h.push('<div><dt>Instruments</dt><dd class="sound-instr">' +
      cfg.instruments.map(function (i) { return '<span class="instr-chip">' + esc(i) + '</span>'; }).join('') +
      '</dd></div>');
    h.push('<div><dt>Songs of the season</dt><dd><strong>' + esc(cfg.festivalSong.name) +
      '</strong> \u2014 ' + esc(cfg.festivalSong.note) + '</dd></div>');
    h.push('</dl>');
    h.push('<div class="sp" data-sp></div>');
    h.push('<footer class="sound-card__foot">');
    h.push('<button type="button" class="text-link sound-atlas-link"><span>Hear more of ' +
      esc(cfg.name) + ' in the Atlas</span>' +
      '<svg class="icon text-link__arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg></button>');
    h.push('</footer>');
    h.push('</article>');
    S.deck.innerHTML = h.join('');

    on(qs('.sound-atlas-link', S.deck), 'click', function () { goToAtlas(id); });

    mountPlayer(id, cfg);

    var card = qs('.sound-card', S.deck);
    if (card && !reducedMotion) {
      window.requestAnimationFrame(function () { card.classList.add('is-in'); });
    } else if (card) {
      card.classList.add('is-in');
    }
  }

  /* player mount lives below (function declarations hoist within this IIFE) */

/* ---- player mount ------------------------------------------------------ */
  function mountPlayer(id, cfg) {
    var host = qs('[data-sp]', S.deck);
    if (!host) return;

    S.engine = createEngine(cfg);

    var bars = '';
    for (var b = 0; b < 12; b++) bars += '<i></i>';

    host.innerHTML =
      '<div class="sp__inner">' +
        '<button type="button" class="sp-play" aria-pressed="false"' +
          ' aria-label="Play synthesised interpretation of ' + esc(cfg.name) + ' music">' +
          '<svg class="icon sp-play__icon sp-play__icon--play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>' +
          '<svg class="icon sp-play__icon sp-play__icon--pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>' +
        '</button>' +
        '<div class="sp-meta">' +
          '<div class="sp-eq" aria-hidden="true">' + bars + '</div>' +
          '<div class="sp-status"><span class="sp-state">Synth ready</span><span class="sp-cycle"></span></div>' +
        '</div>' +
        '<label class="sp-vol"><span class="visually-hidden">Volume</span>' +
          '<input type="range" min="0" max="100" value="70" aria-label="Volume" />' +
        '</label>' +
      '</div>' +
      '<p class="sp-disclosure">Synthesised interpretation rendered live by your browser \u2014 a respectful placeholder, not a field recording.</p>';

    var btn = qs('.sp-play', host);
    var stateEl = qs('.sp-state', host);
    var cycleEl = qs('.sp-cycle', host);
    var volEl = qs('input[type="range"]', host);
    var eqEls = qsa('.sp-eq i', host);
    var levelsN = Math.min(12, eqEls.length) || 1;
    var levels = [];
    for (var i = 0; i < levelsN; i++) levels.push(0);
    var rafId = 0;

    function setUI(isPlaying) {
      btn.classList.toggle('is-playing', isPlaying);
      btn.setAttribute('aria-pressed', String(isPlaying));
      btn.setAttribute('aria-label', (isPlaying ? 'Pause' : 'Play') +
        ' synthesised interpretation of ' + cfg.name + ' music');
      host.classList.toggle('is-playing', isPlaying);
      stateEl.textContent = isPlaying ? 'Now sounding \u00b7 ' + cfg.modeName : 'Paused';
      if (!isPlaying && !reducedMotion) {
        eqEls.forEach(function (el) { el.style.transform = ''; });
      }
    }

    function frame() {
      if (!S.engine || !playing()) return;
      if (!reducedMotion) {
        S.engine.levels(levels);
        for (var j = 0; j < eqEls.length; j++) {
          var v = levels[j % levelsN];
          eqEls[j].style.transform = 'scaleY(' + (0.16 + v * 0.84).toFixed(3) + ')';
        }
      }
      rafId = window.requestAnimationFrame(frame);
    }

    function playing() {
      return btn.classList.contains('is-playing');
    }

    on(btn, 'click', function () {
      if (!S.engine.ready()) {
        announce('Audio synthesis is not available in this browser.');
        return;
      }
      if (playing()) {
        S.engine.stop();
        setUI(false);
        window.cancelAnimationFrame(rafId);
      } else {
        if (S.current !== id) { selectRegion(id); return; }
        S.engine.start();
        setUI(true);
        window.cancelAnimationFrame(rafId);
        rafId = window.requestAnimationFrame(frame);
      }
    });

    on(volEl, 'input', function () {
      S.engine.setVolume(parseInt(volEl.value, 10) / 100);
    });

    S.engine.onCycle = function (n) { cycleEl.textContent = 'cycle ' + n; };
    S.engine.onStop = function () { setUI(false); };
  }

  /* ---- generative audio engine (part 1: voices + patterns) ----------------- */
  var PHRASES = {
    hindustani: [
      [[0,2],[1,1],[2,1],[3,2],[4,2],[3,1],[2,1],[1,2],[0,2]],
      [[4,1],[5,1],[6,2],[7,3],[6,1],[4,2],[2,2],[0,3]]
    ],
    carnatic: [
      [[0,1],[1,1],[2,2],[1,1],[0,2],[4,2],[3,2],[2,2]],
      [[7,2],[6,1],[4,1],[5,2],[4,2],[2,2],[1,2],[0,2]]
    ],
    folk: [
      [[0,1],[2,1],[3,2],[2,1],[4,2],[3,2],[1,2],[0,2]],
      [[4,2],[3,1],[2,1],[3,2],[1,2],[0,3]]
    ]
  };
  var PERC = {
    hindustani: ['dha','dhin','dhin','dha','dha','dhin','dhin','dha','dha','tin','tin','na','na','dhin','dhin','dha'],
    carnatic: ['tam','dhi','thom','nam','tam','dhi','thom','nam'],
    folk: ['ge','na','ge','ge','na','dha','ge','na']
  };

  function beatDurOf(cfg) { return 60 / cfg.tempo / 2; }

  function degFreq(cfg, deg) {
    var n = cfg.scale.length;
    var oct = Math.floor(deg / n);
    var idx = ((deg % n) + n) % n;
    return cfg.tonic * Math.pow(2, oct + cfg.scale[idx] / 12);
  }

  /* synth voice factory — one per engine instance */
  function makeVoices(ctx, master, noiseBuf, cfg) {

    function drone(t, live) {
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.15, t + 1.6);
      var lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 1150;
      g.connect(lp);
      lp.connect(master);
      [[cfg.tonic, 'triangle', 0.5], [cfg.tonic * 2.003, 'sine', 0.3], [cfg.tonic / 2, 'sine', 0.3]]
        .forEach(function (p) {
          var o = ctx.createOscillator();
          o.type = p[1];
          o.frequency.value = p[0];
          var og = ctx.createGain();
          og.gain.value = p[2];
          o.connect(og);
          og.connect(g);
          o.start(t);
          live.push(o);
        });
      live.gainNode = g;
    }

    function pluck(freq, t) {
      var o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.value = freq;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.09, t);
      g.gain.exponentialRampToValueAtTime(0.0008, t + 0.55);
      o.connect(g);
      g.connect(master);
      o.start(t);
      o.stop(t + 0.6);
    }

    function note(deg, t, beats) {
      var dur = beats * beatDurOf(cfg);
      var freq = degFreq(cfg, deg);
      var o = ctx.createOscillator();
      o.type = cfg.texture === 'folk' ? 'square' : (cfg.texture === 'carnatic' ? 'sine' : 'triangle');
      o.frequency.setValueAtTime(freq * 0.5, t);
      o.frequency.setTargetAtTime(freq, t, 0.06);
      var vib = ctx.createOscillator();
      vib.frequency.value = 5.2;
      var vibG = ctx.createGain();
      vibG.gain.value = 6;
      vib.connect(vibG);
      vibG.connect(o.detune);
      var g = ctx.createGain();
      var peak = cfg.texture === 'folk' ? 0.1 : 0.16;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(peak, t + 0.07);
      g.gain.setValueAtTime(peak, t + Math.max(0.09, dur - 0.18));
      g.gain.exponentialRampToValueAtTime(0.0008, t + dur + 0.12);
      var lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = cfg.texture === 'folk' ? 1500 : 2400;
      o.connect(g);
      g.connect(lp);
      lp.connect(master);
      o.start(t);
      o.stop(t + dur + 0.2);
      vib.start(t);
      vib.stop(t + dur + 0.2);
    }

    function noiseHit(t, opts) {
      var src = ctx.createBufferSource();
      src.buffer = noiseBuf;
      var f = ctx.createBiquadFilter();
      f.type = opts.hp ? 'highpass' : 'bandpass';
      f.frequency.value = opts.freq;
      f.Q.value = opts.hp ? 0.8 : 1.1;
      var g = ctx.createGain();
      g.gain.setValueAtTime(opts.gain, t);
      g.gain.exponentialRampToValueAtTime(0.0008, t + opts.dur);
      src.connect(f);
      f.connect(g);
      g.connect(master);
      src.start(t);
      src.stop(t + opts.dur + 0.05);
    }

    function membrane(t, f0, f1, gain, dur) {
      var o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(f0, t);
      o.frequency.exponentialRampToValueAtTime(f1, t + dur);
      var g = ctx.createGain();
      g.gain.setValueAtTime(gain, t);
      g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
      o.connect(g);
      g.connect(master);
      o.start(t);
      o.stop(t + dur + 0.05);
    }

    function hit(token, t) {
      if (token === 'dha') { membrane(t, 170, 68, 0.5, 0.26); noiseHit(t, { freq: 900, gain: 0.16, dur: 0.08 }); }
      else if (token === 'dhin') { membrane(t, 240, 150, 0.3, 0.2); noiseHit(t, { freq: 1600, gain: 0.1, dur: 0.06 }); }
      else if (token === 'tin' || token === 'na') { noiseHit(t, { freq: 3200, gain: 0.2, dur: 0.05, hp: true }); }
      else if (token === 'tam') { membrane(t, 220, 140, 0.34, 0.24); }
      else if (token === 'dhi') { noiseHit(t, { freq: 2600, gain: 0.14, dur: 0.05, hp: true }); }
      else if (token === 'thom') { membrane(t, 150, 70, 0.4, 0.28); }
      else if (token === 'nam') { noiseHit(t, { freq: 2200, gain: 0.1, dur: 0.05, hp: true }); }
      else if (token === 'ge') { membrane(t, 140, 58, 0.46, 0.3); }
      else { noiseHit(t, { freq: 2800, gain: 0.16, dur: 0.05, hp: true }); }
    }

    return { drone: drone, pluck: pluck, note: note, hit: hit };
  }

/* ---- engine part 2: transport + public api ------------------------------- */
  function createEngine(cfg) {
    var ctx = null, master = null, analyser = null, noiseBuf = null;
    var running = false, timer = null;
    var percBeat = 0, nextPerc = 0, melPos = 0, nextMel = 0, cycle = 0;
    var phraseIdx = 0;
    var live = [];
    var beatDur = beatDurOf(cfg);
    var V = null;
    var api = {};

    function ensure() {
      if (ctx) return true;
      try {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return false;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.7;
        var comp = ctx.createDynamicsCompressor();
        analyser = ctx.createAnalyser();
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.8;
        master.connect(comp);
        comp.connect(analyser);
        analyser.connect(ctx.destination);
        var len = Math.floor(ctx.sampleRate * 0.5);
        noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
        var data = noiseBuf.getChannelData(0);
        for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
        V = makeVoices(ctx, master, noiseBuf, cfg);
        return true;
      } catch (e) { ctx = null; return false; }
    }

    function scheduler() {
      if (!running || !ctx || !V) return;
      var horizon = ctx.currentTime + 0.22;
      var pat = PERC[cfg.texture] || PERC.folk;
      while (nextPerc < horizon) {
        V.hit(pat[percBeat % pat.length], nextPerc);
        if (percBeat % 4 === 0) {
          var paIdx = cfg.scale.length >= 7 ? 4 : 3;
          var seq = [0, paIdx, 0, 1];
          V.pluck(degFreq(cfg, seq[(percBeat / 4) % 4]), nextPerc);
        }
        percBeat++;
        nextPerc += beatDur;
      }
      var phrases = PHRASES[cfg.texture] || PHRASES.folk;
      while (nextMel < horizon) {
        var ph = phrases[phraseIdx % phrases.length];
        var note = ph[melPos];
        V.note(note[0], nextMel, note[1]);
        nextMel += note[1] * beatDur * 1.15;
        melPos++;
        if (melPos >= ph.length) {
          melPos = 0;
          phraseIdx++;
          cycle++;
          if (api.onCycle) api.onCycle(cycle);
          nextMel += beatDur * 2;
        }
      }
    }

    function start() {
      if (!ensure()) return;
      if (ctx.state === 'suspended' && ctx.resume) { try { ctx.resume(); } catch (e) { /* noop */ } }
      if (running) return;
      running = true;
      live = [];
      var t = ctx.currentTime + 0.06;
      V.drone(t, live);
      percBeat = 0;
      nextPerc = t + beatDur * 4;
      phraseIdx = 0;
      melPos = 0;
      cycle = 1;
      nextMel = t + beatDur * 6;
      if (api.onCycle) api.onCycle(1);
      timer = window.setInterval(scheduler, 30);
    }

    function stop() {
      running = false;
      if (timer) { window.clearInterval(timer); timer = null; }
      if (!ctx) return;
      var now = ctx.currentTime;
      try {
        if (live.gainNode) {
          live.gainNode.gain.cancelScheduledValues(now);
          live.gainNode.gain.setTargetAtTime(0.0001, now, 0.12);
        }
        live.forEach(function (v) {
          try { if (v.stop) v.stop(now + 0.5); } catch (e) { /* already stopped */ }
        });
      } catch (e) { /* noop */ }
      live = [];
      if (api.onStop) api.onStop();
    }

    api.ready = function () { return !!ensure(); };
    api.start = start;
    api.stop = stop;
    api.playing = function () { return running; };
    api.setVolume = function (v) {
      if (master && ctx) {
        master.gain.setTargetAtTime(Math.max(0, Math.min(1, v)) * 0.7, ctx.currentTime, 0.05);
      }
    };
    api.levels = function (out) {
      if (!analyser) {
        for (var i = 0; i < out.length; i++) out[i] = 0;
        return;
      }
      var bins = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(bins);
      for (var j = 0; j < out.length; j++) {
        var idx = Math.floor(j / out.length * bins.length * 0.7);
        out[j] = bins[idx] / 255;
      }
    };
    api.onCycle = null;
    api.onStop = null;
    return api;
  }

  function init() {
    installMap();
    markPlayable();
    buildChips();
    placeholderDeck();
  }

  if (doc.readyState === 'interactive' || doc.readyState === 'complete') init();
  else on(doc, 'DOMContentLoaded', init);
})();