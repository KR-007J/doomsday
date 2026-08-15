import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ThreatStateType } from '../types/threat';
import { useThreatStore } from '../features/threat-state-machine/useThreatStore';
import { THREAT_STATE_CONFIGS } from '../features/threat-state-machine/stateMachine';
import { Sliders, Cpu, RotateCcw, Zap, Play, CheckCircle2 } from 'lucide-react';

export const DevStateMachinePage: React.FC = () => {
  const currentState = useThreatStore((s) => s.currentState);
  const confidence = useThreatStore((s) => s.confidence);
  const activeCenter = useThreatStore((s) => s.activeFrequencyCenter);
  const safeDemoMode = useThreatStore((s) => s.safeDemoMode);
  
  const setThreatState = useThreatStore((s) => s.setThreatState);
  const stepNextState = useThreatStore((s) => s.stepNextState);
  const resetToSafe = useThreatStore((s) => s.resetToSafe);
  const toggleSafeDemoMode = useThreatStore((s) => s.toggleSafeDemoMode);
  const triggerSimulatedAttack = useThreatStore((s) => s.triggerSimulatedAttack);

  const states: ThreatStateType[] = [
    'SAFE',
    'SIGNAL_DETECTED',
    'ANALYZING',
    'POTENTIAL_COVERT_COMMUNICATION',
    'THREAT_LOGGED',
  ];

  return (
    <div className="min-h-screen py-6 px-4 sm:px-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div>
          <h1 className="text-xl font-bold font-sans tracking-tight text-slate-100 uppercase flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            DEV THREAT STATE MACHINE CONTROLLER
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Manual override panel for live presentation demos & state transition validation
          </p>
        </div>

        <Button variant="secondary" size="sm" onClick={resetToSafe} icon={<RotateCcw className="w-4 h-4" />}>
          RESET TO SAFE
        </Button>
      </div>

      {/* Current Active State Display */}
      <Card variant="glow" className="p-6 border-cyan-500/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
          <div>
            <span className="text-xs text-slate-400">CURRENT ACTIVE STATE</span>
            <div
              className="text-2xl font-bold uppercase mt-1"
              style={{ color: THREAT_STATE_CONFIGS[currentState].colorHex }}
            >
              {THREAT_STATE_CONFIGS[currentState].label}
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-lg">
              {THREAT_STATE_CONFIGS[currentState].subText}
            </p>
          </div>

          <div className="flex items-center gap-4 text-right">
            <div>
              <span className="text-xs text-slate-400">CONFIDENCE</span>
              <div className="text-2xl font-bold text-slate-100">{confidence}%</div>
            </div>
            <div>
              <span className="text-xs text-slate-400">PEAK FREQ</span>
              <div className="text-2xl font-bold text-cyan-400">{(activeCenter / 1000).toFixed(2)} kHz</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Manual State Jumper Buttons */}
      <Card variant="glass" className="p-5">
        <h3 className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wider mb-4">
          SELECT TARGET STATE TO FORCE JUMP
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {states.map((st) => {
            const config = THREAT_STATE_CONFIGS[st];
            const isActive = currentState === st;
            return (
              <button
                key={st}
                onClick={() => setThreatState(st)}
                className={`p-3 rounded-xl border text-left font-mono transition-all duration-300 ${
                  isActive
                    ? 'bg-slate-900 border-2 shadow-lg scale-105'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
                style={{
                  borderColor: isActive ? config.colorHex : undefined,
                }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full mb-2"
                  style={{ backgroundColor: config.colorHex }}
                />
                <div className="text-xs font-bold text-slate-200 mb-1 leading-tight">
                  {config.label}
                </div>
                <span className="text-[10px] text-slate-400 block">
                  Risk: {config.risk}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <Button variant="primary" onClick={stepNextState} icon={<Play className="w-4 h-4" />}>
            STEP NEXT STATE SEQUENCE
          </Button>

          <Button
            variant="glow"
            onClick={() => triggerSimulatedAttack({ frequencyMin: 20000, frequencyMax: 22000, duration: 4 })}
            icon={<Zap className="w-4 h-4" />}
          >
            RUN AUTO 5-STATE ATTACK SEQUENCE
          </Button>

          <Button
            variant={safeDemoMode ? 'danger' : 'secondary'}
            onClick={() => toggleSafeDemoMode()}
            icon={<Cpu className="w-4 h-4" />}
          >
            SAFE DEMO MODE: {safeDemoMode ? 'ENABLED (CSS ONLY)' : 'DISABLED (WEBGL)'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
