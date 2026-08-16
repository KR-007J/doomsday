import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const BottomNavBar: React.FC = () => {
  const location = useLocation();

  const isStory = location.pathname === '/' || location.pathname === '/story';
  const isMatrix = location.pathname === '/matrix';
  const isSignal = location.pathname === '/monitoring';
  const isNetwork = location.pathname === '/network';
  const isLogs = location.pathname === '/logs';

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface-1/95 backdrop-blur-md border-t border-hairline flex justify-around items-center h-16 px-4 font-mono text-[10px]">
      {/* STORY */}
      <Link
        to="/story"
        className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 ${
          isStory
            ? 'text-primary-ui border-t-2 border-accent-safe bg-surface-2/40 font-bold'
            : 'text-secondary-ui opacity-70 hover:opacity-100'
        }`}
      >
        <span className="material-symbols-outlined text-[20px] mb-1">auto_stories</span>
        <span>STORY</span>
      </Link>

      {/* MATRIX */}
      <Link
        to="/matrix"
        className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 ${
          isMatrix
            ? 'text-primary-ui border-t-2 border-accent-safe bg-surface-2/40 font-bold'
            : 'text-secondary-ui opacity-70 hover:opacity-100'
        }`}
      >
        <span className="material-symbols-outlined text-[20px] mb-1">grid_view</span>
        <span>MATRIX</span>
      </Link>

      {/* SIGNAL */}
      <Link
        to="/monitoring"
        className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 ${
          isSignal
            ? 'text-primary-ui border-t-2 border-accent-safe bg-surface-2/40 font-bold'
            : 'text-secondary-ui opacity-70 hover:opacity-100'
        }`}
      >
        <span className="material-symbols-outlined text-[20px] mb-1">waves</span>
        <span>SIGNAL</span>
      </Link>

      {/* NETWORK */}
      <Link
        to="/network"
        className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 ${
          isNetwork
            ? 'text-primary-ui border-t-2 border-accent-safe bg-surface-2/40 font-bold'
            : 'text-secondary-ui opacity-70 hover:opacity-100'
        }`}
      >
        <span className="material-symbols-outlined text-[20px] mb-1">hub</span>
        <span>NETWORK</span>
      </Link>

      {/* LOGS */}
      <Link
        to="/logs"
        className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 ${
          isLogs
            ? 'text-primary-ui border-t-2 border-accent-safe bg-surface-2/40 font-bold'
            : 'text-secondary-ui opacity-70 hover:opacity-100'
        }`}
      >
        <span className="material-symbols-outlined text-[20px] mb-1">terminal</span>
        <span>LOGS</span>
      </Link>
    </nav>
  );
};
