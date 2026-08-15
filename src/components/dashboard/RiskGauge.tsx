import React from 'react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';

export const RiskGauge: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const confidence = useThreatStore((s) => s.confidence);
  const config = THREAT_STATE_CONFIGS[currentState];

  // Calculate needle angle (-90deg to +90deg) for 0 to 100 confidence score
  const angle = -90 + (confidence / 100) * 180;

  return (
    <div className="relative flex flex-col items-center justify-center p-4 bg-slate-950/80 rounded-xl border border-slate-800 shadow-xl overflow-hidden group">
      {/* Glow highlight */}
      <div
        className="absolute inset-0 opacity-10 transition-colors duration-700 pointer-events-none"
        style={{ backgroundColor: config.colorHex }}
      />

      <div className="w-full flex items-center justify-between mb-2 z-10">
        <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
          ACOUSTIC RISK LEVEL
        </span>
        <span
          className="text-xs font-mono font-bold px-2 py-0.5 rounded border"
          style={{
            color: config.colorHex,
            borderColor: `${config.colorHex}50`,
            backgroundColor: `${config.colorHex}15`,
          }}
        >
          {config.risk} RISK
        </span>
      </div>

      <div className="relative w-64 h-36 flex items-end justify-center mt-2 z-10">
        <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>

            <filter id="needleGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Track Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#1E293B"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Colored Value Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * (confidence / 100))}
            className="transition-all duration-700 ease-out"
          />

          {/* Tick Marks */}
          {[0, 25, 50, 75, 100].map((val) => {
            const tickAngle = -180 + (val / 100) * 180;
            const rad = (tickAngle * Math.PI) / 180;
            const x1 = 100 + 68 * Math.cos(rad);
            const y1 = 100 + 68 * Math.sin(rad);
            const x2 = 100 + 76 * Math.cos(rad);
            const y2 = 100 + 76 * Math.sin(rad);
            return (
              <line
                key={val}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#64748B"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Needle Hub */}
          <circle cx="100" cy="100" r="8" fill="#0F172A" stroke={config.colorHex} strokeWidth="3" />

          {/* Sweeping Needle */}
          <g
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: '100px 100px',
              transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            filter="url(#needleGlow)"
          >
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="28"
              stroke={config.colorHex}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <polygon points="97,100 103,100 100,24" fill={config.colorHex} />
          </g>
        </svg>

        {/* Center Digital Display */}
        <div className="absolute bottom-1 text-center font-mono z-20">
          <div className="text-3xl font-bold tracking-tight text-slate-100 flex items-baseline justify-center gap-0.5">
            <span style={{ color: config.colorHex }}>{confidence}</span>
            <span className="text-xs text-slate-400 font-normal">%</span>
          </div>
          <div className="text-[10px] text-slate-400 uppercase tracking-widest -mt-1 font-semibold">
            {config.label}
          </div>
        </div>
      </div>
    </div>
  );
};
