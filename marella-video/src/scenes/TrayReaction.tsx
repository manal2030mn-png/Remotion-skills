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
import { VideoShot } from "../components/VideoShot";

// Scene 3 (4.5–7 s): the tray in front of him (footage), a quick amazed beat (still),
// then he reaches for the burger and lifts it (footage, sped up for energy).
// Pulses on the amazed beat follow pulse.mp3 (0, 8, 19 frames after it starts).
const TrayReactionInner: React.FC = () => {
  return (
    <>
      <Track name="Shots">
        <Sequence name="Tray close" durationInFrames={14}>
          <VideoShot
            src={staticFile("serve.mp4")}
            trimBefore={0}
            length={14}
            zoom={[1.9, 1.7]}
            focus="45% 84%"
            tilt={[-1.5, 0]}
          />
        </Sequence>
        <Sequence name="Amazed look" from={14} durationInFrames={20}>
          <Shot
            src={staticFile("tray-reaction.jpg")}
            length={20}
            zoom={[1.9, 1.6]}
            focus="52% 40%"
            pan={[0, 0]}
            tilt={[1, 0]}
            beats={[0, 8, 19]}
          />
        </Sequence>
        <Sequence name="Grab & lift" from={34} durationInFrames={41}>
          <VideoShot
            src={staticFile("serve.mp4")}
            trimBefore={40}
            playbackRate={1.4}
            length={41}
            zoom={[1.28, 1.1]}
            focus="50% 48%"
            tilt={[-1, 0]}
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
        <Sequence name="Flash 1" from={14} durationInFrames={3}>
          <CutFlash />
        </Sequence>
        <Sequence name="Flash 2" from={34} durationInFrames={3}>
          <CutFlash />
        </Sequence>
      </Track>

      <LowerTitle
        text="لازم يكون من خياراتك"
        start={38}
        fontSize={104}
        placement="top"
      />

      <Track name="SFX">
        <Audio name="Whoosh in" src={staticFile("whoosh.mp3")} volume={0.6} />
        <Audio
          name="Tray thud"
          src={staticFile("tray-thud.mp3")}
          from={3}
          volume={0.9}
        />
        <Audio
          name="Whoosh cut"
          src={staticFile("whoosh.mp3")}
          from={32}
          volume={0.45}
        />
      </Track>
      <Audio
        name="Rising pulse"
        src={staticFile("pulse.mp3")}
        from={14}
        volume={1}
      />
    </>
  );
};

export const TrayReaction = Interactive.create({
  Component: TrayReactionInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
  },
});
