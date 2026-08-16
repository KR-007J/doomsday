import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export const SOCMonitoringPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="min-h-screen w-full bg-black text-white p-8"
    >
      <header className="mb-8 border-b border-cyan-500/30 pb-4">
        <h1 className="text-3xl font-bold text-cyan-400">SOC Active Monitoring</h1>
        <p className="text-cyan-200/60 text-sm">GLOBAL THREAT ASSESSMENT GRID</p>
      </header>

      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-xl border border-cyan-500/20 col-span-2">
          <h3 className="text-lg text-cyan-300 mb-4 tracking-widest font-mono border-b border-cyan-500/20 pb-2">LIVE THREAT FEED</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 255, 157, 0.2)" }}
                className="bg-red-900/20 border border-red-500/30 p-4 rounded"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-red-400 font-bold">CRITICAL ANOMALY DETECTED</span>
                  <span className="text-red-400/60 font-mono">ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel-heavy p-6 rounded-xl border border-cyan-500/20">
          <h3 className="text-lg text-cyan-300 mb-4 tracking-widest font-mono border-b border-cyan-500/20 pb-2">SYSTEM STATUS</h3>
          <ul className="space-y-4 font-mono text-sm">
            <li className="flex justify-between"><span className="text-cyan-100">DEFENSE GRID</span><span className="text-green-400">ONLINE</span></li>
            <li className="flex justify-between"><span className="text-cyan-100">SATELLITE LINK</span><span className="text-green-400">SECURE</span></li>
            <li className="flex justify-between"><span className="text-cyan-100">AI KERNEL</span><span className="text-yellow-400">PROCESSING</span></li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-xl border border-cyan-500/20 relative overflow-hidden z-10">
          <h3 className="text-lg text-cyan-300 mb-4 tracking-widest font-mono border-b border-cyan-500/20 pb-2">PATTERN MATCHING</h3>
          <p className="text-cyan-100/70 text-sm">Analyzing incoming vectors...</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-xl border border-cyan-500/20 relative overflow-hidden z-10">
          <h3 className="text-lg text-cyan-300 mb-4 tracking-widest font-mono border-b border-cyan-500/20 pb-2">METADATA</h3>
          <p className="text-cyan-100/70 text-sm">Encrypted payloads intercepted: 4,921</p>
        </motion.div>

      </motion.section>
    </motion.div>
  );
};

export default SOCMonitoringPage;
