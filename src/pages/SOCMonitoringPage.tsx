import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } }
};

export const SOCMonitoringPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen w-full bg-zinc-950 text-zinc-100 p-8"
    >
      <header className="mb-8 border-b border-zinc-800 pb-6 grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12">
          <h1 className="text-3xl font-display text-zinc-100 mb-1">SOC monitoring</h1>
          <p className="text-zinc-500 text-sm">Global threat assessment grid</p>
        </div>
      </header>

      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-12 gap-6"
      >
        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-lg border border-zinc-800 col-span-12 lg:col-span-8">
          <h3 className="text-sm font-medium text-zinc-400 mb-4 pb-2 border-b border-zinc-800/50">Live threat feed</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-md flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <span className="text-zinc-200 text-sm font-medium">Critical anomaly detected</span>
                </div>
                <span className="text-zinc-500 text-xs font-mono">ID: {Math.random().toString(36).substring(7).toUpperCase()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-lg border border-zinc-800 col-span-12 lg:col-span-4">
          <h3 className="text-sm font-medium text-zinc-400 mb-4 pb-2 border-b border-zinc-800/50">System status</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between items-center"><span className="text-zinc-400">Defense grid</span><span className="text-emerald-400 font-medium">Online</span></li>
            <li className="flex justify-between items-center"><span className="text-zinc-400">Satellite link</span><span className="text-emerald-400 font-medium">Secure</span></li>
            <li className="flex justify-between items-center"><span className="text-zinc-400">AI kernel</span><span className="text-amber-400 font-medium">Processing</span></li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-lg border border-zinc-800 col-span-12 md:col-span-6">
          <h3 className="text-sm font-medium text-zinc-400 mb-4 pb-2 border-b border-zinc-800/50">Pattern matching</h3>
          <p className="text-zinc-500 text-sm">Analyzing incoming vectors...</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-panel p-6 rounded-lg border border-zinc-800 col-span-12 md:col-span-6">
          <h3 className="text-sm font-medium text-zinc-400 mb-4 pb-2 border-b border-zinc-800/50">Metadata</h3>
          <p className="text-zinc-500 text-sm">Encrypted payloads intercepted: 4,921</p>
        </motion.div>

      </motion.section>
    </motion.div>
  );
};

export default SOCMonitoringPage;
