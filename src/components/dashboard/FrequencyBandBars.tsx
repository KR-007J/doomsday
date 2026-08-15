import React from 'react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

export const FrequencyBandBars: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const activeCenter = useThreatStore((s) => s.activeFrequencyCenter);

  const isThreat = currentState !== 'SAFE';

  const channels = [
    { port: 'CH-18.5k', label: '18.5 kHz (Audible Edge)', percent: 38, isAnomaly: false, color: '#10B981' },
    { port: 'CH-19.5k', label: '19.5 kHz (Subcarrier A)', percent: isThreat ? 88 : 22, isAnomaly: isThreat && Math.abs(activeCenter - 19500) < 600, color: isThreat ? '#EF4444' : '#10B981' },
    { port: 'CH-20.5k', label: '20.5 kHz (Subcarrier B)', percent: isThreat ? 94 : 18, isAnomaly: isThreat && Math.abs(activeCenter - 20500) < 600, color: isThreat ? '#EF4444' : '#10B981' },
    { port: 'CH-22.0k', label: '22.0 kHz (Ultrasonic Low)', percent: isThreat ? 62 : 12, isAnomaly: false, color: '#F59E0B' },
    { port: 'CH-23.5k', label: '23.5 kHz (Ultrasonic High)', percent: 81, isAnomaly: false, color: '#10B981' },
  ];

  return (
    <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
          EXPOSED ACOUSTIC CHANNELS
        </span>
        <span className="text-[10px] font-mono text-cyan-400 hover:underline cursor-pointer">
          View All &rarr;
        </span>
      </div>

      <div className="space-y-2.5 font-mono text-xs my-1">
        {channels.map((ch) => (
          <div key={ch.port} className="space-y-1">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                {ch.port}
                <span className="text-slate-500 font-normal">({ch.label})</span>
              </span>
              <span
                className="px-1.5 py-0.2 rounded text-[10px] font-bold"
                style={{
                  color: ch.color,
                  backgroundColor: `${ch.color}15`,
                  border: `1px solid ${ch.color}40`,
                }}
              >
                {ch.percent}%
              </span>
            </div>

            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800/80">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out shadow-sm"
                style={{
                  width: `${ch.percent}%`,
                  backgroundColor: ch.color,
                  boxShadow: ch.isAnomaly ? `0 0 8px ${ch.color}` : undefined,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
