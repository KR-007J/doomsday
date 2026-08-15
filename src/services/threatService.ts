import { ThreatServiceInterface, WebSocketAdapterInterface, ThreatListener } from './websocketAdapter';
import { ThreatEvent, SystemStatus, TransmissionRequest } from '../types/threat';
import { INITIAL_MOCK_THREATS } from './mockThreatEvents';
import { ENV } from '../config/env';
import { ThreatEventSchema, SystemStatusSchema } from './schemas';

// Mock Implementation of Threat Service
class MockThreatService implements ThreatServiceInterface {
  private threats: ThreatEvent[] = [...INITIAL_MOCK_THREATS];

  async getSystemStatus(): Promise<SystemStatus> {
    const raw = {
      online: true,
      activeSensors: 8,
      samplingRate: 96000,
      currentNoiseFloor: -82.4,
      totalThreatsToday: 14,
      lastEventTime: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    };
    return SystemStatusSchema.parse(raw);
  }

  async getThreatHistory(): Promise<ThreatEvent[]> {
    return this.threats.map(t => ThreatEventSchema.parse(t));
  }

  async getCurrentThreat(): Promise<ThreatEvent | null> {
    return this.threats[0] ? ThreatEventSchema.parse(this.threats[0]) : null;
  }

  async analyzeTransmission(req: TransmissionRequest): Promise<{
    accepted: boolean;
    jobId: string;
    estimatedDetectionTimeMs: number;
  }> {
    return {
      accepted: true,
      jobId: `JOB-${Math.floor(Math.random() * 89999 + 10000)}`,
      estimatedDetectionTimeMs: req.duration * 1000 + 1500,
    };
  }
}

// Real Implementation using fetch API
class RealThreatService implements ThreatServiceInterface {
  async getSystemStatus(): Promise<SystemStatus> {
    const res = await fetch(`${ENV.API_BASE_URL}/system-status`);
    const json = await res.json();
    return SystemStatusSchema.parse(json);
  }

  async getThreatHistory(): Promise<ThreatEvent[]> {
    const res = await fetch(`${ENV.API_BASE_URL}/threats`);
    const json = await res.json();
    return json.map((item: unknown) => ThreatEventSchema.parse(item));
  }

  async getCurrentThreat(): Promise<ThreatEvent | null> {
    const res = await fetch(`${ENV.API_BASE_URL}/threats/current`);
    const json = await res.json();
    return json ? ThreatEventSchema.parse(json) : null;
  }

  async analyzeTransmission(req: TransmissionRequest): Promise<{
    accepted: boolean;
    jobId: string;
    estimatedDetectionTimeMs: number;
  }> {
    const res = await fetch(`${ENV.API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    return res.json();
  }
}

// Mock Implementation of WebSocket Adapter
class MockWebSocketAdapter implements WebSocketAdapterInterface {
  private connected: boolean = false;
  private listeners: ThreatListener[] = [];
  private intervalId: number | null = null;

  connect(): void {
    this.connected = true;
    console.log('[MockWS] Connected to acoustic stream');
  }

  disconnect(): void {
    this.connected = false;
    if (this.intervalId) clearInterval(this.intervalId);
    console.log('[MockWS] Disconnected');
  }

  subscribeThreats(listener: ThreatListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  emitTransmission(data: TransmissionRequest): void {
    console.log('[MockWS] Emitting acoustic transmission payload:', data);
  }

  isConnected(): boolean {
    return this.connected;
  }
}

export const threatService: ThreatServiceInterface = ENV.USE_MOCK_DATA
  ? new MockThreatService()
  : new RealThreatService();

export const wsAdapter: WebSocketAdapterInterface = new MockWebSocketAdapter();
