import React from 'react';
import { AbsoluteFill, interpolate, Easing, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { SceneLabel } from '../components/SceneLabel';
import { GlowOrb } from '../components/GlowOrb';
import { COLORS } from '../theme';
import { fontFamily } from '../fonts';

const STEPS = [
  { icon: '⬡', label: 'Microtubules', desc: 'Protein scaffolding inside neurons — tiny enough for quantum effects', color: COLORS.cyan },
  { icon: '∿', label: 'Quantum Coherence', desc: 'Electrons enter superposition states within the tubulin proteins', color: COLORS.teal },
  { icon: '◎', label: 'Objective Reduction', desc: 'Spacetime geometry forces a quantum collapse — a moment of consciousness', color: COLORS.purple },
];

// Hexagonal microtubule cross-section
function buildHex(cx: number, cy: number, r: number): string {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  });
  return `M ${pts.join(' L ')} Z`;
}

const HEX_GRID = Array.from({ length: 19 }, (_, i) => {
  const col = i % 5;
  const row = Math.floor(i / 5);
  const cx = 60 + col * 52 + (row % 2) * 26;
  const cy = 60 + row * 45;
  return { cx, cy };
});

export const Scene04_OrchOR: React.FC = () => {
  const frame = useCurrentFrame();

  const yearP = interpolate(frame, [20, 52], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titleP = interpolate(frame, [50, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const diagramP = interpolate(frame, [70, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <Background />
      <GlowOrb x={400} y={500} color={COLORS.purple} size={600} delay={0} baseOpacity={0.09} />
      <GlowOrb x={1550} y={300} color={COLORS.cyan} size={400} delay={20} baseOpacity={0.07} />

      <SceneLabel chapter="Chapter 04" title="Orch OR Theory" delay={0} />

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
        04
      </div>

      {/* Left: content */}
      <div style={{ position: 'absolute', top: 130, left: 80, width: 820 }}>
        <div
          style={{
            fontFamily,
            fontSize: 56,
            fontWeight: 900,
            color: COLORS.gold,
            opacity: yearP,
            transform: `translateY(${(1 - yearP) * 30}px)`,
            marginBottom: 8,
          }}
        >
          1994
        </div>

        <div
          style={{
            fontFamily,
            fontSize: 22,
            fontWeight: 700,
            color: COLORS.textSecondary,
            letterSpacing: '0.1em',
            opacity: yearP,
            transform: `translateY(${(1 - yearP) * 20}px)`,
            marginBottom: 16,
          }}
        >
          Roger Penrose & Stuart Hameroff
        </div>

        <div
          style={{
            fontFamily,
            fontSize: 52,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 1.1,
            opacity: titleP,
            transform: `translateY(${(1 - titleP) * 30}px)`,
            marginBottom: 12,
          }}
        >
          Orchestrated{' '}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.cyan})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Objective
          </span>
          <br />
          Reduction
        </div>

        <div
          style={{
            fontFamily,
            fontSize: 14,
            fontWeight: 700,
            color: COLORS.purple,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            opacity: titleP,
            marginBottom: 44,
          }}
        >
          Orch OR
        </div>

        {/* Steps */}
        {STEPS.map((step, i) => {
          const start = 110 + i * 45;
          const p = interpolate(frame, [start, start + 35], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 20,
                marginBottom: 24,
                opacity: p,
                transform: `translateX(${(1 - p) * -30}px)`,
              }}
            >
              <div
                style={{
                  fontFamily,
                  fontSize: 28,
                  color: step.color,
                  width: 40,
                  textAlign: 'center',
                  flexShrink: 0,
                  marginTop: 2,
                  filter: `drop-shadow(0 0 6px ${step.color})`,
                }}
              >
                {step.icon}
              </div>
              <div>
                <div
                  style={{
                    fontFamily,
                    fontSize: 17,
                    fontWeight: 700,
                    color: step.color,
                    marginBottom: 4,
                  }}
                >
                  {step.label}
                </div>
                <div
                  style={{
                    fontFamily,
                    fontSize: 15,
                    fontWeight: 400,
                    color: COLORS.textSecondary,
                    lineHeight: 1.6,
                  }}
                >
                  {step.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: Microtubule hex visualization */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: 80,
          transform: 'translateY(-50%)',
          opacity: diagramP,
        }}
      >
        <svg width="320" height="260">
          <defs>
            <filter id="hexGlow">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {HEX_GRID.map((h, i) => {
            const pulse = Math.sin(frame * 0.07 + i * 0.6) * 0.5 + 0.5;
            const isActive = i % 3 === (Math.floor(frame * 0.05) % 3);
            const fillOpacity = isActive ? 0.25 + pulse * 0.3 : 0.05 + pulse * 0.05;
            const strokeOpacity = isActive ? 0.8 : 0.3;
            const strokeColor = isActive ? COLORS.cyan : COLORS.purple;

            return (
              <path
                key={i}
                d={buildHex(h.cx, h.cy, 22)}
                fill={strokeColor}
                fillOpacity={fillOpacity}
                stroke={strokeColor}
                strokeWidth="1.2"
                strokeOpacity={strokeOpacity}
                filter={isActive ? 'url(#hexGlow)' : undefined}
              />
            );
          })}
        </svg>
        <div
          style={{
            fontFamily,
            fontSize: 12,
            fontWeight: 600,
            color: COLORS.textMuted,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginTop: 12,
          }}
        >
          Microtubule Cross-Section
        </div>
        <div
          style={{
            fontFamily,
            fontSize: 11,
            fontWeight: 400,
            color: COLORS.textMuted,
            textAlign: 'center',
            marginTop: 4,
          }}
        >
          Tubulin protein subunits
        </div>
      </div>
    </AbsoluteFill>
  );
};
