import React from 'react';
import { ShieldCheck, Activity, Radio, Cpu } from 'lucide-react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

export const Footer: React.FC = () => {
  const systemStatus = useThreatStore((s) => s.systemStatus);
  const isMockData = useThreatStore((s) => s.isMockData);

  return (
    <footer className="w-full bg-[#0D0F12] border-t border-[#242728] py-3.5 px-4 sm:px-6 relative z-10 shadow-[0px_-1px_0px_0px_rgba(255,255,255,0.03)_inset]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#9AA0A6]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#3ECF8E] font-medium">
            <Radio className="w-3.5 h-3.5" />
            SENSOR ARRAY: <strong className="font-bold">{systemStatus.activeSensors} NODES ACTIVE</strong>
          </span>
          <span className="hidden md:inline text-[#242728]">|</span>
          <span className="hidden md:flex items-center gap-1 text-[#9AA0A6]">
            <Activity className="w-3.5 h-3.5 text-[#3ECF8E]" />
            SAMPLING: <strong className="text-[#F2F3F5]">{systemStatus.samplingRate / 1000} kHz</strong> (24-bit PCM)
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#F2F3F5] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3ECF8E]" />
            ACOUSTIC SHIELD ENGINE
          </span>
          <span className="px-2 py-0.5 rounded bg-[#15171B] text-[#9AA0A6] border border-[#242728] text-[10px]">
            SIH 2026 Submission
          </span>
        </div>
      </div>
    </footer>
  );
};
