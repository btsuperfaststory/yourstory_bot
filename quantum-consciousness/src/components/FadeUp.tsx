import React, { ReactNode } from 'react';
import { interpolate, Easing, useCurrentFrame } from 'remotion';

interface FadeUpProps {
  delay?: number;
  duration?: number;
  distance?: number;
  children: ReactNode;
  style?: React.CSSProperties;
}

export const FadeUp: React.FC<FadeUpProps> = ({
  delay = 0,
  duration = 30,
  distance = 40,
  children,
  style,
}) => {
  const frame = useCurrentFrame();

  const p = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * distance}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
