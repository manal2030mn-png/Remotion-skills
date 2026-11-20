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

// Scene 4 (7–9.5 s): the real first bite up close, then a calm pull-out while he savours it.
const FirstBiteInner: React.FC = () => {
  return (
    <>
      <Track name="Shots">
        <Sequence name="Bite close-up" durationInFrames={20}>
          <Shot
            src={staticFile("bite.jpg")}
            length={20}
            zoom={[1.75, 1.6]}
            focus="47% 47%"
            pan={[0, 0]}
            tilt={[-1, 0]}
          />
        </Sequence>
        <Sequence name="Savouring" from={20} durationInFrames={55}>
          <Shot
            src={staticFile("bite.jpg")}
            length={55}
            zoom={[1.32, 1.1]}
            focus="50% 45%"
            pan={[0, -10]}
            tilt={[0.8, 0]}
          />
        </Sequence>
      </Track>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 50% 45%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      <Track name="Cut flashes">
        <Sequence name="Flash" from={20} durationInFrames={3}>
          <CutFlash />
        </Sequence>
      </Track>

      <LowerTitle text="طعم يفرق" start={30} fontSize={150} star />

      <Track name="SFX">
        <Audio name="Whoosh in" src={staticFile("whoosh.mp3")} volume={0.5} />
        <Audio name="Bite" src={staticFile("bite.mp3")} from={2} volume={1} />
        <Audio
          name="Whoosh cut"
          src={staticFile("whoosh.mp3")}
          from={18}
          volume={0.4}
        />
        <Audio
          name="Satisfaction shimmer"
          src={staticFile("shimmer.mp3")}
          from={28}
          volume={0.7}
        />
      </Track>
    </>
  );
};

export const FirstBite = Interactive.create({
  Component: FirstBiteInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
  },
});
