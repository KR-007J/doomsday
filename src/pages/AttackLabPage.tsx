import React from 'react';
import { PayloadForm } from '../components/attack-lab/PayloadForm';
import { TransmissionPipeline } from '../components/attack-lab/TransmissionPipeline';
import { EventLogConsole } from '../components/attack-lab/EventLogConsole';
import { SpectrogramCanvas } from '../components/visualizations/SpectrogramCanvas';

export const AttackLabPage: React.FC = () => {
  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0D0F12] p-4 rounded-xl border border-[#242728]">
        <div>
          <h1 className="text-xl font-bold font-sans tracking-tight text-[#F2F3F5] uppercase">
            ATTACK LAB // ACOUSTIC TRANSMITTER SUITE
          </h1>
          <p className="text-xs font-mono text-[#9AA0A6]">
            Synthesize covert subcarrier modulated acoustic data bursts & test SOC state machine detection responsiveness
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-[#15171B] text-[#3ECF8E] border border-[#242728] px-3 py-1.5 rounded-lg font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#3ECF8E] animate-pulse" />
          SIMULATION ENGINE: ONLINE
        </div>
      </div>

      {/* Pipeline Lifecycle Indicator */}
      <TransmissionPipeline />

      {/* Main Grid: Form Controls vs Real-time Spectrogram */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
        <PayloadForm />
        <SpectrogramCanvas height={340} />
      </div>

      {/* Console Logs */}
      <EventLogConsole />
    </div>
  );
};
