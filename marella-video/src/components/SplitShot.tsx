import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { IVORY } from "../brand";

type Props = {
  readonly src: string;
  readonly zoom: number;
  readonly focus: string;
  // Frame the knife line finishes and the halves start to part.
  readonly cutAt: number;
  // Final gap between the halves in px.
  readonly gap: number;
};

// "Knife" cut on a still: an ivory line slices top to bottom, then the two halves part,
// showing the scene's teal background in the seam.
export const SplitShot: React.FC<Props> = ({
  src,
  zoom,
  focus,
  cutAt,
  gap,
}) => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const part = interpolate(frame, [cutAt, cutAt + 12], [0, gap / 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const drift = interpolate(frame, [cutAt, cutAt + 40], [0, 18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shake = interpolate(frame, [cutAt, cutAt + 6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const half = (side: "left" | "right") => (
    <AbsoluteFill
      style={{
        clipPath: side === "left" ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)",
        translate: `${side === "left" ? -(part + drift) : part + drift}px ${Math.sin(frame * 3) * 8 * shake}px`,
        rotate: `${side === "left" ? -1 : 1}deg`,
      }}
    >
      <CanvasImage
        src={src}
        fit="cover"
        style={{
          width: "100%",
          height: "100%",
          transformOrigin: focus,
          scale: zoom,
          filter: "saturate(1.12) contrast(1.06)",
        }}
      />
    </AbsoluteFill>
  );

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {half("left")}
      {half("right")}
      {/* Knife line: draws down, then lingers as a glowing seam */}
      <div
        style={{
          position: "absolute",
          left: 539,
          top: 0,
          width: 3,
          height: 1920,
          backgroundColor: IVORY,
          boxShadow: "0 0 24px 6px rgba(211,212,202,0.7)",
          transformOrigin: "top",
          scale: `1 ${interpolate(frame, [0, cutAt], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.7, 0, 0.3, 1),
          })}`,
          opacity: interpolate(frame, [cutAt, cutAt + 14], [1, 0.35], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
