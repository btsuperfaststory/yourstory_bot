import React from 'react';
import { AbsoluteFill, interpolate, Easing, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { GlowOrb } from '../components/GlowOrb';
import { COLORS } from '../theme';
import { fontFamily } from '../fonts';

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();

  const line1P = interpolate(frame, [15, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const line2P = interpolate(frame, [50, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const line3P = interpolate(frame, [85, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const ctaP = interpolate(frame, [135, 165], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const glowPulse = Math.sin(frame * 0.04) * 0.5 + 0.5;

  // Expanding ring animation
  const ringScale = interpolate(frame, [0, 180], [0.5, 2.0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  const ringOpacity = interpolate(frame, [0, 60, 150, 180], [0, 0.15, 0.12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background />
      <GlowOrb x={960} y={540} color={COLORS.cyan} size={700} delay={0} baseOpacity={0.12} pulsePeriod={60} />
      <GlowOrb x={960} y={540} color={COLORS.purple} size={500} delay={10} baseOpacity={0.1} pulsePeriod={75} />

      {/* Expanding rings */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${ringScale})`,
          opacity: ringOpacity,
          pointerEvents: 'none',
        }}
      >
        <svg width="600" height="600" viewBox="-300 -300 600 600">
          <circle cx="0" cy="0" r="150" fill="none" stroke={COLORS.cyan} strokeWidth="1" />
          <circle cx="0" cy="0" r="220" fill="none" stroke={COLORS.cyan} strokeWidth="0.6" />
          <circle cx="0" cy="0" r="290" fill="none" stroke={COLORS.cyan} strokeWidth="0.3" />
        </svg>
      </div>

      {/* Central content */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: 1200,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: '0.3em',
            color: COLORS.gold,
            textTransform: 'uppercase',
            opacity: line1P,
            transform: `translateY(${(1 - line1P) * 25}px)`,
            marginBottom: 30,
          }}
        >
          The Mystery Remains
        </div>

        <div
          style={{
            fontFamily,
            fontSize: 72,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            opacity: line2P,
            transform: `translateY(${(1 - line2P) * 35}px)`,
            textShadow: `0 0 80px rgba(0,212,255,${0.2 + glowPulse * 0.2})`,
            marginBottom: 24,
          }}
        >
          Are You a{' '}
          <span
            style={{
              background: `linear-gradient(100deg, ${COLORS.cyan}, ${COLORS.purple})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Quantum
          </span>
          <br />
          Being?
        </div>

        <div
          style={{
            fontFamily,
            fontSize: 22,
            fontWeight: 400,
            color: COLORS.textSecondary,
            lineHeight: 1.75,
            opacity: line3P,
            transform: `translateY(${(1 - line3P) * 25}px)`,
            marginBottom: 56,
            maxWidth: 760,
            margin: '0 auto 56px',
          }}
        >
          From Plato to Penrose, from ancient philosophy to quantum biology — the question of
          what gives rise to conscious experience remains the{' '}
          <span style={{ color: COLORS.white, fontWeight: 600 }}>greatest unsolved problem in science.</span>
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: ctaP,
            transform: `translateY(${(1 - ctaP) * 20}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          <div style={{ width: 80, height: 1, background: COLORS.gold, opacity: 0.7 }} />
          <div
            style={{
              fontFamily,
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.gold,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            The frontier is open
          </div>
          <div style={{ width: 80, height: 1, background: COLORS.gold, opacity: 0.7 }} />
        </div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: `linear-gradient(transparent, ${COLORS.bg})`,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
