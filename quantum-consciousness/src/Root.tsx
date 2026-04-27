import './index.css';
import { Composition } from 'remotion';
import { QuantumConsciousness, TOTAL_DURATION } from './QuantumConsciousness';
import './fonts';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="QuantumConsciousness"
      component={QuantumConsciousness}
      durationInFrames={TOTAL_DURATION}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
