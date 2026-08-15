import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';

export const SpectrumChart: React.FC = () => {
  const spectrumPoints = useThreatStore((s) => s.spectrumPoints);
  const currentState = useThreatStore((s) => s.currentState);
  const activeFreqCenter = useThreatStore((s) => s.activeFrequencyCenter);

  const stateConfig = THREAT_STATE_CONFIGS[currentState];

  return (
    <div className="relative w-full h-[220px] bg-slate-950/80 rounded-lg p-2 border border-slate-800">
      <div className="flex justify-between items-center px-2 mb-1">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          LIVE SPECTRUM (FREQUENCY vs AMPLITUDE)
        </span>
        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-500" /> Noise Floor (-80 dBFS)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stateConfig.colorHex }} /> Active Signal
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={spectrumPoints} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="spectrumGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={stateConfig.colorHex} stopOpacity={0.5} />
              <stop offset="95%" stopColor={stateConfig.colorHex} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="frequency"
            tickFormatter={(val) => `${(val / 1000).toFixed(1)}k`}
            stroke="#475569"
            tick={{ fontSize: 10, fill: '#94a3b8' }}
          />
          <YAxis
            domain={[-90, -20]}
            stroke="#475569"
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            unit="dB"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: stateConfig.colorHex,
              borderRadius: '8px',
              color: '#f8fafc',
              fontSize: '12px',
              fontFamily: 'monospace',
            }}
            formatter={(value: number) => [`${value} dBFS`, 'Amplitude']}
            labelFormatter={(label: number) => `Freq: ${label} Hz`}
          />
          <ReferenceLine
            y={-50}
            stroke="#dc2626"
            strokeDasharray="3 3"
            label={{ value: 'Detection Threshold (-50dB)', fill: '#ef4444', fontSize: 9 }}
          />
          {currentState !== 'SAFE' && (
            <ReferenceLine
              x={activeFreqCenter}
              stroke={stateConfig.colorHex}
              strokeWidth={2}
              label={{ value: 'Subcarrier Peak', fill: stateConfig.colorHex, fontSize: 9, position: 'top' }}
            />
          )}
          <Area
            type="monotone"
            dataKey="amplitude"
            stroke={stateConfig.colorHex}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#spectrumGradient)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
