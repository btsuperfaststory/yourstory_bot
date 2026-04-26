import React from 'react';
import { AbsoluteFill, interpolate, Easing, useCurrentFrame } from 'remotion';
import { Background } from '../components/Background';
import { SceneLabel } from '../components/SceneLabel';
import { GlowOrb } from '../components/GlowOrb';
import { COLORS } from '../theme';
import { fontFamily } from '../fonts';

// Build particle path - left to right heading to slit
function buildBeamPath(slitY: number, startX: number, endX: number, canvasH: number): string {
  const midY = canvasH / 2;
  return `M ${startX} ${midY} L ${endX} ${slitY}`;
}

export const Scene03_DoubleSlit: React.FC = () => {
  const frame = useCurrentFrame();

  const titleP = interpolate(frame, [20, 58], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const diagramP = interpolate(frame, [55, 95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subP = interpolate(frame, [100, 135], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const questionP = interpolate(frame, [160, 195], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Diagram dimensions
  const DW = 700;
  const DH = 340;
  const slitX = 260;
  const slit1Y = DH / 2 - 55;
  const slit2Y = DH / 2 + 55;
  const screenX = 560;

  // Interference columns on screen
  const screenCols: { y: number; opacity: number }[] = [];
  for (let y = 20; y < DH - 20; y += 6) {
    const d1 = Math.sqrt((screenX - slitX) ** 2 + (y - slit1Y) ** 2);
    const d2 = Math.sqrt((screenX - slitX) ** 2 + (y - slit2Y) ** 2);
    const val = Math.abs(Math.sin(d1 * 0.07) + Math.sin(d2 * 0.07)) / 2;
    screenCols.push({ y, opacity: val });
  }

  return (
    <AbsoluteFill>
      <Background />
      <GlowOrb x={500} y={540} color={COLORS.cyan} size={550} delay={0} baseOpacity={0.08} />
      <GlowOrb x={1500} y={400} color={COLORS.purple} size={400} delay={20} baseOpacity={0.07} />

      <SceneLabel chapter="Chapter 03" title="The Observer Effect" delay={0} />

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
        03
      </div>

      {/* Left: text */}
      <div style={{ position: 'absolute', top: 130, left: 80, width: 780 }}>
        <div
          style={{
            fontFamily,
            fontSize: 58,
            fontWeight: 900,
            color: COLORS.white,
            lineHeight: 1.08,
            opacity: titleP,
            transform: `translateY(${(1 - titleP) * 35}px)`,
            marginBottom: 36,
          }}
        >
          The{' '}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.teal})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Double-Slit
          </span>
          <br />
          Experiment
        </div>

        <div
          style={{
            fontFamily,
            fontSize: 20,
            fontWeight: 400,
            color: COLORS.textSecondary,
            lineHeight: 1.75,
            opacity: subP,
            transform: `translateY(${(1 - subP) * 25}px)`,
            marginBottom: 36,
          }}
        >
          Fire a single electron through two slits.{' '}
          <span style={{ color: COLORS.white }}>Without observation</span> — it goes through both at once,
          creating an interference pattern. The moment you{' '}
          <span style={{ color: COLORS.cyan, fontWeight: 600 }}>observe which slit it uses</span>, the
          interference vanishes. The wave function collapses.
        </div>

        <div
          style={{
            opacity: questionP,
            transform: `translateY(${(1 - questionP) * 20}px)`,
            background: `linear-gradient(135deg, rgba(0,212,255,0.08), rgba(139,92,246,0.06))`,
            border: `1px solid rgba(0,212,255,0.2)`,
            borderRadius: 12,
            padding: '20px 26px',
          }}
        >
          <div
            style={{
              fontFamily,
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.cyan,
              marginBottom: 8,
            }}
          >
            The Central Question:
          </div>
          <div
            style={{
              fontFamily,
              fontSize: 19,
              fontWeight: 400,
              color: COLORS.textSecondary,
              lineHeight: 1.65,
            }}
          >
            Does <span style={{ color: COLORS.white, fontWeight: 600 }}>consciousness itself</span> collapse
            the quantum wave function? Is the observer effect evidence that mind is woven into the fabric of
            reality?
          </div>
        </div>
      </div>

      {/* Right: Double-slit diagram */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: 80,
          transform: 'translateY(-50%)',
          opacity: diagramP,
        }}
      >
        <svg width={DW} height={DH}>
          <defs>
            <filter id="dsGlow">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Source beam going to slits */}
          <path d={buildBeamPath(slit1Y, 0, slitX, DH)} stroke={COLORS.cyan} strokeWidth="1.5" fill="none" strokeOpacity="0.5" filter="url(#dsGlow)" strokeDasharray="6 4" />
          <path d={buildBeamPath(slit2Y, 0, slitX, DH)} stroke={COLORS.cyan} strokeWidth="1.5" fill="none" strokeOpacity="0.5" filter="url(#dsGlow)" strokeDasharray="6 4" />

          {/* Source label */}
          <text x="20" y={DH / 2 + 5} fontFamily={fontFamily} fontSize="12" fill={COLORS.textMuted} textAnchor="start">
            ELECTRON
          </text>
          <text x="20" y={DH / 2 + 20} fontFamily={fontFamily} fontSize="12" fill={COLORS.textMuted} textAnchor="start">
            SOURCE
          </text>

          {/* Barrier */}
          <rect x={slitX - 6} y={0} width={12} height={slit1Y - 30} fill={COLORS.textMuted} opacity={0.5} />
          <rect x={slitX - 6} y={slit1Y + 30} width={12} height={slit2Y - slit1Y - 60} fill={COLORS.textMuted} opacity={0.5} />
          <rect x={slitX - 6} y={slit2Y + 30} width={12} height={DH - slit2Y - 30} fill={COLORS.textMuted} opacity={0.5} />

          {/* Slit labels */}
          <text x={slitX + 18} y={slit1Y + 5} fontFamily={fontFamily} fontSize="11" fill={COLORS.cyan} opacity={0.8}>Slit 1</text>
          <text x={slitX + 18} y={slit2Y + 5} fontFamily={fontFamily} fontSize="11" fill={COLORS.cyan} opacity={0.8}>Slit 2</text>

          {/* Fan-out beams from slits */}
          {[-50, -30, -10, 10, 30, 50].map((dy, i) => (
            <line
              key={i}
              x1={slitX + 6}
              y1={slit1Y}
              x2={screenX}
              y2={slit1Y + dy}
              stroke={COLORS.cyan}
              strokeWidth="0.8"
              strokeOpacity="0.2"
              strokeDasharray="4 6"
            />
          ))}
          {[-50, -30, -10, 10, 30, 50].map((dy, i) => (
            <line
              key={i}
              x1={slitX + 6}
              y1={slit2Y}
              x2={screenX}
              y2={slit2Y + dy}
              stroke={COLORS.teal}
              strokeWidth="0.8"
              strokeOpacity="0.2"
              strokeDasharray="4 6"
            />
          ))}

          {/* Detection screen with interference pattern */}
          {screenCols.map((col, i) => (
            <rect
              key={i}
              x={screenX}
              y={col.y}
              width={18}
              height={7}
              fill={COLORS.cyan}
              opacity={col.opacity * 0.8}
              filter="url(#dsGlow)"
            />
          ))}

          <text x={screenX + 26} y={DH / 2 + 5} fontFamily={fontFamily} fontSize="12" fill={COLORS.textMuted}>SCREEN</text>

          {/* Animated particle dot */}
          {(() => {
            const progress = (frame % 90) / 90;
            const px = progress * slitX;
            const py = DH / 2;
            return (
              <circle cx={px} cy={py} r={4} fill="white" opacity={Math.min(progress * 3, 1 - progress * 0.5)} filter="url(#dsGlow)" />
            );
          })()}
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
            marginTop: 10,
          }}
        >
          Without observation: interference pattern forms
        </div>
      </div>
    </AbsoluteFill>
  );
};
