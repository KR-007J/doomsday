import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isIntroActive = location.pathname === '/';
  const isSocActive = location.pathname === '/monitoring';
  const isAttackLabActive = location.pathname === '/attack-lab';
  const isAboutActive = location.pathname === '/about';

  return (
    <nav className="glass-panel docked full-width top-0 border-b border-white/10 flex justify-between items-center px-margin-page h-16 w-full z-50 sticky">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-stack-gap text-headline-md font-headline-md font-bold text-primary">
        <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
          security
        </span>
        <span className="animate-title-reveal text-white tracking-tight">Acoustic Shield</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-gutter h-full font-body-md text-body-md">
        <Link
          to="/"
          className={`flex items-center h-full transition-colors duration-200 cursor-pointer active:opacity-80 px-1 ${
            isIntroActive
              ? 'text-primary border-b-2 border-primary pb-1 font-semibold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Introduction
        </Link>
        <Link
          to="/monitoring"
          className={`flex items-center h-full transition-colors duration-200 cursor-pointer active:opacity-80 px-1 ${
            isSocActive
              ? 'text-primary border-b-2 border-primary pb-1 font-semibold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          SOC Monitoring
        </Link>
        <Link
          to="/attack-lab"
          className={`flex items-center h-full transition-colors duration-200 cursor-pointer active:opacity-80 px-1 ${
            isAttackLabActive
              ? 'text-primary border-b-2 border-primary pb-1 font-semibold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Attack Lab
        </Link>
        <Link
          to="/about"
          className={`flex items-center h-full transition-colors duration-200 cursor-pointer active:opacity-80 px-1 ${
            isAboutActive
              ? 'text-primary border-b-2 border-primary pb-1 font-semibold'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          Architecture
        </Link>
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center gap-stack-gap">
        {/* System Status Pill */}
        <div className="hidden sm:flex items-center gap-unit px-stack-gap py-unit bg-white/5 border border-white/10 rounded-full font-label-caps text-label-caps animate-breathe">
          <div className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981]" />
          <span className="text-primary">SYS_OPT_01</span>
        </div>

        {/* Login Button / Controller */}
        <Link
          to="/login"
          className="text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer active:opacity-80 p-unit rounded-full hover:bg-white/10 flex items-center justify-center"
          title="Terminal Login"
        >
          <span className="material-symbols-outlined">account_circle</span>
        </Link>
      </div>
    </nav>
  );
};
