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
import { CheeseMoment } from "./scenes/CheeseMoment";
import { Finale } from "./scenes/Finale";
import { FirstBite } from "./scenes/FirstBite";
import { GrillOpening } from "./scenes/GrillOpening";
import { TrayReaction } from "./scenes/TrayReaction";

// Full Marella ad, 15.2 s, full-bleed 9:16.
// Soft dissolves into scenes 2 and 3; clean cuts around the eating (3→4→5);
// then the hero beat: cheese melt in slow-mo, music drops out, a clear crunch, then the logo.
const DISSOLVE = 12;
const CHEESE = 36; // hero beat length in frames

export const MarellaAd: React.FC = () => {
  const { fps } = useVideoConfig();
  const cheeseFrom = 12 * fps;
  const finaleFrom = cheeseFrom + CHEESE;

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
        <BurgerSplit
          name="Scene 5 – Burger split"
          from={9.5 * fps}
          durationInFrames={2.5 * fps}
          style={{ backgroundColor: "#254746" }}
        />
        <Finale
          name="Finale – logo"
          from={finaleFrom}
          durationInFrames={2 * fps}
          style={{ backgroundColor: "#254746" }}
        />
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
        <FirstBite
          name="Scene 4 – First bite"
          from={7 * fps}
          durationInFrames={2.5 * fps}
          style={{ backgroundColor: "#254746" }}
        />
        <CheeseMoment
          name="Hero beat – cheese melt"
          from={cheeseFrom}
          durationInFrames={CHEESE}
          style={{ backgroundColor: "#000000" }}
        />
      </Track>

      {/* One unified grade over everything before the logo. */}
      <Sequence name="Color grade" durationInFrames={finaleFrom}>
        <ColorGrade fadeOut={1} />
      </Sequence>

      <Track name="Transition SFX">
        <Audio
          name="Soft whoosh 1→2"
          src={staticFile("whoosh.mp3")}
          from={2.5 * fps - DISSOLVE}
          volume={0.35}
        />
        <Audio
          name="Soft whoosh 2→3"
          src={staticFile("whoosh.mp3")}
          from={4.5 * fps - DISSOLVE}
          volume={0.3}
        />
      </Track>
      <Audio
        name="Fire ignition"
        src={staticFile("fire-ignite.mp3")}
        volume={0.9}
      />

      {/* Music builds through the ad, cuts out for the cheese beat... */}
      <Audio
        name="Music – build"
        src={staticFile("music.mp3")}
        durationInFrames={cheeseFrom + 4}
        volume={(f) =>
          interpolate(
            f,
            [0, 6, cheeseFrom - 3, cheeseFrom + 3],
            [0, 0.5, 0.5, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )
        }
      />
      {/* ...and returns with its warm resolve as the logo appears. */}
      <Audio
        name="Music – resolve"
        src={staticFile("music.mp3")}
        from={finaleFrom}
        trimBefore={12 * fps}
        volume={(f) =>
          interpolate(f, [0, 3, 2 * fps - 12, 2 * fps], [0, 0.55, 0.55, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
    </>
  );
};
