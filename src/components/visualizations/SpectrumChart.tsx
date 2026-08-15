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
    <div className="relative w-full h-[220px] bg-[#0D0F12] rounded-xl p-3 border border-[#242728] shadow-lg">
      <div className="flex justify-between items-center px-1 mb-1 font-mono text-[10px]">
        <span className="text-slate-400 uppercase font-semibold">
          LIVE SPECTRUM (FREQUENCY vs AMPLITUDE)
        </span>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-600" /> Noise Floor (-80 dBFS)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stateConfig.colorHex }} /> Active Subcarrier
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="82%">
        <AreaChart data={spectrumPoints} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="spectrumGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={stateConfig.colorHex} stopOpacity={0.4} />
              <stop offset="95%" stopColor={stateConfig.colorHex} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="frequency"
            tickFormatter={(val) => `${(val / 1000).toFixed(1)}k`}
            stroke="#5C6167"
            tick={{ fontSize: 10, fill: '#9AA0A6' }}
          />
          <YAxis
            domain={[-90, -20]}
            stroke="#5C6167"
            tick={{ fontSize: 10, fill: '#9AA0A6' }}
            unit="dB"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1B1E23',
              borderColor: '#242728',
              borderRadius: '8px',
              color: '#F2F3F5',
              fontSize: '11px',
              fontFamily: 'monospace',
            }}
            formatter={(value: number) => [`${value} dBFS`, 'Amplitude']}
            labelFormatter={(label: number) => `Freq: ${label} Hz`}
          />
          <ReferenceLine
            y={-50}
            stroke="#FF5C5C"
            strokeDasharray="3 3"
            label={{ value: 'Threshold (-50dB)', fill: '#FF5C5C', fontSize: 9 }}
          />
          {currentState !== 'SAFE' && (
            <ReferenceLine
              x={activeFreqCenter}
              stroke={stateConfig.colorHex}
              strokeWidth={2}
              label={{ value: 'Peak', fill: stateConfig.colorHex, fontSize: 9, position: 'top' }}
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
