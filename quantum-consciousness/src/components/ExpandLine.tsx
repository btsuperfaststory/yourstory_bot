import React from 'react';
import { interpolate, Easing, useCurrentFrame } from 'remotion';

interface ExpandLineProps {
  delay?: number;
  duration?: number;
  color?: string;
  maxWidth?: number;
  height?: number;
  style?: React.CSSProperties;
}

export const ExpandLine: React.FC<ExpandLineProps> = ({
  delay = 0,
  duration = 25,
  color = '#F59E0B',
  maxWidth = 80,
  height = 2,
  style,
}) => {
  const frame = useCurrentFrame();

  const p = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        width: p * maxWidth,
        height,
        background: color,
        ...style,
      }}
    />
  );
};
