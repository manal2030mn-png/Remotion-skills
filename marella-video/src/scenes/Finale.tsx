import { Audio } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/ReemKufi";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { IVORY } from "../brand";
import { MarellaMark } from "../components/MarellaMark";
import { Sparks } from "../components/Sparks";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600"],
  subsets: ["arabic"],
});
const ease = Easing.bezier(0.16, 1, 0.3, 1);

// Whole-line fade + rise so Arabic glyphs are always complete and joined.
const useReveal = (start: number) => {
  const frame = useCurrentFrame();
  return {
    opacity: interpolate(frame, [start, start + 8], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    translate: interpolate(
      frame,
      [start, start + 10],
      ["0px 30px", "0px 0px"],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: ease,
      },
    ),
  };
};

const FinaleContent: React.FC = () => {
  const frame = useCurrentFrame();
  const wordmark = useReveal(10);
  const tagline = useReveal(19);
  const place = useReveal(25);
  const cta = useReveal(34);

  return (
    <AbsoluteFill style={{ alignItems: "center", fontFamily, color: IVORY }}>
      <div
        style={{
          position: "absolute",
          top: 440,
          scale: interpolate(frame, [0, 30], [0.92, 1], {
            extrapolateRight: "clamp",
            easing: ease,
          }),
        }}
      >
        <MarellaMark size={300} start={0} />
      </div>

      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 930,
          fontSize: 172,
          fontWeight: 400,
          ...wordmark,
        }}
      >
        مــاريــلا
      </div>

      <div
        style={{
          position: "absolute",
          top: 1170,
          width: 520,
          height: 2,
          backgroundColor: IVORY,
          opacity: 0.6,
          scale: `${interpolate(frame, [16, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease })} 1`,
        }}
      />

      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 1215,
          fontSize: 88,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          gap: 18,
          ...tagline,
        }}
      >
        <span>ماريلا .. وجهة الذّويق</span>
        <svg
          width={52}
          height={52}
          viewBox="-50 -50 100 100"
          style={{ rotate: `${45 + frame * 2}deg` }}
        >
          <path
            d="M0 -48 C6 -8 8 -6 48 0 C8 6 6 8 0 48 C-6 8 -8 6 -48 0 C-8 -6 -6 -8 0 -48 Z"
            fill={IVORY}
          />
        </svg>
      </div>

      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 1350,
          fontSize: 62,
          fontWeight: 400,
          display: "flex",
          alignItems: "center",
          gap: 14,
          ...place,
        }}
      >
        <svg width={46} height={56} viewBox="0 0 24 30">
          <path
            d="M12 1C6.5 1 2 5.3 2 10.8 2 18 12 29 12 29s10-11 10-18.2C22 5.3 17.5 1 12 1Z"
            fill="none"
            stroke={IVORY}
            strokeWidth={2}
          />
          <circle cx={12} cy={11} r={3.5} fill={IVORY} />
        </svg>
        <span>الطائف - طريق الجيش</span>
      </div>
      {/* Call to action */}
      <div
        dir="rtl"
        lang="ar"
        style={{
          position: "absolute",
          top: 1520,
          padding: "22px 72px",
          borderRadius: 999,
          border: `3px solid ${IVORY}`,
          backgroundColor: "rgba(211,212,202,0.12)",
          fontSize: 92,
          fontWeight: 600,
          lineHeight: 1.2,
          boxShadow: "0 0 40px rgba(233,201,138,0.25)",
          ...cta,
          scale:
            interpolate(frame, [34, 44], [0.85, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 10 }),
            }) +
            0.02 * Math.sin(Math.max(0, frame - 44) / 4),
        }}
      >
        جرّبه اليوم
      </div>
    </AbsoluteFill>
  );
};

// Closing card (12–14 s): teal gradient with warm light, the arch mark,
// wordmark, tagline, location and the "جرّبه اليوم" call to action.
const FinaleInner: React.FC = () => {
  return (
    <>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 85% 60% at 50% 38%, #334A4A 0%, #254746 60%, #1B3433 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          mixBlendMode: "screen",
          background:
            "radial-gradient(ellipse 60% 35% at 50% 30%, rgba(255,190,120,0.16) 0%, rgba(255,190,120,0) 70%)",
        }}
      />
      <Sparks
        seed="warm"
        count={22}
        x={[80, 1000]}
        y={1800}
        rise={1500}
        palette="warm"
      />
      <FinaleContent />
      <Audio
        name="Logo sting"
        src={staticFile("logo-sting.mp3")}
        volume={0.9}
      />
    </>
  );
};

export const Finale = Interactive.create({
  Component: FinaleInner,
  layout: "absolute-fill",
  schema: {
    ...Interactive.backgroundSchema,
  },
});
