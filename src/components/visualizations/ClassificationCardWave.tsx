import React, { useEffect, useRef } from 'react';

interface ClassificationCardWaveProps {
  color?: string;
  amplitude?: number;
  frequency?: number;
  height?: number;
}

export const ClassificationCardWave: React.FC<ClassificationCardWaveProps> = ({
  color = '#FFFFFF',
  amplitude = 18,
  frequency = 0.02,
  height = 90,
}) => {
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

      ctx.save();
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < w; x += 2) {
        const y = h / 2 + Math.sin(x * frequency + phase) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      phase += 0.03;
      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [color, amplitude, frequency, height]);

  return (
    <div className="w-full relative overflow-hidden my-3">
      <canvas ref={canvasRef} style={{ height: `${height}px` }} className="w-full block" />
    </div>
  );
};
