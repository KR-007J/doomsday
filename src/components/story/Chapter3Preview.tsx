import React from 'react';
import { motion } from 'framer-motion';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { RadarSweepCanvas } from '../visualizations/RadarSweepCanvas';

export const Chapter3Preview: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const isCritical = currentState === 'THREAT_LOGGED';

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} 
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }} 
      transition={{ duration: 0.5, ease: "easeOut" }} 
      id="chapter-3" 
      className="relative w-full min-h-screen py-24 px-8 md:px-16 bg-transparent flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <span className="font-mono text-xs text-[#8A8D91] uppercase tracking-widest glass-panel w-max px-3 py-1 rounded-card border border-hairline">
            02 / LIVE TELEMETRY
          </span>
          <h2 className="font-display text-[54px] sm:text-[96px] leading-[0.95] text-[#F5F5F5] font-extrabold uppercase">
            OBSERVE THE INVISIBLE
          </h2>
          <div className="h-[1px] w-full bg-hairline" />
          <p className="font-mono text-xs text-[#8A8D91] max-w-2xl leading-relaxed glass-panel-heavy p-4 rounded-xl border border-hairline">
            Sample telemetry from the sensor array. Live backend adapters replace this data stream without changing the visualization layer.
          </p>
        </motion.div>

        {/* 4 Bento Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Panel 1: Waveform */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel-heavy hover:bg-white/5 transition-colors border border-hairline rounded-2xl p-4 flex flex-col justify-between min-h-[260px] shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <div className="flex justify-between items-center pb-2 border-b border-hairline font-mono text-xs">
              <span className="text-[#8A8D91] uppercase font-bold">CHANNEL / WAVEFORM</span>
              <div className={`flex items-center gap-2 border px-2 py-0.5 rounded-sm ${currentState === 'THREAT_LOGGED' ? 'border-[#E83939] bg-[#E83939]/20 shadow-[0_0_15px_rgba(232,57,57,0.4)]' : 'border-[#3ECF8E] bg-[#3ECF8E]/20 shadow-[0_0_15px_rgba(62,207,142,0.4)]'}`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${currentState === 'THREAT_LOGGED' ? 'bg-[#E83939]' : 'bg-[#3ECF8E]'}`} />
                <span className={`font-bold text-[10px] ${currentState === 'THREAT_LOGGED' ? 'text-[#E83939]' : 'text-[#3ECF8E]'}`}>LIVE</span>
              </div>
            </div>
            <div className="my-4 flex-1 flex items-center justify-center relative glass-panel rounded-xl overflow-hidden">
              <svg className="w-full h-24 drop-shadow-[0_0_8px_currentColor]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="#F0A030" strokeWidth="1.5" opacity="0.8" />
                <path d="M0,50 Q10,80 30,30 T60,70 T100,50" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
                <path d="M0,50 Q40,0 50,90 T80,10 T100,50" fill="none" stroke="#E83939" strokeWidth="2.5" />
              </svg>
            </div>
            <div className="flex justify-between font-mono text-[10px] text-[#8A8D91] font-bold">
              <span className="glass-panel px-2 py-1 rounded">FREQ: 14.2kHz</span>
              <span className="glass-panel px-2 py-1 rounded">AMP: -12dB</span>
            </div>
          </motion.div>

          {/* Panel 2: Spectrum 16-24kHz */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel-heavy hover:bg-white/5 transition-colors border border-hairline rounded-2xl p-4 flex flex-col justify-between min-h-[260px] shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <div className="flex justify-between items-center pb-2 border-b border-hairline font-mono text-xs">
              <span className="text-[#8A8D91] uppercase font-bold">SPECTRUM / 16-24kHz</span>
              <div className="flex items-center gap-1 border border-[#E83939] px-2 py-0.5 bg-[#E83939]/20 rounded-sm shadow-[0_0_15px_rgba(232,57,57,0.4)]">
                <span className="material-symbols-outlined text-[12px] text-[#E83939]">warning</span>
                <span className="text-[#E83939] font-bold text-[10px]">THREAT LOCK</span>
              </div>
            </div>
            <div className="my-4 flex items-end justify-between gap-1 h-32 pt-4 glass-panel rounded-xl px-2 pb-2">
              {[12, 18, 10, 15, 25, 20, 12, 45, 95, 35, 15, 22, 10, 14, 8, 12].map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${val}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.05 }}
                  className={`w-full rounded-t-sm ${
                    val > 80
                      ? 'bg-[#E83939] shadow-[0_0_15px_#E83939]'
                      : val > 30
                      ? 'bg-[#F0A030] shadow-[0_0_10px_rgba(240,160,48,0.5)]'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between font-mono text-[10px] text-[#8A8D91] border-t border-hairline pt-2 font-bold">
              <span>16k</span>
              <span>20k</span>
              <span>24k</span>
            </div>
          </motion.div>

          {/* Panel 3: Sensor Topology */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel-heavy hover:bg-white/5 transition-colors border border-hairline rounded-2xl p-4 flex flex-col justify-between min-h-[260px] shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <div className="flex justify-between items-center pb-2 border-b border-hairline font-mono text-xs">
              <span className="text-[#8A8D91] uppercase font-bold">SENSOR TOPOLOGY</span>
              <span className="text-[#F5F5F5] font-bold text-[10px] glass-panel px-2 py-0.5 rounded">ONLINE: 24/24</span>
            </div>
            <div className="py-2 flex items-center justify-center relative flex-1 glass-panel rounded-xl mt-4 mb-2 overflow-hidden">
              <RadarSweepCanvas size={180} />
            </div>
          </motion.div>

          {/* Panel 4: Live Event Stream */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-panel-heavy hover:bg-white/5 transition-colors border border-hairline rounded-2xl p-4 flex flex-col justify-between min-h-[260px] shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <div className="flex justify-between items-center pb-2 border-b border-hairline font-mono text-xs">
              <span className="text-[#8A8D91] uppercase font-bold">LIVE EVENT STREAM</span>
              <span className="material-symbols-outlined text-[16px] text-[#8A8D91]">list</span>
            </div>
            <div className="font-mono text-[11px] space-y-2 py-2 text-[#8A8D91] mt-2">
              <div className="flex justify-between border-b border-hairline pb-1 hover:bg-white/5 px-1 rounded transition-colors">
                <span>[14:02:11.004]</span>
                <span className="text-[#F5F5F5]">SYS.CHK: Array status nominal</span>
              </div>
              <div className="flex justify-between border-b border-hairline pb-1 hover:bg-white/5 px-1 rounded transition-colors">
                <span>[14:02:24.105]</span>
                <span className="text-[#F0A030] drop-shadow-[0_0_5px_rgba(240,160,48,0.5)]">SIG.DET: Low-frequency anomaly</span>
              </div>
              <div className="flex justify-between border-b border-hairline pb-1 bg-[#E83939]/20 p-1 text-[#E83939] font-bold border-l-2 border-l-[#E83939] shadow-[0_0_15px_rgba(232,57,57,0.2)_inset]">
                <span>[14:02:28.440]</span>
                <span className="drop-shadow-[0_0_5px_#E83939]">CRITICAL: Acoustic signature match</span>
              </div>
              <div className="flex justify-between border-b border-hairline pb-1 hover:bg-white/5 px-1 rounded transition-colors">
                <span>[14:02:29.100]</span>
                <span className="text-[#F0A030]">TRK.INIT: Tracking vector established</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-6 flex flex-col items-center"
        >
          <p className='font-mono text-[11px] text-[#8A8D91] mb-3 glass-panel px-4 py-2 rounded-xl border border-hairline'>Telemetry capture complete. Proceed to automated classification engine to categorize detected signatures.</p>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 border border-[#8A8D91] hover:border-[#F5F5F5] text-[#8A8D91] hover:text-[#0A0A0B] hover:bg-[#F5F5F5] transition-all duration-300 font-mono text-xs tracking-widest uppercase cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F5F5F5] glass-panel-heavy"
          >
            &gt; INITIATE DEEP CLASSIFICATION
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};
