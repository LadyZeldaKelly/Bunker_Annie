import { staticFile, Track, useVideoConfig } from "remotion";
import { Scene } from "./story/Scene";
import { ChapterTitle, LightGlow } from "./story/Overlays";

// 10-second Bunker Annie teaser: four 2.5s shots, hard cuts, alarm lights, shake on the scare.
export const AnnieTeaser = () => {
  const { fps } = useVideoConfig();
  return (
    <Track name="Scenes">
      <Scene
        name="Annie bursts out"
        durationInFrames={2.5 * fps}
        image={staticFile("scenes/annie-1.jpg")}
        zoomTo={1.07}
        focusX={0.48}
        focusY={0.45}
        style={{ backgroundColor: "#0D1526" }}
      >
        <LightGlow name="Amber beacon" color="#F5A623" x={0.499} y={0.19} size={0.16} pulsesPerSecond={1.6} minOpacity={0.15} maxOpacity={0.75} />
        <ChapterTitle name="Chapter title">Day 1</ChapterTitle>
      </Scene>
      <Scene
        name="Running the block"
        from={2.5 * fps}
        durationInFrames={2.5 * fps}
        image={staticFile("scenes/annie-2.jpg")}
        zoomTo={1.07}
        focusX={0.65}
        focusY={0.5}
        style={{ backgroundColor: "#0D1526" }}
      >
        <LightGlow name="Amber beacon" color="#F5A623" x={0.35} y={0.213} size={0.16} pulsesPerSecond={1.6} minOpacity={0.15} maxOpacity={0.75} />
      </Scene>
      <Scene
        name="Red alarm scare"
        from={5 * fps}
        durationInFrames={2.5 * fps}
        image={staticFile("scenes/annie-3.jpg")}
        zoomTo={1.09}
        focusX={0.68}
        focusY={0.45}
        shake={14}
        shakeSeconds={0.8}
        style={{ backgroundColor: "#0D1526" }}
      >
        <LightGlow name="Red alarm" color="#E62E2E" x={0.35} y={0.21} size={0.3} pulsesPerSecond={2.5} minOpacity={0.1} maxOpacity={0.8} />
      </Scene>
      <Scene
        name="Smashing the key box"
        from={7.5 * fps}
        durationInFrames={2.5 * fps}
        image={staticFile("scenes/annie-4.jpg")}
        zoomTo={1.08}
        focusX={0.6}
        focusY={0.45}
        shake={8}
        shakeSeconds={0.4}
        style={{ backgroundColor: "#0D1526" }}
      >
        <LightGlow name="Police red" color="#E62E2E" x={0.24} y={0.33} size={0.14} pulsesPerSecond={2} minOpacity={0} maxOpacity={0.7} />
        <LightGlow name="Police blue" color="#2E6BE6" x={0.12} y={0.33} size={0.14} pulsesPerSecond={2} minOpacity={0} maxOpacity={0.7} phase={0.5} />
      </Scene>
    </Track>
  );
};
