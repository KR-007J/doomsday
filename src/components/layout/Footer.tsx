import React from 'react';
import { Radio, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

export const Footer: React.FC = () => {
  const systemStatus = useThreatStore((s) => s.systemStatus);
  const isMockData = useThreatStore((s) => s.isMockData);

  return (
    <footer className="w-full bg-slate-950/90 border-t border-slate-800/80 py-4 px-4 sm:px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            ARRAY STATUS: {systemStatus.activeSensors} SENSORS ONLINE
          </span>
          <span className="hidden md:inline text-slate-700">|</span>
          <span className="hidden md:flex items-center gap-1 text-slate-400">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            SAMPLING: {systemStatus.samplingRate / 1000} kHz (24-bit FFT)
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            ACOUSTIC SHIELD v2.4 (SIH 2026)
          </span>
          {isMockData && (
            <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 text-[10px]">
              BACKEND: SIMULATED (VITE_USE_MOCK_DATA=true)
            </span>
          )}
        </div>
      </div>
    </footer>
  );
};
