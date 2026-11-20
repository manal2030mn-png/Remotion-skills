import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {Background} from '../Background';
import {Burger, fadeUp, usePop} from '../Burger';
import {bodyFont, colors, currency, displayFont} from '../theme';

export const Combo: React.FC<{readonly extra: number}> = ({extra}) => {
  const frame = useCurrentFrame();
  const label = usePop(0);
  const burst = usePop(40);
  const pulse = 1 + Math.sin(frame / 5) * 0.04;
  return (
    <AbsoluteFill>
      <Background tint="#5A0F0A" />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 30}} dir="rtl" lang="ar">
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 150,
            color: colors.cream,
            backgroundColor: colors.ketchup,
            padding: '0 60px',
            borderRadius: 30,
            scale: label,
            rotate: '-4deg',
          }}
        >
          حوّلها وجبة!
        </div>
        <Burger size={560} delay={6} />
        <div
          style={{
            fontFamily: bodyFont,
            fontWeight: 800,
            fontSize: 60,
            color: colors.cream,
            opacity: fadeUp(frame, 30),
          }}
        >
          برقر + بطاطس + مشروب
        </div>
        <div
          style={{
            width: 420,
            height: 420,
            borderRadius: 210,
            backgroundColor: colors.mustard,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            scale: burst * pulse,
            rotate: `${interpolate(burst, [0, 1], [-90, 6])}deg`,
            boxShadow: `0 16px 0 ${colors.ketchup}`,
          }}
        >
          <div style={{fontFamily: bodyFont, fontWeight: 800, fontSize: 52, color: colors.night}}>أضف فقط</div>
          <div style={{fontFamily: displayFont, fontSize: 170, color: colors.night, lineHeight: 1}} dir="ltr">+{extra}</div>
          <div style={{fontFamily: bodyFont, fontWeight: 800, fontSize: 44, color: colors.night}}>{currency}</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
