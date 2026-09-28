/* Home hero: loads the live Exploded View when it can run well,
   otherwise shows a still poster rendered from the same scene.
   The page is complete without this file. */

const V = '20260927';
const art = document.querySelector('[data-exploded-view]');

if (art) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  let live = null;
  let loading = false;

  const showPoster = () => {
    art.classList.add('is-poster');
    if (art.querySelector('img.hero__poster')) return;
    const img = document.createElement('img');
    img.className = 'hero__poster';
    img.alt = '';
    img.decoding = 'async';
    img.width = 1200;
    img.height = 1200;
    img.sizes = '(min-width: 64rem) 58vw, 100vw';
    img.srcset = `/assets/img/stage/exploded-view-800.webp 800w, /assets/img/stage/exploded-view-1200.webp 1200w`;
    img.src = '/assets/img/stage/exploded-view-1200.webp';
    art.appendChild(img);
  };

  const hidePoster = () => {
    art.classList.remove('is-poster');
    const img = art.querySelector('img.hero__poster');
    if (img) img.remove();
  };

  const start = () => {
    if (live || loading) return;
    if (reduce.matches || saveData) { showPoster(); return; }
    loading = true;
    import(`./gl/exploded-view.js?v=${V}`)
      .then((m) => {
        loading = false;
        if (reduce.matches) { showPoster(); return; }
        hidePoster();
        live = m.mount(art, { onFail: () => { live = null; showPoster(); } });
        if (!live) showPoster();
      })
      .catch(() => { loading = false; showPoster(); });
  };

  // Start once the art box is near the viewport (it usually is, on load).
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { io.disconnect(); start(); }
  }, { rootMargin: '200px' });
  io.observe(art);

  const onMotionChange = () => {
    if (reduce.matches) {
      if (live) { live.destroy(); live = null; }
      showPoster();
    } else {
      start();
    }
  };
  if (reduce.addEventListener) reduce.addEventListener('change', onMotionChange);
}
