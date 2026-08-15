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
    md: 'px-4 py-2 text-xs sm:text-sm font-sans font-medium',
    lg: 'px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-sans font-semibold',
  };

  const variantClasses = {
    // Primary CTA: Solid near-white #E6E6E6 (NO GRADIENT, NO BLUE)
    primary:
      'bg-[#E6E6E6] hover:bg-white text-[#07080A] font-semibold border border-white/20 shadow-[0px_1px_0px_0px_rgba(255,255,255,0.4)_inset,0px_2px_8px_rgba(0,0,0,0.4)]',
    // Secondary: Surface 2 #15171B with hairline border #242728
    secondary:
      'bg-[#15171B] hover:bg-[#1B1E23] text-[#F2F3F5] border border-[#242728] hover:border-[#383C42] shadow-sm',
    // Danger: Functional critical accent #FF5C5C
    danger:
      'bg-[#FF5C5C] hover:bg-[#FF7070] text-[#07080A] font-semibold border border-rose-400 shadow-md',
    ghost: 'bg-transparent hover:bg-[#15171B] text-[#9AA0A6] hover:text-[#F2F3F5]',
    // Glow variant mapped to solid neutral near-white
    glow: 'bg-[#E6E6E6] hover:bg-white text-[#07080A] font-semibold border border-white/20 shadow-md',
  };

  return (
    <motion.button
      ref={ref}
      disabled={disabled}
      data-cursor-hover="true"
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none cursor-pointer select-none whitespace-nowrap',
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
