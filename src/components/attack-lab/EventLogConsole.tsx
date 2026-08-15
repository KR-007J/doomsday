import React, { useEffect, useState, useRef } from 'react';
import { Card } from '../ui/Card';
import { Terminal, Trash2 } from 'lucide-react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

interface LogEntry {
  id: string;
  time: string;
  level: 'INFO' | 'WARN' | 'CRITICAL' | 'SUCCESS';
  message: string;
}

export const EventLogConsole: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const confidence = useThreatStore((s) => s.confidence);
  const activeCenter = useThreatStore((s) => s.activeFrequencyCenter);

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      time: new Date().toLocaleTimeString(),
      level: 'INFO',
      message: 'Acoustic Shield Sensor Array initialized. Sampling 96kHz 24-bit PCM stream.',
    },
    {
      id: '2',
      time: new Date(Date.now() - 2000).toLocaleTimeString(),
      level: 'INFO',
      message: 'Baseline noise floor verified at -82.4 dBFS. Threat state machine: SAFE.',
    },
  ]);

  const logEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let level: LogEntry['level'] = 'INFO';
    let msg = '';

    if (currentState === 'SIGNAL_DETECTED') {
      level = 'WARN';
      msg = `Signal anomaly recorded at ${(activeCenter / 1000).toFixed(2)} kHz. Evaluating spectral power.`;
    } else if (currentState === 'ANALYZING') {
      level = 'WARN';
      msg = `Running 512-point FFT & constellation extraction. Confidence score: ${confidence}%.`;
    } else if (currentState === 'POTENTIAL_COVERT_COMMUNICATION') {
      level = 'CRITICAL';
      msg = `Potential covert communication channel detected! High-probability subcarrier FSK constellation.`;
    } else if (currentState === 'THREAT_LOGGED') {
      level = 'CRITICAL';
      msg = `Threat confirmed and registered into immutable security incident audit log!`;
    }

    if (msg) {
      const newEntry: LogEntry = {
        id: Math.random().toString(),
        time: new Date().toLocaleTimeString(),
        level,
        message: msg,
      };
      setLogs((prev) => [...prev.slice(-40), newEntry]);
    }
  }, [currentState, confidence, activeCenter]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const levelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'INFO':
        return 'text-slate-400';
      case 'WARN':
        return 'text-amber-400 font-bold';
      case 'CRITICAL':
        return 'text-rose-400 font-bold';
      case 'SUCCESS':
        return 'text-emerald-400 font-bold';
    }
  };

  return (
    <Card variant="glass" className="p-4 w-full">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wider">
            TRANSMISSION & SOC EVENT LOG CONSOLE
          </span>
        </div>
        <button
          onClick={() => setLogs([])}
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200"
          title="Clear console logs"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="h-44 overflow-y-auto bg-slate-950/90 rounded-lg p-3 border border-slate-800 font-mono text-[11px] space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-2 leading-relaxed">
            <span className="text-slate-600 select-none">[{log.time}]</span>
            <span className={`px-1 rounded text-[9px] bg-slate-900 border border-slate-800 ${levelColor(log.level)}`}>
              {log.level}
            </span>
            <span className="text-slate-300">{log.message}</span>
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </Card>
  );
};
