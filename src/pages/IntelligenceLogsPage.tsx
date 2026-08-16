import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';
import { Search, Download, Terminal, CheckCircle2, AlertTriangle, ShieldAlert, Cpu } from 'lucide-react';

export const IntelligenceLogsPage: React.FC = () => {
  const [filterLevel, setFilterLevel] = useState<'ALL' | 'INFO' | 'WARN' | 'CRIT'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const currentState = useThreatStore((s) => s.currentState);

  const logs = [
    { id: 'log1', time: '14:22:00.000', level: 'SYS', color: 'text-slate-400', source: 'KERN-01', msg: 'INITIALIZING ULTRASONIC SPECTRUM ENGINE...' },
    { id: 'log2', time: '14:22:00.105', level: 'SYS', color: 'text-slate-400', source: 'NET-AUTH', msg: 'ESTABLISHING SECURE BEAMFORMING UPLINK.' },
    { id: 'log3', time: '14:23:04.221', level: 'INFO', color: 'text-emerald-400', source: 'NODE-04', msg: 'HANDSHAKE ESTABLISHED // INTEGRITY 99.99%' },
    { id: 'log4', time: '14:23:05.890', level: 'INFO', color: 'text-emerald-400', source: 'ROUTER-2', msg: 'CARRIER PHASE ALIGNMENT NOMINAL // CLUSTER B // 21.050 kHz' },
    { id: 'log5', time: '14:23:12.445', level: 'WARN', color: 'text-amber-400 font-bold', source: 'SEC-7G', msg: 'OUT-OF-BAND CARRIER FREQUENCY VARIANCE (+450 Hz)' },
    { id: 'log6', time: '14:23:15.102', level: 'INFO', color: 'text-emerald-400', source: 'SYS-OPS', msg: 'AUTOMATED SUB-CARRIER REROUTING INITIATED...' },
    { id: 'log7', time: '14:23:18.999', level: 'CRIT', color: 'text-rose-400 font-bold', source: 'EXT-FW', msg: 'UNAUTHORIZED ULTRASONIC PAYLOAD INJECTED // FSK BURST DETECTED. INITIATING COUNTER-MEASURES.', isHemorrhage: true },
    { id: 'log8', time: '14:23:20.001', level: 'INFO', color: 'text-emerald-400', source: 'DEF-SYS', msg: 'ACOUSTIC SHIELD PROTOCOL OMEGA ENGAGED.' },
    { id: 'log9', time: '14:24:45.159', level: 'INFO', color: 'text-emerald-400', source: 'DB-MAIN', msg: 'TELEMETRY AUDIT COMPLETED - ZERO DATA LOSS.' },
    { id: 'log10', time: '14:24:45.261', level: 'INFO', color: 'text-slate-300', source: 'BACKUP', msg: 'INDEXING SHA-256 AUDIT FRAGMENTS.' },
  ];

  const filteredLogs = logs.filter((log) => {
    if (filterLevel !== 'ALL' && log.level !== filterLevel) return false;
    if (searchTerm && !log.msg.toLowerCase().includes(searchTerm.toLowerCase()) && !log.source.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleExport = () => {
    const jsonStr = JSON.stringify(filteredLogs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `acoustic-shield-logs-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen w-full text-slate-100 p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-6 z-10 relative font-mono text-xs"
    >
      {/* Page Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="font-display text-3xl font-light text-slate-100 tracking-tight font-sans flex items-center gap-2">
            <Terminal className="w-6 h-6 text-blue-400" />
            <span>Intelligence Threat Records & Audit</span>
          </h1>
          <p className="text-slate-400 text-xs font-mono mt-1">
            IMMUTABLE SYSTEM EVENT STREAM & SHA-256 AUDIT TRAIL
          </p>
        </div>

        <button
          onClick={handleExport}
          className="btn-google-primary text-xs font-mono flex items-center gap-2 py-2 px-4 shadow-lg"
          aria-label="Export audit logs in JSON format"
        >
          <Download className="w-3.5 h-3.5" />
          <span>EXPORT LOGS (JSON)</span>
        </button>
      </header>

      {/* Search & Filter Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search input */}
        <div className="relative flex-grow w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="FILTER LOGS BY PAYLOAD OR SOURCE NODE..."
            className="w-full glass-panel border border-slate-800 rounded-xl px-10 py-2.5 text-slate-100 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-500 font-mono text-xs"
          />
        </div>

        {/* Level Filters */}
        <div className="flex gap-1.5 bg-slate-900/60 p-1 rounded-xl border border-slate-800 shrink-0">
          {(['ALL', 'INFO', 'WARN', 'CRIT'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                filterLevel === lvl ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table Stream */}
      <div className="glass-panel overflow-hidden flex flex-col flex-1 min-h-[460px] rounded-xl border border-slate-800">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 p-3 border-b border-slate-800 bg-slate-900/80 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
          <span className="col-span-3 sm:col-span-2">TIMESTAMP</span>
          <span className="col-span-2 sm:col-span-1">LEVEL</span>
          <span className="col-span-3 sm:col-span-2">SOURCE</span>
          <span className="col-span-4 sm:col-span-7">PAYLOAD & DIAGNOSTIC MSG</span>
        </div>

        {/* Table Rows */}
        <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-1.5">
          <AnimatePresence mode="popLayout">
            {filteredLogs.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`grid grid-cols-12 gap-2 p-2.5 rounded-lg transition-colors border ${
                  item.isHemorrhage
                    ? 'border-rose-500/40 bg-rose-950/20 text-rose-300 font-medium'
                    : 'border-slate-800/40 bg-slate-900/30 hover:bg-slate-800/40 text-slate-200'
                }`}
              >
                <span className="col-span-3 sm:col-span-2 text-slate-400 font-mono">{item.time}</span>
                <span className={`col-span-2 sm:col-span-1 font-bold ${item.color}`}>[{item.level}]</span>
                <span className="col-span-3 sm:col-span-2 font-bold text-slate-200">{item.source}</span>
                <div className="col-span-4 sm:col-span-7 flex items-center gap-2">
                  {item.isHemorrhage && (
                    <span className="px-2 py-0.5 rounded bg-rose-500/30 text-rose-300 text-[10px] font-bold uppercase border border-rose-500/40">
                      CRITICAL ANOMALY
                    </span>
                  )}
                  <span className="truncate">{item.msg}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/60 flex justify-between items-center text-slate-400 text-[11px]">
          <span>SHOWING {filteredLogs.length} OF {logs.length} AUDIT ENTRIES</span>
          <span className="text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            SHA-256 INTEGRITY VERIFIED
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default IntelligenceLogsPage;
