export type ThreatStateType = 
  | 'SAFE'
  | 'SIGNAL_DETECTED'
  | 'ANALYZING'
  | 'POTENTIAL_COVERT_COMMUNICATION'
  | 'THREAT_LOGGED';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface FrequencyRange {
  min: number; // e.g. 18000 Hz
  max: number; // e.g. 24000 Hz
}

export interface ThreatEvent {
  id: string;
  timestamp: string;
  detected: boolean;
  confidence: number; // 0 to 1
  risk: RiskLevel;
  frequency: FrequencyRange;
  peakFrequency: number; // Hz
  amplitude: number; // dBFS
  duration: number; // seconds
  pattern: string; // e.g. "FSK-like (Near-Ultrasonic)", "Chirp Pulse", "Phase Shift Shift-Keying"
  payloadSummary?: string;
  locationNode: string; // e.g. "SOC-Node-Alpha (Microphone Array 04)"
  rawSpectrogramData?: number[][]; // 2D FFT matrix [timeBins][freqBins]
}

export interface SpectrumPoint {
  frequency: number; // Hz
  amplitude: number; // dB
  isAnomaly?: boolean;
}

export interface SystemStatus {
  online: boolean;
  activeSensors: number;
  samplingRate: number; // Hz (e.g. 96000)
  currentNoiseFloor: number; // dBFS
  totalThreatsToday: number;
  lastEventTime?: string;
}

export interface TransmissionRequest {
  payload: string;
  encodingType: 'TEXT' | 'HEX' | 'BINARY';
  frequencyMin: number;
  frequencyMax: number;
  duration: number;
  powerLevel: number;
}
