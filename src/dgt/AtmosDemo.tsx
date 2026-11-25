import { AbsoluteFill, Sequence } from "remotion";
import { CinematicStill, FilmFinish, Fog, PointLights, Rain, Searchlight, Silhouettes } from "./Atmos";

// Free (code-only) demo of environmental animation on the approved gate still.
const IMG = "conplan-8888/img/test-frame1-gate-night.png";

const tailLights = [0.47, 0.56, 0.63, 0.71, 0.8, 0.88].map((x, i) => ({
  x, y: 0.5 + (i % 3) * 0.05, r: 0.01, color: "rgba(255,40,30,0.9)", mode: "flicker" as const, seed: `t${i}`,
}));

export const AtmosDemo: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    {/* Part 1 (0-8 s): night fog, sweeping searchlight, flickering tail lights, distant shuffling figures */}
    <Sequence durationInFrames={240}>
      <CinematicStill src={IMG} zoomFrom={1.0} zoomTo={1.07} driftX={-1.2} focusX={0.62} focusY={0.45} />
      <Silhouettes count={7} y={0.47} scale={0.9} speed={0.35} blur={1.4} />
      <PointLights lights={tailLights} />
      <Fog opacity={0.32} speed={1.4} top={0.3} bottom={0.75} />
      <Searchlight x={0.72} y={0.15} from={115} to={170} periodSec={7} strength={0.38} />
      <FilmFinish />
    </Sequence>
    {/* Part 2 (8-13 s): same location in rain with flashing emergency lights at the gate */}
    <Sequence from={240} durationInFrames={150}>
      <CinematicStill src={IMG} zoomFrom={1.08} zoomTo={1.12} focusX={0.7} focusY={0.35} />
      <PointLights lights={[
        { x: 0.6, y: 0.33, r: 0.05, color: "rgba(230,40,40,0.7)", mode: "strobe", rate: 1.6, seed: "e1" },
        { x: 0.66, y: 0.33, r: 0.05, color: "rgba(50,100,255,0.7)", mode: "strobe", rate: 1.6, seed: "e2x" },
      ]} />
      <Fog color="170,180,200" opacity={0.25} speed={2} top={0.4} bottom={0.9} seed="fog2" />
      <Rain count={300} angle={10} opacity={0.4} />
      <FilmFinish />
    </Sequence>
  </AbsoluteFill>
);
