import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isMatrix = location.pathname === '/' || location.pathname === '/hero';
  const isSignal = location.pathname === '/monitoring';
  const isNetwork = location.pathname === '/network';
  const isLogs = location.pathname === '/logs';

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-1/90 backdrop-blur-md border-b border-hairline flex justify-between items-center px-6 h-14 font-mono text-xs">
      {/* Left Brand & Uplink */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-primary-ui hover:text-accent-safe transition-colors">
          <span className="material-symbols-outlined text-[20px] text-accent-critical">security</span>
          <span className="font-bold tracking-widest text-sm uppercase">THE SILENT DOG</span>
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
        <Link
          to="/"
          className={`flex items-center h-full px-2 border-b-2 transition-colors ${
            isMatrix ? 'border-accent-safe text-primary-ui font-bold' : 'border-transparent hover:text-primary-ui'
          }`}
        >
          MATRIX
        </Link>
        <Link
          to="/monitoring"
          className={`flex items-center h-full px-2 border-b-2 transition-colors ${
            isSignal ? 'border-accent-safe text-primary-ui font-bold' : 'border-transparent hover:text-primary-ui'
          }`}
        >
          SIGNAL
        </Link>
        <Link
          to="/network"
          className={`flex items-center h-full px-2 border-b-2 transition-colors ${
            isNetwork ? 'border-accent-safe text-primary-ui font-bold' : 'border-transparent hover:text-primary-ui'
          }`}
        >
          NETWORK
        </Link>
        <Link
          to="/logs"
          className={`flex items-center h-full px-2 border-b-2 transition-colors ${
            isLogs ? 'border-accent-safe text-primary-ui font-bold' : 'border-transparent hover:text-primary-ui'
          }`}
        >
          LOGS
        </Link>
      </div>

      {/* Trailing Icon */}
      <div className="flex items-center gap-2">
        <Link
          to="/attack-lab"
          className="text-secondary-ui hover:text-primary-ui p-1.5 rounded hover:bg-surface-2 transition-colors flex items-center gap-1 text-[11px]"
          title="Transmitter Suite"
        >
          <span className="material-symbols-outlined text-[18px]">cell_tower</span>
          <span className="hidden xl:inline">TRANSMITTER</span>
        </Link>
      </div>
    </header>
  );
};
