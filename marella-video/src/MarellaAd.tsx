import { Audio } from "@remotion/media";
import { Sequence, staticFile, Track, useVideoConfig } from "remotion";
import { BrandWipe } from "./components/BrandWipe";
import { BurgerReveal } from "./scenes/BurgerReveal";
import { GrillOpening } from "./scenes/GrillOpening";

// Full Marella ad, full-bleed 9:16. Next scenes go on the "Scenes" track after scene 2.
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
      </Track>

      <Sequence name="Brand wipe 1→2" from={2.5 * fps - 7} durationInFrames={16}>
        <BrandWipe cover={7} />
      </Sequence>
      <Audio name="Wipe whoosh" src={staticFile("whoosh.mp3")} from={2.5 * fps - 7} volume={0.7} />
    </>
  );
};
