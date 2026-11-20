import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { archPath, FRAME, TEAL } from "../brand";
import { ArchFrame } from "../components/ArchFrame";
import { FireGlow } from "../components/FireGlow";
import { Sparks } from "../components/Sparks";
import { Tagline } from "../components/Tagline";

// The steak photo with a punch-in, slow push, light shake and fire flicker.
const GrillShot: React.FC = () => {
  const frame = useCurrentFrame();
  const flicker = 1 + 0.06 * Math.sin(frame * 1.1) + 0.04 * Math.sin(frame * 3.7);
  const shake = interpolate(frame, [0, 10], [1, 0], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        left: FRAME.left,
        top: FRAME.apex,
        width: FRAME.right - FRAME.left,
        height: FRAME.bottom - FRAME.apex,
        filter: `brightness(${flicker}) saturate(1.1) contrast(1.05)`,
        translate: `${Math.sin(frame * 2.9) * 10 * shake}px ${Math.cos(frame * 3.3) * 8 * shake}px`,
      }}
    >
      <CanvasImage
        name="Steak photo"
        src={staticFile("steak.png")}
        fit="cover"
        style={{
          width: "100%",
          height: "100%",
          scale: interpolate(frame, [0, 10, 75], [1.45, 1.18, 1.3], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.22, 1, 0.36, 1),
            output: "perceptual-scale",
          }),
          transformOrigin: "52% 62%",
        }}
      />
    </div>
  );
};

const GrillOpeningInner: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <>
      {/* Everything inside the arch window */}
      <AbsoluteFill style={{ clipPath: `path('${archPath(0)}')` }}>
        <GrillShot />
        <AbsoluteFill
          style={{
            background: `linear-gradient(180deg, ${TEAL}EE 0%, ${TEAL}55 22%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 80%, ${TEAL}AA 100%)`,
          }}
        />
        <FireGlow />
        <Sparks seed="inner" count={38} x={[120, 960]} y={1180} rise={900} />
      </AbsoluteFill>

      <ArchFrame />

      {/* A few embers escape the frame for depth */}
      <Sparks seed="outer" count={9} x={[180, 900]} y={700} rise={650} />

      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse 85% 70% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      <Tagline text="يبي لها من بدري" start={Math.round(0.55 * fps)} />

      <Audio
        name="Grill sizzle"
        src={staticFile("sizzle.mp3")}
        volume={(f) =>
          interpolate(f, [0, 3, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
    </>
  );
};

export const GrillOpening = Interactive.create({
  Component: GrillOpeningInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
  },
});
