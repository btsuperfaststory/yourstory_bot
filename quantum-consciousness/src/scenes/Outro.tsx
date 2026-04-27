import React from 'react';
import { AbsoluteFill, interpolate, Easing, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { GlowOrb } from '../components/GlowOrb';
import { COLORS } from '../theme';
import { fontFamily } from '../fonts';

const CHAPTER_RECAP = [
  { num: '01', label: 'The Question', color: COLORS.gold },
  { num: '02', label: 'Quantum Rev.', color: COLORS.cyan },
  { num: '03', label: 'Observer Effect', color: COLORS.teal },
  { num: '04', label: 'Orch OR', color: COLORS.purple },
  { num: '05', label: 'Hard Problem', color: '#EC4899' },
  { num: '06', label: 'Quantum Bio', color: COLORS.teal },
  { num: '07', label: 'The Debate', color: COLORS.purple },
] as const;

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();

  // Chapter strip appears first
  const stripP = interpolate(frame, [10, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Main text block
  const line1P = interpolate(frame, [50, 82], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const line2P = interpolate(frame, [80, 112], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const line3P = interpolate(frame, [112, 142], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const ctaP = interpolate(frame, [155, 182], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const glowPulse = Math.sin(frame * 0.04) * 0.5 + 0.5;

  // Expanding ring animation
  const ringScale = interpolate(frame, [0, 200], [0.5, 2.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  const ringOpacity = interpolate(frame, [0, 60, 160, 200], [0, 0.14, 0.1, 0], {
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

      {/* Chapter recap strip at top */}
      <div
        style={{
          position: 'absolute',
          top: 48,
          left: 80,
          right: 80,
          display: 'flex',
          gap: 20,
          opacity: stripP,
          transform: `translateY(${(1 - stripP) * -16}px)`,
        }}
      >
        {CHAPTER_RECAP.map((ch, i) => {
          const chipDelay = i * 12;
          const chipP = interpolate(frame, [10 + chipDelay, 38 + chipDelay], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          return (
            <div
              key={i}
              style={{
                flex: 1,
                opacity: chipP,
                transform: `translateY(${(1 - chipP) * -12}px)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: 2,
                  background: `linear-gradient(90deg, ${ch.color}88, ${ch.color}22)`,
                  borderRadius: 1,
                }}
              />
              <div
                style={{
                  fontFamily,
                  fontSize: 18,
                  fontWeight: 900,
                  color: ch.color,
                  lineHeight: 1,
                }}
              >
                {ch.num}
              </div>
              <div
                style={{
                  fontFamily,
                  fontSize: 10,
                  fontWeight: 600,
                  color: COLORS.textMuted,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                {ch.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Central content */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -48%)',
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
