import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { archPath, IVORY } from "../brand";

// Double ivory line around the arch window, drawn on at the start.
export const ArchFrame: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <path
          d={archPath(0)}
          pathLength={1}
          fill="none"
          stroke={IVORY}
          strokeWidth={4}
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [0, 20], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.65, 0, 0.35, 1),
          })}
        />
        <path
          d={archPath(-22)}
          pathLength={1}
          fill="none"
          stroke={IVORY}
          strokeOpacity={0.55}
          strokeWidth={1.5}
          strokeDasharray={1}
          strokeDashoffset={interpolate(frame, [4, 26], [-1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.65, 0, 0.35, 1),
          })}
        />
      </svg>
    </AbsoluteFill>
  );
};
