import { create } from 'zustand';
import { SystemThreatState, ThreatEvent } from '../../types/threat';

interface ThreatStoreState {
  currentState: SystemThreatState;
  confidence: number;
  patternType: string;
  isLoggedIn: boolean;
  history: ThreatEvent[];
  setThreatState: (state: SystemThreatState) => void;
  triggerSimulatedAttack: (opts?: { frequencyMin?: number; frequencyMax?: number; duration?: number; payload?: string }) => void;
  resetToSafe: () => void;
  loginMock: (email: string) => void;
}

export const useThreatStore = create<ThreatStoreState>((set, get) => ({
  currentState: 'SAFE',
  confidence: 98.0,
  patternType: 'ENVIRONMENTAL_BASELINE',
  isLoggedIn: true,
  history: [
    {
      id: 'EVT-1001',
      timestamp: '12:00:00.000',
      detected: false,
      confidence: 0.02,
      risk: 'LOW',
      frequency: { min: 14000, max: 14050 },
      duration: 50,
      pattern: 'BASELINE_ALPHA',
    },
  ],

  setThreatState: (newState) => {
    let conf = 98.0;
    let pattern = 'ENVIRONMENTAL_BASELINE';

    switch (newState) {
      case 'SAFE':
        conf = 98.0;
        pattern = 'ENVIRONMENTAL_BASELINE';
        break;
      case 'SIGNAL_DETECTED':
        conf = 45.0;
        pattern = 'ULTRASONIC_BURST';
        break;
      case 'ANALYZING':
        conf = 68.0;
        pattern = 'FSK_CARRIER';
        break;
      case 'POTENTIAL_COVERT_COMMUNICATION':
        conf = 84.0;
        pattern = 'SPOOFED_BEACON';
        break;
      case 'THREAT_LOGGED':
        conf = 98.4;
        pattern = 'MECHANICAL_INTRUSION';
        break;
    }

    set({ currentState: newState, confidence: conf, patternType: pattern });
  },

  triggerSimulatedAttack: (opts) => {
    set({ currentState: 'SIGNAL_DETECTED', confidence: 45.0, patternType: 'ULTRASONIC_BURST' });

    setTimeout(() => {
      set({ currentState: 'ANALYZING', confidence: 68.0, patternType: 'FSK_CARRIER' });
    }, 1200);

    setTimeout(() => {
      set({ currentState: 'POTENTIAL_COVERT_COMMUNICATION', confidence: 87.4, patternType: 'SPOOFED_BEACON' });
    }, 2400);

    setTimeout(() => {
      const newEvt: ThreatEvent = {
        id: `EVT-${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toISOString().substring(11, 23),
        detected: true,
        confidence: 0.984,
        risk: 'HIGH',
        frequency: { min: opts?.frequencyMin || 20500, max: opts?.frequencyMax || 22000 },
        duration: opts?.duration || 150,
        pattern: 'MECHANICAL_INTRUSION',
      };

      set((state) => ({
        currentState: 'THREAT_LOGGED',
        confidence: 98.4,
        patternType: 'MECHANICAL_INTRUSION',
        history: [newEvt, ...state.history],
      }));
    }, 3800);
  },

  resetToSafe: () => {
    set({ currentState: 'SAFE', confidence: 98.0, patternType: 'ENVIRONMENTAL_BASELINE' });
  },

  loginMock: () => {
    set({ isLoggedIn: true });
  },
}));
