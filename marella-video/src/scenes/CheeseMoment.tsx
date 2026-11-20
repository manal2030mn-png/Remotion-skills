import { Audio } from "@remotion/media";
import { AbsoluteFill, Interactive, Sequence, staticFile } from "remotion";
import { VideoShot } from "../components/VideoShot";

// The "hero beat" right before the logo (12–13.2 s): extreme slow-motion close-up of the cheese
// and sauce melting down the cut, the music drops out, one clear crunch, a breath of silence.
const CheeseMomentInner: React.FC = () => {
  return (
    <>
      <Sequence name="Cheese melt (slow-mo)" durationInFrames={36}>
        <VideoShot
          src={staticFile("split.mp4")}
          trimBefore={100}
          playbackRate={0.5}
          length={36}
          zoom={[2.0, 2.3]}
          focus="77% 72%"
        />
      </Sequence>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <Audio
        name="Crunch"
        src={staticFile("crunch.mp3")}
        trimBefore={12}
        from={5}
        volume={1}
      />
      <Audio name="Bite" src={staticFile("bite.mp3")} from={7} volume={0.5} />
    </>
  );
};

export const CheeseMoment = Interactive.create({
  Component: CheeseMomentInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
  },
});
