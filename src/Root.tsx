import { Composition } from "remotion";
import { StoryVideo } from "./StoryVideo";
import { AnnieTeaser } from "./AnnieTeaser";
import { Night2 } from "./episodes/Night2";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
    </>
  );
};
