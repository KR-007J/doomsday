import React from 'react';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../features/threat-state-machine/stateMachine';

export const MonitoringDashboard: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const confidence = useThreatStore((s) => s.confidence);
  const peakAmplitude = useThreatStore((s) => s.peakAmplitude);
  const patternType = useThreatStore((s) => s.patternType);
  const threatHistory = useThreatStore((s) => s.threatHistory);
  const selectThreat = useThreatStore((s) => s.selectThreat);

  const config = THREAT_STATE_CONFIGS[currentState];

  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto p-margin-page grid grid-cols-1 md:grid-cols-12 gap-gutter items-start bg-grid-pattern">
      {/* Left Column: Spectrum & Metrics (7 cols) */}
      <div className="col-span-1 md:col-span-7 flex flex-col gap-gutter">
        {/* Live Spectrum Chart Card */}
        <section className="bg-surface border border-outline-variant rounded-lg p-card-padding flex flex-col shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-primary font-bold">Live Signal Spectrum</h2>
            <div className="flex items-center gap-2 px-2 py-1 bg-surface-container-high rounded border border-outline-variant">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="font-label-caps text-label-caps text-on-surface">REC</span>
            </div>
          </div>

          {/* Chart Area (SVG Visualization) */}
          <div className="relative h-[280px] w-full bg-surface-container-lowest border border-outline-variant rounded flex items-end p-4 overflow-hidden group cursor-crosshair">
            {/* Y-Axis Grid/Labels */}
            <div className="absolute left-4 top-4 bottom-4 flex flex-col justify-between text-on-surface-variant font-data-mono text-data-mono z-10 opacity-50">
              <span>0 dB</span>
              <span>-40 dB</span>
              <span>-80 dB</span>
              <span>-120 dB</span>
            </div>

            {/* Simulated Waveform Line (SVG) */}
            <svg className="absolute inset-0 w-full h-full text-primary opacity-80" preserveAspectRatio="none" viewBox="0 0 1000 100">
              <defs>
                <linearGradient id="wave-gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="currentColor" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>

              <path
                d="M0,100 L0,80 Q50,75 100,60 T200,85 T300,40 T400,90 T500,20 T600,70 T700,10 T800,85 T900,50 T1000,75 L1000,100 Z"
                fill="url(#wave-gradient)"
                opacity="0.1"
              />

              <path
                d="M0,80 Q50,75 100,60 T200,85 T300,40 T400,90 T500,20 T600,70 T700,10 T800,85 T900,50 T1000,75"
                fill="none"
                stroke={config.colorHex}
                strokeWidth="1.8"
                vectorEffect="non-scaling-stroke"
              />

              {/* Peak Indicator */}
              <circle className="animate-pulse" cx="700" cy="10" fill={config.colorHex} r="4" />
              <line opacity="0.6" stroke={config.colorHex} strokeDasharray="4" strokeWidth="1" x1="700" x2="700" y1="10" y2="100" />
            </svg>

            {/* X-Axis Labels */}
            <div className="absolute bottom-1 left-12 right-4 flex justify-between text-on-surface-variant font-data-mono text-data-mono z-10 opacity-50 text-[10px]">
              <span>0 kHz</span>
              <span>10 kHz</span>
              <span>20 kHz</span>
              <span>30 kHz</span>
              <span>40 kHz</span>
            </div>
          </div>
        </section>

        {/* Detection Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-stack-gap">
          {/* Metric 1: Confidence */}
          <div className="bg-surface border border-outline-variant rounded-lg p-stack-gap flex flex-col justify-between h-[88px]">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Confidence Level</span>
            <div className="flex items-baseline gap-2">
              <span className="font-data-mono text-[24px] leading-none text-primary font-bold">{confidence.toFixed(1)}</span>
              <span className="font-data-mono text-data-mono text-on-surface-variant">%</span>
            </div>
          </div>

          {/* Metric 2: Risk Level */}
          <div className="bg-surface border border-outline-variant rounded-lg p-stack-gap flex flex-col justify-between h-[88px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-error opacity-10 rounded-bl-full" />
            <span className="font-label-caps text-label-caps text-on-surface-variant">Current Risk</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.colorHex }} />
              <span className="font-data-mono text-[18px] leading-none uppercase tracking-wider font-bold" style={{ color: config.colorHex }}>
                {config.risk}
              </span>
            </div>
          </div>

          {/* Metric 3: Pattern Type */}
          <div className="bg-surface border border-outline-variant rounded-lg p-stack-gap flex flex-col justify-between h-[88px]">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Detected Pattern</span>
            <span className="font-data-mono text-data-mono text-primary truncate font-bold" title={patternType}>
              {patternType}
            </span>
          </div>

          {/* Metric 4: Active Band */}
          <div className="bg-surface border border-outline-variant rounded-lg p-stack-gap flex flex-col justify-between h-[88px]">
            <span className="font-label-caps text-label-caps text-on-surface-variant">Active Freq Band</span>
            <span className="font-data-mono text-data-mono text-primary font-bold">15.2 - 24.5 kHz</span>
          </div>
        </div>
      </div>

      {/* Right Column: Real-time Spectrogram (5 cols) */}
      <div className="col-span-1 md:col-span-5 h-full min-h-[400px]">
        <section className="bg-surface border border-outline-variant rounded-lg p-card-padding flex flex-col h-full shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-primary font-bold">Waterfall Spectrogram</h2>
            <span className="material-symbols-outlined text-on-surface-variant text-sm">water_drop</span>
          </div>

          {/* Spectrogram Visualization Area */}
          <div className="flex-1 w-full min-h-[300px] bg-surface-container-lowest border border-outline-variant rounded relative overflow-hidden flex flex-col">
            {/* Axis Labels */}
            <div className="absolute left-2 top-0 bottom-8 flex flex-col justify-between py-2 text-[10px] text-on-surface-variant font-data-mono z-20">
              <span>T-0s</span>
              <span>T-10s</span>
              <span>T-20s</span>
              <span>T-30s</span>
            </div>

            <div className="absolute bottom-2 left-10 right-2 flex justify-between text-[10px] text-on-surface-variant font-data-mono z-20">
              <span>0k</span>
              <span>10k</span>
              <span>20k</span>
              <span>30k</span>
              <span>40k</span>
            </div>

            {/* Waterfall Heatmap Rows Simulation */}
            <div className="absolute inset-0 top-0 bottom-8 left-10 right-0 bg-surface-container-lowest overflow-hidden z-10 flex flex-col justify-between">
              <div className="w-full h-[15%] bg-gradient-to-r from-transparent via-primary-fixed-dim/10 to-transparent flex items-center border-b border-surface">
                <div className="ml-[30%] w-[10%] h-full bg-secondary-fixed/40" />
                <div className="ml-[40%] w-[5%] h-full bg-error/60" />
              </div>
              <div className="w-full h-[15%] bg-gradient-to-r from-transparent via-transparent to-transparent flex items-center border-b border-surface">
                <div className="ml-[31%] w-[12%] h-full bg-secondary-fixed/30" />
                <div className="ml-[40%] w-[6%] h-full bg-error/70" />
              </div>
              <div className="w-full h-[15%] bg-gradient-to-r from-transparent via-transparent to-transparent flex items-center border-b border-surface">
                <div className="ml-[32%] w-[10%] h-full bg-secondary-fixed/20" />
                <div className="ml-[39%] w-[8%] h-full bg-error/90 border-t border-error" />
              </div>
              <div className="w-full h-[15%] bg-gradient-to-r from-transparent via-transparent to-transparent flex items-center border-b border-surface">
                <div className="ml-[30%] w-[8%] h-full bg-secondary-fixed/10" />
                <div className="ml-[40%] w-[7%] h-full bg-error/80" />
              </div>
              <div className="w-full h-[15%] bg-gradient-to-r from-transparent via-transparent to-transparent flex items-center border-b border-surface">
                <div className="ml-[41%] w-[5%] h-full bg-error/40" />
              </div>
              <div className="w-full h-[15%] flex items-center border-b border-surface" />
              <div className="w-full h-[10%] flex items-center" />

              {/* Scanline Effect */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary/30 shadow-[0_0_8px_rgba(255,255,255,0.5)] animate-scanline z-30" />
            </div>
          </div>
        </section>
      </div>

      {/* Full-Width Bottom: Threat History Table (12 cols) */}
      <div className="col-span-1 md:col-span-12 mt-4">
        <section className="bg-surface border border-outline-variant rounded-lg overflow-hidden shadow-sm">
          {/* Table Header Area */}
          <div className="px-card-padding py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
            <h3 className="font-headline-md text-[18px] font-semibold text-primary">Recent Detections</h3>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded hover:bg-surface-container-high transition-colors font-label-caps text-label-caps text-on-surface-variant cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">filter_list</span>
              FILTER
            </button>
          </div>

          {/* Data Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-outline-variant">
                  <th className="p-stack-gap px-4 font-label-caps text-label-caps text-on-surface-variant w-[180px]">
                    Timestamp (UTC)
                  </th>
                  <th className="p-stack-gap px-4 font-label-caps text-label-caps text-on-surface-variant w-[120px]">
                    Risk Level
                  </th>
                  <th className="p-stack-gap px-4 font-label-caps text-label-caps text-on-surface-variant w-[100px]">
                    Confidence
                  </th>
                  <th className="p-stack-gap px-4 font-label-caps text-label-caps text-on-surface-variant">
                    Pattern Classification
                  </th>
                  <th className="p-stack-gap px-4 font-label-caps text-label-caps text-on-surface-variant w-[140px]">
                    Target Vector
                  </th>
                  <th className="p-stack-gap px-4 w-[60px]" />
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md text-on-surface">
                {threatHistory.slice(0, 6).map((item) => {
                  const isCritical = item.risk === 'HIGH';
                  const isElevated = item.risk === 'MEDIUM';
                  return (
                    <tr
                      key={item.id}
                      onClick={() => selectThreat(item)}
                      className="border-b border-outline-variant hover:bg-surface-container-highest transition-colors cursor-pointer group"
                    >
                      <td className="p-stack-gap px-4 font-data-mono text-data-mono text-on-surface-variant">
                        {new Date(item.timestamp).toISOString().replace('T', ' ').substring(0, 19)}
                      </td>
                      <td className="p-stack-gap px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isCritical ? 'bg-error shadow-[0_0_4px_rgba(255,180,171,0.5)]' : isElevated ? 'bg-[#fcd34d]' : 'bg-secondary'
                            }`}
                          />
                          <span className={isCritical ? 'text-error font-semibold' : isElevated ? 'text-[#fcd34d]' : 'text-secondary'}>
                            {isCritical ? 'Critical' : isElevated ? 'Elevated' : 'Low'}
                          </span>
                        </div>
                      </td>
                      <td className="p-stack-gap px-4 font-data-mono text-data-mono">
                        {(item.confidence * 100).toFixed(1)}%
                      </td>
                      <td className="p-stack-gap px-4 text-primary font-medium">
                        {item.pattern}
                      </td>
                      <td className="p-stack-gap px-4 text-on-surface-variant font-data-mono text-[12px]">
                        {item.locationNode || 'SRV-NODE-01'}
                      </td>
                      <td className="p-stack-gap px-4 text-right">
                        <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                          chevron_right
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
