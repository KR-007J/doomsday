import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UltrasonicShader } from '../components/visualizations/UltrasonicShader';
import { AcousticVideoPlayer } from '../components/visualizations/AcousticVideoPlayer';

export const IntroPage: React.FC = () => {
  const [uptimeSec, setUptimeSec] = useState(0);

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

  return (
    <div className="relative min-h-screen bg-[#141313] text-[#e5e2e1] flex flex-col font-sans overflow-x-hidden selection:bg-[#3ecf8e]/30 selection:text-[#3ecf8e]">
      {/* Background WebGL Soundwave Shader */}
      <UltrasonicShader />

      {/* Noise / CRT Scanline Overlay */}
      <div className="fixed inset-0 scanline pointer-events-none z-10 opacity-30" />

      {/* Main Container */}
      <main className="relative z-20 flex flex-col min-h-screen">
        {/* Top HUD */}
        <header className="w-full flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-[40px]">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase text-[#c4c7c8] tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3ecf8e] animate-pulse shadow-[0_0_8px_#3ecf8e]" />
              <span className="text-[#3ecf8e] font-bold">LIVE</span>
            </div>
            <span>//</span>
            <span>ENCRYPTED CHANNEL: ACTIVE</span>
          </div>
          <div className="font-mono text-[10px] uppercase text-[#c4c7c8] tracking-widest font-bold">
            {formatUptime(uptimeSec)}
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-margin-page text-center pt-16 pb-8">
          <div className="max-w-4xl flex flex-col items-center animate-slide-up-blur">
            <div className="font-mono text-[10px] text-[#c4c7c8] tracking-[0.2em] uppercase mb-4 border border-white/10 px-4 py-1 bg-black/40 backdrop-blur-[40px]">
              PRO-EDITION v4.0
            </div>

            <h1 className="font-display-lg-mobile md:font-display-lg text-[#F5F5F5] tracking-tighter uppercase mb-3 font-bold">
              Acoustic Shield
            </h1>

            <h2 className="font-mono text-sm md:text-base text-[#3ecf8e] tracking-widest uppercase mb-6">
              Unveiling The Unheard
            </h2>

            <p className="font-mono text-xs md:text-sm text-[#c4c7c8] max-w-2xl mx-auto uppercase tracking-widest border border-white/10 bg-[#141313]/60 backdrop-blur-md px-6 py-3 rounded mb-8">
              <span className="text-[#3ecf8e] animate-pulse mr-2">●</span> Operational Status: Vigilance Active // System Alpha
            </p>

            <Link to="/login">
              <button className="group relative bg-black/60 backdrop-blur-[40px] text-white border border-white/20 font-mono text-sm uppercase tracking-[0.2em] px-10 py-5 hover:bg-white/10 hover:border-white/40 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer">
                <span className="absolute top-1 right-2 text-[8px] text-[#c4c7c8] opacity-50 group-hover:opacity-100 transition-opacity">0x7F</span>
                <span className="relative z-10 flex items-center gap-3 font-bold">
                  INITIALIZE TERMINAL
                  <span className="material-symbols-outlined text-[18px]">terminal</span>
                </span>
              </button>
            </Link>
          </div>
        </section>

        {/* Feature Introduction Video & Acoustic Soundwave Simulator Section */}
        <section className="w-full px-margin-page relative z-20">
          <AcousticVideoPlayer />
        </section>

        {/* Team Section */}
        <section className="w-full max-w-[1400px] mx-auto px-margin-page pb-24 relative z-20">
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
            <span className="material-symbols-outlined text-[#3ecf8e]">group</span>
            <h3 className="font-headline-md text-headline-md text-white uppercase tracking-tight font-bold">
              The Acoustic Team
            </h3>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent ml-4" />
          </div>

          {/* Bento Grid for Team */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-white/10 bg-black/40 backdrop-blur-[40px] relative overflow-hidden rounded-lg p-6">
            {/* Team Member 1 */}
            <div className="relative p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 group rounded-lg overflow-hidden flex flex-col justify-between">
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-full aspect-square mb-6 border border-white/10 overflow-hidden grayscale contrast-125 brightness-90 relative rounded">
                  <img
                    className="w-full h-full object-cover mix-blend-luminosity opacity-90 group-hover:scale-105 transition-transform duration-500"
                    alt="Cipher Null"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcDIwpDnzQOJs-uM8zDIGklRpOarwxknuT__HlIB-89enaJrUU4s6LYwHxXxhf7FFpif7xmqTCPqV-ZIruyjhRaF1pn0_tYBnaAY86BOg_AJdHwcq4V9_7ZrYfn_ri3l10v00e6i6XX18lHXuqsIvN--efZjTTy4h79btoNha-c26WQ8HqbToZZ-AErqI3kCiUzgTbk7byyFLKqSqVlrmsVWW9R-Vuq8MbX4DdWNQaFC8s9ro5mttySA"
                  />
                  <div className="absolute inset-0 border border-white/10 m-2 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 font-mono text-[8px] text-white/50">REC.01</div>
                </div>
                <div className="flex flex-col flex-grow font-mono">
                  <div className="text-[10px] text-[#c4c7c8] mb-1 tracking-widest uppercase">ID: CN-0984</div>
                  <h4 className="text-lg text-white mb-1 uppercase tracking-tight font-bold">Cipher Null</h4>
                  <div className="w-full space-y-1 mt-auto pt-4 border-t border-white/10 text-[11px]">
                    <div className="flex justify-between items-center text-[#c4c7c8]">
                      <span className="uppercase">Clearance:</span>
                      <span className="text-white font-bold">Level 9</span>
                    </div>
                    <div className="flex justify-between items-center text-[#c4c7c8]">
                      <span className="uppercase">Biometric:</span>
                      <span className="text-[#3ecf8e] font-bold">MATCHED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="relative p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 group rounded-lg overflow-hidden flex flex-col justify-between">
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-full aspect-square mb-6 border border-white/10 overflow-hidden grayscale contrast-125 brightness-90 relative rounded">
                  <img
                    className="w-full h-full object-cover mix-blend-luminosity opacity-90 group-hover:scale-105 transition-transform duration-500"
                    alt="Echo Vector"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHnJ7VHVcCKyyFST6_7_oJdoL9OzIGosWnBXZk44nXQLbXRflZntjduZmeFXsK4VN3v3EbTZPeqk5ZqM_YwalCqAzkebHnKbs-B0OUit07ofVAH8xzsZaz8MddciK9QKT2NJ0bU7mkPAIGTkPVlwGkmNi8_kJAx38P1ULvV-V9zdRtuv6jFS9OedebzZHDAZJp_zeWjjBXM7B3R50LPRHJaJChkz2foWstuzh5P2oa57yDk8OQVTLA6Q"
                  />
                  <div className="absolute inset-0 border border-white/10 m-2 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 font-mono text-[8px] text-white/50">REC.02</div>
                </div>
                <div className="flex flex-col flex-grow font-mono">
                  <div className="text-[10px] text-[#c4c7c8] mb-1 tracking-widest uppercase">ID: EV-0721</div>
                  <h4 className="text-lg text-white mb-1 uppercase tracking-tight font-bold">Echo Vector</h4>
                  <div className="w-full space-y-1 mt-auto pt-4 border-t border-white/10 text-[11px]">
                    <div className="flex justify-between items-center text-[#c4c7c8]">
                      <span className="uppercase">Clearance:</span>
                      <span className="text-white font-bold">Level 7</span>
                    </div>
                    <div className="flex justify-between items-center text-[#c4c7c8]">
                      <span className="uppercase">Biometric:</span>
                      <span className="text-[#3ecf8e] font-bold">MATCHED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="relative p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 group rounded-lg overflow-hidden flex flex-col justify-between">
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-full aspect-square mb-6 border border-white/10 overflow-hidden grayscale contrast-125 brightness-90 relative rounded">
                  <img
                    className="w-full h-full object-cover mix-blend-luminosity opacity-90 group-hover:scale-105 transition-transform duration-500"
                    alt="Proxy Prime"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYrtAuky8QsutrWs6xjd-c6RGPeINAVvfQchw7bbYWYl1bJ-xyKtdyYyx5Einai_05AuJkliDweFHqSLsLj4mX4dxbO3gEFHe0X_LiNNJhqIrrVHxAYlp7c_1_k_WOf6OP4EPcJVwjMG-K4KT6RJpyd2J7muMxtbq58vDL1AMfvTMq8lxyff9lo6_jI4EHSlK8Fi2WWNPkNRNbklCK-kmXROm_fRTbtWgcJrcC8ZcJNE8ialNMeMhB2Q"
                  />
                  <div className="absolute inset-0 border border-white/10 m-2 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 font-mono text-[8px] text-white/50">REC.03</div>
                </div>
                <div className="flex flex-col flex-grow font-mono">
                  <div className="text-[10px] text-[#c4c7c8] mb-1 tracking-widest uppercase">ID: PP-0899</div>
                  <h4 className="text-lg text-white mb-1 uppercase tracking-tight font-bold">Proxy Prime</h4>
                  <div className="w-full space-y-1 mt-auto pt-4 border-t border-white/10 text-[11px]">
                    <div className="flex justify-between items-center text-[#c4c7c8]">
                      <span className="uppercase">Clearance:</span>
                      <span className="text-white font-bold">Level 8</span>
                    </div>
                    <div className="flex justify-between items-center text-[#c4c7c8]">
                      <span className="uppercase">Biometric:</span>
                      <span className="text-[#3ecf8e] font-bold">MATCHED</span>
                    </div>
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
