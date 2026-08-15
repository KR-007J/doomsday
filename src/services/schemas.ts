import { z } from 'zod';

export const FrequencyRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
});

export const ThreatEventSchema = z.object({
  id: z.string().optional().default(() => `TRT-${Math.floor(Math.random() * 8999 + 1000)}`),
  timestamp: z.string().optional().default(() => new Date().toISOString()),
  detected: z.boolean(),
  confidence: z.number().min(0).max(1),
  risk: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  frequency: FrequencyRangeSchema,
  peakFrequency: z.number().optional().default(19500),
  amplitude: z.number().optional().default(-42),
  duration: z.number(),
  pattern: z.string(),
  payloadSummary: z.string().optional(),
  locationNode: z.string().optional().default('SOC-Node-Alpha'),
});

export const SystemStatusSchema = z.object({
  online: z.boolean(),
  activeSensors: z.number(),
  samplingRate: z.number(),
  currentNoiseFloor: z.number(),
  totalThreatsToday: z.number(),
  lastEventTime: z.string().optional(),
});
