import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Interactive,
  Sequence,
  staticFile,
  Track,
} from "remotion";
import { CutFlash } from "../components/CutFlash";
import { LowerTitle } from "../components/LowerTitle";
import { Shot } from "../components/Shot";
import { Sparks } from "../components/Sparks";

// Scene 2 (2.5–4.5 s): punchy burger detail cuts, then the hero frame with "برجر ماريلا".
const BurgerRevealInner: React.FC = () => {
  return (
    <>
      <Track name="Shots">
        <Sequence name="Cheese drip" durationInFrames={12}>
          <Shot
            src={staticFile("burger.png")}
            length={12}
            zoom={[2.3, 1.85]}
            focus="72% 42%"
            pan={[-30, 30]}
            tilt={[3, 1]}
          />
        </Sequence>
        <Sequence name="Layers" from={12} durationInFrames={12}>
          <Shot
            src={staticFile("burger.png")}
            length={12}
            zoom={[1.6, 1.85]}
            focus="70% 72%"
            pan={[40, -30]}
            tilt={[-2, 0]}
          />
        </Sequence>
        <Sequence name="Hero burger" from={24} durationInFrames={48}>
          <Shot
            src={staticFile("burger.png")}
            length={48}
            zoom={[1.03, 1.16]}
            focus="96% 45%"
            pan={[0, -10]}
            tilt={[1, 0]}
          />
        </Sequence>
      </Track>

      <Sparks seed="s2" count={14} x={[0, 1080]} y={1300} rise={1100} />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <Track name="Cut flashes">
        <Sequence name="Flash 1" from={12} durationInFrames={3}>
          <CutFlash />
        </Sequence>
        <Sequence name="Flash 2" from={24} durationInFrames={3}>
          <CutFlash />
        </Sequence>
      </Track>

      <LowerTitle text="برجر ماريلا" start={28} fontSize={172} />

      <Audio name="Reveal hit" src={staticFile("impact.mp3")} volume={0.9} />
      <Track name="Whooshes">
        <Audio
          name="Whoosh 1"
          src={staticFile("whoosh.mp3")}
          from={10}
          volume={0.45}
        />
        <Audio
          name="Whoosh 2"
          src={staticFile("whoosh.mp3")}
          from={22}
          volume={0.55}
        />
      </Track>
    </>
  );
};

export const BurgerReveal = Interactive.create({
  Component: BurgerRevealInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
  },
});
