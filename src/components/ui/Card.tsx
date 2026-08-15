import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'liquid' | 'glow';
  borderColor?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'liquid',
  borderColor,
  style,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'rounded-2xl transition-all duration-300 relative overflow-hidden',
        variant === 'liquid' &&
          'bg-obsidian-900/70 backdrop-blur-xl saturate-[180%] border border-white/10 shadow-2xl relative before:absolute before:inset-0 before:rounded-2xl before:border before:border-transparent before:[background:linear-gradient(135deg,rgba(255,255,255,0.15),transparent_60%)_border-box] before:pointer-events-none',
        variant === 'glow' &&
          'bg-obsidian-900/80 backdrop-blur-xl border border-cyan-500/30 shadow-xl shadow-cyan-950/20',
        variant === 'glass' &&
          'bg-obsidian-950/80 backdrop-blur-md border border-white/10 shadow-xl',
        variant === 'default' &&
          'bg-obsidian-900 border border-slate-800',
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
