import { loadFont } from "@remotion/google-fonts/ReemKufi";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { IVORY, TEAL } from "../brand";

const { fontFamily } = loadFont("normal", {
  weights: ["600", "700"],
  subsets: ["arabic"],
});

type Props = {
  readonly text: string;
  readonly start: number;
  readonly fontSize: number;
  readonly star?: boolean;
  // "top" keeps the frame's lower half (tray, cup, logo) clear.
  readonly placement?: "bottom" | "top";
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

// Brand lower third: teal fade from the bottom, ivory hairlines and an Arabic line
// that fades and rises in as one connected line, with an optional twinkling ✦.
export const LowerTitle: React.FC<Props> = ({
  text,
  start,
  fontSize,
  star = false,
  placement = "bottom",
}) => {
  const frame = useCurrentFrame();
  const top = placement === "top";
  const lineTops = top ? [190, 480] : [1430, 1720];
  const textTop = top ? 200 : 1440;
  const starIn = start + 9;

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: interpolate(frame, [start - 6, start + 4], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          background: `linear-gradient(${top ? "0deg" : "180deg"}, rgba(0,0,0,0) 58%, ${TEAL}B3 76%, ${TEAL}F2 100%)`,
        }}
      />
      {lineTops.map((lineTop, i) => (
        <div
          key={lineTop}
          style={{
            position: "absolute",
            top: lineTop,
            left: 140,
            right: 140,
            height: 2,
            backgroundColor: IVORY,
            opacity: 0.7,
            transformOrigin: i === 0 ? "right" : "left",
            scale: `${interpolate(
              frame,
              [start + i * 3, start + 12 + i * 3],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: ease,
              },
            )} 1`,
          }}
        />
      ))}
      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: textTop,
          height: 280,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: fontSize * 0.25,
          fontFamily,
          fontWeight: 700,
          fontSize,
          lineHeight: 1,
          color: IVORY,
          textShadow: "0 8px 40px rgba(0,0,0,0.5)",
        }}
      >
        <span
          style={{
            display: "inline-block",
            // Whole line fades and rises in together, so Arabic letters are always complete and joined.
            opacity: interpolate(frame, [start, start + 6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame,
              [start, start + 10],
              ["0px 40px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: ease,
              },
            ),
          }}
        >
          {text}
        </span>
        {star ? (
          <svg
            width={fontSize * 0.6}
            height={fontSize * 0.6}
            viewBox="-50 -50 100 100"
            style={{
              scale: interpolate(frame, [starIn, starIn + 8], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.spring({ damping: 9 }),
              }),
              rotate: interpolate(
                frame,
                [starIn, starIn + 24],
                ["-120deg", "45deg"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: ease,
                },
              ),
              opacity: 0.85 + 0.15 * Math.sin(frame / 2),
              filter: "drop-shadow(0 0 14px rgba(255,170,80,0.9))",
            }}
          >
            <path
              d="M0 -48 C6 -8 8 -6 48 0 C8 6 6 8 0 48 C-6 8 -8 6 -48 0 C-8 -6 -6 -8 0 -48 Z"
              fill={IVORY}
            />
          </svg>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
