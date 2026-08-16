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

  // Waterfall Spectrogram Canvas Rendering Loop (Calm and scientific)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resizeCanvas() {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = Math.max(100, rect.width);
      const h = Math.max(100, rect.height);
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

      ctx.fillStyle = 'rgba(22, 22, 24, 1)'; // Match surface-1 approx
      ctx.fillRect(0, 0, w, 1);

      // Noise floor
      for (let i = 0; i < w; i += 4) {
        if (Math.random() > 0.8) {
          ctx.fillStyle = `rgba(144, 144, 149, ${Math.random() * 0.15})`;
          ctx.fillRect(i, 0, 4, 1);
        }
      }

      const activeFreq = Number(currentFreqKhz);
      if (isTransmitting || currentState !== 'SAFE') {
        const normalizedFreq = (activeFreq - 15) / 10;
        const centerPx = Math.floor(normalizedFreq * w);

        const gradient = ctx.createLinearGradient(centerPx - 20, 0, centerPx + 20, 0);
        gradient.addColorStop(0, 'rgba(168, 135, 85, 0)');
        gradient.addColorStop(0.4, 'rgba(168, 135, 85, 0.4)');
        gradient.addColorStop(0.5, 'rgba(237, 237, 239, 0.8)'); // story-white
        gradient.addColorStop(0.6, 'rgba(168, 135, 85, 0.4)');
        gradient.addColorStop(1, 'rgba(168, 135, 85, 0)');

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
    <div className="font-mono text-xs flex-1 flex flex-col p-4 md:px-8 gap-6 max-w-[1400px] mx-auto w-full">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-hairline pb-4">
        <div>
          <h1 className="text-xl text-primary-ui font-sans font-medium">
            Attack Simulation Lab
          </h1>
          <p className="text-tertiary-ui mt-1">
            OOB Acoustic payload modulation environment
          </p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex bg-surface-1 border border-hairline rounded-sm p-1">
            {['happy', 'loading', 'empty', 'error'].map(state => (
              <button
                key={state}
                onClick={() => setPanelState(state as any)}
                className={`px-3 py-1 rounded-sm uppercase transition-colors ${
                  panelState === state 
                    ? 'bg-surface-2 text-primary-ui border border-hairline' 
                    : 'text-tertiary-ui hover:text-primary-ui hover:bg-surface-2/50 border border-transparent'
                }`}
              >
                {state === 'happy' ? 'Live' : state}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-1 border border-hairline rounded-sm text-secondary-ui">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-safe" />
            <span>Simulator Engine: Online</span>
          </div>
        </div>
      </header>

      {/* 2 Column Main Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[420px]">
        {/* Left: Transmitter Controls */}
        <div className="bg-surface-1 rounded-sm flex flex-col border border-hairline relative">
          <div className="px-5 py-3 border-b border-hairline bg-surface-2 flex justify-between items-center">
            <span className="text-primary-ui font-medium">Transmitter Control Panel</span>
            <span className="text-tertiary-ui">Node: LAB_TX_01</span>
          </div>

          <AnimatePresence mode="wait">
            {panelState === 'loading' && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 text-center flex flex-col items-center justify-center gap-3 text-tertiary-ui flex-1">
                 <span className="material-symbols-outlined animate-spin text-[24px]">sync</span>
                 <span>Initializing hardware...</span>
              </motion.div>
            )}
            {panelState === 'empty' && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 text-center flex flex-col items-center justify-center gap-3 text-tertiary-ui flex-1">
                 <span className="material-symbols-outlined text-[24px]">blur_on</span>
                 <span>No hardware detected.</span>
              </motion.div>
            )}
            {panelState === 'error' && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-8 text-center flex flex-col items-center justify-center gap-3 text-accent-critical flex-1">
                 <span className="material-symbols-outlined text-[24px]">warning</span>
                 <span>Hardware Fault: Connection Refused</span>
              </motion.div>
            )}
            {panelState === 'happy' && (
              <motion.div key="happy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="p-5 flex flex-col justify-between flex-1 gap-6">
                <div className="flex flex-col gap-6">
                  {/* Payload Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-secondary-ui">Payload Sequence (HEX / ASCII)</label>
                    <input
                      type="text"
                      value={payload}
                      onChange={(e) => setPayload(e.target.value)}
                      className="w-full bg-surface-2 border border-hairline p-3 text-primary-ui rounded-sm focus:outline-none focus:border-text-secondary transition-colors"
                    />
                  </div>

                  {/* Carrier Frequency Slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                      <label className="text-secondary-ui">Carrier Frequency</label>
                      <span className="text-primary-ui">{currentFreqKhz} kHz</span>
                    </div>
                    <input
                      type="range"
                      min={180}
                      max={220}
                      value={freqSliderVal}
                      onChange={(e) => setFreqSliderVal(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-tertiary-ui">
                      <span>18.0 kHz</span>
                      <span>20.0 kHz</span>
                      <span>22.0 kHz</span>
                    </div>
                  </div>

                  {/* Burst Duration Slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                      <label className="text-secondary-ui">Burst Duration</label>
                      <span className="text-primary-ui">{durSliderVal} ms</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={200}
                      step={10}
                      value={durSliderVal}
                      onChange={(e) => setDurSliderVal(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-tertiary-ui">
                      <span>10 ms</span>
                      <span>100 ms</span>
                      <span>200 ms</span>
                    </div>
                  </div>
                </div>

                {/* Transmit Button */}
                <button
                  onClick={handleTransmit}
                  disabled={isTransmitting}
                  className={`w-full py-3 rounded-sm transition-colors flex items-center justify-center gap-2 mt-4 ${
                    isTransmitting 
                      ? 'bg-surface-2 text-tertiary-ui border border-hairline cursor-not-allowed' 
                      : 'bg-primary-ui text-canvas hover:bg-white cursor-pointer'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[16px] ${isTransmitting ? 'animate-spin' : ''}`}>
                    {isTransmitting ? 'sync' : 'cell_tower'}
                  </span>
                  {isTransmitting ? 'Transmitting Signal...' : 'Transmit Sequence'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Spectrogram Preview Canvas */}
        <div className="bg-surface-1 rounded-sm flex flex-col relative overflow-hidden min-h-[350px] border border-hairline">
          <div className="px-5 py-3 border-b border-hairline bg-surface-2 flex justify-between items-center z-10">
            <span className="text-primary-ui font-medium">Real-Time Spectrogram</span>
            <span className="text-secondary-ui">Span: 15-25 kHz</span>
          </div>

          <div className="flex-1 relative flex flex-col">
            <AnimatePresence>
              {panelState === 'loading' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-tertiary-ui z-10 bg-surface-1/80">
                   <span className="material-symbols-outlined animate-spin text-[24px]">sync</span>
                   <span>Calibrating sensors...</span>
                </motion.div>
              )}
              {panelState === 'empty' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-tertiary-ui z-10 bg-surface-1/80">
                   <span className="material-symbols-outlined text-[24px]">blur_on</span>
                   <span>No signal</span>
                </motion.div>
              )}
              {panelState === 'error' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-accent-critical z-10 bg-surface-1/80">
                   <span className="material-symbols-outlined text-[24px]">warning</span>
                   <span>Sensor Error</span>
                </motion.div>
              )}
            </AnimatePresence>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
          </div>
        </div>
      </section>

      {/* Event Console */}
      <section className="h-48 bg-surface-1 rounded-sm flex flex-col overflow-hidden border border-hairline">
        <div className="px-5 py-2.5 border-b border-hairline bg-surface-2 flex justify-between items-center">
          <span className="text-secondary-ui font-medium">Event Log Console</span>
          <button onClick={() => setLogs([])} className="text-tertiary-ui hover:text-primary-ui px-2 py-1 rounded-sm transition-colors">
            Clear
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2">
          <AnimatePresence>
            {logs.map((item) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.1 }}
                className="flex gap-4 text-secondary-ui"
              >
                <span className="text-tertiary-ui shrink-0">{item.time}</span>
                <span className={`shrink-0 w-12 ${item.color}`}>{item.level}</span>
                <span className="text-primary-ui">{item.msg}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={consoleEndRef} />
        </div>
      </section>
    </div>
  );
};
