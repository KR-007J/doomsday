import React from 'react';
import { motion } from 'framer-motion';

export const NetworkTopologyPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen w-full bg-zinc-950 text-zinc-100 p-8"
    >
      <header className="mb-8 border-b border-zinc-800 pb-6 grid grid-cols-12 gap-6 items-end">
        <div className="col-span-8">
          <h1 className="text-3xl font-display text-zinc-100 mb-1">Network topology</h1>
          <p className="text-zinc-500 text-sm">Node map & satellite uplink status</p>
        </div>
        <div className="col-span-4 flex justify-end">
          <button 
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors text-zinc-300 text-sm rounded-md font-medium"
          >
            Refresh ping
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 h-[70vh]">
        
        {/* Main Map Area */}
        <div 
          className="glass-panel rounded-lg border border-zinc-800 col-span-12 lg:col-span-9 flex items-center justify-center bg-zinc-900/20"
        >
          <div className="text-center">
            <h2 className="text-zinc-700 text-2xl font-medium mb-2 font-display">Visualization core</h2>
            <p className="text-zinc-500 text-sm">Awaiting telemetry data...</p>
          </div>
        </div>

        {/* Sidebar */}
        <div 
          className="col-span-12 lg:col-span-3 flex flex-col gap-6"
        >
          <div 
            className="glass-panel p-6 rounded-lg border border-zinc-800 flex-1 bg-zinc-900/20"
          >
            <h3 className="text-sm font-medium text-zinc-400 mb-4 pb-2 border-b border-zinc-800/50">Active nodes</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-zinc-300">Node Alpha (NY)</span>
                </div>
                <span className="text-zinc-500 text-xs">9ms</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-zinc-300">Node Beta (LDN)</span>
                </div>
                <span className="text-zinc-500 text-xs">24ms</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="text-zinc-500">Node Gamma (TYO)</span>
                </div>
                <span className="text-rose-500 text-xs">Offline</span>
              </li>
            </ul>
          </div>

          <div 
            className="glass-panel p-6 rounded-lg border border-zinc-800 flex-1 bg-zinc-900/20"
          >
            <h3 className="text-sm font-medium text-zinc-400 mb-4 pb-2 border-b border-zinc-800/50">Traffic metrics</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Inbound</span>
                <span className="text-zinc-200">34.2 TB/s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Outbound</span>
                <span className="text-zinc-200">12.8 TB/s</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-zinc-800/50 mt-2">
                <span className="text-zinc-400">Packet loss</span>
                <span className="text-zinc-200">0.03%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NetworkTopologyPage;
