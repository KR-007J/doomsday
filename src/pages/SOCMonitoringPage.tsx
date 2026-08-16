import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';
import { SpectralWaterfallCanvas } from '../components/visualizations/SpectralWaterfallCanvas';
import { RadarSweepCanvas } from '../components/visualizations/RadarSweepCanvas';
import { Shield, AlertTriangle, CheckCircle, Activity, RefreshCw, Zap } from 'lucide-react';

export const SOCMonitoringPage: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const activeThreat = useThreatStore((s) => s.activeThreat);
  const triggerSimulatedAttack = useThreatStore((s) => s.triggerSimulatedAttack);
  const resetThreatState = useThreatStore((s) => s.resetThreatState);

  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'nominal'>('all');

  const threatEvents = [
    { id: 'EVT-992', title: 'Ultrasonic FSK Burst Intercepted (21.4 kHz)', severity: 'critical', time: 'Just now', vector: 'NODE-04' },
    { id: 'EVT-991', title: 'Out-Of-Band Carrier Phase Shift', severity: 'warning', time: '4m ago', vector: 'NODE-12' },
    { id: 'EVT-990', title: 'Acoustic Transceiver Mesh Sync Complete', severity: 'nominal', time: '12m ago', vector: 'NODE-01' },
    { id: 'EVT-989', title: 'Sub-Carrier Frequency Calibration', severity: 'nominal', time: '45m ago', vector: 'GLOBAL' },
  ];

  const filteredEvents = threatEvents.filter(e => {
    if (activeFilter === 'critical') return e.severity === 'critical' || e.severity === 'warning';
    if (activeFilter === 'nominal') return e.severity === 'nominal';
    return true;
  });

  const handleSimulateAttack = () => {
    triggerSimulatedAttack({
      payload: '0x41 0x43 0x4F 0x55 0x53 0x54 0x49 0x43 0x5F 0x54 0x48 0x52 0x45 0x41 0x54',
      frequencyMin: 20000,
      frequencyMax: 22000,
      duration: 5.0
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen w-full text-slate-100 p-4 md:p-8 max-w-7xl mx-auto flex flex-col gap-6 z-10 relative"
    >
      {/* Header Bar */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-3xl font-light text-slate-100 tracking-tight">
              SOC Security Operations Center
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono border ${
              currentState === 'THREAT_LOGGED' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30 animate-pulse' :
              currentState === 'ANALYZING' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
              'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            }`}>
              {currentState}
            </span>
          </div>
          <p className="text-slate-400 text-xs font-mono mt-1">
            REAL-TIME ULTRASONIC SIGNAL SPECTRUM & INCIDENT RESPONSE GRID
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateAttack}
            className="btn-google-primary text-xs font-mono flex items-center gap-2 py-2 px-4 shadow-lg"
            aria-label="Simulate Ultrasonic Threat Burst"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Simulate Threat Burst</span>
          </button>
          
          <button
            onClick={resetThreatState}
            className="glass-panel px-3 py-2 rounded-lg text-slate-300 hover:text-white font-mono text-xs flex items-center gap-1.5 border border-slate-700 hover:border-slate-500"
            aria-label="Reset Threat State to Nominal"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Grid</span>
          </button>
        </div>
      </header>

      {/* Main 12-Col Dashboard Grid */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Column: Spectral Waterfall Canvas & Live Visualizer (8 cols) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <div className="glass-panel p-5 rounded-xl border border-slate-800 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <h2 className="font-display text-xl text-slate-200">Spectral Waterfall Telemetry</h2>
              </div>
              <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
                <span>BAND: 18 - 24 kHz</span>
                <span className="text-emerald-400">FPS: 60</span>
              </div>
            </div>
            
            {/* Waterfall Canvas Container */}
            <div className="h-64 w-full rounded-lg overflow-hidden border border-slate-800 bg-slate-950/80 relative">
              <SpectralWaterfallCanvas />
            </div>
          </div>

          {/* Active Incident Feed */}
          <div className="glass-panel p-5 rounded-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <h2 className="font-display text-xl text-slate-200">Incident Event Feed</h2>
              
              <div className="flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-lg border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1 rounded-md transition-colors ${activeFilter === 'all' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  ALL
                </button>
                <button
                  onClick={() => setActiveFilter('critical')}
                  className={`px-3 py-1 rounded-md transition-colors ${activeFilter === 'critical' ? 'bg-amber-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  THREATS
                </button>
                <button
                  onClick={() => setActiveFilter('nominal')}
                  className={`px-3 py-1 rounded-md transition-colors ${activeFilter === 'nominal' ? 'bg-emerald-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  NOMINAL
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((evt) => (
                  <motion.div
                    key={evt.id}
                    layout
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center justify-between p-3.5 rounded-lg border border-slate-800/80 bg-slate-900/40 hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {evt.severity === 'critical' ? (
                        <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                      ) : evt.severity === 'warning' ? (
                        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      )}
                      <div>
                        <div className="text-sm font-medium text-slate-200">{evt.title}</div>
                        <div className="text-xs font-mono text-slate-500">ID: {evt.id} • VECTOR: {evt.vector}</div>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-slate-400">{evt.time}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: Radar Topology Scope & Threat Inspection (4 cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          {/* Radar Sweep Scope */}
          <div className="glass-panel p-5 rounded-xl border border-slate-800 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-4">
              <h2 className="font-display text-xl text-slate-200">Radar Telemetry</h2>
              <span className="text-xs font-mono text-emerald-400">SWEEP 360°</span>
            </div>
            
            <div className="h-60 w-60 rounded-full overflow-hidden border border-slate-800 bg-slate-950/80 relative flex items-center justify-center">
              <RadarSweepCanvas />
            </div>
          </div>

          {/* Active Threat Payload Card */}
          <div className="glass-panel p-5 rounded-xl border border-slate-800">
            <h2 className="font-display text-xl text-slate-200 mb-3 flex items-center justify-between">
              <span>Threat Payload Inspection</span>
              <Shield className="w-4 h-4 text-blue-400" />
            </h2>

            {activeThreat ? (
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300">
                  <div className="text-[10px] text-rose-400/80 uppercase">MODULATED PAYLOAD</div>
                  <div className="font-bold text-sm mt-1 break-all">{activeThreat.payload}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">BAND MIN</span>
                    <span className="font-bold">{activeThreat.frequencyMin / 1000} kHz</span>
                  </div>
                  <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                    <span className="text-[10px] text-slate-500 block">BAND MAX</span>
                    <span className="font-bold">{activeThreat.frequencyMax / 1000} kHz</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800/60 text-center text-slate-400 text-xs font-mono">
                NO ACTIVE THREAT INJECTED. SYSTEM NOMINAL.
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default SOCMonitoringPage;
