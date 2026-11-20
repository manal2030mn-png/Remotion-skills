import {Composition} from 'remotion';
import {BurgerMenu} from './BurgerMenu';

// 4 + 6 + 5 + 4 + 3.5 seconds, minus 4 transitions of 15 frames
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BurgerMenu"
      component={BurgerMenu}
      durationInFrames={675 - 60}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        brand: 'بيت البرقر',
        tagline: 'طازج · مشوي · لذيذ',
        comboExtra: 12,
        hours: 'يومياً من ١٢ ظهراً حتى ٢ فجراً',
      }}
    />
  );
};
