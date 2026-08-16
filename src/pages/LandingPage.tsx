import React from 'react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="min-h-screen w-full bg-black text-white p-8 flex flex-col items-center justify-center"
    >
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Acoustic Shield</h1>
        <p className="text-xl text-cyan-200 mb-12">Enterprise Threat Detection & Neutralization</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 255, 157, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            className="glass-panel p-8 rounded-xl border border-cyan-500/30 text-left"
          >
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">SOC Dashboard</h2>
            <p className="text-sm text-cyan-100/70">Real-time threat monitoring and incident response.</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 255, 157, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            className="glass-panel-heavy p-8 rounded-xl border border-cyan-500/30 text-left"
          >
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Network Topology</h2>
            <p className="text-sm text-cyan-100/70">Global satellite and local node visualization.</p>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
