import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AttackLabPage: React.FC = () => {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [frequency, setFrequency] = useState(18500);
  const [amplitude, setAmplitude] = useState(0.8);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTransmitting) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsTransmitting(false);
            return 0;
          }
          return p + 2;
        });
      }, 50);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isTransmitting]);

  return (
    <div className="min-h-screen pt-24 px-8 pb-12 max-w-5xl mx-auto flex flex-col gap-8 text-white font-primary">
      <header className="border-b border-white/10 pb-6">
        <h1 className="text-4xl font-display font-medium tracking-tight mb-2">Attack Synthesis Lab</h1>
        <p className="text-white/60 text-sm">Configure and deploy targeted acoustic payloads for system validation.</p>
      </header>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          <div className="glass-panel rounded-xl p-6 border border-white/5 bg-black/40 backdrop-blur-xl flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-medium mb-4">Signal Parameters</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <label className="text-white/60">Carrier Frequency</label>
                    <span className="font-mono text-white/80">{frequency} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="15000"
                    max="22000"
                    step="100"
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    disabled={isTransmitting}
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <label className="text-white/60">Amplitude Modulation</label>
                    <span className="font-mono text-white/80">{amplitude.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={amplitude}
                    onChange={(e) => setAmplitude(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                    disabled={isTransmitting}
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <button
                onClick={() => setIsTransmitting(!isTransmitting)}
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  isTransmitting 
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20' 
                    : 'bg-white text-black hover:bg-white/90'
                }`}
              >
                {isTransmitting ? 'Halt Transmission' : 'Initialize Transmission'}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isTransmitting && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-panel rounded-xl p-6 border border-white/5 bg-black/40 backdrop-blur-xl"
              >
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-white/60 font-mono">Transmission Progress</span>
                  <span className="font-mono text-white/80">{progress}%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="col-span-1">
          <div className="glass-panel rounded-xl p-6 border border-white/5 bg-black/40 backdrop-blur-xl h-full">
            <h2 className="text-sm font-medium text-white/60 mb-4 uppercase tracking-wider">Telemetry Readout</h2>
            <div className="font-mono text-xs text-white/40 flex flex-col gap-2">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>STATUS</span>
                <span className={isTransmitting ? 'text-green-400' : 'text-white/60'}>
                  {isTransmitting ? 'ACTIVE' : 'IDLE'}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>TARGET</span>
                <span>LOCAL_NODE</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>ENCRYPTION</span>
                <span>NONE</span>
              </div>
              {isTransmitting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 break-all opacity-50"
                >
                  {Array.from({ length: 150 }).map(() => Math.random().toString(16)[2]).join('')}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
