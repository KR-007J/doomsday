import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Share2 } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

export function LandingPage() {
  return (
    <motion.div 
      className="min-h-screen p-8 text-white z-10 relative"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.header className="mb-12" variants={itemVariants}>
        <h1 className="font-display text-5xl font-light mb-4 text-white/90">
          Acoustic shield overview
        </h1>
        <p className="text-white/60 text-lg max-w-2xl font-light">
          Enterprise grade soundwave monitoring and threat detection system. Advanced acoustic intelligence.
        </p>
      </motion.header>

      <motion.section className="grid grid-cols-12 gap-6" variants={itemVariants}>
        <motion.div className="glass-panel col-span-12 md:col-span-8 p-8 border border-white/10 rounded-2xl" variants={itemVariants}>
          <div className="flex items-center mb-6">
            <Shield className="w-6 h-6 mr-3 text-[var(--accent-safe)]" />
            <h2 className="font-display text-2xl">System status</h2>
          </div>
          <div className="h-64 flex items-center justify-center border border-white/5 rounded-xl bg-black/20">
            <span className="text-white/40">Real-time acoustic analysis running</span>
          </div>
        </motion.div>

        <motion.div className="glass-panel col-span-12 md:col-span-4 p-8 border border-white/10 rounded-2xl flex flex-col justify-between" variants={itemVariants}>
          <div>
            <div className="flex items-center mb-6">
              <Activity className="w-6 h-6 mr-3 text-[var(--accent-warn)]" />
              <h2 className="font-display text-2xl">Active alerts</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-white/80">Frequency anomaly</span>
                <span className="text-[var(--accent-warn)] text-sm">Zone B</span>
              </li>
              <li className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-white/80">Pattern mismatch</span>
                <span className="text-white/40 text-sm">Zone D</span>
              </li>
            </ul>
          </div>
        </motion.div>
        
        <motion.div className="glass-panel col-span-12 p-8 border border-white/10 rounded-2xl mt-2" variants={itemVariants}>
           <div className="flex items-center mb-6">
            <Share2 className="w-6 h-6 mr-3 text-white/70" />
            <h2 className="font-display text-2xl">Network health</h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/5">
                <div className="text-sm text-white/50 mb-1">Sensor node {i}</div>
                <div className="text-xl text-[var(--accent-safe)]">Operational</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
