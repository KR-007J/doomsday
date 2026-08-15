import React from 'react';
import { Card } from '../ui/Card';
import { Radio, Signal, Cpu, Activity, ShieldAlert, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

export const AcousticKpiGrid: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const systemStatus = useThreatStore((s) => s.systemStatus);

  const isThreat = currentState !== 'SAFE';

  const kpis = [
    { label: 'Subcarriers', value: '12', trend: '+8.3%', isUp: true, icon: <Radio className="w-3.5 h-3.5 text-cyan-400" /> },
    { label: 'Mic Arrays', value: '8', trend: '100%', isUp: true, icon: <Cpu className="w-3.5 h-3.5 text-emerald-400" /> },
    { label: 'Active Freq Bins', value: isThreat ? '1,420' : '369', trend: isThreat ? '+312%' : '+4.2%', isUp: true, icon: <Signal className="w-3.5 h-3.5 text-indigo-400" /> },
    { label: 'Dormant Channels', value: isThreat ? '4' : '15', trend: isThreat ? '-73%' : '0.0%', isUp: false, icon: <Activity className="w-3.5 h-3.5 text-amber-400" /> },
    { label: 'FFT Sample Rate', value: '96 kHz', trend: '24-bit', isUp: true, icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
      {kpis.map((kpi) => (
        <Card key={kpi.label} variant="glass" className="p-3 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              {kpi.label}
            </span>
            <div className="p-1 rounded bg-slate-900 border border-slate-800">
              {kpi.icon}
            </div>
          </div>

          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-mono font-bold text-slate-100">{kpi.value}</span>
            <span
              className={`text-[10px] font-mono font-semibold flex items-center gap-0.5 px-1.5 py-0.2 rounded ${
                kpi.isUp
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                  : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
              }`}
            >
              {kpi.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {kpi.trend}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};
