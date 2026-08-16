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
      className="fixed top-3 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] max-w-7xl z-50 pointer-events-auto"
    >
      <div className="glass-panel-heavy rounded-2xl px-3 md:px-5 py-2.5 flex items-center justify-between border border-slate-700/60 shadow-2xl backdrop-blur-xl gap-2">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 text-slate-100 hover:text-white transition-colors shrink-0" aria-label="Acoustic Shield Home">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="font-display text-lg tracking-tight font-light text-slate-100 hidden lg:inline">
            Acoustic Shield
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 bg-slate-900/70 p-1 rounded-xl border border-slate-800/80 shrink-0" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === '/story' && location.pathname === '/');
            const IconComponent = link.icon;

            return (
              <Link key={link.path} to={link.path} aria-label={`Navigate to ${link.label}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-medium shadow-md shadow-indigo-500/25'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{link.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Compact 3D Scope Mode Selector Dropdown */}
        <div className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs font-mono shrink-0 shadow-inner">
          <Layers className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <select
            value={bgMode}
            onChange={(e) => setBgMode(e.target.value as Background3DMode)}
            className="bg-transparent text-slate-200 text-xs font-mono font-medium outline-none cursor-pointer pr-1 py-0.5"
            aria-label="Select 3D Scope Mode"
          >
            {modes.map((m) => (
              <option key={m.id} value={m.id} className="bg-slate-900 text-slate-200">
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
