import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { IVORY } from "../brand";

// 3-frame ivory flash that sells a hard cut. Place in a Sequence starting on the cut.
export const CutFlash: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: IVORY,
        mixBlendMode: "screen",
        opacity: interpolate(frame, [0, 3], [0.55, 0], { extrapolateRight: "clamp" }),
      }}
    />
  );
};
