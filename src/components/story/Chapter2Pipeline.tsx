import React from 'react';
import { motion } from 'framer-motion';

export const Chapter2Pipeline: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'FSK ENCODING',
      desc: 'Binary to frequency-shifted acoustic pulses.',
      path: 'M0 10 L10 10 L15 2 L25 18 L30 10 L40 10 L45 5 L55 15 L60 10 L70 10 L75 1 L85 19 L90 10 L100 10',
      color: '#F0A030',
    },
    {
      num: '02',
      title: 'ULTRASONIC MODULATION',
      desc: 'Elevating data to 18-22kHz covert bands.',
      path: 'M0 10 L5 10 L8 0 L12 20 L15 10 L25 10 L28 4 L32 16 L35 10 L100 10',
      color: '#F0A030',
    },
    {
      num: '03',
      title: 'ACOUSTIC PROPAGATION',
      desc: 'Transmission through physical environmental space.',
      path: 'M0 10 C 20 10, 20 0, 40 0 C 60 0, 60 20, 80 20 C 90 20, 95 10, 100 10',
      color: '#F0A030',
    },
    {
      num: '04',
      title: 'SPECTRAL CAPTURE',
      desc: 'High-fidelity interception by Acoustic Shield sensor array.',
      path: 'M0 10 L10 10 L12 5 L14 15 L16 2 L18 18 L20 8 L22 12 L24 10 L100 10',
      color: '#F0A030',
      isHighlight: true,
    },
    {
      num: '05',
      title: 'SOC DETECTION & LOG',
      desc: 'Real-time analysis and event logging in the dashboard.',
      path: 'M0 10 L30 10 L35 0 L40 20 L45 10 L100 10',
      color: '#E83939',
      isCritical: true,
    },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} 
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }} 
      transition={{ duration: 0.5, ease: "easeOut" }} 
      id="chapter-2" 
      className="relative w-full min-h-screen py-24 px-8 md:px-16 bg-[#0A0A0B] flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side: Context */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="flex items-center gap-3 font-mono text-xs text-[#E83939] uppercase tracking-widest font-bold glass-panel w-max px-3 py-1.5 rounded-card border border-hairline">
            <span className="w-8 h-[2px] bg-[#E83939] shadow-[0_0_10px_#E83939]" />
            <span className="drop-shadow-[0_0_5px_rgba(232,57,57,0.5)]">PHASE: INTERCEPTION</span>
          </div>

          <h2 className="font-display text-[48px] sm:text-[80px] leading-[0.95] text-[#F5F5F5] font-extrabold tracking-tighter uppercase">
            THE SIGNAL
            <br />
            JOURNEY
          </h2>

          <p className="font-sans text-base text-[#8A8D91] max-w-sm leading-relaxed glass-panel-heavy p-4 rounded-xl border border-hairline">
            Tracing the lifecycle of an acoustic anomaly from initial encoding at the source device to final neutralization within the Security Operations Center. Silence is no longer secure.
          </p>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 px-6 py-3 border border-[#F5F5F5] text-[#F5F5F5] font-mono text-xs hover:bg-[#F5F5F5] hover:text-[#0A0A0B] transition-all duration-300 w-max uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F5F5F5] glass-panel"
          >
            <span className="font-bold">&gt;</span> INITIATE TRACE
          </motion.button>
        </motion.div>

        {/* Right Side: 5 Step Pipeline List */}
        <div className="lg:col-span-7 flex flex-col glass-panel-heavy rounded-2xl border border-hairline p-4 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`group flex items-center py-6 border-b border-hairline last:border-0 hover:bg-white/5 transition-colors cursor-default rounded-lg px-2 ${
                step.isHighlight ? 'glass-panel bg-white/5 border border-[#F0A030]/30 shadow-[0_0_20px_rgba(240,160,48,0.1)] my-2' : ''
              } ${
                step.isCritical ? 'glass-panel border border-[#E83939]/50 bg-[#E83939]/10 shadow-[0_0_30px_rgba(232,57,57,0.2)] mt-2' : ''
              }`}
            >
              <div className="w-14 font-mono text-xs text-[#8A8D91] pl-2 font-bold opacity-50 group-hover:opacity-100 transition-opacity">{step.num}</div>
              <div className="flex-1 pr-4">
                <h3 className={`font-mono text-xs font-bold uppercase mb-1 tracking-wider ${
                  step.isCritical ? 'text-[#E83939] drop-shadow-[0_0_5px_rgba(232,57,57,0.8)]' : step.isHighlight ? 'text-[#F0A030] drop-shadow-[0_0_5px_rgba(240,160,48,0.8)]' : 'text-[#F5F5F5]'
                }`}>
                  {step.title}
                </h3>
                <p className="font-sans text-xs text-[#8A8D91] group-hover:text-[#A0A4A8] transition-colors">{step.desc}</p>
              </div>

              {/* Sparkline Waveform SVG */}
              <div className="w-24 h-8 pr-4 flex items-center justify-end">
                <svg className="w-full h-full drop-shadow-[0_0_5px_currentColor]" viewBox="0 0 100 20" fill="none" style={{ color: step.color }}>
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.1 + 0.3 }}
                    d={step.path} 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
