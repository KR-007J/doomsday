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
    <div className="md:hidden fixed bottom-4 w-full z-50 flex justify-center pointer-events-none">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        className="pointer-events-auto rounded-full glass-panel-heavy w-[95%] border border-white/10 shadow-lg shadow-black/50 flex justify-around items-center h-16 px-4 font-mono text-[10px] overflow-hidden"
      >
        {/* STORY */}
        <Link
          to="/story"
          className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 ${
            isStory
              ? 'text-primary-ui border-t-2 border-accent-safe bg-white/5 font-bold'
              : 'text-secondary-ui opacity-70 hover:opacity-100 hover:bg-white/5'
          }`}
        >
          <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[20px] mb-1">auto_stories</span>
            <span>STORY</span>
          </motion.div>
        </Link>

        {/* MATRIX */}
        <Link
          to="/matrix"
          className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 ${
            isMatrix
              ? 'text-primary-ui border-t-2 border-accent-safe bg-white/5 font-bold'
              : 'text-secondary-ui opacity-70 hover:opacity-100 hover:bg-white/5'
          }`}
        >
          <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[20px] mb-1">grid_view</span>
            <span>MATRIX</span>
          </motion.div>
        </Link>

        {/* SIGNAL */}
        <Link
          to="/monitoring"
          className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 ${
            isSignal
              ? 'text-primary-ui border-t-2 border-accent-safe bg-white/5 font-bold'
              : 'text-secondary-ui opacity-70 hover:opacity-100 hover:bg-white/5'
          }`}
        >
          <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[20px] mb-1">waves</span>
            <span>SIGNAL</span>
          </motion.div>
        </Link>

        {/* NETWORK */}
        <Link
          to="/network"
          className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 ${
            isNetwork
              ? 'text-primary-ui border-t-2 border-accent-safe bg-white/5 font-bold'
              : 'text-secondary-ui opacity-70 hover:opacity-100 hover:bg-white/5'
          }`}
        >
          <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[20px] mb-1">hub</span>
            <span>NETWORK</span>
          </motion.div>
        </Link>

        {/* LOGS */}
        <Link
          to="/logs"
          className={`flex flex-col items-center justify-center w-1/5 h-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 ${
            isLogs
              ? 'text-primary-ui border-t-2 border-accent-safe bg-white/5 font-bold'
              : 'text-secondary-ui opacity-70 hover:opacity-100 hover:bg-white/5'
          }`}
        >
          <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[20px] mb-1">terminal</span>
            <span>LOGS</span>
          </motion.div>
        </Link>
      </motion.nav>
    </div>
  );
};
