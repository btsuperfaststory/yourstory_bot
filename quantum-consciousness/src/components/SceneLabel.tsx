import React from 'react';
import { interpolate, Easing, useCurrentFrame } from 'remotion';
import { COLORS } from '../theme';
import { fontFamily } from '../fonts';

interface SceneLabelProps {
  chapter: string;
  title: string;
  delay?: number;
}

export const SceneLabel: React.FC<SceneLabelProps> = ({ chapter, title, delay = 0 }) => {
  const frame = useCurrentFrame();

  const p = interpolate(frame, [delay, delay + 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const lineW = interpolate(p, [0, 1], [0, 160]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 48,
        left: 80,
        opacity: p,
        transform: `translateY(${(1 - p) * -8}px)`,
      }}
    >
      <div
        style={{
          fontFamily,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.25em',
          color: COLORS.gold,
          textTransform: 'uppercase',
          marginBottom: 6,
        }}
      >
        {chapter} — {title}
      </div>
      <div
        style={{
          width: lineW,
          height: 1,
          background: `linear-gradient(90deg, ${COLORS.gold}, transparent)`,
        }}
      />
    </div>
  );
};
