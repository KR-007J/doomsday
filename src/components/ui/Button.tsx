import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  disabled,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary:
      'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-lg shadow-cyan-500/25 border border-cyan-400',
    secondary:
      'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 hover:border-slate-500 shadow-md',
    danger:
      'bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-lg shadow-rose-600/30 border border-rose-500',
    ghost: 'bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-slate-100',
    glow: 'bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-xl shadow-indigo-500/40 border border-indigo-400 animate-pulse',
  };

  return (
    <button
      ref={ref}
      disabled={disabled}
      data-cursor-hover="true"
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer font-sans select-none',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
