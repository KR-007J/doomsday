import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'liquid' | 'glow';
  borderColor?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'glass',
  borderColor,
  style,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'rounded-xl transition-all duration-200 relative overflow-hidden',
        variant === 'glass' &&
          'bg-mono-900/80 backdrop-blur-xl border border-white/10 shadow-lg',
        variant === 'liquid' &&
          'bg-mono-900/90 backdrop-blur-xl border border-white/15 shadow-xl',
        variant === 'glow' &&
          'bg-mono-900/90 backdrop-blur-xl border border-white/20 shadow-2xl',
        variant === 'default' &&
          'bg-mono-900 border border-slate-800',
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
