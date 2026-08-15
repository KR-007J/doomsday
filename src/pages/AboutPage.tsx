import React from 'react';
import { Card } from '../components/ui/Card';
import { Shield, Radio, Cpu, Network, FileCode, CheckCircle2, Layers } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const pipelineSteps = [
    { step: '01', title: 'Payload Assembly', desc: 'Binary exfiltration packet generation (Text / Hex token)', icon: <FileCode className="w-5 h-5 text-cyan-400" /> },
    { step: '02', title: 'FSK Modulation', desc: 'Phase & Frequency Shift Keying subcarrier synthesis (18-24kHz)', icon: <Radio className="w-5 h-5 text-indigo-400" /> },
    { step: '03', title: 'Acoustic Emitter', desc: 'Near-ultrasonic acoustic emission through speaker/hardware transducer', icon: <Network className="w-5 h-5 text-amber-400" /> },
    { step: '04', title: 'Mic Array Capture', desc: 'High-speed 96kHz 24-bit PCM acoustic stream sampling', icon: <Cpu className="w-5 h-5 text-rose-400" /> },
    { step: '05', title: 'FFT & Wavelet AI', desc: 'Spectral feature extraction & anomaly pattern match engine', icon: <Layers className="w-5 h-5 text-emerald-400" /> },
    { step: '06', title: 'SOC Dashboard', desc: '5-state threat machine dispatch & incident audit logging', icon: <Shield className="w-5 h-5 text-cyan-400" /> },
  ];

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight text-slate-100 uppercase">
          SYSTEM ARCHITECTURE & SIH 2026 OVERVIEW
        </h1>
        <p className="text-xs font-mono text-slate-400">
          Acoustic Shield — Near-Ultrasonic Covert Communication Detection Platform
        </p>
      </div>

      {/* Architecture Visual Diagram */}
      <Card variant="glow" className="p-6 border-cyan-500/40">
        <h2 className="text-sm font-mono font-bold text-slate-100 uppercase tracking-wider mb-6 flex items-center gap-2">
          <Network className="w-5 h-5 text-cyan-400" />
          END-TO-END ACOUSTIC PROPAGATION & DETECTION PIPELINE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
          {pipelineSteps.map((s) => (
            <div
              key={s.step}
              className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-cyan-500/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-500">{s.step}</span>
                  {s.icon}
                </div>
                <div className="font-mono text-xs font-bold text-slate-200 mb-1">{s.title}</div>
                <p className="text-[10px] font-mono text-slate-400 leading-tight">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tech Stack & Design System Standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="glass" className="p-5">
          <h3 className="text-sm font-mono font-bold text-slate-100 uppercase mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" /> FRONTEND TECH STACK (2026 SPEC)
          </h3>
          <ul className="space-y-2 text-xs font-mono text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> React 18 + TypeScript + Vite 5
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tailwind CSS with custom SOC dark theme tokens
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Framer Motion shared-element state morphing
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Three.js / React Three Fiber GPU Particle Field
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> HTML Canvas requestAnimationFrame Spectrogram
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zustand global state store + Zod schema validation
            </li>
          </ul>
        </Card>

        <Card variant="glass" className="p-5">
          <h3 className="text-sm font-mono font-bold text-slate-100 uppercase mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" /> BACKEND INTEGRATION CONTRACT
          </h3>
          <p className="text-xs font-mono text-slate-400 leading-relaxed mb-3">
            The frontend is 100% backend-agnostic. All data calls pass through a unified service layer routing between mock generators and real endpoints via single environment flag <code className="text-cyan-300">VITE_USE_MOCK_DATA</code>.
          </p>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
            <div>GET /api/system-status</div>
            <div>GET /api/threats</div>
            <div>GET /api/threats/current</div>
            <div>POST /api/analyze</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
