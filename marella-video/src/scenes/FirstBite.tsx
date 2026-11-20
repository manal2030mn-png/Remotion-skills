import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Interactive,
  Sequence,
  staticFile,
  Track,
} from "remotion";
import { LowerTitle } from "../components/LowerTitle";
import { VideoShot } from "../components/VideoShot";

// Scene 4 (7–9.5 s): the real bite up close (footage), then a wider shot while he chews and savours it.
const FirstBiteInner: React.FC = () => {
  return (
    <>
      <Track name="Shots">
        <Sequence name="Bite close-up" durationInFrames={24}>
          <VideoShot
            src={staticFile("bite.mp4")}
            trimBefore={0}
            length={24}
            zoom={[1.55, 1.42]}
            focus="38% 32%"
            tilt={[-1, 0]}
          />
        </Sequence>
        <Sequence name="Chewing & savouring" from={24} durationInFrames={63}>
          <VideoShot
            src={staticFile("bite.mp4")}
            trimBefore={50}
            playbackRate={1.2}
            length={63}
            zoom={[1.22, 1.06]}
            focus="45% 35%"
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

      <LowerTitle text="طعم يفرق" start={30} fontSize={172} star />

      <Track name="SFX">
        <Audio
          name="Crunch"
          src={staticFile("crunch.mp3")}
          trimBefore={12}
          from={1}
          volume={1}
        />
        <Audio
          name="Bite"
          src={staticFile("bite.mp3")}
          from={3}
          volume={0.55}
        />
        <Audio
          name="Whoosh cut"
          src={staticFile("whoosh.mp3")}
          from={22}
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
