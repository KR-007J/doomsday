import { ThreatStateType, RiskLevel } from '../../types/threat';

export interface StateConfig {
  state: ThreatStateType;
  label: string;
  subText: string;
  colorHex: string;
  glowHex: string;
  badgeClasses: string;
  pulseSpeedSec: number;
  risk: RiskLevel;
  minConfidence: number;
  maxConfidence: number;
}

export const THREAT_STATE_CONFIGS: Record<ThreatStateType, StateConfig> = {
  SAFE: {
    state: 'SAFE',
    label: 'SYSTEM SAFE',
    subText: 'Monitoring near-ultrasonic acoustic spectrum (16kHz - 24kHz). No covert channels active.',
    colorHex: '#10B981',
    glowHex: 'rgba(16, 185, 129, 0.25)',
    badgeClasses: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50 shadow-emerald-900/30',
    pulseSpeedSec: 3,
    risk: 'LOW',
    minConfidence: 0.0,
    maxConfidence: 0.15,
  },
  SIGNAL_DETECTED: {
    state: 'SIGNAL_DETECTED',
    label: 'SIGNAL DETECTED',
    subText: 'Acoustic anomaly detected in 19.5kHz - 21.2kHz band. Evaluating wave envelope.',
    colorHex: '#F59E0B',
    glowHex: 'rgba(245, 158, 11, 0.3)',
    badgeClasses: 'bg-amber-950/80 text-amber-400 border-amber-500/50 shadow-amber-900/30',
    pulseSpeedSec: 1.5,
    risk: 'LOW',
    minConfidence: 0.35,
    maxConfidence: 0.55,
  },
  ANALYZING: {
    state: 'ANALYZING',
    label: 'ANALYZING SPECTRUM',
    subText: 'Running FFT feature extraction & constellation pattern verification...',
    colorHex: '#6366F1',
    glowHex: 'rgba(99, 102, 241, 0.35)',
    badgeClasses: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/50 shadow-indigo-900/30',
    pulseSpeedSec: 1.0,
    risk: 'MEDIUM',
    minConfidence: 0.60,
    maxConfidence: 0.78,
  },
  POTENTIAL_COVERT_COMMUNICATION: {
    state: 'POTENTIAL_COVERT_COMMUNICATION',
    label: 'POTENTIAL COVERT COMM',
    subText: 'High likelihood of structured acoustic data transfer (FSK subcarrier detected).',
    colorHex: '#F97316',
    glowHex: 'rgba(249, 115, 22, 0.4)',
    badgeClasses: 'bg-orange-950/80 text-orange-400 border-orange-500/50 shadow-orange-900/40',
    pulseSpeedSec: 0.7,
    risk: 'HIGH',
    minConfidence: 0.80,
    maxConfidence: 0.91,
  },
  THREAT_LOGGED: {
    state: 'THREAT_LOGGED',
    label: 'THREAT LOGGED',
    subText: 'Covert acoustic communication channel confirmed & registered in security ledger.',
    colorHex: '#EF4444',
    glowHex: 'rgba(239, 68, 68, 0.5)',
    badgeClasses: 'bg-rose-950/90 text-rose-300 border-rose-500/60 shadow-rose-900/50 animate-pulse-fast',
    pulseSpeedSec: 0.4,
    risk: 'HIGH',
    minConfidence: 0.92,
    maxConfidence: 0.99,
  },
};

// Next transition helper for the 5-state sequence
export function getNextThreatState(current: ThreatStateType): ThreatStateType {
  switch (current) {
    case 'SAFE':
      return 'SIGNAL_DETECTED';
    case 'SIGNAL_DETECTED':
      return 'ANALYZING';
    case 'ANALYZING':
      return 'POTENTIAL_COVERT_COMMUNICATION';
    case 'POTENTIAL_COVERT_COMMUNICATION':
      return 'THREAT_LOGGED';
    case 'THREAT_LOGGED':
      return 'SAFE';
  }
}
