import { Composition, Folder } from "remotion";
import { MarellaAd } from "./MarellaAd";
import { GrillOpening } from "./scenes/GrillOpening";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MarellaAd"
        component={MarellaAd}
        durationInFrames={75}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="Scenes">
        <Composition
          id="GrillOpening"
          component={GrillOpening}
          durationInFrames={75}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ style: { backgroundColor: "#254746" } }}
        />
      </Folder>
    </>
  );
};
