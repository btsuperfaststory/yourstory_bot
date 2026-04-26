import React from 'react';
import { AbsoluteFill, interpolate, Easing, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { GlowOrb } from '../components/GlowOrb';
import { COLORS } from '../theme';
import { fontFamily } from '../fonts';

// Deterministic orbit ring configs
const RINGS = [
  { rx: 190, ry: 65, speed: 0.25, eOff: 0 },
  { rx: 190, ry: 65, speed: 0.18, eOff: 2.1 },
  { rx: 190, ry: 65, speed: 0.12, eOff: 4.2 },
];

const RING_ROTATIONS = [0, 60, 120];

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();

  const atomAppear = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleP = interpolate(frame, [20, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const subP = interpolate(frame, [65, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const tagP = interpolate(frame, [95, 125], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const glowPulse = Math.sin(frame * 0.04) * 0.5 + 0.5;

  return (
    <AbsoluteFill>
      <Background />

      <GlowOrb x={960} y={540} color={COLORS.cyan} size={600} delay={0} baseOpacity={0.12} />
      <GlowOrb x={960} y={540} color={COLORS.purple} size={400} delay={10} baseOpacity={0.1} />

      {/* Atom visual */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: atomAppear * 0.28,
          pointerEvents: 'none',
        }}
      >
        <svg width="480" height="480" viewBox="-240 -240 480 480">
          <defs>
            <filter id="aGlow">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Nucleus */}
          <circle cx="0" cy="0" r="14" fill={COLORS.cyan} opacity={0.85} filter="url(#aGlow)" />
          <circle cx="0" cy="0" r="7" fill="white" opacity={0.9} />

          {/* Orbit rings */}
          {RINGS.map((ring, i) => {
            const angle = frame * ring.speed + ring.eOff;
            const rad = (RING_ROTATIONS[i] * Math.PI) / 180;
            const ex = ring.rx * Math.cos(angle);
            const ey = ring.ry * Math.sin(angle);
            const nx = ex * Math.cos(rad) - ey * Math.sin(rad);
            const ny = ex * Math.sin(rad) + ey * Math.cos(rad);
            return (
              <g key={i}>
                <ellipse
                  cx="0"
                  cy="0"
                  rx={ring.rx}
                  ry={ring.ry}
                  fill="none"
                  stroke={COLORS.cyan}
                  strokeWidth="1.5"
                  strokeOpacity="0.55"
                  transform={`rotate(${RING_ROTATIONS[i]})`}
                  filter="url(#aGlow)"
                />
                <circle cx={nx} cy={ny} r={5} fill="white" opacity={0.95} filter="url(#aGlow)" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Title block */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, calc(-50% + ${(1 - titleP) * 55}px))`,
          opacity: titleP,
          textAlign: 'center',
          width: 1600,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: '0.42em',
            color: COLORS.cyan,
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          A Visual History of
        </div>

        <div
          style={{
            fontFamily,
            fontSize: 118,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 0.92,
            letterSpacing: '-0.025em',
            textShadow: `0 0 100px rgba(0,212,255,${0.25 + glowPulse * 0.2})`,
          }}
        >
          QUANTUM
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 118,
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: '-0.025em',
            background: `linear-gradient(100deg, ${COLORS.cyan}, ${COLORS.purple})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          CONSCIOUSNESS
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          bottom: 188,
          left: '50%',
          transform: `translateX(-50%) translateY(${(1 - subP) * 28}px)`,
          opacity: subP,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 26,
            fontWeight: 400,
            color: COLORS.textSecondary,
            letterSpacing: '0.06em',
          }}
        >
          The deepest question at the edge of science
        </div>
      </div>

      {/* Date tag */}
      <div
        style={{
          position: 'absolute',
          bottom: 88,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: tagP,
          display: 'flex',
          alignItems: 'center',
          gap: 18,
        }}
      >
        <div style={{ width: 70, height: 1, background: COLORS.gold, opacity: 0.8 }} />
        <div
          style={{
            fontFamily,
            fontSize: 13,
            fontWeight: 700,
            color: COLORS.gold,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
          }}
        >
          380 BC to Present
        </div>
        <div style={{ width: 70, height: 1, background: COLORS.gold, opacity: 0.8 }} />
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          background: `linear-gradient(transparent, ${COLORS.bg})`,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
