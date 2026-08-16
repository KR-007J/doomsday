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
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.5 }} 
      className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-16 pt-20 pb-16 bg-canvas overflow-hidden border-b border-hairline"
    >
      <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* Left Headline & Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Breadcrumb Label */}
          <div className="font-mono text-xs text-secondary-ui uppercase tracking-wide mb-6">
            Acoustic Shield / Research &amp; Detection
          </div>

          {/* Headline Display Text */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-[72px] leading-[1.05] text-primary-ui mb-8">
            Hear the threat before it strikes.
          </h1>

          {/* Subtext Paragraph */}
          <p className="font-sans text-base sm:text-lg text-secondary-ui max-w-xl leading-relaxed mb-10">
            Advanced near-ultrasonic covert channel detection. We monitor the imperceptible frequencies utilized by sophisticated threat actors to exfiltrate data and coordinate attacks within air-gapped environments.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/monitoring">
              <button 
                className="bg-primary-ui text-canvas font-mono text-xs font-medium px-6 py-3 rounded-sm hover:bg-white transition-colors flex items-center gap-3 cursor-pointer"
              >
                <span>Enter SOC Dashboard</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </Link>

            <button
              onClick={scrollToChapter2}
              className="text-secondary-ui hover:text-primary-ui font-mono text-xs transition-colors cursor-pointer flex items-center gap-2 group"
            >
              <span className="material-symbols-outlined text-[16px]">south</span>
              <span>Explore the Pipeline</span>
            </button>
          </div>
        </motion.div>

        {/* Right Minimalist Sensor Representation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative w-full"
        >
          <div className="w-full max-w-sm bg-surface-1 border border-hairline rounded-sm p-8 relative flex flex-col items-center gap-6">
            {/* Live Status Line */}
            <div className="flex items-center gap-2 font-mono text-xs text-secondary-ui w-full border-b border-hairline pb-4">
              <span className={`w-1.5 h-1.5 rounded-full ${currentState === 'THREAT_LOGGED' ? 'bg-accent-critical' : 'bg-accent-safe'}`} />
              <span>
                {currentState === 'THREAT_LOGGED' ? 'Status: Threat Detected' : 'Status: System Nominal'}
              </span>
            </div>

            {/* Scientific Sensor Graphic */}
            <div className="relative w-full aspect-square border border-hairline bg-surface-2 rounded-sm flex items-center justify-center overflow-hidden">
              <svg className="w-[80%] h-[80%] text-hairline" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                <circle cx="50" cy="50" r="40" />
                <circle cx="50" cy="50" r="25" />
                <circle cx="50" cy="50" r="10" />
                <line x1="10" y1="50" x2="90" y2="50" />
                <line x1="50" y1="10" x2="50" y2="90" />
              </svg>
              {/* Data points */}
              <div className="absolute top-[30%] left-[30%] w-1 h-1 bg-accent-warn rounded-full" />
              <div className="absolute top-[60%] left-[70%] w-1 h-1 bg-primary-ui rounded-full" />
              {currentState === 'THREAT_LOGGED' && (
                <div className="absolute top-[50%] left-[50%] w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-accent-critical rounded-full" />
              )}
            </div>

            {/* Node Metadata Footer */}
            <div className="w-full pt-2 font-mono text-[10px] text-tertiary-ui flex justify-between items-center">
              <span>Node: AX-774-8</span>
              <span>Sensors Online: 4,092</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
