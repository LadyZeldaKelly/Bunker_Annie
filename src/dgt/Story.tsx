import { loadFont } from "@remotion/fonts";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

// Don't Go There! cinematic format — story graphics built in code (free).
const titleFont = "Oswald";
loadFont({ family: titleFont, url: staticFile("fonts/Oswald-Bold.woff2"), weight: "700" });
const mono = "'DejaVu Sans Mono', 'Courier New', monospace";

// REAL FILE insert: a page of the real CONPLAN 8888-11 document, typed on, with a highlighter sweep.
// Only real document text may be passed here (see episodes/conplan-8888/script.md fact index).
export const RealFile: React.FC<{ page: string; text: string; highlight?: string }> = ({ page, text, highlight }) => {
  const f = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const typeEnd = Math.min(durationInFrames * 0.55, fps * 4.5);
  const shown = Math.round(interpolate(f, [fps * 0.4, typeEnd], [0, text.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const hlStart = highlight ? text.indexOf(highlight) : -1;
  const sweep = interpolate(f, [typeEnd + 6, typeEnd + 6 + fps * 0.8], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoom = interpolate(f, [0, durationInFrames], [1.0, 1.05]);
  const visible = text.slice(0, shown);
  const parts = hlStart >= 0
    ? [visible.slice(0, hlStart), visible.slice(hlStart, hlStart + highlight!.length), visible.slice(hlStart + highlight!.length)]
    : [visible, "", ""];
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, #2a2620 0%, #0c0b09 75%)", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: 1320, minHeight: 640, padding: "70px 90px", background: "#e9e2cf", color: "#1b1a17",
        boxShadow: "0 30px 80px rgba(0,0,0,0.7)", transform: `rotate(-0.8deg) scale(${zoom})`, position: "relative",
        backgroundImage: "linear-gradient(rgba(120,100,60,0.08) 1px, transparent 1px)", backgroundSize: "100% 46px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 46 }}>
          <div style={{ fontFamily: titleFont, fontWeight: 700, fontSize: 54, letterSpacing: 6, color: "#b3261e", border: "6px solid #b3261e", padding: "4px 22px", transform: "rotate(-3deg)" }}>
            REAL FILE
          </div>
          <div style={{ fontFamily: mono, fontSize: 30, textAlign: "right", lineHeight: 1.35, color: "#4a453a" }}>
            CONPLAN 8888-11 · USSTRATCOM · 2011<br />PAGE {page}
          </div>
        </div>
        <div style={{ fontFamily: mono, fontSize: 52, lineHeight: 1.45, whiteSpace: "pre-wrap" }}>
          {parts[0]}
          {parts[1] ? (
            <span style={{ backgroundImage: "linear-gradient(transparent 12%, rgba(255,214,0,0.75) 12%, rgba(255,214,0,0.75) 92%, transparent 92%)", backgroundSize: `${sweep}% 100%`, backgroundRepeat: "no-repeat" }}>
              {parts[1]}
            </span>
          ) : null}
          {parts[2]}
          <span style={{ opacity: f % 30 < 15 && shown < text.length ? 1 : 0 }}>▌</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Day counter: large, short, fades in and out at the start of a shot.
export const DayTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const o = interpolate(f, [0, fps * 0.5, fps * 2.6, fps * 3.3], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 110, bottom: 190, opacity: o, fontFamily: titleFont, fontWeight: 700, fontSize: 96, letterSpacing: 14, color: "#f2efe8", textShadow: "0 4px 24px rgba(0,0,0,0.8)" }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

// Whole-frame light modulation: fluorescent flicker, red emergency pulse, or a short flash.
export const LightPulse: React.FC<{ mode: "flicker" | "red" | "dim"; strength?: number }> = ({ mode, strength = 1 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (mode === "flicker") {
    const off = (Math.floor(f / 2) * 7919) % 53 < 4; // irregular short dropouts
    return <AbsoluteFill style={{ background: "#000", opacity: off ? 0.45 * strength : 0.04 }} />;
  }
  if (mode === "red") {
    const k = 0.5 + 0.5 * Math.sin((f / fps) * Math.PI * 2 * 0.7);
    return <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 20%, rgba(230,30,30,0.55), rgba(120,0,0,0.25) 60%, rgba(0,0,0,0) 90%)", mixBlendMode: "screen", opacity: k * strength }} />;
  }
  return <AbsoluteFill style={{ background: "#0A101A", opacity: 0.35 * strength, mixBlendMode: "multiply" }} />;
};

// Camera jolt (for the knocks on the ladder): short shakes at the given seconds.
export const Jolt: React.FC<{ at: number[]; children: React.ReactNode }> = ({ at, children }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  let dx = 0, dy = 0;
  for (const s of at) {
    const t = f - s * fps;
    if (t >= 0 && t < 10) {
      const a = (1 - t / 10) * 9;
      dx += Math.sin(t * 2.7) * a;
      dy += Math.cos(t * 3.1) * a * 0.6;
    }
  }
  return <AbsoluteFill style={{ transform: `translate(${dx}px, ${dy}px) scale(1.03)` }}>{children}</AbsoluteFill>;
};

// Closing card: real vs fiction.
export const EndCardDGT: React.FC<{ lines: string[] }> = ({ lines }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#050505", alignItems: "center", justifyContent: "center", opacity: o }}>
      <div style={{ width: 1500, textAlign: "center", fontFamily: titleFont, color: "#ece8df" }}>
        {lines.map((l, i) => (
          <div key={i} style={{ fontSize: i === 0 ? 50 : 40, lineHeight: 1.3, marginBottom: 30, opacity: i === lines.length - 1 ? 0.7 : 1 }}>{l}</div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
