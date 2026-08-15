import React, { useEffect, useState } from 'react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';

export const AuroraBackground: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const safeDemoMode = useThreatStore((s) => s.safeDemoMode);
  const config = THREAT_STATE_CONFIGS[currentState];

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Subtle parallax offset (-15px to +15px)
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030712] transition-colors duration-1000">
      {/* Subtle background noise texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />

      {/* Parallax Aurora Blobs */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${-mousePos.x}px, ${-mousePos.y}px, 0)`,
        }}
      >
        {/* Blob 1: Primary State Accent Blob */}
        <div
          className="absolute -top-32 left-1/4 w-[650px] h-[550px] rounded-full blur-[130px] opacity-35 animate-pulse transition-all duration-1000"
          style={{
            backgroundColor: config.colorHex,
            animationDuration: '8s',
          }}
        />

        {/* Blob 2: Cyan/Indigo Secondary Atmosphere */}
        <div
          className="absolute top-1/3 -right-20 w-[550px] h-[500px] rounded-full blur-[140px] opacity-25 transition-all duration-1000"
          style={{
            backgroundColor: currentState === 'SAFE' ? '#06B6D4' : '#8B5CF6',
          }}
        />

        {/* Blob 3: Deep Emerald/Purple Base Glow */}
        <div
          className="absolute -bottom-40 left-1/3 w-[700px] h-[600px] rounded-full blur-[160px] opacity-20 transition-all duration-1000"
          style={{
            backgroundColor: currentState === 'THREAT_LOGGED' ? '#F43F5E' : '#10B981',
          }}
        />
      </div>
    </div>
  );
};
