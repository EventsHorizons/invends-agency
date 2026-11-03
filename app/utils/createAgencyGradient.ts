import {
  FRAGMENT_SRC,
  VERTEX_SRC,
  brandWaveColorAt,
  hexToRgb01,
  type GradientParams,
  HOME_GRADIENT,
} from "./agencyGradientShader";

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) throw new Error("createShader failed");
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(log || "shader compile failed");
  }
  return sh;
}

/** Layered soft oscillators — less mechanical than a single sin. */
function soft(t: number, a: number, b: number, c: number, amp = 1) {
  return (Math.sin(t * a) * 0.5 + Math.sin(t * b + 1.3) * 0.32 + Math.sin(t * c + 2.7) * 0.18) * amp;
}

export type AgencyGradientHandle = {
  setParams: (p: Partial<GradientParams>) => void;
  resize: () => void;
  draw: () => void;
  start: () => void;
  stop: () => void;
  dispose: () => void;
  gl: WebGL2RenderingContext;
  isRunning: () => boolean;
  getSeed: () => number;
};

export function createAgencyGradient(
  canvas: HTMLCanvasElement,
  initial: GradientParams = HOME_GRADIENT,
  opts: { animateSeed?: boolean; seedSpeed?: number; noRetina?: boolean } = {},
): AgencyGradientHandle {
  // Match live agency-gradient CE: preserveDrawingBuffer + antialias
  const gl = canvas.getContext("webgl2", {
    antialias: true,
    alpha: false,
    depth: true,
    premultipliedAlpha: false,
    preserveDrawingBuffer: true,
    powerPreference: "high-performance",
  });
  if (!gl) throw new Error("WebGL2 unavailable");

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SRC);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
  const program = gl.createProgram();
  if (!program) throw new Error("createProgram failed");
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || "link failed");
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  const vao = gl.createVertexArray();
  const buf = gl.createBuffer();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  // Fullscreen triangle covering clip space
  const verts = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]);
  gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);

  const u = {
    color1: gl.getUniformLocation(program, "color1"),
    color2: gl.getUniformLocation(program, "color2"),
    color3: gl.getUniformLocation(program, "color3"),
    color4: gl.getUniformLocation(program, "color4"),
    colorSize: gl.getUniformLocation(program, "colorSize"),
    colorSpacing: gl.getUniformLocation(program, "colorSpacing"),
    colorRotation: gl.getUniformLocation(program, "colorRotation"),
    colorSpread: gl.getUniformLocation(program, "colorSpread"),
    displacement: gl.getUniformLocation(program, "displacement"),
    zoom: gl.getUniformLocation(program, "zoom"),
    spacing: gl.getUniformLocation(program, "spacing"),
    seed: gl.getUniformLocation(program, "seed"),
    viewportSize: gl.getUniformLocation(program, "viewportSize"),
    colorOffset: gl.getUniformLocation(program, "colorOffset"),
    transformPosition: gl.getUniformLocation(program, "transformPosition"),
    noiseSize: gl.getUniformLocation(program, "noiseSize"),
    noiseIntensity: gl.getUniformLocation(program, "noiseIntensity"),
  };

  let params: GradientParams = { ...initial };
  let raf = 0;
  let running = false;
  let animateSeed = opts.animateSeed ?? false;
  // Slightly slower base drift than before — reads more natural
  const seedSpeed = opts.seedSpeed ?? 0.055;
  const noRetina = opts.noRetina ?? true;
  let baseSeed = params.seed;
  let basePosition: [number, number] = [...params.position];
  let baseColorRotation = params.colorRotation;
  let baseDisplacement = params.displacement;
  let t0 = performance.now();
  let elapsed = 0;
  let lastNow = t0;

  let cssW = 1;
  let cssH = 1;

  const resize = () => {
    const dpr = noRetina ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    cssW = Math.max(1, canvas.clientWidth || 1);
    cssH = Math.max(1, canvas.clientHeight || 1);
    const w = Math.max(1, Math.floor(cssW * dpr));
    const h = Math.max(1, Math.floor(cssH * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  };

  const draw = () => {
    resize();
    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const c1 = hexToRgb01(params.color1);
    const c2 = hexToRgb01(params.color2);
    const c3 = hexToRgb01(params.color3);
    const c4 = hexToRgb01(params.color4);
    gl.uniform3fv(u.color1, c1);
    gl.uniform3fv(u.color2, c2);
    gl.uniform3fv(u.color3, c3);
    gl.uniform3fv(u.color4, c4);
    gl.uniform1f(u.colorSize, params.colorSize);
    gl.uniform1f(u.colorSpacing, params.colorSpacing);
    gl.uniform1f(u.colorRotation, params.colorRotation);
    gl.uniform1f(u.colorSpread, params.colorSpread);
    gl.uniform1f(u.displacement, params.displacement);
    gl.uniform1f(u.zoom, params.zoom);
    gl.uniform1f(u.spacing, params.spacing);
    gl.uniform1f(u.seed, params.seed);
    // Live CE passes CSS content-box size, not buffer pixels
    gl.uniform2f(u.viewportSize, cssW, cssH);
    gl.uniform2fv(u.colorOffset, params.colorOffset);
    gl.uniform2fv(u.transformPosition, params.position);
    gl.uniform1f(u.noiseSize, params.noiseSize);
    gl.uniform1f(u.noiseIntensity, params.noiseIntensity);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindVertexArray(null);
  };

  const tick = (now: number) => {
    if (!running) return;
    const frameDt = Math.min(0.05, (now - lastNow) / 1000);
    lastNow = now;

    if (animateSeed) {
      elapsed += frameDt;
      const t = elapsed;

      // Seed: steady drift + tiny irregularity so morphing isn't metronomic
      params.seed =
        baseSeed + t * seedSpeed + soft(t, 0.09, 0.14, 0.05, 0.012);

      // Soft asymmetric drift (same spirit as before, less rigid orbit)
      params.position = [
        basePosition[0] + soft(t, 0.078, 0.121, 0.051, 0.042),
        basePosition[1] + soft(t + 2.4, 0.069, 0.103, 0.044, 0.034),
      ];

      params.colorRotation =
        baseColorRotation + soft(t + 1.1, 0.038, 0.062, 0.024, 0.036);

      // Very subtle breath on displacement — contours ease in/out
      params.displacement =
        baseDisplacement * (1 + soft(t + 3.2, 0.045, 0.071, 0.029, 0.04));

      // Brand wave hues — same cycle as before, slightly slower
      const huePhase = t * 0.38;
      params.color1 = brandWaveColorAt(huePhase);
      params.color2 = brandWaveColorAt(huePhase + 1.05);
      params.color3 = brandWaveColorAt(huePhase + 2.1);
      params.color4 = brandWaveColorAt(huePhase + 3.15);
    }
    draw();
    raf = requestAnimationFrame(tick);
  };

  const start = () => {
    // Starting the loop always enables wave motion (seed + soft orbit)
    animateSeed = true;
    lastNow = performance.now();
    if (elapsed === 0) {
      t0 = lastNow;
      baseSeed = params.seed;
      basePosition = [...params.position];
      baseColorRotation = params.colorRotation;
      baseDisplacement = params.displacement;
    }
    if (running) return;
    running = true;
    raf = requestAnimationFrame(tick);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const setParams = (p: Partial<GradientParams>) => {
    params = { ...params, ...p };
    if (p.seed != null) baseSeed = p.seed;
    if (p.position) basePosition = [...p.position];
    if (p.colorRotation != null) baseColorRotation = p.colorRotation;
    if (p.displacement != null) baseDisplacement = p.displacement;
    if (!running) draw();
  };

  const dispose = () => {
    stop();
    gl.deleteBuffer(buf);
    gl.deleteVertexArray(vao);
    gl.deleteProgram(program);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };

  resize();
  draw();

  return {
    setParams,
    resize,
    draw,
    start,
    stop,
    dispose,
    gl,
    isRunning: () => running,
    getSeed: () => params.seed,
  };
}
