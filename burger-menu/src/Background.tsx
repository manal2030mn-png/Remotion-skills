import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {colors} from './theme';

// Slowly rotating sunburst behind every scene
export const Background: React.FC<{tint?: string}> = ({tint = colors.ember}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{backgroundColor: colors.night, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          width: 3000,
          height: 3000,
          left: -960,
          top: -540,
          rotate: `${frame * 0.25}deg`,
          background: `repeating-conic-gradient(${tint} 0deg 9deg, ${colors.night} 9deg 18deg)`,
          opacity: 0.55,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 45%, transparent 0%, ${colors.night} 75%)`,
        }}
      />
    </AbsoluteFill>
  );
};
