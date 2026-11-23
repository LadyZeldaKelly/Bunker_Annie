import type React from "react";
import { Interactive, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/fonts";

// Oswald Bold (SIL Open Font License), bundled in public/fonts so renders work offline.
const titleFont = "Oswald";
loadFont({ family: titleFont, url: staticFile("fonts/Oswald-Bold.woff2"), weight: "700" });

// ---------- Pulsing light glow (alarms, lamps, sirens) ----------
const LightGlowInner = ({
  color,
  x,
  y,
  size,
  pulsesPerSecond,
  minOpacity,
  maxOpacity,
  phase = 0,
  style,
}: {
  readonly phase?: number;
  readonly color: string;
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly pulsesPerSecond: number;
  readonly minOpacity: number;
  readonly maxOpacity: number;
  readonly style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Smooth sine pulse between min and max opacity.
  const wave = (Math.sin(((frame / fps) * pulsesPerSecond + phase) * Math.PI * 2) + 1) / 2;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: "screen",
        background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${color} 0%, transparent ${size * 100}%)`,
        opacity: minOpacity + (maxOpacity - minOpacity) * wave,
        ...style,
      }}
    />
  );
};

export const LightGlow = Interactive.create({
  Component: LightGlowInner,
  schema: {
    color: { type: "color", default: "#F5A623", description: "Light colour" },
    x: { type: "number", hiddenFromList: false, default: 0.5, min: 0, max: 1, step: 0.01, description: "Light X (0–1)" },
    y: { type: "number", hiddenFromList: false, default: 0.5, min: 0, max: 1, step: 0.01, description: "Light Y (0–1)" },
    size: { type: "number", hiddenFromList: false, default: 0.25, min: 0.02, max: 1, step: 0.01, description: "Glow radius" },
    pulsesPerSecond: { type: "number", hiddenFromList: false, default: 0.5, min: 0, max: 6, step: 0.05, description: "Pulses per second (0 = steady)" },
    minOpacity: { type: "number", hiddenFromList: false, default: 0.25, min: 0, max: 1, step: 0.01, description: "Dimmest" },
    maxOpacity: { type: "number", hiddenFromList: false, default: 0.7, min: 0, max: 1, step: 0.01, description: "Brightest" },
    phase: { type: "number", hiddenFromList: false, default: 0, min: 0, max: 1, step: 0.05, description: "Pulse offset (0.5 = opposite)" },
  } as const,
});

// ---------- Siren: alternates two colours (e.g. police red/blue) ----------
const SirenInner = ({
  colorA,
  colorB,
  flashesPerSecond,
  strength,
  style,
}: {
  readonly colorA: string;
  readonly colorB: string;
  readonly flashesPerSecond: number;
  readonly strength: number;
  readonly style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phase = (frame / fps) * flashesPerSecond;
  const useA = Math.floor(phase) % 2 === 0;
  const wave = Math.sin((phase % 1) * Math.PI);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: "screen",
        background: useA
          ? `radial-gradient(ellipse at 0% 50%, ${colorA} 0%, transparent 60%)`
          : `radial-gradient(ellipse at 100% 50%, ${colorB} 0%, transparent 60%)`,
        opacity: strength * wave,
        ...style,
      }}
    />
  );
};

export const Siren = Interactive.create({
  Component: SirenInner,
  schema: {
    colorA: { type: "color", default: "#E62E2E", description: "Left colour" },
    colorB: { type: "color", default: "#2E6BE6", description: "Right colour" },
    flashesPerSecond: { type: "number", hiddenFromList: false, default: 3, min: 0.5, max: 10, step: 0.1, description: "Flashes per second" },
    strength: { type: "number", hiddenFromList: false, default: 0.6, min: 0, max: 1, step: 0.01, description: "Strength" },
  } as const,
});

// ---------- Power-outage / night darkening ----------
const DarkenInner = ({
  color,
  amount,
  flicker,
  style,
}: {
  readonly color: string;
  readonly amount: number;
  readonly flicker?: boolean;
  readonly style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  // Deterministic flicker: brief brightness dips on a few frames.
  const dip = flicker && (frame % 47 === 0 || frame % 61 === 0 || frame % 61 === 2) ? 0.12 : 0;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        backgroundColor: color,
        mixBlendMode: "multiply",
        opacity: Math.min(1, amount + dip),
        ...style,
      }}
    />
  );
};

export const Darken = Interactive.create({
  Component: DarkenInner,
  schema: {
    color: { type: "color", default: "#0A101A", description: "Tint colour" },
    amount: { type: "number", hiddenFromList: false, default: 0.7, min: 0, max: 1, step: 0.01, description: "Darkness" },
    flicker: { type: "boolean", default: false, description: "Flicker" },
  } as const,
});

// ---------- CRT scanlines (security monitors, screens) ----------
const ScanlinesInner = ({
  lineSpacing,
  opacity,
  rollSpeed,
  style,
}: {
  readonly lineSpacing: number;
  readonly opacity: number;
  readonly rollSpeed: number;
  readonly style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity,
        backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0.6) 0px, rgba(0,0,0,0.6) 1px, transparent 1px, transparent ${lineSpacing}px)`,
        backgroundPositionY: `${frame * rollSpeed}px`,
        ...style,
      }}
    />
  );
};

export const Scanlines = Interactive.create({
  Component: ScanlinesInner,
  schema: {
    lineSpacing: { type: "number", hiddenFromList: false, default: 4, min: 2, max: 20, step: 1, description: "Line spacing (px)" },
    opacity: { type: "number", hiddenFromList: false, default: 0.35, min: 0, max: 1, step: 0.01, description: "Strength" },
    rollSpeed: { type: "number", hiddenFromList: false, default: 0.5, min: 0, max: 5, step: 0.1, description: "Roll speed" },
  } as const,
});

// ---------- Chapter title, top-left ("DAY 1") ----------
const ChapterTitleInner = ({
  children,
  style,
}: {
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
}) => (
  <div
    style={{
      position: "absolute",
      top: 56,
      left: 72,
      fontFamily: titleFont,
      fontWeight: 700,
      fontSize: 84,
      letterSpacing: 4,
      color: "#FFFFFF",
      textTransform: "uppercase",
      lineHeight: 1,
      ...style,
    }}
  >
    {children}
  </div>
);

export const ChapterTitle = Interactive.create({
  Component: ChapterTitleInner,
  schema: {
    ...Interactive.textSchema,
    ...Interactive.childrenSchema,
  } as const,
});

// ---------- Flashlight: darkens everything except a soft pool of light, which can sweep ----------
const FlashlightInner = ({
  fromX,
  fromY,
  toX,
  toY,
  radius,
  darkness,
  on,
  style,
}: {
  readonly fromX: number;
  readonly fromY: number;
  readonly toX?: number;
  readonly toY?: number;
  readonly radius: number;
  readonly darkness: number;
  readonly on?: boolean;
  readonly style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  // Ease the beam from (fromX, fromY) to (toX, toY) across the shot.
  const p = Math.min(1, frame / Math.max(1, durationInFrames - 1));
  const e = p * p * (3 - 2 * p);
  const x = fromX + ((toX ?? fromX) - fromX) * e;
  const y = fromY + ((toY ?? fromY) - fromY) * e;
  const r = radius * 100;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: on === false
          ? `rgba(4,7,14,${Math.min(1, darkness + 0.12)})`
          : `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,244,214,0.10) 0%, rgba(4,7,14,0) ${r * 0.55}%, rgba(4,7,14,${darkness}) ${r}%)`,
        ...style,
      }}
    />
  );
};

export const Flashlight = Interactive.create({
  Component: FlashlightInner,
  schema: {
    fromX: { type: "number", hiddenFromList: false, default: 0.5, min: 0, max: 1, step: 0.01, description: "Beam start X" },
    fromY: { type: "number", hiddenFromList: false, default: 0.5, min: 0, max: 1, step: 0.01, description: "Beam start Y" },
    toX: { type: "number", hiddenFromList: false, default: 0.5, min: 0, max: 1, step: 0.01, description: "Beam end X" },
    toY: { type: "number", hiddenFromList: false, default: 0.5, min: 0, max: 1, step: 0.01, description: "Beam end Y" },
    radius: { type: "number", hiddenFromList: false, default: 0.45, min: 0.05, max: 1.5, step: 0.01, description: "Beam size" },
    darkness: { type: "number", hiddenFromList: false, default: 0.7, min: 0, max: 1, step: 0.01, description: "Darkness outside the beam" },
    on: { type: "boolean", default: true, description: "Flashlight on" },
  } as const,
});

// ---------- Heartbeat: dark red vignette that thumps in a double-beat ----------
const HeartbeatInner = ({
  beatsPerMinute,
  strength,
  style,
}: {
  readonly beatsPerMinute: number;
  readonly strength: number;
  readonly style?: React.CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = ((frame / fps) * beatsPerMinute) / 60;
  const phase = t % 1;
  // "lub-dub": two quick pulses at the start of each beat.
  const pulse = Math.max(Math.exp(-Math.pow((phase - 0.05) / 0.05, 2)), 0.7 * Math.exp(-Math.pow((phase - 0.22) / 0.05, 2)));
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(120,0,0,0.9) 100%)",
        opacity: strength * pulse,
        ...style,
      }}
    />
  );
};

export const Heartbeat = Interactive.create({
  Component: HeartbeatInner,
  schema: {
    beatsPerMinute: { type: "number", hiddenFromList: false, default: 100, min: 40, max: 180, step: 1, description: "Beats per minute" },
    strength: { type: "number", hiddenFromList: false, default: 0.6, min: 0, max: 1, step: 0.01, description: "Strength" },
  } as const,
});

// ---------- End card: centred title on black ("TO BE CONTINUED...") ----------
const EndCardInner = ({
  children,
  style,
}: {
  readonly children: React.ReactNode;
  readonly style?: React.CSSProperties;
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#000000",
      fontFamily: titleFont,
      fontWeight: 700,
      fontSize: 110,
      letterSpacing: 6,
      color: "#FFFFFF",
      textTransform: "uppercase",
      ...style,
    }}
  >
    {children}
  </div>
);

export const EndCard = Interactive.create({
  Component: EndCardInner,
  schema: {
    ...Interactive.textSchema,
    ...Interactive.childrenSchema,
  } as const,
});
