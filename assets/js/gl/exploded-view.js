/* The "Exploded View": ideas → systems → product.
   Loose idea points float above a system layer (nodes and orthogonal
   links); below it sits the product interface. Five threads carry one idea
   each through the system into one part of the interface; packets travel
   those threads and light the part they reach. Most ideas stay unconnected. */

import {
  clamp, easeOutExpo, easeInOut, lerp3, perspective, fitFov, lookAt, multiply, project,
  seededRandom, LINE_VS, LINE_FS, POINT_VS, POINT_FS, getContext, program, lineGroup,
  pointGroup, quad, rgba, pushLine, pushPoint, fitCanvas
} from './core.js?v=20260929';

const PLANE_VS = `#version 300 es
precision highp float;
layout(location=0) in vec2 aUV;
uniform mat4 uVP; uniform vec3 uCenter; uniform vec2 uSize;
out vec2 vUV;
void main(){ vUV = aUV; vec3 p = uCenter + vec3((aUV.x - 0.5) * uSize.x, 0.0, (aUV.y - 0.5) * uSize.y); gl_Position = uVP * vec4(p, 1.0); }`;

const PLANE_FS = `#version 300 es
precision highp float;
in vec2 vUV; out vec4 o;
uniform vec2 uSize; uniform int uKind; uniform float uAlpha; uniform float uLit[5];
uniform vec3 uWarm; uniform vec3 uCool; uniform vec3 uInk;
float sdBox(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
float stroke(float d, float px){ float f = fwidth(d); return 1.0 - smoothstep(px * 0.5 * f, (px * 0.5 + 1.0) * f, abs(d)); }
float fillA(float d){ float f = fwidth(d); return clamp(0.5 - d / max(f, 1e-5), 0.0, 1.0); }
void main(){
  vec2 p = (vUV - 0.5) * uSize; vec3 col = uInk; float a = 0.0;
  if (uKind == 2) { col = uCool; a = exp(-dot(p, p) * 0.55) * 0.10; }
  else {
    float db = sdBox(p, uSize * 0.5 - 0.01, 0.06); float inside = fillA(db);
    vec2 ap = abs(p); vec2 hs = uSize * 0.5;
    float corner = step(hs.x - 0.26, ap.x) * step(hs.y - 0.26, ap.y);
    col = uKind == 0 ? uCool : uInk;
    a = stroke(db, 1.25) * (0.32 + corner * 0.55) + inside * (uKind == 0 ? 0.035 : 0.05);
    if (uKind == 0) {
      vec2 g = fract(p / 0.2 + 0.5) - 0.5; float dd = length(g) * 0.2; float f = fwidth(dd);
      a += (1.0 - smoothstep(f * 0.6, f * 1.7, dd)) * inside * 0.2;
    } else {
      vec2 s = vec2(p.x, -p.y); float ui = 0.0; float uif = 0.0; float warm = 0.0;
      ui += stroke(sdBox(s - vec2(0.0, 0.83), vec2(1.36, 0.055), 0.03), 1.0) * 0.4;
      uif += fillA(sdBox(s - vec2(-1.26, 0.83), vec2(0.03, 0.03), 0.03)) * 0.6;
      for (int i = 0; i < 4; i++) { uif += fillA(sdBox(s - vec2(0.62 + float(i) * 0.2, 0.83), vec2(0.06, 0.012), 0.012)) * 0.35; }
      uif += fillA(sdBox(s - vec2(-0.66, 0.54), vec2(0.72, 0.065), 0.03)) * 0.42;
      uif += fillA(sdBox(s - vec2(-0.86, 0.37), vec2(0.52, 0.045), 0.03)) * 0.26;
      warm += fillA(sdBox(s - vec2(-1.02, 0.13), vec2(0.3, 0.07), 0.07)) * (0.5 + uLit[0] * 0.5);
      float di = sdBox(s - vec2(0.72, 0.36), vec2(0.6, 0.33), 0.05);
      ui += stroke(di, 1.0) * (0.36 + uLit[1] * 0.6); uif += fillA(di) * (0.035 + uLit[1] * 0.17);
      for (int i = 0; i < 3; i++) {
        float cx = -0.95 + float(i) * 0.95; float L = uLit[2 + i];
        float dc = sdBox(s - vec2(cx, -0.55), vec2(0.41, 0.3), 0.05);
        ui += stroke(dc, 1.0) * (0.34 + L * 0.6); uif += fillA(dc) * (0.03 + L * 0.17);
        uif += fillA(sdBox(s - vec2(cx - 0.12, -0.42), vec2(0.24, 0.022), 0.02)) * 0.3;
        uif += fillA(sdBox(s - vec2(cx - 0.18, -0.52), vec2(0.18, 0.018), 0.018)) * 0.18;
      }
      ui *= inside; uif *= inside; warm *= inside;
      float a1 = ui + uif + warm;
      col = (col * a + uInk * (ui + uif) + uWarm * warm) / max(a + a1, 1e-4); a += a1;
    }
  }
  a = clamp(a, 0.0, 1.0) * uAlpha; o = vec4(col * a, a);
}`;

const WARM = [0.949, 0.639, 0.227];
const COOL = [0.474, 0.706, 0.902];
const INK = [0.9, 0.925, 0.955];
const W = 3.0, D = 2.0;
const FOV = 0.5236;          // 30° across the shorter side of the view
const DISTANCE = 9.4;        // object width ≈ 73% of the shorter side
const TARGET_Y = -0.12;
const BASE_YAW = -0.62;
const BASE_PITCH = 0.5;

const NODES = [[-1.05, -0.55], [-1.05, 0], [-1.05, 0.55], [-0.3, -0.3], [-0.3, 0.3], [0.35, -0.55], [0.35, 0], [0.35, 0.55], [1.05, -0.28], [1.05, 0.28]];
const EDGES = [[0, 3], [1, 3], [1, 4], [2, 4], [3, 5], [3, 6], [4, 6], [4, 7], [5, 8], [6, 8], [6, 9], [7, 9]];
const UI = [[-1.02, -0.13], [0.72, -0.36], [-0.95, 0.55], [0, 0.55], [0.95, 0.55]];
const THREADS = [[1, 2], [4, 3], [7, 4], [5, 1], [3, 0]]; // [system node, interface part]
const CLOUD = 150;

function createScene(canvas, contextOptions) {
  const gl = getContext(canvas, contextOptions);
  if (!gl) return null;

  const pLine = program(gl, LINE_VS, LINE_FS);
  const pPoint = program(gl, POINT_VS, POINT_FS);
  const pPlane = program(gl, PLANE_VS, PLANE_FS);
  const plane = quad(gl);
  const rand = seededRandom(20260927);

  // Points: five key ideas (with halos), ten system nodes, then the idea cloud.
  const pts = [];
  const ideas = THREADS.map(([n]) => [NODES[n][0] + (rand() - 0.5) * 0.22, (rand() - 0.5) * 0.1, NODES[n][1] + (rand() - 0.5) * 0.22]);
  ideas.forEach((q, i) => {
    pushPoint(pts, q, WARM, 0.95, 0, 0.075, 0.11 + i * 0.17, 0, 0);
    pushPoint(pts, q, WARM, 0.32, 0, 0.36, 0.11 + i * 0.17, 2, 0);
  });
  NODES.forEach((n, i) => pushPoint(pts, [n[0], 0, n[1]], COOL, 0.95, 1, 0.1, 0.5 + i * 0.041, 1, 0));
  const fixed = pts.length / 12;
  for (let i = 0; i < CLOUD; i++) {
    const r = Math.sqrt(rand()), th = rand() * Math.PI * 2, big = rand() < 0.1;
    pushPoint(pts, [Math.cos(th) * r * 1.75, (rand() - 0.5) * 0.3, Math.sin(th) * r * 1.15], WARM,
      big ? 0.75 : 0.22 + rand() * 0.35, 0, big ? 0.05 : 0.022 + rand() * 0.02, 0.001 + rand() * 0.998, 0, 1);
  }
  const gPoints = pointGroup(gl, new Float32Array(pts));

  const edges = [];
  EDGES.forEach(([i, j]) => {
    const A = NODES[i], B = NODES[j], xm = (A[0] + B[0]) / 2, c = rgba(COOL, 0.5);
    pushLine(edges, [A[0], 0, A[1]], [xm, 0, A[1]], c, c, 1, 1, 1.2);
    pushLine(edges, [xm, 0, A[1]], [xm, 0, B[1]], c, c, 1, 1, 1.2);
    pushLine(edges, [xm, 0, B[1]], [B[0], 0, B[1]], c, c, 1, 1, 1.2);
  });
  const gEdges = lineGroup(gl, new Float32Array(edges));

  const threads = [];
  THREADS.forEach(([n, u], i) => {
    const I = ideas[i], N = [NODES[n][0], 0, NODES[n][1]], U = [UI[u][0], 0, UI[u][1]];
    pushLine(threads, I, N, rgba(WARM, 0.55), rgba(COOL, 0.45), 0, 1, 1.0);
    pushLine(threads, N, U, rgba(COOL, 0.42), rgba(INK, 0.32), 1, 2, 1.0);
  });
  const gThreads = lineGroup(gl, new Float32Array(threads));

  const guides = [];
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
    const P = [sx * W / 2, 0, sz * D / 2];
    pushLine(guides, P, P, rgba(INK, 0.18), rgba(INK, 0.18), 1, 2, 1.0, 12);
  });
  const gGuides = lineGroup(gl, new Float32Array(guides));
  const gPackets = pointGroup(gl, new Float32Array(10 * 12));
  const packetData = new Float32Array(10 * 12);

  /* Draw one frame. s: { t, k, explode, yaw, pitch, lit, packets, points, dpr,
     drift, layerAlpha?, threadAlpha?, distance?, glow? } */
  function draw(s) {
    const cw = canvas.width, ch = canvas.height, aspect = cw / ch;
    const la = s.layerAlpha || [1, 1, 1];
    const dist = s.distance || DISTANCE;
    const P = perspective(fitFov(FOV, aspect), aspect, 0.1, 60);
    const eye = [
      dist * Math.cos(s.pitch) * Math.sin(s.yaw),
      dist * Math.sin(s.pitch) + TARGET_Y,
      dist * Math.cos(s.pitch) * Math.cos(s.yaw)
    ];
    const VP = multiply(P, lookAt(eye, [0, TARGET_Y, 0], [0, 1, 0]));
    const ly = [s.explode, 0, -s.explode];

    let n = 0;
    if (s.packets) {
      for (let i = 0; i < 5; i++) {
        const tau = s.packets[i];
        if (tau < 0 || tau >= 1) continue;
        const u = easeInOut(tau);
        const I = [ideas[i][0], ideas[i][1] + ly[0], ideas[i][2]];
        const N = [NODES[THREADS[i][0]][0], 0, NODES[THREADS[i][0]][1]];
        const U = [UI[THREADS[i][1]][0], ly[2], UI[THREADS[i][1]][1]];
        let pos, col;
        if (u < 0.5) { pos = lerp3(I, N, u * 2); col = lerp3(WARM, COOL, u * 2); }
        else { pos = lerp3(N, U, (u - 0.5) * 2); col = lerp3(COOL, INK, (u - 0.5) * 2); }
        const fade = Math.min(1, Math.min(tau, 1 - tau) * 10);
        packetData.set([pos[0], pos[1], pos[2], col[0], col[1], col[2], 0.5 * fade, -1, 0.22, 0.2, 2, 0], n * 12); n++;
        packetData.set([pos[0], pos[1], pos[2], col[0], col[1], col[2], fade, -1, 0.05, 0.2, 0, 0], n * 12); n++;
      }
    }
    gPackets.update(packetData.subarray(0, n * 12));

    gl.viewport(0, 0, cw, ch);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    gl.useProgram(pPlane.p);
    gl.uniformMatrix4fv(pPlane.u.uVP, false, VP);
    gl.uniform3fv(pPlane.u.uWarm, WARM);
    gl.uniform3fv(pPlane.u.uCool, COOL);
    gl.uniform3fv(pPlane.u.uInk, INK);
    gl.uniform1fv(pPlane.u.uLit, s.lit);
    gl.bindVertexArray(plane);
    const drawPlane = (kind, y, sx, sz, a) => {
      gl.uniform1i(pPlane.u.uKind, kind);
      gl.uniform3f(pPlane.u.uCenter, 0, y, 0);
      gl.uniform2f(pPlane.u.uSize, sx, sz);
      gl.uniform1f(pPlane.u.uAlpha, s.k * a);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    if (s.glow !== false) drawPlane(2, ly[2] - 0.45, 5.2, 3.8, la[2]);
    drawPlane(1, ly[2], W, D, la[2]);
    drawPlane(0, 0, W, D, la[1]);

    gl.useProgram(pLine.p);
    gl.uniformMatrix4fv(pLine.u.uVP, false, VP);
    gl.uniform2f(pLine.u.uRes, cw, ch);
    gl.uniform3fv(pLine.u.uLayerY, ly);
    gl.uniform3fv(pLine.u.uLayerA, la);
    gl.uniform1f(pLine.u.uPx, s.dpr);
    gl.uniform1f(pLine.u.uAlpha, s.k * 0.9); gGuides.draw();
    gl.uniform1f(pLine.u.uAlpha, s.k); gEdges.draw();
    gl.uniform3f(pLine.u.uLayerA, 1, 1, 1);
    gl.uniform1f(pLine.u.uAlpha, s.threadAlpha != null ? s.threadAlpha : Math.pow(s.k, 6)); gThreads.draw();

    gl.useProgram(pPoint.p);
    gl.uniformMatrix4fv(pPoint.u.uVP, false, VP);
    gl.uniform3fv(pPoint.u.uLayerY, ly);
    gl.uniform3fv(pPoint.u.uLayerA, la);
    gl.uniform1f(pPoint.u.uTime, s.t);
    gl.uniform1f(pPoint.u.uScatter, (1 - s.k) * 1.1);
    gl.uniform1f(pPoint.u.uDrift, s.drift ? 1 : 0);
    gl.uniform1f(pPoint.u.uAlpha, 0.15 + 0.85 * s.k);
    gl.uniform1f(pPoint.u.uFocal, P[5] * ch / 2);
    gPoints.draw(0, fixed + s.points);
    gl.uniform1f(pPoint.u.uScatter, 0);
    gl.uniform1f(pPoint.u.uAlpha, 1);
    gl.uniform1f(pPoint.u.uDrift, 0);
    gl.uniform3f(pPoint.u.uLayerA, 1, 1, 1);
    gPackets.draw();

    // Anchor points for the numbered balloons, in CSS pixels of the canvas box.
    const bw = canvas.clientWidth, bh = canvas.clientHeight;
    return [[1.45, ly[0], 0.55], [W / 2, 0, D / 2], [W / 2, ly[2], D / 2]].map(([x, y, z]) => {
      const q = project(VP, x, y, z);
      return [(q[0] * 0.5 + 0.5) * bw, (0.5 - q[1] * 0.5) * bh];
    });
  }

  return { gl, draw };
}

/* Settled still frames: the hero poster and the Think / Build / Measure stills.
   focus: undefined = whole object, 0 = ideas, 1 = systems, 2 = product. */
const FOCUS = [
  { layerAlpha: [1, 0.22, 0.2], threadAlpha: 0.3, lit: 0.1 },
  { layerAlpha: [0.3, 1, 0.28], threadAlpha: 0.95, lit: 0.1 },
  { layerAlpha: [0.22, 0.3, 1], threadAlpha: 0.45, lit: 1 }
];

export function renderStill(canvas, w, h, opts = {}) {
  h = h || w;
  canvas.width = w; canvas.height = h;
  canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
  const scene = createScene(canvas, { preserveDrawingBuffer: true, antialias: true });
  if (!scene) return false;
  const f = opts.focus != null ? FOCUS[opts.focus] : null;
  const lit = f ? f.lit : 0.3;
  scene.draw({
    t: 0, k: 1, explode: opts.explode || 1, yaw: BASE_YAW, pitch: BASE_PITCH,
    lit: new Float32Array([lit, lit, lit, lit, lit]),
    packets: null, points: CLOUD, dpr: opts.dpr || 2, drift: false,
    layerAlpha: f ? f.layerAlpha : null, threadAlpha: f ? f.threadAlpha : null,
    distance: opts.distance, glow: opts.glow
  });
  return true;
}

/* Live scene inside the hero art box. Calls onFail() if WebGL is unusable. */
export function mount(art, { onFail } = {}) {
  const canvas = art.querySelector('canvas');
  const hero = art.closest('.hero') || art;
  const balloons = Array.prototype.slice.call(art.querySelectorAll('.balloon'));
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;

  let scene;
  try { scene = createScene(canvas); } catch (e) { scene = null; }
  if (!scene) { if (onFail) onFail(); return null; }

  const q = { dprCap: small ? 1.5 : 2, points: small || coarse ? 80 : CLOUD, tier: 0 };
  const ptr = { x: 0, y: 0, tx: 0, ty: 0, h: 0, th: 0, moved: 0 };
  const lit = new Float32Array(5);
  const packets = new Float32Array(5);
  const wasActive = [false, false, false, false, false];
  let t0 = null, last = 0, raf = 0, visible = false, dead = false, skip = false;
  let probeSum = 0, probeN = 0;

  function progress() {
    const r = hero.getBoundingClientRect();
    return clamp(-r.top / Math.max(1, r.height * 0.85), 0, 1);
  }

  function fail() {
    if (dead) return;
    destroy();
    if (onFail) onFail();
  }

  function frame(now) {
    raf = 0;
    if (dead) return;
    if (t0 === null) t0 = now;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
    const elapsed = now - t0;
    const k = easeOutExpo(clamp((elapsed - 150) / 1800, 0, 1));
    const t = now / 1000;

    // After the intro, idle at ~30 fps when the pointer is still.
    const idle = k >= 1 && now - ptr.moved > 2500;
    skip = idle ? !skip : false;
    if (skip) { raf = requestAnimationFrame(frame); return; }
    last = now;

    // Quality probe: 45 frames once the intro has settled.
    if (k >= 1 && probeN < 45 && !idle) {
      probeSum += dt; probeN++;
      if (probeN === 45) {
        const avg = probeSum / probeN;
        if (avg > 0.04 && q.tier >= 1) { fail(); return; }
        if (avg > 0.026) { q.tier++; q.dprCap = 1; q.points = 60; probeSum = 0; probeN = 0; }
      }
    }

    const dpr = fitCanvas(canvas, q.dprCap);
    ptr.x += (ptr.tx - ptr.x) * 0.06;
    ptr.y += (ptr.ty - ptr.y) * 0.06;
    ptr.h += (ptr.th - ptr.h) * 0.05;
    const p = progress();

    for (let i = 0; i < 5; i++) {
      const local = (((t - i * 1.25) % 6.4) + 6.4) % 6.4;
      const tau = local / 2.8;
      const active = tau < 1 && k > 0.98;
      if (wasActive[i] && !active) lit[THREADS[i][1]] = 1;
      wasActive[i] = active;
      packets[i] = active ? tau : -1;
    }
    for (let j = 0; j < 5; j++) lit[j] *= Math.exp(-dt * 1.2);

    const anchors = scene.draw({
      t, k,
      explode: 1 + (1 - k) * 1.4 + p * 0.45 + ptr.h * 0.14,
      yaw: BASE_YAW + ptr.x * 0.16 + Math.sin(t * 0.12) * 0.05,
      pitch: BASE_PITCH + p * 0.35 + ptr.y * 0.05,
      lit, packets, points: q.points, dpr, drift: true
    });

    const show = clamp((k - 0.75) * 4, 0, 1);
    balloons.forEach((el, i) => {
      el.style.transform = 'translate(' + (anchors[i][0] + 6).toFixed(1) + 'px,' + anchors[i][1].toFixed(1) + 'px)';
      el.style.opacity = String(show);
    });

    if (!art.classList.contains('is-live')) art.classList.add('is-live');
    if (visible) raf = requestAnimationFrame(frame);
  }

  function request() { if (!raf && !dead) raf = requestAnimationFrame(frame); }

  function onPointer(e) {
    if (e.pointerType !== 'mouse') return;
    const r = art.getBoundingClientRect();
    ptr.tx = clamp(((e.clientX - r.left) / r.width - 0.5) * 2, -1, 1);
    ptr.ty = clamp(((e.clientY - r.top) / r.height - 0.5) * 2, -1, 1);
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    ptr.th = 1 - clamp(Math.hypot(e.clientX - cx, e.clientY - cy) / (Math.min(r.width, r.height) * 0.6), 0, 1);
    ptr.moved = performance.now();
  }
  function onLeave() { ptr.tx = 0; ptr.ty = 0; ptr.th = 0; }
  function onScroll() { ptr.moved = performance.now(); request(); }
  function onLost(e) { e.preventDefault(); fail(); }

  hero.addEventListener('pointermove', onPointer, { passive: true });
  hero.addEventListener('pointerleave', onLeave);
  window.addEventListener('scroll', onScroll, { passive: true });
  canvas.addEventListener('webglcontextlost', onLost);

  const io = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) request();
    else if (raf) { cancelAnimationFrame(raf); raf = 0; }
  });
  io.observe(art);
  const ro = new ResizeObserver(request);
  ro.observe(canvas);

  function destroy() {
    dead = true;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    io.disconnect();
    ro.disconnect();
    hero.removeEventListener('pointermove', onPointer);
    hero.removeEventListener('pointerleave', onLeave);
    window.removeEventListener('scroll', onScroll);
    canvas.removeEventListener('webglcontextlost', onLost);
    art.classList.remove('is-live');
  }

  return { destroy };
}
