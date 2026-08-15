import { ThreatEvent, SystemStatus, TransmissionRequest } from '../types/threat';

export interface ThreatServiceInterface {
  getSystemStatus(): Promise<SystemStatus>;
  getThreatHistory(): Promise<ThreatEvent[]>;
  getCurrentThreat(): Promise<ThreatEvent | null>;
  analyzeTransmission(req: TransmissionRequest): Promise<{
    accepted: boolean;
    jobId: string;
    estimatedDetectionTimeMs: number;
  }>;
}

export type ThreatListener = (event: Partial<ThreatEvent>) => void;

export interface WebSocketAdapterInterface {
  connect(): void;
  disconnect(): void;
  subscribeThreats(listener: ThreatListener): () => void;
  emitTransmission(data: TransmissionRequest): void;
  isConnected(): boolean;
}
