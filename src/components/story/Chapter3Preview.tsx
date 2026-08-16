import React from 'react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { RadarSweepCanvas } from '../visualizations/RadarSweepCanvas';
import { SpectralWaterfallCanvas } from '../visualizations/SpectralWaterfallCanvas';

export const Chapter3Preview: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const history = useThreatStore((s) => s.history);

  const isCritical = currentState === 'THREAT_LOGGED';

  return (
    <section id="chapter-3" className="relative w-full min-h-screen py-24 px-8 md:px-16 bg-[#0A0A0B] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs text-[#8A8D91] uppercase tracking-widest">
            02 / LIVE TELEMETRY
          </span>
          <h2 className="font-display text-[54px] sm:text-[96px] leading-[0.95] text-[#F5F5F5] font-extrabold uppercase">
            OBSERVE THE INVISIBLE
          </h2>
          <div className="h-[1px] w-full bg-[#1A1A1A]" />
          <p className="font-mono text-xs text-[#8A8D91] max-w-2xl leading-relaxed">
            Sample telemetry from the sensor array. Live backend adapters replace this data stream without changing the visualization layer.
          </p>
        </div>

        {/* 4 Bento Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Panel 1: Waveform */}
          <div className="bg-[#0e0e0f] border border-[#1A1A1A] rounded-card p-4 flex flex-col justify-between min-h-[260px]">
            <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A] font-mono text-xs">
              <span className="text-[#8A8D91] uppercase">CHANNEL / WAVEFORM</span>
              <div className="flex items-center gap-2 border border-[#E83939] px-2 py-0.5 bg-[#E83939]/10 rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E83939] animate-pulse" />
                <span className="text-[#E83939] font-bold text-[10px]">LIVE</span>
              </div>
            </div>
            <div className="my-4 flex-1 flex items-center justify-center relative">
              <svg className="w-full h-24" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="#F0A030" strokeWidth="1.5" opacity="0.8" />
                <path d="M0,50 Q10,80 30,30 T60,70 T100,50" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
                <path d="M0,50 Q40,0 50,90 T80,10 T100,50" fill="none" stroke="#E83939" strokeWidth="2.5" />
              </svg>
            </div>
            <div className="flex justify-between font-mono text-[10px] text-[#8A8D91]">
              <span>FREQ: 14.2kHz</span>
              <span>AMP: -12dB</span>
            </div>
          </div>

          {/* Panel 2: Spectrum 16-24kHz */}
          <div className="bg-[#0e0e0f] border border-[#1A1A1A] rounded-card p-4 flex flex-col justify-between min-h-[260px]">
            <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A] font-mono text-xs">
              <span className="text-[#8A8D91] uppercase">SPECTRUM / 16-24kHz</span>
              <div className="flex items-center gap-1 border border-[#E83939] px-2 py-0.5 bg-[#E83939]/10 rounded-sm">
                <span className="material-symbols-outlined text-[12px] text-[#E83939]">warning</span>
                <span className="text-[#E83939] font-bold text-[10px]">THREAT LOCK</span>
              </div>
            </div>
            <div className="my-4 flex items-end justify-between gap-1 h-32 pt-4">
              {[12, 18, 10, 15, 25, 20, 12, 45, 95, 35, 15, 22, 10, 14, 8, 12].map((val, idx) => (
                <div
                  key={idx}
                  style={{ height: `${val}%` }}
                  className={`w-full ${
                    val > 80
                      ? 'bg-[#E83939] shadow-[0_0_12px_#E83939]'
                      : val > 30
                      ? 'bg-[#F0A030]'
                      : 'bg-[#242728]'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between font-mono text-[10px] text-[#8A8D91] border-t border-[#1A1A1A] pt-2">
              <span>16k</span>
              <span>20k</span>
              <span>24k</span>
            </div>
          </div>

          {/* Panel 3: Sensor Topology */}
          <div className="bg-[#0e0e0f] border border-[#1A1A1A] rounded-card p-4 flex flex-col justify-between min-h-[260px]">
            <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A] font-mono text-xs">
              <span className="text-[#8A8D91] uppercase">SENSOR TOPOLOGY</span>
              <span className="text-[#F5F5F5] font-bold text-[10px]">ONLINE: 24/24</span>
            </div>
            <div className="py-2 flex items-center justify-center">
              <RadarSweepCanvas size={180} />
            </div>
          </div>

          {/* Panel 4: Live Event Stream */}
          <div className="bg-[#0e0e0f] border border-[#1A1A1A] rounded-card p-4 flex flex-col justify-between min-h-[260px]">
            <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A] font-mono text-xs">
              <span className="text-[#8A8D91] uppercase">LIVE EVENT STREAM</span>
              <span className="material-symbols-outlined text-[16px] text-[#8A8D91]">list</span>
            </div>
            <div className="font-mono text-[11px] space-y-2 py-2 text-[#8A8D91]">
              <div className="flex justify-between border-b border-[#1A1A1A] pb-1">
                <span>[14:02:11.004]</span>
                <span className="text-[#F5F5F5]">SYS.CHK: Array status nominal</span>
              </div>
              <div className="flex justify-between border-b border-[#1A1A1A] pb-1">
                <span>[14:02:24.105]</span>
                <span className="text-[#F0A030]">SIG.DET: Low-frequency anomaly</span>
              </div>
              <div className="flex justify-between border-b border-[#1A1A1A] pb-1 bg-[#E83939]/10 p-1 text-[#E83939] font-bold border-l-2 border-[#E83939]">
                <span>[14:02:28.440]</span>
                <span>CRITICAL: Acoustic signature match</span>
              </div>
              <div className="flex justify-between border-b border-[#1A1A1A] pb-1">
                <span>[14:02:29.100]</span>
                <span className="text-[#F0A030]">TRK.INIT: Tracking vector established</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center mt-6">
          <button className="px-8 py-4 border border-[#8A8D91] hover:border-[#F5F5F5] text-[#8A8D91] hover:text-[#0A0A0B] hover:bg-[#F5F5F5] transition-all duration-300 font-mono text-xs tracking-widest uppercase cursor-pointer">
            &gt; INITIATE DEEP CLASSIFICATION
          </button>
        </div>
      </div>
    </section>
  );
};
