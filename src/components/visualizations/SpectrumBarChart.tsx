import React, { useEffect, useRef } from 'react';

interface SpectrumBarChartProps {
  height?: number;
}

export const SpectrumBarChart: React.FC<SpectrumBarChartProps> = ({ height = 180 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
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
    const barCount = 36;

    function render() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      const barGap = 4;
      const barWidth = Math.max(2, (w - (barCount - 1) * barGap) / barCount);

      for (let i = 0; i < barCount; i++) {
        // Compute bar height with occasional high threat spikes at specific frequencies
        let baseRatio = Math.sin(i * 0.2 + Date.now() * 0.003) * 0.3 + 0.35;
        
        // Highlight threat spikes at index 14 (Amber) and index 26 (Red Threat Lock)
        let barColor = '#404040';
        let glowColor = 'transparent';

        if (i === 14) {
          baseRatio = 0.65 + Math.sin(Date.now() * 0.005) * 0.15;
          barColor = '#F59E0B';
          glowColor = 'rgba(245, 158, 11, 0.6)';
        } else if (i === 26) {
          baseRatio = 0.88 + Math.sin(Date.now() * 0.008) * 0.1;
          barColor = '#EF4444';
          glowColor = 'rgba(239, 68, 68, 0.8)';
        } else if (i % 3 === 0) {
          baseRatio += Math.random() * 0.15;
          barColor = '#737373';
        }

        const barH = baseRatio * (h - 20);
        const x = i * (barWidth + barGap);
        const y = h - barH;

        ctx.save();
        if (glowColor !== 'transparent') {
          ctx.shadowColor = glowColor;
          ctx.shadowBlur = 10;
        }
        ctx.fillStyle = barColor;
        ctx.fillRect(x, y, barWidth, barH);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [height]);

  return (
    <div className="w-full relative overflow-hidden">
      <canvas ref={canvasRef} style={{ height: `${height}px` }} className="w-full block" />
    </div>
  );
};
