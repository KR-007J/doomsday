import React from 'react';
import { motion } from 'framer-motion';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';

export const Chapter4Classification: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const isCritical = currentState === 'THREAT_LOGGED';

  return (
    <section id="chapter-4" className="relative w-full min-h-screen py-24 px-8 md:px-16 bg-[#0A0A0B] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#1A1A1A] pb-8">
          <div className="lg:col-span-8">
            <h2 className="font-display text-[54px] sm:text-[96px] leading-[0.9] text-[#F5F5F5] font-extrabold uppercase">
              NOISE HAS A <br />
              <span className="text-[#8A8D91]">SIGNATURE</span>
            </h2>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end text-left lg:text-right">
            <p className="font-sans text-sm text-[#8A8D91] leading-relaxed">
              Patterns are continuously analyzed against known threat vectors. The system categorizes telemetry in real-time, executing automated protocols based on the classification outcome.
            </p>
          </div>
        </div>

        {/* 3 Column Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Safe/Nominal */}
          <div className="bg-[#0e0e0f] border border-[#1A1A1A] rounded-card p-6 flex flex-col justify-between hover:border-[#333333] transition-colors">
            <div>
              <div className="flex justify-between items-center mb-6 font-mono text-xs">
                <div>
                  <span className="text-[#8A8D91] text-[10px] block">SIG_ID: NOM-092A</span>
                  <h3 className="font-bold text-[#F5F5F5] uppercase tracking-wider">Safe/Nominal</h3>
                </div>
                <span className="material-symbols-outlined text-[#8A8D91]">verified</span>
              </div>
              {/* Waveform graphic */}
              <div className="h-24 w-full my-4 border-y border-[#1A1A1A] flex items-center justify-center">
                <svg className="w-full h-8" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q5,10 10,10 T20,10 T30,10 T40,8 T45,12 T50,5 T55,15 T60,10 T70,10 T80,10 T90,10 T100,10" fill="none" stroke="#F5F5F5" strokeWidth="0.8" opacity="0.6" />
                </svg>
              </div>
              <p className="font-sans text-xs text-[#8A8D91] leading-relaxed mb-6">
                Baseline ambient noise floor. Acoustic characteristics fall within expected environmental parameters. No anomalies detected in current frequency spectrum.
              </p>
            </div>
            <div className="pt-4 border-t border-[#1A1A1A] flex justify-between items-center font-mono text-xs">
              <span className="text-[#8A8D91] text-[10px] border border-[#1A1A1A] px-2 py-0.5">ACT_RATING: 0.1</span>
              <span className="text-[#F5F5F5] font-bold">MONITOR</span>
            </div>
          </div>

          {/* Card 2: Anomaly */}
          <div className="bg-[#0e0e0f] border border-[#F0A030]/40 rounded-card p-6 flex flex-col justify-between hover:border-[#F0A030] transition-colors">
            <div>
              <div className="flex justify-between items-center mb-6 font-mono text-xs">
                <div>
                  <span className="text-[#F0A030] text-[10px] block">SIG_ID: UNK-441X</span>
                  <h3 className="font-bold text-[#F0A030] uppercase tracking-wider">Anomaly Detected</h3>
                </div>
                <span className="material-symbols-outlined text-[#F0A030]">warning</span>
              </div>
              {/* Waveform graphic */}
              <div className="h-24 w-full my-4 border-y border-[#1A1A1A] flex items-center justify-center">
                <svg className="w-full h-12" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path d="M0,15 Q5,15 10,12 T20,18 T25,5 T30,25 T35,8 T40,22 T50,15 T60,10 T70,20 T80,15 T90,15 T100,15" fill="none" stroke="#F0A030" strokeWidth="1.5" />
                </svg>
              </div>
              <p className="font-sans text-xs text-[#8A8D91] leading-relaxed mb-6">
                Uncertain signature matching partial criteria for mechanical intrusion. Frequency spikes observed outside nominal baseline variance. Secondary analysis required.
              </p>
            </div>
            <div className="pt-4 border-t border-[#1A1A1A] flex justify-between items-center font-mono text-xs">
              <span className="text-[#F0A030] text-[10px] border border-[#F0A030]/50 px-2 py-0.5 bg-[#F0A030]/10">ACT_RATING: 6.8</span>
              <button className="text-[#F0A030] font-bold border border-[#F0A030] px-3 py-1 hover:bg-[#F0A030] hover:text-[#0A0A0B] transition-colors cursor-pointer">
                VALIDATE
              </button>
            </div>
          </div>

          {/* Card 3: Threat (Emphasized with --story-red when active) */}
          <div className={`bg-[#0e0e0f] rounded-card p-6 flex flex-col justify-between transition-colors ${
            isCritical
              ? 'border-2 border-[#E83939] shadow-[0_0_30px_rgba(232,57,57,0.2)] bg-[#E83939]/5'
              : 'border border-[#E83939]/40 hover:border-[#E83939]'
          }`}>
            <div>
              <div className="flex justify-between items-center mb-6 font-mono text-xs">
                <div>
                  <span className="text-[#E83939] text-[10px] block font-bold">SIG_ID: CRT-990Z</span>
                  <h3 className="font-bold text-[#E83939] uppercase tracking-wider">Threat Confirmed</h3>
                </div>
                <span className="material-symbols-outlined text-[#E83939]">error</span>
              </div>
              {/* Waveform graphic */}
              <div className="h-24 w-full my-4 border-y border-[#E83939]/30 flex items-center justify-center">
                <svg className="w-full h-16" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path d="M0,20 L5,20 L8,5 L12,35 L15,10 L18,30 L22,2 L28,38 L32,15 L35,25 L40,0 L45,40 L50,10 L55,30 L60,5 L65,35 L70,15 L75,25 L80,5 L85,35 L90,15 L95,20 L100,20" fill="none" stroke="#E83939" strokeWidth="1.5" />
                </svg>
              </div>
              <p className="font-sans text-xs text-[#8A8D91] leading-relaxed mb-6">
                Confirmed acoustic exfiltration signature. Profile matches classified drone telemetry or physical perimeter breach. Immediate automated containment protocols advised.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E83939]/30 flex justify-between items-center font-mono text-xs">
              <span className="text-[#E83939] text-[10px] border border-[#E83939] px-2 py-0.5 bg-[#E83939]/10 font-bold">ACT_RATING: 9.9</span>
              <button className="bg-[#E83939] text-white font-bold px-4 py-1.5 hover:bg-white hover:text-[#E83939] transition-colors cursor-pointer uppercase">
                LOG &amp; CONTAIN
              </button>
            </div>
          </div>
        </div>

        {/* Mandatory Honest Disclaimer Text */}
        <div className="mt-8 text-right">
          <p className="font-mono text-[10px] text-[#8A8D91] uppercase tracking-wider max-w-lg ml-auto">
            Simulation data only — classifications demonstrate the interface flow and do not represent live defensive actions.
          </p>
        </div>
      </div>
    </section>
  );
};
