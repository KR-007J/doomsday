import React from 'react';
import { Radio, ShieldAlert, Cpu, Activity, Clock } from 'lucide-react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';

export const SOCHeader: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const confidence = useThreatStore((s) => s.confidence);
  const systemStatus = useThreatStore((s) => s.systemStatus);

  const config = THREAT_STATE_CONFIGS[currentState];

  return (
    <div className="w-full bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Background state accent ambient glow */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-15 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: config.colorHex }}
      />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-slate-100 uppercase">
              SECURITY OPERATIONS CENTER <span className="text-cyan-400">// NODE-ALPHA</span>
            </h1>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE SOC STREAM
            </span>
          </div>
          <p className="text-xs font-mono text-slate-400">
            Scanning 16,000 Hz — 24,000 Hz (Near-Ultrasonic Acoustic Carrier Spectrum)
          </p>
        </div>

        {/* State Machine Dynamic Status Box */}
        <div
          className={`flex items-center gap-4 px-5 py-3 rounded-xl border transition-all duration-700 shadow-xl ${config.badgeClasses}`}
        >
          <div className="p-2.5 rounded-lg bg-black/40 border border-white/10">
            <ShieldAlert className="w-6 h-6 animate-pulse" style={{ color: config.colorHex }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                {config.label}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-white/10">
                CONFIDENCE: {confidence}%
              </span>
            </div>
            <p className="text-xs font-mono text-slate-300 max-w-md mt-0.5">
              {config.subText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
