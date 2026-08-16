import { z } from 'zod';

export const ThreatEventSchema = z.object({
  id: z.string().optional(),
  timestamp: z.string().optional(),
  detected: z.boolean(),
  confidence: z.number().min(0).max(1),
  risk: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  frequency: z.object({
    min: z.number(),
    max: z.number(),
  }),
  duration: z.number(),
  pattern: z.string(),
});

export type ThreatEvent = z.infer<typeof ThreatEventSchema>;

export type SystemThreatState =
  | 'SAFE'
  | 'SIGNAL_DETECTED'
  | 'ANALYZING'
  | 'POTENTIAL_COVERT_COMMUNICATION'
  | 'THREAT_LOGGED';

export interface NodeStatus {
  id: string;
  name: string;
  status: 'STABLE' | 'WARNING' | 'ANOMALY' | 'LOST';
  latitude: number;
  longitude: number;
  gravityCenter: number;
  integrity: number; // 0-100
  uptime: string;
  lastPing: string;
}
