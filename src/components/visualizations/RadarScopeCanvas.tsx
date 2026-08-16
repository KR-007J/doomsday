import React, { useEffect, useRef } from 'react';

interface RadarScopeCanvasProps {
  size?: number;
}

export const RadarScopeCanvas: React.FC<RadarScopeCanvasProps> = ({ size = 220 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = size;
    canvas.height = size;

    let animId: number;
    let angle = 0;

    function render() {
      if (!canvas || !ctx) return;
      const c = size / 2;
      const radius = size * 0.42;

      ctx.clearRect(0, 0, size, size);

      // Draw concentric radar rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;

      [0.3, 0.65, 1.0].forEach((rMult) => {
        ctx.beginPath();
        ctx.arc(c, c, radius * rMult, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Crosshair lines
      ctx.beginPath();
      ctx.moveTo(c, c - radius);
      ctx.lineTo(c, c + radius);
      ctx.moveTo(c - radius, c);
      ctx.lineTo(c + radius, c);
      ctx.stroke();

      // Sweeping radar beam gradient
      ctx.save();
      ctx.translate(c, c);
      ctx.rotate(angle);

      const grad = ctx.createConicGradient(0, 0, 0);
      grad.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
      grad.addColorStop(0.1, 'rgba(16, 185, 129, 0.1)');
      grad.addColorStop(0.3, 'rgba(16, 185, 129, 0)');
      grad.addColorStop(1, 'rgba(16, 185, 129, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();

      // Sweeping radar line
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#10B981';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius, 0);
      ctx.stroke();

      ctx.restore();

      // Threat Target Pings
      // Ping 1: SIG-11 (Red Threat)
      const target1X = c - radius * 0.55;
      const target1Y = c + radius * 0.4;
      ctx.fillStyle = '#EF4444';
      ctx.shadowColor = '#EF4444';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(target1X, target1Y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = '#EF4444';
      ctx.fillText('SIG-11', target1X + 8, target1Y + 3);

      // Ping 2: SIG-02 (Amber Anomaly)
      const target2X = c + radius * 0.45;
      const target2Y = c + radius * 0.5;
      ctx.fillStyle = '#F59E0B';
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(target2X, target2Y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#F59E0B';
      ctx.fillText('SIG-02', target2X + 8, target2Y + 3);

      angle += 0.03;
      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [size]);

  return (
    <div className="flex items-center justify-center relative">
      <canvas ref={canvasRef} width={size} height={size} className="block" />
    </div>
  );
};
