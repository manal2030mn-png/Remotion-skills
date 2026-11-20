import { loadFont } from "@remotion/google-fonts/ReemKufi";
import { Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { IVORY } from "../brand";

const { fontFamily } = loadFont("normal", { weights: ["600"], subsets: ["arabic"] });

type Props = {
  readonly text: string;
  readonly start: number;
};

// Arabic line revealed word by word (right to left), then a twinkling ✦.
export const Tagline: React.FC<Props> = ({ text, start }) => {
  const frame = useCurrentFrame();
  const words = text.split(" ");
  const starIn = start + words.length * 4 + 2;

  return (
    <Interactive.Div
      name="Tagline"
      dir="rtl"
      lang="ar"
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        top: 1490,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 26,
        fontFamily,
        fontWeight: 600,
        fontSize: 112,
        color: IVORY,
        textShadow: "0 6px 30px rgba(0,0,0,0.35)",
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: interpolate(frame, [start + i * 4, start + i * 4 + 7], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [start + i * 4, start + i * 4 + 9],
              ["0px 60px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          {word}
        </span>
      ))}
      <svg
        width={64}
        height={64}
        viewBox="-50 -50 100 100"
        style={{
          marginInlineStart: 6,
          scale: interpolate(frame, [starIn, starIn + 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 9 }),
          }),
          rotate: interpolate(frame, [starIn, starIn + 30], ["-90deg", "45deg"], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          opacity: 0.85 + 0.15 * Math.sin(frame / 2.5),
          filter: "drop-shadow(0 0 12px rgba(255,170,80,0.8))",
        }}
      >
        <path d="M0 -48 C6 -8 8 -6 48 0 C8 6 6 8 0 48 C-6 8 -8 6 -48 0 C-8 -6 -6 -8 0 -48 Z" fill={IVORY} />
      </svg>
    </Interactive.Div>
  );
};
