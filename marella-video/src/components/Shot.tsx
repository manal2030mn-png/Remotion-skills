import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";

type Props = {
  readonly src: string;
  // Zoom at the first and last frame of the shot (punch-ins use a big start value).
  readonly zoom: [number, number];
  // Point of the photo the camera focuses on, as CSS transform-origin.
  readonly focus: string;
  // Camera drift in px over the shot.
  readonly pan: [number, number];
  readonly tilt?: [number, number];
  // Length of the shot in frames (same as its Sequence duration).
  readonly length: number;
  // Slide in from above and land with a slam over this many frames (tray set-down).
  readonly drop?: number;
  // Frames that get a quick zoom "pulse" (sync to beats).
  readonly beats?: number[];
  readonly style?: React.CSSProperties;
};

// One full-bleed "camera move" on a still: punch-in, drift, tilt and a hit of shake on the cut.
export const Shot: React.FC<Props> = ({
  src,
  zoom,
  focus,
  pan,
  tilt = [0, 0],
  length,
  drop = 0,
  beats = [],
  style,
}) => {
  const frame = useCurrentFrame();
  const land = drop;
  const shake = interpolate(frame, [land, land + 6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = beats.reduce(
    (acc, b) =>
      acc +
      interpolate(frame, [b, b + 1, b + 6], [0, 0.045, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    0,
  );
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  return (
    <AbsoluteFill
      style={{ overflow: "hidden", backgroundColor: "#000", ...style }}
    >
      <AbsoluteFill
        style={{
          scale: 1 + pulse,
          translate: drop
            ? interpolate(frame, [0, drop], ["0px -1900px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.55, 0, 0.9, 0.6),
              })
            : undefined,
        }}
      >
        <CanvasImage
          src={src}
          fit="cover"
          style={{
            width: "100%",
            height: "100%",
            transformOrigin: focus,
            scale: interpolate(frame, [0, length], zoom, {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: ease,
              output: "perceptual-scale",
            }),
            translate: `${interpolate(frame, [0, length], [0, pan[0]], { extrapolateRight: "clamp" }) + Math.sin(frame * 3.1) * 14 * shake}px ${interpolate(frame, [0, length], [0, pan[1]], { extrapolateRight: "clamp" }) + Math.cos(frame * 2.7) * 12 * shake}px`,
            rotate: `${interpolate(frame, [0, length], tilt, { extrapolateRight: "clamp", easing: ease })}deg`,
            filter: `brightness(${1 + 0.05 * Math.sin(frame * 1.3)}) saturate(1.12) contrast(1.06)`,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
