import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Radio, Terminal, Activity, ArrowRight, Cpu, Layers, Zap, Sliders, CheckCircle2 } from 'lucide-react';
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
      transition: { staggerChildren: 0.12, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 240, damping: 22 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 relative z-10"
    >
      {/* Hero Header */}
      <div className="text-center space-y-5 max-w-3xl mx-auto pt-4">
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-block">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 text-xs font-mono mb-2 shadow-lg shadow-cyan-950/40 backdrop-blur-md">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            ACOUSTIC AIR-GAP THREAT ENGINE (16kHz — 24kHz)
          </div>
        </motion.div>

        {/* Kinetic Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase font-sans leading-none"
        >
          <span className="animate-kinetic-text">ACOUSTICSHIELD</span>
        </motion.h1>

        {/* Subtext with focus blur-in */}
        <motion.p
          variants={itemVariants}
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base font-mono text-slate-400 leading-relaxed max-w-2xl mx-auto"
        >
          Real-time signal analysis, subcarrier constellation detection, and security incident logging for covert acoustic communication channels.
        </motion.p>

        {/* Bug Fix #0: Flex/Grid CTA buttons with guaranteed non-overlapping gap */}
        <motion.div
          variants={itemVariants}
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-lg mx-auto"
        >
          <Link to="/monitoring" className="w-full sm:w-auto">
            <Button
              ref={btnMonitoringRef}
              variant="glow"
              size="lg"
              icon={<Radio className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              OPEN SOC MONITORING
            </Button>
          </Link>

          <Link to="/attack-lab" className="w-full sm:w-auto">
            <Button
              ref={btnAttackLabRef}
              variant="secondary"
              size="lg"
              icon={<Terminal className="w-5 h-5" />}
              className="w-full sm:w-auto"
            >
              LAUNCH ATTACK LAB
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Main Stat Card with Selective Liquid Glass */}
      <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
        <Card variant="liquid" className="p-6 border-cyan-500/30 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div
                className="p-3.5 rounded-xl bg-obsidian-950/80 border border-white/10 shadow-inner"
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

          {/* Interactive State Jumper Controls */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                INTERACTIVE THREAT STATE CONTROLLER
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
                    className={`p-2.5 rounded-xl border text-left font-mono text-xs transition-all duration-300 ${
                      isActive
                        ? 'bg-obsidian-950 border-2 shadow-lg scale-105 font-bold'
                        : 'bg-obsidian-950/60 border-white/10 hover:border-white/20 opacity-70 hover:opacity-100'
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

      {/* Item 4: Asymmetric Bento Grid Restructure */}
      <motion.div variants={itemVariants} className="max-w-5xl mx-auto space-y-4">
        <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest text-center mb-2">
          SYSTEM ARCHITECTURE BENTO GRID
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Main Spanner Bento Card: Core 5-State Threat Engine (Spans 2 columns) */}
          <TiltCard variant="liquid" className="md:col-span-2 p-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-800/60 text-indigo-400">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                  CORE MECHANIC
                </span>
              </div>

              <h3 className="text-lg font-mono font-bold text-slate-100 uppercase mb-2">
                5-STATE FORMAL THREAT ENGINE
              </h3>
              <p className="text-xs font-mono text-slate-300 leading-relaxed max-w-lg mb-4">
                Models acoustic exfiltration sequence from initial wave envelope anomaly through constellation verification to immutable security ledger registration.
              </p>
            </div>

            <div className="bg-obsidian-950/90 p-3 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Typed State Reducer
              </span>
              <span className="text-cyan-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Shared Morph Pill
              </span>
              <span className="text-indigo-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Zero False Positives
              </span>
            </div>
          </TiltCard>

          {/* Bento Card 2: Real-Time Spectrogram */}
          <TiltCard variant="liquid" className="p-6 flex flex-col justify-between h-full">
            <div>
              <div className="p-3 w-fit rounded-xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 mb-4">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-base font-mono font-bold text-slate-100 uppercase mb-2">
                REAL-TIME SPECTROGRAM
              </h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                HTML Canvas waterfall matrix rendering 24-bit 96kHz PCM acoustic spectral density.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-mono text-cyan-400 font-bold">
              16.0 kHz — 24.0 kHz Waterfall
            </div>
          </TiltCard>

          {/* Bento Card 3: Attack Lab Simulator (Spans full width bottom row) */}
          <TiltCard variant="liquid" className="md:col-span-3 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800/60 text-rose-400">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-mono font-bold text-slate-100 uppercase">
                    ATTACK LABORATORY TRANSMITTER SUITE
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Member 2's acoustic payload synthesizer for testing FSK subcarrier exfiltration vectors
                  </p>
                </div>
              </div>

              <Link to="/attack-lab">
                <Button variant="glow" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  OPEN SIMULATOR SUITE
                </Button>
              </Link>
            </div>
          </TiltCard>
        </div>
      </motion.div>
    </motion.div>
  );
};
