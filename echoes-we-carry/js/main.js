/* ==========================================================================
   ECHOES WE CARRY — main.js
   Phase 1 interactivity. Vanilla JS, no dependencies.
   ========================================================================== */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
     Utilities
  ---------------------------------------------------------------- */
  var doc = document;
  var html = doc.documentElement;
  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Flag for progressive enhancement: CSS only hides [data-reveal]
  // and shows the preloader when html.js is present.
  html.classList.add('js');

  function qs(selector, ctx) {
    return (ctx || doc).querySelector(selector);
  }
  function qsa(selector, ctx) {
    return Array.prototype.slice.call((ctx || doc).querySelectorAll(selector));
  }
  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  /* ----------------------------------------------------------------
     1. Preloader
  ---------------------------------------------------------------- */
  var preloader = qs('#preloader');
  var preloaderStarted = Date.now();

  if (preloader) {
    doc.body.classList.add('no-scroll');

    function hidePreloader() {
      var minShown = prefersReducedMotion ? 0 : 1500;
      var remaining = Math.max(0, minShown - (Date.now() - preloaderStarted));
      window.setTimeout(function () {
        preloader.classList.add('is-hidden');
        doc.body.classList.remove('no-scroll');
        window.setTimeout(function () {
          if (preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
          }
        }, 800);
      }, remaining);
    }

    if (doc.readyState === 'complete') {
      hidePreloader();
    } else {
      window.addEventListener('load', hidePreloader);
      // Safety net so the loader can never trap the page.
      window.setTimeout(hidePreloader, 6000);
    }
  }

  /* ----------------------------------------------------------------
     2. Scroll state — header, progress bar, back-to-top, scrollspy
  ---------------------------------------------------------------- */
  var header = qs('#site-header');
  var progressBar = qs('#scroll-progress');
  var backToTop = qs('#back-to-top');
  var navLinks = qsa('.nav-link');
  var sections = [];

  navLinks.forEach(function (link) {
    var id = link.getAttribute('href');
    if (id && id.charAt(0) === '#') {
      var target = qs(id);
      if (target) sections.push({ id: id, el: target });
    }
  });

  var scrollPending = false;

  function updateScrollSpy(scrollY) {
    if (!header) return;
    var offset = header.offsetHeight + 12;
    var currentId = null;

    sections.forEach(function (section) {
      var top = section.el.getBoundingClientRect().top + scrollY;
      if (top <= scrollY + offset) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('is-active', link.getAttribute('href') === currentId);
    });
  }

  function onScroll() {
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var maxScroll = Math.max(1, doc.documentElement.scrollHeight - window.innerHeight);
    var ratio = scrollY / maxScroll;

    if (header) header.classList.toggle('is-scrolled', scrollY > 40);
    if (progressBar) progressBar.style.width = (ratio * 100).toFixed(2) + '%';
    if (backToTop) backToTop.classList.toggle('is-visible', scrollY > 600);
    updateScrollSpy(scrollY);

    scrollPending = false;
  }

  window.addEventListener('scroll', function () {
    if (!scrollPending) {
      scrollPending = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });

  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ----------------------------------------------------------------
     3. Mobile menu
  ---------------------------------------------------------------- */
  var navToggle = qs('#nav-toggle');
  var mobileMenu = qs('#mobile-menu');

  function setMenu(open) {
    if (!mobileMenu || !navToggle) return;
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (header) header.classList.toggle('is-menu-open', open);
    doc.body.classList.toggle('no-scroll', open);
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      setMenu(!mobileMenu.classList.contains('is-open'));
    });

    qsa('.mobile-link', mobileMenu).forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });

    doc.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        setMenu(false);
        navToggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && mobileMenu.classList.contains('is-open')) {
        setMenu(false);
      }
    });
  }

  /* ----------------------------------------------------------------
     4. Reveal on scroll
  ---------------------------------------------------------------- */
  var revealEls = qsa('[data-reveal]');

  function revealImmediately() {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseInt(el.getAttribute('data-reveal-delay'), 10) || 0;
          el.style.setProperty('--reveal-delay', delay);
          el.classList.add('is-visible');
          revealObserver.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealImmediately();
  }

  /* ----------------------------------------------------------------
     5. Hero rotating word
  ---------------------------------------------------------------- */
  var rotateEl = qs('#rotate-word');
  var rotateWords = ['echoes', 'stories', 'memory', 'blessings', 'home'];
  var rotateIndex = 0;

  if (rotateEl && !prefersReducedMotion) {
    window.setInterval(function () {
      rotateIndex = (rotateIndex + 1) % rotateWords.length;
      rotateEl.style.opacity = '0';
      rotateEl.style.transform = 'translateY(10px)';
      window.setTimeout(function () {
        rotateEl.textContent = rotateWords[rotateIndex];
        rotateEl.style.opacity = '1';
        rotateEl.style.transform = 'none';
      }, 260);
    }, 2800);
  }

  /* ----------------------------------------------------------------
     6. Animated counters
  ---------------------------------------------------------------- */
  var counters = qsa('[data-count-to]');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count-to'), 10) || 0;
    var duration = prefersReducedMotion ? 0 : 1600;
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-IN');
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString('en-IN');
      }
    }

    window.requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  } else {
    counters.forEach(animateCounter);
  }


  /* ----------------------------------------------------------------
     7. Vault carousel
  ---------------------------------------------------------------- */
  var vaultTrack = qs('#vault-track');
  var vaultViewport = qs('#vault-viewport');
  var vaultPrev = qs('#vault-prev');
  var vaultNext = qs('#vault-next');
  var vaultIndexEl = qs('#vault-index');
  var vaultTotalEl = qs('#vault-total');
  var vaultDots = qs('#vault-dots');

  function getGap(el) {
    var value = window.getComputedStyle(el).getPropertyValue('gap');
    var parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }

  if (vaultTrack) {
    var vaultCards = qsa('.vault-card', vaultTrack);
    var vaultCurrent = 0;
    var vaultTimer = null;

    function vaultSlide(index, instant) {
      var max = vaultCards.length - 1;
      vaultCurrent = index < 0 ? max : index > max ? 0 : index;
      var step = vaultCards[0].offsetWidth + getGap(vaultTrack);

      if (instant) vaultTrack.style.transition = 'none';
      vaultTrack.style.transform = 'translate3d(' + (-vaultCurrent * step) + 'px, 0, 0)';
      if (instant) {
        void vaultTrack.offsetWidth;
        vaultTrack.style.transition = '';
      }

      if (vaultIndexEl) vaultIndexEl.textContent = pad(vaultCurrent + 1);
      if (vaultDots) {
        qsa('.vault__dot', vaultDots).forEach(function (dot, i) {
          dot.classList.toggle('is-active', i === vaultCurrent);
        });
      }
    }

    function startVaultAuto() {
      if (prefersReducedMotion || vaultCards.length < 2) return;
      vaultTimer = window.setInterval(function () {
        vaultSlide(vaultCurrent + 1, false);
      }, 5000);
    }
    function stopVaultAuto() {
      if (vaultTimer) {
        window.clearInterval(vaultTimer);
        vaultTimer = null;
      }
    }
    function restartVaultAuto() {
      stopVaultAuto();
      startVaultAuto();
    }

    if (vaultTotalEl) vaultTotalEl.textContent = pad(vaultCards.length);

    vaultCards.forEach(function (card, i) {
      var dot = doc.createElement('button');
      dot.type = 'button';
      dot.className = 'vault__dot';
      dot.setAttribute('aria-label', 'Go to heirloom ' + (i + 1));
      dot.addEventListener('click', function () {
        vaultSlide(i, false);
        restartVaultAuto();
      });
      if (vaultDots) vaultDots.appendChild(dot);
    });

    if (vaultPrev) {
      vaultPrev.addEventListener('click', function () {
        vaultSlide(vaultCurrent - 1, false);
        restartVaultAuto();
      });
    }
    if (vaultNext) {
      vaultNext.addEventListener('click', function () {
        vaultSlide(vaultCurrent + 1, false);
        restartVaultAuto();
      });
    }

    // Pause auto-advance while the user is interacting.
    var vaultHovered = false;
    if (vaultViewport) {
      vaultViewport.addEventListener('mouseenter', function () {
        vaultHovered = true;
        stopVaultAuto();
      });
      vaultViewport.addEventListener('mouseleave', function () {
        vaultHovered = false;
        if (vaultCards.length > 1) startVaultAuto();
      });
      vaultViewport.addEventListener('focusin', stopVaultAuto);
      vaultViewport.addEventListener('focusout', function () {
        if (!vaultHovered && vaultCards.length > 1) startVaultAuto();
      });
    }

    // Swipe (touch) + drag (pointer).
    var startX = 0;
    var startY = 0;
    var isDragging = false;
    var dragOffset = 0;

    if (vaultViewport) {
      vaultViewport.addEventListener('touchstart', function (event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
      }, { passive: true });

      vaultViewport.addEventListener('touchend', function (event) {
        var dx = event.changedTouches[0].clientX - startX;
        var dy = event.changedTouches[0].clientY - startY;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
          vaultSlide(vaultCurrent + (dx < 0 ? 1 : -1), false);
          restartVaultAuto();
        }
      }, { passive: true });

      vaultViewport.addEventListener('mousedown', function (event) {
        if (event.target.closest('button')) return;
        isDragging = true;
        dragOffset = 0;
        startX = event.clientX;
        vaultViewport.classList.add('is-dragging');
      });

      window.addEventListener('mousemove', function (event) {
        if (!isDragging) return;
        dragOffset = event.clientX - startX;
      });

      window.addEventListener('mouseup', function () {
        if (!isDragging) return;
        isDragging = false;
        vaultViewport.classList.remove('is-dragging');
        if (Math.abs(dragOffset) > 60) {
          vaultSlide(vaultCurrent + (dragOffset < 0 ? 1 : -1), false);
          restartVaultAuto();
        }
        dragOffset = 0;
      });
    }

    window.addEventListener('resize', function () {
      vaultSlide(vaultCurrent, true);
    });

    vaultSlide(0, true);
    startVaultAuto();
  }


  /* ----------------------------------------------------------------
     8. Echoes testimonial slider
  ---------------------------------------------------------------- */
  var echoSlides = qsa('.echo-slide');
  var echoDots = qs('#echo-dots');
  var echoPrev = qs('#echo-prev');
  var echoNext = qs('#echo-next');
  var echoCurrent = 0;
  var echoTimer = null;

  if (echoSlides.length) {
    function echoGo(index) {
      var max = echoSlides.length - 1;
      echoCurrent = index < 0 ? max : index > max ? 0 : index;
      echoSlides.forEach(function (slide, i) {
        slide.classList.toggle('is-active', i === echoCurrent);
      });
      if (echoDots) {
        qsa('.echo-dot', echoDots).forEach(function (dot, i) {
          dot.classList.toggle('is-active', i === echoCurrent);
        });
      }
    }

    function startEchoAuto() {
      if (prefersReducedMotion || echoSlides.length < 2) return;
      echoTimer = window.setInterval(function () {
        echoGo(echoCurrent + 1);
      }, 6500);
    }
    function stopEchoAuto() {
      if (echoTimer) {
        window.clearInterval(echoTimer);
        echoTimer = null;
      }
    }
    function restartEchoAuto() {
      stopEchoAuto();
      startEchoAuto();
    }

    echoSlides.forEach(function (slide, i) {
      var dot = doc.createElement('button');
      dot.type = 'button';
      dot.className = 'echo-dot';
      dot.setAttribute('aria-label', 'Show echo ' + (i + 1));
      dot.addEventListener('click', function () {
        echoGo(i);
        restartEchoAuto();
      });
      if (echoDots) echoDots.appendChild(dot);
    });

    if (echoPrev) {
      echoPrev.addEventListener('click', function () {
        echoGo(echoCurrent - 1);
        restartEchoAuto();
      });
    }
    if (echoNext) {
      echoNext.addEventListener('click', function () {
        echoGo(echoCurrent + 1);
        restartEchoAuto();
      });
    }

    var echoesStage = qs('.echoes__stage');
    if (echoesStage) {
      echoesStage.addEventListener('mouseenter', stopEchoAuto);
      echoesStage.addEventListener('mouseleave', startEchoAuto);
    }

    echoGo(0);
    startEchoAuto();
  }

  /* ----------------------------------------------------------------
     9. Journal filter
  ---------------------------------------------------------------- */
  var filterButtons = qsa('.filter-btn');
  var journalCards = qsa('.journal-card');

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      filterButtons.forEach(function (btn) {
        var active = btn === button;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });

      var filter = button.getAttribute('data-filter');
      journalCards.forEach(function (card) {
        var show = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('is-filtered-out', !show);
      });
    });
  });

  /* ----------------------------------------------------------------
     10. Newsletter form
  ---------------------------------------------------------------- */
  var joinForm = qs('#join-form');
  var joinEmail = qs('#join-email');
  var joinMessage = qs('#join-message');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setMessage(text, isError) {
    if (!joinMessage) return;
    joinMessage.textContent = text;
    joinMessage.classList.toggle('is-error', !!isError);
  }

  if (joinForm) {
    joinForm.addEventListener('submit', function (event) {
      event.preventDefault();
      joinForm.classList.remove('is-error');

      var value = (joinEmail.value || '').trim();

      if (!value) {
        joinForm.classList.add('is-error');
        setMessage('Please enter your email address.', true);
        joinEmail.focus();
        return;
      }
      if (!emailPattern.test(value)) {
        joinForm.classList.add('is-error');
        setMessage('That doesn\u2019t look like an email \u2014 mind checking it?', true);
        joinEmail.focus();
        return;
      }

      joinEmail.disabled = true;
      var submitButton = joinForm.querySelector('.join__submit');
      if (submitButton) submitButton.disabled = true;
      setMessage('Weaving your first letter\u2026');

      window.setTimeout(function () {
        joinEmail.disabled = false;
        if (submitButton) submitButton.disabled = false;
        setMessage('Thank you \u2014 the first letter is on its way to ' + value + '.');
        joinForm.reset();
      }, 1200);
    });

    joinEmail.addEventListener('input', function () {
      joinForm.classList.remove('is-error');
    });
  }

  /* ----------------------------------------------------------------
     11. Footer year
  ---------------------------------------------------------------- */
  var yearEl = qs('#year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();

