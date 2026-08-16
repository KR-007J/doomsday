import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

export const Chapter1Hero: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);

  const scrollToChapter2 = () => {
    const el = document.getElementById('chapter-2');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} 
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }} 
      transition={{ duration: 0.5, ease: "easeOut" }} 
      className="relative w-full min-h-screen flex flex-col justify-center px-8 md:px-16 pt-20 pb-16 bg-transparent overflow-hidden"
    >
      {/* Background Radial Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Headline & Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, staggerChildren: 0.15 }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Live Status Line */}
          <motion.div className="flex items-center gap-2 font-mono text-xs text-[#8A8D91] tracking-widest uppercase mb-2 glass-panel px-3 py-1.5 rounded-card border border-hairline">
            <span className={`w-2 h-2 rounded-full ${currentState === 'THREAT_LOGGED' ? 'bg-[#E83939] animate-pulse shadow-[0_0_10px_#E83939]' : 'bg-[#3ECF8E] animate-pulse shadow-[0_0_10px_#3ECF8E]'}`} />
            <span className={currentState === 'THREAT_LOGGED' ? 'text-[#E83939] font-bold' : 'text-[#3ECF8E] font-bold'}>
              {currentState === 'THREAT_LOGGED' ? 'ACOUSTIC MONITORING · THREAT DETECTED' : 'ACOUSTIC MONITORING · SYSTEM NOMINAL'}
            </span>
          </motion.div>

          {/* Breadcrumb Label */}
          <motion.div className="font-mono text-xs text-[#E83939] uppercase tracking-widest mb-6 font-bold drop-shadow-[0_0_5px_rgba(232,57,57,0.5)]">
            ACOUSTIC SHIELD / THREAT DETECTION
          </motion.div>

          {/* Headline Display Text */}
          <motion.h1 className="font-display text-[64px] sm:text-[96px] leading-[0.95] text-[#F5F5F5] font-extrabold tracking-tighter uppercase mb-8">
            HEAR THE
            <br />
            THREAT
            <br />
            BEFORE IT
            <br />
            STRIKES.
          </motion.h1>

          {/* Subtext Paragraph */}
          <motion.p className="font-sans text-base text-[#8A8D91] max-w-xl leading-relaxed mb-10 glass-panel-heavy p-4 rounded-xl border border-hairline">
            Advanced near-ultrasonic covert channel detection. We monitor the imperceptible frequencies utilized by sophisticated threat actors to exfiltrate data and coordinate attacks within air-gapped environments.
          </motion.p>

          {/* CTAs */}
          <motion.div className="flex flex-wrap items-center gap-6">
            <Link to="/monitoring">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent text-[#F5F5F5] font-mono text-xs font-bold uppercase tracking-[0.15em] px-8 py-4 border border-[#E83939] hover:bg-[#E83939] hover:text-white transition-all duration-300 flex items-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(232,57,57,0.3)] hover:shadow-[0_0_40px_rgba(232,57,57,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E83939] focus-visible:outline-offset-2 glass-panel"
              >
                <span>ENTER SOC DASHBOARD</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ x: 5 }}
              onClick={scrollToChapter2}
              className="text-[#8A8D91] hover:text-[#F5F5F5] font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F5F5F5] focus-visible:outline-offset-4"
            >
              <span>&gt; <span className="group-hover:underline">Explore the Detection Pipeline</span></span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Restrained Sensor Node Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
        >
          <div className="w-full max-w-md glass-panel-heavy border border-hairline rounded-2xl p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center">
            {/* SVG Sensor Node Shape */}
            <div className="relative w-64 h-80 flex items-center justify-center">
              <svg className="w-full h-full text-white/[0.03]" viewBox="0 0 200 260" fill="currentColor">
                <polygon points="100,10 180,60 180,200 100,250 20,200 20,60" />
              </svg>
              {/* Glowing Sensor Lights & Labels */}
              {/* Top-left amber dot */}
              <motion.div 
                animate={{ opacity: [0.5, 1, 0.5] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
              >
                <div className="font-mono text-[8px] text-[#F0A030] mb-1 whitespace-nowrap drop-shadow-[0_0_3px_#F0A030]">NODE-04 // SCAN</div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#F0A030] shadow-[0_0_15px_#F0A030]" />
              </motion.div>
              {/* Center red dot */}
              <div className="absolute top-1/2 left-1/2 flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
                <div className="font-mono text-[8px] text-[#E83939] mb-1 font-bold whitespace-nowrap drop-shadow-[0_0_3px_#E83939]">ANOMALY</div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#E83939] shadow-[0_0_25px_#E83939] animate-pulse" />
              </div>
              {/* Right white dot */}
              <motion.div 
                animate={{ opacity: [0.8, 1, 0.8] }} 
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute top-1/2 right-1/4 flex flex-col items-center translate-x-1/2 -translate-y-1/2"
              >
                <div className="font-mono text-[8px] text-white mb-1 whitespace-nowrap drop-shadow-[0_0_3px_white]">NODE-12 // SYNC</div>
                <div className="w-3 h-3 rounded-full bg-white/80 shadow-[0_0_15px_rgba(255,255,255,1)]" />
              </motion.div>
            </div>

            {/* Legend Below Hexagon */}
            <div className="font-mono text-[10px] text-[#8A8D91] mt-4 mb-4 glass-panel px-3 py-1 rounded">
              ACTIVE DETECTION NODES · 4,092 ONLINE
            </div>

            {/* Node Metadata Footer */}
            <div className="w-full pt-4 border-t border-hairline font-mono text-[10px] text-[#8A8D91] flex justify-between items-center">
              <div>
                <span>NODE ID: AX-774-8</span>
                <div className="text-[#F0A030] font-bold mt-0.5 drop-shadow-[0_0_2px_rgba(240,160,48,0.8)]">CH STATUS: SCANNING</div>
              </div>
              <span className="text-right">ACTIVE SENSORS: 4,092</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
