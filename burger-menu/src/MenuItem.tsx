import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {bodyFont, colors, currency, displayFont} from './theme';

export type MenuItemProps = {
  readonly name: string;
  readonly description?: string;
  readonly price: number;
  readonly delay: number;
  readonly highlight?: boolean;
};

export const MenuItem: React.FC<MenuItemProps> = ({name, description, price, delay, highlight}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - delay, fps, config: {damping: 14, stiffness: 120}});
  const badge = spring({frame: frame - delay - 8, fps, config: {damping: 9, stiffness: 180}});

  return (
    <div
      dir="rtl"
      lang="ar"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 32,
        padding: '28px 40px',
        borderRadius: 36,
        backgroundColor: highlight ? colors.ketchup : 'rgba(255, 244, 224, 0.08)',
        border: `3px solid ${highlight ? colors.mustard : 'rgba(255, 194, 51, 0.35)'}`,
        opacity: enter,
        translate: `${interpolate(enter, [0, 1], [700, 0])}px 0px`,
      }}
    >
      <div style={{flex: 1}}>
        <div style={{fontFamily: displayFont, fontSize: 68, color: colors.cream, lineHeight: 1.15}}>{name}</div>
        {description ? (
          <div style={{fontFamily: bodyFont, fontWeight: 600, fontSize: 34, color: 'rgba(255,244,224,0.75)', marginTop: 6}}>
            {description}
          </div>
        ) : null}
      </div>
      <div
        style={{
          minWidth: 170,
          height: 170,
          borderRadius: 85,
          backgroundColor: colors.mustard,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          scale: badge,
          rotate: `${interpolate(badge, [0, 1], [-40, -8])}deg`,
          boxShadow: '0 10px 0 rgba(0,0,0,0.3)',
        }}
      >
        <div style={{fontFamily: displayFont, fontSize: 72, color: colors.night, lineHeight: 1}}>{price}</div>
        <div style={{fontFamily: bodyFont, fontWeight: 800, fontSize: 28, color: colors.night}}>{currency}</div>
      </div>
    </div>
  );
};
