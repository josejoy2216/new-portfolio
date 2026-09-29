/* josechacko.com — progressive enhancement only.
   The site is fully usable without this file. */
(function () {
  'use strict';

  // Analytics (GoatCounter). Leave empty until an account exists — nothing is
  // loaded and no requests are made while this is blank.
  // Setting this enables analytics — update /privacy.html (No analytics section) in the same change.
  var GOATCOUNTER_CODE = '';

  var root = document.documentElement;

  function storageGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  function storageSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  /* ---------- Theme ---------- */
  var darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function isDark() {
    var explicit = root.getAttribute('data-theme');
    if (explicit === 'dark') return true;
    if (explicit === 'light') return false;
    return !!(darkQuery && darkQuery.matches);
  }

  function initTheme() {
    var toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    var sync = function () {
      toggle.setAttribute('aria-pressed', isDark() ? 'true' : 'false');
    };

    sync();
    toggle.hidden = false;

    toggle.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      storageSet('theme', next);
      sync();
    });

    if (darkQuery && darkQuery.addEventListener) {
      darkQuery.addEventListener('change', sync);
    }
  }

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    var button = document.querySelector('.menu-toggle');
    var nav = document.getElementById('site-nav');
    if (!button || !nav) return;

    var desktop = window.matchMedia('(min-width: 64rem)');

    var setOpen = function (open) {
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
    };

    button.addEventListener('click', function () {
      setOpen(button.getAttribute('aria-expanded') !== 'true');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        button.focus();
      }
    });

    var reset = function () {
      if (desktop.matches) setOpen(false);
    };

    if (desktop.addEventListener) {
      desktop.addEventListener('change', reset);
    }
  }

  /* ---------- Header surface ----------
     On pages that open on a dark stage, the header uses the stage colours
     until the stage has scrolled away, then switches to the page colours. */
  function initHeaderSurface() {
    var header = document.querySelector('.site-header[data-surface="stage"]');
    var stage = document.querySelector('[data-stage-top]');
    if (!header || !stage || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      header.setAttribute('data-surface', entries[0].isIntersecting ? 'stage' : 'page');
    }, { rootMargin: '-' + header.offsetHeight + 'px 0px 0px 0px' });
    observer.observe(stage);
  }

  /* ---------- Magnetic buttons (mouse only, not with reduced motion) ---------- */
  function initMagnetic() {
    if (!window.matchMedia) return;
    var fine = window.matchMedia('(pointer: fine)');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    var MAX = 6;

    Array.prototype.forEach.call(document.querySelectorAll('[data-magnetic]'), function (el) {
      el.addEventListener('pointermove', function (event) {
        if (!fine.matches || reduce.matches || event.pointerType !== 'mouse') return;
        var r = el.getBoundingClientRect();
        var dx = (event.clientX - (r.left + r.width / 2)) / (r.width / 2);
        var dy = (event.clientY - (r.top + r.height / 2)) / (r.height / 2);
        el.style.transform = 'translate(' + (dx * MAX).toFixed(2) + 'px,' + (dy * MAX * 0.6).toFixed(2) + 'px)';
      });
      el.addEventListener('pointerleave', function () {
        el.style.transform = '';
      });
    });
  }

  /* ---------- Time ruler: keep "Present" at today's date ---------- */
  function initRuler() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-ruler]'), function (el) {
      var start = Number(el.getAttribute('data-start')) || 2018;
      var range = parseFloat(getComputedStyle(el).getPropertyValue('--range')) || 9;
      var d = new Date();
      var now = d.getFullYear() + d.getMonth() / 12 + d.getDate() / 365 - start;
      el.style.setProperty('--now', Math.max(0, Math.min(now, range - 0.05)).toFixed(3));
    });
  }

  /* ---------- Analytics ---------- */
  function track(name) {
    if (window.goatcounter && typeof window.goatcounter.count === 'function') {
      window.goatcounter.count({ path: name, title: name, event: true });
    }
  }

  function initAnalytics() {
    if (!GOATCOUNTER_CODE) return;

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://gc.zgo.at/count.js';
    script.setAttribute('data-goatcounter', 'https://' + GOATCOUNTER_CODE + '.goatcounter.com/count');
    script.addEventListener('load', function () {
      var caseStudy = document.body.getAttribute('data-case-study');
      if (caseStudy) track('case_study_view-' + caseStudy);
    });
    document.head.appendChild(script);
  }

  /* ---------- Contact form (Web3Forms) ---------- */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form || !window.fetch || !window.FormData) return;

    var status = document.getElementById('contact-status');
    var submit = form.querySelector('button[type="submit"]');
    var submitLabel = submit ? submit.textContent : '';

    var setStatus = function (state, message) {
      if (!status) return;
      status.setAttribute('data-state', state);
      status.textContent = message;
    };

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = new FormData(form);
      // The redirect field is only for the no-JavaScript fallback.
      data.delete('redirect');

      if (data.get('botcheck')) {
        return;
      }

      if (submit) {
        submit.disabled = true;
        submit.textContent = 'Sending…';
      }
      setStatus('pending', 'Sending your message…');

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          return response.json().catch(function () { return {}; }).then(function (json) {
            if (!response.ok || !json.success) {
              throw new Error(json.message || 'The message could not be sent.');
            }
          });
        })
        .then(function () {
          form.reset();
          setStatus('success', 'Thanks — your message was sent.');
          track('contact_submit');
        })
        .catch(function () {
          setStatus('error', 'Sorry, the message could not be sent. Please try again, or email josejoy2216@gmail.com directly.');
        })
        .then(function () {
          if (submit) {
            submit.disabled = false;
            submit.textContent = submitLabel;
          }
        });
    });
  }

  function init() {
    initTheme();
    initNav();
    initHeaderSurface();
    initMagnetic();
    initRuler();
    initContactForm();
    initAnalytics();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
