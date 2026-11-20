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
import { VideoShot } from "../components/VideoShot";

// Scene 5 (9.5–12 s), all from split.mp4: the whole burger as the knife comes down,
// the cut, then the halves parting to show the juicy patty, cheese and sauce.
const BurgerSplitInner: React.FC = () => {
  return (
    <>
      <Track name="Shots">
        <Sequence name="Whole burger, knife in" durationInFrames={24}>
          <VideoShot
            src={staticFile("split.mp4")}
            trimBefore={20}
            playbackRate={2}
            length={24}
            zoom={[1.0, 1.08]}
            focus="50% 50%"
          />
        </Sequence>
        <Sequence name="The cut" from={24} durationInFrames={20}>
          <VideoShot
            src={staticFile("split.mp4")}
            trimBefore={68}
            playbackRate={1.5}
            length={20}
            zoom={[1.35, 1.45]}
            focus="62% 45%"
            tilt={[1, 0]}
          />
        </Sequence>
        <Sequence name="Halves part" from={44} durationInFrames={43}>
          <VideoShot
            src={staticFile("split.mp4")}
            trimBefore={98}
            playbackRate={1.15}
            length={43}
            zoom={[1.04, 1.16]}
            focus="66% 58%"
            tilt={[-1, 0]}
          />
        </Sequence>
      </Track>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <Track name="Cut flashes">
        <Sequence name="Flash 1" from={24} durationInFrames={3}>
          <CutFlash />
        </Sequence>
        <Sequence name="Flash 2" from={44} durationInFrames={3}>
          <CutFlash />
        </Sequence>
      </Track>

      <LowerTitle
        text="وجهة الذّويق"
        start={48}
        fontSize={160}
        star
        placement="top"
      />

      <Track name="SFX">
        <Audio name="Whoosh in" src={staticFile("whoosh.mp3")} volume={0.5} />
        <Audio
          name="Whoosh cut"
          src={staticFile("whoosh.mp3")}
          from={22}
          volume={0.4}
        />
        <Audio
          name="Slice & separate"
          src={staticFile("slice.mp3")}
          from={25}
          volume={1}
        />
        <Audio
          name="Shimmer"
          src={staticFile("shimmer.mp3")}
          from={48}
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
