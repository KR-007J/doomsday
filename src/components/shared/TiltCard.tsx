import React, { useRef, useState } from 'react';
import { Card } from '../ui/Card';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'liquid' | 'glow';
  children: React.ReactNode;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  variant = 'glass',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -4; // subtle 4deg tilt
    const rY = ((x - centerX) / centerX) * 4;

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
      className="perspective-1000 transition-transform duration-150 ease-out"
      style={{ perspective: '1000px' }}
      {...props}
    >
      <Card
        variant={variant}
        className={`transition-all duration-200 ${className || ''}`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : undefined,
        }}
      >
        {children}
      </Card>
    </div>
  );
};
