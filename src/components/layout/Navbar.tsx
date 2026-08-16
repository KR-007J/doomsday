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
    return `focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 transition-colors inline-block ${
      isActive ? 'text-primary-ui' : 'hover:text-primary-ui'
    }`;
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full glass-panel-heavy z-50 flex justify-between items-center px-6 h-14 font-mono text-xs border border-white/10 shadow-lg shadow-black/50"
    >
      {/* Left Brand & Uplink */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-primary-ui hover:text-accent-safe active:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 transition-colors">
          <span className="material-symbols-outlined text-[20px] text-accent-critical">security</span>
          <span className="font-bold tracking-widest text-sm uppercase">ACOUSTIC SHIELD</span>
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
        <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-accent-safe/20 backdrop-blur-md">
          <motion.span 
            animate={{ 
              boxShadow: ["0 0 4px #00ff9d", "0 0 12px #00ff9d", "0 0 4px #00ff9d"],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-accent-safe" 
          />
          <span className="font-bold text-accent-safe uppercase tracking-widest text-[10px]">
            OMNISCIENCE ACTIVE
          </span>
        </div>
      </div>

      {/* Right Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-6 h-full text-secondary-ui uppercase tracking-wider text-xs">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/story" className={getLinkClasses(isStory)}>STORY</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/matrix" className={getLinkClasses(isMatrix)}>MATRIX</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/monitoring" className={getLinkClasses(isSignal)}>SIGNAL</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/network" className={getLinkClasses(isNetwork)}>NETWORK</Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/logs" className={getLinkClasses(isLogs)}>LOGS</Link>
        </motion.div>
      </div>

      {/* Trailing Icon */}
      <div className="flex items-center gap-2 ml-4 border-l border-white/10 pl-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/attack-lab" className="flex items-center gap-1 text-secondary-ui hover:text-accent-critical focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-safe focus-visible:outline-offset-2 transition-colors" title="Transmitter Suite">
            <span className="material-symbols-outlined text-[18px]">cell_tower</span>
            <span className="hidden md:inline font-bold uppercase tracking-wider text-[10px]">TRANSMITTER</span>
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
};
