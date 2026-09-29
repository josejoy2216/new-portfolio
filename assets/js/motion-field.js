/* Loads the live SignBridge motion field into [data-sign-motion] hosts when
   they come near the viewport. Without JavaScript, WebGL or with Save-Data on,
   the host's still image and tracking strip stay as they are. */

const V = '20260929';
const hosts = document.querySelectorAll('[data-sign-motion]');
const saveData = !!(navigator.connection && navigator.connection.saveData);

if (hosts.length && !saveData && 'IntersectionObserver' in window) {
  hosts.forEach((host) => {
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      import(`./gl/sign-motion.js?v=${V}`)
        .then((m) => m.mount(host))
        .catch(() => {});
    }, { rootMargin: '300px' });
    io.observe(host);
  });
}
