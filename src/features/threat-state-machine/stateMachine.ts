import { ThreatStateType, RiskLevel } from '../../types/threat';

export interface StateConfig {
  state: ThreatStateType;
  label: string;
  subText: string;
  colorHex: string;
  badgeClasses: string;
  risk: RiskLevel;
  minConfidence: number;
  maxConfidence: number;
}

export const THREAT_STATE_CONFIGS: Record<ThreatStateType, StateConfig> = {
  SAFE: {
    state: 'SAFE',
    label: 'SYSTEM SAFE',
    subText: 'Monitoring near-ultrasonic acoustic spectrum (16kHz - 24kHz). No covert channels active.',
    colorHex: '#3ECF8E',
    badgeClasses: 'bg-[#3ECF8E]/10 text-[#3ECF8E] border-[#3ECF8E]/30',
    risk: 'LOW',
    minConfidence: 0.0,
    maxConfidence: 0.15,
  },
  SIGNAL_DETECTED: {
    state: 'SIGNAL_DETECTED',
    label: 'SIGNAL DETECTED',
    subText: 'Acoustic anomaly detected in 19.5kHz - 21.2kHz band. Evaluating wave envelope.',
    colorHex: '#F5A623',
    badgeClasses: 'bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/30',
    risk: 'LOW',
    minConfidence: 0.35,
    maxConfidence: 0.55,
  },
  ANALYZING: {
    state: 'ANALYZING',
    label: 'ANALYZING SPECTRUM',
    subText: 'Running FFT feature extraction & constellation pattern verification...',
    colorHex: '#F5A623',
    badgeClasses: 'bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/30',
    risk: 'MEDIUM',
    minConfidence: 0.60,
    maxConfidence: 0.78,
  },
  POTENTIAL_COVERT_COMMUNICATION: {
    state: 'POTENTIAL_COVERT_COMMUNICATION',
    label: 'POTENTIAL COVERT COMM',
    subText: 'High likelihood of structured acoustic data transfer (FSK subcarrier detected).',
    colorHex: '#FF5C5C',
    badgeClasses: 'bg-[#FF5C5C]/10 text-[#FF5C5C] border-[#FF5C5C]/30',
    risk: 'HIGH',
    minConfidence: 0.80,
    maxConfidence: 0.91,
  },
  THREAT_LOGGED: {
    state: 'THREAT_LOGGED',
    label: 'THREAT LOGGED',
    subText: 'Covert acoustic communication channel confirmed & registered in security ledger.',
    colorHex: '#FF5C5C',
    badgeClasses: 'bg-[#FF5C5C]/15 text-[#FF5C5C] border-[#FF5C5C]/40 animate-pulse',
    risk: 'HIGH',
    minConfidence: 0.92,
    maxConfidence: 0.99,
  },
};

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
