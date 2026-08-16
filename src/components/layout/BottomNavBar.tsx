import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Radio, Share2, Terminal, Activity, BookOpen } from 'lucide-react';

export const BottomNavBar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/story', label: 'Story', icon: BookOpen },
    { path: '/matrix', label: 'Matrix', icon: Shield },
    { path: '/monitoring', label: 'Signal', icon: Activity },
    { path: '/network', label: 'Network', icon: Share2 },
    { path: '/logs', label: 'Logs', icon: Terminal },
    { path: '/attack-lab', label: 'TX Lab', icon: Radio },
  ];

  return (
    <div className="md:hidden fixed bottom-4 w-full z-50 flex justify-center pointer-events-none px-4">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto rounded-2xl glass-panel-heavy w-full max-w-md border border-slate-700/60 shadow-2xl flex justify-around items-center h-14 px-2 font-mono text-[10px]"
        aria-label="Mobile Navigation"
      >
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path || (link.path === '/story' && location.pathname === '/');
          const IconComponent = link.icon;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center justify-center flex-1 h-full rounded-xl transition-all ${
                isActive ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label={`Navigate to ${link.label}`}
            >
              <IconComponent className="w-4 h-4 mb-0.5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default BottomNavBar;
