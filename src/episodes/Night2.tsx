import { Audio } from "@remotion/media";
import { staticFile, Track } from "remotion";
import { Scene } from "../story/Scene";
import { ChapterTitle, Darken, EndCard, Flashlight, Heartbeat, Scanlines } from "../story/Overlays";

// Bunker Annie — Night 2: "The Women Behind the Bars".
// Shot timings (in frames at 30 fps) come from the whisperX word timings of the voiceover.
export const Night2 = () => {
  return (
    <>
      <Track name="Scenes">
      <Scene
        name="01 1:10 AM corridor"
        durationInFrames={252}
        image={staticFile("night-2/img/s01.png")}
        zoomFrom={1}
        zoomTo={1.07}
        focusX={0.55}
        focusY={0.5}
        style={{ backgroundColor: "#05070D" }}
      >
        <ChapterTitle name="Chapter title">Night 2</ChapterTitle>
      </Scene>
      <Scene
        name="02 Dead generators" from={252}
        durationInFrames={72}
        image={staticFile("night-2/img/s02.png")}
        zoomFrom={1}
        zoomTo={1.08}
        focusX={0.45}
        focusY={0.5}
        style={{ backgroundColor: "#05070D" }}
      >
        <Darken name="Flicker" color="#0A101A" amount={0.1} flicker />
      </Scene>
      <Scene
        name="03 Something moving" from={324}
        durationInFrames={149}
        image={staticFile("night-2/img/s03.png")}
        zoomFrom={1}
        zoomTo={1.12}
        focusX={0.5}
        focusY={0.75}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="04 Annie with flashlight" from={473}
        durationInFrames={102}
        image={staticFile("night-2/img/s04.png")}
        zoomFrom={1}
        zoomTo={1.07}
        focusX={0.35}
        focusY={0.45}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="05 Annie close-up" from={575}
        durationInFrames={320}
        image={staticFile("night-2/img/s05.png")}
        zoomFrom={1}
        zoomTo={1.08}
        focusX={0.6}
        focusY={0.4}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="06 Frightened voices" from={895}
        durationInFrames={289}
        image={staticFile("night-2/img/s06.png")}
        zoomFrom={1}
        zoomTo={1.07}
        focusX={0.6}
        focusY={0.4}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="07 Annie calms the women" from={1184}
        durationInFrames={487}
        image={staticFile("night-2/img/s07.png")}
        zoomFrom={1}
        zoomTo={1.06}
        focusX={0.3}
        focusY={0.45}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="08 Are we being attacked?" from={1671}
        durationInFrames={127}
        image={staticFile("night-2/img/s08.png")}
        zoomFrom={1}
        zoomTo={1.08}
        focusX={0.5}
        focusY={0.4} shake={10} shakeSeconds={0.6}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="09 Annie hesitates" from={1798}
        durationInFrames={496}
        image={staticFile("night-2/img/s07.png")}
        zoomFrom={1.25}
        zoomTo={1.32}
        focusX={0.12}
        focusY={0.35}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="10 Silence / zombies?" from={2294}
        durationInFrames={248}
        image={staticFile("night-2/img/s10.png")}
        zoomFrom={1}
        zoomTo={1.08}
        focusX={0.25}
        focusY={0.45}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="11 Into the darkness" from={2542}
        durationInFrames={280}
        image={staticFile("night-2/img/s11.png")}
        zoomFrom={1}
        zoomTo={1.08}
        focusX={0.3}
        focusY={0.4}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="12 Faces in the cells" from={2822}
        durationInFrames={408}
        image={staticFile("night-2/img/s12.png")}
        zoomFrom={1}
        zoomTo={1.06}
        focusX={0.5}
        focusY={0.5}
        style={{ backgroundColor: "#05070D" }}
      >
        <Flashlight name="Flashlight" fromX={0.2} fromY={0.55} toX={0.85} toY={0.45} radius={0.75} darkness={0.3} />
      </Scene>
      <Scene
        name="13 Not opening the cells" from={3230}
        durationInFrames={259}
        image={staticFile("night-2/img/s13.png")}
        zoomFrom={1}
        zoomTo={1.07}
        focusX={0.55}
        focusY={0.4}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="14 Denise steps forward" from={3489}
        durationInFrames={215}
        image={staticFile("night-2/img/s14.png")}
        zoomFrom={1}
        zoomTo={1.08}
        focusX={0.3}
        focusY={0.4}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="15 The notebook" from={3704}
        durationInFrames={426}
        image={staticFile("night-2/img/s15.png")}
        zoomFrom={1}
        zoomTo={1.08}
        focusX={0.5}
        focusY={0.4}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="16 Annie and Denise" from={4130}
        durationInFrames={425}
        image={staticFile("night-2/img/s16.png")}
        zoomFrom={1}
        zoomTo={1.06}
        focusX={0.5}
        focusY={0.45}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="17 Food and water" from={4555}
        durationInFrames={356}
        image={staticFile("night-2/img/s17.png")}
        zoomFrom={1}
        zoomTo={1.08}
        focusX={0.4}
        focusY={0.55}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="18 If those things get in" from={4911}
        durationInFrames={131}
        image={staticFile("night-2/img/s18.png")}
        zoomFrom={1}
        zoomTo={1.08}
        focusX={0.5}
        focusY={0.4}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="19 Keep the doors closed" from={5042}
        durationInFrames={315}
        image={staticFile("night-2/img/s19.png")}
        zoomFrom={1}
        zoomTo={1.07}
        focusX={0.45}
        focusY={0.3}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="20 Empty desk" from={5357}
        durationInFrames={200}
        image={staticFile("night-2/img/s20.png")}
        zoomFrom={1}
        zoomTo={1.07}
        focusX={0.25}
        focusY={0.45}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="21 The list" from={5557}
        durationInFrames={447}
        image={staticFile("night-2/img/s21.png")}
        zoomFrom={1}
        zoomTo={1.1}
        focusX={0.3}
        focusY={0.4}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="22 Food storage" from={6004}
        durationInFrames={212}
        image={staticFile("night-2/img/s22.png")}
        zoomFrom={1}
        zoomTo={1.08}
        focusX={0.5}
        focusY={0.5}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="23 Is the world still there?" from={6216}
        durationInFrames={137}
        image={staticFile("night-2/img/s23.png")}
        zoomFrom={1}
        zoomTo={1.07}
        focusX={0.5}
        focusY={0.4}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="24 Annie's house" from={6353}
        durationInFrames={159}
        image={staticFile("night-2/img/s24.png")}
        zoomFrom={1}
        zoomTo={1.07}
        focusX={0.5}
        focusY={0.45}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="25 The cat waits" from={6512}
        durationInFrames={461}
        image={staticFile("night-2/img/s25.png")}
        zoomFrom={1}
        zoomTo={1.1}
        focusX={0.45}
        focusY={0.6}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="26 I can't leave him" from={6973}
        durationInFrames={146}
        image={staticFile("night-2/img/s26.png")}
        zoomFrom={1}
        zoomTo={1.08}
        focusX={0.3}
        focusY={0.35}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="27 Back to the women" from={7119}
        durationInFrames={217}
        image={staticFile("night-2/img/s11.png")}
        zoomFrom={1.1}
        zoomTo={1.16}
        focusX={0.25}
        focusY={0.35}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="28 Listen carefully" from={7336}
        durationInFrames={443}
        image={staticFile("night-2/img/s07.png")}
        zoomFrom={1}
        zoomTo={1.05}
        focusX={0.4}
        focusY={0.45}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="29 Are you leaving us?" from={7779}
        durationInFrames={147}
        image={staticFile("night-2/img/s29.png")}
        zoomFrom={1}
        zoomTo={1.08}
        focusX={0.45}
        focusY={0.45}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="30 No answer" from={7926}
        durationInFrames={781}
        image={staticFile("night-2/img/s30.png")}
        zoomFrom={1}
        zoomTo={1.12}
        focusX={0.4}
        focusY={0.4}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="31 Metallic crash" from={8707}
        durationInFrames={106}
        image={staticFile("night-2/img/s03.png")}
        zoomFrom={1.05}
        zoomTo={1.1}
        focusX={0.5}
        focusY={0.6} shake={24} shakeSeconds={1}
        style={{ backgroundColor: "#05070D" }}
      >
        <Darken name="Flicker" color="#0A101A" amount={0.15} flicker />
      </Scene>
      <Scene
        name="32 Every woman stops" from={8813}
        durationInFrames={117}
        image={staticFile("night-2/img/s10.png")}
        zoomFrom={1.1}
        zoomTo={1.15}
        focusX={0.5}
        focusY={0.45}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="33 Dragging scrape" from={8930}
        durationInFrames={178}
        image={staticFile("night-2/img/s33.png")}
        zoomFrom={1}
        zoomTo={1.15}
        focusX={0.55}
        focusY={0.75}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="34 Away from the bars" from={9108}
        durationInFrames={173}
        image={staticFile("night-2/img/s34.png")}
        zoomFrom={1}
        zoomTo={1.07}
        focusX={0.3}
        focusY={0.5}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="35 Flashlight off" from={9281}
        durationInFrames={301}
        image={staticFile("night-2/img/s34.png")}
        zoomFrom={1.07}
        zoomTo={1.1}
        focusX={0.3}
        focusY={0.5}
        style={{ backgroundColor: "#05070D" }}
      >
        <Darken name="Lights out" color="#02040A" amount={0.88} />
      </Scene>
      <Scene
        name="36 Annie... let me in" from={9582}
        durationInFrames={375}
        image={staticFile("night-2/img/s36.png")}
        zoomFrom={1}
        zoomTo={1.12}
        focusX={0.5}
        focusY={0.3}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="37 Heart pounding" from={9957}
        durationInFrames={132}
        image={staticFile("night-2/img/s37.png")}
        zoomFrom={1}
        zoomTo={1.08}
        focusX={0.3}
        focusY={0.4}
        style={{ backgroundColor: "#05070D" }}
      >
        <Heartbeat name="Heartbeat" beatsPerMinute={110} strength={0.5} />
      </Scene>
      <Scene
        name="38 Flashback: Walt" from={10089}
        durationInFrames={304}
        image={staticFile("scenes/annie-4.jpg")}
        zoomFrom={2.2}
        zoomTo={2.3}
        focusX={0.05}
        focusY={0.2}
        style={{ backgroundColor: "#05070D" }}
      >
        <Darken name="Flashback tint" color="#6B4E2A" amount={0.35} />
        <Scanlines name="Flashback lines" lineSpacing={5} opacity={0.25} rollSpeed={1} />
      </Scene>
      <Scene
        name="39 Beam on the door" from={10393}
        durationInFrames={117}
        image={staticFile("night-2/img/s36.png")}
        zoomFrom={1.1}
        zoomTo={1.16}
        focusX={0.5}
        focusY={0.4}
        style={{ backgroundColor: "#05070D" }}
      >
        <Flashlight name="Flashlight" fromX={0.5} fromY={0.75} toX={0.5} toY={0.38} radius={0.55} darkness={0.45} />
      </Scene>
      <Scene
        name="40 Final sentence" from={10510}
        durationInFrames={272}
        image={staticFile("night-2/img/s40.png")}
        zoomFrom={1}
        zoomTo={1.1}
        focusX={0.45}
        focusY={0.5}
        style={{ backgroundColor: "#05070D" }}
      ></Scene>
      <Scene
        name="41 Once. Twice. Three times." from={10782}
        durationInFrames={206}
        image={staticFile("night-2/img/s36.png")}
        zoomFrom={1.15}
        zoomTo={1.2}
        focusX={0.5}
        focusY={0.4} hitTimes={[2.51, 3.58, 5.0]} hitStrength={26}
        style={{ backgroundColor: "#05070D" }}
      >
        <Darken name="Dark" color="#02040A" amount={0.3} />
      </Scene>
      <EndCard name="To be continued" from={10988} durationInFrames={69}>
        To be continued...
      </EndCard>
      </Track>
      <Track name="Voiceover">
        <Audio name="Voiceover" src={staticFile("night-2/voiceover.mp3")} />
      </Track>
    </>
  );
};
