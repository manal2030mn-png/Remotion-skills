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
import { SplitShot } from "../components/SplitShot";
import { VideoShot } from "../components/VideoShot";

// Scene 5 (9.5–12 s): an ivory knife line splits the burger and the halves part,
// then a slow-motion close-up of the real inside (patty, creamy sauce, lettuce) from the bite footage.
const BurgerSplitInner: React.FC = () => {
  return (
    <>
      <Track name="Shots">
        <Sequence name="Knife split" durationInFrames={34}>
          <SplitShot
            src={staticFile("burger.png")}
            zoom={1.35}
            focus="82% 52%"
            cutAt={8}
            gap={90}
          />
        </Sequence>
        <Sequence
          name="Inside layers (slow-mo)"
          from={34}
          durationInFrames={41}
        >
          <VideoShot
            src={staticFile("bite.mp4")}
            trimBefore={16}
            playbackRate={0.6}
            length={41}
            zoom={[2.0, 1.8]}
            focus="27% 43%"
            tilt={[1, 0]}
          />
        </Sequence>
      </Track>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 50% 45%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      <Track name="Cut flashes">
        <Sequence name="Flash" from={34} durationInFrames={3}>
          <CutFlash />
        </Sequence>
      </Track>

      <LowerTitle text="وجهة الذّويق" start={38} fontSize={140} star />

      <Track name="SFX">
        <Audio name="Whoosh in" src={staticFile("whoosh.mp3")} volume={0.5} />
        <Audio
          name="Slice & separate"
          src={staticFile("slice.mp3")}
          from={3}
          volume={1}
        />
        <Audio
          name="Whoosh cut"
          src={staticFile("whoosh.mp3")}
          from={32}
          volume={0.45}
        />
        <Audio
          name="Shimmer"
          src={staticFile("shimmer.mp3")}
          from={38}
          volume={0.5}
        />
      </Track>
    </>
  );
};

export const BurgerSplit = Interactive.create({
  Component: BurgerSplitInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
  },
});
