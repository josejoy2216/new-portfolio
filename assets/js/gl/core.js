/* josechacko.com — minimal WebGL2 renderer.
   Three primitives cover every scene on the site: screen-space lines,
   point sprites and flat planes drawn with signed-distance shapes.
   No textures, no dependencies. */

/* ---------------- math ---------------- */
export function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
export function easeOutExpo(x) { return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x); }
export function easeInOut(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
export function lerp3(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }

export function perspective(fovy, aspect, near, far) {
  const t = 1 / Math.tan(fovy / 2), nf = 1 / (near - far), m = new Float32Array(16);
  m[0] = t / aspect; m[5] = t; m[10] = (far + near) * nf; m[11] = -1; m[14] = 2 * far * near * nf;
  return m;
}

/* Vertical field of view that keeps `fov` across the shorter side of the view,
   so a scene keeps its size relative to min(width, height) at any aspect. */
export function fitFov(fov, aspect) {
  return aspect >= 1 ? fov : 2 * Math.atan(Math.tan(fov / 2) / aspect);
}

export function lookAt(e, c, u) {
  let zx = e[0] - c[0], zy = e[1] - c[1], zz = e[2] - c[2], l = Math.hypot(zx, zy, zz);
  zx /= l; zy /= l; zz /= l;
  let xx = u[1] * zz - u[2] * zy, xy = u[2] * zx - u[0] * zz, xz = u[0] * zy - u[1] * zx;
  l = Math.hypot(xx, xy, xz); xx /= l; xy /= l; xz /= l;
  const yx = zy * xz - zz * xy, yy = zz * xx - zx * xz, yz = zx * xy - zy * xx;
  return new Float32Array([xx, yx, zx, 0, xy, yy, zy, 0, xz, yz, zz, 0,
    -(xx * e[0] + xy * e[1] + xz * e[2]), -(yx * e[0] + yy * e[1] + yz * e[2]), -(zx * e[0] + zy * e[1] + zz * e[2]), 1]);
}

export function multiply(a, b) {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
  }
  return o;
}

export function project(m, x, y, z) {
  const cx = m[0] * x + m[4] * y + m[8] * z + m[12];
  const cy = m[1] * x + m[5] * y + m[9] * z + m[13];
  const cw = m[3] * x + m[7] * y + m[11] * z + m[15];
  return [cx / cw, cy / cw];
}

export function seededRandom(seed) {
  let a = seed | 0;
  return function () {
    a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/* ---------------- shaders ---------------- */
const LAYER = 'float ly(float l){ return l < -0.5 ? 0.0 : (l < 0.5 ? uLayerY.x : (l < 1.5 ? uLayerY.y : uLayerY.z)); }\n' +
  'float la(float l){ return l < -0.5 ? 1.0 : (l < 0.5 ? uLayerA.x : (l < 1.5 ? uLayerA.y : uLayerA.z)); }\n';

export const LINE_VS = `#version 300 es
precision highp float;
layout(location=0) in vec2 aCorner;
layout(location=1) in vec3 aA;
layout(location=2) in vec3 aB;
layout(location=3) in vec4 aColA;
layout(location=4) in vec4 aColB;
layout(location=5) in vec4 aMeta; // layerA, layerB, width (css px), dashes
uniform mat4 uVP; uniform vec2 uRes; uniform vec3 uLayerY; uniform vec3 uLayerA; uniform float uAlpha; uniform float uPx;
out vec4 vCol; out float vSide; out float vT; out float vDash;
${LAYER}
void main(){
  vec4 a = uVP * vec4(aA + vec3(0.0, ly(aMeta.x), 0.0), 1.0);
  vec4 b = uVP * vec4(aB + vec3(0.0, ly(aMeta.y), 0.0), 1.0);
  vec2 sa = a.xy / a.w * uRes * 0.5;
  vec2 sb = b.xy / b.w * uRes * 0.5;
  vec2 d = sb - sa; float len = length(d);
  vec2 dir = len > 1e-4 ? d / len : vec2(1.0, 0.0);
  vec2 n = vec2(-dir.y, dir.x);
  vec4 p = mix(a, b, aCorner.x);
  float w = aMeta.z * uPx + 1.0;
  p.xy += n * aCorner.y * w * 0.5 / (uRes * 0.5) * p.w;
  gl_Position = p;
  vCol = mix(aColA, aColB, aCorner.x); vCol.a *= uAlpha * mix(la(aMeta.x), la(aMeta.y), aCorner.x);
  vSide = aCorner.y; vT = aCorner.x; vDash = aMeta.w;
}`;

export const LINE_FS = `#version 300 es
precision highp float;
in vec4 vCol; in float vSide; in float vT; in float vDash; out vec4 o;
void main(){
  if (vDash > 0.5 && fract(vT * vDash) > 0.55) discard;
  float a = vCol.a * (1.0 - smoothstep(0.35, 1.0, abs(vSide)));
  o = vec4(vCol.rgb * a, a);
}`;

export const POINT_VS = `#version 300 es
precision highp float;
layout(location=0) in vec3 aPos;
layout(location=1) in vec4 aCol;
layout(location=2) in vec4 aMeta; // layer, size (world units), seed, shape
layout(location=3) in float aDrift;
uniform mat4 uVP; uniform vec3 uLayerY; uniform vec3 uLayerA; uniform float uTime; uniform float uScatter;
uniform float uDrift; uniform float uAlpha; uniform float uFocal;
out vec4 vCol; out float vShape;
${LAYER}
void main(){
  vec3 p = aPos; float s = aMeta.z;
  p.y += ly(aMeta.x);
  float dr = uDrift * aDrift;
  p.x += sin(uTime * 0.31 + s * 6.283) * dr * 0.07;
  p.z += cos(uTime * 0.27 + s * 9.1) * dr * 0.07;
  p.y += sin(uTime * 0.45 + s * 3.7) * dr * 0.05;
  vec3 ds = normalize(vec3(sin(s * 12.9898), cos(s * 7.233) * 0.7, cos(s * 4.1414)) + 1e-4);
  p += ds * uScatter * (1.2 + fract(s * 31.7) * 2.4);
  vec4 c = uVP * vec4(p, 1.0);
  gl_Position = c;
  gl_PointSize = max(1.0, aMeta.y * uFocal / c.w);
  vCol = aCol; vCol.a *= uAlpha * la(aMeta.x); vShape = aMeta.w;
}`;

export const POINT_FS = `#version 300 es
precision highp float;
in vec4 vCol; in float vShape; out vec4 o;
void main(){
  vec2 q = gl_PointCoord * 2.0 - 1.0; float d = length(q); float a; float add = 0.0;
  if (vShape < 0.5) a = 1.0 - smoothstep(0.55, 1.0, d);
  else if (vShape < 1.5) a = smoothstep(0.5, 0.64, d) * (1.0 - smoothstep(0.82, 1.0, d)) + (1.0 - smoothstep(0.14, 0.32, d));
  else { a = exp(-d * d * 4.0) * (1.0 - smoothstep(0.85, 1.0, d)); add = 1.0; }
  a *= vCol.a;
  o = vec4(vCol.rgb * a, a * (1.0 - add));
}`;

/* ---------------- GL helpers ---------------- */
export function getContext(canvas, extra) {
  try {
    return canvas.getContext('webgl2', Object.assign({
      antialias: true, alpha: true, premultipliedAlpha: true, powerPreference: 'low-power'
    }, extra || {}));
  } catch (e) {
    return null;
  }
}

export function program(gl, vs, fs) {
  const p = gl.createProgram();
  [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]].forEach(([type, src]) => {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) || 'shader');
    gl.attachShader(p, sh);
  });
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'link');
  const u = {};
  const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < n; i++) {
    const info = gl.getActiveUniform(p, i);
    u[info.name.replace(/\[0\]$/, '')] = gl.getUniformLocation(p, info.name);
  }
  return { p, u };
}

const CORNERS = new Float32Array([0, -1, 1, -1, 0, 1, 1, 1]);

/* Instanced line segments: A(3) B(3) colourA(4) colourB(4) meta(4) = 18 floats */
export function lineGroup(gl, data) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const cb = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cb);
  gl.bufferData(gl.ARRAY_BUFFER, CORNERS, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const ib = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, ib);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
  [[1, 3, 0], [2, 3, 3], [3, 4, 6], [4, 4, 10], [5, 4, 14]].forEach(([loc, size, off]) => {
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 72, off * 4);
    gl.vertexAttribDivisor(loc, 1);
  });
  gl.bindVertexArray(null);
  return {
    count: data.length / 18,
    update(d) { gl.bindBuffer(gl.ARRAY_BUFFER, ib); gl.bufferData(gl.ARRAY_BUFFER, d, gl.DYNAMIC_DRAW); this.count = d.length / 18; },
    draw() { if (!this.count) return; gl.bindVertexArray(vao); gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, this.count); }
  };
}

/* Point sprites: pos(3) colour(4) meta(4) drift(1) = 12 floats */
export function pointGroup(gl, data) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, b);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
  [[0, 3, 0], [1, 4, 3], [2, 4, 7], [3, 1, 11]].forEach(([loc, size, off]) => {
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 48, off * 4);
  });
  gl.bindVertexArray(null);
  return {
    count: data.length / 12,
    update(d) { gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, d, gl.DYNAMIC_DRAW); this.count = d.length / 12; },
    draw(first, count) {
      const c = count == null ? this.count : count;
      if (!c) return;
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.POINTS, first || 0, c);
    }
  };
}

export function quad(gl) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const b = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, b);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  return vao;
}

export function rgba(c, a) { return [c[0], c[1], c[2], a]; }

export function pushLine(arr, A, B, ca, cb, la, lb, width, dash) {
  arr.push(A[0], A[1], A[2], B[0], B[1], B[2], ca[0], ca[1], ca[2], ca[3], cb[0], cb[1], cb[2], cb[3], la, lb, width, dash || 0);
}

export function pushPoint(arr, P, c, a, layer, size, seed, shape, drift) {
  arr.push(P[0], P[1], P[2], c[0], c[1], c[2], a, layer, size, seed, shape, drift);
}

/* Resize the drawing buffer to the canvas's CSS box, capping the pixel ratio. */
export function fitCanvas(canvas, cap) {
  const dpr = Math.min(window.devicePixelRatio || 1, cap);
  const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
  const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
  if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
  return dpr;
}
