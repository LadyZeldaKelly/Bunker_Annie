import { staticFile, Track, useVideoConfig } from "remotion";
import { Scene } from "./story/Scene";
import { ChapterTitle, Darken, LightGlow } from "./story/Overlays";

// Style test: two shots of the same scene to show the zoom, lamp glow, title and a hard cut.
// For a real episode: one <Scene> per shot on the "Scenes" track, plus the narration <Audio>.
export const StoryVideo = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      <Track name="Scenes">
        <Scene
          name="Diner – establishing"
          durationInFrames={6 * fps}
          image={staticFile("scenes/test-1.png")}
          zoomTo={1.08}
          focusX={0.6}
          focusY={0.45}
          style={{ backgroundColor: "#0D1526" }}
        >
          <LightGlow
            name="Door lamp"
            color="#F5A623"
            x={0.835}
            y={0.23}
            size={0.18}
            pulsesPerSecond={0.7}
            minOpacity={0.2}
            maxOpacity={0.6}
          />
          <ChapterTitle name="Chapter title">Day 1</ChapterTitle>
        </Scene>
        <Scene
          name="Diner – lights fail"
          from={6 * fps}
          durationInFrames={4 * fps}
          image={staticFile("scenes/test-4.png")}
          zoomTo={1.1}
          focusX={0.7}
          focusY={0.5}
          style={{ backgroundColor: "#0D1526" }}
        >
          <LightGlow
            name="Door lamp"
            color="#F5A623"
            x={0.86}
            y={0.31}
            size={0.12}
            pulsesPerSecond={4}
            minOpacity={0}
            maxOpacity={0.7}
          />
          <Darken name="Power outage" color="#0A101A" amount={0.55} flicker />
        </Scene>
      </Track>
    </>
  );
};
