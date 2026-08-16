import React from 'react';
import { motion } from 'framer-motion';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

export const Chapter4Classification: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const isCritical = currentState === 'THREAT_LOGGED';

  return (
    <section 
      id="chapter-4" 
      className="relative w-full min-h-screen py-24 px-6 md:px-16 bg-canvas flex flex-col justify-center"
    >
      <div className="max-w-[1200px] mx-auto w-full flex flex-col gap-12 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-hairline pb-8"
        >
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl sm:text-5xl leading-tight text-primary-ui">
              Noise has a signature.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="font-sans text-base text-secondary-ui leading-relaxed">
              Patterns are continuously analyzed against known threat vectors. The system categorizes telemetry in real-time, executing automated protocols based on rigorous classification parameters.
            </p>
          </div>
        </motion.div>

        {/* 3 Column Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Safe/Nominal */}
          <div className="bg-surface-1 border border-hairline rounded-sm p-6 flex flex-col min-h-[300px]">
            <div className="flex-1">
              <div className="mb-6 font-mono text-xs">
                <span className="text-tertiary-ui block mb-1">SIG_ID: NOM-092A</span>
                <h3 className="font-medium text-primary-ui">Nominal Baseline</h3>
              </div>
              <div className="h-16 w-full my-6 bg-surface-2 border border-hairline rounded-sm flex items-center justify-center overflow-hidden">
                <svg className="w-full h-8" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q5,10 10,10 T20,10 T30,10 T40,8 T45,12 T50,5 T55,15 T60,10 T70,10 T80,10 T90,10 T100,10" fill="none" stroke="var(--color-text-secondary)" strokeWidth="0.5" />
                </svg>
              </div>
              <p className="font-sans text-sm text-secondary-ui leading-relaxed mb-6">
                Ambient noise floor. Acoustic characteristics fall within expected environmental parameters.
              </p>
            </div>
            <div className="pt-4 border-t border-hairline flex justify-between items-center font-mono text-xs">
              <span className="text-tertiary-ui">Rating: 0.1</span>
              <span className="text-primary-ui">Monitor</span>
            </div>
          </div>

          {/* Card 2: Anomaly */}
          <div className="bg-surface-1 border border-hairline rounded-sm p-6 flex flex-col min-h-[300px]">
            <div className="flex-1">
              <div className="mb-6 font-mono text-xs">
                <span className="text-tertiary-ui block mb-1">SIG_ID: UNK-441X</span>
                <h3 className="font-medium text-primary-ui">Anomaly Detected</h3>
              </div>
              <div className="h-16 w-full my-6 bg-surface-2 border border-hairline rounded-sm flex items-center justify-center overflow-hidden">
                <svg className="w-full h-10" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,15 Q5,15 10,12 T20,18 T25,5 T30,25 T35,8 T40,22 T50,15 T60,10 T70,20 T80,15 T90,15 T100,15" fill="none" stroke="var(--color-text-primary)" strokeWidth="1" />
                </svg>
              </div>
              <p className="font-sans text-sm text-secondary-ui leading-relaxed mb-6">
                Uncertain signature. Frequency spikes observed outside nominal baseline variance. Secondary analysis required.
              </p>
            </div>
            <div className="pt-4 border-t border-hairline flex justify-between items-center font-mono text-xs">
              <span className="text-tertiary-ui">Rating: 6.8</span>
              <span className="text-primary-ui">Validate</span>
            </div>
          </div>

          {/* Card 3: Threat */}
          <div className={`bg-surface-1 border rounded-sm p-6 flex flex-col min-h-[300px] ${
            isCritical ? 'border-accent-critical' : 'border-hairline'
          }`}>
            <div className="flex-1">
              <div className="mb-6 font-mono text-xs">
                <span className="text-tertiary-ui block mb-1">SIG_ID: CRT-990Z</span>
                <h3 className={`font-medium ${isCritical ? 'text-accent-critical' : 'text-primary-ui'}`}>
                  Threat Confirmed
                </h3>
              </div>
              <div className="h-16 w-full my-6 bg-surface-2 border border-hairline rounded-sm flex items-center justify-center overflow-hidden">
                <svg className="w-full h-12" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M0,20 L5,20 L8,5 L12,35 L15,10 L18,30 L22,2 L28,38 L32,15 L35,25 L40,0 L45,40 L50,10 L55,30 L60,5 L65,35 L70,15 L75,25 L80,5 L85,35 L90,15 L95,20 L100,20" fill="none" stroke={isCritical ? "var(--accent-critical)" : "var(--color-text-primary)"} strokeWidth="1" />
                </svg>
              </div>
              <p className="font-sans text-sm text-secondary-ui leading-relaxed mb-6">
                Confirmed acoustic exfiltration signature. Profile matches classified physical perimeter breach.
              </p>
            </div>
            <div className="pt-4 border-t border-hairline flex justify-between items-center font-mono text-xs">
              <span className="text-tertiary-ui">Rating: 9.9</span>
              <span className={isCritical ? 'text-accent-critical' : 'text-primary-ui'}>Contain</span>
            </div>
          </div>
        </div>

        {/* Disclaimer Text */}
        <div className="mt-4 text-right">
          <p className="font-mono text-[10px] text-tertiary-ui max-w-lg ml-auto">
            Simulation data only. Classifications demonstrate interface flow and do not represent live defensive actions.
          </p>
        </div>
      </div>
    </section>
  );
};
