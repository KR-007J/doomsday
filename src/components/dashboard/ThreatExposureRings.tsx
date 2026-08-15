import React from 'react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

interface RingData {
  label: string;
  value: number;
  max: number;
  color: string;
  count: number;
}

export const ThreatExposureRings: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const isThreat = currentState !== 'SAFE';

  const rings: RingData[] = [
    { label: 'Exploited', value: isThreat ? 78 : 12, max: 100, color: '#EF4444', count: isThreat ? 45 : 2 },
    { label: 'Critical', value: isThreat ? 65 : 8, max: 100, color: '#F97316', count: isThreat ? 28 : 0 },
    { label: 'High', value: isThreat ? 82 : 25, max: 100, color: '#F59E0B', count: isThreat ? 55 : 5 },
    { label: 'Medium', value: isThreat ? 40 : 15, max: 100, color: '#6366F1', count: isThreat ? 30 : 14 },
    { label: 'Low', value: isThreat ? 95 : 90, max: 100, color: '#10B981', count: isThreat ? 112 : 88 },
  ];

  return (
    <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 shadow-xl flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
          THREAT EXPOSURES SEVERITY
        </span>
        <span className="text-[10px] font-mono text-cyan-400 hover:underline cursor-pointer">
          View All &rarr;
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2 my-2">
        {rings.map((ring) => {
          const radius = 24;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (circumference * (ring.value / ring.max));

          return (
            <div key={ring.label} className="flex flex-col items-center">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="28"
                    cy="28"
                    r={radius}
                    stroke="#1E293B"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r={radius}
                    stroke={ring.color}
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                  <span className="text-xs font-bold text-slate-100">{ring.count}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-1.5 font-medium">
                {ring.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
