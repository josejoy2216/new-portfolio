/* Case-study chapters: tracks the chapter in view, updates the side diagram
   state, the contents highlight and the phone chapter bar.
   Progressive enhancement: without it, every chapter and link still works. */
(function () {
  'use strict';

  var chapters = Array.prototype.slice.call(document.querySelectorAll('.chapter[data-chapter]'));
  if (!chapters.length) return;

  var visual = document.querySelector('.cs-aside__visual [data-state]');
  var tocItems = Array.prototype.slice.call(document.querySelectorAll('.cs-toc__chapter'));
  var bar = document.querySelector('.chapter-bar');
  var barNum = bar && bar.querySelector('.chapter-bar__num');
  var barName = bar && bar.querySelector('.chapter-bar__name');
  var main = document.querySelector('.cs-main');
  var header = document.querySelector('.site-header');
  var total = chapters.length;
  var active = null;
  var ticking = false;

  if (bar) bar.hidden = false;

  function setActive(chapter) {
    active = chapter;
    var slug = chapter ? chapter.getAttribute('data-chapter') : null;
    var index = chapter ? chapter.getAttribute('data-index') : null;
    var state = chapter ? (chapter.getAttribute('data-state') || index) : null;
    if (visual) visual.setAttribute('data-state', state || 'all');
    tocItems.forEach(function (li) {
      li.classList.toggle('is-active', li.getAttribute('data-chapter') === slug);
    });
    if (bar && chapter) {
      barNum.textContent = (chapters.indexOf(chapter) + 1) + ' / ' + total;
      barName.textContent = chapter.querySelector('.chapter__name').textContent;
    }
  }

  function update() {
    ticking = false;
    var line = window.innerHeight * 0.35;
    var current = null;
    for (var i = 0; i < chapters.length; i++) {
      if (chapters[i].getBoundingClientRect().top < line) current = chapters[i];
    }
    var target = current || chapters[0];
    if (target !== active) setActive(target);
    if (bar && main) {
      var r = main.getBoundingClientRect();
      var p = Math.min(1, Math.max(0, (line - r.top) / Math.max(1, r.height)));
      bar.style.setProperty('--p', p.toFixed(4));
    }
  }

  function request() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  function placeBar() {
    if (bar && header) bar.style.setProperty('--chapter-bar-top', header.offsetHeight + 'px');
  }

  placeBar();
  update();
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', function () { placeBar(); request(); });
})();
