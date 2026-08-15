import React, { useEffect, useRef } from 'react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';

interface SpectrogramCanvasProps {
  height?: number;
}

export const SpectrogramCanvas: React.FC<SpectrogramCanvasProps> = ({ height = 240 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentState = useThreatStore((s) => s.currentState);
  const activeCenter = useThreatStore((s) => s.activeFrequencyCenter);

  const historyRef = useRef<number[][]>([]);
  const maxRows = 120;
  const numBins = 128;

  // Initialize waterfall history matrix on mount so it's never empty
  useEffect(() => {
    if (historyRef.current.length === 0) {
      const initialHistory: number[][] = [];
      for (let r = 0; r < maxRows; r++) {
        const row: number[] = new Array(numBins).fill(0);
        for (let b = 0; b < numBins; b++) {
          row[b] = Math.random() * 0.15; // Low noise floor
        }
        initialHistory.push(row);
      }
      historyRef.current = initialHistory;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const config = THREAT_STATE_CONFIGS[currentState];
    const isThreat = currentState !== 'SAFE';

    const render = () => {
      // 1. Generate new FFT slice for top row
      const newRow: number[] = new Array(numBins).fill(0);
      const isDetected = currentState === 'SIGNAL_DETECTED';
      const isAnalyzing = currentState === 'ANALYZING';

      for (let i = 0; i < numBins; i++) {
        // Frequency mapping: 16000 Hz to 24000 Hz
        const freq = 16000 + (i / numBins) * 8000;

        // Base noise floor (0.05 to 0.20)
        let amp = 0.08 + Math.random() * 0.10;

        if (isThreat) {
          const dist = Math.abs(freq - activeCenter);
          const bandwidth = 900; // Hz

          if (dist < bandwidth) {
            const intensity = (1 - dist / bandwidth);
            const burstModulation = Math.sin(Date.now() / 120 + i * 0.4) * 0.15;
            
            let threatBoost = 0.4;
            if (isDetected) threatBoost = 0.55;
            if (isAnalyzing) threatBoost = 0.72;
            if (currentState === 'POTENTIAL_COVERT_COMMUNICATION' || currentState === 'THREAT_LOGGED') {
              threatBoost = 0.88;
            }

            amp += intensity * threatBoost + burstModulation;
          }
        }

        newRow[i] = Math.min(1.0, Math.max(0.0, amp));
      }

      // 2. Push new row to top of waterfall history
      historyRef.current.unshift(newRow);
      if (historyRef.current.length > maxRows) {
        historyRef.current.pop();
      }

      // 3. Render waterfall matrix onto Canvas
      const w = canvas.width;
      const h = canvas.height;
      const rowH = h / maxRows;
      const binW = w / numBins;

      ctx.fillStyle = '#07080A';
      ctx.fillRect(0, 0, w, h);

      for (let r = 0; r < historyRef.current.length; r++) {
        const row = historyRef.current[r];
        const y = r * rowH;

        for (let b = 0; b < row.length; b++) {
          const val = row[b]; // 0.0 to 1.0
          const x = b * binW;

          if (val > 0.65) {
            // Signal Anomaly (Accent Color)
            ctx.fillStyle = config.colorHex;
          } else if (val > 0.40) {
            // Mid-range FFT energy
            ctx.fillStyle = `rgba(245, 166, 35, ${val * 0.8})`;
          } else if (val > 0.20) {
            // Ambient carrier floor
            ctx.fillStyle = `rgba(62, 207, 142, ${val * 0.6})`;
          } else {
            // Deep background noise
            ctx.fillStyle = `rgba(36, 39, 40, ${val * 0.5})`;
          }

          ctx.fillRect(x, y, binW + 0.5, rowH + 0.5);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentState, activeCenter]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-[#242728] bg-[#0D0F12] shadow-lg">
      <div className="absolute top-2.5 left-3 z-10 flex items-center gap-2 font-mono text-[10px]">
        <span className="text-slate-400 bg-[#07080A]/90 px-2 py-0.5 rounded border border-[#242728] uppercase font-semibold">
          REAL-TIME SPECTROGRAM (WATERFALL)
        </span>
        <span className="text-slate-300 bg-[#15171B]/90 px-2 py-0.5 rounded border border-[#242728]">
          16.0 kHz — 24.0 kHz
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={720}
        height={height}
        className="w-full h-full object-cover block"
      />

      {/* Axis Frequency Markers */}
      <div className="absolute bottom-1 left-0 right-0 px-3 flex justify-between text-[9px] font-mono text-slate-500 pointer-events-none">
        <span>16.0 kHz</span>
        <span>18.0 kHz</span>
        <span>20.0 kHz (Subcarrier)</span>
        <span>22.0 kHz</span>
        <span>24.0 kHz</span>
      </div>
    </div>
  );
};
