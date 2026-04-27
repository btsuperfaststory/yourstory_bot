import React from 'react';
import { AbsoluteFill, interpolate, Easing, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { SceneLabel } from '../components/SceneLabel';
import { GlowOrb } from '../components/GlowOrb';
import { COLORS } from '../theme';
import { fontFamily } from '../fonts';

const EVIDENCE = [
  {
    year: '2007',
    title: 'Photosynthesis',
    detail: 'Quantum coherence discovered in plant cells — energy travels multiple paths simultaneously',
    icon: '◈',
    color: COLORS.teal,
    delay: 90,
  },
  {
    year: '2008',
    title: 'Bird Navigation',
    detail: 'European robins use quantum entanglement in their eyes to sense Earth\'s magnetic field',
    icon: '◈',
    color: COLORS.cyan,
    delay: 135,
  },
  {
    year: '2013',
    title: 'Enzyme Catalysis',
    detail: 'Quantum tunneling lets enzymes transfer protons through energy barriers — not over them',
    icon: '◈',
    color: COLORS.purple,
    delay: 180,
  },
];

// Helix strand points
function helixX(t: number, r: number, cx: number): number {
  return cx + r * Math.cos(t);
}

export const Scene06_QuantumBiology: React.FC = () => {
  const frame = useCurrentFrame();

  const headP = interpolate(frame, [20, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const subP = interpolate(frame, [55, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const diagramP = interpolate(frame, [60, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Build helix strands
  const HELIX_CX = 140;
  const HELIX_H = 10;
  const strand1: { x: number; y: number }[] = [];
  const strand2: { x: number; y: number }[] = [];
  for (let i = 0; i <= 25; i++) {
    const t = i * 0.5;
    strand1.push({ x: helixX(t + frame * 0.03, 50, HELIX_CX), y: 15 + i * HELIX_H });
    strand2.push({ x: helixX(t + Math.PI + frame * 0.03, 50, HELIX_CX), y: 15 + i * HELIX_H });
  }
  const path1 = strand1.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const path2 = strand2.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  return (
    <AbsoluteFill>
      <Background />
      <GlowOrb x={200} y={540} color={COLORS.teal} size={500} delay={0} baseOpacity={0.08} />
      <GlowOrb x={1700} y={400} color={COLORS.cyan} size={400} delay={15} baseOpacity={0.07} />

      <SceneLabel chapter="Chapter 06" title="Quantum in Nature" delay={0} />

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
        06
      </div>

      {/* Left: Helix diagram */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 80,
          transform: 'translateY(-50%)',
          opacity: diagramP,
        }}
      >
        <svg width="280" height="280">
          <defs>
            <filter id="dnaGlow">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connecting rungs between strands */}
          {strand1.map((p1, i) => {
            if (i % 3 !== 0) return null;
            const p2 = strand2[i];
            const pulse = Math.sin(frame * 0.06 + i * 0.8) * 0.5 + 0.5;
            return (
              <line
                key={i}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={i % 6 === 0 ? COLORS.teal : COLORS.cyan}
                strokeWidth="1.5"
                strokeOpacity={0.3 + pulse * 0.4}
                filter="url(#dnaGlow)"
              />
            );
          })}

          <path d={path1} stroke={COLORS.teal} strokeWidth="2.5" fill="none" filter="url(#dnaGlow)" />
          <path d={path2} stroke={COLORS.cyan} strokeWidth="2.5" fill="none" filter="url(#dnaGlow)" />
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
            marginTop: 8,
          }}
        >
          Quantum Biology
        </div>
      </div>

      {/* Right: Evidence cards */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: 400,
          right: 80,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 52,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 1.08,
            opacity: headP,
            transform: `translateY(${(1 - headP) * 30}px)`,
            marginBottom: 16,
          }}
        >
          Nature Uses{' '}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.teal}, ${COLORS.cyan})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Quantum
          </span>
          <br />
          Mechanics
        </div>

        <div
          style={{
            fontFamily,
            fontSize: 18,
            fontWeight: 400,
            color: COLORS.textSecondary,
            lineHeight: 1.7,
            opacity: subP,
            transform: `translateY(${(1 - subP) * 22}px)`,
            marginBottom: 40,
          }}
        >
          New evidence shows quantum effects aren't just a lab curiosity — they operate inside living
          organisms. If biology harnesses quantum mechanics, could the brain too?
        </div>

        {EVIDENCE.map((e, i) => {
          const p = interpolate(frame, [e.delay, e.delay + 36], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          const lineW = interpolate(p, [0, 1], [0, 44]);

          return (
            <div
              key={i}
              style={{
                marginBottom: 28,
                opacity: p,
                transform: `translateX(${(1 - p) * -28}px)`,
                display: 'flex',
                gap: 24,
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 52,
                  height: 52,
                  borderRadius: 8,
                  background: `${e.color}18`,
                  border: `1px solid ${e.color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  color: e.color,
                }}
              >
                {e.icon}
              </div>
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      fontFamily,
                      fontSize: 13,
                      fontWeight: 700,
                      color: e.color,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {e.year}
                  </div>
                  <div style={{ width: lineW, height: 1, background: e.color, opacity: 0.4 }} />
                  <div
                    style={{
                      fontFamily,
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.white,
                    }}
                  >
                    {e.title}
                  </div>
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
                  {e.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
