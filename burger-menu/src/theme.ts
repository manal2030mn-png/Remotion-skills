import {loadFont as loadLalezar} from '@remotion/google-fonts/Lalezar';
import {loadFont as loadCairo} from '@remotion/google-fonts/Cairo';

export const displayFont = loadLalezar('normal', {
  weights: ['400'],
  subsets: ['arabic', 'latin'],
}).fontFamily;

export const bodyFont = loadCairo('normal', {
  weights: ['600', '800'],
  subsets: ['arabic', 'latin'],
}).fontFamily;

export const colors = {
  night: '#1B0F0A',
  ember: '#3A1A0E',
  mustard: '#FFC233',
  ketchup: '#E63B2E',
  cream: '#FFF4E0',
  bun: '#E0913F',
  lettuce: '#6BBF3A',
};

export const currency = 'ر.س';
