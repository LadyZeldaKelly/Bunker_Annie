import { Composition, Folder, Still } from "remotion";
import { Thumbnail } from "./story/Thumbnail";
import { StoryVideo } from "./StoryVideo";
import { AnnieTeaser } from "./AnnieTeaser";
import { Night2 } from "./episodes/Night2";
import { AtmosDemo } from "./dgt/AtmosDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Thumbnails">
        <Still
          id="Night2-Thumb-A"
          component={Thumbnail}
          width={1280}
          height={720}
          defaultProps={{
            image: "night-2/img/thumb-art.png",
            zoom: 1,
            brightness: 1.1,
            focusX: 0.5,
            focusY: 0.5,
            label: "Night",
            number: "2",
            hook: "Let me in...",
            hookColor: "#9BE22E",
            textSide: "left",
            hookAtBottom: true,
          }}
        />
        <Still
          id="Night2-Thumb-B"
          component={Thumbnail}
          width={1280}
          height={720}
          defaultProps={{
            image: "night-2/img/s29.png",
            zoom: 1.05,
            brightness: 1.45,
            focusX: 0.8,
            focusY: 0.5,
            label: "Night",
            number: "2",
            hook: "Don't leave us!",
            hookColor: "#FFB020",
            textSide: "left",
            hookAtBottom: true,
          }}
        />
        <Still
          id="Night2-Thumb-C"
          component={Thumbnail}
          width={1280}
          height={720}
          defaultProps={{
            image: "night-2/img/s36.png",
            zoom: 1.35,
            brightness: 1.6,
            focusX: 0.7,
            focusY: 0.3,
            label: "Night",
            number: "2",
            hook: "Don't open it!",
            hookColor: "#9BE22E",
            textSide: "left",
          }}
        />
      </Folder>
      <Composition
        id="Night2"
        component={Night2}
        durationInFrames={11057}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BunkerAnnieTeaser"
        component={AnnieTeaser}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="StyleTest"
        component={StoryVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
      <Folder name="DGT-Cinematic">
        <Composition id="DGT-AtmosDemo" component={AtmosDemo} durationInFrames={390} fps={30} width={1920} height={1080} />
      </Folder>
    </>
  );
};
