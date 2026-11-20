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

// Scene 3 (4.5–7 s): tray lands (burger, fries, Marella drink), then the amazed reaction.
// Reaction pulses are synced to the beats in pulse.mp3 (0, 8, 19, 26 frames after it starts).
const TrayReactionInner: React.FC = () => {
  return (
    <>
      <Track name="Shots">
        <Sequence name="Tray slam" durationInFrames={12}>
          <Shot
            src={staticFile("tray-reaction.jpg")}
            length={12}
            drop={5}
            zoom={[1.85, 1.72]}
            focus="45% 84%"
            pan={[0, 0]}
            tilt={[-1.5, 0]}
            style={{ backgroundColor: "transparent" }}
          />
        </Sequence>
        <Sequence name="Marella drink" from={12} durationInFrames={10}>
          <Shot
            src={staticFile("tray-reaction.jpg")}
            length={10}
            zoom={[2.1, 2.3]}
            focus="16% 76%"
            pan={[20, 0]}
            tilt={[1.5, 0]}
          />
        </Sequence>
        <Sequence name="Amazed reaction" from={22} durationInFrames={53}>
          <Shot
            src={staticFile("tray-reaction.jpg")}
            length={53}
            zoom={[1.9, 1.1]}
            focus="52% 40%"
            pan={[0, 0]}
            tilt={[1, 0]}
            beats={[0, 8, 19, 26]}
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
        <Sequence name="Flash 1" from={12} durationInFrames={3}>
          <CutFlash />
        </Sequence>
        <Sequence name="Flash 2" from={22} durationInFrames={3}>
          <CutFlash />
        </Sequence>
      </Track>

      <LowerTitle
        text="لازم يكون من خياراتك"
        start={32}
        fontSize={104}
        placement="top"
      />

      <Track name="SFX">
        <Audio name="Whoosh in" src={staticFile("whoosh.mp3")} volume={0.6} />
        <Audio
          name="Tray thud"
          src={staticFile("tray-thud.mp3")}
          from={5}
          volume={1}
        />
        <Audio
          name="Whoosh cut"
          src={staticFile("whoosh.mp3")}
          from={10}
          volume={0.45}
        />
      </Track>
      <Audio
        name="Rising pulse"
        src={staticFile("pulse.mp3")}
        from={22}
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
