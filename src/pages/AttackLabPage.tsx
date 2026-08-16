import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';

export const AttackLabPage: React.FC = () => {
  const [payload, setPayload] = useState('0x41 0x43 0x4F 0x55 0x53 0x54 0x49 0x43');
  const [freqSliderVal, setFreqSliderVal] = useState(205);
  const [durSliderVal, setDurSliderVal] = useState(50);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [panelState, setPanelState] = useState<'happy' | 'loading' | 'empty' | 'error'>('happy');
  const [logs, setLogs] = useState<Array<{ id: string; time: string; level: string; msg: string; color: string }>>([
    { id: 'l1', time: '14:02:11.405', level: 'INFO', msg: 'System initialized. Terminal v2.4.0 active.', color: 'text-tertiary-ui' },
    { id: 'l2', time: '14:02:11.450', level: 'INFO', msg: 'Audio interfaces enumerated. Selected virtual sink: V-AUDIO_SINK_01', color: 'text-tertiary-ui' },
    { id: 'l3', time: '14:02:11.902', level: 'OK', msg: 'Modulation engine ready. Standing by for payload.', color: 'text-accent-safe' },
  ]);

  const triggerSimulatedAttack = useThreatStore((s) => s.triggerSimulatedAttack);
  const currentState = useThreatStore((s) => s.currentState);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const consoleEndRef = useRef<HTMLDivElement | null>(null);

  const currentFreqKhz = (freqSliderVal / 10).toFixed(1);

  const addLog = (level: string, message: string, colorClass: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
    setLogs((prev) => [...prev, { id: Math.random().toString(), time: timeStr, level, msg: message, color: colorClass }]);
  };

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Waterfall Spectrogram Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resizeCanvas() {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = Math.max(100, rect.width - 48);
      const h = Math.max(100, rect.height - 24);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let animId: number;
    function drawSpectrogram() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      if (h > 1) {
        const imgData = ctx.getImageData(0, 0, w, h - 1);
        ctx.putImageData(imgData, 0, 1);
      }

      ctx.fillStyle = 'rgba(10, 10, 11, 0.1)';
      ctx.fillRect(0, 0, w, 1);

      for (let i = 0; i < w; i += 4) {
        if (Math.random() > 0.8) {
          ctx.fillStyle = `rgba(60, 150, 255, ${Math.random() * 0.2})`;
          ctx.fillRect(i, 0, 4, 1);
        }
      }

      const activeFreq = Number(currentFreqKhz);
      if (isTransmitting || currentState !== 'SAFE') {
        const normalizedFreq = (activeFreq - 15) / 10;
        const centerPx = Math.floor(normalizedFreq * w);

        const gradient = ctx.createLinearGradient(centerPx - 20, 0, centerPx + 20, 0);
        gradient.addColorStop(0, 'rgba(255, 153, 0, 0)');
        gradient.addColorStop(0.4, 'rgba(255, 153, 0, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.6, 'rgba(255, 153, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 153, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(centerPx - 20, 0, 40, 1);
      }

      animId = requestAnimationFrame(drawSpectrogram);
    }

    animId = requestAnimationFrame(drawSpectrogram);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isTransmitting, currentState, currentFreqKhz]);

  const handleTransmit = async () => {
    if (isTransmitting) return;
    setIsTransmitting(true);

    addLog('EXEC', `Initializing FSK modulation. Target Freq: ${currentFreqKhz} kHz, Burst: ${durSliderVal} ms`, 'text-accent-warn');
    addLog('DATA', `Payload loaded: ${payload}`, 'text-tertiary-ui');

    triggerSimulatedAttack({
      payload,
      frequencyMin: Number(currentFreqKhz) * 1000 - 500,
      frequencyMax: Number(currentFreqKhz) * 1000 + 500,
      duration: durSliderVal / 10,
    });

    setTimeout(() => {
      setIsTransmitting(false);
      addLog('OK', `Transmission sequence complete. Buffer flushed & SOC Threat Logged.`, 'text-accent-safe');
    }, Math.max(durSliderVal * 20, 2000));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }} 
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} 
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }} 
      transition={{ duration: 0.5, ease: "easeOut" }} 
      className="font-mono text-xs flex-1 flex flex-col p-4 gap-4 max-w-7xl mx-auto w-full"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2 border-b border-hairline pb-2">
        <div>
          <h1 className="text-lg font-bold text-primary-ui font-sans">
            TRANSMITTER SUITE // ATTACK LAB
          </h1>
          <p className="text-tertiary-ui uppercase text-[10px]">
            OOB Acoustic payload modulation simulator environment
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex glass-panel border border-hairline rounded-card p-0.5 text-[10px]">
            <button
              onClick={() => setPanelState('happy')}
              className={`px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe ${panelState === 'happy' ? 'glass-panel-heavy text-primary-ui font-bold shadow-[0_0_10px_rgba(62,207,142,0.3)]' : 'text-tertiary-ui'}`}
            >
              LIVE
            </button>
            <button
              onClick={() => setPanelState('loading')}
              className={`px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe ${panelState === 'loading' ? 'glass-panel-heavy text-primary-ui font-bold' : 'text-tertiary-ui'}`}
            >
              LOAD
            </button>
            <button
              onClick={() => setPanelState('empty')}
              className={`px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe ${panelState === 'empty' ? 'glass-panel-heavy text-primary-ui font-bold' : 'text-tertiary-ui'}`}
            >
              EMPTY
            </button>
            <button
              onClick={() => setPanelState('error')}
              className={`px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe ${panelState === 'error' ? 'glass-panel-heavy text-primary-ui font-bold' : 'text-tertiary-ui'}`}
            >
              ERR
            </button>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 glass-panel border border-hairline rounded-sm text-accent-safe font-bold shadow-[0_0_15px_rgba(62,207,142,0.2)]">
            <span className="w-2 h-2 rounded-full bg-accent-safe animate-pulse" />
            SIMULATOR ENGINE: ONLINE
          </div>
        </div>
      </header>

      {/* 2 Column Main Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[420px]">
        {/* Left: Transmitter Controls */}
        <div className="glass-panel-heavy rounded-xl flex flex-col border border-hairline relative overflow-hidden">
          {/* Intense Stark-weapon glow when transmitting */}
          {isTransmitting && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-accent-warn/5 pointer-events-none z-0"
            />
          )}

          <div className="px-4 py-2 border-b border-hairline glass-panel flex justify-between items-center z-10">
            <span className="font-bold text-primary-ui uppercase tracking-wider">
              TRANSMITTER CONTROL PANEL
            </span>
            <span className="text-tertiary-ui text-[10px]">NODE: LAB_TX_01</span>
          </div>

          <AnimatePresence mode="wait">
            {panelState === 'loading' && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 text-center flex flex-col items-center justify-center gap-2 text-tertiary-ui flex-1 z-10">
                 <span className="material-symbols-outlined animate-spin text-[32px]">sync</span>
                 <span className="tracking-widest">INITIALIZING TRANSMITTER...</span>
              </motion.div>
            )}
            {panelState === 'empty' && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 text-center flex flex-col items-center justify-center gap-2 text-tertiary-ui flex-1 z-10">
                 <span className="material-symbols-outlined text-[32px]">blur_on</span>
                 <span className="tracking-widest">NO HARDWARE DETECTED.</span>
              </motion.div>
            )}
            {panelState === 'error' && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 text-center flex flex-col items-center justify-center gap-2 text-accent-critical flex-1 z-10">
                 <span className="material-symbols-outlined text-[32px] drop-shadow-[0_0_10px_rgba(232,57,57,0.8)]">warning</span>
                 <span className="tracking-widest font-bold">HARDWARE FAULT: CONNECTION REFUSED.</span>
              </motion.div>
            )}
            {panelState === 'happy' && (
              <motion.div key="happy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-4 flex flex-col justify-between flex-1 gap-6 z-10">
                <div className="flex flex-col gap-4">
                  {/* Payload Input */}
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex flex-col gap-1.5">
                    <label className="text-tertiary-ui uppercase text-[10px] font-bold tracking-widest">
                      Payload Sequence (HEX / ASCII)
                    </label>
                    <input
                      type="text"
                      value={payload}
                      onChange={(e) => setPayload(e.target.value)}
                      className="w-full glass-panel border border-hairline p-3 text-primary-ui rounded-card focus:outline-none focus:border-accent-warn focus:shadow-[0_0_15px_rgba(255,153,0,0.3)] transition-all"
                    />
                  </motion.div>

                  {/* Carrier Frequency Slider */}
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end">
                      <label className="text-tertiary-ui uppercase text-[10px] font-bold tracking-widest">Carrier Frequency</label>
                      <span className="text-accent-warn font-bold drop-shadow-[0_0_8px_rgba(255,153,0,0.5)]">{currentFreqKhz} kHz</span>
                    </div>
                    <input
                      type="range"
                      min={180}
                      max={220}
                      value={freqSliderVal}
                      onChange={(e) => setFreqSliderVal(Number(e.target.value))}
                      className="w-full accent-accent-warn"
                    />
                    <div className="flex justify-between text-[10px] text-tertiary-ui font-bold">
                      <span>18.0 kHz</span>
                      <span>20.0 kHz</span>
                      <span>22.0 kHz</span>
                    </div>
                  </motion.div>

                  {/* Burst Duration Slider */}
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end">
                      <label className="text-tertiary-ui uppercase text-[10px] font-bold tracking-widest">Burst Duration</label>
                      <span className="text-accent-warn font-bold drop-shadow-[0_0_8px_rgba(255,153,0,0.5)]">{durSliderVal} ms</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={200}
                      step={10}
                      value={durSliderVal}
                      onChange={(e) => setDurSliderVal(Number(e.target.value))}
                      className="w-full accent-accent-warn"
                    />
                    <div className="flex justify-between text-[10px] text-tertiary-ui font-bold">
                      <span>10 ms</span>
                      <span>100 ms</span>
                      <span>200 ms</span>
                    </div>
                  </motion.div>
                </div>

                {/* Transmit Button */}
                <motion.button
                  whileHover={{ scale: isTransmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isTransmitting ? 1 : 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={handleTransmit}
                  disabled={isTransmitting}
                  className={`w-full py-4 rounded-card uppercase font-bold tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer mt-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-warn ${
                    isTransmitting 
                      ? 'bg-surface-2 text-tertiary-ui cursor-not-allowed border border-hairline' 
                      : 'bg-accent-warn/10 text-accent-warn border border-accent-warn shadow-[0_0_30px_rgba(255,153,0,0.3)] hover:bg-accent-warn hover:text-white hover:shadow-[0_0_40px_rgba(255,153,0,0.5)]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[18px] ${isTransmitting ? 'animate-spin' : ''}`}>
                    {isTransmitting ? 'sync' : 'cell_tower'}
                  </span>
                  {isTransmitting ? 'TRANSMITTING SIGNAL...' : 'Transmit Covert Acoustic Signal'}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Spectrogram Preview Canvas */}
        <div className="glass-panel-heavy rounded-xl flex flex-col relative overflow-hidden min-h-[350px] border border-hairline">
          <div className="px-4 py-2 border-b border-hairline glass-panel flex justify-between items-center z-10">
            <span className="font-bold text-primary-ui uppercase tracking-wider">
              REAL-TIME SPECTROGRAM
            </span>
            <span className="text-accent-safe text-[10px] font-bold drop-shadow-[0_0_5px_rgba(62,207,142,0.8)]">SPAN: 15-25 kHz</span>
          </div>

          <div className="flex-1 relative glass-panel flex flex-col">
            <AnimatePresence>
              {panelState === 'loading' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-tertiary-ui z-10 glass-panel backdrop-blur-md">
                   <span className="material-symbols-outlined animate-spin text-[32px]">sync</span>
                   <span className="tracking-widest">CALIBRATING SENSORS...</span>
                </motion.div>
              )}
              {panelState === 'empty' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-tertiary-ui z-10 glass-panel backdrop-blur-md">
                   <span className="material-symbols-outlined text-[32px]">blur_on</span>
                   <span className="tracking-widest">NO SIGNAL.</span>
                </motion.div>
              )}
              {panelState === 'error' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-accent-critical z-10 glass-panel backdrop-blur-md">
                   <span className="material-symbols-outlined text-[32px]">warning</span>
                   <span className="tracking-widest font-bold">SENSOR ERROR.</span>
                </motion.div>
              )}
            </AnimatePresence>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block mix-blend-screen" />
          </div>
        </div>
      </section>

      {/* Event Console */}
      <section className="h-44 glass-panel-heavy rounded-xl flex flex-col overflow-hidden border border-hairline">
        <div className="px-4 py-2 border-b border-hairline glass-panel flex justify-between items-center z-10">
          <span className="text-secondary-ui uppercase tracking-wider font-bold">
            EVENT LOG CONSOLE
          </span>
          <button onClick={() => setLogs([])} className="text-tertiary-ui hover:text-primary-ui uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe active:scale-[0.97] px-2 py-1 rounded transition-colors font-bold tracking-widest text-[10px]">
            Clear
          </button>
        </div>
        <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-1 relative">
          <AnimatePresence>
            {logs.map((item) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="flex gap-3 text-secondary-ui"
              >
                <span className="text-tertiary-ui">{item.time}</span>
                <span className={`${item.color} font-bold`}>[{item.level}]</span>
                <span className="text-primary-ui">{item.msg}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={consoleEndRef} />
        </div>
      </section>
    </motion.div>
  );
};
