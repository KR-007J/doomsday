import React, { useEffect, useRef } from 'react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';

interface SpectrogramCanvasProps {
  height?: number;
}

export const SpectrogramCanvas: React.FC<SpectrogramCanvasProps> = ({ height = 300 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentState = useThreatStore((s) => s.currentState);
  const activeCenter = useThreatStore((s) => s.activeFrequencyCenter);

  const historyRef = useRef<number[][]>([]);
  const maxRows = 120;
  const numBins = 128;

  // Initialize waterfall history matrix on mount so it renders immediately with noise
  useEffect(() => {
    const initialHistory: number[][] = [];
    for (let r = 0; r < maxRows; r++) {
      const row: number[] = new Array(numBins).fill(0);
      for (let b = 0; b < numBins; b++) {
        row[b] = 0.08 + Math.random() * 0.14; // Visible baseline noise floor
      }
      initialHistory.push(row);
    }
    historyRef.current = initialHistory;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Handle high-DPI resolution & container resizing
    const updateCanvasDimensions = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      const widthPx = Math.floor(rect.width);
      const heightPx = Math.floor(rect.height || height);

      if (canvas.width !== widthPx || canvas.height !== heightPx) {
        canvas.width = widthPx;
        canvas.height = heightPx;
      }
    };

    updateCanvasDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasDimensions();
    });
    resizeObserver.observe(container);

    const config = THREAT_STATE_CONFIGS[currentState];
    const isThreat = currentState !== 'SAFE';

    const render = () => {
      updateCanvasDimensions();

      const w = canvas.width;
      const h = canvas.height;

      if (w === 0 || h === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // 1. Generate new FFT slice for top row
      const newRow: number[] = new Array(numBins).fill(0);
      const isDetected = currentState === 'SIGNAL_DETECTED';
      const isAnalyzing = currentState === 'ANALYZING';

      for (let i = 0; i < numBins; i++) {
        const freq = 16000 + (i / numBins) * 8000;
        let amp = 0.08 + Math.random() * 0.12; // Baseline SAFE noise

        if (isThreat) {
          const dist = Math.abs(freq - activeCenter);
          const bandwidth = 1000; // Hz

          if (dist < bandwidth) {
            const intensity = (1 - dist / bandwidth);
            const burstModulation = Math.sin(Date.now() / 100 + i * 0.5) * 0.2;
            
            let threatBoost = 0.45;
            if (isDetected) threatBoost = 0.60;
            if (isAnalyzing) threatBoost = 0.78;
            if (currentState === 'POTENTIAL_COVERT_COMMUNICATION' || currentState === 'THREAT_LOGGED') {
              threatBoost = 0.90;
            }

            amp += intensity * threatBoost + burstModulation;
          }
        }

        newRow[i] = Math.min(1.0, Math.max(0.0, amp));
      }

      // 2. Unshift new row to top of waterfall history
      historyRef.current.unshift(newRow);
      if (historyRef.current.length > maxRows) {
        historyRef.current.pop();
      }

      // 3. Render waterfall matrix onto Canvas
      const rowH = h / maxRows;
      const binW = w / numBins;

      ctx.fillStyle = '#07080A';
      ctx.fillRect(0, 0, w, h);

      for (let r = 0; r < historyRef.current.length; r++) {
        const row = historyRef.current[r];
        const y = r * rowH;

        for (let b = 0; b < row.length; b++) {
          const val = row[b];
          const x = b * binW;

          if (val > 0.60) {
            // Signal Anomaly (Accent Color)
            ctx.fillStyle = config.colorHex;
          } else if (val > 0.35) {
            // Mid-range FFT energy (Amber/Warm)
            ctx.fillStyle = `rgba(245, 166, 35, ${val * 0.85})`;
          } else if (val > 0.18) {
            // Ambient carrier noise (Emerald/Teal)
            ctx.fillStyle = `rgba(62, 207, 142, ${val * 0.7})`;
          } else {
            // Deep background floor
            ctx.fillStyle = `rgba(36, 39, 40, ${val * 0.6})`;
          }

          ctx.fillRect(x, y, binW + 0.6, rowH + 0.6);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [currentState, activeCenter, height]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${height}px` }}
      className="relative w-full overflow-hidden rounded-xl border border-[#242728] bg-[#0D0F12] shadow-lg flex flex-col justify-between"
    >
      {/* Header Overlay */}
      <div className="absolute top-2.5 left-3 z-10 flex items-center gap-2 font-mono text-[10px] pointer-events-none">
        <span className="text-slate-200 bg-[#07080A]/90 px-2 py-0.5 rounded border border-[#242728] uppercase font-semibold">
          REAL-TIME SPECTROGRAM (WATERFALL)
        </span>
        <span className="text-slate-400 bg-[#15171B]/90 px-2 py-0.5 rounded border border-[#242728]">
          16.0 kHz — 24.0 kHz
        </span>
      </div>

      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />

      {/* Frequency Labels Footer Overlay */}
      <div className="absolute bottom-1 left-0 right-0 px-3 flex justify-between text-[9px] font-mono text-slate-400 bg-[#07080A]/60 py-0.5 pointer-events-none">
        <span>16.0 kHz</span>
        <span>18.0 kHz</span>
        <span className="text-[#3ECF8E] font-bold">20.5 kHz (Subcarrier)</span>
        <span>22.0 kHz</span>
        <span>24.0 kHz</span>
      </div>
    </div>
  );
};
