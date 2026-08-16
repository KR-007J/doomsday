import React from 'react';
import { motion } from 'framer-motion';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { RadarSweepCanvas } from '../visualizations/RadarSweepCanvas';

export const Chapter3Preview: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const isCritical = currentState === 'THREAT_LOGGED';

  return (
    <section 
      id="chapter-3" 
      className="relative w-full min-h-screen py-24 px-6 md:px-16 bg-canvas flex flex-col justify-center border-b border-hairline"
    >
      <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-12 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 max-w-2xl"
        >
          <div className="font-mono text-xs text-secondary-ui uppercase tracking-wide">
            Phase 03 / Live Telemetry
          </div>
          <h2 className="font-display text-4xl sm:text-5xl leading-tight text-primary-ui">
            Observe the Invisible
          </h2>
          <p className="font-sans text-base text-secondary-ui leading-relaxed">
            Live telemetry sampled directly from the sensor array. The visualization layer integrates dynamically with backend adapters, providing unvarnished acoustic data streams.
          </p>
        </motion.div>

        {/* 4 Bento Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Panel 1: Waveform */}
          <div className="bg-surface-1 border border-hairline rounded-sm p-5 flex flex-col min-h-[260px]">
            <div className="flex justify-between items-center pb-3 border-b border-hairline font-mono text-xs">
              <span className="text-primary-ui font-medium">Channel / Waveform</span>
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isCritical ? 'bg-accent-critical' : 'bg-accent-safe'}`} />
                <span className="text-secondary-ui">Live</span>
              </div>
            </div>
            <div className="flex-1 my-4 relative bg-surface-2 border border-hairline rounded-sm overflow-hidden flex items-center justify-center">
              <svg className="w-full h-24" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="var(--color-text-secondary)" strokeWidth="0.5" />
                <path d="M0,50 Q40,0 50,90 T80,10 T100,50" fill="none" stroke={isCritical ? "var(--accent-critical)" : "var(--color-text-primary)"} strokeWidth="1" />
              </svg>
            </div>
            <div className="flex justify-between font-mono text-[10px] text-tertiary-ui">
              <span>Freq: 14.2kHz</span>
              <span>Amp: -12dB</span>
            </div>
          </div>

          {/* Panel 2: Spectrum 16-24kHz */}
          <div className="bg-surface-1 border border-hairline rounded-sm p-5 flex flex-col min-h-[260px]">
            <div className="flex justify-between items-center pb-3 border-b border-hairline font-mono text-xs">
              <span className="text-primary-ui font-medium">Spectrum / 16-24kHz</span>
              {isCritical && (
                <span className="text-accent-critical">Threat Lock</span>
              )}
            </div>
            <div className="flex-1 my-4 flex items-end justify-between gap-1 h-32 bg-surface-2 border border-hairline rounded-sm p-2">
              {[12, 18, 10, 15, 25, 20, 12, 45, 95, 35, 15, 22, 10, 14, 8, 12].map((val, idx) => (
                <div
                  key={idx}
                  style={{ height: `${val}%` }}
                  className={`w-full ${val > 80 ? 'bg-accent-critical' : 'bg-primary-ui opacity-50'}`}
                />
              ))}
            </div>
            <div className="flex justify-between font-mono text-[10px] text-tertiary-ui border-t border-hairline pt-2">
              <span>16k</span>
              <span>20k</span>
              <span>24k</span>
            </div>
          </div>

          {/* Panel 3: Sensor Topology */}
          <div className="bg-surface-1 border border-hairline rounded-sm p-5 flex flex-col min-h-[260px]">
            <div className="flex justify-between items-center pb-3 border-b border-hairline font-mono text-xs">
              <span className="text-primary-ui font-medium">Sensor Topology</span>
              <span className="text-secondary-ui">Online: 24/24</span>
            </div>
            <div className="flex-1 my-4 flex items-center justify-center bg-surface-2 border border-hairline rounded-sm overflow-hidden">
              <RadarSweepCanvas size={180} />
            </div>
          </div>

          {/* Panel 4: Live Event Stream */}
          <div className="bg-surface-1 border border-hairline rounded-sm p-5 flex flex-col min-h-[260px]">
            <div className="flex justify-between items-center pb-3 border-b border-hairline font-mono text-xs">
              <span className="text-primary-ui font-medium">Event Stream</span>
            </div>
            <div className="flex-1 mt-4 font-mono text-xs flex flex-col gap-2">
              <div className="flex gap-4 text-secondary-ui">
                <span className="text-tertiary-ui shrink-0">[14:02:11.004]</span>
                <span>SYS.CHK: Array status nominal</span>
              </div>
              <div className="flex gap-4 text-primary-ui">
                <span className="text-tertiary-ui shrink-0">[14:02:24.105]</span>
                <span>SIG.DET: Low-frequency anomaly</span>
              </div>
              <div className="flex gap-4 text-accent-critical">
                <span className="text-tertiary-ui shrink-0">[14:02:28.440]</span>
                <span>CRIT: Acoustic signature match</span>
              </div>
              <div className="flex gap-4 text-secondary-ui">
                <span className="text-tertiary-ui shrink-0">[14:02:29.100]</span>
                <span>TRK: Tracking vector established</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
