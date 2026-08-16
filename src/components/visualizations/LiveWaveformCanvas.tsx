import React, { useEffect, useRef } from 'react';

interface LiveWaveformCanvasProps {
  height?: number;
  active?: boolean;
}

export const LiveWaveformCanvas: React.FC<LiveWaveformCanvasProps> = ({ height = 180, active = true }) => {
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
    let phase = 0;

    function render() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
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

      // Draw 3 overlapping sine waves (Red, Amber, Gold)
      const waves = [
        { color: '#EF4444', glow: 'rgba(239, 68, 68, 0.6)', freq: 0.015, amp: 28, speed: 1.2 },
        { color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.5)', freq: 0.012, amp: 22, speed: 0.9 },
        { color: '#E5E7EB', glow: 'rgba(229, 231, 235, 0.4)', freq: 0.008, amp: 16, speed: 0.6 },
      ];

      waves.forEach((wave) => {
        ctx.save();
        ctx.shadowColor = wave.glow;
        ctx.shadowBlur = 12;
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let x = 0; x < w - 20; x += 2) {
          const y = h / 2 + Math.sin(x * wave.freq + phase * wave.speed) * Math.cos(x * 0.002 + phase * 0.3) * wave.amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      });

      // Draw target sensor node cap line on the right
      const rightX = w - 15;
      ctx.fillStyle = '#EF4444';
      ctx.shadowColor = '#EF4444';
      ctx.shadowBlur = 15;
      ctx.fillRect(rightX, h / 2 - 25, 4, 50);

      phase += active ? 0.04 : 0.01;
      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [height, active]);

  return (
    <div className="w-full relative overflow-hidden">
      <canvas ref={canvasRef} style={{ height: `${height}px` }} className="w-full block" />
    </div>
  );
};
