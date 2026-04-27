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

// Scientific consensus meter: 0 = fully against, 1 = fully for
// The meter animates from neutral (0.5) to a slightly skeptical position (0.35)
// reflecting the current mainstream scientific view
const METER_FINAL = 0.35;

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

  // Meter appears after the last bullet animates in (last PRO bullet at 105+3*35=210)
  const meterAppear = interpolate(frame, [220, 248], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Meter needle sweeps from center (0.5) to METER_FINAL over ~60 frames
  const meterValue = interpolate(frame, [248, 310], [0.5, METER_FINAL], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  // Needle settles with a gentle dying oscillation after reaching final position
  const needleValue = frame > 310
    ? METER_FINAL + Math.sin((frame - 310) * 0.12) * 0.018 * Math.exp(-(frame - 310) * 0.02)
    : meterValue;

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
          bottom: 130,
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

      {/* Scientific consensus meter */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: meterAppear,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.22em',
            color: COLORS.textMuted,
            textTransform: 'uppercase',
            marginBottom: 2,
          }}
        >
          Scientific Consensus
        </div>

        {/* Gauge arc */}
        <svg width="260" height="140" viewBox="0 0 260 140">
          <defs>
            <linearGradient id="meterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COLORS.teal} />
              <stop offset="50%" stopColor={COLORS.gold} />
              <stop offset="100%" stopColor={COLORS.purple} />
            </linearGradient>
            <filter id="needleGlow">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Track arc (180°) */}
          <path
            d="M 20 130 A 110 110 0 0 1 240 130"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Gradient filled arc */}
          <path
            d="M 20 130 A 110 110 0 0 1 240 130"
            fill="none"
            stroke="url(#meterGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            opacity={0.4}
          />

          {/* Labels */}
          <text x="10" y="118" fontFamily={fontFamily} fontSize="9" fill={COLORS.teal} fontWeight="700" textAnchor="middle">FOR</text>
          <text x="250" y="118" fontFamily={fontFamily} fontSize="9" fill={COLORS.purple} fontWeight="700" textAnchor="middle">AGAINST</text>
          <text x="130" y="30" fontFamily={fontFamily} fontSize="9" fill={COLORS.textMuted} fontWeight="600" textAnchor="middle">NEUTRAL</text>

          {/* Tick marks */}
          {[0, 0.25, 0.5, 0.75, 1].map((v, i) => {
            const angleDeg = (v - 0.5) * 180;
            const angleRad = (angleDeg - 90) * (Math.PI / 180);
            const r = 110;
            const cx = 130, cy = 130;
            const x1 = cx + (r - 12) * Math.cos(angleRad);
            const y1 = cy + (r - 12) * Math.sin(angleRad);
            const x2 = cx + r * Math.cos(angleRad);
            const y2 = cy + r * Math.sin(angleRad);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            );
          })}

          {/* Needle */}
          {(() => {
            const angleRad = (needleValue - 0.5) * Math.PI;
            const len = 88;
            const cx = 130, cy = 130;
            const nx = cx + len * Math.cos(Math.PI - angleRad);
            const ny = cy - len * Math.sin(Math.PI - angleRad);
            return (
              <g filter="url(#needleGlow)">
                <line
                  x1={cx} y1={cy}
                  x2={nx} y2={ny}
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity={0.9}
                />
                <circle cx={cx} cy={cy} r={5} fill="white" opacity={0.9} />
              </g>
            );
          })()}
        </svg>

        <div
          style={{
            fontFamily,
            fontSize: 12,
            fontWeight: 600,
            color: COLORS.textSecondary,
            letterSpacing: '0.05em',
            textAlign: 'center',
          }}
        >
          Mainstream physics leans skeptical — the question is open
        </div>
      </div>
    </AbsoluteFill>
  );
};
