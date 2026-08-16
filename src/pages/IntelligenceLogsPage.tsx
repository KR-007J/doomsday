import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogEntry {
  id: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  message: string;
}

const mockLogs: LogEntry[] = [
  { id: '1', timestamp: '2026-08-16T10:00:01Z', severity: 'critical', source: 'AudioProcessor', message: 'Inaudible high-frequency anomaly detected.' },
  { id: '2', timestamp: '2026-08-16T10:02:45Z', severity: 'low', source: 'System', message: 'Standard calibration sequence completed.' },
  { id: '3', timestamp: '2026-08-16T10:15:12Z', severity: 'high', source: 'ShieldModule', message: 'Active cancellation deployed against targeted ultrasound pulse.' },
  { id: '4', timestamp: '2026-08-16T10:20:00Z', severity: 'medium', source: 'Network', message: 'Suspicious payload intercepted in encrypted channel.' },
];

export const IntelligenceLogsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');

  const filteredLogs = mockLogs.filter(
    (log) => filter === 'all' || log.severity === filter
  );

  return (
    <div className="min-h-screen pt-24 px-8 pb-12 max-w-7xl mx-auto flex flex-col gap-8 text-white font-primary">
      <header className="flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-display font-medium tracking-tight mb-2">Intelligence Logs</h1>
          <p className="text-white/60 text-sm">Real-time system telemetry and threat detection events.</p>
        </div>
        <div className="flex gap-2 text-sm">
          {['all', 'critical', 'high', 'medium', 'low'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1.5 rounded-md transition-colors ${filter === f ? 'bg-white/20 text-white' : 'bg-transparent text-white/50 hover:bg-white/10 hover:text-white'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <div className="glass-panel rounded-xl overflow-hidden border border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-xs font-mono text-white/40 uppercase tracking-wider">
          <div className="col-span-3">Timestamp</div>
          <div className="col-span-2">Severity</div>
          <div className="col-span-2">Source</div>
          <div className="col-span-5">Message</div>
        </div>
        
        <div className="flex flex-col">
          <AnimatePresence initial={false}>
            {filteredLogs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-12 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors text-sm items-center"
              >
                <div className="col-span-3 font-mono text-white/60 text-xs">{log.timestamp}</div>
                <div className="col-span-2 flex items-center">
                  <span className={`px-2 py-0.5 rounded text-xs font-mono border ${
                    log.severity === 'critical' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                    log.severity === 'high' ? 'border-orange-500/30 text-orange-400 bg-orange-500/10' :
                    log.severity === 'medium' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                    'border-blue-500/30 text-blue-400 bg-blue-500/10'
                  }`}>
                    {log.severity.toUpperCase()}
                  </span>
                </div>
                <div className="col-span-2 text-white/80">{log.source}</div>
                <div className="col-span-5 text-white/90">{log.message}</div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filteredLogs.length === 0 && (
            <div className="p-8 text-center text-white/40 text-sm">
              No logs found for the selected filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
