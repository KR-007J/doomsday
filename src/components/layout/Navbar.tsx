import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isStory = location.pathname === '/' || location.pathname === '/story';
  const isMatrix = location.pathname === '/matrix';
  const isSignal = location.pathname === '/monitoring';
  const isNetwork = location.pathname === '/network';
  const isLogs = location.pathname === '/logs';

  const getLinkClasses = (isActive: boolean) => {
    return `focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 transition-colors ${
      isActive ? 'text-primary-ui' : 'hover:text-primary-ui'
    }`;
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-1/90 backdrop-blur-md border-b border-hairline flex justify-between items-center px-6 h-14 font-mono text-xs">
      {/* Left Brand & Uplink */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-primary-ui hover:text-accent-safe active:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 transition-colors">
          <span className="material-symbols-outlined text-[20px] text-accent-critical">security</span>
          <span className="font-bold tracking-widest text-sm uppercase">ACOUSTIC SHIELD</span>
        </Link>
        <div className="hidden lg:flex items-center gap-2 text-tertiary-ui uppercase text-[10px] tracking-widest border-l border-hairline pl-4">
          <span>SIGINT</span>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span>COMMAND</span>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-primary-ui">CORE</span>
        </div>
      </div>

      {/* Center Status */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-safe animate-pulse" />
          <span className="font-bold text-accent-safe uppercase tracking-widest text-[10px]">
            OMNISCIENCE ACTIVE
          </span>
        </div>
      </div>

      {/* Right Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-6 h-full text-secondary-ui uppercase tracking-wider text-xs">
        <Link to="/story" className={getLinkClasses(isStory)}>STORY</Link>
        <Link to="/matrix" className={getLinkClasses(isMatrix)}>MATRIX</Link>
        <Link to="/monitoring" className={getLinkClasses(isSignal)}>SIGNAL</Link>
        <Link to="/network" className={getLinkClasses(isNetwork)}>NETWORK</Link>
        <Link to="/logs" className={getLinkClasses(isLogs)}>LOGS</Link>
      </div>

      {/* Trailing Icon */}
      <div className="flex items-center gap-2">
        <Link to="/attack-lab" className="flex items-center gap-1 text-secondary-ui hover:text-accent-critical focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 transition-colors" title="Transmitter Suite">
          <span className="material-symbols-outlined text-[18px]">cell_tower</span>
          <span className="hidden md:inline font-bold uppercase tracking-wider">TRANSMITTER</span>
        </Link>
      </div>
    </header>
  );
};
