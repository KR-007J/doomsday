import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';

export const IntelligenceLogsPage: React.FC = () => {
  const [filterLevel, setFilterLevel] = useState<'ALL' | 'INFO' | 'WARN' | 'CRIT'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const currentState = useThreatStore((s) => s.currentState);

  const logs = [
    { id: 'log1', time: '12:00:00.000', level: 'SYS', color: 'text-tertiary-ui', source: 'KERN-01', msg: 'Initializing terminal interface...' },
    { id: 'log2', time: '12:00:00.105', level: 'SYS', color: 'text-tertiary-ui', source: 'NET-AUTH', msg: 'Establishing secure connection to uplink.' },
    { id: 'log3', time: '12:01:04.221', level: 'INFO', color: 'text-accent-safe', source: 'NODE-04', msg: 'Handshake established. Integrity nominal.' },
    { id: 'log4', time: '12:01:05.890', level: 'INFO', color: 'text-accent-safe', source: 'ROUTER-2', msg: 'Packet routing nominal across Cluster B.' },
    { id: 'log5', time: '12:01:12.445', level: 'WARN', color: 'text-accent-warn', source: 'SEC-7G', msg: 'Latency spike detected: 450ms' },
    { id: 'log6', time: '12:01:15.102', level: 'INFO', color: 'text-accent-safe', source: 'SYS-OPS', msg: 'Automated rerouting initiated.' },
    { id: 'log7', time: '12:01:18.999', level: 'CRIT', color: 'text-accent-critical', source: 'EXT-FW', msg: 'Unauthorized access attempt. Source IP spoofed. Encrypted payload intercepted.', isHemorrhage: true },
    { id: 'log8', time: '12:01:20.001', level: 'INFO', color: 'text-accent-safe', source: 'DEF-SYS', msg: 'Firewall protocol engaged.' },
    { id: 'log9', time: '12:02:45.159', level: 'INFO', color: 'text-accent-safe', source: 'DB-MAIN', msg: 'Subsystem diagnostic completed.' },
    { id: 'log10', time: '12:02:45.261', level: 'INFO', color: 'text-accent-safe', source: 'BACKUP', msg: 'Indexing new archive fragments.' },
    { id: 'log11', time: '12:02:45.669', level: 'INFO', color: 'text-accent-safe', source: 'SEC-FW', msg: 'SSL certificate renewal verified.' },
  ];

  const filteredLogs = logs.filter((log) => {
    if (filterLevel !== 'ALL' && log.level !== filterLevel) return false;
    if (searchTerm && !log.msg.toLowerCase().includes(searchTerm.toLowerCase()) && !log.source.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex-grow p-4 md:px-8 max-w-[1400px] mx-auto w-full flex flex-col gap-6 font-mono text-xs">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-hairline">
        <div>
          <h1 className="text-xl text-primary-ui tracking-tight font-sans font-medium flex items-center gap-2">
            Intelligence Logs
          </h1>
          <p className="text-tertiary-ui font-mono mt-1">Real-time system event stream</p>
        </div>

        {/* Level Filters */}
        <div className="flex gap-1 p-1 bg-surface-1 border border-hairline rounded-sm">
          {['ALL', 'INFO', 'WARN', 'CRIT'].map(level => (
            <button
              key={level}
              onClick={() => setFilterLevel(level as any)}
              className={`px-4 py-1.5 rounded-sm transition-colors cursor-pointer ${
                filterLevel === level 
                  ? 'bg-surface-2 text-primary-ui shadow-sm border border-hairline' 
                  : 'text-tertiary-ui hover:text-primary-ui hover:bg-surface-2/50 border border-transparent'
              }`}
            >
              {level}
            </button>
          ))}
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
            placeholder="Filter logs by source or message..."
            className="w-full bg-surface-1 border border-hairline rounded-sm px-10 py-2.5 text-primary-ui focus:outline-none focus:border-text-secondary transition-colors placeholder:text-tertiary-ui"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 border border-hairline rounded-sm bg-surface-2 text-[10px] text-tertiary-ui">
            <span>⌘</span><span>K</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 border border-hairline rounded-sm bg-surface-1 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-safe" />
          <span className="text-secondary-ui text-xs">Monitoring Active</span>
        </div>

        <button className="bg-primary-ui text-canvas px-6 py-2.5 rounded-sm transition-colors cursor-pointer shrink-0 flex items-center gap-2 hover:bg-white">
          <span>Export Logs</span>
        </button>
      </div>

      {/* Log Output Stream Container */}
      <div className="bg-surface-1 overflow-hidden flex flex-col flex-1 min-h-[500px] border border-hairline rounded-sm">
        {/* Table Column Headers */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-hairline bg-surface-2 text-tertiary-ui text-xs">
          <span className="col-span-3 sm:col-span-2">Timestamp</span>
          <span className="col-span-2 sm:col-span-1">Level</span>
          <span className="col-span-3 sm:col-span-2">Source</span>
          <span className="col-span-4 sm:col-span-7">Event Payload</span>
        </div>

        {/* Log Entries */}
        <div className="flex-1 p-2 overflow-y-auto flex flex-col relative">
          <AnimatePresence>
            {filteredLogs.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className={`grid grid-cols-12 gap-4 px-2 py-2.5 border-b border-hairline/50 last:border-0 transition-colors ${
                  item.isHemorrhage
                    ? 'bg-accent-critical/5 border-l-2 border-l-accent-critical text-primary-ui'
                    : 'hover:bg-surface-2 text-secondary-ui border-l-2 border-l-transparent'
                }`}
              >
                <span className="col-span-3 sm:col-span-2 text-tertiary-ui">{item.time}</span>
                <span className={`col-span-2 sm:col-span-1 ${item.color}`}>{item.level}</span>
                <span className="col-span-3 sm:col-span-2 text-primary-ui">{item.source}</span>
                <div className="col-span-4 sm:col-span-7 flex flex-col gap-1">
                  {item.isHemorrhage && (
                    <span className="text-accent-critical text-[10px] uppercase font-medium tracking-wide">
                      Critical Event Logged
                    </span>
                  )}
                  <span className="text-primary-ui truncate">{item.msg}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Log Table Footer */}
        <div className="px-4 py-3 border-t border-hairline bg-surface-2 flex justify-between items-center text-tertiary-ui">
          <span>Showing {filteredLogs.length} of 1,204 events</span>
          <div className="flex gap-2 text-secondary-ui">
            <button className="hover:text-primary-ui cursor-pointer px-2 py-1 rounded-sm transition-colors">Previous</button>
            <button className="hover:text-primary-ui cursor-pointer px-2 py-1 rounded-sm transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
