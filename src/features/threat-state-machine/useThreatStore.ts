import { create } from 'zustand';
import { ThreatStateType, ThreatEvent, SpectrumPoint, SystemStatus, TransmissionRequest } from '../../types/threat';
import { THREAT_STATE_CONFIGS } from './stateMachine';
import { generateMockSpectrumPoints, INITIAL_MOCK_THREATS } from '../../services/mockThreatEvents';
import { ENV } from '../../config/env';

interface ThreatStoreState {
  // State Machine
  currentState: ThreatStateType;
  confidence: number; // 0 to 100
  activeFrequencyCenter: number; // Hz
  peakAmplitude: number; // dBFS
  patternType: string;
  
  // Audio Spectrum data
  spectrumPoints: SpectrumPoint[];
  
  // Threat History & Details
  threatHistory: ThreatEvent[];
  selectedThreat: ThreatEvent | null;
  
  // System Status
  systemStatus: SystemStatus;
  
  // Settings & Modes
  safeDemoMode: boolean; // low-power CSS mode when true (FPS guardrail)
  isMockData: boolean;
  isAuthenticated: boolean;
  userRole: 'ANALYST' | 'ADMIN' | 'DEMO';
  
  // Actions
  setThreatState: (state: ThreatStateType, customConfidence?: number) => void;
  stepNextState: () => void;
  resetToSafe: () => void;
  triggerSimulatedAttack: (req?: Partial<TransmissionRequest>) => Promise<void>;
  selectThreat: (threat: ThreatEvent | null) => void;
  toggleSafeDemoMode: (enabled?: boolean) => void;
  loginMock: (email: string) => void;
  logoutMock: () => void;
  updateSpectrumData: () => void;
}

export const useThreatStore = create<ThreatStoreState>((set, get) => ({
  currentState: 'SAFE',
  confidence: 4,
  activeFrequencyCenter: 20450,
  peakAmplitude: -82.1,
  patternType: 'Ambient Acoustic Noise',
  
  spectrumPoints: generateMockSpectrumPoints('SAFE', 20450),
  
  threatHistory: INITIAL_MOCK_THREATS,
  selectedThreat: INITIAL_MOCK_THREATS[0],
  
  systemStatus: {
    online: true,
    activeSensors: 8,
    samplingRate: 96000,
    currentNoiseFloor: -82.4,
    totalThreatsToday: 14,
    lastEventTime: INITIAL_MOCK_THREATS[0].timestamp,
  },
  
  safeDemoMode: false,
  isMockData: ENV.USE_MOCK_DATA,
  isAuthenticated: ENV.DEMO_BYPASS_AUTH,
  userRole: 'ANALYST',
  
  setThreatState: (state: ThreatStateType, customConfidence?: number) => {
    const config = THREAT_STATE_CONFIGS[state];
    const conf = customConfidence !== undefined 
      ? customConfidence 
      : Math.round((config.minConfidence + Math.random() * (config.maxConfidence - config.minConfidence)) * 100);
    
    let pattern = 'Ambient Noise Floor';
    let amp = -82.1;

    if (state === 'SIGNAL_DETECTED') {
      pattern = 'Unmodulated Ultrasonic Carrier';
      amp = -58.3;
    } else if (state === 'ANALYZING') {
      pattern = 'Evaluating FFT Constellation';
      amp = -49.0;
    } else if (state === 'POTENTIAL_COVERT_COMMUNICATION') {
      pattern = 'Sub-carrier FSK Modulation';
      amp = -38.4;
    } else if (state === 'THREAT_LOGGED') {
      pattern = 'FSK-Ultrasonic (Sub-carrier 20.45kHz)';
      amp = -31.8;
    }

    set({
      currentState: state,
      confidence: conf,
      peakAmplitude: amp,
      patternType: pattern,
      spectrumPoints: generateMockSpectrumPoints(state, get().activeFrequencyCenter),
    });

    // Automatically append to threat history when logged
    if (state === 'THREAT_LOGGED') {
      const newThreat: ThreatEvent = {
        id: `TRT-2026-${Math.floor(Math.random() * 8999 + 1000)}`,
        timestamp: new Date().toISOString(),
        detected: true,
        confidence: conf / 100,
        risk: 'HIGH',
        frequency: { min: get().activeFrequencyCenter - 1000, max: get().activeFrequencyCenter + 1000 },
        peakFrequency: get().activeFrequencyCenter,
        amplitude: amp,
        duration: 4.5,
        pattern: pattern,
        payloadSummary: 'Live Simulated Transmit [0x53 0x49 0x48]',
        locationNode: 'SOC-Node-Alpha (Mic Array 01)',
      };

      set((s) => ({
        threatHistory: [newThreat, ...s.threatHistory],
        selectedThreat: newThreat,
        systemStatus: {
          ...s.systemStatus,
          totalThreatsToday: s.systemStatus.totalThreatsToday + 1,
          lastEventTime: newThreat.timestamp,
        },
      }));
    }
  },

  stepNextState: () => {
    const current = get().currentState;
    const states: ThreatStateType[] = ['SAFE', 'SIGNAL_DETECTED', 'ANALYZING', 'POTENTIAL_COVERT_COMMUNICATION', 'THREAT_LOGGED'];
    const idx = states.indexOf(current);
    const next = states[(idx + 1) % states.length];
    get().setThreatState(next);
  },

  resetToSafe: () => {
    get().setThreatState('SAFE', 4);
  },

  triggerSimulatedAttack: async (req) => {
    const freq = req?.frequencyMin ? Math.round((req.frequencyMin + (req.frequencyMax || 24000)) / 2) : 20500;
    set({ activeFrequencyCenter: freq });

    // Step through state sequence with realistic SOC timing
    get().setThreatState('SIGNAL_DETECTED', 42);
    await new Promise((r) => setTimeout(r, 1400));

    get().setThreatState('ANALYZING', 71);
    await new Promise((r) => setTimeout(r, 1800));

    get().setThreatState('POTENTIAL_COVERT_COMMUNICATION', 88);
    await new Promise((r) => setTimeout(r, 1600));

    get().setThreatState('THREAT_LOGGED', 96);
  },

  selectThreat: (threat: ThreatEvent | null) => set({ selectedThreat: threat }),

  toggleSafeDemoMode: (enabled) =>
    set((s) => ({ safeDemoMode: enabled !== undefined ? enabled : !s.safeDemoMode })),

  loginMock: (_email: string) => set({ isAuthenticated: true, userRole: 'ANALYST' }),

  logoutMock: () => set({ isAuthenticated: false }),

  updateSpectrumData: () => {
    const { currentState, activeFrequencyCenter } = get();
    set({ spectrumPoints: generateMockSpectrumPoints(currentState, activeFrequencyCenter) });
  },
}));
