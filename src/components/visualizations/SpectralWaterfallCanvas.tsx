import React, { useEffect, useRef } from 'react';
import { generateFFTMatrix } from '../../services/mocks/mockThreatEvents';

interface SpectralWaterfallCanvasProps {
  height?: number;
  threatIntensity?: number;
  loading?: boolean;
  empty?: boolean;
  error?: boolean;
}

export const SpectralWaterfallCanvas: React.FC<SpectralWaterfallCanvasProps> = ({
  height = 320,
  threatIntensity = 0.2,
  loading = false,
  empty = false,
  error = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (loading || empty || error) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== height) {
        canvas.width = rect.width;
        canvas.height = height;
      }
    }
    window.addEventListener('resize', resize);
    resize();

    let animId: number;
    const matrix = generateFFTMatrix(40, 80, threatIntensity);

    function render() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw spectral heatmap matrix lines
      const rows = matrix.length;
      const cols = matrix[0].length;
      const cellW = w / cols;
      const cellH = h / rows;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const val = matrix[r][c];
          let fill = 'rgba(20, 20, 20, 0.5)';

          if (val > 0.7) {
            fill = `rgba(255, 92, 92, ${val})`; // Red threat
          } else if (val > 0.4) {
            fill = `rgba(245, 166, 35, ${val})`; // Amber warning
          } else if (val > 0.15) {
            fill = `rgba(62, 207, 142, ${val * 0.5})`; // Green ambient
          }

          ctx.fillStyle = fill;
          ctx.fillRect(c * cellW, r * cellH, cellW - 0.5, cellH - 0.5);
        }
      }

      // Continuous frequency spectrum line graph at bottom
      ctx.strokeStyle = '#F5A623';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#F5A623';
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const time = Date.now() * 0.003;
      for (let x = 0; x < w; x += 3) {
        const norm = x / w;
        let amp = Math.sin(norm * 15 + time) * 15 + Math.cos(norm * 30 + time * 1.5) * 8;
        if (norm > 0.55 && norm < 0.75) {
          amp += threatIntensity * 60;
        }
        const y = h - 40 - amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [height, threatIntensity, loading, empty, error]);

  // Handle Component States (Phase 3 Mandatory Panel States)
  if (loading) {
    return (
      <div style={{ height: `${height}px` }} className="w-full card-panel flex items-center justify-center animate-pulse">
        <div className="flex flex-col items-center gap-2 text-secondary-ui font-mono text-xs">
          <span className="material-symbols-outlined text-3xl animate-spin">sync</span>
          <span>CALIBRATING SPECTRAL WATERFALL...</span>
        </div>
      </div>
    );
  }

  if (empty) {
    return (
      <div style={{ height: `${height}px` }} className="w-full card-panel flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-tertiary-ui font-mono text-xs">
          <span className="material-symbols-outlined text-3xl">wifi_off</span>
          <span>NO ACTIVE SIGNAL DETECTED IN SPECTRUM</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ height: `${height}px` }} className="w-full card-panel flex items-center justify-center border-accent-critical/40">
        <div className="flex flex-col items-center gap-2 text-accent-critical font-mono text-xs">
          <span className="material-symbols-outlined text-3xl">error_med</span>
          <span>UPLINK CONNECTION DISCONNECTED</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative card-panel overflow-hidden">
      {/* Top Bar Header */}
      <div className="px-4 py-2 border-b border-hairline flex justify-between items-center bg-surface-2 font-mono text-xs">
        <span className="text-secondary-ui uppercase tracking-wider">SPECTRAL WATERFALL</span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-safe animate-pulse" />
          <span className="text-accent-safe font-bold uppercase tracking-wider">MONITORING ACTIVE</span>
        </div>
      </div>

      <div className="relative" style={{ height: `${height}px` }}>
        <canvas ref={canvasRef} style={{ height: `${height}px` }} className="w-full block" />

        {/* Y-Axis dB Markers */}
        <div className="absolute left-0 top-0 bottom-6 w-12 border-r border-hairline flex flex-col justify-between py-2 px-1 font-mono text-[10px] text-tertiary-ui pointer-events-none bg-surface-1/80">
          <span>0 dB</span>
          <span>-20 dB</span>
          <span>-40 dB</span>
          <span>-60 dB</span>
          <span>-80 dB</span>
        </div>

        {/* X-Axis Frequency Markers */}
        <div className="absolute left-12 bottom-0 right-0 h-6 border-t border-hairline flex justify-between items-center px-4 font-mono text-[10px] text-tertiary-ui pointer-events-none bg-surface-1/80">
          <span>14.000 GHz</span>
          <span>14.050 GHz</span>
          <span>14.100 GHz</span>
        </div>
      </div>
    </div>
  );
};
