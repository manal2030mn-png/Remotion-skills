import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

// Cinematic scene entrance: the new scene fades in over the previous one (which keeps its
// camera move underneath) while settling from a light zoom and soft blur, with a warm glow
// peaking mid-dissolve. Place inside a Sequence that overlaps the previous scene by `frames`.
export const CrossDissolve: React.FC<{
  readonly frames: number;
  readonly children: React.ReactNode;
}> = ({ frames, children }) => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.33, 0, 0.2, 1);

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: interpolate(frame, [0, frames], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
          scale: interpolate(frame, [0, frames + 6], [1.06, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
          filter: `blur(${interpolate(frame, [0, frames], [14, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          })}px)`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          mixBlendMode: "screen",
          opacity: interpolate(frame, [0, frames / 2, frames], [0, 0.35, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          background:
            "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(255,190,120,0.9) 0%, rgba(255,150,80,0) 70%)",
        }}
      />
    </AbsoluteFill>
  );
};
