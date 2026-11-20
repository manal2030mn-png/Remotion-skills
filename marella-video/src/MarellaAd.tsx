import { Audio } from "@remotion/media";
import {
  interpolate,
  Sequence,
  staticFile,
  Track,
  useVideoConfig,
} from "remotion";
import { ColorGrade } from "./components/ColorGrade";
import { CrossDissolve } from "./components/CrossDissolve";
import { BurgerReveal } from "./scenes/BurgerReveal";
import { BurgerSplit } from "./scenes/BurgerSplit";
import { Finale } from "./scenes/Finale";
import { FirstBite } from "./scenes/FirstBite";
import { GrillOpening } from "./scenes/GrillOpening";
import { TrayReaction } from "./scenes/TrayReaction";

// Full Marella ad, 14 s, full-bleed 9:16.
// Scenes alternate between two tracks so each one can dissolve in over the previous scene
// (DISSOLVE frames of overlap) while the camera keeps moving underneath.
const DISSOLVE = 12;

export const MarellaAd: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <>
      <Track name="Scenes A">
        <GrillOpening
          name="Scene 1 – Grill opening"
          durationInFrames={2.5 * fps}
          style={{ backgroundColor: "#254746" }}
        />
        <Sequence
          name="Scene 3 – Tray & reaction"
          from={4.5 * fps - DISSOLVE}
          durationInFrames={2.5 * fps + DISSOLVE}
        >
          <CrossDissolve frames={DISSOLVE}>
            <TrayReaction style={{ backgroundColor: "#254746" }} />
          </CrossDissolve>
        </Sequence>
        <Sequence
          name="Scene 5 – Burger split"
          from={9.5 * fps - DISSOLVE}
          durationInFrames={2.5 * fps + DISSOLVE}
        >
          <CrossDissolve frames={DISSOLVE}>
            <BurgerSplit style={{ backgroundColor: "#254746" }} />
          </CrossDissolve>
        </Sequence>
      </Track>

      <Track name="Scenes B">
        <Sequence
          name="Scene 2 – Burger reveal"
          from={2.5 * fps - DISSOLVE}
          durationInFrames={2 * fps + DISSOLVE}
        >
          <CrossDissolve frames={DISSOLVE}>
            <BurgerReveal style={{ backgroundColor: "#254746" }} />
          </CrossDissolve>
        </Sequence>
        <Sequence
          name="Scene 4 – First bite"
          from={7 * fps - DISSOLVE}
          durationInFrames={2.5 * fps + DISSOLVE}
        >
          <CrossDissolve frames={DISSOLVE}>
            <FirstBite style={{ backgroundColor: "#254746" }} />
          </CrossDissolve>
        </Sequence>
        <Sequence
          name="Finale"
          from={12 * fps - DISSOLVE}
          durationInFrames={2 * fps + DISSOLVE}
        >
          <CrossDissolve frames={DISSOLVE + 4}>
            <Finale style={{ backgroundColor: "#254746" }} />
          </CrossDissolve>
        </Sequence>
      </Track>

      {/* One unified grade over scenes 1–5; it fades away as the brand card dissolves in. */}
      <Sequence name="Color grade" durationInFrames={12 * fps + 2}>
        <ColorGrade fadeOut={DISSOLVE + 2} />
      </Sequence>

      <Track name="Transition SFX">
        <Audio
          name="Soft whoosh 1→2"
          src={staticFile("whoosh.mp3")}
          from={2.5 * fps - DISSOLVE}
          volume={0.35}
        />
        <Audio
          name="Soft whoosh 4→5"
          src={staticFile("whoosh.mp3")}
          from={9.5 * fps - DISSOLVE}
          volume={0.3}
        />
      </Track>
      <Audio
        name="Fire ignition"
        src={staticFile("fire-ignite.mp3")}
        volume={0.9}
      />
      <Audio
        name="Background music"
        src={staticFile("music.mp3")}
        volume={(f) =>
          interpolate(
            f,
            [0, 6, durationInFrames - 12, durationInFrames],
            [0, 0.5, 0.5, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )
        }
      />
    </>
  );
};
