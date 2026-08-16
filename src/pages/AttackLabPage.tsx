import React, { useState, useEffect, useRef } from 'react';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';

export const AttackLabPage: React.FC = () => {
  const [payload, setPayload] = useState('0x41 0x43 0x4F 0x55 0x53 0x54 0x49 0x43');
  const [freqSliderVal, setFreqSliderVal] = useState(205);
  const [durSliderVal, setDurSliderVal] = useState(50);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [panelState, setPanelState] = useState<'happy' | 'loading' | 'empty' | 'error'>('happy');
  const [logs, setLogs] = useState<Array<{ time: string; level: string; msg: string; color: string }>>([
    { time: '14:02:11.405', level: 'INFO', msg: 'System initialized. Terminal v2.4.0 active.', color: 'text-tertiary-ui' },
    { time: '14:02:11.450', level: 'INFO', msg: 'Audio interfaces enumerated. Selected virtual sink: V-AUDIO_SINK_01', color: 'text-tertiary-ui' },
    { time: '14:02:11.902', level: 'OK', msg: 'Modulation engine ready. Standing by for payload.', color: 'text-accent-safe' },
  ]);

  const triggerSimulatedAttack = useThreatStore((s) => s.triggerSimulatedAttack);
  const currentState = useThreatStore((s) => s.currentState);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const consoleEndRef = useRef<HTMLDivElement | null>(null);

  const currentFreqKhz = (freqSliderVal / 10).toFixed(1);

  const addLog = (level: string, message: string, colorClass: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;
    setLogs((prev) => [...prev, { time: timeStr, level, msg: message, color: colorClass }]);
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

      ctx.fillStyle = '#07080A';
      ctx.fillRect(0, 0, w, 1);

      for (let i = 0; i < w; i += 4) {
        if (Math.random() > 0.8) {
          ctx.fillStyle = `rgba(60, 60, 60, ${Math.random() * 0.3})`;
          ctx.fillRect(i, 0, 4, 1);
        }
      }

      const activeFreq = Number(currentFreqKhz);
      if (isTransmitting || currentState !== 'SAFE') {
        const normalizedFreq = (activeFreq - 15) / 10;
        const centerPx = Math.floor(normalizedFreq * w);

        const gradient = ctx.createLinearGradient(centerPx - 20, 0, centerPx + 20, 0);
        gradient.addColorStop(0, 'rgba(62, 207, 142, 0)');
        gradient.addColorStop(0.4, 'rgba(62, 207, 142, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.6, 'rgba(62, 207, 142, 0.8)');
        gradient.addColorStop(1, 'rgba(62, 207, 142, 0)');

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
    <div className="font-mono text-xs flex-1 flex flex-col p-4 gap-4 max-w-7xl mx-auto w-full">
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
          <div className="flex bg-surface-2 border border-hairline rounded-card p-0.5 text-[10px]">
            <button
              onClick={() => setPanelState('happy')}
              className={`px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe ${panelState === 'happy' ? 'bg-overlay text-primary-ui font-bold' : 'text-tertiary-ui'}`}
            >
              LIVE
            </button>
            <button
              onClick={() => setPanelState('loading')}
              className={`px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe ${panelState === 'loading' ? 'bg-overlay text-primary-ui font-bold' : 'text-tertiary-ui'}`}
            >
              LOAD
            </button>
            <button
              onClick={() => setPanelState('empty')}
              className={`px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe ${panelState === 'empty' ? 'bg-overlay text-primary-ui font-bold' : 'text-tertiary-ui'}`}
            >
              EMPTY
            </button>
            <button
              onClick={() => setPanelState('error')}
              className={`px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe ${panelState === 'error' ? 'bg-overlay text-primary-ui font-bold' : 'text-tertiary-ui'}`}
            >
              ERR
            </button>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-surface-2 border border-hairline rounded-sm text-accent-safe font-bold">
            <span className="w-2 h-2 rounded-full bg-accent-safe animate-pulse" />
            SIMULATOR ENGINE: ONLINE
          </div>
        </div>
      </header>

      {/* 2 Column Main Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-[420px]">
        {/* Left: Transmitter Controls */}
        <div className="card-panel flex flex-col">
          <div className="px-4 py-2 border-b border-hairline bg-surface-2 flex justify-between items-center">
            <span className="font-bold text-primary-ui uppercase tracking-wider">
              TRANSMITTER CONTROL PANEL
            </span>
            <span className="text-tertiary-ui text-[10px]">NODE: LAB_TX_01</span>
          </div>

          {panelState === 'loading' && (
            <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-tertiary-ui flex-1">
               <span className="material-symbols-outlined animate-spin">sync</span>
               <span>INITIALIZING TRANSMITTER...</span>
            </div>
          )}
          {panelState === 'empty' && (
            <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-tertiary-ui flex-1">
               <span className="material-symbols-outlined">blur_on</span>
               <span>NO HARDWARE DETECTED.</span>
            </div>
          )}
          {panelState === 'error' && (
            <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-accent-critical flex-1">
               <span className="material-symbols-outlined">warning</span>
               <span>HARDWARE FAULT: CONNECTION REFUSED.</span>
            </div>
          )}
          {panelState === 'happy' && (
            <div className="p-4 flex flex-col justify-between flex-1 gap-6">
              <div className="flex flex-col gap-4">
                {/* Payload Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-tertiary-ui uppercase text-[10px]">
                    Payload Sequence (HEX / ASCII)
                  </label>
                  <input
                    type="text"
                    value={payload}
                    onChange={(e) => setPayload(e.target.value)}
                    className="w-full bg-surface-2 border border-hairline p-3 text-primary-ui rounded-card focus:outline-none focus:border-accent-safe transition-colors"
                  />
                </div>

                {/* Carrier Frequency Slider */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-end">
                    <label className="text-tertiary-ui uppercase text-[10px]">Carrier Frequency</label>
                    <span className="text-primary-ui font-bold">{currentFreqKhz} kHz</span>
                  </div>
                  <input
                    type="range"
                    min={180}
                    max={220}
                    value={freqSliderVal}
                    onChange={(e) => setFreqSliderVal(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-tertiary-ui">
                    <span>18.0 kHz</span>
                    <span>20.0 kHz</span>
                    <span>22.0 kHz</span>
                  </div>
                </div>

                {/* Burst Duration Slider */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-end">
                    <label className="text-tertiary-ui uppercase text-[10px]">Burst Duration</label>
                    <span className="text-primary-ui font-bold">{durSliderVal} ms</span>
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
                  <div className="flex justify-between text-[10px] text-tertiary-ui">
                    <span>10 ms</span>
                    <span>100 ms</span>
                    <span>200 ms</span>
                  </div>
                </div>
              </div>

              {/* Transmit Button (Normal flow, no absolute positioning!) */}
              <button
                onClick={handleTransmit}
                disabled={isTransmitting}
                className={`w-full bg-accent-neutral text-canvas py-4 rounded-card uppercase font-bold tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-elevation-2 mt-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe active:scale-[0.97] ${
                  isTransmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className={`material-symbols-outlined text-[18px] ${isTransmitting ? 'animate-spin' : ''}`}>
                  {isTransmitting ? 'sync' : 'cell_tower'}
                </span>
                {isTransmitting ? 'TRANSMITTING SIGNAL...' : 'Transmit Covert Acoustic Signal'}
              </button>
            </div>
          )}
        </div>

        {/* Right: Spectrogram Preview Canvas */}
        <div className="card-panel flex flex-col relative overflow-hidden min-h-[350px]">
          <div className="px-4 py-2 border-b border-hairline bg-surface-2 flex justify-between items-center">
            <span className="font-bold text-primary-ui uppercase tracking-wider">
              REAL-TIME SPECTROGRAM
            </span>
            <span className="text-accent-safe text-[10px] font-bold">SPAN: 15-25 kHz</span>
          </div>

          <div className="flex-1 relative bg-surface-1 flex flex-col">
            {panelState === 'loading' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-tertiary-ui z-10 bg-surface-1/80 backdrop-blur-sm">
                 <span className="material-symbols-outlined animate-spin">sync</span>
                 <span>CALIBRATING SENSORS...</span>
              </div>
            )}
            {panelState === 'empty' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-tertiary-ui z-10 bg-surface-1/80 backdrop-blur-sm">
                 <span className="material-symbols-outlined">blur_on</span>
                 <span>NO SIGNAL.</span>
              </div>
            )}
            {panelState === 'error' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-accent-critical z-10 bg-surface-1/80 backdrop-blur-sm">
                 <span className="material-symbols-outlined">warning</span>
                 <span>SENSOR ERROR.</span>
              </div>
            )}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
          </div>
        </div>
      </section>

      {/* Event Console */}
      <section className="h-44 card-panel flex flex-col overflow-hidden">
        <div className="px-4 py-2 border-b border-hairline bg-surface-2 flex justify-between items-center">
          <span className="text-secondary-ui uppercase tracking-wider font-bold">
            EVENT LOG CONSOLE
          </span>
          <button onClick={() => setLogs([])} className="text-tertiary-ui hover:text-primary-ui uppercase focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe active:scale-[0.97] px-2 py-1 rounded">
            Clear
          </button>
        </div>
        <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-1">
          {logs.map((item, idx) => (
            <div key={idx} className="flex gap-3 text-secondary-ui">
              <span className="text-tertiary-ui">{item.time}</span>
              <span className={item.color}>[{item.level}]</span>
              <span className="text-primary-ui">{item.msg}</span>
            </div>
          ))}
          <div ref={consoleEndRef} />
        </div>
      </section>
    </div>
  );
};
