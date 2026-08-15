import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Radio, Terminal, Activity, ArrowRight, Cpu, Sliders, Zap, CheckCircle2 } from 'lucide-react';
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

  const btnMonitoringRef = useMagnetic<HTMLButtonElement>(0.3);
  const btnAttackLabRef = useMagnetic<HTMLButtonElement>(0.3);

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
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-10 relative z-10"
    >
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-4">
        {/* Category Label */}
        <motion.div variants={itemVariants} className="inline-block">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mono-900 text-slate-300 border border-white/10 text-xs font-mono mb-1">
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            NEAR-ULTRASONIC THREAT ENGINE (16kHz — 24kHz)
          </div>
        </motion.div>

        {/* Solid Off-White Headline (No gradient text, no rainbow per word) */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 uppercase font-sans leading-none"
        >
          ACOUSTIC SHIELD
        </motion.h1>

        {/* Clear Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base font-sans text-slate-400 leading-relaxed max-w-2xl mx-auto"
        >
          Real-time signal analysis, subcarrier constellation detection, and security incident logging for covert acoustic air-gap communication channels.
        </motion.p>

        {/* Bug Fix #0: CTA Buttons flex layout gap (never overlap) */}
        <motion.div
          variants={itemVariants}
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-lg mx-auto"
        >
          <Link to="/monitoring" className="w-full sm:w-auto">
            <Button
              ref={btnMonitoringRef}
              variant="primary"
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

      {/* Live Engine State Card (Restrained Monochrome Panel) */}
      <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
        <Card variant="glass" className="p-6 border-white/10 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-mono-950 border border-white/10 text-slate-300">
                <Activity className="w-7 h-7" style={{ color: config.colorHex }} />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  LIVE ENGINE STATE
                </span>
                <div className="text-xl font-mono font-bold uppercase flex items-center gap-2 mt-0.5">
                  <span style={{ color: config.colorHex }}>{config.label}</span>
                </div>
                <p className="text-xs font-mono text-slate-400 mt-1 max-w-md">
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
                <span className="text-lg font-bold text-slate-200">{config.risk}</span>
              </div>
            </div>
          </div>

          {/* Interactive State Machine Controller */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                THREAT STATE CONTROLLER
              </span>
              <button
                onClick={() => triggerSimulatedAttack({ frequencyMin: 20000, frequencyMax: 22000, duration: 4 })}
                className="text-xs font-mono text-slate-300 hover:text-slate-100 flex items-center gap-1 font-semibold"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" /> AUTO ATTACK SEQUENCE
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
                    className={`p-2.5 rounded-lg border text-left font-mono text-xs transition-colors ${
                      isActive
                        ? 'bg-mono-950 border-white/30 font-bold'
                        : 'bg-mono-900/60 border-white/10 hover:border-white/20 text-slate-400'
                    }`}
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

      {/* Bento Grid Architecture */}
      <motion.div variants={itemVariants} className="max-w-5xl mx-auto space-y-4">
        <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest text-center mb-2">
          SYSTEM ARCHITECTURE BENTO GRID
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Bento Card 1: 5-State Threat Engine (Spans 2 columns) */}
          <TiltCard variant="glass" className="md:col-span-2 p-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-mono-950 border border-white/10 text-slate-300">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-mono-950 text-slate-300 border border-white/10">
                  CORE MECHANIC
                </span>
              </div>

              <h3 className="text-base font-mono font-bold text-slate-100 uppercase mb-2">
                5-STATE FORMAL THREAT ENGINE
              </h3>
              <p className="text-xs font-sans text-slate-400 leading-relaxed max-w-lg mb-4">
                Models acoustic exfiltration sequence from wave envelope anomaly detection through constellation verification to immutable security ledger registration.
              </p>
            </div>

            <div className="bg-mono-950 p-3 rounded-lg border border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Typed State Reducer
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Shared Morph Pill
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" /> State Machine Validated
              </span>
            </div>
          </TiltCard>

          {/* Bento Card 2: Real-Time Spectrogram */}
          <TiltCard variant="glass" className="p-6 flex flex-col justify-between h-full">
            <div>
              <div className="p-2.5 w-fit rounded-lg bg-mono-950 border border-white/10 text-slate-300 mb-4">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-base font-mono font-bold text-slate-100 uppercase mb-2">
                REAL-TIME SPECTROGRAM
              </h3>
              <p className="text-xs font-sans text-slate-400 leading-relaxed">
                HTML Canvas waterfall matrix rendering 24-bit 96kHz PCM acoustic spectral density.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-mono text-slate-400 font-medium">
              16.0 kHz — 24.0 kHz Waterfall
            </div>
          </TiltCard>

          {/* Bento Card 3: Attack Lab Simulator (Spans full width bottom row) */}
          <TiltCard variant="glass" className="md:col-span-3 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-mono-950 border border-white/10 text-slate-300">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-mono font-bold text-slate-100 uppercase">
                    ATTACK LABORATORY TRANSMITTER SUITE
                  </h3>
                  <p className="text-xs font-sans text-slate-400 mt-0.5">
                    Acoustic payload synthesizer for testing FSK subcarrier exfiltration vectors
                  </p>
                </div>
              </div>

              <Link to="/attack-lab">
                <Button variant="secondary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  OPEN TRANSMITTER SUITE
                </Button>
              </Link>
            </div>
          </TiltCard>
        </div>
      </motion.div>
    </motion.div>
  );
};
