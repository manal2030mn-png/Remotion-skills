import { Composition, Folder } from "remotion";
import { MarellaAd } from "./MarellaAd";
import { BurgerReveal } from "./scenes/BurgerReveal";
import { GrillOpening } from "./scenes/GrillOpening";
import { PresenterReaction } from "./scenes/PresenterReaction";
import { TrayServe } from "./scenes/TrayServe";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MarellaAd"
        component={MarellaAd}
        durationInFrames={220}
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
        <Composition
          id="BurgerReveal"
          component={BurgerReveal}
          durationInFrames={75}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ style: { backgroundColor: "#254746" } }}
        />
        <Composition
          id="TrayServe"
          component={TrayServe}
          durationInFrames={40}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ style: { backgroundColor: "#254746" } }}
        />
        <Composition
          id="PresenterReaction"
          component={PresenterReaction}
          durationInFrames={30}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ style: { backgroundColor: "#254746" } }}
        />
      </Folder>
    </>
  );
};
