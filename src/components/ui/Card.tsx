import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'glow';
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
        'rounded-xl transition-all duration-300 relative overflow-hidden',
        variant === 'glass' && 'bg-soc-card/60 backdrop-blur-md border border-slate-800/80 shadow-lg shadow-black/40',
        variant === 'glow' && 'bg-soc-card/80 backdrop-blur-xl border border-slate-700/60 shadow-xl shadow-cyan-950/20',
        variant === 'default' && 'bg-soc-surface border border-soc-border',
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
