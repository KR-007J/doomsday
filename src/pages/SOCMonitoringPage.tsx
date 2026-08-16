import React, { useState } from 'react';
import { SpectralWaterfallCanvas } from '../components/visualizations/SpectralWaterfallCanvas';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';

export const SOCMonitoringPage: React.FC = () => {
  const [panelState, setPanelState] = useState<'happy' | 'loading' | 'empty' | 'error'>('happy');
  const currentState = useThreatStore((s) => s.currentState);
  const confidence = useThreatStore((s) => s.confidence);
  const triggerSimulatedAttack = useThreatStore((s) => s.triggerSimulatedAttack);

  const isCritical = currentState === 'THREAT_LOGGED';

  return (
    <div className="flex-grow p-4 md:px-6 max-w-7xl mx-auto w-full flex flex-col gap-4 font-mono text-xs">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pb-2 border-b border-hairline">
        <div>
          <div className="text-[10px] text-tertiary-ui tracking-widest uppercase">
            SIGINT / SIGNAL / ANALYSIS
          </div>
          <h1 className="text-lg font-bold text-primary-ui tracking-tight">
            SIGNAL ID: SIG-X99
          </h1>
        </div>

        {/* State Simulator & View State Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerSimulatedAttack()}
            className="px-3 py-1.5 bg-accent-warn/10 border border-accent-warn text-accent-warn font-bold rounded-card hover:bg-accent-warn/20 transition-colors cursor-pointer uppercase text-[10px]"
          >
            TEST ATTACK VECTOR
          </button>
          <div className="flex bg-surface-2 border border-hairline rounded-card p-0.5 text-[10px]">
            <button
              onClick={() => setPanelState('happy')}
              className={`px-2 py-1 rounded ${panelState === 'happy' ? 'bg-overlay text-primary-ui font-bold' : 'text-tertiary-ui'}`}
            >
              LIVE
            </button>
            <button
              onClick={() => setPanelState('loading')}
              className={`px-2 py-1 rounded ${panelState === 'loading' ? 'bg-overlay text-primary-ui font-bold' : 'text-tertiary-ui'}`}
            >
              LOAD
            </button>
            <button
              onClick={() => setPanelState('empty')}
              className={`px-2 py-1 rounded ${panelState === 'empty' ? 'bg-overlay text-primary-ui font-bold' : 'text-tertiary-ui'}`}
            >
              EMPTY
            </button>
            <button
              onClick={() => setPanelState('error')}
              className={`px-2 py-1 rounded ${panelState === 'error' ? 'bg-overlay text-primary-ui font-bold' : 'text-tertiary-ui'}`}
            >
              ERR
            </button>
          </div>
        </div>
      </div>

      {/* Hero Spectral Waterfall */}
      <SpectralWaterfallCanvas
        height={320}
        threatIntensity={isCritical ? 0.9 : 0.2}
        loading={panelState === 'loading'}
        empty={panelState === 'empty'}
        error={panelState === 'error'}
      />

      {/* 2 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pattern Matching Section */}
        <section className="card-panel p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-base font-semibold text-primary-ui flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary-ui">troubleshoot</span>
              PATTERN MATCHING
            </h2>
            <span className={`px-2 py-1 rounded-sm border text-[11px] font-bold ${
              isCritical
                ? 'border-accent-critical/40 bg-accent-critical/10 text-accent-critical'
                : 'border-accent-warn/40 bg-accent-warn/10 text-accent-warn'
            }`}>
              MATCH: {isCritical ? 'CONFIRMED THREAT (98.4%)' : `LOW CONFIDENCE (${confidence.toFixed(1)}%)`}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-1">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-tertiary-ui uppercase">REFERENCE SIGNATURE</span>
              <span className="text-primary-ui font-bold">BASELINE_ALPHA</span>
              <span className="text-tertiary-ui text-[11px]">DEV: 0.02%</span>
              <div className="h-12 w-full bg-surface-2 rounded-sm border border-hairline flex items-end px-1 gap-1 pb-1 opacity-50">
                <div className="w-full h-[40%] bg-accent-warn/60" />
                <div className="w-full h-[60%] bg-accent-warn/60" />
                <div className="w-full h-[30%] bg-accent-warn/60" />
                <div className="w-full h-[80%] bg-accent-warn/60" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-tertiary-ui uppercase">DETECTED ANOMALY</span>
              <span className="text-accent-critical font-bold">SIG-X99 (THREAT)</span>
              <span className="text-accent-critical text-[11px]">DEV: 87.4%</span>
              <div className="h-12 w-full bg-surface-2 rounded-sm border border-accent-critical/30 bg-accent-critical/5 flex items-end px-1 gap-1 pb-1">
                <div className="w-full h-[90%] bg-accent-critical" />
                <div className="w-full h-[20%] bg-accent-critical" />
                <div className="w-full h-[100%] bg-accent-critical" />
                <div className="w-full h-[40%] bg-accent-critical" />
              </div>
            </div>
          </div>
        </section>

        {/* Metadata Table Section */}
        <section className="card-panel p-4 flex flex-col gap-4">
          <h2 className="font-sans text-base font-semibold text-primary-ui flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] border border-accent-warn/40 bg-accent-warn/10 text-accent-warn">
              database
            </span>
            METADATA
          </h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-hairline pt-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-tertiary-ui uppercase mb-0.5">ORIGIN NODE</span>
              <span className="text-primary-ui font-bold">SEC-7::NODE-A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-tertiary-ui uppercase mb-0.5">TRANSMISSION CADENCE</span>
              <span className="text-primary-ui font-bold">IRREGULAR (BURST)</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-tertiary-ui uppercase mb-0.5">CENTER FREQUENCY</span>
              <span className="text-primary-ui font-bold">14.052 GHz</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-tertiary-ui uppercase mb-0.5">BANDWIDTH</span>
              <span className="text-primary-ui font-bold">120.0 MHz</span>
            </div>
            <div className="flex flex-col col-span-2 mt-1">
              <span className="text-[10px] text-tertiary-ui uppercase mb-1">ENCRYPTION LAYER</span>
              <span className="text-accent-critical bg-accent-critical/10 px-3 py-1.5 rounded-sm border border-accent-critical/30 font-bold inline-block w-fit">
                AES-256 (GCM) // KEY UNKNOWN
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <section className="flex gap-4 mt-2">
        <button className="flex-1 bg-surface-2 border border-hairline hover:bg-overlay text-primary-ui font-mono py-4 rounded-card text-sm tracking-widest flex items-center justify-center gap-2 cursor-pointer font-bold">
          <span className="material-symbols-outlined">visibility</span>
          <span>MONITOR</span>
        </button>

        <button className={`flex-1 font-mono py-4 rounded-card text-sm tracking-widest flex items-center justify-center gap-2 cursor-pointer font-bold ${
          isCritical
            ? 'bg-accent-critical text-white border border-accent-critical shadow-elevation-3'
            : 'bg-surface-2 border border-hairline text-secondary-ui hover:text-primary-ui'
        }`}>
          <span className="material-symbols-outlined">warning</span>
          <span>NEUTRALIZE</span>
        </button>
      </section>
    </div>
  );
};
