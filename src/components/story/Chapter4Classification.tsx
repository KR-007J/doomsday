import React from 'react';
import { motion } from 'framer-motion';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

export const Chapter4Classification: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const isCritical = currentState === 'THREAT_LOGGED';

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} 
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }} 
      transition={{ duration: 0.5, ease: "easeOut" }} 
      id="chapter-4" 
      className="relative w-full min-h-screen py-24 px-8 md:px-16 bg-transparent flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-hairline pb-8"
        >
          <div className="lg:col-span-8">
            <h2 className="font-display text-[54px] sm:text-[96px] leading-[0.9] text-[#F5F5F5] font-extrabold uppercase">
              NOISE HAS A <br />
              <span className="text-[#8A8D91] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">SIGNATURE</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end text-left lg:text-right">
            <p className="font-sans text-sm text-[#8A8D91] leading-relaxed glass-panel-heavy p-4 rounded-xl border border-hairline">
              Patterns are continuously analyzed against known threat vectors. The system categorizes telemetry in real-time, executing automated protocols based on the classification outcome.
            </p>
          </div>
        </motion.div>

        {/* 3 Column Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Safe/Nominal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel-heavy border border-hairline rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-center mb-6 font-mono text-xs">
                <div>
                  <span className="text-[#8A8D91] text-[10px] block font-bold">SIG_ID: NOM-092A</span>
                  <h3 className="font-bold text-[#F5F5F5] uppercase tracking-wider">Safe/Nominal</h3>
                </div>
                <span className="material-symbols-outlined text-[#8A8D91]">verified</span>
              </div>
              {/* Waveform graphic */}
              <div className="h-24 w-full my-4 border-y border-hairline flex items-center justify-center glass-panel rounded-lg overflow-hidden">
                <svg className="w-full h-8" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q5,10 10,10 T20,10 T30,10 T40,8 T45,12 T50,5 T55,15 T60,10 T70,10 T80,10 T90,10 T100,10" fill="none" stroke="#F5F5F5" strokeWidth="0.8" opacity="0.6" />
                </svg>
              </div>
              <p className="font-sans text-xs text-[#8A8D91] leading-relaxed mb-6">
                Baseline ambient noise floor. Acoustic characteristics fall within expected environmental parameters. No anomalies detected in current frequency spectrum.
              </p>
            </div>
            <div className="pt-4 border-t border-hairline flex justify-between items-center font-mono text-xs">
              <span className="text-[#8A8D91] text-[10px] border border-hairline px-2 py-0.5 rounded glass-panel font-bold">ACT_RATING: 0.1</span>
              <span className="text-[#F5F5F5] font-bold glass-panel px-3 py-1 rounded">MONITOR</span>
            </div>
          </motion.div>

          {/* Card 2: Anomaly */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel-heavy border border-[#F0A030]/40 rounded-2xl p-6 flex flex-col justify-between hover:border-[#F0A030] hover:shadow-[0_0_30px_rgba(240,160,48,0.2)] transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-center mb-6 font-mono text-xs">
                <div>
                  <span className="text-[#F0A030] text-[10px] block font-bold drop-shadow-[0_0_2px_rgba(240,160,48,0.8)]">SIG_ID: UNK-441X</span>
                  <h3 className="font-bold text-[#F0A030] uppercase tracking-wider drop-shadow-[0_0_5px_rgba(240,160,48,0.5)]">Anomaly Detected</h3>
                </div>
                <span className="material-symbols-outlined text-[#F0A030] drop-shadow-[0_0_5px_rgba(240,160,48,0.8)]">warning</span>
              </div>
              {/* Waveform graphic */}
              <div className="h-24 w-full my-4 border-y border-[#F0A030]/20 flex items-center justify-center glass-panel rounded-lg overflow-hidden bg-[#F0A030]/5">
                <svg className="w-full h-12 drop-shadow-[0_0_5px_#F0A030]" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,15 Q5,15 10,12 T20,18 T25,5 T30,25 T35,8 T40,22 T50,15 T60,10 T70,20 T80,15 T90,15 T100,15" fill="none" stroke="#F0A030" strokeWidth="1.5" />
                </svg>
              </div>
              <p className="font-sans text-xs text-[#8A8D91] leading-relaxed mb-6">
                Uncertain signature matching partial criteria for mechanical intrusion. Frequency spikes observed outside nominal baseline variance. Secondary analysis required.
              </p>
            </div>
            <div className="pt-4 border-t border-[#F0A030]/30 flex justify-between items-center font-mono text-xs">
              <span className="text-[#F0A030] text-[10px] border border-[#F0A030]/50 px-2 py-0.5 bg-[#F0A030]/10 rounded font-bold">ACT_RATING: 6.8</span>
              <button className="text-[#F0A030] font-bold border border-[#F0A030] px-3 py-1 rounded hover:bg-[#F0A030] hover:text-[#0A0A0B] transition-colors cursor-pointer active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F0A030] shadow-[0_0_10px_rgba(240,160,48,0.2)]">
                VALIDATE
              </button>
            </div>
          </motion.div>

          {/* Card 3: Threat */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`glass-panel-heavy rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
              isCritical
                ? 'border border-[#E83939] shadow-[0_0_40px_rgba(232,57,57,0.3)] bg-[#E83939]/10'
                : 'border border-[#E83939]/40 hover:border-[#E83939] hover:shadow-[0_0_30px_rgba(232,57,57,0.2)]'
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-6 font-mono text-xs">
                <div>
                  <span className="text-[#E83939] text-[10px] block font-bold drop-shadow-[0_0_3px_#E83939]">SIG_ID: CRT-990Z</span>
                  <h3 className="font-bold text-[#E83939] uppercase tracking-wider drop-shadow-[0_0_5px_#E83939]">Threat Confirmed</h3>
                </div>
                <span className="material-symbols-outlined text-[#E83939] drop-shadow-[0_0_5px_#E83939]">error</span>
              </div>
              {/* Waveform graphic */}
              <div className="h-24 w-full my-4 border-y border-[#E83939]/40 flex items-center justify-center glass-panel rounded-lg overflow-hidden bg-[#E83939]/5">
                <svg className="w-full h-16 drop-shadow-[0_0_8px_#E83939]" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                    d="M0,20 L5,20 L8,5 L12,35 L15,10 L18,30 L22,2 L28,38 L32,15 L35,25 L40,0 L45,40 L50,10 L55,30 L60,5 L65,35 L70,15 L75,25 L80,5 L85,35 L90,15 L95,20 L100,20" fill="none" stroke="#E83939" strokeWidth="1.5" />
                </svg>
              </div>
              <p className="font-sans text-xs text-[#8A8D91] leading-relaxed mb-6">
                Confirmed acoustic exfiltration signature. Profile matches classified drone telemetry or physical perimeter breach. Immediate automated containment protocols advised.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E83939]/30 flex justify-between items-center font-mono text-xs">
              <span className="text-[#E83939] text-[10px] border border-[#E83939] px-2 py-0.5 bg-[#E83939]/20 font-bold rounded shadow-[0_0_10px_rgba(232,57,57,0.3)]">ACT_RATING: 9.9</span>
              <button className="bg-[#E83939] text-white font-bold px-4 py-1.5 rounded hover:bg-white hover:text-[#E83939] transition-colors cursor-pointer uppercase active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E83939] shadow-[0_0_15px_rgba(232,57,57,0.4)]">
                LOG &amp; CONTAIN
              </button>
            </div>
          </motion.div>
        </div>

        {/* Mandatory Honest Disclaimer Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-right"
        >
          <p className="font-mono text-[10px] text-[#8A8D91] uppercase tracking-wider max-w-lg ml-auto glass-panel px-4 py-2 rounded">
            Simulation data only — classifications demonstrate the interface flow and do not represent live defensive actions.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
