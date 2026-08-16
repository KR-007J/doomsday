import React, { useEffect, useRef } from 'react';

interface RadarSweepCanvasProps {
  size?: number;
}

export const RadarSweepCanvas: React.FC<RadarSweepCanvasProps> = ({ size = 280 }) => {
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

      // Concentric range rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;

      [0.3, 0.65, 1.0].forEach((mult) => {
        ctx.beginPath();
        ctx.arc(c, c, radius * mult, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Crosshair lines
      ctx.beginPath();
      ctx.moveTo(c, c - radius);
      ctx.lineTo(c, c + radius);
      ctx.moveTo(c - radius, c);
      ctx.lineTo(c + radius, c);
      ctx.stroke();

      // Degree Labels
      ctx.font = '9px "IBM Plex Mono", monospace';
      ctx.fillStyle = '#5C6167';
      ctx.textAlign = 'center';
      ctx.fillText('000°', c, c - radius - 6);
      ctx.fillText('180°', c, c + radius + 14);
      ctx.textAlign = 'left';
      ctx.fillText('090°', c + radius + 6, c + 3);
      ctx.textAlign = 'right';
      ctx.fillText('270°', c - radius - 6, c + 3);

      // Rotating Sweep Beam
      ctx.save();
      ctx.translate(c, c);
      ctx.rotate(angle);

      const grad = ctx.createConicGradient(0, 0, 0);
      grad.addColorStop(0, 'rgba(62, 207, 142, 0.35)');
      grad.addColorStop(0.1, 'rgba(62, 207, 142, 0.08)');
      grad.addColorStop(0.3, 'rgba(62, 207, 142, 0)');
      grad.addColorStop(1, 'rgba(62, 207, 142, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#3ECF8E';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#3ECF8E';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radius, 0);
      ctx.stroke();

      ctx.restore();

      // Center Point
      ctx.fillStyle = '#FF5C5C';
      ctx.shadowColor = '#FF5C5C';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(c, c, 3, 0, Math.PI * 2);
      ctx.fill();

      // Contact Blips
      const blips = [
        { label: 'TGT-1', x: c - radius * 0.35, y: c - radius * 0.45, color: '#F5A623' },
        { label: 'TGT-2', x: c + radius * 0.55, y: c + radius * 0.25, color: '#F5A623' },
        { label: 'TGT-3', x: c - radius * 0.2, y: c + radius * 0.55, color: '#3ECF8E' },
        { label: 'TGT-4', x: c + radius * 0.35, y: c - radius * 0.2, color: '#FF5C5C' },
      ];

      blips.forEach((b) => {
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '9px "IBM Plex Mono", monospace';
        ctx.fillStyle = '#9AA0A6';
        ctx.textAlign = 'left';
        ctx.fillText(b.label, b.x + 6, b.y + 3);
      });

      angle += 0.025;
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
