import { AbsoluteFill, useCurrentFrame } from "remotion";

// Flickering firelight that sits on top of the photo (screen blend).
export const FireGlow: React.FC = () => {
  const frame = useCurrentFrame();
  const flicker =
    0.55 +
    0.18 * Math.sin(frame * 0.9) +
    0.12 * Math.sin(frame * 2.3 + 1.2) +
    0.08 * Math.sin(frame * 4.1 + 0.4);

  return (
    <AbsoluteFill
      style={{
        mixBlendMode: "screen",
        opacity: flicker,
        background:
          "radial-gradient(ellipse 70% 38% at 50% 92%, rgba(255,120,30,0.75) 0%, rgba(255,80,20,0.25) 45%, rgba(0,0,0,0) 75%)",
      }}
    />
  );
};
