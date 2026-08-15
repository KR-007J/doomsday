import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const currentState = useThreatStore((s) => s.currentState);
  const config = THREAT_STATE_CONFIGS[currentState];

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  const ringSpringConfig = { damping: 20, stiffness: 180, mass: 0.8 };
  const ringX = useSpring(0, ringSpringConfig);
  const ringY = useSpring(0, ringSpringConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[data-cursor-hover]'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 shadow-md"
        style={{
          x: cursorX,
          y: cursorY,
          backgroundColor: config.colorHex,
          boxShadow: `0 0 10px ${config.colorHex}`,
        }}
      />

      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
        animate={{
          width: isHovered ? 44 : 24,
          height: isHovered ? 44 : 24,
          borderColor: config.colorHex,
          backgroundColor: isHovered ? `${config.colorHex}15` : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          x: ringX,
          y: ringY,
          boxShadow: isHovered ? `0 0 16px ${config.colorHex}30` : 'none',
        }}
      />
    </>
  );
};
