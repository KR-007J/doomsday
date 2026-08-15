import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Radio, Terminal, Info, Sliders } from 'lucide-react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../../features/threat-state-machine/stateMachine';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const currentState = useThreatStore((s) => s.currentState);
  const config = THREAT_STATE_CONFIGS[currentState];

  const navLinks = [
    { path: '/monitoring', label: 'SOC MONITORING', icon: <Radio className="w-4 h-4" /> },
    { path: '/attack-lab', label: 'ATTACK LAB', icon: <Terminal className="w-4 h-4" /> },
    { path: '/about', label: 'ARCHITECTURE', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-mono-950/90 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Clean Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-mono-900 border border-white/15 group-hover:border-white/30 transition-all flex items-center justify-center">
            <Shield className="w-5 h-5 text-slate-100" />
          </div>
          <div>
            <span className="font-sans font-bold tracking-tight text-sm sm:text-base text-slate-100 uppercase">
              ACOUSTIC<span className="text-slate-400">SHIELD</span>
            </span>
            <p className="text-[10px] font-mono text-slate-400">Acoustic Threat Detection Matrix</p>
          </div>
        </Link>

        {/* Center Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-mono-900 p-1 rounded-lg border border-white/10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-slate-100 border border-white/20 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Status Indicator: Single Threat State Pill + State Controller Access */}
        <div className="flex items-center gap-3">
          {/* Live Threat State Morphing Pill */}
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold border transition-all duration-300 ${config.badgeClasses}`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: config.colorHex }}
            />
            {config.label}
          </div>

          {/* Dev Threat Controller Access */}
          <Link
            to="/dev/state-machine"
            className="p-2 rounded-lg bg-mono-900 hover:bg-mono-850 text-slate-400 hover:text-slate-200 border border-white/10 hover:border-white/20 transition-colors"
            title="State Machine Controller"
          >
            <Sliders className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};
