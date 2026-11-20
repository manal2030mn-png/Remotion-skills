import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Background} from '../Background';
import {fadeUp, usePop} from '../Burger';
import {bodyFont, colors, displayFont} from '../theme';

export const Outro: React.FC<{readonly brand: string; readonly hours: string}> = ({brand, hours}) => {
  const frame = useCurrentFrame();
  const cta = usePop(10);
  const wiggle = Math.sin(frame / 4) * 3 * interpolate(frame, [20, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill dir="rtl" lang="ar" style={{alignItems: 'center', justifyContent: 'center', gap: 60}}>
        <div style={{fontFamily: displayFont, fontSize: 140, color: colors.mustard, opacity: fadeUp(frame, 0)}}>{brand}</div>
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 150,
            color: colors.night,
            backgroundColor: colors.mustard,
            padding: '10px 80px',
            borderRadius: 100,
            scale: cta,
            rotate: `${wiggle}deg`,
            boxShadow: `0 14px 0 ${colors.ketchup}`,
          }}
        >
          اطلب الآن
        </div>
        <div style={{fontFamily: bodyFont, fontWeight: 800, fontSize: 56, color: colors.cream, opacity: fadeUp(frame, 25)}}>
          سفري · محلي · توصيل
        </div>
        <div style={{fontFamily: bodyFont, fontWeight: 600, fontSize: 46, color: 'rgba(255,244,224,0.75)', opacity: fadeUp(frame, 35)}}>
          {hours}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
