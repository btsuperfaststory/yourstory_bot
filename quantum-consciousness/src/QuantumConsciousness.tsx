import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { TransitionSeries, linearTiming, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { Intro } from './scenes/Intro';
import { Scene01_TheQuestion } from './scenes/Scene01_TheQuestion';
import { Scene02_EarlyQM } from './scenes/Scene02_EarlyQM';
import { Scene03_DoubleSlit } from './scenes/Scene03_DoubleSlit';
import { Scene04_OrchOR } from './scenes/Scene04_OrchOR';
import { Scene05_HardProblem } from './scenes/Scene05_HardProblem';
import { Scene06_QuantumBiology } from './scenes/Scene06_QuantumBiology';
import { Scene07_TheDebate } from './scenes/Scene07_TheDebate';
import { Outro } from './scenes/Outro';
import { VideoTimeline } from './components/VideoTimeline';

// Scene durations in frames (30fps)
export const SCENE_DURATIONS = {
  intro: 210,        //  7s
  scene01: 360,      // 12s
  scene02: 330,      // 11s
  scene03: 360,      // 12s
  scene04: 390,      // 13s
  scene05: 330,      // 11s
  scene06: 300,      // 10s
  scene07: 270,      //  9s
  outro: 210,        //  7s
};

const TRANSITION_FRAMES = 22;

// Total = sum(durations) - (numTransitions * transitionFrames)
// = (210+360+330+360+390+330+300+270+210) - 8*22
// = 2760 - 176 = 2584 frames ≈ 86.1 seconds
export const TOTAL_DURATION = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0) - 8 * TRANSITION_FRAMES;

const fadeTiming = linearTiming({ durationInFrames: TRANSITION_FRAMES });
const slideTiming = springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_FRAMES });

export const QuantumConsciousness: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.intro}>
          <Intro />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene01}>
          <Scene01_TheQuestion />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene02}>
          <Scene02_EarlyQM />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={slideTiming}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene03}>
          <Scene03_DoubleSlit />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene04}>
          <Scene04_OrchOR />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={slideTiming}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene05}>
          <Scene05_HardProblem />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene06}>
          <Scene06_QuantumBiology />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={slideTiming}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.scene07}>
          <Scene07_TheDebate />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={fadeTiming} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.outro}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Global overlay: chapter progress bar rendered above all scenes */}
      <VideoTimeline frame={frame} totalFrames={TOTAL_DURATION} />
    </AbsoluteFill>
  );
};
