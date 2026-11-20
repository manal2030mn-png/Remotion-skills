import {interpolate, useCurrentFrame} from 'remotion';
import {usePop} from './Burger';
import {colors, displayFont} from './theme';

export const SectionTitle: React.FC<{readonly title: string; readonly subtitle?: string}> = ({title, subtitle}) => {
  const frame = useCurrentFrame();
  const pop = usePop(0);
  const underline = interpolate(frame, [8, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div dir="rtl" lang="ar" style={{textAlign: 'center', scale: pop}}>
      <div style={{fontFamily: displayFont, fontSize: 130, color: colors.mustard, lineHeight: 1.1}}>{title}</div>
      <div
        style={{
          height: 14,
          width: 360,
          margin: '6px auto 0',
          borderRadius: 7,
          backgroundColor: colors.ketchup,
          scale: `${underline} 1`,
        }}
      />
      {subtitle ? (
        <div style={{fontFamily: displayFont, fontSize: 52, color: colors.cream, marginTop: 18}}>{subtitle}</div>
      ) : null}
    </div>
  );
};
