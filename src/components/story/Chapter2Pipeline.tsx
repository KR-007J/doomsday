import React from 'react';
import { motion } from 'framer-motion';

export const Chapter2Pipeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'FSK Encoding',
      desc: 'Binary payload modulation to frequency-shifted acoustic pulses.',
      path: 'M0 10 L10 10 L15 2 L25 18 L30 10 L40 10 L45 5 L55 15 L60 10 L70 10 L75 1 L85 19 L90 10 L100 10',
    },
    {
      num: '02',
      title: 'Ultrasonic Modulation',
      desc: 'Elevating baseband data to 18-22kHz covert bands.',
      path: 'M0 10 L5 10 L8 0 L12 20 L15 10 L25 10 L28 4 L32 16 L35 10 L100 10',
    },
    {
      num: '03',
      title: 'Acoustic Propagation',
      desc: 'Physical transmission through air-gapped environmental space.',
      path: 'M0 10 C 20 10, 20 0, 40 0 C 60 0, 60 20, 80 20 C 90 20, 95 10, 100 10',
    },
    {
      num: '04',
      title: 'Spectral Capture',
      desc: 'High-fidelity interception by Acoustic Shield distributed array.',
      path: 'M0 10 L10 10 L12 5 L14 15 L16 2 L18 18 L20 8 L22 12 L24 10 L100 10',
      highlight: true,
    },
    {
      num: '05',
      title: 'SOC Detection',
      desc: 'Real-time analysis, classification, and event logging.',
      path: 'M0 10 L30 10 L35 0 L40 20 L45 10 L100 10',
      critical: true,
    },
  ];

  return (
    <section 
      id="chapter-2" 
      className="relative w-full min-h-screen py-24 px-6 md:px-16 bg-canvas flex flex-col justify-center border-b border-hairline"
    >
      <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">
        {/* Left Side: Context */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col gap-6 sticky top-24"
        >
          <div className="font-mono text-xs text-secondary-ui uppercase tracking-wide">
            Phase 02 / Interception
          </div>

          <h2 className="font-display text-4xl sm:text-5xl leading-tight text-primary-ui">
            The Signal Journey
          </h2>

          <p className="font-sans text-base text-secondary-ui max-w-sm leading-relaxed">
            Tracing the lifecycle of an acoustic anomaly from initial encoding at the source device to final neutralization within the Security Operations Center.
          </p>
        </motion.div>

        {/* Right Side: 5 Step Pipeline List (Tabular/Minimal) */}
        <div className="lg:col-span-7 flex flex-col">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`group flex flex-col sm:flex-row sm:items-center py-8 border-b border-hairline last:border-0 ${
                step.highlight ? 'bg-surface-1 px-4 -mx-4 rounded-sm' : ''
              } ${
                step.critical ? 'bg-accent-critical/5 px-4 -mx-4 rounded-sm border-l-2 border-l-accent-critical border-b-transparent' : ''
              }`}
            >
              <div className="w-16 font-mono text-xs text-tertiary-ui mb-2 sm:mb-0">
                {step.num}
              </div>
              <div className="flex-1 pr-6">
                <h3 className={`font-mono text-sm font-medium mb-1 ${
                  step.critical ? 'text-accent-critical' : 'text-primary-ui'
                }`}>
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-secondary-ui leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Sparkline Waveform SVG */}
              <div className="w-24 h-10 mt-4 sm:mt-0 flex items-center justify-end opacity-40 group-hover:opacity-100 transition-opacity">
                <svg viewBox="0 0 100 20" fill="none" className={step.critical ? "text-accent-critical" : "text-primary-ui"}>
                  <path 
                    d={step.path} 
                    stroke="currentColor" 
                    strokeWidth="1" 
                    strokeLinecap="round" 
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
