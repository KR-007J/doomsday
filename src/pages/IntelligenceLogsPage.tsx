import React, { useState } from 'react';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';

export const IntelligenceLogsPage: React.FC = () => {
  const [filterLevel, setFilterLevel] = useState<'ALL' | 'INFO' | 'WARN' | 'CRIT'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const currentState = useThreatStore((s) => s.currentState);

  const logs = [
    { time: '12:00:00.000', level: 'SYS', color: 'text-tertiary-ui', source: 'KERN-01', msg: 'INITIALIZING TERMINAL INTERFACE...' },
    { time: '12:00:00.105', level: 'SYS', color: 'text-tertiary-ui', source: 'NET-AUTH', msg: 'ESTABLISHING SECURE CONNECTION TO UPLINK.' },
    { time: '12:01:04.221', level: 'INFO', color: 'text-accent-safe', source: 'NODE-04', msg: 'HANDSHAKE ESTABLISHED // INTEGRITY 99.9%' },
    { time: '12:01:05.890', level: 'INFO', color: 'text-accent-safe', source: 'ROUTER-2', msg: 'PACKET ROUTING NOMINAL // CLUSTER B // 14.052 GHz' },
    { time: '12:01:12.445', level: 'WARN', color: 'text-accent-warn font-bold', source: 'SEC-7G', msg: 'LATENCY SPIKE DETECTED - 450ms' },
    { time: '12:01:15.102', level: 'INFO', color: 'text-accent-safe', source: 'SYS-OPS', msg: 'AUTOMATED REROUTING INITIATED...' },
    {
      time: '12:01:18.999',
      level: 'CRIT',
      color: 'text-accent-critical font-bold',
      source: 'EXT-FW',
      msg: 'UNAUTHORIZED ACCESS ATTEMPT // SOURCE IP SPOOFED. ENCRYPTED PAYLOAD INTERCEPTED. INITIATING COUNTER-MEASURES AT COORD 34.0522°N.',
      isHemorrhage: true,
    },
    { time: '12:01:20.001', level: 'INFO', color: 'text-accent-safe', source: 'DEF-SYS', msg: 'FIREWALL PROTOCOL OMEGA ENGAGED.' },
    { time: '12:02:45.159', level: 'INFO', color: 'text-accent-safe', source: 'DB-MAIN', msg: 'SUBSYSTEM DIAGNOSTIC COMPLETED - 0 ERRORS.' },
    { time: '12:02:45.261', level: 'INFO', color: 'text-accent-safe', source: 'BACKUP', msg: 'INDEXING NEW ARCHIVE FRAGMENTS.' },
    { time: '12:02:45.669', level: 'INFO', color: 'text-accent-safe', source: 'SEC-FW', msg: 'SSL CERTIFICATE RENEWAL VERIFIED.' },
  ];

  const filteredLogs = logs.filter((log) => {
    if (filterLevel !== 'ALL' && log.level !== filterLevel) return false;
    if (searchTerm && !log.msg.toLowerCase().includes(searchTerm.toLowerCase()) && !log.source.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex-grow p-4 md:px-6 max-w-7xl mx-auto w-full flex flex-col gap-4 font-mono text-xs">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 pb-2 border-b border-hairline">
        <div>
          <h1 className="text-xl font-bold text-primary-ui tracking-tight font-sans flex items-center gap-2">
            INTELLIGENCE LOGS
            <span className="material-symbols-outlined text-tertiary-ui text-base cursor-help" title="Real-time system log stream">
              info
            </span>
          </h1>
        </div>

        {/* Level Filters */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterLevel('ALL')}
            className={`px-3 py-1.5 border rounded-card transition-colors cursor-pointer uppercase ${
              filterLevel === 'ALL' ? 'bg-surface-2 border-hairline text-primary-ui font-bold' : 'border-hairline text-tertiary-ui hover:text-primary-ui'
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setFilterLevel('INFO')}
            className={`px-3 py-1.5 border rounded-card transition-colors cursor-pointer uppercase ${
              filterLevel === 'INFO' ? 'bg-accent-safe/10 border-accent-safe text-accent-safe font-bold' : 'border-hairline text-tertiary-ui hover:text-accent-safe'
            }`}
          >
            INFO
          </button>
          <button
            onClick={() => setFilterLevel('WARN')}
            className={`px-3 py-1.5 border rounded-card transition-colors cursor-pointer uppercase ${
              filterLevel === 'WARN' ? 'bg-accent-warn/10 border-accent-warn text-accent-warn font-bold' : 'border-hairline text-tertiary-ui hover:text-accent-warn'
            }`}
          >
            WARN
          </button>
          <button
            onClick={() => setFilterLevel('CRIT')}
            className={`px-3 py-1.5 border rounded-card transition-colors cursor-pointer uppercase ${
              filterLevel === 'CRIT' ? 'bg-accent-critical/10 border-accent-critical text-accent-critical font-bold' : 'border-hairline text-tertiary-ui hover:text-accent-critical'
            }`}
          >
            CRIT
          </button>
        </div>
      </div>

      {/* Search Bar & Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-grow w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-tertiary-ui text-[16px]">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="FILTER LOGS..."
            className="w-full bg-surface-2 border border-hairline rounded-card px-10 py-2.5 text-primary-ui focus:outline-none focus:border-accent-safe transition-colors placeholder:text-tertiary-ui"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 border border-hairline rounded bg-surface-1 text-[10px] text-tertiary-ui">
            <span>⌘</span><span>K</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 border border-hairline rounded-card bg-surface-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-accent-safe animate-pulse" />
          <span className="text-primary-ui text-[11px] font-bold">Omniscience Active</span>
        </div>

        <button className="bg-accent-neutral text-canvas font-bold px-4 py-2.5 rounded-card uppercase tracking-wider hover:bg-white transition-colors cursor-pointer shrink-0 flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
          <span>DEPLOY NODE</span>
        </button>
      </div>

      {/* Log Output Stream Container */}
      <div className="card-panel overflow-hidden flex flex-col flex-1 min-h-[420px]">
        {/* Table Column Headers */}
        <div className="grid grid-cols-12 gap-2 p-3 border-b border-hairline bg-surface-2 text-tertiary-ui font-bold text-[10px] uppercase tracking-wider">
          <span className="col-span-3 sm:col-span-2">TIMESTAMP</span>
          <span className="col-span-2 sm:col-span-1">LEVEL</span>
          <span className="col-span-3 sm:col-span-2">SOURCE</span>
          <span className="col-span-4 sm:col-span-7">PAYLOAD</span>
        </div>

        {/* Log Entries */}
        <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-1.5">
          {filteredLogs.map((item, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-12 gap-2 p-2 rounded transition-colors ${
                item.isHemorrhage
                  ? 'border-l-4 border-accent-critical bg-accent-critical/10 text-accent-critical my-1'
                  : 'hover:bg-surface-2 text-secondary-ui'
              }`}
            >
              <span className="col-span-3 sm:col-span-2 text-tertiary-ui font-mono">{item.time}</span>
              <span className={`col-span-2 sm:col-span-1 ${item.color}`}>[{item.level}]</span>
              <span className="col-span-3 sm:col-span-2 font-bold text-primary-ui">{item.source}</span>
              <div className="col-span-4 sm:col-span-7 flex flex-col gap-1">
                {item.isHemorrhage && (
                  <span className="bg-accent-critical text-white text-[9px] font-bold px-2 py-0.5 rounded w-fit uppercase">
                    ACTIVE HEMORRHAGE
                  </span>
                )}
                <span className="text-primary-ui truncate">{item.msg}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Log Table Footer */}
        <div className="p-3 border-t border-hairline bg-surface-2 flex justify-between items-center text-tertiary-ui text-[10px]">
          <span>SHOWING {filteredLogs.length} OF 1,204 EVENTS</span>
          <div className="flex gap-2 text-secondary-ui">
            <button className="hover:text-primary-ui cursor-pointer">&lt; PREV</button>
            <button className="hover:text-primary-ui cursor-pointer">NEXT &gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};
