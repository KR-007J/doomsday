import React from 'react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-8"
    >
      <div className="max-w-5xl w-full grid grid-cols-12 gap-6">
        <div className="col-span-12 text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display mb-4 text-zinc-100">Acoustic Shield</h1>
          <p className="text-lg text-zinc-400">Enterprise threat detection and neutralization</p>
        </div>
        
        <div className="col-span-12 md:col-span-6">
          <motion.button
            whileHover={{ backgroundColor: "rgba(39, 39, 42, 0.5)" }}
            whileTap={{ scale: 0.99 }}
            className="w-full glass-panel p-8 rounded-lg border border-zinc-800 text-left transition-colors"
          >
            <h2 className="text-xl font-medium mb-2 text-zinc-200 font-display">SOC dashboard</h2>
            <p className="text-sm text-zinc-500">Real-time threat monitoring and incident response.</p>
          </motion.button>
        </div>

        <div className="col-span-12 md:col-span-6">
          <motion.button
            whileHover={{ backgroundColor: "rgba(39, 39, 42, 0.5)" }}
            whileTap={{ scale: 0.99 }}
            className="w-full glass-panel p-8 rounded-lg border border-zinc-800 text-left transition-colors"
          >
            <h2 className="text-xl font-medium mb-2 text-zinc-200 font-display">Network topology</h2>
            <p className="text-sm text-zinc-500">Global satellite and local node visualization.</p>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
