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
import { Sparks } from "../components/Sparks";
import { VideoShot } from "../components/VideoShot";

// Scene 6 (12–13.5 s): two quick punch-ins on the cold Marella drinks with frosty bubbles,
// a teal edge glow tying into the closing card, and a rising build.
const ColdDrinkInner: React.FC = () => {
  return (
    <>
      <Track name="Shots">
        <Sequence name="MARELLA glass" durationInFrames={20}>
          <Shot
            src={staticFile("tray-reaction.jpg")}
            length={20}
            zoom={[2.65, 2.5]}
            focus="1% 89%"
            pan={[0, -20]}
            tilt={[-2, 0]}
          />
        </Sequence>
        <Sequence name="ماريلا cup" from={20} durationInFrames={25}>
          <VideoShot
            src={staticFile("bite.mp4")}
            trimBefore={90}
            length={25}
            zoom={[2.2, 2.3]}
            focus="97% 98%"
            tilt={[1.5, 0]}
          />
        </Sequence>
      </Track>

      <Sparks
        seed="ice"
        count={34}
        x={[120, 960]}
        y={1700}
        rise={1400}
        palette="ice"
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 80% 65% at 50% 50%, rgba(37,71,70,0) 55%, rgba(37,71,70,0.75) 100%)",
        }}
      />

      <Track name="Cut flashes">
        <Sequence name="Flash" from={20} durationInFrames={3}>
          <CutFlash />
        </Sequence>
      </Track>

      <Track name="SFX">
        <Audio name="Ice & fizz" src={staticFile("ice-fizz.mp3")} volume={1} />
        <Audio
          name="Whoosh cut"
          src={staticFile("whoosh.mp3")}
          from={18}
          volume={0.45}
        />
      </Track>
    </>
  );
};

export const ColdDrink = Interactive.create({
  Component: ColdDrinkInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
  },
});
