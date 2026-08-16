import React, { useState } from 'react';
import { useThreatStore } from '../../features/threat-state-machine/useThreatStore';
import { SystemThreatState } from '../../types/threat';

export const DevStatePanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentState = useThreatStore((s) => s.currentState);
  const setThreatState = useThreatStore((s) => s.setThreatState);

  const states: SystemThreatState[] = [
    'SAFE',
    'SIGNAL_DETECTED',
    'ANALYZING',
    'POTENTIAL_COVERT_COMMUNICATION',
    'THREAT_LOGGED',
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 font-mono text-xs">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-surface-2 border border-hairline px-3 py-1.5 rounded-card text-secondary-ui hover:text-primary-ui shadow-elevation-2 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-accent-info" />
          <span>DEV: STATE CONTROLLER</span>
        </button>
      ) : (
        <div className="bg-surface-2 border border-hairline rounded-card p-4 shadow-elevation-4 flex flex-col gap-3 min-w-[280px]">
          <div className="flex justify-between items-center border-b border-hairline pb-2">
            <span className="font-bold text-primary-ui uppercase tracking-wider text-[11px]">
              STATE MACHINE DEBUGGER
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-tertiary-ui hover:text-primary-ui text-base"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            {states.map((st) => (
              <button
                key={st}
                onClick={() => setThreatState(st)}
                className={`p-2 rounded text-left transition-colors flex justify-between items-center ${
                  currentState === st
                    ? 'bg-overlay text-primary-ui font-bold border border-white/20'
                    : 'bg-surface-1 text-secondary-ui hover:text-primary-ui hover:bg-overlay'
                }`}
              >
                <span>{st}</span>
                {currentState === st && <span className="w-1.5 h-1.5 rounded-full bg-accent-safe" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
