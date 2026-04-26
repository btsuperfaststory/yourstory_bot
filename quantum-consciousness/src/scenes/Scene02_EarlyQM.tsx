import React from 'react';
import { AbsoluteFill, interpolate, Easing, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { SceneLabel } from '../components/SceneLabel';
import { GlowOrb } from '../components/GlowOrb';
import { COLORS } from '../theme';
import { fontFamily } from '../fonts';

const FIGURES = [
  { name: 'Niels Bohr', year: '1927', role: 'Copenhagen Interpretation', color: COLORS.cyan },
  { name: 'Werner Heisenberg', year: '1927', role: 'Uncertainty Principle', color: COLORS.teal },
  { name: 'Albert Einstein', year: '1927', role: '"God does not play dice"', color: COLORS.gold },
];

// Sine wave path generator (deterministic, no random)
function buildWavePath(frame: number, w: number, h: number, amp: number, freq: number, speed: number): string {
  const pts: string[] = [];
  for (let x = 0; x <= w; x += 3) {
    const y = h / 2 + Math.sin(x * freq + frame * speed) * amp;
    pts.push(`${x === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(' ');
}

export const Scene02_EarlyQM: React.FC = () => {
  const frame = useCurrentFrame();

  const yearP = interpolate(frame, [20, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleP = interpolate(frame, [45, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const quoteP = interpolate(frame, [85, 115], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const waveAppear = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const wave1 = buildWavePath(frame, 700, 100, 28, 0.025, 0.08);
  const wave2 = buildWavePath(frame, 700, 100, 18, 0.04, -0.06);

  return (
    <AbsoluteFill>
      <Background />
      <GlowOrb x={300} y={600} color={COLORS.cyan} size={500} delay={0} baseOpacity={0.07} />
      <GlowOrb x={1700} y={300} color={COLORS.purple} size={400} delay={15} baseOpacity={0.07} />

      <SceneLabel chapter="Chapter 02" title="The Quantum Revolution" delay={0} />

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
        02
      </div>

      {/* Left: text content */}
      <div
        style={{ position: 'absolute', top: 130, left: 80, width: 820 }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 64,
            fontWeight: 900,
            color: COLORS.gold,
            opacity: yearP,
            transform: `translateY(${(1 - yearP) * 30}px)`,
            marginBottom: 10,
          }}
        >
          The 1920s
        </div>

        <div
          style={{
            fontFamily,
            fontSize: 60,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 1.05,
            opacity: titleP,
            transform: `translateY(${(1 - titleP) * 30}px)`,
            marginBottom: 40,
          }}
        >
          Changed{' '}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.teal})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Everything
          </span>
        </div>

        {/* Key insight box */}
        <div
          style={{
            opacity: quoteP,
            transform: `translateY(${(1 - quoteP) * 25}px)`,
            borderLeft: `3px solid ${COLORS.cyan}`,
            paddingLeft: 24,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 22,
              fontWeight: 400,
              color: COLORS.textSecondary,
              lineHeight: 1.7,
            }}
          >
            The Copenhagen Interpretation stated:{' '}
            <span style={{ color: COLORS.white, fontWeight: 600 }}>
              "The act of observation affects quantum reality."
            </span>
            <br />
            <br />
            For the first time, the observer — consciousness itself — was written into the equations of physics.
          </div>
        </div>
      </div>

      {/* Wave visualization */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          right: 80,
          opacity: waveAppear,
        }}
      >
        <svg width="700" height="100">
          <defs>
            <linearGradient id="wGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COLORS.cyan} stopOpacity="0" />
              <stop offset="30%" stopColor={COLORS.cyan} stopOpacity="0.9" />
              <stop offset="70%" stopColor={COLORS.cyan} stopOpacity="0.9" />
              <stop offset="100%" stopColor={COLORS.cyan} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="wGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COLORS.teal} stopOpacity="0" />
              <stop offset="30%" stopColor={COLORS.teal} stopOpacity="0.6" />
              <stop offset="70%" stopColor={COLORS.teal} stopOpacity="0.6" />
              <stop offset="100%" stopColor={COLORS.teal} stopOpacity="0" />
            </linearGradient>
            <filter id="wGlow">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path d={wave1} stroke="url(#wGrad1)" strokeWidth="2.5" fill="none" filter="url(#wGlow)" />
          <path d={wave2} stroke="url(#wGrad2)" strokeWidth="1.8" fill="none" filter="url(#wGlow)" />
        </svg>

        <div
          style={{
            fontFamily,
            fontSize: 13,
            fontWeight: 600,
            color: COLORS.textMuted,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          Wave-Particle Duality
        </div>
      </div>

      {/* Three figures */}
      <div
        style={{
          position: 'absolute',
          bottom: 90,
          left: 80,
          right: 80,
          display: 'flex',
          gap: 32,
        }}
      >
        {FIGURES.map((f, i) => {
          const start = 120 + i * 40;
          const p = interpolate(frame, [start, start + 32], [0, 1], {
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
                transform: `translateY(${(1 - p) * 30}px)`,
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid rgba(255,255,255,0.07)`,
                borderRadius: 12,
                padding: '20px 24px',
              }}
            >
              <div
                style={{
                  fontFamily,
                  fontSize: 13,
                  fontWeight: 700,
                  color: f.color,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 6,
                }}
              >
                {f.year}
              </div>
              <div
                style={{
                  fontFamily,
                  fontSize: 22,
                  fontWeight: 700,
                  color: COLORS.white,
                  marginBottom: 6,
                }}
              >
                {f.name}
              </div>
              <div
                style={{
                  fontFamily,
                  fontSize: 15,
                  fontWeight: 400,
                  color: COLORS.textSecondary,
                  fontStyle: 'italic',
                }}
              >
                {f.role}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
