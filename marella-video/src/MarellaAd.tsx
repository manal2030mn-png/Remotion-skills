import { Audio } from "@remotion/media";
import { Sequence, staticFile, Track, useVideoConfig } from "remotion";
import { BrandWipe } from "./components/BrandWipe";
import { BurgerReveal } from "./scenes/BurgerReveal";
import { GrillOpening } from "./scenes/GrillOpening";
import { PresenterReaction } from "./scenes/PresenterReaction";
import { TrayServe } from "./scenes/TrayServe";

// Full Marella ad, full-bleed 9:16. Next scenes go on the "Scenes" track after scene 3b.
export const MarellaAd: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <>
      <Track name="Scenes">
        <GrillOpening
          name="Scene 1 – Grill opening"
          durationInFrames={2.5 * fps}
          style={{ backgroundColor: "#254746" }}
        />
        <BurgerReveal
          name="Scene 2 – Burger reveal"
          from={2.5 * fps}
          durationInFrames={2.5 * fps}
          style={{ backgroundColor: "#254746" }}
        />
        <TrayServe
          name="Scene 3a – Tray serve"
          from={5 * fps}
          durationInFrames={40}
          style={{ backgroundColor: "#254746" }}
        />
        <PresenterReaction
          name="Scene 3b – Presenter reaction"
          from={5 * fps + 40}
          durationInFrames={30}
          style={{ backgroundColor: "#254746" }}
        />
      </Track>

      {/* Quick brand wipe (~0.33 s). Scene 3a enters with its own tray drop over teal. */}
      <Track name="Transitions">
        <Sequence
          name="Brand wipe 1→2"
          from={2.5 * fps - 4}
          durationInFrames={10}
        >
          <BrandWipe cover={4} />
        </Sequence>
      </Track>
      <Track name="Transition SFX">
        <Audio
          name="Wipe whoosh 1"
          src={staticFile("whoosh.mp3")}
          from={2.5 * fps - 5}
          volume={0.7}
        />
      </Track>
    </>
  );
};
