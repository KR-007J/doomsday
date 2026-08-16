import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Activity, Share2, Terminal, Radio, BookOpen, ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

export const LandingPage: React.FC = () => {
  const cards = [
    {
      title: 'SOC Active Monitoring',
      subtitle: 'Real-time acoustic threat vector assessment & automated containment.',
      icon: Activity,
      path: '/monitoring',
      badge: 'LIVE FEED',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      title: 'Transmitter Suite & Attack Lab',
      subtitle: 'OOB acoustic payload modulation & FSK frequency simulator.',
      icon: Radio,
      path: '/attack-lab',
      badge: 'INTERACTIVE',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    },
    {
      title: 'Network Topology Scope',
      subtitle: 'Global sensor node array & RF propagation telemetry matrix.',
      icon: Share2,
      path: '/network',
      badge: '4,092 NODES',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    {
      title: 'Intelligence Records & Audit',
      subtitle: 'Immutable threat logs, SHA-256 signatures, and classification records.',
      icon: Terminal,
      path: '/logs',
      badge: 'ENCRYPTED',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="min-h-screen w-full text-slate-100 p-6 md:p-12 flex flex-col justify-between max-w-7xl mx-auto z-10 relative"
    >
      {/* Hero Header */}
      <motion.header 
        className="my-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="max-w-2xl">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-blue-500/30 text-blue-400 text-xs font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            ENTERPRISE ULTRASONIC DEFENSE PLATFORM v2.4
          </motion.div>
          <motion.h1 variants={itemVariants} className="font-display text-4xl md:text-6xl font-light text-slate-50 tracking-tight leading-tight mb-4">
            Acoustic Shield <span className="italic text-slate-400">Command Matrix</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-slate-400 text-base md:text-lg font-normal leading-relaxed">
            Military-grade ultrasonic frequency transmission, out-of-band threat detection, and real-time defense automation.
          </motion.p>
        </div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Link to="/monitoring" aria-label="Launch SOC Monitoring Dashboard">
            <button className="w-full sm:w-auto btn-google-primary flex items-center justify-center gap-2 font-mono text-sm">
              <Shield className="w-4 h-4" />
              <span>Launch Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link to="/story" aria-label="View Narrative Story Experience">
            <button className="w-full sm:w-auto glass-panel px-5 py-2.5 rounded-full text-slate-300 hover:text-white font-mono text-sm flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500">
              <BookOpen className="w-4 h-4" />
              <span>Brand Story</span>
            </button>
          </Link>
        </motion.div>
      </motion.header>

      {/* Metrics Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Active Sensors', val: '4,092', sub: 'Global mesh online', color: 'text-emerald-400' },
          { label: 'Detection Latency', val: '< 8.4 ms', sub: 'Sub-second response', color: 'text-blue-400' },
          { label: 'Threat Mitigation', val: '99.98%', sub: 'Automated FSK isolation', color: 'text-amber-400' },
          { label: 'Carrier Bandwidth', val: '18-24 kHz', sub: 'Ultrasonic range', color: 'text-slate-200' }
        ].map((m, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="glass-panel p-4 rounded-xl border border-slate-800"
          >
            <div className="text-xs text-slate-400 font-mono mb-1">{m.label}</div>
            <div className={`text-2xl font-bold font-mono ${m.color}`}>{m.val}</div>
            <div className="text-[11px] text-slate-500 mt-1">{m.sub}</div>
          </motion.div>
        ))}
      </section>

      {/* Navigation Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {cards.map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <Link key={idx} to={card.path} className="group" aria-label={`Navigate to ${card.title}`}>
              <motion.div
                whileHover={{ scale: 1.01, translateY: -2 }}
                whileTap={{ scale: 0.99 }}
                className="glass-panel p-6 rounded-xl border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border ${card.badgeColor}`}>
                    {card.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-light text-slate-100 group-hover:text-white mb-2 flex items-center justify-between">
                    <span>{card.title}</span>
                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-400 text-sm font-normal">
                    {card.subtitle}
                  </p>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </section>

      {/* Enterprise Footer Status */}
      <footer className="border-t border-slate-800/80 pt-4 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 font-mono gap-2">
        <div>© 2026 ACOUSTIC SHIELD INC. // ENTERPRISE SAAS SYSTEM</div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            SYSTEM NOMINAL
          </span>
          <span>LATENCY: 42ms</span>
        </div>
      </footer>
    </motion.div>
  );
};

export default LandingPage;
