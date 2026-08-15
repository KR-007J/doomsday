import React, { useEffect, useRef } from 'react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { generateMockSpectrogramRow } from '../../services/mockThreatEvents';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';

interface SpectrogramCanvasProps {
  height?: number;
}

export const SpectrogramCanvas: React.FC<SpectrogramCanvasProps> = ({ height = 240 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentState = useThreatStore((s) => s.currentState);
  const activeCenter = useThreatStore((s) => s.activeFrequencyCenter);

  const historyRef = useRef<number[][]>([]);
  const maxHistoryRows = 120;
  const numBins = 128;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      // Add new row at the top of history
      const newRow = generateMockSpectrogramRow(currentState, activeCenter, numBins);
      historyRef.current.unshift(newRow);
      if (historyRef.current.length > maxHistoryRows) {
        historyRef.current.pop();
      }

      const width = canvas.width;
      const h = canvas.height;
      const rowHeight = h / maxHistoryRows;
      const binWidth = width / numBins;

      ctx.clearRect(0, 0, width, h);

      const stateConfig = THREAT_STATE_CONFIGS[currentState];

      for (let r = 0; r < historyRef.current.length; r++) {
        const row = historyRef.current[r];
        const y = r * rowHeight;

        for (let b = 0; b < row.length; b++) {
          const val = row[b]; // 0.0 to 1.0
          const x = b * binWidth;

          // Color map: low = dark slate/navy, mid = cyan/purple, high = threat color (amber/red)
          if (val > 0.65) {
            // Signal anomaly highlight
            ctx.fillStyle = stateConfig.colorHex;
          } else if (val > 0.45) {
            ctx.fillStyle = `rgba(99, 102, 241, ${val})`;
          } else if (val > 0.25) {
            ctx.fillStyle = `rgba(14, 165, 233, ${val * 0.8})`;
          } else {
            ctx.fillStyle = `rgba(15, 23, 42, ${val * 0.5})`;
          }

          ctx.fillRect(x, y, binWidth + 0.5, rowHeight + 0.5);
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
    <div className="relative w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-950/80 shadow-inner">
      <div className="absolute top-2 left-3 z-10 flex items-center gap-2">
        <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
          REAL-TIME SPECTROGRAM (WATERFALL)
        </span>
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
          16 kHz — 24 kHz
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={720}
        height={height}
        className="w-full h-full object-cover block"
      />

      {/* Axis markers overlay */}
      <div className="absolute bottom-1 left-0 right-0 px-3 flex justify-between text-[9px] font-mono text-slate-500 pointer-events-none">
        <span>16.0 kHz</span>
        <span>18.0 kHz</span>
        <span>20.0 kHz (Near-Ultrasonic)</span>
        <span>22.0 kHz</span>
        <span>24.0 kHz</span>
      </div>
    </div>
  );
};
