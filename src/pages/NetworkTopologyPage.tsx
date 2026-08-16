import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Server, Globe } from 'lucide-react';

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

export function NetworkTopologyPage() {
  return (
    <motion.div 
      className="min-h-screen p-8 text-white z-10 relative"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.header className="mb-12" variants={itemVariants}>
        <h1 className="font-display text-5xl font-light mb-4 text-white/90">
          Network topology
        </h1>
        <p className="text-white/60 text-lg max-w-2xl font-light">
          Distributed acoustic sensor architecture and routing paths.
        </p>
      </motion.header>

      <motion.section className="grid grid-cols-12 gap-6" variants={itemVariants}>
        <motion.div className="glass-panel col-span-12 md:col-span-8 p-8 border border-white/10 rounded-2xl flex flex-col" variants={itemVariants}>
          <div className="flex items-center mb-6">
            <Share2 className="w-6 h-6 mr-3 text-white/70" />
            <h2 className="font-display text-2xl">Topology visualization</h2>
          </div>
          <div className="flex-1 min-h-[400px] border border-white/5 rounded-xl bg-black/20 flex flex-col items-center justify-center relative overflow-hidden">
             {/* Placeholder for actual WebGL or D3 topology map */}
             <Globe className="w-16 h-16 text-white/20 mb-4" />
             <p className="text-white/40">Interactive graph visualization layer</p>
             <p className="text-white/30 text-sm mt-2">1,204 nodes · 4,812 edges</p>
          </div>
        </motion.div>

        <motion.div className="glass-panel-heavy col-span-12 md:col-span-4 p-8 border border-white/10 rounded-2xl" variants={itemVariants}>
          <div className="flex items-center mb-6">
            <Server className="w-6 h-6 mr-3 text-white/70" />
            <h2 className="font-display text-2xl">Infrastructure details</h2>
          </div>
          
          <div className="space-y-6">
            <div className="p-5 rounded-xl border border-white/5 bg-white/5">
              <h3 className="text-white/80 mb-4 font-display text-xl">Core regions</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <span className="text-white/60">US-East</span>
                  <span className="text-[var(--accent-safe)]">Operational</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-white/60">EU-West</span>
                  <span className="text-[var(--accent-safe)]">Operational</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-white/60">AP-South</span>
                  <span className="text-[var(--accent-warn)]">Degraded</span>
                </li>
              </ul>
            </div>
            
            <div className="p-5 rounded-xl border border-white/5 bg-white/5">
              <h3 className="text-white/80 mb-4 font-display text-xl">Routing metrics</h3>
              <ul className="space-y-3">
                <li className="flex flex-col">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white/60 text-sm">Packet loss</span>
                    <span className="text-white/90 text-sm">0.02%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--accent-safe)] w-[2%]" />
                  </div>
                </li>
                <li className="flex flex-col mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white/60 text-sm">Bandwidth usage</span>
                    <span className="text-white/90 text-sm">74%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/50 w-[74%]" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
