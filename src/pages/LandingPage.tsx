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
      transition: { staggerChildren: 0.08, delayChildren: 0.04 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: 'easeOut' },
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
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-2">
        {/* Category Label */}
        <motion.div variants={itemVariants} className="inline-block">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D0F12] text-[#9AA0A6] border border-[#242728] text-xs font-mono mb-1">
            <Shield className="w-3.5 h-3.5 text-[#9AA0A6]" />
            NEAR-ULTRASONIC THREAT ENGINE (16kHz — 24kHz)
          </div>
        </motion.div>

        {/* Solid Display Headline (NO GRADIENT FILL, NO RAINBOW TEXT) */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#F2F3F5] uppercase font-sans leading-none"
        >
          ACOUSTIC SHIELD
        </motion.h1>

        {/* Clear Body Text */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base font-sans text-[#9AA0A6] leading-relaxed max-w-2xl mx-auto font-medium"
        >
          Real-time signal analysis, subcarrier constellation detection, and security incident logging for covert acoustic air-gap communication channels.
        </motion.p>

        {/* Bug Fix #1: CTA Buttons flex layout gap (never overlap) */}
        <motion.div
          variants={itemVariants}
          className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-lg mx-auto"
        >
          <Link to="/monitoring" className="w-full sm:w-auto">
            <Button
              ref={btnMonitoringRef}
              variant="primary"
              size="lg"
              icon={<Radio className="w-4.5 h-4.5 text-[#07080A]" />}
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
              icon={<Terminal className="w-4.5 h-4.5" />}
              className="w-full sm:w-auto"
            >
              LAUNCH ATTACK LAB
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Live Engine State Card (Restrained Surface-1 Elevation) */}
      <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
        <Card variant="surface-1" className="p-6 border-[#242728] relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#07080A] border border-[#242728]">
                <Activity className="w-7 h-7" style={{ color: config.colorHex }} />
              </div>
              <div>
                <span className="text-xs font-mono text-[#9AA0A6] uppercase tracking-wider">
                  LIVE ENGINE STATE
                </span>
                <div className="text-xl font-mono font-bold uppercase flex items-center gap-2 mt-0.5">
                  <span style={{ color: config.colorHex }}>{config.label}</span>
                </div>
                <p className="text-xs font-mono text-[#9AA0A6] mt-1 max-w-md">
                  {config.subText}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 font-mono text-xs text-right border-t md:border-t-0 md:border-l border-[#242728] pt-4 md:pt-0 md:pl-6">
              <div>
                <span className="text-[#5C6167] block">CONFIDENCE</span>
                <span className="text-2xl font-bold" style={{ color: config.colorHex }}>
                  {confidence}%
                </span>
              </div>
              <div>
                <span className="text-[#5C6167] block">RISK LEVEL</span>
                <span className="text-lg font-bold text-[#F2F3F5]">{config.risk}</span>
              </div>
            </div>
          </div>

          {/* Interactive Threat State Controller */}
          <div className="pt-4 border-t border-[#242728]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-mono font-bold text-[#F2F3F5] uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#9AA0A6]" />
                THREAT STATE CONTROLLER
              </span>
              <button
                onClick={() => triggerSimulatedAttack({ frequencyMin: 20000, frequencyMax: 22000, duration: 4 })}
                className="text-xs font-mono text-[#F2F3F5] hover:text-white flex items-center gap-1 font-semibold"
              >
                <Zap className="w-3.5 h-3.5 text-[#F5A623]" /> AUTO ATTACK SEQUENCE
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
                        ? 'bg-[#15171B] border-[#5C6167] font-bold text-[#F2F3F5]'
                        : 'bg-[#07080A] border-[#242728] hover:border-[#383C42] text-[#9AA0A6]'
                    }`}
                  >
                    <div
                      className="w-2 h-2 rounded-full mb-1.5"
                      style={{ backgroundColor: stateConfig.colorHex }}
                    />
                    <div className="text-[11px] truncate">{stateConfig.label}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Bento Grid Architecture */}
      <motion.div variants={itemVariants} className="max-w-5xl mx-auto space-y-4">
        <h2 className="text-xs font-mono font-bold text-[#5C6167] uppercase tracking-widest text-center mb-2">
          SYSTEM ARCHITECTURE BENTO GRID
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Bento Card 1: 5-State Threat Engine (Spans 2 columns) */}
          <TiltCard variant="surface-1" className="md:col-span-2 p-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-[#07080A] border border-[#242728] text-[#F2F3F5]">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-[#15171B] text-[#9AA0A6] border border-[#242728]">
                  CORE MECHANIC
                </span>
              </div>

              <h3 className="text-base font-mono font-bold text-[#F2F3F5] uppercase mb-2">
                5-STATE FORMAL THREAT ENGINE
              </h3>
              <p className="text-xs font-sans text-[#9AA0A6] leading-relaxed max-w-lg mb-4 font-medium">
                Models acoustic exfiltration sequence from wave envelope anomaly detection through constellation verification to immutable security ledger registration.
              </p>
            </div>

            <div className="bg-[#07080A] p-3 rounded-lg border border-[#242728] flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#9AA0A6]">
              <span className="flex items-center gap-1.5 text-[#3ECF8E]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Typed State Reducer
              </span>
              <span className="flex items-center gap-1.5 text-[#F2F3F5]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Shared Morph Pill
              </span>
              <span className="flex items-center gap-1.5 text-[#9AA0A6]">
                <CheckCircle2 className="w-3.5 h-3.5" /> State Machine Validated
              </span>
            </div>
          </TiltCard>

          {/* Bento Card 2: Real-Time Spectrogram */}
          <TiltCard variant="surface-1" className="p-6 flex flex-col justify-between h-full">
            <div>
              <div className="p-2.5 w-fit rounded-lg bg-[#07080A] border border-[#242728] text-[#F2F3F5] mb-4">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-base font-mono font-bold text-[#F2F3F5] uppercase mb-2">
                REAL-TIME SPECTROGRAM
              </h3>
              <p className="text-xs font-sans text-[#9AA0A6] leading-relaxed font-medium">
                HTML Canvas waterfall matrix rendering 24-bit 96kHz PCM acoustic spectral density.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#242728] text-[10px] font-mono text-[#5C6167] font-medium">
              16.0 kHz — 24.0 kHz Waterfall
            </div>
          </TiltCard>

          {/* Bento Card 3: Attack Lab Simulator (Spans 3 columns bottom row) */}
          <TiltCard variant="surface-1" className="md:col-span-3 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg bg-[#07080A] border border-[#242728] text-[#F2F3F5]">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-mono font-bold text-[#F2F3F5] uppercase">
                    ATTACK LABORATORY TRANSMITTER SUITE
                  </h3>
                  <p className="text-xs font-sans text-[#9AA0A6] mt-0.5 font-medium">
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
