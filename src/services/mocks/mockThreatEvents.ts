import { ThreatEvent, NodeStatus } from '../../types/threat';

export const INITIAL_NODES: NodeStatus[] = [
  {
    id: 'NODE-01',
    name: 'ALPHA_01',
    status: 'STABLE',
    latitude: 34.0522,
    longitude: -118.2437,
    gravityCenter: 0.98,
    integrity: 98.0,
    uptime: '142:12:04',
    lastPing: 'JUST NOW',
  },
  {
    id: 'NODE-02',
    name: 'SIGMA_02',
    status: 'WARNING',
    latitude: 40.7128,
    longitude: -74.006,
    gravityCenter: 2.45,
    integrity: 42.0,
    uptime: '89:45:12',
    lastPing: '2s ago',
  },
  {
    id: 'NODE-03',
    name: 'DELTA_03',
    status: 'ANOMALY',
    latitude: 51.5074,
    longitude: -0.1278,
    gravityCenter: 1.12,
    integrity: 85.0,
    uptime: '210:04:50',
    lastPing: '1s ago',
  },
  {
    id: 'NODE-04',
    name: 'ECHO_04',
    status: 'LOST',
    latitude: 35.6895,
    longitude: 139.6917,
    gravityCenter: 0.0,
    integrity: 0.0,
    uptime: 'OFFLINE',
    lastPing: 'OFFLINE',
  },
];

export const MOCK_THREAT_EVENTS: ThreatEvent[] = [
  {
    id: 'EVT-9001',
    timestamp: '12:00:00.000',
    detected: false,
    confidence: 0.12,
    risk: 'LOW',
    frequency: { min: 14000, max: 14050 },
    duration: 50,
    pattern: 'ENVIRONMENTAL_BASELINE',
  },
  {
    id: 'EVT-9002',
    timestamp: '12:01:12.445',
    detected: true,
    confidence: 0.58,
    risk: 'MEDIUM',
    frequency: { min: 19500, max: 20200 },
    duration: 120,
    pattern: 'SPOOFED_BEACON',
  },
  {
    id: 'EVT-9003',
    timestamp: '12:01:18.999',
    detected: true,
    confidence: 0.98,
    risk: 'HIGH',
    frequency: { min: 20500, max: 22000 },
    duration: 200,
    pattern: 'MECHANICAL_INTRUSION',
  },
];

export function generateFFTMatrix(rows = 30, cols = 64, threatIntensity = 0): number[][] {
  const matrix: number[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: number[] = [];
    for (let c = 0; c < cols; c++) {
      let val = Math.random() * 0.2;
      // Injected structured anomaly frequency band around index 20-30
      if (c >= 22 && c <= 28) {
        val += threatIntensity * (0.5 + Math.random() * 0.5);
      }
      row.push(Math.min(1, val));
    }
    matrix.push(row);
  }
  return matrix;
}
