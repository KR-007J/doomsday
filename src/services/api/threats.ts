import { env } from '../../config/env';
import { apiClient } from './client';
import { ThreatEvent, ThreatEventSchema } from '../../types/threat';
import { MOCK_THREAT_EVENTS } from '../mocks/mockThreatEvents';

export async function fetchSystemStatus() {
  if (env.USE_MOCK_DATA) {
    return {
      status: 'NOMINAL',
      uplink: '99.8%',
      activeSensors: 8,
      latencyMs: 14,
    };
  }
  return apiClient('/api/system-status');
}

export async function fetchThreats(): Promise<ThreatEvent[]> {
  if (env.USE_MOCK_DATA) {
    return MOCK_THREAT_EVENTS;
  }
  const raw = await apiClient<unknown[]>('/api/threats');
  return raw.map((item) => ThreatEventSchema.parse(item));
}

export async function fetchCurrentThreat(): Promise<ThreatEvent> {
  if (env.USE_MOCK_DATA) {
    return MOCK_THREAT_EVENTS[MOCK_THREAT_EVENTS.length - 1];
  }
  const raw = await apiClient<unknown>('/api/threats/current');
  return ThreatEventSchema.parse(raw);
}

export async function analyzePayload(payloadHex: string): Promise<ThreatEvent> {
  if (env.USE_MOCK_DATA) {
    const isThreat = payloadHex.includes('0x41') || payloadHex.length > 20;
    return {
      id: `EVT-${Date.now()}`,
      timestamp: new Date().toISOString().substring(11, 23),
      detected: isThreat,
      confidence: isThreat ? 0.94 : 0.12,
      risk: isThreat ? 'HIGH' : 'LOW',
      frequency: { min: 20000, max: 22000 },
      duration: 150,
      pattern: isThreat ? 'MECHANICAL_INTRUSION' : 'ENVIRONMENTAL_BASELINE',
    };
  }
  const raw = await apiClient<unknown>('/api/analyze', {
    method: 'POST',
    body: JSON.stringify({ payload: payloadHex }),
  });
  return ThreatEventSchema.parse(raw);
}
