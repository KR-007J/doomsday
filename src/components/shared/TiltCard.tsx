import React, { useRef, useState } from 'react';
import { Card } from '../ui/Card';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'liquid' | 'glow';
  children: React.ReactNode;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  variant = 'liquid',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const currentState = useThreatStore((s) => s.currentState);
  const config = THREAT_STATE_CONFIGS[currentState];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10; // max tilt deg
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 transition-transform duration-200 ease-out"
      style={{ perspective: '1000px' }}
      {...props}
    >
      <Card
        variant={variant}
        className={`transition-all duration-300 ${className || ''}`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.015 : 1}, ${isHovered ? 1.015 : 1}, 1)`,
          boxShadow: isHovered
            ? `0 20px 40px -15px ${config.glowHex}, 0 0 15px ${config.colorHex}30`
            : undefined,
          borderColor: isHovered ? `${config.colorHex}60` : undefined,
        }}
      >
        {children}
      </Card>
    </div>
  );
};
