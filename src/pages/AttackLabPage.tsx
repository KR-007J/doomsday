import React, { useState, useEffect, useRef } from 'react';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';

export const AttackLabPage: React.FC = () => {
  const [payload, setPayload] = useState('0x41 0x43 0x4F 0x55 0x53 0x54 0x49 0x43');
  const [freqSliderVal, setFreqSliderVal] = useState(205); // 20.5 kHz
  const [durSliderVal, setDurSliderVal] = useState(50); // 50 ms
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [logs, setLogs] = useState<Array<{ time: string; level: string; msg: string; color: string }>>([
    { time: '14:02:11.405', level: 'INFO', msg: 'System initialized. Terminal v2.4.0 active.', color: 'text-[#a39f97]' },
    { time: '14:02:11.450', level: 'INFO', msg: 'Audio interfaces enumerated. Selected virtual sink: V-AUDIO_SINK_01', color: 'text-[#a39f97]' },
    { time: '14:02:11.902', level: 'OK', msg: 'Modulation engine ready. Standing by for payload.', color: 'text-[#10b981]' },
  ]);

  const triggerSimulatedAttack = useThreatStore((s) => s.triggerSimulatedAttack);
  const resetToSafe = useThreatStore((s) => s.resetToSafe);
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

      // Shift existing pixels down
      if (h > 1) {
        const imgData = ctx.getImageData(0, 0, w, h - 1);
        ctx.putImageData(imgData, 0, 1);
      }

      // Draw new line at top
      ctx.fillStyle = '#080707';
      ctx.fillRect(0, 0, w, 1);

      // Background ambient noise
      for (let i = 0; i < w; i += 4) {
        if (Math.random() > 0.8) {
          ctx.fillStyle = `rgba(40, 38, 35, ${Math.random() * 0.3})`;
          ctx.fillRect(i, 0, 4, 1);
        }
      }

      // If transmitting or in Threat state, render active signal peak
      const activeFreq = Number(currentFreqKhz);
      if (isTransmitting || currentState !== 'SAFE') {
        const normalizedFreq = (activeFreq - 15) / 10;
        const centerPx = Math.floor(normalizedFreq * w);

        const gradient = ctx.createLinearGradient(centerPx - 20, 0, centerPx + 20, 0);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0)');
        gradient.addColorStop(0.4, 'rgba(16, 185, 129, 0.8)');
        gradient.addColorStop(0.5, 'rgba(244, 243, 241, 1)');
        gradient.addColorStop(0.6, 'rgba(16, 185, 129, 0.8)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(centerPx - 20, 0, 40, 1);

        ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
        ctx.fillRect(centerPx - 45, 0, 10, 1);
        ctx.fillRect(centerPx + 35, 0, 10, 1);
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

    addLog('EXEC', `Initializing FSK modulation. Target Freq: ${currentFreqKhz} kHz, Burst: ${durSliderVal} ms`, 'text-[#d97706]');
    addLog('DATA', `Payload loaded: ${payload}`, 'text-outline');

    // Trigger state machine sequence
    triggerSimulatedAttack({
      payload,
      frequencyMin: Number(currentFreqKhz) * 1000 - 500,
      frequencyMax: Number(currentFreqKhz) * 1000 + 500,
      duration: durSliderVal / 10,
    });

    setTimeout(() => {
      setIsTransmitting(false);
      addLog('OK', `Transmission sequence complete. Buffer flushed & SOC Threat Logged.`, 'text-[#10b981]');
    }, Math.max(durSliderVal * 20, 2000));
  };

  return (
    <div className="font-body-md text-body-md min-h-[calc(100vh-4rem)] flex flex-col p-margin-page gap-margin-page bg-[#0e0d0c]">
      {/* Header Area */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant pb-stack-gap">
        <div>
          <h1 className="font-display-lg-mobile md:font-headline-md text-headline-md text-primary tracking-tight font-bold">
            Attack Lab <span className="text-on-surface-variant font-normal">// Acoustic Transmitter Suite</span>
          </h1>
          <p className="font-data-mono text-data-mono text-on-surface-variant mt-1 uppercase">
            Simulation environment isolated. OOB transmission protocol selected.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high border border-outline-variant rounded-sm text-primary font-label-caps text-label-caps">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
          Simulation Engine: Online
        </div>
      </header>

      {/* 4-Step Horizontal Pipeline */}
      <section className="flex flex-col lg:flex-row w-full gap-gutter">
        {/* Step 1 */}
        <div className="flex-1 bg-surface-container border border-outline-variant p-card-padding flex items-center gap-4">
          <div className="w-8 h-8 rounded-full border border-primary flex items-center justify-center text-primary font-data-mono text-data-mono flex-shrink-0 font-bold">
            1
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Phase One</span>
            <span className="font-body-md text-body-md text-primary font-medium">FSK Encoding</span>
          </div>
          <span className="material-symbols-outlined ml-auto text-on-surface-variant opacity-50 hidden xl:block">
            arrow_forward
          </span>
        </div>

        {/* Step 2 */}
        <div className="flex-1 bg-surface-container border border-outline-variant p-card-padding flex items-center gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="w-8 h-8 rounded-full border border-primary bg-primary/10 flex items-center justify-center text-primary font-data-mono text-data-mono flex-shrink-0 z-10 font-bold">
            2
          </div>
          <div className="flex flex-col z-10">
            <span className="font-label-caps text-label-caps text-primary uppercase font-bold">Active Target</span>
            <span className="font-body-md text-body-md text-primary font-medium">Ultrasonic Modulation</span>
          </div>
          <span className="material-symbols-outlined ml-auto text-primary z-10 hidden xl:block">
            arrow_forward
          </span>
        </div>

        {/* Step 3 */}
        <div className={`flex-1 bg-surface-container border border-outline-variant p-card-padding flex items-center gap-4 transition-opacity ${currentState !== 'SAFE' ? 'opacity-100' : 'opacity-50'}`}>
          <div className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant font-data-mono text-data-mono flex-shrink-0">
            3
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              {currentState !== 'SAFE' ? 'In Progress' : 'Pending'}
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant">Acoustic Propagation</span>
          </div>
          <span className="material-symbols-outlined ml-auto text-on-surface-variant hidden xl:block">
            arrow_forward
          </span>
        </div>

        {/* Step 4 */}
        <div className={`flex-1 bg-surface-container border border-outline-variant p-card-padding flex items-center gap-4 transition-opacity ${currentState === 'THREAT_LOGGED' ? 'opacity-100' : 'opacity-50'}`}>
          <div className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant font-data-mono text-data-mono flex-shrink-0">
            4
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
              {currentState === 'THREAT_LOGGED' ? 'Logged' : 'Pending'}
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant">SOC Detection &amp; Log</span>
          </div>
        </div>
      </section>

      {/* Main Content Area: 2 Columns */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-gutter flex-1 min-h-[420px]">
        {/* Left: Transmitter Control Panel */}
        <div className="bg-surface-container border border-outline-variant flex flex-col">
          <div className="px-card-padding py-3 border-b border-outline-variant bg-surface-container-high flex justify-between items-center">
            <h2 className="font-label-caps text-label-caps text-primary uppercase tracking-wider flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              Transmitter Control Panel
            </h2>
            <span className="font-data-mono text-data-mono text-on-surface-variant">NODE: LAB_TX_01</span>
          </div>

          <div className="p-card-padding flex flex-col gap-6 flex-1 justify-between">
            <div className="flex flex-col gap-5">
              {/* Payload Input */}
              <div className="flex flex-col gap-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Payload Sequence (HEX/ASCII)
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant text-primary font-data-mono text-data-mono p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    type="text"
                    value={payload}
                    onChange={(e) => setPayload(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant font-data-mono text-data-mono text-[10px]">
                    32 BYTES
                  </div>
                </div>
              </div>

              {/* Carrier Frequency Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Carrier Frequency
                  </label>
                  <span className="font-data-mono text-data-mono text-primary font-bold">{currentFreqKhz} kHz</span>
                </div>
                <input
                  className="w-full mt-1"
                  max={220}
                  min={180}
                  type="range"
                  value={freqSliderVal}
                  onChange={(e) => setFreqSliderVal(Number(e.target.value))}
                />
                <div className="flex justify-between font-data-mono text-[10px] text-on-surface-variant">
                  <span>18.0 kHz (Min)</span>
                  <span>20.0 kHz (Mid)</span>
                  <span>22.0 kHz (Max)</span>
                </div>
              </div>

              {/* Burst Duration Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Burst Duration
                  </label>
                  <span className="font-data-mono text-data-mono text-primary font-bold">{durSliderVal} ms</span>
                </div>
                <input
                  className="w-full mt-1"
                  max={200}
                  min={10}
                  step={10}
                  type="range"
                  value={durSliderVal}
                  onChange={(e) => setDurSliderVal(Number(e.target.value))}
                />
                <div className="flex justify-between font-data-mono text-[10px] text-on-surface-variant">
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
              className={`w-full bg-primary text-surface font-label-caps text-label-caps py-4 uppercase tracking-widest hover:bg-primary-fixed transition-colors active:scale-[0.99] flex items-center justify-center gap-2 border border-primary font-bold mt-4 ${
                isTransmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${isTransmitting ? 'animate-spin' : ''}`}>
                {isTransmitting ? 'sync' : 'cell_tower'}
              </span>
              {isTransmitting ? 'TRANSMITTING SIGNAL...' : 'Transmit Covert Acoustic Signal'}
            </button>
          </div>
        </div>

        {/* Right: Real-time Spectrogram Panel */}
        <div className="bg-surface-container border border-outline-variant flex flex-col relative overflow-hidden min-h-[350px]">
          <div className="px-card-padding py-3 border-b border-outline-variant bg-surface-container-high flex justify-between items-center z-10 relative shadow-sm">
            <h2 className="font-label-caps text-label-caps text-primary uppercase tracking-wider flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-[16px]">waterfall_chart</span>
              Real-Time Spectrogram
            </h2>
            <div className="flex items-center gap-3">
              <span className="font-data-mono text-data-mono text-on-surface-variant text-[10px]">SPAN: 15-25 kHz</span>
              <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
            </div>
          </div>

          <div className="flex-1 relative bg-surface-container-lowest flex flex-col">
            {/* Y-Axes overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-12 border-r border-outline-variant flex flex-col justify-between items-center py-2 z-10 bg-surface-container-lowest/80 backdrop-blur-sm pointer-events-none">
              <span className="font-data-mono text-[9px] text-on-surface-variant transform -rotate-90 origin-center whitespace-nowrap mt-4">
                TIME (s)
              </span>
              <div className="flex flex-col justify-between h-full w-full items-end pr-1 pb-4">
                <span className="font-data-mono text-[9px] text-outline">0.0</span>
                <span className="font-data-mono text-[9px] text-outline">-1.0</span>
                <span className="font-data-mono text-[9px] text-outline">-2.0</span>
                <span className="font-data-mono text-[9px] text-outline">-3.0</span>
                <span className="font-data-mono text-[9px] text-outline">-4.0</span>
              </div>
            </div>

            {/* X-Axes overlays */}
            <div className="absolute bottom-0 left-12 right-0 h-6 border-t border-outline-variant flex justify-between px-2 items-center z-10 bg-surface-container-lowest/80 backdrop-blur-sm pointer-events-none">
              <span className="font-data-mono text-[9px] text-outline">15k</span>
              <span className="font-data-mono text-[9px] text-outline">17.5k</span>
              <span className="font-data-mono text-[9px] text-outline">20k</span>
              <span className="font-data-mono text-[9px] text-outline">22.5k</span>
              <span className="font-data-mono text-[9px] text-outline">25k</span>
            </div>

            {/* Canvas for waterfall rendering */}
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-12 right-0 bottom-6 w-[calc(100%-3rem)] h-[calc(100%-1.5rem)] block"
            />
            <div className="scanline" />
          </div>
        </div>
      </section>

      {/* Bottom: Event Log Console */}
      <section className="h-56 bg-surface-container-lowest border border-outline-variant flex flex-col flex-shrink-0">
        <div className="px-card-padding py-2 border-b border-outline-variant bg-surface-container-high flex justify-between items-center">
          <h2 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider flex items-center gap-2 font-bold">
            <span className="material-symbols-outlined text-[16px]">terminal</span>
            Event Log Console
          </h2>
          <button
            onClick={() => setLogs([])}
            className="text-on-surface-variant hover:text-primary font-data-mono text-[10px] uppercase cursor-pointer"
          >
            Clear
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto font-data-mono text-data-mono flex flex-col gap-1">
          {logs.map((item, idx) => (
            <div key={idx} className="flex gap-3 text-on-surface-variant">
              <span className="text-outline">{item.time}</span>
              <span className={item.color}>[{item.level}]</span>
              <span className="text-primary">{item.msg}</span>
            </div>
          ))}
          <div ref={consoleEndRef} />
        </div>
      </section>
    </div>
  );
};
