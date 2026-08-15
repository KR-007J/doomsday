import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'pulse' | 'mock';
  colorScheme?: 'emerald' | 'amber' | 'indigo' | 'orange' | 'rose' | 'slate';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  colorScheme = 'slate',
  ...props
}) => {
  const schemeClasses = {
    emerald: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40 shadow-emerald-950/40',
    amber: 'bg-amber-950/80 text-amber-400 border-amber-500/40 shadow-amber-950/40',
    indigo: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40 shadow-indigo-950/40',
    orange: 'bg-orange-950/80 text-orange-400 border-orange-500/40 shadow-orange-950/40',
    rose: 'bg-rose-950/90 text-rose-300 border-rose-500/50 shadow-rose-950/50',
    slate: 'bg-slate-900 text-slate-300 border-slate-700',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border transition-all duration-200',
        schemeClasses[colorScheme],
        variant === 'pulse' && 'animate-pulse',
        variant === 'mock' && 'bg-cyan-950/90 text-cyan-300 border-cyan-500/60 shadow-lg shadow-cyan-900/30 font-bold uppercase tracking-wider',
        className
      )}
      {...props}
    >
      {variant === 'mock' && (
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
      )}
      {children}
    </span>
  );
};
