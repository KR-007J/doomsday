import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Settings, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-7xl z-50"
    >
      <div className="glass-panel-heavy rounded-2xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 w-1/3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shadow-inner"
          >
            <Shield className="w-4 h-4 text-white" />
          </motion.div>
          <span className="font-display text-xl tracking-tight text-white uppercase">
            Acoustic Shield
          </span>
        </div>

        <div className="flex justify-center w-1/3">
          <div className="flex space-x-1 bg-white/5 border border-white/10 rounded-lg p-1">
            {[
              { path: '/dashboard', label: 'Dashboard' },
              { path: '/analysis', label: 'Analysis' }
            ].map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                    transition={{ duration: 0.3 }}
                    className={`px-4 py-1.5 rounded-md text-sm font-mono transition-colors duration-300 ${
                      isActive ? 'bg-white/15 text-white shadow-sm' : 'text-white/60 hover:text-white/90'
                    }`}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2 w-1/3">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="p-2.5 text-white/60 hover:text-white transition-colors rounded-lg"
          >
            <Settings className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="p-2.5 text-white/60 hover:text-white transition-colors rounded-lg"
          >
            <User className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
