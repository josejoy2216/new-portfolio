/* SignBridge motion field: real MediaPipe arm and hand landmarks for HELLO,
   THANK YOU and FRIEND, drawn as points and lines. A hand the tracker lost
   is drawn as an empty ring at the wrist; the strips show detection per frame.
   Data: INCLUDE dataset clips (CC BY 4.0), face points removed. */

import {
  clamp, lerp3, perspective, lookAt, multiply, LINE_VS, LINE_FS, POINT_VS, POINT_FS,
  getContext, program, lineGroup, pointGroup, rgba, pushLine, pushPoint, fitCanvas
} from './core.js?v=20260929';

const DATA_URL = '/assets/data/sign-motion.json?v=20260929';
const BODY = [0.93, 0.87, 0.8];
const LEFT = [0.95, 0.7, 0.35];
const RIGHT = [1.0, 0.56, 0.44];
const AR = 16 / 9;
const ARMS = [[0, 1], [0, 2], [2, 4], [1, 3], [3, 5]];
const TORSO = [[0, 6], [1, 7]];
const HAND = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]];
const TIPS = [4, 8, 12, 16, 20];
const ORDER = ['hello', 'thank_you', 'friend'];
const NAMES = { hello: 'HELLO', thank_you: 'THANK YOU', friend: 'FRIEND' };
const KEY_FRAME = { hello: 18, thank_you: 26, friend: 24 };
// HELLO animates only the right arm, so its left hand is not used (research README).
const UNUSED = { hello: { left: true } };

function decode(entry) {
  const bin = atob(entry.b64);
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  const a = new Int16Array(u8.buffer);
  const n = entry.frames;
  const sx0 = (a[0] + a[3]) / 2e4, sy0 = (a[1] + a[4]) / 2e4, sz0 = (a[2] + a[5]) / 2e4;
  const S = 1.15 / (Math.abs(a[0] - a[3]) / 1e4 * AR);
  const frames = [];
  for (let f = 0; f < n; f++) {
    const pts = [];
    for (let j = 0; j < 50; j++) {
      const o = f * 150 + j * 3, x = a[o];
      pts.push(x === 32767 ? null : [(x / 1e4 - sx0) * AR * S, -(a[o + 1] / 1e4 - sy0) * S, -(a[o + 2] / 1e4 - sz0) * S * 0.5]);
    }
    frames.push(pts);
  }
  const bx = [1e9, -1e9, 1e9, -1e9];
  frames.forEach((pts) => pts.forEach((q, j) => {
    if (!q || j === 6 || j === 7) return;
    bx[0] = Math.min(bx[0], q[0]); bx[1] = Math.max(bx[1], q[0]); bx[2] = Math.min(bx[2], q[1]); bx[3] = Math.max(bx[3], q[1]);
  }));
  return { n, fps: entry.fps || 25, frames, box: { cx: (bx[0] + bx[1]) / 2, cy: (bx[2] + bx[3]) / 2, hw: (bx[1] - bx[0]) / 2, hh: (bx[3] - bx[2]) / 2 } };
}

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

function buildUI(host) {
  const root = el('div', 'sm');
  const view = el('div', 'sm__view');
  view.setAttribute('aria-hidden', 'true');
  const canvas = el('canvas', 'sm__canvas');
  const hud = el('div', 'sm__hud');
  const hudSign = el('span', 'sm__hud-sign');
  const hudFrame = el('span', 'sm__hud-frame');
  hud.append(hudSign, hudFrame);
  view.append(canvas, hud);

  const controls = el('div', 'sm__controls');
  const seg = el('div', 'sm__seg');
  seg.setAttribute('role', 'group');
  seg.setAttribute('aria-label', 'Sign');
  const tabs = ORDER.map((key) => {
    const b = el('button', 'sm__tab', NAMES[key]);
    b.type = 'button';
    b.setAttribute('data-sign', key);
    b.setAttribute('aria-pressed', 'false');
    seg.append(b);
    return b;
  });
  const play = el('button', 'sm__play', 'Pause');
  play.type = 'button';
  play.setAttribute('aria-pressed', 'true');
  const label = el('label', 'sm__range', 'Frame ');
  const range = el('input');
  range.type = 'range';
  range.min = '0';
  range.step = '1';
  range.value = '0';
  label.append(range);
  controls.append(seg, play, label);

  const bars = el('div', 'sm__bars');
  const legend = el('p', 'sm__legend');
  root.append(view, controls, bars, legend);
  host.prepend(root);
  return { root, canvas, hudSign, hudFrame, tabs, play, range, bars, legend };
}

export async function mount(host, { onFail } = {}) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let data;
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error('data');
    data = await res.json();
  } catch (e) {
    if (onFail) onFail();
    return null;
  }

  const ui = buildUI(host);
  const gl = getContext(ui.canvas);
  let pLine, pPoint;
  try {
    if (!gl) throw new Error('webgl');
    pLine = program(gl, LINE_VS, LINE_FS);
    pPoint = program(gl, POINT_VS, POINT_FS);
  } catch (e) {
    ui.root.remove();
    if (onFail) onFail();
    return null;
  }
  host.classList.add('is-live');

  const signs = {};
  ORDER.forEach((key) => { signs[key] = decode(data.signs[key]); });
  const friend = data.friend_status;
  const status = (key, hand) => {
    if (UNUSED[key] && UNUSED[key][hand]) return signs[key].frames.map(() => 'unused');
    if (key === 'friend') return friend[hand];
    const base = hand === 'left' ? 8 : 29;
    return signs[key].frames.map((p) => (p[base] ? 'detected' : 'missing'));
  };
  const label = (v) => (v === 'partially_tracked' ? 'partial' : v === 'unused' ? 'not used' : v);

  const gLines = lineGroup(gl, new Float32Array(18));
  const gPoints = pointGroup(gl, new Float32Array(12));
  let cur = 'hello', f = 0, playing = !reduce.matches, raf = 0, visible = false, last = 0, shown = -1;
  const ptr = { x: 0, tx: 0 };

  function buildBars() {
    const s = signs[cur];
    ui.bars.textContent = '';
    [['left', 'Left hand', 'l'], ['right', 'Right hand', 'r']].forEach(([hand, name, cls]) => {
      const st = status(cur, hand);
      const row = el('div', 'sm__row sm__row--' + cls);
      const unused = st[0] === 'unused';
      const hit = st.filter((v) => v === 'tracked' || v === 'partially_tracked' || v === 'detected').length;
      row.append(el('span', 'sm__row-label', unused ? name + ' · not used for ' + NAMES[cur] : name + ' ' + hit + '/' + s.n + ' detected'));
      const bar = el('span', 'sm__bar');
      bar.setAttribute('aria-hidden', 'true');
      st.forEach((v) => bar.append(el('span', 's-' + v)));
      bar.append(el('i', 'sm__now'));
      row.append(bar);
      ui.bars.append(row);
    });
    ui.legend.textContent = '';
    const keys = cur === 'friend'
      ? [['k-tracked', 'Tracked'], ['k-partial', 'Partially tracked'], ['k-occluded', 'Occluded'], ['k-missing', 'Missing']]
      : [['k-detected', 'Hand detected'], ['k-missing', 'Not detected']];
    keys.forEach(([k, t]) => {
      const item = el('span', 'sm__key');
      item.append(el('i', k), document.createTextNode(t));
      ui.legend.append(item, document.createTextNode(' '));
    });
    if (cur !== 'friend') ui.legend.append(el('span', 'sm__key-note', 'Frame-level tracking labels exist for FRIEND only.'));
    ui.range.max = String(s.n - 1);
    ui.hudSign.textContent = NAMES[cur] + ' · ' + s.fps + ' fps · ' + s.n + ' frames';
  }

  function select(key) {
    cur = key;
    f = reduce.matches || !playing ? KEY_FRAME[key] : 0;
    shown = -1;
    ui.tabs.forEach((b) => b.setAttribute('aria-pressed', String(b.getAttribute('data-sign') === key)));
    buildBars();
    request();
  }

  function setPlaying(v) {
    playing = v;
    ui.play.textContent = v ? 'Pause' : 'Play';
    ui.play.setAttribute('aria-pressed', String(v));
    request();
  }

  function frame(now) {
    raf = 0;
    const dt = last ? Math.min(0.1, (now - last) / 1000) : 0;
    last = now;
    const s = signs[cur];
    if (playing) f = (f + dt * s.fps) % s.n;
    const fi = Math.floor(f), f1 = Math.min(fi + 1, s.n - 1), u = f - fi;
    const A = s.frames[fi], B = s.frames[f1];
    const P = (i) => { const a = A[i], b = B[i]; return a && b && playing ? lerp3(a, b, u) : a; };
    const ln = [], pt = [];

    ARMS.forEach(([i, j]) => { const a = P(i), b = P(j); if (a && b) pushLine(ln, a, b, rgba(BODY, 0.55), rgba(BODY, 0.55), -1, -1, 1.6); });
    TORSO.forEach(([i, j]) => { const a = P(i), b = P(j); if (a && b) pushLine(ln, a, lerp3(a, b, 0.55), rgba(BODY, 0.3), rgba(BODY, 0), -1, -1, 1.4); });
    for (let i = 0; i < 6; i++) { const q = P(i); if (q) pushPoint(pt, q, BODY, 0.9, -1, 0.045, 0, 0, 0); }

    [[8, 4, LEFT, 'left'], [29, 5, RIGHT, 'right']].forEach(([base, wrist, col, hand]) => {
      const dim = UNUSED[cur] && UNUSED[cur][hand] ? 0.28 : 1;
      if (A[base]) {
        HAND.forEach(([i, j]) => { const a = P(base + i), b = P(base + j); if (a && b) pushLine(ln, a, b, rgba(col, 0.9 * dim), rgba(col, 0.9 * dim), -1, -1, 1.4); });
        for (let j = 0; j < 21; j++) { const q = P(base + j); if (q) pushPoint(pt, q, col, dim, -1, TIPS.indexOf(j) >= 0 ? 0.04 : 0.028, 0, 0, 0); }
      } else if (dim === 1) {
        const w = P(wrist);
        if (w) { pushPoint(pt, w, col, 0.85, -1, 0.26, 0, 1, 0); pushPoint(pt, w, col, 0.25, -1, 0.5, 0, 2, 0); }
      }
      if (dim < 1) return;
      let prev = null;
      for (let b2 = 14; b2 >= 0; b2--) {
        const fr = fi - b2;
        if (fr < 0) { prev = null; continue; }
        const F = s.frames[fr], wp = F[base] || F[wrist];
        if (wp && prev) pushLine(ln, prev, wp, rgba(col, 0.04 + (14 - b2) / 14 * 0.4), rgba(col, 0.04 + (15 - b2) / 14 * 0.4), -1, -1, 1.2);
        prev = wp;
      }
    });
    gLines.update(new Float32Array(ln));
    gPoints.update(new Float32Array(pt));

    const dpr = fitCanvas(ui.canvas, 2), cw = ui.canvas.width, ch = ui.canvas.height;
    ptr.x += (ptr.tx - ptr.x) * 0.06;
    const t = now / 1000;
    const yaw = (reduce.matches ? 0.28 : Math.sin(t * 0.35) * 0.4) + ptr.x * 0.5;
    const Pm = perspective(0.61, cw / ch, 0.1, 50);
    const bx = s.box, tf = Math.tan(0.305);
    const R = Math.max(bx.hh * 1.18 / tf, bx.hw * 1.18 / (tf * cw / ch)) + 0.35;
    const VP = multiply(Pm, lookAt([bx.cx + R * Math.sin(yaw), bx.cy + 0.05, R * Math.cos(yaw)], [bx.cx, bx.cy, 0], [0, 1, 0]));

    gl.viewport(0, 0, cw, ch);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.useProgram(pLine.p);
    gl.uniformMatrix4fv(pLine.u.uVP, false, VP);
    gl.uniform2f(pLine.u.uRes, cw, ch);
    gl.uniform3f(pLine.u.uLayerY, 0, 0, 0);
    gl.uniform3f(pLine.u.uLayerA, 1, 1, 1);
    gl.uniform1f(pLine.u.uPx, dpr);
    gl.uniform1f(pLine.u.uAlpha, 1);
    gLines.draw();
    gl.useProgram(pPoint.p);
    gl.uniformMatrix4fv(pPoint.u.uVP, false, VP);
    gl.uniform3f(pPoint.u.uLayerY, 0, 0, 0);
    gl.uniform3f(pPoint.u.uLayerA, 1, 1, 1);
    gl.uniform1f(pPoint.u.uTime, t);
    gl.uniform1f(pPoint.u.uScatter, 0);
    gl.uniform1f(pPoint.u.uDrift, 0);
    gl.uniform1f(pPoint.u.uAlpha, 1);
    gl.uniform1f(pPoint.u.uFocal, Pm[5] * ch / 2);
    gPoints.draw();

    if (fi !== shown) {
      shown = fi;
      ui.range.value = String(fi);
      const L = status(cur, 'left')[fi], Rr = status(cur, 'right')[fi];
      ui.hudFrame.textContent = 'Frame ' + (fi + 1) + ' / ' + s.n + ' · L ' + label(L) + ' · R ' + label(Rr);
      ui.bars.querySelectorAll('.sm__now').forEach((m) => { m.style.left = ((fi + 0.5) / s.n * 100).toFixed(2) + '%'; });
    }
    const moving = playing || Math.abs(ptr.tx - ptr.x) > 0.001 || !reduce.matches;
    if (visible && moving) raf = requestAnimationFrame(frame);
  }

  function request() { if (!raf) raf = requestAnimationFrame(frame); }

  ui.tabs.forEach((b) => b.addEventListener('click', () => select(b.getAttribute('data-sign'))));
  ui.play.addEventListener('click', () => setPlaying(!playing));
  ui.range.addEventListener('input', () => { setPlaying(false); f = Number(ui.range.value); request(); });
  ui.root.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || reduce.matches) return;
    const r = ui.canvas.getBoundingClientRect();
    ptr.tx = clamp(((e.clientX - r.left) / r.width - 0.5) * 2, -1, 1);
    request();
  });
  ui.root.addEventListener('pointerleave', () => { ptr.tx = 0; request(); });
  ui.canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    ui.root.remove();
    host.classList.remove('is-live');
    if (onFail) onFail();
  });
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) request();
    else if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }).observe(ui.root);
  new ResizeObserver(request).observe(ui.canvas);
  if (reduce.addEventListener) {
    reduce.addEventListener('change', () => {
      if (reduce.matches) { setPlaying(false); f = KEY_FRAME[cur]; } else setPlaying(true);
    });
  }

  select('hello');
  if (reduce.matches) setPlaying(false);
  return { root: ui.root };
}
