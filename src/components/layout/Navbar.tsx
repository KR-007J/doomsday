import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isStory = location.pathname === '/' || location.pathname === '/story';
  const isMatrix = location.pathname === '/matrix';
  const isSignal = location.pathname === '/monitoring';
  const isNetwork = location.pathname === '/network';
  const isLogs = location.pathname === '/logs';

  const getLinkClasses = (isActive: boolean) => {
    return `focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 transition-colors duration-150 ease-out inline-block ${
      isActive ? 'text-primary-ui' : 'text-secondary-ui hover:text-primary-ui'
    }`;
  };

  return (
    <motion.header 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-sm z-50 flex justify-between items-center px-6 h-14 font-mono text-xs border-b border-white/10"
    >
      {/* Left Brand & Uplink */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-primary-ui hover:text-accent-safe active:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 transition-colors duration-150 ease-out">
          <span className="material-symbols-outlined text-[16px]">security</span>
          <span className="font-display font-bold tracking-widest text-sm uppercase">ACOUSTIC SHIELD</span>
        </Link>
        <div className="hidden lg:flex items-center gap-2 text-tertiary-ui uppercase text-[10px] tracking-widest border-l border-white/10 pl-4">
          <span>SIGINT</span>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span>COMMAND</span>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-primary-ui">CORE</span>
        </div>
      </div>

      {/* Center Status */}
      <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded-sm">
          <span className="w-1.5 h-1.5 rounded-none bg-accent-safe" />
          <span className="font-bold text-primary-ui uppercase tracking-widest text-[10px]">
            SYSTEM ACTIVE
          </span>
        </div>
      </div>

      {/* Right Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-6 h-full uppercase tracking-wider text-xs">
        <Link to="/story" className={getLinkClasses(isStory)}>STORY</Link>
        <Link to="/matrix" className={getLinkClasses(isMatrix)}>MATRIX</Link>
        <Link to="/monitoring" className={getLinkClasses(isSignal)}>SIGNAL</Link>
        <Link to="/network" className={getLinkClasses(isNetwork)}>NETWORK</Link>
        <Link to="/logs" className={getLinkClasses(isLogs)}>LOGS</Link>
      </div>

      {/* Trailing Icon */}
      <div className="flex items-center gap-2 ml-4 border-l border-white/10 pl-4">
        <Link to="/attack-lab" className="flex items-center gap-1 text-secondary-ui hover:text-accent-critical focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 transition-colors duration-150 ease-out" title="Transmitter Suite">
          <span className="material-symbols-outlined text-[16px]">cell_tower</span>
          <span className="hidden md:inline font-bold uppercase tracking-wider text-[10px]">TRANSMITTER</span>
        </Link>
      </div>
    </motion.header>
  );
};
