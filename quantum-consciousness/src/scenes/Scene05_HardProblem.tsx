import React from 'react';
import { AbsoluteFill, interpolate, Easing, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { SceneLabel } from '../components/SceneLabel';
import { GlowOrb } from '../components/GlowOrb';
import { COLORS } from '../theme';
import { fontFamily } from '../fonts';

// "Qualia" circles — subjective color experience visualization
const QUALIA = [
  { x: 120, y: 100, r: 55, color: '#FF4757', label: 'Red', delay: 100 },
  { x: 230, y: 80, r: 45, color: '#FFA502', label: 'Orange', delay: 120 },
  { x: 330, y: 105, r: 50, color: '#FFD700', label: 'Yellow', delay: 140 },
  { x: 130, y: 210, r: 48, color: '#2ED573', label: 'Green', delay: 160 },
  { x: 260, y: 190, r: 52, color: '#1E90FF', label: 'Blue', delay: 180 },
  { x: 370, y: 215, r: 42, color: '#8B5CF6', label: 'Violet', delay: 200 },
];

export const Scene05_HardProblem: React.FC = () => {
  const frame = useCurrentFrame();

  const yearP = interpolate(frame, [18, 52], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleP = interpolate(frame, [48, 82], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const bodyP = interpolate(frame, [85, 115], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const quoteP = interpolate(frame, [160, 195], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      <Background />
      <GlowOrb x={300} y={400} color={COLORS.purple} size={550} delay={0} baseOpacity={0.09} />
      <GlowOrb x={1600} y={600} color={COLORS.gold} size={400} delay={20} baseOpacity={0.07} />

      <SceneLabel chapter="Chapter 05" title="The Hard Problem" delay={0} />

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
        }}
      >
        05
      </div>

      {/* Left: text */}
      <div style={{ position: 'absolute', top: 130, left: 80, width: 840 }}>
        <div
          style={{
            fontFamily,
            fontSize: 54,
            fontWeight: 900,
            color: COLORS.gold,
            opacity: yearP,
            transform: `translateY(${(1 - yearP) * 30}px)`,
            marginBottom: 6,
          }}
        >
          1994
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 20,
            fontWeight: 600,
            color: COLORS.textSecondary,
            letterSpacing: '0.08em',
            opacity: yearP,
            transform: `translateY(${(1 - yearP) * 20}px)`,
            marginBottom: 18,
          }}
        >
          David Chalmers — University of Arizona
        </div>

        <div
          style={{
            fontFamily,
            fontSize: 60,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 1.05,
            opacity: titleP,
            transform: `translateY(${(1 - titleP) * 35}px)`,
            marginBottom: 36,
          }}
        >
          The{' '}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.purple}, #EC4899)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Hard Problem
          </span>
          <br />
          of Consciousness
        </div>

        <div
          style={{
            fontFamily,
            fontSize: 20,
            fontWeight: 400,
            color: COLORS.textSecondary,
            lineHeight: 1.75,
            opacity: bodyP,
            transform: `translateY(${(1 - bodyP) * 22}px)`,
            marginBottom: 36,
          }}
        >
          Science can explain{' '}
          <span style={{ color: COLORS.white, fontWeight: 600 }}>how the brain processes information</span>
          — the "easy problems." But Chalmers asked:{' '}
          <span style={{ color: COLORS.purple, fontWeight: 600 }}>
            why do those processes produce subjective experience at all?
          </span>
          <br />
          <br />
          Why does red look{' '}
          <span style={{ color: '#FF4757', fontWeight: 600 }}>red</span> to you? Why does pain{' '}
          <span style={{ color: COLORS.white, fontWeight: 600 }}>hurt</span>? No physical explanation has
          ever answered this.
        </div>

        {/* Chalmers quote */}
        <div
          style={{
            opacity: quoteP,
            transform: `translateY(${(1 - quoteP) * 20}px)`,
            borderLeft: `3px solid ${COLORS.purple}`,
            paddingLeft: 22,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 18,
              fontWeight: 400,
              color: COLORS.textSecondary,
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}
          >
            "Why is there something it is like to be me?"
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.textMuted,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginTop: 8,
            }}
          >
            — David Chalmers, 1994
          </div>
        </div>
      </div>

      {/* Right: Qualia visualization */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: 100,
          transform: 'translateY(-50%)',
        }}
      >
        <svg width="480" height="320">
          <defs>
            <filter id="qualiaGlow">
              <feGaussianBlur stdDeviation="8" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {QUALIA.map((q, i) => {
            const p = interpolate(frame, [q.delay, q.delay + 35], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
              easing: Easing.bezier(0.34, 1.56, 0.64, 1),
            });
            const pulse = Math.sin(frame * 0.04 + i * 1.1) * 0.5 + 0.5;
            const scale = p * (0.9 + pulse * 0.12);

            return (
              <g key={i} opacity={p}>
                <circle
                  cx={q.x}
                  cy={q.y}
                  r={q.r * scale}
                  fill={q.color}
                  opacity={0.18 + pulse * 0.1}
                  filter="url(#qualiaGlow)"
                />
                <circle
                  cx={q.x}
                  cy={q.y}
                  r={q.r * scale * 0.55}
                  fill={q.color}
                  opacity={0.6}
                />
                <text
                  x={q.x}
                  y={q.y + 4}
                  textAnchor="middle"
                  fontFamily={fontFamily}
                  fontSize="11"
                  fontWeight="700"
                  fill="white"
                  opacity={0.85}
                >
                  {q.label}
                </text>
              </g>
            );
          })}

          {/* Label */}
          <text x="240" y="295" textAnchor="middle" fontFamily={fontFamily} fontSize="12" fill={COLORS.textMuted} fontWeight="600" letterSpacing="2">
            QUALIA
          </text>
          <text x="240" y="312" textAnchor="middle" fontFamily={fontFamily} fontSize="11" fill={COLORS.textMuted}>
            subjective experience
          </text>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
