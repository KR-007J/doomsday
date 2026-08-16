import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Radio, Share2, Terminal, Activity, BookOpen, Layers } from 'lucide-react';
import { useThreatStore, Background3DMode } from '../../features/threat-state-machine/useThreatStore';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const bgMode = useThreatStore((s) => s.bgMode);
  const setBgMode = useThreatStore((s) => s.setBgMode);

  const navLinks = [
    { path: '/story', label: 'Story', icon: BookOpen },
    { path: '/matrix', label: 'Matrix', icon: Shield },
    { path: '/monitoring', label: 'Signal', icon: Activity },
    { path: '/network', label: 'Network', icon: Share2 },
    { path: '/logs', label: 'Logs', icon: Terminal },
    { path: '/attack-lab', label: 'Transmitter', icon: Radio },
  ];

  const modes: { id: Background3DMode; label: string }[] = [
    { id: 'ARC_REACTOR', label: 'Arc Reactor' },
    { id: 'BEAMFORMER', label: 'Beamformer' },
    { id: 'SATELLITE_GLOBE', label: 'Satellite Globe' },
    { id: 'CRYSTAL_LATTICE', label: 'Phononic Crystal' },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 pointer-events-auto"
    >
      <div className="glass-panel-heavy rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between border border-slate-700/60 shadow-2xl backdrop-blur-xl gap-2">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-slate-100 hover:text-white transition-colors shrink-0" aria-label="Acoustic Shield Home">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
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
                      ? 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-500/25'
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

        {/* 3D Background Mode Switcher (User Friendly) */}
        <div className="hidden xl:flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="text-slate-400 text-[10px] uppercase px-2 font-bold flex items-center gap-1">
            <Layers className="w-3 h-3 text-blue-400" />
            3D Scope
          </span>
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setBgMode(m.id)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                bgMode === m.id
                  ? 'bg-blue-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
