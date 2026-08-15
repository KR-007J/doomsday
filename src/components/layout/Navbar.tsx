import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Radio, Terminal, Info, Cpu, Sliders } from 'lucide-react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';
import { Badge } from '../ui/Badge';
import { useFps } from '../../hooks/useFps';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const currentState = useThreatStore((s) => s.currentState);
  const safeDemoMode = useThreatStore((s) => s.safeDemoMode);
  const toggleSafeDemoMode = useThreatStore((s) => s.toggleSafeDemoMode);
  const isMockData = useThreatStore((s) => s.isMockData);

  const fps = useFps();
  const config = THREAT_STATE_CONFIGS[currentState];

  const navLinks = [
    { path: '/monitoring', label: 'SOC MONITORING', icon: <Radio className="w-4 h-4" /> },
    { path: '/attack-lab', label: 'ATTACK LAB', icon: <Terminal className="w-4 h-4" /> },
    { path: '/about', label: 'ARCHITECTURE', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-obsidian-950/80 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-obsidian-900 to-cyan-950 p-2 border border-cyan-500/40 group-hover:border-cyan-400 transition-all flex items-center justify-center shadow-lg shadow-cyan-950/50">
            <Shield className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-extrabold tracking-wider text-base text-slate-100 uppercase">
                ACOUSTIC<span className="text-cyan-400">SHIELD</span>
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                v2.4
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400">Covert Acoustic Threat Engine</p>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center gap-1 bg-obsidian-900/60 p-1 rounded-xl border border-white/10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-inner font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Status Actions */}
        <div className="flex items-center gap-3">
          {/* Live Threat State Morphing Pill */}
          <div
            className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold border transition-all duration-500 ${config.badgeClasses}`}
          >
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: config.colorHex }}
            />
            {config.label}
          </div>

          {/* MOCK DATA Badge */}
          {isMockData && (
            <Badge variant="mock">
              MOCK MODE
            </Badge>
          )}

          {/* Dev State Controller Quick Access */}
          <Link
            to="/dev/state-machine"
            className="p-2 rounded-lg bg-obsidian-900 hover:bg-obsidian-850 text-slate-400 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 transition-colors"
            title="Threat State Machine Controller"
          >
            <Sliders className="w-4 h-4" />
          </Link>

          {/* FPS & Safe Demo Toggle */}
          <button
            onClick={() => toggleSafeDemoMode()}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
              safeDemoMode
                ? 'bg-amber-950/60 text-amber-300 border-amber-800/50'
                : 'bg-obsidian-900 text-slate-400 border-white/10 hover:border-slate-700'
            }`}
            title="Toggle Low-Power Safe Demo Mode"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{fps} FPS</span>
          </button>
        </div>
      </div>
    </header>
  );
};
