import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Radio, Share2, Terminal, Activity, BookOpen, Layers, ChevronDown, Check, Zap, Globe, Sparkles } from 'lucide-react';
import { useThreatStore, Background3DMode } from '../../features/threat-state-machine/useThreatStore';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const bgMode = useThreatStore((s) => s.bgMode);
  const setBgMode = useThreatStore((s) => s.setBgMode);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { path: '/story', label: 'Story', icon: BookOpen },
    { path: '/matrix', label: 'Matrix', icon: Shield },
    { path: '/monitoring', label: 'Signal', icon: Activity },
    { path: '/network', label: 'Network', icon: Share2 },
    { path: '/logs', label: 'Logs', icon: Terminal },
    { path: '/attack-lab', label: 'Transmitter', icon: Radio },
  ];

  const modes: { id: Background3DMode; label: string; icon: React.ElementType; desc: string }[] = [
    { id: 'ARC_REACTOR', label: 'Arc Reactor', icon: Zap, desc: 'Marvel J.A.R.V.I.S Core' },
    { id: 'BEAMFORMER', label: 'Beamformer', icon: Radio, desc: 'Ultrasonic Array' },
    { id: 'SATELLITE_GLOBE', label: 'Satellite Globe', icon: Globe, desc: 'Global Defense Mesh' },
    { id: 'CRYSTAL_LATTICE', label: 'Phononic Crystal', icon: Sparkles, desc: 'Metamaterial Grid' },
  ];

  const activeModeObj = modes.find((m) => m.id === bgMode) || modes[0];

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

        {/* Custom Interactive Dropdown Button for 3D Background */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-indigo-950/70 hover:bg-indigo-900/90 text-indigo-200 border border-indigo-500/40 px-3 py-1.5 rounded-xl text-xs font-mono transition-all shadow-md shadow-indigo-950/50"
            aria-label="3D Background Mode Menu"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-semibold text-slate-100">{activeModeObj.label}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-indigo-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </motion.button>

          {/* Floating Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 bg-slate-900/95 border border-slate-700/80 rounded-2xl p-1.5 shadow-2xl backdrop-blur-2xl z-50 flex flex-col gap-1"
              >
                <div className="px-2.5 py-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800/80 flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-indigo-400" />
                  Select 3D Scope Mode
                </div>

                {modes.map((m) => {
                  const ModeIcon = m.icon;
                  const isSelected = bgMode === m.id;

                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        setBgMode(m.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left font-mono transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ModeIcon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-indigo-400'}`} />
                        <div className="flex flex-col">
                          <span className="text-xs font-medium leading-tight">{m.label}</span>
                          <span className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                            {m.desc}
                          </span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
