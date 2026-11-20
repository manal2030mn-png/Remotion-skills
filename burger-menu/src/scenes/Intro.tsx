import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Background} from '../Background';
import {Burger, fadeUp, usePop} from '../Burger';
import {bodyFont, colors, displayFont} from '../theme';

export const Intro: React.FC<{readonly brand: string; readonly tagline: string}> = ({brand, tagline}) => {
  const frame = useCurrentFrame();
  const titlePop = usePop(38);
  const words = tagline.split(' ');
  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 40}}>
        <Burger size={720} />
        <div
          dir="rtl"
          lang="ar"
          style={{
            fontFamily: displayFont,
            fontSize: 190,
            color: colors.mustard,
            lineHeight: 1,
            scale: titlePop,
            rotate: `${interpolate(titlePop, [0, 1], [12, -3])}deg`,
            textShadow: `0 12px 0 ${colors.ketchup}`,
          }}
        >
          {brand}
        </div>
        <div dir="rtl" lang="ar" style={{display: 'flex', gap: 22}}>
          {words.map((w, i) => (
            <span
              key={`${w}-${i}`}
              style={{
                display: 'inline-block',
                fontFamily: bodyFont,
                fontWeight: 800,
                fontSize: 58,
                color: colors.cream,
                opacity: fadeUp(frame, 55 + i * 5),
                translate: `0px ${interpolate(fadeUp(frame, 55 + i * 5), [0, 1], [40, 0])}px`,
              }}
            >
              {w}
            </span>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
