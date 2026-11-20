import { Audio } from "@remotion/media";
import { Sequence, staticFile, Track, useVideoConfig } from "remotion";
import { BrandWipe } from "./components/BrandWipe";
import { BurgerReveal } from "./scenes/BurgerReveal";
import { BurgerSplit } from "./scenes/BurgerSplit";
import { ColdDrink } from "./scenes/ColdDrink";
import { Finale } from "./scenes/Finale";
import { FirstBite } from "./scenes/FirstBite";
import { GrillOpening } from "./scenes/GrillOpening";
import { TrayReaction } from "./scenes/TrayReaction";

// Full Marella ad, full-bleed 9:16. Next scenes go on the "Scenes" track — the ad ends with scene 7 at 15 s.
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
          durationInFrames={2 * fps}
          style={{ backgroundColor: "#254746" }}
        />
        <TrayReaction
          name="Scene 3 – Tray & reaction"
          from={4.5 * fps}
          durationInFrames={2.5 * fps}
          style={{ backgroundColor: "#254746" }}
        />
        <FirstBite
          name="Scene 4 – First bite"
          from={7 * fps}
          durationInFrames={2.5 * fps}
          style={{ backgroundColor: "#254746" }}
        />
        <BurgerSplit
          name="Scene 5 – Burger split"
          from={9.5 * fps}
          durationInFrames={2.5 * fps}
          style={{ backgroundColor: "#254746" }}
        />
        <ColdDrink
          name="Scene 6 – Cold drink"
          from={12 * fps}
          durationInFrames={1.5 * fps}
          style={{ backgroundColor: "#254746" }}
        />
        <Finale
          name="Scene 7 – Finale"
          from={13.5 * fps}
          durationInFrames={1.5 * fps}
          style={{ backgroundColor: "#254746" }}
        />
      </Track>

      {/* Quick brand wipes (~0.33 s). Scene 3 enters with its own tray drop over teal. */}
      <Track name="Transitions">
        <Sequence
          name="Brand wipe 1→2"
          from={2.5 * fps - 4}
          durationInFrames={10}
        >
          <BrandWipe cover={4} />
        </Sequence>
        <Sequence
          name="Brand wipe 3→4"
          from={7 * fps - 4}
          durationInFrames={10}
        >
          <BrandWipe cover={4} />
        </Sequence>
        <Sequence
          name="Brand wipe 6→7"
          from={13.5 * fps - 4}
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
        <Audio
          name="Wipe whoosh 2"
          src={staticFile("whoosh.mp3")}
          from={7 * fps - 5}
          volume={0.7}
        />
        <Audio
          name="Wipe whoosh 3"
          src={staticFile("whoosh.mp3")}
          from={13.5 * fps - 5}
          volume={0.6}
        />
      </Track>
    </>
  );
};
