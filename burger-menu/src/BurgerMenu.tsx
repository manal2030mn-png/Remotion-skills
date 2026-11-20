import {linearTiming, springTiming, TransitionSeries} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {wipe} from '@remotion/transitions/wipe';
import {useVideoConfig} from 'remotion';
import {BurgerList} from './scenes/BurgerList';
import {Combo} from './scenes/Combo';
import {Intro} from './scenes/Intro';
import {Outro} from './scenes/Outro';
import {Sides} from './scenes/Sides';

export type BurgerMenuProps = {
  readonly brand: string;
  readonly tagline: string;
  readonly comboExtra: number;
  readonly hours: string;
};

export const BurgerMenu: React.FC<BurgerMenuProps> = ({brand, tagline, comboExtra, hours}) => {
  const {fps} = useVideoConfig();
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="Intro" durationInFrames={4 * fps}>
        <Intro brand={brand} tagline={tagline} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-left'})} timing={springTiming({config: {damping: 200}, durationInFrames: 15})} />
      <TransitionSeries.Sequence name="Burgers" durationInFrames={6 * fps}>
        <BurgerList />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-left'})} timing={springTiming({config: {damping: 200}, durationInFrames: 15})} />
      <TransitionSeries.Sequence name="Sides" durationInFrames={5 * fps}>
        <Sides />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({direction: 'from-top'})} timing={linearTiming({durationInFrames: 15})} />
      <TransitionSeries.Sequence name="Combo" durationInFrames={4 * fps}>
        <Combo extra={comboExtra} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({direction: 'from-bottom'})} timing={springTiming({config: {damping: 200}, durationInFrames: 15})} />
      <TransitionSeries.Sequence name="Outro" durationInFrames={3.5 * fps}>
        <Outro brand={brand} hours={hours} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
