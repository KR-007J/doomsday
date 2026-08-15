import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { THREAT_STATE_CONFIGS } from '../features/threat-state-machine/stateMachine';
import { ThreatStateType } from '../types/threat';
import { Layers, Shield, Radio, Terminal, Cpu } from 'lucide-react';

export const DevComponentsPage: React.FC = () => {
  const states: ThreatStateType[] = [
    'SAFE',
    'SIGNAL_DETECTED',
    'ANALYZING',
    'POTENTIAL_COVERT_COMMUNICATION',
    'THREAT_LOGGED',
  ];

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <h1 className="text-xl font-bold font-sans tracking-tight text-slate-100 uppercase flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          DESIGN SYSTEM TOKEN & COMPONENT GALLERY (`/dev/components`)
        </h1>
        <p className="text-xs font-mono text-slate-400">
          SOC dark-mode ops center design system primitives for Acoustic Shield
        </p>
      </div>

      {/* State Badge Tokens */}
      <Card variant="glass" className="p-5">
        <h3 className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wider mb-3">
          1. THREAT STATE VISUAL TOKENS
        </h3>
        <div className="flex flex-wrap gap-3">
          {states.map((s) => {
            const config = THREAT_STATE_CONFIGS[s];
            return (
              <div
                key={s}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold border ${config.badgeClasses}`}
              >
                {config.label}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Button Primitives */}
      <Card variant="glass" className="p-5">
        <h3 className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wider mb-3">
          2. BUTTON PRIMITIVES
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">PRIMARY ACTION</Button>
          <Button variant="secondary">SECONDARY ACTION</Button>
          <Button variant="danger">DANGER ACTION</Button>
          <Button variant="glow">GLOW ANIMATED</Button>
          <Button variant="ghost">GHOST ACTION</Button>
        </div>
      </Card>

      {/* Badge Variants */}
      <Card variant="glass" className="p-5">
        <h3 className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wider mb-3">
          3. BADGE VARIANTS
        </h3>
        <div className="flex flex-wrap gap-3">
          <Badge colorScheme="emerald">EMERALD SAFE</Badge>
          <Badge colorScheme="amber">AMBER DETECTED</Badge>
          <Badge colorScheme="indigo">INDIGO ANALYZING</Badge>
          <Badge colorScheme="orange">ORANGE POTENTIAL</Badge>
          <Badge colorScheme="rose" variant="pulse">ROSE LOGGED</Badge>
          <Badge variant="mock">MOCK DATA</Badge>
        </div>
      </Card>
    </div>
  );
};
