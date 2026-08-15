import React from 'react';
import { ShieldCheck, Activity, Radio, Cpu } from 'lucide-react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

export const Footer: React.FC = () => {
  const systemStatus = useThreatStore((s) => s.systemStatus);
  const isMockData = useThreatStore((s) => s.isMockData);

  return (
    <footer className="w-full bg-obsidian-950/90 border-t border-white/10 py-5 px-4 sm:px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            SENSOR ARRAY: {systemStatus.activeSensors} NODES ACTIVE
          </span>
          <span className="hidden md:inline text-slate-800">|</span>
          <span className="hidden md:flex items-center gap-1 text-slate-400">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            SAMPLING: {systemStatus.samplingRate / 1000} kHz (24-bit PCM)
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            ACOUSTIC SHIELD ENGINE
          </span>
          <span className="px-2.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 text-[10px]">
            Project built for SIH 2026
          </span>
        </div>
      </div>
    </footer>
  );
};
