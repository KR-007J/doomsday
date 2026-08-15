import React, { useMemo } from 'react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';

export const ConstellationVisualizer: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const confidence = useThreatStore((s) => s.confidence);
  const config = THREAT_STATE_CONFIGS[currentState];

  const isThreat = currentState !== 'SAFE';

  // Generate constellation points (I/Q plane)
  const points = useMemo(() => {
    const pts: { x: number; y: number; opacity: number }[] = [];
    const count = 140;

    if (!isThreat) {
      // Gaussian noise cloud centered at origin (0,0)
      for (let i = 0; i < count; i++) {
        const r = Math.random() * 35;
        const theta = Math.random() * 2 * Math.PI;
        pts.push({
          x: 100 + r * Math.cos(theta),
          y: 100 + r * Math.sin(theta),
          opacity: 0.3 + Math.random() * 0.4,
        });
      }
    } else {
      // 4 distinct FSK/QPSK constellation symbol centroids (-40,-40; +40,-40; -40,+40; +40,+40)
      const centroids = [
        { cx: 60, cy: 60 },
        { cx: 140, cy: 60 },
        { cx: 60, cy: 140 },
        { cx: 140, cy: 140 },
      ];

      for (let i = 0; i < count; i++) {
        const c = centroids[i % 4];
        const r = Math.random() * 12;
        const theta = Math.random() * 2 * Math.PI;
        pts.push({
          x: c.cx + r * Math.cos(theta),
          y: c.cy + r * Math.sin(theta),
          opacity: 0.6 + Math.random() * 0.4,
        });
      }
    }

    return pts;
  }, [isThreat, currentState]);

  return (
    <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
          IQ CONSTELLATION CONSTELLATION MAP
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
          {isThreat ? 'QPSK / FSK SYMBOLS' : 'NOISE CLOUD'}
        </span>
      </div>

      <div className="relative w-full h-44 bg-slate-900/90 rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
        {/* I/Q Axis Lines */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-slate-800" />
          <div className="h-full w-px bg-slate-800" />
        </div>

        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Constellation points */}
          {points.map((p, idx) => (
            <circle
              key={idx}
              cx={p.x}
              cy={p.y}
              r={isThreat ? 2.5 : 1.8}
              fill={config.colorHex}
              opacity={p.opacity}
            />
          ))}

          {/* Quadrant Target Circles when threat active */}
          {isThreat && (
            <>
              <circle cx="60" cy="60" r="16" fill="none" stroke={config.colorHex} strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="140" cy="60" r="16" fill="none" stroke={config.colorHex} strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="60" cy="140" r="16" fill="none" stroke={config.colorHex} strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="140" cy="140" r="16" fill="none" stroke={config.colorHex} strokeWidth="1" strokeDasharray="2 2" />
            </>
          )}
        </svg>

        {/* Labels */}
        <div className="absolute top-1 left-2 text-[9px] font-mono text-slate-500">+Q (Phase)</div>
        <div className="absolute bottom-1 right-2 text-[9px] font-mono text-slate-500">+I (In-Phase)</div>
      </div>
    </div>
  );
};
