import { Audio } from "@remotion/media";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile, useVideoConfig } from "remotion";
import { CinematicStill, FilmFinish, Fog, PointLights, Rain, Searchlight } from "../dgt/Atmos";
import { DayTitle, EndCardDGT, Jolt, LightPulse, RealFile } from "../dgt/Story";
import shotData from "./conplan8888-shots.json";

// Don't Go There! — "The Military Locked the Gates for 40 Days. You're Outside the Fence."
// Cinematic format: photoreal stills with code atmosphere + Runway clips + REAL FILE inserts.
// Shot timings come from the voiceover word timings (episodes/conplan-8888/resolve_shots.py → shots.json).
// Sound is one premixed track (episodes/conplan-8888/mix.py → public/conplan-8888/soundtrack.mp3).

const IMG = (k: string) => `conplan-8888/img/${k}.png`;
const VID = (k: string) => `conplan-8888/video/${k}.mp4`;

type Fx =
  | "baseNight" | "gate" | "tail" | "rainLight" | "rain" | "plains" | "baseGlow" | "dawn" | "noon" | "night"
  | "flicker" | "redPulse" | "window3" | "signal" | "flashBeam" | "radio" | "taillightsAway" | "dim" | "dust";

type Shot = {
  img2?: string; zoom2?: [number, number]; focus2?: [number, number]; split?: number;
  img?: string; video?: string; clipSec?: number; after?: string;
  zoom?: [number, number]; focus?: [number, number]; drift?: [number, number];
  fx?: Fx[]; real?: { page: string; text: string; hl?: string }; day?: string; dayAt?: number;
  black?: boolean; endCard?: boolean; jolt?: number[];
};

// Real CONPLAN 8888-11 text only (verified against research/conplan-8888-11-text.md).
const S: Record<string, Shot> = {
  s01: { black: true, fx: ["radio"] },
  s02: { video: "V2-dashboard", after: "c02_dashboard", day: "DAY 0 · 2:06 A.M." },
  s03: { img: "c03_mirror", focus: [0.5, 0.4], fx: ["tail"] },
  s04: { img: "c04_medwing", fx: ["flicker"] },
  s05: { img: "c05_doors", fx: ["redPulse"] },
  s07: { img: "c07_hilltop", zoom: [1.0, 1.08], focus: [0.6, 0.4], fx: ["baseNight", "tail"] },
  s08: { video: "test-runway-gate-5s", after: "test-frame1-gate-night", fx: ["gate"] },
  s09: { img: "c09_gate", focus: [0.6, 0.35], fx: ["gate"] },
  s11: { real: { page: "1", text: "DISCLAIMER: This fictitious plan was created by junior military officers undergoing training…", hl: "junior military officers undergoing training" } },
  s12: { real: { page: "9", text: "Lock down all USSTRATCOM operating locations for 30 days", hl: "for 30 days" } },
  s13: { real: { page: "12", text: "…shelter all mission essential personnel in place for at least 40 days.", hl: "for at least 40 days" } },
  s14: { img: "c14_window", focus: [0.55, 0.45], fx: ["baseNight"] },
  s15: { img: "test-frame1-gate-night", zoom: [1.1, 1.14], focus: [0.6, 0.45], fx: ["gate"] },
  s16: { img: "c16_fencehands", fx: ["baseNight"] },
  s17: { img: "c17_horns", fx: ["tail", "baseNight"] },
  s18: { real: { page: "25", text: "Zombies cannot drive, climb or swim… Zombies will utilize surface roads…", hl: "cannot drive, climb or swim" } },
  s19: { video: "V3-onramp", after: "c19_onramp" },
  s20: { img: "c20_edge", fx: ["plains", "baseGlow"] },
  s21: { img: "c21_elevator", zoom: [1.0, 1.1], focus: [0.42, 0.5], fx: ["plains", "baseGlow"] },
  s22: { video: "V4-eli-cars", after: "c22_eli_cars", fx: ["tail"] },
  s23: { img: "c23_eli_close", zoom: [1.02, 1.08], focus: [0.38, 0.35], fx: ["tail", "rainLight"] },
  s24: { img: "c24_hands", fx: ["rainLight"] },
  s25: { img: "c25_two_walk", fx: ["plains", "baseGlow"] },
  s26: { img: "c26_ladder_weeds", fx: ["night"] },
  s27: { video: "V5-climb", after: "c27_climb" },
  s28: { img: "c28_drop", zoom: [1.0, 1.1], fx: ["night"] },
  s29: { img: "c29_inventory", fx: ["dust"], day: "DAY 1" },
  s30: { img: "c30_dawn_base", fx: ["dawn"] },
  s31: { img: "c31_field", fx: ["dawn"] },
  s32: { img: "c32_bottle", focus: [0.35, 0.35], fx: ["dust"] },
  s33: { real: { page: "8", text: "Rain will be vitally important to human survival… Ground water from streams and rivers will be unreliable…", hl: "Rain will be vitally important" } },
  s34: { img: "c34_rain", fx: ["rain"], day: "DAY 3" },
  s35: { img: "c35_jacket", zoom: [1.12, 1.18], focus: [0.72, 0.5], fx: ["rain", "plains"] },
  s36: { img: "c36_farmhouse", fx: ["noon"], day: "DAY 6" },
  s37: { real: { page: "8", text: "PZ activity is not expected to be as high during bright sunny conditions…", hl: "bright sunny conditions" } },
  s38: { img: "c38_climbdown", fx: ["noon"] },
  s39: { img: "c39_eli_guard", focus: [0.45, 0.4], fx: ["noon"] },
  s40: { img: "c40_haul", fx: ["dust"] },
  s41: { video: "V6-tower-figure", after: "c-tower-corrected", fx: ["noon"] },
  s42: { img: "c42_eli_ladder", focus: [0.4, 0.35], fx: ["noon"] },
  s43: { img: "c43_bleach", fx: ["night"] },
  s44: { video: "V7-pickup", after: "c44_pickup", day: "NIGHT 12" },
  s45: { img: "c45_haul_up", fx: ["night"] },
  s46: { img: "c46_flashlight", fx: ["flashBeam"] },
  s47: { img: "c47_taillights", fx: ["taillightsAway"] },
  s48: { img: "c48_signal", fx: ["signal", "baseNight"] },
  s49: { img: "c49_window_flash", zoom: [1.0, 1.12], focus: [0.6, 0.34], fx: ["window3"], day: "NIGHT 18" },
  s50: { img: "c50_eli_sleep", fx: ["night"] },
  s51: { img: "c51_empty", fx: ["noon"], day: "DAY 24" },
  s52: { real: { page: "26", text: "Zombies will likely be drawn to potable water sources…", hl: "drawn to potable water sources" } },
  s53: { img: "c53_creek", zoom: [1.0, 1.1], fx: ["noon"] },
  s54: { video: "V8-creek", after: "c54_creek_slip" },
  s55: { img: "c55_run", fx: ["noon"] },
  s56: { img: "c56_scratch", focus: [0.5, 0.65], fx: ["dust"] },
  s57: { img: "c57_filter", fx: ["night"] },
  s58: { real: { page: "15", text: "The human instinct for self preservation can cause newly infected zombie hosts to deny their imminent zombification…", hl: "deny their imminent zombification" } },
  s59: { img: "c59_fever", fx: ["dust"], day: "DAY 27" },
  // c60_shoulder dropped (anatomy error: body faces away, face toward camera). Two clean angles instead.
  s60: { img: "c59_fever", zoom: [1.18, 1.24], focus: [0.42, 0.3], img2: "c50_eli_sleep", zoom2: [1.3, 1.36], focus2: [0.62, 0.45], split: 0.4, fx: ["night"] },
  s61: { real: { page: "30", text: "…zombie outbreaks in human hosts cannot possibly last longer than 40 days…", hl: "cannot possibly last longer than 40 days" } },
  s62: { img: "c62_tally", zoom: [1.0, 1.1], fx: ["rainLight"], day: "DAY 31" },
  s63: { real: { page: "30", text: "All IHHs who fall behind must be left behind.", hl: "must be left behind" } },
  s64: { img: "c64_tower_night", zoom: [1.0, 1.1], fx: ["plains", "baseGlow"] },
  s65: { img: "c65_forehead", fx: ["dawn", "dim"], day: "DAY 40" },
  s66: { real: { page: "12", text: "All reports… will be broadcast in clear text using unsecured comms so that if any isolated survivors intercept those comms, link-up… will be facilitated.", hl: "broadcast in clear text" } },
  s67: { img: "c67_radio", focus: [0.4, 0.55], fx: ["radio", "dawn"] },
  s69: { video: "V9-eli-whisper", after: "c69_eli_whisper", fx: ["dawn"] },
  s70: { img: "c70_thumb", focus: [0.35, 0.55], fx: ["dawn"] },
  s71: { video: "V10-ladder-foot", after: "c71_ladder_foot", jolt: [1.2, 4.6] },
  s72: { black: true },
  s73: { img: "c64_tower_night", zoom: [1.08, 1.0], fx: ["plains", "baseGlow"] },
  s74: { endCard: true },
};

const tail = [0.3, 0.42, 0.55, 0.67, 0.8].map((x, i) => ({ x, y: 0.58 + (i % 2) * 0.05, r: 0.012, color: "rgba(255,40,30,0.85)", mode: "flicker" as const, seed: `tl${i}` }));

const FxLayer: React.FC<{ fx: Fx }> = ({ fx }) => {
  switch (fx) {
    case "baseNight": return <><Fog opacity={0.22} speed={1.1} top={0.25} bottom={0.7} /><Searchlight x={0.75} y={0.12} from={110} to={160} periodSec={9} strength={0.22} /></>;
    case "gate": return <><Fog opacity={0.28} speed={1.3} top={0.3} bottom={0.8} /><Searchlight x={0.72} y={0.14} from={115} to={170} periodSec={7} strength={0.3} /></>;
    case "tail": return <PointLights lights={tail} />;
    case "rainLight": return <Rain count={140} angle={8} opacity={0.25} />;
    case "rain": return <><Rain count={320} angle={12} opacity={0.42} /><Fog color="170,180,200" opacity={0.18} speed={2} top={0.3} bottom={1} seed="rf" /></>;
    case "plains": return <Fog color="120,140,170" opacity={0.14} speed={0.7} top={0.45} bottom={0.95} seed="pl" />;
    case "baseGlow": return <PointLights lights={[{ x: 0.85, y: 0.55, r: 0.18, color: "rgba(255,140,40,0.25)", mode: "pulse", rate: 0.15, seed: "bg" }]} />;
    case "dawn": return <Fog color="220,170,160" opacity={0.12} speed={0.6} top={0.3} bottom={0.8} seed="dw" />;
    case "noon": return <Fog color="255,240,200" opacity={0.1} speed={0.5} top={0.35} bottom={0.75} seed="nn" />;
    case "night": return <Fog color="110,130,160" opacity={0.14} speed={0.8} top={0.3} bottom={1} seed="nt" />;
    case "dust": return <Fog color="255,220,170" opacity={0.08} speed={0.4} top={0.1} bottom={0.9} seed="ds" />;
    case "flicker": return <LightPulse mode="flicker" />;
    case "redPulse": return <LightPulse mode="red" />;
    case "dim": return <LightPulse mode="dim" />;
    case "window3": return <PointLights lights={[{ x: 0.6, y: 0.34, r: 0.05, color: "rgba(255,235,190,0.95)", mode: "strobe", rate: 0.9, seed: "w3" }]} />;
    case "signal": return <PointLights lights={[{ x: 0.41, y: 0.22, r: 0.06, color: "rgba(240,245,255,0.95)", mode: "strobe", rate: 1.2, seed: "sg" }]} />;
    case "flashBeam": return <><Searchlight x={0.73} y={0.54} from={175} to={215} periodSec={4} length={0.6} color="255,235,200" strength={0.35} /><Fog color="110,130,160" opacity={0.12} seed="fb" /></>;
    case "radio": return <PointLights lights={[{ x: 0.4, y: 0.54, r: 0.06, color: "rgba(255,170,60,0.7)", mode: "pulse", rate: 0.4, seed: "rd" }]} />;
    case "taillightsAway": return <PointLights lights={[{ x: 0.81, y: 0.42, r: 0.03, color: "rgba(255,40,30,0.9)", mode: "flicker", seed: "ta" }]} />;
  }
};

const ShotView: React.FC<{ id: string; dur: number }> = ({ id, dur }) => {
  const { fps } = useVideoConfig();
  const s = S[id];
  if (!s) throw new Error(`no config for ${id}`);
  if (s.endCard) {
    return <EndCardDGT lines={[
      "CONPLAN 8888-11 “Counter-Zombie Dominance” (2011) is a real U.S. Strategic Command training exercise. Lines marked REAL FILE are quoted or closely paraphrased from it.",
      "Calder Air Station, Jo, Eli and every event in this story are fiction. Water-safety steps follow EPA and Ready.gov guidance.",
      "Sources in the description.",
    ]} />;
  }
  if (s.real) return <><RealFile page={s.real.page} text={s.real.text} highlight={s.real.hl} /><FilmFinish grain={0.1} letterbox={false} /></>;

  const fx = (s.fx ?? []).map((f, i) => <FxLayer key={i} fx={f} />);
  let body: React.ReactNode;
  if (s.black) {
    body = <AbsoluteFill style={{ background: "#000" }}>{fx}</AbsoluteFill>;
  } else if (s.video) {
    const clipF = Math.round((s.video === "V7-pickup" ? 10.08 : 5.04) * fps);
    const rate = Math.max(0.6, Math.min(1, clipF / dur));
    const playF = Math.min(dur, Math.floor(clipF / rate));
    body = (
      <>
        <Sequence durationInFrames={playF}>
          <AbsoluteFill style={{ background: "#000" }}>
            <OffthreadVideo src={staticFile(VID(s.video))} muted playbackRate={rate} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </AbsoluteFill>
        </Sequence>
        {dur > playF && s.after ? (
          <Sequence from={playF} durationInFrames={dur - playF}>
            <CinematicStill src={IMG(s.after)} zoomFrom={1.04} zoomTo={1.1} />
          </Sequence>
        ) : null}
        {fx}
      </>
    );
    if (s.jolt) body = <Jolt at={s.jolt}>{body}</Jolt>;
  } else {
    const [z0, z1] = s.zoom ?? [1.0, 1.06];
    const [fx0, fy0] = s.focus ?? [0.5, 0.5];
    const long = dur > 13 * fps;
    const cut = Math.round(dur * 0.55);
    body = s.img2 ? (
      <>
        <Sequence durationInFrames={Math.round(dur * (s.split ?? 0.5))}><CinematicStill src={IMG(s.img!)} zoomFrom={z0} zoomTo={z1} focusX={fx0} focusY={fy0} />{fx}</Sequence>
        <Sequence from={Math.round(dur * (s.split ?? 0.5))}><CinematicStill src={IMG(s.img2)} zoomFrom={(s.zoom2 ?? [1.1, 1.16])[0]} zoomTo={(s.zoom2 ?? [1.1, 1.16])[1]} focusX={(s.focus2 ?? [0.5, 0.5])[0]} focusY={(s.focus2 ?? [0.5, 0.5])[1]} />{fx}</Sequence>
      </>
    ) : long ? (
      <>
        <Sequence durationInFrames={cut}><CinematicStill src={IMG(s.img!)} zoomFrom={z0} zoomTo={z1} focusX={fx0} focusY={fy0} />{fx}</Sequence>
        <Sequence from={cut} durationInFrames={dur - cut}><CinematicStill src={IMG(s.img!)} zoomFrom={1.22} zoomTo={1.28} focusX={fx0} focusY={fy0} driftX={-0.6} />{fx}</Sequence>
      </>
    ) : (
      <><CinematicStill src={IMG(s.img!)} zoomFrom={z0} zoomTo={z1} focusX={fx0} focusY={fy0} />{fx}</>
    );
  }
  return (
    <AbsoluteFill>
      {body}
      <FilmFinish />
      {s.day ? <DayTitle>{s.day}</DayTitle> : null}
    </AbsoluteFill>
  );
};

export const CONPLAN_FRAMES = shotData.total_frames;

export const Conplan8888: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    {shotData.shots.map((sh) => (
      <Sequence key={sh.id} name={`${sh.id} ${sh.key ?? ""}`} from={sh.from} durationInFrames={sh.dur} premountFor={30}>
        <ShotView id={sh.id} dur={sh.dur} />
      </Sequence>
    ))}
    {/* extra day marker inside the Day 31 shot */}
    <Sequence from={Math.round(446.6 * 30)} durationInFrames={110}><DayTitle>DAY 35</DayTitle></Sequence>
    <Audio src={staticFile("conplan-8888/soundtrack.mp3")} />
  </AbsoluteFill>
);
