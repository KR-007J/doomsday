import React from 'react';
import { motion } from 'framer-motion';
import { Home, Activity, ShieldAlert, Settings } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

export const BottomNavBar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, path: '/dashboard', label: 'Home' },
    { icon: Activity, path: '/analysis', label: 'Activity' },
    { icon: ShieldAlert, path: '/alerts', label: 'Alerts' },
    { icon: Settings, path: '/settings', label: 'Settings' },
  ];

  return (
    <motion.nav
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-md z-50"
    >
      <div className="glass-panel border border-white/10 rounded-2xl px-2 py-2 flex items-center justify-between shadow-2xl">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          
          return (
            <Link key={item.path} to={item.path} className="w-1/4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-2 relative rounded-xl hover:bg-white/5"
              >
                <Icon 
                  className={`w-5 h-5 mb-1 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/50'
                  }`} 
                />
                <span 
                  className={`text-[10px] font-mono tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/50'
                  }`}
                >
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div 
                    layoutId="bottomNavIndicator"
                    className="absolute -top-2 w-8 h-1 rounded-full bg-white/40"
                    transition={{ type: 'tween', ease: 'circOut', duration: 0.4 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNavBar;
