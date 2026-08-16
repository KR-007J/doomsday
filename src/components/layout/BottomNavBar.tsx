import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export const BottomNavBar: React.FC = () => {
  const location = useLocation();

  const isStory = location.pathname === '/' || location.pathname === '/story';
  const isMatrix = location.pathname === '/matrix';
  const isSignal = location.pathname === '/monitoring';
  const isNetwork = location.pathname === '/network';
  const isLogs = location.pathname === '/logs';

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-center">
      <motion.nav 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="w-full bg-black/80 backdrop-blur-sm border-t border-white/10 flex justify-around items-center h-16 px-0 font-mono text-[10px]"
      >
        <Link
          to="/story"
          className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 ${
            isStory
              ? 'text-primary-ui border-t border-primary-ui bg-white/5'
              : 'text-secondary-ui hover:text-primary-ui hover:bg-white/5'
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[18px] mb-1">auto_stories</span>
            <span>STORY</span>
          </div>
        </Link>

        <Link
          to="/matrix"
          className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 ${
            isMatrix
              ? 'text-primary-ui border-t border-primary-ui bg-white/5'
              : 'text-secondary-ui hover:text-primary-ui hover:bg-white/5'
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[18px] mb-1">grid_view</span>
            <span>MATRIX</span>
          </div>
        </Link>

        <Link
          to="/monitoring"
          className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 ${
            isSignal
              ? 'text-primary-ui border-t border-primary-ui bg-white/5'
              : 'text-secondary-ui hover:text-primary-ui hover:bg-white/5'
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[18px] mb-1">waves</span>
            <span>SIGNAL</span>
          </div>
        </Link>

        <Link
          to="/network"
          className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 ${
            isNetwork
              ? 'text-primary-ui border-t border-primary-ui bg-white/5'
              : 'text-secondary-ui hover:text-primary-ui hover:bg-white/5'
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[18px] mb-1">hub</span>
            <span>NETWORK</span>
          </div>
        </Link>

        <Link
          to="/logs"
          className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 ${
            isLogs
              ? 'text-primary-ui border-t border-primary-ui bg-white/5'
              : 'text-secondary-ui hover:text-primary-ui hover:bg-white/5'
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[18px] mb-1">terminal</span>
            <span>LOGS</span>
          </div>
        </Link>
      </motion.nav>
    </div>
  );
};
