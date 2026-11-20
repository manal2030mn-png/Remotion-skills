import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Interactive,
  Sequence,
  staticFile,
  Track,
} from "remotion";
import { CutFlash } from "../components/CutFlash";
import { FireGlow } from "../components/FireGlow";
import { LowerTitle } from "../components/LowerTitle";
import { Shot } from "../components/Shot";
import { Sparks } from "../components/Sparks";

// Scene 1 (0–2.5 s): fast cuts on the grill, then "يبي لها من بدري ✦".
const GrillOpeningInner: React.FC = () => {
  return (
    <>
      <Track name="Shots">
        <Sequence name="Fire burst" durationInFrames={9}>
          <Shot
            src={staticFile("crust.png")}
            length={9}
            zoom={[1.9, 1.55]}
            focus="12% 28%"
            pan={[30, 20]}
            tilt={[-4, -1]}
          />
        </Sequence>
        <Sequence name="Flames on the grate" from={9} durationInFrames={10}>
          <Shot
            src={staticFile("crust.png")}
            length={10}
            zoom={[2.1, 2.4]}
            focus="18% 82%"
            pan={[-60, 0]}
            tilt={[3, 0]}
          />
        </Sequence>
        <Sequence name="Crust macro" from={19} durationInFrames={11}>
          <Shot
            src={staticFile("crust.png")}
            length={11}
            zoom={[1.75, 1.4]}
            focus="62% 45%"
            pan={[0, -50]}
            tilt={[0, 2]}
          />
        </Sequence>
        <Sequence name="Patty pull-out" from={30} durationInFrames={45}>
          <Shot
            src={staticFile("crust.png")}
            length={45}
            zoom={[1.3, 1.04]}
            focus="50% 45%"
            pan={[0, 20]}
            tilt={[-1.5, 0]}
          />
        </Sequence>
      </Track>

      <FireGlow />
      <Sparks seed="s1" count={46} x={[0, 1080]} y={1500} rise={1500} />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <Track name="Cut flashes">
        <Sequence name="Flash 1" from={9} durationInFrames={3}>
          <CutFlash />
        </Sequence>
        <Sequence name="Flash 2" from={19} durationInFrames={3}>
          <CutFlash />
        </Sequence>
        <Sequence name="Flash 3" from={30} durationInFrames={3}>
          <CutFlash />
        </Sequence>
      </Track>

      <LowerTitle text="يبي لها من بدري" start={34} fontSize={132} star />

      <Audio name="Grill sizzle" src={staticFile("sizzle.mp3")} volume={0.9} />
      <Track name="Whooshes">
        <Audio
          name="Whoosh 1"
          src={staticFile("whoosh.mp3")}
          from={7}
          volume={0.45}
        />
        <Audio
          name="Whoosh 2"
          src={staticFile("whoosh.mp3")}
          from={17}
          volume={0.45}
        />
        <Audio
          name="Whoosh 3"
          src={staticFile("whoosh.mp3")}
          from={28}
          volume={0.55}
        />
      </Track>
    </>
  );
};

export const GrillOpening = Interactive.create({
  Component: GrillOpeningInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
  },
});
