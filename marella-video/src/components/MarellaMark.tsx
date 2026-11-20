import { Easing, interpolate, useCurrentFrame } from "remotion";
import { IVORY } from "../brand";

// Marella's arch mark (rounded top, pointed base, nested arcs), drawn on as an ivory line.
// Traced by eye from the logo on the restaurant's cups and Linktree.
export const MarellaMark: React.FC<{
  readonly size: number;
  readonly start: number;
}> = ({ size, start }) => {
  const frame = useCurrentFrame();
  const draw = (delay: number) =>
    interpolate(frame, [start + delay, start + delay + 16], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.65, 0, 0.35, 1),
    });

  const paths = [
    // Outer arch: rounded top, sides curving in to a point at the base.
    "M0 -78 C28 -78 44 -50 44 -14 C44 18 26 44 0 76 C-26 44 -44 18 -44 -14 C-44 -50 -28 -78 0 -78 Z",
    "M-34 -10 C-34 -46 -20 -66 0 -66 C20 -66 34 -46 34 -10",
    "M-24 -14 C-24 -42 -13 -54 0 -54 C13 -54 24 -42 24 -14",
  ];

  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="-60 -84 120 168"
      style={{
        overflow: "visible",
        filter: "drop-shadow(0 0 18px rgba(233,201,138,0.35))",
      }}
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          fill="none"
          stroke={IVORY}
          strokeWidth={3.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={1}
          strokeDashoffset={draw(i * 3)}
        />
      ))}
    </svg>
  );
};
