import React from 'react';
import { Card } from '../ui/Card';
import { Activity, ShieldAlert, Radio, Volume2, Cpu } from 'lucide-react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';

export const MetricsGrid: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const confidence = useThreatStore((s) => s.confidence);
  const activeCenter = useThreatStore((s) => s.activeFrequencyCenter);
  const peakAmplitude = useThreatStore((s) => s.peakAmplitude);
  const patternType = useThreatStore((s) => s.patternType);
  const systemStatus = useThreatStore((s) => s.systemStatus);

  const config = THREAT_STATE_CONFIGS[currentState];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {/* Tile 1: Detection Confidence */}
      <Card variant="glass" className="p-4 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            DETECTION CONFIDENCE
          </span>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-3xl font-mono font-bold text-slate-100 flex items-baseline gap-1">
            <span style={{ color: config.colorHex }}>{confidence}</span>
            <span className="text-sm text-slate-400">%</span>
          </div>
          <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden border border-slate-800">
            <div
              className="h-full transition-all duration-500 rounded-full"
              style={{
                width: `${confidence}%`,
                backgroundColor: config.colorHex,
              }}
            />
          </div>
        </div>
      </Card>

      {/* Tile 2: Threat Risk Level */}
      <Card variant="glass" className="p-4 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            RISK ASSESSMENT
          </span>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <ShieldAlert className="w-4 h-4" style={{ color: config.colorHex }} />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-mono font-bold uppercase tracking-wider flex items-center gap-2">
            <span style={{ color: config.colorHex }}>{config.risk}</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-normal">
              {currentState.replace(/_/g, ' ')}
            </span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-2 truncate">
            {config.label}
          </p>
        </div>
      </Card>

      {/* Tile 3: Active Frequency Band */}
      <Card variant="glass" className="p-4 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            ACTIVE FREQUENCY BAND
          </span>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <Radio className="w-4 h-4 text-indigo-400" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-mono font-bold text-slate-100">
            {(activeCenter / 1000).toFixed(2)} <span className="text-sm font-normal text-slate-400">kHz</span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-2 flex items-center gap-2">
            <span>Band: {((activeCenter - 1000) / 1000).toFixed(1)}k - {((activeCenter + 1000) / 1000).toFixed(1)}k Hz</span>
          </p>
        </div>
      </Card>

      {/* Tile 4: Signal Pattern & Amplitude */}
      <Card variant="glass" className="p-4 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
            PEAK AMPLITUDE & PATTERN
          </span>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <Volume2 className="w-4 h-4 text-rose-400" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-mono font-bold text-slate-100">
            {peakAmplitude} <span className="text-sm font-normal text-slate-400">dBFS</span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-2 truncate" title={patternType}>
            {patternType}
          </p>
        </div>
      </Card>
    </div>
  );
};
