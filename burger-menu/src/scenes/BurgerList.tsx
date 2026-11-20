import {AbsoluteFill} from 'remotion';
import {Background} from '../Background';
import {MenuItem} from '../MenuItem';
import {SectionTitle} from '../SectionTitle';

export const BurgerList: React.FC = () => (
  <AbsoluteFill>
    <Background />
    <AbsoluteFill style={{padding: '150px 80px', gap: 44}}>
      <SectionTitle title="البرقر" subtitle="مشوي على الفحم" />
      <MenuItem name="كلاسيك برقر" description="لحم بقري، شيدر، خس، طماطم" price={22} delay={15} />
      <MenuItem name="دبل تشيز" description="قطعتين لحم، دبل شيدر، صوص خاص" price={32} delay={25} highlight />
      <MenuItem name="سموكي باربكيو" description="لحم مدخن، حلقات بصل، صوص باربكيو" price={34} delay={35} />
      <MenuItem name="كرسبي تشكن" description="صدر دجاج مقرمش، مايونيز حار" price={26} delay={45} />
    </AbsoluteFill>
  </AbsoluteFill>
);
