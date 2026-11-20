import { Composition, Folder } from "remotion";
import { MarellaAd } from "./MarellaAd";
import { BurgerReveal } from "./scenes/BurgerReveal";
import { BurgerSplit } from "./scenes/BurgerSplit";
import { FirstBite } from "./scenes/FirstBite";
import { GrillOpening } from "./scenes/GrillOpening";
import { TrayReaction } from "./scenes/TrayReaction";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MarellaAd"
        component={MarellaAd}
        durationInFrames={360}
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
          durationInFrames={60}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ style: { backgroundColor: "#254746" } }}
        />
        <Composition
          id="TrayReaction"
          component={TrayReaction}
          durationInFrames={75}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ style: { backgroundColor: "#254746" } }}
        />
        <Composition
          id="FirstBite"
          component={FirstBite}
          durationInFrames={75}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ style: { backgroundColor: "#254746" } }}
        />
        <Composition
          id="BurgerSplit"
          component={BurgerSplit}
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
