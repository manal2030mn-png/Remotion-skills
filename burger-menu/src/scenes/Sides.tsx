import {AbsoluteFill} from 'remotion';
import {Background} from '../Background';
import {MenuItem} from '../MenuItem';
import {SectionTitle} from '../SectionTitle';

export const Sides: React.FC = () => (
  <AbsoluteFill>
    <Background tint="#4A2A0A" />
    <AbsoluteFill style={{padding: '150px 80px', gap: 34}}>
      <SectionTitle title="الجانبيات" subtitle="والمشروبات" />
      <MenuItem name="بطاطس مقلية" price={9} delay={12} />
      <MenuItem name="بطاطس بالجبن" description="صوص شيدر وهالبينو" price={14} delay={20} />
      <MenuItem name="حلقات بصل" price={12} delay={28} />
      <MenuItem name="ميلك شيك" description="فانيلا · شوكولاتة · فراولة" price={16} delay={36} />
      <MenuItem name="مشروب غازي" price={6} delay={44} />
    </AbsoluteFill>
  </AbsoluteFill>
);
