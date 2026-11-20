import { Audio } from "@remotion/media";
import { Interactive, Sequence, staticFile, Track } from "remotion";
import { CutFlash } from "../components/CutFlash";
import { Shot } from "../components/Shot";
import { Sparks } from "../components/Sparks";

// Scene 3b (6:20–7:20): the presenter looks at the burger, camera pulses in on the rising beat.
// Zoom pulses are synced to the beats in pulse.mp3 (frames 0, 8, 19, 26).
const PresenterReactionInner: React.FC = () => {
  return (
    <>
      <Track name="Shots">
        <Sequence name="Presenter medium" durationInFrames={12}>
          <Shot
            src={staticFile("presenter.jpg")}
            length={12}
            zoom={[1.0, 1.08]}
            focus="50% 34%"
            pan={[0, 0]}
            beats={[0, 8]}
          />
        </Sequence>
        <Sequence name="Presenter close-up" from={12} durationInFrames={18}>
          <Shot
            src={staticFile("presenter.jpg")}
            length={18}
            zoom={[1.7, 1.95]}
            focus="50% 33%"
            pan={[0, 0]}
            tilt={[-1, 1]}
            beats={[7, 14]}
          />
        </Sequence>
      </Track>

      <Sparks seed="s3b" count={10} x={[60, 1020]} y={1500} rise={1200} />

      <Track name="Cut flashes">
        <Sequence name="Flash" from={12} durationInFrames={3}>
          <CutFlash />
        </Sequence>
      </Track>

      <Audio name="Rising pulse" src={staticFile("pulse.mp3")} volume={1} />
    </>
  );
};

export const PresenterReaction = Interactive.create({
  Component: PresenterReactionInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
  },
});
