import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 max-w-md mx-auto">
      <Card variant="glow" className="p-6 w-full border-cyan-500/40">
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 p-2.5 mx-auto text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-950/50">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-bold font-sans tracking-wider text-slate-100 uppercase">
            ACOUSTIC<span className="text-cyan-400">SHIELD</span> SOC AUTH
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Security Analyst Operations Authentication Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
          <div>
            <label className="text-slate-300 block mb-1">ANALYST IDENTITY (EMAIL)</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1">SECURITY TOKEN / PASSWORD</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            className="w-full"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            AUTHENTICATE & ENTER SOC
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400 text-center">
          <span className="text-emerald-400 flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> DEMO BYPASS FLAG ACTIVE (VITE_DEMO_BYPASS_AUTH=true)
          </span>
        </div>
      </Card>
    </div>
  );
};
