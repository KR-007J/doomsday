import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

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

export function SOCMonitoringPage() {
  return (
    <motion.div 
      className="min-h-screen p-8 text-white z-10 relative"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.header className="mb-12" variants={itemVariants}>
        <h1 className="font-display text-5xl font-light mb-4 text-white/90">
          Security operations center
        </h1>
        <p className="text-white/60 text-lg max-w-2xl font-light">
          Global threat monitoring and incident response dashboard.
        </p>
      </motion.header>

      <motion.section className="grid grid-cols-12 gap-6" variants={itemVariants}>
        <motion.div className="glass-panel-heavy col-span-12 md:col-span-3 p-6 border border-white/10 rounded-2xl" variants={itemVariants}>
          <div className="flex flex-col gap-4">
             <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-sm text-white/50 mb-1">Critical threats</div>
                <div className="text-3xl text-[var(--accent-warn)] font-light">2</div>
             </div>
             <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-sm text-white/50 mb-1">Active nodes</div>
                <div className="text-3xl text-[var(--accent-safe)] font-light">1,204</div>
             </div>
             <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-sm text-white/50 mb-1">Global latency</div>
                <div className="text-3xl text-white/80 font-light">42ms</div>
             </div>
          </div>
        </motion.div>

        <motion.div className="glass-panel col-span-12 md:col-span-9 p-8 border border-white/10 rounded-2xl" variants={itemVariants}>
          <div className="flex items-center mb-6 justify-between">
            <h2 className="font-display text-2xl">Incident feed</h2>
            <div className="flex gap-2">
               <span className="px-3 py-1 rounded-full border border-[var(--accent-warn)]/30 text-[var(--accent-warn)] text-xs">High priority</span>
               <span className="px-3 py-1 rounded-full border border-white/10 text-white/50 text-xs">All events</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { id: 'EVT-992', title: 'Unexpected acoustic signature detected', severity: 'warn', time: '2m ago' },
              { id: 'EVT-991', title: 'Sensor node reconnected', severity: 'safe', time: '15m ago' },
              { id: 'EVT-990', title: 'Routine calibration complete', severity: 'safe', time: '1h ago' },
            ].map(event => (
              <div key={event.id} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-black/20 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  {event.severity === 'warn' ? (
                    <AlertTriangle className="w-5 h-5 text-[var(--accent-warn)]" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-[var(--accent-safe)]" />
                  )}
                  <div>
                    <div className="text-white/90">{event.title}</div>
                    <div className="text-white/40 text-sm">{event.id}</div>
                  </div>
                </div>
                <div className="text-white/40 text-sm">{event.time}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
