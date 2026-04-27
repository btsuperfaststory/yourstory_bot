import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS } from '../theme';

// Deterministic starfield — never call Math.random() in render
const STARS = Array.from({ length: 200 }, (_, i) => ({
  x: (i * 1317.1 + 50) % 1920,
  y: (i * 739.3 + 80) % 1080,
  r: 0.4 + (i % 5) * 0.35,
  opacity: 0.08 + (i % 7) * 0.03,
}));

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  x: (i * 373.1 + 200) % 1920,
  y: (i * 619.7 + 150) % 1080,
  r: 1.2 + (i % 4) * 1.0,
  opacity: 0.18 + (i % 5) * 0.06,
  color: i % 3 === 0 ? COLORS.cyan : i % 3 === 1 ? COLORS.purple : COLORS.teal,
  speed: 0.008 + (i % 8) * 0.004,
  phase: i * 0.7,
}));

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(ellipse at 15% 50%, rgba(139,92,246,0.07) 0%, transparent 55%),
          radial-gradient(ellipse at 85% 20%, rgba(0,212,255,0.05) 0%, transparent 50%),
          ${COLORS.bg}
        `,
      }}
    >
      <svg
        width="1920"
        height="1080"
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <defs>
          <filter id="bgGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {STARS.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="white" opacity={s.opacity} />
        ))}

        {PARTICLES.map((p, i) => {
          const drift = Math.sin(frame * p.speed + p.phase) * 6;
          return (
            <circle
              key={i}
              cx={p.x + drift}
              cy={p.y}
              r={p.r}
              fill={p.color}
              opacity={p.opacity}
              filter="url(#bgGlow)"
            />
          );
        })}
      </svg>

      {/* Radial vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 45%, rgba(4,11,20,0.75) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
