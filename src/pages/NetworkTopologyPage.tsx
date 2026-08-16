import React from 'react';
import { motion } from 'framer-motion';

export const NetworkTopologyPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="min-h-screen w-full bg-black text-white p-8 relative overflow-hidden"
    >
      {/* Background pseudo-grid or glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black pointer-events-none" />

      <header className="relative z-10 mb-8 border-b border-cyan-500/30 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-cyan-400">Network Topology</h1>
          <p className="text-cyan-200/60 text-sm font-mono">NODE MAP & SATELLITE UPLINK STATUS</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 255, 157, 0.2)" }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 glass-panel border border-cyan-500/40 text-cyan-300 font-mono text-sm rounded"
        >
          REFRESH PING
        </motion.button>
      </header>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-6 h-[70vh]">
        
        {/* Main Map Area */}
        <motion.div 
          className="glass-panel-heavy rounded-xl border border-cyan-500/30 col-span-3 flex items-center justify-center relative overflow-hidden"
        >
          {/* Simulated scanning line */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            className="absolute left-0 w-full h-1 bg-cyan-400/50 shadow-[0_0_10px_#00ff9d]"
          />
          
          <div className="text-center">
            <h2 className="text-cyan-500/30 text-6xl font-bold tracking-widest opacity-20">VISUALIZATION CORE</h2>
            <p className="text-cyan-300/50 font-mono mt-4">[ Awaiting Telemetry ]</p>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div 
          className="flex flex-col gap-6"
        >
          <motion.div 
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 255, 157, 0.2)" }}
            className="glass-panel p-6 rounded-xl border border-cyan-500/20 flex-1"
          >
            <h3 className="text-sm text-cyan-300 mb-4 tracking-widest font-mono border-b border-cyan-500/20 pb-2">ACTIVE NODES</h3>
            <ul className="space-y-3 font-mono text-xs">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-cyan-100">NODE ALPHA (NY)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-cyan-100">NODE BETA (LDN)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-300">NODE GAMMA (TYO) - OFFLINE</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 255, 157, 0.2)" }}
            className="glass-panel p-6 rounded-xl border border-cyan-500/20 flex-1"
          >
            <h3 className="text-sm text-cyan-300 mb-4 tracking-widest font-mono border-b border-cyan-500/20 pb-2">TRAFFIC METRICS</h3>
            <div className="space-y-2 font-mono text-xs text-cyan-200">
              <p>INBOUND: <span className="text-green-400">34.2 TB/s</span></p>
              <p>OUTBOUND: <span className="text-green-400">12.8 TB/s</span></p>
              <p>PACKET LOSS: <span className="text-red-400">0.03%</span></p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NetworkTopologyPage;
