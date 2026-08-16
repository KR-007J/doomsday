import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('analyst@silentdog.defense');
  const [password, setPassword] = useState('••••••••••••');
  const loginMock = useThreatStore((s) => s.loginMock);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMock(email);
    navigate('/monitoring');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-margin-page w-full max-w-md mx-auto relative z-20 font-mono">
      <div className="w-full bg-[#0a0a0a] rounded-lg p-card-padding border border-[#1f1f1f] shadow-2xl">
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded bg-[#121212] border border-[#262626] p-2.5 mx-auto text-[#EF4444] flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              security
            </span>
          </div>
          <h1 className="text-lg font-bold tracking-wider text-white uppercase mt-3">
            THE SILENT DOG COMMAND CENTER
          </h1>
          <p className="text-xs text-[#737373] uppercase tracking-wider">
            Signal Intelligence Authentication Terminal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="text-[#A3A3A3] block mb-1 uppercase text-[10px] tracking-wider">
              Operator Identity (Email)
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#121212] border border-[#262626] rounded p-3 text-white focus:outline-none focus:border-[#EF4444] transition-colors"
            />
          </div>

          <div>
            <label className="text-[#A3A3A3] block mb-1 uppercase text-[10px] tracking-wider">
              Security Token
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#121212] border border-[#262626] rounded p-3 text-white focus:outline-none focus:border-[#EF4444] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#EF4444] text-white text-xs py-3.5 px-4 rounded font-bold uppercase tracking-widest hover:bg-[#DC2626] transition-colors cursor-pointer flex items-center justify-center gap-2 mt-6 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          >
            <span>ENTER COMMAND CENTER</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#1f1f1f] text-[10px] text-[#737373] text-center">
          <span className="text-[#10B981] flex items-center justify-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px]">check_circle</span> DEMO ACCESS ENABLED // AUTO AUTH READY
          </span>
        </div>
      </div>
    </div>
  );
};
