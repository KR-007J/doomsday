import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isIntroActive = location.pathname === '/';
  const isSocActive = location.pathname === '/monitoring';
  const isAttackLabActive = location.pathname === '/attack-lab';
  const isAboutActive = location.pathname === '/about';

  return (
    <nav className="border-b border-[#1f1f1f] bg-[#080808]/90 backdrop-blur-md flex justify-between items-center px-8 h-16 w-full z-50 sticky top-0 font-mono text-xs">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-3 text-white font-bold tracking-[0.2em] uppercase hover:text-[#EF4444] transition-colors">
        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-pulse" />
        <span>THE SILENT DOG</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 h-full uppercase tracking-wider text-[#A3A3A3]">
        <Link
          to="/"
          className={`flex items-center h-full transition-colors ${
            isIntroActive ? 'text-white border-b-2 border-[#EF4444] font-bold' : 'hover:text-white'
          }`}
        >
          Introduction
        </Link>
        <Link
          to="/monitoring"
          className={`flex items-center h-full transition-colors ${
            isSocActive ? 'text-white border-b-2 border-[#EF4444] font-bold' : 'hover:text-white'
          }`}
        >
          Command Center
        </Link>
        <Link
          to="/attack-lab"
          className={`flex items-center h-full transition-colors ${
            isAttackLabActive ? 'text-white border-b-2 border-[#EF4444] font-bold' : 'hover:text-white'
          }`}
        >
          Transmitter Suite
        </Link>
        <Link
          to="/about"
          className={`flex items-center h-full transition-colors ${
            isAboutActive ? 'text-white border-b-2 border-[#EF4444] font-bold' : 'hover:text-white'
          }`}
        >
          Intelligence
        </Link>
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#121212] border border-[#262626] rounded-full text-[10px] text-[#10B981] font-bold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          SYS_NOMINAL
        </div>

        <Link
          to="/login"
          className="text-[#A3A3A3] hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 flex items-center justify-center"
          title="Command Center Auth"
        >
          <span className="material-symbols-outlined text-[20px]">account_circle</span>
        </Link>
      </div>
    </nav>
  );
};
