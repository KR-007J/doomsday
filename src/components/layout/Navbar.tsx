import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Radio, Share2, Terminal, Activity, BookOpen } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/story', label: 'Story', icon: BookOpen },
    { path: '/matrix', label: 'Matrix', icon: Shield },
    { path: '/monitoring', label: 'Signal', icon: Activity },
    { path: '/network', label: 'Network', icon: Share2 },
    { path: '/logs', label: 'Logs', icon: Terminal },
    { path: '/attack-lab', label: 'Transmitter', icon: Radio },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 pointer-events-auto"
    >
      <div className="glass-panel-heavy rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between border border-slate-700/60 shadow-2xl backdrop-blur-xl">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-slate-100 hover:text-white transition-colors" aria-label="Acoustic Shield Home">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-display text-xl tracking-tight font-light text-slate-100 hidden sm:inline">
            Acoustic Shield
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === '/story' && location.pathname === '/');
            const IconComponent = link.icon;

            return (
              <Link key={link.path} to={link.path} aria-label={`Navigate to ${link.label}`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-500/25'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{link.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>GRID NOMINAL</span>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
