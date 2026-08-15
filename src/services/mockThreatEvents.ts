import { ThreatEvent, SpectrumPoint, ThreatStateType } from '../types/threat';

// Mock FFT Spectrogram Row Generator
export function generateMockSpectrogramRow(
  state: ThreatStateType,
  activeFreqCenter: number = 20500,
  bins: number = 64
): number[] {
  const row: number[] = new Array(bins).fill(0);
  const isThreat = state === 'ANALYZING' || state === 'POTENTIAL_COVERT_COMMUNICATION' || state === 'THREAT_LOGGED';
  const isDetected = state === 'SIGNAL_DETECTED';

  for (let i = 0; i < bins; i++) {
    // Map bin index to frequency (16000 Hz to 24000 Hz)
    const freq = 16000 + (i / bins) * 8000;
    
    // Baseline ambient acoustic noise floor (-90dB to -75dB)
    let amplitude = -85 + (Math.random() * 8 - 4);

    if (isThreat || isDetected) {
      // Injected structured signal pattern around activeFreqCenter
      const distance = Math.abs(freq - activeFreqCenter);
      const bandwidth = 800; // Hz

      if (distance < bandwidth) {
        const signalStrength = (1 - distance / bandwidth) * (isThreat ? 55 : 30);
        const modulation = Math.sin(Date.now() / 150 + i * 0.5) * 8; // FSK/Chirp modulation look
        amplitude += signalStrength + modulation;
      }
    }

    // Normalize to 0..1 scale for visual canvas rendering
    const normalized = Math.min(1, Math.max(0, (amplitude + 90) / 70));
    row[i] = normalized;
  }

  return row;
}

// Generate Real-time Frequency Spectrum Points for Recharts / SVG Chart
export function generateMockSpectrumPoints(
  state: ThreatStateType,
  activeFreqCenter: number = 20500
): SpectrumPoint[] {
  const points: SpectrumPoint[] = [];
  const startFreq = 16000;
  const endFreq = 24000;
  const step = 200;
  const isThreat = state !== 'SAFE';

  for (let f = startFreq; f <= endFreq; f += step) {
    let amp = -80 + Math.random() * 6;
    let isAnomaly = false;

    if (isThreat) {
      const dist = Math.abs(f - activeFreqCenter);
      if (dist < 1000) {
        const boost = (1 - dist / 1000) * (state === 'THREAT_LOGGED' ? 45 : state === 'POTENTIAL_COVERT_COMMUNICATION' ? 38 : 25);
        amp += boost + Math.sin(f / 100 + Date.now() / 200) * 5;
        isAnomaly = true;
      }
    }

    points.push({
      frequency: f,
      amplitude: Math.round(amp * 10) / 10,
      isAnomaly,
    });
  }

  return points;
}

// Seed initial threat history log
export const INITIAL_MOCK_THREATS: ThreatEvent[] = [
  {
    id: 'TRT-2026-8801',
    timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    detected: true,
    confidence: 0.94,
    risk: 'HIGH',
    frequency: { min: 19200, max: 21400 },
    peakFrequency: 20450,
    amplitude: -34.2,
    duration: 3.8,
    pattern: 'FSK-Ultrasonic (Sub-carrier 20.4kHz)',
    payloadSummary: 'Exfiltration Packet Header [0x41 0x53 0x48 0x44]',
    locationNode: 'SOC-Node-Alpha (Mic Array 02)',
  },
  {
    id: 'TRT-2026-8798',
    timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    detected: true,
    confidence: 0.81,
    risk: 'MEDIUM',
    frequency: { min: 18500, max: 19800 },
    peakFrequency: 19100,
    amplitude: -41.0,
    duration: 2.1,
    pattern: 'Linear Chirp Modulation',
    payloadSummary: 'Beacon Heartbeat Ping',
    locationNode: 'SOC-Node-Beta (Mic Array 01)',
  },
  {
    id: 'TRT-2026-8742',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    detected: true,
    confidence: 0.65,
    risk: 'LOW',
    frequency: { min: 22000, max: 23200 },
    peakFrequency: 22500,
    amplitude: -52.5,
    duration: 1.2,
    pattern: 'High-Frequency Burst Noise',
    payloadSummary: 'Transient Interference / Unmodulated Pulse',
    locationNode: 'SOC-Node-Gamma (Mic Array 04)',
  },
];
