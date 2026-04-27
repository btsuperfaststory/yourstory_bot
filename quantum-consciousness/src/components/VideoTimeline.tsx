import React from 'react';
import { interpolate } from 'remotion';
import { COLORS } from '../theme';
import { fontFamily } from '../fonts';

// Absolute frame positions where each chapter begins in the final timeline
// Computed from SCENE_DURATIONS with 22-frame transitions overlapping
const CHAPTERS = [
  { label: 'Intro', startFrame: 0 },
  { label: 'The Question', startFrame: 188 },
  { label: 'Quantum Rev.', startFrame: 526 },
  { label: 'Observer Effect', startFrame: 834 },
  { label: 'Orch OR', startFrame: 1172 },
  { label: 'Hard Problem', startFrame: 1540 },
  { label: 'Quantum Bio', startFrame: 1848 },
  { label: 'The Debate', startFrame: 2126 },
  { label: 'Outro', startFrame: 2374 },
] as const;

interface VideoTimelineProps {
  frame: number;
  totalFrames: number;
}

export const VideoTimeline: React.FC<VideoTimelineProps> = ({ frame, totalFrames }) => {
  const progress = Math.min(frame / totalFrames, 1);

  const appear = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const currentChapterIdx = CHAPTERS.reduce<number>((acc, ch, i) => {
    return frame >= ch.startFrame ? i : acc;
  }, 0);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        pointerEvents: 'none',
        opacity: appear,
      }}
    >
      {/* Soft gradient scrim so bar is readable over any scene content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: 'linear-gradient(transparent, rgba(4,11,20,0.55))',
        }}
      />

      {/* Chapter label — centred, just above the bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 18,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: COLORS.textMuted,
        }}
      >
        {CHAPTERS[currentChapterIdx].label}
      </div>

      {/* Progress track */}
      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: 0,
          right: 0,
          height: 2,
          background: 'rgba(255,255,255,0.07)',
        }}
      >
        {/* Filled portion */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            right: `${(1 - progress) * 100}%`,
            background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.purple})`,
          }}
        />

        {/* Chapter tick marks */}
        {CHAPTERS.map((ch, i) => {
          if (i === 0) return null;
          const xPct = (ch.startFrame / totalFrames) * 100;
          const isPast = frame >= ch.startFrame;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${xPct}%`,
                top: -3,
                width: 1,
                height: 8,
                transform: 'translateX(-50%)',
                background: isPast ? COLORS.cyan : 'rgba(255,255,255,0.25)',
                opacity: isPast ? 0.9 : 0.5,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
