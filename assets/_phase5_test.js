/* ==========================================================================
   ECHOES WE CARRY â€” Phase 5 E2E smoke test (dev only)
   Runs ONLY when the page is opened with ?e2e=1 in the URL. Inert otherwise.
   Simulates the full journey and writes results into #e2e-results.
   ========================================================================== */
(function () {
  'use strict';
  if (!/[?&]e2e=1/.test(window.location.search)) return;

  var results = [];
  function log(name, pass, info) { results.push({ n: name, p: !!pass, i: info || '' }); }
  window.addEventListener('error', function (e) {
    log('js-error', false, String(e.message || e));
  });

  function qs(s, c) { return (c || document).querySelector(s); }
  function qsa(s, c) { return [].slice.call((c || document).querySelectorAll(s)); }
  function click(el) { if (el && el.click) el.click(); }
  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function run() {
    var chain = wait(900)
      /* hero + entry */
      .then(function () {
        log('hero-present', !!qs('#bys-hero .bys-begin'));
        click(qs('#bys-begin'));
        return wait(500);
      })
      .then(function () {
        log('step-region-active', !!qs('#bys-step-region.is-active'));
        var featured = qsa('#bys-region-map .atlas-region.is-featured');
        log('map-featured', featured.length >= 16, 'count=' + featured.length);
        var chips = qsa('.region-chip', qs('#bys-region-chips'));
        log('chips-built', chips.length === 16, 'count=' + chips.length);
        var path = qs('#bys-path');
        log('thread-path-drawn', !!(path && path.getAttribute('d')), (path && path.getAttribute('d') || '').slice(0, 40));
        var nodes = qsa('.bys-node', qs('#bys-rail'));
        log('thread-nodes', nodes.length === 5, 'count=' + nodes.length);
        click(qs('.region-chip[data-id="tn"]'));
        return wait(350);
      })
      .then(function () {
        var lit = qsa('#bys-region-map .atlas-region.is-lit');
        log('region-lit-on-map', lit.length >= 1 && lit[0].getAttribute('data-state') === 'tn', 'lit=' + lit.length);
        log('region-selected-copy', /Tamil Nadu/i.test(qs('#bys-sel-region').textContent || ''), '');
        log('stepper-pick-region', /Tamil Nadu/i.test((qs('[data-stepper-pick="region"]') || {}).textContent || ''));
        var trad = qsa('#bys-options-tradition .bys-option');
        log('tradition-options', trad.length >= 1 && trad.length <= 3, 'count=' + trad.length);
        if (trad.length) click(trad[0]);
        return wait(250);
      })
      .then(function () {
        log('tradition-chosen', ((qs('[data-stepper-pick="tradition"]') || {}).textContent || '').trim().length > 0);
        click(qs('[data-next="craft"]'));
        return wait(800);
      })
      .then(function () {
        log('step-craft-active', !!qs('#bys-step-craft.is-active'));
        var crafts = qsa('#bys-options-craft .bys-option');
        log('craft-options-from-atlas', crafts.length >= 2, 'count=' + crafts.length);
        if (crafts.length) click(crafts[0]);
        return wait(250);
      })
      .then(function () {
        var off = parseFloat(qs('#bys-path').style.strokeDashoffset || '100');
        log('thread-grows', off < 100 && off > 0, 'dashoffset=' + off);
        log('weave-live', !!qs('.bys-weave.is-live'));
        click(qs('[data-next="sound"]'));
        return wait(800);
      })
      .then(function () {
        log('step-sound-active', !!qs('#bys-step-sound.is-active'));
        var sounds = qsa('#bys-options-sound .bys-option--sound');
        log('sound-options', sounds.length >= 5, 'count=' + sounds.length);
        log('sound-own-first', sounds.length > 0 && sounds[0].classList.contains('is-own'));
        if (sounds.length) click(sounds[0]);
        return wait(300);
      })
      .then(function () {
        log('sound-selected', !qs('#bys-step-sound .bys-next').disabled);
        click(qs('[data-next="story"]'));
        return wait(800);
      })
      .then(function () {
        log('step-story-active', !!qs('#bys-step-story.is-active'));
        var stories = qsa('#bys-options-story .bys-option');
        log('story-options-all-ten', stories.length === 10, 'count=' + stories.length);
        if (stories.length) click(stories[0]);
        return wait(250);
      })
      .then(function () {
        var seal = qs('#bys-seal');
        log('seal-enabled', seal.getAttribute('aria-disabled') === 'false');
        click(seal);
        return wait(1100);
      })
      .then(function () {
        var keys = ['region', 'tradition', 'craft', 'sound', 'story'];
        var vals = {};
        keys.forEach(function (k) {
          var el = qs('#bys-val-' + k);
          vals[k] = el ? el.textContent : '';
        });
        var allFilled = keys.every(function (k) { return vals[k] && vals[k] !== '\u2014'; });
        log('echo-card-filled', allFilled, JSON.stringify(vals));
        var st = (qs('#bys-card-statement') || {}).textContent || '';
        log('echo-statement', /rhythm of/.test(st) && /craft of/.test(st) && /story of/.test(st), st.slice(0, 140));
        log('echo-card-ready', qs('#bys-echocard').classList.contains('is-ready'));
        log('thread-complete', Math.abs(parseFloat(qs('#bys-path').style.strokeDashoffset || '100')) < 1,
          'dashoffset=' + qs('#bys-path').style.strokeDashoffset);
        click(qs('#bys-restart'));
        return wait(700);
      })
      .then(function () {
        log('restart-resets', !!qs('#bys-step-region.is-active') &&
          (qs('#bys-path').style.strokeDashoffset || '') === '100',
          'offset=' + (qs('#bys-path').style.strokeDashoffset || ''));
        log('finale-markup', !!qs('#carry .bys-carry__question'));
        log('finale-words', qsa('#bys-carry-reveal .bys-carry__word').length === 5);
        /* second pass: Bihar exercises the sound-fallback config */
        click(qs('.region-chip[data-id="br"]'));
        return wait(400);
      })
      .then(function () {
        var lit = qsa('#bys-region-map .atlas-region.is-lit');
        log('br-lit-on-map', lit.length >= 1 && lit[0].getAttribute('data-state') === 'br');
        log('br-traditions', qsa('#bys-options-tradition .bys-option').length === 3,
          'count=' + qsa('#bys-options-tradition .bys-option').length);
        log('br-crafts', qsa('#bys-options-craft .bys-option').length >= 1);
        var sounds = qsa('#bys-options-sound .bys-option--sound');
        log('br-sound-fallback-first', sounds.length > 0 && sounds[0].classList.contains('is-own'),
          sounds.length ? (sounds[0].getAttribute('data-value') || '') : '');
        /* trigger the cinematic finale (headless cannot scroll — use hook) */
        if (typeof window.__bysFinale === 'function') {
          window.__bysFinale();
          log('finale-hook', true);
        } else {
          qs('#carry').scrollIntoView({ behavior: 'auto', block: 'start' });
        }
        return wait(600);
      })
      .then(function () {
        var carry = qs('#carry').getBoundingClientRect();
        log('debug-scrolled', true, 'scrollY=' + Math.round(window.scrollY || 0) +
          ' carryTop=' + Math.round(carry.top) +
          ' innerH=' + window.innerHeight);
        return wait(12000);
      })
      .then(function () {
        var scene = qs('#bys-carry-scene');
        log('finale-seen', scene.classList.contains('is-seen'));
        log('finale-map-injected', !!qs('#bys-carry-map svg.bys-map--thread'));
        log('finale-thread-drawn', !!qs('#bys-carry-map svg.is-drawn'));
        log('finale-logo-revealed', scene.classList.contains('has-logo'));
        /* layout sanity */
        var docEl = document.documentElement;
        log('no-horizontal-overflow', docEl.scrollWidth <= docEl.clientWidth + 1,
          'scrollWidth=' + docEl.scrollWidth + ' clientWidth=' + docEl.clientWidth);
        finish();
      })
      .catch(function (err) {
        log('test-crash', false, String((err && err.message) || err));
        finish();
      });

    function finish() {
      var out = document.createElement('div');
      out.id = 'e2e-results';
      out.setAttribute('data-count', String(results.length));
      out.textContent = JSON.stringify(results);
      out.style.cssText = 'position:fixed;top:0;left:0;z-index:99999;background:#000;color:#0f0;font-size:10px;padding:6px;max-width:70vw;white-space:normal;';
      document.body.appendChild(out);
      document.title = 'E2E:' + results.filter(function (r) { return r.p; }).length + '/' + results.length;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { setTimeout(run, 400); });
  } else {
    run();
  }
})();
