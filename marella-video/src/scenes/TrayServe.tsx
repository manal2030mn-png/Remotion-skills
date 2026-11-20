import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Interactive,
  Sequence,
  staticFile,
  Track,
} from "remotion";
import { CutFlash } from "../components/CutFlash";
import { Shot } from "../components/Shot";

// Scene 3a (5:00–6:20): the burger is set down in front of the guest, then a punch-in.
// Placeholder footage: swap "burger.png" for the serving-tray shot (burger, fries, cold drink).
const TrayServeInner: React.FC = () => {
  return (
    <>
      <Track name="Shots">
        <Sequence name="Tray set-down" durationInFrames={24}>
          <Shot
            src={staticFile("burger.png")}
            length={24}
            drop={6}
            style={{ backgroundColor: "transparent" }}
            zoom={[1.04, 1.12]}
            focus="85% 50%"
            pan={[0, 0]}
            tilt={[-1, 0]}
          />
        </Sequence>
        <Sequence name="Burger close" from={24} durationInFrames={16}>
          <Shot
            src={staticFile("burger.png")}
            length={16}
            zoom={[1.9, 1.7]}
            focus="74% 36%"
            pan={[-20, 20]}
            tilt={[2, 0]}
          />
        </Sequence>
      </Track>

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <Track name="Cut flashes">
        <Sequence name="Flash" from={24} durationInFrames={3}>
          <CutFlash />
        </Sequence>
      </Track>

      <Track name="SFX">
        <Audio name="Whoosh in" src={staticFile("whoosh.mp3")} volume={0.6} />
        <Audio
          name="Tray thud"
          src={staticFile("tray-thud.mp3")}
          from={6}
          volume={1}
        />
        <Audio
          name="Whoosh cut"
          src={staticFile("whoosh.mp3")}
          from={22}
          volume={0.5}
        />
      </Track>
    </>
  );
};

export const TrayServe = Interactive.create({
  Component: TrayServeInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
  },
});
