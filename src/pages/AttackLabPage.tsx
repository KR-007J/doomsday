import React from 'react';
import { PayloadForm } from '../components/attack-lab/PayloadForm';
import { TransmissionPipeline } from '../components/attack-lab/TransmissionPipeline';
import { EventLogConsole } from '../components/attack-lab/EventLogConsole';
import { SpectrogramCanvas } from '../components/visualizations/SpectrogramCanvas';

export const AttackLabPage: React.FC = () => {
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-sans tracking-tight text-slate-100 uppercase">
            ATTACK LAB // ACOUSTIC TRANSMITTER SUITE (MEMBER 2)
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Synthesize covert subcarrier modulated acoustic data bursts & test SOC state machine detection responsiveness
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 px-3 py-1.5 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          SIMULATION ENGINE: ONLINE
        </div>
      </div>

      {/* Pipeline Lifecycle Indicator */}
      <TransmissionPipeline />

      {/* Main Grid: Form Controls vs Real-time Spectrogram */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <PayloadForm />
        <SpectrogramCanvas height={280} />
      </div>

      {/* Console Logs */}
      <EventLogConsole />
    </div>
  );
};
