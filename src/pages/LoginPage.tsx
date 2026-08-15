import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('analyst@acousticshield.soc');
  const [password, setPassword] = useState('••••••••••••');
  const loginMock = useThreatStore((s) => s.loginMock);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMock(email);
    navigate('/monitoring');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-margin-page w-full max-w-md mx-auto relative z-20">
      <div className="w-full glass-panel rounded-xl p-card-padding border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 p-2.5 mx-auto text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              security
            </span>
          </div>
          <h1 className="text-xl font-bold font-sans tracking-wider text-white uppercase mt-3">
            Acoustic Shield SOC Auth
          </h1>
          <p className="font-mono text-xs text-[#c4c7c8]">
            Security Operations Center Terminal Access
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
          <div>
            <label className="text-[#c4c7c8] block mb-1 uppercase text-[10px] tracking-wider">
              Analyst Identity (Email)
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0e0e0e] border border-[#444748] rounded p-3 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <div>
            <label className="text-[#c4c7c8] block mb-1 uppercase text-[10px] tracking-wider">
              Security Clearance Token
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0e0e0e] border border-[#444748] rounded p-3 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-[#0e0e0e] font-mono text-xs py-3.5 px-4 rounded font-bold uppercase tracking-widest hover:bg-white/90 transition-colors cursor-pointer flex items-center justify-center gap-2 mt-6 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            <span>AUTHENTICATE &amp; ENTER TERMINAL</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-[10px] font-mono text-[#c4c7c8] text-center">
          <span className="text-[#10b981] flex items-center justify-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px]">check_circle</span> DEMO ACCESS ENABLED // AUTO AUTH READY
          </span>
        </div>
      </div>
    </div>
  );
};
