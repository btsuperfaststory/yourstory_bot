import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface GlowOrbProps {
  x: number;
  y: number;
  color: string;
  size?: number;
  delay?: number;
  pulsePeriod?: number;
  baseOpacity?: number;
}

export const GlowOrb: React.FC<GlowOrbProps> = ({
  x,
  y,
  color,
  size = 300,
  delay = 0,
  pulsePeriod = 80,
  baseOpacity = 0.15,
}) => {
  const frame = useCurrentFrame();

  const appear = interpolate(frame, [delay, delay + 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pulse = Math.sin(((frame - delay) * Math.PI) / pulsePeriod) * 0.5 + 0.5;
  const opacity = appear * (baseOpacity + pulse * 0.07);

  return (
    <div
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        pointerEvents: 'none',
      }}
    />
  );
};
