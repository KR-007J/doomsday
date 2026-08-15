import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Radio, Terminal, Activity, ArrowRight, Cpu, Layers, Play, Zap, Sliders } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { TiltCard } from '../components/shared/TiltCard';
import { useMagnetic } from '../hooks/useMagnetic';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../features/threat-state-machine/stateMachine';
import { ThreatStateType } from '../types/threat';

export const LandingPage: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const confidence = useThreatStore((s) => s.confidence);
  const systemStatus = useThreatStore((s) => s.systemStatus);
  const setThreatState = useThreatStore((s) => s.setThreatState);
  const triggerSimulatedAttack = useThreatStore((s) => s.triggerSimulatedAttack);

  const config = THREAT_STATE_CONFIGS[currentState];

  const btnMonitoringRef = useMagnetic<HTMLButtonElement>(0.35);
  const btnAttackLabRef = useMagnetic<HTMLButtonElement>(0.35);

  const states: ThreatStateType[] = [
    'SAFE',
    'SIGNAL_DETECTED',
    'ANALYZING',
    'POTENTIAL_COVERT_COMMUNICATION',
    'THREAT_LOGGED',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-12"
    >
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
        <motion.div variants={itemVariants} className="inline-block">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-xs font-mono mb-2 shadow-lg shadow-cyan-950/50">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            NEAR-ULTRASONIC THREAT ENGINE (16kHz — 24kHz)
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 uppercase font-sans drop-shadow-2xl"
        >
          ACOUSTIC<span className="text-cyan-400">SHIELD</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base font-mono text-slate-400 leading-relaxed"
        >
          Real-time signal analysis, subcarrier constellation detection, and security incident logging for covert acoustic communication channels.
        </motion.p>

        {/* Magnetic CTA Buttons */}
        <motion.div variants={itemVariants} className="pt-4 flex flex-wrap justify-center gap-4">
          <Link to="/monitoring">
            <Button
              ref={btnMonitoringRef}
              variant="primary"
              size="lg"
              icon={<Radio className="w-5 h-5" />}
            >
              OPEN SOC MONITORING
            </Button>
          </Link>
          <Link to="/attack-lab">
            <Button
              ref={btnAttackLabRef}
              variant="secondary"
              size="lg"
              icon={<Terminal className="w-5 h-5" />}
            >
              LAUNCH ATTACK LAB
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Live Interactive Threat State Machine Jumper Hero Widget */}
      <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
        <Card variant="glow" className="p-6 border-cyan-500/40 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div
                className="p-3.5 rounded-xl bg-obsidian-900 border border-white/10 shadow-inner"
                style={{ color: config.colorHex }}
              >
                <Activity className="w-8 h-8 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  LIVE ENGINE STATE
                </span>
                <div className="text-2xl font-mono font-extrabold uppercase flex items-center gap-2">
                  <span style={{ color: config.colorHex }}>{config.label}</span>
                </div>
                <p className="text-xs font-mono text-slate-300 mt-1 max-w-md">
                  {config.subText}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 font-mono text-xs text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
              <div>
                <span className="text-slate-400 block">CONFIDENCE</span>
                <span className="text-2xl font-bold" style={{ color: config.colorHex }}>
                  {confidence}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">RISK LEVEL</span>
                <span className="text-lg font-bold text-slate-100">{config.risk}</span>
              </div>
            </div>
          </div>

          {/* Interactive State Jumper Buttons */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                INTERACTIVE THREAT STATE CONTROLLER (CLICK TO TEST LIVE ENGINE)
              </span>
              <button
                onClick={() => triggerSimulatedAttack({ frequencyMin: 20000, frequencyMax: 22000, duration: 4 })}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold"
              >
                <Zap className="w-3.5 h-3.5" /> AUTO SIMULATED ATTACK
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {states.map((st) => {
                const stateConfig = THREAT_STATE_CONFIGS[st];
                const isActive = currentState === st;
                return (
                  <button
                    key={st}
                    onClick={() => setThreatState(st)}
                    className={`p-2.5 rounded-lg border text-left font-mono text-xs transition-all duration-300 ${
                      isActive
                        ? 'bg-obsidian-900 border-2 shadow-lg scale-105 font-bold'
                        : 'bg-obsidian-950/80 border-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
                    }`}
                    style={{ borderColor: isActive ? stateConfig.colorHex : undefined }}
                  >
                    <div
                      className="w-2 h-2 rounded-full mb-1.5"
                      style={{ backgroundColor: stateConfig.colorHex }}
                    />
                    <div className="text-[11px] text-slate-200 truncate">{stateConfig.label}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Feature Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <TiltCard variant="glass" className="p-5 h-full">
          <div className="p-2.5 w-fit rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 mb-3 shadow-md">
            <Radio className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-mono font-bold text-slate-100 uppercase mb-1">
            REAL-TIME SPECTROGRAM
          </h3>
          <p className="text-xs font-mono text-slate-400 leading-relaxed">
            2D Waterfall FFT matrix visualizer rendering high-frequency acoustic emissions in real time at 96kHz 24-bit sampling.
          </p>
        </TiltCard>

        <TiltCard variant="glass" className="p-5 h-full">
          <div className="p-2.5 w-fit rounded-lg bg-purple-950/80 border border-purple-800/60 text-purple-400 mb-3 shadow-md">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-mono font-bold text-slate-100 uppercase mb-1">
            5-STATE THREAT ENGINE
          </h3>
          <p className="text-xs font-mono text-slate-400 leading-relaxed">
            Formal state machine stepping through SAFE → SIGNAL DETECTED → ANALYZING → POTENTIAL COVERT COMM → THREAT LOGGED.
          </p>
        </TiltCard>

        <TiltCard variant="glass" className="p-5 h-full">
          <div className="p-2.5 w-fit rounded-lg bg-rose-950/80 border border-rose-800/60 text-rose-400 mb-3 shadow-md">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-mono font-bold text-slate-100 uppercase mb-1">
            ATTACK LAB SIMULATOR
          </h3>
          <p className="text-xs font-mono text-slate-400 leading-relaxed">
            Interactive transmitter suite for synthesizing FSK acoustic subcarrier packets and verifying SOC response.
          </p>
        </TiltCard>
      </motion.div>
    </motion.div>
  );
};
