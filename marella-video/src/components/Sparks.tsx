import { AbsoluteFill, random, useCurrentFrame } from "remotion";

type Props = {
  readonly seed: string;
  readonly count: number;
  // Spawn band (x range and starting y) in composition pixels.
  readonly x: [number, number];
  readonly y: number;
  readonly rise: number;
};

// Embers drifting up from the grill. Procedural: one template for all particles.
export const Sparks: React.FC<Props> = ({ seed, count, x, y, rise }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ mixBlendMode: "screen" }}>
      {new Array(count).fill(true).map((_, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const life = 22 + r("life") * 26;
        const t = ((frame + r("offset") * life) % life) / life;
        const startX = x[0] + r("x") * (x[1] - x[0]);
        const drift = (r("drift") - 0.5) * 160;
        const size = 3 + r("size") * 7;
        const px = startX + drift * t + Math.sin((frame + i * 7) / 5) * 8;
        const py = y - rise * (0.4 + r("rise") * 0.6) * t;
        const alpha = Math.sin(Math.PI * t) * (0.6 + r("a") * 0.4);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: size,
              height: size * (1.6 + r("stretch")),
              borderRadius: size,
              opacity: alpha,
              rotate: `${drift / 12}deg`,
              background: "radial-gradient(circle, #FFF4C2 0%, #FFB547 45%, #FF6A1A 100%)",
              boxShadow: `0 0 ${size * 2.5}px ${size * 0.8}px rgba(255,120,30,0.75)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
