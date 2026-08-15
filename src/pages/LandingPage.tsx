import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Radio, Terminal, Activity, ArrowRight, Cpu, Layers } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { TiltCard } from '../components/shared/TiltCard';
import { useMagnetic } from '../hooks/useMagnetic';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../features/threat-state-machine/stateMachine';

export const LandingPage: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const systemStatus = useThreatStore((s) => s.systemStatus);
  const config = THREAT_STATE_CONFIGS[currentState];

  // Magnetic button refs
  const btnMonitoringRef = useMagnetic<HTMLButtonElement>(0.35);
  const btnAttackLabRef = useMagnetic<HTMLButtonElement>(0.35);

  // Framer Motion entrance choreography variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
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
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-6">
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-block">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-xs font-mono mb-2 shadow-lg shadow-cyan-950/50 animate-pulse">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            SIH 2026 // CYBERSECURITY DEFENSE SYSTEM
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 uppercase font-sans drop-shadow-lg"
        >
          ACOUSTIC<span className="text-cyan-400">SHIELD</span> SOC DASHBOARD
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base font-mono text-slate-400 leading-relaxed"
        >
          Real-time detection, signal constellation analysis, and security ledger logging for covert near-ultrasonic acoustic communication channels (16kHz — 24kHz).
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

      {/* Dynamic System Status Card */}
      <motion.div variants={itemVariants}>
        <Card variant="glow" className="p-6 max-w-4xl mx-auto border-cyan-500/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 shadow-inner">
                <Activity className="w-8 h-8 animate-pulse" style={{ color: config.colorHex }} />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase">SYSTEM STATE</span>
                <div className="text-xl font-mono font-bold text-slate-100 flex items-center gap-2">
                  <span style={{ color: config.colorHex }}>{config.label}</span>
                </div>
                <p className="text-xs font-mono text-slate-400 mt-1 max-w-md">
                  {config.subText}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 font-mono text-xs text-right border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
              <div>
                <span className="text-slate-500 block">ACTIVE SENSORS</span>
                <span className="text-lg font-bold text-emerald-400 animate-pulse">
                  {systemStatus.activeSensors} ONLINE
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">INCIDENTS TODAY</span>
                <span className="text-lg font-bold text-cyan-400 animate-pulse">
                  {systemStatus.totalThreatsToday}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Interactive 3D Tilt Feature Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <TiltCard variant="glass" className="p-5 h-full">
          <div className="p-2.5 w-fit rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 mb-3 shadow-md">
            <Radio className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-mono font-bold text-slate-100 uppercase mb-1">
            REAL-TIME SPECTROGRAM
          </h3>
          <p className="text-xs font-mono text-slate-400 leading-relaxed">
            2D Waterfall FFT matrix visualization rendering high-frequency acoustic emissions in real time at 96kHz 24-bit sampling.
          </p>
        </TiltCard>

        <TiltCard variant="glass" className="p-5 h-full">
          <div className="p-2.5 w-fit rounded-lg bg-indigo-950/80 border border-indigo-800/60 text-indigo-400 mb-3 shadow-md">
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
            Member 2's interactive transmitter suite for synthesizing FSK acoustic subcarrier packets and verifying SOC response.
          </p>
        </TiltCard>
      </motion.div>
    </motion.div>
  );
};
