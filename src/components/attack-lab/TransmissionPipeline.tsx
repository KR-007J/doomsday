import React from 'react';
import { Card } from '../ui/Card';
import { Binary, Radio, Wifi, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

export const TransmissionPipeline: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);

  const stages = [
    {
      id: 'ENCODING',
      title: '1. FSK ENCODING',
      desc: 'Convert text to binary constellation map',
      icon: <Binary className="w-5 h-5" />,
      active: currentState !== 'SAFE',
    },
    {
      id: 'MODULATING',
      title: '2. ULTRASONIC MODULATION',
      desc: 'Synthesize 20.5kHz subcarrier acoustic wave',
      icon: <Radio className="w-5 h-5" />,
      active: currentState === 'SIGNAL_DETECTED' || currentState === 'ANALYZING' || currentState === 'POTENTIAL_COVERT_COMMUNICATION' || currentState === 'THREAT_LOGGED',
    },
    {
      id: 'PROPAGATION',
      title: '3. ACOUSTIC PROPAGATION',
      desc: 'Emit near-ultrasonic pulse into physical air medium',
      icon: <Wifi className="w-5 h-5" />,
      active: currentState === 'ANALYZING' || currentState === 'POTENTIAL_COVERT_COMMUNICATION' || currentState === 'THREAT_LOGGED',
    },
    {
      id: 'SOC_DETECTION',
      title: '4. SOC DETECTION & LOG',
      desc: 'Wavelet feature analysis & ledger registration',
      icon: <ShieldAlert className="w-5 h-5" />,
      active: currentState === 'THREAT_LOGGED',
    },
  ];

  return (
    <Card variant="glass" className="p-5 w-full">
      <h3 className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wider mb-4">
        TRANSMISSION & DETECTION PIPELINE LIFECYCLE
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stages.map((stage, idx) => (
          <div
            key={stage.id}
            className={`p-3 rounded-xl border transition-all duration-500 font-mono text-xs relative ${
              stage.active
                ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-200 shadow-lg shadow-cyan-950/40'
                : 'bg-slate-900/60 border-slate-800 text-slate-500'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={stage.active ? 'text-cyan-400' : 'text-slate-500'}>
                {stage.icon}
              </div>
              {stage.active ? (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-slate-700" />
              )}
            </div>

            <div className="font-bold text-slate-200 mb-1">{stage.title}</div>
            <p className="text-[10px] text-slate-400 leading-tight">{stage.desc}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
