import React from 'react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { Card } from '../ui/Card';
import { X, ShieldAlert, Radio, Cpu, FileText, CheckCircle2 } from 'lucide-react';

export const ThreatDetailDrawer: React.FC = () => {
  const selectedThreat = useThreatStore((s) => s.selectedThreat);
  const selectThreat = useThreatStore((s) => s.selectThreat);

  if (!selectedThreat) return null;

  return (
    <Card variant="glass" className="p-5 w-full border-cyan-500/30 relative">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-rose-950/80 border border-rose-800/60 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-mono font-bold text-slate-100 uppercase">
              INCIDENT DETAIL // {selectedThreat.id}
            </h3>
            <p className="text-xs font-mono text-slate-400">
              Registered at {new Date(selectedThreat.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
        <button
          onClick={() => selectThreat(null)}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
          <span className="text-slate-400 block mb-1">RISK LEVEL & CONFIDENCE</span>
          <div className="text-lg font-bold text-rose-400">
            {selectedThreat.risk} ({Math.round(selectedThreat.confidence * 100)}%)
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">
            Algorithm: Acoustic Wavelet Constellation
          </span>
        </div>

        <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
          <span className="text-slate-400 block mb-1">FREQUENCY SPECTRUM</span>
          <div className="text-lg font-bold text-cyan-400">
            {(selectedThreat.peakFrequency / 1000).toFixed(2)} kHz
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">
            Band: {(selectedThreat.frequency.min / 1000).toFixed(1)}k - {(selectedThreat.frequency.max / 1000).toFixed(1)}k Hz
          </span>
        </div>

        <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
          <span className="text-slate-400 block mb-1">AMPLITUDE & DURATION</span>
          <div className="text-lg font-bold text-indigo-300">
            {selectedThreat.amplitude} dBFS
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">
            Duration: {selectedThreat.duration}s burst
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
          <span className="text-slate-400 block mb-1 flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" /> SENSOR LOCATION NODE
          </span>
          <p className="text-slate-200 font-semibold">{selectedThreat.locationNode}</p>
        </div>

        <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
          <span className="text-slate-400 block mb-1 flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-indigo-400" /> MODULATION PATTERN
          </span>
          <p className="text-slate-200 font-semibold">{selectedThreat.pattern}</p>
        </div>
      </div>

      {selectedThreat.payloadSummary && (
        <div className="mt-4 bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs">
          <span className="text-slate-400 block mb-1 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-amber-400" /> RECONSTRUCTED PAYLOAD HEADER
          </span>
          <code className="text-amber-300 bg-slate-900 px-2 py-1 rounded block border border-slate-800 overflow-x-auto mt-1">
            {selectedThreat.payloadSummary}
          </code>
        </div>
      )}
    </Card>
  );
};
