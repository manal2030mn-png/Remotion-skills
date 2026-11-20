import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from './theme';

type LayerProps = {
  readonly index: number;
  readonly delay: number;
  readonly children: React.ReactNode;
};

// Each ingredient drops in from above, one after another
const Layer: React.FC<LayerProps> = ({index, delay, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const drop = spring({
    frame: frame - delay - index * 5,
    fps,
    config: {damping: 11, stiffness: 140},
  });
  return (
    <g
      style={{
        translate: `0px ${interpolate(drop, [0, 1], [-900, 0])}px`,
        opacity: drop > 0.01 ? 1 : 0,
      }}
    >
      {children}
    </g>
  );
};

export const Burger: React.FC<{
  readonly size: number;
  readonly delay?: number;
}> = ({size, delay = 0}) => {
  const frame = useCurrentFrame();
  const seeds = [
    [140, 130], [190, 112], [245, 118], [290, 140], [170, 160], [225, 150], [265, 172], [120, 175],
  ];
  return (
    <svg
      width={size}
      height={size * 0.9}
      viewBox="0 -40 400 400"
      style={{
        overflow: 'visible',
        translate: `0px ${Math.sin(frame / 14) * 8}px`,
      }}
    >
      <ellipse cx={200} cy={350} rx={170} ry={18} fill="black" opacity={0.35} />
      <Layer index={0} delay={delay}>
        <path d="M40 290 h320 q0 50 -50 55 h-220 q-50 -5 -50 -55z" fill={colors.bun} />
      </Layer>
      <Layer index={1} delay={delay}>
        <rect x={30} y={248} width={340} height={46} rx={23} fill="#5A2E1A" />
        <rect x={50} y={256} width={300} height={6} rx={3} fill="#7A4128" />
      </Layer>
      <Layer index={2} delay={delay}>
        <path
          d="M28 236 h344 l-20 22 l-10 34 l-12 -34 l-40 0 l-12 40 l-14 -40 h-110 l-10 30 l-12 -30 l-40 0 l-12 34 l-12 -34z"
          fill={colors.mustard}
        />
      </Layer>
      <Layer index={3} delay={delay}>
        <rect x={50} y={214} width={140} height={26} rx={12} fill={colors.ketchup} />
        <rect x={210} y={214} width={140} height={26} rx={12} fill={colors.ketchup} />
      </Layer>
      <Layer index={4} delay={delay}>
        <path
          d="M24 210 q22 -18 44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 v18 q-22 18 -44 0 t-44 0 t-44 0 t-44 0 t-44 0 t-44 0 t-44 0 t-44 0z"
          fill={colors.lettuce}
        />
      </Layer>
      <Layer index={5} delay={delay}>
        <path d="M36 205 q0 -140 164 -140 q164 0 164 140z" fill={colors.bun} />
        <path d="M70 120 q40 -45 120 -50" stroke="#F5B66A" strokeWidth={14} strokeLinecap="round" fill="none" />
        {seeds.map(([x, y]) => (
          <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={9} ry={5} fill={colors.cream} transform={`rotate(-20 ${x} ${y})`} />
        ))}
      </Layer>
    </svg>
  );
};

// Small helper: pop-in scale for headings and badges
export const usePop = (delay: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping: 12, stiffness: 160}});
};

export const fadeUp = (frame: number, delay: number) =>
  interpolate(frame - delay, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
