import { Video } from "@remotion/media";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

type Props = {
  readonly src: string;
  // Source offset in frames and playback speed of the clip.
  readonly trimBefore: number;
  readonly playbackRate?: number;
  readonly zoom: [number, number];
  readonly focus: string;
  readonly length: number;
  readonly tilt?: [number, number];
  // Frames that get a quick zoom "pulse" (sync to beats).
  readonly beats?: number[];
};

// Full-bleed footage with the same camera language as <Shot>: punch-in, tilt, cut shake, beat pulses.
export const VideoShot: React.FC<Props> = ({
  src,
  trimBefore,
  playbackRate = 1,
  zoom,
  focus,
  length,
  tilt = [0, 0],
  beats = [],
}) => {
  const frame = useCurrentFrame();
  const shake = interpolate(frame, [0, 6], [1, 0], {
    extrapolateRight: "clamp",
  });
  const pulse = beats.reduce(
    (acc, b) =>
      acc +
      interpolate(frame, [b, b + 1, b + 6], [0, 0.04, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    0,
  );
  const ease = Easing.bezier(0.16, 1, 0.3, 1);

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <AbsoluteFill
        style={{
          transformOrigin: focus,
          scale:
            interpolate(frame, [0, length], zoom, {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: ease,
              output: "perceptual-scale",
            }) + pulse,
          translate: `${Math.sin(frame * 3.1) * 12 * shake}px ${Math.cos(frame * 2.7) * 10 * shake}px`,
          rotate: `${interpolate(frame, [0, length], tilt, { extrapolateRight: "clamp", easing: ease })}deg`,
        }}
      >
        <Video
          src={src}
          trimBefore={trimBefore}
          playbackRate={playbackRate}
          muted
          objectFit="cover"
          style={{
            width: "100%",
            height: "100%",
            filter: "saturate(1.08) contrast(1.05)",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
