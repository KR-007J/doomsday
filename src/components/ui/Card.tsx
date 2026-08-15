import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'surface-1' | 'surface-2' | 'overlay' | 'glass' | 'liquid' | 'glow' | 'default';
  borderColor?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'surface-1',
  borderColor,
  style,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'rounded-xl transition-all duration-200 relative overflow-hidden',
        // Surface 1 (Cards, Panels)
        (variant === 'surface-1' || variant === 'glass' || variant === 'liquid' || variant === 'glow') &&
          'bg-[#0D0F12] border border-[#242728] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.04)_inset,0px_4px_16px_rgba(0,0,0,0.4)]',
        // Surface 2 (Nested cards, hover states)
        variant === 'surface-2' &&
          'bg-[#15171B] border border-[#242728] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.05)_inset,0px_6px_24px_rgba(0,0,0,0.5)]',
        // Overlay (Modals, dropdowns)
        variant === 'overlay' &&
          'bg-[#1B1E23] border border-[#242728] shadow-[0px_1px_0px_0px_rgba(255,255,255,0.06)_inset,0px_12px_32px_rgba(0,0,0,0.6)]',
        variant === 'default' &&
          'bg-[#0D0F12] border border-[#242728]',
        className
      )}
      style={{
        borderColor: borderColor || undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
