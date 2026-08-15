import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children?: React.ReactNode;
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
    sm: 'px-3 py-1.5 text-xs font-mono',
    md: 'px-4.5 py-2.5 text-sm font-sans font-semibold',
    lg: 'px-6 py-3.5 text-sm sm:text-base font-sans font-bold',
  };

  const variantClasses = {
    primary:
      'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/25 border border-cyan-300',
    secondary:
      'bg-obsidian-900/90 hover:bg-obsidian-850 text-slate-200 border border-white/15 hover:border-cyan-500/40 shadow-md backdrop-blur-md',
    danger:
      'bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-lg shadow-rose-600/30 border border-rose-400',
    ghost: 'bg-transparent hover:bg-white/10 text-slate-400 hover:text-slate-100',
    glow: 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold shadow-xl shadow-cyan-500/30 border border-cyan-400',
  };

  return (
    <motion.button
      ref={ref}
      disabled={disabled}
      data-cursor-hover="true"
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={clsx(
        'inline-flex items-center justify-center gap-2.5 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none whitespace-nowrap',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
});

Button.displayName = 'Button';
