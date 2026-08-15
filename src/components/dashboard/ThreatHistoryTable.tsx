import React, { useState } from 'react';
import { ThreatEvent, RiskLevel } from '../../types/threat';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { Card } from '../ui/Card';
import { Filter, Search, ChevronRight, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ThreatHistoryTable: React.FC = () => {
  const threatHistory = useThreatStore((s) => s.threatHistory);
  const selectedThreat = useThreatStore((s) => s.selectedThreat);
  const selectThreat = useThreatStore((s) => s.selectThreat);

  const [riskFilter, setRiskFilter] = useState<'ALL' | RiskLevel>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredThreats = threatHistory.filter((item) => {
    const matchesRisk = riskFilter === 'ALL' || item.risk === riskFilter;
    const matchesSearch =
      item.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pattern.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.locationNode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'HIGH':
        return 'bg-rose-950/80 text-rose-400 border-rose-800/60';
      case 'MEDIUM':
        return 'bg-amber-950/80 text-amber-400 border-amber-800/60';
      case 'LOW':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60';
    }
  };

  return (
    <Card variant="glass" className="p-4 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-mono font-bold text-slate-100 uppercase tracking-wider">
            ACOUSTIC INCIDENT AUDIT LOG ({filteredThreats.length})
          </h3>
          <p className="text-xs font-mono text-slate-400">
            Real-time registered threat signatures in security ledger
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search pattern/node..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRiskFilter(r)}
                className={`px-2 py-1 rounded text-[10px] font-mono font-semibold transition-colors ${
                  riskFilter === r
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-2.5 px-3">INCIDENT ID</th>
              <th className="py-2.5 px-3">TIMESTAMP</th>
              <th className="py-2.5 px-3">RISK</th>
              <th className="py-2.5 px-3">CONFIDENCE</th>
              <th className="py-2.5 px-3">PEAK FREQ</th>
              <th className="py-2.5 px-3">MODULATION PATTERN</th>
              <th className="py-2.5 px-3">NODE</th>
              <th className="py-2.5 px-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filteredThreats.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500">
                  No matching acoustic threat incidents found.
                </td>
              </tr>
            ) : (
              filteredThreats.map((threat) => {
                const isSelected = selectedThreat?.id === threat.id;
                return (
                  <tr
                    key={threat.id}
                    onClick={() => selectThreat(threat)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-cyan-950/40 text-cyan-200 border-l-2 border-l-cyan-400'
                        : 'hover:bg-slate-900/50'
                    }`}
                  >
                    <td className="py-3 px-3 font-bold text-slate-100">{threat.id}</td>
                    <td className="py-3 px-3 text-slate-400">
                      {new Date(threat.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded border text-[10px] ${getRiskBadge(threat.risk)}`}>
                        {threat.risk}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold">
                      {Math.round(threat.confidence * 100)}%
                    </td>
                    <td className="py-3 px-3 text-cyan-400">
                      {(threat.peakFrequency / 1000).toFixed(2)} kHz
                    </td>
                    <td className="py-3 px-3 truncate max-w-[180px]" title={threat.pattern}>
                      {threat.pattern}
                    </td>
                    <td className="py-3 px-3 text-slate-400 truncate max-w-[140px]">
                      {threat.locationNode}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
