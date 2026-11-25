import { AbsoluteFill, Img, interpolate, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

// Don't Go There! — cinematic realism format. Code-made atmosphere layered over photoreal stills or AI clips.
// Everything here is free to render (no credits).

// Slow, subtle camera move on a still: push-in plus a gentle drift.
export const CinematicStill: React.FC<{ src: string; zoomFrom?: number; zoomTo?: number; driftX?: number; driftY?: number; focusX?: number; focusY?: number }> = ({
  src, zoomFrom = 1.0, zoomTo = 1.06, driftX = 0, driftY = 0, focusX = 0.5, focusY = 0.5,
}) => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = interpolate(f, [0, durationInFrames], [0, 1]);
  const ease = t * t * (3 - 2 * t);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#05070b" }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transformOrigin: `${focusX * 100}% ${focusY * 100}%`,
          transform: `translate(${driftX * ease}%, ${driftY * ease}%) scale(${zoomFrom + (zoomTo - zoomFrom) * ease})`,
        }}
      />
    </AbsoluteFill>
  );
};

// Drifting fog: large soft blobs moving slowly sideways, in two depths.
export const Fog: React.FC<{ color?: string; opacity?: number; speed?: number; top?: number; bottom?: number; seed?: string }> = ({
  color = "255,190,130", opacity = 0.35, speed = 1, top = 0.35, bottom = 1, seed = "fog",
}) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const blobs = Array.from({ length: 14 }).map((_, i) => {
    const r = random(`${seed}${i}`);
    const r2 = random(`${seed}b${i}`);
    const depth = i % 2 === 0 ? 1 : 0.55;
    const w = width * (0.35 + r * 0.45);
    const h = height * (0.12 + r2 * 0.18);
    const span = width + w * 2;
    const x = ((r * span + f * speed * 0.9 * depth) % span) - w;
    const y = height * (top + (bottom - top) * r2) - h / 2;
    const breathe = 0.75 + 0.25 * Math.sin(f / 40 + i);
    return (
      <div
        key={i}
        style={{
          position: "absolute", left: x, top: y, width: w, height: h, borderRadius: "50%",
          background: `radial-gradient(ellipse at center, rgba(${color},${opacity * breathe * depth}) 0%, rgba(${color},0) 70%)`,
          filter: "blur(30px)",
        }}
      />
    );
  });
  return <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>{blobs}</AbsoluteFill>;
};

// Rain: thin slanted streaks falling fast, with depth (near drops longer/brighter).
export const Rain: React.FC<{ count?: number; angle?: number; opacity?: number; seed?: string }> = ({ count = 260, angle = 12, opacity = 0.35, seed = "rain" }) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const lines = Array.from({ length: count }).map((_, i) => {
    const near = random(`${seed}d${i}`);
    const len = 18 + near * 50;
    const speed = 28 + near * 40;
    const x0 = random(`${seed}x${i}`) * (width + 300) - 150;
    const y = ((random(`${seed}y${i}`) * (height + 200) + f * speed) % (height + 200)) - 100;
    const dx = Math.tan((angle * Math.PI) / 180) * len;
    const x = x0 + (y / height) * Math.tan((angle * Math.PI) / 180) * 120;
    return <line key={i} x1={x} y1={y} x2={x + dx} y2={y + len} stroke={`rgba(210,220,235,${opacity * (0.4 + near * 0.6)})`} strokeWidth={0.8 + near * 1.2} />;
  });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width={width} height={height}>{lines}</svg>
    </AbsoluteFill>
  );
};

// Searchlight: a soft beam from a pivot point that sweeps back and forth, with a moving pool of light where it lands.
export const Searchlight: React.FC<{ x: number; y: number; from?: number; to?: number; periodSec?: number; length?: number; color?: string; strength?: number }> = ({
  x, y, from = 200, to = 250, periodSec = 9, length = 1.1, color = "255,244,220", strength = 0.5,
}) => {
  const f = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const phase = (Math.sin((f / (fps * periodSec)) * Math.PI * 2) + 1) / 2;
  const ang = from + (to - from) * phase; // degrees, 0 = right, 90 = down
  const L = Math.hypot(width, height) * length;
  const px = x * width, py = y * height;
  const a = (ang * Math.PI) / 180, spread = (5 * Math.PI) / 180;
  const p1 = [px + Math.cos(a - spread) * L, py + Math.sin(a - spread) * L];
  const p2 = [px + Math.cos(a + spread) * L, py + Math.sin(a + spread) * L];
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
      <svg width={width} height={height}>
        <defs>
          <radialGradient id="beam" cx={px} cy={py} r={L} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={`rgba(${color},${strength})`} />
            <stop offset="0.6" stopColor={`rgba(${color},${strength * 0.25})`} />
            <stop offset="1" stopColor={`rgba(${color},0)`} />
          </radialGradient>
        </defs>
        <polygon points={`${px},${py} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]}`} fill="url(#beam)" style={{ filter: "blur(6px)" }} />
        <circle cx={px} cy={py} r={10} fill={`rgba(${color},0.95)`} style={{ filter: "blur(4px)" }} />
      </svg>
    </AbsoluteFill>
  );
};

// Flickering/pulsing point lights (headlights, tail lights, phone screens, emergency strobes).
export type PointLight = { x: number; y: number; r: number; color: string; mode?: "flicker" | "pulse" | "strobe"; rate?: number; seed?: string };
export const PointLights: React.FC<{ lights: PointLight[] }> = ({ lights }) => {
  const f = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
      {lights.map((l, i) => {
        const s = l.seed ?? `pl${i}`;
        const rate = l.rate ?? 1;
        let k = 1;
        if (l.mode === "pulse") k = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin((f / fps) * Math.PI * 2 * rate + random(s) * 6));
        else if (l.mode === "strobe") k = Math.floor((f / fps) * rate * 2 + random(s) * 2) % 2 === 0 ? 1 : 0.08;
        else k = 0.78 + 0.22 * Math.sin(f / 3 + random(s) * 20) * Math.sin(f / 7.3 + random(s) * 9);
        const r = l.r * width;
        return (
          <div key={i} style={{
            position: "absolute", left: l.x * width - r, top: l.y * height - r, width: r * 2, height: r * 2, borderRadius: "50%",
            background: `radial-gradient(circle, ${l.color} 0%, rgba(0,0,0,0) 70%)`, opacity: k,
          }} />
        );
      })}
    </AbsoluteFill>
  );
};

// Distant silhouettes: small dark human figures shuffling slowly across a band of the frame (used far away and soft only).
export const Silhouettes: React.FC<{ count?: number; y?: number; scale?: number; speed?: number; seed?: string; blur?: number; color?: string }> = ({
  count = 6, y = 0.6, scale = 1, speed = 0.4, seed = "sil", blur = 1.2, color = "rgba(8,8,12,0.85)",
}) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", filter: `blur(${blur}px)` }}>
      <svg width={width} height={height}>
        {Array.from({ length: count }).map((_, i) => {
          const r = random(`${seed}${i}`);
          const dir = r > 0.5 ? 1 : -1;
          const h = (34 + random(`${seed}h${i}`) * 16) * scale;
          const x = ((r * width + dir * f * speed * (0.6 + r)) % (width + 100) + width + 100) % (width + 100) - 50;
          const yy = height * (y + (random(`${seed}y${i}`) - 0.5) * 0.06);
          const bob = Math.sin(f / 6 + i) * 1.2 * scale;
          const lean = Math.sin(f / 15 + i * 2) * 3;
          return (
            <g key={i} transform={`translate(${x},${yy + bob}) rotate(${lean}) scale(${h / 50})`}>
              <ellipse cx={0} cy={-44} rx={4.2} ry={5} fill={color} />
              <path d="M-6,-38 Q0,-41 6,-38 L7,-16 L4,-15 L3,0 L-3,0 L-4,-15 L-7,-16 Z" fill={color} />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Film finish: grain, vignette and 2.39:1 letterbox bars.
export const FilmFinish: React.FC<{ grain?: number; vignette?: number; letterbox?: boolean }> = ({ grain = 0.12, vignette = 0.55, letterbox = true }) => {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const bar = letterbox ? Math.round((height - width / 2.39) / 2) : 0;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width={width} height={height} style={{ position: "absolute", opacity: grain, mixBlendMode: "overlay" }}>
        <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={f % 97} /></filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,${vignette}) 100%)` }} />
      {bar > 0 ? (
        <>
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: bar, background: "#000" }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: bar, background: "#000" }} />
        </>
      ) : null}
    </AbsoluteFill>
  );
};
