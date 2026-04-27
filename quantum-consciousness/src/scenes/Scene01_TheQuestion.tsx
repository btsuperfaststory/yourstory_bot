import React from 'react';
import { AbsoluteFill, interpolate, Easing, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { SceneLabel } from '../components/SceneLabel';
import { GlowOrb } from '../components/GlowOrb';
import { COLORS } from '../theme';
import { fontFamily } from '../fonts';

const MILESTONES = [
  {
    year: '380 BC',
    name: 'Plato',
    text: 'Described the soul as the seat of consciousness — but offered no mechanism',
    color: COLORS.gold,
  },
  {
    year: '1641',
    name: 'Descartes',
    text: '"I think, therefore I am" — yet he couldn\'t explain HOW mind connects to body',
    color: COLORS.cyan,
  },
  {
    year: '1890',
    name: 'William James',
    text: 'Mapped the "stream of consciousness" — yet its physical origin remained a complete mystery',
    color: COLORS.purple,
  },
];

export const Scene01_TheQuestion: React.FC = () => {
  const frame = useCurrentFrame();

  const headP = interpolate(frame, [25, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const questionP = interpolate(frame, [55, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const glowPulse = Math.sin(frame * 0.035) * 0.5 + 0.5;

  return (
    <AbsoluteFill>
      <Background />
      <GlowOrb x={1600} y={400} color={COLORS.gold} size={500} delay={20} baseOpacity={0.08} />

      <SceneLabel chapter="Chapter 01" title="The Question" delay={0} />

      {/* Dim scene number */}
      <div
        style={{
          position: 'absolute',
          right: 60,
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily,
          fontSize: 360,
          fontWeight: 900,
          color: 'white',
          opacity: 0.022,
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        01
      </div>

      {/* Upper content */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: 80,
          right: 80,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: COLORS.cyan,
            textTransform: 'uppercase',
            opacity: headP,
            transform: `translateY(${(1 - headP) * 20}px)`,
            marginBottom: 18,
          }}
        >
          Philosophy's Oldest Puzzle
        </div>

        <div
          style={{
            fontFamily,
            fontSize: 88,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 1.02,
            opacity: questionP,
            transform: `translateY(${(1 - questionP) * 40}px)`,
            textShadow: `0 0 60px rgba(0,212,255,${0.15 + glowPulse * 0.1})`,
          }}
        >
          What <em style={{ color: COLORS.cyan, fontStyle: 'italic' }}>IS</em>
          <br />
          Consciousness?
        </div>
      </div>

      {/* Three milestone cards */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 80,
          right: 80,
          display: 'flex',
          gap: 36,
        }}
      >
        {MILESTONES.map((m, i) => {
          const start = 105 + i * 50;
          const p = interpolate(frame, [start, start + 38], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          return (
            <div
              key={i}
              style={{
                flex: 1,
                opacity: p,
                transform: `translateY(${(1 - p) * 35}px)`,
                borderLeft: `3px solid ${m.color}`,
                paddingLeft: 24,
              }}
            >
              <div
                style={{
                  fontFamily,
                  fontSize: 38,
                  fontWeight: 900,
                  color: m.color,
                  marginBottom: 4,
                }}
              >
                {m.year}
              </div>
              <div
                style={{
                  fontFamily,
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '0.08em',
                  marginBottom: 10,
                  textTransform: 'uppercase',
                }}
              >
                {m.name}
              </div>
              <div
                style={{
                  fontFamily,
                  fontSize: 16,
                  fontWeight: 400,
                  color: COLORS.textSecondary,
                  lineHeight: 1.65,
                }}
              >
                {m.text}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
