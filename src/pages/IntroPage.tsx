import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UltrasonicShader } from '../components/visualizations/UltrasonicShader';
import { LiveWaveformCanvas } from '../components/visualizations/LiveWaveformCanvas';
import { SpectrumBarChart } from '../components/visualizations/SpectrumBarChart';
import { RadarScopeCanvas } from '../components/visualizations/RadarScopeCanvas';
import { ClassificationCardWave } from '../components/visualizations/ClassificationCardWave';
import { AcousticVideoPlayer } from '../components/visualizations/AcousticVideoPlayer';

export const IntroPage: React.FC = () => {
  const [uptimeSec, setUptimeSec] = useState(0);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSec((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds: number) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `SYS.UPTIME: ${hrs}:${mins}:${secs}`;
  };

  const pipelineSteps = [
    { num: '01', title: 'CAPTURE', desc: 'Acquire the raw signal from active sensors.' },
    { num: '02', title: 'FILTER', desc: 'Remove known baseline and environmental noise.' },
    { num: '03', title: 'CLASSIFY', desc: 'Identify pattern type, risk, and confidence.' },
    { num: '04', title: 'CORRELATE', desc: 'Compare across nodes, time, and context.' },
    { num: '05', title: 'RESPOND', desc: 'Route confirmed intelligence to defense.' },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#E5E7EB] font-sans overflow-x-hidden selection:bg-[#EF4444]/30 selection:text-[#EF4444]">
      {/* GL Soundwave Shader Background */}
      <UltrasonicShader />

      {/* Grid Pattern Texture Overlay */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-20 z-10" />

      {/* Main Page Layout */}
      <main className="relative z-20 flex flex-col min-h-screen">
        {/* Top Header HUD */}
        <header className="w-full flex justify-between items-center px-8 py-5 border-b border-[#1f1f1f] bg-[#080808]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm tracking-[0.2em] font-bold text-white uppercase">
              THE SILENT DOG
            </span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-widest text-[#A3A3A3]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[#10B981] font-bold">SIGNAL INTELLIGENCE • SYSTEM NOMINAL</span>
            </div>
            <span className="hidden md:inline text-[#404040]">//</span>
            <span className="hidden md:inline font-bold">{formatUptime(uptimeSec)}</span>
          </div>
        </header>

        {/* HERO SECTION (Matches Screenshot 1) */}
        <section className="w-full max-w-[1500px] mx-auto px-8 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start animate-slide-up-blur">
            {/* Monospace Sub-header */}
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-[#EF4444] uppercase mb-4 font-bold">
              <span>●</span>
              <span>THE SILENT DOG / DEFENSE NETWORK</span>
            </div>

            {/* Kinetic Display Headline */}
            <h1 className="font-display-lg text-[44px] sm:text-[64px] md:text-[80px] leading-[1.0] text-white font-extrabold tracking-tighter uppercase mb-6">
              HEAR THE
              <br />
              THREAT
              <br />
              BEFORE IT
              <br />
              STRIKES.
            </h1>

            {/* Paragraph Subtitle */}
            <p className="font-mono text-sm text-[#A3A3A3] max-w-xl leading-relaxed mb-10">
              Signal intelligence, anomaly detection and autonomous acoustic defense built for environments where silence carries information.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-6">
              <Link to="/monitoring">
                <button className="bg-[#EF4444] text-white font-mono text-xs font-bold uppercase tracking-[0.15em] px-8 py-4 border border-[#EF4444] hover:bg-[#DC2626] transition-all flex items-center gap-3 cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  ENTER COMMAND CENTER
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </Link>

              <Link to="/about">
                <button className="text-white font-mono text-xs font-bold uppercase tracking-[0.15em] hover:underline cursor-pointer border-b border-white pb-1">
                  EXPLORE INTELLIGENCE
                </button>
              </Link>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-mono text-[11px] text-[#A3A3A3] uppercase tracking-wider px-4 py-2 border border-[#333333] hover:border-white hover:text-white transition-colors cursor-pointer"
              >
                REPLAY INTRO
              </button>
            </div>
          </div>

          {/* Right Floating Acoustic Node & Radar Visual */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-full bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-6 relative shadow-2xl">
              <div className="flex justify-between items-center mb-4 border-b border-[#1f1f1f] pb-3">
                <span className="font-mono text-[10px] text-[#EF4444] uppercase tracking-widest font-bold">
                  ACTIVE ACOUSTIC NODE [01]
                </span>
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              </div>
              <RadarScopeCanvas size={260} />
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#1f1f1f] font-mono text-[10px] text-[#737373]">
                <span>NODE 01</span>
                <span>CHANNEL SECURE</span>
                <span>ACTIVE SENSORS: 08</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 01 — SIGNAL INTELLIGENCE (Matches Screenshot 2) */}
        <section className="w-full max-w-[1500px] mx-auto px-8 py-24 border-t border-[#1f1f1f]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column Headline */}
            <div className="lg:col-span-5 flex flex-col">
              <span className="font-mono text-[11px] text-[#737373] tracking-[0.2em] uppercase mb-3">
                01 / SIGNAL INTELLIGENCE
              </span>
              <h2 className="font-display-lg text-[40px] sm:text-[54px] leading-[1.0] text-white font-extrabold tracking-tighter uppercase mb-6">
                FROM A WHISPER
                <br />
                TO A DECISION.
              </h2>
              <p className="font-mono text-sm text-[#A3A3A3] leading-relaxed max-w-md">
                A single waveform is carried through the defense chain. Each stop gives the signal more context before it becomes an action.
              </p>
            </div>

            {/* Right Column Pipeline List */}
            <div className="lg:col-span-7 flex flex-col border-t border-[#1f1f1f]">
              {pipelineSteps.map((step, idx) => (
                <div
                  key={step.num}
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                  className={`border-b border-[#1f1f1f] py-6 px-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors cursor-pointer ${
                    activeStep === idx ? 'bg-[#121212]' : ''
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs text-[#EF4444] font-bold">{step.num}</span>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#EF4444] text-[18px]">graphic_eq</span>
                      <span className="font-mono text-base font-bold text-white tracking-wider">{step.title}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#A3A3A3] max-w-md">{step.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 02 — LIVE INTELLIGENCE TELEMETRY (Matches Screenshot 3) */}
        <section className="w-full max-w-[1500px] mx-auto px-8 py-24 border-t border-[#1f1f1f]">
          <div className="flex flex-col mb-12">
            <span className="font-mono text-[11px] text-[#737373] tracking-[0.2em] uppercase mb-3">
              02 / LIVE INTELLIGENCE
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h2 className="font-display-lg text-[40px] sm:text-[54px] leading-[1.0] text-white font-extrabold tracking-tighter uppercase">
                OBSERVE THE
                <br />
                INVISIBLE.
              </h2>
              <p className="font-mono text-sm text-[#A3A3A3] max-w-lg leading-relaxed">
                Sample telemetry from the Silent Dog operational field. Live API adapters can replace this data stream without changing the visualization layer.
              </p>
            </div>
          </div>

          {/* Telemetry Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Box 1: Live Waveform (7 cols) */}
            <div className="md:col-span-7 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[11px] text-[#737373] uppercase tracking-wider">
                  CHANNEL 04 / WAVEFORM
                </span>
                <span className="font-mono text-[10px] text-[#10B981] font-bold uppercase tracking-wider">
                  LIVE
                </span>
              </div>
              <LiveWaveformCanvas height={160} />
            </div>

            {/* Box 2: Spectrum Analyzer (5 cols) */}
            <div className="md:col-span-5 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[11px] text-[#737373] uppercase tracking-wider">
                  SPECTRUM / 2.4 GHz
                </span>
                <span className="font-mono text-[10px] text-[#EF4444] font-bold uppercase tracking-wider animate-pulse">
                  THREAT LOCK
                </span>
              </div>
              <SpectrumBarChart height={160} />
            </div>

            {/* Box 3: Node Radar Topology (6 cols) */}
            <div className="md:col-span-6 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[11px] text-[#737373] uppercase tracking-wider">
                  NODE TOPOLOGY
                </span>
                <span className="font-mono text-[10px] text-[#10B981] font-bold uppercase tracking-wider">
                  06 ONLINE
                </span>
              </div>
              <div className="flex items-center justify-center py-2">
                <RadarScopeCanvas size={200} />
              </div>
            </div>

            {/* Box 4: Live Event Stream (6 cols) */}
            <div className="md:col-span-6 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[11px] text-[#737373] uppercase tracking-wider">
                  EVENT STREAM
                </span>
                <span className="font-mono text-[10px] text-white uppercase tracking-wider">
                  NOW
                </span>
              </div>

              <div className="font-mono text-xs space-y-3 py-2 text-[#A3A3A3]">
                <div className="flex justify-between border-b border-[#1f1f1f] pb-2">
                  <span>12:41:02</span>
                  <span>NODE-04</span>
                  <span className="text-[#EF4444] font-bold">SIGNAL DETECTED</span>
                </div>
                <div className="flex justify-between border-b border-[#1f1f1f] pb-2">
                  <span>12:41:04</span>
                  <span>CORE</span>
                  <span>ANALYSIS STARTED</span>
                </div>
                <div className="flex justify-between border-b border-[#1f1f1f] pb-2">
                  <span>12:41:05</span>
                  <span>NODE-02</span>
                  <span>CORRELATION FOUND</span>
                </div>
                <div className="flex justify-between">
                  <span>12:41:07</span>
                  <span>CORE</span>
                  <span className="text-[#EF4444] font-bold">THREAT SCORE 0.82</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03 — CLASSIFICATION FIELD (Matches Screenshot 4) */}
        <section className="w-full max-w-[1500px] mx-auto px-8 py-24 border-t border-[#1f1f1f]">
          <div className="flex flex-col mb-12">
            <span className="font-mono text-[11px] text-[#737373] tracking-[0.2em] uppercase mb-3">
              03 / CLASSIFICATION FIELD
            </span>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h2 className="font-display-lg text-[40px] sm:text-[54px] leading-[1.0] text-white font-extrabold tracking-tighter uppercase">
                NOISE HAS
                <br />
                A SIGNATURE.
              </h2>
              <p className="font-mono text-sm text-[#A3A3A3] max-w-lg leading-relaxed">
                Signals enter one by one. THE SILENT DOG compares each against the active field, assigns its risk, and arms the matching defense response.
              </p>
            </div>
          </div>

          {/* 3 Classification Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Normal */}
            <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-6 flex flex-col justify-between hover:border-[#404040] transition-colors">
              <div>
                <div className="flex justify-between font-mono text-[10px] text-[#737373] uppercase mb-2">
                  <span>SIG-04</span>
                  <span>01 normal</span>
                </div>
                <ClassificationCardWave color="#FFFFFF" amplitude={14} height={70} />
                <h4 className="font-mono text-base font-bold text-white uppercase mt-4 mb-1">
                  ENVIRONMENTAL BASELINE
                </h4>
                <p className="font-mono text-xs text-[#737373] mb-6">
                  Known ventilation / ambient field
                </p>
              </div>
              <div className="pt-4 border-t border-[#1f1f1f] font-mono text-[11px]">
                <span className="text-[#10B981] font-bold">DEFENSE MONITOR</span>
                <p className="text-[#737373] text-[10px] mt-1">Retain as trusted baseline.</p>
              </div>
            </div>

            {/* Card 2: Anomaly */}
            <div className="bg-[#0a0a0a] border border-[#F59E0B]/30 rounded-lg p-6 flex flex-col justify-between hover:border-[#F59E0B] transition-colors">
              <div>
                <div className="flex justify-between font-mono text-[10px] text-[#F59E0B] uppercase mb-2">
                  <span>SIG-21</span>
                  <span>02 anomaly</span>
                </div>
                <ClassificationCardWave color="#F59E0B" amplitude={20} height={70} />
                <h4 className="font-mono text-base font-bold text-white uppercase mt-4 mb-1">
                  SPOOFED BEACON
                </h4>
                <p className="font-mono text-xs text-[#737373] mb-6">
                  Repeating acoustic marker
                </p>
              </div>
              <div className="pt-4 border-t border-[#1f1f1f] font-mono text-[11px]">
                <span className="text-[#F59E0B] font-bold">DEFENSE VALIDATE</span>
                <p className="text-[#737373] text-[10px] mt-1">Cross-check node origin and cadence.</p>
              </div>
            </div>

            {/* Card 3: Threat */}
            <div className="bg-[#0a0a0a] border border-[#EF4444]/40 rounded-lg p-6 flex flex-col justify-between hover:border-[#EF4444] transition-colors shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              <div>
                <div className="flex justify-between font-mono text-[10px] text-[#EF4444] uppercase mb-2 font-bold">
                  <span>SIG-11</span>
                  <span>03 threat</span>
                </div>
                <ClassificationCardWave color="#EF4444" amplitude={26} height={70} />
                <h4 className="font-mono text-base font-bold text-white uppercase mt-4 mb-1">
                  MECHANICAL INTRUSION
                </h4>
                <p className="font-mono text-xs text-[#737373] mb-6">
                  Low-frequency rotary signature
                </p>
              </div>
              <div className="pt-4 border-t border-[#1f1f1f] font-mono text-[11px]">
                <span className="text-[#EF4444] font-bold">DEFENSE CONTAIN</span>
                <p className="text-[#737373] text-[10px] mt-1">Lock, correlate, and route to defense.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Explainer & Team Bento Section */}
        <section className="w-full max-w-[1500px] mx-auto px-8 py-16 border-t border-[#1f1f1f]">
          <AcousticVideoPlayer />

          {/* Team Grid */}
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-8 border-b border-[#1f1f1f] pb-4">
              <span className="material-symbols-outlined text-[#EF4444]">group</span>
              <h3 className="font-mono text-xl text-white uppercase tracking-wider font-bold">
                THE SILENT DOG CREW
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0a0a0a] border border-[#1f1f1f] rounded-lg p-6">
              {/* Member 1 */}
              <div className="p-6 border border-[#1f1f1f] bg-[#121212] rounded-lg flex flex-col justify-between">
                <div className="w-full aspect-square mb-6 border border-[#1f1f1f] overflow-hidden grayscale contrast-125 brightness-90 rounded">
                  <img
                    className="w-full h-full object-cover mix-blend-luminosity"
                    alt="Cipher Null"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcDIwpDnzQOJs-uM8zDIGklRpOarwxknuT__HlIB-89enaJrUU4s6LYwHxXxhf7FFpif7xmqTCPqV-ZIruyjhRaF1pn0_tYBnaAY86BOg_AJdHwcq4V9_7ZrYfn_ri3l10v00e6i6XX18lHXuqsIvN--efZjTTy4h79btoNha-c26WQ8HqbToZZ-AErqI3kCiUzgTbk7byyFLKqSqVlrmsVWW9R-Vuq8MbX4DdWNQaFC8s9ro5mttySA"
                  />
                </div>
                <div className="font-mono">
                  <span className="text-[10px] text-[#737373]">ID: CN-0984</span>
                  <h4 className="text-lg text-white font-bold uppercase">Cipher Null</h4>
                  <div className="flex justify-between text-[11px] text-[#737373] mt-2 pt-2 border-t border-[#1f1f1f]">
                    <span>CLEARANCE: LEVEL 9</span>
                    <span className="text-[#10B981]">GRANTED</span>
                  </div>
                </div>
              </div>

              {/* Member 2 */}
              <div className="p-6 border border-[#1f1f1f] bg-[#121212] rounded-lg flex flex-col justify-between">
                <div className="w-full aspect-square mb-6 border border-[#1f1f1f] overflow-hidden grayscale contrast-125 brightness-90 rounded">
                  <img
                    className="w-full h-full object-cover mix-blend-luminosity"
                    alt="Echo Vector"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHnJ7VHVcCKyyFST6_7_oJdoL9OzIGosWnBXZk44nXQLbXRflZntjduZmeFXsK4VN3v3EbTZPeqk5ZqM_YwalCqAzkebHnKbs-B0OUit07ofVAH8xzsZaz8MddciK9QKT2NJ0bU7mkPAIGTkPVlwGkmNi8_kJAx38P1ULvV-V9zdRtuv6jFS9OedebzZHDAZJp_zeWjjBXM7B3R50LPRHJaJChkz2foWstuzh5P2oa57yDk8OQVTLA6Q"
                  />
                </div>
                <div className="font-mono">
                  <span className="text-[10px] text-[#737373]">ID: EV-0721</span>
                  <h4 className="text-lg text-white font-bold uppercase">Echo Vector</h4>
                  <div className="flex justify-between text-[11px] text-[#737373] mt-2 pt-2 border-t border-[#1f1f1f]">
                    <span>CLEARANCE: LEVEL 7</span>
                    <span className="text-[#10B981]">GRANTED</span>
                  </div>
                </div>
              </div>

              {/* Member 3 */}
              <div className="p-6 border border-[#1f1f1f] bg-[#121212] rounded-lg flex flex-col justify-between">
                <div className="w-full aspect-square mb-6 border border-[#1f1f1f] overflow-hidden grayscale contrast-125 brightness-90 rounded">
                  <img
                    className="w-full h-full object-cover mix-blend-luminosity"
                    alt="Proxy Prime"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYrtAuky8QsutrWs6xjd-c6RGPeINAVvfQchw7bbYWYl1bJ-xyKtdyYyx5Einai_05AuJkliDweFHqSLsLj4mX4dxbO3gEFHe0X_LiNNJhqIrrVHxAYlp7c_1_k_WOf6OP4EPcJVwjMG-K4KT6RJpyd2J7muMxtbq58vDL1AMfvTMq8lxyff9lo6_jI4EHSlK8Fi2WWNPkNRNbklCK-kmXROm_fRTbtWgcJrcC8ZcJNE8ialNMeMhB2Q"
                  />
                </div>
                <div className="font-mono">
                  <span className="text-[10px] text-[#737373]">ID: PP-0899</span>
                  <h4 className="text-lg text-white font-bold uppercase">Proxy Prime</h4>
                  <div className="flex justify-between text-[11px] text-[#737373] mt-2 pt-2 border-t border-[#1f1f1f]">
                    <span>CLEARANCE: LEVEL 8</span>
                    <span className="text-[#10B981]">GRANTED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
