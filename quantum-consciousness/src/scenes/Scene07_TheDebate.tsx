import React from 'react';
import { AbsoluteFill, interpolate, Easing, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { SceneLabel } from '../components/SceneLabel';
import { GlowOrb } from '../components/GlowOrb';
import { COLORS } from '../theme';
import { fontFamily } from '../fonts';

const PRO = [
  'Quantum effects exist in warm biological systems (photosynthesis)',
  'Penrose\'s Gödel argument: consciousness exceeds algorithmic computation',
  'Anesthetics disrupt consciousness by binding to microtubule proteins',
  'Anomalous EEG coherence patterns during conscious states',
];

const CON = [
  'Decoherence: the brain is too warm and wet for quantum states to survive',
  'No experimental evidence of quantum superposition in neurons',
  'Classical chaos theory can explain brain complexity without quantum mechanics',
  'Tegmark (2000): decoherence timescales are 10⁷ × shorter than neural firing',
];

export const Scene07_TheDebate: React.FC = () => {
  const frame = useCurrentFrame();

  const titleP = interpolate(frame, [20, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const dividerP = interpolate(frame, [55, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill>
      <Background />
      <GlowOrb x={480} y={540} color={COLORS.teal} size={600} delay={0} baseOpacity={0.07} />
      <GlowOrb x={1440} y={540} color={COLORS.purple} size={600} delay={10} baseOpacity={0.07} />

      <SceneLabel chapter="Chapter 07" title="The Debate" delay={0} />

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
        07
      </div>

      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 120,
          left: '50%',
          transform: `translateX(-50%) translateY(${(1 - titleP) * -30}px)`,
          opacity: titleP,
          textAlign: 'center',
          width: 900,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 60,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 1.05,
            marginBottom: 12,
          }}
        >
          The Debate{' '}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.purple})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Rages On
          </span>
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 18,
            fontWeight: 400,
            color: COLORS.textSecondary,
          }}
        >
          The scientific community remains deeply divided
        </div>
      </div>

      {/* Center divider */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1,
          background: `linear-gradient(180deg, transparent, ${COLORS.textMuted}44, transparent)`,
          opacity: dividerP,
        }}
      />

      {/* PRO column */}
      <div style={{ position: 'absolute', top: 240, left: 80, width: 820 }}>
        <div
          style={{
            opacity: interpolate(frame, [75, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translateY(${interpolate(frame, [75, 100], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: COLORS.teal,
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            ✓ Arguments For
          </div>
          <div
            style={{
              width: 50,
              height: 2,
              background: COLORS.teal,
              marginBottom: 24,
            }}
          />
        </div>

        {PRO.map((item, i) => {
          const start = 105 + i * 35;
          const p = interpolate(frame, [start, start + 28], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 14,
                marginBottom: 20,
                opacity: p,
                transform: `translateX(${(1 - p) * -25}px)`,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: COLORS.teal,
                  flexShrink: 0,
                  marginTop: 8,
                }}
              />
              <div
                style={{
                  fontFamily,
                  fontSize: 16,
                  fontWeight: 400,
                  color: COLORS.textSecondary,
                  lineHeight: 1.65,
                }}
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>

      {/* CON column */}
      <div style={{ position: 'absolute', top: 240, left: 1000, right: 80 }}>
        <div
          style={{
            opacity: interpolate(frame, [75, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translateY(${interpolate(frame, [75, 100], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.2em',
              color: COLORS.purple,
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            ✗ Arguments Against
          </div>
          <div
            style={{
              width: 50,
              height: 2,
              background: COLORS.purple,
              marginBottom: 24,
            }}
          />
        </div>

        {CON.map((item, i) => {
          const start = 105 + i * 35;
          const p = interpolate(frame, [start, start + 28], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 14,
                marginBottom: 20,
                opacity: p,
                transform: `translateX(${(1 - p) * 25}px)`,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: COLORS.purple,
                  flexShrink: 0,
                  marginTop: 8,
                }}
              />
              <div
                style={{
                  fontFamily,
                  fontSize: 16,
                  fontWeight: 400,
                  color: COLORS.textSecondary,
                  lineHeight: 1.65,
                }}
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
