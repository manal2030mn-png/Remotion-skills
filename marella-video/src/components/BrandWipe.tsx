import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { IVORY, TEAL, TEAL_SOFT } from "../brand";

// Scene-to-scene transition in Marella colors: two diagonal panels (#334A4A then #254746)
// sweep across with an ivory edge line. Fully covers the frame at `cover` frames in.
export const BrandWipe: React.FC<{ readonly cover: number }> = ({ cover }) => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.7, 0, 0.3, 1);
  const panel = (color: string, delay: number, edge: boolean) => {
    const x = interpolate(frame, [delay, cover + delay, cover + delay + 2, cover * 2 + delay], [130, 0, 0, -130], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: ease,
    });
    return (
      <AbsoluteFill style={{ translate: `${x}% 0%`, rotate: "-12deg", scale: 1.6 }}>
        <AbsoluteFill style={{ backgroundColor: color, borderLeft: edge ? `6px solid ${IVORY}` : undefined }} />
      </AbsoluteFill>
    );
  };

  return (
    <AbsoluteFill>
      {panel(TEAL_SOFT, 0, false)}
      {panel(TEAL, 2, true)}
    </AbsoluteFill>
  );
};
