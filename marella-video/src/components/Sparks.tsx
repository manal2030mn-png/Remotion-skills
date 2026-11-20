import { AbsoluteFill, random, useCurrentFrame } from "remotion";

type Props = {
  readonly seed: string;
  readonly count: number;
  // Spawn band (x range and starting y) in composition pixels.
  readonly x: [number, number];
  readonly y: number;
  readonly rise: number;
  // "fire" = grill embers, "ice" = cold bubbles/frost glints for the drink,
  // "warm" = soft golden dust for the closing card.
  readonly palette?: "fire" | "ice" | "warm";
};

const PALETTES = {
  fire: {
    bg: "radial-gradient(circle, #FFF4C2 0%, #FFB547 45%, #FF6A1A 100%)",
    glow: "rgba(255,120,30,0.75)",
    round: false,
  },
  ice: {
    bg: "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(211,212,202,0.6) 55%, rgba(211,212,202,0) 100%)",
    glow: "rgba(220,240,255,0.55)",
    round: true,
  },
  warm: {
    bg: "radial-gradient(circle, #FFF6DD 0%, #E9C98A 55%, rgba(233,201,138,0) 100%)",
    glow: "rgba(240,200,130,0.5)",
    round: true,
  },
} as const;

// Embers drifting up from the grill. Procedural: one template for all particles.
export const Sparks: React.FC<Props> = ({
  seed,
  count,
  x,
  y,
  rise,
  palette = "fire",
}) => {
  const frame = useCurrentFrame();
  const look = PALETTES[palette];

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
              height: look.round ? size : size * (1.6 + r("stretch")),
              borderRadius: size,
              opacity: alpha,
              rotate: `${drift / 12}deg`,
              background: look.bg,
              boxShadow: `0 0 ${size * 2.5}px ${size * 0.8}px ${look.glow}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
