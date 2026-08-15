import React, { useState, useEffect, useRef } from 'react';

export const AcousticVideoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'spectrum' | 'audio'>('video');
  const [isMuted, setIsMuted] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Audio tone generator demo for ultrasonic frequency simulation
  const toggleAudio = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
      } catch (err) {
        console.error('AudioContext error:', err);
      }
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    function renderWaveform() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw multi-layered acoustic soundwave
      const numWaves = 4;
      const colors = ['#3ecf8e', '#10b981', '#3b82f6', '#8b5cf6'];

      for (let i = 0; i < numWaves; i++) {
        ctx.beginPath();
        ctx.strokeStyle = colors[i];
        ctx.lineWidth = i === 0 ? 2.5 : 1.5;

        for (let x = 0; x < w; x += 2) {
          const freq = 0.01 + i * 0.005;
          const amp = isPlaying ? 35 + i * 12 : 12 + i * 4;
          const speed = phase * (1 + i * 0.4);
          const y = h / 2 + Math.sin(x * freq + speed) * Math.cos(x * 0.003 + phase * 0.5) * amp;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Ultrasonic High-Frequency Pulse overlay
      if (isPlaying) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x < w; x += 4) {
          const y = h / 2 + (Math.random() - 0.5) * 45;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      phase += 0.04;
      animId = requestAnimationFrame(renderWaveform);
    }

    animId = requestAnimationFrame(renderWaveform);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  return (
    <div className="w-full max-w-5xl mx-auto my-12 border border-white/10 bg-black/60 backdrop-blur-[40px] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
      {/* Video Container Header HUD */}
      <div className="px-6 py-3 border-b border-white/10 bg-black/80 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-[#c4c7c8]">
          <span className="material-symbols-outlined text-[#3ecf8e] text-[18px]">movie</span>
          <span className="text-white font-bold">Introduction Video &amp; Soundwave Simulator</span>
          <span className="text-white/40">//</span>
          <span className="text-[#3ecf8e] text-[10px]">VIDEO_ID: VID_ACST_2026_v4</span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <button
            onClick={() => setActiveTab('video')}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === 'video' ? 'bg-white/20 text-white font-bold' : 'text-[#c4c7c8] hover:text-white'
            }`}
          >
            Explainer Video
          </button>
          <button
            onClick={() => setActiveTab('spectrum')}
            className={`px-3 py-1 rounded transition-colors ${
              activeTab === 'spectrum' ? 'bg-white/20 text-white font-bold' : 'text-[#c4c7c8] hover:text-white'
            }`}
          >
            Live Soundwave
          </button>
        </div>
      </div>

      {/* Main Video & Canvas Player Stage */}
      <div className="relative aspect-video w-full bg-[#0a0a0c] overflow-hidden flex items-center justify-center group">
        {/* Animated Waveform Canvas Background */}
        <canvas
          ref={canvasRef}
          width={960}
          height={540}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        {/* CRT Scanline Overlay */}
        <div className="scanline absolute inset-0 pointer-events-none opacity-40" />

        {/* Video HUD Overlays */}
        <div className="absolute top-4 left-4 font-mono text-[10px] text-white/70 bg-black/60 px-3 py-1.5 rounded border border-white/10 flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-[#3ecf8e] animate-ping' : 'bg-amber-400'}`} />
          <span>{isPlaying ? 'PLAYING: ULTRASONIC SIGNAL SIMULATION' : 'PAUSED: READY FOR TRANSMISSION'}</span>
        </div>

        <div className="absolute top-4 right-4 font-mono text-[10px] text-white/70 bg-black/60 px-3 py-1.5 rounded border border-white/10">
          BANDWIDTH: 16.0 kHz - 24.0 kHz
        </div>

        {/* Big Center Play / Pause Button Overlay */}
        <div className="relative z-20 flex flex-col items-center">
          <button
            onClick={toggleAudio}
            className="w-20 h-20 rounded-full bg-black/60 border-2 border-[#3ecf8e] text-[#3ecf8e] hover:bg-[#3ecf8e] hover:text-black transition-all duration-300 flex items-center justify-center shadow-[0_0_30px_rgba(62,207,142,0.4)] cursor-pointer group-hover:scale-110"
          >
            <span className="material-symbols-outlined text-4xl">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <span className="font-mono text-xs text-white uppercase tracking-widest mt-4 bg-black/60 px-4 py-1.5 rounded border border-white/10 font-bold">
            {isPlaying ? 'Pause Acoustic Simulation' : 'Play Introduction Soundwave Video'}
          </span>
        </div>

        {/* Bottom Timeline Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between font-mono text-[11px] text-[#c4c7c8] z-20">
          <div className="flex items-center gap-3">
            <button onClick={toggleAudio} className="hover:text-white cursor-pointer">
              <span className="material-symbols-outlined text-lg">{isPlaying ? 'pause' : 'play_arrow'}</span>
            </button>
            <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white cursor-pointer">
              <span className="material-symbols-outlined text-lg">{isMuted ? 'volume_off' : 'volume_up'}</span>
            </button>
            <span>00:14 / 02:45</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#3ecf8e] font-bold">AUDIO FREQ: 20.450 kHz</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[9px] uppercase">4K ULTRA HD</span>
          </div>
        </div>
      </div>

      {/* Explainer Pillar Details below video player */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 border-t border-white/10 bg-black/40">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#3ecf8e] font-mono text-xs font-bold uppercase">
            <span className="material-symbols-outlined text-[16px]">graphic_eq</span>
            1. Ultrasonic Beacon Detection
          </div>
          <p className="text-xs text-[#c4c7c8] leading-relaxed">
            Captures covert high-frequency acoustic micro-pulses (16kHz–24kHz) emitted by compromised device fans or coils.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#3ecf8e] font-mono text-xs font-bold uppercase">
            <span className="material-symbols-outlined text-[16px]">cell_tower</span>
            2. FSK Sub-Carrier Demodulation
          </div>
          <p className="text-xs text-[#c4c7c8] leading-relaxed">
            Decodes frequency-shift keying payloads encoded within acoustic side-channel transmissions.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#3ecf8e] font-mono text-xs font-bold uppercase">
            <span className="material-symbols-outlined text-[16px]">shield</span>
            3. Air-Gap Isolation Defense
          </div>
          <p className="text-xs text-[#c4c7c8] leading-relaxed">
            Instantly isolates rogue frequencies and logs forensic signatures into the SOC threat engine.
          </p>
        </div>
      </div>
    </div>
  );
};
