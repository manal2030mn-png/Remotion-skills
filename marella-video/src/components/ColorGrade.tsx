import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// One look for every shot (grill stills, AI stills, restaurant footage, studio footage):
// - backdrop filter evens out saturation/contrast and adds a touch of warmth,
// - teal soft-light pulls shadows toward Marella's #254746,
// - warm soft-light lifts the centre highlights,
// - a shared vignette.
// Fades out at the end of its Sequence so the closing card keeps its exact brand colours.
export const ColorGrade: React.FC<{ readonly fadeOut: number }> = ({
  fadeOut,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const amount = interpolate(
    frame,
    [durationInFrames - fadeOut, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: amount }}>
      <AbsoluteFill
        style={{
          backdropFilter:
            "saturate(0.94) contrast(1.07) sepia(0.07) brightness(0.98)",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: "#254746",
          mixBlendMode: "soft-light",
          opacity: 0.32,
        }}
      />
      <AbsoluteFill
        style={{
          mixBlendMode: "soft-light",
          opacity: 0.4,
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(255,184,110,0.8) 0%, rgba(255,184,110,0) 75%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 95% 80% at 50% 48%, rgba(0,0,0,0) 62%, rgba(10,24,24,0.45) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
